---
title: "Syslog"
source: "https://docs.opnsense.org/development/api/core/syslog.html"
chapter: ["Development Manual","API Reference","Core API"]
order: 289
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:07.155Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Routing](<288 Routing.md>)　｜　[下一篇：Trafficshaper ➡](<290 Trafficshaper.md>)

# Syslog

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Core API](<000 目錄.md#c-59>)

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | syslog | service | reconfigure |  |
| `POST` | syslog | service | reset |  |
| `POST` | syslog | service | restart |  |
| `POST` | syslog | service | start |  |
| `GET` | syslog | service | stats |  |
| `GET` | syslog | service | status |  |
| `POST` | syslog | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | syslog | settings | add\_destination |  |
| `POST` | syslog | settings | del\_destination | $uuid |
| `GET` | syslog | settings | get |  |
| `GET` | syslog | settings | get\_destination | $uuid=null |
| `GET,POST` | syslog | settings | search\_destinations |  |
| `POST` | syslog | settings | set |  |
| `POST` | syslog | settings | set\_destination | $uuid |
| `POST` | syslog | settings | toggle\_destination | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Syslog.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Syslog/Syslog.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Routing](<288 Routing.md>)　｜　[下一篇：Trafficshaper ➡](<290 Trafficshaper.md>)
