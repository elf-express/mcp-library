---
title: "Zen 的 IPv6 UK"
title_original: "IPv6 For Zen UK"
source: "https://docs.opnsense.org/manual/how-tos/IPv6_ZenUK.html"
chapter: ["Interfaces","Setup Guides","IPv6 Guides"]
order: 121
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:41.999Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：配置蜂巢式調變解調器](<120 配置蜂巢式調變解調器.md>)　｜　[下一篇：通用撥號的 IPv6 DSL ➡](<122 通用撥號的 IPv6 DSL.md>)

# Zen 的 IPv6 UK

> 章節：[Interfaces](<000 目錄.md#c-19>) › [Setup Guides](<000 目錄.md#c-21>) › [IPv6 Guides](<000 目錄.md#c-24>)

**原作者：**馬丁沃斯利

## **介紹**

Zen 提供了兩種設定 IPv6 的方法。

第一種方法是簡單的DHCP方法，應該足以滿足大多數用戶的需求；第二種方法允許您在LAN上設定靜態IPv6。無論採用哪一種方法，位址和前綴都是固定的，即使在DHCP下也不會改變。目前，Zen會提供一個/64的WAN位址和一個/48的前綴分配。當您申請IPv6時，Zen會將這些資訊分配給您。

## **使用 DHCPv6 設定 IPv6**

## **WAN接口**

Zen 在初始 V4 連線中使用 PPPoE，因此請將 PPPoE 輸入為 V4 連線類型，並設定 PPPoE 連線的使用者名稱和密碼；使用DHCP IPv6，請在 IPv6 連線中選擇 DHCPv6，如下所示。

[![../../_images/ZenUK_image1.png](<../images/38f60718-ZenUK_image1.png>)](https://docs.opnsense.org/_images/ZenUK_image1.png)

下一步是設定 DHCPv6 所需的參數，這些參數位於下面所示的WAN介面的 DHCPv6 用戶端設定部分。

[![../../_images/ZenUK_image2.png](<../images/09a3c5f1-ZenUK_image2.png>)](https://docs.opnsense.org/_images/ZenUK_image2.png)

如前所述，Zen 提供 /48 前綴，因此請相應地選擇前綴大小。

點擊“儲存”，然後點擊“應用”。

## **LAN接口**

現在只需將LAN介面設定為使用已指派的 IPv6 前綴即可。

選擇介面 ‣ \[ LAN \] 並將 IPv6 設定類型設定為“追蹤介面”

[![../../_images/ZenUK_image3.png](<../images/0cbc37be-ZenUK_image3.png>)](https://docs.opnsense.org/_images/ZenUK_image3.png)

最後，將追蹤 IPv6 介面設定為WAN ，除非有本文檔未涵蓋的特殊要求，將 IPv6 前綴ID設定為 0。

[![../../_images/ZenUK_image4.png](<../images/c07b0597-ZenUK_image4.png>)](https://docs.opnsense.org/_images/ZenUK_image4.png)

點擊“儲存”，然後點擊“應用”。

此時建議重啟系統。

## **使用靜態位址分配設定 IPv6**

雖然稍微複雜一些，但此選項可讓您更好地控制LAN DHCP6伺服器，因為它可以根據特定需求進行自訂。

**注意：**本指南的先前版本提供了靜態配置WAN介面的說明。 Zen公司已通知客戶，他們正在逐步淘汰靜態配置，因此建議客戶將WAN介面切換到DHCPv6。

## **WAN接口**

Zen 在初始 V4 連線中使用 PPPoE，因此請將 PPPoE 輸入為 V4 連線類型，並設定 PPPoE 連線的使用者名稱和密碼；使用DHCP IPv6，請在 IPv6 連線中選擇 DHCPv6，如下所示。

[![../../_images/ZenUK_image1.png](<../images/38f60718-ZenUK_image1.png>)](https://docs.opnsense.org/_images/ZenUK_image1.png)

下一步是設定 DHCPv6 所需的參數，這些參數位於下面所示的WAN介面的 DHCPv6 用戶端設定部分。

[![../../_images/ZenUK_image2.png](<../images/09a3c5f1-ZenUK_image2.png>)](https://docs.opnsense.org/_images/ZenUK_image2.png)

如前所述，Zen 提供 /48 前綴，因此請相應地選擇前綴大小。

點擊“儲存”，然後點擊“應用”。

## **LAN接口**

LAN介面設定非常簡單，我們只需要將 IPv6 設定類型設定為靜態，然後輸入我們的靜態位址。

[![../../_images/ZenUK_image5.png](<../images/c79a5804-ZenUK_image5.png>)](https://docs.opnsense.org/_images/ZenUK_image5.png)

Zen 為我們提供了一個 /48 前綴，用於LAN ，因此請從該範圍內選擇一個位址。例如，我們的前綴是：

2a02:8242:55AB::

所以

2a02:8242:55AB:0:4:3:2:1就夠了。

[![../../_images/ZenUK_image6.png](<../images/7e6fcc9d-ZenUK_image6.png>)](https://docs.opnsense.org/_images/ZenUK_image6.png)

我們希望在此介面上使用 /64 前綴。

**提示使用與將系統設定為使用 DHCPv6 時找到的相同位址。**

點擊儲存並應用。

## **DHCPv6 伺服器**

在WAN上使用 DHCPv6 時，我們的 DHCPv6 LAN伺服器會自動設定；但是，在使用靜態 IP 位址時，我們需要手動設定。請前往「服務」‣「DHCPv6」[ LAN ]。

首先，啟用伺服器。

[![../../_images/ZenUK_image7.png](<../images/35293baa-ZenUK_image7.png>)](https://docs.opnsense.org/_images/ZenUK_image7.png)

你會注意到子網路已經有一個範圍，子網路遮罩就是我們在LAN中設定的/64。此外，我們還需要使用一個範圍，可用範圍會告訴我們這個範圍是多少。

輸入伺服器將使用的較低起始範圍

2a02:8231:d256::eeee:0000:0000:0001

請輸入伺服器將使用的上限範圍。

2a02:8231:d256::eeee:ffff:ffff:ffff

[![../../_images/ZenUK_image8.png](<../images/58ba1133-ZenUK_image8.png>)](https://docs.opnsense.org/_images/ZenUK_image8.png)

這應該涵蓋大多數LAN子網，這裡給出的範圍是281、 474.976.710 、655個位址。

我們也可以設定前綴委派範圍，這適用於需要獨立範圍的子路由器或VLAN設備。對於前綴，我們只關心高 64 位，因為在本例中我們只分配 64 位元前綴。我們知道 Zen 已經分配了一個 /48 前綴，所以我們像這樣輸入前綴範圍：

[![../../_images/ZenUK_image9.png](<../images/42dff940-ZenUK_image9.png>)](https://docs.opnsense.org/_images/ZenUK_image9.png)

我們的前綴範圍是高 48 位，加上接下來 16 位的一部分，但不能超出我們用於LAN位址的範圍。在上面的範例中，我最多允許 254 個 /64 子網路。

輸入這些資訊後，點擊儲存。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：配置蜂巢式調變解調器](<120 配置蜂巢式調變解調器.md>)　｜　[下一篇：通用撥號的 IPv6 DSL ➡](<122 通用撥號的 IPv6 DSL.md>)
