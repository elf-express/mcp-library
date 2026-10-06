---
title: "Rspamd"
source: "https://docs.opnsense.org/development/api/plugins/rspamd.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 343
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:33.997Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：中繼](<342 中繼.md>)　｜　[下一篇：影子襪 ➡](<344 影子襪.md>)

# Rspamd

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | rspamd | 服務 | 重新配置 | |
| `POST` | rspamd | 服務 | 重啟 | |
| `POST` | rspamd | 服務 | 開始 | |
| `GET` | rspamd | 服務 | 狀態 | |
| `POST` | rspamd | 服務 | 停止 | |

*資源（SettingsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | rspamd | 設定 | 取得 | |
| `POST` | rspamd | 設定 | 設定 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [RSpamd.xml](https://github.com/opnsense/plugins/blob/master/mail/rspamd/src/opnsense/mvc/app/models/OPNsense/Rspamd/RSpamd.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：中繼](<342 中繼.md>)　｜　[下一篇：影子襪 ➡](<344 影子襪.md>)
