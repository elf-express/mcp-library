---
title: "Caddy 反向代理"
title_original: "Caddy Reverse Proxy"
source: https://docs.opnsense.org/manual/how-tos/caddy.html
chapter: ["Community Plugins","Web"]
order: 177
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:11.289Z"
---


# Caddy 反向代理


## [Caddy：反向代理](#id1)

指數

-   [Caddy：反向代理](#caddy-reverse-proxy)
    
    -   [產品特性](#features)
        
    -   [安裝](#installation)
        
    -   [安裝後準備 OPNsense for Caddy](#prepare-opnsense-for-caddy-after-installation)
        
    -   [標準配置](#standard-configuration)
        
        -   [建立簡單的反向代理](#creating-a-simple-reverse-proxy)
            
        -   [限制對內部 IP 的存取](#restrict-access-to-internal-ips)
            
        -   [使用基本驗證限制存取](#restrict-access-with-basic-auth)
            
        -   [動態DNS](#dynamic-dns)
            
        -   [帶子網域的通配符網域](#wildcard-domain-with-subdomains)
            
        -   [反向代理 OPNsense WebGUI](#reverse-proxy-the-opnsense-webgui)
            
        -   [重定向ACME HTTP -01 挑戰](#redirect-acme-http-01-challenge)
            
        -   [依網域篩選](#filter-by-domain)
            
    -   [進階配置](#advanced-configuration)
        
        -   [同領域的多個處理程序](#multiple-handlers-for-the-same-domain)
            
        -   [使用虛擬主機反向代理 Web 伺服器](#reverse-proxy-a-webserver-with-vhosts)
            
        -   [CrowdSec 整合](#crowdsec-integration)
            
        -   [高可用性配置](#high-availability-setups)
            
        -   [前向授權](#forward-auth)
            
        -   [以非特權模式運行 Caddy 進程](#run-caddy-process-unprivileged)
            
        -   [將 Caddy 綁定到介面](#bind-caddy-to-interfaces)
            
        -   [自訂設定檔](#custom-configuration-files)
            
-   [Caddy：Layer4 代理](#caddy-layer4-proxy)
    
    -   [啟用四層代理程式](#enable-layer4-proxy)
        
    -   [路由類型](#routing-type)
        
    -   [第 4 層匹配器](#layer-4-matchers)
        
    -   [第 7 層匹配器](#layer-7-matchers)
        
    -   [設定範例](#configuration-examples)
        
        -   [SSH多工在HTTPS埠上](#ssh-multiplexing-on-https-port)
            
        -   [TLS ( SNI ) 在HTTPS端口上進行多路復用](#tls-sni-multiplexing-on-https-port)
            
        -   [埠TLS ( SNI ) 反向重複使用在HTTPS埠上](#inverted-tls-sni-multiplexing-on-https-port)
            
        -   [第四層代理TCP/UDP](#proxy-tcp-udp-on-layer-4)
            
        -   [DNS和 Wireguard 多工](#dns-and-wireguard-multiplexing)
            
-   [Caddy：故障排除](#caddy-troubleshooting)
    
    -   [FAQ](#faq)
        
    -   [救命，什麼都不管用！](#help-nothing-works)
        
    -   [從 Caddy 社區獲取幫助](#get-help-from-the-caddy-community)
        

## [產品特點](#id2)

快速且可擴充的多平台HTTP /1-2-3 Web伺服器，具有自動HTTPS功能

預設情況下，Caddy 會自動為您的所有網站取得和續訂TLS憑證（Let's Encrypt 和 ZeroSSL）。

-   反向代理HTTP, HTTPS和 WebSocket
    
-   使用包含的 Layer4 模組路由UDP/TCP流量：[https://github.com/mholt/caddy-l4](https://github.com/mholt/caddy-l4)
    
-   動態DNS模組包含：[https://github.com/mholt/caddy-dynamicdns](https://github.com/mholt/caddy-dynamicdns)
    
-   Cloudflare DNS提供者包含：[https://github.com/caddy-dns/cloudflare](https://github.com/caddy-dns/cloudflare)
    

WWW: [https://caddyserver.com/](https://caddyserver.com/)

## [安裝](#id3)

-   從 OPNsense 插件安裝“os-caddy”。
    

## [安裝後準備 OPNsense for Caddy](#id4)

注意

Caddy 使用 80 和 443 連接埠。因此，OPNsense WebGUI 或其他外掛程式無法綁定到這些連接埠。

轉到“系統”‣“設定”‣“管理”。

-   將TCP連接埠變更為8443（範例），不要忘記調整防火牆規則以允許存取WebGUI。在LAN上有一個隱藏的反鎖定規則可以自動處理這個問題。在其他介面上，請確保新增顯式規則。
    
-   啟用HTTP重定向 - 停用 web GUI重定向規則」複選框。
    

前往防火牆 ‣ 規則 ‣ WAN

-   建立防火牆規則，允許`HTTP`和`HTTPS`存取目標`This Firewall`目標`WAN`
    

| 選項 | 值 |
| --- | --- |
| **介面** | `WAN` |
| **TCP/IP版本** | `IPv4+IPv6` |
| **協議** | `TCP` |
| **來源** | `Any` |
| **目的地** | `This Firewall` |
| **目標埠範圍** | 從： `HTTP`到： `HTTP` |
| **描述** | `Caddy Reverse Proxy HTTP` |

| 選項 | 值 |
| --- | --- |
| **介面** | `WAN` |
| **TCP/IP版本** | `IPv4+IPv6` |
| **協議** | `TCP/UDP` |
| **來源** | `Any` |
| **目的地** | `This Firewall` |
| **目標埠範圍** | 從： `HTTPS`到： `HTTPS` |
| **描述** | `Caddy Reverse Proxy HTTPS` |

前往「防火牆」‣「規則」‣ LAN ，為LAN介面建立相同的規則。現在，外部和內部用戶端都可以連接到 Caddy，並且會自動頒發 Let's Encrypt 或 ZeroSSL 憑證。如果使用VPN將遠端用戶端連接到 OPNsense，則可能需要新增額外的防火牆規則。

注意事項

如果您在「服務」‣「Caddy Web 伺服器」‣「常規設定」‣「進階設定」中移除`HTTP/3`來停用`QUIC` ，則`Caddy Reverse Proxy HTTPS`規則只需要`TCP`作為協定。

## [標準配置](#id5)

注意事項

教學部分暗示已按照 [安裝後為 Caddy 準備 OPNsense](#prepare-opnsense-caddy)進行操作。

### [創建簡單的反向代理](#id6)

注意

網域必須能夠從外部解析。在公共DNS伺服器上建立 A 記錄，將您的網域名稱指向 OPNsense 的外部IP位址。

前往“服務”‣“Caddy Web 伺服器”‣“常規設定”

-   選中**啟用**以啟用 Caddy
    
-   請在 Acme Email 欄位中輸入有效的電子郵件地址。這是接收 Let's Encrypt 和 ZeroSSL 自動憑證的必要條件。
    
-   自動HTTPS應設定為`On (default)`
    
-   按**申請**
    

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“網域”

-   按**+**新增網域作為前端。
    

| 選項 | 值 |
| --- | --- |
| *前端* | |
| **協議：** | `https://` |
| **網域：** | `foo.example.com` |
| **連接埠：** | 留空 |
| **證書：** | `Auto HTTPS` |

-   按下**儲存**
    
-   轉到“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“處理程序”
    
-   按 **+** 新增一個處理程序，將前端的流量路由到目標上游服務。
    

| 選項 | 值 |
| --- | --- |
| *前端* | |
| **網域：** | `https://foo.example.com` |
| *上游* | |
| **協定：** | `http://`或`https://` - 取決於您的上游網路伺服器 |
| **上游域：** | `192.168.10.1` |
| **上游連接埠：** | `80` - 或設定您的上游 Web 伺服器所需的連接埠 |
| **TLS不安全跳過驗證** | `X` - 如果選擇了 https:// |

-   按**儲存**並**應用**
    

自動證書將安裝完成。請檢查日誌文件，查看是否有錯誤。現在，前端網域`foo.example.com:80/443`接收所有請求，並將其反向代理到上游目標`192.168.10.1:80` （或自訂連接埠）。

提示

已核發的憑證可以在「系統」‣「信任」‣「憑證」和相關的儀表板小工具中進行驗證。

注意事項

TLS不安全的跳過驗證可以在私人網路中使用。如果上游目標位於不安全的網路中，請考慮使用適當的[憑證處理](#webgui-opnsense-caddy) 。

### [限制對內部 IP 的存取](#id7)

由於反向代理會接受所有連接，因此使用防火牆規則限制存取會影響所有網域。存取控制清單可以按網域限制存取。在本例中，它們用於將訪問限制為僅對內部 IPv4 網路的訪問，拒絕來自互聯網的連接。

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣ HTTP訪問”‣“訪問列表”

-   按**+**建立新的存取列表
    

| 選項 | 值 |
| --- | --- |
| **存取清單名稱：** | `private_ipv4` |
| **客戶IP地址：** | `192.168.0.0/16` `172.16.0.0/12` `10.0.0.0/8` |
| **描述：** | `Allow access from private IPv4 ranges` |

-   按下**儲存**
    

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“網域”

-   編輯現有網域或子網域，並展開「存取權限」標籤。
    

| 選項 | 值 |
| --- | --- |
| **存取清單：** | `private_ipv4` |

-   按**儲存**並**應用**
    

現在，所有沒有私有 IPv4 位址的連線都將被封鎖。某些應用程式可能希望收到HTTP錯誤代碼，而不是直接阻止連接，例如監控系統。對於這些應用程序，可以在高級模式下設定自訂的`HTTP Response Code`錯誤代碼。

注意事項

存取清單可以設定在網域、子網域和處理程序上。為了簡單起見，建議設定在網域或子網域上。

### [使用基本驗證限制存取](#id8)

由於反向代理會接受所有連接，因此使用防火牆規則限制存取會影響所有網域。基本驗證會將存取權限限制為一個或多個使用者。

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣ HTTP訪問”‣“基本驗證”

-   按**+**建立新用戶
    

| 選項 | 值 |
| --- | --- |
| **使用者：** | `John` |
| **密碼：** | `RandomPassword` |

-   按**儲存**，如果需要，建立其他用戶，例如`Sarah` 。
    

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“網域”

-   編輯現有網域或子網域，並展開「存取權限」標籤。
    

| 選項 | 值 |
| --- | --- |
| **基本驗證：** | `John`, `Sarah` |

-   按**儲存**並**應用**
    

現在，所有匿名連線都必須先通過基本驗證才能存取反向代理服務。

注意事項

基本驗證可以設定在網域、子網域和處理器上。為了簡單起見，建議設定在網域或子網域上。

提示

對於更高的安全性需求，請在網域上設定用戶端身份驗證（mTLS）。

### [動態DNS](#id9)

前往“服務”‣“Caddy Web 伺服器”‣“常規設定”‣ DNS提供者”

-   從清單中選擇 Cloudflare
    
-   輸入API鍵
    
-   選擇 DynDns IP版本是否應包含 IPv4 和/或 IPv6。
    
-   按下**儲存**
    

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“網域”

-   編輯域或子域，並啟用動態DNS複選框。
    
-   按**儲存**並**應用**
    

檢查日誌檔案以取得 DynDNS 更新資訊。將其設定為「資訊」模式，然後搜尋所選網域。

注意事項

啟用動態DNS複選框可能會產生不同的結果：

-   基本域： `example.com @`
    
-   通配符網域： `example.com *`
    
-   子網域： `example.com opn`
    

如果在日誌中看到類似這樣的錯誤，請使用子網域：

設定DNS記錄與新的IP地址失敗”，“區域”：“opn.example.com”，“錯誤”：“預期 1 個區域，但實際得到 0 個區域”

這意味著區域`opn.example.com @`不存在，提供者期望使用`example.com opn`進行更新。您可以在「服務」‣「Caddy Web 伺服器」‣「診斷」‣「Caddyfile」中查看目前設定。

### [帶子網域的通配符網域](#id10)

提示

對於 Cloudflare，這是建議的設定。

注意事項

如果您使用 [Dynamic DNS](#dynamicdns-opnsense-caddy) ，則需要子網域，因為API更新託管區域中的DNS記錄的方式。

前往“服務”‣“Caddy Web 伺服器”‣“常規設定”‣ DNS提供者”

-   從清單中選擇 Cloudflare
    
-   輸入API鍵
    
-   將解析器設定為`1.1.1.1`
    

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“網域”

-   建立域`*.example.com`並啟動DNS -01 質詢複選框。或者，使用在「系統」‣「信任」‣「憑證」中匯入或產生的憑證。該憑證必須是通配符憑證。您可以使用 os-acme-client 外掛程式產生通配符憑證。
    
-   建立與`*.example.com`域相關的所有子域，例如`foo.example.com`和`bar.example.com` 。
    
-   如有需要，請檢查 Dynamic DNS中的新子網域。
    

轉到“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“處理程序”

-   建立以`*.example.com`為域、 `foo.example.com`為子域的處理程序。其配置方式與基本域基本相同。子網域下拉式選單僅在配置了通配符域時才會顯示。
    

注意事項

通配符網域的憑證只會包含`*.example.com` ，而不會包含`example.com`對應的SAN 。如果某個服務需要與`example.com`完全匹配，則需要為`example.com`創建一個額外的域名，並為其上游目標添加一個額外的處理程序。子網域不支援設定端口，它們始終會追蹤其所屬父級通配符網域的連接埠。

提示

對於 Cloudflare，將 Trusted Proxies 設定為 Cloudflare IP範圍，將 Client IP Headers 設定為`Cf-Connecting-Ip` 。

### [反向代理 OPNsense WebGUI](#id11)

提示

對於任何使用TLS和自簽名憑證的上游目標，都可以採用相同的方法。

注意

只有在未選擇特定介面時，OPNsense WebGUI 才會綁定到127.0.0.1 ：系統 ‣ 設定 ‣ 管理 - 監聽介面 - 全部（建議）。否則，請使用特定介面的IP位址作為「上游域」。

-   在瀏覽器（例如​​ Chrome 或 Firefox）中開啟 OPNsense WebGUI。點選網址列中的 🔒 查看證書。複製SAN以備後用。它可以是主機名，例如`OPNsense.localdomain`
    
-   將證書另存為`.pem`文件。使用文字編輯器開啟該文件，並將內容複製到「系統」‣「信任」‣「憑證授權單位」中的新條目。將證書命名為`opnsense-selfsigned`
    
-   新增域名，例如`opn.example.com`
    
-   新增一個新的處理程序，並具有以下選項：
    

| 選項 | 值 |
| --- | --- |
| *前端* | |
| **網域：** | `opn.example.com` |
| *上游* | |
| **協議** | `https://` |
| **上游域：** | `127.0.0.1` |
| **上游連接埠：** | `8443` - WebGUI 連接埠 |
| **TLS信託池：** | `opnsense-selfsigned` |
| **TLS伺服器名稱：** | `OPNsense.localdomain` |

-   按**儲存**並**應用**
    

轉到“系統”‣“設定”‣“管理”。

-   請在備用主機名稱中輸入`opn.example.com`以避免以下錯誤： HTTP \_REFERER “ https://opn.example.com/”與預定義設定不匹配
    
-   按下**儲存**
    

打開`https://opn.example.com` ，它應該會提供反向代理的 OPNsense WebGUI。如果不起作用，請檢查日誌檔案中的錯誤，大多數情況下， TLS伺服器名稱與TLS信任池中的SAN不符。 Caddy 不支援僅包含CN通用名稱的憑證。

注意

建立 [存取清單](#accesslist-opnsense-caddy)以限制對 WebGUI 的存取。

### [重定向ACME HTTP -01 挑戰](#id12)

有時，Caddy 背後的應用程式會使用自己的ACME客戶端來取得證書，最常用的方法是使用HTTP -01 質詢。此插件內建了一種機制，可以輕鬆地將此類質詢重定向到其背後的目標伺服器。

確保所選網域可從外部解析。在公共伺服器上建立一條 A 記錄DNS ，指向 OPNsense 的外部位址IP ）。如果 IPv6 可用，則必須同時建立 A 記錄AAAA ），否則TLS-ALPN -01 質疑可能會失敗。

配置的域必須在GUI中使用`empty port`或`443` ，否則它無法使用TLS-ALPN -01 質詢。上游目標必須監聽埠`80`並為 Caddy 中配置的相同網域提供`/.well-known/acme-challenge/`服務。

前往“服務”‣“Caddy Web 伺服器”‣“反向代理”‣“網域”

-   按**✎**開啟現有域名或子域名，並啟用進階模式
    

| 選項 | 值 |
| --- | --- |
| **網域：** | `foo.example.com` |
| **HTTP -01 挑戰重定向：** | `192.168.10.1` |

-   按**儲存**並**應用**
    

HTTP-01 質詢重定向處於活動狀態，位於 `192.168.10.1` 的上游目標將能夠為域 `foo.example.com` 頒發憑證。

透過此配置，Caddy 將選擇 TLS-ALPN-01 質詢來取得自己的 `foo.example.com` 證書，並將 HTTP-01 質詢反向代理到 `192.168.10.1`，其中上游目標可以在連接埠 80 上偵聽 `foo.example.com`。在處理程序中啟用 TLS 後，可以自動建立加密連線。也負責自動 HTTP 到 HTTPS 重定向。

### [按網域過濾](#id13)

大型配置可能難以導航。為了提供協助，「網域」、「子網域」和「處理程序」標籤的右上角新增了一個篩選器功能，稱為「按域過濾」。

在「按網域篩選」中，可以選擇一個或多個網域和子網域。作為過濾結果，網域、子網域和處理程序中只會顯示其對應的配置。

建立新的子網域或處理程序時，篩選器中的選擇將自動新增到開啟的表單中。

新增處理程序和搜尋處理程序按鈕也使用此篩選器來確定正確的選擇範圍。

## [高級配置](#id14)

### [同一域的多個處理程序](#id15)

處理程序不限於每個域或子域一個。如果有多個不同的路徑需要處理（例如`/foo/*`和`/bar/*`），請為每個路徑建立處理程序。

當建立具有空路徑的處理程序時，範本邏輯會自動將其放置在 Caddyfile 網站區塊的最後。這意味著，特定路徑將始終在空路徑之前匹配，無論它們在配置中的位置如何。這可用於使用存取清單阻止特定路徑，將某些路徑路由到不同的上游，然後為所有不匹配的路徑設定空句柄。

可以選擇不同的處理邏輯。例如，使用handle\_path從所有請求中刪除路徑，或使用handle保留所有請求中的路徑。

當混合使用通配符域和子域時，專門在通配符域上設定的處理程序將在所有子域之後匹配。這樣，所有不匹配的子域都可以發送到自訂上游。

可以同時建立具有相同主機名稱和不同連接埠的多個網域。例如，`opn.example.com:443` 和 `opn.example.com:8443`。現在，前端可以偵聽同一網域的多個連接埠。如果ACME管理，這些網域將自動共用相同的憑證。每個套接字都需要自己的處理程序來代理流量。

範例 Caddyfile 可能如下所示：

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

提示

存取清單和基本身份驗證可以直接在處理程序上匹配，以實現更複雜的存取控制場景。

### [使用虛擬主機反向代理網頁伺服器](#id16)

有時需要更改主機標頭才能反向代理到另一個具有虛擬主機的網路伺服器。

由於 Caddy 預設傳遞原始主機標頭（例如 `app.external.example.com`），因此如果上游目標偵聽不同的主機名稱（例如 `app.internal.example.com`），它將無法服務此請求。

前往服務 ‣ Caddy Web 伺服器 ‣ 反向代理 ‣ 網域

-   按 ****** 建立新網域
    

|選項|價值 |
| --- | --- |
| **網域：** | `app.external.example.com` |

-   按**儲存**
    

前往服務 ‣ Caddy Web 伺服器 ‣ 反向代理 ‣ 標頭

-   按 **++** 建立一個新的 HTTP 標題
    

|選項|價值 |
| --- | --- |
| **標題：** | `header_up` |
| **標頭類型：** | `Host` |
| **標頭值：** | `{upstream_hostport}` |

-   按**儲存**
    

前往服務 ‣ Caddy Web 伺服器 ‣ 反向代理 ‣ 處理程序

-   按 ****** 建立新的處理程序並開啟傳輸部分。
    

|選項|價值 |
| --- | --- |
| **網域：** | `app.external.example.com` |
| **上游域：** | `app.internal.example.com` |
| **HTTP 標頭：** | `header_up Host {upstream_hostport}` |

-   按**儲存**並**應用**
    

### [CrowdSec 整合](#id17)

CrowdSec 是WAF 的強大替代品。它使用日誌動態禁止已知不良行為者的IP位址。 Caddy 插件已準備好為此整合發出 json 日誌。

前往服務 ‣ Caddy Web 伺服器 ‣ 常規設定 ‣ 日誌設定

-   啟用日誌HTTP以JSON格式訪問
    
-   按**儲存**
    

前往服務 ‣ Caddy Web 伺服器 ‣ 反向代理 ‣ 網域

-   開啟應由 CrowdSec 監控的每個網域並開啟 Access
    
-   啟用HTTP訪問日誌
    

現在HTTP訪問日誌將以json格式出現在`/var/log/caddy/access`中，每個域一個檔案。

接下來，透過SSH或控制台連接到 OPNsense，使用選項 8 進入 shell。

注意

此步驟需要`os-crowdsec`插件。

-   進入 shell 後，從 CrowdSec Hub 安裝 caddy 集合。 `cscli collections install crowdsecurity/caddy`
    
-   建立名為`/usr/local/etc/crowdsec/acquis.d/caddy.yaml`的設定文件，內容如下：
    

```yaml
filenames:
  - /var/log/caddy/access/*.log

force_inotify: true
poll_without_inotify: true

labels:
  type: caddy
```

-   進入 OPNsense WebGUI 並重新啟動 CrowdSec。
    

### [高可用性配置](#id18)

在具有兩個 OPNsense 防火牆的高可用性設定中，有幾種可能的配置可以成功運行 Caddy。

主要問題在於證書處理。如果在WAN介面上使用CARP VIP ，且所有網域的 A 記錄和AAAA記錄都指向此CARP VIP ，則備份 Caddy 將無法頒發ACME憑證，除非進行一些額外的設定。

支援XMLRPC同步的三種方法有：

注意事項

這些方法可以混合使用，但請確保使用一致的配置。最好選擇一種方法。只有網域名稱需要配置，子網域不需要任何配置HA ）。

1.  為所有網域使用來自 OPNsense Trust 儲存區的自訂憑證。
    
2.  在域設定中使用DNS -01挑戰。
    
3.  在網域的進階設定中使用HTTP -01挑戰重定向選項。
    

由於HTTP -01挑戰重定向需要一些額外的步驟才能生效，因此應如下設定：

-   在主 OPNsense 上配置 Caddy，直到完成所有初始配置。
    
-   在主 OPNsense 上，選擇每個域，並將IP位址（位於HTTP -01 質詢重定向）設定為與系統 ‣ 高可用性 ‣ 設定 中IP同步配置相同的值。
    
-   在主 OPNsense 上建立一個新的防火牆規則，允許連接埠`80`和`443`到`This Firewall` ，該連接埠位於具有先前選定的IP位址的介面上（很可能是LAN或VLAN
    
-   將此配置與XMLRPC同步。
    

現在兩個 Caddy 實例可以同時頒發ACME憑證。主 OPNsense 上的 Caddy 使用TLS-ALPN -01 質詢進行自身驗證，並將HTTP -01 質詢反向代理到備份 OPNsense 上的 Caddy。請確保主 OPNsense 和備份 OPNsense 都監聽其WAN和LAN （或VLAN ）介面的`80`和`443` ，因為這兩個連接埠對於這些質詢的正常工作都是這些必要的。

提示

檢查兩個 Caddy 實例上的日誌文件，查看挑戰是否成功。尋找`certificate obtained successfully`資訊性訊息。

### [前向授權](#id19)

將身份驗證委託給 Authelia 或 Authentik 是一個非常高級的用例。 [前向驗證文件](https://caddyserver.com/docs/caddyfile/directives/forward_auth#authelia)可供參考。

若要將轉送身分驗證指令附加到處理程序，必須在「常規設定」中填寫身分驗證提供者。之後，可以在進階模式下選取處理程序中的「轉送身份驗證」複選框。這會將 forward_auth 指令加入到該處理程序作用域內的 reverse_proxy 指令之前。標頭會自動設定。

不建議在此處理程序相符的網域中使用存取清單和基本驗證。

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

用戶端向 app1.example.com 發出的請求將透過 forward_auth 指令傳送到 Authelia。然後，在驗證完成後，reverse_proxy 指令會將流量傳送到上游伺服器。

### [以非特權模式運行 Caddy 進程](#id20)

此插件中，Caddy 以 root 使用者身分運作。當使用常用連接埠時，必須這樣做。由於預設連接埠為 80 和 443，Caddy 將以超級使用者身分啟動。

對於更高的安全需求，可以選擇以 www 使用者和群組的身份執行 Caddy。但這樣做會限制只能使用較高的連接埠（≥ 1024）。

請確保所有網域都使用空端口，或使用超出常用端口範圍的端口，然後再繼續。系統會進行驗證，以防止在 www 使用者處於活動狀態時配置常用連接埠。

前往“服務”‣“Caddy Web 伺服器”‣“常規設定”‣“進階設定”

-   新增自訂上機座HTTP接口，例如`8080`
    
-   添加自訂上部HTTPS端口，例如`8443`
    
-   選擇`www`作為系統用戶
    
-   完全重啟 Caddy。先停用它並點擊“應用程式”，然後再啟用它並點擊“應用程式”。
    

從現在起，Caddy 將以 www 用戶和群組的身份運行。可以透過檢查 Caddy 進程的使用者來驗證這一點。

注意事項

在此配置下，應使用目標連接埠轉送（Destination NAT ）將連接埠 80 和 443 轉送至新的備用連接埠HTTP和HTTPS ）。對於 IPv6，可能需要額外的步驟。

### [將 Caddy 綁定到介面](#id21)

警告

透過IP位址將服務綁定到特定介面可能會導致諸多問題。如果IP位址是動態的，服務可能會崩潰或無法啟動。在啟動過程中，如果介面IP位址分配過晚，服務也可能無法啟動。介面配置的變更也可能導致服務崩潰。 **此方法僅適用於靜態IP位址！ OPNsense 社群不提供對此配置的支援。**

此配置僅在存在兩個或多個WAN接口，且 Caddy 只需在其中一個接口上響應時才有效。它還可以解決連接埠衝突，例如，當一個介面需要使用DNAT或託管使用預設 Web 伺服器連接埠的不同服務時。

-   在 OPNsense 文件系統中建立以下文件，並寫入以下內容：
    

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

現在 Caddy 只能綁定到`203.0.113.1`和`192.168.1.1` 。它仍然可以在GUI中進行配置，沒有任何限制。

閱讀更多關於`default_bind`指令的資訊：[預設綁定](https://caddyserver.com/docs/caddyfile/options#default-bind)

### [自訂設定檔](#id22)

-   Caddyfile 檔案中新增了從路徑`/usr/local/etc/caddy/caddy.d/`匯入的內容。請將符合 Caddyfile 語法的自訂設定檔放置在該路徑下。
    
-   `*.global`檔案將會被匯入到`global block`中。
    
-   `*.conf`檔案將會被匯入到`site block`中。
    
-   `*.layer4global`和`*.layer4listener`檔案將分別匯入各自的`layer4 directive`中。
    
-   別忘了使用`caddy validate --config /usr/local/etc/caddy/Caddyfile`測試自訂配置。
    

透過這些導入，可以釋放 Caddy 的全部潛力。 GUI 選項將繼續關注反向代理。 **對於未使用提供的 GUI** 建立的配置，OPNsense 社群不支援。對於定製配置，Caddy 社群是詢問的正確地點。

## [Caddy：Layer4 代理](#id23)

## [啟用四層代理程式](#id24)

-   前往服務 ‣ Caddy Web 伺服器 ‣ 常規設置
    
-   啟用複選框啟用第 4 層代理
    
-   按 **套用**，然後前往 Services ‣ Caddy Web Server ‣ Layer4 Proxy
    

## [路由類型](#id25)

對於第 4 層路由，此實作有兩種不同的模式：

1.  `listener_wrappers` 將符合 Caddy 偵聽的預設 HTTP 和 HTTPS 連接埠上的流量。透過第 7 層匹配器，可以將選定的協定代理到上游。這可用於在預設連接埠上重複使用協議，同時仍使用反向代理。最受歡迎的用例是在不終止 TLS 的情況下代理 HTTPS。作為預設路由，所有不匹配的流量將被傳送到反向代理。
    
2.  `global` 可以匹配任何空閒本地端口上的任何 TCP/UDP 流量。另外，同一協定連接埠組合下還可以建立一個或多個七層匹配器。可以透過更改序號來手動設定序列。
    

兩種模式的路由可以同時使用。

## [第 4 層匹配器](#id26)

對於`global`路由類型，協定可以設定為TCP或UDP。必須選擇本地端口，該端口必須空閒且未被任何其他服務使用。不支援連接埠範圍。

任何與連接埠和協定匹配的IP流量都可以代理到一個或多個上游。如果應代理原始第 4 層流量，請選擇ANY 作為第 7 層匹配器。

## [第 7 層匹配器](#id27)

第 7 層匹配器檢查 TCP/UDP 封包的第一個位元組並決定它可能是哪個協定。當偵測到TLS或HTTP時，他們可以在TLS握手開始時檢查客戶端Hello的內容，或在HTTP流量的情況下檢查主機標頭。

還有適用於各種協定的附加匹配器，包括：

-   DNS
    
-   HTTP（有和沒有主機頭評估）
    
-   OpenVPN
    
-   Postgres
    
-   代理協定
    
-   QUIC（有和沒有 Client Hello 評估）
    
-   RDP
    
-   SOCKSv4/v5
    
-   SSH
    
-   TLS（有和沒有 Client Hello 評估）
    
-   溫盒
    
-   鋼絲衛士
    
-   XMPP
    

## [設定範例](#id28)

### [SSH 在 HTTPS 埠上重複使用](#id29)

SSH 是一個原始協議匹配器，它將匹配`listener_wrapper` 範圍內類似SSH 或`global` 中的TCP 端口的所有流量。無法評估主機標頭或 SNI，因為 SSH 不發送此訊息。

在此範例中，我們希望在預設 HTTPS 埠上允許 SSH。這會將 SSH 流量路由到選定的上游，並將所有不匹配的流量路由到反向代理。

-   前往服務 ‣ Caddy Web 伺服器 ‣ Layer4 代理
    
-   按 **++** 建立新的第 4 層路由
    

|選項|價值 |
| --- | --- |
| **匹配器：** | `SSH` |
| **上游域：** | `192.168.1.1` |
| **上游埠：** | `22` |

-   按**儲存**並**應用**
    

現在，SSH客戶端可以打開像`ssh app1.example.com -p 443`這樣的連接，而SSH流量將與其他HTTP/HTTPS流量通過相同的連接埠。 Caddy 成為協議復用器。

提示

如果再增加一條路線，例如使用RDP匹配器，那麼SSH和RDP將位於同一端口，但可以代理到不同的上游。

### [TLS (SNI) 在 HTTPS 端口上復用](#id30)

有一個主機名為 app1.example.com 的應用程序，該應用程式不應由反向代理的處理程序處理。該應用程式的TLS流量應直接路由到上游目的地，而無需TLS終止。

-   前往服務 ‣ Caddy Web 伺服器 ‣ Layer4 代理
    
-   按 **++** 建立新的第 4 層路由
    

|選項|價值 |
| --- | --- |
| **網域：** | `app1.example.com` |
| **匹配器：** | `TLS (SNI)` |
| **上游域：** | `192.168.1.1` |
| **上游埠：** | `8443` |

-   按**儲存**並**應用**
    

Caddy 偵聽預設的 HTTP 和 HTTPS 連接埠。它在這些或任何其他偵聽連接埠上接收到的所有流量都會傳遞到偵聽器\_wrapper。在這個包裝器內，可以在第 7 層檢查流量，並且可以做出路由決策。

使用匹配器TLS（SNI），分析TLS流量的Client Hello。當 Client Hello 包含 app1.example.com 時，流量將由新的第 4 層路由來配對。原始TLS流量將串流傳輸到所選的上游套接字。

此第 4 層路由不匹配的任何其他流量將被路由到處理程序，其中配置的域和子域可以接收並反向代理它。

提示

如果應該有 TLS 終止，請在服務 ‣ Caddy Web 伺服器 ‣ 反向代理 ‣ 網域中設定一個網域，並為應在此路由中匹配的相同 SNI 安裝憑證。路由中勾選**終止TLS**，憑證會自動符合。

注意事項

啟用自動HTTPS時，所有客戶端將自動永久重新導向至HTTPS。如果這種情況不應該發生，請將其設定為「停用重定向」。

### [在 HTTPS 埠上反轉 TLS (SNI) 重複使用](#id31)

反轉 TLS (SNI) 匹配器可以路由所有不匹配的流量，例如路由到網域不受管理控制並且可以隨時變更的託管面板。 SNI匹配的域將被路由到反向代理。

注意

如果您建立其他路由，例如，對於SSH，請確保使用序號在此路由之前產生它們。

-   前往服務 ‣ Caddy Web 伺服器 ‣ Layer4 代理
    
-   按 **++** 建立新的第 4 層路由
    
-   啟用進階模式切換
    

|選項|價值 |
| --- | --- |
| **順序：** | `100` |
| **路由類型：** | `listener_wrappers` |
| **協議：** | `TCP` |
| **匹配器：** | `TLS (SNI)` |
| **網域：** | `*.example.com` `*.opnsense.com` |
| **反向匹配器：** | `X` |
| **上游域：** | `192.168.1.1` `192.168.1.2` |
| **上游埠：** | `443` |
| **失敗持續時間：** | `10` |

-   按**儲存**並**應用**
    

使用反向TLS (SNI) 匹配器，分析TLS 流量的客戶端Hello。當 Client Hello 包含 \*.example.com 或 \*.opnsense.com 時，流量將被傳送到預設處理程序，其中配置的網域和子網域可以接收並反向代理它。

所有其他流量將串流傳輸到上游域和上游連接埠的所選套接字。由於我們選擇了多個上游和健康檢查，因此兩台伺服器可以對所有請求進行負載平衡。負載平衡只是一個範例，並不是該匹配器工作所必需的。

提示

如果 \*.example.com 中存在應路由到不同上游的域，只需為它們建立一個額外的 TLS (SNI) 匹配器。將序列設定為較小的數字以符合反轉路線之前的順序。

提示

Caddy 支援HA 代理協定。如果需要將協定頭加入上游，請將代理協定版本設定為`v1`或`v2`。

### [第 4 層代理程式TCP/UDP](#id32)

我們有一個應用程式應該接收指向連接埠 5060 的所有TCP/UDP 流量。

-   前往服務 ‣ Caddy Web 伺服器 ‣ Layer4 代理
    
-   按 **++** 建立新的第 4 層路由
    
-   啟用進階模式切換
    

|選項|價值 |
| --- | --- |
| **路由類型：** | `global` |
| **協議：** | `TCP` |
| **本地埠：** | `5060` |
| **匹配器：** | `ANY` |
| **上游域：** | `192.168.1.1` |
| **上游埠：** | `5060` |

-   按 **儲存**和**+** 建立另一個第 4 層路由
    

|選項|價值 |
| --- | --- |
| **路由類型：** | `global` |
| **協議：** | `UDP` |
| **本地埠：** | `5060` |
| **匹配器：** | `ANY` |
| **上游域：** | `192.168.1.1` |
| **上游埠：** | `5060` |

-   按**儲存**並**應用**
    

### [DNS 和 Wireguard 重複使用](#id33)

我們有一台 DNS 伺服器託管我們的 DNS 區域之一。我們希望允許 Wireguard 位於與 DNS 相同的連接埠上，但僅限於某個遠端 IP 範圍。

注意事項

該順序是可選的，但它可以影響建立的規則的處理順序。

-   前往服務 ‣ Caddy Web 伺服器 ‣ Layer4 代理
    
-   按 **++** 建立新的第 4 層路由
    
-   啟用進階模式切換
    

|選項|價值 |
| --- | --- |
| **順序：** | `100` |
| **路由類型：** | `global` |
| **協議：** | `UDP` |
| **本地埠：** | `53` |
| **匹配器：** | `DNS` |
| **上游域：** | `192.168.1.1` |
| **上游埠：** | `53` |

-   按 **儲存**和**+** 建立另一個第 4 層路由
    

|選項|價值 |
| --- | --- |
| **順序：** | `101` |
| **路由類型：** | `global` |
| **協議：** | `UDP`|
| **本地埠：** | `53` |
| **匹配器：** | `Wireguard` |
| **上游域：** | `172.16.1.1` |
| **上游埠：** | `51820` |
| **遠程IP：** | `203.0.113.0/24` |

-   按**儲存**並**應用**
    

所有這些第 7 層路由將按照所選順序自動分組到連接埠UDP/53 下。

## [球童：故障排除](#id34)

## [FAQ](#id35)

-   Cloudflare 不需要取得自動憑證。
    
-   您可以使用 os-acme-client 外掛程式產生通配符憑證。在ACME客戶端中設定自動重新載入Caddy（不要重新啟動它）。
    
-   不需要覆蓋 Unbound 中的目標 NAT（埠轉送）、NAT 反射、水平分割 DNS 或 DNS。僅建立允許流量流向 Caddy 預設連接埠的防火牆規則。
    
-   即使內部用戶端將使用外部 IP 位址來存取反向代理服務，流量也不會透過網際網路傳遞。它將保留在 OPNsense 內部。僅在存在多個 WAN 的極少數情況下，由於回復設置，流量可以透過網際網路從一個 WAN 介面路由到另一個 WAN 介面。
    
-   不需要允許 Caddy 存取內部服務的防火牆規則。 OPNsense 有一條預設規則，允許所有源自於自身的流量。
    
-   ACME 反向代理上游目標上的客戶端將無法頒發憑證。球童攔截`/.well-known/acme-challenge`。這可以透過使用域高級模式中的HTTP-01 質詢重定向選項來解決。請查看教學部分的範例。
    
-   當使用具有 IPv6 的 Caddy 時，最好的選擇是在 WAN 介面上有一個GUA（全域單播位址），否則TLS-ALPN-01 質詢可能會失敗。
    
-   無法明確選擇 Let’s Encrypt 或 ZeroSSL。 Caddy 根據速度和可用性自動發出這些選項之一。這些證書可以在`/var/db/caddy/data/caddy/certificates`中找到。
    
-   當上游目標僅支援TLS連接，但不提供有效憑證時，請在處理程序中啟用`TLS Insecure Skip Verify`以緩解連線問題。
    
-   Caddy 會自動將所有連線從 HTTP 升級到 HTTPS。當 cookie 沒有由為其提供服務的應用程式設定 `secure` 標誌時，在連接升級之前，它們仍然可以以未加密的方式傳輸。如果這些 cookie 包含非常敏感的信息，關閉連接埠 80 可能是一個不錯的選擇。
    
-   有可選的 Layer4 TCP/UDP 路由支援。在此插件的範圍內，只有看起來像TLS並且具有SNI的流量可以被路由。 HTTP App 和 Layer4 App 可以同時協同工作。
    
-   此插件不支援 WAF（Web 應用程式防火牆）。對於具有 WAF 功能的企業級反向代理，請使用 `os-OPNWAF`。
    

## [救命，沒有任何作用！](#id36)

注意事項

儘管 Caddy 本身很容易在插件中配置，但正確設置基礎設施卻帶來了真正的挑戰。如果您感到困惑，最好的方法是了解應該發生什麼。本節試圖解釋這一點並舉例說明如何解決問題。

提示

大多數錯誤的發生是因為基礎架構設定不正確，或處理程序的選項設定錯誤。

注意

在不了解 Layer4 模組意義的情況下，請勿使用它。它適用於非常高級的用例。如果事情沒有按預期進行，最好將其停用。

**如果 Caddy 正常工作，應該會發生以下情況：**

1.  打開網頁瀏覽器並將URL放入網址列：https://example.com
    
2.  Web 瀏覽器的底層作業系統會向其預設的DNS 伺服器發送請求，並詢問在哪裡可以找到 example.com。 DNS 伺服器將嘗試尋找該網域所要求的 A- 和/或 AAAA-記錄，並會回答，例如： 203.0.113.1。
    
3.  Web 瀏覽器現在向 203.0.113.1 發送HTTPS 請求。此請求在TLS握手中包含客戶端Hello，其中包含example.com。
    
4.  此 HTTPS 請求會到達 OPNsense 的 WAN, LAN（或 VPN）介面的連接埠 443，該連接埠由 Web 瀏覽器的網路位置決定。
    
5.  有一條防火牆規則允許目標連接埠 443 存取此防火牆。然後，Caddy 將收到該請求，因為它會偵聽此防火牆的連接埠 443。
    
6.  在Caddy中，設定了一個網域example.com。它具有有效的 Let’s Encrypt 或 ZeroSSL 憑證。由於 Client Hello 包含 example.com，Caddy 會將其與網域進行匹配，並且 Web 瀏覽器會在地址欄中的https://example.com 旁邊顯示一個憑證。
    
7.  Caddy 接受HTTPS 請求並終止TLS 連線。也就是說，它將把HTTPS轉換為HTTP，這樣它就可以被Handler處理了。
    
8.  Caddy 檢查是否設定了相符的處理程序。它將用於將 HTTP 請求反向代理到內部服務。
    
9.  在處理程序內部，域 example.com 和上游域，例如192.168.10.1 和上游連接埠 例如8080 將請求指向內部服務。然後，Caddy 將 HTTP 請求直接傳送到內部服務。
    
10.  來自內部服務的HTTP響應由Caddy接收，包裝回TLS，並作為HTTPS響應發送回Web瀏覽器。
    
11.  內部服務的網站顯示在 Web 瀏覽器中，由 HTTPS 保護。
    

注意

如果這不起作用，則表示該事件鏈中的一個或多個步驟失敗。請檢查以下步驟以進行初步故障排除。

**1\.檢查基礎設施：**

-   所有域和子域的 A- 和/或 AAAA-記錄是否存在？
    
-   如果啟動 [動態 DNS](#dynamicdns-opnsense-caddy)，請檢查是否已使用 Cloudflare 自動設定正確的 A- 和/或 AAAA-記錄。
    
-   它們是否指向 OPNsense 防火牆的外部 IPv4 或 IPv6 位址之一？使用`nslookup example.com`等指令進行檢查
    
-   OPNsense 防火牆規則是否允許從任何來源到目標連接埠 80 和 443 到目標此防火牆的連線？
    
-   Caddy 服務是否正在運行？
    

**2\.檢查網域設定是否正確：**

-   在 Web 瀏覽器中開啟網域。點選網址列中的 🔒 檢查證書。它應該是 Let’s Encrypt、ZeroSSL 或自訂憑證（如果選擇）。
    
-   啟動域中的HTTP訪問日誌，查看日誌檔案。是否有任何顯示連線的日誌條目？
    
-   如果沒有顯示任何內容，請返回步驟 1 並檢查基礎架構。
    

**3\.檢查內部網路伺服器的功能：**

-   該服務是否接受 HTTP 或 HTTPS 連接？建議透過HTTP連接，因為它消除了複雜性。
    
-   在Web瀏覽器中透過IP位址和連接埠開啟內部服務，例如`http://192.168.10.1:8080`。驗證它是否在 HTTP 或 HTTPS 連接埠上顯示網站。
    
-   內部服務實際上使用HTTP或HTTPS協定嗎？其他協議將不起作用，例如SSH。
    
-   如果 Web 瀏覽器無法連接，最好先對內部 Web 伺服器進行故障排除，然後再繼續。
    

**4\.檢查處理程序的設定：**

-   是否選擇了正確的域？
    
-   上游域名和上游埠是否正確？它們是否指向內部服務，例如`192.168.10.1:8080`？
    
-   若內部服務只接受HTTPS連接，是否選擇https://並檢查TLS不安全跳過驗證？
    

注意

如果配置仍然不起作用，則需要繼續進行日誌和 Caddyfile 語法檢查。

## [從球童社群取得協助](#id37)

有時，事情並不如預期進行。 Caddy 提供了一些強大的調試工具來分析問題。

本節介紹如何取得所需文件以從[Caddy社區](https://caddy.community/)獲得協助。

1.  將全域日誌等級變更為DEBUG。這將記錄 `reverse_proxy` 指令處理的所有內容。
    

前往服務 ‣ Caddy Web 伺服器 ‣ 常規設定 ‣ 日誌設定

-   將日誌等級設定為DEBUG
    
-   按**申請**
    

前往服務 ‣ Caddy Web 伺服器 ‣ 日誌文件

-   將下拉式選單從資訊更改為DEBUG
    

現在`reverse_proxy`調試日誌將可見並且可以下載。

2.  驗證並下載 Caddyfile。
    

前往服務 ‣ Caddy Web 伺服器 ‣ 診斷 ‣ Caddyfile

-   按下驗證 Caddyfile 按鈕以確保當前 Caddyfile 有效。之後刷新頁面以確保 Caddyfile 的格式正確。
    
-   按下“下載”按鈕以取得目前的 Caddyfile。
    
-   如果`/usr/local/etc/caddy/caddy.d/`中有自訂匯入，請下載JSON設定。
    

注意

在極少數情況下，可能會要求提供效能概況。為此，可以啟動特殊的管理端點。預設情況下，此管理端點處於停用狀態。若要在 OPNsense 上啟用並存取它，請執行以下附加步驟。使用後不要忘記將其停用。任何具有管理端點網路存取權限的人都可以使用 REST API 更改 Caddy 的運行配置，無需身份驗證。

-   SSH 進入 OPNsense shell
    
-   用`configctl caddy stop`阻止球童
    
-   前往`/usr/local/etc/caddy/caddy.d/`
    
-   建立一個名為`admin.global`的新文件，並將以下內容放入其中：`admin :2019`
    
-   儲存檔案後，進入`/usr/local/etc/caddy`並運行`caddy validate`以確保配置有效。
    
-   使用`configctl caddy start`啟動球童
    
-   使用sockstat查看管理端點是否已建立。 `sockstat -l | grep -i caddy` - 它應該顯示端點`*:2019`。
    
-   在 `LAN` 上建立一條防火牆規則，允許 `TCP` 到達目標 `This Firewall` 和目標連接埠 `2019`。
    
-   開啟管理端點：`http://YOUR_LAN_IP:2019/debug/pprof/`
    
-   請按照 [Profiling Caddy](https://caddyserver.com/docs/profiling) 上的說明進行操作。

---

