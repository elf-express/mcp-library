---
title: "Cicap"
source: https://docs.opnsense.org/development/api/plugins/cicap.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 300
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:13.221Z"
---


# Cicap


*Resources (AntivirusController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | cicap | antivirus | get |  |
| `POST` | cicap | antivirus | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Antivirus.xml](https://github.com/opnsense/plugins/blob/master/www/c-icap/src/opnsense/mvc/app/models/OPNsense/CICAP/Antivirus.xml) |

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | cicap | general | get |  |
| `POST` | cicap | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/www/c-icap/src/opnsense/mvc/app/models/OPNsense/CICAP/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | cicap | service | checkclamav |  |
| `POST` | cicap | service | reconfigure |  |
| `POST` | cicap | service | restart |  |
| `POST` | cicap | service | start |  |
| `GET` | cicap | service | status |  |
| `POST` | cicap | service | stop |  |

---

