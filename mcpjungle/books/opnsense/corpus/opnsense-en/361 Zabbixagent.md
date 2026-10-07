---
title: "Zabbixagent"
source: https://docs.opnsense.org/development/api/plugins/zabbixagent.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 361
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:43.636Z"
---


# Zabbixagent


*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | zabbixagent | service | reconfigure |  |
| `POST` | zabbixagent | service | restart |  |
| `POST` | zabbixagent | service | start |  |
| `GET` | zabbixagent | service | status |  |
| `POST` | zabbixagent | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | zabbixagent | settings | add\_alias |  |
| `POST` | zabbixagent | settings | add\_userparameter |  |
| `POST` | zabbixagent | settings | del\_alias | $uuid |
| `POST` | zabbixagent | settings | del\_userparameter | $uuid |
| `GET` | zabbixagent | settings | get |  |
| `GET` | zabbixagent | settings | get\_alias | $uuid=null |
| `GET` | zabbixagent | settings | get\_userparameter | $uuid=null |
| `GET,POST` | zabbixagent | settings | search\_aliases |  |
| `GET,POST` | zabbixagent | settings | search\_userparameters |  |
| `POST` | zabbixagent | settings | set |  |
| `POST` | zabbixagent | settings | set\_alias | $uuid |
| `POST` | zabbixagent | settings | set\_userparameter | $uuid |
| `POST` | zabbixagent | settings | toggle\_alias | $uuid |
| `POST` | zabbixagent | settings | toggle\_userparameter | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [ZabbixAgent.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/zabbix-agent/src/opnsense/mvc/app/models/OPNsense/ZabbixAgent/ZabbixAgent.xml) |

---

