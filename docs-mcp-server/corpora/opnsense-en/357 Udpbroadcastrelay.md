---
title: "Udpbroadcastrelay"
source: "https://docs.opnsense.org/development/api/plugins/udpbroadcastrelay.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 357
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:43.094Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Turnserver](<356 Turnserver.md>)　｜　[下一篇：Vnstat ➡](<358 Vnstat.md>)

# Udpbroadcastrelay

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | udpbroadcastrelay | service | config |  |
| `GET` | udpbroadcastrelay | service | get |  |
| `GET` | udpbroadcastrelay | service | reload |  |
| `GET` | udpbroadcastrelay | service | restart | $uuid |
| `POST` | udpbroadcastrelay | service | set |  |
| `GET` | udpbroadcastrelay | service | start | $uuid |
| `GET` | udpbroadcastrelay | service | status | $uuid |
| `GET` | udpbroadcastrelay | service | stop | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [UDPBroadcastRelay.xml](https://github.com/opnsense/plugins/blob/master/net/udpbroadcastrelay/src/opnsense/mvc/app/models/OPNsense/UDPBroadcastRelay/UDPBroadcastRelay.xml) |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | udpbroadcastrelay | settings | add\_relay |  |
| `POST` | udpbroadcastrelay | settings | del\_relay | $uuid |
| `GET` | udpbroadcastrelay | settings | get |  |
| `GET` | udpbroadcastrelay | settings | get\_relay | $uuid=null |
| `GET` | udpbroadcastrelay | settings | search\_relay |  |
| `POST` | udpbroadcastrelay | settings | set |  |
| `POST` | udpbroadcastrelay | settings | set\_relay | $uuid |
| `POST` | udpbroadcastrelay | settings | toggle\_relay | $uuid |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Turnserver](<356 Turnserver.md>)　｜　[下一篇：Vnstat ➡](<358 Vnstat.md>)
