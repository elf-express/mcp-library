# SqlSugar — 輔助方法（db.Utilities）筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=2364)

## 功能說明

`db.Utilities` 提供一系列資料轉換、序列化、快取管理等常用工具方法，
透過 `db.Utilities.方法名` 呼叫。

---

## 方法速查表

| 方法 | 說明 | 回傳 |
|---|---|---|
| DataTableToList\<T\>(dt) | DataTable 轉實體 List | List\<T\> |
| DataTableToDynamic(dt) | DataTable 轉 dynamic List | List\<dynamic\> |
| DataTableToDictionary(dt) | DataTable 轉字典 | List\<Dictionary\<string,object\>\> |
| DataReaderToList\<T\>(reader) | DataReader 轉實體 List | List\<T\> |
| DataReaderToExpandoObject(reader) | DataReader 轉單個 ExpandoObject | ExpandoObject |
| DataReaderToExpandoObjectList(reader) | DataReader 轉 ExpandoObject List | List\<ExpandoObject\> |
| SerializeObject(obj) | 序列化物件為 JSON 字串 | string |
| DeserializeObject\<T\>(json) | JSON 字串反序列化為物件 | T |
| TranslateCopy\<T\>(obj) | 複製物件（深複製）| T |
| PageEach\<T\>(list, pageSize, action) | 記憶體分頁處理 | void |
| RemoveCacheAll() | 清空 ORM 所有快取（不建議用）| void |
| RemoveCacheByLikeKey\<T\>(key) | 按 Key 前綴清除指定快取 | void |

---

## 一、DataTable 轉換

```csharp
// DataTable → 實體 List
DataTable dt = db.Ado.GetDataTable("SELECT * FROM [Order]");
List<Order> list = db.Utilities.DataTableToList<Order>(dt);

// DataTable → dynamic List（無需實體）
List<dynamic> dynList = db.Utilities.DataTableToDynamic(dt);
foreach (dynamic row in dynList)
{
    Console.WriteLine(row.Name);  // 直接點屬性
}

// DataTable → 字典集合（低程式碼常用）
List<Dictionary<string, object>> dictList = db.Utilities.DataTableToDictionary(dt);
foreach (var row in dictList)
{
    Console.WriteLine(row["Name"]);  // 透過 Key 取值
}

// 多結果集使用（配合 GetDataSetAll）
DataSet ds = db.Ado.GetDataSetAll("SELECT * FROM T1; SELECT * FROM T2");
var t1 = db.Utilities.DataTableToList<Order>(ds.Tables[0]);
var t2 = db.Utilities.DataTableToList<Customer>(ds.Tables[1]);
```

---

## 二、DataReader 轉換

```csharp
// DataReader → 實體 List
using var reader = db.Ado.GetDataReader("SELECT * FROM [Order] WHERE Status = @s",
    new { s = 1 });
var list = db.Utilities.DataReaderToList<Order>(reader);

// DataReader → ExpandoObject List（動態物件）
using var reader2 = db.Ado.GetDataReader("SELECT Id, Name FROM [Order]");
var dynList = db.Utilities.DataReaderToExpandoObjectList(reader2);
foreach (dynamic row in dynList)
{
    Console.WriteLine($"{row.Id} - {row.Name}");
}
```

---

## 三、序列化 / 反序列化

```csharp
// 序列化（使用 SqlSugar 內建序列化器）
var order = new Order { Id = 1, Name = "測試訂單", Amount = 100m };
string json = db.Utilities.SerializeObject(order);
// → {"Id":1,"Name":"測試訂單","Amount":100.0}

// 序列化集合（常用於 JSON 欄位的 ContainsArray 參數）
var ids = new int[] { 1, 2, 3 };
string idsJson = db.Utilities.SerializeObject(ids);
// → [1,2,3]

// 反序列化
Order orderObj = db.Utilities.DeserializeObject<Order>(json);
List<int> idList = db.Utilities.DeserializeObject<List<int>>(idsJson);
```

---

## 四、物件複製（深複製）

