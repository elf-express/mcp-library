# SqlSugar vs EF Core 效能測試範例(SQL Server 版)

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc) ｜ 原始碼:[SqlSugar GitHub](https://github.com/DotNetNext/SqlSugar)
> 📁 對應專案資料夾:`SqlSugar-vs-EFCore效能測試-SqlServer版/ORMTEST`

[//]: # (sqlsugar-cheatsheet)
## 速查表

| 項目 | 內容 |
|---|---|
| 目的 | 同一組 CRUD 比較 SqlSugar 與 EF Core 的執行時間 |
| 資料庫 | SQL Server |
| 框架 | .NET Core 3.1 |
| 套件 | SqlSugarCore 5.0.4.2、EFCore 5.0.8、SyntacticSugar 2.4.1 |
| 測項 | GetAll、GetById、GetByPage、Insert、InsertList(100/1000) |
| 計時工具 | SyntacticSugar.PerformanceTest(PerHelper.Execute) |
| 公平前提 | Release 模式啟動、分開測試、每次測前 GC.Collect |
| 入口 | ORMTEST/Program.cs 的 Main |

---

## 一、這個範例在做什麼

用同一張表 `Test`(約 10 萬筆)跑相同的查詢/寫入,分別用 **SqlSugar** 和 **EF Core** 各執行多次,
印出各自耗時,直接比較兩個 ORM 在 SQL Server 上的效能。

## 二、技術環境

- 目標框架:`netcoreapp3.1`
- ORM:`SqlSugarCore 5.0.4.2`、`Microsoft.EntityFrameworkCore(.SqlServer) 5.0.8`
- 計時:`SyntacticSugar 2.4.1` 的 `PerformanceTest`

## 三、專案結構

```
ORMTEST/
├── Program.cs              // 入口:初始化資料 + 依序跑各測項
├── Config.cs               // 連線字串與 SqlSugar 設定
├── Common/
│   ├── OrmType.cs          // enum:SqlSugar / EF / FREE
│   └── PerHelper.cs        // 計時包裝(執行 N 次並印出耗時)
├── Models/
│   └── TestEntity.cs       // Test 實體、SqlSugarContext、EFContext
└── TestItems/
    ├── TestGetAll.cs
    ├── TestGetById.cs
    ├── TestGetByPage.cs
    ├── TestInsert.cs
    ├── TestInsertList.cs
    └── TestInsertList1000.cs
```

## 四、關鍵程式碼

### 4.1 連線設定(Config.cs)

```csharp
public static string connectionString =
    "server=.;uid=sa;pwd=sasa;database=SqlSugarTest3";

public static ConnectionConfig SugarConfig = new ConnectionConfig() {
    IsAutoCloseConnection = true,
    InitKeyType = InitKeyType.Attribute,
    ConnectionString = connectionString,
    DbType = DbType.SqlServer
};
```

### 4.2 兩個 Context(Models/TestEntity.cs)

```csharp
// SqlSugar:單例 Db
public static SqlSugarClient Db = new SqlSugarClient(new ConnectionConfig() {
    DbType = DbType.SqlServer,
    ConnectionString = Config.connectionString,
    IsAutoCloseConnection = true
});

// EF Core
public class EFContext : DbContext {
    public DbSet<Test> Test { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlServer(Config.connectionString);
}
```

### 4.3 一個測項的標準寫法(TestGetAll.cs)

```csharp
// 每個測項都先 GC.Collect() 再計時,避免互相干擾
private void SqlSugarTest(int eachCount) {
    GC.Collect();
    PerHelper.Execute(eachCount, "SqlSugar", () => {
        var list = SqlSugarContext.Db.Queryable<Test>().ToList();
    });
}
private void EFTest(int eachCount) {
    GC.Collect();
    PerHelper.Execute(eachCount, "EFCore", () => {
        using (var conn = new EFContext()) {
            var list = conn.Test.ToList();
        }
    });
}
```

### 4.4 計時包裝(PerHelper.cs)

```csharp
public static void Execute(int count, string title, Action fun) {
    var pt = new SyntacticSugar.PerformanceTest();
    pt.SetCount(count);                 // 執行 count 次
    pt.Execute(i => fun(),
        res => Console.WriteLine($"執行{count}次，{title}{res}"));
}
```

### 4.5 初始化資料(Program.cs / InitData)

```csharp
var conn = Config.GetSugarConn();
conn.CurrentConnectionConfig.InitKeyType = InitKeyType.Attribute;
conn.DbMaintenance.CreateDatabase();        // 自動建庫
conn.CodeFirst.InitTables<Test>();          // 自動建表
// 不足 10 萬筆才補資料,最後用 ExecuteBulkCopy 大量寫入
conn.Insertable(test).UseSqlServer().ExecuteBulkCopy();
```

## 五、如何執行

1. 改 `Config.cs` 的 `connectionString` 指向你的 SQL Server(需 sa 等有建庫權限帳號)。
2. **用 Release 模式**啟動(Debug 下 EF/驅動會偏慢,不公平)。
3. 執行 `Program.cs`,首次會自動建庫建表並灌約 10 萬筆資料。
4. Console 會依序印出各測項 SqlSugar / EFCore 的耗時。

## 六、注意事項

- 一定要 **Release 模式**、分開測試,且每次測前 `GC.Collect()`,結果才有參考價值。
- 此版 EF 查詢為**預設追蹤(tracking)**;MySQL 版改用 `AsNoTracking()` 較貼近純讀取比較。
- 連線字串內含明碼帳密,僅供本機測試,勿提交到正式環境。
