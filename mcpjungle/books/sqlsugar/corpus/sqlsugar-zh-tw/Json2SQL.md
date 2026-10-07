# SqlSugar — Json 2 SQL（JORM）筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=2420)

## 功能說明

Json 2 SQL 是 SqlSugar 的 JORM 引擎，透過 JSON 格式描述查詢條件，由後端動態產生對應 SQL 並執行。
適合低程式碼平台、前端動態條件查詢、視覺化查詢產生器等場景。

---

## 初始化

```csharp
// 建立 JsonClient（5.0.9.2+）
JsonClient jsonClient = new JsonClient();
jsonClient.Context = new SqlSugarClient(new ConnectionConfig
{
    DbType              = DbType.SqlServer,
    IsAutoCloseConnection = true,
    ConnectionString    = "Server=.;Database=MyDb;Trusted_Connection=True"
});
```

---

## API 方法

| 方法 | 說明 |
|---|---|
| .ToSql() | 返回單個 SqlObjectResult（含 SQL + 參數）|
| .ToSqlList() | 返回多個 SqlObjectResult（分頁查詢會返回 COUNT 和 SELECT 兩條）|
| .ToResult() | 直接執行並返回結果 |

---

## 一、查詢

### 1.1 基本查詢 + 函數

```json
{
  "Table": "Order",
  "Select": [
    [{ "SqlFunc_AggregateMin": ["Id"] }, "MinId"],
    [{ "SqlFunc_GetDate": [] }, "QueryDate"],
    "Name",
    "Amount"
  ]
}
```

```csharp
var result = jsonClient.Queryable(json).ToSql();
// → SELECT MIN([Id]) AS [MinId], GETDATE() AS [QueryDate], [Name], [Amount] FROM [Order]
```

---

### 1.2 條件查詢（兩種語法）

**語法一：SqlSugar 表格查詢語法（ConditionalType）**

```json
{
  "Table": "Order",
  "Where": [
    { "FieldName": "Status", "ConditionalType": "0", "FieldValue": "1" },
    { "FieldName": "Amount", "ConditionalType": "2", "FieldValue": "100" }
  ]
}
```

ConditionalType 數值對應：0=等於、1=Like、2=大於、3=大於等於、4=小於、5=小於等於、6=不等於 等（同 WhereDynamicFilter）

**語法二：逗號拼接語法**

```json
{
  "Table": "Order",
  "Where": ["Status", "=", "{int}:1", "&&", "Amount", ">", "{decimal}:100"]
}
```

參數值格式：`{型別}:值`，例如 `{int}:1`、`{string}:張三`、`{decimal}:99.9`

支援運算符：`>`、`>=`、`<`、`<=`、`(`、`)`、`=`、`||`、`&&`、`&`、`|`、`null`、`is`、`isnot`、`+`、`-`、`*`、`/`、`%`、`like`

```csharp
var result = jsonClient.Queryable(json).ToSql();
// → SELECT * FROM [Order] WHERE [Status] = @p0 AND [Amount] > @p1
```

---

### 1.3 分頁查詢

```json
{
  "Table": "Order",
  "Where": ["Status", "=", "{int}:1"],
  "PageNumber": "1",
  "PageSize": "20"
}
```

```csharp
var sqlList = jsonClient.Queryable(json).ToSqlList();
// sqlList[0] → SELECT COUNT(1) FROM [Order] WHERE [Status] = @p0
// sqlList[1] → SELECT * FROM [Order] WHERE [Status] = @p0 ORDER BY ... OFFSET 0 ROWS FETCH NEXT 20 ROWS ONLY
```

---

### 1.4 分組查詢

```json
{
  "Table": "Order",
  "GroupBy": ["CustomerId"],
  "Having": [{ "SqlFunc_AggregateSum": ["Amount"] }, ">", "{decimal}:1000"],
  "Select": [
    "CustomerId",
    [{ "SqlFunc_AggregateSum": ["Amount"] }, "TotalAmount"],
    [{ "SqlFunc_AggregateCount": ["Id"] }, "OrderCount"]
  ]
}
```

```csharp
var result = jsonClient.Queryable(json).ToSql();
// → SELECT [CustomerId], SUM([Amount]) AS [TotalAmount], COUNT([Id]) AS [OrderCount]
//   FROM [Order] GROUP BY [CustomerId] HAVING SUM([Amount]) > @p0
```

---

### 1.5 聯表查詢

```json
{
  "Table": ["Order", "o"],
  "LeftJoin01": ["Customer", "c", ["c.Id", "=", "o.CustomerId"]],
  "LeftJoin02": ["OrderItem", "i", ["i.OrderId", "=", "o.Id"]],
  "Select": [
    "o.Id",
    ["o.OrderNo", "OrderNo"],
    ["c.Name", "CustomerName"],
    [{ "SqlFunc_AggregateSum": ["i.Amount"] }, "TotalAmount"]
  ],
  "GroupBy": ["o.Id", "o.OrderNo", "c.Name"]
}
```

