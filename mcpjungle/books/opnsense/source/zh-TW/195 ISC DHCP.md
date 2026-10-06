---
title: "ISC DHCP"
source: "https://docs.opnsense.org/manual/isc.html"
chapter: ["Services"]
order: 195
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:33:19.593Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Dnsmasq DNS & DHCP](<194 Dnsmasq DNS & DHCP.md>)　｜　[下一篇：KEA DHCP ➡](<196 KEA DHCP.md>)

# ISC DHCP

> 章節：[Services](<000 目錄.md#c-40>)

## [ISC DHCP](#id2)

指數

-   [ISC DHCP](#isc-dhcp)
    
    -   [設定概覽](#settings-overview)
        
    -   [使用 DHCPv4](#using-dhcpv4)
        
    -   [使用 DHCPv6](#using-dhcpv6)
        
    -   [進階設定](#advanced-settings)
        
    -   [診斷](#diagnostics)
        

ISC DHCP 是由互聯網系統聯盟 (ISC) 開發和維護的 DHCP 伺服器。它支援 DHCPv4 和 DHCPv6，多年來在各種系統和發行版中廣泛使用。

雖然它為靜態和動態位址分配提供了可靠的服務，但其整體架構和有限的可擴展性給現代、動態或高可用性環境帶來了挑戰。對ISC DHCP的支援已正式結束，並且在大多數設定中已完全被KEA DHCP取代。

注意事項

ISC DHCP 已停產，不再接收更新或安全修補程式。強烈建議遷移到KEA或Dnsmasq。

## [設定概覽](#id3)

DHCPv4 設定可以在服務 ‣ ISC DHCPv4 中找到。 DHCPv6 設定可以在服務 ‣ ISC DHCPv6 中找到。

DHCPv4 子選單還包括：

-   每個介面的常規設定條目，例如為此介面啟用/停用 DHCPv4 的切換、DHCP 範圍、DNS 伺服器…
    
-   **租約**：顯示分發給客戶端的所有 IP 位址。
    
-   **日誌檔案**：顯示 DHCPv4 伺服器的日誌檔案。
    

DHCPv6 子選單還包括：

-   **租約**：顯示分發給客戶端的所有 IP 位址。
    

## [使用 DHCPv4](#id4)

典型的 DHCPv4 使用場景是在 LAN 上使用它，IP 範圍為 192.168.1.x，其中 x 可以是 1 到 254 之間的數字。這表示子網路遮罩為 255.255.255.0。該範圍也可以寫成192.168.1.0/24。 （第三組中的「1」也可以是其他數字，還有其他可供私人使用的範圍。這些在[RFC 1918](https://tools.ietf.org/html/rfc1918#section-3)中有描述。）

為 DHCP 到 LAN 提供服務的 OPNsense 設備的 LAN IP 應落在相同的 DHCP IP 範圍內。通常，它會取得以 .1 結尾的位址（因此本例中為 192.168.1.1）。

要設定LAN IP，請前往介面‣\[LAN\]，將“IPv4設定類型”設定為“靜態”，然後在“靜態IPv4配置”下，將“IPv4位址”設為`192.168.1.1`，子網路下拉清單設定為“24”。然後點擊“儲存”。

若要設定 DHCP 設置，請前往服務 ‣ ISC DHCPv4 ‣ \[LAN\]。在「網關」下，放置`192.168.1.1`。在範圍下，以`192.168.1.100`作為起始位址，將`192.168.1.200`作為結束位址。然後點擊“儲存”。儲存後，點擊“應用設定”按鈕。

## [使用 DHCPv6](#id5)

當應透過 DHCPv6 設定 IPv6 位址時，應查看 Services‣ ISC DHCPv6 ‣\[Interface\]。與 IPv4 場景一樣，您可以在此處提供範圍，提供預設 DNS 伺服器等設置，並根據客戶端唯一的 DHCP 識別碼 ([DUID](https://en.wikipedia.org/wiki/DHCPv6)) 建立靜態分配符。

在偵錯 DHCPv6 問題之前，請務必確保 [路由器通告](<197 路由器廣告.md>) 已正確配置，這兩個守護程序相互依賴。

如果指定了前綴委託範圍，下游路由器可能會請求前綴 (IA\_PD)。將委託前綴路由到下游路由器需要 OPNsense 來了解路由器的 IPv6 WAN 位址。這可以透過兩種方式實現：

-   **動態 DHCPv6 位址租用**：如果在 DHCPv6 服務設定中指定了位址範圍，並且下游路由器同時要求位址（IA\_NA）和前綴（IA\_PD），則前綴將被路由到租用位址。
    
-   **靜態映射**：如果活動前綴租約的 DUID 與 DHCPv6 靜態映射的 DUID 匹配，則委派前綴將無條件路由到靜態映射的 IPv6 位址。 DHCPv6 服務不必設定位址範圍，下游路由器也不必要求位址。靜態映射中的位址可以是GUA, ULA或連結本地位址。這允許下游前綴委託給僅請求前綴而不是位址的路由器。
    

## [進階設定](#id6)

若要設定GUI中不可用的選項，可以在防火牆本身上新增自訂設定檔。檔案可以加入到 IPv4 的 `/usr/local/etc/dhcpd.opnsense.d/` 和 IPv6 的 `/usr/local/etc/dhcpd6.opnsense.d/` 中，這些檔案應用作副檔名 .conf（例如 custom-options.conf）。當目錄中放置更多文件時，所有文件都將按字母順序包含。

警告

管理員有責任將文件放置在擴充目錄中以確保配置有效。

## [診斷](#id7)

如設定概述中所述，可以在 **租用** 頁面中查看目前租用的 IP 地址，以用於診斷目的。 IPv4 和 IPv6 都有自己的租約頁面。此頁面反映了 DHCPd 在 /var/dhcpd/var/db/dhcpd(6).leases 資料庫中報告的當前事實。預設情況下，此頁面僅顯示目前有效的租約。若要顯示所有已配置的租約，請勾選「非活動」方塊。您也可以使用顯示「所有介面」的下拉清單來過濾介面。

-   所有時間均以[管理](<98 設定.md#general>)中指定的當地時間報告
    
-   如果用戶端存在 IPv4 的 ARP 表或 IPv6 的 NDP 表，則用戶端被視為線上。
    
-   租約可能處於的不同可能狀態記錄在 [dhcpd.leases](https://www.freebsd.org/cgi/man.cgi?query=dhcpd.leases) 頁面中。如果啟用了故障轉移，選取 **非活動**方塊將顯示 DHCPd 目前保留的所有 IP 位址，具有**備份** 狀態。這些租約可供故障轉移輔助節點分配。顯示的金額將根據配置的故障轉移分割值或範圍而有所不同。
    
-   租賃類型可以是**動態**或**靜態**。這樣做是為了方便排序。
    
-   可以透過點選行的加號來配置動態租約的靜態對應。
    
-   租約也可以直接從租約資料庫中刪除。
    
-   對於 DHCPv4，如果用戶端將其主機名稱指定為協定的一部分，則會顯示用戶端的主機名稱。
    
-   對於 DHCPv6，如果 NDP 表中存在 MAC 位址，或 DUID 中存在 MAC 位址，則會顯示該位址，但前提是此 MAC 位址對應到已知供應商。這是因為無法從 DUID 可靠地取得 MAC 位址。
    
-   DHCPv6 租用頁面也在單獨的標籤中顯示委派的前綴。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Dnsmasq DNS & DHCP](<194 Dnsmasq DNS & DHCP.md>)　｜　[下一篇：KEA DHCP ➡](<196 KEA DHCP.md>)
