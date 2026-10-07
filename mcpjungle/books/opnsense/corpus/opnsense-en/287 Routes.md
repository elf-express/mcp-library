---
title: "Routes"
source: https://docs.opnsense.org/development/api/core/routes.html
chapter: ["Development Manual","API Reference","Core API"]
order: 287
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:06.654Z"
---


# Routes


*Resources (GatewayController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | routes | gateway | status |  |

*Resources (RoutesController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | routes | routes | addroute |  |
| `POST` | routes | routes | delroute | $uuid |
| `GET` | routes | routes | get |  |
| `GET` | routes | routes | getroute | $uuid=null |
| `POST` | routes | routes | reconfigure |  |
| `GET,POST` | routes | routes | searchroute |  |
| `POST` | routes | routes | set |  |
| `POST` | routes | routes | setroute | $uuid |
| `POST` | routes | routes | toggleroute | $uuid,$disabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Route.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Routes/Route.xml) |

---

