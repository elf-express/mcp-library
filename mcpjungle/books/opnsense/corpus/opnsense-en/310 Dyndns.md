---
title: "Dyndns"
source: https://docs.opnsense.org/development/api/plugins/dyndns.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 310
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:17.256Z"
---

# Dyndns

*Resources (AccountsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | dyndns | accounts | add\_item |  |
| `POST` | dyndns | accounts | del\_item | $uuid |
| `GET` | dyndns | accounts | get |  |
| `GET` | dyndns | accounts | get\_item | $uuid=null |
| `GET,POST` | dyndns | accounts | search\_item |  |
| `POST` | dyndns | accounts | set |  |
| `POST` | dyndns | accounts | set\_item | $uuid |
| `POST` | dyndns | accounts | toggle\_item | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [DynDNS.xml](https://github.com/opnsense/plugins/blob/master/dns/ddclient/src/opnsense/mvc/app/models/OPNsense/DynDNS/DynDNS.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | dyndns | service | reconfigure |  |
| `POST` | dyndns | service | restart |  |
| `POST` | dyndns | service | start |  |
| `GET` | dyndns | service | status |  |
| `POST` | dyndns | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | dyndns | settings | get |  |
| `POST` | dyndns | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [DynDNS.xml](https://github.com/opnsense/plugins/blob/master/dns/ddclient/src/opnsense/mvc/app/models/OPNsense/DynDNS/DynDNS.xml) |