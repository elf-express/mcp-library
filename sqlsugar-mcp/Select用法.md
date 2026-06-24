# SqlSugar — Select 用法筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=1186)

## Select 位置規則

正常情況：寫在最後，順序為 .Where(...).OrderBy(...).Select(...).ToList()

特殊情況：Select 不在最後時，需加 MergeTable() 合併成單表，再接後續操作：
.Select(...).MergeTable().Where(...)

語法糖：Select(...).MergeTable() 新版可用 .SelectMergeTable(it => new xxx())

---

## 速查表

| 需求 | 語法 |
|---|---|
| 單欄位 | .Select(it => it.Id).ToList() |
| 多欄位匿名物件 | .Select(it => new { id = it.Id, name = it.Name }) |
| 多欄位指定類別 | .Select(it => new OrderDto { Id = it.Id, Name = it.Name }) |
| 自動映射 DTO | .Select\<OrderDto\>() |
| 自動映射 + 手動指定 | .Select(it => new OrderDto { Count = 100 }, true) |
| SelectAll（o.\*）| Id = o.Id.SelectAll() |
| 命名規則自動映射 | .Select\<ViewOrder\>()（ClassName + 欄位名）|
| 計算欄位後再 Where | .Select(...).MergeTable().Where(...) |
| 排除某欄位 | .IgnoreColumns(it => it.Files) |
| 動態 Select（SQL）| .Select("id AS id1, name AS name") |
| 取得 DTO 類別字串 | .ToClassString("命名空間") |
| 返回元組 | .Select\<(int Id, string Name)\>("id, name").ToList() |
| Select 後 C# 處理 | .Mapper(it => { it.Name = it.Id + it.Name; }) |

---

## 一、返回單欄位

```csharp
// 回傳 List<int>
var ids = db.Queryable<Order>().Select(it => it.Id).ToList();

// 動態 SQL 方式
var ids = db.Queryable<Order>().Select<int>("id").ToList();
```

---

## 二、返回多欄位

```csharp
// 匿名物件（跨程式集需加 dynamic 轉型）
var list = db.Queryable<Order>()
    .Select(it => new { id = it.Id, name = it.Name })
    .ToList();

// dynamic 型別（可跨程式集）
List<dynamic> list = db.Queryable<Order>()
    .Select(it => (dynamic)new { id = it.Id, name = it.Name })
    .ToList();

// 指定類別（手動映射）
List<OrderDto> list = db.Queryable<Order>()
    .Select(it => new OrderDto { Id = it.Id, Name = it.Name })
    .ToList();

// 動態 SQL 方式
List<OrderDto> list = db.Queryable<Order>()
    .Select<OrderDto>("id AS Id, name AS Name")
    .ToList();
```

**✅ 實際案例：訂單列表只取需要的欄位（效能優化）**

```csharp
var list = db.Queryable<Order>()
    .LeftJoin<Customer>((o, c) => o.CustomerId == c.Id)
    .Where(o => o.IsDeleted == false)
    .OrderBy(o => o.CreateTime, OrderByType.Desc)
    .Select((o, c) => new OrderListDto
    {
        OrderNo      = o.OrderNo,
        CustomerName = c.Name,
        Amount       = o.Amount,
        Status       = o.Status,
        CreateTime   = o.CreateTime
    })
    .ToList();
```

---

## 三、自動映射 DTO（單表）

```csharp
// 全自動映射（欄位名對應）（5.1.3.2+）
var list = db.Queryable<Order>().Select<OrderDto>().ToList();

// 部分手動 + 其餘自動（5.1.3.35+）
var list = db.Queryable<Order>()
    .Select(it => new OrderDto
    {
        StatusName = it.Status == 1 ? "待審" : "已審"  // 手動指定計算欄位
    }, true)  // true = 其餘欄位依名稱自動映射
    .ToList();
```

---

## 四、多表 Select

### 4.1 手動 DTO（效能最好，推薦）

