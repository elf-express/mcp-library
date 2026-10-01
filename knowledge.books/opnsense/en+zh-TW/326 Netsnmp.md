---
title: "Netsnmp"
source: "https://docs.opnsense.org/development/api/plugins/netsnmp.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 326
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:25.899Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Netdata｜網路數據](<325 網路數據.md>)　｜　[下一篇：Nginx ➡](<327 Nginx.md>)

# Netsnmp

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

*資源（GeneralController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | netsnmp | general<br>常規 | get<br>取得 |  |
| `POST` | netsnmp | general<br>常規 | set<br>設定 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/net-snmp/src/opnsense/mvc/app/models/OPNsense/Netsnmp/General.xml)<br>*模型* [General.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/net-snmp/src/opnsense/mvc/app/models/OPNsense/Netsnmp/General.xml) |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | netsnmp | service<br>服務 | reconfigure<br>重新配置 |  |
| `POST` | netsnmp | service<br>服務 | restart<br>重啟 |  |
| `POST` | netsnmp | service<br>服務 | start<br>啟動 |  |
| `GET` | netsnmp | service<br>服務 | status<br>狀態 |  |
| `POST` | netsnmp | service<br>服務 | stop<br>停止 |  |

*Resources (UserController.php)*

*資源（UserController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | netsnmp | user<br>使用者 | add\_user<br>新增使用者 |  |
| `POST` | netsnmp | user<br>使用者 | del\_user<br>刪除\_user | $uuid |
| `GET` | netsnmp | user<br>用戶 | get<br>取得 |  |
| `GET` | netsnmp | user | get\_user | $uuid=null |
| `GET,POST` | netsnmp | user<br>用戶 | search\_user<br>搜尋用戶 |  |
| `POST` | netsnmp | user<br>使用者 | set<br>設定 |  |
| `POST` | netsnmp | user<br>使用者 | set\_user<br>設定使用者 | $uuid |
| `POST` | netsnmp | user<br>使用者 | toggle\_user | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [User.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/net-snmp/src/opnsense/mvc/app/models/OPNsense/Netsnmp/User.xml)<br>*模型* [User.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/net-snmp/src/opnsense/mvc/app/models/OPNsense/Netsnmp/User.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Netdata｜網路數據](<325 網路數據.md>)　｜　[下一篇：Nginx ➡](<327 Nginx.md>)
