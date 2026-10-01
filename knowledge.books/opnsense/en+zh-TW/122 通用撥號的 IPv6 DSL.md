---
title: "IPv6 for generic DSL dialup｜通用撥號的 IPv6 DSL"
title_original: "IPv6 for generic DSL dialup"
source: "https://docs.opnsense.org/manual/how-tos/ipv6_dsl.html"
chapter: ["Interfaces","Setup Guides","IPv6 Guides"]
order: 122
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:43.796Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：IPv6 For Zen UK｜Zen 的 IPv6 UK](<121 Zen 的 IPv6 UK.md>)　｜　[下一篇：IPv6 behind an AVM Fritz!Box｜AVM Fritz!Box 後面的 IPv6 ➡](<123 AVM Fritz!Box 後面的 IPv6.md>)

# IPv6 for generic DSL dialup｜通用撥號的 IPv6 DSL

> 章節：[Interfaces](<000 目錄.md#c-19>) › [Setup Guides](<000 目錄.md#c-21>) › [IPv6 Guides](<000 目錄.md#c-24>)

## Introduction｜介紹

This short article shows how to setup IPv6 on a standard DSL connection and how to handover the delegated prefix from your provider in your local LAN.

這篇簡短的文章介紹如何在標準 DSL 連接上設定 IPv6，以及如何在本地 LAN 中移交來自提供者的委託前綴。

It’s compatible and tested for but not limited to:

它相容並測試了以下應用，但不限於：

-   Deutsche Telekom  
    德國電信
    

## Step 1 - General Settings｜步驟 1 - 常規設定

Go to System ‣ Settings ‣ General and check that **Prefer IPv4 over IPv6** is not ticked. This value is default so just check if it has been touched.

進入 System ‣ Settings ‣ General 並檢查 **Prefer IPv4 over IPv6** 是否未勾選。該值是預設值，因此只需檢查它是否已被觸摸。

Also enable **Allow DNS server list to be overridden by DHCP/PPP on WAN** at the bottom, so you get the correct DNS servers if you just use IPv4 ones.

另外，在底部啟用**允許WAN上的DHCP/PPP覆蓋DNS伺服器清單**，這樣，如果您只使用IPv4伺服器，就可以獲得正確的DNS伺服器。

## Step 2 - Allow IPv6｜步驟 2 - 允許 IPv6

Next go to Interfaces ‣ Settings and verify that **Allow IPv6** is enabled.

接下來前往 Interfaces ‣ Settings 並驗證 **Allow IPv6** 已啟用。

## Step 3 - Interface Configuration｜步驟 3 - 介面配置

In Interfaces ‣ \[WAN\] and set **IPv6 Configuration Type** to DHCPv6 and in section **DHCPv6 client configuration** at the bottom tick:

在「介面」‣ \[ WAN \] 中，將 **IPv6 設定類型**設定為 DHCPv6，並在**DHCPv6 用戶端設定** 部分底部勾選：

-   Request only an IPv6 prefix  
    僅請求 IPv6 前綴
    
-   Send IPv6 prefix hint  
    發送 IPv6 前綴提示
    

Set the prefix size to the one your provider delegates, mostly /56 or 64, sometimes /48.

將前綴大小設定為您的提供者指定的大小，通常是 /56 或 64，有時是 /48。

Then change to Interfaces ‣ \[LAN\] and set **IPv6 Configuration Type** to **Track Interface**. At the bottom in section **Track IPv6 Interface** choose **IPv6 Interface** as WAN and for **IPv6 Prefix ID** a value of 0 is perfectly fine.

然後切換到「介面」‣ \[ LAN \]，並將**IPv6 設定類型**設定為**追蹤介面**。在底部的**追蹤 IPv6 介面**部分，選擇**IPv6 介面**為WAN ，而**IPv6 前綴ID**的值設為 0 完全沒問題。

Hit Apply and disable/enable the NICs of your internal systems. Depending on the system and vendor, also a reboot could be required.

點選「應用」按鈕，然後停用/啟用內部系統的網路卡。根據系統和供應商的不同，可能還需要重新啟動系統。

If you experience problems with the 24h disconnect disrupting connectivity, it may help to set **Prevent Release** in section Interfaces ‣ Settings.

如果您遇到 24 小時斷開連線中斷連線的問題，在介面 ‣ 設定部分中設定 **防止釋放** 可能會有所幫助。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：IPv6 For Zen UK｜Zen 的 IPv6 UK](<121 Zen 的 IPv6 UK.md>)　｜　[下一篇：IPv6 behind an AVM Fritz!Box｜AVM Fritz!Box 後面的 IPv6 ➡](<123 AVM Fritz!Box 後面的 IPv6.md>)
