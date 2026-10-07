---
title: "Iperf"
source: https://docs.opnsense.org/development/api/plugins/iperf.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 317
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:20.808Z"
---


# Iperf


*Resources (InstanceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | iperf | instance | get |  |
| `GET` | iperf | instance | query |  |
| `POST` | iperf | instance | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [FakeInstance.xml](https://github.com/opnsense/plugins/blob/master/benchmarks/iperf/src/opnsense/mvc/app/models/OPNsense/iperf/FakeInstance.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | iperf | service | restart |  |
| `GET` | iperf | service | start |  |
| `GET` | iperf | service | status |  |
| `GET` | iperf | service | stop |  |

---