```csharp
// 深複製實體物件（修改副本不影響原始物件）
var original = new Order { Id = 1, Name = "原始訂單", Amount = 100m };
var copy = db.Utilities.TranslateCopy<Order>(original);

copy.Name = "修改副本";
Console.WriteLine(original.Name);  // → "原始訂單"（不受影響）
Console.WriteLine(copy.Name);      // → "修改副本"

// 也可以用於 DTO 轉換（比 Adapt 更保守，相同欄位名稱複製）
var dto = db.Utilities.TranslateCopy<OrderDto>(order);
```

---

## 五、記憶體分頁處理（PageEach）

適合大量資料需要分批處理的場景（如大量插入、批次匯出）。

```csharp
// 取得所有資料後分批處理（每批 100 筆）
var allOrders = db.Queryable<Order>().ToList();

db.Utilities.PageEach(allOrders, 100, pageList =>
{
    // 每次傳入 100 筆
    db.Insertable(pageList).ExecuteCommand();
});

// 實際案例：Excel 匯入分批寫入
public async Task ImportExcelAsync(List<OrderImportDto> importList)
{
    var orders = importList.Adapt<List<Order>>();

    db.Utilities.PageEach(orders, 500, batch =>
    {
        db.Storageable(batch)
            .WhereColumns(it => it.OrderNo)  // 以訂單編號做 Upsert
            .ExecuteCommand();
    });
}

// 大量更新分批（避免一次更新太多造成鎖定）
db.Utilities.PageEach(updateList, 200, batch =>
{
    db.Updateable(batch).ExecuteCommand();
});
```

---

## 六、快取管理

```csharp
// 清除指定 Key 前綴的快取（動態建類更新結構後使用）
db.Utilities.RemoveCacheByLikeKey<Type>("Order");
// 清除所有 Key 中含 "Order" 的 Type 快取

// 清除動態建類互相導航的快取
db.Utilities.RemoveCacheByLikeKey<Tuple<Type, Type>>("Order");

// 清空 ORM 所有快取（謹慎使用，影響效能）
// db.Utilities.RemoveCacheAll();
```

---

## 七、搭配其他功能的常見組合

```csharp
// 1. Ado 原生 SQL 查詢結果 → 實體
DataTable dt = db.Ado.GetDataTable(sql);
var list = db.Utilities.DataTableToList<Order>(dt);

// 2. 多結果集處理
DataSet ds = db.Ado.GetDataSetAll("SELECT * FROM T1; SELECT * FROM T2; SELECT * FROM T3");
var tables = ds.Tables.Cast<DataTable>().ToList();
var orders    = db.Utilities.DataTableToList<Order>(tables[0]);
var customers = db.Utilities.DataTableToList<Customer>(tables[1]);
var items     = db.Utilities.DataTableToList<OrderItem>(tables[2]);

// 3. Json 欄位 ContainsArray 的參數序列化
var statusList = new int[] { 1, 2, 3 };
var json = db.Utilities.SerializeObject(statusList);
var result = db.Queryable<Order>()
    .Where(it => SqlFunc.JsonArrayAny(it.StatusHistory, statusList))
    .ToList();

// 4. 大量資料匯出分批讀取
var allData = db.Queryable<Order>().Where(it => it.CreateTime >= startDate).ToList();
db.Utilities.PageEach(allData, 1000, batch =>
{
    // 每批 1000 筆寫入 Excel
    worksheet.AppendRows(batch);
});
```

---

## 注意事項

- `RemoveCacheAll()` 會清除所有 ORM 快取（含實體 Mapping、表結構等），效能影響大，一般不建議使用
- `TranslateCopy` 是深複製，比淺複製慢，大量物件複製時考慮用 Mapster 的 Adapt
- `PageEach` 是同步方法，非同步場景需自行拆分（手動 `Skip/Take`）
- DataReader 使用後必須釋放（用 `using`），`DataReaderToList` 內部會自動讀取完畢
- `SerializeObject` / `DeserializeObject` 使用的是 SqlSugar 內建序列化器（預設 Newtonsoft.Json），可透過設定替換
