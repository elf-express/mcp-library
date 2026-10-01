---
title: "Tinc"
source: "https://docs.opnsense.org/development/api/plugins/tinc.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 354
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:39.547Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Tftp](<353 Tftp.md>)　｜　[下一篇：Tor ➡](<355 Tor.md>)

# Tinc

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | tinc | service | reconfigure |  |
| `POST` | tinc | service | restart |  |
| `POST` | tinc | service | start |  |
| `POST` | tinc | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | tinc | settings | del\_host | $uuid |
| `POST` | tinc | settings | del\_network | $uuid |
| `GET` | tinc | settings | get |  |
| `GET` | tinc | settings | get\_host | $uuid=null |
| `GET` | tinc | settings | get\_network | $uuid=null |
| `GET` | tinc | settings | search\_host |  |
| `GET` | tinc | settings | search\_network |  |
| `POST` | tinc | settings | set |  |
| `POST` | tinc | settings | set\_host | $uuid=null |
| `POST` | tinc | settings | set\_network | $uuid=null |
| `POST` | tinc | settings | toggle\_host | $uuid,$enabled=null |
| `POST` | tinc | settings | toggle\_network | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Tinc.xml](https://github.com/opnsense/plugins/blob/master/security/tinc/src/opnsense/mvc/app/models/OPNsense/Tinc/Tinc.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Tftp](<353 Tftp.md>)　｜　[下一篇：Tor ➡](<355 Tor.md>)
