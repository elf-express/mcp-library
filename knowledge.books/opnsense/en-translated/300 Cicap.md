---
title: "Cicap"
source: "https://docs.opnsense.org/development/api/plugins/cicap.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 300
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:13.221Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Chrony](<299 Chrony.md>)　｜　[下一篇：Clamav ➡](<301 Clamav.md>)

# Cicap

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (AntivirusController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | cicap | antivirus | get |  |
| `POST` | cicap | antivirus | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Antivirus.xml](https://github.com/opnsense/plugins/blob/master/www/c-icap/src/opnsense/mvc/app/models/OPNsense/CICAP/Antivirus.xml) |

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | cicap | general | get |  |
| `POST` | cicap | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/www/c-icap/src/opnsense/mvc/app/models/OPNsense/CICAP/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | cicap | service | checkclamav |  |
| `POST` | cicap | service | reconfigure |  |
| `POST` | cicap | service | restart |  |
| `POST` | cicap | service | start |  |
| `GET` | cicap | service | status |  |
| `POST` | cicap | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Chrony](<299 Chrony.md>)　｜　[下一篇：Clamav ➡](<301 Clamav.md>)
