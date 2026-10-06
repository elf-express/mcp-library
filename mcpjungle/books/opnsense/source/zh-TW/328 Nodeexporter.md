---
title: "Nodeexporter"
source: "https://docs.opnsense.org/development/api/plugins/nodeexporter.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 328
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:26.909Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Nginx](<327 Nginx.md>)　｜　[下一篇：NRPE ➡](<329 NRPE.md>)

# Nodeexporter

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*資源（GeneralController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | 節點導出器 | 通用 | 取得 | |
| `POST` | 節點導出器 | 通用 | 集 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [General.xml](https://github.com/opnsense/plugins/blob/master/sysutils/node_exporter/src/opnsense/mvc/app/models/OPNsense/NodeExporter/General.xml) |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | 節點導出器 | 服務 | 重新配置 | |
| `POST` | nodeexporter | 服務 | 重啟 | |
| `POST` | nodeexporter | 服務 | 啟動 | |
| `GET` | 節點導出器 | 服務 | 狀態 | |
| `POST` | nodeexporter | 服務 | 停止 | |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Nginx](<327 Nginx.md>)　｜　[下一篇：NRPE ➡](<329 NRPE.md>)
