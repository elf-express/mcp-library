---
title: "Nrpe"
source: https://docs.opnsense.org/development/api/plugins/nrpe.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 329
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:28.956Z"
---

# Nrpe

*Resources (CommandController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | nrpe | command | add\_command |  |
| `POST` | nrpe | command | del\_command | $uuid |
| `GET` | nrpe | command | get |  |
| `GET` | nrpe | command | get\_command | $uuid=null |
| `GET,POST` | nrpe | command | search\_command |  |
| `POST` | nrpe | command | set |  |
| `POST` | nrpe | command | set\_command | $uuid |
| `POST` | nrpe | command | toggle\_command | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Command.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/nrpe/src/opnsense/mvc/app/models/OPNsense/Nrpe/Command.xml) |

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | nrpe | general | get |  |
| `POST` | nrpe | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net-mgmt/nrpe/src/opnsense/mvc/app/models/OPNsense/Nrpe/General.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | nrpe | service | reconfigure |  |
| `POST` | nrpe | service | restart |  |
| `POST` | nrpe | service | start |  |
| `GET` | nrpe | service | status |  |
| `POST` | nrpe | service | stop |  |