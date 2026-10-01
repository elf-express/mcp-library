---
title: "Orange France IPTV setup｜Orange France IPTV設置"
title_original: "Orange France IPTV setup"
source: "https://docs.opnsense.org/manual/how-tos/orange_fr_tvf.html"
chapter: ["Interfaces","Setup Guides","ISP Configuration"]
order: 127
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:44.574Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Orange France FTTH IPv4 & IPv6｜法國橘色FTTH IPv4 和 IPv6](<126 法國橘色FTTH IPv4 和 IPv6.md>)　｜　[下一篇：SFRRED France FTTH IPv4 & IPv6 & Phone｜SFRRED法國FTTH IPv4、IPv6 和電話 ➡](<128 SFRRED法國FTTH IPv4、IPv6 和電話.md>)

# Orange France IPTV setup｜Orange France IPTV設置

> 章節：[Interfaces](<000 目錄.md#c-19>) › [Setup Guides](<000 目錄.md#c-21>) › [ISP Configuration](<000 目錄.md#c-25>)

**Original Author:** Kev Willers

**原作者：**凱文·威勒斯

## **Introduction**｜**介紹**

This guide is for setting up Orange France IPTV and assumes you already have a working internet connection and the os-igmp-proxy plugin installed.

本指南用於設定 Orange France IPTV ，並假設您已經擁有可用的網路連線並安裝了 os-igmp-proxy 外掛程式。

## **Getting ready**｜**準備工作**

Orange uses two VLANs for TV. VLAN 838 and 840 Create and assign them as shown.

Orange 使用兩個 VLAN 分別用於TV. VLAN 838 和 840。請按所示建立和分配它們。

[![../../_images/tv_image01.png](<../images/0cb0f2fd-tv_image01.png>)](https://docs.opnsense.org/_images/tv_image01.png)

Take note of the PCP values

請注意PCP值

Assign the VLANs as shown and also assign TVLAN for use later.

依所示方式分配 VLAN，並分配TVLAN以備後用。

[![../../_images/tv_image02.png](<../images/71a10964-tv_image02.png>)](https://docs.opnsense.org/_images/tv_image02.png)

igb0 is the WAN in this example. Select the interface that corresponds to WAN in your setup.

在本例中，igb0 對應WAN 。請選擇與您的設定中WAN對應的介面。

TVLAN is assigned to a free port on your router which the TVDecoder is plugged into later.

TVLAN被分配給路由器上的一個空閒端口，稍後電視解碼器將插入該端口。

## **VLAN 838 setup**｜**VLAN 838 設定**

[![../../_images/tv_image03.png](<../images/3b157977-tv_image03.png>)](https://docs.opnsense.org/_images/tv_image03.png) [![../../_images/tv_image04.png](<../images/84ddd59e-tv_image04.png>)](https://docs.opnsense.org/_images/tv_image04.png)

SEND OPTIONS

dhcp-client-identifier 1:xx:xx:xx:xx:xx:xx, REPLACE xx with MAC Address of the Livebox (NOT the TVDecoder) the leading 1 is important

dhcp-client-identifier 1:xx:xx:xx:xx:xx:xx, REPLACE xx， MAC Livebox 位址（ NOT電視解碼器），前導 1 很重要

dhcp-class-identifier “sagem”,

dhcp-class-identifier “sagem”，

user-class “‘FSVDSL\_livebox.MLTV.softathome.Livebox3”. NOTE the leading ‘ before the string. Also although not strictky necessary Livebox3 part of the string is for LiveBox3 users if you are Livebox4 user change as required.

使用者類別「' FSVDSL \_livebox. MLTV .softathome.Livebox3」. NOTE字串開頭的單引號。此外，雖然並非絕對必要，但字串中的 Livebox3 部分僅適用於 LiveBox3 用戶；如果您是 LiveBox4 用戶，請根據需要進行更改。

REQUEST OPTIONS

subnet-mask,routers, ntp-servers, www-server, classless-routes

子網路遮罩、路由器、NTP 伺服器、www 伺服器、無類別路由

## **VLAN 840 setup**｜**VLAN 840 設定**

[![../../_images/tv_image05.png](<../images/9d8aeed1-tv_image05.png>)](https://docs.opnsense.org/_images/tv_image05.png) [![../../_images/tv_image06.png](<../images/c9b19678-tv_image06.png>)](https://docs.opnsense.org/_images/tv_image06.png)

The dummy IP address is important or IGMPproxy does not start

虛擬IP位址很重要，否則 IGMPproxy 將無法啟動。

## **TVLAN setup**｜**TVLAN設定**

(not needed to make things work, but much neater config and prevents IGMPproxy warning messages on LAN)

（並非必需，但配置更簡潔，並且可以防止在LAN上出現IGMPproxy警告訊息）

[![../../_images/tv_image07.png](<../images/c6e7438b-tv_image07.png>)](https://docs.opnsense.org/_images/tv_image07.png) [![../../_images/tv_image08.png](<../images/b6d90d72-tv_image08.png>)](https://docs.opnsense.org/_images/tv_image08.png)

Use a different subnet to current LAN

使用與目前LAN不同的子網

Turn on the DHCP service for TVLAN

為TVLAN啟用DHCP服務

NOTE YOU MUST specify the ORANGE DNS servers for the TV to work

NOTE YOU MUST指定ORANGE DNS伺服器，以便TV正常運作

[![../../_images/tv_image09.png](<../images/cd0d50a5-tv_image09.png>)](https://docs.opnsense.org/_images/tv_image09.png)

Now reboot and you should have an IP address on VLAN 838 of 10.x.x.x

現在重啟，你應該可以在 10.xxx 的IP地址VLAN 838 上看到一個地址。

## **IGMPproxy setup**｜**IGMP代理設定**

Ensure you are running OPNsense 18.7.4 or later

請確保您正在執行的是 OPNsense 18.7.4或更高版本。

Then configure IGMPproxy as follows

然後如下配置 IGMPproxy

[![../../_images/tv_image10.png](<../images/e1ca23a3-tv_image10.png>)](https://docs.opnsense.org/_images/tv_image10.png) [![../../_images/tv_image11.png](<../images/caf80fb0-tv_image11.png>)](https://docs.opnsense.org/_images/tv_image11.png)

NOTE: downstream interface is TVLAN

NOTE ：下游介面為TVLAN

[![../../_images/tv_image12.png](<../images/1f447fa9-tv_image12.png>)](https://docs.opnsense.org/_images/tv_image12.png)

## **FIREWALL setup**｜**FIREWALL設定**

We need to allow traffic to flow on the VLANs and TVLAN and also to connect with Orange servers

我們需要允許流量在 VLAN 和TVLAN上流動，並且能夠連接到 Orange 伺服器。

[![../../_images/tv_image13.png](<../images/3886f356-tv_image13.png>)](https://docs.opnsense.org/_images/tv_image13.png) [![../../_images/tv_image14.png](<../images/098d4a6f-tv_image14.png>)](https://docs.opnsense.org/_images/tv_image14.png)

NOTE the Source is “\*”

NOTE來源為“\*”

[![../../_images/tv_image15.png](<../images/f365139c-tv_image15.png>)](https://docs.opnsense.org/_images/tv_image15.png)

And finally Source NAT

最後是來源NAT

[![../../_images/tv_image16.png](<../images/c5093b75-tv_image16.png>)](https://docs.opnsense.org/_images/tv_image16.png)

Make sure you have clicked Save & Apply

請確保您已點擊“儲存並套用”。

It is advisable at this point to reboot the system.

此時建議重啟系統。

Plug in your TVDecoder to the port defined for TVLAN, turn on the decoder and after a few minutes you should see TV.

將您的電視解碼器插入為TVLAN定義的端口，打開解碼器，幾分鐘後您應該會看到TV 。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Orange France FTTH IPv4 & IPv6｜法國橘色FTTH IPv4 和 IPv6](<126 法國橘色FTTH IPv4 和 IPv6.md>)　｜　[下一篇：SFRRED France FTTH IPv4 & IPv6 & Phone｜SFRRED法國FTTH IPv4、IPv6 和電話 ➡](<128 SFRRED法國FTTH IPv4、IPv6 和電話.md>)
