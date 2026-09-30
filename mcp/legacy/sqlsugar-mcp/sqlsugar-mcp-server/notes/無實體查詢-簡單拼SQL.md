# SqlSugar — 無實體查詢（簡單拼 SQL）筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=1198)

適合一次性查詢，多庫相容性差，不適合封裝。

---

## 速查表

| 需求 | 語法 |
|---|---|
| 動態表名單表查詢 | db.Queryable\<dynamic\>().AS("表名").Where("sql", params).ToList() |
| 實體 + SQL 條件混用 | db.Queryable\<Order\>().Where("id=@id", new { id=1 }).ToList() |
| 多表聯查 | db.Queryable\<dynamic\>("別名").AS("表名").AddJoinInfo(...) |
| 結果轉 DataTable | .ToDataTable() |

---

## 一、單表查詢

```csharp
// 動態表名 + SQL 條件（沒有實體一樣可用）
var list = db.Queryable<dynamic>()
    .AS("Order")
    .Where("id = @id", new { id = 1 })
    .ToList();

// 結果轉 DataTable
var dt = db.Queryable<dynamic>().AS("Order").ToDataTable();
```

**✅ 實際案例：查詢中文命名資料表（AIRSET 場景）**

```csharp
// 直接操作中文表名，不需要建實體
var list = db.Queryable<dynamic>()
    .AS("Inv1發票收據")
    .Where("發票日期 >= @start AND 發票日期 <= @end AND IsDeleted = 0",
        new { start = startDate, end = endDate })
    .Select("發票號碼, 客戶名稱, 未稅金額, 稅額")
    .ToList();
```

---

## 二、實體 + SQL 條件混用

```csharp
// 有實體但想加原始 SQL 條件時
var list = db.Queryable<Order>()
    .Where("id = @id AND Status IN (1,2)", new { id = 1 })
    .ToList();
```

---

## 三、多表聯查

```csharp
var list = db.Queryable<dynamic>("o").AS("Order")
    .AddJoinInfo("OrderDetail", "d", "o.id = d.OrderId", JoinType.Left)
    .Where("o.id = @id", new { id = 1 })
    .Select("o.*, d.Price")
    .ToList();
```

---

## 注意事項

- SQL 條件中的值必須參數化（@參數名），不要直接拼字串，避免 SQL Injection
- 多庫環境（MySQL / Oracle / PgSQL）不建議用此方式，改用 2421 無實體多庫 API
- 詳細多庫相容寫法見：無實體查詢-多庫相容API.md
