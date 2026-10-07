# SqlSugar — 表格查詢（WhereDynamicFilter）筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=2314)

## 用途說明

前端傳入 JSON 格式條件，後端直接轉成 SQL WHERE 子句，不需要針對每個欄位寫 WhereIF。適合 VxeTable、低程式碼平台等動態查詢場景。

---

## 速查表

| 需求 | 語法 |
|---|---|
| 後端手動建構條件 | new ConditionalModel { FieldName, ConditionalType, FieldValue } |
| JSON 直接轉條件 | db.Utilities.JsonToConditionalModels(json) |
| 套用條件 | .Where(conModels) |
| 指定欄位類型（PgSQL 必要）| CSharpTypeName = "int" |
| 欄位名轉資料庫欄位名 | db.EntityMaintenance.GetDbColumnName\<T\>(fieldName) |
| 條件轉 SQL 字串 | db.Utilities.ConditionalModelsToSql(conModels) |
| 多表查詢去別名 | 先 .Select(...).MergeTable() 再 .Where(conModels) |
| 導航查詢 + 動態條件 | .Where(x => SqlFunc.Exists(x.Nav.Id, conModels)) |

---

## 一、ConditionalType 操作符一覽

| 名稱 | 值 | 說明 |
|---|---|---|
| Equal | 0 | 等於 |
| Like | 1 | 模糊查詢（兩端 %） |
| GreaterThan | 2 | 大於 |
| GreaterThanOrEqual | 3 | 大於等於 |
| LessThan | 4 | 小於 |
| LessThanOrEqual | 5 | 小於等於 |
| In | 6 | IN（格式：X,Y,Z，有逗號用 [comma] 替代） |
| NotIn | 7 | NOT IN |
| LikeLeft | 8 | 左模糊（%X） |
| LikeRight | 9 | 右模糊（X%） |
| NoEqual | 10 | 不等於 |
| IsNullOrEmpty | 11 | 為 null 或 '' |
| IsNot | 12 | value 不為 null 時：欄位 <> x；value 為 null 時：欄位 IS NOT NULL |
| NoLike | 13 | NOT LIKE |
| EqualNull | 14 | value 不為 null 時：欄位 = x；value 為 null 時：欄位 IS NULL |
| InLike | 15 | 多值模糊（格式：X,Y,Z → LIKE '%X%' OR LIKE '%Y%' OR LIKE '%Z%'） |
| Range | 16 | 範圍（格式：1,2 → 欄位 >= 1 AND 欄位 <= 2） |
| DateRange | 17 | 日期範圍（5.1.4.200+，格式：yyyy-MM-dd,yyyy-MM-dd） |

Key 運算符：And = 0，Or = 1，null（第一個）= -1

---

## 二、後端手動建構

```csharp
var conModels = new List<IConditionalModel>
{
    new ConditionalModel
    {
        FieldName       = "Id",
        ConditionalType = ConditionalType.Equal,
        FieldValue      = "1"
    },
    new ConditionalModel
    {
        FieldName       = "Name",
        ConditionalType = ConditionalType.Like,
        FieldValue      = "jack"
    }
};

var list = db.Queryable<Order>().Where(conModels).ToList();
// → WHERE Id = 1 AND Name LIKE '%jack%'
```

PgSQL / Oracle 類型不符時需指定 CSharpTypeName：

```csharp
new ConditionalModel
{
    FieldName       = "Id",
    ConditionalType = ConditionalType.Equal,
    FieldValue      = "1",
    CSharpTypeName  = "int"   // 避免類型不符錯誤
}
```

---

## 三、前端 JSON 傳入（最常用）

### 3.1 簡單 JSON（AND 條件）

前端傳入格式：

```json
[
  { "FieldName": "Id",   "ConditionalType": "0", "FieldValue": "1" },
  { "FieldName": "Name", "ConditionalType": "1", "FieldValue": "jack" }
]
```

後端處理：

```csharp
var conModels = db.Utilities.JsonToConditionalModels(json);
var list = db.Queryable<Order>().Where(conModels).ToList();
// → WHERE Id = 1 AND Name LIKE '%jack%'
```

**✅ 實際案例：VxeTable 篩選列傳入條件**

```csharp
[HttpPost("list")]
public PageResult<OrderDto> GetList([FromBody] TableQueryRequest req)
{
    // req.Filters 是前端 VxeTable 傳入的 JSON 字串
    var conModels = db.Utilities.JsonToConditionalModels(req.Filters);

    // 欄位名轉換（前端用屬性名，後端轉成資料庫欄位名）
    foreach (var r in conModels)
        if (r is ConditionalModel cm)
            cm.FieldName = db.EntityMaintenance.GetDbColumnName<Order>(cm.FieldName);

    var total = 0;
    var list = db.Queryable<Order>()
        .Where(conModels)
        .OrderBy(it => it.CreateTime, OrderByType.Desc)
        .ToPageList(req.PageIndex, req.PageSize, ref total);

    return new PageResult<OrderDto> { Data = list, Total = total };
}
```

---

### 3.2 二級 JSON（AND + OR 組合）

```json
[
  { "FieldName": "Name", "ConditionalType": "0", "FieldValue": "jack" },
  {
    "ConditionalList": [
      { "Key": 0, "Value": { "FieldName": "Id", "ConditionalType": "0", "FieldValue": "1" } },
      { "Key": 1, "Value": { "FieldName": "Id", "ConditionalType": "0", "FieldValue": "2" } }
    ]
  }
]
```

生成 SQL：

```sql
WHERE Name = 'jack' AND (Id = 1 OR Id = 2)
```

ConditionalList 第一個 Key 決定整組條件和外層的關係：
- Key = 0 → AND（條件）
- Key = 1 → OR（條件）

---

