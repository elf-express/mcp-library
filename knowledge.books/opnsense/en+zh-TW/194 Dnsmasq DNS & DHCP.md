---
title: "Dnsmasq DNS & DHCP"
source: "https://docs.opnsense.org/manual/dnsmasq.html"
chapter: ["Services"]
order: 194
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:18.884Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：DHCrelay｜DH 繼電器](<193 DH 繼電器.md>)　｜　[下一篇：ISC DHCP ➡](<195 ISC DHCP.md>)

# Dnsmasq DNS & DHCP

> 章節：[Services](<000 目錄.md#c-40>)

## [Dnsmasq DNS & DHCP](#id1)｜[Dnsmasq DNS & DHCP](#id1)

Index

指數

-   [Dnsmasq DNS & DHCP](#dnsmasq-dns-dhcp)  
    [Dnsmasq DNS & DHCP](#dnsmasq-dns-dhcp)
    
    -   [Considerations before deployment](#considerations-before-deployment)  
        [部署前註意事項](#considerations-before-deployment)
        
        -   [DNS Service](#dns-service)  
            [DNS服務](#dns-service)
            
        -   [DHCP Service](#dhcp-service)  
            [DHCP服務](#dhcp-service)
            
    -   [General Settings](#general-settings)  
        [常規設定](#general-settings)
        
    -   [DNS Settings](#dns-settings)  
        [DNS設定](#dns-settings)
        
    -   [DHCP Settings](#dhcp-settings)  
        [DHCP設定](#dhcp-settings)
        
    -   [Advanced settings](#advanced-settings)  
        [進階設定](#advanced-settings)
        
    -   [Configuration examples](#configuration-examples)  
        [設定範例](#configuration-examples)
        
        -   [DHCPv4 with DNS registration](#dhcpv4-with-dns-registration)  
            [DHCPv4，已註冊DNS](#dhcpv4-with-dns-registration)
            
        -   [DHCPv6 and Router Advertisements](#dhcpv6-and-router-advertisements)  
            [DHCPv6 與路由器通告](#dhcpv6-and-router-advertisements)
            
        -   [DHCP reservations](#dhcp-reservations)  
            [DHCP預訂](#dhcp-reservations)
            
        -   [DHCP tags](#dhcp-tags)  
            [DHCP標籤](#dhcp-tags)
            
        -   [DHCP boot](#dhcp-boot)  
            [DHCP啟動](#dhcp-boot)
            
        -   [DHCPv4 for small HA setups](#dhcpv4-for-small-ha-setups)  
            [適用於小型HA設定的 DHCPv4](#dhcpv4-for-small-ha-setups)
            
        -   [DHCPv6 and Router Advertisements for small HA setups](#dhcpv6-and-router-advertisements-for-small-ha-setups)  
            [小型HA設定的 DHCPv6 和路由器通告](#dhcpv6-and-router-advertisements-for-small-ha-setups)
            
        -   [Dnsmasq as primary DNS resolver](#dnsmasq-as-primary-dns-resolver)  
            [Dnsmasq 為主要解析器DNS](#dnsmasq-as-primary-dns-resolver)
            
        -   [Firewall Alias (IPset)](#firewall-alias-ipset)  
            [防火牆別名（IP集）](#firewall-alias-ipset)
            

Dnsmasq is a lightweight and easy to configure DNS forwarder and DHCPv4/DHCPv6 server.

Dnsmasq 是一個輕量級且易於設定的DNS轉發器和 DHCPv4/DHCPv6 伺服器。

It is considered the replacement for ISC-DHCP in small and medium sized setups and synergizes well with Unbound DNS, our standard enabled forward/resolver service.

它被認為是中小型部署中ISC-DHCP的替代品，並且與我們的標準啟用轉發/解析器服務 Unbound DNS有很好的協同作用。

Our system setup wizard configures Unbound DNS for DNS and Dnsmasq for DHCPv4, DHCPv6 and Router Advertisements.

我們的系統設定精靈會為DNS設定DNS ，並為 DHCPv4、DHCPv6 和路由器通告設定 Dnsmasq。

## [Considerations before deployment](#id2)｜[部署前註意事項](#id2)

### [DNS Service](#id3)｜[DNS服務](#id3)

Dnsmasq can be combined with Unbound to act as a “connector”, in which case DHCP leases which have their hostnames registered in Dnsmasq may be queried directly by Unbound.

Dnsmasq 可以與 Unbound 結合使用，充當“連接器”，在這種情況下，在 Dnsmasq 中註冊了主機名的DHCP租約可以直接由 Unbound 查詢。

Since Dnsmasq does not restart on configuration changes and does not need custom scripts to register DNS, it is very resilient and easy to manage.

由於 Dnsmasq 在配置變更時不會重新啟動，也不需要自訂腳本來註冊DNS ，因此它具有很強的彈性，易於管理。

Note

筆記

Unbound is a recursive resolver, Dnsmasq a non-resursive forwarding DNS server. This means Dnsmasq always needs a recursive DNS resolver it can forward its queries to. This can be Unbound, or another DNS Service on the internet.

Unbound 是一個遞歸解析器，而 Dnsmasq 是一個非遞歸DNS伺服器。這意味著 Dnsmasq 始終需要一個遞歸DNS來轉發其查詢。這個解析器可以是 Unbound，也可以是DNS上的其他服務。

In the configuration examples further below, we will always combine Unbound with Dnsmasq.

在下面的設定範例中，我們將始終將 Unbound 與 Dnsmasq 結合使用。

### [DHCP Service](#id4)｜[DHCP服務](#id4)

Dnsmasq is the perfect DHCP server for small and medium sized setups (less than 1000 unique clients). The configuration is straight forward, and since it can register the DNS names of leases, it can replicate the simplicity known from consumer routers.

Dnsmasq 是中小型網路環境（少於 1000 個獨立用戶端）的理想DHCP伺服器。它的配置非常簡單，而且由於可以註冊租約的DNS名稱，因此可以媲美家用路由器的簡易操作。

If HA for DHCP is a requirement, split pools can be configured for two Dnsmasq instances. With a dhcp reply delay, the secondary instance will only answer when the first instance is unresponsive. DHCPv6 and Router Advertisements are also an option for small HA setups that do not have fast failover requirements, as IPv6 failover can take up to 30 seconds with available configuration options.

如果需要使用HA來設定DHCP ，則可以為兩個 Dnsmasq 實例配置拆分池。透過設定 DHCP 回應延遲，備用實例僅在主實例無回應時才會回應。對於沒有快速故障轉移要求的小型HA設置，DHCPv6 和路由器通告也是可行的選擇，因為根據可用的設定選項，IPv6 故障轉移可能需要長達 30 秒。

For larger enterprise setups, KEA DHCP can be a viable alternative. It supports lease synchronisation via REST API, which means both DHCP servers keep track of all existing leases and do not need split pools. It is also far more scalable if there are thousands of leases.

對於規模較大的企業級部署， KEA DHCP可能是可行的替代方案。它支援透過REST API進行租約同步，這意味著兩個DHCP伺服器都會追蹤所有現有租約，無需拆分池。此外，如果租約數量達到數千個，它的可擴展性也更強。

The tradeoff using KEA DHCP is a more complicated setup, especially when custom DHCP options are needed. DNS registration is also not possible.

使用KEA DHCP權衡之處在於設定更為複雜，尤其是在需要自訂DHCP選項時。此外， DNS註冊也無法實現。

With this in mind, pick the right choice for your setup. When in doubt, our advise is to use Dnsmasq.

考慮到這一點，請根據您的實際配置選擇合適的方案。如有疑問，我們建議使用 Dnsmasq。

Attention

注意

There is DHCPv6 and Router Advertisement support. Keep in mind that just as with DHCPv4/DHCPv6 servers, there should not be multiple Router Advertisement servers running on the same system. Right now, Services ‣ Router Advertisements is the default RA daemon. If you are unsure, do not enable them in Dnsmasq.

支援 DHCPv6 和路由器通告。請注意，與 DHCPv4/DHCPv6 伺服器一樣，在同一系統上不應執行多個路由器通告伺服器。目前，「服務」‣「路由器通告」是預設的RA守護程式。如果您不確定，請不要在 Dnsmasq 中啟用它們。

## [General Settings](#id5)｜[常規設定](#id5)

Most settings are pretty straightforward here when the service is enabled, it should just start forwarding dns requests when received from the network. DHCP requires at least one dhcp-range and matching dhcp-options.

啟用服務後，大多數設定都非常簡單，它應該會在收到來自網路的 DNS 請求時立即開始轉送DHCP要求至少有一個 DHCP 位址範圍和相符的 DHCP 選項。

Tip

提示

-   To disable the DNS feature, set the Listen Port to `0`.  
    若要停用DNS功能，請將監聽埠設定為`0` 。
    
-   To disable the DHCP feature, select interfaces in Interface \[no dhcp\].  
    若要停用DHCP功能，請在介面 [no dhcp] 中選擇介面。
    

**General**

**一般的**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Enable**<br>**啟用** | Enable Dnsmasq.<br>啟用 Dnsmasq。 |
| **Interface**<br>**介面** | Interface IPs used to responding to queries from clients. If an interface has both IPv4 and IPv6 IPs, both are used. Queries to other interface IPs not selected below are discarded. The default behavior is to respond to queries on every available IPv4 and IPv6 address.<br>用於回應客戶端查詢的介面 IP。如果介面同時具有 IPv4 和 IPv6 IP，則同時使用兩者。對下面未選擇的其他介面 IP 的查詢將被丟棄。預設行為是回應每個可用 IPv4 和 IPv6 位址的查詢。 |
| **Strict Interface Binding**<br>**嚴格的介面綁定** | By default we bind the wildcard address, even when listening on some interfaces. Requests that shouldn’t be handled are discarded, this has the advantage of working even when interfaces come and go and change address. This option forces binding to only the interfaces we are listening on, which is less stable in non-static environments.<br>預設情況下，我們綁定通配符位址，即使在偵聽某些介面時也是如此。不應該處理的請求將被丟棄，這樣做的優點是即使介面來來去去並更改地址也能正常工作。此選項強制僅綁定到我們正在偵聽的接口，這在非靜態環境中不太穩定。 |

Attention

注意

When DHCP is used, select the interfaces that serve DHCP ranges to register automatic firewall rules for them.

使用DHCP時，選擇服務於DHCP範圍的接口，為它們註冊自動防火牆規則。

**DNS**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Listen Port**<br>**監聽埠** | The port used for responding to DNS queries. It should normally be left blank unless another service needs to bind to TCP/UDP port 53. Setting this to zero (0) completely disables DNS function.<br>用於回應DNS查詢的連接埠。通常情況下應留空，除非其他服務需要綁定到TCP/UDP埠 53。將其設為零 (0) 將完全停用DNS功能。 |
| **DNSSEC** | Enable DNSSEC.<br>啟用DNSSEC . |
| **No Hosts Lookup**<br>**不進行主機名稱查找** | Do not read hostnames in /etc/hosts.<br>不讀取 /etc/hosts 檔案中的主機名稱。 |
| **Expand hosts**<br>**擴充主機** | Append the configured domain to simple hostnames read from hosts files.<br>將設定的網域附加到從 hosts 檔案讀取的簡單主機名稱。 |
| **Log the results of DNS queries**<br>**記錄DNS查詢的結果** | Log all DNS queries.<br>記錄所有DNS查詢的結果。 |
| **Maximum concurrent queries**<br>**最大並發查詢數** | Set the maximum number of concurrent DNS queries. On configurations with tight resources, this value may need to be reduced.<br>設定最大並發DNS查詢數。在資源緊張的配置中，可能需要降低此值。 |
| **Cache size**<br>**快取大小** | Set the size of the cache. Setting the cache size to zero disables caching. Please note that huge cache size impacts performance.<br>設定快取大小。將快取大小設為零將禁用快取。請注意，過大的快取大小會影響效能。 |
| **Local DNS entry TTL**<br>**本地DNS條目TTL** | This option allows a time-to-live (in seconds) to be given for local DNS entries, i.e. /etc/hosts or DHCP leases. This will reduce the load on the server at the expense of clients using stale data under some circumstances. A value of zero will disable client-side caching.<br>此選項允許為本地DNS條目（例如 /etc/hosts 或DHCP租約）設定生存時間（以秒為單位）。這將降低伺服器負載，但在某些情況下，客戶端可能會使用過時的資料。值為零將禁用客戶端快取。 |
| **No ident**<br>**沒有身分** | Do not respond to class CHAOS and type TXT in domain bind queries. Without this option being set, the cache statistics are also available in the DNS as answers to queries of class CHAOS and type TXT in domain bind.<br>不要在域綁定查詢中回應類別 CHAOS 和類型 TXT。如果不設定此選項，快取統計資料也可在 DNS 中用作域綁定中類別 CHAOS 和類型 TXT 查詢的答案。 |

**DNS Query Forwarding**

**DNS查詢轉發**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Query DNS servers sequentially**<br>**按順序查詢DNS伺服器** | If this option is set, we will query the DNS servers sequentially in the order specified (System: General Setup: DNS Servers), rather than all at once in parallel.<br>如果啟用此選項，我們將按照指定的順序（系統：常規設定： DNS伺服器）按順序查詢DNS伺服器，而不是同時並行查詢。 |
| **Require domain**<br>**需要網域名稱** | If this option is set, we will not forward A or AAAA queries for plain names, without dots or domain parts, to upstream name servers. If the name is not known from /etc/hosts or DHCP then a “not found” answer is returned.<br>如果設定此選項，我們不會將不帶點或網域部分的純名稱的 A 或 AAAA 查詢轉送到上游名稱伺服器。如果從 /etc/hosts 或 DHCP 無法獲知該名稱，則傳回「未找到」答案。 |
| **Do not forward to system defined DNS**<br>**請勿轉寄至系統定義的DNS** | If this option is set, DNS forwarding to system nameservers (defined in System: General Setup: DNS Servers) will be disabled. Upstream servers defined in Services: Dnsmasq DNS & DHCP: Domains will still be used. This option is recommended when Unbound forwards local domain queries to Dnsmasq, so that all queries terminate without further lookups if they are unknown.<br>如果設定此選項，DNS 轉送至系統名稱伺服器（在系統：常規設定：DNS 伺服器中定義）將被停用。服務中定義的上游伺服器：Dnsmasq DNS & DHCP：仍將使用網域。當 Unbound 將本地網域查詢轉送至 Dnsmasq 時，建議使用此選項，以便所有查詢在未知時終止，而無需進一步查找。 |
| **Do not forward private reverse lookup**<br>**不轉送私人反向查找** | If this option is set, we will not forward reverse DNS lookups (PTR) for private addresses (RFC 1918) to upstream name servers. Any entries in the Domain Overrides section forwarding private “n.n.n.in-addr.arpa” names to a specific server are still forwarded. If the IP to name is not known from /etc/hosts, DHCP or a specific domain override then a “not found” answer is immediately returned.<br>如果設定此選項，我們不會將私人位址 (RFC 1918) 的反向 DNS 尋找 (PTR) 轉送到上游名稱伺服器。在網域覆蓋部分中將私有「n.n.n.in-addr.arpa」名稱轉送至特定伺服器的任何項目仍會被轉送。如果從 /etc/hosts、DHCP 或特定網域覆寫中無法得知 IP 名稱，則立即傳回「未找到」答案。 |
| **Add MAC**<br>**新增MAC** | Add the MAC address of the requestor to DNS queries which are forwarded upstream. The MAC address will only be added if the upstream DNS Server is in the same subnet as the requestor. Since this is not standardized, it should be considered experimental. This is useful for selective DNS filtering on the upstream DNS server.<br>將請求者的MAC位址加入轉送至上游的DNS查詢。只有當上游DNS伺服器與請求者位於同一子網路時，才會新增MAC位址。由於此功能尚未標準化，因此應視為實驗性功能。此功能可用於對DNS DNS進行選擇性過濾。 |
| **Add subnet**<br>**新增子網路** | Add the real client IPv4 and IPv6 addresses (add-subnet=32,128) to DNS queries which are forwarded upstream. Be careful setting this option as it can undermine privacy. This is useful for selective DNS filtering on the upstream DNS server.<br>將客戶端的真實 IPv4 和 IPv6 位址 (add-subnet=32,128) 新增至轉送至上游的DNS查詢。請謹慎設定此選項，因為它可能會損害隱私。這對於在上游DNS伺服器上進行選擇性DNS過濾非常有用。 |
| **Strip subnet**<br>**剝離子網** | Strip the subnet received by a downstream DNS server. If add\_subnet is used and the downstream DNS server already added a subnet, DNSMasq will not replace it without setting strip\_subnet.<br>剝離下游DNS伺服器接收到的子網路。如果使用了 add_subnet 且下游DNS伺服器已新增了子網，則 DNSMasq 不會在未設定 strip_subnet 的情況下取代它。 |

**DHCP**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Interface \[no dhcp\]**<br>**介面 [無 DHCP]** | Do not provide DHCP, TFTP or router advertisement on the specified interfaces, but do provide DNS service.<br>請勿在指定介面上提供DHCP, TFTP或路由器通告，但請提供DNS服務。 |
| **DHCP fqdn** | In the default mode, we insert the unqualified names of DHCP clients into the DNS, in which case they have to be unique. Using this option the unqualified name is no longer put in the DNS, only the qualified name.<br>在預設模式下，我們將DHCP客戶端的非限定名稱插入到DNS中，在這種情況下它們必須是唯一的。使用此選項，非限定名稱不再放入DNS，僅放入限定名稱。 |
| **DHCP default domain**<br>**DHCP預設域** | To ensure that all names have a domain part, there must be a default domain specified when dhcp-fqdn is set. Leave empty to use the system domain.<br>為確保所有名稱都包含域部分，在設定 dhcp-fqdn 時必須指定預設域。留空則使用系統域。 |
| **DHCP max leases**<br>**DHCP最大租約數** | Limits dnsmasq to the specified maximum number of DHCP leases. This limit is to prevent DoS attacks from hosts which create thousands of leases and use lots of memory in the dnsmasq process.<br>將 dnsmasq 的租約數限制為指定的最大數量DHCP 。此限制旨在防止主機創建數千個租約並在 dnsmasq 進程中佔用大量記憶體而發起的拒絕服務 (DoS) 攻擊。 |
| **DHCP authoritative**<br>**DHCP權威伺服器** | Should be set when dnsmasq is definitely the only DHCP server on a network. For DHCPv4, it changes the behaviour from strict RFC compliance so that DHCP requests on unknown leases from unknown hosts are not ignored.<br>當 dnsmasq 確定是網路上唯一的DHCP伺服器時，應設定此項目。對於 DHCPv4，它會改變其行為，不再嚴格遵守RFC規則，從而避免忽略來自未知主機的未知租約的DHCP請求。 |
| **DHCP Reply delay**<br>**DHCP回覆延遲** | Delays sending DHCPOFFER and PROXYDHCP replies for at least the specified number of seconds. This can be practical for split DHCP solutions, to make sure the secondary server answers slower than the primary.<br>延遲發送 DHCPOFFER 和 PROXYDHCP 回覆至少指定秒數。這對於拆分式DHCP解決方案非常實用，可以確保輔助伺服器的回應速度慢於主伺服器。 |
| **DHCP register firewall rules**<br>**DHCP註冊防火牆規則** | Automatically register firewall rules to allow DHCP traffic for all explicitly selected interfaces, can be disabled for more fine-grained control if needed.<br>自動註冊防火牆規則，允許DHCP流量通過所有明確選擇的介面；如有需要，可停用此功能以實現更精細的控制。 |
| **Router Advertisements**<br>**路由器廣告** | Setting this will enable Router Advertisements for all configured DHCPv6 ranges with the managed address bits set, and the use SLAAC bit reset. To change this default, select a combination of the possible options in the individual DHCPv6 ranges. Keep in mind that this is a global option; if there are configured DHCPv6 ranges, RAs will be sent unconditionally and cannot be deactivated selectively. Setting Router Advertisement modes in DHCPv6 ranges will have no effect without this global option enabled.<br>設定此項目將為所有配置的 DHCPv6 範圍啟用路由器通告，並設定託管位址位，並使用SLAAC位重設。若要變更此預設值，請在各個 DHCPv6 範圍中選擇可能選項的組合。請記住，這是一個全域選項；如果配置了 DHCPv6 範圍，則將無條件發送 RA，並且無法選擇性停用。如果不啟用此全域選項，在 DHCPv6 範圍中設定路由器通告模式將無法運作。 |
| **Disable HA sync**<br>**禁用HA同步** | Ignore the DHCP general settings from being updated using HA sync.<br>忽略DHCP常規設置，使其不通過HA同步進行更新。 |
| **Log DHCP options and tags**<br>**記錄DHCP選項和標籤** | Extra logging for DHCP, log all the options sent to DHCP clients and the tags used to determine them.<br>為DHCP新增額外日誌記錄，記錄傳送給DHCP客戶端的所有選項以及用於確定這些選項的標籤。 |
| **Quiet log messages**<br>**靜默日誌訊息** | Suppress logging of the routine operation of DHCP, RA and TFTP. Errors and problems will still be logged.<br>禁止記錄DHCP, RA和TFTP的例行操作日誌。錯誤和問題仍會被記錄。 |

**ISC / KEA DHCP (legacy)**

**ISC / KEA DHCP （舊款）**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Register ISC DHCP4 Leases**<br>**註冊ISC DHCP4租約** | If this option is set, then machines that specify their hostname when requesting a DHCP lease will be registered, so that their name can be resolved.<br>如果啟用此選項，則在請求DHCP租約時指定主機名稱的電腦將被註冊，以便解析其名稱。 |
| **DHCP Domain Override**<br>**DHCP網域覆蓋** | The domain name to use for DHCP hostname registration. If empty, the default system domain is used. Note that all DHCP leases will be assigned to the same domain. If this is undesired, static DHCP lease registration is able to provide coherent mappings.<br>用於DHCP主機名稱註冊的網域名稱。如果為空，則使用預設系統網域名稱。請注意，所有DHCP租約都將分配給同一網域。如果不希望如此，靜態DHCP租約註冊可以提供一致的映射。 |
| **Register DHCP Static Mappings**<br>**註冊DHCP靜態映射** | If this option is set, then DHCP static mappings will be registered, so that their name can be resolved.<br>如果啟用此選項，則會註冊DHCP靜態映射，以便解析其名稱。 |
| **Prefer DHCP**<br>**首選DHCP** | If this option is set, then DHCP mappings will be resolved before the manual list of names below. This only affects the name given for a reverse lookup (PTR).<br>如果啟用此選項，則會優先解析DHCP映射，然後再解析下方手動列出的名稱。這僅會影響反向查找 ( PTR ) 中指定的名稱。 |

## [DNS Settings](#id6)｜[DNS設定](#id6)

**Hosts (Host Overrides)**

**主機（主機覆蓋）**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Host**<br>**主機名稱** | Name of the host, without the domain part. Use “\*” to create a wildcard entry.<br>主機名，不含網域名稱部分。使用“\*”建立通配符條目。 |
| **Domain**<br>**域名** | Domain of the host, e.g. example.com<br>主機的域名，例如 example.com |
| **Local**<br>**本地** | Set the above domain as local. This will configure this DNS server as authoritative; it will not forward queries to any upstream servers for this domain.<br>將上述網域設定為本地。這將把此DNS伺服器配置為權威伺服器；它不會將此網域的查詢轉送到任何上游伺服器。 |
| **IP addresses**<br>**IP位址** | IP addresses of the host, e.g. 192.168.100.100 or fd00:abcd::1. Can be multiple IPv4 and IPv6 addresses for dual stack configurations. Setting multiple addresses will automatically assign the best match based on the subnet of the interface receiving the DHCP Discover.<br>IP主機位址，例如192.168.100.100或fd00:abcd::1 。雙堆疊配置可以設定多個 IPv4 和 IPv6 位址。設定多個位址後，系統會根據接收DHCP Discover 的介面子網路自動分配最佳匹配位址。 |
| **Aliase Records**<br>**別名記錄** | Adds additional static A, AAAA and PTR records for the given alternative names (FQDN). Please note that these records are only created if IP addresses are configured in this host entry.<br>為給定的備用名稱 (FQDN) 新增額外的靜態 A、AAAA 和 PTR 記錄。請注意，只有在此主機條目中配置了IP位址時才會建立這些記錄。 |
| **CNAME Records**<br>**CNAME記錄** | Adds additional CNAME records for the given alternative names (FQDN). Useful if this host entry has dynamic IPv4 and partial IPv6 addresses, as the CNAME record will point to the name instead of static IP addresses.<br>為給定的備用名稱 ( FQDN ) 新增額外的CNAME記錄。如果此主機條目具有動態 IPv4 位址和部分 IPv6 位址，則此功能非常有用，因為CNAME記錄將指向名稱而不是靜態IP位址。 |
| **Client identifier**<br>**客戶端標識符** | Match the identifier of the client, e.g., DUID for DHCPv6. Setting the special character “\*” will ignore the client identifier for DHCPv4 leases if a client offers both as choice.<br>符合客戶端的標識符，例如，DHCPv6 的標識符為DUID 。如果用戶端同時提供 DHCPv6 和 DHCPv4 作為選項，則設定特殊字元「\*」將忽略 DHCPv4 租約的用戶端識別碼。 |
| **Hardware addresses**<br>**硬體位址** | Match the hardware address of the client. Can be multiple addresses, e.g., if the client has multiple network cards. Though keep in mind that Dnsmasq cannot assume which address is the correct one when multiple send DHCP Discover at the same time.<br>符合客戶端的硬體位址。可以是多個位址，例如，如果客戶端有多個網路卡。但請記住，當多個同時發送DHCP發現時，Dnsmasq 無法假設哪個位址是正確的。 |
| **Lease time**<br>**租約時間** | Defines how long the addresses (leases) given out by the server are valid (in seconds). Set `0` for infinite.<br>定義伺服器指派的位址（租約）的有效時長（以秒為單位）。設定為`0`表示無限期有效。 |
| **Tag \[set\]**<br>**標籤 [設定]** | Optional tag to set for requests matching this range which can be used to selectively match DHCP options.<br>可選標籤，用於設定符合此範圍的請求，以便選擇性地匹配DHCP選項。 |
| **Ignore**<br>**忽略** | Ignore any DHCP packets of this host. Useful if it should get served by a different DHCP server.<br>忽略此主機所發出的所有DHCP封包。如果該主機應由其他DHCP伺服器提供服務，則此操作很有用。 |
| **Description**<br>**描述** | You may enter a description here for your reference (not parsed).<br>您可以在此輸入描述以供參考（未解析）。 |
| **Comments**<br>**備註** | You may enter a description here for your reference (not parsed).<br>您可以在此輸入描述以供參考（不會被解析）。 |

Note

筆記

When a domain and IP addresses are set, a host override will be created. If a client identifier or hardware addresses are set, an additional static DHCP reservation will be created.

當設定了域和IP位址時，將建立主機覆蓋。如果設定了客戶端標識符或硬體位址，則會建立額外的靜態DHCP預留。

**Domains (Domain Overrides)**

**域名（域名覆蓋）**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Sequence**<br>**順序** | Sort with a sequence number, e.g., for strict processing order when using the “strict-order” option.<br>使用序號進行排序，例如，在使用「嚴格順序」選項時，用於嚴格依照順序處理資料。 |
| **Domain**<br>**域** | Domain to override (NOTE: this does not have to be a valid TLD!).<br>要覆蓋的域（ NOTE ：這不必是有效的TLD ！）。 |
| **IP address**<br>**IP位址** | IP address of the authoritative DNS server for this domain, leave empty to prevent lookups for this domain.<br>IP此網域的權威DNS伺服器位址，留空可阻止對此網域的尋找。 |
| **Port**<br>**連接埠** | Specify a non-standard port number here, leave blank for default.<br>在此指定非標準連接埠號，留空則使用預設連接埠號碼。 |
| **Source IP**<br>**來源IP** | Source IP address for queries to the DNS server for the override domain. Best to leave empty.<br>來源IP位址，用於向DNS伺服器查詢覆蓋域。最好留空。 |
| **Firewall Alias**<br>**防火牆別名** | Choose an “external (advanced)” type alias from “Firewall - Aliases”. Whenever a client successfully resolves the domain, the resolved IP addresses will be automatically added to the chosen alias. Adding a domain will also add all IP addresses of resolved subdomains. Please note that DNS record TTL is not evaluated; once an IP address is added, it will stay permanently, or until manually flushed in “Firewall - Diagnostics - Aliases”, or until removed automatically when setting an expiration on the alias.<br>從「防火牆 - 別名」選擇「外部（進階）」類型別名。每當客戶端成功解析域時，解析的IP位址將自動加入到所選別名中。新增域還將新增已解析子域的所有 IP 位址。请注意DNS记录TTL不予评估；一旦添加了 IP 地址，它将永久保留，或者直到在“防火墙 - 诊断 - 别名”中手动刷新，或者直到在别名设置到期时自动删除。 |
| **Description**<br>**描述** | You may enter a description here for your reference (not parsed).<br>您可以在此輸入描述以供參考（未解析）。 |

Note

筆記

Selecting Query DNS servers sequentially in Services ‣ Dnsmasq DNS & DHCP ‣ General will enforce a strict-order. For the processing order to work, overrides must be configured exactly the same, e.g., matching same domain and port. IP address can be different.

在 Services ‣ Dnsmasq DNS & DHCP ‣ General 中依序選擇 Query DNS 伺服器將強制執行嚴格的順序。為了使處理順序正常工作，覆蓋必須配置完全相同，例如匹配相同的域和連接埠。 IP 地址可以不同。

## [DHCP Settings](#id7)｜[DHCP設定](#id7)

**DHCP ranges**

**DHCP範圍**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Interface**<br>**介面** | Interface to serve this range.<br>用於服務此範圍的介面。 |
| **Tag \[set\]**<br>**標籤 [設定]** | Optional tag to set for requests matching this range which can be used to selectively match DHCP options.<br>可選標籤，用於設定符合此範圍的請求，以便選擇性地匹配DHCP選項。 |
| **Start address**<br>**起始位址** | Start of the range, e.g. 192.168.1.100 for DHCPv4, 2000::1 for DHCPv6 or when a constructor is using a suffix like ::1. To reveal IPv6 related options, enter a IPv6 address. When using router advertisements, it is possible to use a constructor with :: as the start address and no end address.<br>範圍的開始，例如192.168.1.100 對於 DHCPv4，2000::1 對於 DHCPv6 或當構造函數使用 ::1 等後綴時。若要顯示 IPv6 相關選項，請輸入 IPv6 位址。使用路由器通告時，可以使用以 :: 作為起始位址且沒有結束位址的建構函式。 |
| **End address**<br>**結束位址** | End of the range.<br>範圍結束。 |
| **Subnet Mask**<br>**子網路遮罩** | Leave empty to auto-calculate the subnet mask from the interface or the network class of the start address. If a DHCP relay forwards IPv4 DHCP Discovers to Dnsmasq, setting a subnet mask is required in most cases.<br>留空可從介面或起始位址的網路類別自動計算子網路遮罩。如果DHCP中繼將IPv4DHCP發現轉送到Dnsmasq，大多數情況下需要設定子網路遮罩。 |
| **Constructor**<br>**建構子** | Interface to use to calculate the proper range, when selected, a range may be specified as partial (e.g. ::1, ::400).<br>用於計算正確範圍的介面；選取後，可以指定部分範圍（例如 ::1、::400）。 |
| **Prefix length (IPv6)**<br>**前綴長度 (IPv6)** | Prefix length offered to the client. Custom values in this field will be ignored if Router Advertisements are enabled, as SLAAC will only work with a prefix length of 64.<br>提供給客戶端的前綴長度。如果啟用了路由器通告，則此欄位中的自訂值將被忽略，因為SLAAC僅支援前綴長度為 64 的情況。 |
| **RA Mode**<br>**RA模式** | Control how IPv6 clients receive their addresses. Enabling Router Advertisements in general settings will enable it for all configured DHCPv6 ranges with the managed address bits set, and the use SLAAC bit reset. To change this default, select a combination of the possible options here. “slaac”, “ra-stateless” and “ra-names” can be freely combined, all other options shall remain single selections.<br>控制 IPv6 用戶端接收其位址的方式。在常规设置中启用路由器通告将为所有配置的 DHCPv6 范围启用它，并设置托管地址位，并使用 SLAAC 位重置。若要變更此預設值，請在此處選擇可能選項的組合。 「slaac」、「ra-stateless」和「ra-names」可以自由組合，所有其他選項應保持單一選擇。 |
| **RA Priority**<br>**RA優先權** | Priority of the RA announcements.<br>RA公告的優先順序。 |
| **RA MTU** | Optional MTU to send to clients via Router Advertisements. If unsure leave empty.<br>選用MTU ，用於透過路由器通告傳送給客戶端。如果不確定，請留空。 |
| **RA Interval**<br>**RA間隔** | Time (seconds) between Router Advertisements.<br>路由器通告之間的時間間隔（秒）。 |
| **RA Router Lifetime**<br>**RA 路由器使用寿命** | The lifetime of the route may be changed or set to zero, which allows a router to advertise prefixes but not a route via itself. When using HA, setting a short timespan here is advised for faster IPv6 failover. A good combination could be 10 seconds RA interval and 30 seconds RA router lifetime. Going lower than that can pose issues in busy networks.<br>路由的生命周期可以更改或设置为零，这允许路由器通告前缀，但不能通过自身通告路由。使用HA時，建議在此處設定較短的時間跨度，以實現更快的 IPv6 故障轉移。一個好的組合可能是 10 秒 RA 間隔和 30 秒 RA 路由器生命週期。低於該值可能會在繁忙的網路中造成問題。 |
| **Mode**<br>**模式** | Mode flags to set for this range, ‘static’ means no addresses will be automatically assigned.<br>此範圍要設定的模式標誌，「static」表示不會自動指派任何位址。 |
| **Lease time**<br>**租約時間** | Defines how long the addresses (leases) given out by the server are valid (in seconds). Set `0` for infinite; be careful as this might deplete the pool.<br>定義伺服器指派的位址（租約）的有效時長（以秒為單位）。設定為`0`表示無限期；但請注意，這可能會耗盡位址池。 |
| **Domain Type**<br>**網域類型** | Choose if the domain will only match clients in this range, or all clients in any subnets on the selected interface. If you create both IPv4 and IPv6 ranges, setting this to “Interface”（介面） on both ranges is recommended.<br>選擇域是僅符合此範圍內的用戶端，或是符合所選介面上所有子網路中的所有用戶端。如果您同時建立了 IPv4 和 IPv6 位址範圍，建議將兩個範圍的此項目都設定為“Interface”（介面） 。 |
| **Domain**<br>**域** | Offer the specified domain to machines in this range.<br>提供此範圍內的機器指定的域。 |
| **Disable HA sync**<br>**停用HA同步** | Ignore this range from being transferred or updated by HA sync.<br>忽略此範圍的數據，使其不被HA同步傳輸或更新。 |
| **Description**<br>**描述** | You may enter a description here for your reference (not parsed).<br>您可以在此輸入描述以供參考（未解析）。 |

**RA Modes**

**RA模式**

| **Modes**<br>**模式** | **M-Bit**<br>**兆位元** | **O-Bit**<br>**奧位** | **A-Bit**<br>**A位元** | **Default Route**<br>**預設路由** | **DHCPv6** | **SLAAC**<br>** SLAAC ** |
| --- | --- | --- | --- | --- | --- | --- |
| **default**<br>**預設** | 1 | 1 | 0 | advertised<br>已發佈 | stateful<br>有狀態 | no<br>否 |
| **ra-only**<br>**僅限 ra** | 0 | 0 | 0 | advertised<br>已宣傳 | no<br>否 | no<br>否 |
| **slaac** | 1 | 0 | 1 | advertised<br>已宣傳 | both<br>兩者 | yes<br>是 |
| **ra-stateless**<br>**ra-無狀態** | 0 | 1 | 1 | advertised<br>已發佈 | stateless<br>無狀態 | yes<br>是 |

This is what the RA Flags (Bits) mean:

這就是RA標誌（位）的意思：

-   `M` - Managed address configuration:  
    `M` - 管理位址配置：
    
    The client should use stateful DHCPv6 to obtain an IPv6 address (and implicitly `O` information).

    用戶端應使用有狀態 DHCPv6 來取得 IPv6 位址（以及隱式的`O`資訊）。
    
-   `O` - Other configuration:  
    `O` - 其他配置：
    
    The client should use DHCPv6 to obtain other information (e.g., DNS server, Domain).

    用戶端應使用 DHCPv6 取得其他資訊（例如， DNS伺服器、網域）。
    
-   `A` - Autonomous address-configuration:  
    `A` - 自主位址配置：
    
    The client can use SLAAC to self-assign an IPv6 address based on the advertised prefix.

    用戶端可以使用SLAAC根據公佈的前綴自行分配 IPv6 位址。
    

Tip

提示

For other RA modes not listed here, visit the [dnsmasq man page](https://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html).

對於此處未列出的其他RA模式，請造訪 [dnsmasq 手冊頁](https://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html) 。

**DHCP options**

**DHCP選項**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Type**<br>**類型** | “Set”（放） option to send it to a client in a DHCP offer or “Match”（匹配） option to dynamically tag clients that send it in the initial DHCP request.<br>“Set”（放）選項，用於在DHCP報價中將其發送給客戶；或“Match”（匹配）選項，用於動態標記在初始DHCP請求中發送此訊息的客戶。 |
| **Option**<br>**選項** | DHCPv4 option to offer to the client.<br>提供給客戶端的 DHCPv4 選項。 |
| **Option6**<br>**選項6** | DHCPv6 option to offer to the client.<br>提供給客戶端的DHCPv6選項。 |
| **Interface**<br>**介面** | This adds a single interface as a tag so this DHCP option can match the interface of a DHCP range.<br>這會將單一介面新增為標籤，以便此DHCP選項可以與DHCP系列的介面相符。 |
| **Tag**<br>**標籤** | If the optional tags are given, then this option is only sent when all the tags are matched. Can be optionally combined with an interface tag. The special address 0.0.0.0 or \[::\] is taken to mean “the address of the machine running dnsmasq”. When using “Match”（匹配）, leave empty to match on the option only.<br>如果給出了可選標籤，則僅當所有標籤都匹配時才發送此選項。可以選擇與介面標籤組合。特殊位址0.0.0.0或\[::\]表示「運行dnsmasq的機器的位址」。使用“Match”（匹配）時，留空以僅符合該選項。 |
| **Tag \[set\]**<br>**標籤 [設定]** | Tag to set for requests matching this range which can be used to selectively match dhcp options.<br>為符合此範圍的請求設定的標籤，可用於選擇性地符合 DHCP 選項。 |
| **Value**<br>**值** | Value (or values) to send to the client. The special address 0.0.0.0 or \[::\] is taken to mean “the address of the machine running dnsmasq”. When using “Match”（匹配）, leave empty to match on the option only. Send multiple values as a comma-separated list. E.g., `192.168.1.1,192.168.1.2`.<br>要傳送給客戶端的值（或多個值）。特殊位址0.0.0.0或 \[::\] 表示「運行 dnsmasq 的機器的位址」。使用“Match”（匹配）時，留空則僅符合該選項。多個值以逗號分隔的清單形式發送。例如， `192.168.1.1,192.168.1.2` 。 |
| **Force**<br>**強制** | Always send the option, even when the client does not ask for it in the parameter request list.<br>即使用戶端未在參數請求清單中指定該選項，也始終傳送該選項。 |
| **Description**<br>**描述** | You may enter a description here for your reference (not parsed).<br>您可以在此輸入描述以供參考（未解析）。 |

**DHCP boot**

**DHCP啟動**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Interface**<br>**介面** | This adds a single interface as tag so this DHCP boot option can match the interface of a DHCP range.<br>這會新增一個介面作為標籤，以便此DHCP啟動選項可以與DHCP系列的介面相符。 |
| **Tag**<br>**標籤** | Only offer this boot image to the clients matched by the given tag. Can be optionally combined with an interface tag.<br>僅向與給定標籤相符的用戶端提供此啟動鏡像。可選擇性地與介面標籤結合使用。 |
| **Filename**<br>**檔案名稱** | The boot image file name.<br>啟動鏡像檔案的名稱。 |
| **Servername**<br>**伺服器名稱** | The name of the server which serves the boot image.<br>提供啟動鏡像的伺服器名稱。 |
| **Server address**<br>**伺服器位址** | The address of the server which serves the boot image.<br>提供啟動鏡像的伺服器位址。 |
| **Description**<br>**描述** | You may enter a description here for your reference (not parsed).<br>您可以在此輸入描述以供參考（未解析）。 |

**DHCP tags**

**DHCP標籤**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Tag**<br>**標籤** | An alphanumeric label which marks a network so that DHCP options may be specified on a per-network basis.<br>用於標記網路的字母數字標籤，以便可以針對每個網路指定DHCP選項。 |

Note

筆記

Interfaces set tags automatically, you do not need to set tags for them. Just select the interface in a DHCP range or DHCP option for the match to happen.

介面會自動設定標籤，您無需手動設定標籤。只需在DHCP範圍或DHCP選項中選擇接口，即可進行匹配。

## [Advanced settings](#id8)｜[進階設定](#id8)

To configure options that are not available in the gui one can add custom configuration files on the firewall itself. Files can be added in `/usr/local/etc/dnsmasq.conf.d/`, these should use as extension .conf (e.g. custom-options.conf). When more files are placed inside the directory, all will be included in alphabetical order.

若要設定圖形使用者介面 (GUI) 中未提供的選項，可以在防火牆本身上新增自訂設定檔。檔案可以加入到`/usr/local/etc/dnsmasq.conf.d/`下，檔案副檔名應為 .conf（例如 custom-options.conf）。如果目錄中放置了多個文件，則所有文件將按字母順序排列。

Warning

警告

It is the sole responsibility of the administrator which places a file in the extension directory to ensure that the configuration is valid.

管理員有責任將檔案放置在擴充目錄中，以確保配置有效。

## [Configuration examples](#id9)｜[設定範例](#id9)

### [DHCPv4 with DNS registration](#id10)｜[DHCPv4，已註冊DNS](#id10)

Dnsmasq can be used as a DNS forwarder. Though in our recommended setup, we will not use it as our default DNS server.

Dnsmasq 可以用作DNS轉發器。不過，在我們推薦的配置中，我們不會將其用作預設的DNS伺服器。

We will use Unbound as primary DNS server for our clients, and only forward some internal zones to Dnsmasq which manages the hostnames of DHCP registered leases.

我們將使用 Unbound 作為我們客戶的主要DNS伺服器，並且只將一些內部區域轉發到 Dnsmasq，Dnsmasq 管理DHCP註冊租約的主機名稱。

This requires Dnsmasq to run with a non-standard port other than 53.

這要求 Dnsmasq 使用 53 以外的非標準連接埠運行。

-   Go to Services ‣ Dnsmasq DNS & DHCP ‣ General and set:  
    前往「服務」‣「Dnsmasq」 DNS & DHCP 「常規」並進行設定：
    

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Enable**<br>**啟用** | `X` |
| **Listen Port**<br>**監聽埠** | `53053` |

-   Press **Apply**  
    按**申請**
    

Afterwards we can configure Unbound to forward the zones to Dnsmasq.

之後我們可以設定 Unbound 將區域轉送到 Dnsmasq。

-   Go to Services ‣ Unbound DNS ‣ General and set:  
    前往「服務」‣「Unbound」 DNS 「常規」並進行設定：
    

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Enable**<br>**啟用** | `X` |
| **Listen Port**<br>**監聽埠** | `53` |

-   Press **Apply**  
    按**申請**
    
-   Go to Services ‣ Unbound DNS ‣ Query Forwarding and create an entry for each DHCP range you plan to configure.  
    前往“服務”‣“未綁定” DNS “查詢轉送”，並為每個計劃配置的DHCP範圍建立一個條目。
    

In our example, we configure query forwarding for 2 networks:

在我們的範例中，我們為 2 個網路設定查詢轉送：

> -   `lan.internal` - `192.168.1.0/24`
>     
> -   `guest.internal` - `192.168.10.0/24`
>     

**lan.internal**

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Domain**<br>**網域** | `lan.internal` |
| **Server IP**<br>**伺服器IP** | `127.0.0.1` |
| **Server Port**<br>**伺服器連接埠** | `53053` |

-   Press **Save** and add next  
    按**儲存**並新增下一個
    

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Domain**<br>**網域** | `1.168.192.in-addr.arpa` |
| **Server IP**<br>**伺服器IP** | `127.0.0.1` |
| **Server Port**<br>**伺服器連接埠** | `53053` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

Note

筆記

The first entry is for the forward lookup (A-Record), the second for the reverse lookup (PTR-Record).

第一個條目是正向查找（A 記錄），第二個條目是反向查找（ PTR -記錄）。

Tip

提示

If all PTR records for 192.168.0.0/16 should be handled by Dnsmasq, creating a single entry with `168.192.in-addr.arpa` is enough.

如果所有PTR的192.168.0.0/16記錄都應由 Dnsmasq 處理，則只需建立一個包含`168.192.in-addr.arpa`的條目即可。

**guest.internal**

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Domain**<br>**網域** | `guest.internal` |
| **Server IP**<br>**伺服器IP** | `127.0.0.1` |
| **Server Port**<br>**伺服器連接埠** | `53053` |

-   Press **Save** and add next  
    按**儲存**並新增下一個
    

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Domain**<br>**網域** | `10.168.192.in-addr.arpa` |
| **Server IP**<br>**伺服器IP** | `127.0.0.1` |
| **Server Port**<br>**伺服器連接埠** | `53053` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

Note

筆記

`.internal` is the IANA and ICANN approved TLD (Top Level Domain) for internal use. If you instead own a TLD, e.g., `example.com`, you could create a zone that is not used on the internet, e.g., `lan.internal.example.com`.

`.internal`是經IANA和ICANN批准的TLD （頂級域名），供內部使用。如果您擁有TLD ，例如`example.com` ，則可以建立一個不在網路上使用的區域，例如`lan.internal.example.com` 。

Now that we have the DNS infrastructure set up, we can configure DHCP.

現在我們已經設定好了DNS基礎設施，我們可以設定DHCP 。

-   Go to Services ‣ Dnsmasq DNS & DHCP ‣ General and set:  
    前往“服務”‣“Dnsmasq” DNS & DHCP “常規”，然後進行設定：
    

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Interface**<br>**接口** | `LAN, GUEST` (The network interfaces which will serve DHCP, this registers firewall rules)<br>`LAN, GUEST` （將服務於DHCP網路接口，用於註冊防火牆規則） |
| **Do not forward to system defined DNS servers**<br>**請勿轉送至系統定義的DNS伺服器** | `X` (Unless Domains are specified in Dnsmasq: Domains, this will disable forwarding behavior)<br>`X` （除非在 Dnsmasq: Domains 中指定了網域，否則將停用轉送行為） |
| **DHCP fqdn** | `X` |
| **DHCP default domain**<br>**DHCP預設域** | `internal` (or leave empty to use this system’s domain)<br>`internal` （或留空以使用此系統的域） |
| **DHCP register firewall rules**<br>**DHCP註冊防火牆規則** | `X` |

Note

筆記

**DHCP fqdn** will do two things:

**DHCP fqdn** 將執行兩項操作：

-   Make sure all devices are registered in DNS with the configured domain name appended, e.g. `smartphone.lan.internal`. This ensures that `smartphone` can exist in both `lan.internal` and `guest.internal`.  
    確保所有設備都在DNS中註冊，並附加配置的域名，例如`smartphone.lan.internal` 。這樣可以確保`smartphone`同時存在於`lan.internal`和`guest.internal`中。
    
-   Register the DHCP domain name as local, which will make Dnsmasq authoritative for this domain, ensuring `NXDOMAIN` is returned for devices querying unknown hostnames within this local domain.  
    將DHCP域名註冊為本地域名，這將使 Dnsmasq 成為該域的權威域名，確保當設備查詢此本地域中的未知主機名時，返回`NXDOMAIN` 。
    

-   Press **Apply**  
    按**申請**
    

As next step we define the DHCP ranges for our interfaces.

下一步，我們將定義介面的DHCP範圍。

-   Go to Services ‣ Dnsmasq DNS & DHCP ‣ DHCP ranges and set:  
    前往「服務」‣「Dnsmasq」 DNS & DHCP DHCP並進行設定：
    

**LAN**

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Interface**<br>**接口** | `LAN` |
| **Start address**<br>**起始位址** | `192.168.1.100` |
| **End address**<br>**結束網址** | `192.168.1.199` |
| **Domain**<br>**域名** | `lan.internal` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

Note

筆記

If a host receives a DHCP lease from this range, and it advertises a hostname, it will be registered under the chosen domain name. E.g., a host named `nas01` will become `nas01.lan.internal`. A client can query this FQDN to receive the current IP address.

如果主機從該位址範圍取得DHCP租約，並通告主機名，則該主機將註冊在所選網域下。例如，名為`nas01`的主機將變成`nas01.lan.internal` 。客戶端可以查詢此FQDN以取得目前的IP位址。

Attention

注意

If you plan to use partial IPv6 addresses in ranges with a constructor, enable the advanced mode and set **Domain Type** to `Interface`. This will register any subnets on the chosen interface to the selected domain. This is the only way dynamic DNS registration succeeds when the IPv6 prefix is dynamic.

如果您打算透過建構函式使用範圍內的部分 IPv6 位址，請啟用進階模式並將 **Domain Type** 設定為 `Interface`。這會將所選介面上的所有子網路註冊到所選域。當 IPv6 前綴是動態時，這是動態 DNS 註冊成功的唯一方法。

**GUEST**

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Interface**<br>**接口** | `GUEST` |
| **Start address**<br>**起始位址** | `192.168.10.100` |
| **End address**<br>**結束網址** | `192.168.10.199` |
| **Domain**<br>**網域** | `guest.internal` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

Tip

提示

Creating a DHCP range will automatically send out common DHCP options to requesting clients, without explicitly configuring them.

建立DHCP範圍將自動向請求客戶端發送通用DHCP選項，而無需明確配置它們。

This is an incomplete overview which highlights some default DHCP options:

這是一個不完整的概述，重點介紹了一些預設的DHCP選項：

| DHCP Option<br>DHCP選項 | Default<br>預設值 | Description<br>描述 |
| --- | --- | --- |
| router\[3\]<br>路由器[3] | IPv4 address of the interface that received the DHCP Request.<br>接收到DHCP請求的介面的IPv4位址。 | The default gateway the client should use. In this case the OPNsense.<br>用戶端應使用的預設閘道。在本例中為OPNsense。 |
| dns-server\[6\]<br>dns-server[6] | IPv4 address of the interface that received the DHCP Request.<br>接收DHCP請求的介面的IPv4位址。 | The DNS server the client should use. In this case Unbound on the OPNsense.<br>客戶端應使用的DNS伺服器。在本例中為OPNsense上的Unbound伺服器。 |
| domain-name\[15\] | Domain set in a DHCP Range, or the default system domain if none could be matched.<br>設定在DHCP範圍內的域名，如果找不到匹配項，則使用預設系統域名。 | The domain name the client should use, to construct short names to FQDNs in DNS lookups<br>客戶端應使用的域名，用於在DNS查找中構造 FQDN 的短名稱。 |
| client fqdn\[81\]<br>客戶端 FQDN[81] | A combination of client hostname and domain, the result of the DDNS registration.<br>客戶端主機名稱和網域名稱的組合，是DDNS註冊的結果。 | The full qualified domain name the client should use.<br>客戶端應使用的完整限定網域名稱。 |

Note

筆記

Only some usecases require setting these options manually, e.g., the IPv4 address of the router and dns-server in high availability setups with CARP.

只有某些用例需要手動設定這些選項，例如，在具有CARP的高可用性設定中，路由器和 DNS 伺服器的 IPv4 位址。

Attention

注意

If Dnsmasq does not start, check that ISC-DHCP and KEA DHCP are not active since they will block the bindable ports this DHCP server requires. It is also a good idea to check Services ‣ Dnsmasq DNS & DHCP ‣ Log for the error message.

如果 Dnsmasq 無法啟動，請檢查ISC-DHCP和KEA DHCP是否處於活動狀態，因為它們會阻止此DHCP伺服器所需的綁定連接埠。此外，最好檢查“服務”‣“Dnsmasq” DNS & DHCP “日誌”以查找錯誤訊息。

Now that the setup is complete, the following will happen in regards of DHCP and DNS.

現在設定已完成，關於DHCP和DNS將發生以下情況。

1.  A new device (e.g. a smartphone) joins the LAN network and sends a DHCP Discover broadcast.  
    新設備（例如智慧型手機）加入LAN網路並發送DHCP發現廣播。
    
2.  Dnsmasq receives this broadcast on port 67 and responds with a DHCP offer, containing an available IP address and DHCP options for router\[3\] and dns-server\[6\].  
    Dnsmasq 在連接埠 67 上收到此廣播，並以DHCP offer 進行回應，其中包含可用的IP位址和DHCP router\[3\] 和 dns-server\[6\] 選項。
    
3.  The device sends a DHCP request to request the available IP address, and possibly send its own hostname.  
    該設備發送DHCP請求以請求可用的IP位址，並可能發送其自身的主機名稱。
    
4.  Dnsmasq acknowledges the request.  
    Dnsmasq 已確認收到請求。
    

Our smartphone now has the following IP configuration:

我們的智慧型手機現在具有以下IP配置：

-   IP address: `192.168.1.100`  
    IP地址： `192.168.1.100`
    
-   Default Gateway: `192.168.1.1`  
    預設閘道： `192.168.1.1`
    
-   DNS Server: `192.168.1.1`  
    DNS伺服器： `192.168.1.1`
    

At the same time, Dnsmasq registers the DNS hostname of the smartphone (if it exists). Since we configured the FQDN option and domain in the DHCP range, the name of the smartphone will be: `smartphone.lan.internal.`.

同時，Dnsmasq 會註冊智慧型手機的DNS主機名稱（如果存在）。由於我們配置了FQDN選項和DHCP範圍內的域名，因此智慧型手機的名稱將是： `smartphone.lan.internal.` 。

When a client queries Unbound for exactly `smartphone.lan.internal.`, the configured query forwarding sends the request to the DNS server responsible for `lan.internal.` which is our configured Dnsmasq listening on `127.0.0.1:53053`. `Dnsmasq` responds to this query and will resolve the current A record of `smartphone.lan.internal.` to `192.168.1.100`, sending this information to Unbound which in return sends the response back to the client that initially queried.

當客戶端向 Unbound 查詢`smartphone.lan.internal.`時，配置的查詢轉發會將請求發送到負責`lan.internal.`的DNS伺服器，該伺服器是我們配置的監聽`127.0.0.1:53053`. `Dnsmasq`的`192.168.1.100` ，它會回應此查詢`smartphone.lan.internal.` Unbound，Unbound 再將回應傳回最初發出查詢的用戶端。

Tip

提示

You can usually resolve a hostname in your network by querying for e.g. `smartphone`. This works because client systems recognize that a FQDN is not used, and will therefore suffix the request with their domain name received from Dnsmasq, transforming the query to `smartphone.lan.internal.`.

通常可以透過查詢例如`smartphone`來解析網路中的主機名稱。這是因為客戶端系統能夠識別出FQDN未使用，因此會在請求後加上從Dnsmasq收到的域名，從而將查詢轉換為`smartphone.lan.internal.` 。

As you can see, this is a highly integrated and simple setup which leverages just the available DHCP and DNS standards with no trickery involved.

如您所見，這是一個高度整合且簡單的設置，它僅利用了現有的DHCP和DNS標準，沒有任何技巧可言。

### [DHCPv6 and Router Advertisements](#id11)｜[DHCPv6 與路由器通告](#id11)

DHCPv6 and Router Advertisements can run at the same time as DHCPv4, just specify another range.

DHCPv6 和路由器通告可以與 DHCPv4 同時運行，只需指定另一個範圍即可。

Attention

注意

DHCPv6 does not have a router option like DHCPv4. To push the default gateway to clients you must use Router Advertisements. This can be done with Dnsmasq, but also by a different service like Services ‣ Router Advertisements.

DHCPv6 沒有像 DHCPv4 那樣的路由器選項。若要將預設閘道推送給客戶端，必須使用路由器通告 (Router Advertisements)。這可以透過 Dnsmasq 實現，也可以透過其他服務實現，例如「服務」>「路由器通告」。

In this example, we add a DHCPv6 range and Router Advertisements to our LAN interface. The following configuration sets stateless DHCPv6 and SLAAC. This means clients will use a SLAAC address but query additional DHCPv6 options, e.g. DNS Server.

在本例中，我們為LAN介面新增 DHCPv6 位址範圍和路由器通告。以下配置設定了無狀態 DHCPv6 和SLAAC 。這表示客戶端將使用SLAAC位址，但會查詢其他 DHCPv6 選項，例如DNS伺服器。

-   Go to Services ‣ Dnsmasq DNS & DHCP ‣ DHCP ranges and set:  
    前往「服務」‣「Dnsmasq」 DNS & DHCP DHCP並進行設定：
    

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Interface**<br>**接口** | `LAN` |
| **Start address**<br>**起始位址** | `::1000` |
| **End address**<br>**結束網址** | `::2000` |
| **Constructor**<br>**建構器** | `LAN` |
| **RA Mode**<br>**RA模式** | `slaac` |

With the mode set to `slaac`, clients will generate a SLAAC address and an additional DHCPv6 address (stateful DHCPv6). If clients should only generate a SLAAC address, set the mode to `ra-stateless` (stateless DHCPv6).

將模式設定為`slaac`時，客戶端將產生一個SLAAC位址和一個額外的DHCPv6位址（有狀態DHCPv6）。如果客戶端只需要產生一個SLAAC位址，則將模式設為`ra-stateless` （無狀態DHCPv6）。

Attention

注意

If you use a constructor and a custom domain for the range, enable the advanced mode and set **Domain Type** to `Interface`. This will register any subnets on the chosen interface to the selected domain. Otherwise all names fall back to the default system domain.

如果您對範圍使用建構函式和自訂網域，請啟用進階模式並將 **Domain Type** 設定為 `Interface`。這會將所選介面上的所有子網路註冊到所選域。否則，所有名稱都會回退到預設系統域。

As final step, go to Services ‣ Dnsmasq DNS & DHCP ‣ General and enable `Router Advertisements`.

最後一步，前往“服務”‣“Dnsmasq” DNS & DHCP “常規”，並啟用`Router Advertisements` 。

Press **Apply** to activate the new configuration.

按**應用**按鈕啟動新配置。

Tip

提示

The DNS server will be sent automatically via RDNSS and DHCPv6 option. The IP address will be this firewall. If you want to change this behavior, create your own DHCPv6 options in Services ‣ Dnsmasq DNS & DHCP ‣ DHCP options

DNS 伺服器將透過 RDNSS 和 DHCPv6 選項自動發送。 IP 位址將是此防火牆。如果您想要變更此行為，請在 Services ‣ Dnsmasq DNS & DHCP ‣ DHCP options 中建立自己的 DHCPv6 選項

### [DHCP reservations](#id12)｜[DHCP預訂](#id12)

A DHCP reservation will always assign the same IPv4 and IPv6 addresses to a client.

DHCP預留將始終為客戶端分配相同的 IPv4 和 IPv6 位址。

For an IPv4 reservation, a DHCPv4 range should exist. If this DHCPv4 range should only serve reservations, set it to static.

對於 IPv4 位址保留，需要存在一個 DHCPv4 位址範圍。如果此 DHCPv4 位址範圍僅用於 IPv4 位址保留，則將其設定為靜態。

For an IPv6 reservation, a DHCPv6 range must be configured which sets `slaac` as Router Advertisement option. This sets the A bit so that clients can generate a SLAAC address and receive an additional DHCPv6 lease. If a different Router Advertisement daemon is used, ensure it runs in Assisted mode.

對於 IPv6 位址保留，必須設定一個 DHCPv6 位址範圍，並將`slaac`設定為路由器通告選項。這將設定 A 位，以便客戶端可以產生SLAAC位址並獲得額外的 DHCPv6 租約。如果使用不同的路由器通告守護進程，請確保其以輔助模式運作。

Tip

提示

Reservations will reserve the IP address inside a range, meaning the reserved IP will not be offered to dynamic clients.

預訂將保留IP地址在一定範圍內，這意味著保留的IP將不會提供給動態客戶端。

A dynamic range like `192.168.1.100-192.168.1.199` and a reservation like `192.168.1.101` are valid and there will be no collisions.

動態範圍如`192.168.1.100-192.168.1.199`和預留如`192.168.1.101`都是有效的，不會發生衝突。

The reservation can also be outside the dynamic range, but it is not recommended for simple setups as the dynamic dns registration with dhcp-fqdn will not work correctly.

預留位址也可以在動態範圍之外，但不建議在簡單的設定中這樣做，因為使用 dhcp-fqdn 的動態 DNS 註冊將無法正常運作。

Attention

注意

Setting the range mode to static is not required for reservations. It is for specific usecases where a range should not serve any unknown dynamic clients.

對於預留功能，無需將範圍模式設為靜態。此設定僅適用於特定用例，即範圍不應服務於任何未知的動態用戶端。

Note

筆記

As all clients configure a tag with the receiving interface name automatically, DHCP options that are tagged with an interface will automatically match the reservations.

由於所有用戶端都會自動配置一個帶有接收介面名稱的標籤，因此帶有介面標籤的DHCP選項將自動與預留匹配。

Here are a few examples for DHCP reservations. This assumes we already created ranges for `LAN` and `GUEST` as outlined in the previous sections.

以下是一些DHCP預留的範例。假設我們已經按照前面章節所述創建了`LAN`和`GUEST`的範圍。

Go to Services ‣ Dnsmasq DNS & DHCP ‣ Hosts

前往“服務”‣“Dnsmasq” DNS & DHCP “主機”

**IPv4**

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Host**<br>**主持人** | `smartphone` |
| **IP addresses**<br>**IP地址** | `192.168.1.150` |
| **Hardware addresses**<br>**硬體位址** | `aa:bb:cc:dd:ee:ff` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

Attention

注意

Setting a domain in the reservation has no effect on the dynamic dns registration; it will only create a static host override.

在預留中設定網域名稱不會影響動態 DNS 註冊；它只會建立一個靜態主機覆蓋。

Dnsmasq will always combine the host with a domain configured in a matching dhcp range.

Dnsmasq 總是會將主機與在符合的 DHCP 位址範圍內設定的網域名稱結合。

This is especially important for partial IPv6 reservations, as they cannot be resolved before the dynamic dns registration has finished.

對於部分 IPv6 預留來說，這一點尤其重要，因為在動態 DNS 註冊完成之前，它們無法解析。

**IPv6**

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Host**<br>**主機** | `smartphone` |
| **IP addresses**<br>**IP地址** | `::1234` |
| **Client identifier**<br>**客戶端標識符** | `00:03:00:01:aa:bb:cc:dd:ee:ff` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

Attention

注意

A Hardware address will not work for IPv6 reservations. It must be the device unique identifier (DUID). This example uses the common DUID-LL type.

硬體位址不能用於 IPv6 位址保留。它必須是設備唯一識別碼（ DUID ）。本範例使用常見的DUID-LL類型。

Tip

提示

Setting a partial IPv6 address will ensure it uses the same constructor as the configured DHCPv6 ranges.

設定部分 IPv6 位址將確保它使用與已設定的 DHCPv6 位址範圍相同的建構函式。

**IPv4 + IPv6 (dual stack)**

**IPv4 + IPv6（雙堆疊）**

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Host**<br>**主持人** | `smartphone` |
| **IP addresses**<br>**IP地址** | `192.168.1.150` `::1234` |
| **Client identifier**<br>**客戶端標識符** | `00:03:00:01:aa:bb:cc:dd:ee:ff` |
| **Hardware addresses**<br>**硬體位址** | `aa:bb:cc:dd:ee:ff` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

Tip

提示

This combines both IPv4 and IPv6 reservations in the same configuration item.

這會將 IPv4 和 IPv6 預留位址合併到同一個設定項中。

### [DHCP tags](#id13)｜[DHCP標籤](#id13)

When a DHCP Discover enters a network interface, Dnsmasq will automatically set a tag with the interface name.

當DHCP Discover 進入網路介面時，Dnsmasq 會自動設定一個帶有介面名稱的標籤。

Additionally, tags can be set on DHCP requests by clients when they send the options they need.

此外，客戶在發送所需選項時，可以在DHCP請求上設定標籤。

There are two kinds of operations, set a tag and match a tag.

有兩種操作，設定標籤和匹配標籤。

You can manually configure additional tags in Services ‣ Dnsmasq DNS & DHCP ‣ DHCP tags.

您可以在「服務」‣「Dnsmasq DHCP DNS & DHCP標籤中手動設定其他標籤。

-   Setting these tags can be done in multiple spots, e.g., DHCP ranges, DHCP options / match, and Host Overrides.  
    可以在多個位置設定這些標籤，例如DHCP範圍、 DHCP選項/匹配和主機覆蓋。
    
-   Matching one or multiple tags is mostly relevant in DHCP options.  
    匹配一個或多個標籤主要與DHCP選項相關。
    

As example, you could configure VoIP phones to receive a TFTP server option when they have a specific vendor id.

例如，您可以設定 VoIP 電話，使其在具有特定供應商 ID 時接收TFTP伺服器選項。

Go to Services ‣ Dnsmasq DNS & DHCP ‣ DHCP tags

前往「服務」‣ Dnsmasq DNS & DHCP ‣ DHCP標籤

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Name**<br>**姓名** | `voip` |

Go to Services ‣ Dnsmasq DNS & DHCP ‣ DHCP options

前往「服務」‣「Dnsmasq」 DNS & DHCP DHCP

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Type**<br>**類型** | Match<br>符合 |
| **Option**<br>**選項** | `vendor-class[60]` |
| **Tag \[set\]**<br>**標籤 [集合]** | `voip` |
| **Value**<br>**值** | The vendor ID string (e.g., `SIPPhone`)<br>供應商ID字串（例如， `SIPPhone` ） |

Now a tag will be set if a DHCP request is sent by a VoIP phone that includes the vendor class option. If the vendor ID string matches, Dnsmasq will look up any configuration that will match this tag. As next step we assign a TFTP server to this tag.

現在，如果 VoIP 電話發送的DHCP請求包含廠商類別選項，則會設定一個標籤。如果廠商ID字串匹配，Dnsmasq 將會尋找任何與此標籤相符的配置。下一步，我們將TFTP伺服器指派給此標籤。

Go to Services ‣ Dnsmasq DNS & DHCP ‣ DHCP options

前往「服務」‣「Dnsmasq」 DNS & DHCP DHCP

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Type**<br>**類型** | Set<br>集 |
| **Option**<br>**選項** | `tftp-server-address[150]` |
| **Tag \[set\]**<br>**標籤 [集合]** | `voip` |
| **Value**<br>**值** | IP address of your TFTP server<br>IP您的TFTP伺服器位址 |

This ensures that only clients identifying as VoIP phones receive the appropriate TFTP server information via option 150. You can add additional options under the same tag if they should be offered to the VOIP phones.

這樣可以確保只有標識為 VoIP 電話的客戶端才能透過選項 150 收到相應的TFTP伺服器資訊。如果需要向VOIP電話提供其他選項，則可以在同一標籤下新增其他選項。

### [DHCP boot](#id14)｜[DHCP啟動](#id14)

In a network, we have different clients that should receive different boot images depending on if they require a BIOS or EFI boot.

在一個網路中，我們有不同的客戶端，它們應該根據自身需求BIOS或EFI啟動而接收不同的啟動映像。

By using DHCP tags, we can configure this behavior by matching DHCP options and combining them with a DHCP boot directive.

透過使用DHCP標籤，我們可以透過匹配DHCP選項並將其與DHCP啟動指令組合來配置此行為。

Go to Services ‣ Dnsmasq DNS & DHCP ‣ DHCP tags and create two tags:

前往「服務」‣「Dnsmasq DHCP DNS & DHCP標籤，並建立兩個標籤：

**BIOS Tag**

**BIOS標籤**

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Name**<br>**姓名** | `IsBIOS` |

**EFI Tag**

**EFI日**

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Name**<br>**姓名** | `IsEFI` |

Go to Services ‣ Dnsmasq DNS & DHCP ‣ DHCP options

前往「服務」‣「Dnsmasq」 DNS & DHCP DHCP

We will match the DHCP option `client-arch[93]` which has multiple possibilities when it comes to the client architecture. Value `0` matches x86 BIOS and value `7` matches EFI BC (EFI x64). Choose the correct values to match your specific clients.

我們將匹配選項DHCP `client-arch[93]`後者在客戶端架構方面有多種可能性。值`0`匹配 x86 BIOS ，值`7`匹配EFI BC （ EFI x64）。請選擇正確的值以符合您的特定客戶端。

**BIOS Match Tag**

**BIOS匹配標籤**

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Type**<br>**類型** | Match<br>符合 |
| **Option**<br>**選項** | `client-arch[93]` |
| **Tag \[set\]**<br>**標籤 [集合]** | `IsBIOS` |
| **Value**<br>**值** | 0 |

**EFI Match Tag**

**EFI匹配標籤**

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Type**<br>**類型** | Match<br>符合 |
| **Option**<br>**選項** | `client-arch[93]` |
| **Tag \[set\]**<br>**標籤 [集合]** | `IsEFI` |
| **Value**<br>**值** | 7 |

Go to Services ‣ Dnsmasq DNS & DHCP ‣ DHCP options ‣ DHCP boot

轉到服務 ‣ Dnsmasq DNS & DHCP ‣ DHCP 選項 ‣ DHCP 啟動

Create two boot entries that serve the correct image to matching clients. We assume the requests are on LAN, though it can be left empty if these boot images should be served on any interfaces. Adjust IP addresses and filenames to fit your environment.

建立兩個啟動項，分別向匹配的客戶端提供正確的鏡像。我們假設請求透過LAN介面發出，但如果這些啟動鏡像需要透過任何介面提供，則可以將其留空。請依照您的環境調整IP介面的位址和檔名。

**BIOS Boot**

**BIOS船**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Interface**<br>**接口** | `LAN` |
| **Tag**<br>**日** | `IsBIOS` |
| **Filename**<br>**檔名** | `undionly.kpxe` |
| **Servername**<br>**伺服器名稱** | `192.168.99.10` |
| **Server address**<br>**伺服器位址** | `192.168.99.10` |

**EFI Boot**

**EFI啟動器**

| **Option**<br>**選項** | **Description**<br>**描述** |
| --- | --- |
| **Interface**<br>**接口** | `LAN` |
| **Tag**<br>**標籤** | `IsEFI` |
| **Filename**<br>**檔名** | `snponly.efi` |
| **Servername**<br>**伺服器名稱** | `192.168.99.10` |
| **Server address**<br>**伺服器位址** | `192.168.99.10` |

**Apply** the new configuration, and check the PXE boot server if clients request the correct boot image files.

**套用**新配置，並檢查PXE啟動伺服器，確認客戶端是否要求正確的啟動映像檔。

### [DHCPv4 for small HA setups](#id15)｜[適用於小型HA設定的 DHCPv4](#id15)

In addition to the setup described above, Dnsmasq can be a viable option in a HA setup in small and medium sized network environments.

除了上述設定外，Dnsmasq 還可以作為中小型網路環境中HA設定中的可行選擇。

In contrast to KEA DHCP, it does not offer lease synchronization. Each Dnsmasq instance is a separate entity.

與KEA DHCP不同，它不提供租約同步。每個Dnsmasq實例都是一個獨立的實體。

The main tricks to make this work are the following options:

實現這一目標的關鍵技巧如下：

-   Go to Services ‣ Dnsmasq DNS & DHCP ‣ General:  
    前往「服務」‣「Dnsmasq」 DNS & DHCP 「常規」：
    

Set this on the current master:

在目前主控端進行此設定：

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **DHCP reply delay**<br>**DHCP回覆延遲** | Do not set a value here, we want the master to respond first.<br>請勿在此處設定值，我們希望主伺服器先回應。 |
| **Disable HA sync**<br>**禁用HA同步** | `X` |

Set this on the current backup:

在目前備份中設定此項目：

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **DHCP reply delay**<br>**DHCP回復延遲** | `10` (10 seconds is a good starting point)<br>`10` （10 秒是不錯的起始值） |
| **Disable HA sync**<br>**禁用HA同步** | `X` |

Note

筆記

This means, each DHCP Discover will be answered by the master. If the master does not respond for 10 seconds, the backup server will respond. It’s important to choose a high enough delay time, otherwise the behavior can be unpredictable in busy networks. The disabled HA sync ensures that the DHCP general settings are not synced between master and backup.

這意味著，每個DHCP Discover請求都會由主伺服器回應。如果主伺服器在10秒內沒有回應，則備份伺服器會回應。選擇足夠長的延遲時間非常重要，否則在繁忙的網路中，其行為可能難以預測。停用HA同步功能可確保DHCP常規設定不會在主伺服器和備份伺服器之間同步。

-   Go to Services ‣ Dnsmasq DNS & DHCP ‣ DHCP ranges:  
    轉到“服務”‣“Dnsmasq” DNS & DHCP DHCP ：
    

With LAN as example, set this on the current master:

以LAN為例，在目前主節點上進行如下設定：

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Interface**<br>**接口** | `LAN` |
| **Start address**<br>**起始位址** | `192.168.1.100` |
| **End address**<br>**結束網址** | `192.168.1.199` |
| **Disable HA sync**<br>**禁用HA同步** | `X` |

Set this on the current backup:

在目前備份中設定此項目：

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Interface**<br>**接口** | `LAN` |
| **Start address**<br>**起始位址** | `192.168.1.200` |
| **End address**<br>**結束網址** | `192.168.1.220` |
| **Disable HA sync**<br>**禁用HA同步** | `X` |

Note

筆記

Now both master and backup have their own pool in the LAN network. The pool on master is larger, since it will respond to most DHCP discovers. If the master does not respond, the backup server will serve an IP address from its available pool. Since the pools do not overlap, there cannot be an IP address conflict between clients. The disabled HA sync ensures that these pools are not synchronized.

現在，主伺服器和備份伺服器在LAN網路中各自擁有獨立的位址池。主伺服器的位址池較大，因為它會回應大多數DHCP位址發現請求。如果主伺服器沒有回應，備份伺服器將從其可用位址池中分配一個IP位址。由於位址池互不重疊，客戶端之間不會出現IP位址衝突。停用HA同步功能確保這些位址池不會同步。

Tip

提示

Reservations for single hosts created in Services ‣ Dnsmasq DNS & DHCP ‣ Host Override can still be synchronized. They count as their own single IP address pools outside of the defined DHCP ranges. This means both servers will serve the same IP address to a host when queried. There cannot be an IP address conflict in this case. Set the MAC address of the host in the Hardware address field.

在「服務」‣「Dnsmasq」 DNS & DHCP 「主機覆蓋」中建立的單一主機預留位址仍可同步。它們被視為各自獨立的IP地址池，位於已定義的DHCP範圍之外。這表示當查詢主機時，兩台伺服器將提供相同的IP位址。在這種情況下，不會出現IP位址衝突。請在「硬體位址」欄位中設定主機的MAC位址。

With this setup, a simple and efficient HA setup with automatic DNS registration is possible. Yet for larger scalable setups with big IP address ranges in many VLANs, KEA DHCP might be the better choice due to its robust HA synchronization options.

透過此設置，可以實現簡單高效的HA配置，並自動進行DNS註冊。然而，對於具有多個VLAN和較大IP位址範圍的大型可擴展配置， KEA DHCP可能由於其強大的HA同步選項而成為更好的選擇。

### [DHCPv6 and Router Advertisements for small HA setups](#id16)｜[小型HA網路設定的DHCPv6與路由器通告](#id16)

Just as with DHCPv4, the same type of configuration can be done for DHCPv6 with a few minor adjustments.

與 DHCPv4 一樣，只需稍作調整，即可對 DHCPv6 進行相同類型的設定。

Since IPv6 uses DAD (Duplicate Address Detection), you do not need to create separate pools. SLAAC and DAD will take care of avoiding duplicates.

由於 IPv6 使用DAD （重複位址偵測）， DAD SLAAC負責避免地址重複。

Special care must be taken for the Router Advertisements. Since both master and backup will send them at the same time, the current default gateway must be determined by priority and router lifetime.

必須特別注意路由器通告。由於主路由器和備援路由器會同時發送通告，因此必須根據優先權和路由器生命週期來確定當前的預設閘道。

-   Go to Services ‣ Dnsmasq DNS & DHCP ‣ DHCP ranges:  
    轉到“服務”‣“Dnsmasq” DNS & DHCP DHCP ：
    

Set this on the current master:

在目前主控端進行此設定：

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Interface**<br>**接口** | `LAN` |
| **Start address**<br>**起始位址** | `::` |
| **Constructor**<br>**建構器** | `LAN` |
| **RA Mode**<br>**RA模式** | `ra-stateless` |
| **RA Priority**<br>**RA優先** | `High` |
| **RA Interval**<br>**RA間隔** | `10` |
| **RA Router Lifetime**<br>**RA路由器終身保固** | `30` |
| **Disable HA sync**<br>**禁用HA同步** | `X` |

Set this on the current backup:

在目前備份中設定此項目：

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Interface**<br>**接口** | `LAN` |
| **Start address**<br>**起始位址** | `::` |
| **Constructor**<br>**建構器** | `LAN` |
| **RA Mode**<br>**RA模式** | `ra-stateless` |
| **RA Priority**<br>**RA優先** | `Normal` |
| **RA Interval**<br>**RA間隔** | `10` |
| **RA Router Lifetime**<br>**RA路由器終身保固** | `30` |
| **Disable HA sync**<br>**禁用HA同步** | `X` |

As final step, go to Services ‣ Dnsmasq DNS & DHCP ‣ General

最後一步，前往「服務」‣「Dnsmasq」 DNS & DHCP 「常規」。

Enable the checkbox `Router Advertisements` on both master and backup and apply the configuration.

在主伺服器和備份伺服器上都啟用複選框`Router Advertisements` ，並套用設定。

Both master and backup will now advertise their link local addresses as default gateway. As long as clients receive the RA priority `high` packets, they prefer the master as the current IPv6 default gateway. When the master goes offline, the RA interval is sent every 10 seconds, yet after 30 seconds the RA router lifetime will be reached and the master will be deprecated from the clients routing table. The backup will now be installed as new IPv6 default route.

主路由器和備援路由器現在都會將它們的連結本機位址通告為預設閘道。只要客戶端收到優先權為RA `high`封包，它們就會優先選擇主路由器作為目前的 IPv6 預設閘道。當主路由器離線時，每 10 秒會發送一次RA間隔的資料包，但 30 秒後， RA路由器的生命週期將達到，主路由器將從客戶端的路由表中移除。此時，備援路由器將安裝為新的 IPv6 預設路由。

As soon as the master comes back online, the higher RA priority will make clients shift back eventually.

一旦主伺服器恢復上線，更高的RA優先權最終會讓客戶端切換回來。

Note

筆記

This whole process is not seamless, it takes some time. At least as long as the dysfunct IPv6 route is not deprecated by the clients, IPv6 will still be routed to the non-existing link local address of the offline master.

整個過程並非一帆風順，需要一些時間。至少在用戶端未棄用失效的 IPv6 路由之前，IPv6 流量仍會路由到離線主伺服器不存在的連結本地位址。

Attention

注意

Do not set the RA Interval and RA Router Lifetime too low, as clients could potentially loose their default routes in busy networks. The bare minimum for RA Router Lifetime should be (RA Interval\*3).

請勿將RA間隔和RA路由器生存期設定得太低，因為在繁忙的網路中RA RA *3)。

### [Dnsmasq as primary DNS resolver](#id17)｜[Dnsmasq 為主要解析器DNS](#id17)

This is a small complementory section how to configure Dnsmasq as the primary DNS resolver for your network combined with Unbound as recurser.

這是一個簡短的補充章節，介紹如何將 Dnsmasq 配置為網路的主要DNS解析器，並結合 Unbound 作為遞歸解析器。

It is useful if you rely on features like dynamic IPv6 networks with PTR records registered via DHCP, or the Firewall Alias (IPset) feature.

如果您依賴動態 IPv6 網路（透過DHCP註冊PTR記錄）或防火牆別名（IPset）功能等特性，這將非常有用。

The drawbacks are Unbound Statistics or Blocklist features based on client IP, as the client will always be 127.0.0.1.

缺點是基於客戶端IP的無界統計或阻止清單功能，因為客戶端始終是127.0.0.1 。

The benefits are a less complicated configuration and less adjustments in Unbound if new networks get introduced.

這樣做的好處是配置更簡單，如果引入新網絡，Unbound 的調整也更少。

-   Go to Services ‣ Unbound DNS ‣ General and set:  
    前往「服務」‣「Unbound」 DNS 「常規」並進行設定：
    

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Enable**<br>**啟用** | `X` |
| **Listen Port**<br>**監聽埠** | `53053` |

-   Go to Services ‣ Dnsmasq DNS & DHCP ‣ General and set:  
    前往“服務”‣“Dnsmasq” DNS & DHCP “常規”，然後進行設定：
    

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Enable**<br>**啟用** | `X` |
| **Listen Port**<br>**監聽埠** | `53` |
| **Do not forward to system defined DNS servers**<br>**請勿轉送至系統定義的DNS伺服器** | `X` (This will force Dnsmasq to only use forwarding specified in the domains tab)<br>`X` （這將強制 Dnsmasq 僅使用「網域」標籤中指定的轉送） |
| **Do not forward private reverse lookups**<br>**請勿轉寄私人反向查找** | `X` |

-   Go to Services ‣ Dnsmasq DNS & DHCP ‣ Domains and set:  
    前往「服務」‣「Dnsmasq」 DNS & DHCP 「網域」並進行設定：
    

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Sequence**<br>**序列** | `1` |
| **Domain**<br>**網域** | `*` (This will match all domains)<br>`*` （這將符合所有網域） |
| **IP address**<br>**IP位址** | `127.0.0.1` (Unbound listens on this IP address and port)<br>`127.0.0.1` (Unbound 監聽此IP位址與連接埠) |
| **Port**<br>**端口** | `53053` |

Apply the configuration and test DNS resolution with a client.

應用配置並使用客戶端測試DNS解析度。

### [Firewall Alias (IPset)](#id18)｜[防火牆別名（IP集）](#id18)

Dnsmasq has a powerful feature, it can add resolved IP addresses to firewall aliases.

Dnsmasq 具有強大的功能，它可以將已解析的IP位址新增至防火牆別名。

This is quite useful in restricted networks or to gather statistics.

這在受限網路或收集統計資料時非常有用。

As example, you provide a guest network, but users should only access `example.com`. With a normal firewall alias, this might be challenging, as the domain might use multiple subdomains that serve additional content. It could also use a CDN to load balance content across different servers with dynamically changing IP addresses per client.

例如，您提供了一個訪客網絡，但使用者只能訪問`example.com` 。使用普通的防火牆別名可能會比較棘手，因為該網域可能會使用多個子網域來提供其他內容。它還可以使用CDN在不同伺服器上進行負載平衡，並為每個客戶端動態變更IP位址。

With a Dnsmasq managed alias, this becomes rather simple as it will automatically add new IPv4 and IPv6 addresses as soon as they are requested by clients.

使用 Dnsmasq 管理的別名，這變得相當簡單，因為它會在用戶端請求時自動新增新的 IPv4 和 IPv6 位址。

A requirement to use this feature is that Dnsmasq is your primary DNS server for all clients, and access to any other DNS servers is blocked. A different approach is to do query forwarding from Unbound to Dnsmasq for the domains that should be added to its managed firewall aliases, with the caveat that Dnsmasq then must use an external resolver to prevent a query loop.

使用此功能的前提條件是，Dnsmasq 必須是所有客戶端的主要DNS伺服器，並且必須阻止存取任何其他DNS伺服器。另一種方法是將 Unbound 的查詢轉送至 Dnsmasq，轉送物件為需要新增至其託管防火牆別名中的網域名稱。但要注意的是，Dnsmasq 必須使用外部解析器來防止查詢迴圈。

Note

筆記

This feature is more useful for allowlists, rather than blocklists. As IPv4 and IPv6 addresses are added to the managed firewall alias, using it as blocklist could unintentionally kill access to shared hosting services. Also, if a browser is configured to use DoH (DNS over HTTPS) on port 443, a blocklist could be circumvented as Dnsmasq would not respond to DNS requests - the alias would not be populated.

此功能更適用於允許清單而非封鎖清單。由於 IPv4 和 IPv6 位址都會新增至受管防火牆別名中，因此將其用作封鎖清單可能會意外地封鎖對共用主機服務的存取。此外，如果瀏覽器配置為在 443 連接埠上使用 DoH（ DNS over HTTPS ），則阻止清單可能被繞過，因為 Dnsmasq 不會回應DNS請求——別名不會被填滿。

Attention

注意

Try to be selective with the domain you add to the alias. Adding a TLD (Top Level Domain) like `com` could inflate the alias to the point it could become unusable. A good rule of thumb is one alias per service domain, they can later be nested under a parent alias.

謹慎選擇新增到別名中的網域。添加像TLD這樣的頂級域名（ `com` ）可能會導致別名過長，最終無法使用。一個好的經驗法則是每個服務域對應一個別名，這些別名之後可以嵌套在父別名下。

In the following example, Dnsmasq is our primary DNS resolver, and it forwards queries to `127.0.0.1:53053` on which Unbound listens.

在以下範例中，Dnsmasq 是我們的主要DNS解析器，它將查詢轉送到 Unbound 監聽的`127.0.0.1:53053` 。

-   Go to Firewall ‣ Aliases:  
    轉到防火牆‣別名：
    

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Name**<br>**姓名** | `dnsmasq_example_com` |
| **Type**<br>**類型** | `External (advanced)` |
| **Expire**<br>**過期** | `86400` (Gradually prunes unused IP addresses from the alias)<br>`86400` （逐步從別名中移除未使用的IP位址） |

After creating the alias, go to Services ‣ Dnsmasq DNS & DHCP ‣ Domains:

建立別名後，前往「服務」‣「Dnsmasq」 DNS & DHCP 「網域名稱」：

| Option<br>選擇權 | Value<br>價值 |
| --- | --- |
| **Domain**<br>**網域名稱** | `example.com` (This also includes all subdomains under example.com)<br>`example.com` （也包含 example.com 下的所有子網域） |
| **IP Address**<br>**IP位址** | `127.0.0.1` (Or an external resolver like 1.1.1.1 if query forwarding for this domain from Unbound is configured)<br>`127.0.0.1` （或者，如果已配置從 Unbound 對此域進行查詢轉發，則可以使用外部解析器，例如1.1.1.1 ） |
| **Port**<br>**連接埠** | `53053` (Leave empty if the resolver listens on port 53)<br>`53053` （若解析器監聽埠 53，則留空） |
| **Firewall Alias**<br>**防火牆別名** | `dnsmasq_example_com` |

As final step, create a firewall rule with the `dnsmasq_example_com` alias as destination.

最後一步，建立一條防火牆規則，將別名`dnsmasq_example_com`作為目標。

Tip

提示

Verify the contents of the alias in Firewall ‣ Diagnostics ‣ Aliases: It should populate with IP addresses as soon as clients resolve `example.com` via Dnsmasq.

驗證防火牆 ‣ 診斷 ‣ 別名中的別名內容：一旦客戶端透過 Dnsmasq 解析`example.com` ，它就應該填入IP位址。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：DHCrelay｜DH 繼電器](<193 DH 繼電器.md>)　｜　[下一篇：ISC DHCP ➡](<195 ISC DHCP.md>)
