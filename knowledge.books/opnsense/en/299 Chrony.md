---
title: "Chrony"
source: "https://docs.opnsense.org/development/api/plugins/chrony.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 299
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:12.212Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Caddy](<298 Caddy.md>)　｜　[下一篇：Cicap ➡](<300 Cicap.md>)

# Chrony

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | chrony | general | get |  |
| `POST` | chrony | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net/chrony/src/opnsense/mvc/app/models/OPNsense/Chrony/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | chrony | service | chronyauthdata |  |
| `GET` | chrony | service | chronysources |  |
| `GET` | chrony | service | chronysourcestats |  |
| `GET` | chrony | service | chronytracking |  |
| `POST` | chrony | service | reconfigure |  |
| `POST` | chrony | service | restart |  |
| `POST` | chrony | service | start |  |
| `GET` | chrony | service | status |  |
| `POST` | chrony | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Caddy](<298 Caddy.md>)　｜　[下一篇：Cicap ➡](<300 Cicap.md>)
