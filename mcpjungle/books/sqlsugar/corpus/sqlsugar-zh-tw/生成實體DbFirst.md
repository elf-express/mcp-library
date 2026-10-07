# SqlSugar — DbFirst 生成實體筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=1207)


[//]: # (sqlsugar-cheatsheet)
## 速查表

| 需求 | 語法 |
|---|---|
| 基本生成 | db.DbFirst.CreateClassFile("路徑","命名空間") |
| 篩選表 | .Where(...) / .IsCreateAttribute() |
| 帶預設值 | .IsCreateDefaultValue() |
| 格式化命名 | .FormatFileName / .FormatClassName(5.1.4.115+) |
| 取代字串 | SettingClassTemplate 等 |
| 加租戶特性 | [Tenant] |
| Razor 模板 | 安裝 SqlSugar.DbFirst.Razor |
| 取表/欄位資訊 | db.DbMaintenance.GetTableInfoList / GetColumnInfosByTableName |

---

## 三種方式比較

| 方式 | 優點 | 缺點 |
|---|---|---|
| 一、程式碼生成（DbFirst）| 支援所有資料庫，可自動化 | 個性化需用模板 |
| 二、Razor 模板生成 | 模板彈性高 | 需安裝額外套件 |
| 三、ReZero 工具 | 介面操作，修改模板方便 | 只支援常見資料庫 |

---

## 一、程式碼生成（最常用）

### 1.1 基本生成

```csharp
// .NET 6 以下
db.DbFirst
    .IsCreateAttribute()          // 產生 SqlSugar 特性（SugarColumn 等）
    .CreateClassFile("C:\\Demo\\Entities", "MyApp.Core.Entities");
// 參數一：輸出路徑，參數二：命名空間

// .NET 6 以上（string 欄位加 ?）
db.DbFirst
    .IsCreateAttribute()
    .StringNullable()             // string 可空欄位加上 ?
    .CreateClassFile("C:\\Demo\\Entities", "MyApp.Core.Entities");
```

### 1.2 篩選指定資料表

```csharp
// 只生成 Order 表
db.DbFirst
    .Where("Order")
    .IsCreateAttribute()
    .CreateClassFile("C:\\Demo\\Entities", "MyApp.Core.Entities");

// 只生成 View 開頭的表
db.DbFirst
    .Where(it => it.ToLower().StartsWith("view"))
    .IsCreateAttribute()
    .CreateClassFile("C:\\Demo\\Entities", "MyApp.Core.Entities");

// 多個條件
db.DbFirst
    .Where(it => !it.StartsWith("Log") && !it.StartsWith("Tmp"))
    .IsCreateAttribute()
    .CreateClassFile("C:\\Demo\\Entities", "MyApp.Core.Entities");
```

### 1.3 生成帶預設值

```csharp
db.DbFirst
    .IsCreateDefaultValue()       // 屬性帶資料庫預設值
    .CreateClassFile("C:\\Demo\\Entities", "MyApp.Core.Entities");
```

### 1.4 格式化類名 / 屬性名 / 檔名（5.1.4.115+）

```csharp
db.DbFirst
    .IsCreateAttribute()
    .FormatFileName(it => it)                           // 格式化檔名
    .FormatClassName(it => it)                          // 格式化類名
    .FormatPropertyName(it => it)                       // 格式化屬性名
    .CreateClassFile("C:\\Demo\\Entities", "MyApp.Core.Entities");

// 實際範例：下划線轉駝峰
db.DbFirst
    .IsCreateAttribute()
    .FormatClassName(it => UtilMethods.ToPascalCase(it))     // order_item → OrderItem
    .FormatPropertyName(it => UtilMethods.ToPascalCase(it))  // create_time → CreateTime
    .CreateClassFile("C:\\Demo\\Entities", "MyApp.Core.Entities");

// 注意：FormatFileName 只能寫一個，不能鏈式多個
// ✅ 正確：.FormatFileName(it => it.Replace(" ", "").Replace("-", "_"))
// ❌ 錯誤：.FormatFileName(...).FormatFileName(...)
```

### 1.5 替換生成後的字串（5.1.4.108+）

```csharp
db.DbFirst
    .Where("Order")
    .CreatedReplaceClassString(it =>
        it.Replace("舊字串", "新字串")
          .Replace("另一個舊", "另一個新"))   // 也可用 Regex.Replace
    .CreateClassFile("C:\\Demo\\Entities", "MyApp.Core.Entities");
```

### 1.6 新增租戶特性

```csharp
db.DbFirst
    .Where("Order")
    .SettingClassDescriptionTemplate(it =>
        it + $"\r\n    [Tenant(\"{db.CurrentConnectionConfig.ConfigId}\")]")
    .CreateClassFile("C:\\Demo\\Entities", "MyApp.Core.Entities");
```

### 1.7 高度自訂模板

```csharp
db.DbFirst
    .SettingClassTemplate(old => old)                // 自訂類模板
    .SettingConstructorTemplate(old => old)          // 自訂建構函式模板
    .SettingNamespaceTemplate(old =>
        old + "\r\nusing SqlSugar;")                 // 追加 using
    .SettingPropertyDescriptionTemplate(old => old)  // 自訂屬性備註模板
    .SettingPropertyTemplate((column, temp, type) =>
    {
        // 完全自訂每個屬性的產生方式
        var attr = "";
        var attrParts = new List<string>();
        if (column.IsPrimarykey)  attrParts.Add("IsPrimaryKey=true");
        if (column.IsIdentity)    attrParts.Add("IsIdentity=true");
        if (attrParts.Any())
            attr = $"\r\n           [SugarColumn({string.Join(",", attrParts)})]";

        return temp
            .Replace("{PropertyType}", type)
            .Replace("{PropertyName}", column.DbColumnName)
            .Replace("{SugarColumn}", attr);
    })
    .CreateClassFile("C:\\Demo\\Entities");

// 注意：SettingPropertyTemplate 和 IsCreateAttribute 不要同時使用
```

---

## 二、Razor 模板生成

### 2.1 安裝套件

- .NET Framework：安裝 `RazorEngine 3.10.0.0`
- .NET 6+：安裝 `RazorEngine.NetCore 3.1`

### 2.2 使用方式

```csharp
// 設定 RazorService
var db = new SqlSugarClient(new ConnectionConfig
{
    ConnectionString      = "...",
    DbType                = DbType.SqlServer,
    IsAutoCloseConnection = true,
    ConfigureExternalServices = new ConfigureExternalServices
    {
        RazorService = new RazorService()  // 見下方 RazorService 實作
    }
});

// 使用內建預設模板生成
var template = RazorFirst.DefaultRazorClassTemplate;
db.DbFirst.UseRazorAnalysis(template).CreateClassFile("C:\\Demo\\Razor\\");
```

```csharp
// RazorService 實作（.NET 6+）
public class RazorService : IRazorService
{
    public List<KeyValuePair<string, string>> GetClassStringList(
        string razorTemplate, List<RazorTableInfo> model)
    {
        var result = new List<KeyValuePair<string, string>>();
        foreach (var item in model)
        {
            item.ClassName = item.DbTableName;  // 可自訂格式化類名
            string key = "RazorKey" + razorTemplate.Length;
            var classString = Engine.Razor.RunCompile(
                razorTemplate, key, item.GetType(), item);
            result.Add(new KeyValuePair<string, string>(item.ClassName, classString));
        }
        return result;
    }
}
```

---

## 三、ReZero 工具生成

官網：https://www.donet5.com/Doc/33

支援資料庫：SqlServer、MySQL、PostgreSQL、Oracle、Sqlite、達夢、金倉

介面操作，適合非工程師或需要頻繁修改模板的場景。

---

## 四、自己取得表 / 欄位資訊

可用於自訂代碼生成器：

```csharp
// 取得所有資料表資訊
var tables = db.DbMaintenance.GetTableInfoList(false);  // false = 不走快取
foreach (var table in tables)
{
    Console.WriteLine($"表名：{table.Name}，備註：{table.Description}");
}

// 取得指定表的所有欄位資訊
var columns = db.DbMaintenance.GetColumnInfosByTableName("Order", false);
foreach (var col in columns)
{
    Console.WriteLine($"欄位：{col.DbColumnName}，型別：{col.DataType}，" +
                      $"主鍵：{col.IsPrimarykey}，可空：{col.IsNullable}");
}
```

**✅ 實際案例：AIRSET 從既有 SQL Server 生成實體（中文欄位名）**

```csharp
// 針對 AIRSET 系統（中文欄位名、Chinese_Taiwan_Stroke 排序規則）
db.DbFirst
    .Where(it => !it.StartsWith("sys") && !it.StartsWith("Log"))
    .IsCreateAttribute()
    .StringNullable()
    // 欄位名有中文時，ColumnName 特性必須保留
    .SettingPropertyTemplate((col, temp, type) =>
    {
        var parts = new List<string>();
        if (col.IsPrimarykey) parts.Add("IsPrimaryKey=true");
        if (col.IsIdentity)   parts.Add("IsIdentity=true");
        // 中文欄位名強制加 ColumnName
        if (!col.DbColumnName.All(c => c < 128))
            parts.Add($"ColumnName=\"{col.DbColumnName}\"");

        var attr = parts.Any()
            ? $"\r\n        [SugarColumn({string.Join(",", parts)})]"
            : "";

        return temp
            .Replace("{PropertyType}",  type)
            .Replace("{PropertyName}",  col.DbColumnName)
            .Replace("{SugarColumn}",   attr);
    })
    .CreateClassFile("C:\\AIRSET\\Entities", "AIRSET.Core.Entities");
```

---

## 注意事項

- IsCreateAttribute 和 SettingPropertyTemplate 不要同時使用，會衝突
- FormatFileName / FormatClassName / FormatPropertyName 只能各寫一個（不能鏈式多個）
- 有中文欄位名時，屬性名無法直接用中文，建議用 FormatPropertyName 轉換後再加 ColumnName 特性保留對應
- .NET 6+ 建議加 .StringNullable()，讓可空 string 欄位自動加 ?
