# SqlSugar — 庫表管理（DbMaintenance）筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=1203)

## 功能說明

`db.DbMaintenance` 提供資料庫層級的管理操作：查表結構、建表、改表、建索引、備份庫等。
需要資料庫帳號具備管理員級別權限。

---

## 速查表（完整方法列表）

| 方法 | 說明 | 回傳 |
|---|---|---|
| GetDataBaseList() | 取得所有資料庫名稱 | List\<string\> |
| GetTableInfoList(isCache) | 取得所有資料表資訊 | List\<DbTableInfo\> |
| GetViewInfoList() | 查詢所有視圖 | List\<DbTableInfo\> |
| GetColumnInfosByTableName(表名, isCache) | 取得指定表的欄位資訊 | List\<DbColumnInfo\> |
| GetIsIdentities(表名) | 取得自增欄位 | List\<string\> |
| GetPrimaries(表名) | 取得主鍵欄位 | List\<string\> |
| GetProcList() | 取得預存程序名稱集合 | List\<string\> |
| GetFuncList() | 取得函數名稱集合 | List\<string\> |
| GetIndexList() | 取得所有索引名稱集合 | List\<string\> |
| GetTriggerNames(表名) | 根據表名取得觸發器集合（5.1.4.106+）| List\<string\> |
| GetDbTypes() | 取得資料庫型別集合（5.1.4.106+）| List\<string\> |
| IsAnyTable(表名, isCache) | 資料表是否存在 | bool |
| IsAnyColumn(表名, 欄位名) | 欄位是否存在 | bool |
| IsPrimaryKey(表名, 欄位名) | 主鍵是否存在 | bool |
| IsIdentity(表名, 欄位名) | 自增是否存在 | bool |
| IsAnyConstraint(表名, 約束名) | 約束是否存在 | bool |
| IsAnyIndex(表名, 索引名) | 索引是否存在 | bool |
| IsAnyTableRemark(表名) | 資料表備註是否存在 | bool |
| CreateTable(…) | 建表（搭配 CodeFirst 使用）| bool |
| AddColumn(表名, 欄位) | 新增欄位 | bool |
| UpdateColumn(表名, 欄位) | 更新欄位 | bool |
| AddPrimaryKey(表名, 欄位名) | 新增主鍵 | bool |
| DropConstraint(表名, 約束名) | 刪除約束 | bool |
| DropColumn(表名, 欄位名) | 刪除欄位 | bool |
| DropTable(表名) | 刪除資料表 | bool |
| TruncateTable\<T\>() | 清空資料表並重置自增 | bool |
| RenameColumn(表名, 舊名, 新名) | 重命名欄位 | bool |
| RenameTable(舊名, 新名) | 重命名資料表 | bool |
| AddDefaultValue(表名, 欄位名, 預設值) | 新增欄位預設值 | bool |
| AddTableRemark(表名, 備註) | 新增資料表備註 | bool |
| DeleteTableRemark(表名) | 刪除資料表備註 | bool |
| AddColumnRemark(欄位名, 表名, 備註) | 新增欄位備註 | bool |
| DeleteColumnRemark(欄位名, 表名) | 刪除欄位備註 | bool |
| CreateIndex(表名, 欄位[], isUnique) | 建立索引（普通 / 唯一）| bool |
| CreateView(…) | 建立視圖（5.1.4.106+）| bool |
| DropView(視圖名) | 刪除視圖（5.1.4.106+）| bool |
| DropFunc(函數名) | 刪除函數（5.1.4.106+）| bool |
| DropProc(預存程序名) | 刪除預存程序（5.1.4.106+）| bool |
| BackupDataBase(庫名, 路徑) | 備份資料庫 | bool |
| BackupTable(表名, 備份表名) | 備份資料表 | bool |

---

## 一、查詢資料庫 / 表 / 欄位資訊

```csharp
// 取得所有資料表（不走快取，確保最新）
var tables = db.DbMaintenance.GetTableInfoList(false);
foreach (var table in tables)
{
    Console.WriteLine($"表名：{table.Name}，備註：{table.Description}");
}

// 取得指定表的所有欄位
var columns = db.DbMaintenance.GetColumnInfosByTableName("Order", false);
foreach (var col in columns)
{
    Console.WriteLine($"{col.DbColumnName} | {col.DataType} | " +
                      $"主鍵:{col.IsPrimarykey} | 可空:{col.IsNullable} | " +
                      $"備註:{col.ColumnDescription}");
}

// 判斷表 / 欄位是否存在
bool tableExists  = db.DbMaintenance.IsAnyTable("Order", false);
bool columnExists = db.DbMaintenance.IsAnyColumn("Order", "Amount");
bool indexExists  = db.DbMaintenance.IsAnyIndex("Order", "IX_Order_No");

// 取得所有資料庫
var databases = db.DbMaintenance.GetDataBaseList();

// 取得所有視圖
var views = db.DbMaintenance.GetViewInfoList();

// 取得主鍵 / 自增欄位
var primaryKeys = db.DbMaintenance.GetPrimaries("Order");
var identities  = db.DbMaintenance.GetIsIdentities("Order");
```

