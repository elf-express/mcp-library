---
title: "Dhcrelay"
source: https://docs.opnsense.org/development/api/core/dhcrelay.html
chapter: ["Development Manual","API Reference","Core API"]
order: 273
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:01.078Z"
---

# Dhcrelay

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | dhcrelay | service | reconfigure |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | dhcrelay | settings | add\_dest |  |
| `POST` | dhcrelay | settings | add\_relay |  |
| `POST` | dhcrelay | settings | del\_dest | $uuid |
| `POST` | dhcrelay | settings | del\_relay | $uuid |
| `GET` | dhcrelay | settings | get |  |
| `GET` | dhcrelay | settings | get\_dest | $uuid=null |
| `GET` | dhcrelay | settings | get\_relay | $uuid=null |
| `GET,POST` | dhcrelay | settings | search\_dest |  |
| `GET,POST` | dhcrelay | settings | search\_relay |  |
| `POST` | dhcrelay | settings | set |  |
| `POST` | dhcrelay | settings | set\_dest | $uuid |
| `POST` | dhcrelay | settings | set\_relay | $uuid |
| `POST` | dhcrelay | settings | toggle\_relay | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [DHCRelay.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/DHCRelay/DHCRelay.xml) |