### 3.3 樹型 JSON（任意層級，最強大）

```json
[{
  "ConditionalList": [
    { "Key": -1, "Value": { "FieldName": "Id",    "ConditionalType": "0", "FieldValue": "2" } },
    { "Key": 0,  "Value": { "FieldName": "Name",  "ConditionalType": "0", "FieldValue": "A" } },
    { "Key": 0,  "Value": {
        "ConditionalList": [
          { "Key": -1, "Value": { "FieldName": "Amount",   "ConditionalType": "2", "FieldValue": "1000" } },
          { "Key": 0,  "Value": { "FieldName": "CustomId", "ConditionalType": "0", "FieldValue": "1"    } }
        ]
    }}
  ]
}]
```

生成 SQL：

```sql
WHERE (Id = 2 AND Name = 'A' AND (Amount > 1000 AND CustomId = 1))
```

---

## 四、多表查詢去別名

多表聯查時，先用 MergeTable 合成單表，條件就不需要加表前綴

```csharp
var conModels = new List<IConditionalModel>
{
    new ConditionalModel
    {
        FieldName       = "CustomerName",
        ConditionalType = ConditionalType.Like,
        FieldValue      = "王"
    }
};

var list = db.Queryable<Order, Customer>((o, c) => new JoinQueryInfos(
        JoinType.Left, o.CustomerId == c.Id))
    .Select((o, c) => new OrderDto
    {
        Id           = o.Id,
        OrderNo      = o.OrderNo,
        CustomerName = c.Name
    })
    .MergeTable()         // 合成單表後，下面 Where 不需要別名
    .Where(conModels)
    .ToList();
```

**✅ 實際案例：出貨單列表，前端可篩選客戶名稱**

```csharp
var conModels = db.Utilities.JsonToConditionalModels(req.Filters);

var list = db.Queryable<Shipment, Customer, Warehouse>(
        (s, c, w) => new JoinQueryInfos(
            JoinType.Left, s.CustomerId  == c.Id,
            JoinType.Left, s.WarehouseId == w.Id))
    .Select((s, c, w) => new ShipmentDto
    {
        ShipmentNo    = s.ShipmentNo,
        CustomerName  = c.Name,
        WarehouseName = w.Name,
        ShipDate      = s.ShipDate,
        Amount        = s.Amount
    })
    .MergeTable()
    .Where(conModels)   // 前端傳入欄位名對應 DTO 屬性名
    .ToList();
```

---

## 五、導航查詢 + 動態條件

```csharp
// 一對一導航過濾
var conModels = new List<IConditionalModel>
{
    new ConditionalModel { FieldName = "Name", ConditionalType = ConditionalType.Like, FieldValue = "北大" }
};

var list = db.Queryable<Student>()
    .Includes(x => x.School)
    .Where(x => SqlFunc.Exists(x.School.Id, conModels))  // 一對一
    .ToList();

// 一對多導航過濾
var list = db.Queryable<Student>()
    .Where(x => x.Books.Any(conModels))  // 一對多
    .ToList();
```

### 導航 + IncludeLeftJoin（11 章新寫法）

```csharp
var conditionals = new List<IConditionalModel>
{
    new ConditionalModel { FieldName = "pnv_Brand.Name", FieldValue = "Sony", ConditionalType = ConditionalType.Equal }
};

var list = db.Queryable<Device>()
    .IncludeLeftJoin(d => d.Brand)   // 一對一導航
    .Where(conditionals)
    .ToList();
// pnv_Brand 是導航屬性 Brand 的別名前綴
```

---

## 六、欄位名驗證與轉換

```csharp
// 轉換：前端傳屬性名 → 轉成資料庫欄位名
foreach (var r in conModels)
    if (r is ConditionalModel cm)
        cm.FieldName = db.EntityMaintenance.GetDbColumnName<Order>(cm.FieldName);

// 驗證：確認欄位是否存在（防止任意傳入）
// 詳見實體管理文件，可自行加上白名單驗證
```

---

## 七、條件轉 SQL 字串（5.1.4.148+）

```csharp
var sql = db.Utilities.ConditionalModelsToSql(new List<IConditionalModel>
{
    new ConditionalModel
    {
        FieldName       = "UserName",
        ConditionalType = ConditionalType.Equal,
        FieldValue      = "admin",
        CSharpTypeName  = "string"
    }
});
// sql = "UserName = @p0"
```

---

## 八、自訂 SQL 條件（5.1.4.100+）

FieldValue 建議在後端定義，避免前端任意傳入造成安全問題

```csharp
if (fieldName == "AmountRange")  // 前端傳入的枚舉值，後端決定對應 SQL
{
    conModels.Add(new ConditionalModel
    {
        FieldName       = UtilMethods.FiledNameSql(),  // GUID 標記，代表 Value 是 SQL
        ConditionalType = ConditionalType.Equal,
        FieldValue      = "Amount > 1000 AND Amount < 9999"  // SQL 在後端定義
    });
}
```

---

## 注意事項

- In 的值格式為 X,Y,Z，若值本身含逗號用 [comma] 替代，例如 x[comma]y,z 表示 IN ('x,y', 'z')
- InLike 值格式同 In，但生成 LIKE '%X%' OR LIKE '%Y%'
- DateRange 格式必須統一，不能混用 yyyy 和 yyyy-MM-dd
- PgSQL / Oracle 對型別嚴格，數字欄位必須設定 CSharpTypeName = "int"
- 多表查詢建議先 MergeTable 去掉別名，方便前端直接傳 DTO 屬性名
- FieldValue 若由前端傳入，列名（FieldName）雖然自動防注入，仍建議加上白名單驗證確保安全
- 自訂 SQL 條件（UtilMethods.FiledNameSql）的 FieldValue 建議由後端控制，不要讓前端直接傳 SQL
