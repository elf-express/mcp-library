---
title: "Vnstat"
source: https://docs.opnsense.org/development/api/plugins/vnstat.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 358
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:41.550Z"
---

# Vnstat

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | vnstat | general | get |  |
| `POST` | vnstat | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net/vnstat/src/opnsense/mvc/app/models/OPNsense/Vnstat/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | vnstat | service | daily |  |
| `GET` | vnstat | service | hourly |  |
| `GET` | vnstat | service | monthly |  |
| `POST` | vnstat | service | reconfigure |  |
| `GET` | vnstat | service | resetdb |  |
| `POST` | vnstat | service | restart |  |
| `POST` | vnstat | service | start |  |
| `GET` | vnstat | service | status |  |
| `POST` | vnstat | service | stop |  |
| `GET` | vnstat | service | yearly |  |