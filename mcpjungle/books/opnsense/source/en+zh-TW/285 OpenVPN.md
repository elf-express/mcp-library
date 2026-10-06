---
title: "Openvpn｜OpenVPN"
title_original: "Openvpn"
source: "https://docs.opnsense.org/development/api/core/openvpn.html"
chapter: ["Development Manual","API Reference","Core API"]
order: 285
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:04.644Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Monit｜迅速的](<283 迅速的.md>)　｜　[下一篇：Radvd｜拉德維德 ➡](<286 拉德維德.md>)

# Openvpn｜OpenVPN

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Core API](<000 目錄.md#c-59>)

*Resources (ClientOverwritesController.php)*

*資源（ClientOverwritesController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | openvpn | client\_overwrites | add |  |
| `POST` | openvpn | client\_overwrites | del | $uuid |
| `GET` | openvpn | client\_overwrites | get | $uuid=null |
| `GET,POST` | openvpn | client\_overwrites | search<br>搜尋 |  |
| `POST` | openvpn | client\_overwrites | set | $uuid=null |
| `POST` | openvpn | client\_overwrites | toggle | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [OpenVPN.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/OpenVPN/OpenVPN.xml)<br>*模型* [OpenVPN.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/OpenVPN/OpenVPN.xml) |

*Resources (ExportController.php)*

*資源（ExportController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | openvpn | export | accounts | $vpnid=null |
| `POST` | openvpn | export<br>匯出 | download<br>下載 | $vpnid,$certref=null |
| `GET` | openvpn | export<br>匯出 | providers<br>提供者 |  |
| `POST` | openvpn | export | store\_presets | $vpnid |
| `GET` | openvpn | export<br>匯出 | templates<br>範本 |  |
| `POST` | openvpn | export | validate\_presets | $vpnid |

*Resources (InstancesController.php)*

*資源（InstancesController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | openvpn | instances<br>實例 | add<br>新增 |  |
| `POST` | openvpn | instances<br>實例 | add\_static\_key<br>新增靜態金鑰 |  |
| `POST` | openvpn | instances | del | $uuid |
| `POST` | openvpn | instances | del\_static\_key | $uuid |
| `GET` | openvpn | instances | gen\_key | $type=secret |
| `GET` | openvpn | instances<br>實例 | get<br>取得 | $uuid=null |
| `GET` | openvpn | instances | get\_static\_key | $uuid=null |
| `GET,POST` | openvpn | instances<br>實例 | search<br>搜尋 |  |
| `GET,POST` | openvpn | instances<br>實例 | search\_static\_key<br>搜尋靜態金鑰 |  |
| `POST` | openvpn | instances | set | $uuid=null |
| `POST` | openvpn | instances | set\_static\_key | $uuid=null |
| `POST` | openvpn | instances<br>實例 | toggle<br>切換 | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [OpenVPN.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/OpenVPN/OpenVPN.xml)<br>*模型* [OpenVPN.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/OpenVPN/OpenVPN.xml) |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | openvpn | service<br>服務 | kill\_session<br>終止會話 |  |
| `POST` | openvpn | service<br>服務 | reconfigure<br>重新設定 |  |
| `POST` | openvpn | service<br>服務 | restart\_service<br>重新啟動服務 | $id=null |
| `GET` | openvpn | service<br>服務 | search\_routes<br>搜尋路由 |  |
| `GET` | openvpn | service<br>服務 | search\_sessions<br>搜尋會話 |  |
| `POST` | openvpn | service<br>服務 | start\_service<br>啟動服務 | $id=null |
| `POST` | openvpn | service<br>服務 | stop\_service<br>停止服務 | $id=null |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Monit｜迅速的](<283 迅速的.md>)　｜　[下一篇：Radvd｜拉德維德 ➡](<286 拉德維德.md>)
