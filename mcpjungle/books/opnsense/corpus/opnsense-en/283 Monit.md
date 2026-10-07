---
title: "Monit"
source: https://docs.opnsense.org/development/api/core/monit.html
chapter: ["Development Manual","API Reference","Core API"]
order: 283
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:03.624Z"
---


# Monit


*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | monit | service | check |  |
| `POST` | monit | service | reconfigure |  |
| `POST` | monit | service | restart |  |
| `POST` | monit | service | start |  |
| `GET` | monit | service | status |  |
| `POST` | monit | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | monit | settings | add\_alert |  |
| `POST` | monit | settings | add\_service |  |
| `POST` | monit | settings | add\_test |  |
| `POST` | monit | settings | del\_alert | $uuid |
| `POST` | monit | settings | del\_service | $uuid |
| `POST` | monit | settings | del\_test | $uuid |
| `GET` | monit | settings | get |  |
| `GET` | monit | settings | get\_alert | $uuid=null |
| `GET` | monit | settings | get\_general |  |
| `GET` | monit | settings | get\_service | $uuid=null |
| `GET` | monit | settings | get\_test | $uuid=null |
| `GET,POST` | monit | settings | search\_alert |  |
| `GET,POST` | monit | settings | search\_service |  |
| `GET,POST` | monit | settings | search\_test |  |
| `POST` | monit | settings | set |  |
| `POST` | monit | settings | set\_alert | $uuid |
| `POST` | monit | settings | set\_service | $uuid |
| `POST` | monit | settings | set\_test | $uuid |
| `POST` | monit | settings | toggle\_alert | $uuid,$enabled=null |
| `POST` | monit | settings | toggle\_service | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Monit.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Monit/Monit.xml) |

*Resources (StatusController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | monit | status | get | $format=xml |

---

