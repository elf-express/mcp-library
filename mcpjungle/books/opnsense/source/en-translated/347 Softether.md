---
title: "Softether"
source: "https://docs.opnsense.org/development/api/plugins/softether.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 347
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:36.484Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Smart](<346 Smart.md>)　｜　[下一篇：Sslh ➡](<348 Sslh.md>)

# Softether

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | softether | general | get |  |
| `POST` | softether | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/security/softether/src/opnsense/mvc/app/models/OPNsense/Softether/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | softether | service | reconfigure |  |
| `POST` | softether | service | restart |  |
| `POST` | softether | service | start |  |
| `GET` | softether | service | status |  |
| `POST` | softether | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Smart](<346 Smart.md>)　｜　[下一篇：Sslh ➡](<348 Sslh.md>)
