---
title: "Lldpd"
source: "https://docs.opnsense.org/development/api/plugins/lldpd.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 318
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:21.816Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Iperf](<317 Iperf.md>)　｜　[下一篇：Maltrail ➡](<319 Maltrail.md>)

# Lldpd

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | lldpd | general | get |  |
| `POST` | lldpd | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/lldpd/src/opnsense/mvc/app/models/OPNsense/Lldpd/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | lldpd | service | neighbor |  |
| `POST` | lldpd | service | reconfigure |  |
| `POST` | lldpd | service | restart |  |
| `POST` | lldpd | service | start |  |
| `GET` | lldpd | service | status |  |
| `POST` | lldpd | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Iperf](<317 Iperf.md>)　｜　[下一篇：Maltrail ➡](<319 Maltrail.md>)
