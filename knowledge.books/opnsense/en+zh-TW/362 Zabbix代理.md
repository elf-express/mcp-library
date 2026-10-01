---
title: "Zabbixproxy｜Zabbix代理"
title_original: "Zabbixproxy"
source: "https://docs.opnsense.org/development/api/plugins/zabbixproxy.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 362
lang: "bilingual"
translated_by: "gtx"
captured: "2026-09-26T11:34:45.179Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zabbixagent｜Zabbix代理](<361 Zabbix代理.md>)　｜　[下一篇：Zerotier｜澤羅蒂爾 ➡](<363 澤羅蒂爾.md>)

# Zabbixproxy｜Zabbix代理

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

*資源（GeneralController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | zabbixproxy<br>zabbix代理人 | general<br>一般 | get<br>得到 |  |
| `POST` | zabbixproxy<br>zabbix代理人 | general<br>一般 | set<br>集 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/zabbix-proxy/src/opnsense/mvc/app/models/OPNsense/Zabbixproxy/General.xml)<br>*模型* [General.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/zabbix-proxy/src/opnsense/mvc/app/models/OPNsense/Zabbixproxy/General.xml) |

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | zabbixproxy<br>zabbix代理 | service<br>服務 | reconfigure<br>重新配置 |  |
| `POST` | zabbixproxy<br>zabbix代理 | service<br>服務 | restart<br>重啟 |  |
| `POST` | zabbixproxy<br>zabbix代理 | service<br>服務 | start<br>開始 |  |
| `GET` | zabbixproxy<br>zabbix代理 | service<br>服務 | status<br>狀態 |  |
| `POST` | zabbixproxy<br>zabbix代理 | service<br>服務 | stop<br>停止 |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zabbixagent｜Zabbix代理](<361 Zabbix代理.md>)　｜　[下一篇：Zerotier｜澤羅蒂爾 ➡](<363 澤羅蒂爾.md>)
