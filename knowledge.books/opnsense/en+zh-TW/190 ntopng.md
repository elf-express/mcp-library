---
title: "ntopng"
source: "https://docs.opnsense.org/manual/how-tos/ntopng.html"
chapter: ["Community Plugins","Reporting"]
order: 190
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:16.560Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Tor Configuration｜Tor 配置](<189 Tor 配置.md>)　｜　[下一篇：Services｜服務 ➡](<191 服務.md>)

# ntopng

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Reporting](<000 目錄.md#c-39>)

## Installation｜安裝

First of all, you have to install the ntopng plugin (os-ntopng) from the plugins view reachable via System ‣ Firmware ‣ Plugins.

首先，您必須從「系統」‣「韌體」‣「外掛程式」存取的外掛程式視圖安裝 ntopng 外掛程式 (os-ntopng)。

After a page reload you will get a new menu entry under **Services** for ntopng. If you don’t have Redis plugin installed, you’ll receive a warning in ntopng main menu. Please go back to System ‣ Firmware ‣ Plugins, install os-redis, change to Services ‣ Redis and just enable the service. That’s enough to run ntopng.

頁面重新載入後，您將在 ntopng 的 **服務** 下取得一個新選單項目。如果您沒有安裝 Redis 插件，您將在 ntopng 主選單中收到警告。請返回 System ‣ Firmware ‣ Plugins，安裝 os-redis，切換到 Services ‣ Redis 並啟用該服務。這足以運行 ntopng。

## General Settings｜常規設定

Enable ntopng

啟用 ntopng

Enable and start ntopng.

啟用並啟動 ntopng。

Interfaces

介面

Here you set the interfaces ntopng should listen on. If you don’t select any interface it listens to the first in the system, e.g. em0, but you can change the interfaces within ntopng’s UI on demand; while setting an explicit interface you will not get any other interface presented in its own UI.

在這裡設定 ntopng 應該監聽的介面。如果您不選擇任何接口，它將監聽系統中的第一個接口，例如 em0，但您可以根據需要更改 ntopng 的UI中的接口；當設置一個顯式接口時，您將不會在其自身的UI中看到任何其他接口。

HTTP Port

HTTP端口

The port ntopng’s UI should listen on. When you leave it on the default just open a browser and go to your Firewall IP with port 3000 and HTTP. If you want to secure the connection feel free to setup HAProxy or Nginx as a reverse proxy (SSL offloading).

ntopng 的UI埠應該監聽。如果使用預設設置，只需開啟瀏覽器，存取防火牆IP ，連接埠為 3000 和HTTP即可。如果需要加強連線安全，可以設定 HAProxy 或 Nginx 作為反向代理（ SSL卸載）。

DNS Mode

DNS模式

Here you can choose if ntopng should try to resolve IPs to host names.

在這裡您可以選擇 ntopng 是否應該嘗試將 IP 位址解析為主機名稱。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Tor Configuration｜Tor 配置](<189 Tor 配置.md>)　｜　[下一篇：Services｜服務 ➡](<191 服務.md>)
