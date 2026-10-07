---
title: "Maltrail"
source: https://docs.opnsense.org/development/api/plugins/maltrail.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 319
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:22.327Z"
---

# Maltrail

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | maltrail | general | get |  |
| `POST` | maltrail | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/security/maltrail/src/opnsense/mvc/app/models/OPNsense/Maltrail/General.xml) |

*Resources (SensorController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | maltrail | sensor | get |  |
| `POST` | maltrail | sensor | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Sensor.xml](https://github.com/opnsense/plugins/blob/master/security/maltrail/src/opnsense/mvc/app/models/OPNsense/Maltrail/Sensor.xml) |

*Resources (ServerController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | maltrail | server | get |  |
| `POST` | maltrail | server | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Server.xml](https://github.com/opnsense/plugins/blob/master/security/maltrail/src/opnsense/mvc/app/models/OPNsense/Maltrail/Server.xml) |

*Service (ServerserviceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | maltrail | serverservice | reconfigure |  |
| `POST` | maltrail | serverservice | restart |  |
| `POST` | maltrail | serverservice | start |  |
| `GET` | maltrail | serverservice | status |  |
| `POST` | maltrail | serverservice | stop |  |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | maltrail | service | reconfigure |  |
| `POST` | maltrail | service | restart |  |
| `POST` | maltrail | service | start |  |
| `GET` | maltrail | service | status |  |
| `POST` | maltrail | service | stop |  |