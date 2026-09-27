---
title: "Netsnmp"
source: "https://docs.opnsense.org/development/api/plugins/netsnmp.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 326
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:25.899Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Netdata](<325 Netdata.md>)　｜　[下一篇：Nginx ➡](<327 Nginx.md>)

# Netsnmp

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | netsnmp | general | get |  |
| `POST` | netsnmp | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/net-snmp/src/opnsense/mvc/app/models/OPNsense/Netsnmp/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | netsnmp | service | reconfigure |  |
| `POST` | netsnmp | service | restart |  |
| `POST` | netsnmp | service | start |  |
| `GET` | netsnmp | service | status |  |
| `POST` | netsnmp | service | stop |  |

*Resources (UserController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | netsnmp | user | add\_user |  |
| `POST` | netsnmp | user | del\_user | $uuid |
| `GET` | netsnmp | user | get |  |
| `GET` | netsnmp | user | get\_user | $uuid=null |
| `GET,POST` | netsnmp | user | search\_user |  |
| `POST` | netsnmp | user | set |  |
| `POST` | netsnmp | user | set\_user | $uuid |
| `POST` | netsnmp | user | toggle\_user | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [User.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/net-snmp/src/opnsense/mvc/app/models/OPNsense/Netsnmp/User.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Netdata](<325 Netdata.md>)　｜　[下一篇：Nginx ➡](<327 Nginx.md>)
