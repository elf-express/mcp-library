---
title: "Rspamd"
source: "https://docs.opnsense.org/development/api/plugins/rspamd.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 343
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:33.997Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Relayd](<342 Relayd.md>)　｜　[下一篇：Shadowsocks ➡](<344 Shadowsocks.md>)

# Rspamd

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | rspamd | service | reconfigure |  |
| `POST` | rspamd | service | restart |  |
| `POST` | rspamd | service | start |  |
| `GET` | rspamd | service | status |  |
| `POST` | rspamd | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | rspamd | settings | get |  |
| `POST` | rspamd | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [RSpamd.xml](https://github.com/opnsense/plugins/blob/master/mail/rspamd/src/opnsense/mvc/app/models/OPNsense/Rspamd/RSpamd.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Relayd](<342 Relayd.md>)　｜　[下一篇：Shadowsocks ➡](<344 Shadowsocks.md>)
