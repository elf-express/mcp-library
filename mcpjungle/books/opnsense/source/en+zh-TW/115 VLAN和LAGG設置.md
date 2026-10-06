---
title: "VLAN and LAGG Setup｜VLAN和LAGG設置"
title_original: "VLAN and LAGG Setup"
source: "https://docs.opnsense.org/manual/how-tos/vlan_and_lagg.html"
chapter: ["Interfaces","Setup Guides","Interfaces"]
order: 115
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:32:38.363Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Diagnostics｜診斷](<114 診斷.md>)　｜　[下一篇：LAN Bridge｜LAN橋 ➡](<116 LAN橋.md>)

# VLAN and LAGG Setup｜VLAN和LAGG設置

> 章節：[Interfaces](<000 目錄.md#c-19>) › [Setup Guides](<000 目錄.md#c-21>) › [Interfaces](<000 目錄.md#c-22>)

## [VLAN and LAGG Setup](#id1)｜[VLAN和LAGG設定](#id1)

**Summary**

**概括**

Connect your OPNsense Appliance successfully to a Managed Switch using OSI Layer 2 protocols like LAGG and VLAN.

使用OSI和LAGG等 2 層協議VLAN將 OPNsense 設備成功連接到管理型交換器。

Index

索引

-   [VLAN and LAGG Setup](#vlan-and-lagg-setup)  
    [VLAN和LAGG設定](#vlan-and-lagg-setup)
    
    -   [Introduction](#introduction)  
        [引言](#introduction)
        
    -   [Setup Overview](#setup-overview)  
        [設定概覽](#setup-overview)
        
    -   [Configuration](#configuration)  
        [配置](#configuration)
        
        -   [1\. Setup LAGG Interface (optional)](#setup-lagg-interface-optional)  
            [1. 設定LAGG介面（選購）](#setup-lagg-interface-optional)
            
        -   [2\. Add VLAN Interfaces](#add-vlan-interfaces)  
            [2. 新增VLAN介面](#add-vlan-interfaces)
            
        -   [3\. Create Networks on VLANs](#create-networks-on-vlans)  
            [3. 在 VLAN 上建立網路](#create-networks-on-vlans)
            

## [Introduction](#id2)｜[引言](#id2)

A VLAN (Virtual Local Area Network) allows to create separate Layer 2 networks within the same physical switch. This means you can segment a single physical network into multiple logical networks, keeping different groups of devices isolated from each other even though they are connected to the same switch.

VLAN （虛擬區域網路）允許在同一台實體交換器內建立獨立的二層網路。這表示您可以將單一實體網路劃分為多個邏輯網絡，即使連接到同一台交換機，也能將不同的裝置群組彼此隔離。

VLAN are usually categorized as tagged and untagged:

VLAN通常分為已標記和未標記兩類：

-   **Tagged VLAN:** Frames are sent with VLAN tags embedded in them. This allows multiple VLANs to be carried over a single network link, typically between switches or VLAN-aware devices. Tagged VLANs are used on **trunk ports** to identify which frame belongs to which VLAN.  
    **有標籤的VLAN ：**幀中嵌入了VLAN標籤。這使得多個 VLAN 可以透過單一網路連結承載，通常用於交換器或VLAN支援的設備之間。帶標籤的 VLAN 用於**幹線連接埠**，以識別哪個訊框屬於哪個VLAN 。
    
-   **Untagged VLAN:** Frames are sent without VLAN tags. The switch port assigns incoming untagged frames to a default VLAN. Untagged VLANs are typically used on **access ports** connected to end devices that are not VLAN-aware, such as computers.  
    **未標記VLAN ：**幀發送時不含VLAN標籤。交換器連接埠會將傳入的未標記訊框指派給預設的VLAN 。未標記 VLAN 通常用於連接到不支援VLAN的終端設備（例如電腦）的**存取連接埠**。
    

Each VLAN will represent its own isolated network, connected by a VLAN-aware router like the OPNsense. Traffic that should cross VLAN boundaries must be routed and controlled via firewall rules. This is known as Inter-VLAN-Routing.

每個VLAN都代表一個獨立的網絡，透過支援VLAN的路由器（例如OPNsense）連接。需要跨越VLAN邊界的流量必須透過防火牆規則進行路由與控制。這稱為VLAN間路由。

Note

注意事項

Not all switches support VLANs. Unmanaged Switches only provide basic functionality. Managed Switches will support features like Link Aggregation (with LACP mode) and VLAN needed for this setup.

並非所有交換器都支援 VLAN。非網管型交換器僅提供基本功能。網管型交換器則支援鏈路聚合（使用LACP模式）和VLAN等功能，這些功能是此設定所必需的。

Attention

注意

Do not mix tagged and untagged VLANs on the trunk connecting the OPNsense Appliance and the Managed Switch. Side effects include leaking Router Advertisements, DHCP, CARP and other broadcasts between tagged and untagged VLANs. This depends on the brand of the deployed switch, so avoiding untagged frames for trunk ports is the safest method. Additionally, the interface statistics of the untagged VLAN would show all traffic, which can be confusing.

請勿在連接 OPNsense 設備和管理型交換器的中繼鏈路上混用已標記和未標記的 VLAN。這樣做可能會導致已標記和未標記 VLAN 之間洩漏路由器通告、 DHCP, CARP和其他廣播。具體情況取決於部署交換器的品牌，因此避免在中繼埠上使用未標記訊框是最安全的方法。此外，未標記的VLAN介面統計資料會顯示所有流量，這可能會造成混淆。

Attention

注意

Do not use a bridge interface to connect multiple ports to the same switch as this will create a network loop. Use a Layer 2 Link Aggregation protocol (LAGG) with LACP instead.

請勿使用橋接介面將多個連接埠連接到同一交換機，因為這會造成網路環路。請改用二層鏈路聚合協定（ LAGG ）和LACP 。

This guide will explain the best practice approach. Since switches from different vendors offer divergent configuration paths, only a guideline can be provided.

本指南將闡述最佳實務方法。由於不同廠商的交換器配置路徑各不相同，因此只能提供指導原則。

## [Setup Overview](#id3)｜[設定概覽](#id3)

In our basic setup, we have a Managed Switch and an OPNsense Appliance.

我們的基本配置包括一個管理型交換器和一個 OPNsense 設備。

We need isolate:

我們需要隔離：

> -   a LAN network with PCs, we assigned VLAN 5  
      在包含 PC 的LAN網路中，我們分配了VLAN 5。
>     
> -   a DMZ network with Web Servers, we assigned VLAN 20  
      我們為包含 Web 伺服器的DMZ網路分配了VLAN 20
>     
> -   a GUEST network with clients connecting to a Guest Wifi, we assigned VLAN 33  
      對於一個客戶端連接到訪客 Wi-Fi 的GUEST網絡，我們分配了VLAN 33
>     

The OPNsense and the Switch are either connected with a single network cable, or with multiple network cables via Link Aggregation. The Port Mode describes the configuration of the Managed Switch ports.

OPNsense 和交換器可以透過單一網路線連接，也可以透過連結聚合使用多根網路線連接。連接埠模式描述了管理型交換器連接埠的配置。

| VLAN Tagged<br>VLAN已標記 | VLAN Untagged<br>VLAN未標記 | Port Mode<br>埠模式 | Device<br>設備 |
| --- | --- | --- | --- |
| 5,20,33 | None<br>無 | Trunk<br>中繼 | Switch <-> OPNsense<br>交換器 <-> OPNsense |
| None<br>無 | 5 | Access<br>存取 | Switch <-> PC01<br>交換器 <-> PC01 |
| None<br>無 | 5 | Access<br>存取 | Switch <-> PC02<br>交換器 <-> PC02 |
| None<br>無 | 20 | Access<br>存取 | Switch <-> WebServer01<br>交換器 <-> WebServer01 |
| 33 | 5 | Trunk<br>中繼 | Switch <-> AccessPoint01<br>交換器 <-> 接入點01 |
| 33 | 5 | Trunk<br>中繼 | Switch <-> AccessPoint02<br>交換器 <-> 接入點02 |

Tip

提示

Most Access Points require their management network to be untagged, and additional SSIDs like Guest Wifi to be tagged. The trunk from Managed Switch to Access Point has to be configured in a mixed mode with an untagged (default) VLAN and a tagged VLAN. This is in contrast to the trunk that is connected to the OPNsense, which has no untagged (default) VLAN.

大多數存取點要求其管理網路不進行標記，而其他 SSID（例如訪客 Wi-Fi）則需要進行標記。從管理型交換器到存取點的中繼連結必須配置為混合模式，包含一個不進行標記（預設）的VLAN和一個進行標記的VLAN 。這與連接到 OPNsense 的中繼連結不同，後者沒有不進行標記（預設）的VLAN 。

Tip

提示

The Access Port of a Managed Switch will tag ingress frames with its configured VLAN, and strip egress frames of VLAN tags.

管理型交換器的接入埠將使用其配置的VLAN標記入站幀，並剝離出站幀的VLAN標記。

Tip

提示

It is good practice to configure the ports of a Managed Switch only with VLANs that are needed for that specific port or LAGG. This is called manual VLAN Pruning.

最佳實務是僅使用特定連接埠或LAGG所需的VLAN來配置管理型交換器的連接埠。這稱為手動VLAN修剪。

## [Configuration](#id4)｜[配置](#id4)

### [1\. Setup LAGG Interface (optional)](#id5)｜[1. 設定LAGG介面（選購）](#id5)

See the section on [LAGG](<107 裝置.md#lagg>) for more details.

有關更多詳細信息，請參閱 [LAGG](<107 裝置.md#lagg>)部分。

Note

注意事項

This step is optional. It will create an abstraction layer between the VLANs and the physical interfaces, making it easy to change or add more physical interfaces later. A LAGG can be created even with just a single member interface. If you have a simple office deployment, you can skip this step and use a physical interface directly.

此步驟為可選步驟。它會在 VLAN 和實體介面之間建立一個抽象層，方便日後變更或新增更多實體介面。即使只有一個成員接口，也可以創建LAGG 。如果您的部署環境較為簡單，則可以跳過此步驟，直接使用實體介面。

Attention

注意

The member interfaces of a LAGG must be unassigned before creation. Check in Interfaces ‣ Assignments and delete the assignment if necessary.

在創建LAGG之前，必須先取消分配其成員介面。請在「介面」‣「分配」中檢查，如有必要，請刪除指派。

-   Go to Interfaces ‣ Devices ‣ LAGG and add a new entry:  
    前往「介面」‣「裝置」 LAGG ，然後新增一個條目：
    

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| Parent<br>父級 | Choose one or more interfaces, e.g., `igc0` and `igc1`<br>選擇一個或多個接口，例如`igc0`和`igc1` |
| Proto<br>協定 | lacp (if your managed switch supports it)<br>lacp（如果您的管理型交換器支援） |
| Fast timeout<br>快速逾時 | Keep on default, disabled<br>保持預設設置，已停用 |
| Hash Layers<br>哈希層 | Set to same as switch, if unknown leave empty<br>設定為與開關相同，若未知則留空 |
| Description<br>描述 | `lagg0` |

Afterwards, create the same LAGG interface on the Managed Switch and assign one or more physical interfaces to it. Connect the OPNsense Appliance and the Managed Switch via one or multiple network cables to establish the link layer. Verify the status of the LAGG interface as up before continuing.

之後，在管理型交換器上建立相同的LAGG接口，並為其分配一個或多個實體接口。使用一條或多條網路線連接 OPNsense 設備和管理型交換機，以建立連結層連接。在繼續操作之前，請確認LAGG介面的狀態為「已啟用」。

### [2\. Add VLAN Interfaces](#id6)｜[2. 新增VLAN介面](#id6)

See the section on [VLAN](<107 裝置.md#vlan>) for more details.

有關更多詳細信息，請參閱 [VLAN](<107 裝置.md#vlan>)部分。

In our example setup we require tagged VLAN 5 (LAN), 20 (DMZ) and 33 (GUEST), and no untagged VLAN. If you skipped Step 1, create the VLAN directly on a physical interface like `igc0`.

在我們的範例設定中，我們需要標記的VLAN 5 ( LAN )、20 ( DMZ ) 和 33 ( GUEST )，且不需要未標記的VLAN 。如果您跳過了步驟 1，請直接在實體介面（例如`igc0`上建立VLAN 。

-   Go to Interfaces ‣ Devices ‣ VLAN and add new entries:  
    前往“介面”‣“設備” VLAN並新增條目：
    

| **Option**<br>**選項** | **LAN**<br>** LAN ** | **DMZ**<br>** DMZ ** | **GUEST**<br>** GUEST ** |
| --- | --- | --- | --- |
| Device<br>設備 | `vlan0.5` | `vlan0.20` | `vlan0.33` |
| Parent<br>家長 | `lagg0` | `lagg0` | `lagg0` |
| VLAN tag<br>VLAN標籤 | `5` | `20` | `33` |
| Description<br>描述 | `vlan0.5` | `vlan0.20` | `vlan0.33` |

-   Go to Interfaces ‣ Assignments and assign the new VLAN interfaces. The parent interface should stay unassigned. In rare cases, the parent interface can be assigned without a network configuration, to allow manual link speed overrides.  
    前往“介面”‣“分配”，指派新的VLAN介面。父接口應保持未分配狀態。在極少數情況下，可以在不進行網路配置的情況下指派父接口，以便手動調整鏈路速度。
    
-   On the Managed Switch, create the same tagged VLANs on the LAGG or physical interface. Make sure there is no Native-VLAN-ID or default VLAN on the trunk port that connects to the OPNsense.  
    在管理型交換器上，在LAGG或實體介面上建立相同的標記 VLAN。確保連接到 OPNsense 的 trunk 連接埠上沒有 Native- VLAN-ID或 default VLAN 。
    

Tip

提示

A good choice is using descriptive names for interfaces with a template like `interface_vlan_description`. In our example this results in `lagg0_vlan5_LAN`, `lagg0_vlan20_DMZ` and `lagg0_vlan33_GUEST`. This improves administration, especially in large setups with multiple interfaces being parents to different VLAN.

一個不錯的選擇是使用描述性的名稱來命名接口，例如使用類似`interface_vlan_description`的模板。在我們的範例中，這將產生`lagg0_vlan5_LAN`, `lagg0_vlan20_DMZ`和`lagg0_vlan33_GUEST` 。這有助於管理，尤其是在大型系統中，多個介面可能都是不同VLAN的父介面。

Tip

提示

If the Switch does not support removing the untagged VLAN from a trunk port, create a sacrificial VLAN that is used to blackhole untagged traffic. As example, set the Native-VLAN-ID or default VLAN of the trunk port to 3999, and do not reuse this VLAN tag elsewhere in the same Layer 2 network.

如果交換器不支援從乾線連接埠移除未標記的VLAN ，則建立一個犧牲的VLAN ，用於屏蔽未標記的流量。例如，將乾線連接埠的本地VLAN-ID或預設VLAN設定為3999，並且不要在同一二層網路中的其他位置重複使用此VLAN標籤。

### [3\. Create Networks on VLANs](#id7)｜[3. 在 VLAN 上建立網路](#id7)

Note

注意事項

The steps so far followed the OSI Layer Model:

到目前為止，所有步驟都遵循OSI分層模型：

1.  Connecting the Physical Layer (Layer 1) between OPNsense Appliance and Managed Switch  
    連接 OPNsense 設備和管理型交換器之間的實體層（第 1 層）。
    
2.  Creating the Data Link Layer (Layer 2) with LAGG (optional) and VLAN  
    使用LAGG （可選）和VLAN建立資料鏈結層（第 2 層）
    
3.  Configuring the Network Layer (Layer 3) by setting IP addresses on the VLAN interfaces  
    透過在VLAN介面上設定IP位址來設定網路層（第 3 層）。
    

To create connectivity between assigned VLAN interfaces via Inter-VLAN-Routing, configure a network on them. It is good practice to embed the VLAN IDs into the layer 3 networks, if possible.

若要透過VLAN間路由在已指派的VLAN之間建立連接，請在這些介面上設定網路。如果可能，最好將VLAN ID 嵌入到三層網路中。

| **Description**<br>**描述** | **lagg0\_vlan5\_LAN** | **lagg0\_vlan20\_DMZ** | **lagg0\_vlan33\_GUEST** |
| --- | --- | --- | --- |
| IPv4 Configuration Type<br>IPv4 設定類型 | `Static IPv4` | `Static IPv4` | `Static IPv4` |
| IPv4 address<br>IPv4 位址 | `192.168.5.1/24` | `192.168.20.1/24` | `192.168.33.1/24` |

Attention

注意

Each VLAN interface requires a unique IPv4 and/or IPv6 network, conflicts will prevent Inter-VLAN-Routing. If you plan multiple sites that should be connected via VPN, you can reuse the same VLAN IDs, yet use unique IPv4 networks for each site of your organization.

每個VLAN介面都需要一個唯一的IPv4和/或IPv6網絡，衝突會阻止VLAN介面間的路由。如果您打算透過VPN介面連接多個站點，您可以重複使用相同的VLAN介面ID，但為組織中的每個站點使用唯一的IPv4網路。

With VLANs configured, PCs in LAN, Web Servers in DMZ and Guest Wifi clients in GUEST are isolated, even though they are connected to the same switch.

設定 VLAN 後， LAN中的 PC、 DMZ中的 Web 伺服器和GUEST中的訪客 Wi-Fi 用戶端即使連接到相同交換機，也會被隔離。

The OPNsense is responsible to route packets between VLANs.

OPNsense 負責在 VLAN 之間路由資料包。

It is the default gateway in VLAN 5, 20 and 33. It will receive packets with destination IP addresses to the other locally connected networks, and route according to its routing table. Access can be controlled with Firewall Rules, essentially creating different [security zones](<153 安全區.md>).

它是VLAN 5、20 和 33 中的預設閘道。它將接收目標位址為IP其他本地連接網路的封包，並根據其路由表進行路由。可以透過防火牆規則控制訪問，本質上是創建不同的[安全區域](<153 安全區.md>) 。

Note

注意事項

Only routed traffic can be filtered by a central firewall. Devices in the same VLAN communicate directly by using ARP or NDP to discover their neighbors.

只有路由流量才能被中央防火牆過濾。同一VLAN中的設備透過使用ARP或NDP來發現其鄰居，從而直接通訊。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Diagnostics｜診斷](<114 診斷.md>)　｜　[下一篇：LAN Bridge｜LAN橋 ➡](<116 LAN橋.md>)
