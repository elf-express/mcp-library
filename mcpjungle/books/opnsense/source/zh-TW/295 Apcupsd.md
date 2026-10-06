---
title: "Apcupsd"
source: "https://docs.opnsense.org/development/api/plugins/apcupsd.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 295
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:10.171Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Acmeclient](<294 Acmeclient.md>)　｜　[下一篇：節拍 ➡](<296 節拍.md>)

# Apcupsd

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | apcupsd | 服務 | 取得 ups 狀態 | |
| `POST` | apcupsd | 服務 | 重新配置 | |
| `POST` | apcupsd | 服務 | 重啟 | |
| `POST` | apcupsd | 服務 | 開始 | |
| `GET` | apcupsd | 服務 | 狀態 | |
| `POST` | apcupsd | 服務 | 停止 | |

*資源（SettingsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | apcupsd | 設定 | 取得 | |
| `POST` | apcupsd | 設定 | 設定 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Apcupsd.xml](https://github.com/opnsense/plugins/blob/master/sysutils/apcupsd/src/opnsense/mvc/app/models/OPNsense/Apcupsd/Apcupsd.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Acmeclient](<294 Acmeclient.md>)　｜　[下一篇：節拍 ➡](<296 節拍.md>)
