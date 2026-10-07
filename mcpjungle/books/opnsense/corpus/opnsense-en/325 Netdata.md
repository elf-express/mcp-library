---
title: "Netdata"
source: https://docs.opnsense.org/development/api/plugins/netdata.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 325
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:24.864Z"
---


# Netdata


*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | netdata | general | get |  |
| `POST` | netdata | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/netdata/src/opnsense/mvc/app/models/OPNsense/Netdata/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | netdata | service | reconfigure |  |
| `POST` | netdata | service | restart |  |
| `POST` | netdata | service | start |  |
| `GET` | netdata | service | status |  |
| `POST` | netdata | service | stop |  |

---

