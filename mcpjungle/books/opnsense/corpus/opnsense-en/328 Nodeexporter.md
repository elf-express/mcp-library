---
title: "Nodeexporter"
source: https://docs.opnsense.org/development/api/plugins/nodeexporter.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 328
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:26.909Z"
---


# Nodeexporter


*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | nodeexporter | general | get |  |
| `POST` | nodeexporter | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/sysutils/node_exporter/src/opnsense/mvc/app/models/OPNsense/NodeExporter/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | nodeexporter | service | reconfigure |  |
| `POST` | nodeexporter | service | restart |  |
| `POST` | nodeexporter | service | start |  |
| `GET` | nodeexporter | service | status |  |
| `POST` | nodeexporter | service | stop |  |

---

