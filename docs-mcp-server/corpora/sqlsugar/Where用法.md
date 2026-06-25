# SqlSugar — Where 用法筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=1184)

## 速查表

| 需求 | 語法 |
|---|---|
| 基本條件 | .Where(it => it.Id == id) |
| AND | .Where(it => it.Id == 1 && it.Status == 1) |
| OR | .Where(it => it.Id == 1 \|\| it.Name.Contains("A")) |
| 條件成立才加 | .WhereIF(id > 0, it => it.Id == id) |
| 直接 SQL | .Where("id = @id", new { id = 1 }) |
| 動態 JSON 條件 | .Where(db.Utilities.JsonToConditionalModels(json)) |
| 動態表達式 | .Where(Expressionable.Create\<T\>().And(...).ToExpression()) |
| 根據實體類查詢 | .WhereClass(entity, ignoreDefaultValue: true) |
| 根據主鍵查詢 | .WhereClassByPrimaryKey(entity) |
| 字典批量過濾 | .WhereColumns(List\<Dictionary\<string, object\>\>) |
| SqlFunc 函數 | .Where(it => SqlFunc.DateIsSame(it.Time, DateTime.Now)) |
| 子查詢 | .Where(it => SqlFunc.Subqueryable\<T\>().Where(...).Any()) |
| 字串表達式（5.1.4.107+）| .Where("it", $"it.Name=={"A"}") |

---

## 一、普通 Lambda 表達式

```csharp
// 等於
var list = db.Queryable<Order>().Where(it => it.Id == id).ToList();

// AND（多個條件）
var list = db.Queryable<Order>()
    .Where(it => it.Id > 0 && it.Status == 1)
    .ToList();

// OR
var list = db.Queryable<Order>()
    .Where(it => it.Id == 1 || it.Name.Contains("A"))
    .ToList();
// → WHERE Id = 1 OR Name LIKE '%A%'
```

**✅ 實際案例：訂單搜尋，多欄位關鍵字 OR 查詢**

```csharp
string keyword = "王小明";

var list = db.Queryable<Order>()
    .Where(it => it.IsDeleted == false)
    .Where(it =>
        it.OrderNo.Contains(keyword) ||
        it.CustomerName.Contains(keyword) ||
        it.Remark.Contains(keyword))
    .ToList();
```

---

## 二、WhereIF（條件成立才加入）

```csharp
var list = db.Queryable<Order>()
    .WhereIF(id > 0,                             it => it.Id == id)
    .WhereIF(!string.IsNullOrEmpty(name),        it => it.Name.Contains(name))
    .WhereIF(status.HasValue,                    it => it.Status == status.Value)
    .WhereIF(startDate.HasValue,                 it => it.CreateTime >= startDate.Value)
    .WhereIF(endDate.HasValue,                   it => it.CreateTime <= endDate.Value)
    .ToList();
// 條件不成立時完全不加入 SQL，不會產生 1=1
```

**✅ 實際案例：出貨單列表多條件篩選**

```csharp
public List<ShipmentDto> GetShipments(ShipmentQueryRequest req)
{
    return db.Queryable<Shipment>()
        .Where(s => s.IsDeleted == false)
        .WhereIF(!string.IsNullOrEmpty(req.ShipmentNo),
            s => s.ShipmentNo.Contains(req.ShipmentNo))
        .WhereIF(!string.IsNullOrEmpty(req.CustomerName),
            s => s.CustomerName.Contains(req.CustomerName))
        .WhereIF(req.StartDate.HasValue,
            s => s.ShipDate >= req.StartDate.Value)
        .WhereIF(req.EndDate.HasValue,
            s => s.ShipDate <= req.EndDate.Value)
        .WhereIF(req.Status.HasValue,
            s => s.Status == req.Status.Value)
        .OrderBy(s => s.ShipDate, OrderByType.Desc)
        .ToList();
}
```

---

## 三、直接 SQL 字串

```csharp
// 單條件
var list = db.Queryable<Order>()
    .Where("id = @id", new { id = 1 })
    .ToList();

// 複合條件
var list = db.Queryable<Order>()
    .Where("id = @id OR name LIKE '%' + @name + '%'",
        new { id = 1, name = "jack" })
    .ToList();
```

---

## 四、動態 JSON 條件

前端傳入 JSON，後端轉成 Where 條件（詳見表格查詢筆記）。

```csharp
// 前端傳入格式
// [{"FieldName":"Id","ConditionalType":"0","FieldValue":"1"},
//  {"FieldName":"Name","ConditionalType":"1","FieldValue":"A"}]

var conModels = db.Utilities.JsonToConditionalModels(json);
var list = db.Queryable<Order>().Where(conModels).ToList();
// → WHERE Id = 1 AND Name LIKE '%A%'

// 手動建構
var cs = new List<IConditionalModel>
{
    new ConditionalModel
    {
        FieldName       = "Id",
        ConditionalType = ConditionalType.Equal,
        FieldValue      = "1"
    }
};
var list = db.Queryable<Order>().Where(cs).ToList();
```

---

## 五、動態表達式（Expressionable）

