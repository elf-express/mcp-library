---
title: "Ipsec"
source: "https://docs.opnsense.org/development/api/core/ipsec.html"
chapter: ["Development Manual","API Reference","Core API"]
order: 281
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:03.142Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Interfaces](<280 Interfaces.md>)　｜　[下一篇：Kea ➡](<282 Kea.md>)

# Ipsec

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Core API](<000 目錄.md#c-59>)

*Resources (ConnectionsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | connections | add\_child |  |
| `POST` | ipsec | connections | add\_connection |  |
| `POST` | ipsec | connections | add\_local |  |
| `POST` | ipsec | connections | add\_remote |  |
| `GET` | ipsec | connections | connection\_exists | $uuid |
| `POST` | ipsec | connections | del\_child | $uuid |
| `POST` | ipsec | connections | del\_connection | $uuid |
| `POST` | ipsec | connections | del\_local | $uuid |
| `POST` | ipsec | connections | del\_remote | $uuid |
| `GET` | ipsec | connections | get |  |
| `GET` | ipsec | connections | get\_child | $uuid=null |
| `GET` | ipsec | connections | get\_connection | $uuid=null |
| `GET` | ipsec | connections | get\_local | $uuid=null |
| `GET` | ipsec | connections | get\_remote | $uuid=null |
| `GET` | ipsec | connections | is\_enabled |  |
| `GET,POST` | ipsec | connections | search\_child |  |
| `GET,POST` | ipsec | connections | search\_connection |  |
| `GET,POST` | ipsec | connections | search\_local |  |
| `GET,POST` | ipsec | connections | search\_remote |  |
| `POST` | ipsec | connections | set |  |
| `POST` | ipsec | connections | set\_child | $uuid=null |
| `POST` | ipsec | connections | set\_connection | $uuid=null |
| `POST` | ipsec | connections | set\_local | $uuid=null |
| `POST` | ipsec | connections | set\_remote | $uuid=null |
| `GET` | ipsec | connections | swanctl |  |
| `POST` | ipsec | connections | toggle | $enabled=null |
| `POST` | ipsec | connections | toggle\_child | $uuid,$enabled=null |
| `POST` | ipsec | connections | toggle\_connection | $uuid,$enabled=null |
| `POST` | ipsec | connections | toggle\_local | $uuid,$enabled=null |
| `POST` | ipsec | connections | toggle\_remote | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Swanctl.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/Swanctl.xml) |

*Resources (KeyPairsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | key\_pairs | add\_item |  |
| `POST` | ipsec | key\_pairs | del\_item | $uuid |
| `GET` | ipsec | key\_pairs | gen\_key\_pair | $type,$size=null |
| `GET` | ipsec | key\_pairs | get |  |
| `GET` | ipsec | key\_pairs | get\_item | $uuid=null |
| `GET,POST` | ipsec | key\_pairs | search\_item |  |
| `POST` | ipsec | key\_pairs | set |  |
| `POST` | ipsec | key\_pairs | set\_item | $uuid=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [IPsec.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/IPsec.xml) |

*Resources (LeasesController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | ipsec | leases | pools |  |
| `GET` | ipsec | leases | search |  |

*Resources (LegacySubsystemController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | legacy\_subsystem | apply\_config |  |
| `GET` | ipsec | legacy\_subsystem | status |  |

*Resources (ManualSpdController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | manual\_spd | add |  |
| `POST` | ipsec | manual\_spd | del | $uuid |
| `GET` | ipsec | manual\_spd | get | $uuid=null |
| `GET,POST` | ipsec | manual\_spd | search |  |
| `POST` | ipsec | manual\_spd | set | $uuid=null |
| `POST` | ipsec | manual\_spd | toggle | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Swanctl.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/Swanctl.xml) |

*Resources (PoolsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | pools | add |  |
| `POST` | ipsec | pools | del | $uuid |
| `GET` | ipsec | pools | get | $uuid=null |
| `GET,POST` | ipsec | pools | search |  |
| `POST` | ipsec | pools | set | $uuid=null |
| `POST` | ipsec | pools | toggle | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Swanctl.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/Swanctl.xml) |

*Resources (PreSharedKeysController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | pre\_shared\_keys | add\_item |  |
| `POST` | ipsec | pre\_shared\_keys | del\_item | $uuid |
| `GET` | ipsec | pre\_shared\_keys | get |  |
| `GET` | ipsec | pre\_shared\_keys | get\_item | $uuid=null |
| `GET,POST` | ipsec | pre\_shared\_keys | search\_item |  |
| `POST` | ipsec | pre\_shared\_keys | set |  |
| `POST` | ipsec | pre\_shared\_keys | set\_item | $uuid=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [IPsec.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/IPsec.xml) |

*Resources (SadController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | sad | delete | $id |
| `GET` | ipsec | sad | search |  |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | service | reconfigure |  |
| `POST` | ipsec | service | restart |  |
| `POST` | ipsec | service | start |  |
| `GET` | ipsec | service | status |  |
| `POST` | ipsec | service | stop |  |

*Resources (SessionsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | sessions | connect | $id |
| `POST` | ipsec | sessions | disconnect | $id |
| `GET` | ipsec | sessions | search\_phase1 |  |
| `GET` | ipsec | sessions | search\_phase2 |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | ipsec | settings | get |  |
| `POST` | ipsec | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [IPsec.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/IPsec.xml) |

*Resources (SpdController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | spd | delete | $id |
| `GET` | ipsec | spd | search |  |

*Resources (TunnelController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | tunnel | del\_phase1 | $ikeid |
| `POST` | ipsec | tunnel | del\_phase2 | $seqid |
| `GET` | ipsec | tunnel | search\_phase1 |  |
| `GET` | ipsec | tunnel | search\_phase2 |  |
| `POST` | ipsec | tunnel | toggle | $enabled=null |
| `POST` | ipsec | tunnel | toggle\_phase1 | $ikeid,$enabled=null |
| `POST` | ipsec | tunnel | toggle\_phase2 | $seqid,$enabled=null |

*Resources (VtiController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ipsec | vti | add |  |
| `POST` | ipsec | vti | del | $uuid |
| `GET` | ipsec | vti | get | $uuid=null |
| `GET,POST` | ipsec | vti | search |  |
| `POST` | ipsec | vti | set | $uuid=null |
| `POST` | ipsec | vti | toggle | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Swanctl.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/IPsec/Swanctl.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Interfaces](<280 Interfaces.md>)　｜　[下一篇：Kea ➡](<282 Kea.md>)
