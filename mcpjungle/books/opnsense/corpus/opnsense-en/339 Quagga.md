---
title: "Quagga"
source: https://docs.opnsense.org/development/api/plugins/quagga.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 339
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:32.493Z"
---


# Quagga


*Resources (BfdController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | quagga | bfd | add\_neighbor |  |
| `POST` | quagga | bfd | del\_neighbor | $uuid |
| `GET` | quagga | bfd | get |  |
| `GET` | quagga | bfd | get\_neighbor | $uuid=null |
| `GET,POST` | quagga | bfd | search\_neighbor |  |
| `POST` | quagga | bfd | set |  |
| `POST` | quagga | bfd | set\_neighbor | $uuid |
| `POST` | quagga | bfd | toggle\_neighbor | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [BFD.xml](https://github.com/opnsense/plugins/blob/master/net/frr/src/opnsense/mvc/app/models/OPNsense/Quagga/BFD.xml) |

*Resources (BgpController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | quagga | bgp | add\_aspath |  |
| `POST` | quagga | bgp | add\_communitylist |  |
| `POST` | quagga | bgp | add\_neighbor |  |
| `POST` | quagga | bgp | add\_peergroup |  |
| `POST` | quagga | bgp | add\_prefixlist |  |
| `POST` | quagga | bgp | add\_redistribution |  |
| `POST` | quagga | bgp | add\_routemap |  |
| `POST` | quagga | bgp | del\_aspath | $uuid |
| `POST` | quagga | bgp | del\_communitylist | $uuid |
| `POST` | quagga | bgp | del\_neighbor | $uuid |
| `POST` | quagga | bgp | del\_peergroup | $uuid |
| `POST` | quagga | bgp | del\_prefixlist | $uuid |
| `POST` | quagga | bgp | del\_redistribution | $uuid |
| `POST` | quagga | bgp | del\_routemap | $uuid |
| `GET` | quagga | bgp | get |  |
| `GET` | quagga | bgp | get\_aspath | $uuid=null |
| `GET` | quagga | bgp | get\_communitylist | $uuid=null |
| `GET` | quagga | bgp | get\_neighbor | $uuid=null |
| `GET` | quagga | bgp | get\_peergroup | $uuid=null |
| `GET` | quagga | bgp | get\_prefixlist | $uuid=null |
| `GET` | quagga | bgp | get\_redistribution | $uuid=null |
| `GET` | quagga | bgp | get\_routemap | $uuid=null |
| `GET,POST` | quagga | bgp | search\_aspath |  |
| `GET,POST` | quagga | bgp | search\_communitylist |  |
| `GET,POST` | quagga | bgp | search\_neighbor |  |
| `GET,POST` | quagga | bgp | search\_peergroup |  |
| `GET,POST` | quagga | bgp | search\_prefixlist |  |
| `GET,POST` | quagga | bgp | search\_redistribution |  |
| `GET,POST` | quagga | bgp | search\_routemap |  |
| `POST` | quagga | bgp | set |  |
| `POST` | quagga | bgp | set\_aspath | $uuid |
| `POST` | quagga | bgp | set\_communitylist | $uuid |
| `POST` | quagga | bgp | set\_neighbor | $uuid |
| `POST` | quagga | bgp | set\_peergroup | $uuid |
| `POST` | quagga | bgp | set\_prefixlist | $uuid |
| `POST` | quagga | bgp | set\_redistribution | $uuid |
| `POST` | quagga | bgp | set\_routemap | $uuid |
| `POST` | quagga | bgp | toggle\_aspath | $uuid |
| `POST` | quagga | bgp | toggle\_communitylist | $uuid |
| `POST` | quagga | bgp | toggle\_neighbor | $uuid |
| `POST` | quagga | bgp | toggle\_peergroup | $uuid |
| `POST` | quagga | bgp | toggle\_prefixlist | $uuid |
| `POST` | quagga | bgp | toggle\_redistribution | $uuid |
| `POST` | quagga | bgp | toggle\_routemap | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [BGP.xml](https://github.com/opnsense/plugins/blob/master/net/frr/src/opnsense/mvc/app/models/OPNsense/Quagga/BGP.xml) |

*Resources (DiagnosticsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | quagga | diagnostics | bfdcounters |  |
| `GET` | quagga | diagnostics | bfdneighbors |  |
| `GET` | quagga | diagnostics | bfdsummary |  |
| `GET` | quagga | diagnostics | bgpneighbors |  |
| `GET` | quagga | diagnostics | bgpsummary |  |
| `GET` | quagga | diagnostics | generalrunningconfig |  |
| `GET` | quagga | diagnostics | ospfdatabase |  |
| `GET` | quagga | diagnostics | ospfinterface |  |
| `GET` | quagga | diagnostics | ospfoverview |  |
| `GET` | quagga | diagnostics | ospfv3interface |  |
| `GET` | quagga | diagnostics | ospfv3overview |  |
| `GET` | quagga | diagnostics | search\_bgproute4 |  |
| `GET` | quagga | diagnostics | search\_bgproute6 |  |
| `GET` | quagga | diagnostics | search\_generalroute4 |  |
| `GET` | quagga | diagnostics | search\_generalroute6 |  |
| `GET` | quagga | diagnostics | search\_ospfneighbor |  |
| `GET` | quagga | diagnostics | search\_ospfroute |  |
| `GET` | quagga | diagnostics | search\_ospfv3database |  |
| `GET` | quagga | diagnostics | search\_ospfv3route | $format=json |

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | quagga | general | get |  |
| `POST` | quagga | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net/frr/src/opnsense/mvc/app/models/OPNsense/Quagga/General.xml) |

*Resources (Ospf6settingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | quagga | ospf6settings | add\_interface |  |
| `POST` | quagga | ospf6settings | add\_network |  |
| `POST` | quagga | ospf6settings | add\_prefixlist |  |
| `POST` | quagga | ospf6settings | add\_redistribution |  |
| `POST` | quagga | ospf6settings | add\_routemap |  |
| `POST` | quagga | ospf6settings | del\_interface | $uuid |
| `POST` | quagga | ospf6settings | del\_network | $uuid |
| `POST` | quagga | ospf6settings | del\_prefixlist | $uuid |
| `POST` | quagga | ospf6settings | del\_redistribution | $uuid |
| `POST` | quagga | ospf6settings | del\_routemap | $uuid |
| `GET` | quagga | ospf6settings | get |  |
| `GET` | quagga | ospf6settings | get\_interface | $uuid=null |
| `GET` | quagga | ospf6settings | get\_network | $uuid=null |
| `GET` | quagga | ospf6settings | get\_prefixlist | $uuid=null |
| `GET` | quagga | ospf6settings | get\_redistribution | $uuid=null |
| `GET` | quagga | ospf6settings | get\_routemap | $uuid=null |
| `GET,POST` | quagga | ospf6settings | search\_interface |  |
| `GET,POST` | quagga | ospf6settings | search\_network |  |
| `GET,POST` | quagga | ospf6settings | search\_prefixlist |  |
| `GET,POST` | quagga | ospf6settings | search\_redistribution |  |
| `GET,POST` | quagga | ospf6settings | search\_routemap |  |
| `POST` | quagga | ospf6settings | set |  |
| `POST` | quagga | ospf6settings | set\_interface | $uuid |
| `POST` | quagga | ospf6settings | set\_network | $uuid |
| `POST` | quagga | ospf6settings | set\_prefixlist | $uuid |
| `POST` | quagga | ospf6settings | set\_redistribution | $uuid |
| `POST` | quagga | ospf6settings | set\_routemap | $uuid |
| `POST` | quagga | ospf6settings | toggle\_interface | $uuid |
| `POST` | quagga | ospf6settings | toggle\_network | $uuid |
| `POST` | quagga | ospf6settings | toggle\_prefixlist | $uuid |
| `POST` | quagga | ospf6settings | toggle\_redistribution | $uuid |
| `POST` | quagga | ospf6settings | toggle\_routemap | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [OSPF6.xml](https://github.com/opnsense/plugins/blob/master/net/frr/src/opnsense/mvc/app/models/OPNsense/Quagga/OSPF6.xml) |

*Resources (OspfsettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | quagga | ospfsettings | add\_area |  |
| `POST` | quagga | ospfsettings | add\_interface |  |
| `POST` | quagga | ospfsettings | add\_neighbor |  |
| `POST` | quagga | ospfsettings | add\_network |  |
| `POST` | quagga | ospfsettings | add\_prefixlist |  |
| `POST` | quagga | ospfsettings | add\_redistribution |  |
| `POST` | quagga | ospfsettings | add\_routemap |  |
| `POST` | quagga | ospfsettings | del\_area | $uuid |
| `POST` | quagga | ospfsettings | del\_interface | $uuid |
| `POST` | quagga | ospfsettings | del\_neighbor | $uuid |
| `POST` | quagga | ospfsettings | del\_network | $uuid |
| `POST` | quagga | ospfsettings | del\_prefixlist | $uuid |
| `POST` | quagga | ospfsettings | del\_redistribution | $uuid |
| `POST` | quagga | ospfsettings | del\_routemap | $uuid |
| `GET` | quagga | ospfsettings | get |  |
| `GET` | quagga | ospfsettings | get\_area | $uuid=null |
| `GET` | quagga | ospfsettings | get\_interface | $uuid=null |
| `GET` | quagga | ospfsettings | get\_neighbor | $uuid=null |
| `GET` | quagga | ospfsettings | get\_network | $uuid=null |
| `GET` | quagga | ospfsettings | get\_prefixlist | $uuid=null |
| `GET` | quagga | ospfsettings | get\_redistribution | $uuid=null |
| `GET` | quagga | ospfsettings | get\_routemap | $uuid=null |
| `GET,POST` | quagga | ospfsettings | search\_area |  |
| `GET,POST` | quagga | ospfsettings | search\_interface |  |
| `GET,POST` | quagga | ospfsettings | search\_neighbor |  |
| `GET,POST` | quagga | ospfsettings | search\_network |  |
| `GET,POST` | quagga | ospfsettings | search\_prefixlist |  |
| `GET,POST` | quagga | ospfsettings | search\_redistribution |  |
| `GET,POST` | quagga | ospfsettings | search\_routemap |  |
| `POST` | quagga | ospfsettings | set |  |
| `POST` | quagga | ospfsettings | set\_area | $uuid |
| `POST` | quagga | ospfsettings | set\_interface | $uuid |
| `POST` | quagga | ospfsettings | set\_neighbor | $uuid |
| `POST` | quagga | ospfsettings | set\_network | $uuid |
| `POST` | quagga | ospfsettings | set\_prefixlist | $uuid |
| `POST` | quagga | ospfsettings | set\_redistribution | $uuid |
| `POST` | quagga | ospfsettings | set\_routemap | $uuid |
| `POST` | quagga | ospfsettings | toggle\_area | $uuid |
| `POST` | quagga | ospfsettings | toggle\_interface | $uuid |
| `POST` | quagga | ospfsettings | toggle\_neighbor | $uuid |
| `POST` | quagga | ospfsettings | toggle\_network | $uuid |
| `POST` | quagga | ospfsettings | toggle\_prefixlist | $uuid |
| `POST` | quagga | ospfsettings | toggle\_redistribution | $uuid |
| `POST` | quagga | ospfsettings | toggle\_routemap | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [OSPF.xml](https://github.com/opnsense/plugins/blob/master/net/frr/src/opnsense/mvc/app/models/OPNsense/Quagga/OSPF.xml) |

*Resources (RipController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | quagga | rip | get |  |
| `POST` | quagga | rip | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [RIP.xml](https://github.com/opnsense/plugins/blob/master/net/frr/src/opnsense/mvc/app/models/OPNsense/Quagga/RIP.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | quagga | service | reconfigure |  |
| `POST` | quagga | service | restart |  |
| `POST` | quagga | service | start |  |
| `GET` | quagga | service | status |  |
| `POST` | quagga | service | stop |  |

*Resources (StaticController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | quagga | static | add\_route |  |
| `POST` | quagga | static | del\_route | $uuid |
| `GET` | quagga | static | get |  |
| `GET` | quagga | static | get\_route | $uuid=null |
| `GET,POST` | quagga | static | search\_route |  |
| `POST` | quagga | static | set |  |
| `POST` | quagga | static | set\_route | $uuid |
| `POST` | quagga | static | toggle\_route | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [STATICd.xml](https://github.com/opnsense/plugins/blob/master/net/frr/src/opnsense/mvc/app/models/OPNsense/Quagga/STATICd.xml) |

---

