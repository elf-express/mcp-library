---
title: "Hostdiscovery"
source: "https://docs.opnsense.org/development/api/core/hostdiscovery.html"
chapter: ["Development Manual","API Reference","Core API"]
order: 278
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:02.606Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Firmware](<277 Firmware.md>)　｜　[下一篇：Ids ➡](<279 Ids.md>)

# Hostdiscovery

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Core API](<000 目錄.md#c-59>)

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | hostdiscovery | service | reconfigure |  |
| `POST` | hostdiscovery | service | restart |  |
| `GET` | hostdiscovery | service | search |  |
| `POST` | hostdiscovery | service | start |  |
| `GET` | hostdiscovery | service | status |  |
| `POST` | hostdiscovery | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | hostdiscovery | settings | get |  |
| `POST` | hostdiscovery | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Hostwatch.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Hostdiscovery/Hostwatch.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Firmware](<277 Firmware.md>)　｜　[下一篇：Ids ➡](<279 Ids.md>)
