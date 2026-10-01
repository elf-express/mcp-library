---
title: "Vnstat"
source: "https://docs.opnsense.org/development/api/plugins/vnstat.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 358
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:41.550Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Udp廣播中繼](<357 Udp廣播中繼.md>)　｜　[下一篇：瓦祖哈根特 ➡](<359 瓦祖哈根特.md>)

# Vnstat

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

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

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Udp廣播中繼](<357 Udp廣播中繼.md>)　｜　[下一篇：瓦祖哈根特 ➡](<359 瓦祖哈根特.md>)
