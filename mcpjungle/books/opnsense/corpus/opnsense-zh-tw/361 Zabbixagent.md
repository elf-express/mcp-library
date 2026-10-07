---
title: "Zabbixagent"
source: https://docs.opnsense.org/development/api/plugins/zabbixagent.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 361
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:43.636Z"
---


# Zabbixagent


*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | zabbixagent | 服務 | 重新配置 | |
| `POST` | zabbixagent | 服務 | 重啟 | |
| `POST` | zabbixagent | 服務 | 啟動 | |
| `GET` | zabbixagent | 服務 | 狀態 | |
| `POST` | zabbixagent | 服務 | 停止 | |

*資源（SettingsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | zabbixagent | 設定 | 新增別名 | |
| `POST` | zabbixagent | 設定 | 新增使用者參數 | |
| `POST` | zabbixagent | 設定 | del\_alias | $uuid |
| `POST` | zabbixagent | 設定 | 刪除_userparameter | $uuid |
| `GET` | zabbixagent | 設定 | 取得 | |
| `GET` | zabbixagent | 設定 | 取得別名 | $uuid=null |
| `GET` | zabbixagent | 設定 | 取得使用者參數 | $uuid=null |
| `GET,POST` | zabbixagent | 設定 | 搜尋別名 | |
| `GET,POST` | zabbixagent | 設定 | 搜尋_用戶參數 | |
| `POST` | zabbixagent | 設定 | 設定 | |
| `POST` | zabbixagent | 設定 | 設定別名 | $uuid |
| `POST` | zabbixagent | 設定 | 設定使用者參數 | $uuid |
| `POST` | zabbixagent | 設定 | toggle\_alias | $uuid |
| `POST` | zabbixagent | 設定 | 切換使用者參數 | $uuid |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [ZabbixAgent.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/zabbix-agent/src/opnsense/mvc/app/models/OPNsense/ZabbixAgent/ZabbixAgent.xml) |

---

