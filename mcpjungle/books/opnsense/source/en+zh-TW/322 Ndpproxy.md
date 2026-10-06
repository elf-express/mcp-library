---
title: "Ndpproxy"
source: "https://docs.opnsense.org/development/api/plugins/ndpproxy.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 322
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:23.345Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Muninnode｜穆尼諾德](<321 穆尼諾德.md>)　｜　[下一篇：Ndproxy｜ND代理 ➡](<323 ND代理.md>)

# Ndpproxy

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

*資源（GeneralController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | ndpproxy | general | add\_alias<br>add\_a​​lias |  |
| `POST` | ndpproxy | general | del\_alias | $uuid |
| `GET` | ndpproxy | general<br>常規 | get<br>取得 |  |
| `GET` | ndpproxy | general | get\_alias | $uuid=null |
| `GET,POST` | ndpproxy | general<br>常規 | search\_alias<br>搜尋別名 |  |
| `POST` | ndpproxy | general<br>通用 | set<br>集 |  |
| `POST` | ndpproxy | general | set\_alias | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [NdpProxy.xml](https://github.com/opnsense/plugins/blob/master/net/ndp-proxy-go/src/opnsense/mvc/app/models/OPNsense/NdpProxy/NdpProxy.xml)<br>*模型* [NdpProxy.xml](https://github.com/opnsense/plugins/blob/master/net/ndp-proxy-go/src/opnsense/mvc/app/models/OPNsense/NdpProxy/NdpProxy.xml) |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | ndpproxy | service<br>服務 | reconfigure<br>重新配置 |  |
| `POST` | ndpproxy | service<br>服務 | restart<br>重啟 |  |
| `POST` | ndpproxy | service<br>服務 | start<br>啟動 |  |
| `GET` | ndpproxy | service<br>服務 | status<br>狀態 |  |
| `POST` | ndpproxy | service<br>服務 | stop<br>停止 |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Muninnode｜穆尼諾德](<321 穆尼諾德.md>)　｜　[下一篇：Ndproxy｜ND代理 ➡](<323 ND代理.md>)
