---
title: "Tftp"
source: "https://docs.opnsense.org/development/api/plugins/tftp.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 353
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:39.040Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Telegraf](<352 Telegraf.md>)　｜　[下一篇：Tinc ➡](<354 Tinc.md>)

# Tftp

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | tftp | general | get |  |
| `POST` | tftp | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/ftp/tftp/src/opnsense/mvc/app/models/OPNsense/Tftp/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | tftp | service | reconfigure |  |
| `POST` | tftp | service | restart |  |
| `POST` | tftp | service | start |  |
| `GET` | tftp | service | status |  |
| `POST` | tftp | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Telegraf](<352 Telegraf.md>)　｜　[下一篇：Tinc ➡](<354 Tinc.md>)
