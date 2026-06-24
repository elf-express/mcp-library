# SqlSugar — 工作單元（UnitOfWork / DbContext）筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=2360)


[//]: # (sqlsugar-cheatsheet)
## 速查表

| 需求 | 語法 |
|---|---|
| 建立工作單元 | db.CreateContext() |
| 提交 | uow.Commit() |
| 回滾 | uow.RollBack()(或例外時自動回滾) |
| IOC 注入 | 註冊 IUnitOfWork / ISugarUnitOfWork |
| 自動換庫 | CreateContext 內 ChangeDatabase |
| 事務嵌套 | 巢狀 CreateContext |
| 取得倉儲 | uow.GetRepository / SimpleClient |
| 選擇 | 多操作統一事務用 UoW;單純 CRUD 用倉儲 |

---

## 核心優勢

- **跨方法事務**：using 區塊內所有操作共享同一事務，自動 Rollback
- **跨庫切換**：依實體 `[Tenant]` 特性自動切換資料庫
- **簡潔事務語法**：`using var uow = db.CreateContext()` + `uow.Commit()`

> **學習前提：** 需先了解倉儲模式（使用倉儲.md）

---

## 一、手動建立工作單元

### 1.1 有泛型（自訂 DbContext）

```csharp
// 自訂倉儲（繼承 SimpleClient<T>，可擴展方法）
public class DbSet<T> : SimpleClient<T> where T : class, new()
{
    // 可覆寫倉儲方法或新增擴展方法
}

// 自訂 DbContext（定義所有需要的資料表集合）
public class AppDbContext : SugarUnitOfWork
{
    public DbSet<Order>     Orders     { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Customer>  Customers  { get; set; }
}

// 使用（預設帶事務，using 中禁止 try-catch）
using (var uow = db.CreateContext<AppDbContext>())
{
    // 透過 DbContext 屬性操作各倉儲
    uow.Orders.Insert(new Order { Name = "訂單A", Amount = 100m });
    uow.OrderItems.Insert(new OrderItem { OrderId = 1, Quantity = 2 });

    // 使用 Queryable 複雜查詢
    var list = uow.Orders.AsQueryable()
        .Where(it => it.Status == 1)
        .ToList();

    // 使用 Updateable 複雜更新
    uow.Orders.AsUpdateable(order)
        .UpdateColumns(it => new { it.Status, it.UpdateTime })
        .ExecuteCommand();

    // 直接用 db 操作
    uow.Db.Queryable<Order>().ToList();
    uow.Db.MasterQueryable<Order>().ToList();  // 讀寫分離時強制走主庫

    uow.Commit();  // ⚠️ 使用事務必須呼叫 Commit，否則自動 Rollback
}

// 不使用事務
using (var uow = db.CreateContext<AppDbContext>(isTran: false))
{
    uow.Orders.Insert(order);
    // 不需要 Commit
}
```

### 1.2 無泛型（簡單直接）

```csharp
using (var uow = db.CreateContext())  // 預設帶事務
{
    // 使用 ORM 內建倉儲
    var orderDs = uow.GetRepository<Order>();
    orderDs.Insert(order);

    // 使用自訂倉儲
    var orderRepo = uow.GetMyRepository<Repository<Order>>();
    orderRepo.Insert(orders);

    // 直接用 db
    uow.Db.Queryable<Order>().ToList();

    uow.Commit();  // 不能忘
}
```

---

## 二、IOC 注入工作單元

### 2.1 有泛型 IOC

```csharp
// Program.cs 注入（SqlSugarScope 單例模式）
builder.Services.AddSingleton<ISugarUnitOfWork<AppDbContext>>(sp =>
    new SugarUnitOfWork<AppDbContext>(new SqlSugarScope(new ConnectionConfig
    {
        DbType                = DbType.SqlServer,
        ConnectionString      = connectionString,
        IsAutoCloseConnection = true,
        InitKeyType           = InitKeyType.Attribute
    })));

// 或 SqlSugarClient 模式（Scoped，每個請求 new 一個）
builder.Services.AddScoped<ISugarUnitOfWork<AppDbContext>>(sp =>
    new SugarUnitOfWork<AppDbContext>(new SqlSugarClient(new ConnectionConfig { ... })));
```

```csharp
// Controller / Service 使用
public class OrderController : ControllerBase
{
    private readonly ISugarUnitOfWork<AppDbContext> _uow;

    public OrderController(ISugarUnitOfWork<AppDbContext> uow)
    {
        _uow = uow;
    }

    [HttpPost]
    public IActionResult CreateOrder([FromBody] CreateOrderDto dto)
    {
        using (var context = _uow.CreateContext())
        {
            var orderId = context.Orders.InsertReturnIdentity(dto.Adapt<Order>());

            var items = dto.Items.Select(i => new OrderItem
            {
                OrderId  = orderId,
                Quantity = i.Quantity,
                Amount   = i.Amount
            }).ToList();
            context.OrderItems.InsertRange(items);

            return Ok(context.Commit());
        }
    }
}
```

### 2.2 無泛型 IOC

```csharp
// 直接注入 ISqlSugarClient（最簡單）
public class OrderService : ITransient
{
    private readonly ISqlSugarClient _db;

    public OrderService(ISqlSugarClient db)
    {
        _db = db;
    }

    public void ProcessOrder(Order order, List<OrderItem> items)
    {
        using (var uow = _db.CreateContext())
        {
            var orderRepo = uow.GetRepository<Order>();
            var itemRepo  = uow.GetRepository<OrderItem>();

            var id = orderRepo.InsertReturnIdentity(order);
            items.ForEach(i => i.OrderId = id);
            itemRepo.InsertRange(items);

            uow.Commit();
        }
    }
}
```

---

## 三、自動換庫（多庫場景）

```csharp
// 多庫設定
var configs = new List<ConnectionConfig>
{
    new ConnectionConfig { ConfigId = "main", DbType = DbType.SqlServer, ConnectionString = "..." },
    new ConnectionConfig { ConfigId = "log",  DbType = DbType.MySql,     ConnectionString = "..." }
};

// 實體加 [Tenant] 特性指定所在庫
[Tenant("log")]  // 對應 ConfigId = "log"
public class OperationLog
{
    public int    Id      { get; set; }
    public string Content { get; set; }
}

[Tenant("main")]
public class Order
{
    public int    Id   { get; set; }
    public string Name { get; set; }
}

// 工作單元自動切庫（有泛型模式）
public class MultiDbContext : SugarUnitOfWork
{
    public DbSet<Order>        Orders { get; set; }  // 自動走 main 庫
    public DbSet<OperationLog> Logs   { get; set; }  // 自動走 log 庫
}

using (var uow = db.CreateContext<MultiDbContext>())
{
    uow.Orders.Insert(order);  // → SqlServer main 庫
    uow.Logs.Insert(log);      // → MySQL log 庫
    uow.Commit();              // 兩個庫都提交
}
```

---

## 四、事務嵌套

```csharp
// 外層事務存在時，內層不重複開啟事務（db.Ado.IsNoTran() 判斷）
using (var outer = db.CreateContext(db.Ado.IsNoTran()))
{
    // 第一層操作
    outer.GetRepository<Order>().Insert(order);

    using (var inner = db.CreateContext(db.Ado.IsNoTran()))
    {
        // 第二層操作（與外層共用事務）
        inner.GetRepository<OrderItem>().InsertRange(items);
        inner.Commit();
    }

    outer.Commit();  // ⚠️ 工作單元內禁止呼叫 db.RollBack，拋例外自動回滾
}
```

---

## 五、ISugarUnitOfWork 介面說明

```csharp
// 不含 SqlSugar 依賴的純介面（適合隱藏 ORM 細節）
public interface ISugarUnitOfWorkClear
{
    TRepo GetMyRepository<TRepo>() where TRepo : new();
    bool  Commit();
}

// 完整介面（繼承 ISugarUnitOfWorkClear）
public interface ISugarUnitOfWork : ISugarUnitOfWorkClear
{
    ISqlSugarClient  Db     { get; }
    ITenant          Tenant { get; }
    SimpleClient<T>  GetRepository<T>() where T : class, new();
}
```

---

## 六、倉儲 vs 工作單元選擇

| 場景 | 推薦 |
|---|---|
| 簡單 CRUD，不需要跨方法事務 | 直接注入 Repository\<T\> |
| 多個倉儲需要在同一事務中 | UnitOfWork（CreateContext）|
| 多庫操作需要自動切庫 | UnitOfWork 有泛型模式 |
| 只有單一倉儲，不涉及事務 | Repository\<T\> |
| 需要跨方法共享事務 | UnitOfWork（using 區塊跨越多個方法）|

---

## 注意事項

- `using` 區塊內**禁止 try-catch**；只要拋出例外，using 結束時自動 Rollback
- `uow.Commit()` 一定要呼叫，否則帶事務的 context 結束後自動 Rollback
- 事務嵌套用 `db.Ado.IsNoTran()` 判斷是否需要開啟新事務
- 工作單元內禁止呼叫 `db.RollBack`，由 using 機制自動處理
- 多庫自動換庫依賴實體的 `[Tenant("configId")]` 特性，需提前設定多庫連線
