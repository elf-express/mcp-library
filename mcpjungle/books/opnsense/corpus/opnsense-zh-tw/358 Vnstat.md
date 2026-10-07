---
title: "Vnstat"
source: https://docs.opnsense.org/development/api/plugins/vnstat.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 358
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:41.550Z"
---


# Vnstat


*資源（GeneralController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | vnstat | 常規 | 取得 | |
| `POST` | vnstat | 常規 | 設定 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [General.xml](https://github.com/opnsense/plugins/blob/master/net/vnstat/src/opnsense/mvc/app/models/OPNsense/Vnstat/General.xml) |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | vnstat | 禮拜 | 每日 | |
| `GET` | vnstat | 服務 | 按小時計費 | |
| `GET` | vnstat | 服務 | 月度 | |
| `POST` | vnstat | 服務 | 重新配置 | |
| `GET` | vnstat | service | resetdb | |
| `POST` | vnstat | 服務 | 重啟 | |
| `POST` | vnstat | 服務 | 啟動 | |
| `GET` | vnstat | 服務 | 狀態 | |
| `POST` | vnstat | 服務 | 停止 | |
| `GET` | vnstat | 服務 | 年度 | |

---

