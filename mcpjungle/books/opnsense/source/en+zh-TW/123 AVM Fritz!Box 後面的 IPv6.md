---
title: "IPv6 behind an AVM Fritz!Box｜AVM Fritz!Box 後面的 IPv6"
title_original: "IPv6 behind an AVM Fritz!Box"
source: "https://docs.opnsense.org/manual/how-tos/ipv6_fb.html"
chapter: ["Interfaces","Setup Guides","IPv6 Guides"]
order: 123
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:42.712Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：IPv6 for generic DSL dialup｜通用撥號的 IPv6 DSL](<122 通用撥號的 IPv6 DSL.md>)　｜　[下一篇：IPv6 Tunnel Broker｜IPv6隧道代理 ➡](<124 IPv6隧道代理.md>)

# IPv6 behind an AVM Fritz!Box｜AVM Fritz!Box 後面的 IPv6

> 章節：[Interfaces](<000 目錄.md#c-19>) › [Setup Guides](<000 目錄.md#c-21>) › [IPv6 Guides](<000 目錄.md#c-24>)

**Original Author:** Thomas Klein

**原作者：**托馬斯·克萊因

## Introduction｜介紹

The AVM Fritz!Box, or FB for short, is a popular home router for DSL, Cable and Fiber in Germany. This guide will setup a OPNSense behind a FB, handover delegated prefixes from the provider and configure local interfaces on the OPNSense to cope with dynamically changing IPv6 prefixes.

Fritz!Box（ AVM FB是一款在德國廣受歡迎的家用路由器，適用於有線和光纖DSL 。本指南將指導您如何在 Fritz FB路由器後設定 OPNSense，從運營商接收委託前綴，並配置 OPNSense 的本地介面以應對動態變化的 IPv6 前綴。

This guide is based on a Vodafone Cable connection (formerly Kabel-BW) and an AVM Fritz!Box Cable 6591 running Fritz!OS 7.29.

本指南基於 Vodafone Cable 連接（以前稱為 Kabel- BW ）和運行 Fritz! OS 7.29的AVM Fritz!Box Cable 6591。

The settings presented here should work for most other dial-up scenarios and FB models too. The size of the delegated subnet may differ.

這裡提供的設定應該也適用於大多數其他撥接上網場景和FB型號。委派子網的大小可能有所不同。

## The Scenario｜場景

This guide will configure a home network behind a common dial-up type ISP connection. The OPNsense has an interface pointing to the ISP named WAN and has three internal interfaces called DMZ, LAN and WLAN. Each of those internal interfaces will get a /64 subnet from the delegated IPv6 prefix. This way it is easy to control the dataflow between all four segments on the OPNsense.

本指南將配置一個基於常見撥號連線ISP家庭網路。 OPNsense 設備有一個指向ISP的接口，名為WAN並且有三個內部接口，分別名為DMZ, LAN和WLAN 。每個內部介面將從分配的 IPv6 前綴中取得一個 /64 子網路。這樣，就可以輕鬆控制 OPNsense 設備上所有四個網段之間的資料流。

In this example the dial-up ISP assigns a /59 prefix to the FB, so there are enough bits left for subnetting in a SOHO setup.

在這個例子中，撥號ISP將 /59 前綴分配給FB ，因此在SOHO設定中還有足夠的位元用於子網路分割。

## Step 1 - prepare the Fritz!Box｜第一步 - 準備 Fritz!Box

The AVM website has a knowledge base article about the basic settings required on each FB model to enable IPv6 on client devices. [https://avm.de/service/wissensdatenbank/dok/FRITZ-Box-6591-Cable/1239\_IPv6-Subnetz-in-FRITZ-Box-einrichten/](https://avm.de/service/wissensdatenbank/dok/FRITZ-Box-6591-Cable/1239_IPv6-Subnetz-in-FRITZ-Box-einrichten/) The crucial setting is the checkbox **allow other routers IPv6 prefixes**. Without that the delegated internal prefixes will not be reachable from the Internet.

AVM 網站有一篇知識庫文章，介紹了每個 FB 型號在用戶端裝置上啟用 IPv6 所需的基本設定。 [https://avm.de/service/wissensdatenbank/dok/FRITZ-Box-6591-Cable/1239\_IPv6-Subnetz-in-FRITZ-Box-einrichten/](https://avm.de/service/wissensdatenbank/dok/FRITZ-Box-6591-Cable/1239_IPv6-Subnetz-in-FRITZ-Box-einrichten/) 關鍵設定是複選框**允許其他路由器 IPv6 前綴**。否則，將無法從 Internet 存取委託的內部前綴。

Also, not stated in above document, it is possible to modify the **Internet - Permit Access** settings for the OPNsense host. Select Internet ‣ Permit Access ‣ <your OPN Host> ‣ IPv6 Settings ‣ Open firewall for delegated IPv6 prefixes of this device in order to make your delegated internal subnets available via Internet.

此外，上述文件中未提及，也可以修改 OPNsense 主機的**Internet - 允許存取**設定。選擇 Internet ‣ 允許存取 ‣ <your OPN Host> ‣ IPv6 設定 ‣ 為該裝置的委派 IPv6 前綴開啟防火牆，以便透過 Internet 存取您的委派內部子網路。

## Step 2 - configure the WAN interface｜步驟 2 - 設定WAN接口

On the OPNSense go to Interfaces ‣ WAN and set the configuration type for IPv6 to **DHCPv6**. On the bottom part of the dialog in **DHCPv6 Client configuration** make sure to select

在 OPNSense 中，前往「介面」‣ WAN ，並將 IPv6 設定類型設定為 **DHCPv6**。在對話方塊底部的**DHCPv6 用戶端設定** 中，請確保選中

-   checkbox: **Request only an IPv6 prefix**  
    複選框：**僅請求 IPv6 前綴**
    
-   checkbox: **Send IPv6 prefix hint**  
    複選框：**發送 IPv6 前綴提示**
    
-   dropdown: **Prefix delegation size**. For this example setup select 60  
    下拉式選單：**前綴委派大小**。在本範例設定中，請選擇 60。
    

Note the following:

請注意以下事項：

1.  the requested prefix differs by one bit compared to what the ISP delegated the FB (60 vs. 59)  
    請求的前綴與ISP委託給FB前綴相差一位（60 對 59）。
    
2.  the setting **Request only an IPv6 prefix** is the important part. With this setting the FB acknowledges the OPNsense as a router and really delegates a prefix. The OPNSense will only get a link-local 0xfe80 address but that is fine. If this checkbox is not selected the FB considers the OPNsense as an end-user device and plainly refuses to delegate a prefix to it. The OPNsense end up with an valid IPv6 address but with /64 netmask so nothing to delegate into the internal network.  
    設定**僅請求 IPv6 前綴**是重要的部分。透過此設置，FB 確認 OPNsense 作為路由器並真正委託前綴。 OPNSense 只會獲得連結本地 0xfe80 位址，但這沒關係。如果未選取此複選框，FB 會將 OPNsense 視為最終用戶設備，並明確拒絕向其委託前綴。 OPNsense 最終獲得有效的 IPv6 位址，但具有 /64 網路掩碼，因此沒有任何內容可以委託給內部網路。
    

## Step 3 - configure the internal DMZ / LAN / WLAN interfaces｜步驟 3 - 設定內部DMZ / LAN / WLAN接口

Now it is time to set up the internal interfaces. The settings are more or less the same for all of them. Instead of **DHCPv6** select **Track Interface** and on the bottom IPv6 dialog and choose the WAN interface for tracking. This is also the place to divide the delegated prefix into distinct subnets. Just specify an individual **Interface prefix ID** for each interface. In this example the FB gave us aaaa:bbbb:cccc:9410::/60 and we choose:

現在需要設定內部介面。所有介面的設定大同小異。不要選擇 **DHCPv6**，而是選擇**追蹤介面**，然後在底部的 IPv6 對話方塊中選擇WAN介面進行追蹤。這裡也可以將委派前綴分成不同的子網路。只需為每個介面指定一個單獨的**介面前綴ID ** 即可。在本例中， FB對應的是aaaa:bbbb:cccc:9410::/60 ，我們選擇：

| Interface<br>介面 | Interface prefix ID<br>介面前綴ID | result-prefix<br>結果前綴 |
| --- | --- | --- |
| DMZ | 0x01 | aaaa:bbbb:cccc:9411:: |
| WLAN | 0x02 | aaaa:bbbb:cccc:9412:: |
| LAN | 0x03 | aaaa:bbbb:cccc:9413:: |

The **Interface prefix Id** acts as the subnet extension (for lack of better wording) on top of the prefix provided by the FB. In this example we have a /60 prefix so effectively there are 4 bits left for subnetting. As a result valid values for **Interface prefix Id** are between 0x00 and 0x0f.

**介面前綴 ID**的作用類似於子網路擴展（暫且這麼稱呼），它是基於FB提供的前綴。在本例中，我們有一個 /60 前綴，因此實際上還有 4 位元可用於子網劃分。所以，**介面前綴 ID** 的有效值介於 0x00 和 0x0f 之間。

In order to being able to manually set up the router advertisements in the next step make sure to select the checkbox **Allow manual adjustment of DHCPv6 and Router Advertisements** for each of the internal interfaces. If the setting is not used the system tries to set sane defaults for both Router Advertisements and DHCPv6 server.

為了能夠在下一個步驟中手動設定路由器通告，請確保選取每個內部介面的**允許手動調整 DHCPv6 和路由器通告**複選框。如果未使用該設置，系統會嘗試為路由器通告和 DHCPv6 伺服器設定合理的預設值。

## Step 3.1 - configure the Router Advertisements｜步驟3.1 - 設定路由器通告

With the new subnets in place it is time to configure the **Router Advertisements**. For this guide the following settings have been chosen:

新子網路建立完成後，接下來需要設定**路由器通告**。本指南採用以下設定：

| Setting<br>設定 | Value<br>價值 | Comment<br>評論 |
| --- | --- | --- |
| Router Advertisements<br>路由器通告 | Assisted<br>輔助 | this enables DHCPv6 and SLAAC<br>這將啟用 DHCPv6 和SLAAC |
| Router Priority<br>路由器優先權 | Normal<br>普通 | Default is high which would work too<br>預設值為高，也可以接受 |
| Source Address<br>來源位址 | Automatic<br>自動 | the default<br>預設值 |
| Advertise Default Gateway<br>公佈預設閘道 | checked<br>已勾選 | the default<br>預設 |
| Advertise Routes<br>廣告路線 | empty<br>空白 |  |
| DNS options<br>DNS選項 | empty<br>空 | this gives away the OPNsense as DNS server with the current dynamic IP<br>這會將 OPNsense 作為DNS伺服器與當前動態IP關聯起來 |

## Step 3.2 - configure the DHCPv6 service｜步驟3.2 - 設定 DHCPv6 服務

The clients would now be able to grab an IPv6 via SLAAC, find their router and get a DNS resolver but not all clients do know SLAAC. Also there are valid reasons to assign fixed IPv6 address via DHCP to some clients for instance to make them available from the Internet.

客戶端現在可以透過SLAAC取得IPv6位址，找到它們的路由器並取得DNS解析器，但並非所有客戶端都了解SLAAC 。此外，也有合理的理由透過DHCP為某些客戶端分配固定的IPv6位址，例如，為了使它們能夠從網路存取。

In Services ‣ DHCPv6 ‣ \[DMZ\] (and similar for the other interfaces) the DHCPv6 settings can be configured. Initially the dynamically acquired subnet including the interface id and the available range is shown.

在「服務」‣「DHCPv6」‣「[ DMZ ]」（其他介面類似）中，可以設定 DHCPv6 設定。初始狀態下，會顯示動態取得的子網，包括介面 ID 和可用範圍。

Consider assigning a suitable address pool for DHCP client leases. The target range for the DMZ looks like this: aaaa:bbbb:cccc:9411::1:0 –> aaaa:bbbb:cccc:9411::1:ffff.

考慮為DHCP客戶端租約分配合適的地址池。 DMZ 的目標範圍如下圖所示：aaaa:bbbb:cccc:9411::1:0 –> aaaa:bbbb:cccc:9411::1:ffff。

But wait! The prefix is dynamic. How to deal with that?

等等！前綴是動態的。該如何處理呢？

Easy. Just omit the variable prefix and configure the DHCPv6 range to be ::1:0 –> ::1:ffff

很簡單。只需省略變數前綴，並將 DHCPv6 位址範圍配置為 ::1:0 至 ::1:ffff 即可。

OPNSense will automatically prefix this pattern with the dynamically acquired prefix.

OPNSense 會自動在此模式前加上動態取得的前綴。

Repeat for all the other subnets. Do not forget to configure the Domain search list to match the SOHO internal DNS domain if applicable.

對所有其他子網路重複上述步驟。如果適用，請不要忘記配置域搜尋列表以匹配SOHO內部DNS域。

## Step 4 - setup Firewall rules｜步驟 4 - 設定防火牆規則

By default outgoing traffic should already be possible but traffic from the Internet to the internal server needs a firewall rule. There are different philosophies on how to manage firewall rules. Just use a similar strategy as with your IPv4 setup so rule management is consistent.

預設情況下，出站流量應該已經允許，但從網際網路到內部伺服器的流量需要防火牆規則。管理防火牆規則的方法有很多種。為了保持規則管理的一致性，您可以採用與 IPv4 設定類似的策略。

Keep in mind that the DMZ / LAN / WLAN prefix is dynamic. The built-in macros like DMZ net will work for the whole network. But if you need a rule for a single server your should setup an alias pointing to your (fixed) DHCP IP and use this instead.

請注意， DMZ / LAN / WLAN前綴是動態的。內建巨集（例如DMZ net）適用於整個網路。但如果您需要為單一伺服器設定規則，則應設定一個指向（固定） DHCP IP的別名，並使用該別名。

## Troubleshooting｜故障排除

While discovering the specifics of IPv6 behind a FB in combination with OPNsense the first point of debugging was always connecting via SSH to OPNsense on the CLI.

在探索FB與 OPNsense 結合使用的 IPv6 的具體細節時，調試的第一點始終是透過SSH連接到CLI上的 OPNsense。

In the directory /tmp/ you will find several IPv6 related intermediate files. The most helpful here was /tmp/<interfacename>\_prefixv6. In this file you will find the prefix delegated to you by your upstream router. If you are behind an FB and this file does not exist chances are you forgot to set the **Request only an IPv6 prefix** setting on the WAN interface.

在目錄 /tmp/ 中您將找到幾個與 IPv6 相關的中間檔案。這裡最有幫助的是/tmp/<interfacename>\_prefixv6。在此文件中，您將找到上游路由器委託給您的前綴。如果您使用 FB 且此檔案不存在，您很可能忘記在 WAN 介面上設定 **僅請求 IPv6 前綴** 設定。

Another helpful command is radvdump. This tool dumps the output of the router advertisements in a nicely formatted way.

另一個很有用的指令是radvdump。這個工具可以以格式良好的方式匯出路由器通告的輸出。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：IPv6 for generic DSL dialup｜通用撥號的 IPv6 DSL](<122 通用撥號的 IPv6 DSL.md>)　｜　[下一篇：IPv6 Tunnel Broker｜IPv6隧道代理 ➡](<124 IPv6隧道代理.md>)
