---
title: "nginx TCP And UDP Streams｜nginx TCP和UDP流"
title_original: "nginx TCP And UDP Streams"
source: "https://docs.opnsense.org/manual/how-tos/nginx_streams.html"
chapter: ["Community Plugins","Web"]
order: 176
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:09.482Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx Web Application Firewall｜nginx Web應用程式防火牆](<175 nginx Web應用程式防火牆.md>)　｜　[下一篇：Caddy Reverse Proxy｜Caddy 反向代理 ➡](<177 Caddy 反向代理.md>)

# nginx TCP And UDP Streams｜nginx TCP和UDP流

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Web](<000 目錄.md#c-37>)

## nginx: TCP And UDP Streams｜nginx： TCP和UDP流

## Background Information｜背景資訊

Beside HTTP, nginx is also able to handle TCP- and UDP-traffic as well and it can also inspect the so called Client Hello of [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) using the [preread](https://nginx.org/en/docs/stream/ngx_stream_ssl_preread_module.html) module, to route based on [SNI](https://tools.ietf.org/html/rfc6066#section-3) (Server Name Indication) which is an extension in TLS.

除了HTTP之外，nginx還能夠處理TCP-和UDP-流量，並且還可以使用[preread](https://nginx.org/en/docs/stream/ngx_stream_ssl_preread_module.html)模組檢查所謂的[TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security)的Client Hello，以基於[SNI](https://tools.ietf.org/html/rfc6066#section-3)進行路由（伺服器名稱指示）是TLS中的擴充。

## OPNsense specific Information｜OPNsense 特定訊息

OPNsense offers two modes of operation:

OPNsense 提供兩種操作模式：

-   Pass through and route based on SNI  
    根據SNI通行和路線
    
-   Read and forward the data which can also terminate TLS  
    讀取並轉發數據，該數據也可能終止TLS
    

## Configuration｜配置

Note

筆記

For Upstreams, please visit the [nginx: Basic Load Balancing](<168 nginx 基本負載平衡.md>) page. This expects that the upstreams are correctly set up.

對於上游伺服器，請造訪 [nginx: 基本負載平衡](<168 nginx 基本負載平衡.md>)頁面。這需要上游伺服器已正確配置。

### SNI Upstream Maps｜SNI上游地圖

SNI Upstream Maps are a powerful feature if you have multiple servers behind your reverse proxy and every server maintains their own certificate and you do not want to or cannot use your own certificate. In such cases, you can use it to forward the traffic based on the Server Name Indication extension in the TLS protocol (given that TLS is used).

如果您的反向代理後面有多個伺服器，並且每個伺服器都維護自己的證書，而您不想或不能使用自己的證書，那麼SNI上游映射就是一個強大的功能。在這種情況下，您可以利用它根據TLS協定中的伺服器名稱指示擴充來轉送流量（前提是使用了TLS協定）。

Warning

警告

This will not work anymore with ESNI which may be published with TLS 1.3. If it causes trouble, do not enable encrypted SNI and stay with plain SNI. Also keep in mind that when SNI Upstream Maps are used, the connection will not be decrypted on OPNsense, so you cannot load balance a TLS connection to unencrypted servers.

此功能將不再適用於可能與TLS 1.3一起發布的ESNI 。若出現問題，請勿啟用加密的SNI ，並保持使用明文的SNI 。另請注意，當使用SNI上游映射時，OPNsense 不會解密連接，因此您無法將TLS連接負載平衡到未加密的伺服器。

![../../_images/nginx_streams_snimap_edit.png](<../images/b6accf26-nginx_streams_snimap_edit.png>)

|   |   |
| --- | --- |
| Short description<br>簡短描述 | short description to show in dropdowns<br>下拉選單中顯示的簡短描述 |
| Hostname Upstream Map<br>主機名稱上游映射 | Enter a hostname and choose the upstream to forward the connection to for each combination<br>輸入主機名，並為每個組合選擇要將連線轉送到的上游伺服器 |

### Upstream Servers｜上游伺服器

The upstream servers are the TCP and UDP load balancing feature of nginx. You may use it to proxy DNS, some proprietary protocols etc.

上游伺服器是 nginx 的TCP和UDP負載平衡功能。您可以使用它來代理DNS 、一些專有協定等。

Warning

警告

This will not work with protocols which need some special handling like FTP or SIP

對於需要特殊處理的協議，例如FTP或SIP這種方法行不通。

![../../_images/nginx_streams_server_edit.png](<../images/c84f16e9-nginx_streams_server_edit.png>)

The listen port is the port used to expose the service to the clients. You should use the [standard](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml) port defined by IANA to maintain best compatibility with most clients.

監聽埠是用於向客戶端暴露服務的連接埠。為了與大多數客戶端保持最佳相容性，您應該使用由IANA定義的 [標準](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml)連接埠。

In case you are proxying UDP datagrams, you must enable the “UDP Port”（UDP埠） checkbox.

如果您要代理UDP資料報，則必須啟用“UDP Port”（UDP埠）複選框。

Select a certificate if you want to terminate the TLS connection. If you route directly with upstream property, the upstream TLS settings are used, to choose if the backend connection should be TLS encrypted (again).

如果要終止TLS連接，請選擇一個憑證。如果使用上游屬性直接路由，則會使用上游TLS設置，以選擇是否（再次）對後端連線進行TLS加密。

If you want to use an SNI Upstream Map, switch the entry in “Route With”（路線） and choose a mapping in the corresponding entry.

如果要使用SNI上游映射，請切換“Route With”（路線）中的條目，並在對應的條目中選擇映射。

Note

筆記

In the advanced settings, you can also force TLS based authentication for upstream backends (not supported in SNI Upstream Mapping).

在進階設定中，您也可以強制上游後端使用基於TLS的身份驗證（ SNI上游映射不支援此功能）。

## Test｜測試

You can test your setup using the following command:

您可以使用以下命令測試您的設定：

```bash
curl https://HOSTNAME:PORT -vkI --resolve HOSTNAME:PORT:IP
```

|   |   |
| --- | --- |
| HOSTNAME | The hostname you want to connect (example.com)<br>您要連接的主機名稱（example.com） |
| PORT | The port you run the proxy on<br>代理運行的連接埠 |
| IP | IP of your OPNsense device (to override DNS)<br>IP您的 OPNsense 設備（用於覆蓋DNS ） |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx Web Application Firewall｜nginx Web應用程式防火牆](<175 nginx Web應用程式防火牆.md>)　｜　[下一篇：Caddy Reverse Proxy｜Caddy 反向代理 ➡](<177 Caddy 反向代理.md>)