```csharp
var list = db.Queryable<Order>()
    .LeftJoin<OrderItem>((o, i) => o.Id == i.OrderId)
    .LeftJoin<Customer>((o, i, c) => o.CustomerId == c.Id)
    .Select((o, i, c) => new ViewOrder
    {
        OrderNo      = o.OrderNo,
        ItemPrice    = i.Price,
        CustomerName = c.Name
    })
    .ToList();
// → SELECT o.OrderNo, i.Price AS ItemPrice, c.Name AS CustomerName FROM ...
```

### 4.2 實體自動映射一（5.1.3.35+，語法最簡潔）

```csharp
var list = db.Queryable<Order>()
    .LeftJoin<Customer>((o, c) => o.CustomerId == c.Id)
    .Select((o, c) => new OrderDto
    {
        StatusName = "計算欄位"  // 手動指定
    }, true)  // true = 其餘欄位依名稱自動映射
    .ToList();
```

### 4.3 實體自動映射二（SelectAll / o.\*）

```csharp
var list = db.Queryable<Order>()
    .LeftJoin<Customer>((o, c) => o.CustomerId == c.Id)
    .Select((o, c) => new ViewOrder
    {
        Id           = o.Id.SelectAll(),  // 等於 o.*
        CustomerName = c.Name             // 額外取客戶名稱
    })
    .ToList();
// → SELECT o.*, c.Name AS CustomerName FROM ...
```

- SelectAll 建議只用一張表，多表容易欄位重名

### 4.4 實體自動映射三（命名規則，Class + 欄位名）

```csharp
// DTO 命名規則：
// 主表欄位直接用欄位名：Name → Order.Name
// 從表欄位用 Class名 + 欄位名：CustomerName → Customer.Name
public class ViewOrder
{
    public string Name         { get; set; }  // Order.Name
    public string CustomerName { get; set; }  // Customer.Name
    public decimal ItemPrice   { get; set; }  // OrderItem.Price
}

var list = db.Queryable<Order>()
    .LeftJoin<OrderItem>((o, i) => o.Id == i.OrderId)
    .LeftJoin<Customer>((o, i, c) => o.CustomerId == c.Id)
    .Select<ViewOrder>()
    .ToList();
```

- DTO 每個欄位都必須能匹配，否則無法自動映射
- 高並發場景建議手動映射，效能優於自動映射

### 4.5 只查一張表的欄位

```csharp
// 多表聯查，只取第三張表的資料
var list = db.Queryable<Order, OrderItem, Customer>((o, i, c) => new JoinQueryInfos(
        JoinType.Left, o.Id == i.OrderId,
        JoinType.Left, o.CustomerId == c.Id))
    .Select((o, i, c) => c)  // 只取 Customer 的資料
    .ToList();
```

### 4.6 取兩張表的資料

```csharp
var list = db.Queryable<Order, OrderItem, Customer>((o, i, c) => new JoinQueryInfos(
        JoinType.Left, o.Id == i.OrderId,
        JoinType.Left, o.CustomerId == c.Id))
    .Select((o, i, c) => new { o, i })  // 同時取 Order 和 OrderItem
    .ToList();
```

---

## 五、計算欄位後再查詢（MergeTable）

Select 中有計算欄位，需再套一層 Where / GroupBy 時使用。

```csharp
var list = db.Queryable<Order>()
    .Select(it => new Order
    {
        Id   = it.Id * 2,   // 計算欄位
        Name = it.Name
    })
    .MergeTable()            // 合併成新表
    .GroupBy(it => it.Id)
    .Select(it => new { id = it.Id })
    .ToList();

// 語法糖（等效）
var list = db.Queryable<Order>()
    .SelectMergeTable(it => new Order { Id = it.Id * 2, Name = it.Name })
    .Where(it => it.Id > 0)
    .ToList();
```

---

## 六、Select 後用 C# 處理資料（Mapper）

### 方式一：OnlyInSelectConvertToString（5.1.4.113+）

只能用在 Select 中，只支援字串回傳。

```csharp
var methodInfo = typeof(MyHelper).GetMethod("FormatName");

var list = db.Queryable<Order>()
    .Select(it => new
    {
        it.Id,
        Name = SqlFunc.OnlyInSelectConvertToString(it.Name, methodInfo)
    })
    .ToList();
```

