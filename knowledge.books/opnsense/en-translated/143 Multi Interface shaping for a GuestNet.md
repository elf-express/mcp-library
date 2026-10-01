---
title: "Multi Interface shaping for a GuestNet"
source: "https://docs.opnsense.org/manual/how-tos/shaper_guestnet.html"
chapter: ["Firewall","Traffic Shaping","Configuration / How-tos"]
order: 143
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:32:53.348Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Prioritize Applications (Weighted) using Queues](<142 Prioritize Applications (Weighted) using Queues.md>)　｜　[下一篇：Fighting Bufferbloat with FQ_CoDel ➡](<144 Fighting Bufferbloat with FQ_CoDel.md>)

# Multi Interface shaping for a GuestNet

> 章節：[Firewall](<000 目錄.md#c-26>) › [Traffic Shaping](<000 目錄.md#c-29>) › [Configuration / How-tos](<000 目錄.md#c-30>)

One of the options with OPNsense’s traffic shaper is its ability to add shaping rules based upon two interfaces. This option allows you to shape traffic differently based on the direction the traffic is moving between interfaces.

For this example we will use this functionality to share a symmetric 10 Mbps internet connection between a primary LAN network and a Guest Network.

The LAN network will not be limited, traffic from users on our Guest Network will be limited to a total of 2 Mbps Download and 1 Mbps Upload.

[![](<../images/3696f3c8-nwdiag-3f7508e3160ba25a71f8ec8c2d2ece7a1.png>)](https://docs.opnsense.org/_images/nwdiag-3f7508e3160ba25a71f8ec8c2d2ece7a17d9529a.png)

Simple network diagram

## Step 1 - Create Upload and Download Pipes

On the **Pipes** tab click the **+** button in the lower right corner. An empty **Edit Pipe** screen will popup.

Create Pipe For Upload (GuestNet - em2)

|   |   |   |
| --- | --- | --- |
| **enabled** | Checked | *Check to enable the pipe* |
| **bandwidth** | 1 | *Numeric value of the desired bandwidth* |
| **bandwidth Metric** | Mbit/s | *Metric to use with the numeric value* |
| **mask** | (Empty) | *Leave empty* |
| **description** | PipeUp-1Mbps | *Free field, enter something descriptive* |

Create Pipe For Download (GuestNet - em2)

|   |   |   |
| --- | --- | --- |
| **enabled** | Checked | *Check to enable the pipe* |
| **bandwidth** | 2 | *Numeric value of the desired bandwidth* |
| **bandwidth Metric** | Mbit/s | *Metric to use with the numeric value* |
| **mask** | (Empty) | *Leave empty* |
| **description** | PipeDown-2Mbps | *Free field, enter something descriptive* |

## Step 2 - Create Rules

On the **Rules** tab click the **+** button in the lower right corner. An empty **Edit rule** screen will popup.

Important - Before you continue!

First change the mode to advanced, see the toggle in the left top corner of the popup dialog. One click should shift it from red (disabled) to green (enabled).

Create a rule for the download traffic

|   |   |   |
| --- | --- | --- |
| **sequence** | 11 | *Auto generated number, overwrite only when needed* |
| **interface** | WAN | *Select the interface connected to the internet* |
| **interface2** | GuestNet | *Select the interface that matches your GuestNet* |
| **proto** | ip | *Select the protocol, IP in our example* |
| **source** | any | *The source address, leave on any* |
| **src-port** | any | *The source port to shape, leave on any* |
| **destination** | any | *The destination IP to shape, leave on any* |
| **dst-port** | any | *The destination port to shape, leave on any* |
| **direction** | in | *Match incoming packages (download)* |
| **target** | PipeDown-2Mbps | *Select the Download pipe* |
| **description** | GuestNetDownload | *Enter a descriptive name* |

Create a rule for the upload traffic

|   |   |   |
| --- | --- | --- |
| **sequence** | 21 | *Auto generated number, overwrite only when needed* |
| **interface** | WAN | *Select the interface connected to the internet* |
| **interface2** | GuestNet | *Select the interface that matches your GuestNet* |
| **proto** | ip | *Select the protocol, IP in our example* |
| **source** | any | *The source address, leave on any* |
| **src-port** | any | *The source port to shape, leave on any* |
| **destination** | any | *The destination IP to shape, leave on any* |
| **dst-port** | any | *The destination port to shape, leave on any* |
| **direction** | out | *Match outgoing packages (upload)* |
| **target** | PipeUp-1Mbps | *Select the Upload pipe* |
| **description** | GuestNetUpload | *Enter a descriptive name* |

Now press ![apply](<../images/ca819e9a-applybtn.png>) to activate the traffic shaping rules.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Prioritize Applications (Weighted) using Queues](<142 Prioritize Applications (Weighted) using Queues.md>)　｜　[下一篇：Fighting Bufferbloat with FQ_CoDel ➡](<144 Fighting Bufferbloat with FQ_CoDel.md>)
