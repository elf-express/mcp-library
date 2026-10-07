---
title: "Puppetagent"
source: https://docs.opnsense.org/development/api/plugins/puppetagent.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 336
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:30.494Z"
---

# Puppetagent

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | puppetagent | service | reconfigure |  |
| `POST` | puppetagent | service | restart |  |
| `POST` | puppetagent | service | start |  |
| `GET` | puppetagent | service | status |  |
| `POST` | puppetagent | service | stop |  |

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | puppetagent | settings | get |  |
| `POST` | puppetagent | settings | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [PuppetAgent.xml](https://github.com/opnsense/plugins/blob/master/sysutils/puppet-agent/src/opnsense/mvc/app/models/OPNsense/PuppetAgent/PuppetAgent.xml) |