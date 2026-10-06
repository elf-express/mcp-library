---
title: "Clamav"
source: "https://docs.opnsense.org/development/api/plugins/clamav.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 301
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:12.716Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Cicap](<300 Cicap.md>)　｜　[下一篇：Collectd ➡](<302 Collectd.md>)

# Clamav

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | clamav | general | get |  |
| `POST` | clamav | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/security/clamav/src/opnsense/mvc/app/models/OPNsense/ClamAV/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | clamav | service | freshclam |  |
| `POST` | clamav | service | reconfigure |  |
| `POST` | clamav | service | restart |  |
| `POST` | clamav | service | start |  |
| `GET` | clamav | service | status |  |
| `POST` | clamav | service | stop |  |
| `GET` | clamav | service | version |  |

*Resources (UrlController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | clamav | url | add\_url |  |
| `POST` | clamav | url | del\_url | $uuid |
| `GET` | clamav | url | get |  |
| `GET` | clamav | url | get\_url | $uuid=null |
| `GET,POST` | clamav | url | search\_url |  |
| `POST` | clamav | url | set |  |
| `POST` | clamav | url | set\_url | $uuid |
| `POST` | clamav | url | toggle\_url | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Url.xml](https://github.com/opnsense/plugins/blob/master/security/clamav/src/opnsense/mvc/app/models/OPNsense/ClamAV/Url.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Cicap](<300 Cicap.md>)　｜　[下一篇：Collectd ➡](<302 Collectd.md>)
