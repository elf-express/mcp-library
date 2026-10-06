---
title: "Openconnect"
source: "https://docs.opnsense.org/development/api/plugins/openconnect.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 332
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:28.437Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Nut](<331 Nut.md>)　｜　[下一篇：Postfix ➡](<333 Postfix.md>)

# Openconnect

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | openconnect | general | get |  |
| `POST` | openconnect | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/security/openconnect/src/opnsense/mvc/app/models/OPNsense/Openconnect/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | openconnect | service | reconfigure |  |
| `POST` | openconnect | service | restart |  |
| `POST` | openconnect | service | start |  |
| `GET` | openconnect | service | status |  |
| `POST` | openconnect | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Nut](<331 Nut.md>)　｜　[下一篇：Postfix ➡](<333 Postfix.md>)
