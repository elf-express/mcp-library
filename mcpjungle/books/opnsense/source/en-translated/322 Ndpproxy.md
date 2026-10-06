---
title: "Ndpproxy"
source: "https://docs.opnsense.org/development/api/plugins/ndpproxy.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 322
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:23.345Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Muninnode](<321 Muninnode.md>)　｜　[下一篇：Ndproxy ➡](<323 Ndproxy.md>)

# Ndpproxy

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ndpproxy | general | add\_alias |  |
| `POST` | ndpproxy | general | del\_alias | $uuid |
| `GET` | ndpproxy | general | get |  |
| `GET` | ndpproxy | general | get\_alias | $uuid=null |
| `GET,POST` | ndpproxy | general | search\_alias |  |
| `POST` | ndpproxy | general | set |  |
| `POST` | ndpproxy | general | set\_alias | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [NdpProxy.xml](https://github.com/opnsense/plugins/blob/master/net/ndp-proxy-go/src/opnsense/mvc/app/models/OPNsense/NdpProxy/NdpProxy.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ndpproxy | service | reconfigure |  |
| `POST` | ndpproxy | service | restart |  |
| `POST` | ndpproxy | service | start |  |
| `GET` | ndpproxy | service | status |  |
| `POST` | ndpproxy | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Muninnode](<321 Muninnode.md>)　｜　[下一篇：Ndproxy ➡](<323 Ndproxy.md>)
