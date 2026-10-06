---
title: "Ntopng"
source: "https://docs.opnsense.org/development/api/plugins/ntopng.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 330
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:27.413Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Nrpe](<329 Nrpe.md>)　｜　[下一篇：Nut ➡](<331 Nut.md>)

# Ntopng

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | ntopng | general | get |  |
| `POST` | ntopng | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net/ntopng/src/opnsense/mvc/app/models/OPNsense/Ntopng/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | ntopng | service | checkredis |  |
| `POST` | ntopng | service | reconfigure |  |
| `POST` | ntopng | service | restart |  |
| `POST` | ntopng | service | start |  |
| `GET` | ntopng | service | status |  |
| `POST` | ntopng | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Nrpe](<329 Nrpe.md>)　｜　[下一篇：Nut ➡](<331 Nut.md>)
