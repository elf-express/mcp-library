---
title: "Muninnode"
source: https://docs.opnsense.org/development/api/plugins/muninnode.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 321
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:22.836Z"
---

# Muninnode

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | muninnode | general | get |  |
| `POST` | muninnode | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/sysutils/munin-node/src/opnsense/mvc/app/models/OPNsense/Muninnode/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | muninnode | service | reconfigure |  |
| `POST` | muninnode | service | restart |  |
| `POST` | muninnode | service | start |  |
| `GET` | muninnode | service | status |  |
| `POST` | muninnode | service | stop |  |