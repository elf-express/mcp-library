# SqlSugar — AOP & 日誌筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=1204)

## 重要原則

- AOP 事件必須在操作語句**之前**設定，否則不會生效
- 必須是**同一個 SqlSugarClient 實例**才會有效
- DataExecuting / DataExecuted 只支援**實體操作**，不支援匿名物件

---

## 事件速查表

| 事件 | 說明 | 觸發時機 |
|---|---|---|
| OnLogExecuting | SQL 執行前 | 每次 SQL 執行前 |
| OnLogExecuted | SQL 執行後 | 每次 SQL 執行後 |
| OnError | SQL 報錯 | SQL 執行異常 |
| OnExecutingChangeSql | 攔截並修改 SQL | SQL 執行前，可改 SQL |
| DataExecuting | 資料處理前（增刪改）| 實體插入/更新/刪除前，列級事件 |
| DataChangesExecuted | 資料處理後（增刪改）| 實體插入/更新/刪除後（5.1.4.159+）|
| DataExecuted | 查詢後加工 | 實體查詢完成後，行級事件 |
| OnDiffLogEvent | 差異審計日誌 | 增刪改完成後，含前後資料 |

---

## 一、SQL 事件

```csharp
// 在 SqlSugarClient 初始化時設定（推薦寫在 GetInstance / DI 設定中）
var db = new SqlSugarClient(new ConnectionConfig
{
    ConnectionString      = "Server=.;Database=MyDb;Trusted_Connection=True",
    DbType                = DbType.SqlServer,
    IsAutoCloseConnection = true,
    InitKeyType           = InitKeyType.Attribute
}, db =>
{
    // SQL 執行前
    db.Aop.OnLogExecuting = (sql, pars) =>
    {
        // 取得原生 SQL（推薦，效能好，5.1.4.63+）
        var nativeSql = UtilMethods.GetNativeSql(sql, pars);
        Console.WriteLine(nativeSql);

        // 取得無參數化 SQL（影響效能，只用於除錯）
        // var fullSql = UtilMethods.GetSqlString(DbType.SqlServer, sql, pars);
    };

    // SQL 執行後
    db.Aop.OnLogExecuted = (sql, pars) =>
    {
        // 輸出執行時間
        Console.WriteLine($"執行時間：{db.Ado.SqlExecutionTime.TotalMilliseconds} ms");
    };

    // SQL 報錯
    db.Aop.OnError = (exp) =>
    {
        var nativeSql = UtilMethods.GetNativeSql(exp.Sql, exp.Parameters);
        Console.WriteLine($"SQL 錯誤：{exp.Message}");
        Console.WriteLine($"SQL：{nativeSql}");
        // 寫入錯誤日誌
    };

    // 攔截並修改 SQL（可修改 SQL 內容和參數值）
    db.Aop.OnExecutingChangeSql = (sql, pars) =>
    {
        // 例：自動加上 NOLOCK（注意只在 SqlServer 適用）
        // sql = sql.Replace("FROM [Order]", "FROM [Order] WITH(NOLOCK)");
        return new KeyValuePair<string, SugarParameter[]>(sql, pars);
    };
});
```

**✅ 實際案例：Furion 框架整合 NLog 記錄 SQL**

```csharp
db.Aop.OnLogExecuting = (sql, pars) =>
{
    // 透過 IOC 取得 Logger
    var serviceProvider = services.BuildServiceProvider();
    var logger = serviceProvider.GetService<ILogger<SqlSugarClient>>();
    logger?.LogDebug(UtilMethods.GetNativeSql(sql, pars));
};

db.Aop.OnError = (exp) =>
{
    var serviceProvider = services.BuildServiceProvider();
    var logger = serviceProvider.GetService<ILogger<SqlSugarClient>>();
    logger?.LogError(exp, UtilMethods.GetNativeSql(exp.Sql, exp.Parameters));
};
```

---

## 二、資料處理事件（DataExecuting）

只支援實體操作，**自動填充審計欄位**的標準做法。

