---
title: "AVM Fritz!Box 後面的 IPv6"
title_original: "IPv6 behind an AVM Fritz!Box"
source: "https://docs.opnsense.org/manual/how-tos/ipv6_fb.html"
chapter: ["Interfaces","Setup Guides","IPv6 Guides"]
order: 123
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:42.712Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：通用撥號的 IPv6 DSL](<122 通用撥號的 IPv6 DSL.md>)　｜　[下一篇：IPv6 隧道代理 ➡](<124 IPv6 隧道代理.md>)

# AVM Fritz!Box 後面的 IPv6

> 章節：[Interfaces](<000 目錄.md#c-19>) › [Setup Guides](<000 目錄.md#c-21>) › [IPv6 Guides](<000 目錄.md#c-24>)

**原作者：**托馬斯·克萊因

## 介紹

Fritz!Box（ AVM FB是一款在德國廣受歡迎的家用路由器，適用於有線和光纖DSL 。本指南將指導您如何在 Fritz FB路由器後設定 OPNSense，從運營商接收委託前綴，並配置 OPNSense 的本地介面以應對動態變化的 IPv6 前綴。

本指南基於 Vodafone Cable 連接（以前稱為 Kabel- BW ）和運行 Fritz! OS 7.29的AVM Fritz!Box Cable 6591。

這裡提供的設定應該也適用於大多數其他撥接上網場景和FB型號。委派子網的大小可能有所不同。

## 場景

本指南將配置一個基於常見撥號連線ISP家庭網路。 OPNsense 設備有一個指向ISP的接口，名為WAN並且有三個內部接口，分別名為DMZ, LAN和WLAN 。每個內部介面將從分配的 IPv6 前綴中取得一個 /64 子網路。這樣，就可以輕鬆控制 OPNsense 設備上所有四個網段之間的資料流。

在這個例子中，撥號ISP將 /59 前綴分配給FB ，因此在SOHO設定中還有足夠的位元用於子網路分割。

## 第一步 - 準備 Fritz!Box

AVM 網站有一篇知識庫文章，介紹了每個 FB 型號在用戶端裝置上啟用 IPv6 所需的基本設定。 [https://avm.de/service/wissensdatenbank/dok/FRITZ-Box-6591-Cable/1239\_IPv6-Subnetz-in-FRITZ-Box-einrichten/](https://avm.de/service/wissensdatenbank/dok/FRITZ-Box-6591-Cable/1239_IPv6-Subnetz-in-FRITZ-Box-einrichten/) 關鍵設定是複選框**允許其他路由器 IPv6 前綴**。否則，將無法從 Internet 存取委託的內部前綴。

此外，上述文件中未提及，也可以修改 OPNsense 主機的**Internet - 允許存取**設定。選擇 Internet ‣ 允許存取 ‣ <your OPN Host> ‣ IPv6 設定 ‣ 為該裝置的委派 IPv6 前綴開啟防火牆，以便透過 Internet 存取您的委派內部子網路。

## 步驟 2 - 設定WAN接口

在 OPNSense 中，前往「介面」‣ WAN ，並將 IPv6 設定類型設定為 **DHCPv6**。在對話方塊底部的**DHCPv6 用戶端設定** 中，請確保選中

-   複選框：**僅請求 IPv6 前綴**
    
-   複選框：**發送 IPv6 前綴提示**
    
-   下拉式選單：**前綴委派大小**。在本範例設定中，請選擇 60。
    

請注意以下事項：

1.  請求的前綴與ISP委託給FB前綴相差一位（60 對 59）。
    
2.  設定**僅請求 IPv6 前綴**是重要的部分。透過此設置，FB 確認 OPNsense 作為路由器並真正委託前綴。 OPNSense 只會獲得連結本地 0xfe80 位址，但這沒關係。如果未選取此複選框，FB 會將 OPNsense 視為最終用戶設備，並明確拒絕向其委託前綴。 OPNsense 最終獲得有效的 IPv6 位址，但具有 /64 網路掩碼，因此沒有任何內容可以委託給內部網路。
    

## 步驟 3 - 設定內部DMZ / LAN / WLAN接口

現在需要設定內部介面。所有介面的設定大同小異。不要選擇 **DHCPv6**，而是選擇**追蹤介面**，然後在底部的 IPv6 對話方塊中選擇WAN介面進行追蹤。這裡也可以將委派前綴分成不同的子網路。只需為每個介面指定一個單獨的**介面前綴ID ** 即可。在本例中， FB對應的是aaaa:bbbb:cccc:9410::/60 ，我們選擇：

| 介面 | 介面前綴ID | 結果前綴 |
| --- | --- | --- |
| DMZ | 0x01 | aaaa:bbbb:cccc:9411:: |
| WLAN | 0x02 | aaaa:bbbb:cccc:9412:: |
| LAN | 0x03 | aaaa:bbbb:cccc:9413:: |

**介面前綴 ID**的作用類似於子網路擴展（暫且這麼稱呼），它是基於FB提供的前綴。在本例中，我們有一個 /60 前綴，因此實際上還有 4 位元可用於子網劃分。所以，**介面前綴 ID** 的有效值介於 0x00 和 0x0f 之間。

為了能夠在下一個步驟中手動設定路由器通告，請確保選取每個內部介面的**允許手動調整 DHCPv6 和路由器通告**複選框。如果未使用該設置，系統會嘗試為路由器通告和 DHCPv6 伺服器設定合理的預設值。

## 步驟3.1 - 設定路由器通告

新子網路建立完成後，接下來需要設定**路由器通告**。本指南採用以下設定：

|設定|價值|評論 |
| --- | --- | --- |
| 路由器通告 | 輔助 | 這將啟用 DHCPv6 和SLAAC |
| 路由器優先權 | 普通 | 預設值為高，也可以接受 |
| 來源位址 | 自動 | 預設值 |
| 公佈預設閘道 | 已勾選 | 預設 |
| 廣告路線 | 空白 | |
| DNS選項 | 空 | 這會將 OPNsense 作為DNS伺服器與當前動態IP關聯起來 |

## 步驟3.2 - 設定 DHCPv6 服務

客戶端現在可以透過SLAAC取得IPv6位址，找到它們的路由器並取得DNS解析器，但並非所有客戶端都了解SLAAC 。此外，也有合理的理由透過DHCP為某些客戶端分配固定的IPv6位址，例如，為了使它們能夠從網路存取。

在「服務」‣「DHCPv6」‣「[ DMZ ]」（其他介面類似）中，可以設定 DHCPv6 設定。初始狀態下，會顯示動態取得的子網，包括介面 ID 和可用範圍。

考慮為DHCP客戶端租約分配合適的地址池。 DMZ 的目標範圍如下圖所示：aaaa:bbbb:cccc:9411::1:0 –> aaaa:bbbb:cccc:9411::1:ffff。

等等！前綴是動態的。該如何處理呢？

很簡單。只需省略變數前綴，並將 DHCPv6 位址範圍配置為 ::1:0 至 ::1:ffff 即可。

OPNSense 會自動在此模式前加上動態取得的前綴。

對所有其他子網路重複上述步驟。如果適用，請不要忘記配置域搜尋列表以匹配SOHO內部DNS域。

## 步驟 4 - 設定防火牆規則

預設情況下，出站流量應該已經允許，但從網際網路到內部伺服器的流量需要防火牆規則。管理防火牆規則的方法有很多種。為了保持規則管理的一致性，您可以採用與 IPv4 設定類似的策略。

請注意， DMZ / LAN / WLAN前綴是動態的。內建巨集（例如DMZ net）適用於整個網路。但如果您需要為單一伺服器設定規則，則應設定一個指向（固定） DHCP IP的別名，並使用該別名。

## 故障排除

在探索FB與 OPNsense 結合使用的 IPv6 的具體細節時，調試的第一點始終是透過SSH連接到CLI上的 OPNsense。

在目錄 /tmp/ 中您將找到幾個與 IPv6 相關的中間檔案。這裡最有幫助的是/tmp/<interfacename>\_prefixv6。在此文件中，您將找到上游路由器委託給您的前綴。如果您使用 FB 且此檔案不存在，您很可能忘記在 WAN 介面上設定 **僅請求 IPv6 前綴** 設定。

另一個很有用的指令是radvdump。這個工具可以以格式良好的方式匯出路由器通告的輸出。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：通用撥號的 IPv6 DSL](<122 通用撥號的 IPv6 DSL.md>)　｜　[下一篇：IPv6 隧道代理 ➡](<124 IPv6 隧道代理.md>)
