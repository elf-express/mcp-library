---
title: "Siproxd"
source: https://docs.opnsense.org/development/api/plugins/siproxd.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 345
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:35.970Z"
---

# Siproxd

*資源（DomainController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | siproxd | domain | add\_domain | |
| `POST` | siproxd | domain | del\_domain | $uuid |
| `GET` | siproxd | 域 | 取得 | |
| `GET` | siproxd | domain | get\_domain | $uuid=null |
| `GET` | siproxd | 域 | 搜尋域 | |
| `POST` | siproxd | 域 | 集 | |
| `POST` | siproxd | domain | set\_domain | $uuid |
| `GET` | siproxd | domain | toggle\_domain | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Domain.xml](https://github.com/opnsense/plugins/blob/master/net/siproxd/src/opnsense/mvc/app/models/OPNsense/Siproxd/Domain.xml) |

*資源（GeneralController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | siproxd | 常規 | 取得 | |
| `POST` | siproxd | 通用 | 集 | |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | siproxd | 服務 | 重新配置 | |
| `POST` | siproxd | 服務 | 重啟 | |
| `GET` | siproxd | 服務 | 演出註冊 | |
| `POST` | siproxd | 服務 | 開始 | |
| `GET` | siproxd | 服務 | 狀態 | |
| `POST` | siproxd | 服務 | 停止 | |

*資源（UserController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | siproxd | 使用者 | 新增使用者 | |
| `POST` | siproxd | 使用者 | del\_user | $uuid |
| `GET` | siproxd | 用戶 | 取得 | |
| `GET` | siproxd | 用戶 | 取得用戶 | $uuid=null |
| `GET` | siproxd | 用戶 | 搜尋用戶 | |
| `POST` | siproxd | 使用者 | 設定 | |
| `POST` | siproxd | 使用者 | 設定使用者 | $uuid |
| `GET` | siproxd | 使用者 | toggle\_user | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [User.xml](https://github.com/opnsense/plugins/blob/master/net/siproxd/src/opnsense/mvc/app/models/OPNsense/Siproxd/User.xml) |