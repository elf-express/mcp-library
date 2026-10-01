---
title: "Zabbixproxy"
source: "https://docs.opnsense.org/development/api/plugins/zabbixproxy.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 362
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:45.179Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zabbixagent](<361 Zabbixagent.md>)　｜　[下一篇：Zerotier ➡](<363 Zerotier.md>)

# Zabbixproxy

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | zabbixproxy | general | get |  |
| `POST` | zabbixproxy | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/zabbix-proxy/src/opnsense/mvc/app/models/OPNsense/Zabbixproxy/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | zabbixproxy | service | reconfigure |  |
| `POST` | zabbixproxy | service | restart |  |
| `POST` | zabbixproxy | service | start |  |
| `GET` | zabbixproxy | service | status |  |
| `POST` | zabbixproxy | service | stop |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zabbixagent](<361 Zabbixagent.md>)　｜　[下一篇：Zerotier ➡](<363 Zerotier.md>)
