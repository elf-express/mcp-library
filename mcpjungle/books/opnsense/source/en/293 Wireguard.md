---
title: "Wireguard"
source: "https://docs.opnsense.org/development/api/core/wireguard.html"
chapter: ["Development Manual","API Reference","Core API"]
order: 293
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:08.675Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Unbound](<292 Unbound.md>)　｜　[下一篇：Acmeclient ➡](<294 Acmeclient.md>)

# Wireguard

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Core API](<000 目錄.md#c-59>)

*Resources (ClientController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | wireguard | client | add\_client |  |
| `POST` | wireguard | client | add\_client\_builder |  |
| `POST` | wireguard | client | del\_client | $uuid |
| `GET` | wireguard | client | get |  |
| `GET` | wireguard | client | get\_client | $uuid=null |
| `GET` | wireguard | client | get\_client\_builder |  |
| `GET` | wireguard | client | get\_server\_info | $uuid=null |
| `GET` | wireguard | client | list\_servers |  |
| `GET` | wireguard | client | psk |  |
| `GET,POST` | wireguard | client | search\_client |  |
| `POST` | wireguard | client | set |  |
| `POST` | wireguard | client | set\_client | $uuid |
| `POST` | wireguard | client | toggle\_client | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Client.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Wireguard/Client.xml) |

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | wireguard | general | get |  |
| `POST` | wireguard | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Wireguard/General.xml) |

*Resources (ServerController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | wireguard | server | add\_server | $uuid=null |
| `POST` | wireguard | server | del\_server | $uuid |
| `GET` | wireguard | server | get |  |
| `GET` | wireguard | server | get\_server | $uuid=null |
| `GET` | wireguard | server | key\_pair |  |
| `GET,POST` | wireguard | server | search\_server |  |
| `POST` | wireguard | server | set |  |
| `POST` | wireguard | server | set\_server | $uuid=null |
| `POST` | wireguard | server | toggle\_server | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Server.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Wireguard/Server.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | wireguard | service | reconfigure |  |
| `POST` | wireguard | service | restart |  |
| `GET` | wireguard | service | show |  |
| `POST` | wireguard | service | start |  |
| `GET` | wireguard | service | status |  |
| `POST` | wireguard | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Unbound](<292 Unbound.md>)　｜　[下一篇：Acmeclient ➡](<294 Acmeclient.md>)
