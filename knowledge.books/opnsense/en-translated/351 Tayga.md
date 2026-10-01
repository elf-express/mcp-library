---
title: "Tayga"
source: "https://docs.opnsense.org/development/api/plugins/tayga.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 351
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:38.016Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Tailscale](<350 Tailscale.md>)　｜　[下一篇：Telegraf ➡](<352 Telegraf.md>)

# Tayga

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | tayga | general | get |  |
| `POST` | tayga | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net/tayga/src/opnsense/mvc/app/models/OPNsense/Tayga/General.xml) |

*Resources (MappingController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | tayga | mapping | add\_staticmapping |  |
| `POST` | tayga | mapping | del\_staticmapping | $uuid |
| `GET` | tayga | mapping | get |  |
| `GET` | tayga | mapping | get\_staticmapping | $uuid=null |
| `GET,POST` | tayga | mapping | search\_staticmapping |  |
| `POST` | tayga | mapping | set |  |
| `POST` | tayga | mapping | set\_staticmapping | $uuid |
| `POST` | tayga | mapping | toggle\_staticmapping | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [StaticMapping.xml](https://github.com/opnsense/plugins/blob/master/net/tayga/src/opnsense/mvc/app/models/OPNsense/Tayga/StaticMapping.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | tayga | service | reconfigure |  |
| `POST` | tayga | service | restart |  |
| `POST` | tayga | service | start |  |
| `GET` | tayga | service | status |  |
| `POST` | tayga | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Tailscale](<350 Tailscale.md>)　｜　[下一篇：Telegraf ➡](<352 Telegraf.md>)
