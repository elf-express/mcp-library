# SqlSugar — 排序 OrderBy 筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=2312)

## 速查表

| 需求 | 語法 |
| --- | --- |
| 單欄位 ASC | .OrderBy(it => it.Id) |
| 單欄位 DESC | .OrderBy(it => it.Id, OrderByType.Desc) 或 SqlFunc.Desc(it.Id) |
| 多欄位 | .OrderBy(it => new { it.Id, name = SqlFunc.Desc(it.Name) }) |
| 計算欄位排序 | .MergeTable().OrderBy(it => it.計算欄位) |
| 動態排序（防注入） | OrderByPropertyName("欄位名") 或 OrderBy(List\<OrderByModel>) |
| 條件排序 | .OrderByIF(condition, it => it.Id) |
| 隨機排序 | .OrderBy(it => SqlFunc.GetRandom()) |
| Case When 排序 | .OrderBy(it => SqlFunc.IF(...).Return(...).End(...)) |

---

## 一、OrderBy 的位置

### 1.1 放在 Select 前面（一般用法）

```
var list = db.Queryable<Student>()
    .LeftJoin<School>((st, sc) => st.SchoolId == sc.Id)
    .OrderBy((st, sc) => st.SchoolId)   // ← Select 前面
    .Select((st, sc) => new Dto() { id = st.Id, Name = st.Name })
    .ToList();
```

**✅ 實際案例：訂單列表依建立時間排序**

```
var orders = db.Queryable<Order>()
    .LeftJoin<Customer>((o, c) => o.CustomerId == c.Id)
    .OrderBy((o, c) => o.CreateTime, OrderByType.Desc)  // ← Select 前面
    .Select((o, c) => new OrderDto()
    {
        OrderNo      = o.OrderNo,
        CustomerName = c.Name,
        CreateTime   = o.CreateTime
    })
    .ToList();
```

---

### 1.2 放在 Select 後面（計算欄位排序）

Select 中有計算欄位時，需加 MergeTable() 後才能 OrderBy

```
var list = db.Queryable<Student>()
    .LeftJoin<School>((st, sc) => st.SchoolId == sc.Id)
    .Select((st, sc) => new Dto() { NewNum = st.Num + st.Num2, Name = st.Name })
    .MergeTable()              // ← 必要
    .OrderBy(it => it.NewNum)
    .ToList();
```

**✅ 實際案例：發票金額 = 未稅 + 稅額，依總金額排序**

```
var invoices = db.Queryable<Invoice>()
    .Select(it => new InvoiceDto()
    {
        InvoiceNo   = it.InvoiceNo,
        TotalAmount = it.Amount + it.TaxAmount  // 計算欄位
    })
    .MergeTable()                               // ← 必要，才能對 TotalAmount 排序
    .OrderBy(it => it.TotalAmount, OrderByType.Desc)
    .ToList();
```

---

## 二、多欄位排序

```
// 方法 A：new 物件，混合 ASC / DESC
.OrderBy(it => new { it.Id, name = SqlFunc.Desc(it.Name) });
// → ORDER BY id ASC, name DESC

// 方法 B：鏈式多個 OrderBy
.OrderBy(it => it.Id)
.OrderBy(it => SqlFunc.Desc(it.Name));
```

**✅ 實際案例：出貨單先依狀態 ASC，再依建立時間 DESC**

```
// 狀態小的優先顯示（待出貨 < 已出貨），同狀態的依時間由新到舊
var shipments = db.Queryable<Shipment>()
    .OrderBy(it => new
    {
        it.Status,                                    // ASC
        CreateTime = SqlFunc.Desc(it.CreateTime)      // DESC
    })
    .ToList();
// → ORDER BY Status ASC, CreateTime DESC
```

---

## 三、聯表排序

```
var list = db.Queryable<Student>()
    .LeftJoin<School>((st, sc) => st.SchoolId == sc.Id)
    .OrderBy(st => st.Id)                           // ASC
    .OrderBy((st, sc) => sc.Id, OrderByType.Desc)   // DESC
    .Select<ViewModelStudent>()
    .ToList();
// → ORDER BY st.id, sc.id DESC
```

*   ⚠️ 若有 Select，OrderBy 一定要寫在 Select **前面**，否則 st / sc 別名拿不到

