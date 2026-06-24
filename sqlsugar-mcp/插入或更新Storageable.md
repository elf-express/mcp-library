# SqlSugar — 插入或更新（Storageable）筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=2353)

## 核心概念

Storageable 實現「存在就更新、不存在就插入」（Upsert），預設以主鍵作為判斷依據。

---

## 速查表

| 需求 | 語法 |
|---|---|
| 簡化寫法（存在更新，不存在插入）| db.Storageable(list).ExecuteCommand() |
| 主鍵預設值插入，否則更新 | db.Storageable(list).DefaultAddElseUpdate().ExecuteCommand() |
| 分頁執行 | db.Storageable(list).PageSize(1000).ExecuteCommand() |
| 大數據 BulkMerge | db.Fastest\<T\>().BulkMerge(list) |
| 無主鍵指定條件欄位 | .WhereColumns(it => it.OrderNo) |
| 拆開插入 / 更新各自執行 | var x = .ToStorage(); x.AsInsertable / x.AsUpdateable |
| 取得要插入 / 更新的清單 | x.InsertList / x.UpdateList |
| 時間精度問題 | .WhereColumns(it => it.CreateTime, d => d.ToString("格式")) |
| 加事務鎖 | .TranLock(DbLockType.Wait) |
| 限定更新資料範圍 | .TableDataRange(it => it.TypeId == 1) |
| DataTable 保存 | db.Storageable(dt).WhereColumns("id").ToStorage() |
| 字典保存 | db.Storageable(dcList, "表名").WhereColumns("id").ToStorage() |
| 分表保存 | .SplitTable().ExecuteCommand() |

---

## 一、簡化寫法（最常用）

```csharp
// 方式一：存在主鍵就更新，不存在就插入（預設）
db.Storageable(list).ExecuteCommand();

// 分頁執行（大量資料）
db.Storageable(list).PageSize(1000).ExecuteCommand();

// 方式二：主鍵等於預設值（如 Id=0）就插入，否則就更新
// 效能比方式一好，前端傳入時 Id=0 表示新增，Id>0 表示編輯
db.Storageable(list).DefaultAddElseUpdate().ExecuteCommand();

// 方式三：大數據 Merge（2萬筆以上推薦，底層用 Merge Into + BulkCopy）
db.Fastest<Order>().BulkMerge(list);
db.Fastest<Order>().PageSize(100000).BulkMerge(list);
```

**✅ 實際案例：前端表單新增/編輯統一入口**

```csharp
[HttpPost("save")]
public async Task<ApiResult> SaveOrder([FromBody] OrderDto dto)
{
    var order = dto.Adapt<Order>();

    // Id=0 插入，Id>0 更新，後端不需要判斷
    await db.Storageable(order)
        .DefaultAddElseUpdate()
        .ExecuteCommandAsync();

    return ApiResult.Success();
}
```

---

## 二、功能寫法（拆開插入 / 更新，擴展性最強）

可以對插入和更新分別套用不同的欄位控制，是最靈活的寫法。

```csharp
var storage = db.Storageable(list).ToStorage();

// 分別執行
storage.AsInsertable.ExecuteCommand();  // 不存在的資料 → 插入
storage.AsUpdateable.ExecuteCommand();  // 存在的資料 → 更新
```

**✅ 實際案例：插入時 Status=草稿，更新時不動 Status**

```csharp
item.Status = "草稿";  // 新增時預設狀態

var storage = db.Storageable(item).ToStorage();

storage.AsInsertable.ExecuteCommand();  // 新增：帶入 Status

storage.AsUpdateable
    .IgnoreColumns(z => z.Status)       // 更新：不動 Status
    .ExecuteCommand();
```

**✅ 實際案例：只插入不更新（防止重複寫入但已存在的不動）**

```csharp
var storage = db.Storageable(list).ToStorage();
storage.AsInsertable.ExecuteCommand();  // 只插入，不存在才執行
// AsUpdateable 不呼叫 → 已存在的不更新
```

**✅ 實際案例：取得要插入 / 更新的清單（用於日誌或後續處理）**

```csharp
var storage = db.Storageable(list).ToStorage();

var insertList = storage.InsertList.Select(z => z.Item).ToList();
var updateList = storage.UpdateList.Select(z => z.Item).ToList();

// 分別處理
if (insertList.Any())
    storage.AsInsertable.ExecuteCommand();

if (updateList.Any())
    storage.AsUpdateable.ExecuteCommand();

// 記錄日誌
logger.Info($"插入 {insertList.Count} 筆，更新 {updateList.Count} 筆");
```

---

## 三、無主鍵 / 自訂條件欄位

```csharp
// 用非主鍵欄位作為判斷依據
db.Storageable(list)
    .WhereColumns(it => it.OrderNo)             // 單欄位
    .ExecuteCommand();

// 多欄位條件
db.Storageable(list)
    .WhereColumns(it => new { it.OrderNo, it.CustomerId })
    .ExecuteCommand();

// 注意：實體有主鍵但條件不是主鍵，需要較高版本（5.1.4.94+）
```

---

## 四、時間精度問題

時間欄位毫秒精度不同可能導致判斷失效（應該是更新卻變成插入）：

