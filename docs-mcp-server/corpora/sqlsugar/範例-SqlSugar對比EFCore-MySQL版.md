# SqlSugar vs EF Core 效能測試範例(MySQL 版)

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc) ｜ 原始碼:[SqlSugar GitHub](https://github.com/DotNetNext/SqlSugar)
> 📁 對應專案資料夾:`SqlSugar-vs-EFCore效能測試-MySQL版/ORMTEST`

[//]: # (sqlsugar-cheatsheet)
## 速查表

| 項目 | 內容 |
|---|---|
| 目的 | 同一組 CRUD 比較 SqlSugar 與 EF Core 的執行時間 |
| 資料庫 | MySQL |
| 框架 | .NET 5 |
| 套件 | SqlSugarCore 5.1.3.40、EFCore + Pomelo.MySql 5.0.0、MySql.Data 8.0.27 |
| 測項 | GetAll、GetById、GetByPage、Insert、InsertList(100/1000) |
| EF 查詢 | 用 `AsNoTracking()`(關閉追蹤,較公平) |
| 初始化 | `Fastest<Test>().BulkCopy(test)` 大量寫入 |
| 與 SqlServer 版差別 | 資料庫/驅動、框架版本、EF 加 AsNoTracking |

---

## 一、這個範例在做什麼

和 SQL Server 版同樣的測試(GetAll/GetById/分頁/Insert/批次),但跑在 **MySQL** 上,
並把 EF 查詢改成 **`AsNoTracking()`**,讓兩邊都是「純讀取不追蹤」的對等比較。

## 二、技術環境

- 目標框架:`net5.0`
- ORM:`SqlSugarCore 5.1.3.40`、`Pomelo.EntityFrameworkCore.MySql 5.0.0`、`MySql.Data 8.0.27`

## 三、與 SQL Server 版的關鍵差異

| 項目 | SQL Server 版 | MySQL 版 |
|---|---|---|
| 目標框架 | netcoreapp3.1 | net5.0 |
| SqlSugarCore | 5.0.4.2 | 5.1.3.40 |
| EF Provider | EFCore.SqlServer 5.0.8 | Pomelo.MySql 5.0.0 |
| DbType | `DbType.SqlServer` | `DbType.MySql` |
| EF 連線 | `UseSqlServer(...)` | `UseMySql(..., ServerVersion.AutoDetect(...))` |
| EF 查詢 | 預設追蹤 | `AsNoTracking()` |
| 初始化寫入 | `ExecuteBulkCopy()` | `Fastest<Test>().BulkCopy(test)` |

## 四、關鍵程式碼

### 4.1 SqlSugar 設定改 MySQL(Models/TestEntity.cs)

```csharp
public static SqlSugarClient Db = new SqlSugarClient(new ConnectionConfig() {
    DbType = DbType.MySql,                       // ← 改這裡
    ConnectionString = Config.connectionString,
    IsAutoCloseConnection = true
});
```

### 4.2 EF 改 MySQL + AsNoTracking

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder options)
    => options.UseMySql(Config.connectionString,
                        ServerVersion.AutoDetect(Config.connectionString), null);

// 分頁測項:EF 用 AsNoTracking 較貼近純讀取
var list = conn.Test.AsNoTracking().Skip(10).Take(10).ToList();
```

### 4.3 SqlSugar 高速批次初始化(Program.cs)

```csharp
conn.Fastest<Test>().BulkCopy(test);   // 大量插入,比逐筆快很多
```

## 五、如何執行

1. 改 `Config.cs` 連線字串指向你的 MySQL。
2. **Release 模式**啟動。
3. 執行 `Program.cs`,首次自動建庫建表並用 BulkCopy 灌資料。
4. Console 印出各測項 SqlSugar / EFCore 的耗時。

## 六、注意事項

- 一樣要 Release 模式、分開測、測前 GC.Collect。
- `AsNoTracking()` 讓 EF 不建立變更追蹤,讀取比較才對等;若要測「查出來還要改」的場景則不該加。
- 連線字串含明碼帳密,僅供本機測試。
