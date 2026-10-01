---
title: "Redis"
source: "https://docs.opnsense.org/development/api/plugins/redis.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 341
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:35.001Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Radsecproxy｜雷達代理](<340 雷達代理.md>)　｜　[下一篇：Relayd｜中繼 ➡](<342 中繼.md>)

# Redis

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | redis | service<br>服務 | reconfigure<br>重新配置 |  |
| `GET` | redis | service<br>服務 | resetdb |  |
| `POST` | redis | service<br>服務 | restart<br>重啟 |  |
| `POST` | redis | service<br>服務 | start<br>啟動 |  |
| `GET` | redis | service<br>服務 | status<br>狀態 |  |
| `POST` | redis | service<br>服務 | stop<br>停止 |  |

*Resources (SettingsController.php)*

*資源（SettingsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | redis | settings<br>設定 | get<br>取得 |  |
| `POST` | redis | settings<br>設定 | set<br>設定 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Redis.xml](https://github.com/opnsense/plugins/blob/master/databases/redis/src/opnsense/mvc/app/models/OPNsense/Redis/Redis.xml)<br>*模型* [Redis.xml](https://github.com/opnsense/plugins/blob/master/databases/redis/src/opnsense/mvc/app/models/OPNsense/Redis/Redis.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Radsecproxy｜雷達代理](<340 雷達代理.md>)　｜　[下一篇：Relayd｜中繼 ➡](<342 中繼.md>)
