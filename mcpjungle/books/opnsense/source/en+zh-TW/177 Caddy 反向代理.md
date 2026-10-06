---
title: "Caddy Reverse Proxy｜Caddy 反向代理"
title_original: "Caddy Reverse Proxy"
source: "https://docs.opnsense.org/manual/how-tos/caddy.html"
chapter: ["Community Plugins","Web"]
order: 177
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:11.289Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx TCP And UDP Streams｜nginx TCP和UDP流](<176 nginx TCP和UDP流.md>)　｜　[下一篇：CPU Microcode updates AMDIntel｜CPU微程式碼更新 AMDIntel ➡](<178 CPU微程式碼更新 [AMDIntel].md>)

# Caddy Reverse Proxy｜Caddy 反向代理

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Web](<000 目錄.md#c-37>)

## [Caddy: Reverse Proxy](#id1)｜[Caddy：反向代理](#id1)

Index

指數

-   [Caddy: Reverse Proxy](#caddy-reverse-proxy)  
    [Caddy：反向代理](#caddy-reverse-proxy)
    
    -   [Features](#features)  
        [產品特性](#features)
        
    -   [Installation](#installation)  
        [安裝](#installation)
        
    -   [Prepare OPNsense for Caddy After Installation](#prepare-opnsense-for-caddy-after-installation)  
        [安裝後準備 OPNsense for Caddy](#prepare-opnsense-for-caddy-after-installation)
        
    -   [Standard Configuration](#standard-configuration)  
        [標準配置](#standard-configuration)
        
        -   [Creating a Simple Reverse Proxy](#creating-a-simple-reverse-proxy)  
            [建立簡單的反向代理](#creating-a-simple-reverse-proxy)
            
        -   [Restrict Access to Internal IPs](#restrict-access-to-internal-ips)  
            [限制對內部 IP 的存取](#restrict-access-to-internal-ips)
            
        -   [Restrict Access with Basic Auth](#restrict-access-with-basic-auth)  
            [使用基本驗證限制存取](#restrict-access-with-basic-auth)
            
        -   [Dynamic DNS](#dynamic-dns)  
            [動態DNS](#dynamic-dns)
            
        -   [Wildcard Domain with Subdomains](#wildcard-domain-with-subdomains)  
            [帶子網域的通配符網域](#wildcard-domain-with-subdomains)
            
        -   [Reverse Proxy the OPNsense WebGUI](#reverse-proxy-the-opnsense-webgui)  
            [反向代理 OPNsense WebGUI](#reverse-proxy-the-opnsense-webgui)
            
        -   [Redirect ACME HTTP-01 Challenge](#redirect-acme-http-01-challenge)  
            [重定向ACME HTTP -01 挑戰](#redirect-acme-http-01-challenge)
            
        -   [Filter by Domain](#filter-by-domain)  
            [依網域篩選](#filter-by-domain)
            
    -   [Advanced Configuration](#advanced-configuration)  
        [進階配置](#advanced-configuration)
        
        -   [Multiple Handlers for the same Domain](#multiple-handlers-for-the-same-domain)  
            [同領域的多個處理程序](#multiple-handlers-for-the-same-domain)
            
        -   [Reverse Proxy a Webserver with Vhosts](#reverse-proxy-a-webserver-with-vhosts)  
            [使用虛擬主機反向代理 Web 伺服器](#reverse-proxy-a-webserver-with-vhosts)
            
        -   [CrowdSec Integration](#crowdsec-integration)  
            [CrowdSec 整合](#crowdsec-integration)
            
        -   [High Availability Setups](#high-availability-setups)  
            [高可用性配置](#high-availability-setups)
            
        -   [Forward Auth](#forward-auth)  
            [前向授權](#forward-auth)
            
        -   [Run Caddy Process Unprivileged](#run-caddy-process-unprivileged)  
            [以非特權模式運行 Caddy 進程](#run-caddy-process-unprivileged)
            
        -   [Bind Caddy to Interfaces](#bind-caddy-to-interfaces)  
            [將 Caddy 綁定到介面](#bind-caddy-to-interfaces)
            
        -   [Custom Configuration Files](#custom-configuration-files)  
            [自訂設定檔](#custom-configuration-files)
            
-   [Caddy: Layer4 Proxy](#caddy-layer4-proxy)  
    [Caddy：Layer4 代理](#caddy-layer4-proxy)
    
    -   [Enable Layer4 Proxy](#enable-layer4-proxy)  
        [啟用四層代理程式](#enable-layer4-proxy)
        
    -   [Routing Type](#routing-type)  
        [路由類型](#routing-type)
        
    -   [Layer 4 Matchers](#layer-4-matchers)  
        [第 4 層匹配器](#layer-4-matchers)
        
    -   [Layer 7 Matchers](#layer-7-matchers)  
        [第 7 層匹配器](#layer-7-matchers)
        
    -   [Configuration Examples](#configuration-examples)  
        [設定範例](#configuration-examples)
        
        -   [SSH Multiplexing on HTTPS Port](#ssh-multiplexing-on-https-port)  
            [SSH多工在HTTPS埠上](#ssh-multiplexing-on-https-port)
            
        -   [TLS (SNI) Multiplexing on HTTPS Port](#tls-sni-multiplexing-on-https-port)  
            [TLS ( SNI ) 在HTTPS端口上進行多路復用](#tls-sni-multiplexing-on-https-port)
            
        -   [Inverted TLS (SNI) Multiplexing on HTTPS Port](#inverted-tls-sni-multiplexing-on-https-port)  
            [反向TLS ( SNI ) 重複使用在HTTPS埠上](#inverted-tls-sni-multiplexing-on-https-port)
            
        -   [Proxy TCP/UDP on Layer 4](#proxy-tcp-udp-on-layer-4)  
            [第 4 層代理程式TCP/UDP](#proxy-tcp-udp-on-layer-4)
            
        -   [DNS and Wireguard Multiplexing](#dns-and-wireguard-multiplexing)  
            [DNS和 Wireguard 多工](#dns-and-wireguard-multiplexing)
            
-   [Caddy: Troubleshooting](#caddy-troubleshooting)  
    [Caddy：故障排除](#caddy-troubleshooting)
    
    -   [FAQ](#faq)
        
    -   [Help, Nothing Works!](#help-nothing-works)  
        [救命，什麼都不管用！](#help-nothing-works)
        
    -   [Get Help from the Caddy Community](#get-help-from-the-caddy-community)  
        [從 Caddy 社區獲取幫助](#get-help-from-the-caddy-community)
        

## [Features](#id2)｜[產品特點](#id2)

Fast and extensible multi-platform HTTP/1-2-3 web server with automatic HTTPS

快速且可擴充的多平台HTTP /1-2-3 Web 伺服器，具有自動HTTPS功能

By default, Caddy automatically obtains and renews TLS certificates (Let’s Encrypt and ZeroSSL) for all your sites.

預設情況下，Caddy 會自動為您的所有網站取得和續訂TLS憑證（Let's Encrypt 和 ZeroSSL）。

-   Reverse Proxy HTTP, HTTPS and WebSockets  
    反向代理HTTP, HTTPS和 WebSocket
    
-   Route UDP/TCP traffic with the included Layer4 module: [https://github.com/mholt/caddy-l4](https://github.com/mholt/caddy-l4)  
    使用包含的 Layer4 模組路由UDP/TCP流量：[https://github.com/mholt/caddy-l4](https://github.com/mholt/caddy-l4)
    
-   Dynamic DNS module included: [https://github.com/mholt/caddy-dynamicdns](https://github.com/mholt/caddy-dynamicdns)  
    動態DNS模組包含：[https://github.com/mholt/caddy-dynamicdns](https://github.com/mholt/caddy-dynamicdns)
    
-   Cloudflare DNS Provider included: [https://github.com/caddy-dns/cloudflare](https://github.com/caddy-dns/cloudflare)  
    Cloudflare DNS提供者包含：[https://github.com/caddy-dns/cloudflare](https://github.com/caddy-dns/cloudflare)
    

WWW: [https://caddyserver.com/](https://caddyserver.com/)

## [Installation](#id3)｜[安裝](#id3)

-   Install “os-caddy” from the OPNsense Plugins.  
    從 OPNsense 插件安裝“os-caddy”。
    

## [Prepare OPNsense for Caddy After Installation](#id4)｜[安裝後準備 OPNsense for Caddy](#id4)

Attention

注意

Caddy uses port 80 and 443. So the OPNsense WebGUI or other plugins can’t bind to these ports.

Caddy 使用 80 和 443 連接埠。因此，OPNsense WebGUI 或其他外掛程式無法綁定到這些連接埠。

Go to System ‣ Settings ‣ Administration

轉到“系統”‣“設定”‣“管理”。

-   Change the TCP Port to 8443 (example), do not forget to adjust the firewall rules to allow access to the WebGUI. On LAN there is a hidden anti-lockout rule that takes care of this automatically. On other interfaces, make sure to add explicit rules.  
    將TCP連接埠變更為8443（範例），不要忘記調整防火牆規則以允許存取WebGUI。在LAN上有一個隱藏的防鎖定規則可以自動處理這個問題。在其他介面上，請確保新增顯式規則。
    
-   Enable the checkbox for HTTP Redirect - Disable web GUI redirect rule.  
    啟用HTTP重定向 - 停用 web GUI重定向規則」複選框。
    

Go to Firewall ‣ Rules ‣ WAN

前往防火牆 ‣ 規則 ‣ WAN

-   Create Firewall rules that allow `HTTP` and `HTTPS` to destination `This Firewall` on `WAN`  
    建立防火牆規則，允許`HTTP`和`HTTPS`存取目標`This Firewall`目標`WAN`
    

| Option<br>選項 | Values<br>值 |
| --- | --- |
| **Interface**<br>**介面** | `WAN` |
| **TCP/IP Version**<br>**TCP/IP版本** | `IPv4+IPv6` |
| **Protocol**<br>**協議** | `TCP` |
| **Source**<br>**來源** | `Any` |
| **Destination**<br>**目的地** | `This Firewall` |
| **Destination port range**<br>**目標埠範圍** | from: `HTTP` to: `HTTP`<br>從： `HTTP`到： `HTTP` |
| **Description**<br>**描述** | `Caddy Reverse Proxy HTTP` |

| Option<br>選項 | Values<br>值 |
| --- | --- |
| **Interface**<br>**介面** | `WAN` |
| **TCP/IP Version**<br>**TCP/IP版本** | `IPv4+IPv6` |
| **Protocol**<br>**協議** | `TCP/UDP` |
| **Source**<br>**來源** | `Any` |
| **Destination**<br>**目的地** | `This Firewall` |
| **Destination port range**<br>**目標埠範圍** | from: `HTTPS` to: `HTTPS`<br>從： `HTTPS`到： `HTTPS` |
| **Description**<br>**描述** | `Caddy Reverse Proxy HTTPS` |

Go to Firewall ‣ Rules ‣ LAN and create the same rules for the LAN interface. Now external and internal clients can connect to Caddy, and Let’s Encrypt or ZeroSSL certificates will be issued automatically. If using a VPN to connect remote clients to the OPNsense, additional firewall rules could be needed.

前往「防火牆」‣「規則」‣ LAN ，為LAN介面建立相同的規則。現在，外部和內部用戶端都可以連接到 Caddy，並且會自動頒發 Let's Encrypt 或 ZeroSSL 憑證。如果使用VPN將遠端用戶端連接到 OPNsense，則可能需要新增額外的防火牆規則。

Note

筆記

If you disable `QUIC` by removing `HTTP/3` in Services ‣ Caddy Web Server ‣ General Settings ‣ Advanced Settings, the `Caddy Reverse Proxy HTTPS` rule only needs `TCP` as protocol.

如果您在「服務」‣「Caddy Web 伺服器」‣「常規設定」‣「進階設定」中移除`HTTP/3`來停用`QUIC` ，則`Caddy Reverse Proxy HTTPS`規則只需要`TCP`作為協定。

## [Standard Configuration](#id5)｜[標準配置](#id5)

Note

筆記

The tutorial section implies that [Prepare OPNsense for Caddy after installation](#prepare-opnsense-caddy) has been followed.

教學部分暗示已按照 [安裝後為 Caddy 準備 OPNsense](#prepare-opnsense-caddy)進行操作。

### [Creating a Simple Reverse Proxy](#id6)｜[創建簡單的反向代理](#id6)

Attention

注意

The domain has to be externally resolvable. Create an A-Record on a public DNS server that points your domain to the external IP address of your OPNsense.

網域必須能夠從外部解析。在公共DNS伺服器上建立 A 記錄，將您的網域名稱指向 OPNsense 的外部IP位址。

Go to Services ‣ Caddy Web Server ‣ General Settings

前往“服務”‣“Caddy Web 伺服器”‣“常規設定”

-   Check **Enabled** to enable Caddy  
    選中**啟用**以啟用 Caddy
    
-   Input a valid email address into the Acme Email field. This is mandatory to receive automatic Let’s Encrypt and ZeroSSL certificates  
    請在 Acme Email 欄位中輸入有效的電子郵件地址。這是接收 Let's Encrypt 和 ZeroSSL 自動憑證的必要條件。
    
-   Auto HTTPS should be set to `On (default)`  
    自動HTTPS應設定為`On (default)`
    
-   Press **Apply**  
    按**申請**
    

Go to Services ‣ Caddy Web Server ‣ Reverse Proxy ‣ Domains

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“網域”

-   Press **+** to add a Domain as frontend.  
    按**+**新增網域作為前端。
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| *Frontend*<br>*前端* |  |
| **Protocol:**<br>**協議：** | `https://` |
| **Domain:**<br>**網域：** | `foo.example.com` |
| **Port:**<br>**連接埠：** | Leave empty<br>留空 |
| **Certificate:**<br>**證書：** | `Auto HTTPS` |

-   Press **Save**  
    按下**儲存**
    
-   Go to Services ‣ Caddy Web Server ‣ Reverse Proxy ‣ Handlers  
    轉到“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“處理程序”
    
-   Press **+** to add a Handler that routes the traffic from the frontend to a target upstream service.  
    按 **+** 新增一個處理程序，將前端的流量路由到目標上游服務。
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| *Frontend*<br>*前端* |  |
| **Domain:**<br>**網域：** | `https://foo.example.com` |
| *Upstream*<br>*上游* |  |
| **Protocol:**<br>**協定：** | `http://` or `https://` - depending on your upstream webserver<br>`http://`或`https://` - 取決於您的上游網路伺服器 |
| **Upstream Domain:**<br>**上游域：** | `192.168.10.1` |
| **Upstream Port:**<br>**上游連接埠：** | `80` - or set the port required by your upstream webserver<br>`80` - 或設定您的上游 Web 伺服器所需的連接埠 |
| **TLS Insecure Skip Verify**<br>**TLS不安全跳過驗證** | `X` - if https:// was chosen<br>`X` - 如果選擇了 https:// |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

The automatic certificate will be installed. Check the Logfile if there are errors. Now the frontend domain `foo.example.com:80/443` receives all requests, and reverse proxies them to the upstream destination `192.168.10.1:80` (or custom port).

自動證書將安裝完成。請檢查日誌文件，查看是否有錯誤。現在，前端網域`foo.example.com:80/443`接收所有請求，並將其反向代理到上游目標`192.168.10.1:80` （或自訂連接埠）。

Tip

提示

Issued certificates can be verified in System ‣ Trust ‣ Certificates and in the associated dashboard widget.

已核發的憑證可以在「系統」‣「信任」‣「憑證」和相關的儀表板小工具中進行驗證。

Note

筆記

TLS Insecure Skip Verify can be used in private networks. If the upstream destination is in an insecure network consider using proper [certificate handling](#webgui-opnsense-caddy).

TLS不安全的跳過驗證可以在私人網路中使用。如果上游目標位於不安全的網路中，請考慮使用適當的[憑證處理](#webgui-opnsense-caddy) 。

### [Restrict Access to Internal IPs](#id7)｜[限制對內部 IP 的存取](#id7)

Since the reverse proxy will accept all connections, restricting access with a firewall rule would impact all domains. Access Lists can restrict access per domain. In this example, they are used to restrict access to only internal IPv4 networks, refusing connections from the internet.

由於反向代理會接受所有連接，因此使用防火牆規則限制存取會影響所有網域。存取控制清單可以按網域限制存取。在本例中，它們用於將訪問限制為僅對內部 IPv4 網路的訪問，拒絕來自互聯網的連接。

Go to Services ‣ Caddy Web Server ‣ Reverse Proxy ‣ HTTP Access ‣ Access Lists

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣ HTTP訪問”‣“訪問列表”

-   Press **+** to create a new Access List  
    按**+**建立新的存取列表
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| **Access List Name:**<br>**存取清單名稱：** | `private_ipv4` |
| **Client IP Addresses:**<br>**客戶IP地址：** | `192.168.0.0/16` `172.16.0.0/12` `10.0.0.0/8` |
| **Description:**<br>**描述：** | `Allow access from private IPv4 ranges` |

-   Press **Save**  
    按下**儲存**
    

Go to Services ‣ Caddy Web Server ‣ Reverse Proxy ‣ Domains

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“網域”

-   Edit an existing Domain or Subdomain and expand the Access Tab.  
    編輯現有網域或子網域，並展開「存取權限」標籤。
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| **Access List:**<br>**存取清單：** | `private_ipv4` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

Now, all connections without a private IPv4 address will be blocked. Some applications might demand a HTTP Error code instead of having their connection blocked, an example are monitoring systems. For these a custom `HTTP Response Code` can be set in the advanced mode.

現在，所有沒有私有 IPv4 位址的連線都將被封鎖。某些應用程式可能要求返回HTTP錯誤代碼，而不是直接阻止連接，例如監控系統。對於這些應用程序，可以在高級模式下設定自訂的`HTTP Response Code`錯誤代碼。

Note

筆記

Access Lists can be set on Domains, Subdomains and Handlers. Setting them on Domains or Subdomains is recommended for simplicity.

存取清單可以設定在網域、子網域和處理程序上。為了簡單起見，建議設定在網域或子網域上。

### [Restrict Access with Basic Auth](#id8)｜[使用基本驗證限制存取](#id8)

Since the reverse proxy will accept all connections, restricting access with a firewall rule would impact all domains. Basic Auth will restrict access to one or multiple users.

由於反向代理會接受所有連接，因此使用防火牆規則限制存取會影響所有網域。基本驗證會將存取權限限制為一個或多個使用者。

Go to Services ‣ Caddy Web Server ‣ Reverse Proxy ‣ HTTP Access ‣ Basic Auth

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣ HTTP訪問”‣“基本驗證”

-   Press **+** to create a new User  
    按**+**建立新用戶
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| **User:**<br>**使用者：** | `John` |
| **Password:**<br>**密碼：** | `RandomPassword` |

-   Press **Save** and create additional Users if needed, e.g. `Sarah`.  
    按**儲存**，如果需要，建立其他用戶，例如`Sarah` 。
    

Go to Services ‣ Caddy Web Server ‣ Reverse Proxy ‣ Domains

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“網域”

-   Edit an existing Domain or Subdomain and expand the Access Tab.  
    編輯現有網域或子網域，並展開「存取權限」標籤。
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| **Basic Auth:**<br>**基本驗證：** | `John`, `Sarah` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

Now, all anonymous connections have to authenticate with Basic Auth before accessing the reverse proxied service.

現在，所有匿名連線都必須先通過基本驗證才能存取反向代理服務。

Note

筆記

Basic Auth can be set on Domains, Subdomains and Handlers. Setting it on Domains or Subdomains is recommended for simplicity.

基本驗證可以設定在網域、子網域和處理器上。為了簡單起見，建議設定在網域或子網域上。

Tip

提示

For even higher security demands, configure Client Auth (mTLS) on a domain.

對於更高的安全性需求，請在網域上設定用戶端身份驗證（mTLS）。

### [Dynamic DNS](#id9)｜[動態DNS](#id9)

Go to Services ‣ Caddy Web Server ‣ General Settings ‣ DNS Provider

前往“服務”‣“Caddy Web 伺服器”‣“常規設定”‣ DNS提供者”

-   Select Cloudflare from the list  
    從清單中選擇 Cloudflare
    
-   Input the API Key  
    輸入API鍵
    
-   Choose if DynDns IP Version should include IPv4 and/or IPv6.  
    選擇 DynDns IP版本是否應包含 IPv4 和/或 IPv6。
    
-   Press **Save**  
    按下**儲存**
    

Go to Services ‣ Caddy Web Server ‣ Reverse Proxy ‣ Domains

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“網域”

-   Edit a domain or subdomain and enable the Dynamic DNS checkbox.  
    編輯域或子域，並啟用動態DNS複選框。
    
-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

Check the Logfile for the DynDNS updates. Set it to Informational and search for the chosen domain.

檢查日誌檔案以取得 DynDNS 更新資訊。將其設定為「資訊」模式，然後搜尋所選網域。

Note

筆記

Enabling the Dynamic DNS checkboxes can have different results:

啟用動態DNS複選框可能會產生不同的結果：

-   Base Domain: `example.com @`  
    基本域： `example.com @`
    
-   Wildcard Domain: `example.com *`  
    通配符網域： `example.com *`
    
-   Subdomain: `example.com opn`  
    子網域： `example.com opn`
    

Use subdomains if you see errors in the log like:

如果在日誌中看到類似這樣的錯誤，請使用子網域：

failed setting DNS record(s) with new IP address(es)”,”zone”:”opn.example.com”,”error”:”expected 1 zone, got 0

設定DNS記錄時失敗，新IP地址無效”，“區域”:”opn.example.com”，“錯誤”:”預期 1 個區域，實際得到 0 個區域”

This means the zone `opn.example.com @` does not exist, and the provider expects `example.com opn` for the update. You can see the current configuration in Services ‣ Caddy Web Server ‣ Diagnostics ‣ Caddyfile.

這意味著區域`opn.example.com @`不存在，提供者期望使用`example.com opn`進行更新。您可以在「服務」‣「Caddy Web 伺服器」‣「診斷」‣「Caddyfile」中查看目前設定。

### [Wildcard Domain with Subdomains](#id10)｜[帶子網域的通配符網域](#id10)

Tip

提示

For Cloudflare, this is the recommended setup.

對於 Cloudflare，這是建議的設定。

Note

筆記

If you use [Dynamic DNS](#dynamicdns-opnsense-caddy), subdomains are needed due to the way the API updates the DNS Records in hosted zones.

如果您使用 [動態DNS](#dynamicdns-opnsense-caddy) ，則需要子網域，因為API更新託管區域中的DNS記錄的方式。

Go to Services ‣ Caddy Web Server ‣ General Settings ‣ DNS Provider

前往“服務”‣“Caddy Web 伺服器”‣“常規設定”‣ DNS提供者”

-   Select Cloudflare from the list  
    從清單中選擇 Cloudflare
    
-   Input the API Key  
    輸入API鍵
    
-   Set Resolvers to `1.1.1.1`  
    將解析器設定為`1.1.1.1`
    

Go to Services ‣ Caddy Web Server ‣ Reverse Proxy ‣ Domains

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“網域”

-   Create `*.example.com` as domain and activate the DNS-01 Challenge checkbox. Alternatively, use a certificate imported or generated in System ‣ Trust ‣ Certificates. It has to be a wildcard certificate. You could generate one with the os-acme-client plugin.  
    建立域`*.example.com`並啟動DNS -01 質詢複選框。或者，使用在「系統」‣「信任」‣「憑證」中匯入或產生的憑證。該憑證必須是通配符憑證。您可以使用 os-acme-client 外掛程式產生通配符憑證。
    
-   Create all subdomains in relation to the `*.example.com` domain, for example `foo.example.com` and `bar.example.com`.  
    建立與`*.example.com`域相關的所有子域，例如`foo.example.com`和`bar.example.com` 。
    
-   Check Dynamic DNS for the new subdomains, if needed.  
    如有需要，請檢查 Dynamic DNS中的新子網域。
    

Go to Services ‣ Caddy Web Server ‣ Reverse Proxy ‣ Handlers

轉到“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“處理程序”

-   Create a Handler with `*.example.com` as domain and `foo.example.com` as subdomain. Most of the same configuration as with base domains are possible. The subdomain dropdown only shows when a wildcard domain has been configured.  
    建立以`*.example.com`為域、 `foo.example.com`為子域的處理程序。其配置方式與基本域基本相同。子網域下拉式選單僅在配置了通配符域時才會顯示。
    

Note

筆記

The certificate of a wildcard domain will only contain `*.example.com`, not a SAN for `example.com`. If there is a service that should match `example.com` exactly, create an additional domain for `example.com` with an additional Handler for its upstream destination. Subdomains do not support setting ports, they will always track the ports of their assigned parent wildcard domain.

通配符網域的憑證只會包含`*.example.com` ，而不會包含`example.com`對應的SAN 。如果某個服務需要與`example.com`完全匹配，則需要為`example.com`創建一個額外的域名，並為其上游目標添加一個額外的處理程序。子網域不支援設定端口，它們始終會追蹤其所屬父級通配符網域的連接埠。

Tip

提示

For Cloudflare, set Trusted Proxies to the Cloudflare IP ranges and Client IP Headers to `Cf-Connecting-Ip`.

對於 Cloudflare，將受信任代理設定為 Cloudflare IP範圍，將客戶端IP標頭設定為`Cf-Connecting-Ip` 。

### [Reverse Proxy the OPNsense WebGUI](#id11)｜[反向代理 OPNsense WebGUI](#id11)

Tip

提示

The same approach can be used for any upstream destination using TLS and a self-signed certificate.

對於任何使用TLS和自簽名憑證的上游目標，都可以採用相同的方法。

Attention

注意

The OPNsense WebGUI is only bound to 127.0.0.1 when no specific interface is selected: System ‣ Settings ‣ Administration - Listen Interfaces - All (recommended). Otherwise, use the IP address of the specific interface as “Upstream Domain”（上游域）.

只有在未選擇特定介面時，OPNsense WebGUI 才會綁定到127.0.0.1 ：系統 ‣ 設定 ‣ 管理 - 監聽介面 - 全部（建議）。否則，請使用特定介面的IP位址作為“Upstream Domain”（上游域） 。

-   Open the OPNsense WebGUI in a browser (e.g. Chrome or Firefox). Inspect the certificate by clicking on the 🔒 in the address bar. Copy the SAN for later use. It can be a hostname, for example `OPNsense.localdomain`  
    在瀏覽器（例如​​ Chrome 或 Firefox）中開啟 OPNsense WebGUI。點選網址列中的 🔒 查看證書。複製SAN以備後用。它可以是主機名，例如`OPNsense.localdomain`
    
-   Save the certificate as `.pem` file. Open it up with a text editor, and copy the contents into a new entry in System ‣ Trust ‣ Authorities. Name the certificate `opnsense-selfsigned`  
    將證書另存為`.pem`文件。使用文字編輯器開啟該文件，並將內容複製到「系統」‣「信任」‣「憑證授權單位」中的新條目。將證書命名為`opnsense-selfsigned`
    
-   Add a new Domain, for example `opn.example.com`  
    新增域名，例如`opn.example.com`
    
-   Add a new Handler with the following options:  
    新增一個新的處理程序，並具有以下選項：
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| *Frontend*<br>*前端* |  |
| **Domain:**<br>**網域：** | `opn.example.com` |
| *Upstream*<br>*上游* |  |
| **Protocol**<br>**協議** | `https://` |
| **Upstream Domain:**<br>**上游域：** | `127.0.0.1` |
| **Upstream Port:**<br>**上游連接埠：** | `8443` - WebGUI Port<br>`8443` - WebGUI 連接埠 |
| **TLS Trust Pool:**<br>**TLS信託池：** | `opnsense-selfsigned` |
| **TLS Server Name:**<br>**TLS伺服器名稱：** | `OPNsense.localdomain` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

Go to System ‣ Settings ‣ Administration

轉到“系統”‣“設定”‣“管理”。

-   Input `opn.example.com` in Alternate Hostnames to prevent the error: The HTTP\_REFERER “https://opn.example.com/” does not match the predefined settings  
    請在「備用主機名稱」中輸入`opn.example.com`以避免出現以下錯誤：“ HTTP \_REFERER “ https://opn.example.com/”與預定義設定不符”
    
-   Press **Save**  
    按下**儲存**
    

Open `https://opn.example.com` and it should serve the reverse proxied OPNsense WebGUI. Check the log file for errors if it does not work, most of the time the TLS Server Name doesn’t match the SAN of the TLS Trust Pool. Caddy does not support certificates with only a CN Common Name.

打開`https://opn.example.com` ，它應該會提供反向代理的 OPNsense WebGUI。如果不起作用，請檢查日誌檔案中的錯誤，大多數情況下， TLS伺服器名稱與TLS信任池中的SAN不符。 Caddy 不支援僅包含CN通用名稱的憑證。

Attention

注意

Create an [Access List](#accesslist-opnsense-caddy) to restrict access to the WebGUI.

建立 [存取清單](#accesslist-opnsense-caddy)以限制對 WebGUI 的存取。

### [Redirect ACME HTTP-01 Challenge](#id12)｜[重定向ACME HTTP -01 挑戰](#id12)

Sometimes an application behind Caddy uses its own ACME Client to get certificates, most likely with the HTTP-01 challenge. This plugin has a built in mechanism to redirect this challenge type easily to a destination behind it.

有時，Caddy 背後的應用程式會使用自己的ACME客戶端來取得證書，最常用的方法是使用HTTP -01 質詢。此插件內建了一種機制，可以輕鬆地將此類質詢重定向到其背後的目標伺服器。

Make sure the chosen domain is externally resolvable. Create an A-Record on a public DNS server that points to the external IP Address of the OPNsense. In case of IPv6 availability, it is mandatory to create an AAAA-Record too, otherwise the TLS-ALPN-01 challenge might fail.

確保所選網域可從外部解析。在公共伺服器上建立一條 A 記錄，指向 OPNsense 的外部位址IP DNS ）。如果 IPv6 可用，則必須同時建立一條 A 記錄AAAA ），否則TLS-ALPN質詢可能會失敗。

The configured Domain must use an `empty port` or `443` in the GUI, otherwise it can not use the TLS-ALPN-01 challenge for itself. The upstream destination must listen on Port `80` and serve `/.well-known/acme-challenge/`, for the same Domain that is configured in Caddy.

配置的域必須在GUI中使用`empty port`或`443` ，否則它無法使用TLS-ALPN -01 挑戰。上游目標必須監聽埠`80`並為`/.well-known/acme-challenge/`提供服務，且該域必須與 Caddy 中配置的域相同。

Go to Services ‣ Caddy Web Server ‣ Reverse Proxy ‣ Domains

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“網域”

-   Press **✎** and open an existing Domain or Subdomain and enable advanced mode  
    按**✎**開啟現有域名或子域名，並啟用進階模式
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| **Domain:**<br>**網域：** | `foo.example.com` |
| **HTTP-01 Challenge Redirection:**<br>**HTTP -01 挑戰重定向：** | `192.168.10.1` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

The HTTP-01 Challenge Redirection is active and the upstream destination located at `192.168.10.1` will be able to issue the certificate for the domain `foo.example.com`.

HTTP -01 挑戰重定向已激活，位於`192.168.10.1`的上游目標將能夠為域`foo.example.com`頒發證書。

With this configuration, Caddy will choose the TLS-ALPN-01 challenge to get its own certificate for `foo.example.com`, and reverse proxy the HTTP-01 challenge to `192.168.10.1`, where the upstream destination can listen on port 80 for `foo.example.com`. With TLS enabled in the Handler, an encrypted connection is automatically possible. The automatic HTTP to HTTPS redirection is also taken care of.

透過此配置，Caddy 將選擇 TLS-ALPN-01 質詢來取得自己的 `foo.example.com` 證書，並將 HTTP-01 質詢反向代理到 `192.168.10.1`，其中上游目標可以在連接埠 80 上偵聽 `foo.example.com`。在處理程序中啟用 TLS 後，可以自動建立加密連線。也負責自動 HTTP 到 HTTPS 重定向。

### [Filter by Domain](#id13)｜[依網域篩選](#id13)

A large configuration can be challenging to navigate. To help, a filter functionality has been added to the top right corner of the Domains, Subdomains and Handlers tab, called Filter by Domain.

大型配置可能難以瀏覽。為了方便用戶，我們在「網域、子網域和處理程序」標籤的右上角新增了一個名為「按網域篩選」的篩選功能。

In Filter by Domain, one or multiple Domains and Subdomains can be selected. As filter result, only their corresponding configuration will be displayed in Domains, Subdomains and Handlers.

在「按域篩選」中，可以選擇一個或多個域和子域。篩選結果中，僅會在「域」、「子域」和「處理程序」中顯示與其對應的配置。

When creating a new Subdomain or Handler, the selection in the filter will be added automatically to the open form.

建立新的子網域或處理程序時，篩選器中的選擇將自動新增到開啟的表單中。

This filter is also used by the Add Handler and Search Handler buttons to scope the correct selection.

「新增處理程序」和「搜尋處理程序」按鈕也使用此篩選器來限定正確的選擇範圍。

## [Advanced Configuration](#id14)｜[進階配置](#id14)

### [Multiple Handlers for the same Domain](#id15)｜[同領域的多個處理程序](#id15)

Handlers are not limited to one per domain or subdomain. If there are multiple different paths to handle (e.g. `/foo/*` and `/bar/*`), create a Handler for each of them.

每個域或子域的處理程序不限於一個。如果需要處理多個不同的路徑（例如`/foo/*`和`/bar/*` ），則為每個路徑建立處理程序。

When creating a Handler with an empty path, the templating logic will automatically place it last in the Caddyfile site block. This means, specific paths will always match before an empty path, regardless of their position in the configuration. This could be used to block specific paths with an Access List, route some paths to different upstreams, and then set an empty handle for all unmatched paths.

當建立路徑為空的處理程序時，範本邏輯會自動將其放置在 Caddyfile 網站區塊的末端。這意味著，無論特定路徑在配置中的位置如何，它們始終會在空路徑之前匹配。這可用於透過存取清單阻止特定路徑，將某些路徑路由到不同的上游，然後為所有未匹配的路徑設定一個空處理程序。

Different handling logics can be selected. E.g., handle\_path to strip the path from all requests, or handle to preserve the path from all requests.

可以選擇不同的處理邏輯。例如，使用 handle_path 從所有請求中移除路徑，或使用 handle 保留所有請求中的路徑。

When using a mix of wildcard domains and subdomains, a Handler set exclusively on the wildcard domain will match after all subdomains. That way, all unmatched subdomains can be sent to a custom upstream.

當混合使用通配符網域和子網域名稱時，如果僅針對通配符網域設定了處理程序，則該處理程序會在配對完所有子網域後才進行比對。這樣，所有未匹配的子網域都可以傳送到自訂的上游伺服器。

Multiple domains with the same hostname and different ports can be created at the same time. E.g., `opn.example.com:443` and `opn.example.com:8443`. Now the frontend can listen on multiple ports for the same domain. These domains will share the same certificate automatically if ACME manages them. Each of these sockets need their own Handler to proxy traffic.

可以同時建立多個具有相同主機名稱但連接埠不同的域名，例如`opn.example.com:443`和`opn.example.com:8443` 。這樣，前端就可以監聽同一網域的多個連接埠。如果這些網域由ACME管理，它們將自動共用同一個憑證。每個套接字都需要自己的處理程序來代理流量。

An example Caddyfile could look like this:

一個 Caddyfile 檔案的範例可能如下所示：

```
# Reverse Proxy Domain: "531e7877-0b58-4f93-a9f0-54beee58bdea"
opn.example.com:443 {
        handle /private/* {
                @d72c1182-6f05-4c25-8d9f-6a226a9039ea {
                        not client_ip 192.168.0.0/16 172.16.0.0/12 10.0.0.0/8
                }
                handle @d72c1182-6f05-4c25-8d9f-6a226a9039ea {
                        abort
                }

                reverse_proxy 172.16.99.10:8443 {
                }
        }

        handle /different_upstream/* {
                reverse_proxy 192.168.1.33 {
                }
        }

        handle {
                reverse_proxy 172.16.99.10:8443 {
                }
        }
}
# Reverse Proxy Domain: "58760ae1-2409-4a6b-a6c4-d58b15706b55"
opn.example.com:8443 {
        handle_path /strip_this {
                reverse_proxy 10.10.10.10:8443 {
                }
        }
}
```

Tip

提示

Access Lists and Basic Auth can match directly on Handlers for more complex access control scenarios.

對於更複雜的存取控制場景，存取清單和基本驗證可以直接在處理程序上進行比對。

### [Reverse Proxy a Webserver with Vhosts](#id16)｜[使用虛擬主機反向代理 Web 伺服器](#id16)

Sometimes it is necessary to alter the host header in order to reverse proxy to another webserver with vhosts.

有時需要修改主機頭才能反向代理到另一個有虛擬主機的 Web 伺服器。

Since Caddy passes the original host header by default (e.g. `app.external.example.com`), if the upstream destination listens on a different hostname (e.g. `app.internal.example.com`), it would not be able to serve this request.

由於 Caddy 預設傳遞原始主機頭（例如`app.external.example.com` ），如果上游目標監聽不同的主機名稱（例如`app.internal.example.com` ），則無法處理此要求。

Go to Services ‣ Caddy Web Server ‣ Reverse Proxy ‣ Domains

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“網域”

-   Press **+** to create a new Domain  
    按**+**建立新域名
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| **Domain:**<br>**網域：** | `app.external.example.com` |

-   Press **Save**  
    按下**儲存**
    

Go to Services ‣ Caddy Web Server ‣ Reverse Proxy ‣ Headers

轉到“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“標頭”。

-   Press **+** to create a new HTTP Header  
    按 **+** 建立新的HTTP標題
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| **Header:**<br>**標題：** | `header_up` |
| **Header Type:**<br>**標題類型：** | `Host` |
| **Header Value:**<br>**標題值：** | `{upstream_hostport}` |

-   Press **Save**  
    按下**儲存**
    

Go to Services ‣ Caddy Web Server ‣ Reverse Proxy ‣ Handler

轉到“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“處理程序”。

-   Press **+** to create a new Handler and open the Transport section.  
    按 **+** 建立新的處理程序並開啟傳輸部分。
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| **Domain:**<br>**網域：** | `app.external.example.com` |
| **Upstream Domain:**<br>**上游域：** | `app.internal.example.com` |
| **HTTP Headers:**<br>**HTTP標題：** | `header_up Host {upstream_hostport}` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

### [CrowdSec Integration](#id17)｜[CrowdSec 整合](#id17)

CrowdSec is a powerful alternative to a WAF. It uses logs to dynamically ban IP addresses of known bad actors. The Caddy plugin is prepared to emit the json logs for this integration.

CrowdSec 是WAF的強大替代方案。它利用日誌動態IP已知惡意使用者的位址。 Caddy 外掛程式已準備好為此整合產生 JSON 日誌。

Go to Services ‣ Caddy Web Server ‣ General Settings ‣ Log Settings

前往“服務”‣“Caddy Web 伺服器”‣“常規設定”‣“日誌設定”

-   Enable Log HTTP Access in JSON Format  
    啟用日誌HTTP訪問JSON格式
    
-   Press **Save**  
    按下**儲存**
    

Go to Services ‣ Caddy Web Server ‣ Reverse Proxy ‣ Domains

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“網域”

-   Open each Domain that should be monitored by CrowdSec and open Access  
    開啟所有需要由 CrowdSec 監控的網域並開放存取權限
    
-   Enable HTTP Access Log  
    啟用HTTP訪問日誌
    

Now the HTTP access logs will appear in `/var/log/caddy/access` in json format, one file for each domain.

現在， HTTP存取日誌將以 json 格式出現在`/var/log/caddy/access`中，每個網域對應一個檔案。

Next, connect to the OPNsense via SSH or console, go into the shell with Option 8.

接下來，透過SSH或控制台連接到OPNsense，使用選項8進入shell。

Attention

注意

This step requires the `os-crowdsec` plugin.

此步驟需要`os-crowdsec`插件。

-   Once in the shell, install the caddy collection from CrowdSec Hub. `cscli collections install crowdsecurity/caddy`  
    進入 shell 後，從 CrowdSec Hub 安裝 caddy 集合。 `cscli collections install crowdsecurity/caddy`
    
-   Create the configuration file as `/usr/local/etc/crowdsec/acquis.d/caddy.yaml` with the following content:  
    建立名為`/usr/local/etc/crowdsec/acquis.d/caddy.yaml`的設定文件，內容如下：
    

```yaml
filenames:
  - /var/log/caddy/access/*.log

force_inotify: true
poll_without_inotify: true

labels:
  type: caddy
```

-   Go into the OPNsense WebGUI and restart CrowdSec.  
    進入 OPNsense WebGUI 並重新啟動 CrowdSec。
    

### [High Availability Setups](#id18)｜[高可用性配置](#id18)

There are a few possible configurations to run Caddy successfully in a High Availability Setup with two OPNsense firewalls.

在具有兩個 OPNsense 防火牆的高可用性設定中，有幾種可能的配置可以成功運行 Caddy。

The main issue is the certificate handling. If a CARP VIP is used on the WAN interface, and the A and AAAA Records of all domains point to this CARP VIP, the backup Caddy will not be able to issue ACME certificates without some additional configuration.

主要問題在於證書處理。如果在WAN介面上使用CARP VIP ，且所有網域的 A 記錄和AAAA記錄都指向此CARP VIP ，則備份 Caddy 將無法頒發ACME憑證，除非進行一些額外的設定。

There are three methods that support XMLRPC sync:

支援XMLRPC同步的三種方法有：

Note

筆記

These methods can be mixed, just make sure to use a coherent configuration. It is best to decide for one method. Only Domains need configuration, Subdomains do not need any configuration for HA.

這些方法可以混合使用，但請確保使用一致的配置。最好選擇一種方法。只有網域名稱需要配置，子網域不需要任何配置HA ）。

1.  Using custom certificates from the OPNsense Trust store for all Domains.  
    為所有網域使用來自 OPNsense Trust 儲存區的自訂憑證。
    
2.  Using the DNS-01 Challenge in the settings of Domains.  
    在域設定中使用DNS -01挑戰。
    
3.  Using the HTTP-01 Challenge Redirection option in the advanced settings of Domains.  
    在網域的進階設定中使用HTTP -01挑戰重定向選項。
    

Since the HTTP-01 Challenge Redirection needs some additional steps to work, it should be set up as followed:

由於HTTP -01 挑戰重定向需要一些額外的步驟才能生效，因此應如下設定：

-   Configure Caddy on the master OPNsense until the whole initial configuration is completed.  
    在主 OPNsense 上配置 Caddy，直到完成所有初始配置。
    
-   On the master OPNsense, select each Domain, and set the IP Address in HTTP-01 Challenge Redirection to the same value as in Synchronize Config to IP found in System ‣ High Availability ‣ Settings.  
    在主 OPNsense 上，選擇每個域，並將HTTP -01 質詢重定向中的IP位址設定為與系統 ‣ 高可用性 ‣ 設定中的IP同步配置中相同的值。
    
-   Create a new Firewall rule on the master OPNsense that allows Port `80` and `443` to `This Firewall` on the interface that has the prior selected IP Address (most likely a LAN or VLAN interface).  
    在主 OPNsense 上建立一個新的防火牆規則，允許連接埠`80`和`443`到`This Firewall` ，該連接埠位於具有先前選定的IP位址的介面上（很可能是LAN或介面VLAN ）。
    
-   Sync this configuration with XMLRPC sync.  
    將此配置與XMLRPC同步。
    

Now both Caddy instances will be able to issue ACME certificates at the same time. Caddy on the master OPNsense uses the TLS-ALPN-01 challenge for itself and reverse proxies the HTTP-01 challenge to the Caddy of the backup OPNsense. Please make sure, that the master and backup OPNsense are both listening on their WAN and LAN (or VLAN) interfaces on port `80` and `443`, since both ports are required for these challenges to work.

現在兩個 Caddy 實例可以同時頒發ACME憑證。主 OPNsense 上的 Caddy 使用TLS-ALPN -01 質詢進行自身驗證，並將HTTP -01 質詢反向代理到備份 OPNsense 上的 Caddy。請確保主 OPNsense 和備份 OPNsense 都監聽其WAN和LAN （或VLAN ）介面的`80`和`443` ，因為這兩個連接埠對於這些質詢的正常工作都是這些必要的。

Tip

提示

Check the Logfile on both Caddy instances for successful challenges. Look for `certificate obtained successfully` informational messages.

檢查兩個 Caddy 實例上的日誌文件，查看挑戰是否成功。尋找`certificate obtained successfully`資訊性訊息。

### [Forward Auth](#id19)｜[前向授權](#id19)

Delegating authentication to Authelia or Authentik is a very advanced usecase. [The Forward Auth Documentation](https://caddyserver.com/docs/caddyfile/directives/forward_auth#authelia) should be used for inspiration.

將身份驗證委託給 Authelia 或 Authentik 是一個非常高級的用例。 [前向驗證文件](https://caddyserver.com/docs/caddyfile/directives/forward_auth#authelia)可供參考。

To attach the Forward Auth directive to a handler, the Auth Provider has to be filled out in the General Settings. Afterwards, the Forward Auth checkbox in a Handler can be selected in advanced mode. This will prepend the forward\_auth directive in front of the reverse\_proxy directive in the scope of that Handler. Headers are set automatically.

若要將轉送身分驗證指令附加到處理程序，必須在「常規設定」中填寫身分驗證提供者。之後，可以在進階模式下選取處理程序中的「轉送身份驗證」複選框。這會將 forward_auth 指令加入到該處理程序作用域內的 reverse_proxy 指令之前。標頭會自動設定。

Using Access Lists and Basic Auth in the Domain this Handler matches on is not recommended.

不建議在此處理程序相符的網域中使用存取清單和基本驗證。

An example Caddyfile could look like this:

一個 Caddyfile 檔案的範例可能如下所示：

```
app1.example.com {
    handle {
        forward_auth authelia:9091 {
            uri /api/verify?rd=https://auth.example.com
            copy_headers Remote-User Remote-Groups Remote-Name Remote-Email
        }
        reverse_proxy 192.168.10.1:8080 {
        }
    }
}
```

Requests from clients to app1.example.com will be sent to Authelia via the forward\_auth directive. Then, after the authentication has been completed, the reverse\_proxy directive sends the traffic to the Upstream.

用戶端向 app1.example.com 發出的請求將透過 forward_auth 指令傳送到 Authelia。然後，在驗證完成後，reverse_proxy 指令會將流量傳送到上游伺服器。

### [Run Caddy Process Unprivileged](#id20)｜[以非特權模式運行 Caddy 進程](#id20)

In this plugin, Caddy runs as root. This is required when well-known ports are used. Since the default ports are 80 and 443, Caddy will be started as superuser.

此插件中，Caddy 以 root 使用者身分運作。當使用常用連接埠時，必須這樣做。由於預設連接埠為 80 和 443，Caddy 將以超級使用者身分啟動。

For higher security demands, there is the option to run Caddy as www user and group. This comes with the restriction of only being able to use upper ports (≥ 1024).

對於更高的安全需求，可以選擇以 www 使用者和群組的身份執行 Caddy。但這樣做會限制只能使用較高的連接埠（≥ 1024）。

Make sure all of the domains have empty ports, or ports above the well-known port range before continuing. There is a validation that will prevent configuring well-known ports when the www user is active.

請確保所有網域都使用空端口，或使用超出常用端口範圍的端口，然後再繼續。系統會進行驗證，以防止在 www 使用者處於活動狀態時配置常用連接埠。

Go to Services ‣ Caddy Web Server ‣ General Settings ‣ Advanced Settings

前往“服務”‣“Caddy Web 伺服器”‣“常規設定”‣“進階設定”

-   Add custom upper HTTP Port, e.g. `8080`  
    添加自訂上部HTTP端口，例如`8080`
    
-   Add custom upper HTTPS Port, e.g. `8443`  
    添加自訂上部HTTPS端口，例如`8443`
    
-   Select `www` as System User  
    選擇`www`作為系統用戶
    
-   Restart Caddy completely. Disable it and press Apply, then enable it and press Apply.  
    完全重啟 Caddy。先停用它並點擊“應用程式”，然後再啟用它並點擊“應用程式”。
    

From now on, Caddy will run as www user and group. This can be verified by checking the user of the Caddy process.

從現在起，Caddy 將以 www 用戶和群組的身份運行。可以透過檢查 Caddy 進程的使用者來驗證這一點。

Note

筆記

With this configuration, Destination NAT (Port Forward) should be used to forward port 80 and 443 to the new alternative HTTP and HTTPS Ports. For IPv6 additional steps could be required.

在此配置下，應使用目標連接埠轉送（Destination NAT ）將連接埠 80 和 443 轉送至新的備用連接埠HTTP和HTTPS ）。對於 IPv6，可能需要額外的步驟。

### [Bind Caddy to Interfaces](#id21)｜[將 Caddy 綁定到介面](#id21)

Warning

警告

Binding a service to a specific interface via IP address can cause lots of issues. If the IP address is dynamic, the service can crash or refuse to start. During boot, the service can refuse to start if the interface IP addresses are assigned too late. Configuration changes on the interfaces can cause the service to crash. **Only use this with static IP addresses! There is no OPNsense community support for this configuration.**

透過IP位址將服務綁定到特定介面可能會導致諸多問題。如果IP位址是動態的，服務可能會崩潰或無法啟動。在啟動過程中，如果介面IP位址分配過晚，服務也可能無法啟動。介面配置的變更也可能導致服務崩潰。 **此方法僅適用於靜態IP位址！ OPNsense 社群不提供對此配置的支援。**

This configuration is only useful if there are two or more WAN interfaces, and Caddy should only respond on one of them. It can also solve port conflicts, for example if one interface should DNAT or host a different service with the default webserver ports.

此配置僅在存在兩個或多個WAN接口，且 Caddy 只需在其中一個接口上響應時才有效。它還可以解決連接埠衝突，例如，當一個介面需要使用DNAT或託管其他服務，且該服務使用預設 Web 伺服器連接埠時。

-   Create the following files with the following content in the OPNsense filesystem:  
    在 OPNsense 文件系統中建立以下文件，並寫入以下內容：
    

1.  `/usr/local/etc/caddy/caddy.d/defaultbind.global`
    

```
default_bind 203.0.113.1 192.168.1.1
```

2.  `/usr/local/etc/caddy/caddy.d/defaultbind.conf`
    

```
http:// {
bind 203.0.113.1 192.168.1.1
}
```

Now Caddy will only bind to `203.0.113.1` and `192.168.1.1`. It can still be configured in the GUI without restrictions.

現在 Caddy 只能綁定到`203.0.113.1`和`192.168.1.1` 。它仍然可以在GUI中進行配置，沒有任何限制。

Read more about the `default_bind` directive: [Default Bind](https://caddyserver.com/docs/caddyfile/options#default-bind)

閱讀更多關於`default_bind`指令的資訊：[預設綁定](https://caddyserver.com/docs/caddyfile/options#default-bind)

### [Custom Configuration Files](#id22)｜[自訂設定檔](#id22)

-   The Caddyfile has an additional import from the path `/usr/local/etc/caddy/caddy.d/`. Place custom configuration files inside that adhere to the Caddyfile syntax.  
    Caddyfile 檔案中新增了從路徑`/usr/local/etc/caddy/caddy.d/`匯入的內容。請將符合 Caddyfile 語法的自訂設定檔放置在該路徑下。
    
-   `*.global` files will be imported into the `global block`.  
    `*.global`檔案將會被匯入到`global block`中。
    
-   `*.conf` files will be imported into the `site block`.  
    `*.conf`檔案將會被匯入到`site block`中。
    
-   `*.layer4global` and `*.layer4listener` files will be imported into their respective `layer4 directive`.  
    `*.layer4global`和`*.layer4listener`檔案將分別匯入各自的`layer4 directive`中。
    
-   Don’t forget to test the custom configuration with `caddy validate --config /usr/local/etc/caddy/Caddyfile`.  
    別忘了使用`caddy validate --config /usr/local/etc/caddy/Caddyfile`測試自訂配置。
    

With these imports, the full potential of Caddy can be unlocked. The GUI options will remain focused on the reverse proxy. **There is no OPNsense community support for configurations that have not been created with the offered GUI**. For customized configurations, the Caddy community is the right place to ask.

透過這些導入，可以釋放 Caddy 的全部潛力。 GUI 選項將繼續關注反向代理。 **對於未使用提供的 GUI** 建立的配置，OPNsense 社群不支援。對於定製配置，Caddy 社群是詢問的正確地點。

## [Caddy: Layer4 Proxy](#id23)｜[Caddy：Layer4 代理](#id23)

## [Enable Layer4 Proxy](#id24)｜[啟用四層代理程式](#id24)

-   Go to Services ‣ Caddy Web Server ‣ General Settings  
    前往“服務”‣“Caddy Web 伺服器”‣“常規設定”
    
-   Enable the checkbox Enable Layer4 Proxy  
    啟用「啟用第 4 層代理程式」複選框
    
-   Press **Apply**, then go to Services ‣ Caddy Web Server ‣ Layer4 Proxy  
    按 **套用**，然後前往 Services ‣ Caddy Web Server ‣ Layer4 Proxy
    

## [Routing Type](#id25)｜[路由類型](#id25)

The implementation has two different modes for layer4 routes:

此實作針對第 4 層路由提供了兩種不同的模式：

1.  `listener_wrappers` will match traffic on the default HTTP and HTTPS ports that Caddy listens on. With a Layer 7 matcher, selected protocols can be proxied to an upstream. This can be used to multiplex protocols on the default ports and still use the Reverse Proxy at the same time. The most popular usecase is proxying HTTPS without TLS termination. As default route, all unmatched traffic will be sent to the Reverse Proxy.  
    `listener_wrappers`將符合 Caddy 監聽的預設連接埠HTTP和HTTPS上的流量。透過七層匹配器，可以將選定的協定代理到上游伺服器。這可以用於在預設連接埠上重複使用協議，同時仍使用反向代理。最常見的用例是代理程式HTTPS而不進行TLS終止。作為預設路由，所有未匹配的流量都會傳送到反向代理。
    
2.  `global` can match any TCP/UDP traffic on any free local port. Additionally, one or multiple Layer 7 matchers can be created under the same protocol port combination. The sequence can be set manually by changing the sequence number.  
    `global`可以匹配任何空閒本地端口上的任何TCP/UDP流量。此外，可以在相同協定連接埠組合下建立一個或多個第 7 層匹配器。可以透過更改序號手動設定匹配順序。
    

Routes for both modes can be used at the same time.

兩種模式的路線可以同時使用。

## [Layer 4 Matchers](#id26)｜[第 4 層匹配器](#id26)

For the `global` routing type, the protocol can be set to either TCP or UDP. A local port must be selected, this port must be free and not used by any other service. Port ranges are not supported.

對於`global`路由類型，協定可以設定為TCP或UDP 。必須選擇一個本地端口，該端口必須空閒且未被任何其他服務佔用。不支援連接埠範圍。

Any IP traffic that matches the port and protocol can proxied to one or multiple upstreams. If raw Layer 4 traffic should be proxied, select ANY as Layer 7 matcher.

任何符合連接埠和協定的IP流量都可以代理到一個或多個上游伺服器。如果需要代理原始的四層流量，請選擇ANY作為七層匹配器。

## [Layer 7 Matchers](#id27)｜[第 7 層匹配器](#id27)

A Layer 7 matcher checks the first bytes of a TCP/UDP packet and decides which protocol it could be. When TLS or HTTP is detected, they can inspect the contents of the Client Hello at the start of a TLS handshake, or the Host Header in case of HTTP traffic.

7 層匹配器檢查TCP/UDP封包的前幾個位元組，並判斷它可能屬於哪個協定。當偵測到TLS或HTTP時，它可以檢查TLS握手開始時的客戶端 Hello 內容，或在HTTP流量的情況下檢查主機頭。

There are additional matchers for all kinds of protocols, including:

還有其他類型的匹配器，包括：

-   DNS
    
-   HTTP (with and without Host Header evaluation)  
    HTTP （有和沒有主機頭評估）
    
-   OpenVPN
    
-   Postgres
    
-   Proxy Protocol  
    代理協定
    
-   QUIC (with and without Client Hello evaluation)  
    QUIC （有和沒有客戶端 Hello 評估）
    
-   RDP
    
-   SOCKSv4/v5
    
-   SSH
    
-   TLS (with and without Client Hello evaluation)  
    TLS （含和不含客戶端 Hello 評估）
    
-   Winbox
    
-   Wireguard  
    鋼絲衛士
    
-   XMPP
    

## [Configuration Examples](#id28)｜[設定範例](#id28)

### [SSH Multiplexing on HTTPS Port](#id29)｜[SSH多工在HTTPS埠上](#id29)

SSH is a raw protocol matcher, it will match all traffic that looks like SSH in the scope of either the `listener_wrapper`, or a TCP port in `global`. Host Headers or SNI can not be evaluated since SSH does not send this information.

SSH是一個原始協定匹配器，它會匹配所有在`listener_wrapper`範圍內或`global`的TCP端口內看起來像SSH的流量。由於SSH不傳送主機頭訊息，因此無法評估主機頭或SNI 。

In this example, we want to allow SSH on the default HTTPS port. This will route the SSH traffic to a selected upstream and all unmatched traffic to the Reverse Proxy.

在這個例子中，我們希望允許SSH在預設的HTTPS埠上傳輸。這將把SSH流量路由到選定的上游伺服器，並將所有不匹配的流量路由到反向代理伺服器。

-   Go to Services ‣ Caddy Web Server ‣ Layer4 Proxy  
    前往「服務」‣「Caddy Web 伺服器」‣「Layer4 代理程式」。
    
-   Press **+** to create a new Layer4 Route  
    按**+**建立新的Layer4路由
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| **Matchers:**<br>**匹配器：** | `SSH` |
| **Upstream Domain:**<br>**上游域：** | `192.168.1.1` |
| **Upstream Port:**<br>**上游埠：** | `22` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

Now an SSH client can open a connection like `ssh app1.example.com -p 443` and the SSH traffic will go through the same port as other HTTP/HTTPS traffic. Caddy becomes a protocol multiplexer.

現在， SSH客戶端可以像`ssh app1.example.com -p 443`一樣建立連接， SSH流量將與其他HTTP/HTTPS流量通過同一端口。 Caddy 變成了一個協議復用器。

Tip

提示

If another route is added, e.g. with the RDP matcher, then SSH and RDP will be on the same port but can be proxied to different upstreams.

如果新增了另一條路由，例如使用RDP匹配器，則SSH和RDP將位於同一端口，但可以代理到不同的上游。

### [TLS (SNI) Multiplexing on HTTPS Port](#id30)｜[TLS ( SNI ) 在HTTPS端口上進行多路復用](#id30)

There is an application with the hostname app1.example.com which should not be handled by the Handlers of the Reverse Proxy. The TLS traffic of this application should be routed directly to an upstream destination without TLS termination.

存在一個主機名為 app1.example.com 的應用程序，該應用程式不應由反向代理的處理程序處理。此應用程式的TLS流量應直接路由到上游目標，而無需TLS終止。

-   Go to Services ‣ Caddy Web Server ‣ Layer4 Proxy  
    前往「服務」‣「Caddy Web 伺服器」‣「Layer4 代理程式」。
    
-   Press **+** to create a new Layer4 Route  
    按**+**建立新的Layer4路由
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| **Domain:**<br>**網域：** | `app1.example.com` |
| **Matchers:**<br>**匹配器：** | `TLS (SNI)` |
| **Upstream Domain:**<br>**上游域：** | `192.168.1.1` |
| **Upstream Port:**<br>**上游埠：** | `8443` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

Caddy listens on the default HTTP and HTTPS ports. All traffic it receives on these or any other listening ports, gets passed to the listener\_wrapper. Inside this wrapper, the traffic can be inspected on Layer 7, and routing decisions can be made.

Caddy 監聽預設的HTTP和HTTPS埠。它從這些連接埠或任何其他監聽連接埠接收到的所有流量都會傳遞給 listener\_wrapper。在這個包裝器內部，可以在第 7 層（網路層）檢查流量，並做出路由決策。

With the matcher TLS (SNI), the Client Hello of the TLS traffic is analyzed. When the Client Hello includes app1.example.com, the traffic will be matched by the new Layer4 Route. The raw TLS traffic will be streamed to the chosen upstream socket.

使用匹配器TLS ( SNI )，分析TLS流量的客戶端 Hello 訊息。如果用戶端 Hello 訊息包含 app1.example.com，則該流量將與新的四層路由進行比對。原始TLS流量將被串流傳輸到選定的上游套接字。

Any other traffic that is not matched by this Layer4 Route will be routed to the Handlers, where the configured Domains and Subdomains can receive and reverse proxy it.

任何其他未與此第 4 層路由匹配的流量都將路由到處理程序，配置的域和子域可以在那裡接收並反向代理它。

Tip

提示

If there should be TLS termination, configure a domain in Services ‣ Caddy Web Server ‣ Reverse Proxy ‣ Domains with a certificate installed for the same SNI that should match in this route. Check **Terminate TLS** in the route, the certificate will be automatically matched.

如果應該有 TLS 終止，請在服務 ‣ Caddy Web 伺服器 ‣ 反向代理 ‣ 網域中設定一個網域，並為應在此路由中符合的相同SNI 安裝憑證。路由中勾选**终止TLS**，证书会自动匹配。

Note

筆記

When Auto HTTPS is enabled, all clients will be permanently redirected to HTTPS automatically. If that should not happen, set it to Disable Redirects.

啟用「自動HTTPS後，所有用戶端將自動永久重新導向至HTTPS 。如果不希望發生這種情況，請將其設定為「停用重定向」。

### [Inverted TLS (SNI) Multiplexing on HTTPS Port](#id31)｜[反向重複使用TLS ( SNI ) 於HTTPS埠](#id31)

Inverting the TLS (SNI) matcher can route all unmatched traffic, for example to a hosting panel where the domains are not under administrative control and can change at any time. The domains matched by SNI will be routed to the Reverse Proxy.

反轉TLS ( SNI ) 匹配器可以將所有未匹配的流量路由到例如主機控制面板，該控制面板中的網域不受管理員控制，並且可能隨時變更。由SNI匹配的網域名稱將被路由到反向代理。

Attention

注意

If you create additional routes, e.g., for SSH, make sure to use the sequence number to generate them before this route.

如果您建立了其他路線，例如SSH ，請確保在此路線之前使用序號產生它們。

-   Go to Services ‣ Caddy Web Server ‣ Layer4 Proxy  
    前往「服務」‣「Caddy Web 伺服器」‣「Layer4 代理程式」。
    
-   Press **+** to create a new Layer4 Route  
    按**+**建立新的Layer4路由
    
-   Enable the advanced mode toggle  
    啟用進階模式切換
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| **Sequence:**<br>**序列：** | `100` |
| **Routing Type:**<br>**路由類型：** | `listener_wrappers` |
| **Protocol:**<br>**協議：** | `TCP` |
| **Matchers:**<br>**匹配器：** | `TLS (SNI)` |
| **Domain:**<br>**網域：** | `*.example.com` `*.opnsense.com` |
| **Invert Matchers:**<br>**反向匹配器：** | `X` |
| **Upstream Domain:**<br>**上游域：** | `192.168.1.1` `192.168.1.2` |
| **Upstream Port:**<br>**上游埠：** | `443` |
| **Fail Duration:**<br>**失敗持續時間：** | `10` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

With the inverted TLS (SNI) matcher, the Client Hello of the TLS traffic is analyzed. When the Client Hello includes either of \*.example.com or \*.opnsense.com, the traffic will be sent to the default Handlers, where the configured Domains and Subdomains can receive and reverse proxy it.

使用反向匹配器TLS ( SNI )，分析TLS流量的客戶端 Hello 訊息。如果用戶端 Hello 訊息包含 *.example.com 或 *.opnsense.com，則流量將被傳送到預設處理程序，配置的網域和子網域可以在這些處理程序中接收並反向代理該流量。

All other traffic will be streamed to the chosen socket of Upstream Domain and Upstream Port. Since we chose multiple upstreams and a health check, two servers can load balance all requests. The load balancing is just an example, and not necessary for this matcher to work.

所有其他流量都將串流傳輸到上游域名和上游連接埠的指定套接字。由於我們選擇了多個上游伺服器並進行了健康檢查，因此兩台伺服器可以對所有請求進行負載平衡。負載平衡只是一個範例，並非此匹配器正常工作的必要條件。

Tip

提示

If there are domains inside \*.example.com that should be routed to a different upstream, just create an additional TLS (SNI) matcher for them. Set the sequence to a lower number to match it before the inverted route.

如果 *.example.com 中存在需要路由到不同上游伺服器的域名，只需為它們建立一個額外的TLS ( SNI ) 匹配器。將序號設定為較小的數字，以便在反向路由之前進行匹配。

Tip

提示

Caddy supports the HA Proxy Protocol. If the Protocol Header should be added to the upstream, set the Proxy Protocol version to `v1` or `v2`.

Caddy 支援HA代理協定。如果要將協定頭加入上游，請將代理協定版本設定為`v1`或`v2` 。

### [Proxy TCP/UDP on Layer 4](#id32)｜[第四層代理TCP/UDP](#id32)

We have an application that should receive all TCP/UDP traffic directed at port 5060.

我們有一個應用程序，它應該接收所有發送到連接埠 5060 的TCP/UDP流量。

-   Go to Services ‣ Caddy Web Server ‣ Layer4 Proxy  
    前往「服務」‣「Caddy Web 伺服器」‣「Layer4 代理程式」。
    
-   Press **+** to create a new Layer4 Route  
    按**+**建立新的Layer4路由
    
-   Enable the advanced mode toggle  
    啟用進階模式切換
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| **Routing Type:**<br>**路由類型：** | `global` |
| **Protocol:**<br>**協議：** | `TCP` |
| **Local Port:**<br>**本地埠：** | `5060` |
| **Matchers:**<br>**匹配器：** | `ANY` |
| **Upstream Domain:**<br>**上游域：** | `192.168.1.1` |
| **Upstream Port:**<br>**上游埠：** | `5060` |

-   Press **Save** and **+** to create another Layer4 Route  
    按**儲存**和**+**建立另一條Layer4路由
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| **Routing Type:**<br>**路由類型：** | `global` |
| **Protocol:**<br>**協議：** | `UDP` |
| **Local Port:**<br>**本地埠：** | `5060` |
| **Matchers:**<br>**匹配器：** | `ANY` |
| **Upstream Domain:**<br>**上游域：** | `192.168.1.1` |
| **Upstream Port:**<br>**上游埠：** | `5060` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

### [DNS and Wireguard Multiplexing](#id33)｜[DNS和 Wireguard 多工](#id33)

We have a DNS server that hosts one of our DNS zones. We want to allow Wireguard on the same port as DNS, but only from a certain remote ip range.

我們有一台DNS伺服器，它託管著我們的一個DNS區域。我們希望允許 Wireguard 使用與DNS相同的端口，但僅限於特定的遠端 IP 位址範圍。

Note

筆記

The sequence is optional, but it can influence the processing order of created rules.

此順序是可選的，但它會影響已建立規則的處理順序。

-   Go to Services ‣ Caddy Web Server ‣ Layer4 Proxy  
    前往「服務」‣「Caddy Web 伺服器」‣「Layer4 代理程式」。
    
-   Press **+** to create a new Layer4 Route  
    按**+**建立新的Layer4路由
    
-   Enable the advanced mode toggle  
    啟用進階模式切換
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| **Sequence:**<br>**序列：** | `100` |
| **Routing Type:**<br>**路由類型：** | `global` |
| **Protocol:**<br>**協議：** | `UDP` |
| **Local Port:**<br>**本地埠：** | `53` |
| **Matchers:**<br>**匹配器：** | `DNS` |
| **Upstream Domain:**<br>**上游域：** | `192.168.1.1` |
| **Upstream Port:**<br>**上游埠：** | `53` |

-   Press **Save** and **+** to create another Layer4 Route  
    按**儲存**和**+**建立另一條Layer4路由
    

| Options<br>選項 | Values<br>值 |
| --- | --- |
| **Sequence:**<br>**序列：** | `101` |
| **Routing Type:**<br>**路由類型：** | `global` |
| **Protocol:**<br>**協議：** | `UDP` |
| **Local Port:**<br>**本地埠：** | `53` |
| **Matchers:**<br>**匹配器：** | `Wireguard` |
| **Upstream Domain:**<br>**上游域：** | `172.16.1.1` |
| **Upstream Port:**<br>**上游埠：** | `51820` |
| **Remote IP:**<br>**遙控器IP :** | `203.0.113.0/24` |

-   Press **Save** and **Apply**  
    按**儲存**並**應用**
    

All of these Layer 7 routes will be automatically grouped under port UDP/53 in the chosen sequence order.

所有這些第 7 層路由將按選定的順序自動分組到連接埠UDP /53 下。

## [Caddy: Troubleshooting](#id34)｜[Caddy：故障排除](#id34)

## [FAQ](#id35)

-   Cloudflare is not required to get automatic certificates.  
    無需使用 Cloudflare 即可獲得自動憑證。
    
-   You can use the os-acme-client plugin to generate wildcard certificates. Set up an automation in the ACME client that reloads Caddy (do not restart it).  
    您可以使用 os-acme-client 外掛程式產生通配符憑證。在ACME客戶端中設定一個自動化流程，用於重新載入 Caddy（不要重新啟動 Caddy）。
    
-   Destination NAT (Port Forward), NAT Reflection, Split Horizon DNS or DNS Overrides in Unbound are not required. Only create Firewall rules that allow traffic to the default ports of Caddy.  
    Unbound 中的目標連接埠轉送NAT )、反射NAT 、分割等級DNS或連接埠轉送DNS覆寫設定並非必要。只需建立允許流量流向 Caddy 預設連接埠的防火牆規則即可。
    
-   Even though internal clients will use the external IP address to access the reverse proxied services, the traffic will not pass over the internet. It will stay inside the OPNsense. Only in rare cases where there is multi WAN, the traffic can be routed from one WAN interface to the other over the internet, due to reply-to settings.  
    即使內部客戶端使用外部位址IP存取反向代理服務，流量也不會經過互聯網，而是保留在OPNsense內部。只有在極少數情況下，當存在多個WAN介面時，由於回復設置，流量才可能透過互聯網從一個WAN介面路由到另一個介面。
    
-   Firewall rules to allow Caddy to reach internal services are not required. OPNsense has a default rule that allows all traffic originating from itself to be allowed.  
    無需設定防火牆規則允許 Caddy 存取內部服務。 OPNsense 預設允許所有源自自身的流量通過。
    
-   ACME clients on reverse proxied upstream destinations will not be able to issue certificates. Caddy intercepts `/.well-known/acme-challenge`. This can be solved by using the HTTP-01 Challenge Redirection option in the advanced mode of domains. Please check the tutorial section for an example.  
    ACME反向代理上游目標的客戶端將無法頒發憑證。 Caddy 會攔截`/.well-known/acme-challenge`請求。這可以透過在網域的進階模式下使用HTTP -01 質詢重定向選項來解決。請查看教程部分以取得範例。
    
-   When using Caddy with IPv6, the best choice is to have a GUA (Global Unicast Address) on the WAN interface, since otherwise the TLS-ALPN-01 challenge might fail.  
    當使用 IPv6 的 Caddy 時，最佳選擇是在WAN介面上配置GUA （全域單播位址），否則TLS-ALPN -01 挑戰可能會失敗。
    
-   Let’s Encrypt or ZeroSSL can not be explicitly chosen. Caddy automatically issues one of these options, determined by speed and availability. These certificates can be found in `/var/db/caddy/data/caddy/certificates`.  
    無法明確選擇 Let's Encrypt 或 ZeroSSL。 Caddy 會根據速度和可用性自動頒發其中一個憑證。這些證書可以在`/var/db/caddy/data/caddy/certificates`中找到。
    
-   When an Upstream Destination only supports TLS connections, yet does not offer a valid certificate, enable `TLS Insecure Skip Verify` in a Handler to mitigate connection problems.  
    當上游目標僅支援TLS連接，但沒有提供有效的憑證時，請在處理程序中啟用`TLS Insecure Skip Verify`以緩解連接問題。
    
-   Caddy upgrades all connections automatically from HTTP to HTTPS. When cookies do not have the `secure` flag set by the application serving them, they can still be transmitted unencrypted before the connection is upgraded. If these cookies contain very sensitive information, it might be a good choice to close port 80.  
    Caddy 會自動將所有連線從HTTP升級到HTTPS 。如果 cookie 未被提供它們的應用程式設定`secure`標誌，則在連線升級之前，它們仍然可以以未加密的方式傳輸。如果這些 cookie 包含非常敏感的信息，則關閉連接埠 80 可能是一個不錯的選擇。
    
-   There is optional Layer4 TCP/UDP routing support. In the scope of this plugin, only traffic that looks like TLS and has SNI can be routed. The HTTP App and Layer4 App can work together at the same time.  
    有可選的 Layer4 TCP/UDP 路由支援。在此插件的範圍內，只有看起來像TLS並且具有SNI的流量可以被路由。 HTTP App 和 Layer4 App 可以同時協同工作。
    
-   There is no WAF (Web Application Firewall) support in this plugin. For a business grade Reverse Proxy with WAF functionality, use `os-OPNWAF`.  
    此插件不支援WAF （Web應用程式防火牆）。如需具有WAF功能的企業級反向代理，請使用`os-OPNWAF` 。
    

## [Help, Nothing Works!](#id36)｜[救命，什麼都不管用！](#id36)

Note

筆記

Even though Caddy itself is quite easy to configure in the plugin, setting the infrastructure up correctly poses the real challenge. If you feel stumped, the best approach is knowledge about what should happen. This section tries to explain that and gives examples how to resolve issues.

儘管 Caddy 本身在插件中配置起來相當容易，但正確搭建基礎架構才是真正的挑戰。如果您感到困惑，最好的方法是了解應該發生什麼。本節將嘗試解釋這一點，並提供解決問題的範例。

Tip

提示

Most errors happen because the infrastructure is not set up correctly, or wrong options for the Handler have been set.

大多數錯誤是由於基礎設施設定不正確，或處理程序的選項設定錯誤造成的。

Attention

注意

Do not use the Layer4 module without knowing the implications of it. It is for very advanced usecases. Better deactivate it if things do not work as expected.

請勿在不了解其影響的情況下使用 Layer4 模組。它適用於非常高級的使用場景。如果出現異常情況，最好將其停用。

**This is what should happen if Caddy works correctly:**

**如果 Caddy 工作正常，應該發生以下情況：**

1.  A Web Browser is opened and an URL is put into the address bar: https://example.com  
    開啟網頁瀏覽器，並在網址列輸入URL ： https://example.com
    
2.  The underlying Operating System of the Web Browser sends a request to its default DNS Server, and asks where to find example.com. The DNS Server will try to find the requested A- and/or AAAA-Record for that domain, and will answer with e.g. 203.0.113.1.  
    Web 瀏覽器的底層作業系統會向其預設DNS 伺服器發送請求，並詢問在哪裡可以找到 example.com。 DNS 伺服器將嘗試尋找該網域所要求的 A- 和/或 AAAA-記錄，並會回答，例如： 203.0.113.1。
    
3.  The Web Browser now sends a HTTPS request to 203.0.113.1. This request contains a Client Hello in the TLS handshake, that contains example.com.  
    Web 瀏覽器現在向203.0.113.1發送HTTPS請求。此請求在TLS握手中包含客戶端 Hello，其中包含 example.com。
    
4.  This HTTPS request hits port 443 of the OPNsense’s WAN, LAN (or VPN) interface, determined by the network location of the Web Browser.  
    此HTTPS請求會命中 OPNsense 的WAN, LAN （或VPN ）接口的 443 端口，該端口由 Web 瀏覽器的網絡位置決定。
    
5.  There is a Firewall rule that allows destination port 443 to access This Firewall. The request will then be received by Caddy, because it listens on This Firewall on port 443.  
    防火牆規則允許目標連接埠 443 存取此防火牆。 Caddy 監聽此防火牆的 443 端口，因此會接收到該請求。
    
6.  In Caddy, there is a domain for example.com set up. It has a valid Let’s Encrypt or ZeroSSL certificate. Since the Client Hello contains example.com, Caddy will match it with the domain, and the Web Browser shows a certificate next to https://example.com in the address bar.  
    在 Caddy 中，已設定了 example.com 網域。該網域擁有有效的 Let's Encrypt 或 ZeroSSL 憑證。由於用戶端 Hello 訊息中包含 example.com，Caddy 會將其與該網域名稱匹配，因此 Web 瀏覽器會在網址列的https://example.com旁顯示憑證。
    
7.  Caddy takes the HTTPS request and terminates the TLS connection. That means, it will convert the HTTPS into HTTP, so it can be processed by the Handler.  
    Caddy 接收HTTPS請求並終止TLS連線。這意味著，它將HTTPS轉換為HTTP ，以便 Handler 可以對其進行處理。
    
8.  Caddy checks if there is a matching Handler set up. It will be used to reverse proxy the HTTP request to an internal service.  
    Caddy 會檢查是否已設定符合的處理程序。它將用於將HTTP請求反向代理到內部服務。
    
9.  Inside the Handler, the domain example.com and an Upstream Domain e.g. 192.168.10.1 and Upstream Port e.g. 8080 point the request to the internal service. Caddy then sends the HTTP request directly to the internal service.  
    在處理程序內部，網域 example.com 和上游網域（例如192.168.10.1 ）以及上游連接埠（例如 8080）將要求指向內部服務。然後，Caddy 將HTTP請求直接傳送到內部服務。
    
10.  The HTTP response from the internal service is received by Caddy, wrapped back into TLS, and sent back to the Web Browser as HTTPS response.  
     Caddy 收到來自內部服務的HTTP回應，將其包裝回TLS中，並作為HTTPS響應發送回 Web 瀏覽器。
    
11.  The website of the internal service shows up in the Web Browser, secured by HTTPS.  
     內部服務的網站顯示在 Web 瀏覽器中，由HTTPS保護。
    

Attention

注意

If that does not work, it means that one or multiple steps in that chain of events fail. Please check the following steps for initial troubleshooting.

如果上述方法無效，則表示該事件鏈中的一個或多個步驟失敗。請依照以下步驟進行初步故障排除。

**1\. Check the Infrastructure:**

**1. 檢查基礎設施：**

-   Do A- and/or AAAA-Record for all Domains and Subdomains exist?  
    所有網域和子網域是否存在 A 記錄和/或AAAA記錄？
    
-   In case of activated [Dynamic DNS](#dynamicdns-opnsense-caddy), check that the correct A- and/or AAAA-Records have been set automatically with Cloudflare.  
    如果啟動了 [Dynamic DNS](#dynamicdns-opnsense-caddy) ，請檢查是否已使用 Cloudflare 自動設定了正確的 A 記錄和/或AAAA記錄。
    
-   Do they point to one of the external IPv4 or IPv6 addresses of the OPNsense Firewall? Check that with commands like `nslookup example.com`  
    它們是否指向 OPNsense 防火牆的某個外部 IPv4 或 IPv6 位址？請使用類似`nslookup example.com`的指令進行檢查。
    
-   Do the OPNsense Firewall Rules allow connections from any source to destination ports 80 and 443 to the destination This Firewall?  
    OPNsense 防火牆規則是否允許從任何來源連接埠到目標連接埠 80 和 443 的連線到達此防火牆？
    
-   Is the Caddy service running?  
    Caddy 服務是否正在運行？
    

**2\. Check if the Domain is set up correctly:**

**2. 檢查網域是否設定正確：**

-   Open the Domain in a Web Browser. Inspect the certificate by clicking on the 🔒 in the address bar. It should be a Let’s Encrypt, ZeroSSL or custom certificate (if chosen).  
    在網頁瀏覽器中開啟網域名稱。點擊網址列中的🔒圖示查看證書。憑證應該是Let's Encrypt、ZeroSSL或自訂憑證（如果已選擇）。
    
-   Activate the HTTP Access Log in a Domain, and check the Log File. Are there any log entries that show connections?  
    啟用網域中的HTTP訪問日誌，並檢查日誌檔案。是否有任何顯示連線的日誌條目？
    
-   If nothing shows up, go back to Step 1 and check the infrastructure.  
    如果沒有任何結果，請返回步驟 1 並檢查基礎架構。
    

**3\. Check the functionality of the internal webserver:**

**3. 檢查內部網路伺服器的功能：**

-   Does the service accept HTTP or HTTPS connections? It is recommended to connect via HTTP, since it removes complexity.  
    該服務是否接受HTTP或HTTPS連接？建議透過HTTP連接，因為這樣可以簡化連接。
    
-   Open the internal service via IP address and port in a Web Browser, e.g. `http://192.168.10.1:8080`. Validate that it shows the website on either HTTP or HTTPS ports.  
    透過 Web 瀏覽器開啟內部服務，位址和連接埠為IP ，例如`http://192.168.10.1:8080` 。驗證它是否在HTTP或HTTPS端口上顯示網站。
    
-   Does the internal service actually use the HTTP or HTTPS protocol? Other protocols will not work, e.g. SSH.  
    內部服務是否實際使用HTTP或HTTPS協定？其他協議將無法運作，例如SSH 。
    
-   If the Web Browser can not connect, it is a good idea to troubleshoot the internal webserver before continuing.  
    如果網頁瀏覽器無法連接，最好在繼續操作之前先對內部網路伺服器進行故障排除。
    

**4\. Check the setup of the Handler:**

**4\.檢查處理程序的設定：**

-   Is the correct Domain chosen?  
    是否選擇了正確的網域名稱？
    
-   Are Upstream Domain and Upstream Port correct? Do they point to the internal service, e.g `192.168.10.1:8080`?  
    上游域名和上游埠是否正確？它們是否指向內部服務，例如`192.168.10.1:8080` ？
    
-   If the internal service only accepts HTTPS connections, is https:// chosen and TLS insecure skip verify checked?  
    如果內部服務僅接受HTTPS連接，是否選擇 https:// 並選取TLS不安全跳過驗證？
    

Attention

注意

If the configuration is still not working, it is time to continue with logs and Caddyfile syntax checks.

如果配置仍然無效，則需要繼續進行日誌記錄和 Caddyfile 語法檢查。

## [Get Help from the Caddy Community](#id37)｜[從球童社群取得協助](#id37)

Sometimes, things do not work as expected. Caddy provides a few powerful debugging tools to analyze issues.

有時候，事情不會如預期運作。 Caddy 提供了一些強大的調試工具來分析問題。

This section explains how to obtain the required files to get help from the [Caddy Community](https://caddy.community/).

本節說明如何取得從 [Caddy 社群](https://caddy.community/)獲得協助所需的文件。

1.  Change the global Log Level to DEBUG. This will log everything the `reverse_proxy` directive handles.  
    將全域日誌等級變更為DEBUG 。這將記錄`reverse_proxy`指令處理的所有內容。
    

Go to Services ‣ Caddy Web Server ‣ General Settings ‣ Log Settings

前往“服務”‣“Caddy Web 伺服器”‣“常規設定”‣“日誌設定”

-   Set the Log Level to DEBUG  
    將日誌等級設定為DEBUG
    
-   Press **Apply**  
    按**申請**
    

Go to Services ‣ Caddy Web Server ‣ Log File

前往“服務”‣“Caddy Web 伺服器”‣“日誌檔案”

-   Change the dropdown from INFORMATIONAL to DEBUG  
    將下拉式選單從“訊息”更改為DEBUG
    

Now the `reverse_proxy` debug logs will be visible and can be downloaded.

現在可以看到並且可以下載`reverse_proxy`調試日誌。

2.  Validate and download the Caddyfile.  
    驗證並下載 Caddyfile 檔案。
    

Go to Services ‣ Caddy Web Server ‣ Diagnostics ‣ Caddyfile

前往「服務」‣「Caddy Web 伺服器」‣「診斷」‣「Caddyfile」。

-   Press the Validate Caddyfile button to make sure the current Caddyfile is valid. Refresh the page afterwards to ensure the Caddyfile is correctly formatted.  
    點選「驗證 Caddyfile」按鈕，確保目前 Caddyfile 檔案有效。之後刷新頁面，確保 Caddyfile 檔案格式正確。
    
-   Press the Download button to get this current Caddyfile.  
    按下下載按鈕即可取得最新的 Caddyfile 檔案。
    
-   If there are custom imports in `/usr/local/etc/caddy/caddy.d/`, download the JSON configuration.  
    如果`/usr/local/etc/caddy/caddy.d/`中有自訂導入，請下載JSON配置。
    

Attention

注意

Rarely, a performance profile might be requested. For this, a special admin endpoint can be activated. This admin endpoint is deactivated by default. To enable it and access it on the OPNsense, follow these additional steps. Do not forget to deactivate it after use. Anybody with network access to the admin endpoint can use REST API to change the running configuration of Caddy, without authentication.

在極少數情況下，可能需要效能設定檔。為此，可以啟動一個特殊的管理端點。此管理端點預設為停用狀態。要啟用它並在 OPNsense 上存取它，請按照以下步驟操作。使用後請務必將其停用。任何擁有網路存取權限的使用者都可以使用REST API更改 Caddy 的運行配置，無需身份驗證。

-   SSH into the OPNsense shell  
    SSH進入 OPNsense 外殼
    
-   Stop Caddy with `configctl caddy stop`
    
-   Go to `/usr/local/etc/caddy/caddy.d/`  
    前往`/usr/local/etc/caddy/caddy.d/`
    
-   Create a new file called `admin.global` and put the following content into it: `admin :2019`  
    建立一個名為`admin.global`的新文件，並將以下內容放入其中： `admin :2019`
    
-   After saving the file, go to `/usr/local/etc/caddy` and run `caddy validate` to ensure the configuration is valid.  
    儲存檔案後，請前往`/usr/local/etc/caddy`並運行`caddy validate`以確保配置有效。
    
-   Start Caddy with `configctl caddy start`  
    使用`configctl caddy start`啟動 Caddy
    
-   Use sockstat to see if the admin endpoint has been created. `sockstat -l | grep -i caddy` - it should show the endpoint `*:2019`.  
    使用sockstat查看管理端點是否已建立。 `sockstat -l | grep -i caddy` - 它應該顯示端點`*:2019`。
    
-   Create a firewall rule on `LAN` that allows `TCP` to destination `This Firewall` and destination port `2019`.  
    在`LAN`上建立一條防火牆規則，允許`TCP`到目標`This Firewall`和目標連接埠`2019` 。
    
-   Open the admin endpoint: `http://YOUR_LAN_IP:2019/debug/pprof/`  
    開啟管理端點： `http://YOUR_LAN_IP:2019/debug/pprof/`
    
-   Follow the instructions on [Profiling Caddy](https://caddyserver.com/docs/profiling).  
    請依照 [Profileing Caddy](https://caddyserver.com/docs/profiling)上的說明進行操作。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx TCP And UDP Streams｜nginx TCP和UDP流](<176 nginx TCP和UDP流.md>)　｜　[下一篇：CPU Microcode updates AMDIntel｜CPU微程式碼更新 AMDIntel ➡](<178 CPU微程式碼更新 [AMDIntel].md>)
