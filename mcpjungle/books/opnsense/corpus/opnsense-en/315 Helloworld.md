---
title: "Helloworld"
source: https://docs.opnsense.org/development/api/plugins/helloworld.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 315
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:20.299Z"
---

# Helloworld

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | helloworld | service | reload |  |
| `POST` | helloworld | service | test |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | helloworld | settings | get |  |
| `POST` | helloworld | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [HelloWorld.xml](https://github.com/opnsense/plugins/blob/master/devel/helloworld/src/opnsense/mvc/app/models/OPNsense/HelloWorld/HelloWorld.xml) |