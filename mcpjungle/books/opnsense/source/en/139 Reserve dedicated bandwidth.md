---
title: "Reserve dedicated bandwidth"
source: "https://docs.opnsense.org/manual/how-tos/shaper_dedicated_bw.html"
chapter: ["Firewall","Traffic Shaping","Configuration / How-tos"]
order: 139
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:51.139Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Traffic Shaping](<138 Traffic Shaping.md>)　｜　[下一篇：Share internet bandwidth amongst users evenly ➡](<140 Share internet bandwidth amongst users evenly.md>)

# Reserve dedicated bandwidth

> 章節：[Firewall](<000 目錄.md#c-26>) › [Traffic Shaping](<000 目錄.md#c-29>) › [Configuration / How-tos](<000 目錄.md#c-30>)

**Reserve dedicated bandwidth for a realtime traffic such as (hosted) Voice Over IP (VOIP) server.**

In this scenario we will create a pipe dedicated for traffic going to and coming from our realtime application. For the sample we presume a SIP trunk or hosted Voice Over IP (VOIP) server.

For this example we presume a requirement of 4 uncompressed voice channels of 64 kbps, resulting in a total bandwidth of 256 kbps. The internet connection in this example has 10 Mbps Download and 1 Mbps Upload.

[![](<../images/d8a3726a-nwdiag-3418ebe96212e329652ed37ad74bd28dc.png>)](https://docs.opnsense.org/_images/nwdiag-3418ebe96212e329652ed37ad74bd28dc53d6d4c.png)

Shaping hosted VOIP / SIP trunk sample

To start go to Firewall ‣ Shaper ‣ Pipes.

## Step 1 - Create Upload and Download Pipes

On the **Pipes** tab click the **+** button in the lower right corner. An empty **Edit Pipe** screen will popup.

Create Pipe For Upload (To our VOIP Server)

|   |   |   |
| --- | --- | --- |
| **enabled** | Checked | *Check to enable the pipe* |
| **bandwidth** | 256 | *Numeric value of the desired bandwidth* |
| **bandwidth Metric** | Kbit/s | *Metric to use with the numeric value* |
| **mask** | (Empty) | *Used for auto queueing, empty for our sample* |
| **description** | PipeUp-256kbps | *Free field, enter something descriptive* |

Create Pipe For Upload (Other Traffic = 1024 kbps - 256 kbps = 768 kbps)

|   |   |   |
| --- | --- | --- |
| **enabled** | Checked | *Check to enable the pipe* |
| **bandwidth** | 768 | *Numeric value of the desired bandwidth* |
| **bandwidth Metric** | Kbit/s | *Metric to use with the numeric value* |
| **mask** | (Empty) | *Used for auto queueing, empty for our sample* |
| **description** | PipeUp-768kbps | *Free field, enter something descriptive* |

Create Pipe For Download (From our VOIP Server)

|   |   |   |
| --- | --- | --- |
| **enabled** | Checked | *Check to enable the pipe* |
| **bandwidth** | 256 | *Numeric value of the desired bandwidth* |
| **bandwidth Metric** | Kbit/s | *Metric to use with the numeric value* |
| **mask** | (Empty) | *Used for auto queueing, empty for our sample* |
| **description** | PipeDown-256kbps | *Free field, enter something descriptive* |

Create Pipe For Download (Other Traffic = 10240 kbps - 256 kbps = 9984 kbps )

|   |   |   |
| --- | --- | --- |
| **enabled** | Checked | *Check to enable the pipe* |
| **bandwidth** | 9984 | *Numeric value of the desired bandwidth* |
| **bandwidth Metric** | Kbit/s | *Metric to use with the numeric value* |
| **mask** | (Empty) | *Used for auto queueing, empty for our sample* |
| **description** | PipeDown-9984kbps | *Free field, enter something descriptive* |

## Step 2 - Create Rules

On the **Rules** tab click the **+** button in the lower right corner. An empty **Edit rule** screen will popup.

Create a rule for traffic directed towards the VOIP Server (Upload).

|   |   |   |
| --- | --- | --- |
| **sequence** | 11 | *Auto generated number, overwrite only when needed* |
| **interface** | WAN | *Select the interface connected to the internet* |
| **proto** | ip | *Select the protocol, IP in our example* |
| **source** | any | *The source IP to shape, leave on any* |
| **src-port** | any | *The source port to shape, leave on any* |
| **destination** | 172.10.2.1 | *The IP address of our VOIP server* |
| **dst-port** | any | *Use any of the destination port if static* |
| **target** | PipeUP-256kbps | *Select the Upload 256 kbps Pipe* |
| **description** | ShapeVOIPUpload | *Enter a descriptive name* |

Create a rule for traffic coming from the VOIP Server (Download).

|   |   |   |
| --- | --- | --- |
| **sequence** | 21 | *Auto generated number, overwrite only when needed* |
| **interface** | WAN | *Select the interface connected to the internet* |
| **proto** | ip | *Select the protocol, IP in our example* |
| **source** | 172.10.2.1 | *The IP address of our VOIP server* |
| **src-port** | any | *The source port to shape, leave on any* |
| **destination** | any | *The destination IP to shape, leave on any* |
| **dst-port** | any | *The destination port to shape, leave on any* |
| **target** | PipeDown256kbps | *Select the Download 256 kbps Pipe* |
| **description** | ShapeVOIPDown | *Enter a descriptive name* |

Create a rule for all other internet upload traffic

|   |   |   |
| --- | --- | --- |
| **sequence** | 31 | *Auto generated number, overwrite only when needed* |
| **interface** | WAN | *Select the interface connected to the internet* |
| **proto** | ip | *Select the protocol, IP in our example* |
| **source** | 192.168.1.0/24 | *The source IPs to shape, our LAN network* |
| **src-port** | any | *The source port to shape, leave on any* |
| **destination** | any | *the destination address, leave in any* |
| **dst-port** | any | *Use any of the destination port if static* |
| **target** | PipeUp-768kbps | *Select the Upload 768 kbps Pipe* |
| **description** | ShapeUpload | *Enter a descriptive name* |

Create a rule for all other internet download traffic

|   |   |   |
| --- | --- | --- |
| **sequence** | 41 | *Auto generated number, overwrite only when needed* |
| **interface** | WAN | *Select the interface connected to the internet* |
| **proto** | ip | *Select the protocol, IP in our example* |
| **source** | any | *The source IP to shape, leave on any* |
| **src-port** | any | *The source port to shape, leave on any* |
| **destination** | 192.168.1.0/24 | *The destination IPs to shape, our LAN network* |
| **dst-port** | any | *The destination port to shape, leave on any* |
| **target** | PipeDown-9984kbps | *Select the Download 256Kbps Pipe* |
| **description** | ShapeDown | *Enter a descriptive name* |

Note

Be aware of the sequence! It is important to make sure the right traffic is passed to the right pipe.

Now press ![apply](<../images/ca819e9a-applybtn.png>) to activate the traffic shaping rules.

*Screenshot Rules*

[![../../_images/shaping_rules_s1.png](<../images/1c3b6f51-shaping_rules_s1.png>)](https://docs.opnsense.org/_images/shaping_rules_s1.png)

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Traffic Shaping](<138 Traffic Shaping.md>)　｜　[下一篇：Share internet bandwidth amongst users evenly ➡](<140 Share internet bandwidth amongst users evenly.md>)
