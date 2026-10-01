---
title: "ndp-proxy-go (Neighbor Discovery Proxy)｜ndp-proxy-go（鄰居發現代理）"
title_original: "ndp-proxy-go (Neighbor Discovery Proxy)"
source: "https://docs.opnsense.org/manual/ndp-proxy-go.html"
chapter: ["Community Plugins","Routing"]
order: 212
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:28.245Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Tayga NAT64 how-to｜Tayga NAT64使用方法](<211 Tayga NAT64使用方法.md>)　｜　[下一篇：Dynamic DNS｜動態DNS ➡](<213 動態DNS.md>)

# ndp-proxy-go (Neighbor Discovery Proxy)｜ndp-proxy-go（鄰居發現代理）

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Routing](<000 目錄.md#c-45>)

-   [Introduction](#introduction)  
    [簡介](#introduction)
    
-   [Installation](#installation)  
    [安裝](#installation)
    
-   [Proxy Settings](#proxy-settings)  
    [代理設定](#proxy-settings)
    
-   [Link Types](#link-types)  
    [連結類型](#link-types)
    
    -   [Ethernet Links](#ethernet-links)  
        [乙太網路連結](#ethernet-links)
        
    -   [Point-to-point Links](#point-to-point-links)  
        [點對點連結](#point-to-point-links)
        
-   [Example Setup](#example-setup)  
    [範例設定](#example-setup)
    
    -   [Settings](#settings)  
        [設定](#settings)
        
    -   [Firewall Rules](#firewall-rules)  
        [防火牆規則](#firewall-rules)
        
    -   [NAT Rules (Redirect DNS)](#nat-rules-redirect-dns)  
        [NAT規則（重定向DNS ）](#nat-rules-redirect-dns)
        
    -   [Router Advertisements](#router-advertisements)  
        [路由器廣告](#router-advertisements)
        
    -   [High Availability](#high-availability)  
        [高可用性](#high-availability)
        
-   [Logging](#logging)  
    [日誌記錄](#logging)
    

## [Introduction](#id1)｜[引言](#id1)

ndp-proxy-go is a userspace host-learning IPv6 Neighbor Discovery Proxy.

ndp-proxy-go 是使用者空間主機學習型 IPv6 鄰居發現代理程式。

It can proxy SLAAC on-link prefixes to several downstream interfaces by proxying neighbor discovery protocol (NDP), router advertisements (RA) and duplicate address detection (DAD). For each discovered client it installs host routes automatically.

它可以透過代理鄰居發現協定 ( SLAAC )、路由器通告 ( NDP ) 和重複位址來偵測 ( RA )，將連結前綴代理到多個下游介面。對於每個發現的用戶端DAD它會自動安裝主機路由。

If your ISP provides only a single dynamic /64 prefix via RA - or a static prefix that is not properly routed - you can use ndp-proxy-go to proxy and route this prefix to all devices on separate downstream interfaces to create Layer 3 isolation.

如果您的ISP僅透過RA提供一個動態 /64 前綴，或提供一個未正確路由的靜態前綴，則您可以使用 ndp-proxy-go 將此前綴代理並路由到單獨的下游介面上的所有設備，以建立第 3 層隔離。

The proxy handles privacy extension and changing prefixes gracefully; the setup is fully dynamic and self healing.

該代理伺服器能夠優雅地處理隱私擴展和更改前綴；該設定完全動態且具有自我修復功能。

For the ISP, it will look like the proxy itself owns all global unicast addresses (GUA) with its WAN facing MAC address.

對於ISP ，看起來就像代理本身擁有所有全域單播位址（ GUA ），其WAN面向MAC位址。

The proxy does not support NPTv6 deployments, as it will not map internal ULA to external GUA addresses.

該代理程式不支援 NPTv6 部署，因為它不會將內部ULA對應到外部GUA位址。

More technical details: [ndp-proxy-go](https://github.com/Monviech/ndp-proxy-go/blob/main/README.md)

更多技術細節：[ndp-proxy-go](https://github.com/Monviech/ndp-proxy-go/blob/main/README.md)

## [Installation](#id2)｜[安裝](#id2)

Install `os-ndp-proxy-go` from System ‣ Firmware ‣ Plugins.

從系統 ‣ 韌體 ‣ 插件安裝`os-ndp-proxy-go` 。

## [Proxy Settings](#id3)｜[代理設定](#id3)

**General**

**一般的**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Enable**<br>**啟用** | Enable or disable this service.<br>啟用或停用此服務。 |
| **Enable CARP failover**<br>**啟用CARP故障轉移** | If any CARP VHID on this node is in MASTER state the service will be started, otherwise stopped. As NDP is stateless, a short interruption of IPv6 connectivity must be expected during CARP transitions.<br>如果此節點上的任何CARP VHID處於MASTER狀態，則服務將啟動，否則將停止。由於NDP是無狀態的，因此在CARP轉換期間，IPv6 連線可能會短暫中斷。 |
| **Upstream interface**<br>**上行介面** | Choose the upstream interface which receives the external IPv6 prefix from the ISP. Usually, this is the WAN interface. Ethernet interfaces are fully supported, point-to-point (PPPoE) devices are experimental.<br>選擇從ISP接收外部IPv6前綴的上行介面。通常情況下，這是WAN接口。乙太網路介面完全支持，點對點（PPPoE）設備處於實驗階段。 |
| **Downstream interfaces**<br>**下游接口** | Choose one or multiple downstream interfaces which should proxy the upstream IPv6 prefix. Only ethernet interfaces are supported.<br>選擇一個或多個下游接口，這些接口將代理上游 IPv6 前綴。僅支援乙太網路介面。 |
| **Proxy router advertisements**<br>**代理路由器通告** | Proxy upstream RAs to downstream interfaces. Disable this if you use your own RA daemon.<br>將上游 RA 代理到下游介面。如果您使用自己的RA守護進程，請停用此功能。 |
| **Install host routes**<br>**安裝主機路由** | Automatically create host routes for discovered clients. Disabling this means you must manually handle all routing decisions.<br>自動為已發現的用戶端建立主機路由。停用此功能意味著您必須手動處理所有路由決策。 |
| **Static prefixes**<br>**靜態前綴** | Manually trust an IPv6 prefix for downstream learning. This is only needed in static IPv6 provider networks without usable RA information on the upstream interface.<br>手動信任用於下游學習的 IPv6 前綴。這僅在靜態 IPv6 提供者網路中需要，且上游介面上沒有可用的RA資訊。 |
| **Static routers**<br>**靜態路由器** | Manually trust an upstream router link-local address. This is only needed in static IPv6 provider networks without usable RA information on the upstream interface.<br>手動信任上游路由器的連結本地位址。這僅在靜態 IPv6 提供者網路中需要，因為上游介面上沒有可用的RA資訊。 |
| **Neighbor cache lifetime**<br>**鄰居快取生命週期** | Neighbor cache lifetime in minutes. This controls when stale clients, host routes and firewall aliases are cleaned up. When using a point-to-point interface as upstream, increasing this lifetime is necessary to not prematurely clean up routes.<br>鄰居快取生命週期（以分鐘為單位）。這控制何時清理過時的客戶端、主機路由和防火牆別名。當使用點對點介面作為上游時，必須增加此生命週期，以免過早清理路由。 |
| **Max learned neighbors**<br>**最大可學習鄰居數** | Maximum learned neighbors, increase for large networks.<br>最大可學習鄰居數，網路規模越大，該值越大。 |
| **Neighbor cache file**<br>**鄰居快取檔案** | Persist cache to file on service stop and load it on service start. Only neighbors with a valid cache lifetime are loaded. This helps on system reboots to minimize downtime of individual clients.<br>在服務停止時將快取保留到檔案並在服務啟動時載入它。僅加載具有有效快取生存期的鄰居。這有助於系統重新啟動以最大程度地減少單一客戶端的停機時間。 |
| **Max route operations**<br>**最大路由操作數** | Maximum route operations per second. Limits how fast routes are applied; excess operations are queued, not dropped.<br>每秒最大路由操作數。限制路由應用的速度；超出限制的操作會被排隊，而不是丟棄。 |
| **Max alias operations**<br>**最大別名操作次數** | Maximum firewall alias operations per second. Limits how fast aliases are populated; excess operations are queued, not dropped.<br>每秒防火牆別名操作次數上限。限制別名填充速度；超出限制的操作將被排隊，不會被丟棄。 |
| **Packet capture timeout**<br>**封包擷取逾時** | Controls CPU usage vs. NDP responsiveness. Lower values (e.g., 25 ms) minimize latency during cache refresh at the cost of more CPU. Higher values (100–250 ms) reduce CPU use but may introduce small latency spikes.<br>控制CPU使用率與NDP響應速度。較低的值（例如 25 毫秒）可最大限度地減少快取刷新期間的延遲，但會增加CPU使用率。較高的值（100–250 毫秒）可減少CPU使用率，但可能會引入少量延遲峰值。 |
| **Debug log**<br>**調試日誌** | Enable debug logging.<br>啟用調試日誌記錄。 |

**Aliases**

**別名**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Interface**<br>**介面** | Add IPv6 addresses to the firewall alias that belongs to this proxied interface. When choosing any, all IPv6 addresses will be added.<br>將 IPv6 位址新增至屬於此代理介面的防火牆別名。選擇“任意”時，將會新增所有 IPv6 位址。 |
| **Firewall alias**<br>**防火牆別名** | Choose an “external (advanced)” type alias from “Firewall - Aliases”. Whenever a client is discovered, the IPv6 address will be automatically added to the chosen alias. When the neighbor cache lifetime expires, the IPv6 address will be removed from the alias.<br>從「防火牆 - 別名」選擇「外部（進階）」類型別名。每當發現客戶端時，IPv6 位址都會自動新增到所選別名中。當鄰居快取生存期到期時，IPv6 位址將從別名中刪除。 |

## [Link Types](#id4)｜[連結類型](#id4)

The proxy supports different link types on the upstream interface with some important differences.

此代理程式在上游介面上支援不同的連結類型，這些連結類型之間存在一些重要的差異。

### [Ethernet Links](#id5)｜[乙太網路連結](#id5)

-   **WAN (upstream)**:  
    **WAN （上游）**：
    
    The upstream ethernet interface must be configured to allow SLAAC, so it can configure an IPv6 address and a default route to the ISP. Periodic router advertisements must be sent from the ISP to the WAN.

    必須配置上游乙太網路介面以允許SLAAC ，以便它可以設定IPv6位址和到ISP的預設路由。必須從ISP向WAN發送定期路由器通告。
    
-   **LAN (downstreams)**:  
    **LAN （下游）**：
    
    The downstream interfaces must be ethernet and configure a link-local address (LLA).

    下游接口必須是乙太網路接口，並配置鏈路本地地址（ LLA ）。
    

Using ethernet interfaces is the recommended setup for best performance, rapid host discovery and self-healing of IPv6 after firewall reboots. Since the ISP router will perform Neighbor Discovery (ND) for every unknown client GUA, the proxy can instantly relearn clients when they send any traffic to the internet.

為了獲得最佳效能、快速主機發現以及防火牆重啟後 IPv6 的自我修復，建議使用乙太網路介面。由於ISP會為每個未知客戶端執行GUA發現（ ND ），因此代理伺服器可以在客戶端向互聯網發送任何流量時立即重新學習客戶端。

Tip

提示

You can proxy the upstream prefix to any amount of downstream interfaces. Since this proxy includes DAD messages, IP address conflicts are unlikely to cause issues even in larger proxied networks or when using this with cloud providers.

您可以將上游前綴代理到任意數量的下游介面。由於此代理包含DAD訊息，因此即使在大型代理網路中或與雲端提供者一起使用時， IP位址衝突也不太可能導致問題。

### [Point-to-point Links](#id6)｜[點對點連結](#id6)

-   **WAN (upstream)**:  
    **WAN （上游）**：
    
    The upstream point-to-point interface must be configured to allow SLAAC, so it can configure an IPv6 address and a default route to the ISP. Periodic router advertisements must be sent from the ISP to the WAN.

    必須配置上游點對點介面以允許SLAAC ，以便它可以配置IPv6位址和到ISP的預設路由。必須從ISP向WAN發送定期路由器通告。
    
-   **LAN (downstreams)**:  
    **LAN （下游）**：
    
    The downstream interface must be ethernet and configure a link-local address (LLA).

    下游接口必須是乙太網路接口，並配置鏈路本地地址（ LLA ）。
    

The proxy includes experimental support for point-to-point upstream interfaces such as PPPoE. Unlike Ethernet links, a point-to-point link does not perform Neighbor Discovery (ND) for downstream GUAs. This has some important implications:

此代理包含對點對點上行介面（例如 PPPoE）的實驗性支援。與乙太網路連結不同，點對點連結不會為下行 GUA 執行鄰居發現 ( ND )。這會產生一些重要影響：

-   Only Router Solicitations (RS) are forwarded upstream.  
    只有路由器請求（ RS ）才會向上游轉送。
    
-   NS/NA forwarding is intentionally disabled on point-to-point links.  
    NS/NA在點對點鏈路上故意禁用轉送。
    
-   The cache-ttl must be increased, since there are less NA containing a GUA to learn from, otherwise routes might get removed prematurely.  
    必須增加 cache-ttl，因為包含GUA的NA的數量較少，否則路由可能會過早被刪除。
    

Attention

注意

If you receive a single /64 prefix via DHCPv6-PD on a PPPoE link, it must be terminated on a router **before** the proxy. This could be another OPNsense, or a device like a Fritzbox. The proxy does not listen and learn a prefix from DHCPv6. To use PPPoE as upstream, IPv6 configuration must be set to SLAAC.

如果透過 PPPoE 連結上的 DHCPv6 PD取得到單一 /64 前綴，則必須在代理伺服器**之前**的路由器上終止該前綴。這可以是另一個 OPNsense 設備，也可以是 Fritzbox 之類的設備。代理伺服器不會監聽和學習來自 DHCPv6 的前綴。若要使用 PPPoE 作為上行鏈路，必須將 IPv6 設定設定為SLAAC 。

Attention

注意

After a firewall reboot, IPv6 connectivity may be delayed until downstream clients perform SLAAC and DAD again. This is expected behavior on PPPoE, as the upstream (ISP) router never probes GUAs via Neighbor Discovery (ND) like on ethernet links. The behavior can be mitigated by using the Neighbor cache file option.

防火牆重新啟動後，IPv6 連線可能會延遲，直到下游客戶端再次執行SLAAC和DAD操作。這是 PPPoE 協定的預期行為，因為上游路由器 ( ISP ) 不會像乙太網路連結那樣透過鄰居發現 ( ND ) 來探測 GUA。可以透過啟用鄰居快取檔案選項來緩解此問題。

## [Example Setup](#id7)｜[範例設定](#id7)

Follow if you are a user with a router in a SLAAC only network (e.g. home, cloud VPS, mobile LTE/5G networks) In such a setup, your router will not receive a prefix delegation via DHCPv6-PD, but only set an on-link /64 prefix.

如果您是路由器位於SLAAC僅限網路（例如家庭、雲端VPS 、移動LTE /5G 網路）中的用戶，請遵循此步驟。在這種設定下，您的路由器不會透過 DHCPv6- PD接收前綴委派，而只會設定鏈路上的 /64 前綴。

### [Settings](#id8)｜[設定](#id8)

Go to Interfaces ‣ WAN and select SLAAC as IPv6 configuration.

前往介面 ‣ WAN並選擇SLAAC作為 IPv6 設定。

|   |   |
| --- | --- |
| **IPv6 Configuration Type**<br>**IPv6 配置類型** | `SLAAC` |

Save the settings.

儲存設定。

Go to Interfaces ‣ LAN and select link-local as IPv6 configuration.

轉到介面LAN ，然後選擇鏈路本地作為 IPv6 配置。

|   |   |
| --- | --- |
| **IPv6 Configuration Type**<br>**IPv6 配置類型** | `link-local` |

Save and apply the new interface settings.

儲存並套用新的介面設定。

Go to Services ‣ NDP Proxy ‣ Settings

前往「服務」 NDP代理‣設定

|   |   |
| --- | --- |
| **Enable**<br>**啟用** | `X` |
| **Upstream interface**<br>**上游介面** | `WAN` |
| **Downstream interfaces**<br>**下游介面** | `LAN` |
| **Proxy router advertisements**<br>**代理路由器廣告** | `X` |
| **Install host routes**<br>**安裝主機路由** | `X` |
| **Neighbor cache lifetime**<br>**鄰居快取生存期** | Increase when using a point-to-point upstream or when having a lot of clients with intermittent connectivity. This prevents routes and firewall aliases from being removed prematurely.<br>當使用點對點上游連線或存在大量間歇性連線客戶端時，應增加此值。這可以防止路由和防火牆別名過早被刪除。 |
| **Neighbor cache file**<br>**鄰居快取檔案** | `X` |

After applying the configuration, all devices in your LAN network will autogenerate a GUA with SLAAC and receive the router as their default gateway. Check the firewall rules on LAN if IPv6 is allowed to any destination. Verify the setup by pinging an IPv6 location on the internet.

設定完成後， LAN網路中的所有裝置將自動產生一個GUA ，並將路由器設定為其預設閘道。檢查LAN上的防火牆規則SLAAC確認是否允許IPv6存取任何目標位址。透過ping一個互聯網上的IPv6位址來驗證設定。

Note

筆記

In the default setup, Router Advertisements from the ISP are forwarded directly. Any other Router Advertisement daemons on the LAN interface must be disabled, for example in Services ‣ Router Advertisements and Services ‣ Dnsmasq DNS & DHCP.

在預設設定中，來自ISP的路由器通告將直接轉送。必須停用LAN介面上的任何其他路由器通告守護程序，例如在「服務」‣「路由器通告」和「服務」‣「Dnsmasq」 DNS & DHCP中。

Attention

注意

The default firewall aliases (e.g., LAN network) will not contain any proxied IPv6 addresses. Either follow the Firewall Rules example, or set the source to any in your default IPv6 allow rule.

預設防火牆別名（例如， LAN網路）不會包含任何代理程式的 IPv6 位址。您可以依照防火牆規則範例進行操作，或在預設 IPv6 允許規則中將來源位址設定為「任意」。

### [Firewall Rules](#id9)｜[防火牆規則](#id9)

The proxy supports populating firewall aliases with IPv6 addresses of learned clients. This can be used to only permit access to the internet, while blocking requests to other networks that also receive IPv6 addresses from the same on-link prefix.

此代理程式支援使用已學習到的用戶端 IPv6 位址填入防火牆別名。這可用於僅允許存取互聯網，同時阻止對其他也從相同鏈路前綴接收 IPv6 位址的網路的請求。

Since only learned clients are added, the alias will always have an up to date state that reflects the proxied interface.

由於只新增已學習的用戶端，因此別名將始終具有反映代理介面的最新狀態。

Note

筆記

The proxy only learns IPv6 addresses that are inside the WAN on-link prefix and only of clients it manages. After initial setup, it can take a few minutes until all clients have been learned.

代理伺服器僅學習連結前綴WAN內的IPv6位址，且僅學習其管理的客戶端的IPv6位址。初始設定完成後，可能需要幾分鐘才能學習到所有客戶端的IPv6位址。

-   Go to Firewall ‣ Aliases and create these aliases:  
    前往“防火牆”‣“別名”，建立以下別名：
    

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Name**<br>**名稱** | `ndp_proxy_global` (Will contain all learned IPv6 addresses)<br>`ndp_proxy_global` （將包含所有已學習的 IPv6 位址） |
| **Type**<br>**類型** | `External (advanced)` |

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Name**<br>**名稱** | `ndp_proxy_lan` (Will contain only LAN IPv6 addresses)<br>`ndp_proxy_lan` （僅包含LAN IPv6 位址） |
| **Type**<br>**類型** | `External (advanced)` |

-   Press **Apply**  
    按**申請**
    
-   Go to Services ‣ NDP Proxy ‣ Settings ‣ Aliases and map these two aliases so the proxy can populate them:  
    轉到“服務”‣ NDP代理‣設定‣別名，並將這兩個別名映射起來，以便代理可以填充它們：
    

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Interface**<br>**介面** | `any` |
| **Firewall alias**<br>**防火牆別名** | `ndp_proxy_global` |

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Interface**<br>**接口** | `LAN` |
| **Firewall alias**<br>**防火牆別名** | `ndp_proxy_lan` |

-   Press **Apply**  
    按**申請**
    
-   Go to Firewall ‣ Rules ‣ LAN and create a rule that allows Internet access, but denies communication with other segments in the same IPv6 prefix:  
    前往「防火牆」‣「規則」 LAN ，並建立一條允許存取網際網路但拒絕與相同 IPv6 前綴中的其他網段通訊的規則：
    

|   |   |
| --- | --- |
| **Action**<br>**行動** | Pass<br>通行證 |
| **Interface**<br>**接口** | LAN |
| **Direction**<br>**方向** | In<br>向 |
| **TCP/IP Version**<br>**TCP/IP版本** | IPv6 |
| **Protocol**<br>**協議** | Any<br>任意 |
| **Source**<br>**來源** | `ndp_proxy_lan` |
| **Source port**<br>**來源連接埠** | Any<br>任意 |
| **Invert Destination**<br>**反轉目的地** | `X` |
| **Destination**<br>**目的地** | `ndp_proxy_global` |
| **Destination port**<br>**目標連接埠** | Any<br>任意 |
| **Description**<br>**描述** | Allow IPv6 internet access for all LAN clients known by NDP Proxy<br>允許所有LAN NDP伺服器識別的用戶端透過 IPv6 存取網際網路 |

-   Press **Apply**  
    按**申請**
    

Tip

提示

If additional networks are proxied, just add more aliases (e.g., `ndp_proxy_vlan1`) and create the same rule on that interface.

如果需要代理其他網絡，只需添加更多別名（例如， `ndp_proxy_vlan1` ）並在該介面上創建相同的規則即可。

Tip

提示

If you need client specific aliases, take a look at the `MAC address` alias type in Firewall ‣ Aliases, which can dynamically track IPv4 and IPv6 addresses of a single client.

如果您需要客戶端特定的別名，請查看防火牆‣別名中的`MAC address`別名類型，它可以動態追蹤單一客戶端的IPv4和IPv6位址。

### [NAT Rules (Redirect DNS)](#id10)｜[NAT規則（重定向DNS ）](#id10)

NAT rules are only required if you want to redirect DNS requests to the local running Unbound server. Most ISPs will include DNS servers as RDNSS options in the RAs, which could circumvent the local DNS server.

只有當您想要將請求DNS到本地運行的 Unbound 伺服器時，才需要NAT規則。大多數 ISP 會在 RA 中包含DNS伺服器作為RDNSS選項，這可能會繞過本地DNS伺服器。

Since IPv6 requires a routable address as target, we will configure a loopback device.

由於 IPv6 需要可路由位址作為目標，我們將設定一個環回設備。

Go to Interfaces ‣ Devices ‣ Loopback and create a new loopback device:

轉到“介面”‣“設備”‣“環回”，然後建立一個新的環回設備：

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Device ID**<br>**設備ID** | `1` (automatic, if number is different just change description accordingly)<br>`1` （自動，如果編號不同，請相應地更改描述） |
| **Description**<br>**描述** | `lo1` |

-   Press **Apply**  
    按**申請**
    

Go to Interfaces ‣ Assignments and assign the new loopback device:

轉到“介面”‣“分配”，然後分配新的環回設備：

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Device**<br>**設備** | `lo1` |
| **Description**<br>**描述** | `lo1_DNS` |

-   Press **Add**  
    按下**新增**
    

Go to Interfaces ‣ lo1\_DNS and assign IP addresses to the loopback device:

轉到“介面”‣ lo1\_DNS，並將IP位址指派給環回設備：

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Enable**<br>**啟用** | `X` |
| **Description**<br>**描述** | `lo1_DNS` |
| **IPv6 Configuration Type**<br>**IPv6 配置類型** | `Static` |
| **IPv6 address**<br>**IPv6 位址** | `fd01::1/128` |

-   Press **Save**  
    按下**儲存**
    

Go to Firewall ‣ NAT ‣ Destination NAT (Port Forward) and create a NAT rule that redirects IPv6 DNS. We will use the same firewall aliases that have been created in the Firewall Rules step:

前往「防火牆」‣ NAT ‣ 目標NAT （連接埠轉送），並建立一條NAT規則，用於重定向 IPv6 DNS 。我們將使用在「防火牆規則」步驟中建立的相同防火牆別名：

|   |   |
| --- | --- |
| **Interface**<br>**接口** | LAN |
| **TCP/IP Version**<br>**TCP/IP版本** | IPv6 |
| **Protocol**<br>**協議** | TCP/UDP |
| **Source**<br>**來源** | `ndp_proxy_lan` |
| **Source Port**<br>**來源連接埠** | any<br>任意 |
| **Invert Destination**<br>**反轉目的地** | `X` |
| **Destination**<br>**目的地** | `ndp_proxy_global` |
| **Destination port**<br>**目的港** | DNS |
| **Redirect target IP**<br>**重定向目標IP** | `fd01::1` |
| **Redirect target port**<br>**重定向目標連接埠** | DNS |
| **Filter rule association**<br>**篩選規則關聯** | Pass<br>通過 |
| **Description**<br>**描述** | Redirect LAN IPv6 DNS requests to Unbound<br>將LAN IPv6 DNS請求重新導向到 Unbound |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

Attention

注意

Ensure that Unbound listens on port 53 and on all network interfaces, or the loopback device will not be included and IPv6 DNS will not work.

確保 Unbound 監聽連接埠 53 和所有網路接口，否則將不會包含環回設備，IPv6 DNS將無法​​運作。

Tip

提示

If additional networks are proxied, just add more aliases (e.g., `ndp_proxy_vlan1`) and create the same NAT rule on that interface. Alternatively, any could be used as source and destination, though this will match any traffic so be careful.

如果需要代理其他網絡，只需新增更多別名（例如`ndp_proxy_vlan1` ），並在該介面上建立相同的NAT規則。或者，也可以使用任意位址作為來源位址和目標位址，但這會符合所有流量，因此請謹慎操作。

### [Router Advertisements](#id11)｜[路由器廣告](#id11)

Per default, the proxy forwards Router Solicitations from downstream to upstream, and Router Advertisements from upstream to downstream. The only alterations are the sending MAC address, and the Source Link Layer (SLLA) option.

預設情況下，代理伺服器會將下游的路由器請求轉送到上游，並將上游的路由器通告轉送到下游。唯一需要修改的是發送位址MAC ）和來源連結層（ SLLA ）選項。

In most setups, the default is the best choice. In more complex environments, having full control over the RAs could be a requirement. The NDP proxy can be combined with [radvd](<197 路由器廣告.md>) to fulfill that requirement.

在大多數設定中，預設值是最佳選擇。在更複雜的環境中，可能需要對 RA 進行完全控制。 NDP代理可以與[radvd](<197 路由器廣告.md>)組合來滿足該要求。

Go to Services ‣ NDP Proxy ‣ Settings and disable Proxy router advertisements.

前往「服務」 NDP代理‣設置，然後停用代理路由器廣告。

Next go to Services ‣ Router Advertisements and create a new entry:

接下來，前往“服務”‣“路由器通告”，然後建立一個新條目：

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Enabled**<br>**已啟用** | `X` |
| **Interface**<br>**接口** | `LAN` |
| **Constructor**<br>**建構器** | `WAN` |

Now the LAN interface will send RAs advertising the prefix constructed from the WAN SLAAC address. You can set custom RDNSS and DNSSL options, or set a different mode to additionally use a DHCPv6 server.

現在， LAN介面將發送 RA 通告，該通告基於WAN SLAAC位址建構的前綴。您可以設定自訂的RDNSS和DNSSL選項，或設定不同的模式以額外使用 DHCPv6 伺服器。

### [High Availability](#id12)｜[高可用性](#id12)

To use the proxy in HA, enable the advanced mode in Services ‣ NDP Proxy ‣ Settings and toggle Enable CARP failover.

若要在HA中使用代理，請在「服務」‣ NDP 「代理」‣「設定」中啟用進階模式，並切換「啟用」 CARP 「故障轉移」。

The simplest is using Proxy router advertisements to proxy the RAs of the ISP. When using [radvd](<197 路由器廣告.md>) instead, advertise a CARP link-local address as source.

最簡單的方法是使用代理路由器通告來代理ISP的 RA。如果改用 [radvd](<197 路由器廣告.md>) ，則通告CARP鏈路本地位址作為來源位址。

Since Neighbor Discovery relies on a single link-layer router identity, a brief interruption may occur during failover while both the upstream ISP router and downstream clients relearn the router’s MAC address.

由於鄰居發現依賴單一鏈結層路由器身份，因此在故障切換期間可能會出現短暫中斷，因為上游ISP路由器和下游客戶端都需要重新學習路由器的MAC位址。

Tip

提示

If you use NAT to rewrite the DNS server, create the same loopback device as outlined in the NAT Rules (Redirect DNS) section on both Master and Backup with the same IPv6 address. That way, you can use the same IPv6 address as target in the NAT rule without a virtual IP address.

如果您使用NAT重寫DNS伺服器，請在主伺服器和備份伺服器上建立與NAT規則（重定向DNS ）部分所述相同的回環設備，並使用相同的 IPv6 位址。這樣，您就可以在NAT規則中使用相同的 IPv6 位址作為目標，而無需使用虛擬IP位址。

Attention

注意

Do not forget to add NDP Proxy to Services in System ‣ High Availability ‣ Settings and synchronize.

不要忘記將NDP Proxy 新增至系統 ‣ 高可用性 ‣ 設定中的服務並進行同步。

## [Logging](#id13)｜[日誌記錄](#id13)

With the debug logging you can find out the details of the proxies behavior.

透過偵錯日誌，您可以了解代理行為的詳細資訊。

You can see logs of received and sent RA, NDP (NS, NA) and DAD messages. If something does not work as expected, reading the log file is the first step to troubleshoot.

您可以查看已接收和已發送的RA, NDP （ NS, NA ）和DAD訊息的日誌。如果出現任何異常情況，查看日誌檔案是排查問題的第一步。

Go to Services ‣ NDP Proxy ‣ Settings

前往「服務」 NDP代理‣設定

|   |   |
| --- | --- |
| **Debug log**<br>**調試日誌** | `X` |

Apply this setting and go to Services ‣ NDP Proxy ‣ Log File

套用此設置，然後前往「服務」 NDP代理‣日誌文件

The proxy must learn the prefix from RAs:

代理必須從 RA 學習前綴：

> -   RA prefix learned: “::/64” (valid 2h0m0s)  
      RA已學習到前綴：「::/64」（有效期限 2 小時 0 分 0 秒）
>     
>     -   A prefix was learned from an RA on the upstream interface. Without this message appearing the proxy will not learn any addresses, and your downstream clients will most likely not receive RAs to autoconfigure SLAAC addresses.  
          從上游介面的RA中學習到了一個前綴。如果沒有出現此訊息，代理程式將無法學習任何位址，且您的下游用戶端很可能無法收到用於自動設定SLAAC位址的 RA（請求代理）。
>         
>     
> -   skip learn “IPv6 address” (not in allowed RA prefixes)  
      跳過學習“IPv6 位址”（不在允許的RA前綴中）
>     
>     -   No prefix was learned from RAs yet or there are clients with IPv6 addresses outside of the learned prefix. The proxy only caches neighbors in the prefixes it learned via RAs. This prevents the cache from being poisoned.  
          尚未從資源管理器 (RA) 學習到任何前綴，或存在 IPv6 位址不在已學習前綴範圍內的用戶端。代理伺服器僅快取透過資源管理器學習到的前綴範圍內的鄰居位址。這可以防止快取被污染。
>         
>     

The proxy must install host routes to target the individual downstream clients:

代理伺服器必須安裝主機路由，以定位各個下游客戶端：

> -   route installed: “IPv6 address” via eth0  
      已安裝路由：“IPv6 位址”，透過 eth0 介面
>     
>     -   A route was successfully installed, the client should be able to reach the internet now.  
          路由已成功安裝，客戶端現在應該可以存取網路了。
>         
>     
> -   route deleted: “IPv6 address”  
      已刪除路由：“IPv6 位址”
>     
>     -   A route was deleted, most likely the client was offline longer than the neighbor caching time, or it changed its IPv6 address via privacy extension.  
          路由被刪除，很可能是因為客戶端離線時間超過了鄰居快取時間，或者它透過隱私擴充更改了 IPv6 位址。
>         
>     
> -   route add err: exit status 1 (out: add host “IPv6 address”: gateway eth0 fib 0: route already in table)  
      路由新增錯誤：退出狀態 1（輸出：新增主機「IPv6 位址」：閘道 eth0 fib 0：路由已存在於表中）
>     
>     -   There is already a different route that would overlap with the one the proxy tries to install. To fix this ensure the prefix does not have static routes you manually configured, or turn off the automatic hoste route installation if you want to handle all routes manually.  
          已經存在一條與代理程式嘗試安裝的路由重疊的路由。若要解決此問題，請確保前綴中沒有您手動設定的靜態路由，或者如果您希望手動處理所有路由，請關閉自動主機路由安裝功能。
>         
>     

Attention

注意

The proxy does not clean up installed host routes when it is stopped. This is intentional to minimize downtime of IPv6 clients between service restarts. It does automatically prune routes while it runs when the `cache-ttl` of a discovered neighbor expires.

代理伺服器停止運作時不會清理已安裝的主機路由。這是為了最大限度地減少 IPv6 用戶端在服務重新啟動之間的停機時間。當發現的鄰居的`cache-ttl`過期時，代理伺服器會在運行時自動修剪路由。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Tayga NAT64 how-to｜Tayga NAT64使用方法](<211 Tayga NAT64使用方法.md>)　｜　[下一篇：Dynamic DNS｜動態DNS ➡](<213 動態DNS.md>)
