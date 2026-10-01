---
title: "Relayd"
source: "https://docs.opnsense.org/development/api/plugins/relayd.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 342
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:33.470Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Redis](<341 Redis.md>)　｜　[下一篇：Rspamd ➡](<343 Rspamd.md>)

# Relayd

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | relayd | service | configtest |  |
| `POST` | relayd | service | reconfigure |  |
| `POST` | relayd | service | restart |  |
| `POST` | relayd | service | start |  |
| `GET` | relayd | service | status |  |
| `POST` | relayd | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | relayd | settings | del | $nodeType=null,$uuid=null |
| `GET` | relayd | settings | dirty |  |
| `GET` | relayd | settings | get | $nodeType=null,$uuid=null |
| `POST` | relayd | settings | search | $nodeType=null |
| `POST` | relayd | settings | set | $nodeType=null,$uuid=null |
| `POST` | relayd | settings | toggle | $nodeType,$uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Relayd.xml](https://github.com/opnsense/plugins/blob/master/net/relayd/src/opnsense/mvc/app/models/OPNsense/Relayd/Relayd.xml) |

*Resources (StatusController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | relayd | status | sum | $wait=0 |
| `POST` | relayd | status | toggle | $nodeType=null,$id=null,$action=null |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Redis](<341 Redis.md>)　｜　[下一篇：Rspamd ➡](<343 Rspamd.md>)
