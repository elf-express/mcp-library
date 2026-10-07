---
title: "NRPE"
title_original: "Nrpe"
source: https://docs.opnsense.org/development/api/plugins/nrpe.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 329
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:28.956Z"
---

# NRPE

*資源（CommandController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | nrpe | 指令 | 新增指令 | |
| `POST` | nrpe | 指令 | del\_command | $uuid |
| `GET` | nrpe | 指令 | 取得 | |
| `GET` | nrpe | 指令 | 取得\_指令 | $uuid=null |
| `GET,POST` | nrpe | 指令 | 搜尋指令 | |
| `POST` | nrpe | 指令 | 設定 | |
| `POST` | nrpe | 指令 | 設定指令 | $uuid |
| `POST` | nrpe | 指令 | 切換指令 | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Command.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/nrpe/src/opnsense/mvc/app/models/OPNsense/Nrpe/Command.xml) |

*資源（GeneralController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | nrpe | 一般 | 取得 | |
| `POST` | nrpe | 通用 | 集合 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [General.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/nrpe/src/opnsense/mvc/app/models/OPNsense/Nrpe/General.xml) |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | nrpe | 服務 | 重新配置 | |
| `POST` | nrpe | 服務 | 重啟 | |
| `POST` | nrpe | 禮拜 | 開始 | |
| `GET` | nrpe | 服務 | 狀態 | |
| `POST` | nrpe | 服務 | 停止 | |