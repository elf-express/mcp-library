# SqlSugar — Json 類型筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=1232)

## 功能說明

即使資料庫本身不支援 JSON 型別，SqlSugar 也可以將 C# 物件自動序列化/反序列化後存入字串欄位，
查詢時自動還原為 C# 物件。只需在欄位加上 `[SugarColumn(IsJson = true)]`。

---

## 速查表

| 需求 | 設定 |
|---|---|
| 啟用 JSON 序列化欄位 | [SugarColumn(IsJson = true)] |
| 動態 JSON 物件 | public JObject Field { get; set; } |
| 動態 JSON 陣列 | public JArray Field { get; set; } |
| JSON 模糊查詢（全庫支援）| SqlFunc.JsonLike(it.Field, "keyword") |
| JSON 欄位取值 | SqlFunc.JsonField(it.Field, "key") |
| JSON 多層取值 | SqlFunc.JsonField(it.Field, "obj", "key") |
| JSON 陣列索引取值 | SqlFunc.JsonIndex(it.Field, 0) |
| JSON 陣列長度 | SqlFunc.JsonArrayLength(it.Field) |
| 字串陣列包含判斷 | SqlFunc.JsonArrayAny(it.Field, "a") |
| 物件陣列包含判斷 | SqlFunc.JsonListObjectAny(it.Field, "Name", "a") |

---

## 一、基本用法

### 1.1 實體設定

```csharp
public class UserProfile
{
    [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
    public int Id { get; set; }

    public string Name { get; set; }

    [SugarColumn(IsJson = true)]  // 必填，啟用 JSON 序列化
    public Address Address { get; set; }  // 自動序列化為 JSON 字串存入 DB

    [SugarColumn(IsJson = true)]
    public List<Tag> Tags { get; set; }   // List 也支援
}

public class Address
{
    public string City    { get; set; }
    public string Street  { get; set; }
    public string ZipCode { get; set; }
}

public class Tag
{
    public string Name  { get; set; }
    public string Color { get; set; }
}
```

### 1.2 CRUD 操作

```csharp
// 插入（C# 物件自動序列化為 JSON 字串）
db.Insertable(new UserProfile
{
    Name    = "Jack",
    Address = new Address { City = "台北", Street = "忠孝東路", ZipCode = "106" },
    Tags    = new List<Tag>
    {
        new Tag { Name = "VIP",  Color = "gold" },
        new Tag { Name = "會員", Color = "blue" }
    }
}).ExecuteCommand();

// 查詢（JSON 字串自動反序列化為 C# 物件）
var list = db.Queryable<UserProfile>().ToList();
// list[0].Address.City → "台北"
// list[0].Tags[0].Name → "VIP"
```

**注意：多表查詢（ViewModel）中用到 JSON 欄位的屬性，ViewModel 也需要加 `IsJson = true`。**

```csharp
public class UserProfileView
{
    public int    Id   { get; set; }
    public string Name { get; set; }

    [SugarColumn(IsJson = true)]  // ViewModel 也必須加
    public Address Address { get; set; }
}
```

---

## 二、動態 JSON（JObject / JArray）

```csharp
public class DynamicConfig
{
    [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
    public int Id { get; set; }

    [SugarColumn(IsJson = true)]
    public JObject Settings { get; set; }   // 動態 JSON 物件

    [SugarColumn(IsJson = true)]
    public JArray  Options  { get; set; }   // 動態 JSON 陣列
}

// 插入
var config = new DynamicConfig
{
    Settings = JObject.FromObject(new { theme = "dark", language = "zh-TW" }),
    Options  = JArray.FromObject(new List<object>
    {
        new { id = 1, label = "選項A" },
        new { id = 2, label = "選項B" }
    })
};
db.Insertable(config).ExecuteCommand();

// System.Text.Json 的物件也支援（5.1.4.68+）
```

---

## 三、JSON 函數查詢（5.1.2.8+）

### 3.1 SqlFunc.JsonLike — 模糊查詢（全庫支援）

```csharp
// 在 JSON 欄位中模糊搜尋，等同 LIKE '%keyword%'
var list = db.Queryable<UserProfile>()
    .Where(it => SqlFunc.JsonLike(it.Tags, "VIP"))
    .ToList();
// 效能一般，適合小量資料
```

### 3.2 SqlFunc.JsonField — 取得 JSON 欄位值