### 方式二：Mapper（ToList 後處理，支援更多類型）

```csharp
// 實體類
var list = db.Queryable<Order>()
    .Select(it => new Order { Id = it.Id, Name = it.Name })
    .Mapper(it =>
    {
        it.Name = it.Id + " - " + it.Name;  // ToList 後逐筆處理
    })
    .ToList();

// 匿名物件（需轉成 dynamic）
var list = db.Queryable<Order>()
    .Select(it => (dynamic)new { Id = it.Id, Name = it.Name })
    .Mapper(it =>
    {
        it.Name = it.Id + " - " + it.Name;
    })
    .ToList();
```

**✅ 實際案例：狀態碼轉成文字描述**

```csharp
var statusMap = new Dictionary<int, string>
{
    [1] = "待出貨", [2] = "已出貨", [3] = "已完成", [4] = "已取消"
};

var list = db.Queryable<Order>()
    .Select(it => new OrderDto { Id = it.Id, Status = it.Status })
    .Mapper(it =>
    {
        it.StatusName = statusMap.GetValueOrDefault(it.Status, "未知");
    })
    .ToList();
```

---

## 七、排除特定欄位（IgnoreColumns）

```csharp
// 單表查詢，排除大欄位（如 Files、Content）
var list = db.Queryable<Order>()
    .IgnoreColumns(it => it.Files)
    .ToList();

// 主表排除
var leftQuery = db.Queryable<Order>().IgnoreColumns(it => it.Files);
var list = db.Queryable(leftQuery)
    .LeftJoin<OrderDetail>((o, d) => o.Id == d.OrderId)
    .Select(o => o)
    .ToList();

// Join 的表排除
var rightQuery = db.Queryable<OrderItem>().IgnoreColumns(it => it.Files);
var list = db.Queryable<Order>()
    .LeftJoin(rightQuery, (o, d) => o.Id == d.OrderId)
    .Select(o => o)
    .ToList();
```

---

## 八、動態 Select

```csharp
// 方式一：SelectModel 多庫相容
var selector = new List<SelectModel>
{
    new SelectModel { FiledName = "Id",   AsName = "id"   },
    new SelectModel { FiledName = "Name", AsName = "name" },
    new SelectModel { FiledName = "{string}:常數", AsName = "TypeName" }  // 常數值
};
var list = db.Queryable<Order>().Select(selector).ToList();

// 方式二：直接 SQL
var list = db.Queryable<Order>().Select("Id AS id, Name AS name").ToList();

// 方式三：字串表達式（需啟動設定）
var list = db.Queryable<Order>()
    .Select("it", $"it=>new(it.Id as Id, it.Name)", typeof(Order))
    .ToList();
```

---

## 九、別名寫法（AS）

```csharp
// Lambda 別名
.Select(it => new { id1 = it.Id, name2 = it.Name })
// → SELECT id AS id1, name AS name2

// SQL 別名
.Select("id AS id1, name AS name2")
```

---

## 十、返回元組（5.1.4.84+）

```csharp
List<(int Id, string Name)> list =
    db.Queryable<Order>()
        .Select<(int Id, string Name)>("id, name")
        .ToList();
```

---

## 十一、快速取得 DTO 類別程式碼

```csharp
// 根據 Select 結果自動生成 DTO 類別字串，方便開發
string classString = db.Queryable<Order>()
    .Select(it => new { it.Id, it.Name, it.Amount })
    .ToClassString("MyProject.Dto");

Console.WriteLine(classString);
// 輸出可直接貼上的 C# 類別程式碼
```

---

## 注意事項

- Select 指定了幾個欄位，SQL 就只查幾個欄位，不會 SELECT *
- Select 正常應該在最後，若要在 Select 後繼續 Where/OrderBy，需加 MergeTable()
- SelectAll（o.\*）建議只用在一張表，多表容易欄位重名
- 命名規則自動映射（方式三）每個欄位都必須能匹配到，否則整個映射失效
- Mapper 相當於 ToList 後做迴圈賦值，匿名物件需轉 dynamic 才能修改屬性
- IgnoreColumns 目前只支援單表查詢；聯表時需先建成 Queryable 再傳入
