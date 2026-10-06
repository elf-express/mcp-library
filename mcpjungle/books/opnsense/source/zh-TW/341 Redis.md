---
title: "Redis"
source: "https://docs.opnsense.org/development/api/plugins/redis.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 341
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:35.001Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：雷達代理](<340 雷達代理.md>)　｜　[下一篇：中繼 ➡](<342 中繼.md>)

# Redis

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | redis | 服務 | 重新配置 | |
| `GET` | redis | 服務 | resetdb | |
| `POST` | redis | 服務 | 重啟 | |
| `POST` | redis | 服務 | 啟動 | |
| `GET` | redis | 服務 | 狀態 | |
| `POST` | redis | 服務 | 停止 | |

*資源（SettingsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | redis | 設定 | 取得 | |
| `POST` | redis | 設定 | 設定 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Redis.xml](https://github.com/opnsense/plugins/blob/master/databases/redis/src/opnsense/mvc/app/models/OPNsense/Redis/Redis.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：雷達代理](<340 雷達代理.md>)　｜　[下一篇：中繼 ➡](<342 中繼.md>)
