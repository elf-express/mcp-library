---
title: "Ndpproxy"
source: https://docs.opnsense.org/development/api/plugins/ndpproxy.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 322
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:23.345Z"
---

# Ndpproxy

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ndpproxy | general | add\_alias |  |
| `POST` | ndpproxy | general | del\_alias | $uuid |
| `GET` | ndpproxy | general | get |  |
| `GET` | ndpproxy | general | get\_alias | $uuid=null |
| `GET,POST` | ndpproxy | general | search\_alias |  |
| `POST` | ndpproxy | general | set |  |
| `POST` | ndpproxy | general | set\_alias | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [NdpProxy.xml](https://github.com/opnsense/plugins/blob/master/net/ndp-proxy-go/src/opnsense/mvc/app/models/OPNsense/NdpProxy/NdpProxy.xml) |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | ndpproxy | service | reconfigure |  |
| `POST` | ndpproxy | service | restart |  |
| `POST` | ndpproxy | service | start |  |
| `GET` | ndpproxy | service | status |  |
| `POST` | ndpproxy | service | stop |  |