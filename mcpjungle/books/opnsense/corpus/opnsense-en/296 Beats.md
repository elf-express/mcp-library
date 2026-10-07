---
title: "Beats"
source: https://docs.opnsense.org/development/api/plugins/beats.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 296
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:10.682Z"
---


# Beats


*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | beats | service | reconfigure |  |
| `POST` | beats | service | restart |  |
| `POST` | beats | service | start |  |
| `GET` | beats | service | status |  |
| `POST` | beats | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | beats | settings | get |  |
| `POST` | beats | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Filebeat.xml](https://github.com/opnsense/plugins/blob/master/sysutils/beats/src/opnsense/mvc/app/models/OPNsense/Beats/Filebeat.xml) |

---

