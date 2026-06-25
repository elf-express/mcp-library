# SqlSugar — 動態建類 CRUD 筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=2562)


[//]: # (sqlsugar-cheatsheet)
## 速查表

| 需求 | 語法 |
|---|---|
| 動態建類 | db.DynamicBuilder().CreateClass("表名", attr) |
| 查詢 | db.QueryableByObject(type) |
| 插入 | db.InsertableByObject(obj) |
| 更新 | db.UpdateableByObject(obj) |
| 刪除 | db.DeleteableByObject(obj) |
| 有則更新無則插 | db.StorageableByObject(obj) |
| 動態建表 | db.CodeFirst.InitTables(type) |
| 分表 | .SplitTable() |
| 加索引 | DynamicBuilder + [SugarIndex] |

---

## 核心優點

- 多資料庫支援最完整（純字典做不到的，動態建類都能做到）
- 支援所有類的額外功能：AOP、過濾器、導航查詢、分表等
- 可動態建表（CodeFirst.InitTables）

## 重要原則

相同結構的 Type 必須快取，無限建立會導致記憶體洩漏。使用 `.WithCache()` 或自行管理快取。

---

## 一、基本 CRUD 流程

```csharp
// 步驟一：建立類型 Builder
var typeBuilder = db.DynamicBuilder()
    .CreateClass("Order", new SugarTable());

// 步驟二：逐一新增屬性（可迴圈）
typeBuilder.CreateProperty("Id",   typeof(int),    new SugarColumn { IsPrimaryKey = true, IsIdentity = true });
typeBuilder.CreateProperty("Name", typeof(string), new SugarColumn());
typeBuilder.CreateProperty("Amount", typeof(decimal), new SugarColumn());
typeBuilder.CreateProperty("CreateTime", typeof(DateTime), new SugarColumn());

// 步驟三：快取並建立 Type（相同結構只建一次）
typeBuilder.WithCache();  // 快取 Key = 表名 + 所有欄位名稱組合
var type = typeBuilder.BuilderType();

// 步驟四：建表（首次使用時）
db.CodeFirst.InitTables(type);

// 步驟五：字典 → 物件
var dic   = new Dictionary<string, object>
{
    ["Name"]       = "Jack",
    ["Amount"]     = 100m,
    ["CreateTime"] = DateTime.Now
};
var obj = db.DynamicBuilder().CreateObjectByType(type, dic);
// 也可以傳 List<Dictionary<string, object>>
// var objList = db.DynamicBuilder().CreateObjectByType(type, listOfDic);

// 步驟六：CRUD 操作
db.InsertableByObject(obj).ExecuteCommand();   // 插入
db.UpdateableByObject(obj).ExecuteCommand();   // 更新
db.DeleteableByObject(obj).ExecuteCommand();   // 刪除
db.StorageableByObject(obj).ExecuteCommand();  // 插入或更新

// 查詢（5.1.4.84+，API 同無實體多庫查詢）
var list = db.QueryableByObject(type).ToList();
```

**✅ 實際案例：低程式碼平台通用 CRUD（從設定建動態類）**

```csharp
// 從資料庫讀取欄位設定，動態建立類型
public Type BuildDynamicType(string tableName, List<ColumnConfig> columns)
{
    var builder = db.DynamicBuilder().CreateClass(tableName, new SugarTable());

    foreach (var col in columns)
    {
        var csType = Type.GetType(col.CSharpType) ?? typeof(string);
        var sugarCol = new SugarColumn
        {
            IsPrimaryKey = col.IsPk,
            IsIdentity   = col.IsIdentity,
            IsNullable   = col.IsNullable,
            ColumnName   = col.ColumnName
        };
        builder.CreateProperty(col.PropertyName, csType, sugarCol);
    }

    builder.WithCache();
    return builder.BuilderType();
}
```

---

## 二、動態建類 + 分表

```csharp
// 建立帶分表特性的動態類型（按天分表）
var type = db.DynamicBuilder()
    .CreateClass("OrderLog", new SugarTable(), null, null,
        new SplitTableAttribute(SplitType.Day))  // 按天分表
    .CreateProperty("Id",   typeof(int),      new SugarColumn { IsPrimaryKey = true, IsIdentity = true })
    .CreateProperty("Time", typeof(DateTime), new SugarColumn(), isSplitField: true)  // true = 分表欄位
    .CreateProperty("Name", typeof(string),   new SugarColumn())
    .WithCache()
    .BuilderType();

// 建表
db.CodeFirst.InitTables(type);

var obj = db.DynamicBuilder().CreateObjectByType(type, new Dictionary<string, object>
{
    ["Time"] = DateTime.Now,
    ["Name"] = "分表測試"
});

// 分表 CRUD
db.InsertableByObject(obj).SplitTable().ExecuteCommand();
db.UpdateableByObject(obj).SplitTable().ExecuteCommand();
db.DeleteableByObject(obj).SplitTable().ExecuteCommand();
db.QueryableByObject(type).SplitTable().ToList();
```

---

## 三、複雜建類

### 3.1 繼承基類或介面

```csharp
// 繼承現有的 Order 類，並新增額外欄位
var type = db.DynamicBuilder()
    .CreateClass("OrderExtended", new SugarTable(),
        baseType: typeof(Order))   // 繼承 Order 的所有屬性
    .CreateProperty("ExtraField", typeof(string), new SugarColumn())
    .BuilderType();

db.CodeFirst.InitTables(type);
```

CreateClass 完整參數：
```csharp
public DynamicProperyBuilder CreateClass(
    string entityName,
    SugarTable table            = null,
    Type       baseType         = null,       // 繼承的基類
    Type[]     interfaces       = null,       // 實作的介面
    SplitTableAttribute split   = null)       // 分表特性
```

### 3.2 樹型結構（屬性是自身類型，5.1.4.125+）

```csharp
// 建立樹型結構的動態類
var builder = db.DynamicBuilder().CreateClass("TreeNode", new SugarTable());
builder.CreateProperty("Id",       typeof(int),    new SugarColumn { IsPrimaryKey = true });
builder.CreateProperty("Name",     typeof(string), new SugarColumn());
builder.CreateProperty("ParentId", typeof(int),    new SugarColumn());

// 子節點集合：List<當前類>
builder.CreateProperty("Children", typeof(DynamicOneselfTypeList), new SugarColumn());

// 父節點：當前類
builder.CreateProperty("Parent", typeof(DynamicOneselfType), new SugarColumn());

builder.WithCache();
var type = builder.BuilderType();
```

### 3.3 互相導航的兩個類（A 有 B，B 有 A，5.1.4.157+）

```csharp
// 先定義兩個 Builder（不急著 BuilderType）
var aBuilder = db.DynamicBuilder().CreateClass("TableA")
    .CreateProperty("AId", typeof(int))
    .CreateProperty("BId", typeof(int))
    .CreateProperty("BItem", typeof(NestedObjectType),
        navigate: new Navigate(NavigateType.OneToOne, "BId"));

var bBuilder = db.DynamicBuilder().CreateClass("TableB")
    .CreateProperty("BId", typeof(int))
    .CreateProperty("AList", typeof(NestedObjectTypeList),
        navigate: new Navigate(NavigateType.OneToMany, "BId"))
    .WithCache();

// 一次建立兩個有互相參照的 Type
var (typeA, typeB) = bBuilder.BuilderTypes(aBuilder);

db.CodeFirst.InitTables(typeA);
db.CodeFirst.InitTables(typeB);
```

---

## 四、加索引

```csharp
// 建立普通索引
db.DbMaintenance.CreateIndex("Order", new[] { "CustomerId" });

// 建立唯一索引
db.DbMaintenance.CreateIndex("Order", new[] { "OrderNo" }, isUnique: true);

// 建立多欄位索引（含自訂索引名）
db.DbMaintenance.CreateIndex("Order", new[] { "CustomerId", "Status" }, "IX_Order_Cust_Status");
```

---

## 五、導航查詢

### 5.1 導航過濾（字串表達式，5.1.4.107+）

```csharp
// 設定動態表達式（程式啟動時一次）
StaticConfig.DynamicExpressionParserType = typeof(DynamicExpressionParser);

// 導航過濾：地址 Id = 1 的記錄
var list = db.QueryableByObject(type)
    .Where("it", "it => it.Address.Id == 1")
    .ToList();

// 導航過濾：有任何相關人員的記錄
var list2 = db.QueryableByObject(type)
    .Where("it", "it => it.Persons.Any(s => s.AddressId == it.Id)")
    .ToList();
```

### 5.2 導航填充（Includes）

```csharp
// 填充導航屬性（類似 EF Core 的 Include）
var list = db.QueryableByObject(type)
    .Includes("OrderInfo")       // 填充一對一導航
    .Includes("OrderItems")      // 填充一對多導航
    .Includes("A1", "A2")        // A1 下面還有 A2（巢狀）
    .ToList();
```

### 5.3 動態建立導航屬性（5.1.4.110+）

```csharp
var builder = db.DynamicBuilder().CreateClass("Student", new SugarTable());
builder.CreateProperty("Id",     typeof(int),    new SugarColumn { IsPrimaryKey = true, IsIdentity = true });
builder.CreateProperty("Name",   typeof(string), new SugarColumn());

// 一對一導航（Student 有一個 School）
builder.CreateProperty("School", typeof(Order),
    navigate: new Navigate(NavigateType.OneToOne, "Id"));

// 一對多導航（Student 有多個 Books）
builder.CreateProperty("Books", typeof(List<Order>),
    navigate: new Navigate(NavigateType.OneToMany, nameof(Order.Id)));

builder.WithCache();
var type = builder.BuilderType();

// 使用導航查詢
var list = db.QueryableByObject(type)
    .Includes("School")
    .Includes("Books")
    .ToList();
```

---

## 六、清除快取

```csharp
// 欄位結構有修改時，需要清除舊快取後重新建立
db.Utilities.RemoveCacheByLikeKey<Type>("ClassName");

// 互相導航（3.3 那種兩個 Type 一起建的情況）
db.Utilities.RemoveCacheByLikeKey<Tuple<Type, Type>>("ClassName");
```

---

## 注意事項

- WithCache 的快取 Key 是「表名 + 所有欄位名稱」的組合，結構相同時不會重複建立
- 不加 WithCache 或快取未命中，每次呼叫 BuilderType 都會重新建立 Type，大量請求下會記憶體洩漏
- 繼承基類時（3.1），若資料表已存在且非 CodeFirst 建的，需先刪除主鍵約束再 InitTables
- 分表欄位（isSplitField: true）必須是時間型別
- 互相導航的兩個類（3.3）需用 BuilderTypes 一次建立，不能分開呼叫 BuilderType
