---
title: "Mdnsrepeater"
source: https://docs.opnsense.org/development/api/plugins/mdnsrepeater.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 320
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:24.362Z"
---

# Mdnsrepeater

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | mdnsrepeater | service | reconfigure |  |
| `POST` | mdnsrepeater | service | restart |  |
| `POST` | mdnsrepeater | service | start |  |
| `GET` | mdnsrepeater | service | status |  |
| `POST` | mdnsrepeater | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | mdnsrepeater | settings | get |  |
| `POST` | mdnsrepeater | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [MDNSRepeater.xml](https://github.com/opnsense/plugins/blob/master/net/mdns-repeater/src/opnsense/mvc/app/models/OPNsense/MDNSRepeater/MDNSRepeater.xml) |