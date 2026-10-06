# SqlSugar — 無實體查詢 多庫相容 API 筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=2421)

## 什麼是低程式碼操作庫？

用來兼容多種資料庫的弱類型操作資料庫語法。
可以封裝到 XML、JSON 等設定驅動的場景，實現零程式碼查詢配置。

---

## 速查表

| 需求 | 使用方式 |
|---|---|
| 動態類模式（支援 AOP / 導航）| db.QueryableByObject(typeof(Order), "x") |
| 純無實體模式 | db.Queryable\<object\>().AS("表名", "別名") |
| 聯表 | .AddJoinInfo("表名", "別名", IFuncModel, JoinType) |
| 排序 | .OrderBy(List\<OrderByModel\>) |
| 分組 | .GroupBy(List\<GroupByModel\>) |
| Having | .Having(IFuncModel) |
| 查詢欄位 | .Select(List\<SelectModel\>) |
| Where（條件模式）| .Where(List\<IConditionalModel\>) |
| Where（函數模式）| .Where(IFuncModel) |
| Where（SQL 字串）| .Where("sql", params) |
| 函數 | ObjectFuncModel.Create("函數名", 參數...) |
| 符號拼接 | ObjectFuncModel.Create("Format", "欄位", ">", "{int}:1") |

---

## 一、兩種查詢入口

```csharp
// 動態類模式：支援 AOP、導航（類不存在看「動態建類」文件）
db.QueryableByObject(typeof(Order), "x").ToList();

// 純無實體模式：不需建類，功能略少（不支援導航 AOP）
db.Queryable<object>().AS("Order", "o").ToList();
```

---

## 二、聯表查詢

### 2.1 多庫相容寫法（推薦）

```csharp
// 方式一：Equals 條件
var list = db.Queryable<object>()
    .AS("Order", "o")
    .AddJoinInfo("OrderDetail", "d",
        ObjectFuncModel.Create("Equals", "d.OrderId", "o.Id"),
        JoinType.Left)
    .Select(new List<SelectModel>
    {
        new SelectModel { FiledName = "o.Id",    AsName = "id"    },
        new SelectModel { FiledName = "d.Price",  AsName = "price" }
    })
    .ToList();
// → SELECT o.Id AS id, d.Price AS price
//   FROM Order o LEFT JOIN OrderDetail d ON d.OrderId = o.Id

// 方式二：Format 多條件 ON
var onCondition = ObjectFuncModel.Create(
    "Format", "d.OrderId", "=", "o.Id", "&&", "d.Amount", ">", "{int}:0");

var list = db.Queryable<object>()
    .AS("Order", "o")
    .AddJoinInfo("OrderDetail", "d", onCondition, JoinType.Left)
    .Select(SelectModel.Create(new SelectModel { FiledName = "o.Id", AsName = "id" }))
    .ToList();
```

### 2.2 簡單 SQL ON（快速，多庫相容差）

```csharp
var list = db.Queryable<object>()
    .AS("Order", "o")
    .AddJoinInfo("OrderDetail", "d", "d.OrderId = o.Id AND d.Amount > 0", JoinType.Left)
    .Select("o.*")
    .ToList();
```

**✅ 實際案例：低程式碼平台動態聯表**

```csharp
// 從 XML/JSON 設定讀取聯表規則，動態建構查詢
public List<dynamic> DynamicJoinQuery(QueryConfig config)
{
    var query = db.Queryable<object>().AS(config.MainTable, "m");

    foreach (var join in config.Joins)
    {
        var onCondition = ObjectFuncModel.Create(
            "Equals", $"{join.Alias}.{join.ForeignKey}", $"m.{join.PrimaryKey}");
        query = query.AddJoinInfo(join.Table, join.Alias, onCondition, JoinType.Left);
    }

    return query.Select("m.*").ToList();
}
```

---

## 三、OrderBy

### 3.1 多庫相容（推薦）

