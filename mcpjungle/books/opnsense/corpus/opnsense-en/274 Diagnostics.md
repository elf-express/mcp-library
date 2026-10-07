---
title: "Diagnostics"
source: https://docs.opnsense.org/development/api/core/diagnostics.html
chapter: ["Development Manual","API Reference","Core API"]
order: 274
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:59.100Z"
---


# Diagnostics


*Resources (ActivityController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | diagnostics | activity | get\_activity |  |

*Resources (CpuUsageController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | diagnostics | cpu\_usage | get\_c\_p\_u\_type |  |
| `GET` | diagnostics | cpu\_usage | stream |  |

*Resources (DnsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | diagnostics | dns | reverse\_lookup |  |

*Resources (DnsDiagnosticsController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | diagnostics | dns\_diagnostics | get |  |
| `POST` | diagnostics | dns\_diagnostics | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [DnsDiagnostics.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Diagnostics/DnsDiagnostics.xml) |

*Resources (FirewallController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | diagnostics | firewall | del\_state | $stateid,$creatorid |
| `POST` | diagnostics | firewall | flush\_sources |  |
| `POST` | diagnostics | firewall | flush\_states |  |
| `POST` | diagnostics | firewall | kill\_states |  |
| `GET` | diagnostics | firewall | list\_rule\_ids |  |
| `GET` | diagnostics | firewall | log |  |
| `GET` | diagnostics | firewall | log\_filters |  |
| `GET` | diagnostics | firewall | pf\_states |  |
| `GET` | diagnostics | firewall | pf\_statistics | $section=null |
| `POST` | diagnostics | firewall | query\_pf\_top |  |
| `POST` | diagnostics | firewall | query\_states |  |
| `GET` | diagnostics | firewall | stats |  |
| `GET` | diagnostics | firewall | stream\_log |  |

*Resources (InterfaceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | diagnostics | interface | \_carp\_status | $status |
| `POST` | diagnostics | interface | del\_route |  |
| `POST` | diagnostics | interface | flush\_arp |  |
| `GET` | diagnostics | interface | get\_arp |  |
| `GET` | diagnostics | interface | get\_bpf\_statistics |  |
| `GET` | diagnostics | interface | get\_interface\_config |  |
| `GET` | diagnostics | interface | get\_interface\_names |  |
| `GET` | diagnostics | interface | get\_interface\_statistics |  |
| `GET` | diagnostics | interface | get\_memory\_statistics |  |
| `GET` | diagnostics | interface | get\_ndp |  |
| `GET` | diagnostics | interface | get\_netisr\_statistics |  |
| `GET` | diagnostics | interface | get\_pfsync\_nodes |  |
| `GET` | diagnostics | interface | get\_protocol\_statistics |  |
| `GET` | diagnostics | interface | get\_routes |  |
| `GET` | diagnostics | interface | get\_socket\_statistics |  |
| `GET` | diagnostics | interface | get\_vip\_status |  |
| `GET` | diagnostics | interface | search\_arp |  |
| `GET` | diagnostics | interface | search\_ndp |  |

*Resources (LvtemplateController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | diagnostics | lvtemplate | add\_item |  |
| `POST` | diagnostics | lvtemplate | del\_item | $uuid |
| `GET` | diagnostics | lvtemplate | get |  |
| `GET` | diagnostics | lvtemplate | get\_item | $uuid=null |
| `GET,POST` | diagnostics | lvtemplate | search\_item |  |
| `POST` | diagnostics | lvtemplate | set |  |
| `POST` | diagnostics | lvtemplate | set\_item | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Lvtemplate.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Diagnostics/Lvtemplate.xml) |

*Resources (NetflowController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | diagnostics | netflow | cache\_stats |  |
| `GET` | diagnostics | netflow | getconfig |  |
| `GET` | diagnostics | netflow | is\_enabled |  |
| `POST` | diagnostics | netflow | reconfigure |  |
| `GET` | diagnostics | netflow | setconfig |  |
| `GET` | diagnostics | netflow | status |  |

*Resources (NetworkinsightController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | diagnostics | networkinsight | export | $provider=null,$from\_date=null,$to\_date=null,$resolution=null |
| `GET` | diagnostics | networkinsight | get\_interfaces |  |
| `GET` | diagnostics | networkinsight | get\_metadata |  |
| `GET` | diagnostics | networkinsight | get\_protocols |  |
| `GET` | diagnostics | networkinsight | get\_services |  |
| `GET` | diagnostics | networkinsight | timeserie | $provider=null,$measure=null,$from\_date=null,$to\_date=null,$resolution=null,$field=null,$emulation=null |
| `GET` | diagnostics | networkinsight | top | $provider=null,$from\_date=null,$to\_date=null,$field=null,$measure=null,$max\_hits=null |

*Resources (PacketCaptureController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | diagnostics | packet\_capture | download | $jobid |
| `GET` | diagnostics | packet\_capture | get |  |
| `GET` | diagnostics | packet\_capture | mac\_info | $macaddr |
| `POST` | diagnostics | packet\_capture | remove | $jobid |
| `GET` | diagnostics | packet\_capture | search\_jobs |  |
| `POST` | diagnostics | packet\_capture | set |  |
| `POST` | diagnostics | packet\_capture | start | $jobid |
| `POST` | diagnostics | packet\_capture | stop | $jobid |
| `GET` | diagnostics | packet\_capture | view | $jobid,$detail=normal |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [PacketCapture.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Diagnostics/PacketCapture.xml) |

*Resources (PingController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | diagnostics | ping | get |  |
| `POST` | diagnostics | ping | remove | $jobid |
| `GET` | diagnostics | ping | search\_jobs |  |
| `POST` | diagnostics | ping | set |  |
| `POST` | diagnostics | ping | start | $jobid |
| `POST` | diagnostics | ping | stop | $jobid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Ping.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Diagnostics/Ping.xml) |

*Resources (PortprobeController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | diagnostics | portprobe | get |  |
| `POST` | diagnostics | portprobe | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Portprobe.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Diagnostics/Portprobe.xml) |

*Resources (SystemController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | diagnostics | system | memory |  |
| `GET` | diagnostics | system | system\_disk |  |
| `GET` | diagnostics | system | system\_information |  |
| `GET` | diagnostics | system | system\_mbuf |  |
| `GET` | diagnostics | system | system\_resources |  |
| `GET` | diagnostics | system | system\_swap |  |
| `GET` | diagnostics | system | system\_temperature |  |
| `GET` | diagnostics | system | system\_time |  |

*Resources (SystemhealthController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | diagnostics | systemhealth | export\_as\_c\_s\_v | $rrd=’’,$detail=-1 |
| `GET` | diagnostics | systemhealth | get\_interfaces |  |
| `GET` | diagnostics | systemhealth | get\_rrd\_list |  |
| `GET` | diagnostics | systemhealth | get\_system\_health | $rrd=’’,$detail=-1 |

*Resources (TracerouteController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | diagnostics | traceroute | get |  |
| `POST` | diagnostics | traceroute | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Traceroute.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Diagnostics/Traceroute.xml) |

*Resources (TrafficController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | diagnostics | traffic | \_interface |  |
| `GET` | diagnostics | traffic | \_top | $interfaces |
| `GET` | diagnostics | traffic | stream | $poll\_interval=1 |

---

