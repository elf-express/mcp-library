---
title: "Auth"
source: https://docs.opnsense.org/development/api/core/auth.html
chapter: ["Development Manual","API Reference","Core API"]
order: 269
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:57.573Z"
---

# Auth

*Resources (GroupController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | auth | group | add |  |
| `POST` | auth | group | del | $uuid |
| `GET` | auth | group | get | $uuid=null |
| `GET,POST` | auth | group | search |  |
| `POST` | auth | group | set | $uuid=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Group.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Auth/Group.xml) |

*Resources (PrivController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | auth | priv | get |  |
| `GET` | auth | priv | get\_item | $id |
| `GET` | auth | priv | search |  |
| `POST` | auth | priv | set |  |
| `POST` | auth | priv | set\_item | $id |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Priv.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Auth/Priv.xml) |

*Resources (UserController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | auth | user | add |  |
| `POST` | auth | user | add\_api\_key | $username |
| `POST` | auth | user | del | $uuid |
| `POST` | auth | user | del\_api\_key | $id |
| `GET` | auth | user | download |  |
| `GET` | auth | user | get | $uuid=null |
| `GET` | auth | user | new\_otp\_seed |  |
| `GET,POST` | auth | user | search |  |
| `GET` | auth | user | search\_api\_key |  |
| `POST` | auth | user | set | $uuid=null |
| `POST` | auth | user | upload |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [User.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Auth/User.xml) |