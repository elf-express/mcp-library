---
title: "Crowdsec"
source: "https://docs.opnsense.org/development/api/plugins/crowdsec.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 303
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:13.720Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Collectd](<302 Collectd.md>)　｜　[下一篇：Dhcpv4 ➡](<305 Dhcpv4.md>)

# Crowdsec

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Resources (AlertsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | crowdsec | alerts | search |  |

*Resources (AppsecconfigsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | crowdsec | appsecconfigs | search |  |

*Resources (AppsecrulesController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | crowdsec | appsecrules | search |  |

*Resources (BouncersController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | crowdsec | bouncers | search |  |

*Resources (CollectionsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | crowdsec | collections | search |  |

*Resources (DecisionsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | crowdsec | decisions | del | $decision\_id |
| `GET` | crowdsec | decisions | search |  |

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | crowdsec | general | get |  |
| `POST` | crowdsec | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/security/crowdsec/src/opnsense/mvc/app/models/OPNsense/CrowdSec/General.xml) |

*Resources (MachinesController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | crowdsec | machines | search |  |

*Resources (ParsersController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | crowdsec | parsers | search |  |

*Resources (PostoverflowsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | crowdsec | postoverflows | search |  |

*Resources (ScenariosController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | crowdsec | scenarios | search |  |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | crowdsec | service | reconfigure |  |
| `POST` | crowdsec | service | restart |  |
| `POST` | crowdsec | service | start |  |
| `GET` | crowdsec | service | status |  |
| `POST` | crowdsec | service | stop |  |

*Resources (VersionController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | crowdsec | version | get |  |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Collectd](<302 Collectd.md>)　｜　[下一篇：Dhcpv4 ➡](<305 Dhcpv4.md>)