**✅ 實際案例：訂單明細聯倉庫表，先依倉庫編號 ASC、再依商品名稱 DESC**

```
var details = db.Queryable<OrderDetail>()
    .LeftJoin<Warehouse>((d, w) => d.WarehouseId == w.Id)
    .OrderBy((d, w) => w.Code)                            // 倉庫編號 ASC
    .OrderBy((d, w) => d.ProductName, OrderByType.Desc)   // 商品名稱 DESC
    .Select((d, w) => new OrderDetailDto()
    {
        ProductName   = d.ProductName,
        WarehouseCode = w.Code,
        Qty           = d.Qty
    })
    .ToList();
```

---

## 四、動態排序

### 4.1 字串排序

```
// SQL 字串（需注意 SQL Injection，可重寫 StaticConfig.Check_FieldFunc 驗證）
.OrderBy("st.id asc, sc.Id desc")

// 屬性名排序（100% 防注入，欄位不存在會報錯）
db.Queryable<Student>().OrderByPropertyName("Id").ToList();

// 合併表後排序（去掉多表別名，適合多表排序）
db.Queryable<Student>()
    .LeftJoin<School>((st, sc) => st.SchoolId == sc.Id)
    .Select(it => new { ... })
    .MergeTable()
    .OrderByPropertyName("Id")   // 100% 防注入
    .ToList();
```

*   💡 取得真實欄位名：EntityMaintenance.GetDbColumnName\<Order>("Id")（100% 防注入）

**✅ 實際案例：前端傳入排序欄位，後端安全套用**

```
// 前端傳入 sortField = "CreateTime"、sortOrder = "desc"
public List<OrderDto> GetOrders(string sortField, string sortOrder)
{
    // OrderByPropertyName 會驗證欄位是否存在，不存在直接報錯，不執行任意 SQL
    return db.Queryable<Order>()
             .OrderByPropertyName(
                 sortField,
                 sortOrder == "desc" ? OrderByType.Desc : OrderByType.Asc)
             .ToList();
}
```

---

### 4.2 集合方式排序 List\<OrderByModel>（推薦）

```
List<OrderByModel> orderList = OrderByModel.Create(
    new OrderByModel() { FieldName = "id",   OrderByType = OrderByType.Desc },
    new OrderByModel() { FieldName = "name" }  // 預設 ASC，自動防注入
);

var list = db.Queryable<Student>().AS("order").OrderBy(orderList).ToList();

// 取得欄位名（完全防注入）
FieldName = db.EntityMaintenance.GetDbColumnName<Order>("Id");
```

**✅ 實際案例：VxeTable 傳入多欄位排序條件**

```
// 前端 VxeTable 傳入排序陣列：
// [{ field: "CustomerName", order: "asc" }, { field: "CreateTime", order: "desc" }]

public List<OrderDto> GetOrderList(List<SortModel> sorts)
{
    var orderList = sorts.Select(s => new OrderByModel
    {
        // GetDbColumnName 確保欄位名對應資料庫，100% 防注入
        FieldName   = db.EntityMaintenance.GetDbColumnName<Order>(s.Field),
        OrderByType = s.Order == "desc" ? OrderByType.Desc : OrderByType.Asc
    }).ToList();

    return db.Queryable<Order>()
             .OrderBy(orderList)
             .ToList();
}
```

---

### 4.3 多表去別名後排序

```
var list = db.Queryable<Student>()
    .LeftJoin<School>((st, sc) => st.SchoolId == sc.Id)
    .Select((st, sc) => new { id = st.Id, name = sc.Name })
    .MergeTable()                        // 多表 → 單表
    .Where(it => it.id == 1)
    .OrderBy("name asc")                 // 單表不需前綴
    .ToList();
```

生成 SQL：

```
SELECT * FROM
  (SELECT st.id AS id, sc.name AS name FROM Student JOIN School ON ...) MergeTable
WHERE id = @id
ORDER BY name ASC
```

**✅ 實際案例：出貨單聯客戶表，前端動態排序不需加表前綴**