```csharp
db.Aop.DataExecuting = (oldValue, entityInfo) =>
{
    // ===== 列級事件（每個欄位都會進來一次）=====

    // 插入時自動填充 CreateTime
    if (entityInfo.PropertyName == "CreateTime"
        && entityInfo.OperationType == DataFilterType.InsertByObject)
    {
        entityInfo.SetValue(DateTime.Now);
    }

    // 插入時自動填充 CreateUser
    if (entityInfo.PropertyName == "CreateUser"
        && entityInfo.OperationType == DataFilterType.InsertByObject)
    {
        entityInfo.SetValue(CurrentUser.UserId);
    }

    // 更新時自動填充 UpdateTime
    if (entityInfo.PropertyName == "UpdateTime"
        && entityInfo.OperationType == DataFilterType.UpdateByObject)
    {
        entityInfo.SetValue(DateTime.Now);
    }

    // 更新時自動填充 UpdateUser
    if (entityInfo.PropertyName == "UpdateUser"
        && entityInfo.OperationType == DataFilterType.UpdateByObject)
    {
        entityInfo.SetValue(CurrentUser.UserId);
    }

    // ===== 行級事件（一條記錄只進一次，用主鍵欄位判斷）=====
    if (entityInfo.EntityColumnInfo.IsPrimarykey)
    {
        var entity = entityInfo.EntityValue;  // 整個實體物件
        // 可在這裡做整行的業務邏輯
    }

    // 刪除事件（只有行級）
    if (entityInfo.OperationType == DataFilterType.DeleteByObject)
    {
        var entity = entityInfo.EntityValue;  // 被刪除的實體
        // 例：刪除前記錄到回收桶
    }
};

// 支援的實體操作
db.Insertable(entity).ExecuteReturnIdentity();
db.Insertable(list).ExecuteCommand();
db.Updateable(entity).ExecuteCommand();
db.Updateable(list).ExecuteCommand();
db.Deleteable(entity).ExecuteCommand();
db.Deleteable(list).ExecuteCommand();

// 表達式更新需加 appendColumnsByDataFilter: true
db.Updateable<Order>()
    .SetColumns(it => new Order { Status = 2 }, appendColumnsByDataFilter: true)
    .Where(it => it.Id == 1)
    .ExecuteCommand();
```

---

## 三、查詢後加工（DataExecuted）

```csharp
// 查詢結果的行級加工事件（5.1.2+）
db.Aop.DataExecuted = (value, entity) =>
{
    // 只有行級事件，每筆記錄觸發一次
    if (entity.Entity.Type == typeof(Order))
    {
        // 讀取欄位值
        var name = entity.GetValue(nameof(Order.Name))?.ToString();

        // 修改欄位值（例：解密、格式轉換）
        entity.SetValue(nameof(Order.Name), name + "_已處理");
    }
};

// 只支援實體查詢（不支援匿名物件）
var list = db.Queryable<Order>().ToList();
```

---

## 四、差異審計日誌（OnDiffLogEvent）

記錄資料變更前後的完整快照，適合 IFRS 合規審計、金融系統操作日誌。

```csharp
// 設定差異日誌事件（在 SqlSugarClient 初始化時）
db.Aop.OnDiffLogEvent = it =>
{
    var beforeData = it.BeforeData;  // 操作前資料（插入時為 null）
    var afterData  = it.AfterData;   // 操作後資料
    var diffType   = it.DiffType;    // Insert / Update / Delete
    var sql        = it.Sql;
    var execTime   = it.Time;
    var bizData    = it.BusinessData;// 自訂業務參數

    // 寫入審計日誌表
    var log = new AuditLog
    {
        TableName  = afterData?.FirstOrDefault()?.TableName ?? beforeData?.FirstOrDefault()?.TableName,
        DiffType   = diffType.ToString(),
        BeforeJson = beforeData != null ? JsonConvert.SerializeObject(beforeData) : null,
        AfterJson  = afterData  != null ? JsonConvert.SerializeObject(afterData)  : null,
        BizRemark  = bizData?.ToString(),
        ExecTime   = execTime,
        CreateTime = DateTime.Now,
        CreateUser = CurrentUser.UserId
    };
    // db_audit.Insertable(log).ExecuteCommand();  // 注意：用另一個 db 實例寫入
};

// 手動啟用差異日誌（個別操作）
db.Insertable(new Order { Name = "新訂單" })
    .EnableDiffLogEvent()
    .ExecuteReturnIdentity();

db.Updateable(order)
    .EnableDiffLogEvent(new { Module = "訂單管理", Operator = "admin" })  // 傳業務參數
    .ExecuteCommand();

db.Deleteable<Order>(1)
    .EnableDiffLogEvent("刪除訂單")  // 傳字串業務參數
    .ExecuteCommand();
```

### 批量啟用差異日誌（全局，5.1.4.73+）

