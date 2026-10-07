---
title: "Turnserver"
source: https://docs.opnsense.org/development/api/plugins/turnserver.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 356
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:41.041Z"
---

# Turnserver

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | turnserver | service | reconfigure |  |
| `POST` | turnserver | service | restart |  |
| `POST` | turnserver | service | start |  |
| `GET` | turnserver | service | status |  |
| `POST` | turnserver | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | turnserver | settings | get |  |
| `POST` | turnserver | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Turnserver.xml](https://github.com/opnsense/plugins/blob/master/net/turnserver/src/opnsense/mvc/app/models/OPNsense/Turnserver/Turnserver.xml) |