---
title: "Softether"
source: https://docs.opnsense.org/development/api/plugins/softether.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 347
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:36.484Z"
---

# Softether

*資源（GeneralController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | 軟以太 | 通用 | 取得 | |
| `POST` | 軟以太 | 通用 | 集 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [General.xml](https://github.com/opnsense/plugins/blob/master/security/softether/src/opnsense/mvc/app/models/OPNsense/Softether/General.xml) |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | 軟以太坊 | 服務 | 重新配置 | |
| `POST` | 軟以太 | 服務 | 重啟 | |
| `POST` | 軟以太 | 服務 | 啟動 | |
| `GET` | 軟以太 | 服務 | 狀態 | |
| `POST` | 軟以太 | 服務 | 停止 | |