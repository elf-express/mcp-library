---
title: "Iperf"
source: "https://docs.opnsense.org/development/api/plugins/iperf.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 317
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:20.808Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Hwprobe](<316 Hwprobe.md>)　｜　[下一篇：Lldpd ➡](<318 Lldpd.md>)

# Iperf

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

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

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Hwprobe](<316 Hwprobe.md>)　｜　[下一篇：Lldpd ➡](<318 Lldpd.md>)
