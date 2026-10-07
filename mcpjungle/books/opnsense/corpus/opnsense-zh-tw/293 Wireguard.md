---
title: "Wireguard"
source: https://docs.opnsense.org/development/api/core/wireguard.html
chapter: ["Development Manual","API Reference","Core API"]
order: 293
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:08.675Z"
---

# Wireguard

*資源（ClientController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | WireGuard | 用戶端 | 新增客戶端 | |
| `POST` | WireGuard | 用戶端 | 新增客戶端建構器 | |
| `POST` | wireguard | 客戶端 | del\_client | $uuid |
| `GET` | WireGuard | 用戶端 | 取得 | |
| `GET` | wireguard | client | get\_client | $uuid=null |
| `GET` | WireGuard | 用戶端 | 取得用戶端建構器 | |
| `GET` | wireguard | client | get\_server\_info | $uuid=null |
| `GET` | WireGuard | 用戶端 | 列出伺服器 | |
| `GET` | WireGuard | 用戶端 | PSK | |
| `GET,POST` | WireGuard | 用戶端 | 搜尋客戶端 | |
| `POST` | WireGuard | 用戶端 | 設定 | |
| `POST` | wireguard | client | set\_client | $uuid |
| `POST` | wireguard | 客戶端 | toggle\_client | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Client.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Wireguard/Client.xml) |

*資源（GeneralController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | WireGuard | 常規 | 取得 | |
| `POST` | 線護罩 | 通用 | 套裝 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [General.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Wireguard/General.xml) |

*資源（ServerController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | wireguard | server | add\_server | $uuid=null |
| `POST` | wireguard | server | del\_server | $uuid |
| `GET` | WireGuard | 伺服器 | 取得 | |
| `GET` | wireguard | server | get\_server | $uuid=null |
| `GET` | WireGuard | 伺服器 | 金鑰對 | |
| `GET,POST` | WireGuard | 伺服器 | 搜尋伺服器 | |
| `POST` | WireGuard | 伺服器 | 設定 | |
| `POST` | wireguard | server | set\_server | $uuid=null |
| `POST` | wireguard | server | toggle\_server | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Server.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Wireguard/Server.xml) |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | WireGuard | 服務 | 重新配置 | |
| `POST` | WireGuard | 服務 | 重開機 | |
| `GET` | WireGuard | 服務 | 展示 | |
| `POST` | WireGuard | 服務 | 開始 | |
| `GET` | WireGuard | 服務 | 狀態 | |
| `POST` | 線護罩 | 服務 | 停止 | |