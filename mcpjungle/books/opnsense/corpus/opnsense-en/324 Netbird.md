---
title: "Netbird"
source: https://docs.opnsense.org/development/api/plugins/netbird.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 324
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:25.378Z"
---


# Netbird


*Resources (AuthenticationController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | netbird | authentication | down |  |
| `GET` | netbird | authentication | get |  |
| `POST` | netbird | authentication | set |  |
| `GET` | netbird | authentication | up |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Authentication.xml](https://github.com/opnsense/plugins/blob/master/security/netbird/src/opnsense/mvc/app/models/OPNsense/Netbird/Authentication.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | netbird | service | reconfigure |  |
| `POST` | netbird | service | restart |  |
| `POST` | netbird | service | start |  |
| `GET` | netbird | service | status |  |
| `POST` | netbird | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | netbird | settings | get |  |
| `POST` | netbird | settings | set |  |
| `GET` | netbird | settings | sync |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Settings.xml](https://github.com/opnsense/plugins/blob/master/security/netbird/src/opnsense/mvc/app/models/OPNsense/Netbird/Settings.xml) |

*Resources (StatusController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | netbird | status | get |  |
| `POST` | netbird | status | set |  |
| `GET` | netbird | status | status |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Status.xml](https://github.com/opnsense/plugins/blob/master/security/netbird/src/opnsense/mvc/app/models/OPNsense/Netbird/Status.xml) |

---

