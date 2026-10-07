---
title: "Core"
source: https://docs.opnsense.org/development/api/core/core.html
chapter: ["Development Manual","API Reference","Core API"]
order: 271
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:58.082Z"
---


# Core


*Resources (BackupController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | core | backup | backups | $host |
| `POST` | core | backup | delete\_backup | $backup |
| `GET` | core | backup | diff | $host,$backup1,$backup2 |
| `GET` | core | backup | download | $host,$backup=null |
| `GET` | core | backup | providers |  |
| `POST` | core | backup | revert\_backup | $backup |

*Resources (DashboardController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | core | dashboard | get\_dashboard |  |
| `GET` | core | dashboard | picture |  |
| `GET` | core | dashboard | product\_info\_feed |  |
| `POST` | core | dashboard | restore\_defaults |  |
| `POST` | core | dashboard | save\_widgets |  |

*Resources (DefaultsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | core | defaults | factory\_defaults |  |
| `GET` | core | defaults | get |  |
| `GET` | core | defaults | get\_installed\_sections |  |
| `POST` | core | defaults | reset |  |

*Resources (HasyncController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | core | hasync | get |  |
| `POST` | core | hasync | reconfigure |  |
| `POST` | core | hasync | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Hasync.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Core/Hasync.xml) |

*Resources (HasyncStatusController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | core | hasync\_status | remote\_service | $action,$service,$service\_id |
| `POST` | core | hasync\_status | restart | $service=null,$service\_id=null |
| `POST` | core | hasync\_status | restart\_all | $service=null,$service\_id=null |
| `GET` | core | hasync\_status | services |  |
| `POST` | core | hasync\_status | start | $service=null,$service\_id=null |
| `POST` | core | hasync\_status | stop | $service=null,$service\_id=null |
| `GET` | core | hasync\_status | version |  |

*Resources (InitialSetupController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | core | initial\_setup | abort |  |
| `GET` | core | initial\_setup | configure |  |
| `GET` | core | initial\_setup | get |  |
| `POST` | core | initial\_setup | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [InitialSetup.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Core/InitialSetup.xml) |

*Resources (MenuController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | core | menu | search |  |
| `GET` | core | menu | tree |  |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | core | service | restart | $name,$id=’’ |
| `GET` | core | service | search |  |
| `POST` | core | service | start | $name,$id=’’ |
| `POST` | core | service | stop | $name,$id=’’ |

*Resources (SnapshotsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | core | snapshots | activate | $uuid |
| `POST` | core | snapshots | add |  |
| `POST` | core | snapshots | del | $uuid |
| `GET` | core | snapshots | get | $uuid=null |
| `GET` | core | snapshots | is\_supported |  |
| `GET` | core | snapshots | search |  |
| `POST` | core | snapshots | set | $uuid |

*Resources (SystemController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | core | system | dismiss\_status |  |
| `POST` | core | system | halt |  |
| `POST` | core | system | reboot |  |
| `GET` | core | system | status |  |

*Resources (TunablesController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | core | tunables | add\_item |  |
| `POST` | core | tunables | del\_item | $uuid |
| `GET` | core | tunables | get |  |
| `GET` | core | tunables | get\_item | $uuid=null |
| `POST` | core | tunables | reconfigure |  |
| `POST` | core | tunables | reset |  |
| `GET,POST` | core | tunables | search\_item |  |
| `POST` | core | tunables | set |  |
| `POST` | core | tunables | set\_item | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Tunables.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Core/Tunables.xml) |

---

