---
title: "Gridexample"
source: "https://docs.opnsense.org/development/api/plugins/gridexample.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 313
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:18.783Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Ftpproxy](<312 Ftpproxy.md>)　｜　[下一篇：Haproxy ➡](<314 Haproxy.md>)

# Gridexample

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | gridexample | service | reconfigure |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | gridexample | settings | add\_item |  |
| `POST` | gridexample | settings | del\_item | $uuid |
| `GET` | gridexample | settings | get |  |
| `GET` | gridexample | settings | get\_item | $uuid=null |
| `GET,POST` | gridexample | settings | search\_item |  |
| `POST` | gridexample | settings | set |  |
| `POST` | gridexample | settings | set\_item | $uuid |
| `POST` | gridexample | settings | toggle\_item | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [GridExample.xml](https://github.com/opnsense/plugins/blob/master/devel/grid_example/src/opnsense/mvc/app/models/OPNsense/GridExample/GridExample.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Ftpproxy](<312 Ftpproxy.md>)　｜　[下一篇：Haproxy ➡](<314 Haproxy.md>)
