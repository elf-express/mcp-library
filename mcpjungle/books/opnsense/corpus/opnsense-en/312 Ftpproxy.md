---
title: "Ftpproxy"
source: https://docs.opnsense.org/development/api/plugins/ftpproxy.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 312
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:18.269Z"
---


# Ftpproxy


*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | ftpproxy | service | config |  |
| `GET` | ftpproxy | service | reload |  |
| `GET` | ftpproxy | service | restart | $uuid |
| `GET` | ftpproxy | service | start | $uuid |
| `GET` | ftpproxy | service | status | $uuid |
| `GET` | ftpproxy | service | stop | $uuid |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ftpproxy | settings | add\_proxy |  |
| `POST` | ftpproxy | settings | del\_proxy | $uuid |
| `GET` | ftpproxy | settings | get\_proxy | $uuid=null |
| `GET` | ftpproxy | settings | search\_proxy |  |
| `POST` | ftpproxy | settings | set\_proxy | $uuid |
| `POST` | ftpproxy | settings | toggle\_proxy | $uuid |

---

