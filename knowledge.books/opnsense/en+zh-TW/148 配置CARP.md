---
title: "Configure CARP｜配置CARP"
title_original: "Configure CARP"
source: "https://docs.opnsense.org/manual/how-tos/carp.html"
chapter: ["Firewall"]
order: 148
lang: "bilingual"
translated_by: "gtx+google_v2"
captured: "2026-09-26T11:32:56.613Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Normalization｜正常化](<147 正常化.md>)　｜　[下一篇：Log Files｜紀錄檔案 ➡](<149 紀錄檔案.md>)

# Configure CARP｜配置CARP

> 章節：[Firewall](<000 目錄.md#c-26>)

-   [Overview](#overview)  
    [概述](#overview)
    
-   [Terminology](#terminology)  
    [術語](#terminology)
    
-   [Configuring CARP for IPv4](#configuring-carp-for-ipv4)  
    [正在設定CARP的 IPv4](#configuring-carp-for-ipv4)
    
    -   [Setup interfaces & basic firewall rules](#setup-interfaces-basic-firewall-rules)  
        [設定介面與基本防火牆規則](#setup-interfaces-basic-firewall-rules)
        
    -   [Setup Virtual IPs](#setup-virtual-ips)  
        [設定虛擬IP](#setup-virtual-ips)
        
    -   [Setup Source NAT](#setup-source-nat)  
        [設定源NAT](#setup-source-nat)
        
    -   [(optional) Setup DHCP server](#optional-setup-dhcp-server)  
        [（可選）設定DHCP伺服器](#optional-setup-dhcp-server)
        
    -   [Setup pfSync and HA sync (xmlrpc)](#setup-pfsync-and-ha-sync-xmlrpc)  
        [設定 pfSync 和HA同步 (xmlrpc)](#setup-pfsync-and-ha-sync-xmlrpc)
        
    -   [Finalize setup](#finalize-setup)  
        [完成設定](#finalize-setup)
        
    -   [Testing setup](#testing-setup)  
        [測試設定](#testing-setup)
        
    -   [Adding multiple CARP IPs](#adding-multiple-carp-ips)  
        [新增多個CARP IP](#adding-multiple-carp-ips)
        
    -   [Example: Updating a CARP HA Cluster](#example-updating-a-carp-ha-cluster)  
        [範例：更新CARP HA群集](#example-updating-a-carp-ha-cluster)
        
    -   [Example: Adding a virtual IP to an active VHID group](#example-adding-a-virtual-ip-to-an-active-vhid-group)  
        [範例：將虛擬IP加入活動VHID組](#example-adding-a-virtual-ip-to-an-active-vhid-group)
        
    -   [Resources](#resources)  
        [資源](#resources)
        
-   [Configuring CARP for IPv6](#configuring-carp-for-ipv6)  
    [正在設定CARP以支援 IPv6](#configuring-carp-for-ipv6)
    
    -   [Setup Virtual IPv6 Global Unicast Address](#setup-virtual-ipv6-global-unicast-address)  
        [設定虛擬 IPv6 全球單播位址](#setup-virtual-ipv6-global-unicast-address)
        
    -   [Setup Virtual IPv6 Link Local Address](#setup-virtual-ipv6-link-local-address)  
        [設定虛擬 IPv6 連結本地位址](#setup-virtual-ipv6-link-local-address)
        
    -   [Setup Router Advertisements](#setup-router-advertisements)  
        [設定路由器廣告](#setup-router-advertisements)
        
-   [Troubleshooting](#troubleshooting)  
    [故障排除](#troubleshooting)
    
    -   [General](#general)  
        [通用](#general)
        
    -   [Backup node cannot reach internet](#backup-node-cannot-reach-internet)  
        [備份節點無法連接到網際網路](#backup-node-cannot-reach-internet)
        
    -   [Split-brain](#split-brain)  
        [裂腦](#split-brain)
        
    -   [Interface errors](#interface-errors)  
        [介面錯誤](#interface-errors)
        
-   [Known Limitations](#known-limitations)  
    [已知限制](#known-limitations)
    
    -   [Switch Infrastructure](#switch-infrastructure)  
        [交換基礎設施](#switch-infrastructure)
        
    -   [Switch Configuration](#switch-configuration)  
        [交換器配置](#switch-configuration)
        
        -   [IGMP Snooping](#igmp-snooping)  
            [IGMP窺探](#igmp-snooping)
            
        -   [MAC and Port Security Features](#mac-and-port-security-features)  
            [MAC與連接埠安全功能](#mac-and-port-security-features)
            
        -   [MAC Flapping Detection](#mac-flapping-detection)  
            [MAC拍動檢測](#mac-flapping-detection)
            
        -   [Storm Control / Rate Limiting](#storm-control-rate-limiting)  
            [風暴控制/速率限制](#storm-control-rate-limiting)
            
        -   [Stacking](#stacking)  
            [堆疊](#stacking)
            

## [Overview](#id1)｜[概述](#id1)

One of the more powerful features of OPNsense is to set-up a redundant firewall with automatic fail-over option. This chapter describes step by step how to create a set-up based on two networks. The 192.168.1.0/24 will be used for the internal network and 172.18.0.0/24 will be used to route our traffic to the internet.

OPNsense 的一項強大功能是能夠設定具有自動故障轉移選項的冗餘防火牆。本章將逐步介紹如何基於兩個網路建立這樣172.18.0.0/24 192.168.1.0/24用於將流量路由到互聯網。

[![../../_images/900px-Carp_setup_example.png](<../images/553e18b1-900px-Carp_setup_example.png>)](https://docs.opnsense.org/_images/900px-Carp_setup_example.png)

When using CARP ( [FreeBSD handbook on CARP](https://www.freebsd.org/doc/handbook/carp.html) ), all fail-safe interfaces should have a dedicated IP address which will be combined with one shared virtual IP address to communicate to both networks. In the picture above the dashed lines are used to mark the virtual addresses.

使用CARP （[FreeBSD手冊中關於CARP](https://www.freebsd.org/doc/handbook/carp.html) ）時，所有故障保護接口都應具有專用的IP地址，該地址將與一個共享的虛擬IP地址組合，以便與兩個網絡通信。上圖中的虛線用於標記虛擬位址。

The configuration file (XML) for both firewalls can be downloaded from the wiki.

兩個防火牆的設定檔（ XML ）均可從 wiki 下載。

## [Terminology](#id2)｜[術語](#id2)

There is some terminology involved in setting up a CARP cluster, which we will explain briefly first:

建立CARP集群涉及一些術語，我們先簡單解釋：

CARP

Common Address Redundancy Protocol uses IP protocol 112, is derived from OpenBSD and uses multicast packets to signal its neighbours about its status. Always make sure that each interface can receive CARP packets. Every virtual interface must have a unique Virtual Host ID (vhid), which is shared across the physical machines. To determine which physical machine has a higher priority, the advertised skew is used. A lower skew means a higher score. (our master firewall uses 0).

通用位址冗餘協定IP使用協定 112，源自 OpenBSD，並使用組播封包向鄰居通報其狀態。務必確保每個介面都能接收CARP封包。每個虛擬介面必須具有唯一的ID主機 (vhid)，該虛擬主機在所有實體機之間共用。為了確定哪個實體機的優先權較高，需要使用通告偏移量 (skew)。偏移量越低，優先權越高（我們的主防火牆使用 0）。

pfSync

Together with CARP, we can use pfSync to replicate our firewalls state. When failing over you need to make sure both machines know about all connections to make the migration seamless. It’s highly advisable to use a dedicated interface for pfSync packets between the hosts, both for security reasons (state injection) as for performance.

結合CARP ，我們可以使用 pfSync 來複製防火牆狀態。故障轉移時，需要確保兩台機器都了解所有連接，以實現無縫遷移。強烈建議在主機之間使用專用介面傳輸 pfSync 封包，這既是出於安全考量（狀態注入），也是出於效能考量。

Warning

警告

When using different network drivers on both machines, like running a HA setup with one physical machine as master and a virtual machine as slave, states can not be synced as interface names differ. The only workaround would be to set up a LAGG.

當兩台機器使用不同的網路驅動程式時，例如運行HA設置，其中一台實體機作為主設備，一台虛擬機作為從設備，則由於介面名稱不同，狀態無法同步。唯一的解決方法是設定LAGG 。

XMLRPC sync

XMLRPC同步

OPNsense includes a mechanism to keep the configuration of the backup server in sync with the master. This mechanism is called XMLRPC sync and can be found under System ‣ High Availability ‣ Settings.

OPNsense 包含一種機制，用於保持備份伺服器的配置與主伺服器同步。此機制稱為XMLRPC同步，可在「系統」‣「高可用性」‣「設定」下找到。

## [Configuring CARP for IPv4](#id3)｜[正在設定CARP的 IPv4](#id3)

### [Setup interfaces & basic firewall rules](#id4)｜[設定介面與基本防火牆規則](#id4)

Warning

警告

Make sure the interface assignments on both systems are identical! Via Interfaces ‣ Overview you can check if e.g. DMZ is opt1 on both machines. When the assignments differ you will have mixed Master and Backup IPs on both machines.

請確保兩個系統上的介面分配完全相同！透過“介面”‣“概覽”，您可以檢查例如DMZ在兩台機器上是否都設定為opt1。若分配不同，兩台機器將會出現主IP和備份IP混用的情況。

Our example uses three interfaces, which all have a rather basic setup.

我們的範例使用了三個接口，它們的設定都相當基礎。

Master

掌握

Go to interfaces, make sure you have all three interfaces assigned and setup the following addresses and subnets:

轉到接口設置，確保已分配所有三個接口，並設置以下地址和子網：

|   |
| --- |
| LAN 192.168.1.10/24 |
| WAN 172.18.0.101/24 |
| PFSYNC 10.0.0.1 |

Next we need to make sure the appropriate protocols can be used on the different interfaces, go to Firewall ‣ Rules and make sure both LAN and WAN accept at least CARP packets (see protocol selection). Because we’re connecting both firewalls using a direct cable connection, we will add a single rule to accept all traffic on all protocols for that specific interface. Another option is to only accept traffic to the GUI port and pfSync protocol.

接下來，我們需要確保可以在不同的介面上使用適當的協議，轉到防火牆‣規則並確保LAN和WAN至少接受CARP封包（請參閱協議選擇）。由於我們使用直接電纜連接來連接兩個防火牆，因此我們將新增一條規則來接受該特定介面的所有協定上的所有流量。另一種選擇是僅接受流向 GUI 連接埠和 pfSync 協定的流量。

Backup

備份

The backup server needs its own dedicated addresses, we will use these:

備份伺服器需要自己的專用位址，我們將使用這些：

|   |   |
| --- | --- |
| LAN | 192.168.1.20/24 |
| WAN | 172.18.0.102/24 |
| PFSYNC | 10.0.0.2 |

Note

注意事項

Per default the dropdown menu for subnet mask only fits for IPv4 addresses (up to 32). If you want to add an IPv6 CARP address, write your IPv6 address and the dropdown list will auto-update to 128. [Configuring CARP with IPv6](#configuring-carp-with-ipv6)

預設情況下，子網路遮罩下拉式選單僅適用於 IPv4 位址（最多 32 個）。如果您想要新增 IPv6 CARP 位址，請輸入您的 IPv6 位址，下拉清單將自動更新為 128。 [使用 IPv6 設定 CARP](#configuring-carp-with-ipv6)

Because we are going to synchronize firewall settings between both hosts, we only need to make sure that the pfSync interface can accept data from the master for the initial setup. Use the same rule as used for the master on this interface.

因為我們要同步兩台主機之間的防火牆設置，所以我們只需要確保 pfSync 介面可以接受來自主設備的資料進行初始設定。使用與此介面上的主站相同的規則。

### [Setup Virtual IPs](#id5)｜[設定虛擬IP](#id5)

On the master node we are going to setup our Virtual IP addresses, which will also be added to the backup node with a higher skew after synchronisation. Go to Interfaces ‣ Virtual IPs and add a new one with the following characteristics:

在主節點上，我們將設定虛擬IP位址，同步後該位址也將新增至具有更高偏差的備份節點。前往 Interfaces ‣ Virtual IPs 並新增具有以下特徵的新 IP：

|   |   |
| --- | --- |
| Type<br>類型 | Carp<br>鯉魚 |
| Interface<br>接口 | WAN |
| IP addresses<br>IP 地址 | 172.18.0.100 / 24 |
| Virtual password<br>虛擬密碼 | opnsense (the example uses this)<br>opnsense（範例使用這個） |
| VHID Group<br>VHID 組 | 1 |
| Advertising Frequency<br>廣告頻率 | Base 1 / Skew 0<br>基數 1 / 傾斜 0 |
| Description<br>描述 | VIP WAN |

And another using the following:

另一個使用以下內容：

|   |   |
| --- | --- |
| Type<br>類型 | Carp<br>鯉魚 |
| Interface<br>接口 | LAN |
| IP addresses<br>IP 地址 | 192.168.1.1 / 24 |
| Virtual password<br>虛擬密碼 | opnsense (the example uses this)<br>opnsense（範例使用這個） |
| VHID Group<br>VHID 組 | 3 |
| Advertising Frequency<br>廣告頻率 | Base 1 / Skew 0<br>基數 1 / 傾斜 0 |
| Description<br>描述 | VIP LAN |

Note

注意事項

Always create Carp VIPs with the same subnet mask as its parent interface. If the parent interface is `/24`, your Carp VIP should also be `/24`. Even though some sources claim that `/32` will work, services like DHCP Failover will fail with `peer holds all free leases`.

始終使用與其父介面相同的子網路遮罩來建立 Carp VIP。如果父介面是`/24`，那麼你的CarpVIP也應該是`/24`。儘管一些消息來源聲稱 `/32` 可以工作，但 DHCP 故障轉移等服務將因 `peer holds all free leases` 而失敗。

### [Setup Source NAT](#id6)｜[設定源NAT](#id6)

When traffic is going out of the firewall it should also use the virtual IP address on the WAN interface to make seamless transitions possible. The default NAT configuration is for OPNsense is to use Automatic Source NAT rule generation using the WAN interface’s IP address for outgoing connections. This will not allow seamless transitions and needs to be changed to the WAN VIP.

當流量流出防火牆時，也應該使用 WAN 介面上的虛擬 IP 位址，以實現無縫轉換。 OPNsense 的預設 NAT 配置是使用自動來源 NAT 規則生成，並使用 WAN 介面的 IP 位址進行傳出連接。這將不允許無縫過渡，需要更改為WAN VIP。

Go to Firewall ‣ NAT ‣ Source NAT (Outbound). Choose manual Source NAT rule generation. On this page create the a rule originating from the 192.168.1.0/24 network to use the CARP virtual interface (172.18.0.100). The rule should contain the following:

轉到防火牆 ‣ NAT ‣ 源 NAT（出站）。選擇手動來源NAT規則產生。在此頁面上建立源自 192.168.1.0/24 網路的規則以使用 CARP 虛擬介面 (172.18.0.100)。該規則應包含以下內容：

|   |   |
| --- | --- |
| Interface<br>接口 | WAN |
| Source address<br>原始碼位址 | LAN net (192.168.1.0/24)<br>LAN 網 (192.168.1.0/24) |
| Translation / target<br>翻譯/目標 | 172.18.0.100 (CARP virtual IP)<br>172.18.0.100（CARP虛IP） |

### [(optional) Setup DHCP server](#id7)｜[（可選）設定DHCP伺服器](#id7)

When using DHCP for the local area network, there are some things to consider. All clients should use the virtual address instead of the physical address it’s normally propagating. Next thing to consider is there will be two servers active at the same time, which should know of each others pools. If DNS requests are also forwarded by OPNsense, make sure the DHCP server sends the right IP address. These are settings used in our example (on the master server):

在區域網路中使用DHCP時，需要考慮一些事項。所有客戶端都應使用虛擬位址而不是通常傳播的實體位址。接下來要考慮的是，將有兩台伺服器同時處於活動狀態，它們應該知道彼此的池。如果 DNS 請求也由 OPNsense 轉發，請確保 DHCP 伺服器發送正確的 IP 位址。這些是我們的範例中使用的設定（在主伺服器上）：

|   |   |
| --- | --- |
| DNS servers<br>DNS 伺服器 | 192.168.1.1 |
| Gateway<br>網關 | 192.168.1.1 |
| Failover peer IP<br>故障轉移對等點IP | 192.168.1.20 |

### [Setup pfSync and HA sync (xmlrpc)](#id8)｜[設定 pfSync 和 HA 同步 (xmlrpc)](#id8)

First we should configure pfSync to synchronize the connection state tables and HA sync (xmlrpc) on the master firewall. Go to System ‣ High Availability ‣ Settings and enable pfSync by selecting PFSYNC from the Synchronize all states via dropdown and enter the peer IP (10.0.0.2) in the field Synchronize Peer IP.

首先，我們應該設定 pfSync 以同步主防火牆上的連線狀態表和 HA 同步 (xmlrpc)。前往 System ‣ High Availability ‣ Settings 並透過從 Synchronize all states via 下拉清單中選擇 PFSYNC 來啟用 pfSync，並在 Synchronize Peer IP 欄位中輸入對等 IP (10.0.0.2)。

To synchronize the configuration settings from the master to the backup firewall, we setup the XMLRPC sync. In the Synchronize Config to IP field we enter the peer IP (10.0.0.2) of the PFSYNC interface again to keep this traffic on the direct connection between the two firewalls. Now we need to enter the remote user name and password and configure the settings we want to duplicate to the backup server. For our setup we will enable the following:

為了將設定設定從主防火牆同步到備份防火牆，我們設定了XMLRPC同步。在同步配置到IP欄位中，我們再次輸入PFSYNC介面的對等IP (10.0.0.2)，以將此流量保留在兩個防火牆之間的直接連接上。現在我們需要輸入遠端使用者名稱和密碼並配置要複製到備份伺服器的設定。對於我們的設置，我們將啟用以下功能：

|   |
| --- |
| Synchronize rules<br>同步規則 |
| Synchronize NAT<br>同步NAT |
| Synchronize DHCPD<br>同步DHCPD |
| Synchronize Virtual IPs<br>同步虛擬IP |

After this we configure pfSync on the backup firewall. Go to System ‣ High Availability ‣ Settings and enable pfSync by activating the Synchronize States checkbox, selecting PFSYNC for the Synchronize Interface and enter the master IP (10.0.0.1) in the field Synchronize Peer IP. Do not configure XMLRPC sync on the backup firewall.

之後，我們在備份防火牆上設定 pfSync。前往 System ‣ High Availability ‣ Settings 並透過啟動 Synchronize States 複選框來啟用 pfSync，為 Synchronize Interface 選擇 PFSYNC 並在 Synchronize Peer IP 欄位中輸入主 IP (10.0.0.1)。不要在備份防火牆上配置 XMLRPC 同步。

### [Finalize setup](#id9)｜[完成設定](#id9)

Just to make sure all settings are properly applied, reboot both firewalls before testing.

為了確保正確應用所有設置，請在測試之前重新啟動兩個防火牆。

### [Testing setup](#id10)｜[測試設定](#id10)

First go to System ‣ High availability ‣ Status in the OPNsense webinterface and check if both machines are properly initialized.

首先前往 OPNsense Web 介面中的 System ‣ High Availability ‣ Status 並檢查兩台電腦是否已正確初始化。

To test our setup, we will connect a client to the local area network and open a ssh connection to a host behind both firewalls. Now when connected you should be able to look at the state table on both OPNsense firewalls (Firewall ‣ Diagnostics ‣ States Dump) and they should both display the same connection. Next try to pull the network plug from the master firewall and it should move over to the backup without losing (or freezing) the ssh connection.

為了測試我們的設置，我們將客戶端連接到區域網，並打開到兩個防火牆後面的主機的 ssh 連線。現在，連線後，您應該可以查看兩個 OPNsense 防火牆上的狀態表（防火牆 ‣ 診斷 ‣ 狀態轉儲），並且它們都應該顯示相同的連線。接下來嘗試從主防火牆拔出網路插頭，它應該移至備份防火牆而不會遺失（或凍結）ssh 連線。

### [Adding multiple CARP IPs](#id11)｜[新增多個CARP IP](#id11)

If your provider offers you a subnet of public IP addresses and you want to expose them for NAT or different services running on your Firewall, you will also have to add them to your HA setup. Since adding a VHID for every IP would make the CARP traffic very noisy, you can also add a new IP Alias and choose the correct VHID where the first CARP IP is configured. See [CARP Virtual IP type](<111 虛擬IP.md#carp>) for more information on the concept.

如果您的提供者為您提供公用 IP 位址的子網，並且您希望將它們公開給 NAT 或防火牆上執行的不同服務，您也必須將它們新增至您的 HA 設定中。由於為每個 IP 新增 VHID 會使 CARP 流量變得非常吵雜，因此您還可以新增新的 IP 別名並在配置第一個 CARP IP 的位置選擇正確的 VHID。有關該概念的更多信息，請參閱[CARP 虛擬 IP 類型](<111 虛擬IP.md#carp>)。

Note

注意事項

IP Aliases are not synchronized to the backup firewall during a configuration sync, be sure to also add it to your second machine when setting up CARP.

IP 在設定同步期間，別名不會同步到備份防火牆，請務必在設定 CARP 時將其新增至您的第二台電腦。

Attention

注意

Adding an IP alias with a VHID attached to a running CARP system requires some consideration. Since adding a new IP Alias to an existing VHID on a single machine will invalidate the VHID hash for both sides, both machines will react by switching to the master state, triggering a split-brain scenario. To avoid this, CARP must explicitly be disabled on one of the machines before adding the new IP Alias. For an exact procedure, refer to [the example](#example-adding-a-virtual-ip-to-an-active-vhid-group)

添加帶有 VHID 的 IP 別名附加到正在運行的 CARP 系統需要一些考慮。由於在單一機器上向現有 VHID 添加新的 IP 別名將使雙方的 VHID 哈希無效，因此兩台機器都會透過切換到主狀態來做出反應，從而觸發裂腦場景。為了避免這種情況，在新增新的 IP 別名之前，必須在其中一台電腦上明確停用 CARP。具體步驟請參考[範例](#example-adding-a-virtual-ip-to-an-active-vhid-group)

### [Example: Updating a CARP HA Cluster](#id12)｜[範例：更新CARP HA群集](#id12)

Running a redundant Active/Passive cluster leads to the expectation to have zero downtime. To keep the downtime at a minimum when running updates just follow these steps:

運行冗餘的主備叢集可以實現零停機時間。為了在運行更新時將停機時間降至最低，請按照以下步驟操作：

-   Update your secondary unit and wait until it is online again  
    更新您的備用單元，並等待其重新上線。
    
-   On your primary unit go to Interfaces ‣ Virtual IPs ‣ Status and click **Enter Persistent CARP Maintenance Mode**  
    在您的主設備上，轉到介面 ‣ 虛擬 IP ‣ 狀態，然後按一下 **進入持久性 CARP 維護模式**
    
-   You secondary unit is now *MASTER*, check if all services like DHCP, VPN, NAT are working correctly  
    您的輔助單元現在是 * MASTER *，請檢查所有服務（例如DHCP, VPN, NAT是否正常運作。
    
-   If you ensured the update was fine, update your primary unit and hit **Leave Persistent CARP Maintenance Mode**  
    如果您已確認更新無誤，請更新您的主裝置並點擊**退出持久維護模式CARP**
    

With these steps you will not lose too many packets and your existing connection will be transferred as well. Also note that entering persistent mode survives a reboot.

透過這些步驟，您不會遺失太多資料包，並且現有連線也會保留。另請注意，進入持久模式後，即使重新啟動系統，該模式仍然有效。

### [Example: Adding a virtual IP to an active VHID group](#id13)｜[範例：將虛擬IP加入活動VHID組](#id13)

-   On either the primary or secondary unit, go to Interfaces ‣ Virtual IPs ‣ Status, click on **Disable CARP** (not maintenance mode). When disabling it on the master, the backup should take over.  
    在主設備或備用設備上，依序點選“介面”‣“虛擬 IP”‣“狀態”，然後點選**停用CARP**（不是進入維護模式）。在主設備上停用後，備用設備應該會接管。
    
-   Add the virtual IP alias to the machine where CARP is disabled and apply the settings.  
    將虛擬別名IP加入到CARP已停用的機器，並套用設定。
    
-   While keeping CARP disabled on this machine, add the same IP alias to the other machine and apply. This may interrupt traffic briefly at worst, but this is acceptable in a failover scenario.  
    在目前機器上停用CARP的情況下，將相同的IP別名加入另一台機器並套用。這最多可能會短暫中斷流量，但在故障轉移場景中是可以接受的。
    
-   Double-check that the VIP configuration is identical on both machines.  
    請仔細檢查兩台機器上的VIP配置是否相同。
    
-   Re-enable CARP on the previous machine. Normal operation should resume.  
    重新啟用上一台機器上的CARP 。機器應該會恢復正常運作。
    

### [Resources](#id14)｜[資源](#id14)

1.  Configuration for master server ( [`Carp_example_master.xml`](https://docs.opnsense.org/_downloads/43337e9604d2e468dd93ab15d650dc72/Carp_example_master.xml) )  
    主伺服器配置（[`Carp_example_master.xml`](https://docs.opnsense.org/_downloads/43337e9604d2e468dd93ab15d650dc72/Carp_example_master.xml) ）
    
2.  Configuration for backup server ( [`Carp_example_backup.xml`](https://docs.opnsense.org/_downloads/a5dca3f3210afc04d4cd4560bf96d8b3/Carp_example_backup.xml) )  
    備份伺服器設定（[`Carp_example_backup.xml`](https://docs.opnsense.org/_downloads/a5dca3f3210afc04d4cd4560bf96d8b3/Carp_example_backup.xml) ）
    

## [Configuring CARP for IPv6](#id15)｜[正在設定CARP以支援 IPv6](#id15)

Warning

警告

Please read all the above steps before attempting to configure IPv6 CARP VIPs. This section is complementry. Some important details are omitted for a more focused approach.

在嘗試設定 IPv6 CARP VIP 之前，請先閱讀以上所有步驟。本節內容為補充說明，為了更簡潔明了地介紹，省略了一些重要細節。

Note

注意事項

-   An example ISP provided you the following:  
    例如ISP為您提供了以下內容：
    
-   IPv6 network: `2001:db8:1234::/48`  
    IPv6 網路： `2001:db8:1234::/48`
    
-   Transfer network: `2001:db8:1234::/64`  
    轉帳網： `2001:db8:1234::/64`
    
-   Upstream gateway: `2001:db8:1234::/64`  
    上游網關： `2001:db8:1234::/64`
    
-   Static route: `2001:db8:1234::/48` next hop `2001:db8:1234::7/64`  
    靜態路由： `2001:db8:1234::/48`下一跳`2001:db8:1234::7/64`
    

Note

注意事項

-   Firewall rules have to permit *Protocol: CARP* with *TCP/IP Version: IPv6* on all interfaces with CARP IPv6 VIPs.  
    防火牆規則必須允許所有具有CARP VIP 的介面上的 *協定: CARP * 與 * TCP/IP版本: IPv6*。
    

Master

掌握

Go to interfaces, make sure you have these interfaces assigned and setup the following addresses and subnets:

轉到接口設置，確保已分配這些接口，並設置以下地址和子網：

|   |   |
| --- | --- |
| WAN | `2001:db8:1234::1/64` |
| LAN | `2001:db8:1234:1::1/64` |

Backup

備份

The backup server needs its own dedicated addresses, we will use these:

備份伺服器需要獨立的專用位址，我們將使用以下位址：

|   |   |
| --- | --- |
| WAN | `2001:db8:1234::2/64` |
| LAN | `2001:db8:1234:1::2/64` |

### [Setup Virtual IPv6 Global Unicast Address](#id16)｜[設定虛擬 IPv6 全球單播位址](#id16)

On the master node we are going to setup our Virtual IPv6 global unicast address, which will also be added to the backup node with a higher skew after synchronisation. Go to Interfaces ‣ Virtual IPs and add a new one with the following characteristics:

在主節點上，我們將設定虛擬 IPv6 全域單播位址，同步後，該位址也會以更高的偏移量新增至備份節點。請前往“介面”‣“虛擬 IP”，並新增一個具有以下特徵的新位址：

|   |   |
| --- | --- |
| Type<br>類型 | Carp<br>鯉魚 |
| Interface<br>接口 | WAN |
| IP addresses<br>IP地址 | `2001:db8:1234::7/64` |
| Virtual password<br>虛擬密碼 | opnsense (the example uses this)<br>opnsense（範例中使用此密碼） |
| VHID Group<br>VHID組 | 2 |
| Advertising Frequency<br>廣告頻率 | Base 1 / Skew 0<br>基數 1 / 偏差 0 |
| Description<br>描述 | VIP WAN IPv6 |

Tip

提示

`2001:db8:1234::7/64` should be the IP where the static route of your provider points to.

`2001:db8:1234::7/64`應該是IP也就是您的提供者的靜態路由指向的位置。

Warning

警告

Use a free VHID Group for each additional CARP VIP. Don’t use the same VHID Group twice.

每增加一個CARP VIP ，就使用一個免費的VHID組。不要兩次使用同一個VHID組。

### [Setup Virtual IPv6 Link Local Address](#id17)｜[設定虛擬 IPv6 連結本地位址](#id17)

On the master node we are going to setup our Virtual IPv6 link local address, which will also be added to the backup node with a higher skew after synchronisation. Go to Interfaces ‣ Virtual IPs and add a new one with the following characteristics:

在主節點上，我們將設定虛擬 IPv6 連結本地位址，同步後，該位址也會新增至備份節點，但備份節點的位址偏移會更大。請前往“介面”‣“虛擬 IP”，並新增一個具有以下特徵的新位址：

|   |   |
| --- | --- |
| Type<br>類型 | Carp<br>鯉魚 |
| Interface<br>接口 | LAN |
| IP addresses<br>IP地址 | `fe80::/64` |
| Virtual password<br>虛擬密碼 | opnsense (the example uses this)<br>opnsense（範例中使用此密碼） |
| VHID Group<br>VHID組 | 4 |
| Advertising Frequency<br>廣告頻率 | Base 1 / Skew 0<br>基數 1 / 偏差 0 |
| Description<br>描述 | VIP LAN IPv6 |

Warning

警告

-   All IPv6 CARP VIPs on LAN interfaces should be `/64` Link Local Addresses.  
    LAN介面上的所有 IPv6 CARP VIP 都應該是`/64`鏈路本地位址。
    
-   Don’t use Global Unicast Addresses, many devices ignore them as IPv6 Gateway.  
    不要使用全域單播位址，許多裝置會將其忽略為 IPv6 閘道位址。
    

### [Setup Router Advertisements](#id18)｜[設定路由器廣告](#id18)

WAN

-   Go to Services ‣ Router Advertisements and select the WAN interface.  
    前往服務 ‣ 路由器通告並選擇 WAN 介面。
    
-   Make sure *Router Advertisements* is set to *Disabled*  
    確保*路由器廣告*設定為*停用*
    

LAN

-   Go to Services ‣ Router Advertisements and select the LAN interface.  
    前往服務 ‣ 路由器通告並選擇 LAN 介面。
    
-   Change the *Source Address* from *automatic* to *VIP LAN IPv6 (fe80::/64)*.  
    將*來源位址*從*自動*變更為*VIP LAN IPv6 (fe80::/64)*。
    

## [Troubleshooting](#id19)｜[故障排除](#id19)

This section aims to highlight common problems and pitfalls associated with a CARP setup.

本節旨在強調與 CARP 設置相關的常見問題和陷阱。

Since CARP troubleshooting can be quite advanced, WebGUI and shell commands are both specified for completeness.

由於 CARP 故障排除可能相當高級，因此為了完整性而指定了 WebGUI 和 shell 命令。

### [General](#id20)｜[一般](#id20)

CARP events are logged in the kernel message buffer. They can be inspected using either:

CARP 事件記錄在內核訊息緩衝區中。可以使用以下任一方法檢查它們：

**WebGUI**

**網頁圖形使用者介面**

System ‣ Log Files ‣ General

系統 ‣ 日誌檔 ‣ 常規

Search for `kernel` and `carp`

搜尋 `kernel` 和 `carp`

**Shell (advanced)**

**外殼（高級）**

```
dmesg
```

CARP advertisement packets can be captured and inspected using either:

CARP 可以使用以下任一方法擷取和檢查廣告資料包：

**WebGUI**

**網頁圖形使用者介面**

Interfaces ‣ Diagnostics ‣ Packet Capture

介面 ‣ 診斷 ‣ 封包捕獲

|   |   |
| --- | --- |
| Interface<br>介面 | Select relevant interfaces<br>選擇相關介面 |
| Protocol<br>協定 | CARP |

**Shell (advanced)**

**外殼（高級）**

```
tcpdump -ni <interface> -t vrrp -T carp
```

CARP logging verbosity can be increased using either:

CARP 可以使用下列任一方法增加日誌記錄的詳細程度：

**WebGUI**

**網頁圖形使用者介面**

System ‣ Settings ‣ Tunables

系統 ‣ 設定 ‣ 可調參數

|   |   |
| --- | --- |
| Tunable<br>可調 | net.inet.carp.log |
| Value<br>價值 | 2 |

**Shell (advanced)**

**外殼（高級）**

```
sysctl net.inet.carp.log=2
```

Note

注意事項

This is not reboot persistent.

這不是重啟持久性的。

### [Backup node cannot reach internet](#id21)｜[備份節點無法上網](#id21)

This issue usually occurs when an administrator is trying to update the machine while in backup mode, and while traffic from the LAN can reach the internet, the machine itself cannot. This is usually caused by a misconfigured Source NAT rule. If the source network of the rule is set to ‘any’, traffic originating from the firewall itself going to the internet is also translated to the CARP VIP, meaning the return traffic is sent to the master firewall, which ignores the traffic as the packets are out of state.

當管理員在備份模式下嘗試更新電腦時，通常會出現此問題，雖然來自 LAN 的流量可以到達互聯網，但電腦本身卻不能。這通常是由錯誤配置的 Source NAT 規則引起的。如果規則的來源網路設定為“any”，則從防火牆本身傳送到網際網路的流量也會轉換為CARP VIP，這表示回傳流量將傳送到主防火牆，主防火牆會忽略該流量，因為封包處於狀態外。

The solution is to adjust the Source NAT rule so that it only accepts traffic from the relevant source network, which is often any RFC1918 address.

解決方案是調整來源NAT規則，使其僅接受來自相關來源網路的流量，該網路通常是任何RFC1918位址。

### [Split-brain](#id22)｜[裂腦](#id22)

In certain rare occasions, both the master and backup node may show a “master” state assumed in the virtual IP status overview for one or more VIPs. In general, there may be multiple reasons this is happening:

在某些罕見的情況下，主節點和備份節點都可能顯示一個或多個 VIP 的虛擬IP 狀態概覽中假定的「主」狀態。一般來說，發生這種情況可能有多種原因：

-   The advertisement packets contain a hash that does not match up with what the other node expects. This is caused by misconfigured virtual IPs. See [CARP Virtual IP type](<111 虛擬IP.md#carp>) for more information. This situation is logged to the system log if the verbosity has been increased.  
    通告資料包包含與其他節點期望的雜湊不符的雜湊。這是由於虛擬 IP 配置錯誤造成的。請參閱[CARP虛擬IP類型](<111 虛擬IP.md#carp>)以了解更多資訊。如果詳細程度增加，這種情況會記錄到系統日誌中。
    

This is solved by making sure that all of the CARP VIPs and IP aliases belonging to the same VHID are exactly the same, including missing IP addresses.

透過確保屬於同一 VHID 的所有 CARP VIP 和 IP 別名完全相同（包括缺少的 IP 地址）可以解決此問題。

-   Advertisement packets get lost en-route to the other node. This can happen due to network issues or misconfigured routing.  
    廣告資料包在前往另一個節點的途中遺失。這可能是由於網路問題或路由配置錯誤而發生的。
    

While CARP is meant to act on link state changes or general failures, it does not detect whether the advertisement packets reach the other node. Since CARP is configured on a per-interface basis, a backup node may see advertisement packets on one interface from the master, but fail to see them on another. In this case the backup node cannot switch all interfaces in unison to the master state.

雖然CARP旨在對鏈路狀態變化或一般故障採取行動，但它不會檢測廣告資料包是否到達其他節點。由於 CARP 是在每個介面的基礎上配置的，備份節點可能會在一個介面上看到來自主設備的通告封包，但無法在另一個介面上看到它們。此時備援節點無法將所有介面統一切換為主用狀態。

To troubleshoot this, you can inspect the CARP traffic on the backup node using tcpdump.

要解決此問題，您可以使用 tcpdump 檢查備份節點上的CARP 流量。

In the default case of multicast, one should be able to see the source IP address of the master node in the advertisement packets. If instead the backup source IP address is shown, it indicates the CARP traffic is not reaching the backup node. One can rule out multicast issues by switching to unicast in the Virtual IP settings.

在預設的多播情況下，應該能夠在通告封包中看到主節點的來源IP位址。如果顯示備份來源IP位址，則表示CARP流量未到達備份節點。您可以透過在虛擬IP 設定中切換到單播來排除多播問題。

-   Preemption is disabled in System ‣ High Availability ‣ Settings. Unless you know what you are doing, preemption should always be enabled unless you’re running a routing-only platform.  
    在 System ‣ High Availability ‣ Settings 中停用搶佔。除非您知道自己在做什麼，否則應始終啟用搶佔，除非您運行的是純路由平台。
    

### [Interface errors](#id23)｜[介面錯誤](#id23)

Starting from OPNsense Community Edition 25.1.4 or Business Edition 25.4, the system default to failover if interface errors occur has been disabled. If you’re on an older version or if you have this configured explicitly through the tunables (`net.inet.carp.senderr_demotion_factor=240`), CARP may demote a machine if the system detects interface errors.

從 OPNsense 社群版25.1.4 或商業版25.4 開始，系統預設在發生介面錯誤時進行故障轉移已停用。如果您使用的是舊版本，或透過可調參數 (`net.inet.carp.senderr_demotion_factor=240`) 明確配置了此配置，則當系統偵測到介面錯誤時，CARP 可能會將電腦降級。

In this scenario, if CARP cannot send out an advertisement packet on a particular interface due to an interface error, the CARP system will demote itself, hoping the backup node will take over. On the OPNsense side, this is indicated in the Virtual IP Status page by a message showing “CARP has detected a problem …”.

在這種情況下，如果CARP由於介面錯誤而無法在特定介面上發送廣告包，則CARP系統將自我降級，希望備份節點接管。在 OPNsense 方面，虛擬 IP 狀態頁面中顯示一則訊息，顯示「CARP 已偵測到問題…」。

If this happens, an event is logged in the general system log and show the reason for the failure, for instance, send error 55. If the backup firewall takes over, the master node will cease sending its advertisement packets, thereby also eliminating its ability to see whether communication has been restored. In such a scenario, the demotion will remain the same until rebooted or until manually reset by an administrator.

如果發生這種情況，系統日誌中會記錄一個事件，並顯示失敗的原因，例如，發送錯誤 55。如果備份防火牆接管，主節點將停止發送其廣告資料包，從而也消除了其查看通訊是否已恢復的能力。在這種情況下，降級將保持不變，直到重新啟動或由管理員手動重置。

To reset the current carp demotion you can use either:

若要重設目前鯉魚降級，您可以使用：

**WebGUI**

**網頁圖形使用者介面**

Interfaces ‣ Virtual IPs ‣ Status

介面 ‣ 虛擬 IP ‣ 狀態

Press Enter Persistent CARP Maintenance Mode twice to enter and exit it, this will reset the current demotion to 0.

按 Enter Persistent CARP Maintenance Mode 兩次進入和退出它，這會將當前降級重置為 0。

**Shell (advanced)**

**外殼（高級）**

```
sysctl net.inet.carp.demotion=<signed demotion factor>
```

<X> is the signed demotion factor. E.g., if the current demotion is 240, one should use \-240. If the current demotion is \-480, one should use +480.

<X> 是帶符號的降級因子。例如，如果目前降級為 240，則應使用 \-240。如果目前降級為 \-480，則應使用 +480。

Note

注意事項

After applying this command, CARP will start sending out advertisement packets again, thereby ambiguously detecting that communication has been restored, and will therefore subtract the old demotion factor again. An administrator should correct this a second time to reset the value to 0.

套用此指令後，CARP將再次開始傳送廣告資料包，從而模糊地偵測到通訊已恢復，因此將再次減去舊的降級因子。管理員應再次更正此問題以將值重設為 0。

## [Known Limitations](#id24)｜[已知限制](#id24)

In some infrastructures, CARP can behave in unexpected ways. In this section, we will document some of the limitations and experiences collected over time. Please take these into careful consideration if you plan a CARP setup.

在某些基礎設施中，CARP 可能會以意想不到的方式運作。在本節中，我們將記錄一些隨著時間的推移收集的限制和經驗。如果您計劃 CARP 設置，請仔細考慮這些因素。

These limitations can arise from vendor-specific implementations, network infrastructure design oversights, or configuration errors.

這些限制可能源自於供應商特定的實施、網路基礎架構設計疏忽或配置錯誤。

### [Switch Infrastructure](#id25)｜[交換器基礎設施](#id25)

When designing a high-availability CARP setup, the underlying switch infrastructure plays a critical role in ensuring proper failover and performance. Both firewall nodes should ideally reside in the same Layer 2 broadcast domain and preferably within a unified switching fabric.

在設計高可用性CARP設定時，底層交換器基礎設施在確保正確的故障轉移和效能方面發揮關鍵作用。理想情況下，兩個防火牆節點應駐留在同一個第 2 層廣播域中，並且最好位於統一的交換結構內。

Attention

注意

Mismatched or isolated switch configurations can lead to issues with MAC address learning, increased Layer 2 flooding, and unstable connectivity during failover events.

不符合或隔離的交換器配置可能會導致MAC位址學習、第 2 層泛洪增加以及故障轉移事件期間連線不穩定等問題。

While CARP traditionally uses multicast to communicate between peers, unicast CARP is also supported. This mode can be useful in networks where multicast is restricted or where broadcast domains span routed segments. However, unicast CARP requires manual configuration of peer IP addresses and is more sensitive to asymmetric routing and latency. For most environments, multicast remains the recommended default due to its general resilience.

雖然 CARP 傳統上使用多播在對等點之間進行通信，但也支援單播 CARP。此模式在多播受到限製或廣播域跨越路由段的網路中非常有用。然而，單播CARP需要手動配置對等IP位址，並且對非對稱路由和延遲更敏感。對於大多數環境，多播由於其普遍的彈性而仍然是建議的預設設定。

Attention

注意

In cloud environments or virtualized infrastructures where the switching layer is abstracted or beyond your control, deploying a reliable CARP-based high availability setup can be challenging. These platforms often impose restrictions on multicast traffic, MAC address failover, or gratuitous ARP behavior — all of which are essential for proper CARP operation. Without explicit support for Layer 2 HA mechanisms, failover may be delayed, unreliable, or entirely unsupported.

在雲端環境或虛擬化基礎架構中，交換層被抽像或超出您的控制，部署可靠的基於CARP的高可用性設定可能具有挑戰性。這些平台經常對多播流量、MAC位址故障轉移或無償的ARP行為施加限制——所有這些對於CARP的正常運作都是至關重要的。如果沒有對第 2 層HA 機制的明確支持，故障轉移可能會延遲、不可靠或完全不受支援。

### [Switch Configuration](#id26)｜[開關配置](#id26)

This section covers issues that can be solved by tweaking the running configuration of switches.

本節介紹可以透過調整交換器的運作配置來解決的問題。

#### [IGMP Snooping](#id27)｜[IGMP窺探](#id27)

This feature allows switches to manage multicast traffic more efficiently by tracking IGMP group memberships. However, if no IGMP querier is present, or if snooping is misconfigured, multicast CARP (Protocol 112) traffic may be blocked or unpredictably flooded.

此功能允許交換器透過追蹤IGMP組成員資格更有效地管理多播流量。但是，如果不存在 IGMP 查詢器，或監聽配置錯誤，多播 CARP（協定 112）流量可能會被阻塞或不可預測地氾濫。

#### [MAC and Port Security Features](#id28)｜[MAC與連接埠安全功能](#id28)

Features like port security, sticky MAC, or MAC learning limits can interfere with virtual MACs used by CARP. Such restrictions may prevent proper MAC failover, leading to connection drops or unreachable nodes.

連接埠安全、黏性MAC或MAC學習限制等功能可能會幹擾CARP使用的虛擬MAC。此類限制可能會阻止正確的MAC故障轉移，從而導致連接丟失或無法存取節點。

#### [MAC Flapping Detection](#id29)｜[MAC 撲動檢測](#id29)

Switches that monitor for rapid MAC address changes may misinterpret CARP activity as a loop or attack. This can lead to port shutdowns or error-disable states during failover events.

監視快速 MAC 位址變更的交換器可能會將 CARP 活動誤解為循環或攻擊。這可能會導致故障轉移事件期間連接埠關閉或錯誤停用狀態。

#### [Storm Control / Rate Limiting](#id30)｜[風暴控制/速率限制](#id30)

Limits on broadcast or multicast traffic can interfere with CARP advertisements, causing delayed failover or state flapping. Ensure CARP traffic is not unintentionally dropped or throttled by storm control policies on switch ports.

廣播或多播流量的限制可能會幹擾CARP廣告，導致延遲故障轉移或狀態振盪。確保CARP流量不會被交換器連接埠上的風暴控制策略無意中丟棄或限制。

#### [Stacking](#id31)｜[堆疊](#id31)

Enterprise switch vendors — such as Juniper (Virtual Chassis), Arista (MLAG), Cisco (StackWise Virtual) and Extreme Networks (XOS MLAG) — can require that both cluster members are connected within the same switching fabric or Layer 2 control plane.

企業交換器供應商 — 例如 Juniper（虛擬機箱）、Arista (MLAG)、Cisco (StackWise Virtual) 和 Extreme Networks (XOS MLAG) — 可能要求兩個叢集成員在同一交換結構或第 2 層控制平面內連接。

Otherwise, the CAM table of connected switches might not be updated with the correct CARP MAC addresses (`00:00:5e:00:01:xx`).

否則，所連接交換器的 CAM 表可能無法使用正確的 CARP MAC 位址 (`00:00:5e:00:01:xx`) 進行更新。

In these setups, CARP will operate correctly only if:

在這些設定中，CARP 僅在以下情況下才能正確運行：

-   The virtual MAC address is consistently recognized across all uplinks  
    虛擬 MAC 位址在所有上行鏈路中一致識別
    
-   Gratuitous ARP (for IPv4) or unsolicited Neighbor Advertisements (for IPv6) are correctly propagated  
    免費 ARP（對於 IPv4）或未經請求的鄰居通告（對於 IPv6）被正確傳播
    

Attention

注意

If nodes are connected through separate, non-coordinated switches without MLAG or stacking, you risk:

如果節點透過單獨的、非協調的交換器連接，沒有 MLAG 或堆疊，您將面臨以下風險：

-   Split-brain failover behavior  
    裂腦故障轉移行為
    
-   MAC flapping warnings on switches  
    MAC 開關上的拍打警告
    
-   ARP cache desynchronization on downstream devices  
    ARP 下游設備快取不同步
    
-   Duplicate ICMP or ARP replies  
    重複的ICMP或ARP回复
    
-   High Layer 2 broadcast traffic (flooding)  
    高第 2 層廣播流量（洪氾）
    
-   Sluggish or unreliable failover transitions  
    緩慢或不可靠的故障轉移轉換
    

For reliable CARP failover, both firewalls must not only share the same VLAN (Layer 2 broadcast domain), but must also be connected to the same physical switching fabric.

為了實現可靠的CARP故障轉移，兩個防火牆不僅必須共享相同的VLAN（第2層廣播域），還必須連接到相同的實體交換結構。

-   Use a single switch, or  
    使用單一開關，或
    
-   A stacked switch configuration (e.g., Cisco StackWise Virtual, Juniper VC), or  
    堆疊交換器配置（例如 Cisco StackWise Virtual、Juniper VC），或
    
-   An MLAG-capable fabric (e.g., Arista MLAG, Extreme XOS MLAG)  
    支援 MLAG 的結構（例如 Arista MLAG、Extreme XOS MLAG）

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Normalization｜正常化](<147 正常化.md>)　｜　[下一篇：Log Files｜紀錄檔案 ➡](<149 紀錄檔案.md>)
