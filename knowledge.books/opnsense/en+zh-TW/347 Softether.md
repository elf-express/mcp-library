---
title: "Softether"
source: "https://docs.opnsense.org/development/api/plugins/softether.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 347
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:36.484Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Smart｜聰明的](<346 聰明的.md>)　｜　[下一篇：Sslh ➡](<348 Sslh.md>)

# Softether

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

*資源（GeneralController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | softether<br>軟以太 | general<br>通用 | get<br>取得 |  |
| `POST` | softether<br>軟以太 | general<br>通用 | set<br>集 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/security/softether/src/opnsense/mvc/app/models/OPNsense/Softether/General.xml)<br>*模型* [General.xml](https://github.com/opnsense/plugins/blob/master/security/softether/src/opnsense/mvc/app/models/OPNsense/Softether/General.xml) |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | softether<br>軟以太坊 | service<br>服務 | reconfigure<br>重新配置 |  |
| `POST` | softether<br>軟以太 | service<br>服務 | restart<br>重啟 |  |
| `POST` | softether<br>軟以太 | service<br>服務 | start<br>啟動 |  |
| `GET` | softether<br>軟以太 | service<br>服務 | status<br>狀態 |  |
| `POST` | softether<br>軟以太 | service<br>服務 | stop<br>停止 |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Smart｜聰明的](<346 聰明的.md>)　｜　[下一篇：Sslh ➡](<348 Sslh.md>)
