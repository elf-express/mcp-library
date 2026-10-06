---
title: "nginx 基本負載平衡"
title_original: "nginx Basic Load Balancing"
source: "https://docs.opnsense.org/manual/how-tos/nginx.html"
chapter: ["Community Plugins","Web"]
order: 168
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:33:06.439Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：ClamAV](<167 ClamAV.md>)　｜　[下一篇：nginx 頭部加固 ➡](<169 nginx 頭部加固.md>)

# nginx 基本負載平衡

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Web](<000 目錄.md#c-37>)

## nginx：基本負載平衡

## 1）創建上游伺服器

![../../_images/nginx_upstream_servers.png](<../images/744a1dd5-nginx_upstream_servers.png>) ![../../_images/nginx_edit_upstream_dialog.png](<../images/529e6e56-nginx_edit_upstream_dialog.png>)

建立一個伺服器，並新增伺服器描述和IP 。如果您只有一個伺服器，優先順序並不重要。優先權用於輪詢調度演算法的權重。權重越高的伺服器將獲得更多流量。

## 2）創建上游

![../../_images/nginx_edit_upstream_with_verify.png](<../images/bddd0444-nginx_edit_upstream_with_verify.png>)

將上游伺服器分組到一個上游伺服器。上游伺服器群組是指用於負載平衡的伺服器群組。為其指定一個有意義的名稱，並選擇先前建立的伺服器。

警告

預設啟用上游驗證（**TLS ：驗證憑證**複選框）。系統會將上游憑證中的伺服器名稱與**TLS ：伺服器名稱覆蓋**欄位中的名稱進行比較。為了成功驗證，OPNsense 必須信任頒發上游憑證的憑證授權單位的憑證。您可以在**TLS ：受信任憑證**欄位中進一步限制受信任的CA清單。

## 3) 建立位置

![../../_images/nginx_edit_location_dialog2.png](<../images/f0af71e8-nginx_edit_location_dialog2.png>)

位置資訊用於將 URL 對應到上游伺服器、目錄、設定等等。在本例中，我們希望將請求代理到先前建立的上游伺服器。如果要匹配所有內容，我們使用不含特殊匹配器的“/”。現在儲存位置資訊。

## 4) 建立HTTP伺服器

![../../_images/nginx_edit_http_server_dialog.png](<../images/ea5db3c5-nginx_edit_http_server_dialog.png>)

最後一步，我們需要建立一個連接埠。這在“http”程式碼區塊中完成，該程式碼區塊包含一些基本配置和位置資訊。

在「伺服器名稱」欄位中輸​​入域名，然後選擇先前建立的位置。如果您想使用TLS支持，則必須新增憑證。

## 5) 重啟 nginx

![../../_images/nginx_reload.png](<../images/2341c596-nginx_reload.png>)

點擊重新載入按鈕即可完成。如果您尚未打開防火牆中的某些端口，則可能需要打開它們。由於您直接操作防火牆，因此無需使用類似NAT的變通方法。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：ClamAV](<167 ClamAV.md>)　｜　[下一篇：nginx 頭部加固 ➡](<169 nginx 頭部加固.md>)
