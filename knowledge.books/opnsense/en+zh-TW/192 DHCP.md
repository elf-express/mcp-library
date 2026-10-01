---
title: "DHCP"
source: "https://docs.opnsense.org/manual/dhcp.html"
chapter: ["Services"]
order: 192
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:19.090Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Services｜服務](<191 服務.md>)　｜　[下一篇：DHCrelay｜DH 繼電器 ➡](<193 DH 繼電器.md>)

# DHCP

> 章節：[Services](<000 目錄.md#c-40>)

DHCP is used to automatically provide clients with an IP address (instead of clients having to set one themselves). DHCP is available for both IPv4 and IPv6 clients, referred to as DHCPv4 and DHCPv6, respectively.

DHCP 用於自動為客戶端提供IP 位址（而非客戶端必須自行設定）。 DHCP 可用於 IPv4 和 IPv6 用戶端，分別稱為 DHCPv4 和 DHCPv6。

## Available Options｜可用選項

There are different DHCP servers/relays to choose from:

有多種DHCP伺服器/中繼可供選擇：

> -   [Dnsmasq](#dnsmasq-dhcp) (default)  
      [Dnsmasq](#dnsmasq-dhcp) （預設）
>     
> -   [KEA](#kea-dhcp)
>     
> -   [Dhcrelay](#dhcrelay)  
      [Dhcrelay](#dhcrelay)
>     
> -   [ISC](#isc-dhcp) (EOL)
>     

For DHCPv6 these services can offer Router Advertisements:

對於 DHCPv6，這些服務可以提供路由器通告：

> -   [radvd](<197 路由器廣告.md>)  
      [radvd](<197 路由器廣告.md>)
>     
> -   [Dnsmasq](#dnsmasq-dhcp)  
      [Dnsmasq](#dnsmasq-dhcp)
>     

### Dnsmasq DNS & DHCP

[Dnsmasq Manual](<194 Dnsmasq DNS & DHCP.md>)

[Dnsmasq 手冊](<194 Dnsmasq DNS & DHCP.md>)

Dnsmasq is a lightweight DNS, router advertisement and DHCP server. It is intended to provide coupled DNS and DHCP service to a LAN. Dnsmasq accepts DNS queries and either answers them from a small, local, cache or forwards them to a real, recursive, DNS server.

Dnsmasq 是一個輕量級的DNS通告和DHCP 。它旨在為LAN提供耦合的DNS服務。 Dnsmasq 接受查詢，並根據DHCP DNS ，從本地小型快取返回結果，或將查詢轉發到真正的DNS伺服器。

The dnsmasq DHCP server supports static address assignments and multiple networks. It automatically sends a sensible default set of DHCP options, and can be configured to send any desired set of DHCP options, including vendor-encapsulated options.

dnsmasq DHCP伺服器支援靜態位址分配和多網路。它會自動發送一組合理的預設DHCP選項，並且可以配置為發送任何所需的DHCP選項集，包括廠商封裝的選項。

The dnsmasq DHCPv6 server provides the same set of features as the DHCPv4 server, and in addition, it includes router advertisements and a neat feature which allows naming for clients which use DHCPv4 and stateless autoconfiguration only for IPv6 configuration. There is support for doing address allocation (both DHCPv6 and RA) from subnets which are dynamically delegated via DHCPv6 prefix delegation.

dnsmasq DHCPv6 伺服器提供與 DHCPv4 伺服器相同的功能集，此外，它還包含路由器通告功能，以及一項便利的功能，允許為使用 DHCPv4 的用戶端命名，並為 IPv6 設定提供無狀態自動設定。它支援從透過 DHCPv6 前綴委派動態分配的子網路中分配位址（包括 DHCPv6 和RA ）。

Tip

提示

Dnsmasq is the perfect DNS & DHCP server for small and medium sized setups (less than 1000 unique clients). It is the default for DHCPv4, DHCPv6 and Router Advertisements out of the box.

Dnsmasq 是適用於中小型部署（少於 1000 個獨立用戶端）的理想DNS & DHCP伺服器。它預設支援 DHCPv4、DHCPv6 和路由器通告。

### KEA DHCP

[KEA Manual](<196 KEA DHCP.md>)

[KEA手冊](<196 KEA DHCP.md>)

KEA is a modern, modular, and high-performance DHCP server developed by ISC to succeed the legacy ISC DHCP server. It supports both DHCPv4 and DHCPv6 and is designed for scalable and high-availability environments.

KEA是一款現代化、模組化、高效能的DHCP伺服器，由ISC開發，旨在取代傳統的ISC DHCP伺服器。它同時支援 DHCPv4 和 DHCPv6，專為可擴展和高可用性環境而設計。

KEA does not include DNS or router advertisement features, and is typically integrated with external services (such as Unbound DNS and radvd Router Advertisement Daemon) to provide full-stack DNS/DHCP/RA functionality.

KEA不包含DNS或路由器通告功能，通常與外部服務（如 Unbound DNS和 radvd 路由器通告守護程序）集成，以提供全棧DNS/DHCP/RA功能。

Please note that there is no dynamic DNS lease registration functionality via Unbound implemented.

請注意，Unbound 尚未實現動態DNS租賃註冊功能。

Tip

提示

KEA is the perfect DHCP server for medium to large sized HA setups (more than 1000 unique clients) or environments requiring dynamic configuration via API.

KEA是中型到大型HA設定（超過 1000 個獨立客戶端）或需要透過API進行動態配置的環境的完美DHCP伺服器。

### ISC DHCP

[ISC Manual](<195 ISC DHCP.md>)

[ISC手冊](<195 ISC DHCP.md>)

ISC DHCP was the DHCP server developed and maintained by the Internet Systems Consortium (ISC). It supported both DHCPv4 and DHCPv6 and was widely used across a broad range of systems and distributions for many years.

ISC DHCP是互聯網系統聯盟 ( ISC ) 開發和維護的DHCP伺服器。它同時支援 DHCPv4 和 DHCPv6，並在多年來被廣泛應用於各種系統和發行版中。

While it provided reliable service for static and dynamic address assignments, its monolithic architecture and limited extensibility led to challenges in modern, dynamic, or high-availability environments. Support for ISC DHCP has officially ended, and it has been fully replaced by KEA DHCP in most setups.

雖然它為靜態和動態位址分配提供了可靠的服務，但其整體架構和有限的可擴展性給現代、動態或高可用性環境帶來了挑戰。對ISC DHCP的支援已正式結束，並且在大多數設定中已完全被KEA DHCP取代。

Attention

注意

ISC DHCP is end-of-life and no longer receives updates or security patches. It is strongly recommended to migrate to KEA or Dnsmasq.

ISC DHCP已停止維護，不再接收更新或安全修補程式。強烈建議遷移到KEA或 Dnsmasq。

### DHCRelay

[DHCrelay Manual](<193 DH 繼電器.md>)

[DHCrelay 手冊](<193 DH 繼電器.md>)

DHCP relaying is the forwarding of DHCP requests received on one interface to a DHCP server on another network. This is useful when the DHCP server is not on the same broadcast domain as the client.

DHCP中繼是指將透過一個介面接收到的DHCP請求轉送到另一個網路上的DHCP伺服器。當DHCP伺服器與客戶端不在相同廣播網域時，此功能非常有用。

The dhcrelay service supports both DHCPv4 and DHCPv6 and can forward requests to multiple upstream servers. It is lightweight and suitable for setups where centralized DHCP servers serve multiple network segments.

dhcrelay 服務同時支援 DHCPv4 和 DHCPv6，並且可以將請求轉送到多個上游伺服器。它輕量級，適用於集中式DHCP伺服器服務多個網段的部署環境。

Note

筆記

DHCrelay binds to port 67 like other available DHCP servers. To run multiple servers side by side, use strict interface binding if available.

DHCrelay 與其他可用的DHCP伺服器一樣綁定到 67 埠。若要並排運行多個伺服器，請盡可能使用嚴格的介面綁定。

## Reservations｜預訂

ISC, KEA and Dnsmasq offer the possibility to reserve an IP address for a specific client. This is useful when a client needs to have the same IP address every time it connects to the network. All services also offer the ability to define reservations inside and outside of the assigned pool of dynamic IP addresses.

ISC, KEA和 Dnsmasq 都允許為特定客戶端預留IP位址。當客戶端每次連接網路都需要使用相同的IP位址時，此功能非常有用。所有服務也允許在動態IP地址池內外定義預留地址。

For **Dnsmasq**, you should define reservations **inside of the pool**. The IP address will be completely reserved inside the dynamic range, meaning the reserved IP will not be offered to dynamic clients.

對於 **Dnsmasq**，您應該在**位址池內**定義預留位址。 IP 位址將在動態範圍內完全保留，這表示保留的 IP 位址不會提供給動態用戶端。

For **ISC and KEA**, you should only define reservations **outside of the pool**. Unless you can guarantee that this client is online at all times when the reservation is in the dynamic range, the DHCP server is free to offer this IP address to a different client when the first client goes offline.

對於 **ISC和KEA**，您應該只在**池外**定義預留地址。除非您能保證該用戶端在預留位址處於動態範圍期間始終在線，否則當第一個用戶端離線時， DHCP伺服器可以將此IP位址提供給其他用戶端。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Services｜服務](<191 服務.md>)　｜　[下一篇：DHCrelay｜DH 繼電器 ➡](<193 DH 繼電器.md>)
