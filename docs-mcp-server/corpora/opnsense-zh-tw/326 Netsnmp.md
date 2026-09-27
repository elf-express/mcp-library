---
title: "Netsnmp"
source: "https://docs.opnsense.org/development/api/plugins/netsnmp.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 326
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:25.899Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：網路數據](<325 網路數據.md>)　｜　[下一篇：Nginx ➡](<327 Nginx.md>)

# Netsnmp

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*資源（GeneralController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | netsnmp | 常規 | 取得 | |
| `POST` | netsnmp | 常規 | 設定 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [General.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/net-snmp/src/opnsense/mvc/app/models/OPNsense/Netsnmp/General.xml) |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | netsnmp | 服務 | 重新配置 | |
| `POST` | netsnmp | 服務 | 重啟 | |
| `POST` | netsnmp | 服務 | 啟動 | |
| `GET` | netsnmp | 服務 | 狀態 | |
| `POST` | netsnmp | 服務 | 停止 | |

*資源（UserController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | netsnmp | 使用者 | 新增使用者 | |
| `POST` | netsnmp | 使用者 | 刪除\_user | $uuid |
| `GET` | netsnmp | 用戶 | 取得 | |
| `GET` | netsnmp | user | get\_user | $uuid=null |
| `GET,POST` | netsnmp | 用戶 | 搜尋用戶 | |
| `POST` | netsnmp | 使用者 | 設定 | |
| `POST` | netsnmp | 使用者 | 設定使用者 | $uuid |
| `POST` | netsnmp | 使用者 | toggle\_user | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [User.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/net-snmp/src/opnsense/mvc/app/models/OPNsense/Netsnmp/User.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：網路數據](<325 網路數據.md>)　｜　[下一篇：Nginx ➡](<327 Nginx.md>)
