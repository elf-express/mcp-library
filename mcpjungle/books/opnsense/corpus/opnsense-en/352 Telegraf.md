---
title: "Telegraf"
source: https://docs.opnsense.org/development/api/plugins/telegraf.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 352
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:40.550Z"
---

# Telegraf

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | telegraf | general | get |  |
| `POST` | telegraf | general | set |  |

*Resources (InputController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | telegraf | input | get |  |
| `POST` | telegraf | input | set |  |

*Resources (KeyController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | telegraf | key | add\_key |  |
| `POST` | telegraf | key | del\_key | $uuid |
| `GET` | telegraf | key | get |  |
| `GET` | telegraf | key | get\_key | $uuid=null |
| `GET,POST` | telegraf | key | search\_key |  |
| `POST` | telegraf | key | set |  |
| `POST` | telegraf | key | set\_key | $uuid |
| `POST` | telegraf | key | toggle\_key | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Key.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/telegraf/src/opnsense/mvc/app/models/OPNsense/Telegraf/Key.xml) |

*Resources (OutputController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | telegraf | output | get |  |
| `POST` | telegraf | output | set |  |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | telegraf | service | reconfigure |  |
| `POST` | telegraf | service | restart |  |
| `POST` | telegraf | service | start |  |
| `GET` | telegraf | service | status |  |
| `POST` | telegraf | service | stop |  |