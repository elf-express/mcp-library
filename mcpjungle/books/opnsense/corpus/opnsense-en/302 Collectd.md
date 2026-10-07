---
title: "Collectd"
source: https://docs.opnsense.org/development/api/plugins/collectd.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 302
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:14.224Z"
---

# Collectd

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | collectd | general | get |  |
| `POST` | collectd | general | set |  |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | collectd | service | reconfigure |  |
| `POST` | collectd | service | restart |  |
| `POST` | collectd | service | start |  |
| `GET` | collectd | service | status |  |
| `POST` | collectd | service | stop |  |