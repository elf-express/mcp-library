# SqlSugar — 鑑別器（Discriminator）筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=2567)


[//]: # (sqlsugar-cheatsheet)
## 速查表

| 需求 | 語法 |
|---|---|
| 用途 | 單表繼承(TPH),多型別共用一張表 |
| 實體設定 | [Discriminator] 鑑別欄位 + 各子類 |
| 建表 | db.CodeFirst.InitTables |
| 插入 | db.Insertable(子類) 自動寫鑑別值 |
| 查詢 | db.Queryable<子類>() 自動帶鑑別條件 |
| 更新 / 刪除 | 自動帶鑑別條件 |
| 導航 | 泛型導航查詢 |

---

> 需升級到 5.1.4.96-preview10+ 以修復聯表查詢中的錯誤

## 功能說明

鑑別器類似 TDengine 的超級表概念：**多個子類共用同一張資料表**，
透過一個「類型欄位」（如 `Type`）區分不同子類的資料。

- **查詢**時自動加上 `WHERE Type = N` 條件
- **插入/更新**時自動填入對應的 Type 值（實體中不需要這個欄位）
- 適合**單表繼承（Single Table Inheritance）**設計模式

---

## 一、基本設定

### 1.1 實體定義

```csharp
// 父類（基底表，不含 Discriminator）
[SugarTable("Animal", IsDisabledDelete = true)]  // 必須加 IsDisabledDelete
public class Animal
{
    [SugarColumn(IsIdentity = true, IsPrimaryKey = true)]
    public int AnimalId { get; set; }
    public string Name { get; set; }
}

// 子類：Dog（Discriminator 指定 Type = 1）
[SugarTable("Animal", Discrimator = "Type:1", IsDisabledDelete = true)]
public class Dog : Animal
{
    [SugarColumn(IsNullable = true)]
    public int DogId { get; set; }

    [SugarColumn(IsNullable = true)]
    public string Breed { get; set; }
}

// 子類：Cat（Discriminator 指定 Type = 2）
[SugarTable("Animal", Discrimator = "Type:2", IsDisabledDelete = true)]
public class Cat : Animal
{
    [SugarColumn(IsNullable = true)]
    public int CatId { get; set; }

    [SugarColumn(IsNullable = true)]
    public string Color { get; set; }
}
```

Discriminator 格式：
```
Discrimator = "欄位名:值"           // 單欄位
Discrimator = "Type:1,Name:a"      // 多欄位（不能有空格）
```

### 1.2 建表

```csharp
// 一次建立父類與所有子類的表結構（會包含所有子類欄位 + Type 分類欄位）
db.CodeFirst.InitTables<Animal, Dog, Cat>();

// 產生的表結構（Animal 表）：
// AnimalId (PK, Identity)
// Name
// Type          ← 自動新增的鑑別器欄位
// DogId
// Breed
// CatId
// Color
```

---

## 二、CRUD 操作

### 2.1 插入

```csharp
// 插入 Dog（Type 欄位在實體中不存在，ORM 自動填入 Type = 1）
var dog = new Dog { Name = "Buddy", Breed = "Golden Retriever" };
db.Insertable(dog).ExecuteCommand();
// → INSERT INTO Animal (Name, Type, DogId, Breed) VALUES ('Buddy', 1, 0, 'Golden Retriever')

// 插入 Cat（ORM 自動填入 Type = 2）
var cat = new Cat { Name = "Whiskers", Color = "Gray" };
db.Insertable(cat).ExecuteCommand();
// → INSERT INTO Animal (Name, Type, CatId, Color) VALUES ('Whiskers', 2, 0, 'Gray')
```

### 2.2 查詢

```csharp
// 查詢時自動加上 Type 條件
var dogs = db.Queryable<Dog>().ToList();
// → SELECT * FROM Animal WHERE Type = 1

var cats = db.Queryable<Cat>().ToList();
// → SELECT * FROM Animal WHERE Type = 2

// 條件查詢
var bigDogs = db.Queryable<Dog>()
    .Where(it => it.Breed == "Golden Retriever")
    .ToList();
// → SELECT * FROM Animal WHERE Type = 1 AND Breed = 'Golden Retriever'

// 查詢所有動物（不分類型）
var allAnimals = db.Queryable<Animal>().ToList();
// → SELECT * FROM Animal（沒有 Type 條件）
```

### 2.3 更新

```csharp
// 更新時 Type 欄位自動忽略（不會被更新）
var dog = db.Queryable<Dog>().First(it => it.AnimalId == 1);
dog.Name  = "Max";
dog.Breed = "Labrador";
db.Updateable(dog).ExecuteCommand();
// → UPDATE Animal SET Name='Max', Breed='Labrador' WHERE AnimalId=1
//   （Type 欄位不在更新範圍內）
```

### 2.4 刪除

```csharp
db.Deleteable<Dog>().Where(it => it.AnimalId == 1).ExecuteCommand();
// → DELETE FROM Animal WHERE AnimalId = 1 AND Type = 1
```

---

## 三、搭配導航查詢（泛型導航）

鑑別器的優勢在於**實體中不需要 Type 欄位**，可用泛型讓導航查詢更靈活：

```csharp
// 泛型表定義（父表持有子類集合）
[SugarTable("UnitTestDis")]  // 泛型類必須設定表名
public class AnimalOwner<T>
{
    [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
    public int Id { get; set; }

    public int AnimalId { get; set; }

    [Navigate(NavigateType.OneToMany, nameof(Animal.AnimalId), nameof(AnimalId))]
    public List<T> Animals { get; set; }
}

// 查詢時指定 T 決定導航哪種動物
var ownersWithDogs = db.Queryable<AnimalOwner<Dog>>()
    .Includes(x => x.Animals)
    .ToList();
// T = Dog → 導航查詢只取 Type = 1 的資料

var ownersWithCats = db.Queryable<AnimalOwner<Cat>>()
    .Includes(x => x.Animals)
    .ToList();
// T = Cat → 導航查詢只取 Type = 2 的資料
```

---

## 四、實際應用場景

### 4.1 IFRS 會計系統（多種憑證類型共用一表）

```csharp
// 會計憑證基底表
[SugarTable("Voucher", IsDisabledDelete = true)]
public class Voucher
{
    [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
    public int Id { get; set; }
    public string VoucherNo { get; set; }
    public DateTime VoucherDate { get; set; }
    public decimal TotalAmount { get; set; }
}

// 收款憑證（Type = 1）
[SugarTable("Voucher", Discrimator = "VoucherType:1", IsDisabledDelete = true)]
public class ReceiptVoucher : Voucher
{
    [SugarColumn(IsNullable = true)]
    public string ReceiptFrom { get; set; }
}

// 付款憑證（Type = 2）
[SugarTable("Voucher", Discrimator = "VoucherType:2", IsDisabledDelete = true)]
public class PaymentVoucher : Voucher
{
    [SugarColumn(IsNullable = true)]
    public string PaymentTo { get; set; }
}

// 轉帳憑證（Type = 3）
[SugarTable("Voucher", Discrimator = "VoucherType:3", IsDisabledDelete = true)]
public class TransferVoucher : Voucher
{
    [SugarColumn(IsNullable = true)]
    public string TransferReason { get; set; }
}

// 建表（一次建立所有類型的欄位）
db.CodeFirst.InitTables<Voucher, ReceiptVoucher, PaymentVoucher, TransferVoucher>();

// 使用
db.Insertable(new ReceiptVoucher { VoucherNo = "R001", TotalAmount = 1000m }).ExecuteCommand();
var receipts = db.Queryable<ReceiptVoucher>().ToList();  // 自動 WHERE VoucherType = 1
```

---

## 五、注意事項

- 需升級到 **5.1.4.96-preview10+**（修復聯表查詢 bug）
- 建表時**必須加** `IsDisabledDelete = true`，防止 CodeFirst 誤刪子類特有欄位
- 子類的特有欄位**必須加** `IsNullable = true`，因為其他子類不使用這些欄位
- Discriminator 格式：`"欄位名:值"`，多個欄位用逗號分隔，**不能有空格**
- 實體中不需要宣告 Type 欄位，ORM 自動處理
- 更新操作不會更新 Type 欄位
- 查詢父類（`Queryable<Animal>()`）不加 Type 條件，取得所有資料
