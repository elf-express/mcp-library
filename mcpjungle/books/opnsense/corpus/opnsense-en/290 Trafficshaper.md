---
title: "Trafficshaper"
source: https://docs.opnsense.org/development/api/core/trafficshaper.html
chapter: ["Development Manual","API Reference","Core API"]
order: 290
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:08.159Z"
---


# Trafficshaper


*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | trafficshaper | service | flushreload |  |
| `POST` | trafficshaper | service | reconfigure |  |
| `GET` | trafficshaper | service | statistics |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | trafficshaper | settings | add\_pipe |  |
| `POST` | trafficshaper | settings | add\_queue |  |
| `POST` | trafficshaper | settings | add\_rule |  |
| `POST` | trafficshaper | settings | del\_pipe | $uuid |
| `POST` | trafficshaper | settings | del\_queue | $uuid |
| `POST` | trafficshaper | settings | del\_rule | $uuid |
| `GET` | trafficshaper | settings | download\_pipes |  |
| `GET` | trafficshaper | settings | download\_queues |  |
| `GET` | trafficshaper | settings | get |  |
| `GET` | trafficshaper | settings | get\_pipe | $uuid=null |
| `GET` | trafficshaper | settings | get\_queue | $uuid=null |
| `GET` | trafficshaper | settings | get\_rule | $uuid=null |
| `GET,POST` | trafficshaper | settings | search\_pipes |  |
| `GET,POST` | trafficshaper | settings | search\_queues |  |
| `GET,POST` | trafficshaper | settings | search\_rules |  |
| `POST` | trafficshaper | settings | set |  |
| `POST` | trafficshaper | settings | set\_pipe | $uuid |
| `POST` | trafficshaper | settings | set\_queue | $uuid |
| `POST` | trafficshaper | settings | set\_rule | $uuid |
| `POST` | trafficshaper | settings | toggle\_pipe | $uuid,$enabled=null |
| `POST` | trafficshaper | settings | toggle\_queue | $uuid,$enabled=null |
| `POST` | trafficshaper | settings | toggle\_rule | $uuid,$enabled=null |
| `POST` | trafficshaper | settings | upload\_pipes |  |
| `POST` | trafficshaper | settings | upload\_queues |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [TrafficShaper.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/TrafficShaper/TrafficShaper.xml) |

---

