# **ORM 查詢體系、最簡單、最強大**

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=2308)

#### **基礎查詢**

| 功能     | 描述                                                                        | 鏈接                                             |
| -------- | --------------------------------------------------------------------------- | ------------------------------------------------ |
| 基礎查詢 | 查詢單條、主鍵查詢、查所有、模糊查詢、排序、TOP、Count、查單條、IN 等等操作 | [查看](https://www.donet5.com/Home/Doc?typeId=1187) |
| 分頁查詢 | 分頁查詢                                                                    | [查看](https://www.donet5.com/Home/Doc?typeId=2242) |
| 分組查詢 | 分組查詢和去重複 Group by Distinct                                          | [查看](https://www.donet5.com/Home/Doc?typeId=2243) |
| 排序     | Order by、隨機排序、動態排序                                                | [查看](https://www.donet5.com/Home/Doc?typeId=2312) |

#### **多表查詢**

| 功能     | 描述                                           | 鏈接                                             |
| -------- | ---------------------------------------------- | ------------------------------------------------ |
| 聯表查詢 | 使用 Left Join Inner Join 進行查詢             | [查看](https://www.donet5.com/Home/Doc?typeId=1185) |
| 配置查詢 | 簡化聯表操作，解決字典聯表和簡單 Name 聯表問題 | [查看](https://www.donet5.com/Home/Doc?typeId=2309) |
| 子查詢   | 子查詢                                         | [查看](https://www.donet5.com/Home/Doc?typeId=2231) |
| 嵌套查詢 | 嵌套聯表查詢、多合一嵌套、一合一嵌套           | [查看](https://www.donet5.com/Home/Doc?typeId=2354) |
| 導航查詢 | 一對多、一對一、多對多操作，有層級的查詢       | [查看](https://www.donet5.com/Home/Doc?typeId=1188) |
| 並集查詢 | Union all                                      | [查看](https://www.donet5.com/Home/Doc?typeId=2310) |
| 樹型查詢 | 查詢出一個樹形結構，比如菜單                   | [查看](https://www.donet5.com/Home/Doc?typeId=2311) |

#### **業務查詢**

| 功能       | 描述                                                   | 鏈接                                             |
| ---------- | ------------------------------------------------------ | ------------------------------------------------ |
| 無實體查詢 | 沒有實體查詢                                           | [查看](https://www.donet5.com/Home/Doc?typeId=2313) |
| 表格查詢   | 前端組裝好查詢條件，後臺直接使用                       | [查看](https://www.donet5.com/Home/Doc?typeId=2314) |
| 全局過濾器 | 比如很多地方用到假刪除，那麼我們可以配置加上 IsDeleted | [查看](https://www.donet5.com/Home/Doc?typeId=1205) |
| 多庫查詢   | 如果表結構一樣，那我們可以用一個實體操作不同表         | [查看](https://www.donet5.com/Home/Doc?typeId=2244) |

#### **高級功能**

| 功能          | 描述                                                                    | 鏈接                                             |
| ------------- | ----------------------------------------------------------------------- | ------------------------------------------------ |
| 二級緩存      | 支持 Redis 等緩存，讓你不需要維護 CacheKey 輕鬆使用緩存來提高服務器性能 | [查看](https://www.donet5.com/Home/Doc?typeId=1214) |
| 異步查詢      | 使用異步進行查詢                                                        | [查看](https://www.donet5.com/Home/Doc?typeId=1189) |
| Sqlfun 函數   | 使用 SqlSugar 自帶的數據庫函數查詢                                      | [查看](https://www.donet5.com/Home/Doc?typeId=1190) |
| 擴展 Sql 函數 | 當有些 ORM 不能解析的功能，可以自已封裝 SQL 函數                        | [查看](https://www.donet5.com/Home/Doc?typeId=1225) |
| 動態表達式    | 動態創建表達式，解析表達式成 SQL                                        | [查看](https://www.donet5.com/Home/Doc?typeId=2359) |
| 報表查詢      | 集合和表的 Join，報表統計                                               | [查看](https://www.donet5.com/Home/Doc?typeId=2315) |

#### **Queryable**

| 功能        | 描述                                                                                                                                               | 鏈接                                             |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Select 用法 | 一列、多列、匿名對象、多表映射等                                                                                                                   | [查看](https://www.donet5.com/Home/Doc?typeId=1186) |
| Where 用法  | 表達式、拼表達式、Sql、動態條件等                                                                                                                  | [查看](https://www.donet5.com/Home/Doc?typeId=1184) |
| 生命週期    | 原理、引用類型、拷貝機制                                                                                                                           | [查看](https://www.donet5.com/Home/Doc?typeId=2317) |
| 執行查詢    | ToList First ToDateTable ToJson ToTree ToParentList ToSql ToPivotList ToPivotTableToClassString ToDictionary ToDictionaryList Count Any SumMax Min | [查看](https://www.donet5.com/Home/Doc?typeId=2316) |

---

**2016 © [donet5.com](https://www.donet5.com/) Apache Licence 2.0**

[蘇 ICP 備 2020070057 號](http://beian.miit.gov.cn)

*內容由 AI 生成僅供參考*
