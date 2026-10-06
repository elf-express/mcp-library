---
title: "Vnstat"
source: "https://docs.opnsense.org/development/api/plugins/vnstat.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 358
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:41.550Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Udpbroadcastrelay｜Udp廣播中繼](<357 Udp廣播中繼.md>)　｜　[下一篇：Wazuhagent｜瓦祖哈根特 ➡](<359 瓦祖哈根特.md>)

# Vnstat

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

*資源（GeneralController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | vnstat | general<br>常規 | get<br>取得 |  |
| `POST` | vnstat | general<br>常規 | set<br>設定 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net/vnstat/src/opnsense/mvc/app/models/OPNsense/Vnstat/General.xml)<br>*模型* [General.xml](https://github.com/opnsense/plugins/blob/master/net/vnstat/src/opnsense/mvc/app/models/OPNsense/Vnstat/General.xml) |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | vnstat | service<br>禮拜 | daily<br>每日 |  |
| `GET` | vnstat | service<br>服務 | hourly<br>按小時計費 |  |
| `GET` | vnstat | service<br>服務 | monthly<br>月度 |  |
| `POST` | vnstat | service<br>服務 | reconfigure<br>重新配置 |  |
| `GET` | vnstat | service | resetdb |  |
| `POST` | vnstat | service<br>服務 | restart<br>重啟 |  |
| `POST` | vnstat | service<br>服務 | start<br>啟動 |  |
| `GET` | vnstat | service<br>服務 | status<br>狀態 |  |
| `POST` | vnstat | service<br>服務 | stop<br>停止 |  |
| `GET` | vnstat | service<br>服務 | yearly<br>年度 |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Udpbroadcastrelay｜Udp廣播中繼](<357 Udp廣播中繼.md>)　｜　[下一篇：Wazuhagent｜瓦祖哈根特 ➡](<359 瓦祖哈根特.md>)
