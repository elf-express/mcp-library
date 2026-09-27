---
title: "Ndproxy"
source: "https://docs.opnsense.org/development/api/plugins/ndproxy.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 323
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:23.845Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Ndpproxy](<322 Ndpproxy.md>)　｜　[下一篇：Netbird ➡](<324 Netbird.md>)

# Ndproxy

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | ndproxy | general | get |  |
| `POST` | ndproxy | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Ndproxy.xml](https://github.com/opnsense/plugins/blob/master/net/ndproxy/src/opnsense/mvc/app/models/OPNsense/Ndproxy/Ndproxy.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ndproxy | service | reconfigure |  |
| `POST` | ndproxy | service | restart |  |
| `POST` | ndproxy | service | start |  |
| `GET` | ndproxy | service | status |  |
| `POST` | ndproxy | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Ndpproxy](<322 Ndpproxy.md>)　｜　[下一篇：Netbird ➡](<324 Netbird.md>)
