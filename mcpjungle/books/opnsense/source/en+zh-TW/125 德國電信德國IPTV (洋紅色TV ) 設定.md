---
title: "Deutsche Telekom Germany IPTV (Magenta TV) setup｜德國電信德國IPTV (洋紅色TV ) 設定"
title_original: "Deutsche Telekom Germany IPTV (Magenta TV) setup"
source: "https://docs.opnsense.org/manual/how-tos/dt_ger_iptv.html"
chapter: ["Interfaces","Setup Guides","ISP Configuration"]
order: 125
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:32:44.068Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：IPv6 Tunnel Broker｜IPv6隧道代理](<124 IPv6隧道代理.md>)　｜　[下一篇：Orange France FTTH IPv4 & IPv6｜法國橘色FTTH IPv4 和 IPv6 ➡](<126 法國橘色FTTH IPv4 和 IPv6.md>)

# Deutsche Telekom Germany IPTV (Magenta TV) setup｜德國電信德國IPTV (洋紅色TV ) 設定

> 章節：[Interfaces](<000 目錄.md#c-19>) › [Setup Guides](<000 目錄.md#c-21>) › [ISP Configuration](<000 目錄.md#c-25>)

**Original Author:** Jascha Kirchhoff

**原作者：** Jascha Kirchhoff

## **Introduction**｜**介紹**

This guide is for setting up Deutsche Telekom Germany IPTV (Magenta TV) and assumes you already have a working internet connection and the os-igmp-proxy plugin installed.

本指南用於設定德國電信德國IPTV （ TV ），並假設您已經擁有可用的互聯網連接並安裝了os-igmp-proxy插件。

This is just a basic working setup. You can separate all IPTV traffic into a VLAN, if needed.

這只是一個基本的工作設定。如有需要，您可以將所有IPTV流量分離到VLAN中。

All network hardware between OPNsense and the Media Receiver or TV Box must support IGMP snooping. Without IGMP snooping enabled, the network gets flooded with multicast traffic and live tv starts stuttering.

OPNsense 與媒體接收器或TV之間的所有網路硬體都必須支援IGMP功能。如果未啟用IGMP功能，網路將被組播流量淹沒，導致直播電視播放卡頓。

## **IGMPproxy setup**｜**IGMP代理設定**

Ensure you are running OPNsense 22.1 or later

請確保您正在執行的是 OPNsense 22.1或更高版本。

Then configure IGMPproxy as follows

然後如下配置 IGMPproxy

[![../../_images/dt_ger_iptv_01.png](<../images/29505167-dt_ger_iptv_01.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_01.png) [![../../_images/dt_ger_iptv_02.png](<../images/846c99fa-dt_ger_iptv_02.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_02.png)

NOTE: downstream interface is LAN

NOTE ：下游介面為LAN

[![../../_images/dt_ger_iptv_03.png](<../images/fff3fcad-dt_ger_iptv_03.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_03.png)

## **FIREWALL setup**｜**FIREWALL設定**

We need to add two new rules for the WAN interface and modify one (the default IPv4 rule) on the LAN to get Magenta TV working. The key is to enable “allow options” in the Advanced Options for all three (!) rules, WAN and LAN.

我們需要為WAN介面新增兩個新規則，並修改LAN介面上的一條規則（預設的 IPv4 規則），才能讓 Magenta TV正常運作。關鍵在於為所有三個規則（ WAN和LAN ）在進階選項中啟用「允許選項」。

[![../../_images/dt_ger_iptv_04.png](<../images/a12d8228-dt_ger_iptv_04.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_04.png)

NOTE the Source is “\*”

NOTE來源為“\*”

[![../../_images/dt_ger_iptv_05.png](<../images/b7574bfb-dt_ger_iptv_05.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_05.png) [![../../_images/dt_ger_iptv_06.png](<../images/74f3b2ce-dt_ger_iptv_06.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_06.png) [![../../_images/dt_ger_iptv_05.png](<../images/b7574bfb-dt_ger_iptv_05.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_05.png)

And finally Source NAT

最後是來源NAT

[![../../_images/dt_ger_iptv_07.png](<../images/72d1aa01-dt_ger_iptv_07.png>)](https://docs.opnsense.org/_images/dt_ger_iptv_07.png)

I switched to Hybrid mode but it should also work in Automatic mode, because none of the Source NAT rules need to be modified.

我切換到了混合模式，但它在自動模式下也應該可以工作，因為不需要修改任何來源NAT規則。

Make sure you have clicked Save & Apply

請確保您已點擊“儲存並套用”。

It is advisable at this point to reboot the system.

此時建議重啟系統。

Plug in your Media Receiver to one LAN port, turn on the receiver and after a few minutes you should see live TV. Also software updates should work out of the box. Update mode has been tested 2022-05, no additional settings are required.

將您的媒體接收器插入LAN端口，打開接收器，幾分鐘後您應該可以看到TV實時畫面。此外，軟體更新應該可以即插即用。更新模式已於2022年5月測試，無需其他設定。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：IPv6 Tunnel Broker｜IPv6隧道代理](<124 IPv6隧道代理.md>)　｜　[下一篇：Orange France FTTH IPv4 & IPv6｜法國橘色FTTH IPv4 和 IPv6 ➡](<126 法國橘色FTTH IPv4 和 IPv6.md>)
