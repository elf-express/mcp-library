---
title: "Dnsmasq"
source: https://docs.opnsense.org/development/api/core/dnsmasq.html
chapter: ["Development Manual","API Reference","Core API"]
order: 275
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:59.587Z"
---


# Dnsmasq


*Resources (LeasesController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | dnsmasq | leases | search |  |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | dnsmasq | service | reconfigure |  |
| `POST` | dnsmasq | service | restart |  |
| `POST` | dnsmasq | service | start |  |
| `GET` | dnsmasq | service | status |  |
| `POST` | dnsmasq | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | dnsmasq | settings | add\_boot |  |
| `POST` | dnsmasq | settings | add\_domain |  |
| `POST` | dnsmasq | settings | add\_host |  |
| `POST` | dnsmasq | settings | add\_option |  |
| `POST` | dnsmasq | settings | add\_range |  |
| `POST` | dnsmasq | settings | add\_tag |  |
| `POST` | dnsmasq | settings | del\_boot | $uuid |
| `POST` | dnsmasq | settings | del\_domain | $uuid |
| `POST` | dnsmasq | settings | del\_host | $uuid |
| `POST` | dnsmasq | settings | del\_option | $uuid |
| `POST` | dnsmasq | settings | del\_range | $uuid |
| `POST` | dnsmasq | settings | del\_tag | $uuid |
| `GET` | dnsmasq | settings | download\_hosts |  |
| `GET` | dnsmasq | settings | get |  |
| `GET` | dnsmasq | settings | get\_boot | $uuid=null |
| `GET` | dnsmasq | settings | get\_domain | $uuid=null |
| `GET` | dnsmasq | settings | get\_host | $uuid=null |
| `GET` | dnsmasq | settings | get\_option | $uuid=null |
| `GET` | dnsmasq | settings | get\_range | $uuid=null |
| `GET` | dnsmasq | settings | get\_tag | $uuid=null |
| `GET` | dnsmasq | settings | get\_tag\_list |  |
| `GET,POST` | dnsmasq | settings | search\_boot |  |
| `GET,POST` | dnsmasq | settings | search\_domain |  |
| `GET,POST` | dnsmasq | settings | search\_host |  |
| `GET,POST` | dnsmasq | settings | search\_option |  |
| `GET,POST` | dnsmasq | settings | search\_range |  |
| `GET,POST` | dnsmasq | settings | search\_tag |  |
| `POST` | dnsmasq | settings | set |  |
| `POST` | dnsmasq | settings | set\_boot | $uuid |
| `POST` | dnsmasq | settings | set\_domain | $uuid |
| `POST` | dnsmasq | settings | set\_host | $uuid |
| `POST` | dnsmasq | settings | set\_option | $uuid |
| `POST` | dnsmasq | settings | set\_range | $uuid |
| `POST` | dnsmasq | settings | set\_tag | $uuid |
| `POST` | dnsmasq | settings | upload\_hosts |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Dnsmasq.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Dnsmasq/Dnsmasq.xml) |

---

