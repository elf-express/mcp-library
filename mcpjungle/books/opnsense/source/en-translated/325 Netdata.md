---
title: "Netdata"
source: "https://docs.opnsense.org/development/api/plugins/netdata.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 325
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:24.864Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Netbird](<324 Netbird.md>)　｜　[下一篇：Netsnmp ➡](<326 Netsnmp.md>)

# Netdata

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | netdata | general | get |  |
| `POST` | netdata | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/netdata/src/opnsense/mvc/app/models/OPNsense/Netdata/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | netdata | service | reconfigure |  |
| `POST` | netdata | service | restart |  |
| `POST` | netdata | service | start |  |
| `GET` | netdata | service | status |  |
| `POST` | netdata | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Netbird](<324 Netbird.md>)　｜　[下一篇：Netsnmp ➡](<326 Netsnmp.md>)
