---
title: "Sslh"
source: "https://docs.opnsense.org/development/api/plugins/sslh.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 348
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:37.014Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Softether](<347 Softether.md>)　｜　[下一篇：Stunnel ➡](<349 Stunnel.md>)

# Sslh

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | sslh | service | reconfigure |  |
| `POST` | sslh | service | restart |  |
| `POST` | sslh | service | start |  |
| `GET` | sslh | service | status |  |
| `POST` | sslh | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | sslh | settings | get |  |
| `GET` | sslh | settings | index |  |
| `POST` | sslh | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Settings.xml](https://github.com/opnsense/plugins/blob/master/net/sslh/src/opnsense/mvc/app/models/OPNsense/Sslh/Settings.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Softether](<347 Softether.md>)　｜　[下一篇：Stunnel ➡](<349 Stunnel.md>)
