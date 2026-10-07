---
title: "Stunnel"
source: https://docs.opnsense.org/development/api/plugins/stunnel.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 349
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:37.501Z"
---


# Stunnel


*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | stunnel | service | reconfigure |  |
| `POST` | stunnel | service | restart |  |
| `POST` | stunnel | service | start |  |
| `GET` | stunnel | service | status |  |
| `POST` | stunnel | service | stop |  |

*Service (ServicesController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | stunnel | services | add\_item |  |
| `POST` | stunnel | services | del\_item | $uuid |
| `GET` | stunnel | services | get |  |
| `GET` | stunnel | services | get\_item | $uuid=null |
| `GET,POST` | stunnel | services | search\_item |  |
| `POST` | stunnel | services | set |  |
| `POST` | stunnel | services | set\_item | $uuid |
| `POST` | stunnel | services | toggle\_item | $uuid,$enabled=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Stunnel.xml](https://github.com/opnsense/plugins/blob/master/security/stunnel/src/opnsense/mvc/app/models/OPNsense/Stunnel/Stunnel.xml) |

---

