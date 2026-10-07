---
title: "Zabbixproxy"
source: https://docs.opnsense.org/development/api/plugins/zabbixproxy.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 362
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:45.179Z"
---


# Zabbixproxy


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

