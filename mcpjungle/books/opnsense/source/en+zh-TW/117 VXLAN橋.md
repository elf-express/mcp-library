---
title: "VXLAN Bridge｜VXLAN橋"
title_original: "VXLAN Bridge"
source: "https://docs.opnsense.org/manual/how-tos/vxlan_bridge.html"
chapter: ["Interfaces","Setup Guides","Interfaces"]
order: 117
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:40.041Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：LAN Bridge｜LAN橋](<116 LAN橋.md>)　｜　[下一篇：Transparent Filtering Bridge｜透明過濾橋 ➡](<118 透明過濾橋.md>)

# VXLAN Bridge｜VXLAN橋

> 章節：[Interfaces](<000 目錄.md#c-19>) › [Setup Guides](<000 目錄.md#c-21>) › [Interfaces](<000 目錄.md#c-22>)

## [VXLAN Bridge](#id1)｜[VXLAN橋](#id1)

Index

索引

-   [VXLAN Bridge](#vxlan-bridge)  
    [VXLAN橋](#vxlan-bridge)
    
    -   [Summary](#summary)  
        [摘要](#summary)
        
    -   [Setup Overview](#setup-overview)  
        [設定概覽](#setup-overview)
        
    -   [Configuration](#configuration)  
        [配置](#configuration)
        
        -   [1\. Loopback Interface Setup](#loopback-interface-setup)  
            [1. 環回介面設定](#loopback-interface-setup)
            
        -   [2\. VPN Setup](#vpn-setup)  
            [2. VPN設定](#vpn-setup)
            
        -   [3\. VXLAN Interface](#vxlan-interface)  
            [3. VXLAN接口](#vxlan-interface)
            
        -   [4\. Bridging VXLAN and LAN](#bridging-vxlan-and-lan)  
            [4. 連接VXLAN和LAN](#bridging-vxlan-and-lan)
            
        -   [5\. Testing & Finalizing](#testing-finalizing)  
            [5. 測試與定稿](#testing-finalizing)
            

## [Summary](#id2)｜[摘要](#id2)

This guide covers the configuration of a VXLAN tunnel between two OPNsense firewalls connected via VPN. This enables Layer 2 communication over Layer 3 networks and can introduce various challenges. Layer 2 tunneling should only be used when necessary, as routing is usually the best option for Layer 3 networks.

本指南介紹如何在透過VPN連接的兩台OPNsense防火牆之間配置VXLAN隧道。這實現了在三層網路上進行二層通信，但也可能帶來一些挑戰。二層隧道僅應在必要時使用，因為路由通常是三層網路的最佳選擇。

Here are some general use cases:

以下是一些常見應用場景：

-   Use the same IP addresses and internet breakout on multiple sites  
    在多個站點上使用相同的IP地址和互聯網分割畫面
    
-   Provide external IP addresses to a different site without routing  
    無需路由即可向不同站點提供外部IP位址
    
-   Connect devices that communicate via broadcasts  
    連接透過廣播進行通訊的設備
    
-   Share Layer 2 protocols such as STP and DHCP  
    共享第 2 層協議，例如STP和DHCP
    
-   Transmit routing protocols like OSPF  
    傳輸路由協議，例如OSPF
    

Attention

注意

-   A large broadcast domain will create more broadcast and multicast traffic. This can quickly saturate WAN links since it will be exchanged over the internet with Layer 2 tunneling  
    較大的廣播域會產生更多的廣播和群播流量。由於這些流量將透過二層隧道在互聯網上交換，因此很快就會使WAN鏈路飽和。
    
-   Switches need special attention. Layer 2 protocols like STP will now be shared over the VXLAN tunnel. The Switch should filter specific Layer 2 protocols to prevent improper STP convergence. DHCP could also be filtered with the Switch, so different DHCP servers can be used  
    開關需要特別注意。像 STP 這樣的第 2 層協定現在將透過 VXLAN 隧道共享。交換器應過濾特定的第 2 層協議，以防止不當的STP 收斂。 DHCP也可以透過Switch進行過濾，因此可以使用不同的DHCP伺服器
    
-   Bridges, VXLAN and VPN introduce overhead, which can increase CPU usage and limit bandwidth. This configuration is not suitable for high-throughput environments where gigabits of traffic are required  
    橋接器VXLAN和VPN會引入額外開銷，這會增加CPU使用率並限制頻寬。這種配置不適用於需要千兆級流量的高吞吐量環境。
    
-   If e.g., Site B uses the bridged LAN as their main network, all traffic will be sent to Site A for routing and breakout to the internet. Please be aware of the implications  
    例如，如果站點 B 使用橋接的LAN作為其主網絡，則所有流量都將發送到站點 A 進行路由並最終接入互聯網。請注意其影響。
    

See the section on [VXLAN](<107 裝置.md#vxlan>) for more details.

有關更多詳細信息，請參閱 [VXLAN](<107 裝置.md#vxlan>)部分。

## [Setup Overview](#id3)｜[設定概覽](#id3)

In this setup example, there are two OPNsense firewalls - Site A and Site B - that should communicate over the internet via Layer2.

在這個設定範例中，有兩個 OPNsense 防火牆——站點 A 和站點 B——它們應該透過互聯網上的第 2 層進行通訊。

Since VXLAN is not encrypted, a VPN should be used to secure the connection. IPsec or Wireguard are recommended, since they can create simple point to point VPNs between loopback interfaces.

由於VXLAN未加密，因此應使用VPN來保護連接。建議使用IPsec或WireGuard，因為它們可以在環回介面之間建立簡單的點對點VPN。

| **Interface**<br>**介面** | **Site A**<br>**網站 A** | **Site B**<br>**網站 B** |
| --- | --- | --- |
| WAN | 203.0.113.1/32 | 198.51.100.2/32 |
| lo1 | 172.16.88.1/32 | 172.16.88.2/32 |
| bridge0 | 192.168.10.1/24 | 192.168.10.2/24 |
| vxlan1 | IPv4 None<br>IPv4 無 | IPv4 None<br>IPv4 無 |
| LAN | IPv4 None<br>IPv4 無 | IPv4 None<br>IPv4 無 |

## [Configuration](#id4)｜[配置](#id4)

### [1\. Loopback Interface Setup](#id5)｜[1. 環回介面設定](#id5)

-   Go to Interfaces ‣ Devices ‣ Loopback and add `lo1` on both Sites  
    轉到“介面”‣“設備”‣“環回”，並在兩個站點上都新增`lo1`
    
-   Go to Interfaces ‣ Assignments and assign `lo1`  
    轉到“接口”‣“分配”並分配`lo1`
    
-   Enable `lo1` and set a static IPv4 configuration:  
    啟用`lo1`並設定靜態IPv4配置：
    
    > -   Site A: 172.16.88.1/32  
          A站點： 172.16.88.1/32
    >     
    > -   Site B: 172.16.88.2/32  
          B站點： 172.16.88.2/32
    >     
    

Note

注意事項

These loopback interfaces will be used for the VXLAN source and remote addresses. Loopback interfaces are always available for service binding during boot.

這些環回介面將用於VXLAN來源位址和遠端位址。啟動期間，環回介面始終可用於服務綁定。

### [2\. VPN Setup](#id6)｜[2. VPN設定](#id6)

The `lo1` interfaces on both firewalls must be connected via VPN. In this example, the VPN will use the endpoint IPs 203.0.113.1/32 (Site A) and 198.51.100.2/32 (Site B). This can be achieved with:

兩個防火牆上的`lo1`介面必須透過VPN連接。在本例中， VPN將使用端點 IP 位址203.0.113.1/32 （站點 A）和198.51.100.2/32 （站點 B）。這可以透過以下方式實現：

> -   A policy-based IPsec tunnel, including the loopback IPs in Phase 2 Children:  
      基於政策的 IPsec 隧道，包括第二階段子節點中的環回 IP 位址：
>     
>     > -   172.16.88.1/32 on Site B
>
>     > - 172.16.88.1/32在 B 站點
>     >     
>     > -   172.16.88.2/32 on Site A
>
>     > - 172.16.88.2/32在 A 站點
>     >     
>     
> -   A WireGuard tunnel without a Tunnel address, including the loopback IPs in Allowed IPs:  
      WireGuard 隧道沒有隧道位址，但允許的 IP 位址中包含了環回 IP 位址：
>     
>     > -   172.16.88.1/32 on Site B
>
>     > - 172.16.88.1/32在 B 站點
>     >     
>     > -   172.16.88.2/32 on Site A
>
>     > - 172.16.88.2/32在 A 站點
>     >     
>     
> -   Any other VPN protocol since VXLAN is VPN agnostic  
      任何其他VPN協議，因為VXLAN與VPN無關
>     

Create Firewall rules that allow VXLAN (UDP/4789) and ICMP traffic for:

建立防火牆規則，允許VXLAN ( UDP /4789 ) 和ICMP流量通過：

> -   Firewall ‣ Rules ‣ IPsec (or Wireguard)  
      防火牆 ‣ 規則 ‣ IPsec（或 Wireguard）
>     

The tunnel should now route traffic between the two loopback interfaces:

現在，隧道應該可以在兩個環回介面之間路由流量：

> -   Go to Interfaces ‣ Diagnostics ‣ Ping  
      轉到“接口”‣“診斷”‣“Ping”
>     
> -   Test connectivity by pinging the loopback interfaces across the tunnel. Use the `lo1` interface address as source address.  
      透過 ping 隧道上的環回介面來測試連通性。使用`lo1`介面位址作為來源位址。
>     

### [3\. VXLAN Interface](#id7)｜[3. VXLAN接口](#id7)

-   Go to Interfaces ‣ Devices ‣ VXLAN and create `vxlan1` interfaces:  
    到「介面」‣「設備」 VXLAN ，然後建立`vxlan1`介面：
    

| **Option**<br>**選項** | **Site A**<br>**網站 A** | **Site B**<br>**網站 B** |
| --- | --- | --- |
| VNI | 1 | 1 |
| Source address<br>來源位址 | 172.16.88.1/32 | 172.16.88.2/32 |
| Remote address<br>遠端位址 | 172.16.88.2/32 | 172.16.88.1/32 |
| Multicast group<br>組播群組 | leave empty<br>留空 | leave empty<br>留空 |
| Device<br>設備 | None<br>無 | None<br>無 |

-   Go to Interfaces ‣ Assignments and assign `vxlan1`.  
    轉到接口‣分配並分配`vxlan1` 。
    

Note

注意事項

Do not assign IP addresses to the `vxlan1` interfaces.

不要將IP位址分配給`vxlan1`介面。

### [4\. Bridging VXLAN and LAN](#id8)｜[4. 連接VXLAN和LAN](#id8)

Attention

注意

Connecting Layer2 broadcast domains can cause service interruptions.

連接二層廣播域可能會導致服務中斷。

-   Remove the IP configuration from `LAN`, it will be moved to `bridge0`  
    從`LAN`中移除IP配置，它將被移到`bridge0`
    
-   Go to Interfaces ‣ Devices ‣ Bridge and create `bridge0` interfaces:  
    轉到“介面”‣“設備”‣“橋接”，然後建立`bridge0`介面：
    

| **Option**<br>**選項** | **Site A**<br>**網站 A** | **Site B**<br>**網站 B** |
| --- | --- | --- |
| Member interfaces<br>成員介面 | `LAN, vxlan1` | `LAN, vxlan1` |
| Description<br>描述 | `bridge0` | `bridge0` |
| Link-local address<br>連結本地位址 | Check if using IPv6<br>檢查是否使用 IPv6 | Check if using IPv6<br>檢查是否使用 IPv6 |

-   Bridge specific tunables must set for the packet filter: [LAN Bridge](<116 LAN橋.md#step-six>)  
    必須為封包過濾器設定橋接特定可調參數：[LAN橋接](<116 LAN橋.md#step-six>)
    
-   Assign and enable `bridge0` and set IPv4 addresses in the same subnet:  
    分配並啟用`bridge0` ，並在同一子網路中設定IPv4位址：
    
    > -   Site A: 192.168.10.1/24  
          A 點： 192.168.10.1/24
    >     
    > -   Site B: 192.168.10.2/24  
          B站點： 192.168.10.2/24
    >     
    
-   Create firewall rules to allow traffic between the bridged interfaces:  
    建立防火牆規則，允許橋接介面之間的流量：
    
    > -   These rules must allow LAN to LAN traffic, e.g., source 192.168.10.0/24 to destination 192.168.10.0/24.  
          這些規則必須允許LAN到LAN流量，例如，源192.168.10.0/24到目標192.168.10.0/24 。
    >     
    > -   Starting with an any allow rule and restricting it after logging is recommended.  
          建議先設定允許所有操作的規則，然後在記錄日誌後進行限制。
    >     
    
-   If experiencing packet fragmentation issues, set the MTU to 1380 and MSS to 1320 on the `bridge0` interfaces. This ensures packets are appropriately sized for the combined overhead from VXLAN and the VPN tunnel. This should not be needed if PMTU (Path MTU Discovery) works correctly. It is essential that ICMP is allowed.  
    如果遇到封包分片問題，請在`bridge0`介面上將MTU設定為 1380，將MSS設定為 1320。這樣可以確保封包大小適合VXLAN和VPN隧道合併的開銷。如果PMTU （路徑MTU發現）工作正常，則無需進行此操作。必須允許ICMP連接。
    

Note

注意事項

Only the main Site should be the DHCP server on `bridge0`. If you want to use different DHCP servers per Site, use external ones and block the DHCP packets on your managed switch before they enter the OPNsense `LAN` interface. Ensure that no IP address conflicts emerge with separate pools in the same IP address space.

只有主站點應該使用`bridge0`上的DHCP伺服器。如果您想為每個網站使用不同的DHCP伺服器，請使用外部伺服器，並在封包進入 OPNsense `LAN`介面之前，在您的管理交換器上封鎖DHCP封包。確保同一IP位址空間內的不同位址池之間不會出現IP位址衝突。

Tip

提示

To prevent traffic of being initially Source NATed and sent out of the default gateway when the VXLAN tunnel is not yet up, an outbound no-nat rule on the WAN interface can be implemented matching internal IP networks that are sent via VXLAN.

為了防止流量在VXLAN隧道尚未建立時被初始來源NAT並從預設閘道發送出去，可以在WAN介面上實施出站no-nat規則，以符合透過VXLAN發送的內部IP網路。

### [5\. Testing & Finalizing](#id9)｜[5. 測試與定稿](#id9)

Tip

提示

For this step, using [Packet Capture](<114 診斷.md#packet-capture>) is recommended.

建議在此步驟中使用 [資料包擷取](<114 診斷.md#packet-capture>) 。

1.  Test connectivity by pinging between the IP addresses of `bridge0`  
    透過 ping IP的`bridge0`位址來測試連通性
    
2.  Use Packet Capture to see if the ARP protocol has the same broadcasts on both `bridge0` interfaces  
    使用資料包擷取功能查看ARP協定在兩個`bridge0`介面上是否具有相同的廣播。
    
3.  Go to Interfaces ‣ Diagnostics ‣ ARP Table and check if MAC addresses from both Sites have been learned  
    前往“介面”‣“診斷”‣ ARP表”，並檢查是否已學習到兩個網站的MAC位址
    
4.  Ping directly between hosts through the VXLAN tunnel. Check with Packet Capture if ARP resolves the MAC addresses of these hosts and adds them into their ARP tables  
    透過VXLAN隧道直接在主機之間進行Ping測試。使用封包擷取檢查ARP是否解析了這些主機的MAC位址，並將它們加入各自的ARP表中。
    
5.  Test the maximum packet size when pinging through the tunnel by specifying custom packet sizes and setting the do not fragment flag  
    透過指定自訂資料包大小並設定不分片標誌，測試通過隧道 ping 時的最大資料包大小。
    
6.  Use tools like tcpdump or Wireshark directly on the hosts and initiate traffic to and from destinations to either Site  
    直接在主機上使用 tcpdump 或 Wireshark 等工具，並向任一站點啟動與目標位址之間的流量。
    
7.  Test the performance between Site A and Site B with iperf3. If it is very slow, check the MTU/MSS settings, WAN link speed and CPU usage  
    使用 iperf3 測試站點 A 和站點 B 之間的效能。如果速度非常慢，請檢查MTU/MSS設定、 WAN鏈路速度和CPU使用情況。
    

Note

注意事項

These are some of the basic tests. If there are issues revisit each step of this setup guide. Since Layer 2 over Layer 3 tunnels can be brittle, there are a multitude of issues that often need to be resolved by network experts. When issues can not be resolved, using Layer 3 VPN routing between Sites is the best and most stable alternative.

這些是一些基本測試。如果出現問題，請重新檢查本設定指南的每個步驟。由於二層隧道跨越三層隧道可能比較脆弱，因此經常會出現許多問題，需要網路專家來解決。如果問題無法解決，則在站點之間使用三層路由VPN是最佳且最穩定的替代方案。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：LAN Bridge｜LAN橋](<116 LAN橋.md>)　｜　[下一篇：Transparent Filtering Bridge｜透明過濾橋 ➡](<118 透明過濾橋.md>)
