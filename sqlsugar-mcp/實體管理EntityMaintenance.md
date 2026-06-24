# SqlSugar — 實體管理（EntityMaintenance）筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=1202)

## 功能說明

`db.EntityMaintenance` 讓你在執行期（Runtime）取得 C# 實體類別的資料庫映射資訊，
例如：對應的資料表名、欄位名、主鍵、備註等。

**常見用途：**
- 通用 CRUD 框架、低程式碼平台動態取得欄位資訊
- 程式碼生成器取得實體與 DB 的對應關係
- 審計日誌取得欄位顯示名（ColumnDescription）

---

## 方法速查

| 方法名 | 說明 | 回傳 |
|---|---|---|
| GetEntityInfoNoCache(type) | 取得實體資訊（**推薦**，副本不影響 ORM）| EntityInfo |
| GetEntityInfo(type) | 取得實體資訊（共用 ORM 快取，慎用）| EntityInfo |
| GetTableName(type) | 從實體型別取得資料表名 | string |
| GetEntityName(type) | 取得實體名稱（C# 類名）| string |
| GetDbColumnName(type, propertyName) | 取得屬性對應的資料庫欄位名 | string |
| GetProperty(type, columnName) | 取得對應欄位的屬性資訊 | PropertyInfo |

**重要：優先使用 `GetEntityInfoNoCache`，回傳的是副本，不會影響 ORM 內部共用快取。**

---

## 一、取得實體完整資訊

```csharp
// 取得實體資訊（推薦 NoCache）
var entityInfo = db.EntityMaintenance.GetEntityInfoNoCache(typeof(Order));

// 表名（含 Schema，如 dbo.Order）
Console.WriteLine(entityInfo.DbTableName);

// 實體類名
Console.WriteLine(entityInfo.EntityName);

// 逐一列出所有欄位資訊
foreach (var col in entityInfo.Columns)
{
    Console.WriteLine($"屬性名：{col.PropertyName}");
    Console.WriteLine($"DB欄位名：{col.DbColumnName}");
    Console.WriteLine($"DB型別：{col.DataType}");
    Console.WriteLine($"主鍵：{col.IsPrimarykey}");
    Console.WriteLine($"自增：{col.IsIdentity}");
    Console.WriteLine($"可空：{col.IsNullable}");
    Console.WriteLine($"備註：{col.ColumnDescription}");
    Console.WriteLine($"忽略：{col.IsIgnore}");
    Console.WriteLine($"JSON欄位：{col.IsJson}");
    Console.WriteLine("---");
}
```

---

## 二、常用快捷方法

```csharp
// 取得資料表名
string tableName = db.EntityMaintenance.GetTableName(typeof(Order));
// → "Order" 或 "dbo.Order"（取決於 SugarTable 特性設定）

// 取得實體名稱
string entityName = db.EntityMaintenance.GetEntityName(typeof(Order));
// → "Order"

// 取得屬性對應的 DB 欄位名
string colName = db.EntityMaintenance.GetDbColumnName(typeof(Order), nameof(Order.OrderNo));
// → "OrderNo"（或對應的資料庫欄位名，如有 ColumnName 特性則取特性值）

// 取得欄位對應的屬性資訊
PropertyInfo prop = db.EntityMaintenance.GetProperty(typeof(Order), "OrderNo");
Console.WriteLine(prop.PropertyType.Name);  // → "String"
```

---

## 三、實際應用案例

### 3.1 動態取得所有欄位做為下拉選項

```csharp
[HttpGet("entity/columns/{entityName}")]
public ApiResult GetEntityColumns(string entityName)
{
    // 根據名稱找到對應的 Type
    var type = AppDomain.CurrentDomain.GetAssemblies()
        .SelectMany(a => a.GetTypes())
        .FirstOrDefault(t => t.Name == entityName);

    if (type == null) return ApiResult.Fail("找不到實體");

    var entityInfo = db.EntityMaintenance.GetEntityInfoNoCache(type);

    var columns = entityInfo.Columns
        .Where(c => !c.IsIgnore)
        .Select(c => new
        {
            value = c.DbColumnName,
            label = string.IsNullOrEmpty(c.ColumnDescription)
                    ? c.DbColumnName
                    : c.ColumnDescription,
            c.IsPrimarykey,
            c.IsNullable,
            c.DataType
        });

    return ApiResult.Success(columns);
}
```

### 3.2 審計日誌顯示欄位中文名

```csharp
public string GetColumnLabel(Type entityType, string propertyName)
{
    var entityInfo = db.EntityMaintenance.GetEntityInfoNoCache(entityType);
    var col = entityInfo.Columns.FirstOrDefault(c => c.PropertyName == propertyName);

    return col?.ColumnDescription ?? propertyName;
    // 優先用 ColumnDescription（中文備註），沒有則用屬性名
}

// 使用
string label = GetColumnLabel(typeof(Order), nameof(Order.Amount));
// → "金額"（如果 SugarColumn 設有 ColumnDescription = "金額"）
```

### 3.3 通用匯出標頭行

```csharp
public List<string> GetExportHeaders<T>()
{
    var entityInfo = db.EntityMaintenance.GetEntityInfoNoCache(typeof(T));
    return entityInfo.Columns
        .Where(c => !c.IsIgnore && !c.IsPrimarykey)
        .Select(c => c.ColumnDescription ?? c.DbColumnName)
        .ToList();
}

// 使用
var headers = GetExportHeaders<Order>();
// → ["訂單編號", "客戶名稱", "金額", "建立時間", ...]
```

---

## EntityInfo 常用屬性

| 屬性 | 說明 |
|---|---|
| DbTableName | 資料庫表名（含 Schema）|
| EntityName | C# 類名 |
| Columns | 所有欄位資訊集合 List\<EntityColumnInfo\> |

## EntityColumnInfo 常用屬性

| 屬性 | 說明 |
|---|---|
| PropertyName | C# 屬性名 |
| DbColumnName | 資料庫欄位名 |
| DataType | 資料庫型別字串 |
| IsPrimarykey | 是否主鍵 |
| IsIdentity | 是否自增 |
| IsNullable | 是否可空 |
| IsIgnore | 是否被 ORM 忽略 |
| IsJson | 是否 JSON 欄位 |
| ColumnDescription | 欄位備註（ColumnDescription 特性值）|
| Length | 欄位長度 |
| DecimalDigits | 精度（小數位數）|

---

## 注意事項

- 優先使用 `GetEntityInfoNoCache`，它返回副本，修改不影響 ORM 內部快取
- `GetEntityInfo` 返回的是共用快取物件，直接修改可能造成 ORM 行為異常
- `GetTableName` 取得的表名包含 SugarTable 特性設定的 Schema 前綴（如 `dbo.Order`）
- `GetDbColumnName` 取得的是 DB 欄位名，若有設定 `ColumnName` 特性則取特性值，否則取屬性名
