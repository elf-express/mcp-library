---
title: "橙色法國IPTV設置"
title_original: "Orange France IPTV setup"
source: "https://docs.opnsense.org/manual/how-tos/orange_fr_tvf.html"
chapter: ["Interfaces","Setup Guides","ISP Configuration"]
order: 127
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:32:44.574Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：法國橘色FTTH IPv4 和 IPv6](<126 法國橘色FTTH IPv4 和 IPv6.md>)　｜　[下一篇：SFRRED 法國 FTTH IPv4 & IPv6 & 電話 ➡](<128 SFRRED 法國 FTTH IPv4 & IPv6 & 電話.md>)

# 橙色法國IPTV設置

> 章節：[Interfaces](<000 目錄.md#c-19>) › [Setup Guides](<000 目錄.md#c-21>) › [ISP Configuration](<000 目錄.md#c-25>)

**原作者：** 凱夫威勒斯

## **介紹**

本指南用於設定 Orange France IPTV，並假設您已經有可用的網路連線並安裝了 os-igmp-proxy 外掛程式。

## **準備工作**

Orange 對 TV. VLAN 838 和 840 使用兩個 VLAN，如圖所示建立並指派它們。

[![../../_images/tv_image01.png](<../images/0cb0f2fd-tv_image01.png>)](https://docs.opnsense.org/_images/tv_image01.png)

記下 PCP 值

如圖所示指派 VLAN，並指派 TVLAN 供稍後使用。

[![../../_images/tv_image02.png](<../images/71a10964-tv_image02.png>)](https://docs.opnsense.org/_images/tv_image02.png)

igb0 是本例中的WAN。在您的設定中選擇與WAN相對應的介面。

TVLAN 被指派給路由器上的一個空閒端口，稍後將 TVDecoder 插入該端口。

## **VLAN838設定**

[![../../_images/tv_image03.png](<../images/3b157977-tv_image03.png>)](https://docs.opnsense.org/_images/tv_image03.png) [![../../_images/tv_image04.png](<../images/84ddd59e-tv_image04.png>)](https://docs.opnsense.org/_images/tv_image04.png)

SEND OPTIONS

dhcp-client-identifier 1:xx:xx:xx:xx:xx:xx, REPLACE xx 和 MAC Livebox 的地址（NOT TVDecoder）前導 1 很重要

dhcp-class-identifier“薩基姆”，

使用者等級「‘FSVDSL\_livebox.MLTV.softathome.Livebox3」。 NOTE 字串之前的前導‘。另外，雖然不是嚴格必要的，但 Livebox3 部分字串適用於 LiveBox3 用戶，如果您是 Livebox4 用戶，請根據需要進行更改。

REQUEST OPTIONS

子網路遮罩、路由器、ntp 伺服器、www 伺服器、無類別路由

## **VLAN840設定**

[![../../_images/tv_image05.png](<../images/9d8aeed1-tv_image05.png>)](https://docs.opnsense.org/_images/tv_image05.png) [![../../_images/tv_image06.png](<../images/c9b19678-tv_image06.png>)](https://docs.opnsense.org/_images/tv_image06.png)

虛擬 IP 位址很重要，否則 IGMPproxy 無法啟動

## **TVLAN設定**

（不需要使事情正常工作，但更簡潔的配置並防止 LAN 上的 IGMPproxy 警告訊息）

[![../../_images/tv_image07.png](<../images/c6e7438b-tv_image07.png>)](https://docs.opnsense.org/_images/tv_image07.png) [![../../_images/tv_image08.png](<../images/b6d90d72-tv_image08.png>)](https://docs.opnsense.org/_images/tv_image08.png)

使用與目前 LAN 不同的子網

開啟TVLAN的DHCP服務

NOTE YOU MUST 指定ORANGE DNS TV 工作的伺服器

[![../../_images/tv_image09.png](<../images/cd0d50a5-tv_image09.png>)](https://docs.opnsense.org/_images/tv_image09.png)

現在重新啟動，您應該在 10.x.x.x 的 VLAN 838 上有一個 IP 位址

## **IGMP 代理設定**

確保您正在運行 OPNsense 18.7.4 或更高版本

然後配置IGMPproxy如下

[![../../_images/tv_image10.png](<../images/e1ca23a3-tv_image10.png>)](https://docs.opnsense.org/_images/tv_image10.png) [![../../_images/tv_image11.png](<../images/caf80fb0-tv_image11.png>)](https://docs.opnsense.org/_images/tv_image11.png)

NOTE：下游介面為TVLAN

[![../../_images/tv_image12.png](<../images/1f447fa9-tv_image12.png>)](https://docs.opnsense.org/_images/tv_image12.png)

## **FIREWALL設定**

我們需要允許流量在 VLAN 和TVLAN 上流動，並與 Orange 伺服器連接

[![../../_images/tv_image13.png](<../images/3886f356-tv_image13.png>)](https://docs.opnsense.org/_images/tv_image13.png) [![../../_images/tv_image14.png](<../images/098d4a6f-tv_image14.png>)](https://docs.opnsense.org/_images/tv_image14.png)

NOTE 來源是“\*”

[![../../_images/tv_image15.png](<../images/f365139c-tv_image15.png>)](https://docs.opnsense.org/_images/tv_image15.png)

最後來源NAT

[![../../_images/tv_image16.png](<../images/c5093b75-tv_image16.png>)](https://docs.opnsense.org/_images/tv_image16.png)

確保您已單擊“儲存並套用”

此時建議重啟系統。

將 TVDecoder 插入為 TVLAN 定義的端口，打開解碼器，幾分鐘後您應該會看到 TV。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：法國橘色FTTH IPv4 和 IPv6](<126 法國橘色FTTH IPv4 和 IPv6.md>)　｜　[下一篇：SFRRED 法國 FTTH IPv4 & IPv6 & 電話 ➡](<128 SFRRED 法國 FTTH IPv4 & IPv6 & 電話.md>)
