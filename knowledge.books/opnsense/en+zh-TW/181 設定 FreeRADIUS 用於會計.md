---
title: "Setup FreeRADIUS for accounting｜設定 FreeRADIUS 用於會計"
title_original: "Setup FreeRADIUS for accounting"
source: "https://docs.opnsense.org/manual/how-tos/accounting.html"
chapter: ["Community Plugins","Other"]
order: 181
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:33:12.522Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：FreeRADIUS](<180 FreeRADIUS.md>)　｜　[下一篇：How To Setting Up A Mail Gateway｜如何設定郵件網關 ➡](<182 如何設定郵件網關.md>)

# Setup FreeRADIUS for accounting｜設定 FreeRADIUS 用於會計

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Other](<000 目錄.md#c-38>)

## Goal of this tutorial｜本教程的目標

This tutorial can be used to test your Captive portal setup with radius accounting, it’s not intended to use for production setups (because we only use simple flat files for everything). We used Ubuntu linux for this setup, a different operating system might result in some paths being different.

本教學課程可用於測試您的基於 RADIUS 計費的強制門戶設置，不適用於生產環境（因為我們只使用簡單的平面文件）。本教程使用 Ubuntu Linux 系統，其他作業系統可能會導致某些路徑有所不同。

User limits on the OPNsense firewall are set right after login, the Radius server should tell the firewall how many resources are left for the user that logged in successfully. A normal login sequence look like this:

OPNsense 防火牆的使用者限制在登入後立即設置，Radius 伺服器應告知防火牆已成功登入使用者剩餘的資源數量。正常的登入流程如下：

\[login\] -> \[send accounting start\] -> \[send interim updates while connected\] -> \[on logout, send accounting stop\]

登入 -> 發送計費開始 -> 連線期間發送臨時更新 -> 登出時發送計費停止

## Setup｜設定

To setup freeradius in ubuntu, execute the following command:

若要在Ubuntu中設定freeradius，請執行下列指令：

```bash
apt-get install freeradius
```

### Arrange client access｜安排客戶訪問

Edit the file /etc/freeradius/clients.conf and append a block for your network, as sample we will use 10.211.55.0/24.

編輯檔案 /etc/freeradius/clients.conf 並新增一個用於您的網路的區塊，例如我們將使用10.211.55.0/24 。

```
client 10.211.55.0/24 {
    secret      = testing123
    shortname   = test-network
 }
```

### Enable daily session limits｜啟用每日會話限制

Enable daily session limits, which needs accounting to signal the clients use.

啟用每日會話限制，需要進行統計以記錄客戶端的使用情況。

-   In /etc/freeradius/sites-available/default uncomment daily in authorize and accounting sections.  
    在 /etc/freeradius/sites-available/default 檔案中，取消註解 authorize 和 accounting 部分的 daily。
    
-   in /etc/freeradius/radiusd.conf uncomment daily in the instantiate section  
    在 /etc/freeradius/radiusd.conf 檔案中，取消註解 instantiate 部分的 daily 指令。
    
-   append to /etc/freeradius/dictionary  
    加入到 /etc/freeradius/dictionary
    

```
ATTRIBUTE       Daily-Session-Time      3000    integer
ATTRIBUTE       Max-Daily-Session       3001    integer
```

-   uncomment sradutmp in the accounting section, to be able to use the radwho command.  
    取消註釋會計部分中的 sradutmp，以便能夠使用 radwho 指令。
    

## Add test users｜新增測試用戶

You can add your test users to /etc/freeradius/users, they should look like this:

您可以將測試使用者新增至 /etc/freeradius/users 檔案中，它們應該看起來像這樣：

```
"test" Cleartext-Password := "test", Max-Daily-Session := 1800
        Framed-IP-Address = 10.211.55.100,
        Reply-Message = "Hello, %{User-Name}"
```

Make sure the second and third lines are indented by a single tab character.

確保第二行和第三行縮排一個製表符。

This should result in a user with a maxim use per day of 1800 seconds.

這樣一來，使用者每天的最大使用時間應該是 1800 秒。

## Test radius｜測試半徑

For the initial test, it might be practical to debug the traffic going in and out from Freeradius. The next steps help you start Freeradius in debug mode, without output to console:

對於初始測試，調試 Freeradius 的進出流量可能比較實用。以下步驟將協助您以偵錯模式啟動 Freeradius，而不會向控制台輸出任何內容：

```
/etc/init.d/freeradius stop
freeradius -X
```

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：FreeRADIUS](<180 FreeRADIUS.md>)　｜　[下一篇：How To Setting Up A Mail Gateway｜如何設定郵件網關 ➡](<182 如何設定郵件網關.md>)
