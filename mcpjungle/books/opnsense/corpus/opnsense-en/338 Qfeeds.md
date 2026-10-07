---
title: "Qfeeds"
source: https://docs.opnsense.org/development/api/plugins/qfeeds.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 338
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:31.458Z"
---

# Qfeeds

*Resources (SettingsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | qfeeds | settings | get |  |
| `GET` | qfeeds | settings | reconfigure |  |
| `GET` | qfeeds | settings | search\_events |  |
| `GET` | qfeeds | settings | search\_feeds |  |
| `POST` | qfeeds | settings | set |  |
| `GET` | qfeeds | settings | stats |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Connector.xml](https://github.com/opnsense/plugins/blob/master/security/q-feeds-connector/src/opnsense/mvc/app/models/OPNsense/QFeeds/Connector.xml) |