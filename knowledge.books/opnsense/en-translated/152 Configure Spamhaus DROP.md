---
title: "Configure Spamhaus DROP"
source: "https://docs.opnsense.org/manual/how-tos/drop.html"
chapter: ["Firewall","Setup guides"]
order: 152
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:32:57.372Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Organize PF Rules by Category](<151 Organize PF Rules by Category.md>)　｜　[下一篇：Security Zones ➡](<153 Security Zones.md>)

# Configure Spamhaus DROP

> 章節：[Firewall](<000 目錄.md#c-26>) › [Setup guides](<000 目錄.md#c-31>)

The Spamhaus Don’t Route Or Peer Lists

DROP (Don’t Route Or Peer) and DROPv6 are advisory “drop all traffic” lists, consisting of netblocks that are “hijacked” or leased by professional spam or cyber-crime operations (used for dissemination of malware, trojan downloaders, botnet controllers). The DROP and DROPv6 lists are a tiny subset of the SBL, designed for use by firewalls and routing equipment to filter out the malicious traffic from these netblocks.

*Source :* [https://www.spamhaus.org/drop/](https://www.spamhaus.org/drop/)

For this How-To we will use the Alias feature and a firewall block rule. The lists for this example are located here:

> -   [DROP list](https://www.spamhaus.org/drop/drop_v4.json)
>     
> -   [DROPv6 list](https://www.spamhaus.org/drop/drop_v6.json)
>     

## Step 1 - Create an Alias for Spamhaus

Go to Firewall ‣ Aliases ‣ All and press the **Add a new alias** button in the top right corner of the form.

Enter the following data:

|   |   |   |
| --- | --- | --- |
| **Name** | spamhaus\_drop | *Name of our alias* |
| **Description** | Spamhaus DROP | *Freely chosen description* |
| **Type** | URL Table in JSON format (IPs) | *URL type* |
| **Content** | [https://www.spamhaus.org/drop/drop\_v4.json](https://www.spamhaus.org/drop/drop_v4.json) | *Don’t Route Or Peer List* |
| **Path expression** | cidr | *JSON field to be used* |

Set the refresh frequency to 1 for each day.

Press **Save** and then **Add a new alias**.

|   |   |   |
| --- | --- | --- |
| **Name** | spamhaus\_dropv6 | *Name of our alias* |
| **Description** | Spamhaus DROPv6 | *Freely chosen description* |
| **Type** | URL Table in JSON format (IPs) | *URL type* |
| **Content** | [https://www.spamhaus.org/drop/drop\_v6.json](https://www.spamhaus.org/drop/drop_v6.json) | *Don’t Route Or Peer List v6* |
| **Path expression** | cidr | *JSON field to be used* |

Set the refresh frequency to 1 for each day.

Press **Save** and then **Apply changes**.

## Step 2 - Firewall Rules Inbound Traffic

We will block incoming connections and outgoing connections for the drop and dropv6 lists. To do so we will start with inbound traffic on the WAN interface. Go to Firewall ‣ Rules Select the **WAN** tab and press the **+** icon in the lower right corner.

Enter the following configuration and leave all other parameters on default values:

|   |   |   |
| --- | --- | --- |
| **Action** | Block | *Choose block to drop the incoming traffic* |
| **Interface** | WAN | *Should be the default value* |
| **TCP/IP Version** | IPv4 | *For our example we use IPv4* |
| **Source** | spamhaus\_drop | *Our alias for the DROP list* |
| **Category** | Spamhaus | *Freely chosen Category* |
| **Description** | Block DROP | *Freely chosen description* |

**Save** and repeat this action for the DROPv6 list:

|   |   |   |
| --- | --- | --- |
| **Action** | Block | *Choose block to drop the incoming traffic* |
| **Interface** | WAN | *Should be the default value* |
| **TCP/IP Version** | IPv6 | *For our example we use IPv6* |
| **Source** | spamhaus\_dropv6 | *Our alias for the DROP list* |
| **Category** | Spamhaus | *Freely chosen Category* |
| **Description** | Block DROPv6 | *Freely chosen description* |

**Save**

## Step 3 - Firewall Rules Outbound Traffic

Now do the same for outbound traffic on the LAN interface. Go to Firewall ‣ Rules Select the **LAN** tab and press the **+** icon in the lower right corner.

|   |   |   |
| --- | --- | --- |
| **Action** | Block | *Choose block to drop the incoming traffic* |
| **Interface** | LAN | *Should be the default value* |
| **TCP/IP Version** | IPv4 | *For our example we use IPv4* |
| **Destination** | spamhaus\_drop | *Our alias for the DROP list* |
| **Category** | Spamhaus | *Freely chosen Category* |
| **Description** | Block DROP | *Freely chosen description* |

**Save** and add the DROPv6 list:

|   |   |   |
| --- | --- | --- |
| **Action** | Block | *Choose block to drop the incoming traffic* |
| **Interface** | LAN | *Should be the default value* |
| **TCP/IP Version** | IPv6 | *For our example we use IPv6* |
| **Destination** | spamhaus\_dropv6 | *Our alias for the DROPv6 list* |
| **Category** | Spamhaus | *Freely chosen Category* |
| **Description** | Block DROPv6 | *Freely chosen description* |

**Save** and **Apply changes**

**DONE**

## Check pf Tables

To list the IP addresses that are currently in the DROP and DROPv6 lists go to Firewall ‣ Diagnostics ‣ Aliases and select the list you want to see.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Organize PF Rules by Category](<151 Organize PF Rules by Category.md>)　｜　[下一篇：Security Zones ➡](<153 Security Zones.md>)
