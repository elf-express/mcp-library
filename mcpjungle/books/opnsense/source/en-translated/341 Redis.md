---
title: "Redis"
source: "https://docs.opnsense.org/development/api/plugins/redis.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 341
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:35.001Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Radsecproxy](<340 Radsecproxy.md>)　｜　[下一篇：Relayd ➡](<342 Relayd.md>)

# Redis

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | redis | service | reconfigure |  |
| `GET` | redis | service | resetdb |  |
| `POST` | redis | service | restart |  |
| `POST` | redis | service | start |  |
| `GET` | redis | service | status |  |
| `POST` | redis | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | redis | settings | get |  |
| `POST` | redis | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Redis.xml](https://github.com/opnsense/plugins/blob/master/databases/redis/src/opnsense/mvc/app/models/OPNsense/Redis/Redis.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Radsecproxy](<340 Radsecproxy.md>)　｜　[下一篇：Relayd ➡](<342 Relayd.md>)