```csharp
var orderList = OrderByModel.Create(
    new OrderByModel { FieldName = "CreateTime", OrderByType = OrderByType.Desc },
    new OrderByModel { FieldName = "Id" }   // 預設 ASC
);

var list = db.Queryable<object>().AS("Order").OrderBy(orderList).ToList();
// → ORDER BY CreateTime DESC, Id ASC
```

### 3.2 直接 SQL

```csharp
var list = db.Queryable<object>().AS("Order").OrderBy("CreateTime DESC, Id ASC").ToList();
```

---

## 四、GroupBy + Having

### 多庫相容

```csharp
var groupList = GroupByModel.Create(
    new GroupByModel { FieldName = "CustomerId" }
);

// Having: AVG(Amount) > 1000
var having = ObjectFuncModel.Create("GreaterThan",
    ObjectFuncModel.Create("AggregateAvg", "Amount"), "{decimal}:1000");

var list = db.Queryable<object>()
    .AS("Order")
    .GroupBy(groupList)
    .Having(having)
    .Select(SelectModel.Create(
        new SelectModel { FiledName = "CustomerId",                     AsName = "customerId" },
        new SelectModel { FiledName = ObjectFuncModel.Create("AggregateSum", "Amount"), AsName = "total" }
    ))
    .ToList();
// → SELECT CustomerId AS customerId, SUM(Amount) AS total
//   FROM Order GROUP BY CustomerId HAVING AVG(Amount) > @p0

// 直接 SQL Having
var list2 = db.Queryable<object>().AS("Order")
    .GroupBy("CustomerId")
    .Having("AVG(Amount) > @p").AddParameters(new { p = 1000 })
    .Select("CustomerId, SUM(Amount) AS total")
    .ToList();
```

---

## 五、Select 用法

```csharp
// 多庫相容：欄位列表
var selector = SelectModel.Create(
    new SelectModel { FiledName = "Id",   AsName = "id"   },
    new SelectModel { FiledName = "Name", AsName = "name" }
);
var list = db.Queryable<object>().AS("Order").Select<object>(selector).ToList();

// 欄位是變數（常數值）
var selector2 = SelectModel.Create(
    new SelectModel { AsName = "Flag", FiledName = "{int}:1" }
);
// → SELECT @p AS Flag  (@p = 1)

// 欄位用函數
var selector3 = SelectModel.Create(new SelectModel
{
    AsName    = "TypeId",
    FiledName = ObjectFuncModel.Create("ToInt64", "TypeId")
});
// → SELECT CAST(TypeId AS BIGINT) AS TypeId

// 直接 SQL
var list4 = db.Queryable<object>().AS("Order").Select("Id, Name AS name").ToList();
```

---

## 六、Where

### 6.1 ConditionalModel 條件模式（最常用，支援前端 JSON）

```csharp
var conModels = new List<IConditionalModel>
{
    new ConditionalModel
    {
        FieldName       = "Id",
        ConditionalType = ConditionalType.Equal,
        FieldValue      = "1",
        CSharpTypeName  = "int"
    },
    new ConditionalModel
    {
        FieldName       = "Name",
        ConditionalType = ConditionalType.Like,
        FieldValue      = "A"
    }
};

var list = db.Queryable<object>().AS("Order").Where(conModels).ToList();
// → WHERE Id = @p0 AND Name LIKE '%A%'
// 詳細用法見：表格查詢WhereDynamicFilter.md
```

### 6.2 ObjectFuncModel 拼接模式（彈性高）

```csharp
// Id > 1 AND Name = 'A'
var whereFunc = ObjectFuncModel.Create(
    "Format", "Id", ">", "{int}:1", "&&", "Name", "=", "{string}:A");

var list = db.Queryable<object>().AS("Order").Where(whereFunc).ToList();
// → WHERE Id > @p0 AND Name = @p1

// 含括號：(Id > 1 OR Id = 2) AND Status = 1
var whereFunc2 = ObjectFuncModel.Create(
    "Format",
    "(", "Id", ">", "{int}:1", "||", "Id", "=", "{int}:2", ")",
    "&&", "Status", "=", "{int}:1");
```

