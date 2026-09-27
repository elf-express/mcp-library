# SqlSugar — SQL 分頁查詢（SqlQueryable）筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=1197)

## 功能說明

db.SqlQueryable 讓你在 SQL 字串的基礎上繼續套用 Lambda 表達式條件和分頁，適合已有複雜 SQL 但需要額外過濾或分頁的場景。

限制：只支援簡單查詢 SQL，**不支援**預存程序和特殊邏輯 SQL（那些請用 db.Ado.SqlQuery）。

---

## 速查表

| 需求 | 語法 |
|---|---|
| SQL 分頁查詢 | db.SqlQueryable\<T\>("SQL").ToPageList(page, size, ref total) |
| SQL + Lambda 條件 | .Where(it => it.Id == 1) |
| SQL + SQL 條件 | .Where("id=@id", new { id = 1 }) |
| SQL + 排序 | .OrderBy("id asc") |
| SQL + 參數 | .AddParameters(new { id = 1 }) |
| IN 參數 | .AddParameters(new { ids = new int[] { 1, 2 } }) |
| 無實體返回 DataTable 分頁 | db.SqlQueryable\<object\>("SQL").ToDataTablePage(page, size) |
| 複雜 SQL / 預存程序 | db.Ado.SqlQuery\<T\>("複雜 SQL 或預存程序") |

---

## 一、基本分頁查詢

```csharp
int total = 0;
var list = db.SqlQueryable<Order>("SELECT * FROM [Order]")
    .Where(it => it.Status == 1)          // Lambda 條件
    .OrderBy("CreateTime DESC")           // SQL 排序
    .ToPageList(1, 20, ref total);

// 不需要分頁只需 ToList
var list = db.SqlQueryable<Order>("SELECT * FROM [Order]")
    .Where(it => it.Id > 0)
    .ToList();
```

---

## 二、帶 SQL 條件

```csharp
// SQL 方式 Where
var list = db.SqlQueryable<Order>("SELECT * FROM [Order]")
    .Where("Id = @id", new { id = 1 })
    .ToPageList(1, 20);

// 多個參數
var list = db.SqlQueryable<Order>("SELECT * FROM [Order]")
    .Where("Status = @status AND CreateTime >= @start",
        new { status = 1, start = DateTime.Today })
    .ToList();
```

---

## 三、AddParameters 加入參數

```csharp
// SQL 中已有參數，用 AddParameters 傳入
var list = db.SqlQueryable<Order>("SELECT * FROM [Order] WHERE Id = @id")
    .AddParameters(new { id = 1 })
    .ToPageList(1, 20, ref total);

// 多個參數
var list = db.SqlQueryable<Order>(
    "SELECT * FROM [Order] WHERE Status = @status AND OrgId = @orgId")
    .AddParameters(new { status = 1, orgId = currentOrgId })
    .ToList();
```

AddParameters 重載：
- .AddParameters(object parameters)
- .AddParameters(SugarParameter[] parameters)
- .AddParameters(List\<SugarParameter\> parameters)

---

## 四、IN 參數用法

```csharp
// 陣列作為 IN 參數
var list = db.SqlQueryable<Order>(
    "SELECT * FROM [Order] WHERE Id IN (@ids)")
    .AddParameters(new SugarParameter[] {
        new SugarParameter("@ids", new int[] { 1, 2, 3 })
    })
    .OrderBy("Id ASC")
    .ToList();

// 簡化寫法
var list = db.SqlQueryable<object>(
    "SELECT * FROM [Order] WHERE Id IN (@ids)")
    .AddParameters(new { ids = new int[] { 1, 2, 3 } })
    .ToList();
```

---

## 五、無實體查詢（返回 DataTable）

```csharp
// 返回 DataTable 分頁
var dt = db.SqlQueryable<object>("SELECT * FROM [Order]")
    .Where("Id = @id", new { id = 1 })
    .ToDataTablePage(1, 20);

// 返回 DataTable（不分頁）
var dt = db.SqlQueryable<object>("SELECT * FROM [Order]")
    .ToDataTable();
```

---

## 六、聯表多物件映射（OwnsOne）

類似 Dapper 的 Query\<T, T2\>，將一維查詢結果映射成多層巢狀物件。

```csharp
// 定義巢狀 VO 類別
public class OrderDetailVO
{
    [SugarColumn(IsOwnsOne = true)]
    public OrderInfo Order { get; set; }   // Order 和 Item 欄位名不能重複

    [SugarColumn(IsOwnsOne = true)]
    public ItemInfo Item { get; set; }
}

public class OrderInfo
{
    public int    Id       { get; set; }
    public string OrderNo  { get; set; }
}

public class ItemInfo
{
    public string ProductName { get; set; }
    public decimal Price      { get; set; }
}

// 使用
var list = db.SqlQueryable<OrderDetailVO>(
    "SELECT o.Id, o.OrderNo, i.ProductName, i.Price " +
    "FROM [Order] o LEFT JOIN OrderItem i ON o.Id = i.OrderId")
    .ToList();

// list[0].Order.Id        → 訂單 ID
// list[0].Item.ProductName → 商品名稱
```

---

## 七、何時用 SqlQueryable，何時用 db.Ado

| 場景 | 使用 |
|---|---|
| 簡單 SQL + Lambda 過濾 + 分頁 | db.SqlQueryable\<T\> |
| 複雜 SQL（子查詢、CTE、UNION）| db.Ado.SqlQuery\<T\> |
| 預存程序 | db.Ado.SqlQuery\<T\>（或 UseStoredProcedure）|
| 只要 DataTable（不需要物件）| db.Ado.GetDataTable |
| 需要 Output 參數 | db.Ado（支援更全面）|

**✅ 實際案例：AIRSET 複雜出貨統計 SQL + 分頁**

```csharp
// 已有複雜統計 SQL，只需加條件和分頁
string sql = @"
    SELECT s.ShipmentNo, s.ShipDate, s.Amount,
           c.Name AS CustomerName, w.Name AS WarehouseName
    FROM Shipment s
    LEFT JOIN Customer c ON s.CustomerId = c.Id
    LEFT JOIN Warehouse w ON s.WarehouseId = w.Id
    WHERE s.IsDeleted = 0";

int total = 0;
var list = db.SqlQueryable<ShipmentDto>(sql)
    .WhereIF(!string.IsNullOrEmpty(req.CustomerName),
        $"c.Name LIKE '%{req.CustomerName}%'")
    .OrderBy("s.ShipDate DESC")
    .ToPageList(req.PageIndex, req.PageSize, ref total);

return new PageResult<ShipmentDto> { Data = list, Total = total };
```

---

## 注意事項

- ORDER BY 要寫在 .OrderBy() 方法內，不要寫在 SQL 字串裡
- SqlQueryable 只支援簡單查詢 SQL，複雜 SQL（CTE、UNION、預存程序）請用 db.Ado.SqlQuery
- IsOwnsOne 映射時，兩個子類別的欄位名不能重複，否則會映射錯誤
- AddParameters 傳陣列做 IN 查詢時，SQL 中的佔位符用 @ids，陣列直接傳入即可
