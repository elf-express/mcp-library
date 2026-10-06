---
title: "Nrpe"
source: "https://docs.opnsense.org/development/api/plugins/nrpe.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 329
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:28.956Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Nodeexporter](<328 Nodeexporter.md>)　｜　[下一篇：Ntopng ➡](<330 Ntopng.md>)

# Nrpe

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (CommandController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | nrpe | command | add\_command |  |
| `POST` | nrpe | command | del\_command | $uuid |
| `GET` | nrpe | command | get |  |
| `GET` | nrpe | command | get\_command | $uuid=null |
| `GET,POST` | nrpe | command | search\_command |  |
| `POST` | nrpe | command | set |  |
| `POST` | nrpe | command | set\_command | $uuid |
| `POST` | nrpe | command | toggle\_command | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Command.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/nrpe/src/opnsense/mvc/app/models/OPNsense/Nrpe/Command.xml) |

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | nrpe | general | get |  |
| `POST` | nrpe | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/nrpe/src/opnsense/mvc/app/models/OPNsense/Nrpe/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | nrpe | service | reconfigure |  |
| `POST` | nrpe | service | restart |  |
| `POST` | nrpe | service | start |  |
| `GET` | nrpe | service | status |  |
| `POST` | nrpe | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Nodeexporter](<328 Nodeexporter.md>)　｜　[下一篇：Ntopng ➡](<330 Ntopng.md>)
