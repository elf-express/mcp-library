---
title: "KEA DHCP"
source: "https://docs.opnsense.org/manual/kea.html"
chapter: ["Services"]
order: 196
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:20.382Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：ISC DHCP](<195 ISC DHCP.md>)　｜　[下一篇：Router Advertisements｜路由器廣告 ➡](<197 路由器廣告.md>)

# KEA DHCP

> 章節：[Services](<000 目錄.md#c-40>)

## [KEA DHCP](#id1)

Index

指數

-   [KEA DHCP](#kea-dhcp)
    
    -   [Control Agent](#control-agent)  
        [控制代理](#control-agent)
        
    -   [DDNS Agent](#ddns-agent)  
        [DDNS特工](#ddns-agent)
        
    -   [Kea DHCPv4/v6](#kea-dhcpv4-v6)  
        [Kea DHCPv4/v6](#kea-dhcpv4-v6)
        
    -   [Configuration examples](#configuration-examples)  
        [設定範例](#configuration-examples)
        
        -   [DHCPv4 for medium/large HA setups](#dhcpv4-for-medium-large-ha-setups)  
            [適用於中大型HA部署的 DHCPv4](#dhcpv4-for-medium-large-ha-setups)
            
        -   [DHCP Options](#dhcp-options)  
            [DHCP選項](#dhcp-options)
            
        -   [Dynamic DNS (RFC2136)](#dynamic-dns-rfc2136)  
            [動態DNS ( RFC2136 )](#dynamic-dns-rfc2136)
            
        -   [Prefix Delegation (IA\_PD)](#prefix-delegation-ia-pd)  
            [前綴委託 ( IA \_PD)](#prefix-delegation-ia-pd)
            
            -   [Route Installation](#route-installation)  
                [線路安裝](#route-installation)
                
            -   [Static Prefix](#static-prefix)  
                [靜態字首](#static-prefix)
                
            -   [Dynamic Prefix](#dynamic-prefix)  
                [動態前綴](#dynamic-prefix)
                
    -   [Leases DHCPv4/v6](#leases-dhcpv4-v6)  
        [DHCPv4/v6 租約](#leases-dhcpv4-v6)
        

Kea is the next generation of DHCP software, developed by Internet Systems Consortium (ISC).

Kea 是下一代DHCP軟體，由互聯網系統聯盟 ( ISC ) 開發。

It is considered the replacement for ISC-DHCP in larger HA enabled setups and synergizes well with radvd for HA enabled router advertisements.

在支援HA的大型設定中，它被認為是ISC-DHCP的替代品，並且與 radvd 配合良好，可用於支援HA的路由器通告。

Currently it is not possible to register hostnames dynamically between KEA and Unbound, only static reservations will be synchronized on an Unbound service restart.

目前無法在KEA和Unbound之間動態註冊主機名，只有靜態預留會在Unbound服務重啟時同步。

## [Control Agent](#id2)｜[控制代理](#id2)

The Kea Control Agent (CA) is a daemon which exposes a RESTful control interface for managing Kea servers. When building a high available dhcp setup, the control agent is a requirement for these kind of setups.

Kea 控制代理程式 ( CA ) 是一個守護進程，它提供了一個 RESTful 控制接口，用於管理 Kea 伺服器。在建置高可用性 DHCP 伺服器時，控制代理程式是此類伺服器配置的必要元件。

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| Enabled<br>已啟用 | Enable control agent<br>啟用控制代理 |
| Bind address<br>綁定位址 | Address on which the RESTful interface should be available, usually this is localhost (127.0.0.1)<br>RESTful 介面應可用的位址，通常為 localhost ( 127.0.0.1 ) |
| Bind port<br>綁定連接埠 | Choose an unused port for communication here.<br>在此選擇一個未使用的通訊連接埠。 |

Note

筆記

Although the control agent is required to use high availability peers, it does not have to listen on a non loopback address. The peer configuration by default uses the so called “Multi-Threaded Configuration (HA+MT)”, in which case it starts a separate listener for the HA communication.

雖然控制代理需要使用高可用性對等節點，但它不必監聽非環回位址。對等節點配置預設使用所謂的“多執行緒配置 ( HA+MT )”，在這種情況下，它會為HA通訊啟動一個單獨的監聽器。

## [DDNS Agent](#id3)｜[DDNS特工](#id3)

The Kea DHCP DDNS (D2) server is a middleware between the DHCP servers, and authoritative DNS servers. Enabling it is a requirement if dynamic DNS updates (RFC2136) should be sent when clients are assigned an IP address in configured subnets.

Kea DHCP DDNS (D2) 伺服器是DHCP伺服器和權威DNS伺服器之間的中間件。如果要在已設定的子網路中為用戶端指派IP位址時傳送動態DNS更新 ( RFC2136 )，則必須啟用它。

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| Enabled<br>已啟用 | Enable DDNS server. To send updates to an authoritative nameserver, configure Dynamic DNS inside the DHCPv4 and DHCPv6 subnets.<br>啟用DDNS伺服器。若要將更新傳送至權威名稱伺服器，請在 DHCPv4 和 DHCPv6 子網路中設定動態DNS 。 |
| Manual config<br>手動設定 | Disable configuration file generation and manage the file (/usr/local/etc/kea/kea-dhcp-ddns.conf) manually.<br>停用設定檔生成，並手動管理檔案（/usr/local/etc/kea/kea-dhcp-ddns.conf）。 |
| Bind address<br>綁定位址 | Address on which the DHCP DDNS server interface should be available; usually this is localhost (127.0.0.1).<br>DHCP DDNS伺服器介面應可用的位址；通常為本機主機 ( 127.0.0.1 )。 |
| Bind port<br>綁定連接埠 | Portnumber to use for the DHCP DDNS server interface; default is 53001.<br>用於DHCP DDNS伺服器介面的連接埠號碼；預設值為 53001。 |

## [Kea DHCPv4/v6](#id4)｜[Kea DHCPv4/v6](#id4)

This is the DHCPv4/v6 service available in KEA, which offers the following tab sheets with their corresponding settings:

這是KEA中提供的 DHCPv4/v6 服務，它提供了以下選項卡及其對應的設定：

**Settings (DHCPv4/v6)**

**設定（DHCPv4/v6）**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Service**<br>**服務** |  |
| Enabled<br>已啟用 | Enable DHCPv4/v6 server.<br>啟用 DHCPv4/v6 伺服器。 |
| Manual config<br>手動設定 | Disable configuration file generation and manage the file (/usr/local/etc/kea/kea-dhcp4.conf) or (/usr/local/etc/kea/kea-dhcp6.conf) manually.<br>停用設定檔生成，並手動管理檔案（/usr/local/etc/kea/kea-dhcp4.conf）或（/usr/local/etc/kea/kea-dhcp6.conf）。 |
| **General settings**<br>**常規設定** |  |
| Interfaces<br>介面 | Select interfaces to listen on.<br>選擇要監聽的介面。 |
| Valid lifetime<br>有效期限 | Defines how long the addresses (leases) given out by the server are valid (in seconds)<br>定義伺服器指派的位址（租約）的有效時長（以秒為單位） |
| Firewall rules<br>防火牆規則 | Automatically add a basic set of firewall rules to allow dhcp traffic, more fine grained controls can be offered manually when disabling this option.<br>自動新增一組基本的防火牆規則以允許 dhcp 流量，停用此選項時可以手動提供更細微的控制。 |
| Socket type\*\* (DHCPv4 only)<br>套接字類型**（僅限 DHCPv4） | Socket type used for DHCP communication.<br>用於DHCP通訊的套接字類型。 |
| Socket retries<br>套接字重試次數 | Sometimes interfaces can be slow to come up or be unavailable temporarily. This option defines how many times KEA should retry the socket binding.<br>有時介面啟動緩慢或暫時無法使用。此選項定義KEA應重試套接字綁定的次數。 |
| Socket retry wait time<br>套接字重試等待時間 | Defines the wait time in milliseconds between socket retry attempts.<br>定義套接字重試嘗試之間的等待時間，單位為毫秒。 |
| Decline Probation Period<br>拒絕保護期 | Defines how long an address that has been detected as duplicate via DHCPDECLINE will be prevented to be given out to other clients.<br>定義了透過 DHCPDECLINE 偵測到重複位址後，阻止該位址指派給其他用戶端的時長。 |
| MAC sources (DHCPv6 only)<br>MAC 來源（僅限 DHCPv6） | The DHCPv6 protocol does not provide any completely reliable way to retrieve hardware addresses of clients. To mitigate that issue, a number of mechanisms are available. Each of these mechanisms works in certain cases, but may not in others. Whether the mechanism works in a particular deployment is somewhat dependent on the network topology and the technologies used. Please note that this influences PD route installation, since the source MAC address of the client is required to target the link-local route. It also influences MAC based reservations.<br>DHCPv6 協定不提供任何完全可靠的方式來擷取客戶端的硬體位址。為了緩解這個問題，可以使用多種機制。這些機制在某些情況下有效，但在其他情況下可能無效。該機制是否在特定部署中起作用在一定程度上取決於網路拓撲和所使用的技術。請注意，這會影響PD路由安裝，因為需要客戶端的來源MAC位址來定位鏈路本地路由。它也影響基於MAC的預訂。 |
| **Lease Expiration**<br>**租賃到期** |  |
| Affinity lifetime<br>關聯期限 | Defines in seconds for how long a returning client will be able to retrieve the same lease.<br>以秒為單位定義回訪客戶端能夠取得相同租約的時間長度。 |
| Reclamation delay<br>回收延遲 | The interval in seconds between the completion of the previous reclamation cycle and the start of the next one.<br>從上一個回收週期結束到下一個回收週期開始之間的時間間隔（以秒為單位）。 |
| Reclamation initiation<br>租約回收啟動 | This parameter controls the server wait time in seconds between each lease reclamation procedure.<br>此參數控制每次租約回收過程之間的伺服器等待時間（以秒為單位）。 |
| Maximum reclamation time<br>最長收回時間 | Defines an upper limit in milliseconds to the length of time a lease reclamation procedure may take. Use “0” to disable the time limit.<br>定義租賃收回程序所需時間的上限（以毫秒為單位）。使用“0”禁用時間限制。 |
| Maximum reclamation leases<br>最大回收租賃數量 | Defines the maximum number of reclaimed leases that can be processed at one time. Use “0” to set it to unlimited.<br>定義一次可處理的最大回收租賃數量。使用“0”可將其設為無限制。 |
| Cleanup circles<br>清理循環 | This parameter specifies how many consecutive clean-up cycles must end with remaining leases to be processed before a warning is printed.<br>此參數指定在列印警告之前，必須連續完成多少個清理循環且仍有待處理的租約。 |
| **High Availability**<br>**高可用性** |  |
| Enabled<br>已啟用 | Enable High availability hook, requires the Control Agent to be enabled as well.<br>啟用高可用性鉤子，需要同時啟用控制代理程式。 |
| This server name<br>此伺服器名稱 | The name of this server, should match with one of the entries in the HA peers. Leave empty to use this machines hostname<br>該伺服器的名稱應與 HA 對等體中的條目之一相符。留空以使用該機器主機名稱 |
| Max Unacked clients<br>最大未確認客戶端數 | This specifies the number of clients which send messages to the partner but appear to not receive any response. A higher value needs a busier environment in order to consider a member down, when set to 0, any network disruption will cause a failover to happen.<br>這指定向合作夥伴發送訊息但似乎未收到任何回應的客戶端數量。較高的值需要更繁忙的環境才能考慮成員關閉，當設定為 0 時，任何網路中斷都會導致故障轉移。 |

**Subnets (DHCPv4/v6)**

**子網路 (DHCPv4/v6)**

**DHCPv4**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| Subnet<br>子網 | Subnet to use, should be large enough to hold the specified pools and reservations<br>要使用的子網，應足夠大，以容納指定的池和預留空間 |
| Description<br>描述 | You may enter a description here for your reference (not parsed).<br>您可以在此輸入描述以供參考（不會被解析）。 |
| Pools<br>泳池 | List of pools, one per line in range or subnet format (e.g. 192.168.0.100 - 192.168.0.200 , 192.0.2.64/26). Leave this blank if you do not want to offer dynamic leases (i.e: “Deny unknown clients”)<br>池列表，每行一個，採用範圍或子網格式（例如192.168.0.100 - 192.168.0.200 , 192.0.2.64/26）。如果您不想提供動態租約（即：「拒絕未知客戶」），請將此留空 |
| Valid lifetime<br>有效期限 | Valid lifetime for this subnet scope.<br>此子網路範圍內的有效期限。 |
| Match client-id<br>符合客戶端 ID | By default, KEA uses client-identifiers instead of MAC addresses to locate clients, disabling this option changes back to matching on MAC address which is used by most dhcp implementations.<br>預設情況下，KEA 使用客戶端標識符而不是 MAC 位址來定位客戶端，停用此選項將變更回符合大多數 dhcp 實作所使用的 MAC 位址。 |
| **DHCP option data**<br>**DHCP選項資料** |  |
| Auto collect option data<br>自動收集選項資料 | Automatically update option data for relevant attributes as routers, dns servers and ntp servers when applying settings from the gui.<br>透過圖形使用者介面套用設定時，自動更新路由器、DNS 伺服器和 NTP 伺服器等相關屬性的選項資料。 |
| Routers (gateway)<br>路由器（網關） | Default gateways to offer to the clients<br>提供給客戶端的預設閘道 |
| Static routes<br>靜態路由 | Static routes that the client should install in its routing cache, defined as dest-ip1,router-ip1,dest-ip2,router-ip2<br>用戶端應安裝到其路由快取中的靜態路由，定義為 dest-ip1,router-ip1,dest-ip2,router-ip2 |
| DNS servers<br>DNS伺服器 | DNS servers to offer to the clients<br>DNS伺服器提供給客戶 |
| Domain name<br>域名 | The domain name to offer to the client, set to this firewall’s domain name when left empty<br>要提供給客戶端的域名，如果留空，則設定為此防火牆的域名 |
| Domain search<br>網域搜尋 | The domain search list to offer to the client<br>提供給客戶的網域搜尋清單 |
| NTP servers<br>NTP伺服器 | Specifies a list of IP addresses indicating NTP (RFC 5905) servers available to the client.<br>指定一個IP位址列表，指示客戶端可用的NTP ( RFC 5905) 伺服器。 |
| Time servers<br>時間伺服器 | Specifies a list of RFC 868 time servers available to the client.<br>指定客戶端可用的RFC 868 時間伺服器清單。 |
| Next server<br>下一個伺服器 | Next server IP address<br>下一個伺服器IP位址 |
| TFTP server<br>TFTP伺服器 | TFTP server address or FQDN<br>TFTP伺服器位址或FQDN |
| TFTP bootfile name<br>TFTP啟動檔名 | Boot filename to request<br>要請求的啟動檔名 |
| IPv6-only Preferred (Option 108)<br>僅 IPv6 首選（選項 108） | The number of seconds for which the client should disable DHCPv4. The minimum value is 300 seconds.<br>用戶端應停用 DHCPv4 的秒數。最小值為 300 秒。 |
| Options<br>選項 | Select custom DHCPv4 options that were created in the options tab.<br>選擇在「選項」標籤中建立的自訂 DHCPv4 選項。 |
| **Dynamic DNS**<br>**動態DNS** |  |
| DNS forward zone<br>DNS前向區域 | DNS zone where DHCP clients should be registered (e.g. “home.arpa.”).<br>DNS DHCP端應註冊的區域（例如「home.arpa.」）。 |
| DNS reverse zone<br>DNS反向區域 | Full reverse DNS zone receiving PTR updates (e.g. “200.10.10.in-addr.arpa.”).<br>完全反向DNS區域接收PTR更新（例如「 200.10.10 .in-addr.arpa.」）。 |
| DNS qualifying suffix<br>DNS限定後綴 | If a DHCP client only sends a hostname in option 81, append this suffix to create an FQDN (e.g. “home.arpa.”).<br>如果DHCP客戶端僅在選項 81 中傳送主機名，則附加此後綴以建立FQDN （例如「home.arpa.」）。 |
| DNS server address<br>DNS伺服器位址 | Authoritative DNS server receiving dynamic updates.<br>接收動態更新的權威DNS伺服器。 |
| DNS server port<br>DNS伺服器連接埠 | Port of the authoritative DNS server receiving dynamic updates. Leave empty to use default (53).<br>接收動態更新的權威DNS伺服器的連接埠。留空則使用預設值 (53)。 |
| TSIG key name<br>TSIG金鑰名稱 | TSIG key name used for secure DNS updates.<br>TSIG用於安全更新的金鑰名稱。 DNS |
| TSIG key secret<br>TSIG金鑰 | Base64 encoded TSIG key secret.<br>Base64 編碼的TSIG金鑰。 |
| TSIG key algorithm<br>TSIG金鑰演算法 | Algorithm used for TSIG authentication with the DNS server (e.g. hmac-sha256)<br>用於與TSIG伺服器進行身份驗證的演算法（例如DNS -sha256） |
| Override no update<br>覆蓋不更新設定 | Ignores the client’s wishes for no DDNS updates to be performed.<br>忽略客戶端不執行任何DDNS更新的請求。 |
| Override client update<br>覆寫客戶端更新 | Ignores the client’s delegation requests. Causes Kea to perform Dynamic DNS updates even though the client indicated its intention to perform the updates itself.<br>忽略客戶端的委託請求。即使用戶端已表明其打算自行執行更新，Kea 仍會執行動態DNS更新。 |
| Update on renew<br>更新更新 | Instructs the server to always update the DNS information when a lease is renewed, even if its DNS information has not changed. This allows Kea to self-heal if it was previously unable to add DNS entries or they were somehow lost by the DNS server. May impact performance, especially for servers with numerous clients that renew often.<br>指示伺服器在續租時始終更新 DNS 訊息，即使其 DNS 資訊未更改。如果 Kea 之前無法新增 DNS 條目或它們因某種原因被 DNS 伺服器遺失，這允許 Kea 進行自我修復。可能會影響效能，特別是對於具有大量經常更新的客戶端的伺服器。 |
| Conflict resolution mode<br>衝突解決模式 | Controls how DDNS conflicts with DHCID records are handled. The default enforces client ownership via DHCID.<br>控制如何處理DDNS與DHCID記錄之間的衝突。預設設定透過DHCID強制執行客戶端所有權。 |

**DHCPv6**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| Subnet<br>子網 | Subnet to use, should be large enough to hold the specified pools and reservations<br>要使用的子網，應足夠大，以容納指定的池和預留空間 |
| Interface<br>介面 | Select which interface this subnet belongs to<br>選擇此子網路所屬的介面 |
| Dynamic Prefix<br>動態前綴 | Use the identity association prefix allocated to this interface and generate subnet and pools automatically. DHCP options that are not auto collected are unaffected by prefix changes and remain static.<br>使用指派給該介面的身份關聯前綴並自動產生子網路和池。 DHCP 不自動收集的選項不受前綴更改的影響並保持靜態。 |
| Allocator<br>分配器 | Select allocator method to use when offering leases to clients.<br>選擇向客戶提供租賃服務時要使用的分配器方法。 |
| PD Allocator<br>PD分配器 | Select allocator method to use when offering prefix delegations to clients<br>選擇提供前綴委託時要使用的分配器方法 |
| Description<br>描述 | You may enter a description here for your reference (not parsed).<br>您可以在此輸入描述以供參考（不會被解析）。 |
| Pools<br>泳池 | List of pools, one per line in range or subnet format (e.g. 2001:db8:1::-2001:db8:1::100, 2001:db8:1::/80). Leave this blank if you do not want to offer dynamic leases (i.e: “Deny unknown clients”)<br>池列表，每行一個，採用範圍或子網格式（例如2001:db8:1::-2001:db8:1::100, 2001:db8:1::/80）。如果您不想提供動態租約（即：「拒絕未知客戶」），請將此留空 |
| Valid lifetime<br>有效期限 | Valid lifetime for this subnet scope.<br>此子網路範圍內的有效期限。 |
| **DHCP option data**<br>**DHCP選項資料** |  |
| Auto collect option data<br>自動收集選項資料 | Automatically update option data for relevant attributes such as dns servers when applying settings from the gui. When using a dynamic prefix in a subnet, this will set the correct primary IP address automatically.<br>從 GUI 應用設定時自動更新相關屬性（例如 DNS 伺服器）的選項資料。在子網路中使用動態前綴時，這將自動設定正確的主 IP 位址。 |
| DNS servers<br>DNS伺服器 | DNS servers to offer to the clients<br>DNS伺服器提供給客戶 |
| Domain search<br>網域搜尋 | The domain search list to offer to the client<br>提供給客戶的網域搜尋清單 |
| Options<br>選項 | Select custom DHCPv6 options that were created in the options tab.<br>選擇在「選項」標籤中建立的自訂 DHCPv6 選項。 |
| **Dynamic DNS**<br>**動態DNS** |  |
| DNS forward zone<br>DNS前向區域 | DNS zone where DHCP clients should be registered (e.g. “home.arpa.”).<br>DNS DHCP端應註冊的區域（例如「home.arpa.」）。 |
| DNS reverse zone<br>DNS反向區域 | Full reverse DNS zone receiving PTR updates (e.g. “8.b.d.0.1.0.0.2.ip6.arpa.”). This will not be dynamically adjusted if the subnet is configured with a dynamic prefix.<br>完全反向DNS區域接收PTR更新（例如「8.bd 0.1.0.0 .2.ip6.arpa.」）。如果子網路配置了動態前綴，則不會動態調整此設定。 |
| DNS qualifying suffix<br>DNS限定後綴 | If a DHCP client only sends a hostname in option 81, append this suffix to create an FQDN (e.g. “home.arpa.”).<br>如果DHCP客戶端僅在選項 81 中傳送主機名，則附加此後綴以建立FQDN （例如「home.arpa.」）。 |
| DNS server address<br>DNS伺服器位址 | Authoritative DNS server receiving dynamic updates.<br>接收動態更新的權威DNS伺服器。 |
| DNS server port<br>DNS伺服器連接埠 | Port of the authoritative DNS server receiving dynamic updates. Leave empty to use default (53).<br>接收動態更新的權威DNS伺服器的連接埠。留空則使用預設值 (53)。 |
| TSIG key name<br>TSIG金鑰名稱 | TSIG key name used for secure DNS updates.<br>TSIG用於安全更新的金鑰名稱。 DNS |
| TSIG key secret<br>TSIG金鑰 | Base64 encoded TSIG key secret.<br>Base64 編碼的TSIG金鑰。 |
| TSIG key algorithm<br>TSIG金鑰演算法 | Algorithm used for TSIG authentication with the DNS server (e.g. hmac-sha256)<br>用於與TSIG伺服器進行身份驗證的演算法（例如DNS -sha256） |
| Override no update<br>覆寫不更新設定 | Ignores the client’s wishes for no DDNS updates to be performed.<br>忽略客戶端不執行DDNS更新的請求。 |
| Override client update<br>覆蓋客戶端更新 | Ignores the client’s delegation requests. Causes Kea to perform Dynamic DNS updates even though the client indicated its intention to perform the updates itself.<br>忽略客戶端的委託請求。導致 Kea 執行動態 DNS 更新，即使用戶端表示其打算自行執行更新。 |
| Update on renew<br>更新更新 | Instructs the server to always update the DNS information when a lease is renewed, even if its DNS information has not changed. This allows Kea to self-heal if it was previously unable to add DNS entries or they were somehow lost by the DNS server. May impact performance, especially for servers with numerous clients that renew often.<br>指示伺服器在續租時始終更新 DNS 訊息，即使其 DNS 資訊未更改。如果 Kea 之前無法新增 DNS 條目或它們因某種原因被 DNS 伺服器遺失，這允許 Kea 進行自我修復。可能會影響效能，特別是對於具有大量經常更新的客戶端的伺服器。 |
| Conflict resolution mode<br>衝突解決模式 | Controls how DDNS conflicts with DHCID records are handled. The default enforces client ownership via DHCID.<br>控制如何處理DDNS與DHCID記錄之間的衝突。預設設定透過DHCID強制執行客戶端所有權。 |

**PD Pools (DHCPv6)**

**PD池 (DHCPv6)**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| Subnet<br>子網 | Subnet to use, should be large enough to hold the specified prefix.<br>要使用的子網，應足夠大以容納指定的前綴。 |
| Prefix<br>前綴 | The prefix that will be used as prefix delegation pool.<br>將用作前綴委託池的前綴。 |
| Prefix length<br>前綴長度 | The length of the prefix for the prefix delegation pool.<br>前綴委託池的前綴長度。 |
| Delegated length<br>委託長度 | The length of each delegated prefix offered via the prefix delegation pool.<br>透過前綴委託池提供的每個委託前綴的長度。 |
| Description<br>描述 | You may enter a description here for your reference (not parsed).<br>您可以在此輸入描述以供參考（不會被解析）。 |

**Reservations (DHCPv4/v6)**

**預留位址（DHCPv4/v6）**

**DHCPv4**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| Subnet<br>子網路 | Subnet this reservation belongs to<br>此預留屬於哪個子網路 |
| IP address<br>IP地址 | IP address to offer to the client<br>IP提供給客戶的地址 |
| MAC address<br>MAC地址 | MAC address of the client in question<br>MAC相關客戶的地址 |
| Client ID<br>客戶端ID | ID of the client in question. Per default this is preferred over MAC addresses. Disable “Match client-id” in the subnet to skip the Client ID.<br>ID指的是目標客戶端。預設情況下，此位址優先於MAC位址。停用子網路中的「匹配客戶端 ID」選項可跳過客戶端ID 。 |
| Hostname<br>主機名稱 | Offer a hostname to the client<br>提供客戶主機名稱 |
| Description<br>描述 | You may enter a description here for your reference (not parsed).<br>您可以在此輸入描述以供參考（不會被解析）。 |
| **DHCP option data**<br>**DHCP選項資料** |  |
| Auto collect option data<br>自動收集選項資料 | Automatically update option data for relevant attributes as routers, dns servers and ntp servers when applying settings from the gui.<br>透過圖形使用者介面套用設定時，自動更新路由器、DNS 伺服器和 NTP 伺服器等相關屬性的選項資料。 |
| Routers (gateway)<br>路由器（網關） | Default gateways to offer to the clients<br>提供給客戶端的預設閘道 |
| Static routes<br>靜態路由 | Static routes that the client should install in its routing cache, defined as dest-ip1,router-ip1,dest-ip2,router-ip2<br>用戶端應安裝到其路由快取中的靜態路由，定義為 dest-ip1,router-ip1,dest-ip2,router-ip2 |
| DNS servers<br>DNS伺服器 | DNS servers to offer to the clients<br>DNS伺服器提供給客戶 |
| Domain name<br>域名 | The domain name to offer to the client, set to this firewall’s domain name when left empty<br>要提供給客戶端的域名，如果留空，則設定為此防火牆的域名 |
| Domain search<br>網域搜尋 | The domain search list to offer to the client<br>提供給客戶的網域搜尋清單 |
| NTP servers<br>NTP伺服器 | Specifies a list of IP addresses indicating NTP (RFC 5905) servers available to the client.<br>指定一個IP位址列表，指示客戶端可用的NTP ( RFC 5905) 伺服器。 |
| Time servers<br>時間伺服器 | Specifies a list of RFC 868 time servers available to the client.<br>指定客戶端可用的RFC 868 時間伺服器清單。 |
| Next server<br>下一個伺服器 | Next server IP address<br>下一個伺服器IP位址 |
| TFTP server<br>TFTP伺服器 | TFTP server address or FQDN<br>TFTP伺服器位址或FQDN |
| TFTP bootfile name<br>TFTP啟動檔名 | Boot filename to request<br>要請求的啟動檔名 |
| Options<br>選項 | Select custom DHCPv4 options that were created in the options tab.<br>選擇在「選項」標籤中建立的自訂 DHCPv4 選項。 |

**DHCPv6**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| Subnet<br>子網路 | Subnet this reservation belongs to<br>此預留屬於哪個子網路 |
| IP address<br>IP地址 | IP address to offer to the client<br>IP提供給客戶的地址 |
| MAC address<br>MAC地址 | MAC address of the client in question<br>MAC相關客戶的地址 |
| DUID | DUID of the client in question<br>相關客戶的DUID |
| Hostname<br>主機名稱 | Offer a hostname to the client<br>提供客戶主機名稱 |
| Domain search<br>網域搜尋 | The domain search list to offer to the client<br>提供給客戶的網域搜尋清單 |
| Options<br>選項 | Select custom DHCPv6 options that were created in the options tab.<br>選擇在「選項」標籤中建立的自訂 DHCPv6 選項。 |
| Description<br>描述 | You may enter a description here for your reference (not parsed).<br>您可以在此輸入描述以供參考（不會被解析）。 |

**Options (DHCPv4/v6)**

**選項（DHCPv4/v6）**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| Description<br>描述 | You must enter a description here. It is used to reference this option inside reservations and subnets.<br>您必須在此輸入描述。此描述用於在預留和子網路中引用此選項。 |
| **Match DHCP option**<br>**匹配DHCP選項** |  |
| Match Code<br>符合代碼 | The server will only send the option defined in “Set DHCP option” if a client first sends the option defined in “Match DHCP option”. Leave empty to always send the option.<br>僅當客戶端先傳送「符合DHCP選項」中定義的選項時，伺服器才會傳送「設定DHCP選項」中定義的選項。留空則始終發送該選項。 |
| Match Encoding<br>匹配編碼 | Encoding used to evaluate the match condition. “Hex”（十六進位） supports all encapsulated and structured options generically via payload in hexadecimal byte pairs.<br>用於評估匹配條件的編碼。 “Hex”（十六進位） 一般透過十六進位位元組對的有效負載支援所有封裝和結構化選項。 |
| Match Data<br>匹配資料 | Data to match against the selected DHCP option.<br>與所選DHCP選項相符的資料。 |
| **Set DHCP option**<br>**設定DHCP選項** |  |
| Set Code<br>設定代碼 | DHCP option to offer to the client.<br>DHCP可提供給客戶的選項。 |
| Set Encoding<br>設定編碼 | Choose the encoding type. “Hex”（十六進位） supports all encapsulated and structured options generically via payload in hexadecimal byte pairs.<br>選擇編碼類型。 “Hex”（十六進位） 一般透過十六進位位元組對的有效負載支援所有封裝和結構化選項。 |
| Set Data<br>設定資料 | Payload to send to a client.<br>要傳送給客戶端的酬載。 |
| Force<br>強制 | Always send the option, also when the client does not ask for it in the parameter request list.<br>始終傳送該選項，即使用戶端未在參數請求清單中指定該選項。 |

**HA Peers (DHCPv4/DHCPv6)**

**HA對等體 (DHCPv4/DHCPv6)**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| Name<br>名稱 | Peer name, there should be one entry matching this machines “This server name”<br>對等名稱，應該有一個條目與此機器「此伺服器名稱」相符 |
| Role<br>角色 | This peers role<br>此同伴角色 |
| Url<br>URL | This specifies the URL of our server instance, which should use a different port than the control agent. For example [http://my-host:8001/](http://my-host:8001/)<br>這指定了我們伺服器實例的URL ，它應該使用與控制代理不同的連接埠。例如 [http://my-host:8001/](http://my-host:8001/) |

Note

筆記

Define HA peers for this cluster. All nodes should contain the exact same definitions (usually two hosts, a `primary` and a `standby` host)

為此集群定義HA對等節點。所有節點應包含完全相同的定義（通常是兩個主機，一個`primary`主機和一個`standby`主機）。

## [Configuration examples](#id5)｜[設定範例](#id5)

### [DHCPv4 for medium/large HA setups](#id6)｜[適用於中大型HA部署的 DHCPv4](#id6)

KEA DHCPs main strength is the ability to synchronize leases between multiple servers, which makes it ideal for medium to large HA setups (more than 1000 unique clients) where you cannot use Dnsmasq DHCP.

KEA DHCP 的主要優勢在於能夠在多個伺服器之間同步租約，這使其成為中大型HA設定（超過 1000 個獨立用戶端）的理想選擇，在這些設定中，您無法使用 Dnsmasq DHCP 。

As example we configure a network with two KEA DHCP instances on a master and backup OPNsense.

例如，我們配置一個網絡，其中包含兩個KEA DHCP實例，分別位於主 OPNsense 和備份 OPNsense 上。

To configure KEA with a minimal HA setup for LAN using the `192.168.1.0/24` network follow these steps:

若要使用LAN網路配置KEA並實現HA的最小設置`192.168.1.0/24`請依照下列步驟操作：

LAN Network:

LAN網路：

-   CARP IPv4 address: `192.168.1.1/24`  
    CARP IPv4 位址： `192.168.1.1/24`
    
-   Master IPv4 address: `192.168.1.2/24`  
    主IPv4位址： `192.168.1.2/24`
    
-   Backup IPv4 address: `192.168.1.3/24`  
    備用 IPv4 位址： `192.168.1.3/24`
    

Attention

注意

All configuration must be done on the master, and afterwards synchronized to the backup via System: ‣ High Availability ‣ Status

所有設定必須在主伺服器上完成，之後透過系統同步到備份伺服器：‣ 高可用性 ‣ 狀態

-   Go to Services ‣ KEA DHCP ‣ Control Agent:  
    前往服務 ‣ KEA DHCP ‣ 控制代理：
    

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| Enabled<br>已啟用 | `X` |
| Bind address<br>綁定位址 | `127.0.0.1` |
| Bind port<br>綁定埠 | `8000` |

-   Press **Apply** then go to Services ‣ KEA DHCP ‣ KEA DHCPv4 and follow through these tabs:  
    按**套用**，然後前往「服務」‣ KEA DHCP ‣ KEA DHCPv4，並依照下列標籤進行操作：
    

**Settings**

**設定**

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| **Service**<br>**服務** |  |
| Enabled<br>已啟用 | `X` |
| **General settings**<br>**常規設定** |  |
| Interfaces<br>接口 | `LAN` |
| Firewall rules\*\*<br>防火牆規則\** | `X` |
| **High Availability**<br>**高可用性** |  |
| Enabled<br>已啟用 | `X` |
| This server name<br>伺服器名稱 | (It is highly recommended to use the offered default value)<br>（強烈建議使用提供的預設值） |

-   Press **Apply** and go to **Subnets**  
    按**應用**並前往**子網路**
    

**Subnets**

**子網路**

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| Subnet<br>子網 | `192.168.1.0/24` |
| Pools<br>泳池 | `192.168.1.100 - 192.168.1.199` |
| **DHCP option data**<br>**DHCP選項資料** |  |
| Auto collect option data<br>自動收集選項資料 | (This must be unchecked for HA)<br>（對於HA ，此項目必須取消選取） |
| Routers (gateway)<br>路由器（網關） | `192.168.1.1` (use the LAN CARP IP address)<br>`192.168.1.1` （使用LAN CARP IP位址） |
| DNS servers<br>DNS伺服器 | `192.168.1.1` (use the LAN CARP IP address)<br>`192.168.1.1` （使用LAN CARP IP位址） |

-   Press **Save** and go to **HA Peers**  
    按下**儲存**按鈕，然後前往**HA同伴**
    

**HA Peers**

**HA同伴**

-   First entry:  
    第一筆記錄：
    

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| Name<br>名稱 | (Use the name that is displayed in the settings Tab for “This server name” on the master)<br>（使用主伺服器「此伺服器名稱」設定標籤中顯示的名稱） |
| Role<br>角色 | `primary` |
| URL | `http://192.168.1.2:8001/` (Use the LAN interface IP of the master, the port must be different than the control agent)<br>`http://192.168.1.2:8001/` （使用主控端的LAN介面IP ，連接埠必須與控制代理的連接埠不同） |

-   Second entry:  
    第二條：
    

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| Name<br>名稱 | (Use the name that is displayed in the settings Tab for “This server name” on the backup)<br>（使用備份設定標籤中「此伺服器名稱」顯示的名稱） |
| Role<br>角色 | `standby` |
| URL | `http://192.168.1.3:8001/` (Use the LAN interface IP of the backup, the port must be different than the control agent)<br>`http://192.168.1.3:8001/` （使用備份的LAN介面IP ，連接埠必須與控制代理的連接埠不同） |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

Now the initial configuration is finished, and we synchronize it with the backup server. Both servers will always share the exact same configuration.

初始配置已完成，我們將其與備份伺服器同步。兩台伺服器將始終共用完全相同的配置。

Go to System: ‣ High Availability ‣ Settings and ensure that KEA is selected in **Services to synchronize**.

前往系統：‣ 高可用性 ‣ 設置，並確保在**要同步的服務**中選擇了KEA 。

Then go to System: ‣ High Availability ‣ Status and press **Synchronize and reconfigure all**.

然後轉到系統：‣ 高可用性 ‣ 狀態，然後按下**全部同步和重新配置**。

Immediately afterwards, KEA will be active on both master and backup, and a bidirectional lease synchronization will be configured.

隨後， KEA將在主庫和備份庫上同時激活，並配置雙向租約同步。

### [DHCP Options](#id7)｜[DHCP選項](#id7)

Each subnet and reservation has an DHCP option data list available. If Auto collect option data is enabled, some DHCP options like router, DNS server and system domain are added automatically. Additional fields can be filled out with other common options.

每個子網路和預留都對應一個DHCP選項資料清單。如果啟用了“自動收集選項資料”，則會自動添加一些DHCP選項，例如路由器、 DNS伺服器和系統網域。其他欄位可以填寫其他常用選項。

In cases where more advanced DHCP options need to be sent, you can use the **Options** tab found in Services ‣ KEA DHCP ‣ KEA DHCPv4 and Services ‣ KEA DHCP ‣ KEA DHCPv6.

如果需要傳送更進階的 DHCP 選項，可以使用「服務」‣「KEA DHCP」‣「KEA DHCPv4」和「服務」‣「KEA DHCP」‣「KEA DHCPv6」中的「**選項**」標籤。

When adding a new option, you can enter matching and setting parameters:

新增選項時，您可以輸入匹配和設定參數：

> -   When matching a DHCP option, a client class with a test is created. The set option will only be sent to clients that pass the test.  
      當配對到DHCP選項時，系統會建立一個帶有測試的客戶端類別。此選項集只會傳送給通過測試的用戶端。
>     
> -   When setting a DHCP option, the payload will be sent unconditionally if no match exists in the same input mask.  
      設定DHCP選項時，如果同一輸入遮罩中不存在匹配項，則有效載荷將無條件發送。
>     

To send a created option, attach it to a reservation or subnet in their respective tabs with the available **Options** dropdown menu.

若要傳送已建立的選項，請使用可用的**選項**下拉式功能表將其附加到各自標籤中的預留或子網路。

Combining both set and match enables you to create multiple options with the same code, but different payloads. A common example is matching based on client architecture and sending a specific boot file as payload:

結合使用 set 和 match 函數，您可以建立多個使用相同程式碼但有效負載不同的選項。一個常見的例子是基於客戶端架構進行匹配，並將特定的啟動文件作為有效負載發送：

-   Go to Services ‣ KEA DHCP ‣ KEA DHCPv4 and follow through these tabs:  
    前往「服務」‣ KEA DHCP ‣ KEA DHCPv4，然後依照下列選項卡操作：
    

**Option**

**選項**

Create an option for BIOS boot:

為BIOS啟動建立一個選項：

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| Description<br>描述 | `option-bios-bootfile` |
| **Match DHCP option**<br>**匹配DHCP選項** |  |
| Match Code<br>比賽代碼 | `client-system [93]` |
| Match Encoding<br>匹配編碼 | `uint16` |
| Match Data<br>比賽數據 | `0` |
| **Set DHCP option**<br>**設定DHCP選項** |  |
| Set Code<br>設定代碼 | `bootfile-name [67]` |
| Set Encoding<br>設定編碼 | `string` |
| Set Data<br>設定資料 | `undionly.kpxe` |

Create an option for EFI boot:

為EFI啟動建立一個選項：

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| Description<br>描述 | `option-efi-bootfile` |
| **Match DHCP option**<br>**匹配DHCP選項** |  |
| Match Code<br>比賽代碼 | `client-system [93]` |
| Match Encoding<br>匹配編碼 | `uint16` |
| Match Data<br>比賽數據 | `7` |
| **Set DHCP option**<br>**設定DHCP選項** |  |
| Set Code<br>設定代碼 | `bootfile-name [67]` |
| Set Encoding<br>設定編碼 | `string` |
| Set Data<br>設定資料 | `snponly.efi` |

-   Press **Save** and go to **Subnets**  
    按**儲存**，然後前往**子網路**
    

**Subnets**

**子網路**

Select an available subnet, and add the **Options** you created:

選擇一個可用的子網，並新增您建立的**選項**：

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| Options<br>選項 | `option-bios-bootfile`, `option-efi-bootfile` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

With this configuration, any client that sends `client-system [93]` containing the value `0` will be provided with `bootfile-name [67]` and `undionly.kpxe`. The same logic applies to the efi bootfile.

在此配置下，任何發送包含值`0`的`client-system [93]`的客戶端都會獲得`bootfile-name [67]`和`undionly.kpxe` 。同樣的邏輯也適用於EFI引導檔。

Note

筆記

Matching is optional, leave it empty to send the option out to any client in the subnet it is attached to.

匹配是可選的，留空會將該選項傳送給它所連接的子網路中的任何用戶端。

Tip

提示

Any option can be sent as user defined hex. This helps for structured and encapsulated options that may have multiple types or are binary blobs. A common example is `vendor specific [43]`, which is used for vendor specific information. Just as with the bootfiles example, if you match client specific option codes, you can send out different vendor specific option codes in the same subnet.

任何選項都可以以使用者自訂的十六進位格式發送。這有助於處理結構化和封裝的選項，這些選項可能具有多種類型或為二進位資料區塊。一個常見的例子是`vendor specific [43]` ，它用於儲存廠商特定的資訊。與引導文件範例類似，如果符合客戶端特定的選項代碼，則可以在同一子網路中傳送不同的廠商特定選項代碼。

### [Dynamic DNS (RFC2136)](#id8)｜[動態DNS ( RFC2136 )](#id8)

KEA allows registering client FQDNs via dynamic DNS (RFC2136) to an authoritative DNS server.

KEA允許透過動態DNS ( RFC2136 ) 向權威DNS伺服器註冊客戶端 FQDN。

Such an authoritative DNS server will be ISC BIND or an alternative like PowerDNS. Recursive DNS servers like Dnsmasq or Unbound are not able to fulfill this role.

這樣的權威DNS伺服器可以是ISC BIND ，或是像PowerDNS這樣的替代方案。像Dnsmasq或Unbound這樣的遞歸DNS伺服器無法勝任此角色。

Tip

提示

The OPNsense Business Edition includes [Authoritative DNS](<48 權威DNS.md>) with RFC2136 support.

OPNsense 商業版包含 [權威DNS](<48 權威DNS.md>)和RFC2136支持。

When clients register their IP address, the DHCP server will receive a Client FQDN (DHCP option 81) that either contains a client hostname or an FQDN. In cases where clients only send a hostname, using the DNS qualifying suffix will construct an FQDN and force an update anyway.

當客戶端註冊其IP位址時， DHCP伺服器將收到一個客戶端FQDN （ DHCP選項81），其中包含客戶端主機名稱或FQDN 。如果客戶端僅傳送主機名，則使用DNS限定後綴將建構一個FQDN並強制進行更新。

Attention

注意

The client is responsible to send the Dynamic DNS update request via DHCP option 81. Only with this payload, the hostname will be registered in a forward zone. Clients that do not send any hostname cannot be registered, the administrator must ensure all of their devices have unique hostnames configured.

客戶端負責透過DHCP選項 81 發送動態DNS更新請求。只有發送此請求，主機名稱才能在轉送區域中註冊。未傳送任何主機名稱的用戶端無法註冊，管理員必須確保所有裝置都配置了唯一的主機名稱。

As an example setup, we have configured a zone like this in ISC BIND. The example taken from the [KEA DDNS](https://kea.readthedocs.io/en/latest/arm/ddns.html) documentation:

作為範例設置，我們在ISC BIND中配置了一個如下所示的區域。此範例取自 [KEA DDNS](https://kea.readthedocs.io/en/latest/arm/ddns.html)文件：

```
:
key "key.four.example.com." {
    algorithm hmac-sha224;
    secret "bZEG7Ow8OgAUPfLWV3aAUQ==";
};
:
```

To configure the forward zone for a DHCPv4 range, go to Services ‣ KEA DHCP ‣ KEA DHCPv4 and select a subnet:

若要為 DHCPv4 位址範圍設定轉送區域，請前往「服務」‣ KEA DHCP ‣ KEA DHCPv4 並選擇子網路：

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| Subnet<br>子網 | `192.168.1.0/24` |
| Pools<br>泳池 | `192.168.1.100 - 192.168.1.199` |
| **DHCP option data**<br>**DHCP選項資料** |  |
| Auto collect option data<br>自動收集選項資料 | (This must be unchecked)<br>（必須取消選取此項目） |
| Routers (gateway)<br>路由器（網關） | `192.168.1.1` |
| DNS servers<br>DNS伺服器 | `192.168.1.1` |
| Domain name<br>網域 | `four.example.com` |
| **Dynamic DNS**<br>**動態DNS** |  |
| DNS forward zone<br>DNS前場 | `four.example.com.` |
| DNS qualifying suffix<br>DNS限定後綴 | `four.example.com.` (optional, use if your clients do not send an FQDN via DHCP option 81)<br>`four.example.com.` （可選，如果您的客戶未通過DHCP選項 81 發送FQDN則使用） |
| DNS server<br>DNS伺服器 | `203.0.113.1` |
| TSIG key name<br>TSIG金鑰名稱 | `key.four.example.com.` |
| TSIG key secret<br>TSIG金鑰 | `bZEG7Ow8OgAUPfLWV3aAUQ==` |
| TSIG key algorithm<br>TSIG金鑰演算法 | `hmac-sha224` |

Next, enable the KEA DDNS Agent. Go to Services ‣ KEA DHCP ‣ DDNS Agent:

接下來，啟用KEA DDNS代理。轉到“服務” KEA DHCP DDNS ：

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| Enabled<br>已啟用 | `X` |
| Bind address<br>綁定位址 | `127.0.0.1` |
| Bind port<br>綁定埠 | `53001` |

After applying the configuration, the DHCP servers construct DDNS update requests, known as NameChangeRequests (NCRs), based on DHCP lease change events and then post them to the DDNS Agent. The DDNS Agent attempts to match each request to the appropriate DNS server and carries out the necessary conversation with those servers to update the DNS data.

套用設定後，DHCP 伺服器根據 DHCP 租約更改事件建構 DDNS 更新請求，稱為 NameChangeRequest (NCR)，然後將其發佈到 DDNS 代理。 DDNS代理嘗試將每個請求與適當的DNS伺服器相匹配，並與這些伺服器進行必要的對話以更新DNS資料。

Note

筆記

The TSIG key name must be unique per DNS forward zone. If you configure multiple subnets with an identical DNS forward zone, but different TSIG key names and TSIG key secrets, only the first one will be taken into account. Best practice would be creating one unique DNS forward zone per subnet, each with a unique TSIG key name.

每個轉送區域的金鑰名稱TSIG DNS唯一。如果您配置了多個子網路，且這些子網路具有相同的轉送區域DNS ，但金鑰名稱TSIG和金鑰密文TSIG不同，則只會考慮第一個子網路。最佳實務是為每個子網路建立一個唯一的轉送區域DNS ，每個轉送區域都有唯一的金鑰名稱TSIG ）。

Attention

注意

Only subnets that have a DNS server configured will send DDNS updates.

只有配置了DNS伺服器的子網路才會發送DDNS更新。

For reverse zone updates enable the advanced mode inside a subnet. Add your DNS reverse zone to the existing forward configuration. Please note that reverse zone updates will be sent to the same DNS server as the forward zone updates.

對於反向區域更新，請在子網路內啟用進階模式。將您的DNS反向區域加入現有的正向配置。請注意，反向區域更新將發送到與正向區域更新相同的DNS伺服器。

Some clients might send client specific flags to avoid reverse zone updates. You can override that behavior with Override no update and Override client update.

某些用戶端可能會傳送用戶端特定的標誌來避免反向區域更新。您可以使用「覆蓋不更新」和「覆蓋用戶端更新」來覆寫此行為。

### [Prefix Delegation (IA\_PD)](#id9)｜[前綴委託 ( IA \_PD)](#id9)

Kea supports prefix delegation with static or dynamic prefixes. A prefix delegation is most commonly used for router behind router setups, yet also in client implementations that run their own VMs.

Kea 支援靜態或動態前綴的前綴委派。前綴委派最常用於路由器嵌套的路由架構，但也適用於運行自有虛擬機器的客戶端實作。

#### [Route Installation](#id10)｜[線路安裝](#id10)

Whenever an `IA_PD` lease is acknowledged, a route targeting the link-local address of the requesting DHCPv6 client will be automatically installed.

每當`IA_PD`租約得到確認時，都會自動安裝一條以請求 DHCPv6 用戶端的鏈路本地位址為目標的路由。

Since lease files are synchronized in high availability mode, the routes will also be installed and cleaned up on both peers.

由於租約檔案在高可用性模式下是同步的，因此路由也會在兩個對等節點上安裝和清理。

Note

筆記

If the MAC address for a client route installation is not found, take a look at the *MAC sources* option in the general DHCPv6 settings. It influences how client MAC addresses are constructed per default. The current default `ipv6-link-local` will construct the MAC out of an EUI-64 link-local address. This should work for most clients, yet if they use random link-local addresses, `duid` would be the next best option.

如果找不到客戶端路由安裝的MAC位址，請查看常規 DHCPv6 設定中的* MAC sources*選項。它會影響客戶端MAC位址的預設建構方式。目前預設的`ipv6-link-local`會使用EUI -64鏈路本地地址構造MAC 。這應該適用於大多數客戶端，但如果它們使用隨機鏈路本地地址， `duid`將是次佳選擇。

#### [Static Prefix](#id11)｜[靜態字首](#id11)

As an example setup, we will use unique local addresses (ULA) to lease an `IA_NA` address (/128 IPv6 address) and a `IA_PD` prefix (/56 IPv6 prefix) to a requesting client.

作為範例設置，我們將使用唯一的本地位址（ ULA ）向請求客戶端租用`IA_NA`位址（/128 IPv6 位址）和`IA_PD`前綴（/56 IPv6 前綴）。

Prefix: `fd80::/48`

字首： `fd80::/48`

-   Go to Services ‣ KEA DHCP ‣ KEA DHCPv6 and follow through these tabs:  
    前往「服務」‣ KEA DHCP ‣ KEA DHCPv6，然後依照下列選項卡操作：
    

**Settings**

**設定**

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| **Service**<br>**服務** |  |
| Enabled<br>已啟用 | `X` |
| **General settings**<br>**常規設定** |  |
| Interfaces<br>接口 | `LAN` |
| Firewall rules<br>防火牆規則 | `X` |

**Subnets**

**子網路**

For the `IA_NA` address pool, we take the first /52 prefix (`fd80::/52`) of the available /48 prefix (`fd80::/48`)

對於`IA_NA`地址池，我們取可用 /48 前綴 ( `fd80::/52` ) 的第一個 /52 前綴 ( `fd80::/48` )。

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| Subnet<br>子網 | `fd80::/48` |
| Pools<br>獎金池 | `fd80::100 - fd80::199` (/52 will be auto calculated via the pool)<br>`fd80::100 - fd80::199` (/52 將透過獎金池自動計算) |

**PD Pools**

**PD泳池**

For the `IA_PD` pool, we take the second /52 prefix (`fd80:0:0:1000::/52`), and lease up to 16 prefixes (`fd80:0:0:1000::/56 - fd80:0:0:10F0::/56`) to clients.

對於`IA_PD`池，我們取第二個 /52 前綴 ( `fd80:0:0:1000::/52` )，並向客戶端出租最多 16 個前綴 ( `fd80:0:0:1000::/56 - fd80:0:0:10F0::/56` )。

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| Subnet<br>子網 | `fd80::/48` |
| Prefix<br>字首 | `fd80:0:0:1000::` |
| Prefix length<br>字首長度 | `52` |
| Delegated length<br>委託長度 | `56` |

After applying the configuration, clients will receive an `IA_NA` address (e.g., `fd80::100/128`) and an `IA_PD` prefix (e.g., `fd80:0:0:1000::/56`).

套用配置後，客戶端將收到一個`IA_NA`位址（例如， `fd80::100/128` ）和一個`IA_PD`前綴（例如， `fd80:0:0:1000::/56` ）。

#### [Dynamic Prefix](#id12)｜[動態字首](#id12)

As an example setup, our provider has provided us a prefix via DHCPv6 on our WAN interface.

例如，我們的提供者透過 DHCPv6 在我們的WAN介面上為我們提供了一個前綴。

Prefix: `2001:db8:1234::/56`

字首： `2001:db8:1234::/56`

We will use `Identity association` mode to carve out a prefix on LAN that is big enough to host a PD pool.

我們將使用`Identity association`模式在LAN上劃分出一個足夠大的前綴來託管PD池。

-   Go to Interfaces and set the following configuration:  
    轉到“接口”並設定以下配置：
    

**LAN**

To reserve a prefix range, the combination of the hexadecimal value Assign prefix ID and the decimal length value Reserved prefix range is used. On our LAN interface, we start with an assigned prefix ID of 0, which marks the first /64 network available. We reserve a /60 prefix for KEA’s subnet on this interface, so we count up 16x /64 networks via the reserved prefix range.

要預留前綴範圍，需要將十六進位值「分配前綴」 ID和十進位長度值「保留前綴範圍」組合起來使用。在我們的介面LAN上，我們首先分配前綴ID為 0，這標誌著第一個可用的 /64 網路。我們在此介面上為KEA的子網路預留一個 /60 前綴，因此透過預留前綴範圍，我們可以向上計數 16 個 /64 網路。

LAN will now reserve the hexadecimal prefix IDs 0-F.

LAN現在將保留十六進位前綴 ID 0-F。

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| IPv6 Configuration Type<br>IPv6 設定類型 | `Identity association` |
| Parent interface<br>父界面 | `WAN` |
| Assign prefix ID<br>分配前綴ID | `0` |
| Reserved prefix range<br>保留前綴範圍 | `16` |

**OPT1**

In this example we want to reserve a /61 prefix, so our decimal reserved prefix range is 8. Since our LAN interface already reserves the hexadecimal prefix IDs 0-F, for OPT1 we start at the hexadecimal prefix ID 10.

在這個例子中，我們要保留一個 /61 前綴，所以我們保留的十進位前綴範圍是 8。由於我們的LAN介面已經保留了十六進位前綴 ID 0-F，所以對於OPT1 ，我們從十六進位前綴ID 10 開始。

OPT1 will now reserve the hexadecimal prefix IDs 10-17.

OPT1現在將保留十六進位前綴 ID 10-17。

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| IPv6 Configuration Type<br>IPv6 設定類型 | `Identity association` |
| Parent interface<br>父界面 | `WAN` |
| Assign prefix ID<br>分配前綴ID | `10` |
| Reserved prefix range<br>保留前綴範圍 | `8` |

**OPT2**

In this example we want to reserve a /62 prefix, so our decimal reserved prefix range is 4. Since our LAN interface reserves the hexadecimal prefix IDs 0-F, and our OPT1 interface the hexadecimal prefix IDs 10-17, for OPT1 we start at the hexadecimal prefix ID 18.

在這個例子中，我們要保留一個 /62 前綴，所以我們保留的十進位前綴範圍是 4。由於我們的LAN介面保留了十六進位前綴 ID 0-F，而我們的OPT1介面保留了十六進位前綴 ID 10-17，因此對於OPT1 ，我們從ID進位前綴 18 開始。

OPT2 will now reserve the hexadecimal prefix IDs 18-1B.

OPT2現在將保留十六進位前綴 ID 18-1B。

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| IPv6 Configuration Type<br>IPv6 設定類型 | `Identity association` |
| Parent interface<br>父界面 | `WAN` |
| Assign prefix ID<br>分配前綴ID | `18` |
| Reserved prefix range<br>保留前綴範圍 | `4` |

Attention

注意

If you change these ranges later or remove interfaces, ensure you also update the KEA configuration. If an interface is removed, also remove the dynamic subnet from KEA. If prefix ID ranges are changed, ensure the delegated length in a PD pool is updated with a new value that fits into that network. If not followed, KEA will emit log messages with details and may fail to start.

如果您之後更改這些範圍或移除接口，請務必同時更新KEA配置。如果移除介面，也請從KEA中移除動態子網路。如果更改前綴ID範圍，請確保將PD池中的委派長度更新為適合該網路的新值。否則， KEA將產生包含詳細資訊的日誌訊息，並且可能無法啟動。

-   Next, go to Services -> Kea DHCP -> Kea DHCPv6 and configure the dynamic PD pool for LAN:  
    接下來，前往“服務”->“Kea DHCP ->“Kea DHCPv6”，並為LAN配置動態PD地址池：
    

**Settings**

**設定**

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| **Service**<br>**服務** |  |
| Enabled<br>已啟用 | `X` |
| **General settings**<br>**常規設定** |  |
| Interfaces<br>接口 | `LAN` |
| Firewall rules<br>防火牆規則 | `X` |

**Subnets**

**子網路**

The subnet pool is automatically calculated. Since our example prefix ID range is from `0-F`, the calculated subnet size will be `2001:db8:1234::/60`. This subnet will be automatically split into two subnets:

子網路池大小會自動計算。由於我們的範例前綴ID範圍從`0-F`開始，因此計算出的子網路大小為`2001:db8:1234::/60` 。此子網路將自動拆分為兩個子網路：

> -   the first subnet `2001:db8:1234::/61` will host the `IA_NA` pool `2001:db8:1234::/64`  
      第一個子網`2001:db8:1234::/61`將託管`IA_NA`池`2001:db8:1234::/64`
>     
> -   the second subnet `2001:db8:1234:8::/61` will host the `IA_PD` pool.  
      第二個子網路`2001:db8:1234:8::/61`將託管`IA_PD`池。
>     

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| Interface<br>介面 | `LAN` |
| Dynamic Prefix<br>動態前綴 | `X` |
| Auto collect option data<br>自動收集選項資料 | `X` (optional, if you also want to send a dynamic DNS server)<br>`X` （可選，如果您還想發送動態DNS伺服器） |

**PD Pools**

**PD泳池**

For the `IA_PD` pool, the automatically calculated `IA_PD` prefix of the subnet is used. In our example that is `2001:db8:1234:8::/61`. This is the range which can be delegated to other routers. We can set the delegated length to control how many prefixes can be leased from this pool. In our case we need 2 delegated prefixes, so we set a delegated length of `/62`.

對於`IA_PD`池，使用子網路自動計算的`IA_PD`前綴。在本例中，該前綴為`2001:db8:1234:8::/61` 。此範圍可以委派給其他路由器。我們可以設定委派長度來控制可以從該池租用的前綴數量。在本例中，我們需要2個委派前綴，因此我們將委派長度設為`/62` 。

| **Option**<br>**選項** | **Value**<br>**價值** |
| --- | --- |
| Subnet<br>子網 | `LAN` |
| Delegated length<br>委託長度 | `62` |

Note

筆記

By splitting your ISP provided prefix smartly, each of your internal networks can have dynamic prefix delegation ranges.

透過巧妙地拆分您提供的ISP前綴，您的每個內部網路都可以擁有動態前綴委派範圍。

After applying the configuration, clients will receive an `IA_NA` address (e.g., `2001:db8:1234::100/128`) and an `IA_PD` prefix (e.g., `2001:db8:1234:8::/62`).

應用配置後，客戶端將收到一個`IA_NA`位址（例如， `2001:db8:1234::100/128` ）和一個`IA_PD`前綴（例如， `2001:db8:1234:8::/62` ）。

Attention

注意

Using HA in combination with dynamic prefix delegation is not recommended. When using a DHCPv6 provided ISP prefix, both HA peers would likely get different prefixes from the ISP, which would cause problems with the HA setup since the KEA configurations would differ between peers. For an HA setup, using a static IPv6 prefix is a **requirement** to ensure a single routing identity.

不建議將HA與動態前綴委派結合使用。當使用DHCPv6提供的ISP前綴時，兩個HA對等體很可能從ISP獲取不同的前綴，這將導致HA配置出現問題，因為對等體的KEA配置會不同。對於HA配置，使用靜態IPv6前綴是確保單一路由身分的**必要條件**。

## [Leases DHCPv4/v6](#id13)｜[租約 DHCPv4/v6](#id13)

This page offers an overview of the (non static) leases being offered by KEA DHCPv4/v6.

本頁面概述了KEA DHCPv4/v6 提供的（非靜態）租約。

Tip

提示

There are action buttons to quickly register and find reservations.

這裡設有操作按鈕，方便使用者快速註冊並尋找預訂資訊。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：ISC DHCP](<195 ISC DHCP.md>)　｜　[下一篇：Router Advertisements｜路由器廣告 ➡](<197 路由器廣告.md>)
