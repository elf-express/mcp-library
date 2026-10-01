---
title: "Sslh"
source: "https://docs.opnsense.org/development/api/plugins/sslh.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 348
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:37.014Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Softether](<347 Softether.md>)　｜　[下一篇：斯通內爾 ➡](<349 斯通內爾.md>)

# Sslh

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | sslh | 服務 | 重新配置 | |
| `POST` | sslh | 服務 | 重啟 | |
| `POST` | sslh | 服務 | 開始 | |
| `GET` | sslh | 服務 | 狀態 | |
| `POST` | sslh | 服務 | 停止 | |

*資源（SettingsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | sslh | 設定 | 取得 | |
| `GET` | sslh | 設定 | 索引 | |
| `POST` | sslh | 設定 | 設定 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Settings.xml](https://github.com/opnsense/plugins/blob/master/net/sslh/src/opnsense/mvc/app/models/OPNsense/Sslh/Settings.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Softether](<347 Softether.md>)　｜　[下一篇：斯通內爾 ➡](<349 斯通內爾.md>)