```csharp
// AND + OR 混合
var exp = Expressionable.Create<Order>()
    .And(it => it.IsDeleted == false)
    .And(it => it.Status == 1)
    .Or(it => it.Priority == 99)   // 緊急單不管狀態都顯示
    .ToExpression();               // 不能少這一句

var list = db.Queryable<Order>().Where(exp).ToList();

// 多表動態表達式
var exp = Expressionable.Create<Order, Customer>()
    .And((o, c) => o.CustomerId == c.Id)
    .AndIF(!string.IsNullOrEmpty(customerName),
        (o, c) => c.Name.Contains(customerName))
    .ToExpression();
```

---

## 六、條件拼接（累加 Where）

```csharp
var query = db.Queryable<Order>().Where(it => it.IsDeleted == false);

if (!string.IsNullOrEmpty(name))
    query.Where(it => it.Name.Contains(name));

if (id > 0)
    query.Where(it => it.Id == id);

// 同一個 query 用在多個地方時必須 Clone
int count = query.Clone().Count();
var list  = query.Clone().ToList();
```

---

## 七、根據實體類查詢（WhereClass）

```csharp
// 根據實體的非預設值欄位查詢（Id=0 不當條件，Id=1 當條件）
var list = db.Queryable<Order>()
    .WhereClass(new Order { Name = "A", Status = 1 }, ignoreDefaultValue: true)
    .ToList();
// → WHERE Name = 'A' AND Status = 1（Id=0 被忽略）

// 支援集合（IN 效果）
var list = db.Queryable<Order>()
    .WhereClass(orderList, ignoreDefaultValue: true)
    .ToList();
```

---

## 八、根據主鍵查詢（WhereClassByPrimaryKey）

```csharp
// 單一物件
var list = db.Queryable<Order>()
    .WhereClassByPrimaryKey(new Order { Id = 1 })
    .ToList();
// → WHERE Id = 1

// 集合（批量主鍵查詢）
var list = db.Queryable<Order>()
    .WhereClassByPrimaryKey(orderList)
    .ToList();
// → WHERE Id IN (1, 2, 3...)
```

---

## 九、字典批量過濾（WhereColumns）

適合多欄位組合批量過濾。

```csharp
var conditions = new List<Dictionary<string, object>>
{
    new Dictionary<string, object> { ["OrderNo"] = "A001", ["Status"] = 1 },
    new Dictionary<string, object> { ["OrderNo"] = "A002", ["Status"] = 2 }
};

var list = db.Queryable<Order>().WhereColumns(conditions).ToList();
// → WHERE (OrderNo='A001' AND Status=1) OR (OrderNo='A002' AND Status=2)
```

---

## 十、Where 中使用 SqlFunc

```csharp
// 時間函數
var list = db.Queryable<Order>()
    .Where(it => SqlFunc.DateIsSame(it.CreateTime, DateTime.Now))
    .ToList();

// LIKE
var list = db.Queryable<Order>()
    .Where(it => SqlFunc.Contains(it.Name, "關鍵字"))
    .ToList();

// IsNull
var list = db.Queryable<Order>()
    .Where(it => SqlFunc.IsNullOrEmpty(it.Remark))
    .ToList();
```

---

## 十一、Where 中使用子查詢

```csharp
// EXISTS：只查有對應記錄的主表
var list = db.Queryable<Order>()
    .Where(o => SqlFunc.Subqueryable<OrderDetail>()
        .Where(d => d.OrderId == o.Id)
        .Any())
    .ToList();

// NOT EXISTS
var list = db.Queryable<Order>()
    .Where(o => SqlFunc.Subqueryable<OrderDetail>()
        .Where(d => d.OrderId == o.Id)
        .NotAny())
    .ToList();
```

---

## 十二、字串表達式（5.1.4.107+）

啟動時設定一次，之後可用字串直接寫 Where 條件（適合低程式碼場景）。

```csharp
// 啟動設定
StaticConfig.DynamicExpressionParserType = typeof(DynamicExpressionParser);
StaticConfig.DynamicExpressionParsingConfig = new ParsingConfig
{
    CustomTypeProvider = new SqlSugarTypeProvider()
};

// 一般條件（it 是固定別名）
var list = db.Queryable<Order>().Where("it", $"it.Name == {"A"}").ToList();

// 導航屬性條件
var list = db.Queryable<Order>().Where("it", $"SqlFunc.Exists(it.Customer.Id)").ToList();

// 動態欄位 + 參數化
string field = "it.Amount";
FormattableString str = FormattableStringFactory.Create(field + " > {0}", 1000);
var list = db.Queryable<Order>().Where("it", str).ToList();
```

---

## 注意事項

- && 表示 AND，|| 表示 OR，和 C# 一致
- WhereIF 條件不成立時完全不加入 SQL，不會出現 1=1
- WhereClass 的 ignoreDefaultValue=true 會忽略 int=0、bool=false、string=null 等預設值欄位
- 字串表達式的值用 $"{}" 傳入確保參數化，不要直接硬拼字串
- Where 條件是累加的（引用類型），多處使用同一個 query 記得 Clone
