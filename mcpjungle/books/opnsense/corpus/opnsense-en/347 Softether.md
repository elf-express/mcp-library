---
title: "Softether"
source: https://docs.opnsense.org/development/api/plugins/softether.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 347
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:36.484Z"
---

# Softether

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | softether | general | get |  |
| `POST` | softether | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/security/softether/src/opnsense/mvc/app/models/OPNsense/Softether/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | softether | service | reconfigure |  |
| `POST` | softether | service | restart |  |
| `POST` | softether | service | start |  |
| `GET` | softether | service | status |  |
| `POST` | softether | service | stop |  |