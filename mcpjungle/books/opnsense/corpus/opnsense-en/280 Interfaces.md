---
title: "Interfaces"
source: https://docs.opnsense.org/development/api/core/interfaces.html
chapter: ["Development Manual","API Reference","Core API"]
order: 280
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:02.110Z"
---


# Interfaces


*Resources (BridgeSettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | interfaces | bridge\_settings | add\_item |  |
| `POST` | interfaces | bridge\_settings | del\_item | $uuid |
| `GET` | interfaces | bridge\_settings | get |  |
| `GET` | interfaces | bridge\_settings | get\_item | $uuid=null |
| `POST` | interfaces | bridge\_settings | reconfigure |  |
| `GET,POST` | interfaces | bridge\_settings | search\_item |  |
| `POST` | interfaces | bridge\_settings | set |  |
| `POST` | interfaces | bridge\_settings | set\_item | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Bridge.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Interfaces/Bridge.xml) |

*Resources (GifSettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | interfaces | gif\_settings | add\_item |  |
| `POST` | interfaces | gif\_settings | del\_item | $uuid |
| `GET` | interfaces | gif\_settings | get |  |
| `GET` | interfaces | gif\_settings | get\_if\_options |  |
| `GET` | interfaces | gif\_settings | get\_item | $uuid=null |
| `POST` | interfaces | gif\_settings | reconfigure |  |
| `GET,POST` | interfaces | gif\_settings | search\_item |  |
| `POST` | interfaces | gif\_settings | set |  |
| `POST` | interfaces | gif\_settings | set\_item | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Gif.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Interfaces/Gif.xml) |

*Resources (GreSettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | interfaces | gre\_settings | add\_item |  |
| `POST` | interfaces | gre\_settings | del\_item | $uuid |
| `GET` | interfaces | gre\_settings | get |  |
| `GET` | interfaces | gre\_settings | get\_if\_options |  |
| `GET` | interfaces | gre\_settings | get\_item | $uuid=null |
| `POST` | interfaces | gre\_settings | reconfigure |  |
| `GET,POST` | interfaces | gre\_settings | search\_item |  |
| `POST` | interfaces | gre\_settings | set |  |
| `POST` | interfaces | gre\_settings | set\_item | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Gre.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Interfaces/Gre.xml) |

*Resources (LaggSettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | interfaces | lagg\_settings | add\_item |  |
| `POST` | interfaces | lagg\_settings | del\_item | $uuid |
| `GET` | interfaces | lagg\_settings | get |  |
| `GET` | interfaces | lagg\_settings | get\_item | $uuid=null |
| `POST` | interfaces | lagg\_settings | reconfigure |  |
| `GET,POST` | interfaces | lagg\_settings | search\_item |  |
| `POST` | interfaces | lagg\_settings | set |  |
| `POST` | interfaces | lagg\_settings | set\_item | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Lagg.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Interfaces/Lagg.xml) |

*Resources (LoopbackSettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | interfaces | loopback\_settings | add\_item |  |
| `POST` | interfaces | loopback\_settings | del\_item | $uuid |
| `GET` | interfaces | loopback\_settings | get |  |
| `GET` | interfaces | loopback\_settings | get\_item | $uuid=null |
| `POST` | interfaces | loopback\_settings | reconfigure |  |
| `GET,POST` | interfaces | loopback\_settings | search\_item |  |
| `POST` | interfaces | loopback\_settings | set |  |
| `POST` | interfaces | loopback\_settings | set\_item | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Loopback.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Interfaces/Loopback.xml) |

*Resources (NeighborSettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | interfaces | neighbor\_settings | add\_item |  |
| `POST` | interfaces | neighbor\_settings | del\_item | $uuid |
| `GET` | interfaces | neighbor\_settings | get |  |
| `GET` | interfaces | neighbor\_settings | get\_item | $uuid=null |
| `POST` | interfaces | neighbor\_settings | reconfigure |  |
| `GET,POST` | interfaces | neighbor\_settings | search\_item |  |
| `POST` | interfaces | neighbor\_settings | set |  |
| `POST` | interfaces | neighbor\_settings | set\_item | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Neighbor.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Interfaces/Neighbor.xml) |

*Resources (OverviewController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | interfaces | overview | export |  |
| `GET` | interfaces | overview | get\_interface | $if=null |
| `GET` | interfaces | overview | interfaces\_info | $details=false |
| `POST` | interfaces | overview | reload\_interface | $identifier=null |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | interfaces | settings | get |  |
| `POST` | interfaces | settings | reconfigure |  |
| `POST` | interfaces | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Settings.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Interfaces/Settings.xml) |

*Resources (VipSettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | interfaces | vip\_settings | add\_item |  |
| `POST` | interfaces | vip\_settings | del\_item | $uuid |
| `GET` | interfaces | vip\_settings | get |  |
| `GET` | interfaces | vip\_settings | get\_item | $uuid=null |
| `GET` | interfaces | vip\_settings | get\_unused\_vhid |  |
| `POST` | interfaces | vip\_settings | reconfigure |  |
| `GET,POST` | interfaces | vip\_settings | search\_item |  |
| `POST` | interfaces | vip\_settings | set |  |
| `POST` | interfaces | vip\_settings | set\_item | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Vip.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Interfaces/Vip.xml) |

*Resources (VlanSettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | interfaces | vlan\_settings | add\_item |  |
| `POST` | interfaces | vlan\_settings | del\_item | $uuid |
| `GET` | interfaces | vlan\_settings | get |  |
| `GET` | interfaces | vlan\_settings | get\_item | $uuid=null |
| `POST` | interfaces | vlan\_settings | reconfigure |  |
| `GET,POST` | interfaces | vlan\_settings | search\_item |  |
| `POST` | interfaces | vlan\_settings | set |  |
| `POST` | interfaces | vlan\_settings | set\_item | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Vlan.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Interfaces/Vlan.xml) |

*Resources (VxlanSettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | interfaces | vxlan\_settings | add\_item |  |
| `POST` | interfaces | vxlan\_settings | del\_item | $uuid |
| `GET` | interfaces | vxlan\_settings | get |  |
| `GET` | interfaces | vxlan\_settings | get\_item | $uuid=null |
| `POST` | interfaces | vxlan\_settings | reconfigure |  |
| `GET,POST` | interfaces | vxlan\_settings | search\_item |  |
| `POST` | interfaces | vxlan\_settings | set |  |
| `POST` | interfaces | vxlan\_settings | set\_item | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [VxLan.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Interfaces/VxLan.xml) |

---

