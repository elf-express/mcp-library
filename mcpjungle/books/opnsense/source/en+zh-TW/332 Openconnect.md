---
title: "Openconnect"
source: "https://docs.opnsense.org/development/api/plugins/openconnect.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 332
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:28.437Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Nut｜堅果](<331 堅果.md>)　｜　[下一篇：Postfix ➡](<333 Postfix.md>)

# Openconnect

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

*資源（GeneralController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | openconnect | general<br>常規 | get<br>取得 |  |
| `POST` | openconnect | general<br>一般 | set<br>設定 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/security/openconnect/src/opnsense/mvc/app/models/OPNsense/Openconnect/General.xml)<br>*模型* [General.xml](https://github.com/opnsense/plugins/blob/master/security/openconnect/src/opnsense/mvc/app/models/OPNsense/Openconnect/General.xml) |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | openconnect | service<br>服務 | reconfigure<br>重新設定 |  |
| `POST` | openconnect | service<br>服務 | restart<br>重啟 |  |
| `POST` | openconnect | service<br>服務 | start<br>啟動 |  |
| `GET` | openconnect | service<br>服務 | status<br>狀態 |  |
| `POST` | openconnect | service<br>服務 | stop<br>停止 |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Nut｜堅果](<331 堅果.md>)　｜　[下一篇：Postfix ➡](<333 Postfix.md>)
