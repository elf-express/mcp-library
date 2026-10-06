---
title: "Ntopng"
source: "https://docs.opnsense.org/development/api/plugins/ntopng.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 330
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:27.413Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：NRPE](<329 NRPE.md>)　｜　[下一篇：堅果 ➡](<331 堅果.md>)

# Ntopng

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*資源（GeneralController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | ntopng | 常規 | 取得 | |
| `POST` | ntopng | 通用 | 集 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [General.xml](https://github.com/opnsense/plugins/blob/master/net/ntopng/src/opnsense/mvc/app/models/OPNsense/Ntopng/General.xml) |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | ntopng | 服務 | checkredis | |
| `POST` | ntopng | 服務 | 重新配置 | |
| `POST` | ntopng | 服務 | 重啟 | |
| `POST` | ntopng | 服務 | 開始 | |
| `GET` | ntopng | 服務 | 狀態 | |
| `POST` | ntopng | 服務 | 停止 | |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：NRPE](<329 NRPE.md>)　｜　[下一篇：堅果 ➡](<331 堅果.md>)