```csharp
// 方式一：格式化時間，忽略毫秒比較
var storage = db.Storageable(list)
    .WhereColumns(it => it.CreateTime,
        date => date.ToString("yyyy-MM-dd HH:mm:ss"))  // 忽略毫秒
    .ToStorage();

storage.AsInsertable.ExecuteCommand();
storage.AsUpdateable.ExecuteCommand();

// 方式二：全局關閉毫秒（連線設定）
db.CurrentConnectionConfig.MoreSettings = new ConnMoreSettings
{
    DisableMillisecond = true  // 插入和更新禁用毫秒
};
```

---

## 五、並發事務鎖

多個並發請求同時 Storageable 時，用事務鎖避免重複插入：

```csharp
// 建議：單筆 + 主鍵條件（走行鎖，不鎖整表）
db.Storageable(item)
    .TranLock(DbLockType.Wait)   // 多個並發等待執行，依序處理
    .ExecuteCommand();

// DbLockType.Wait  → 多個並發等待執行（依序）
// DbLockType.Error → 並發只保留一個，其他拋例外
```

---

## 六、DataTable 保存

```csharp
var dt = new DataTable();
dt.TableName = "Order";
// ... 新增資料列 ...

var storage = db.Storageable(dt).WhereColumns("Id").ToStorage();

storage.AsInsertable.IgnoreColumns("Id").ExecuteCommand();  // 自增欄位忽略
storage.AsUpdateable.ExecuteCommand();

// DataTable 分頁處理
db.Utilities.PageEach(dt.Rows.Cast<DataRow>().ToList(), 100, pageRows =>
{
    var pageDt = pageRows.CopyToDataTable();
    pageDt.TableName = dt.TableName;

    var s = db.Storageable(pageDt).WhereColumns("Id").ToStorage();
    s.AsInsertable.IgnoreColumns("Id").ExecuteCommand();
    s.AsUpdateable.ExecuteCommand();
});
```

---

## 七、字典集合保存

```csharp
var dcList = new List<Dictionary<string, object>>
{
    new Dictionary<string, object> { ["Id"] = 0, ["Name"] = "新增" },
    new Dictionary<string, object> { ["Id"] = 1, ["Name"] = "更新" }
};

var storage = db.Storageable(dcList, "Order").WhereColumns("Id").ToStorage();

storage.AsInsertable.IgnoreColumns("Id").ExecuteCommand();  // 自增忽略 Id
storage.AsUpdateable.ExecuteCommand();
```

---

## 八、大數據效能優化

```csharp
// 普通分頁（2萬筆以內）
db.Storageable(list).PageSize(1000).ExecuteCommand();

// 大數據 Merge（2萬筆以上，使用 Merge Into + BulkCopy）
db.Fastest<Order>().BulkMerge(list);
db.Fastest<Order>().PageSize(100000).BulkMerge(list);

// 分頁工具輔助大數據
db.Utilities.PageEach(list, 2000, pageList =>
{
    var storage = db.Storageable(pageList).ToStorage();
    storage.AsInsertable.ExecuteCommand();
    storage.AsUpdateable.ExecuteCommand();
});

// 異步版
await db.Utilities.PageEachAsync(list, 2000, async pageList =>
{
    var storage = await db.Storageable(pageList).ToStorageAsync();
    await storage.AsInsertable.ExecuteCommandAsync();
    await storage.AsUpdateable.ExecuteCommandAsync();
});
```

效能注意事項：
- 條件欄位（WhereColumns）若是 varchar，長度不要超過 50
- 有索引且資料不重複時效能最佳
- varchar 和 nvarchar 效能差異大，選取最優類型

---

## 九、限定更新資料範圍（TableDataRange）

```csharp
// 只在 TypeId=1 的資料範圍內判斷是否存在
// 不在範圍內的視為新資料，一律插入
db.Storageable(list)
    .TableDataRange(it => it.TypeId == 1)
    .ExecuteCommand();
```

---

## 十、分表保存（5.1.4.100+）

```csharp
// 分表欄位必須有正確值才能找到對應表
db.Storageable(new Order { Name = "A", Time = DateTime.Now })
    .SplitTable()
    .ExecuteCommand();

// BulkCopy 版
db.Storageable(list)
    .SplitTable()
    .ExecuteSqlBulkCopy();
```

---

## 兩種寫法比較

| 比較項目 | 簡化寫法（ExecuteCommand）| 功能寫法（ToStorage）|
|---|---|---|
| 程式碼量 | 少，一行搞定 | 多，需拆開 |
| 擴展性 | 低（無法套用 Insertable / Updateable 特有方法）| 高（可各自套用 IgnoreColumns、UpdateColumns 等）|
| 適用場景 | 插入和更新邏輯相同時 | 插入和更新需要不同欄位控制時 |
| 除錯 | 較難 | 可在 ToStorage 後打斷點查看 InsertList / UpdateList |

---

## 注意事項

- DefaultAddElseUpdate 原理是 Id=0 插入，Id 不等於 0 更新，效能比標準 Storageable 好
- 超過 2 萬筆建議用 BulkMerge，標準 Storageable 超過 2 萬會明顯變慢
- 並發場景建議用 TranLock + 事務，單筆操作走行鎖不鎖整表
- DataTable / 字典保存時，若是自增欄位，AsInsertable 需加 IgnoreColumns("Id")
- WhereColumns 的條件欄位只作為判斷依據，不會影響更新的欄位
