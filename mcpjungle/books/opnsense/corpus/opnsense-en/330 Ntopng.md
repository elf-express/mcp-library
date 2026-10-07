---
title: "Ntopng"
source: https://docs.opnsense.org/development/api/plugins/ntopng.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 330
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:27.413Z"
---

# Ntopng

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | ntopng | general | get |  |
| `POST` | ntopng | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net/ntopng/src/opnsense/mvc/app/models/OPNsense/Ntopng/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | ntopng | service | checkredis |  |
| `POST` | ntopng | service | reconfigure |  |
| `POST` | ntopng | service | restart |  |
| `POST` | ntopng | service | start |  |
| `GET` | ntopng | service | status |  |
| `POST` | ntopng | service | stop |  |