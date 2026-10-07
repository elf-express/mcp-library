---
title: "BIND插件"
title_original: "BIND Plugin"
source: https://docs.opnsense.org/manual/how-tos/bind.html
chapter: ["Community Plugins","DNS"]
order: 214
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:29.241Z"
---


# BIND插件


## 歷史

Bind 插件的誕生源自於 OPNsense 子版塊上的一個使用者請求，希望創建一個功能齊全的DNS伺服器插件，並且能夠管理包含最常用資源記錄的區域文件。最初，該外掛程式僅包含一些基本功能，以便社群成員可以貢獻程式碼，並在 OPNsense 團隊友好審查的基礎上添加用戶期望的功能。

截至撰寫本文時，該插件可以用作本地解析器，並且可以很好地替代 pfBlockerNG 或 PiHole，因為它透過BIND反向策略區域提供了DNSBL功能。

## 安裝

首先，進入系統‣韌體‣插件，安裝**os-bind**。您可以在服務BIND中找到該插件。

## 常規設定

啟用BIND守護進程

啟用BIND服務。

監聽IP位址

設定守護程式應該監聽的IP位址。

監聽 IPv6

設定守護程式應監聽的 IPv6 位址。

監聽埠

設定守護程式監聽的連接埠。預設連接埠為 53530，以避免干擾現有的 Unbound/Dnsmasq 配置。如果您只想切換到BIND ，請確保停止 Unbound/Dnsmasq 服務，並將連接埠切換到 53，同時設定0.0.0.0和 :: 作為監聽位址。

DNS貨運代理

IP位址清單BIND將轉送未知的DNS請求。如果為空， BIND則嘗試直接透過根伺服器解析。

MB中的Logsize

每個日誌檔案可以增加的數量。

最大快取大小

這是守護程式可用於快取的RAM （百分比）的數量。

遞迴

您必須透過 **ACL** 選項卡設定網路列表，以允許它們對BIND使用遞歸。

DNSSec驗證

是否啟用或停用DNSSec驗證。

## DNSBL

啟用DNSBL

啟用DNSBL服務。 BIND 將配置為反向策略區域以將網域列入黑名單。在清單下方選擇用於黑名單類別。

DNSBL型

您可以在這裡選擇要使用的清單。請不要全部選擇並儲存。有些網站在巢狀廣告未載入時無法載入內容。

將網域加入白名單

如果某個網站因誤報而被封鎖，您可以在此輸入域名，以便在黑名單生效之前將其添加到白名單中。

黑名單會在 BIND 配置中每次**儲存**時下載並更新。對於生產用途，您可以前往 System ‣ Settings ‣ Cron 並新增一個 cronjob。在下拉清單中，您將在**命令** 下找到正確的任務。根據需要設定刷新間隔並儲存。這將觸發所選清單的更新並重新載入BIND。

## 前十字韌帶

在 ACL 標籤中，您可以建立用於設定選項（例如**遞歸**）的 ACL。透過**+**新增的ACL ，為其指定**名稱**，並在**網路清單**中新增所需的任意數量的網路。

---