### 6.3 直接 SQL（快速，多庫相容差）

```csharp
var list = db.Queryable<object>().AS("Order")
    .Where("Id = @id AND Status = 1", new { id = 1 })
    .ToList();
```

---

## 七、ObjectFuncModel 函數完整清單

### 7.1 字串處理

| 函數名 | 說明 |
|---|---|
| Contains | LIKE %值% |
| StartsWith | LIKE 值% |
| EndsWith | LIKE %值 |
| Like | 同 Contains |
| ToUpper / ToLower | 大小寫轉換 |
| Trim / TrimStart / TrimEnd | 去空格 |
| Substring | 截取字串 |
| Replace | 替換字串 |
| Length | 字串長度 |
| PadLeft | 左補字元 |
| MergeString | 字串串接 |
| CharIndex / CharIndexNew | 字元位置 |
| Left / Right | 取左/右 N 字元 |
| Collate | 指定排序規則 |
| SplitIn | 逗號分割後 IN |
| CompareTo | 字串比較 |

### 7.2 數值處理

| 函數名 | 說明 |
|---|---|
| Abs | 絕對值 |
| Round | 四捨五入 |
| Floor | 向下取整 |
| Ceil | 向上取整 |
| Modulo | 取餘數 |

### 7.3 類型轉換

| 函數名 | 說明 |
|---|---|
| ToInt32 / ToInt64 | 轉整數 |
| ToDecimal / ToDouble / ToSingle | 轉數值 |
| ToBool | 轉布林 |
| ToString | 轉字串（支援時間格式化）|
| ToDate / ToDateShort / ToTime | 轉日期時間 |
| ToGuid | 轉 GUID |
| ToVarchar | 轉 varchar |
| MappingColumn | 嵌入原生 SQL |

### 7.4 時間函數

| 函數名 | 說明 |
|---|---|
| GetDate | 取資料庫現在時間 |
| DateValue | 取時間部分（Year/Month/Day/Hour...）|
| DateAddDay | 加天數 |
| DateAddByType | 加指定單位時間 |
| DateIsSameDay | 是否同一天 |
| DateIsSameByType | 是否同年/月/天 |
| DateDiff / SqlServer_DateDiff | 計算時間差 |
| WeekOfYear | 一年中第幾週 |
| GetDateString | 格式化時間字串 |
| Oracle_ToDate / Oracle_ToChar | Oracle 專用 |

```csharp
// DateValue 範例：取月份
ObjectFuncModel.Create("DateValue", "CreateTime", "{string}:" + DateType.Month)

// DateIsSameByType 範例：同一月
ObjectFuncModel.Create("DateIsSameByType", "CreateTime", "{DateTime}:2024-01-01",
    "{string}:" + DateType.Month)

// ToString 格式化時間
ObjectFuncModel.Create("ToString", "CreateTime", "{string}:yyyy-MM-dd")
```

### 7.5 聚合函數

| 函數名 | 說明 |
|---|---|
| AggregateSum / AggregateSumNoNull | SUM |
| AggregateAvg / AggregateAvgNoNull | AVG |
| AggregateMax / AggregateMin | MAX / MIN |
| AggregateCount / AggregateDistinctCount | COUNT |

### 7.6 開窗函數

| 函數名 | 說明 |
|---|---|
| RowNumber | ROW_NUMBER() OVER(...) |
| RowCount | COUNT(1) OVER() |
| RowSum / RowAvg / RowMin / RowMax | 開窗聚合 |
| FormatRowNumber | 格式化 RowNumber |

### 7.7 判斷與比較

| 函數名 | 說明 |
|---|---|
| Equals / EqualsNull | 等於（支援 IS NULL）|
| GreaterThan / GreaterThanOrEqual | > / >= |
| LessThan / LessThanOrEqual | < / <= |
| Between | 範圍 |
| IsNullOrEmpty | 為 null 或空 |
| HasValue / HasNumber | 不為 null / 大於 0 |
| IsNull | ISNULL/IFNULL |
| IIF | 三元 CASE WHEN |
| CaseWhen | CASE WHEN |

