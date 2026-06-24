# SqlSugar 5x 完整筆記索引

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc)

本地路徑：`E:\source\platfrom-admin\docs\SqlSugar\`  
共 **76 份**，全部完成 ✅

---

## 🗺️ 快速導航

| 分類 | 份數 | 核心關鍵字 |
| --- | --- | --- |
| [📖 數據查詢](#-%E6%95%B8%E6%93%9A%E6%9F%A5%E8%A9%A2) | 24 | ToList、Where、Join、分頁、聚合 |
| [✏️ 增刪改](#%EF%B8%8F-%E5%A2%9E%E5%88%AA%E6%94%B9) | 11 | Insert、Update、Delete、BulkCopy、雪花ID |
| [🔧 無實體&低代碼](#-%E7%84%A1%E5%AF%A6%E9%AB%94%E4%BD%8E%E4%BB%A3%E7%A2%BC) | 9 | 動態SQL、Json2SQL、無實體CRUD |
| [⚙️ 常用功能](#%EF%B8%8F-%E5%B8%B8%E7%94%A8%E5%8A%9F%E8%83%BD) | 11 | CodeFirst、DbFirst、AOP、事務、快取 |
| [🏗️ 設計模式](#%EF%B8%8F-%E8%A8%AD%E8%A8%88%E6%A8%A1%E5%BC%8F) | 10 | 倉儲、UoW、IOC、多租戶、單例 |
| [⚡ 性能優化](#-%E6%80%A7%E8%83%BD%E5%84%AA%E5%8C%96) | 9 | 分表、讀寫分離、BulkCopy、分批處理 |

---

## 📖 數據查詢

### 基礎 & 條件

| 檔案名 | 說明 | 常用方法 |
| --- | --- | --- |
| **基礎查詢.md** | 最常用的查詢速查表 | `ToList` `Count` `First` `Any` `Max/Min/Sum` `IN` `Contains` |
| **Where用法.md** | 動態條件、WhereIF | `WhereIF` `Expressionable` 動態OR |
| **Select用法.md** | 選取欄位、DTO投影 | `Select` 匿名物件 DTO映射 |

### 分頁 & 排序 & 分組

| 檔案名 | 說明 | 常用方法 |
| --- | --- | --- |
| **分頁查詢.md** | 同步/非同步分頁，Vben格式封裝 | `ToPageList` `ToPageListAsync` `RefAsync<int>` |
| **SqlSugar\_OrderBy.md** | 單欄/多欄/動態排序 | `OrderBy` `OrderByDescending` |
| **SqlSugar\_GroupBy\_Distinct.md** | 分組統計、去重 | `GroupBy` `Having` `Distinct` |

### 聯表 & 子查詢

| 檔案名 | 說明 | 常用方法 |
| --- | --- | --- |
| **聯表查詢.md** | Left/Inner/Right Join | `LeftJoin` `InnerJoin` 多表聯查 |
| **導航查詢.md** | 一對多、多對多關聯載入 | `Includes` 導航屬性 |
| **子查詢.md** | IN子查詢、EXISTS | `ContainsIF` 子查詢巢狀 |
| **嵌套查詢.md** | 查詢結果再查詢 | `Queryable` 巢狀 |

### 特殊查詢

| 檔案名 | 說明 | 常用方法 |
| --- | --- | --- |
| **並集查詢.md** | UNION / UNION ALL | `Union` `UnionAll` |
| **樹型查詢.md** | 遞迴樹狀結構查詢 | `ToTree` `ToChildList` |
| **配置查詢.md** | 通過設定動態查詢 | `ConfigQuery` |
| **跨庫查詢.md** | 同伺服器跨資料庫 JOIN | `.AS("db.dbo.Table")` |
| **動態表達式.md** | 執行期動態組合條件 | `Expressionable` 動態Lambda |
| **表格查詢WhereDynamicFilter.md** | 前端傳來的動態篩選條件 | `WhereDynamicFilter` |

### 進階查詢

| 檔案名 | 說明 | 常用方法 |
| --- | --- | --- |
| **報表查詢.md** | 報表用的複雜彙總查詢 | `MergeTable` 多層聚合 |
| **無實體查詢.md** | 不用實體的靈活查詢 | `SqlQueryable` 動態型別 |
| **異步查詢.md** | 非同步查詢完整用法 | `ToListAsync` `FirstAsync` |
| **查詢過濾器.md** | 全局自動過濾條件 | `QueryFilter` 軟刪除/租戶隔離 |
| **查詢函數SqlFunc.md** | 資料庫內建函數呼叫 | `SqlFunc.DateDiff` `SqlFunc.IIF` 等 |
| **擴展SqlFunc函數.md** | 自訂擴展函數 | 自訂 SqlFunc 擴展 |
| **查詢生命週期.md** | 查詢各階段事件 | `OnExecuting` `OnExecuted` |
| **執行查詢.md** | 手動執行查詢、ExecuteCommand | `ExecuteCommand` `SqlQueryable` |

---

## ✏️ 增刪改

### 插入

| 檔案名 | 說明 | 常用方法 |
| --- | --- | --- |
| **插入數據.md** | 單筆/批量/回傳ID | `Insert` `InsertRange` `ExecuteReturnIdentity` |
| **導航插入.md** | 主表+子表一次插入 | `InsertNav` |
| **插入或更新Storageable.md** | 有則更新無則插入 | `Storageable` `ExecuteSqlBulkCopy` |
| **雪花ID.md** | 分散式唯一ID生成 | `SnowFlakeSingle` 雪花ID配置 |

### 更新

| 檔案名 | 說明 | 常用方法 |
| --- | --- | --- |
| **更新數據.md** | 全欄/部分欄位更新 | `Updateable` `SetColumns` `UpdateColumns` |
| **導航更新.md** | 主表+子表一次更新 | `UpdateNav` |
| **更新並發控制.md** | 樂觀鎖防止資料覆蓋 | `IsEnableUpdateVersionValidation` `Version` |

### 刪除

| 檔案名 | 說明 | 常用方法 |
| --- | --- | --- |
| **刪除數據.md** | 條件刪除/實體刪除 | `Deleteable` `DeleteById` |
| **導航刪除.md** | 主表+子表聯動刪除 | `DeleteNav` |

### 批量 & 驗證 & 進階

| 檔案名 | 說明 | 常用方法 |
| --- | --- | --- |
| **表格保存GridSave.md** | 前端表格增刪改一次搞定 | `GridSave` |
| **資料導入驗證.md** | Excel匯入+欄位驗證 | `ImportVerification` |

---

## 🔧 無實體&低代碼

| 檔案名 | 說明 | 常用方法 |
| --- | --- | --- |
| **SQL分頁查詢.md** | 原生SQL分頁 | `SqlQueryable` + 分頁 |
| **原生SQL.md** | 執行任意SQL | `Ado.SqlQuery` `ExecuteCommand` |
| **Json2SQL.md** | JSON轉SQL查詢 | `Json2SQL` 低代碼查詢引擎 |
| **無實體多庫查詢.md** | 不建實體跨庫查詢 | `UnionAll` 無實體多庫 |
| **無實體插入.md** | 不建實體直接插入 | `Insertable(Dictionary)` |
| **無實體更新.md** | 不建實體直接更新 | `Updateable(Dictionary)` |
| **無實體刪除.md** | 不建實體直接刪除 | `Deleteable` 無實體版 |
| **動態建類CRUD.md** | 執行期動態建立實體類 | `RuntimeClass` 動態型別 |
| **字串表達式.md** | 字串Lambda表達式 | `string` 型別 Lambda |

---

## ⚙️ 常用功能

### 建表 & 實體

| 檔案名 | 說明 | 常用方法 |
| --- | --- | --- |
| **建表遷移CodeFirst.md** | 由 C# 實體建立/更新資料庫表 | `CodeFirst.InitTables` `SugarColumn` |
| **生成實體DbFirst.md** | 由資料庫反向產生 C# 實體 | `DbFirst` T4/生成器 |
| **庫表管理DbMaintenance.md** | 查詢表/欄位結構資訊 | `DbMaintenance.GetTableInfoList` |
| **實體管理EntityMaintenance.md** | 管理實體映射關係 | `EntityMaintenance` |

### 類型 & 轉換

| 檔案名 | 說明 | 常用方法 |
| --- | --- | --- |
| **Json類型.md** | 欄位儲存JSON物件 | `[SugarColumn(IsJson=true)]` |
| **枚舉類型.md** | 枚舉存整數或字串 | `[SugarColumn(SerializeDateTimeFormat)]` |
| **自定義類型TypeHandlers.md** | 自訂資料庫↔C#型別轉換 | `ISugarDataConverter` 民國年轉換器 |

### AOP & 工具

| 檔案名 | 說明 | 常用方法 |
| --- | --- | --- |
| **AOP日誌.md** | 全局SQL日誌、差異日誌、審計欄位 | `OnLogExecuting` `OnDiffLogEvent` `DataExecuting` |
| **輔助方法Utilities.md** | 各種工具方法速查 | `db.Utilities` 系列方法 |
| **查詢過濾器.md** | → 見數據查詢章節 |   |

### 事務 & 提交

| 檔案名 | 說明 | 常用方法 |
| --- | --- | --- |
| **事務鎖.md** | 悲觀鎖、Wait/Error模式 | `db.Queryable().With(SqlWith.UpdLock)` |
| **打包提交.md** | 多操作一次提交 | `UseTran` `AddQueue` `SaveQueues` |

---

## 🏗️ 設計模式

### 倉儲模式

| 檔案名 | 說明 | 核心概念 |
| --- | --- | --- |
| **使用倉儲.md** | SimpleClient\<T> 倉儲基本用法 | `SimpleClient` 內建CRUD方法 |
| **倉儲多租戶.md** | 多庫倉儲 + 跨庫事務 | `TenantAttribute` `GetConnectionWithAttr` `iTenant` |
| **UnitOfWork工作單元.md** | UoW 統一管理事務 | `IUnitOfWork` `CreateContext` |

### IOC & 架構

| 檔案名 | 說明 | 核心概念 |
| --- | --- | --- |
| **IOC注入.md** | DI 單例注入設定 | `AddSingleton<ISqlSugarClient>` SqlSugarScope |
| **單例模式.md** | SqlSugarScope 原理與正確使用 | 單例 vs 每次new，AsyncLocal |

### 多租戶

| 檔案名 | 說明 | 核心概念 |
| --- | --- | --- |
| **多租戶基礎.md** | 固定多庫 / 動態多庫設定 | `ConfigId` `GetConnection` `AddConnection` |
| **倉儲多租戶.md** | → 見倉儲模式章節 |   |

### 安全 & 特殊設計

| 檔案名 | 說明 | 核心概念 |
| --- | --- | --- |
| **SQL注入防護.md** | 低代碼平台防注入策略 | 參數化查詢、`SqlFunc.MappingColumn` |
| **鑑別器Discriminator.md** | 單表繼承（TPH）模式 | `[Discriminator]` 鑑別器欄位 |
| **ValueObject值對象.md** | 一維表用二維物件表達 | `[SugarColumn(IsOwnsOne=true)]` |
| **偶發性錯誤與執行緒安全.md** | 執行緒安全排查三步驟 | `CopyNew()` `async Task` `await漏寫` |

---

## ⚡ 性能優化

| 檔案名 | 說明 | 適用場景 |
| --- | --- | --- |
| **自動分表.md** | 按年/月/日/自訂規則自動分表 | 每日百萬筆以上、操作日誌、流水帳 |
| **讀寫分離.md** | 主庫寫、從庫讀，AlwaysOn AG | SQL Server AG、讀多寫少場景 |
| **二級緩存.md** | Redis/MemoryCache 查詢快取 | 字典表、選單、低頻更新的共用資料 |
| **非同步操作.md** | async/await 正確用法速查 | 所有 Web API 查詢，高並發場景 |
| **並發執行.md** | Task.WhenAll 並行多查詢 | 儀表板多區塊、分表聚合統計 |
| **SAAS分庫.md** | 多集團各自獨立業務庫 | 集運/會計/電子發票多公司架構 |
| **大數據寫入.md** | BulkCopy/Update/Merge 極速寫入 | Excel匯入、銀行明細、資料同步 |
| **字元索引優化.md** | nvarchar→varchar 索引失效解法 | Chinese Collation、varchar欄位查詢 |
| **分批處理記憶體優化.md** | ForEach/PageEach 分批降低記憶體 | 大量匯出Excel、跨庫資料遷移 |

---

## 💡 常見場景速查

> 遇到需求時直接查這裡，找到對應筆記

| 我想要… | 看哪份筆記 |
| --- | --- |
| 查詢列表 + 分頁 | 基礎查詢.md、分頁查詢.md |
| 動態篩選條件（前端傳參數） | Where用法.md、表格查詢WhereDynamicFilter.md |
| LEFT JOIN 多表查詢 | 聯表查詢.md |
| 一對多子表一起查 | 導航查詢.md |
| Excel 匯入資料 | 資料導入驗證.md、大數據寫入.md |
| 大量插入（BulkCopy） | 大數據寫入.md |
| 有則更新、無則插入 | 插入或更新Storageable.md |
| 防止並發衝突（樂觀鎖） | 更新並發控制.md |
| 多個操作一起提交（事務） | 打包提交.md、UnitOfWork工作單元.md |
| 跨庫（多個DB）操作 | 多租戶基礎.md、倉儲多租戶.md、SAAS分庫.md |
| 查詢偶爾出錯（執行緒） | 偶發性錯誤與執行緒安全.md |
| 查詢很慢（索引失效） | 字元索引優化.md |
| 記憶體佔用太高 | 分批處理記憶體優化.md |
| 自動記錄誰改了什麼 | AOP日誌.md（差異日誌） |
| 定時Job存取資料庫 | 偶發性錯誤與執行緒安全.md、並發執行.md |
| 多公司/多集團系統 | SAAS分庫.md |
| 不建實體動態CRUD | 動態建類CRUD.md、無實體\*.md |

---

## 📊 完成統計

```
數據查詢   ████████████████████████  24/24 ✅
增刪改     ███████████               11/11 ✅
無實體     █████████                  9/9  ✅
常用功能   ███████████               11/11 ✅
設計模式   ██████████                10/10 ✅
性能優化   █████████                  9/9  ✅
─────────────────────────────────────────
合計       76/76 🎉 全部完成！
```