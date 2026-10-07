---
title: "Radvd"
source: https://docs.opnsense.org/development/api/core/radvd.html
chapter: ["Development Manual","API Reference","Core API"]
order: 286
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:05.643Z"
---

# Radvd

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | radvd | service | reconfigure |  |
| `POST` | radvd | service | restart |  |
| `POST` | radvd | service | start |  |
| `GET` | radvd | service | status |  |
| `POST` | radvd | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | radvd | settings | add\_entry |  |
| `POST` | radvd | settings | del\_entry | $uuid |
| `GET` | radvd | settings | get |  |
| `GET` | radvd | settings | get\_entry | $uuid=null |
| `GET,POST` | radvd | settings | search\_entry |  |
| `POST` | radvd | settings | set |  |
| `POST` | radvd | settings | set\_entry | $uuid |
| `POST` | radvd | settings | toggle\_entry | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Radvd.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Radvd/Radvd.xml) |