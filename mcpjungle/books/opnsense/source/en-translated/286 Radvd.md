---
title: "Radvd"
source: "https://docs.opnsense.org/development/api/core/radvd.html"
chapter: ["Development Manual","API Reference","Core API"]
order: 286
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:05.643Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Openvpn](<285 Openvpn.md>)　｜　[下一篇：Routes ➡](<287 Routes.md>)

# Radvd

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Core API](<000 目錄.md#c-59>)

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | radvd | service | reconfigure |  |
| `POST` | radvd | service | restart |  |
| `POST` | radvd | service | start |  |
| `GET` | radvd | service | status |  |
| `POST` | radvd | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | radvd | settings | add\_entry |  |
| `POST` | radvd | settings | del\_entry | $uuid |
| `GET` | radvd | settings | get |  |
| `GET` | radvd | settings | get\_entry | $uuid=null |
| `GET,POST` | radvd | settings | search\_entry |  |
| `POST` | radvd | settings | set |  |
| `POST` | radvd | settings | set\_entry | $uuid |
| `POST` | radvd | settings | toggle\_entry | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Radvd.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Radvd/Radvd.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Openvpn](<285 Openvpn.md>)　｜　[下一篇：Routes ➡](<287 Routes.md>)
