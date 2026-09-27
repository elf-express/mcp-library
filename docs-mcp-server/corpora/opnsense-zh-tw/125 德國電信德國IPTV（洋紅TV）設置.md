---
title: "德國電信德國IPTV（洋紅TV）設置"
title_original: "Deutsche Telekom Germany IPTV (Magenta TV) setup"
source: "https://docs.opnsense.org/manual/how-tos/dt_ger_iptv.html"
chapter: ["Interfaces","Setup Guides","ISP Configuration"]
order: 125
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:32:44.068Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：IPv6 隧道代理](<124 IPv6 隧道代理.md>)　｜　[下一篇：法國橘色FTTH IPv4 和 IPv6 ➡](<126 法國橘色FTTH IPv4 和 IPv6.md>)

# 德國電信德國IPTV（洋紅TV）設置

> 章節：[Interfaces](<000 目錄.md#c-19>) › [Setup Guides](<000 目錄.md#c-21>) › [ISP Configuration](<000 目錄.md#c-25>)

**原作者：** Jascha Kirchhoff

## **介紹**

本指南適用於設定德國電信 IPTV（洋紅色 TV），並假設您已經有可用的互聯網連接並安裝了 os-igmp-proxy 插件。

這只是一個基本的工作設定。如果需要，您可以將所有 IPTV 流量分離到 VLAN 中。

OPNsense 與媒體接收器或TV Box 之間的所有網路硬體必須支援IGMP 監聽。如果不啟用IGMP窺探，網路就會被多播流量淹沒，直播電視就會開始卡頓。

## **IGMP 代理設定**

確保您正在運行 OPNsense 22.1 或更高版本

然後配置IGMPproxy如下

[![../../_images/dt_ger_iptv_01.png](<../images/29505167-dt_ger_iptv_01.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_01.png) [![../../_images/dt_ger_iptv_02.png](<../images/846c99fa-dt_ger_iptv_02.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_02.png)

NOTE：下游介面為LAN

[![../../_images/dt_ger_iptv_03.png](<../images/fff3fcad-dt_ger_iptv_03.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_03.png)

## **FIREWALL設定**

我們需要為 WAN 介面新增兩個新規則，並修改 LAN 上的一條（預設 IPv4 規則）以使 Magenta TV 正常運作。關鍵是在進階選項中為所有三個 (!) 規則WAN 和 LAN 啟用「允許選項」。

[![../../_images/dt_ger_iptv_04.png](<../images/a12d8228-dt_ger_iptv_04.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_04.png)

NOTE 來源是“\*”

[![../../_images/dt_ger_iptv_05.png](<../images/b7574bfb-dt_ger_iptv_05.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_05.png) [![../../_images/dt_ger_iptv_06.png](<../images/74f3b2ce-dt_ger_iptv_06.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_06.png) [![../../_images/dt_ger_iptv_05.png](<../images/b7574bfb-dt_ger_iptv_05.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_05.png)

最後來源NAT

[![../../_images/dt_ger_iptv_07.png](<../images/72d1aa01-dt_ger_iptv_07.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_07.png)

我切換到混合模式，但它也應該在自動模式下工作，因為不需要修改任何 Source NAT 規則。

確保您已單擊“儲存並套用”

此時建議重啟系統。

將媒體接收器插入 LAN 端口，打開接收器，幾分鐘後您應該可以看到直播 TV。軟體更新也應該開箱即用。更新模式已於 2022-05 進行測試，無需額外設定。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：IPv6 隧道代理](<124 IPv6 隧道代理.md>)　｜　[下一篇：法國橘色FTTH IPv4 和 IPv6 ➡](<126 法國橘色FTTH IPv4 和 IPv6.md>)
