---
title: "Beats"
source: "https://docs.opnsense.org/development/api/plugins/beats.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 296
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:10.682Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Apcupsd](<295 Apcupsd.md>)　｜　[下一篇：Bind ➡](<297 Bind.md>)

# Beats

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | beats | service | reconfigure |  |
| `POST` | beats | service | restart |  |
| `POST` | beats | service | start |  |
| `GET` | beats | service | status |  |
| `POST` | beats | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | beats | settings | get |  |
| `POST` | beats | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Filebeat.xml](https://github.com/opnsense/plugins/blob/master/sysutils/beats/src/opnsense/mvc/app/models/OPNsense/Beats/Filebeat.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Apcupsd](<295 Apcupsd.md>)　｜　[下一篇：Bind ➡](<297 Bind.md>)
