# SqlSugar — 擴展 SqlFunc 函數筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=1225)

## 使用場景

- SqlSugar 內建的 SqlFunc 無法滿足需求時
- 資料庫有特殊的自訂函數需要在 Lambda 中使用
- 需要跨資料庫相容的函數封裝

---

## 速查表

| 方法 | 說明 | 跨庫相容 |
|---|---|---|
| SqlFuncExternal（方式一）| 正式擴展，設定 MethodValue 實作各資料庫邏輯 | 支援 |
| SqlFunc.MappingColumn\<T\>("SQL") | 快速嵌入原生 SQL 片段 | 不保證 |
| .Where("SQL 字串") | 整段 Where 直接寫 SQL | 不保證 |

---

## 一、方式一：正式擴展（支援跨庫相容）

設定麻煩但維護方便，適合共用函數或需要跨資料庫的場景。

### 步驟

1. 定義靜態方法（本體不實作，只是讓 Lambda 認識它）
2. 在 ConnectionConfig 中設定 SqlFuncExternal 解析邏輯
3. 在 Lambda 中正常呼叫

### 完整範例

```csharp
// Step 1：定義靜態方法（不能有任何實作）
public static string MyToString<T>(T value)
{
    throw new NotSupportedException("只能在表達式中使用");
}

// Step 2：建立 db 時設定解析邏輯
public static SqlSugarClient GetDb()
{
    var expMethods = new List<SqlFuncExternal>
    {
        new SqlFuncExternal
        {
            UniqueMethodName = "MyToString",
            MethodValue = (expInfo, dbType, expContext) =>
            {
                if (dbType == DbType.SqlServer)
                    return $"CAST({expInfo.Args[0].MemberName} AS VARCHAR(MAX))";
                else if (dbType == DbType.MySql)
                    return $"CAST({expInfo.Args[0].MemberName} AS CHAR)";
                else
                    throw new Exception("此資料庫尚未實作");
            }
        }
    };

    return new SqlSugarClient(new ConnectionConfig
    {
        ConnectionString      = Config.ConnectionString,
        DbType                = DbType.SqlServer,
        IsAutoCloseConnection = true,
        ConfigureExternalServices = new ConfigureExternalServices
        {
            SqlFuncServices = expMethods  // 注入擴展方法
        }
    });
}

// Step 3：在 Lambda 中使用（和 SqlFunc 一樣）
var list = db.Queryable<Student>()
    .Where(it => MyToString(it.Id) == "1302583")
    .ToList();
// → WHERE CAST([Id] AS VARCHAR(MAX)) = @p0
```

**✅ 實際案例：封裝台灣常用的 ROC 日期轉換函數**

```csharp
// 民國年轉換函數（MSSQL 專用）
public static string ToRocDate(DateTime date)
{
    throw new NotSupportedException("只能在表達式中使用");
}

// 設定解析
new SqlFuncExternal
{
    UniqueMethodName = "ToRocDate",
    MethodValue = (expInfo, dbType, expContext) =>
    {
        if (dbType == DbType.SqlServer)
        {
            var field = expInfo.Args[0].MemberName;
            // 年份 - 1911 + 月日
            return $"CAST(YEAR({field})-1911 AS VARCHAR) + '/' + " +
                   $"RIGHT('0'+CAST(MONTH({field}) AS VARCHAR),2) + '/' + " +
                   $"RIGHT('0'+CAST(DAY({field}) AS VARCHAR),2)";
        }
        throw new Exception("未實作");
    }
}

// 使用
var list = db.Queryable<Invoice>()
    .Select(it => new
    {
        it.InvoiceNo,
        RocDate = ToRocDate(it.InvoiceDate)  // 生成 ROC 日期字串
    })
    .ToList();
```

---

## 二、方式二：MappingColumn 快速嵌入 SQL（最常用）

寫法最簡單，直接把 SQL 片段放進 Lambda，適合一次性或 MSSQL 專用的情況。

- 注意：若值來自前端，必須做防注入處理

### 語法（5.1.4.64+ 新語法）

```csharp
SqlFunc.MappingColumn<int>("Id * 1")       // 新語法
SqlFunc.MappingColumn(default(int), "Id * 1")  // 老語法
```

### 用法範例

```csharp
// Where 中嵌入自訂 SQL
.Where(it => it.IDCard == SqlFunc.MappingColumn<string>("Sf_Decrypt(IDCard, 'KEY')"))
// → WHERE IDCard = Sf_Decrypt(IDCard, 'KEY')

// GroupBy 中嵌入原生轉換
.GroupBy(it => SqlFunc.MappingColumn<string>("CONVERT(varchar(10), CreateTime, 120)"))
// → GROUP BY CONVERT(varchar(10), CreateTime, 120)

// Where 中混合 SQL 與 Lambda
var sql = "Amount > 1000";
.Where(it => SqlFunc.MappingColumn<bool>(sql) || it.Name == "A")
// → WHERE Amount > 1000 OR Name = 'A'

// 直接傳整段 SQL 字串（最簡單）
.Where("Amount > 1000 AND IsDeleted = 0")
```

**✅ 實際案例：MSSQL 特有的 CONVERT 日期格式**

```csharp
// 依民國年月分組統計（MSSQL 專用）
var list = db.Queryable<Invoice>()
    .GroupBy(it => SqlFunc.MappingColumn<string>(
        "CAST(YEAR(InvoiceDate)-1911 AS VARCHAR) + '/' + " +
        "RIGHT('0'+CAST(MONTH(InvoiceDate) AS VARCHAR),2)"))
    .Select(it => new
    {
        RocYearMonth = SqlFunc.MappingColumn<string>(
            "CAST(YEAR(InvoiceDate)-1911 AS VARCHAR) + '/' + " +
            "RIGHT('0'+CAST(MONTH(InvoiceDate) AS VARCHAR),2)"),
        Count  = SqlFunc.AggregateCount(it.Id),
        Amount = SqlFunc.AggregateSum(it.Amount)
    })
    .ToList();
```

**✅ 實際案例：加解密欄位查詢（資料庫加密函數）**

```csharp
// 查詢加密身分證
var list = db.Queryable<Person>()
    .Where(it => SqlFunc.MappingColumn<string>("dbo.fn_Decrypt(IDCard, 1)") == idCard)
    .Select(it => new
    {
        it.Name,
        IDCard = SqlFunc.MappingColumn<string>("dbo.fn_Decrypt(IDCard, 1)")
    })
    .ToList();
```

---

## 三、兩種方式比較

| 比較項目 | 方式一（SqlFuncExternal）| 方式二（MappingColumn）|
|---|---|---|
| 寫法複雜度 | 高（需定義方法 + 設定解析）| 低（直接寫 SQL）|
| 跨資料庫相容 | 支援（依 dbType 給不同 SQL）| 不保證 |
| 重複使用性 | 高（設定一次到處用）| 低（每次要重寫 SQL）|
| 適合場景 | 公用函數、多庫環境 | 一次性需求、單一資料庫 |
| SQL Injection 風險 | 無（參數由 SqlSugar 管理）| 有（若 SQL 來自前端需自行防注入）|

---

## 注意事項

- 方式一的靜態方法本體不能有任何實作，只能 throw NotSupportedException
- MappingColumn 的 SQL 字串若來自前端輸入，必須白名單驗證或參數化，避免 SQL Injection
- 方式一設定的 SqlFuncExternal 是跟著 ConnectionConfig 走的，多租戶或多資料庫要注意在對應的 db 實例上設定
- 兩種方式都可以用在 Where、Select、GroupBy、OrderBy 中
