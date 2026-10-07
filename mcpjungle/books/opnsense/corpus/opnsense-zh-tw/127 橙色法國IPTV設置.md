---
title: "橙色法國IPTV設置"
title_original: "Orange France IPTV setup"
source: https://docs.opnsense.org/manual/how-tos/orange_fr_tvf.html
chapter: ["Interfaces","Setup Guides","ISP Configuration"]
order: 127
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:32:44.574Z"
---

# 橙色法國IPTV設置

**原作者：** 凱夫威勒斯

## **介紹**

本指南用於設定 Orange France IPTV，並假設您已經有可用的網路連線並安裝了 os-igmp-proxy 外掛程式。

## **準備工作**

Orange 對 TV. VLAN 838 和 840 使用兩個 VLAN，如圖所示建立並指派它們。

[圖](https://docs.opnsense.org/_images/tv_image01.png)

記下 PCP 值

如圖所示指派 VLAN，並指派 TVLAN 供稍後使用。

[圖](https://docs.opnsense.org/_images/tv_image02.png)

igb0 是本例中的WAN。在您的設定中選擇與WAN相對應的介面。

TVLAN 被指派給路由器上的一個空閒端口，稍後將 TVDecoder 插入該端口。

## **VLAN838設定**

[圖](https://docs.opnsense.org/_images/tv_image03.png) [圖](https://docs.opnsense.org/_images/tv_image04.png)

SEND OPTIONS

dhcp-client-identifier 1:xx:xx:xx:xx:xx:xx, REPLACE xx 和 MAC Livebox 的地址（NOT TVDecoder）前導 1 很重要

dhcp-class-identifier“薩基姆”，

使用者等級「‘FSVDSL\_livebox.MLTV.softathome.Livebox3」。 NOTE 字串之前的前導‘。另外，雖然不是嚴格必要的，但 Livebox3 部分字串適用於 LiveBox3 用戶，如果您是 Livebox4 用戶，請根據需要進行更改。

REQUEST OPTIONS

子網路遮罩、路由器、ntp 伺服器、www 伺服器、無類別路由

## **VLAN840設定**

[圖](https://docs.opnsense.org/_images/tv_image05.png) [圖](https://docs.opnsense.org/_images/tv_image06.png)

虛擬 IP 位址很重要，否則 IGMPproxy 無法啟動

## **TVLAN設定**

（不需要使事情正常工作，但更簡潔的配置並防止 LAN 上的 IGMPproxy 警告訊息）

[圖](https://docs.opnsense.org/_images/tv_image07.png) [圖](https://docs.opnsense.org/_images/tv_image08.png)

使用與目前 LAN 不同的子網

開啟TVLAN的DHCP服務

NOTE YOU MUST 指定ORANGE DNS TV 工作的伺服器

[圖](https://docs.opnsense.org/_images/tv_image09.png)

現在重新啟動，您應該在 10.x.x.x 的 VLAN 838 上有一個 IP 位址

## **IGMP 代理設定**

確保您正在運行 OPNsense 18.7.4 或更高版本

然後配置IGMPproxy如下

[圖](https://docs.opnsense.org/_images/tv_image10.png) [圖](https://docs.opnsense.org/_images/tv_image11.png)

NOTE：下游介面為TVLAN

[圖](https://docs.opnsense.org/_images/tv_image12.png)

## **FIREWALL設定**

我們需要允許流量在 VLAN 和TVLAN 上流動，並與 Orange 伺服器連接

[圖](https://docs.opnsense.org/_images/tv_image13.png) [圖](https://docs.opnsense.org/_images/tv_image14.png)

NOTE 來源是“\*”

[圖](https://docs.opnsense.org/_images/tv_image15.png)

最後來源NAT

[圖](https://docs.opnsense.org/_images/tv_image16.png)

確保您已單擊“儲存並套用”

此時建議重啟系統。

將 TVDecoder 插入為 TVLAN 定義的端口，打開解碼器，幾分鐘後您應該會看到 TV。