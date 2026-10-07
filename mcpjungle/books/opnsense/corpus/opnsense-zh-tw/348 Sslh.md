---
title: "Sslh"
source: https://docs.opnsense.org/development/api/plugins/sslh.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 348
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:37.014Z"
---

# Sslh

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