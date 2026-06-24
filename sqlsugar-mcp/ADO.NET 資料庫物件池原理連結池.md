# **ADO.NET 資料庫物件池原理/連結池**

[//]: # (sqlsugar-source)
> 📖 官方文件:[果糖網 SqlSugar 5x 文件](https://www.donet5.com/Home/Doc?typeId=2362)


[//]: # (sqlsugar-cheatsheet)
## 速查表

| 主題 | 重點 |
|---|---|
| 連線池 | 連接字串預設啟用 Pooling=true,連線用完歸還而非真正關閉 |
| Client 釋放 | IsAutoCloseConnection=true 查詢後自動關閉並歸還連線 |
| 手動控制 | db.Ado.Connection.Open() / db.Close() / db.Dispose() |
| SqlSugarScope | 單例,依上下文自動管理連線,執行緒安全 |
| 驗證釋放 | 觀察資料庫連線數是否歸還(sp_who) |

---

本文主要是介紹底層原理，單純的使用可以不看這文章，畢竟 ORM 也是用的底層的 ADO，知道些原理心理更加安心一些。

#### **1、ADO.NET 連線池**

**如何啟用和禁用連線池？**

答：連線字串中將連線池值 Pooling 設定為 true 或 yes，則會啟用連線池（預設啟用）。

啟用後連線池後系統會根據併發情況將連線池保持在一個合理區間，讓效能最大化，並不會立馬清空，而是將其狀態更改為 sleep。禁用連線池效能會差一些，open 就開啟連線池 close 就關閉連線池。

##### **1.1 Open()**

1. **啟用連線池情況（預設）**
   先找有沒有睡眠的連線池有恢復連線池，如果沒有睡眠的連線池開啟新的連線池。
2. **禁用連線池情況（需要字串關閉）**
   開啟新連線池。

##### **1.2 Close()**

1. **啟用連線池情況（預設）**
   將現有連線池睡眠。
2. **禁用連線池情況（需要字串關閉）**
   關閉連線池。

##### **1.3 dispose()**

方法實際是和 close() 做的同一件事，唯一區別是 dispose 會銷燬當前 C# 物件。

SqlSugar dispose 後在開啟不會報錯，原理如下：

```csharp
var db = GetInstance();
db.Open();
Console.WriteLine(db.Ado.Connection.GetHashCode());
db.Close();
Console.WriteLine(db.Ado.Connection.GetHashCode());
db.Dispose();
// 如果下次在使用 db 會 new 出新的 SqlConnection 和 Ado.net 不一樣 Ado.net 是直接報錯
Console.WriteLine(db.Ado.Connection.GetHashCode());
```

輸出結果如下：

唯一的區別是 Dispose 後在使用 db，db 物件會換成新的而不在是以前的，而 close 後在使用還是同一個 db 物件。

#### **2、SqlConnection 和連線池**

SqlConnection 非執行緒安全物件，不同上下文要 new 不同物件。

```csharp
con.Open(); // 請求資料庫連線池 查詢有沒有 sleep 狀態的，沒有建立連線池
con.Close(); // 將當前連線池狀態改為 sleep，如果長時間不用會銷燬
```

上面的原理可以看出：

1. 同一個物件多次 open 和 close 都是在現有的連線池裡面去操作。
2. 就算是多個 SqlConnection 不在同時間請求，也可能會用同一個連線池。
3. 多個 SqlConnection 併發操作會找有沒有空閒的連線池，沒有在建立。

所以連線池在 .NET 中微軟封裝的很好，很成熟，多數 .NET 使用者都不知道是什麼玩意兒。

##### **連線超時設定**

```csharp
在連線池符串加上 Connection Timeout=10，預設是 30 秒，單位秒。
```

##### **.NET 中要配置連線池嗎？**

答：什麼都不用配置只要學會 open 和 close 就行了。

#### **3、SqlSugarClient 原理**

1. **手動釋放模式**和 SqlConnection 原理一模一樣，底層就是用的 SqlConnection 並且需要注意執行緒安全。

```csharp
// 建立資料庫物件 SqlSugarClient
SqlSugarClient db = new SqlSugarClient(new ConnectionConfig()
{
    ConnectionString = "Server=.xxxxx",
    DbType = DbType.SqlServer,
    IsAutoCloseConnection = false // 手動釋放 是長連線
});
// 需要手動 using
// 或者
// db.Open();
// db.Close();
```

2. **自動釋放（推薦）**，說白了不需要你去寫 using 或者 close 和 open。

```csharp
// 建立資料庫物件 SqlSugarClient
SqlSugarClient db = new SqlSugarClient(new ConnectionConfig()
{
    ConnectionString = "Server=.xxxxx",
    DbType = DbType.SqlServer,
    IsAutoCloseConnection = true // 自動釋放
});
// 寫程式碼就不需要考慮 open close 直接用就行了
```

**情況 1：** 沒有事務的情況，每次操作自動呼叫 open 和 close。

**情況 2：** 有事務的情況下，開啟事務呼叫 open，提交或者回滾事務呼叫 close。

#### **4、SqlSugarScope 原理**

它是對 SqlSugarClient 的封裝讓他支援執行緒安全，並且在不同上下文自動 new 出 SqlSugarClient，在編寫程式碼的時候不需要考慮他執行緒是否安全。

但是在 Task.WhenAll 和 Job 中或者不寫 await 這 3 種情況不能自已 new 出 SqlSugarClient，所以這 3 種情況需要 CopyNew() 手動處理。

##### **什麼是上下文？**

**非同步情況：** 在同一串 await 中是一個上下文。

**同步情況：** 在同一個執行緒是同一個上下文。

同一個 SqlSugarScope 做到了在同一個上下文共享一個物件，不同上下文自動去 NEW。

#### **5、如何驗證是否釋放**

預設情況下只要超過 100 個請求沒關閉就會報錯，不同庫可能有差異。

```csharp
for (int i = 0; i < 501; i++)
{
    SqlSugarClient db = new SqlSugarClient(new ConnectionConfig()
    {
        DbType = DbType.Oracle,
        ConnectionString = Config.ConnectionString,
        IsAutoCloseConnection = false // 設成關閉這個程式碼會直接報錯
    });
    db.Ado.GetInt("SELECT 1 from dual");
}
// IsAutoCloseConnection=true 執行成功
// IsAutoCloseConnection=false 會出現連線池超時或者超過上限等錯誤
```

#### **7、總結**

他們 3 者的關係應該是這樣的：

- **SqlSugarScope**：底層 + 自動釋放 + 上下文安全
- **SqlSugarClient**：底層 + 自動釋放控制
- **SqlConnection**：底層

---

**2016 © [donet5.com](https://www.donet5.com/) Apache Licence 2.0**

[蘇ICP備2020070057號](http://beian.miit.gov.cn)

*內容由 AI 生成僅供參考*
