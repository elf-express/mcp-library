---
title: "Routing"
source: "https://docs.opnsense.org/development/api/core/routing.html"
chapter: ["Development Manual","API Reference","Core API"]
order: 288
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:06.149Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Routes](<287 Routes.md>)　｜　[下一篇：Syslog ➡](<289 Syslog.md>)

# Routing

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Core API](<000 目錄.md#c-59>)

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | routing | settings | add\_gateway |  |
| `POST` | routing | settings | del\_gateway | $uuid |
| `GET` | routing | settings | get |  |
| `GET` | routing | settings | get\_gateway | $uuid=null |
| `POST` | routing | settings | reconfigure |  |
| `GET` | routing | settings | search\_gateway |  |
| `POST` | routing | settings | set |  |
| `POST` | routing | settings | set\_gateway | $uuid |
| `POST` | routing | settings | toggle\_gateway | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Gateways.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Routing/Gateways.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Routes](<287 Routes.md>)　｜　[下一篇：Syslog ➡](<289 Syslog.md>)
