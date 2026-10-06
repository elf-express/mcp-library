---
title: "Hwprobe"
source: "https://docs.opnsense.org/development/api/plugins/hwprobe.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 316
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:21.304Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Helloworld](<315 Helloworld.md>)　｜　[下一篇：Iperf ➡](<317 Iperf.md>)

# Hwprobe

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | hwprobe | general | get |  |
| `POST` | hwprobe | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/sysutils/hw-probe/src/opnsense/mvc/app/models/OPNsense/Hwprobe/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | hwprobe | service | reconfigure |  |
| `GET` | hwprobe | service | report |  |
| `POST` | hwprobe | service | restart |  |
| `POST` | hwprobe | service | start |  |
| `GET` | hwprobe | service | status |  |
| `POST` | hwprobe | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Helloworld](<315 Helloworld.md>)　｜　[下一篇：Iperf ➡](<317 Iperf.md>)
