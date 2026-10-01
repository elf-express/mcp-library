---
title: "Nodeexporter"
source: "https://docs.opnsense.org/development/api/plugins/nodeexporter.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 328
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:26.909Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Nginx](<327 Nginx.md>)　｜　[下一篇：Nrpe｜NRPE ➡](<329 NRPE.md>)

# Nodeexporter

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

*資源（GeneralController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | nodeexporter<br>節點導出器 | general<br>通用 | get<br>取得 |  |
| `POST` | nodeexporter<br>節點導出器 | general<br>通用 | set<br>集 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/sysutils/node_exporter/src/opnsense/mvc/app/models/OPNsense/NodeExporter/General.xml)<br>*模型* [General.xml](https://github.com/opnsense/plugins/blob/master/sysutils/node_exporter/src/opnsense/mvc/app/models/OPNsense/NodeExporter/General.xml) |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | nodeexporter<br>節點導出器 | service<br>服務 | reconfigure<br>重新配置 |  |
| `POST` | nodeexporter | service<br>服務 | restart<br>重啟 |  |
| `POST` | nodeexporter | service<br>服務 | start<br>啟動 |  |
| `GET` | nodeexporter<br>節點導出器 | service<br>服務 | status<br>狀態 |  |
| `POST` | nodeexporter | service<br>服務 | stop<br>停止 |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Nginx](<327 Nginx.md>)　｜　[下一篇：Nrpe｜NRPE ➡](<329 NRPE.md>)
