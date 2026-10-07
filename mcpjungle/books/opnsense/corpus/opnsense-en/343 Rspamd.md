---
title: "Rspamd"
source: https://docs.opnsense.org/development/api/plugins/rspamd.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 343
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:33.997Z"
---

# Rspamd

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | rspamd | service | reconfigure |  |
| `POST` | rspamd | service | restart |  |
| `POST` | rspamd | service | start |  |
| `GET` | rspamd | service | status |  |
| `POST` | rspamd | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | rspamd | settings | get |  |
| `POST` | rspamd | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [RSpamd.xml](https://github.com/opnsense/plugins/blob/master/mail/rspamd/src/opnsense/mvc/app/models/OPNsense/Rspamd/RSpamd.xml) |