多表聯查依序用 LeftJoin01、LeftJoin02...，InnerJoin 同理（InnerJoin01、InnerJoin02）。

---

### 1.6 排序

```json
{
  "Table": "Order",
  "OrderBy": [
    { "FieldName": "CreateTime", "OrderByType": "desc" },
    { "FieldName": "Id" }
  ]
}
```

---

### 1.7 授權查詢（行列過濾）

```csharp
// 取得 JSON 中涉及的所有表名
var tableNames = jsonClient.GetTableNameList(json);

// 從業務邏輯取得行列過濾設定
var configs = GetAuthConfigByUser(tableNames);

// 執行帶授權的查詢
var result = jsonClient.Queryable(json)
    .UseAuthentication(configs)  // 套用行列過濾
    .ShowDescription()           // 返回欄位備註
    .ToResult();
```

---

## 二、插入

```json
// 單筆插入
{
  "Table": "Order",
  "Columns": { "Name": "{string}:測試訂單", "Amount": "{decimal}:999.9", "Status": "{int}:1" }
}

// 批量插入
{
  "Table": "Order",
  "Columns": [
    { "Name": "{string}:訂單A", "Amount": "{decimal}:100" },
    { "Name": "{string}:訂單B", "Amount": "{decimal}:200" }
  ]
}

// 帶自增欄位（指定 Identity 欄位，插入時自動忽略）
{
  "Table": "Order",
  "Identity": "Id",
  "Columns": { "Name": "{string}:測試", "Amount": "{decimal}:100" }
}
```

```csharp
var result = jsonClient.Insertable(json).ToSql();
// result.Sql    → INSERT INTO [Order] ([Name],[Amount]) VALUES (@p0,@p1)
// result.Params → { @p0="測試", @p1=100 }

// 直接執行
jsonClient.Insertable(json).ToResult();
```

---

## 三、更新

```json
// 單筆更新（指定 WhereColumns）
{
  "Table": "Order",
  "Columns": { "Id": "{int}:1", "Name": "{string}:新名稱", "Amount": "{decimal}:888" },
  "WhereColumns": ["Id"]
}

// 批量更新
{
  "Table": "Order",
  "Columns": [
    { "Id": 1, "Name": "{string}:訂單A更新", "Amount": "{decimal}:100" },
    { "Id": 2, "Name": "{string}:訂單B更新", "Amount": "{decimal}:200" }
  ],
  "WhereColumns": ["Id"]
}

// SQL 條件方式更新
{
  "Table": "Order",
  "Columns": { "Status": "{int}:2", "UpdateTime": "{datetime}:2024-01-01" },
  "Where": ["Id", "=", "{int}:1"]
}
```

```csharp
var result = jsonClient.Updateable(json).ToSql();
jsonClient.Updateable(json).ToResult();  // 直接執行
```

---

## 四、刪除

```json
{
  "Table": "Order",
  "Where": ["Id", "=", "{int}:1"]
}
```

```csharp
var sqlList = jsonClient.Deleteable(json).ToSqlList();
// → DELETE FROM [Order] WHERE [Id] = @p0

jsonClient.Deleteable(json).ToResult();  // 直接執行
```

---

## JSON 語法速查

| 鍵 | 說明 | 範例 |
|---|---|---|
| Table | 資料表名（聯表時陣列）| "Order" 或 ["Order","o"] |
| Select | 查詢欄位 | ["Name"] 或 [函數, "別名"] |
| Where | 條件（兩種語法）| ["Status","=","{int}:1"] |
| GroupBy | 分組欄位 | ["CustomerId"] |
| Having | 分組條件 | [函數,">","{int}:1"] |
| OrderBy | 排序 | [{FieldName:"Id",OrderByType:"desc"}] |
| PageNumber | 頁碼 | "1" |
| PageSize | 每頁筆數 | "20" |
| LeftJoin01 | 左聯表 | ["表名","別名",[條件]] |
| InnerJoin01 | 內聯表 | 同上 |
| Columns | 插入/更新欄位 | {Name:"{string}:A"} |
| WhereColumns | 更新條件欄位 | ["Id"] |
| Identity | 自增欄位名 | "Id" |

---

## 適用場景（低程式碼平台）

Json 2 SQL 最適合作為低程式碼平台的查詢引擎：

- 前端視覺化設計查詢條件 → 後端接收 JSON → SqlSugar 轉 SQL 執行
- 不同使用者有不同表格/欄位的存取權限 → UseAuthentication 行列過濾
- 動態報表：前端選擇維度和指標 → JSON 描述 GROUP BY 和 SELECT → 後端產生 SQL

---

## 注意事項

- 參數值必須標明類型：`{int}:1`、`{string}:a`、`{decimal}:1.5`、`{datetime}:2024-01-01`
- 欄位名只能使用字母、數字、底線，不支援中文欄位名
- 分頁查詢用 ToSqlList()，返回 COUNT 和 SELECT 兩條 SQL
- 授權查詢（UseAuthentication）功能文件說明尚不完整，使用前需測試
