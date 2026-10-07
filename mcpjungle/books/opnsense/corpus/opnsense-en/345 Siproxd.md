---
title: "Siproxd"
source: https://docs.opnsense.org/development/api/plugins/siproxd.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 345
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:35.970Z"
---

# Siproxd

*Resources (DomainController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | siproxd | domain | add\_domain |  |
| `POST` | siproxd | domain | del\_domain | $uuid |
| `GET` | siproxd | domain | get |  |
| `GET` | siproxd | domain | get\_domain | $uuid=null |
| `GET` | siproxd | domain | search\_domain |  |
| `POST` | siproxd | domain | set |  |
| `POST` | siproxd | domain | set\_domain | $uuid |
| `GET` | siproxd | domain | toggle\_domain | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Domain.xml](https://github.com/opnsense/plugins/blob/master/net/siproxd/src/opnsense/mvc/app/models/OPNsense/Siproxd/Domain.xml) |

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | siproxd | general | get |  |
| `POST` | siproxd | general | set |  |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | siproxd | service | reconfigure |  |
| `POST` | siproxd | service | restart |  |
| `GET` | siproxd | service | showregistrations |  |
| `POST` | siproxd | service | start |  |
| `GET` | siproxd | service | status |  |
| `POST` | siproxd | service | stop |  |

*Resources (UserController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | siproxd | user | add\_user |  |
| `POST` | siproxd | user | del\_user | $uuid |
| `GET` | siproxd | user | get |  |
| `GET` | siproxd | user | get\_user | $uuid=null |
| `GET` | siproxd | user | search\_user |  |
| `POST` | siproxd | user | set |  |
| `POST` | siproxd | user | set\_user | $uuid |
| `GET` | siproxd | user | toggle\_user | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [User.xml](https://github.com/opnsense/plugins/blob/master/net/siproxd/src/opnsense/mvc/app/models/OPNsense/Siproxd/User.xml) |