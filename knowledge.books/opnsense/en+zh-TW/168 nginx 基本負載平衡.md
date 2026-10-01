---
title: "nginx Basic Load Balancing｜nginx 基本負載平衡"
title_original: "nginx Basic Load Balancing"
source: "https://docs.opnsense.org/manual/how-tos/nginx.html"
chapter: ["Community Plugins","Web"]
order: 168
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:33:06.439Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：ClamAV](<167 ClamAV.md>)　｜　[下一篇：nginx Header Hardening｜nginx 頭部加固 ➡](<169 nginx 頭部加固.md>)

# nginx Basic Load Balancing｜nginx 基本負載平衡

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Web](<000 目錄.md#c-37>)

## nginx: Basic Load Balancing｜nginx：基本負載平衡

## 1) Create Upstream Servers｜1）創建上游伺服器

![../../_images/nginx_upstream_servers.png](<../images/744a1dd5-nginx_upstream_servers.png>) ![../../_images/nginx_edit_upstream_dialog.png](<../images/529e6e56-nginx_edit_upstream_dialog.png>)

Create a server with a description and IP of the server. The priority is not important if you have a single server. It is used as a weight for round robin. Servers with a higher weight will receive more traffic.

建立一個伺服器，並新增伺服器描述和IP 。如果您只有一個伺服器，優先順序並不重要。優先權用於輪詢調度演算法的權重。權重越高的伺服器將獲得更多流量。

## 2) Create An Upstream｜2）創建上游

![../../_images/nginx_edit_upstream_with_verify.png](<../images/bddd0444-nginx_edit_upstream_with_verify.png>)

Group upstream servers to an upstream. An upstream is a group of servers to load balance between. Give it a useful name and choose the previously created server.

將上游伺服器分組到一個上游伺服器。上游伺服器群組是指用於負載平衡的伺服器群組。為其指定一個有意義的名稱，並選擇先前建立的伺服器。

Warning

警告

Upstream verification is enabled by default (**TLS: Verify Certificate** checkbox). Server names in the upstream certificate are compared with the name in the **TLS: Servername override** field. For successful verification, it is necessary that OPNsense trusts the certificate of the certification authority that issued the upstreams certificate. You can further restrict the list of trusted CA’s in the **TLS: Trusted Certificate** field.

預設啟用上游驗證（**TLS ：驗證憑證**複選框）。系統會將上游憑證中的伺服器名稱與**TLS ：伺服器名稱覆蓋**欄位中的名稱進行比較。為了成功驗證，OPNsense 必須信任頒發上游憑證的憑證授權單位的憑證。您可以在**CA TLS受信任憑證**欄位中進一步限制受信任的憑證清單。

## 3) Create A Location｜3) 建立位置

![../../_images/nginx_edit_location_dialog2.png](<../images/f0af71e8-nginx_edit_location_dialog2.png>)

Locations are used to map URLs to upstreams, directories, settings and so on. In our case we want to proxy the request to the previously created upstream. If we want to match everything, we use “/” without a special matcher. Now save the location.

位置資訊用於將 URL 對應到上游伺服器、目錄、設定等等。在本例中，我們希望將請求代理到先前建立的上游伺服器。如果要匹配所有內容，我們使用不含特殊匹配器的“/”。現在儲存位置資訊。

## 4) Create A HTTP Server｜4) 建立HTTP伺服器

![../../_images/nginx_edit_http_server_dialog.png](<../images/ea5db3c5-nginx_edit_http_server_dialog.png>)

In the last step, we have to create a port. This happens in a “http” block, which contains some basic configuration and the location blocks.

最後一步，我們需要建立一個連接埠。這在“http”程式碼區塊中完成，該程式碼區塊包含一些基本配置和位置資訊。

Enter the domain name into the “Server Name”（伺服器名稱） field and select the previously created location. If you want to use support TLS, you have to add a certificate.

在“Server Name”（伺服器名稱）欄位中輸入域名，然後選擇先前建立的位置。如果您想使用TLS支持，則必須新增證書。

## 5) Restart nginx｜5) 重啟 nginx

![../../_images/nginx_reload.png](<../images/2341c596-nginx_reload.png>)

Click the reload button and you are done. You may need to open some ports in the firewall if you have not done that yet. Since you are directly on the firewall, There is no need to use NAT similar workaround.

點擊重新載入按鈕即可完成。如果您尚未打開防火牆中的某些端口，則可能需要打開它們。由於您直接操作防火牆，因此無需使用類似NAT的變通方法。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：ClamAV](<167 ClamAV.md>)　｜　[下一篇：nginx Header Hardening｜nginx 頭部加固 ➡](<169 nginx 頭部加固.md>)
