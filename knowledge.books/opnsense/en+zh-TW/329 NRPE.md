---
title: "Nrpe｜NRPE"
title_original: "Nrpe"
source: "https://docs.opnsense.org/development/api/plugins/nrpe.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 329
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:28.956Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Nodeexporter](<328 Nodeexporter.md>)　｜　[下一篇：Ntopng ➡](<330 Ntopng.md>)

# Nrpe｜NRPE

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (CommandController.php)*

*資源（CommandController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | nrpe | command<br>指令 | add\_command<br>新增指令 |  |
| `POST` | nrpe | command<br>指令 | del\_command | $uuid |
| `GET` | nrpe | command<br>指令 | get<br>取得 |  |
| `GET` | nrpe | command<br>指令 | get\_command<br>取得\_指令 | $uuid=null |
| `GET,POST` | nrpe | command<br>指令 | search\_command<br>搜尋指令 |  |
| `POST` | nrpe | command<br>指令 | set<br>設定 |  |
| `POST` | nrpe | command<br>指令 | set\_command<br>設定指令 | $uuid |
| `POST` | nrpe | command<br>指令 | toggle\_command<br>切換指令 | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Command.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/nrpe/src/opnsense/mvc/app/models/OPNsense/Nrpe/Command.xml)<br>*模型* [Command.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/nrpe/src/opnsense/mvc/app/models/OPNsense/Nrpe/Command.xml) |

*Resources (GeneralController.php)*

*資源（GeneralController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | nrpe | general<br>一般 | get<br>取得 |  |
| `POST` | nrpe | general<br>通用 | set<br>集合 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/nrpe/src/opnsense/mvc/app/models/OPNsense/Nrpe/General.xml)<br>*模型* [General.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/nrpe/src/opnsense/mvc/app/models/OPNsense/Nrpe/General.xml) |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | nrpe | service<br>服務 | reconfigure<br>重新配置 |  |
| `POST` | nrpe | service<br>服務 | restart<br>重啟 |  |
| `POST` | nrpe | service<br>禮拜 | start<br>開始 |  |
| `GET` | nrpe | service<br>服務 | status<br>狀態 |  |
| `POST` | nrpe | service<br>服務 | stop<br>停止 |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Nodeexporter](<328 Nodeexporter.md>)　｜　[下一篇：Ntopng ➡](<330 Ntopng.md>)
