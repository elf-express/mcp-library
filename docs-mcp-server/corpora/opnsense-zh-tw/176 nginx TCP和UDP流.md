---
title: "nginx TCP和UDP流"
title_original: "nginx TCP And UDP Streams"
source: "https://docs.opnsense.org/manual/how-tos/nginx_streams.html"
chapter: ["Community Plugins","Web"]
order: 176
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:33:09.482Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx Web應用程式防火牆](<175 nginx Web應用程式防火牆.md>)　｜　[下一篇：Caddy 反向代理 ➡](<177 Caddy 反向代理.md>)

# nginx TCP和UDP流

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Web](<000 目錄.md#c-37>)

## nginx： TCP和UDP流

## 背景資訊

除了HTTP之外，nginx 也能夠處理TCP和UDP流量，而且它還可以使用 [ (https://nginx.org/en/docs/stream/ngx_stream_ssl_preread_module.html) ]TLS和(https://en.wikipedia.org/wiki/Transport_Layer_Security)流量，而且它還可以使用 [SNI](https://tools.ietf.org/html/rfc6066#section-3) Hello⦧ （伺服器名稱指示）進行路由，這是TLS中的一個擴充。

## OPNsense 特定訊息

OPNsense 提供兩種操作模式：

-   根據SNI通行和路線
    
-   讀取並轉發數據，該數據也可能終止TLS
    

## 配置

注意事項

對於上游伺服器，請造訪 [nginx: 基本負載平衡](<168 nginx 基本負載平衡.md>)頁面。這需要上游伺服器已正確配置。

### SNI上游地圖

如果您的反向代理後面有多個伺服器，並且每個伺服器都維護自己的證書，而您不想或不能使用自己的證書，那麼SNI上游映射就是一個強大的功能。在這種情況下，您可以利用它根據TLS協定中的伺服器名稱指示擴充來轉送流量（前提是使用了TLS ）。

警告

此功能將不再適用於可能與TLS 1.3一起發布的ESNI 。若出現問題，請勿啟用加密的SNI ，並保持使用明文的SNI 。另請注意，當使用SNI上游映射時，OPNsense 不會解密連接，因此您無法將TLS連接負載平衡到未加密的伺服器。

![../../_images/nginx_streams_snimap_edit.png](<../images/b6accf26-nginx_streams_snimap_edit.png>)

|   |   |
| --- | --- |
| 簡短描述 | 下拉選單中顯示的簡短描述 |
| 主機名稱上游映射 | 輸入主機名，並為每個組合選擇要將連線轉送到的上游伺服器 |

### 上游伺服器

上游伺服器是 nginx 的TCP和UDP負載平衡功能。您可以使用它來代理DNS 、一些專有協定等。

警告

對於需要特殊處理的協議，例如FTP或SIP這種方法行不通。

![../../_images/nginx_streams_server_edit.png](<../images/c84f16e9-nginx_streams_server_edit.png>)

監聽埠是用於向客戶端暴露服務的連接埠。為了與大多數客戶端保持最佳相容性，您應該使用由IANA定義的 [標準](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml)連接埠。

如果您要代理UDP資料報，則必須啟用「 UDP連接埠」複選框。

如果要終止TLS連接，請選擇一個憑證。如果直接使用上游屬性進行路由，則會使用上游TLS設置，以選擇是否（再次）對後端連線進行TLS加密。

如果您想使用SNI上游地圖，請切換「路線選擇」中的條目，並在對應的條目中選擇地圖。

注意事項

在進階設定中，您也可以強制上游後端使用基於TLS的身份驗證（ SNI上游映射不支援此功能）。

## 測試

您可以使用以下命令測試您的設定：

```bash
curl https://HOSTNAME:PORT -vkI --resolve HOSTNAME:PORT:IP
```

|   |   |
| --- | --- |
| HOSTNAME | 您要連接的主機名稱（example.com） |
| PORT | 代理運行的連接埠 |
| IP | IP您的 OPNsense 設備（用於覆蓋DNS ） |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx Web應用程式防火牆](<175 nginx Web應用程式防火牆.md>)　｜　[下一篇：Caddy 反向代理 ➡](<177 Caddy 反向代理.md>)
