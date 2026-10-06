---
title: "設定 FreeRADIUS 進行記賬"
title_original: "Setup FreeRADIUS for accounting"
source: "https://docs.opnsense.org/manual/how-tos/accounting.html"
chapter: ["Community Plugins","Other"]
order: 181
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:33:12.522Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：自由半徑](<180 自由半徑.md>)　｜　[下一篇：如何設定郵件網關 ➡](<182 如何設定郵件網關.md>)

# 設定 FreeRADIUS 進行記賬

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Other](<000 目錄.md#c-38>)

## 本教程的目標

本教學可用於透過半徑記帳來測試您的強制門戶設置，它不適用於生產設置（因為我們只對所有內容使用簡單的平面文件）。我們使用 Ubuntu Linux 進行此設置，不同的作業系統可能會導致某些路徑不同。

OPNsense 防火牆上的使用者限制是在登入後立即設定的，Radius 伺服器應告訴防火牆為成功登入的使用者留下了多少資源。正常的登入順序如下所示：

\[登入\] -> \[傳送記帳開始\] -> \[連線時傳送暫時更新\] -> \[登出時，傳送記帳停止\]

## 設定

若要在 ubuntu 中設定 freeradius，請執行以下命令：

```bash
apt-get install freeradius
```

### 安排客戶端訪問

編輯檔案 /etc/freeradius/clients.conf 並為您的網路附加一個區塊，作為範例，我們將使用 10.211.55.0/24。

```
client 10.211.55.0/24 {
    secret      = testing123
    shortname   = test-network
 }
```

### 啟用每日會話限制

啟用每日會話限制，這需要記帳來通知客戶端使用情況。

-   在 /etc/freeradius/sites-available/default 中，每天取消授權和記帳部分的註釋。
    
-   在 /etc/freeradius/radiusd.conf 中每天取消實例化部分的註釋
    
-   追加到 /etc/freeradius/dictionary
    

```
ATTRIBUTE       Daily-Session-Time      3000    integer
ATTRIBUTE       Max-Daily-Session       3001    integer
```

-   取消註釋會計部分中的 sradutmp，以便能夠使用 radwho 指令。
    

## 新增測試用戶

您可以將測試使用者新增至 /etc/freeradius/users 中，它們應該如下所示：

```
"test" Cleartext-Password := "test", Max-Daily-Session := 1800
        Framed-IP-Address = 10.211.55.100,
        Reply-Message = "Hello, %{User-Name}"
```

確保第二行和第三行縮排一個製表符。

這將導致用戶每天的最大使用時間為 1800 秒。

## 測試半徑

對於初始測試，偵錯從 Freeradius 進出的流量可能是實用的。接下來的步驟可協助您在偵錯模式下啟動 Freeradius，而不輸出到控制台：

```
/etc/init.d/freeradius stop
freeradius -X
```

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：自由半徑](<180 自由半徑.md>)　｜　[下一篇：如何設定郵件網關 ➡](<182 如何設定郵件網關.md>)
