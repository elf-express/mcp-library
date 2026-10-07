---
title: "DHCP"
source: https://docs.opnsense.org/manual/dhcp.html
chapter: ["Services"]
order: 192
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:33:19.090Z"
---


# DHCP


DHCP 用於自動為客戶端提供IP 位址（而非客戶端必須自行設定）。 DHCP 可用於 IPv4 和 IPv6 用戶端，分別稱為 DHCPv4 和 DHCPv6。

## 可用選項

有不同的DHCP伺服器/中繼可供選擇：

> -   [Dnsmasq](#dnsmasq-dhcp)（預設）
>     
> -   [KEA](#kea-dhcp)
>     
> -   [Dhcrelay](#dhcrelay)
>     
> -   [ISC](#isc-dhcp) (EOL)
>     

對於 DHCPv6，這些服務可以提供路由器通告：

> -   [radvd](<197 路由器廣告.md>)
>     
> -   [Dnsmasq](#dnsmasq-dhcp)
>     

### Dnsmasq DNS & DHCP

[Dnsmasq 手冊](<194 Dnsmasq DNS & DHCP.md>)

Dnsmasq 是一個輕量級的 DNS、路由器通告和 DHCP 伺服器。它旨在為LAN提供耦合的DNS和DHCP服務。 Dnsmasq 接受 DNS 查詢，並從小型本地快取中回答它們，或將它們轉發到真實的遞歸 DNS 伺服器。

dnsmasq DHCP 伺服器支援靜態位址分配和多個網路。它會自動發送一組合理的預設 DHCP 選項，並且可以配置為發送任何所需的 DHCP 選項集，包括供應商封裝的選項。

dnsmasq DHCPv6 伺服器提供與 DHCPv4 伺服器相同的功能集，此外，它還包括路由器通告和一個簡潔的功能，該功能允許為使用 DHCPv4 的用戶端命名，並且僅針對 IPv6 設定使用無狀態自動設定。支援從透過 DHCPv6 前綴委派動態委派的子網路進行位址分配（DHCPv6 和RA）。

提示

Dnsmasq 是適合中小型設定（少於 1000 個唯一客戶端）的完美 DNS & DHCP 伺服器。這是開箱即用的 DHCPv4、DHCPv6 和路由器通告的預設設定。

### KEA DHCP

[KEA說明書](<196 KEA DHCP.md>)

KEA 是由 ISC 開發的現代化、模組化、高效能 DHCP 伺服器，用於繼承傳統 ISC DHCP 伺服器。它支援 DHCPv4 和 DHCPv6，專為可擴展和高可用性環境而設計。

KEA 不包括 DNS 或路由器通告功能，通常與外部服務（例如 Unbound DNS 和 radvd 路由器通告守護程序）整合以提供全端 DNS/DHCP/RA 功能。

請注意，沒有透過 Unbound 實現動態 DNS 租賃註冊功能。

提示

KEA 是完美的 DHCP 伺服器，適用於中型到大型 HA 設定（超過 1000 個唯一客戶端）或需要透過 API 進行動態配置的環境。

### ISC DHCP

[ISC說明書](<195 ISC DHCP.md>)

ISC DHCP 是由互聯網系統聯盟 (ISC) 開發和維護的 DHCP 伺服器。它支援 DHCPv4 和 DHCPv6，多年來在各種系統和發行版中廣泛使用。

雖然它為靜態和動態位址分配提供了可靠的服務，但其整體架構和有限的可擴展性給現代、動態或高可用性環境帶來了挑戰。對ISC DHCP的支援已正式結束，並且在大多數設定中已完全被KEA DHCP取代。

注意

ISC DHCP 已停產，不再接收更新或安全修補程式。強烈建議遷移到KEA或Dnsmasq。

### DHC中繼

[DHC中繼手冊](<193 DHC中繼.md>)

DHCP 中繼是將一個介面上收到的 DHCP 請求轉送到另一網路上的 DHCP 伺服器。當 DHCP 伺服器與客戶端不在相同廣播網域時，這非常有用。

dhcrelay 服務同時支援 DHCPv4 和 DHCPv6，並且可以將請求轉送到多個上游伺服器。它是輕量級的，適合集中式 DHCP 伺服器為多個網段提供服務的設定。

注意事項

DHCrelay 與其他可用的 DHCP 伺服器一樣綁定到連接埠 67。若要並行運行多個伺服器，請使用嚴格的介面綁定（如果可用）。

## 預訂

ISC, KEA 和 Dnsmasq 提供為特定客戶端保留 IP 位址的可能性。當客戶端每次連接到網路時都需要具有相同的IP位址時，這非常有用。所有服務也提供在分配的動態IP位址池內部和外部定義預留的能力。

對於 **Dnsmasq**，您應該在池**內定義預留。的 IP 位址將在動態範圍內完全保留，這意味著保留 IP 不會提供給動態客戶。

對於 **ISC 和 KEA**，您應該只定義**池外** 的預留。除非您可以在動態範圍內保證該用戶端始終在線，否則當第一個客戶端離線時，DHCP伺服器可以自由地將此IP位址提供給其他用戶端。

---

