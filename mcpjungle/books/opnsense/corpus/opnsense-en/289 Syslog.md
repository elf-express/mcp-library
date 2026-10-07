---
title: "Syslog"
source: https://docs.opnsense.org/development/api/core/syslog.html
chapter: ["Development Manual","API Reference","Core API"]
order: 289
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:07.155Z"
---

# Syslog

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | syslog | service | reconfigure |  |
| `POST` | syslog | service | reset |  |
| `POST` | syslog | service | restart |  |
| `POST` | syslog | service | start |  |
| `GET` | syslog | service | stats |  |
| `GET` | syslog | service | status |  |
| `POST` | syslog | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | syslog | settings | add\_destination |  |
| `POST` | syslog | settings | del\_destination | $uuid |
| `GET` | syslog | settings | get |  |
| `GET` | syslog | settings | get\_destination | $uuid=null |
| `GET,POST` | syslog | settings | search\_destinations |  |
| `POST` | syslog | settings | set |  |
| `POST` | syslog | settings | set\_destination | $uuid |
| `POST` | syslog | settings | toggle\_destination | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Syslog.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Syslog/Syslog.xml) |