**✅ 實際案例：低程式碼平台 Schema 瀏覽器**

```csharp
[HttpGet("schema/tables")]
public ApiResult GetTables()
{
    var tables = db.DbMaintenance.GetTableInfoList(true);  // 走快取
    return ApiResult.Success(tables.Select(t => new
    {
        t.Name,
        t.Description
    }));
}

[HttpGet("schema/columns/{tableName}")]
public ApiResult GetColumns(string tableName)
{
    var cols = db.DbMaintenance.GetColumnInfosByTableName(tableName, true);
    return ApiResult.Success(cols.Select(c => new
    {
        c.DbColumnName,
        c.DataType,
        c.Length,
        c.IsPrimarykey,
        c.IsNullable,
        c.ColumnDescription
    }));
}
```

---

## 二、自訂過濾取得表 / 欄位（5.1.4.151+）

```csharp
// 只取得 Order 開頭的表（重寫內部 SQL 局部）
var tables = db.DbMaintenance.GetTableInfoList((dbType, sql) =>
{
    if (dbType == DbType.SqlServer)
        return sql.Replace("需要替換的部分", "替換後的部分");
    return sql;
});

// 欄位資訊也支援同樣方式
var cols = db.DbMaintenance.GetColumnInfosByTableName("Order", (dbType, sql) =>
{
    if (dbType == DbType.SqlServer)
        return sql + " AND ...";
    return sql;
});
```

---

## 三、建立 / 刪除索引

```csharp
// 建立普通索引
db.DbMaintenance.CreateIndex("Order", new[] { "CustomerId" });

// 建立唯一索引（isUnique = true）
db.DbMaintenance.CreateIndex("Order", new[] { "OrderNo" }, isUnique: true);

// 自訂索引名
db.DbMaintenance.CreateIndex("Order", new[] { "CustomerId", "Status" },
    "IX_Order_Cust_Status", isUnique: false);

// 索引是否存在
bool exists = db.DbMaintenance.IsAnyIndex("Order", "IX_Order_No");
```

---

## 四、建立視圖

```csharp
// 方式一：從無實體查詢產生 SQL 後手動建立
var sql  = db.Queryable<object>().AS("Order", "o")
              .AddJoinInfo("Customer", "c", "c.Id = o.CustomerId", JoinType.Left)
              .Select("o.*, c.Name AS CustomerName")
              .ToSqlString();
db.Ado.ExecuteCommand($"CREATE VIEW vw_OrderCustomer AS\r\n{sql}");

// 方式二：透過 Type 建立視圖（自動判斷是否已存在）
db.QueryableByObject(typeof(Order)).CreateView("vw_{0}");

// 刪除視圖
db.DbMaintenance.DropView("vw_OrderCustomer");
```

---

## 五、預存程序 / 函數管理

```csharp
// 取得所有預存程序名稱
var procs = db.DbMaintenance.GetProcList();

// 建立 / 修改預存程序（用 Ado 執行 DDL）
db.Ado.ExecuteCommand(@"
    CREATE OR ALTER PROCEDURE sp_GetOrders
    @CustomerId INT
    AS
    SELECT * FROM [Order] WHERE CustomerId = @CustomerId");

// 刪除預存程序
db.DbMaintenance.DropProc("sp_GetOrders");

// 取得所有函數名稱
var funcs = db.DbMaintenance.GetFuncList();

// 刪除函數
db.DbMaintenance.DropFunc("fn_GetTotal");
```

---

## 六、備份資料庫

```csharp
// SqlServer（服務器路徑）
db.DbMaintenance.BackupDataBase(
    db.Ado.Connection.Database,
    @"D:\Backup\AIRSET_" + DateTime.Now.ToString("yyyyMMdd") + ".bak");

// Sqlite（.NET Core 才支援）
db.DbMaintenance.BackupDataBase(null, "backup.db");

// MySQL（.NET Core 才支援）
db.DbMaintenance.BackupDataBase(db.Ado.Connection.Database, @"C:\backup.sql");
```

---

## 七、快取說明

查詢方法（GetTableInfoList / GetColumnInfosByTableName / IsAnyTable 等）都有 `isCache` 參數：

- `false`：每次向資料庫查詢，確保資料是最新的（推薦開發 / 動態場景）
- `true`：走 SqlSugar 內建快取，效能好，適合結構不常變的生產環境

---

## 注意事項

- 操作需要資料庫帳號具備較高權限（CREATE、ALTER、DROP 等）
- DropTable / TruncateTable 是不可逆操作，執行前務必確認
- SqlServer 備份路徑是**服務器本機路徑**，不是客戶端路徑
- GetFuncList 會取得所有函數，包含系統函數，建議命名時加固定前綴（如 `fn_`）以便過濾
