---
title: "Wireguard"
source: "https://docs.opnsense.org/development/api/core/wireguard.html"
chapter: ["Development Manual","API Reference","Core API"]
order: 293
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:08.675Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Unbound｜無界](<292 無界.md>)　｜　[下一篇：Acmeclient ➡](<294 Acmeclient.md>)

# Wireguard

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Core API](<000 目錄.md#c-59>)

*Resources (ClientController.php)*

*資源（ClientController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | wireguard<br>WireGuard | client<br>用戶端 | add\_client<br>新增客戶端 |  |
| `POST` | wireguard<br>WireGuard | client<br>用戶端 | add\_client\_builder<br>新增客戶端建構器 |  |
| `POST` | wireguard | client<br>客戶端 | del\_client | $uuid |
| `GET` | wireguard<br>WireGuard | client<br>用戶端 | get<br>取得 |  |
| `GET` | wireguard | client | get\_client | $uuid=null |
| `GET` | wireguard<br>WireGuard | client<br>用戶端 | get\_client\_builder<br>取得用戶端建構器 |  |
| `GET` | wireguard | client | get\_server\_info | $uuid=null |
| `GET` | wireguard<br>WireGuard | client<br>用戶端 | list\_servers<br>列出伺服器 |  |
| `GET` | wireguard<br>WireGuard | client<br>用戶端 | psk<br>PSK |  |
| `GET,POST` | wireguard<br>WireGuard | client<br>用戶端 | search\_client<br>搜尋客戶端 |  |
| `POST` | wireguard<br>WireGuard | client<br>用戶端 | set<br>設定 |  |
| `POST` | wireguard | client | set\_client | $uuid |
| `POST` | wireguard | client<br>客戶端 | toggle\_client | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Client.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Wireguard/Client.xml)<br>*模型* [Client.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Wireguard/Client.xml) |

*Resources (GeneralController.php)*

*資源（GeneralController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | wireguard<br>WireGuard | general<br>常規 | get<br>取得 |  |
| `POST` | wireguard<br>線護罩 | general<br>通用 | set<br>套裝 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Wireguard/General.xml)<br>*模型* [General.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Wireguard/General.xml) |

*Resources (ServerController.php)*

*資源（ServerController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | wireguard | server | add\_server | $uuid=null |
| `POST` | wireguard | server | del\_server | $uuid |
| `GET` | wireguard<br>WireGuard | server<br>伺服器 | get<br>取得 |  |
| `GET` | wireguard | server | get\_server | $uuid=null |
| `GET` | wireguard<br>WireGuard | server<br>伺服器 | key\_pair<br>金鑰對 |  |
| `GET,POST` | wireguard<br>WireGuard | server<br>伺服器 | search\_server<br>搜尋伺服器 |  |
| `POST` | wireguard<br>WireGuard | server<br>伺服器 | set<br>設定 |  |
| `POST` | wireguard | server | set\_server | $uuid=null |
| `POST` | wireguard | server | toggle\_server | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Server.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Wireguard/Server.xml)<br>*模型* [Server.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Wireguard/Server.xml) |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | wireguard<br>WireGuard | service<br>服務 | reconfigure<br>重新配置 |  |
| `POST` | wireguard<br>WireGuard | service<br>服務 | restart<br>重開機 |  |
| `GET` | wireguard<br>WireGuard | service<br>服務 | show<br>展示 |  |
| `POST` | wireguard<br>WireGuard | service<br>服務 | start<br>開始 |  |
| `GET` | wireguard<br>WireGuard | service<br>服務 | status<br>狀態 |  |
| `POST` | wireguard<br>線護罩 | service<br>服務 | stop<br>停止 |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Unbound｜無界](<292 無界.md>)　｜　[下一篇：Acmeclient ➡](<294 Acmeclient.md>)
