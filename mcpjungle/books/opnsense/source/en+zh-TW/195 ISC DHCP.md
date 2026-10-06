---
title: "ISC DHCP"
source: "https://docs.opnsense.org/manual/isc.html"
chapter: ["Services"]
order: 195
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:19.593Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Dnsmasq DNS & DHCP](<194 Dnsmasq DNS & DHCP.md>)　｜　[下一篇：KEA DHCP ➡](<196 KEA DHCP.md>)

# ISC DHCP

> 章節：[Services](<000 目錄.md#c-40>)

## [ISC DHCP](#id2)

Index

指數

-   [ISC DHCP](#isc-dhcp)
    
    -   [Settings overview](#settings-overview)  
        [設定概覽](#settings-overview)
        
    -   [Using DHCPv4](#using-dhcpv4)  
        [使用 DHCPv4](#using-dhcpv4)
        
    -   [Using DHCPv6](#using-dhcpv6)  
        [使用 DHCPv6](#using-dhcpv6)
        
    -   [Advanced settings](#advanced-settings)  
        [進階設定](#advanced-settings)
        
    -   [Diagnostics](#diagnostics)  
        [診斷](#diagnostics)
        

ISC DHCP was the DHCP server developed and maintained by the Internet Systems Consortium (ISC). It supported both DHCPv4 and DHCPv6 and was widely used across a broad range of systems and distributions for many years.

ISC DHCP是互聯網系統聯盟 ( ISC ) 開發和維護的DHCP伺服器。它同時支援 DHCPv4 和 DHCPv6，並在多年來被廣泛應用於各種系統和發行版中。

While it provided reliable service for static and dynamic address assignments, its monolithic architecture and limited extensibility led to challenges in modern, dynamic, or high-availability environments. Support for ISC DHCP has officially ended, and it has been fully replaced by KEA DHCP in most setups.

雖然它為靜態和動態位址分配提供了可靠的服務，但其單體架構和有限的可擴展性使其在現代、動態或高可用性環境中面臨挑戰。對ISC DHCP的支援已正式終止，並且在大多數部署中已被KEA DHCP完全取代。

Note

筆記

ISC DHCP is end-of-life and no longer receives updates or security patches. It is strongly recommended to migrate to KEA or Dnsmasq.

ISC DHCP已停止維護，不再接收更新或安全修補程式。強烈建議遷移到KEA或 Dnsmasq。

## [Settings overview](#id3)｜[設定概覽](#id3)

DHCPv4 settings can be found at Services ‣ ISC DHCPv4. DHCPv6 settings can be found at Services ‣ ISC DHCPv6.

DHCPv4 設定位於「服務」 ISC DHCPv4。 DHCPv6 設定位於「服務」 ISC DHCPv6。

The DHCPv4 submenu further consists of:

DHCPv4 子選單還包括：

-   An entry per interface of general settings, like a toggle to enable/disable DHCPv4 for this interface, DHCP range, DNS servers…  
    每個介面都有一個常規設定條目，例如啟用/停用此介面的 DHCPv4 開關、 DHCP位址範圍、 DNS伺服器…
    
-   **Leases**: Shows all IP addresses that are handed out to clients.  
    **租賃**：顯示所有分發給客戶的IP地址。
    
-   **Log File**: Shows the log file of the DHCPv4 server.  
    **日誌檔案**：顯示 DHCPv4 伺服器的日誌檔案。
    

The DHCPv6 submenu further consists of:

DHCPv6 子選單還包括：

-   **Leases**: Shows all IP addresses that are handed out to clients.  
    **租賃**：顯示所有分發給客戶的IP地址。
    

## [Using DHCPv4](#id4)｜[使用 DHCPv4](#id4)

A typical DHCPv4 usage scenario is using it on your LAN with an IP range of 192.168.1.x, where x can be a number from 1 through 254. This means a subnet mask of 255.255.255.0. The range can also be written as 192.168.1.0/24. (The “1” in the third group can also be another number, and there are also other ranges available for private use. These are described in [RFC 1918](https://tools.ietf.org/html/rfc1918#section-3).)

典型的 DHCPv4 使用場景是在您的LAN上使用它， 192.168.1 IP其中 x 可以是 1 到 254 之間的任何數字。這表示子網路遮罩為255.255.255.0 。此範圍也可以寫成192.168.1.0/24 。 （第三組中的「1」也可以是其他數字，並且還有其他可供私有使用的範圍。這些範圍在 [RFC 1918](https://tools.ietf.org/html/rfc1918#section-3)中有描述。）

The LAN IP of the OPNsense device that serves DHCP to the LAN should fall in the same DHCP IP range. Typically, it gets the address ending in .1 (so 192.168.1.1 in this example).

為DHCP到LAN提供服務的 OPNsense 設備的LAN IP應該與DHCP IP處於同一範圍內。通常，它的地址以 .1 結尾（因此在本例中為192.168.1.1 ）。

To set the LAN IP, go to Interfaces ‣ \[LAN\], set “IPv4 Configuration Type”（IPv4 設定類型） to “Static”（靜止的）, and under “Static IPv4 configuration”, set “IPv4 address” to `192.168.1.1` and the subnet dropdown to “24”. Then click Save.

要設定LAN IP，請到介面‣\[LAN\]，將“IPv4 Configuration Type”（IPv4 設定類型）設定為“Static”（靜止的），然後在「靜態IPv4設定」下，將「IPv4位址」設定為`192.168.1.1`，將子網清單設定為「24」清單。然後點擊“儲存”。

To set the DHCP settings, go to Services ‣ ISC DHCPv4 ‣ \[LAN\]. Under “Gateway”（閘道）, put `192.168.1.1`. Under range, put `192.168.1.100` as the start address and `192.168.1.200` as the end address. Then click Save. After saving, click the “Apply Settings”（應用程式設定） button.

要設定DHCP ，請前往「服務」‣ ISC DHCPv4 ‣ \[ LAN \]。在“Gateway”（閘道）下，輸入`192.168.1.1` 。在「範圍」下，將`192.168.1.100`設定為起始位址， `192.168.1.200`設定為結束位址。然後點擊“儲存”。儲存後，點選“Apply Settings”（應用程式設定）按鈕。

## [Using DHCPv6](#id5)｜[使用 DHCPv6](#id5)

When IPv6 addresses should be provisioned over DHCPv6 the Services‣ ISC DHCPv6 ‣\[Interface\] is the place to look at. Like in the IPv4 scenario, you can provide a range here, offer settings like default DNS servers and create static assignments based on the clients unique DHCP identifier ([DUID](https://en.wikipedia.org/wiki/DHCPv6)).

當需要透過 DHCPv6 分配 IPv6 位址時，應查看 Services‣ ISC DHCPv6 ‣\[Interface\]。與 IPv4 場景類似，您可以在此處提供一個範圍，提供諸如預設DNS伺服器之類的設置，並基於客戶端的唯一DHCP標識符 ([DUID](https://en.wikipedia.org/wiki/DHCPv6) ) 建立靜態分配。

Always make sure [Router advertisements](<197 路由器廣告.md>) are properly configured before debugging DHCPv6 issues, these two daemons depend on each other.

在偵錯 DHCPv6 問題之前，請務必確保 [路由器通告](<197 路由器廣告.md>)已正確配置，這兩個守護程序相互依賴。

If a Prefix Delegation Range is specified, downstream routers may request prefixes (IA\_PD). Routing a delegated prefix to a downstream router requires OPNsense to be aware of the router’s IPv6 WAN address. This can be achieved in two ways:

如果指定了前綴委派範圍，下游路由器可以請求前綴（ IA \_PD）。將委派的前綴路由到下游路由器需要 OPNsense 知道該路由器的 IPv6 WAN位址。這可以透過兩種方式實現：

-   **Dynamic DHCPv6 address lease**: If an address range is specified in the DHCPv6 service settings and the downstream router requests both an address (IA\_NA) and prefix (IA\_PD), the prefix will be routed to the leased address.  
    **動態 DHCPv6 位址租約**：如果在 DHCPv6 服務設定中指定了位址範圍，並且下游路由器同時請求位址 ( IA \_NA) 和前綴 ( IA \_PD)，則前綴將被路由到已租借的位址。
    
-   **Static mapping**: If the DUID of an active prefix lease matches the DUID of a DHCPv6 static mapping, the delegated prefix will be unconditionally routed to the static mapping’s IPv6 address. The DHCPv6 service doesn’t have to be configured with an address range and the downstream router doesn’t have to request an address. The address in the static mapping may be a GUA, ULA or link-local address. This allows downstream prefix delegation to routers which only request a prefix, not an address.  
    **靜態映射**：如果活動前綴租約的DUID與DHCPv6靜態映射的DUID匹配，則委派的前綴將無條件路由到靜態映射的IPv6位址。 DHCPv6服務無需設定位址範圍，下游路由器也無需請求位址。靜態映射中的位址可以是GUA, ULA或連結本地位址。這允許將下游前綴委派給僅請求前綴而不請求位址的路由器。
    

## [Advanced settings](#id6)｜[進階設定](#id6)

To configure options that are not available in the GUI one can add custom configuration files on the firewall itself. Files can be added in `/usr/local/etc/dhcpd.opnsense.d/` for IPv4 and `/usr/local/etc/dhcpd6.opnsense.d/` for IPv6, these should use as extension .conf (e.g. custom-options.conf). When more files are placed inside the directory, all will be included in alphabetical order.

若要設定GUI中未提供的選項，可以在防火牆本身上新增自訂設定檔。 IPv4 的設定檔可以加入到`/usr/local/etc/dhcpd.opnsense.d/`目錄，IPv6 的設定檔可以加入到`/usr/local/etc/dhcpd6.opnsense.d/`目錄，這些檔案應使用 .conf 副檔名（例如 custom-options.conf）。如果目錄中放置了多個文件，則所有文件將按字母順序排列。

Warning

警告

It is the sole responsibility of the administrator which places a file in the extension directory to ensure that the configuration is valid.

管理員有責任將檔案放置在擴充目錄中，以確保配置有效。

## [Diagnostics](#id7)｜[診斷](#id7)

As mentioned in the settings overview, the current leased IP addresses can be seen in the **Leases** page for diagnostic purposes. Both IPv4 and IPv6 have their own leases page. This page reflects the current facts as reported by DHCPd in the /var/dhcpd/var/db/dhcpd(6).leases database. By default this page only shows the current active leases. To show all configured leases, check the “inactive” box. You are also able to filter on interfaces by using the dropdown showing “All Interfaces”（所有介面）.

如設定概述中所述，可以在 **租用** 頁面中查看目前租用的 IP 地址，以用於診斷目的。 IPv4 和 IPv6 都有自己的租約頁面。此頁面反映了 DHCPd 在 /var/dhcpd/var/db/dhcpd(6).leases 資料庫中報告的當前事實。預設情況下，此頁面僅顯示目前有效的租約。若要顯示所有已配置的租約，請勾選「非活動」方塊。您也可以使用顯示 “All Interfaces”（所有介面） 的下拉清單來過濾介面。

-   All times are reported in local time as specified in [Administration](<98 設定.md#general>)  
    所有時間均以[管理](<98 設定.md#general>)中規定的當地時間為準。
    
-   Clients are considered online if they exist the ARP table for IPv4 or NDP table for IPv6.  
    如果用戶端存在於 IPv4 的ARP表或 IPv6 的NDP表中，則認為用戶端線上。
    
-   The different possible states a lease can be in is documented in the [dhcpd.leases](https://www.freebsd.org/cgi/man.cgi?query=dhcpd.leases) page. If failover is enabled, checking the **inactive** box will reveal all IP addresses currently reserved by DHCPd with a **backup** state. These are leases that are available for allocation by the failover secondary. The amount shown will vary depending on the configured failover split value or range.  
    租約可能處於的不同可能狀態記錄在 [dhcpd.leases](https://www.freebsd.org/cgi/man.cgi?query=dhcpd.leases) 頁面中。如果啟用了故障轉移，選取 **非活動**方塊將顯示 DHCPd 目前保留的所有 IP 位址，具有**備份** 狀態。這些租約可供故障轉移輔助節點分配。顯示的金額將根據配置的故障轉移分割值或範圍而有所不同。
    
-   The lease type can either by **dynamic** or **static**. This is provided for ease of sorting.  
    租賃類型可以是**動態**或**靜態**。這樣做是為了方便排序。
    
-   A static mapping for a dynamic lease can be configured by clicking on the plus sign of a row.  
    點選行中的加號，即可設定動態租約的靜態對應。
    
-   A lease can also be directly deleted from the leases database.  
    也可以直接從租賃資料庫中刪除租賃合約。
    
-   for DHCPv4, a hostname for a client will be shown if the client specifies their hostname as part of the protocol.  
    對於 DHCPv4，如果用戶端在協定中指定了其主機名，則會顯示用戶端的主機名稱。
    
-   For DHCPv6, a MAC address will be shown if it exists in the NDP table or if the MAC address exists in the DUID, but only if this MAC address maps to a known vendor. This is because a MAC address cannot reliably be fetched from a DUID.  
    對於 DHCPv6，如果MAC位址存在於NDP表中，或MAC位址存在於DUID表中，則會顯示該位址，但前提是該MAC位址對應到已知的供應商。這是因為無法可靠地從DUID表中取得MAC位址。
    
-   The DHCPv6 leases page also shows the delegated prefixes in a separate tab.  
    DHCPv6 租約頁面也會在單獨的標籤中顯示委派的前綴。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Dnsmasq DNS & DHCP](<194 Dnsmasq DNS & DHCP.md>)　｜　[下一篇：KEA DHCP ➡](<196 KEA DHCP.md>)
