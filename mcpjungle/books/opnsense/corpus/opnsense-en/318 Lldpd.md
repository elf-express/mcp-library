---
title: "Lldpd"
source: https://docs.opnsense.org/development/api/plugins/lldpd.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 318
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:21.816Z"
---

# Lldpd

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | lldpd | general | get |  |
| `POST` | lldpd | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/lldpd/src/opnsense/mvc/app/models/OPNsense/Lldpd/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | lldpd | service | neighbor |  |
| `POST` | lldpd | service | reconfigure |  |
| `POST` | lldpd | service | restart |  |
| `POST` | lldpd | service | start |  |
| `GET` | lldpd | service | status |  |
| `POST` | lldpd | service | stop |  |