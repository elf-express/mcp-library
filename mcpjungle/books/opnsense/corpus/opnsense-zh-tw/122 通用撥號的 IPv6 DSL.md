---
title: "通用撥號的 IPv6 DSL"
title_original: "IPv6 for generic DSL dialup"
source: https://docs.opnsense.org/manual/how-tos/ipv6_dsl.html
chapter: ["Interfaces","Setup Guides","IPv6 Guides"]
order: 122
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:43.796Z"
---

# 通用撥號的 IPv6 DSL

## 介紹

這篇簡短的文章介紹如何在標準 DSL 連接上設定 IPv6，以及如何在本地 LAN 中移交來自提供者的委託前綴。

它相容並測試了以下應用，但不限於：

-   德國電信
    

## 步驟 1 - 常規設定

進入 System ‣ Settings ‣ General 並檢查 **Prefer IPv4 over IPv6** 是否未勾選。該值是預設值，因此只需檢查它是否已被觸摸。

另外，在底部啟用**允許WAN上的DHCP/PPP覆蓋DNS伺服器清單**，這樣，如果您只使用IPv4伺服器，就可以獲得正確的DNS伺服器。

## 步驟 2 - 允許 IPv6

接下來前往 Interfaces ‣ Settings 並驗證 **Allow IPv6** 已啟用。

## 步驟 3 - 介面配置

在「介面」‣ \[ WAN \] 中，將 **IPv6 設定類型**設定為 DHCPv6，並在**DHCPv6 用戶端設定** 部分底部勾選：

-   僅請求 IPv6 前綴
    
-   發送 IPv6 前綴提示
    

將前綴大小設定為您的提供者指定的大小，通常是 /56 或 64，有時是 /48。

然後切換到「介面」‣ \[ LAN \]，並將**IPv6 設定類型**設定為**追蹤介面**。在底部的**追蹤 IPv6 介面**部分，選擇**IPv6 介面**為WAN ，而**IPv6 前綴ID**的值設為 0 完全沒問題。

點選「應用」按鈕，然後停用/啟用內部系統的網路卡。根據系統和供應商的不同，可能還需要重新啟動系統。

如果您遇到 24 小時斷開連線中斷連線的問題，在介面 ‣ 設定部分中設定 **防止釋放** 可能會有所幫助。