# SqlSugar — SAAS 分庫設計筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=2403)


[//]: # (sqlsugar-cheatsheet)
## 速查表

| 需求 | 重點 / 語法 |
|---|---|
| 分庫概念 | 每集團一個獨立業務庫,基礎資訊集中於 MasterDb |
| 動態分配業務庫 | DbManager 依租戶取得對應 SqlSugarScope |
| 跨庫事務 | db.UseTran / BeginTran + CommitTran 涵蓋多庫 |
| 插入取得 ID | ExecuteReturnIdentityAsync() |
| 分散式主鍵 | SnowFlakeSingle |
| IOC 註冊 | 單例 SqlSugarScope(推薦) |
| 跨庫查詢(同伺服器) | .AS("db.dbo.表") |
| 資料過濾器 | 多集團共用業務庫時加集團 Id 過濾 |

---

## SAAS 分庫 vs 聚合並發分庫比較

| 功能點 | SAAS 分庫 | 聚合並發分庫 |
|---|---|---|
| 效能 | ⭐⭐⭐ 100 | ⭐⭐ 90 |
| 穩定性與成熟度 | ⭐⭐⭐ 100 | ⭐⭐ 80（.NET 中更低）|
| SQL 語法相容性 | ⭐⭐⭐ 100 | ⭐⭐ 60 |
| 隔離資料的資料交集 | 搭配 SqlSugar：80 | 100 |
| 使用者資料安全 | ⭐⭐⭐ 100（可獨享庫）| ⭐⭐ 80 |

**結論：能用 SAAS 分庫就優先用 SAAS 分庫，成熟穩定是首選。**

---

## 一、資料庫架構設計

### 1.1 基礎資訊庫（MasterDb）

存放所有集團共用的公共資料：
- 組織架構、部門
- 使用者帳號、密碼、角色
- 權限設定
- 字典表、選單、設定
- **資料庫連線設定表**（每個集團對應哪個業務庫）

**效能優化**：基礎資訊庫是共享的，可加讀寫分離 + 二級緩存。

### 1.2 業務庫（BizDb，動態分配）

依業務規模彈性分配：

```
業務庫 1  → 集團A（VIP 大客戶獨享一個庫）
業務庫 2  → 集團B、集團F（中型客戶共用）
業務庫 3  → 集團C、集團D、集團E ... 集團Z（小客戶多人共用）
```

每個業務庫可部署在不同伺服器，水平擴展無效能瓶頸。

### 1.3 Eddie 實際架構範例

```
基礎資訊庫（MasterDb）
├── 使用者表（User）
├── 集團表（Organization）
├── 資料庫設定表（DbConfig）— 存各集團的連線字串
├── 權限 / 選單 / 字典

AIRSET 物流業務庫（BizDb_AIRSET_集團ID）
├── 出貨單、發貨流程
├── 金幣帳戶、充值記錄
├── 銀行明細

電子發票庫（BizDb_Invoice_集團ID）
├── 發票主表 / 明細
├── 買受人資訊
├── 開立紀錄

IFRS 會計庫（BizDb_Account_集團ID）
├── 憑證主表 ACTTA / 明細 ACTTB
├── 科目表
├── 帳期設定
```

### 1.4 表設計原則

- **主鍵禁止自增**（考慮租戶遷移）→ 使用雪花ID 或 GUID
- 業務庫若多個集團共用同一個庫，表中加 `OrgId` 欄位區分
- 資料庫設定表欄位：`ConfigId`、`ConnectionString`、`OrgId`、`DbType`

---

## 二、核心程式碼：DbManager

```csharp
/// <summary>
/// SAAS 資料庫管理器（繼承此類即可直接使用）
/// </summary>
public class DbManager
{
    /// <summary>
    /// 業務庫（依目前登入使用者動態切換）
    /// </summary>
    public static ISqlSugarClient BizDb
    {
        get
        {
            var user     = GetCurrentUser();          // 從 Token 取得使用者資訊
            var configId = user.OrgId.ToString();     // 集團ID 作為 ConfigId

            if (!Db.IsAnyConnection(configId))
            {
                // 動態新增業務庫連線（只在目前請求上下文有效）
                Db.AddConnection(new ConnectionConfig
                {
                    ConfigId              = configId,
                    ConnectionString      = user.ConnectionString,  // 從快取讀取
                    DbType                = DbType.SqlServer,
                    IsAutoCloseConnection = true,
                    InitKeyType           = InitKeyType.Attribute
                });
            }

            var bizDb = Db.GetConnection(configId);

            // 設定業務庫的資料過濾器（多集團共用同一業務庫時）
            // bizDb.QueryFilter.AddTableFilter<IOrg>(it => it.OrgId == user.OrgId);

            // 設定業務庫的 AOP（可選）
            // bizDb.Aop.OnLogExecuting = (sql, p) => Console.WriteLine($"[BizDb] {sql}");

            return bizDb;
        }
    }

    /// <summary>
    /// 基礎資訊庫（固定，存使用者/字典/設定等）
    /// </summary>
    public static ISqlSugarClient MasterDb
        => Db.GetConnection("default");

    /// <summary>
    /// 主 db（用於管理跨庫事務）
    /// </summary>
    public static SqlSugarScope Db
    {
        get
        {
            // Furion 框架：App.GetService<ISqlSugarClient>()
            var accessor = Services.BuildServiceProvider()
                .GetService<IHttpContextAccessor>();
            var client = accessor?.HttpContext?.RequestServices
                .GetService<ISqlSugarClient>();
            return (SqlSugarScope)client!;
        }
    }

    private static UserInfo GetCurrentUser()
    {
        // 從 JWT Token / Session 取得使用者資訊
        // 建議快取資料庫連線字串，避免每次查詢基礎資訊庫
        // return _cache.GetOrCreate($"user_{userId}", () => QueryUserFromDb(userId));
        throw new NotImplementedException();
    }
}
```

---

## 三、IOC 注入設定（Program.cs）

### 3.1 單例模式（SqlSugarScope，推薦）

```csharp
// Program.cs
builder.Services.AddHttpContextAccessor();  // Furion 可省略

builder.Services.AddSingleton<ISqlSugarClient>(s =>
    new SqlSugarScope(new ConnectionConfig
    {
        ConfigId              = "default",    // 基礎資訊庫
        DbType                = DbType.SqlServer,
        ConnectionString      = builder.Configuration.GetConnectionString("Master"),
        IsAutoCloseConnection = true,
        InitKeyType           = InitKeyType.Attribute
    }, db =>
    {
        db.Aop.OnLogExecuting = (sql, p) =>
        {
            var accessor = s.GetService<IHttpContextAccessor>();
            var logger   = accessor?.HttpContext?.RequestServices
                .GetService<ILogger<Program>>();
            logger?.LogDebug(UtilMethods.GetNativeSql(sql, p));
        };

        // 審計欄位自動填充
        db.Aop.DataExecuting = (val, info) =>
        {
            if (info.PropertyName == "CreateTime" &&
                info.OperationType == DataFilterType.InsertByObject)
                info.SetValue(DateTime.Now);
            if (info.PropertyName == "UpdateTime" &&
                info.OperationType == DataFilterType.UpdateByObject)
                info.SetValue(DateTime.Now);
        };
    }));
// 業務庫是動態新增的，只需注入基礎資訊庫
```

---

## 四、使用 DbManager

### 4.1 一般業務操作

```csharp
public class OrderService : DbManager, ITransient
{
    public async Task<List<Order>> GetOrdersAsync()
    {
        // 操作業務庫（自動依目前使用者切換到對應集團的庫）
        return await BizDb.Queryable<Order>()
            .Where(it => it.Status == 1)
            .ToListAsync();
    }

    public async Task<Customer> GetCustomerAsync(int customerId)
    {
        // 操作基礎資訊庫（固定）
        return await MasterDb.Queryable<Customer>()
            .Where(it => it.Id == customerId)
            .FirstAsync();
    }
}
```

### 4.2 跨庫事務（基礎資訊庫 + 業務庫）

```csharp
public class AccountService : DbManager, ITransient
{
    public void CreateOrderWithLog(Order order, OperationLog log)
    {
        try
        {
            Db.BeginTran();  // 主 db 管理跨庫事務

            // 寫入業務庫
            BizDb.Insertable(order).ExecuteCommand();

            // 寫入基礎資訊庫（操作日誌）
            MasterDb.Insertable(log).ExecuteCommand();

            Db.CommitTran();
        }
        catch (Exception ex)
        {
            Db.RollbackTran();
            throw;
        }
    }
}
```

---

## 五、各業務場景實際應用

### 5.1 集運系統（AIRSET）

```csharp
// 集團A（VIP）使用獨立的 AIRSET_A 業務庫
// 集團B、C 共用 AIRSET_BC 業務庫（透過 OrgId 過濾）

public class ShipmentService : DbManager, ITransient
{
    // 建立出貨單（寫業務庫）
    public async Task<int> CreateShipmentAsync(ShipmentDto dto)
    {
        var shipment = dto.Adapt<Shipment>();
        shipment.Id = SnowFlakeSingle.Instance.NextId();

        using var tran = BizDb.UseTran();
        var id = await BizDb.Insertable(shipment).ExecuteReturnIdentityAsync();

        // 寫金幣扣點記錄
        await BizDb.Insertable(new GoldRecord
        {
            AccountId  = dto.CustomerId,
            Amount     = -dto.GoldFee,
            CreateTime = DateTime.Now
        }).ExecuteCommandAsync();

        tran.CommitTran();
        return id;
    }

    // 查詢時跨庫：出貨單（業務庫）JOIN 客戶名稱（基礎資訊庫）
    public async Task<List<ShipmentDto>> GetListAsync()
    {
        var shipments = await BizDb.Queryable<Shipment>()
            .Where(it => it.Status == 1)
            .ToListAsync();

        // 從基礎資訊庫補充客戶名稱
        var customerIds = shipments.Select(s => s.CustomerId).Distinct().ToList();
        var customers   = await MasterDb.Queryable<Customer>()
            .Where(it => customerIds.Contains(it.Id))
            .ToListAsync();

        return shipments.Select(s => new ShipmentDto
        {
            ShipmentNo   = s.ShipmentNo,
            CustomerName = customers.FirstOrDefault(c => c.Id == s.CustomerId)?.Name
        }).ToList();
    }
}
```

### 5.2 電子發票系統（三聯式）

```csharp
// 每個集團的電子發票資料完全隔離（各集團獨享業務庫）
public class InvoiceService : DbManager, ITransient
{
    public async Task<int> IssueInvoiceAsync(InvoiceIssueDto dto)
    {
        try
        {
            Db.BeginTran();

            // 業務庫：寫入發票主表
            var invoiceId = await BizDb.Insertable(new Invoice
            {
                InvoiceNo   = GenerateInvoiceNo(),
                BuyerName   = dto.BuyerName,
                BuyerTaxId  = dto.BuyerTaxId,
                TotalAmount = dto.Items.Sum(i => i.Amount),
                CreateTime  = DateTime.Now
            }).ExecuteReturnIdentityAsync();

            // 業務庫：寫入發票明細
            await BizDb.InsertableRange(dto.Items.Select(i => new InvoiceItem
            {
                InvoiceId   = invoiceId,
                Description = i.Description,
                Amount      = i.Amount
            }).ToList()).ExecuteCommandAsync();

            // 基礎資訊庫：更新訂單開票狀態
            await MasterDb.Updateable<Order>()
                .SetColumns(it => new Order { InvoiceStatus = 1 })
                .Where(it => it.Id == dto.OrderId)
                .ExecuteCommandAsync();

            Db.CommitTran();
            return invoiceId;
        }
        catch
        {
            Db.RollbackTran();
            throw;
        }
    }
}
```

### 5.3 IFRS 會計系統

```csharp
// 每個集團獨享會計資料庫（符合 IFRS 資料隔離要求）
public class VoucherService : DbManager, ITransient
{
    public async Task CreateVoucherAsync(VoucherDto dto)
    {
        // 會計憑證差異日誌（IFRS 合規審計必要）
        BizDb.Aop.OnDiffLogEvent = it =>
        {
            MasterDb.Insertable(new AuditLog
            {
                TableName  = it.AfterData?.FirstOrDefault()?.TableName,
                DiffType   = it.DiffType.ToString(),
                BeforeJson = JsonSerializer.Serialize(it.BeforeData),
                AfterJson  = JsonSerializer.Serialize(it.AfterData),
                CreateTime = DateTime.Now
            }).ExecuteCommand();
        };

        using var tran = BizDb.UseTran();

        // 寫入憑證主表（ACTTA）
        var voucherId = await BizDb.Insertable(dto.Adapt<VoucherHeader>())
            .EnableDiffLogEvent(new { Module = "憑證", Operator = CurrentUser.Name })
            .ExecuteReturnIdentityAsync();

        // 寫入憑證明細（ACTTB）
        await BizDb.InsertableRange(dto.Items.Select(i => new VoucherDetail
        {
            VoucherId  = voucherId,
            AccountCode = i.AccountCode,
            DebitAmt   = i.DebitAmt,
            CreditAmt  = i.CreditAmt
        }).ToList()).ExecuteCommandAsync();

        tran.CommitTran();
    }
}
```

---

## 六、跨庫查詢（同伺服器）

```csharp
// 業務庫訂單 JOIN 基礎資訊庫客戶（SqlServer 跨庫語法）
var list = BizDb.Queryable<Order>()
    .LeftJoin<Customer>((o, c) => o.CustomerId == c.Id,
        "MasterDb.dbo.Customer")  // 指定基礎資訊庫的完整表名
    .Where(o => o.Status == 1)
    .Select((o, c) => new { o.OrderNo, c.Name })
    .ToList();
// 生成 SQL：SELECT * FROM [Order] o LEFT JOIN [MasterDb].[dbo].[Customer] c ON ...
```

---

## 七、資料過濾器（多集團共用業務庫時）

```csharp
// 多個集團共用同一個業務庫，透過 OrgId 過濾資料
public static ISqlSugarClient BizDb
{
    get
    {
        var user     = GetCurrentUser();
        var configId = user.OrgId.ToString();

        if (!Db.IsAnyConnection(configId))
            Db.AddConnection(new ConnectionConfig { ConfigId = configId, ... });

        var bizDb = Db.GetConnection(configId);

        // 自動過濾：只查目前集團的資料（繼承 IOrgFilter 介面的實體自動套用）
        bizDb.QueryFilter.AddTableFilter<IOrgFilter>(it => it.OrgId == user.OrgId);

        return bizDb;
    }
}

// 實體繼承介面
public interface IOrgFilter
{
    long OrgId { get; set; }
}

public class Order : IOrgFilter
{
    public long   OrgId   { get; set; }
    public string OrderNo { get; set; }
    // ...
}
```

---

## 八、高安全性差異日誌

```csharp
// 在業務庫的 Aop 中設定差異日誌
var bizDb = Db.GetConnection(configId);
bizDb.Aop.OnDiffLogEvent = it =>
{
    // 差異日誌寫入基礎資訊庫（獨立於業務庫）
    MasterDb.Insertable(new SecurityAuditLog
    {
        OrgId      = currentUser.OrgId,
        TableName  = it.AfterData?.FirstOrDefault()?.TableName,
        DiffType   = it.DiffType.ToString(),
        BeforeData = JsonSerializer.Serialize(it.BeforeData),
        AfterData  = JsonSerializer.Serialize(it.AfterData),
        Operator   = currentUser.Name,
        CreateTime = DateTime.Now
    }).ExecuteCommand();
};

// 插入時啟用差異日誌
bizDb.Insertable(voucher).EnableDiffLogEvent().ExecuteCommand();
```

---

## 注意事項

- 業務庫主鍵**禁止自增**，使用雪花ID 或 GUID（考慮租戶遷移）
- `AddConnection` / `IsAnyConnection` / `GetConnection` 在 SqlSugarScope 中是 Scope 週期，不同請求不會共享
- 跨庫事務用主 `Db.BeginTran()`，不要用 `BizDb.BeginTran()`
- 讀取資料庫連線設定建議加快取，避免每次請求都查詢基礎資訊庫
- 多集團共用同一業務庫時，必須設定 `QueryFilter.AddTableFilter` 確保資料隔離
- SqlSugarScope 模式中：**禁止在 Task.Run 中使用 BizDb/MasterDb**，會造成 AsyncLocal 上下文混亂
