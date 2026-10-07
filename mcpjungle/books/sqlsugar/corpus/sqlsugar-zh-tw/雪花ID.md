# SqlSugar — 雪花 ID 筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=2561)

## 核心概念

雪花 ID（Snowflake）是分散式唯一 ID 生成演算法，產生的 ID 是 long（64 位整數），具備時間有序性。
SqlSugar 內建雪花 ID，只要主鍵是 long 且未賦值，會自動填充。

---

## 速查表

| 需求 | 語法 |
|---|---|
| 設定 WorkId（必做）| SnowFlakeSingle.WorkId = 唯一數字 |
| 插入並返回雪花 ID | db.Insertable(entity).ExecuteReturnSnowflakeId() |
| 批量插入返回雪花 ID 集合 | db.Insertable(list).ExecuteReturnSnowflakeIdList() |
| 手動取得雪花 ID | SnowFlakeSingle.Instance.NextId() |
| 自訂雪花算法 | StaticConfig.CustomSnowFlakeFunc = () => 你的方法() |
| 時間回退容錯 | StaticConfig.CustomSnowFlakeTimeErrorFunc = () => 臨時 ID |
| 前端精度問題 | 加 [JsonConverter(typeof(ValueToStringConverter))] 序列化成 string |

---

## 一、基本使用

### 1.1 實體設定

```csharp
public class Order
{
    [SugarColumn(IsPrimaryKey = true)]  // long 主鍵，不設 IsIdentity
    public long Id { get; set; }

    public string Name { get; set; }
}
```

### 1.2 插入並取得雪花 ID

```csharp
// 單筆插入，返回雪花 ID
long id = db.Insertable(new Order { Name = "測試" }).ExecuteReturnSnowflakeId();

// 批量插入，返回雪花 ID 集合（比自增方便，不需要逐筆查詢）
List<long> ids = db.Insertable(list).ExecuteReturnSnowflakeIdList();
```

### 1.3 手動取得雪花 ID

```csharp
// 在程式中直接取得雪花 ID（不需要插入操作）
long id = SnowFlakeSingle.Instance.NextId();

// 常見用途：先生成 ID，再組裝物件
long orderId = SnowFlakeSingle.Instance.NextId();
var order = new Order { Id = orderId, Name = "手動設 ID" };
var items = itemDtos.Select(i => new OrderItem { OrderId = orderId, ... }).ToList();
```

### 1.4 導航插入自動填充

導航插入（InsertNav / UpdateNav）中，long 主鍵未賦值時會自動填充雪花 ID，無需手動設定。

---

## 二、WorkId 設定（必做，避免 ID 重複）

### 為什麼必須設定

雪花 ID 演算法依賴 WorkId 區分不同機器，WorkId 相同的多台服務器在同一毫秒產生的 ID 可能重複。

發生重複的常見情況：
- 本機開發和服務器同時運行，WorkId 相同
- 多台服務器負載均衡，WorkId 都是預設值 0
- 服務器時間被調整後重啟，WorkId 沒有更新

```csharp
// 程式啟動時執行一次（Program.cs 或 Startup.cs）
SnowFlakeSingle.WorkId = 唯一數字;  // 從設定檔讀取

// 例如：appsettings.json
// "SnowFlakeWorkId": 1

// Program.cs
SnowFlakeSingle.WorkId = builder.Configuration.GetValue<int>("SnowFlakeWorkId");
```

**WorkId 規則：**
- 範圍：0 ~ 31（二進位 5 位）
- 每台服務器（包含本機開發）必須設定不同值
- 服務器時間被人為調整後，必須同步更新 WorkId 再重啟

**✅ 實際案例：多環境 WorkId 設定**

```json
// appsettings.Development.json
{ "SnowFlakeWorkId": 0 }

// appsettings.Production.json（服務器一）
{ "SnowFlakeWorkId": 1 }

// appsettings.Production.json（服務器二，負載均衡）
{ "SnowFlakeWorkId": 2 }
```

```csharp
// Program.cs
SnowFlakeSingle.WorkId = app.Configuration.GetValue<int>("SnowFlakeWorkId");
```

---

## 三、前端精度問題（必處理）

JavaScript 的 Number 最大安全整數是 2^53 - 1（約 9 千兆），而雪花 ID 是 64 位整數，超過 JS 精度範圍，直接傳給前端會造成末位數字丟失。

### 解法：序列化時轉成 string

```csharp
// 實體加上 JsonConverter（Newtonsoft.Json）
public class Order
{
    [Newtonsoft.Json.JsonConverter(typeof(ValueToStringConverter))]
    [SugarColumn(IsPrimaryKey = true)]
    public long Id { get; set; }

    public string Name { get; set; }
}
```

```csharp
// Program.cs：安裝 Microsoft.AspNetCore.Mvc.NewtonsoftJson 後設定
builder.Services.AddControllers().AddNewtonsoftJson(opt =>
{
    opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    opt.SerializerSettings.ContractResolver = new DefaultContractResolver();
});
```

前端取得的 Id 會是字串 "1551128313597136896"，傳回後端時也是字串，需在 API 上轉型：

```csharp
// API 接收時 Id 是 string，轉成 long
if (long.TryParse(req.Id, out long id))
    entity.Id = id;
```

或直接在 DTO 使用 string 接收，由 Service 層轉型。

---

## 四、自訂雪花 ID 算法

若已有慣用的雪花 ID 套件，可替換 SqlSugar 內建算法：

```csharp
// 程式啟動時設定一次
StaticConfig.CustomSnowFlakeFunc = () =>
{
    return YourSnowflakeService.NextId();  // 回傳 long
};
```

使用自訂算法後，WorkId 等設定由自訂算法負責，不需要設定 SnowFlakeSingle.WorkId。

---

## 五、時間回退容錯

系統時間偶爾因卡頓、NTP 同步等原因短暫回退，預設 SqlSugar 會拋例外。
若要容錯，可設定臨時算法：

```csharp
// 程式啟動時設定一次
var ran = new Random();
StaticConfig.CustomSnowFlakeTimeErrorFunc = () =>
{
    return ran.Next(16, 18);  // 時間回退時用臨時隨機 ID
};
```

注意：
- 此容錯只適用於**系統偶發性**的時間回退（幾十毫秒）
- 若是**人為調整系統時間**，必須修改 WorkId 後重啟服務
- 不能長期依賴臨時 ID，偶爾幾筆可以接受

---

## 六、主鍵類型選擇建議

| 主鍵類型 | 優點 | 缺點 | 適用場景 |
|---|---|---|---|
| 自增 int | 簡單，資料庫原生支援 | 分散式環境不可用，暴露資料量 | 單機小型系統 |
| 自增 long | 範圍更大 | 同上 | 單機中型系統 |
| 雪花 long | 分散式唯一，有序，不暴露資料量 | 前端精度問題，需設定 WorkId | 分散式 / 多服務器 |
| GUID | 全球唯一，無需設定 | 無序（影響索引效能），空間大 | 對順序無要求的場景 |

---

## 注意事項

- SqlSugar 雪花 ID 是成熟演算法，正確設定 WorkId 後不會重複
- long 主鍵不需要設定 IsIdentity，只需設定 IsPrimaryKey
- 批量插入返回雪花 ID 集合用 ExecuteReturnSnowflakeIdList，比自增好用（不需要逐筆查詢）
- 自訂雪花算法後，WorkId 由自訂算法自行管理
- 前端精度問題必須處理，否則會造成主鍵丟失精度，查詢時找不到資料
