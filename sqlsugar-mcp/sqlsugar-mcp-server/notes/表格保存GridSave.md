# SqlSugar — 表格保存（GridSave）筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=2568)

## 功能用途

將增、刪、改合成單一 API，一次呼叫完成清單的同步：新增的插入、修改的更新、移除的刪除。適合前端 Grid 表格送出整筆清單的場景（如訂單明細、表格編輯）。

---

## 速查表

| 需求 | 語法 |
| --- | --- |
| 追蹤模式（同一物件操作） | db.Tracking(list); ... db.GridSave(list).ExecuteCommand() |
| 手動對比模式（舊新清單） | db.GridSave(oldList, newList).ExecuteCommand() |
| 含一層導航的表格保存 | .IncludesAllFirstLayer().ExecuteCommand() |
| 排除特定導航 | .IncludesAllFirstLayer("Items") |
| 取得要刪除的清單 | db.GridSave(old, new).GetDeleteList() |
| 結合 BulkCopy | 拆開 GetDeleteList() + Deleteable + Storageable |

---

## 一、追蹤模式（同一物件操作）

適合 WinForm / 同一個請求內對同一個 List 進行操作的場景。  
更新筆數少時效能好，但無法批量更新（每筆逐條 UPDATE）。

```
// 1. 先從資料庫取出原始清單
var list = db.Queryable<OrderItem>().Where(o => o.OrderId == orderId).ToList();

// 2. 建立追蹤快照
db.Tracking(list);  // 必須是 List

// 3. 對清單進行操作
list.RemoveAt(0);           // 刪除第一筆
list.Last().Name = "修改";   // 修改最後一筆
list.Add(new OrderItem { Name = "新增", Price = 100 }); // 新增一筆

// 4. 一次執行 刪除+更新+插入
db.GridSave(list).ExecuteCommand();
```

---

## 二、手動對比模式（舊新清單）

適合前端 API 傳入新清單、後端從資料庫取出舊清單的場景。  
更新筆數多時效能優於追蹤模式（可批量 UPDATE）。

```
// 從資料庫取出舊清單
var oldList = db.Queryable<OrderItem>()
    .Where(o => o.OrderId == orderId)
    .ToList();

// 前端傳入新清單（包含新增、修改、刪除後的完整結果）
var newList = dto.Items.Adapt<List<OrderItem>>();

// 自動比對：不在 newList 中的刪除，newList 中存在的更新，不存在的插入
db.GridSave(oldList, newList).ExecuteCommand();
```

**✅ 實際案例：訂單明細表格儲存**

```
[HttpPost("save-items")]
public async Task<ApiResult> SaveOrderItems([FromBody] OrderItemSaveRequest req)
{
    // 取出舊資料
    var oldItems = await db.Queryable<OrderItem>()
        .Where(o => o.OrderId == req.OrderId)
        .ToListAsync();

    // 前端傳入新資料（完整的最終清單）
    var newItems = req.Items.Select(dto => new OrderItem
    {
        Id      = dto.Id,
        OrderId = req.OrderId,
        Name    = dto.Name,
        Qty     = dto.Qty,
        Price   = dto.Price
    }).ToList();

    await db.GridSave(oldItems, newItems).ExecuteCommandAsync();

    return ApiResult.Success();
}
```

---

## 三、效能比較

| 比較項目 | 追蹤模式 | 手動對比模式 |
| --- | --- | --- |
| 原理 | 每筆逐條 UPDATE（欄位數可能不同） | 可用批量 UPDATE JOIN |
| 更新筆數少時 | 效能好 | 效能相當 |
| 更新筆數多時 | 效能差 | 效能好 |
| 使用場景 | 同一 List 物件操作 | 新舊兩個 List 對比 |

---

## 四、含導航的表格保存

自動處理一層子導航的增刪改（自動支援到第二層）。

```
// 追蹤模式 + 導航
db.Tracking(list);
list.RemoveAt(0);
list.Last().Name = "修改";

db.GridSave(list)
    .IncludesAllFirstLayer()      // 自動處理所有第一層導航
    .ExecuteCommand();

// 手動對比模式 + 導航
db.GridSave(oldList, newList)
    .IncludesAllFirstLayer()
    .ExecuteCommand();

// 排除特定導航欄位（不同步 Items）
db.GridSave(oldList, newList)
    .IncludesAllFirstLayer("Items")  // 排除 Items 導航
    .ExecuteCommand();
```

---

## 五、複雜層級導航（拆開處理）

當導航超過兩層或需要特殊邏輯時，拆開 GetDeleteList 分開處理。

```
// 取出要刪除的清單
var deleteList = db.GridSave(oldList, newList).GetDeleteList();

// 導航刪除（多層級）
db.DeleteNav(deleteList)
    .Include(z => z.School).ThenInclude(z => z.Rooms)
    .Include(z => z.Books)
    .ExecuteCommand();

// 導航更新+插入
db.UpdateNav(newList, new UpdateNavRootOptions { IsInsertRoot = true })
    .Include(z => z.School).ThenInclude(z => z.Rooms)
    .Include(z => z.Books)
    .ExecuteCommand();
```

---

## 六、結合 BulkCopy（大數據）

```
// 取出要刪除的清單
var deleteList = db.GridSave(oldList, newList).GetDeleteList();

// 高效能分頁刪除
db.Deleteable(deleteList).PageSize(1000).ExecuteCommand();

// 大數據插入或更新（BulkCopy 底層是異步）
await db.Storageable(newList).PageSize(1000).ExecuteSqlBulkCopyAsync();

// 注意：BulkCopy 底層是異步實現，WinForm 中使用要用 await 避免卡 UI
```

---

## 七、只需要插入/更新（不刪除）

GridSave 含刪除操作，若不想刪除，改用以下方式：

```
// 僅插入或更新（Storageable）
db.Storageable(newList).ExecuteCommand();

// 導航插入或更新（不刪除）
db.UpdateNav(newList, new UpdateNavRootOptions { IsInsertRoot = true })
    .Include(z => z.Items)
    .ExecuteCommand();
```

---

## 注意事項

*   追蹤模式的 List 必須是從資料庫查出的同一物件，不能是 new 出來的
*   手動對比模式中，newList 要是完整的最終狀態（包含保留的舊資料），不在 newList 中的舊資料會被刪除
*   IncludesAllFirstLayer 自動支援到第二層導航，更深層需拆開用 DeleteNav / UpdateNav
*   BulkCopy 底層是異步，WinForm 中不能用同步方式呼叫，否則會卡 UI
*   若欄位有 IsOnlyIgnoreUpdate，手動對比模式的更新會遵守此設定