---
title: "c-icap"
source: "https://docs.opnsense.org/manual/how-tos/c-icap.html"
chapter: ["Community Plugins","Web"]
order: 166
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:33:04.414Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Anti Virus Engine｜反病毒引擎](<165 反病毒引擎.md>)　｜　[下一篇：ClamAV ➡](<167 ClamAV.md>)

# c-icap

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Web](<000 目錄.md#c-37>)

## Installation｜安裝

First of all, you have to install the c-icap plugin (os-cicap) from the plugins view.

首先，您需要從外掛視圖安裝 c-icap 外掛程式 (os-cicap)。

![../../_images/menu_plugins.png](<../images/a11a0992-menu_plugins.png>)

After a page reload you will get a new menu entry under services for C-ICAP. Select it and you will get to the following screen:

頁面重新載入後，您將在「服務」下看到一個新的選單項目「C- ICAP 」。選擇它，您將進入以下畫面：

![../../_images/c-icap_settings.png](<../images/23345417-c-icap_settings.png>)

## General Settings｜常規設定

Enable c-icap service

啟用 c-icap 服務

Enable the C-ICAP service to handle ICAP requests.

啟用 C- ICAP服務來處理ICAP請求。

Timeout

暫停

The time after which the socket will be closed.

插座關閉前的超時時間。

Max keepalive timeout

最大保持連線逾時時間

The time after which the socket will be closed if it stays inactive.

如果套接字保持不活動狀態，則在多長時間後將關閉。

Start servers

啟動伺服器

The count of the server processes which will be spawned.

將要產生的伺服器進程數。

Max servers

最大伺服器

Limit the count of processes

限制進程數

Listen address

收聽地址

The address in which the server should be bound. This address is usually the loopback address (::1 for IPv6 or 127.0.0.1 for IPv4). The default value is ::1.

伺服器綁定的位址。此位址通常是環回位址（IPv6 為 ::1，IPv4 為127.0.0.1 ）。預設值為 ::1。

Server admin

伺服器管理員

This field should be set to an email address which acts as a contact for users, who are having issues with the server. A good idea would be an address, which converts the mails to your internal ticket system.

此欄位應設定為一個電子郵件地址，作為遇到伺服器問題的使用者的聯絡資訊。一個好方法是使用一個能夠將郵件轉移到內部工單系統的位址。

Servername

伺服器名稱

If you want to override the server name (displayed on error pages), you can enter it here.

如果您想覆蓋伺服器名稱（顯示在錯誤頁面上），可以在這裡輸入。

## Antivirus｜防毒軟體

![../../_images/c-icap_av.png](<../images/fe274665-c-icap_av.png>)

Enable ClamAV

啟用 ClamAV

Enables the virus -scan plugin of c-icap-modules using ClamAV

啟用 c-icap-modules 的病毒掃描插件，該插件使用 ClamAV

Scan for filetypes

掃描文件類型

The type of files which should be analyzed. You should scan as many file types as possible but keep in mind that scanning requires resources which have to be available.

需要分析的文件類型。您應該盡可能掃描多種文件類型，但請記住，掃描需要資源，這些資源必須可用。

Send percentage data

發送百分比數據

Amount of Data of the original file which should be included in the preview. More Data will have better scanning results and is better for security while a lower value improves performance.

預覽中應包含的原始文件資料量。資料量越大，掃描結果越好，安全性更高；資料量越小，效能越好。

Allow 204 response

允許 204 響應

A 204 response has the advantage, that the data don’t have to be sent over the wire again. In case of a preview, no more data will be sent to the ICAP server and the data will be forwarded to the client. In case of all data has been received by the ICAP server, the data does not need to be sent back. Please note, that the ICAP client has to support 204 responses.

204 回應的優點在於無需再次透過網路發送資料。如果是預覽，則不會再向ICAP伺服器發送數據，而是將數據轉發給客戶端。如果ICAP伺服器已接收到所有數據，則無需將資料傳送回客戶端。請注意， ICAP客戶端必須支援 204 回應。

Pass on error

傳遞錯誤

In case the scan fails, the file can be passed through. This is less secure but keeps the business running in case of failure. Keep in mind that this may put your network at risk.

如果掃描失敗，檔案可以繼續傳輸。雖然這種方式安全性較低，但可以在故障發生時維持業務運作。請注意，這可能會使您的網路面臨風險。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Anti Virus Engine｜反病毒引擎](<165 反病毒引擎.md>)　｜　[下一篇：ClamAV ➡](<167 ClamAV.md>)
