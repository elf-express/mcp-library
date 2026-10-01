---
title: "BIND Plugin｜BIND插件"
title_original: "BIND Plugin"
source: "https://docs.opnsense.org/manual/how-tos/bind.html"
chapter: ["Community Plugins","DNS"]
order: 214
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:29.241Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Dynamic DNS｜動態DNS](<213 動態DNS.md>)　｜　[下一篇：DNSCrypt-Proxy｜DNSCrypt代理 ➡](<215 DNSCrypt代理.md>)

# BIND Plugin｜BIND插件

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [DNS](<000 目錄.md#c-46>)

## History｜歷史

The history of the Bind plugin was a user request on OPNsense subreddit to create a plugin with a full-featured DNS server, also able to manage zonefiles with the most popular resource records. In the beginning the plugin was built with only general features so the community can contribute and adding wished features with a friendly review of the OPNsense team.

Bind 插件的誕生源自於 OPNsense 子版塊上的一個使用者請求，希望創建一個功能齊全的DNS伺服器插件，並且能夠管理包含最常用資源記錄的區域文件。最初，該外掛程式僅包含一些基本功能，以便社群成員可以貢獻程式碼，並在 OPNsense 團隊友好審查的基礎上添加用戶期望的功能。

At the time of writing the plugin is able to be used as a local resolver and as a nice replacement for pfBlockerNG or PiHole, since it is offering a DNSBL feature via BIND Reverse Policy Zones.

截至撰寫本文時，該插件可以用作本地解析器，並且可以很好地替代 pfBlockerNG 或 PiHole，因為它透過BIND反向策略區域提供了DNSBL功能。

## Installation｜安裝

First of all, go to System ‣ Firmware ‣ Plugins and install **os-bind**. You will find the plugin at Services ‣ BIND.

首先，進入系統‣韌體‣插件，安裝**os-bind**。您可以在服務BIND中找到該插件。

## General Settings｜常規設定

Enable BIND Daemon

啟用BIND守護進程

Enable the BIND service.

啟用BIND服務。

Listen IPs

監聽IP位址

Set the IP addresses the daemon should listen on.

設定守護程式應該監聽的IP位址。

Listen IPv6

監聽 IPv6

Set the IPv6 addresses the daemon should listen on.

設定守護程式應監聽的 IPv6 位址。

Listen Port

監聽埠

Set the port the daemon should listen on. Per default the port is 53530 to not interfere with existing Unbound/Dnsmasq setups. If you want to switch to BIND only, make sure to stop Unbound/Dnsmasq and switch to port 53 with both 0.0.0.0 and :: as listening addresses set up.

設定守護程式監聽的連接埠。預設連接埠為 53530，以避免干擾現有的 Unbound/Dnsmasq 配置。如果您只想切換到BIND ，請確保停止 Unbound/Dnsmasq 服務，並將連接埠切換到 53，同時設定0.0.0.0和 :: 作為監聽位址。

DNS Forwarders

DNS貨運代理

A list of IP addresses BIND will forward unknown DNS request to. If empty BIND tries to resolve directly via the root servers.

IP位址清單BIND將轉送未知的DNS請求。如果為空， BIND則嘗試直接透過根伺服器解析。

Logsize in MB

MB中的Logsize

The amount for each logfile it can grow.

每個日誌檔案可以增加的數量。

Maximum Cache Size

最大快取大小

This is the amount of RAM (in percent) the daemon can use for caching.

這是守護程式可用於快取的RAM （百分比）的數量。

Recursion

遞迴

You have to set a list of networks via **ACL** tab to allow them using recursion against BIND.

您必須透過 **ACL** 選項卡設定網路列表，以允許它們對BIND使用遞歸。

DNSSec Validation

DNSSec驗證

Whether to enable or disable DNSSec validation.

是否啟用或停用DNSSec驗證。

## DNSBL

Enable DNSBL

啟用DNSBL

Enable the DNSBL service. BIND will be configured for Reverse Policy Zones to blacklist domains. Choose below the lists to use for blacklist categories.

啟用DNSBL服務。 BIND 將配置為反向策略區域以將網域列入黑名單。在清單下方選擇用於黑名單類別。

Type of DNSBL

DNSBL型

Here you can select the lists to use. Do not just select all and save. There are websites not loading content when nested ads are not loaded.

您可以在這裡選擇要使用的清單。請勿全部選擇並儲存。有些網站在巢狀廣告未載入時無法載入內容。

Whitelist Domains

將網域加入白名單

When a website is blocked due to a false positive you can enter the domain name here so it is whitelisted before the blacklists come into play.

如果某個網站因誤報而被封鎖，您可以在此輸入域名，以便在黑名單生效之前將其添加到白名單中。

The Blacklists are downloaded and updated with every **Save** within BIND configuration. For production use you can go to System ‣ Settings ‣ Cron and add a cronjob. On the dropdown list you’ll find the correct task under **Command**. Set the refresh interval as you wish and save. This will trigger an update of the selected lists and reload BIND.

黑名單會在 BIND 配置中每次**儲存**時下載並更新。對於生產用途，您可以前往 System ‣ Settings ‣ Cron 並新增一個 cronjob。在下拉清單中，您將在**命令** 下找到正確的任務。根據需要設定刷新間隔並儲存。這將觸發所選清單的更新並重新載入BIND。

## ACLs｜前十字韌帶

On tab ACLs you can create ACLs used for configuration options like **Recursion**. Add a new ACL via **+**, give it a **Name** and add as many networks as you wish in **Network List**.

在 ACL 標籤中，您可以建立用於設定選項（例如**遞歸**）的 ACL。透過**+**新增的ACL ，為其指定**名稱**，並在**網路清單**中新增所需的任意數量的網路。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Dynamic DNS｜動態DNS](<213 動態DNS.md>)　｜　[下一篇：DNSCrypt-Proxy｜DNSCrypt代理 ➡](<215 DNSCrypt代理.md>)
