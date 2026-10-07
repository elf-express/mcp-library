---
title: "Apcupsd"
source: https://docs.opnsense.org/development/api/plugins/apcupsd.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 295
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:10.171Z"
---

# Apcupsd

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | apcupsd | service | get\_ups\_status |  |
| `POST` | apcupsd | service | reconfigure |  |
| `POST` | apcupsd | service | restart |  |
| `POST` | apcupsd | service | start |  |
| `GET` | apcupsd | service | status |  |
| `POST` | apcupsd | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | apcupsd | settings | get |  |
| `POST` | apcupsd | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Apcupsd.xml](https://github.com/opnsense/plugins/blob/master/sysutils/apcupsd/src/opnsense/mvc/app/models/OPNsense/Apcupsd/Apcupsd.xml) |