```csharp
// 程式啟動時一次設定，所有增刪改自動啟用
StaticConfig.CompleteInsertableFunc =
StaticConfig.CompleteUpdateableFunc =
StaticConfig.CompleteDeleteableFunc = it =>
{
    var method = it.GetType().GetMethod("EnableDiffLogEvent");
    method?.Invoke(it, new object[] { null });

    // 進階：只對特定介面的實體啟用
    // var entityType = it.GetType().GenericTypeArguments.FirstOrDefault();
    // if (entityType?.GetInterfaces().Any(i => i == typeof(IAuditable)) == true)
    //     method?.Invoke(it, new object[] { null });
};
```

---

## 五、效能監控

```csharp
// SQL 執行超過 1 秒告警
db.Aop.OnLogExecuted = (sql, pars) =>
{
    if (db.Ado.SqlExecutionTime.TotalSeconds > 1)
    {
        var fileName   = db.Ado.SqlStackTrace.FirstFileName;    // 程式碼檔名
        var fileLine   = db.Ado.SqlStackTrace.FirstLine;        // 程式碼行數
        var methodName = db.Ado.SqlStackTrace.FirstMethodName;  // 方法名

        Console.WriteLine($"慢 SQL 警告：{db.Ado.SqlExecutionTime.TotalMilliseconds} ms");
        Console.WriteLine($"位置：{fileName}:{fileLine} → {methodName}");
        Console.WriteLine(UtilMethods.GetNativeSql(sql, pars));
        // 寫入慢查詢日誌
    }

    // 受影響行數
    var count = db.Ado.SqlExecuteCount;
};

// DataReader 綁定時間（SQL 執行 + 實體綁定，5.1.4.173+）
db.Aop.OnGetDataReadered = (sql, pars, time) =>
{
    Console.WriteLine($"DataReader 總耗時：{time.TotalMilliseconds} ms");
};

// 連線開啟時間（5.1.4.173+）
db.Aop.CheckConnectionExecuted = (conn, time) =>
{
    if (time.TotalMilliseconds > 500)
        Console.WriteLine($"連線過慢：{time.TotalMilliseconds} ms");
};
```

---

## 六、實體 AOP（EntityNameService / EntityService）

動態修改所有表名 / 欄位名（如 Schema 前綴）：

```csharp
ConfigureExternalServices = new ConfigureExternalServices
{
    // 修改表名（如加 Schema 前綴）
    EntityNameService = (type, entity) =>
    {
        entity.DbTableName = "dbo." + entity.DbTableName;
        entity.IsDisabledDelete = true;  // 同時禁止 CodeFirst 刪除列
    },

    // 修改欄位
    EntityService = (property, column) =>
    {
        // .NET 7+ 自動 Nullable
        if (column.IsPrimarykey == false &&
            new NullabilityInfoContext().Create(property).WriteState is NullabilityState.Nullable)
        {
            column.IsNullable = true;
        }
    }
}
```

---

## 七、多租戶 AOP

```csharp
var db = new SqlSugarClient(new ConnectionConfig { ... }, db =>
{
    // 為不同連線分別設定 AOP
    db.GetConnection("db_main").Aop.OnLogExecuting = (sql, pars) =>
        Console.WriteLine($"[主庫] {sql}");

    db.GetConnection("db_log").Aop.OnLogExecuting = (sql, pars) =>
        Console.WriteLine($"[日誌庫] {sql}");
});
```

---

## 八、靜態全局事件（StaticConfig，5.1.4.73+）

```csharp
// 程式啟動時全局注入 AOP（所有 db 實例都生效）
StaticConfig.CompleteDbFunc = db =>
{
    db.Aop.OnLogExecuting = (sql, pars) =>
        Console.WriteLine(UtilMethods.GetNativeSql(sql, pars));

    db.Aop.OnError = (exp) =>
        Console.WriteLine($"SQL 錯誤：{exp.Message}");
};

// Queryable / Insertable / Updateable / Deleteable 建立完事件
StaticConfig.CompleteQueryableFunc  = it => { /* 全局查詢加工 */ };
StaticConfig.CompleteInsertableFunc = it => { /* 全局插入加工 */ };
StaticConfig.CompleteUpdateableFunc = it => { /* 全局更新加工 */ };
StaticConfig.CompleteDeleteableFunc = it => { /* 全局刪除加工 */ };
```

---

## 注意事項

- AOP 設定必須在操作語句之前，且同一個 SqlSugarClient 實例
- DataExecuting / DataExecuted 只支援**實體操作**，字典/匿名物件不觸發
- 差異日誌寫入審計表時，建議用**獨立的 db 實例**，避免在自身事件中引發遞迴
- OnLogExecuted 才能取 SqlExecutionTime，OnLogExecuting 取到的是負數
- 批量操作（Insertable List）差異日誌需升級到 5.0.4.4+
