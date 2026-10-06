---
title: "Muninnode"
source: "https://docs.opnsense.org/development/api/plugins/muninnode.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 321
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:22.836Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Mdnsrepeater](<320 Mdnsrepeater.md>)　｜　[下一篇：Ndpproxy ➡](<322 Ndpproxy.md>)

# Muninnode

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | muninnode | general | get |  |
| `POST` | muninnode | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/sysutils/munin-node/src/opnsense/mvc/app/models/OPNsense/Muninnode/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | muninnode | service | reconfigure |  |
| `POST` | muninnode | service | restart |  |
| `POST` | muninnode | service | start |  |
| `GET` | muninnode | service | status |  |
| `POST` | muninnode | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Mdnsrepeater](<320 Mdnsrepeater.md>)　｜　[下一篇：Ndpproxy ➡](<322 Ndpproxy.md>)