```
// MergeTable 後多表已合為單表，前端直接傳欄位名即可，不需寫 s. 或 c.
var list = db.Queryable<Shipment>()
    .LeftJoin<Customer>((s, c) => s.CustomerId == c.Id)
    .Select((s, c) => new ShipmentDto()
    {
        ShipmentNo   = s.ShipmentNo,
        CustomerName = c.Name,
        ShipDate     = s.ShipDate
    })
    .MergeTable()
    .OrderBy("CustomerName asc, ShipDate desc")  // 不需寫 s. 或 c. 前綴
    .ToList();
```

---

## 五、隨機排序取 N 筆

```
db.Queryable<Student>()
    .Take(10)
    .OrderBy(st => SqlFunc.GetRandom())
    .ToList();
```

**✅ 實際案例：首頁隨機推薦 5 件商品**

```
// 每次請求都隨機取 5 筆上架中的商品，避免首頁永遠顯示同樣商品
var recommended = db.Queryable<Product>()
    .Where(it => it.Status == ProductStatus.OnSale)
    .Take(5)
    .OrderBy(it => SqlFunc.GetRandom())
    .ToList();
```

---

## 六、OrderByIF（條件排序）

```
.OrderByIF(isOrderBy, it => it.Id)
// isOrderBy = true 時才套用 OrderBy
```

**✅ 實際案例：有傳排序條件才套用，否則維持預設順序**

```
public List<OrderDto> GetOrders(string? sortField, string? sortOrder)
{
    bool hasSort = !string.IsNullOrEmpty(sortField);

    return db.Queryable<Order>()
             .Where(it => it.IsDeleted == false)
             .OrderByIF(hasSort && sortOrder == "desc",
                 it => it.CreateTime, OrderByType.Desc)
             .OrderByIF(hasSort && sortOrder != "desc",
                 it => it.CreateTime)
             .OrderBy(it => it.Id)    // 兜底排序，確保分頁穩定
             .ToList();
}
```

---

## 七、ThenBy

SqlSugar **沒有** ThenBy，直接連寫兩次 OrderBy 即可

```
.OrderBy(it => it.CreateTime, OrderByType.Desc)
.OrderBy(it => it.Id)
```

**✅ 實際案例：憑證先依日期 DESC，同日期再依憑證號 ASC**

```
// 等同 EF 的 .OrderByDescending(x => x.VoucherDate).ThenBy(x => x.VoucherNo)
var vouchers = db.Queryable<Voucher>()
    .Where(it => it.IsPosted == true)
    .OrderBy(it => it.VoucherDate, OrderByType.Desc)  // 第一排序鍵
    .OrderBy(it => it.VoucherNo)                       // 第二排序鍵（ThenBy）
    .ToList();
```

---

## 八、取最新 N 筆

```
// 方法 A
db.Queryable<Student>()
    .Take(10)
    .OrderBy(st => SqlFunc.Desc(st.CreateTime))
    .ToList();

// 方法 B（重載）
.OrderBy(it => it.CreateTime, OrderByType.Desc)
```

**✅ 實際案例：Dashboard 顯示最新 5 筆出貨通知**

```
var latestShipments = db.Queryable<Shipment>()
    .Where(it => it.Status == ShipStatus.Shipped)
    .Take(5)
    .OrderBy(it => it.ShipTime, OrderByType.Desc)
    .Select(it => new
    {
        it.ShipmentNo,
        it.CustomerName,
        it.ShipTime
    })
    .ToList();
```

---

## 九、排序加 CASE WHEN

```
db.Queryable<Student>()
    .OrderBy(st =>
        SqlFunc.IF(st.Type == 1).Return(st.A)
               .ElseIF(st.Type == 2).Return(st.B)
               .End(st.C)
    )
    .ToList();
```

**✅ 實際案例：訂單依狀態優先序排列（待付款 → 待出貨 → 其他）**

```
// 待付款(1) 最優先，待出貨(2) 次之，其餘排最後
var orders = db.Queryable<Order>()
    .OrderBy(it =>
        SqlFunc.IF(it.Status == 1).Return(1)     // 待付款 → 優先序 1
               .ElseIF(it.Status == 2).Return(2)  // 待出貨 → 優先序 2
               .End(3)                            // 其他   → 優先序 3
    )
    .OrderBy(it => it.CreateTime, OrderByType.Desc)  // 同優先序內依時間排
    .ToList();
```