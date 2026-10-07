---
title: "Shadowsocks"
source: https://docs.opnsense.org/development/api/plugins/shadowsocks.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 344
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:34.475Z"
---

# Shadowsocks

*Resources (GeneralController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | shadowsocks | general | get |  |
| `POST` | shadowsocks | general | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [General.xml](https://github.com/opnsense/plugins/blob/master/net/shadowsocks/src/opnsense/mvc/app/models/OPNsense/Shadowsocks/General.xml) |

*Resources (LocalController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | shadowsocks | local | get |  |
| `POST` | shadowsocks | local | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Local.xml](https://github.com/opnsense/plugins/blob/master/net/shadowsocks/src/opnsense/mvc/app/models/OPNsense/Shadowsocks/Local.xml) |

*Service (LocalserviceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | shadowsocks | localservice | reconfigure |  |
| `POST` | shadowsocks | localservice | restart |  |
| `POST` | shadowsocks | localservice | start |  |
| `GET` | shadowsocks | localservice | status |  |
| `POST` | shadowsocks | localservice | stop |  |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | shadowsocks | service | reconfigure |  |
| `POST` | shadowsocks | service | restart |  |
| `POST` | shadowsocks | service | start |  |
| `GET` | shadowsocks | service | status |  |
| `POST` | shadowsocks | service | stop |  |