```csharp
// IIF 範例
new ObjectFuncModel
{
    FuncName   = "IIF",
    Parameters = new List<object>
    {
        ObjectFuncModel.Create("Equals", "Status", "{int}:1"),
        "ActiveName",      // true 時取欄位值
        "{string}:停用"    // false 時取常數
    }
}
// → CASE WHEN Status = @p0 THEN [ActiveName] ELSE @p1 END
```

### 7.8 IN 相關

```csharp
// IN：UserId IN (1,2,3)
ObjectFuncModel.Create("ContainsArray",
    "{int}:" + db.Utilities.SerializeObject(new int[] { 1, 2, 3 }), "UserId")

// NOT IN
IFuncModel inFunc = ObjectFuncModel.Create("ContainsArray", "{int}:[1,2,3]", "UserId");
ObjectFuncModel.Create("Format", "not", "(", inFunc, ")")

// ListAny / ListAll（多欄位 IN）
ObjectFuncModel.Create("ListAny", ...)
ObjectFuncModel.Create("ListAll", ...)
```

### 7.9 JSON 函數

| 函數名 | 說明 |
|---|---|
| JsonField | 取 JSON 欄位值（支援多層）|
| JsonIndex | 取 JSON 陣列索引 |
| JsonArrayAny | JSON 陣列中是否存在值 |
| JsonListObjectAny | JSON 物件陣列中是否存在欄位值 |
| JsonArrayLength | JSON 陣列長度 |
| JsonContainsFieldName | 是否存在指定欄位名 |
| JsonParse | 轉 JSON 類型 |
| JsonLike | JSON 模糊查詢 |

### 7.10 Format 符號拼接（最重要）

Format 是最靈活的函數，可以拼接任意 SQL 片段。

```csharp
// 基本算術
ObjectFuncModel.Create("Format", "Amount", "+", "TaxAmount")
// → Amount + TaxAmount

ObjectFuncModel.Create("Format", "Amount", "*", "{decimal}:1.05")
// → Amount * @p0

// 複合條件
ObjectFuncModel.Create("Format",
    "Id", ">", "{int}:1", "&&", "Name", "like", "{string}:A%")
// → Id > @p0 AND Name LIKE @p1

// 括號分組
ObjectFuncModel.Create("Format",
    "(", "Id", ">", "{int}:1", "||", "Id", "=", "{int}:2", ")",
    "&&", "Status", "=", "{int}:1")
// → (Id > @p0 OR Id = @p1) AND Status = @p2

// IS NULL / IS NOT NULL
ObjectFuncModel.Create("Format", "Name", "is", "null")
ObjectFuncModel.Create("Format", "Name", "isnot", "null")
```

可用符號：>, >=, <, <=, (, ), =, ||, &&, &, |, null, is, isnot, like, nolike, +, -, *, /, %

---

## 八、嵌套 SQL（MappingColumn）

需在 ConnectionConfig 先啟用：

```csharp
MoreSettings = new ConnMoreSettings
{
    EnableModelFuncMappingColumn = true
}

// 使用
var model = new SelectModel
{
    FiledName = ObjectFuncModel.Create("MappingColumn",
        "(SELECT MAX(Amount) FROM OrderDetail WHERE OrderId = o.Id)"),
    AsName = "MaxDetailAmount"
};

var list = db.Queryable<object>()
    .AS("Order", "o")
    .Select(SelectModel.Create(model))
    .ToList();
```

---

## 九、無實體建表

詳見「動態建類 CRUD」文件（typeId=2562）。

---

## 注意事項

- ObjectFuncModel 的欄位參數（如 "Id"）會嚴格防注入驗證，不能傳任意字串
- {type}:value 變量參數是參數化查詢，完全安全
- Format 符號拼接中的欄位名同樣受防注入保護
- db.QueryableByObject(typeof(T)) 支援 AOP 和導航，功能比 db.Queryable\<object\>() 完整
- 多庫環境下盡量使用 ObjectFuncModel 系列 API，避免直接 SQL 字串