```csharp
// 取單層欄位值：{"city": "台北"} → 取 city
var list = db.Queryable<UserProfile>()
    .Where(it => SqlFunc.JsonField(it.Address, "city") == "台北")
    .ToList();

// 取多層欄位值：{"contact": {"phone": "0912"}} → 取 phone
var list2 = db.Queryable<UserProfile>()
    .Where(it => SqlFunc.JsonField(it.Address, "contact", "phone") == "0912")
    .ToList();
```

支援資料庫：PostgreSQL、SqlServer 2017+、MySQL（只能單欄位）、Oracle（只能單欄位）、Sqlite（5.1.4.148+）

### 3.3 SqlFunc.JsonIndex — 取陣列索引（5.1.4.113+）

```csharp
// 取 JSON 陣列第一個元素：["VIP","會員"] → 取索引 0 = "VIP"
var list = db.Queryable<UserProfile>()
    .Select(it => new
    {
        it.Name,
        FirstTag = SqlFunc.JsonIndex(it.Tags, 0)
    })
    .ToList();
```

支援資料庫：PostgreSQL、MySQL、SqlServer 2017+

### 3.4 SqlFunc.JsonArrayAny — 字串陣列包含（5.1.3.36+）

```csharp
// ["VIP","會員","黑卡"] 是否包含 "VIP"
var list = db.Queryable<UserProfile>()
    .Where(it => SqlFunc.JsonArrayAny(it.Tags, "VIP"))
    .ToList();

// 數字陣列：[1,2,3] 是否包含 2
var list2 = db.Queryable<Order>()
    .Where(it => SqlFunc.JsonArrayAny(it.StatusHistory, 2))
    .ToList();
```

支援資料庫：PostgreSQL、MySQL、SqlServer（最新版本）

### 3.5 SqlFunc.JsonListObjectAny — 物件陣列包含（5.1.3.36+）

```csharp
// [{"Name":"VIP","Color":"gold"},{"Name":"會員","Color":"blue"}]
// 是否存在 Name = "VIP" 的項目
var list = db.Queryable<UserProfile>()
    .Where(it => SqlFunc.JsonListObjectAny(it.Tags, "Name", "VIP"))
    .ToList();
```

支援資料庫：PostgreSQL、MySQL、SqlServer（最新版本）

### 3.6 SqlFunc.JsonArrayLength — 陣列長度

```csharp
// 查詢 Tags 陣列長度 >= 2 的使用者
var list = db.Queryable<UserProfile>()
    .Where(it => SqlFunc.JsonArrayLength(it.Tags) >= 2)
    .ToList();
```

支援資料庫：PostgreSQL（5.1.4.115）、MySQL、SqlServer

---

## 四、JSON 函數相容性總覽

| 函數 | SqlServer 2017+ | MySQL | PostgreSQL | Sqlite | Oracle |
|---|---|---|---|---|---|
| JsonLike | ✅ | ✅ | ✅ | ✅ | ✅ |
| JsonField | ✅ | ✅（單層）| ✅ | ✅（5.1.4.148+）| ✅（單層）|
| JsonIndex | ✅ | ✅ | ✅ | ❌ | ❌ |
| JsonArrayAny | ✅（最新）| ✅ | ✅ | ❌ | ❌ |
| JsonListObjectAny | ✅（最新）| ✅ | ✅ | ❌ | ❌ |
| JsonArrayLength | ✅ | ✅ | ✅ | ❌ | ❌ |

---

## 五、自訂 JSON 序列化

若不想使用 SqlSugar 內建的序列化（預設 Newtonsoft.Json），可透過自訂類型方式替換：

```csharp
// 詳見：自定義類型文件（typeId=2542）
// 自訂後同樣支援 SqlFunc.Json 函數系列
```

---

## 注意事項

- 多表查詢的 ViewModel 中，JSON 屬性也必須加 `[SugarColumn(IsJson = true)]`，否則不會反序列化
- JsonField、JsonArrayAny 等函數各資料庫支援度不同，用前確認版本
- SqlServer 需要 2017 以上版本才支援 JSON 函數
- JsonLike 全庫通用但效能差，大量資料不建議使用；有 JSON 查詢需求的場景建議考慮 PostgreSQL
- System.Text.Json 的物件支援需 5.1.4.68+
