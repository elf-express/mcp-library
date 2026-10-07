---
title: "Openvpn"
source: https://docs.opnsense.org/development/api/core/openvpn.html
chapter: ["Development Manual","API Reference","Core API"]
order: 285
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:04.644Z"
---


# Openvpn


*Resources (ClientOverwritesController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | openvpn | client\_overwrites | add |  |
| `POST` | openvpn | client\_overwrites | del | $uuid |
| `GET` | openvpn | client\_overwrites | get | $uuid=null |
| `GET,POST` | openvpn | client\_overwrites | search |  |
| `POST` | openvpn | client\_overwrites | set | $uuid=null |
| `POST` | openvpn | client\_overwrites | toggle | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [OpenVPN.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/OpenVPN/OpenVPN.xml) |

*Resources (ExportController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | openvpn | export | accounts | $vpnid=null |
| `POST` | openvpn | export | download | $vpnid,$certref=null |
| `GET` | openvpn | export | providers |  |
| `POST` | openvpn | export | store\_presets | $vpnid |
| `GET` | openvpn | export | templates |  |
| `POST` | openvpn | export | validate\_presets | $vpnid |

*Resources (InstancesController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | openvpn | instances | add |  |
| `POST` | openvpn | instances | add\_static\_key |  |
| `POST` | openvpn | instances | del | $uuid |
| `POST` | openvpn | instances | del\_static\_key | $uuid |
| `GET` | openvpn | instances | gen\_key | $type=secret |
| `GET` | openvpn | instances | get | $uuid=null |
| `GET` | openvpn | instances | get\_static\_key | $uuid=null |
| `GET,POST` | openvpn | instances | search |  |
| `GET,POST` | openvpn | instances | search\_static\_key |  |
| `POST` | openvpn | instances | set | $uuid=null |
| `POST` | openvpn | instances | set\_static\_key | $uuid=null |
| `POST` | openvpn | instances | toggle | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [OpenVPN.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/OpenVPN/OpenVPN.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | openvpn | service | kill\_session |  |
| `POST` | openvpn | service | reconfigure |  |
| `POST` | openvpn | service | restart\_service | $id=null |
| `GET` | openvpn | service | search\_routes |  |
| `GET` | openvpn | service | search\_sessions |  |
| `POST` | openvpn | service | start\_service | $id=null |
| `POST` | openvpn | service | stop\_service | $id=null |

---

