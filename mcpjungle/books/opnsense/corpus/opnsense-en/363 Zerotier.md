---
title: "Zerotier"
source: https://docs.opnsense.org/development/api/plugins/zerotier.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 363
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:44.145Z"
---

# Zerotier

*Resources (NetworkController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | zerotier | network | add |  |
| `POST` | zerotier | network | del | $uuid=null |
| `GET` | zerotier | network | get | $uuid=null |
| `GET` | zerotier | network | info | $uuid=null |
| `GET` | zerotier | network | search |  |
| `POST` | zerotier | network | set | $uuid=null |
| `POST` | zerotier | network | toggle | $uuid=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Zerotier.xml](https://github.com/opnsense/plugins/blob/master/net/zerotier/src/opnsense/mvc/app/models/OPNsense/Zerotier/Zerotier.xml) |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | zerotier | settings | get |  |
| `POST` | zerotier | settings | set |  |
| `GET` | zerotier | settings | status |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Zerotier.xml](https://github.com/opnsense/plugins/blob/master/net/zerotier/src/opnsense/mvc/app/models/OPNsense/Zerotier/Zerotier.xml) |