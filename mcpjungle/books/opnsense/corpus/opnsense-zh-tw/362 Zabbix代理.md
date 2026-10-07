---
title: "Zabbix代理"
title_original: "Zabbixproxy"
source: https://docs.opnsense.org/development/api/plugins/zabbixproxy.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 362
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:45.179Z"
---


# Zabbix代理


*資源（GeneralController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | zabbixproxy | 常規 | 取得 | |
| `POST` | zabbixproxy | 常規 | 設定 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [General.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/zabbix-proxy/src/opnsense/mvc/app/models/OPNsense/Zabbixproxy/General.xml) |

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | zabbixproxy | 服務 | 重新配置 | |
| `POST` | zabbixproxy | 服務 | 重啟 | |
| `POST` | zabbixproxy | 服務 | 啟動 | |
| `GET` | zabbixproxy | 服務 | 狀態 | |
| `POST` | zabbixproxy | 服務 | 停止 | |

---

