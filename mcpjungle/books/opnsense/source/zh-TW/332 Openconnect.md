---
title: "Openconnect"
source: "https://docs.opnsense.org/development/api/plugins/openconnect.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 332
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:28.437Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：堅果](<331 堅果.md>)　｜　[下一篇：Postfix ➡](<333 Postfix.md>)

# Openconnect

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*資源（GeneralController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | openconnect | 常規 | 取得 | |
| `POST` | openconnect | 一般 | 設定 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [General.xml](https://github.com/opnsense/plugins/blob/master/security/openconnect/src/opnsense/mvc/app/models/OPNsense/Openconnect/General.xml) |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | openconnect | 服務 | 重新設定 | |
| `POST` | openconnect | 服務 | 重啟 | |
| `POST` | openconnect | 服務 | 啟動 | |
| `GET` | openconnect | 服務 | 狀態 | |
| `POST` | openconnect | 服務 | 停止 | |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：堅果](<331 堅果.md>)　｜　[下一篇：Postfix ➡](<333 Postfix.md>)
