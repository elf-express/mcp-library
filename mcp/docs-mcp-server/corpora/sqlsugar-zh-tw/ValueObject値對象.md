# SqlSugar — ValueObject 值物件筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=2576)

## 速查表

| 需求 | 語法 |
|---|---|
| 標記值物件欄位 | `[SugarColumn(IsOwnsOne = true)]` |
| 版本要求 | SqlSugarCore 5.1.4.141 以上 |
| 條件查詢值物件內欄位 | `.Where(it => it.Address.City == "city2")` |
| 投影值物件內欄位 | `.Select(it => new { it.Address.Street })` |
| 查詢用 DTO、插入更新用一維 | `.Select<DTO>()` |

---

## 一、功能說明

「值物件(Value Object)」讓**一張一維資料表**用**二維的物件結構**來表現:
資料庫仍是一張表、欄位是攤平的,但 C# 實體可以把部分欄位用一個子物件包起來。

### 1.1 與「一對一」的差別
- 一對一:是 **2 張表**。
- 值物件:是 **1 張表**,只是把同一張表的部分欄位用物件包起來。

### 1.2 與「JSON 欄位」的差別
- JSON 欄位:**1 個欄位**儲存多個欄位(序列化成 JSON 字串)。
- 值物件:儲存的是**多個獨立欄位**,只是接收時包成一個物件。

## 二、版本要求

SqlSugarCore **5.1.4.141** 及以上版本。

## 三、完整範例

實體定義:子物件用 `[SugarColumn(IsOwnsOne = true)]` 標記。

```csharp
public class Customer
{
    [SugarColumn(IsPrimaryKey = true)]
    public int CustomerId { get; set; }
    public string Name { get; set; }

    [SugarColumn(IsOwnsOne = true)]   // 標記為值物件
    public Address Address { get; set; }
}

public class Address
{
    // 子物件欄位一樣可用 SugarColumn 設定別名
    public string Street { get; set; }
    public string City { get; set; }
    public string ZipCode { get; set; }
}
```

對應的資料表仍是一維(欄位:`CustomerId`、`Name`、`Street`、`City`、`ZipCode`)。

插入 / 更新 / 查詢:

```csharp
// 插入
db.Insertable(new Customer {
    CustomerId = 1,
    Name = "name",
    Address = new Address { City = "city", Street = "street", ZipCode = "zipCode" }
}).ExecuteCommand();

// 更新
db.Updateable(new Customer {
    CustomerId = 1,
    Name = "name2",
    Address = new Address { City = "city2", Street = "street2", ZipCode = "zipCode2" }
}).ExecuteCommand();

// 查詢(回傳含 Address 子物件)
var list = db.Queryable<Customer>().ToList();

// 條件 + 投影:可直接存取值物件內的欄位
var list2 = db.Queryable<Customer>()
    .Where(it => it.Address.City == "city2")
    .Select(it => new { Street = it.Address.Street })
    .ToList();
```

> 說明:雖然實體是二維的,但對應的資料表是一維的。

## 四、技巧:查詢用 DTO(二維),插入更新用一維

有時候只有「查詢」想要二維結構,插入和更新仍用一維,可用 `Select<DTO>()`:

```csharp
var list3 = db.Queryable<普通實體>()
    .Select<Dto>()
    .ToList();

public class Dto
{
    public int CustomerId { get; set; }
    public string Name { get; set; }

    [SugarColumn(IsOwnsOne = true)]   // 標識為值物件
    public Address Address { get; set; }
}
```
