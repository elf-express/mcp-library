---
title: "Netbird"
source: https://docs.opnsense.org/development/api/plugins/netbird.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 324
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:25.378Z"
---


# Netbird


*資源（AuthenticationController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | netbird | 驗證 | 已關閉 | |
| `GET` | netbird | 驗證 | 取得 | |
| `POST` | netbird | 認證 | 設定 | |
| `GET` | netbird | 驗證 | 向上 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Authentication.xml](https://github.com/opnsense/plugins/blob/master/security/netbird/src/opnsense/mvc/app/models/OPNsense/Netbird/Authentication.xml) |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | Netbird | 服務 | 重新設定 | |
| `POST` | netbird | 服務 | 重啟 | |
| `POST` | netbird | 服務 | 開始 | |
| `GET` | Netbird | 服務 | 狀態 | |
| `POST` | netbird | 服務 | 停止 | |

*資源（SettingsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | Netbird | 設定 | 取得 | |
| `POST` | Netbird | 設定 | 設定 | |
| `GET` | Netbird | 設定 | 同步 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Settings.xml](https://github.com/opnsense/plugins/blob/master/security/netbird/src/opnsense/mvc/app/models/OPNsense/Netbird/Settings.xml) |

*資源（StatusController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | netbird | 狀態 | 取得 | |
| `POST` | netbird | 狀態 | 設定 | |
| `GET` | netbird | 狀態 | 狀態 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [Status.xml](https://github.com/opnsense/plugins/blob/master/security/netbird/src/opnsense/mvc/app/models/OPNsense/Netbird/Status.xml) |

---

