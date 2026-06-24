# SqlSugar — 查詢函數（SqlFunc）筆記

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=1190)


[//]: # (sqlsugar-cheatsheet)
## 速查表

| 類別 | 常用函數 |
|---|---|
| 邏輯 | SqlFunc.IIF、IsNull、IF...RETURN(CASE WHEN) |
| 時間 | DateAdd、DateDiff、DateIsSame、DateValue |
| 聚合 | AggregateSum / Count / Max / Min / Avg |
| 字串 | CharIndex、Contains、StartsWith、EndsWith |
| 數值 | Abs、Ceil、Round |
| 類型轉換 | ToVarchar、ToInt32、ToString |
| 模糊 / IN | Contains、ContainsArray、Between |
| 開窗 | RowNumber(5.1.1+) |
| JSON | JSON 系列函數 |

---

SqlFunc 只能用在表達式（Lambda）中。若要在非表達式中取得資料庫時間，改用 db.GetDate()。

---

## 一、支援的 C# 原生語法

以下直接在 Lambda 中使用，SqlSugar 會自動轉成對應 SQL：

```csharp
// 字串
it.Name.ToString()
it.Name.Contains("a")         // LIKE '%a%'
it.Name.StartsWith("a")       // LIKE 'a%'
it.Name.EndsWith("a")         // LIKE '%a'
it.Name.ToLower()
it.Name.ToUpper()
it.Name.Trim()
it.Name.Replace("a", "b")
it.Name.Length                // LEN / LENGTH
it.Name.Substring(0, 3)

// 數值
it.Price ?? 0                 // ISNULL(Price, 0)
Convert.ToInt32(it.Price)

// 時間
it.CreateTime.ToString("yyyy-MM-dd")
it.CreateTime.AddDays(1)
it.CreateTime.Day / .Month / .Year / .Hour / .Minute / .Second
it.CreateTime.Date            // 只取日期部分
it.CreateTime.DayOfWeek

// 時間差
(it.EndTime - it.StartTime).TotalDays
(it.EndTime - it.StartTime).TotalHours

// 三元
it.Id == 1 ? "是" : "否"
it.Num ?? 0
```

---

## 二、邏輯函數

### IIF（三元）

```csharp
SqlFunc.IIF(it.Id == 1, "是", "否")
// → CASE WHEN Id = 1 THEN '是' ELSE '否' END
```

### IF...RETURN...ElseIF...End（CASE WHEN）

```csharp
SqlFunc.IF(it.Status == 1).Return("待審")
       .ElseIF(it.Status == 2).Return("審核中")
       .End("已完成")

// End 傳 null 寫法：.End<string>()
```

### IsNull（ISNULL / IFNULL）

```csharp
SqlFunc.IsNull(it.Amount, 0)   // ISNULL(Amount, 0)
it.Amount ?? 0                 // 等效寫法
```

---

## 三、時間函數

### 時間格式化

```csharp
it.CreateTime.ToString("yyyy-MM-dd")
it.CreateTime.ToString("yyyy-MM")
it.CreateTime.ToString("yyyy-MM-dd HH:mm:ss")

// MySQL 原生格式（有 % 號就進原生轉換）
it.CreateTime.ToString("%Y-%m")
```

### 取得資料庫時間

```csharp
SqlFunc.GetDate()              // 表達式中
db.GetDate()                   // 非表達式中
```

### 判斷同一天 / 同一月 / 同一年

```csharp
// 同一天（查今天資料）
SqlFunc.DateIsSame(it.CreateTime, DateTime.Now)

// 同一月
it.CreateTime.ToString("yyyy-MM") == DateTime.Now.ToString("yyyy-MM")

// 同一年
it.CreateTime.Year == DateTime.Now.Year

// 同一指定單位（年/月/天/時/分/秒）
SqlFunc.DateIsSame(it.CreateTime, DateTime.Now, DateType.Month)
```

### 日期加減

```csharp
SqlFunc.DateAdd(it.CreateTime, 7, DateType.Day)   // 加 7 天
SqlFunc.DateAdd(it.CreateTime, 1)                  // 加 1 天（預設 Day）
it.CreateTime.AddDays(1)                           // 等效
```

### 取得日期部分

```csharp
SqlFunc.DateValue(it.CreateTime, DateType.Year)    // 取年
SqlFunc.DateValue(it.CreateTime, DateType.Month)   // 取月
SqlFunc.DateValue(it.CreateTime, DateType.Day)     // 取日
SqlFunc.DateValue(it.CreateTime, DateType.Quarter) // 取季

it.CreateTime.Year   // 等效：取年
it.CreateTime.Month  // 等效：取月
it.CreateTime.Day    // 等效：取日
```

### 計算時間差

```csharp
SqlFunc.DateDiff(DateType.Day, startTime, endTime)   // 相差天數（小的在前）
(it.EndTime - it.StartTime).TotalDays                // 等效寫法
```

### 週數 / 周幾

```csharp
SqlFunc.DateValue(it.CreateTime, DateType.Weekday)  // 周幾
SqlFunc.WeekOfYear(it.CreateTime)                   // 一年中第幾週
```

### 時間轉 UNIX 時間戳（5.1.4.194+）

```csharp
SqlFunc.UNIX_TIMESTAMP(it.CreateTime)
```

---

## 四、聚合函數

```csharp
SqlFunc.AggregateSum(it.Amount ?? 0)           // SUM，用 ?? 去 null
SqlFunc.AggregateSumNoNull(it.Amount)          // SUM(ISNULL(Amount,0))
SqlFunc.AggregateAvg(it.Amount ?? 0)           // AVG
SqlFunc.AggregateMax(it.Amount)                // MAX
SqlFunc.AggregateMin(it.Amount)                // MIN
SqlFunc.AggregateCount(it.Id)                  // COUNT
SqlFunc.AggregateDistinctCount(it.Name)        // COUNT(DISTINCT Name)
```

---

## 五、字串處理

```csharp
SqlFunc.Substring(it.Name, 0, 3)               // 截取字串
SqlFunc.Replace(it.Name, "舊", "新")            // 替換
SqlFunc.ToLower(it.Name)                        // 轉小寫
SqlFunc.ToUpper(it.Name)                        // 轉大寫
SqlFunc.Trim(it.Name)                           // 去前後空格
SqlFunc.Length(it.Name)                         // 字串長度
SqlFunc.PadLeft(it.Name, 10, '0')              // 左補字元
SqlFunc.MergeString(it.FirstName, " ", it.LastName)  // 字串串接（跨資料庫安全）
SqlFunc.CharIndex(it.Name, "關鍵字")             // 字元位置
SqlFunc.Stuff(it.Name, 1, 3, "XXX")            // 指定位置替換
```

---

## 六、數值處理

```csharp
SqlFunc.Round(it.Price, 2)    // 四捨五入，保留 2 位小數
SqlFunc.Abs(it.Price)         // 絕對值
SqlFunc.Floor(it.Price)       // 向下取整
SqlFunc.Ceil(it.Price)        // 向上取整
```

---

## 七、類型轉換

```csharp
SqlFunc.ToInt32(it.StrVal)
SqlFunc.ToInt64(it.StrVal)
SqlFunc.ToString(it.IntVal)
SqlFunc.ToDecimal(it.StrVal)
SqlFunc.ToDouble(it.StrVal)
SqlFunc.ToDate(it.StrVal)
SqlFunc.ToGuid(it.StrVal)
SqlFunc.ToBool(it.StrVal)
```

---

## 八、布林 / 判斷函數

```csharp
// NULL 判斷
SqlFunc.IsNullOrEmpty(it.Name)      // IS NULL OR = ''
SqlFunc.HasValue(it.Name)           // IS NOT NULL
it.Name == null                     // IS NULL
it.Name != null                     // IS NOT NULL
SqlFunc.HasNumber(it.Amount)        // > 0 AND IS NOT NULL

// 等於（支援 IS NULL）
SqlFunc.EqualsNull(it.Name, null)   // IS NULL
SqlFunc.EqualsNull(it.Name, "A")    // = 'A'

// 範圍
SqlFunc.Between(it.Amount, 100, 500)  // BETWEEN 100 AND 500

// 按位運算
SqlFunc.BitwiseAnd(it.Flag, 1)      // &
SqlFunc.BitwiseInclusiveOR(it.Flag, 2)  // |

// 字符串逗號分割後是否存在值（5.1.3.51+）
SqlFunc.SplitIn("1,2,3,4", "1")     // true
SqlFunc.SplitIn("1,2,3,4", "5")     // false
```

---

## 九、模糊查詢 / IN 查詢

```csharp
// LIKE
SqlFunc.Contains(it.Name, "關鍵字")            // LIKE '%關鍵字%'
!SqlFunc.Contains(it.Name, "關鍵字")           // NOT LIKE '%關鍵字%'
SqlFunc.StartsWith(it.Name, "前綴")            // LIKE '前綴%'
SqlFunc.EndsWith(it.Name, "後綴")              // LIKE '%後綴'

// 原生寫法（等效）
.Where(it => it.Name.Contains("關鍵字"))

// 處理 LIKE 值中有通配符
var safeVal = db.Utilities.EscapeLikeValue("a%b");

// IN（非參數化，無上限）
SqlFunc.ContainsArray(new object[]{ 1, 2, 3 }, it.Id)

// IN（參數化，兼容性佳）
SqlFunc.ContainsArrayUseSqlParameters(new object[]{ 1, 2, 3 }, it.Id)

// 原生 IN 寫法
.Where(it => ids.Contains(it.Id))              // IN
.Where(it => !ids.Contains(it.Id))            // NOT IN

// nvarchar 控制（字串 IN 時）
nameList.Contains(it.Name, true)               // nvarchar
nameList.Contains(it.Name, false)              // varchar（預設，效能較好）

// 多欄位 IN（5.1.4.67+）
.Where(it => list.Any(s => s.Id == it.Id && s.Name == it.Name))

// InLike（多值模糊，ConditionalType = 15）
// 格式 X,Y,Z → LIKE '%X%' OR LIKE '%Y%' OR LIKE '%Z%'
```

---

## 十、開窗函數（5.1.1+）

```csharp
SqlFunc.RowCount()                           // COUNT(1) OVER()
SqlFunc.RowMax(it.Amount)                    // MAX(Amount) OVER()
SqlFunc.RowMin(it.Amount)                    // MIN(Amount) OVER()
SqlFunc.RowAvg(it.Amount)                    // AVG(Amount) OVER()
SqlFunc.RowNumber(it.Id)                     // ROW_NUMBER() OVER(ORDER BY Id)
SqlFunc.RowNumber(it.Id, it.Name)            // ROW_NUMBER() OVER(PARTITION BY Name ORDER BY Id)
SqlFunc.RowNumber(SqlFunc.Desc(it.Id))       // ROW_NUMBER() OVER(ORDER BY Id DESC)

// 多欄位排序 + 分組
SqlFunc.RowNumber($"{it.Id} asc ,{it.Name} desc", $"{it.Id},{it.Name}")

// 在 Where 中用開窗函數需搭配 MergeTable
.Select(it => new { index = SqlFunc.RowNumber(it.Id), it.Name })
.MergeTable()
.Where(it => it.index == 1)
.ToList()
```

---

## 十一、JSON 函數

| 函數 | 說明 | 支援資料庫 |
|---|---|---|
| SqlFunc.JsonLike(it.Json, "a") | 模糊查詢（等同 LIKE '%a%'）| 全部 |
| SqlFunc.JsonField(it.Json, "id") | 取第一層欄位值 | PgSQL / SqlServer2017+ / MySQL / Oracle |
| SqlFunc.JsonField(it.Json, "obj", "id") | 多層級取值 | 同上 |
| SqlFunc.JsonIndex(it.Json, 0) | 取陣列索引值（5.1.4.113+）| PgSQL / MySQL / SqlServer2017 |
| SqlFunc.JsonArrayAny(it.Json, "a") | 字串陣列中是否存在值（5.1.3.36+）| PgSQL / MySQL / SqlServer最新版 |
| SqlFunc.JsonListObjectAny(it.Json, "Name", "a") | 物件陣列中是否存在欄位值（5.1.3.36+）| 同上 |
| SqlFunc.JsonArrayLength(it.Json) | 取陣列長度 | PgSQL / MySQL / SqlServer |
| SqlFunc.JsonParse | 轉成 JSON 類型 | PgSQL |
| SqlFunc.JsonContainsFieldName | 是否存在指定欄位名 | PgSQL |

---

## 十二、導航函數（不需要 Includes）

```csharp
// 一對多 / 多對多
.Where(x => x.Books.Any())                        // 存在子資料
.Where(x => x.Books.Any(z => z.Id == 1))          // 帶條件
.Where(x => x.Books.Count() > 2)                  // 子資料數量
.Select(it => new { count = it.Books.Count() })   // Select 中用 Count

// 一對一
.Where(x => SqlFunc.Exists(x.School.Id))                          // 存在
.Where(x => SqlFunc.Exists(x.School.Id, List<IConditionalModel>)) // 帶動態條件
```

---

## 十三、嵌入原生 SQL

```csharp
// 函數中嵌入 SQL 片段
SqlFunc.MappingColumn(default(int), "row_number() over(order by id)")

// 新語法（5.1.4.64+）
SqlFunc.MappingColumn<int>("1")          // 生成 SQL: 1
SqlFunc.MappingColumn<string>("'abc'")   // 生成 SQL: 'abc'

// Where / Select 中直接寫 SQL 字串
db.Queryable<Order>()
    .Where("id = @id", new { id = 1 })
    .Select("id, name")
    .ToList()
```

---

## 注意事項

- SqlFunc 只能用在表達式（Lambda）中，非表達式取資料庫時間改用 db.GetDate()
- 時間格式化各資料庫支援度不同，MSSQL 2012 以下只支援 yyyy-MM-dd、yyyy-MM、yyyy-MM-dd HH:mm:ss
- MySQL 時間格式可用 % 前綴進入原生轉換，如 ToString("%Y-%m")
- 字串 IN 查詢預設 varchar（效能較好），若欄位是 nvarchar 用 Contains(it.Name, true)
- 開窗函數在 Where 中需搭配 MergeTable
- JSON 函數各資料庫支援程度不一，使用前確認版本需求
