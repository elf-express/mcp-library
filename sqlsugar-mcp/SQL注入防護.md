# SqlSugar — SQL 注入防護筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=2409)


[//]: # (sqlsugar-cheatsheet)
## 速查表

| 需求 | 語法 |
|---|---|
| 五大原則 | 欄位名走白名單、值一律參數化、優先用 Lambda |
| OrderBy 防注入 | 欄位名做白名單對映,勿直接拼前端字串 |
| 表格動態查詢 | WhereDynamicFilter + 欄位白名單 |
| 參數化手寫 SQL | db.Ado.SqlQuery("... @p", new{p=value}) |
| Lambda(最安全) | db.Queryable<T>().Where(it=>it.X==v) |
| 動態條件 | ConditionalModel / Utilities.JsonToConditionalModels |
| 欄位名映射 | SqlFunc.MappingColumn |
| SQL 過濾 | db.Aop.OnExecutingChangeSql / ToSqlFilter |

---

## 核心原則

**按照文件範例寫的所有操作都是防注入的。**
唯一需要特別注意的是：**手寫 SQL + 從前端傳入的參數**。

---

## 一、五大安全規則

| 情況 | 防護狀態 | 說明 |
|---|---|---|
| 增刪改（Insertable / Updateable / Deleteable）| ✅ 天然安全 | 不用 SQL 寫就不用考慮注入 |
| 查詢用 Lambda 表達式 | ✅ 天然安全 | 表達式無法從前端傳入 |
| 手寫 SQL + 外部參數化 | ✅ 安全 | @p 參數化後安全 |
| 手寫 SQL + 外部字串拼接 | ❌ **危險** | 需用 ToSqlFilter() 或白名單驗證 |
| SqlFunc.MappingColumn(sql) | ❌ **禁止前端傳入** | 只能內部使用 |

---

## 二、OrderBy 防注入

前端傳入排序欄位名是最常見的注入點之一。

```csharp
// ✅ 方法一：用實體屬性名驗證（白名單，屬性不存在就報錯）
string orderField = Request.Query["orderField"];  // 前端傳入的欄位名
var dbColumnName = db.EntityMaintenance
    .GetDbColumnName<Order>(orderField);  // 不存在會拋例外，天然白名單
var list = db.Queryable<Order>()
    .OrderBy(dbColumnName + " DESC")
    .ToList();

// ✅ 方法二：ToSqlFilter() 過濾（原理同參數化，將 ' 轉成 ''）
string sortParam = Request.Query["sort"];  // 前端傳入
var list = db.Queryable<Order>()
    .OrderBy(sortParam.ToSqlFilter())     // 安全過濾
    .ToList();

// ✅ 方法三：白名單字典（最嚴格，推薦低程式碼平台）
var allowedSortFields = new Dictionary<string, string>
{
    ["name"]       = "[Name]",
    ["createtime"] = "[CreateTime]",
    ["amount"]     = "[Amount]"
};

string sortKey = Request.Query["sort"]?.ToLower() ?? "createtime";
string sortCol = allowedSortFields.ContainsKey(sortKey)
    ? allowedSortFields[sortKey]
    : "[CreateTime]";  // 預設排序欄位

var list = db.Queryable<Order>()
    .OrderBy($"{sortCol} DESC")
    .ToList();
```

---

## 三、Where 防注入

動態 Where 條件是 90% 以上注入攻擊的入口。

### 3.1 表格查詢（WhereDynamicFilter，前端傳欄位名+值時用）

```csharp
// 前端傳入條件物件，WhereDynamicFilter 內部做嚴格驗證
var queryFilter = new WhereDynamicFilterInfo
{
    FilterType = FilterTypeConst.And,
    Filters = new List<WhereDynamicFilterInfo>
    {
        new WhereDynamicFilterInfo
        {
            FieldName       = "Status",        // 欄位名（ORM 會驗證）
            ConditionalType = ConditionalType.Equal,
            FieldValue      = "1"
        }
    }
};

var list = db.Queryable<Order>()
    .Where(queryFilter)
    .ToList();

// 詳見：表格查詢 WhereDynamicFilter.md
```

### 3.2 參數化（手寫 SQL + 外部值）

```csharp
// ✅ 安全：值透過 @p 參數化
string userInput = Request.Query["keyword"];
var list = db.Queryable<Order>()
    .Where("Name LIKE @keyword", new { keyword = "%" + userInput + "%" })
    .ToList();
// → WHERE Name LIKE @keyword   （@keyword = '%使用者輸入%'）

// ✅ 安全：SugarParameter 方式
var list2 = db.Ado.SqlQuery<Order>(
    "SELECT * FROM [Order] WHERE Name LIKE @keyword",
    new SugarParameter("@keyword", "%" + userInput + "%"));

// ❌ 危險：直接字串拼接
var list3 = db.Queryable<Order>()
    .Where($"Name LIKE '%{userInput}%'")  // 注入風險！
    .ToList();
```

### 3.3 Lambda 表達式（最安全，推薦）

```csharp
// ✅ 完全安全：Lambda 表達式無法從前端傳入
string keyword = Request.Query["keyword"];
var list = db.Queryable<Order>()
    .Where(it => it.Name.Contains(keyword))  // ORM 自動參數化
    .ToList();
// → WHERE Name LIKE @p0   （自動參數化）

int statusId = int.Parse(Request.Query["status"] ?? "1");
var list2 = db.Queryable<Order>()
    .Where(it => it.Status == statusId)
    .ToList();
```

### 3.4 ConditionalModel 動態條件（多條件組合）

```csharp
// ✅ 安全：ConditionalModel 內部做了嚴格驗證
var conditions = new List<IConditionalModel>
{
    new ConditionalModel
    {
        FieldName       = "Status",
        ConditionalType = ConditionalType.Equal,
        FieldValue      = "1",
        CSharpTypeName  = "int"
    },
    new ConditionalModel
    {
        FieldName       = "Name",
        ConditionalType = ConditionalType.Like,
        FieldValue      = keyword
    }
};

var list = db.Queryable<Order>().Where(conditions).ToList();
```

---

## 四、低程式碼平台防注入策略

低程式碼平台的查詢條件來自前端，需要特別謹慎：

```csharp
[HttpPost("query")]
public async Task<IActionResult> Query([FromBody] QueryRequest request)
{
    // 1. 資料表白名單驗證
    var allowedTables = new HashSet<string>
        { "Order", "Customer", "OrderItem", "Invoice" };
    if (!allowedTables.Contains(request.TableName))
        return BadRequest("不允許的資料表");

    // 2. 欄位名驗證（用 EntityMaintenance 驗證屬性名是否存在）
    //    WhereDynamicFilter 內部已有欄位驗證，直接用即可
    var list = await db.Queryable<object>()
        .AS(request.TableName)
        .Where(request.Filters)       // WhereDynamicFilter 安全
        .OrderBy(GetSafeOrderBy(request.TableName, request.Sort))  // 白名單排序
        .ToListAsync();

    return Ok(list);
}

private string GetSafeOrderBy(string tableName, string sortField)
{
    // 從實體取得合法 DB 欄位名（白名單驗證）
    try
    {
        var type = Assembly.GetExecutingAssembly().GetTypes()
            .FirstOrDefault(t => t.Name == tableName);
        if (type == null) return "Id DESC";

        var colName = db.EntityMaintenance.GetDbColumnName(type, sortField);
        return $"{colName} DESC";
    }
    catch
    {
        return "Id DESC";  // 驗證失敗給預設值
    }
}
```

---

## 五、ToSqlFilter 使用

```csharp
// ToSqlFilter() 將危險字元（如單引號）轉義，原理同參數化
string userInput = "jack'; DROP TABLE Order; --";  // 注入攻擊字串

// ✅ 安全：ToSqlFilter 轉義後
var safe = userInput.ToSqlFilter();
// → "jack''; DROP TABLE Order; --"  （' 變成 ''，攻擊失效）

db.Queryable<Order>().OrderBy(safe).ToList();

// 適用場景：OrderBy 欄位名 / 無法參數化的 SQL 片段
```

---

## 六、總結

```
✅ 天然安全（無需額外處理）：
  - db.Insertable / Updateable / Deleteable（實體操作）
  - db.Queryable<T>().Where(it => it.xxx == value)（Lambda 表達式）

✅ 需要正確使用（按文件寫就安全）：
  - 手寫 SQL 用 @p 參數化：.Where("Name=@n", new { n = userInput })
  - 排序欄位用 GetDbColumnName 或 ToSqlFilter 驗證
  - 前端傳條件用 WhereDynamicFilter 或 ConditionalModel

❌ 禁止：
  - SQL 字串直接拼接前端輸入：.Where($"Name='{userInput}'")
  - SqlFunc.MappingColumn 接受前端傳入的 SQL 片段
```

---

## 注意事項

- ORM 的 Lambda 表達式和 Entity 操作天然防注入，是最佳選擇
- 只有手寫 SQL 字串時才需要擔心注入問題
- OrderBy 從前端傳欄位名，優先用 `GetDbColumnName` 做白名單驗證
- 低程式碼平台前端傳條件一定要透過 `WhereDynamicFilter` 或 `ConditionalModel`，不能直接拼 SQL
- `ToSqlFilter()` 是最後手段，能用參數化就用參數化
