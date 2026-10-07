---
title: "Cron"
source: https://docs.opnsense.org/development/api/core/cron.html
chapter: ["Development Manual","API Reference","Core API"]
order: 272
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:58.576Z"
---


# Cron


*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | cron | service | reconfigure |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | cron | settings | add\_job |  |
| `POST` | cron | settings | del\_job | $uuid |
| `GET` | cron | settings | get |  |
| `GET` | cron | settings | get\_job | $uuid=null |
| `GET,POST` | cron | settings | search\_jobs |  |
| `POST` | cron | settings | set |  |
| `POST` | cron | settings | set\_job | $uuid |
| `POST` | cron | settings | toggle\_job | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Cron.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Cron/Cron.xml) |

---

