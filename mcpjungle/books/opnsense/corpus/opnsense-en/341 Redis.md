---
title: "Redis"
source: https://docs.opnsense.org/development/api/plugins/redis.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 341
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:35.001Z"
---


# Redis


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

