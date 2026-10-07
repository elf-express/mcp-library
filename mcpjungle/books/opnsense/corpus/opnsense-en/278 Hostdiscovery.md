---
title: "Hostdiscovery"
source: https://docs.opnsense.org/development/api/core/hostdiscovery.html
chapter: ["Development Manual","API Reference","Core API"]
order: 278
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:02.606Z"
---


# Hostdiscovery


*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | hostdiscovery | service | reconfigure |  |
| `POST` | hostdiscovery | service | restart |  |
| `GET` | hostdiscovery | service | search |  |
| `POST` | hostdiscovery | service | start |  |
| `GET` | hostdiscovery | service | status |  |
| `POST` | hostdiscovery | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | hostdiscovery | settings | get |  |
| `POST` | hostdiscovery | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Hostwatch.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Hostdiscovery/Hostwatch.xml) |

---

