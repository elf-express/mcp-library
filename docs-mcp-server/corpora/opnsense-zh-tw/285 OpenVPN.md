---
title: "OpenVPN"
title_original: "Openvpn"
source: "https://docs.opnsense.org/development/api/core/openvpn.html"
chapter: ["Development Manual","API Reference","Core API"]
order: 285
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:04.644Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：莫尼特](<283 莫尼特.md>)　｜　[下一篇：拉德維德 ➡](<286 拉德維德.md>)

# OpenVPN

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Core API](<000 目錄.md#c-59>)

*資源（ClientOverwritesController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | openvpn | client\_overwrites | add | |
| `POST` | openvpn | client\_overwrites | del | $uuid |
| `GET` | openvpn | client\_overwrites | get | $uuid=null |
| `GET,POST` | openvpn | client\_overwrites | 搜尋 | |
| `POST` | openvpn | client\_overwrites | set | $uuid=null |
| `POST` | openvpn | client\_overwrites | toggle | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [OpenVPN.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/OpenVPN/OpenVPN.xml) |

*資源（ExportController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | openvpn | export | accounts | $vpnid=null |
| `POST` | openvpn | 匯出 | 下載 | $vpnid,$certref=null |
| `GET` | openvpn | 匯出 | 提供者 | |
| `POST` | openvpn | export | store\_presets | $vpnid |
| `GET` | openvpn | 匯出 | 範本 | |
| `POST` | openvpn | export | validate\_presets | $vpnid |

*資源（InstancesController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | openvpn | 實例 | 新增 | |
| `POST` | openvpn | 實例 | 新增靜態金鑰 | |
| `POST` | openvpn | instances | del | $uuid |
| `POST` | openvpn | instances | del\_static\_key | $uuid |
| `GET` | openvpn | instances | gen\_key | $type=secret |
| `GET` | openvpn | 實例 | 取得 | $uuid=null |
| `GET` | openvpn | instances | get\_static\_key | $uuid=null |
| `GET,POST` | openvpn | 實例 | 搜尋 | |
| `GET,POST` | openvpn | 實例 | 搜尋靜態金鑰 | |
| `POST` | openvpn | instances | set | $uuid=null |
| `POST` | openvpn | instances | set\_static\_key | $uuid=null |
| `POST` | openvpn | 實例 | 切換 | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [OpenVPN.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/OpenVPN/OpenVPN.xml) |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | openvpn | 服務 | 終止會話 | |
| `POST` | openvpn | 服務 | 重新設定 | |
| `POST` | openvpn | 服務 | 重新啟動服務 | $id=null |
| `GET` | openvpn | 服務 | 搜尋路由 | |
| `GET` | openvpn | 服務 | 搜尋會話 | |
| `POST` | openvpn | 服務 | 啟動服務 | $id=null |
| `POST` | openvpn | 服務 | 停止服務 | $id=null |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：莫尼特](<283 莫尼特.md>)　｜　[下一篇：拉德維德 ➡](<286 拉德維德.md>)
