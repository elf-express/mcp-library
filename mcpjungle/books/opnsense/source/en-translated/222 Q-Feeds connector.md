---
title: "Q-Feeds connector"
source: "https://docs.opnsense.org/manual/qfeeds.html"
chapter: ["Third-party Plugins","Q-Feeds Threat Intelligence"]
order: 222
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:33:32.806Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zenarmor Installing via Command Line](<221 Zenarmor Installing via Command Line.md>)　｜　[下一篇：Troubleshooting ➡](<223 Troubleshooting.md>)

# Q-Feeds connector

> 章節：[Third-party Plugins](<000 目錄.md#c-47>) › [Q-Feeds Threat Intelligence](<000 目錄.md#c-49>)

## [Q-Feeds connector](#id1)

Index

-   [Q-Feeds connector](#q-feeds-connector)
    
    -   [Introduction](#introduction)
        
    -   [External resources](#external-resources)
        
    -   [Installation](#installation)
        
    -   [Activate the plugin](#activate-the-plugin)
        
    -   [Menu options](#menu-options)
        
    -   [Firewall setup](#firewall-setup)
        
    -   [DNS/Domain blocking using Unbound](#dns-domain-blocking-using-unbound)
        
    -   [DNS/Domain blocking using DNSCrypt-Proxy](#dns-domain-blocking-using-dnscrypt-proxy)
        

## [Introduction](#id2)

In today’s world, keeping your network secure is super important. Next Generation Firewalls (NGFWs) are essential tools for protecting your network. They can filter DNS and web traffic using external dynamic lists of threat indicators, known as Indicators of Compromise (IoCs).

Q-Feeds provides dynamic, up-to-date lists of these IoCs, designed specifically for use with security controls like NGFWs. By integrating Q-Feeds into your OPNsense firewall, you can improve your network’s protection against new and emerging threats. This means your firewall can automatically block harmful traffic and stay updated with the latest threat information.

Two types of lists are supported by this plugin, IPs using firewall aliases and domains using an integration with Unbound blocklists or DNSCrypt-Proxy.

This document explains how to install and use Q-Feeds on your OPNsense firewall.

## [External resources](#id3)

In order to use Q-Feeds, a (free or paid) subscription is required. Please visit [https://qfeeds.com/opnsense/](https://qfeeds.com/opnsense/) for more information and to sign up for access. The differences between available service offerings and extensive documentation is available there as well.

## [Installation](#id4)

Installation of this plugin is rather easy, go to System ‣ Firmware ‣ Plugins and search for **os-q-feeds-connector**, use the \[+\] button to install it.

Next go to Security ‣ Q-Feeds Connect to configure the service.

## [Activate the plugin](#id5)

To activate the plugin please go to Security ‣ Q-Feeds Connect. The settings page of the Q-Feeds plugin will now open and it asks for an API token.

You can obtain this token by register an account on our Threat Intelligence Portal ([https://tip.qfeeds.com](https://tip.qfeeds.com/)).

After you’ve registered an account and logged in, on the dashboard you will find the **Manage API Keys** page. On this page click **Create Free API Key**.

Copy the API token into the settings page of the plugin on your OPNsense appliance. Click Apply and the plugin will start fetching the Threat Intelligence and create firewall aliases.

## [Menu options](#id6)

The (configuration) options available via the plugin can be accessed via a set of tabs in Security ‣ Q-Feeds Connect. Below you will find their purpose.

**Setting**

Subscription configuration

| **Option** | **Description** |
| --- | --- |
| **//General Settings** |  |
| **API key** | The API key needed to access Q-Feeds. |
| **Register domain feeds** | Use domain feeds in Unbound DNS and DNScrypt-proxy blocklists, requires blocklists to be enabled in order to have effect |
| **//Unbound blocklist settings** |  |
| **Allowlist Domains** | Domains to allow (regex supported), only applies to blocklist matches |
| **Source Net(s)** | Source networks to apply policy on, leave empty for all |
| **Destination Address** | IP for blocklist entries (default 0.0.0.0) |
| **Return NXDOMAIN** | Use NXDOMAIN response instead of destination address |

**Feeds**

Shows subscription status.

| **Field** | **Description** |
| --- | --- |
| Description | Name of the list |
| Type | IP (firewall rules), domain (DNS, Unbound or DNSCrypt-Proxy) |
| Updated at | Last updated at (iso date) |
| Next update | Scheduled to be updated again at (iso date) |
| Licensed | Valid license on this list installed |

**Events**

When firewall rules are being send to the log, you can gather a list of events that took place for items in the firewall table.

| **Field** | **Description** |
| --- | --- |
| Timestamp | Time the event occurred |
| Interface | Which interface it was logged on |
| Direction | Did this concern in(bound) or out(bound) traffic |
| Source | Source IP address |
| Destination | Destination IP address |

## [Firewall setup](#id7)

In order to block traffic originating or going to addresses on the list, you will need firewall rules. The most simple scenario would drop traffic coming from `lan` going to items in our list or entering via `wan` originating from entries in the list.

From LAN:

| Parameter | Value | Short description |
| --- | --- | --- |
| Action | `Block` | Drop packets silently |
| Interface | `LAN` | Traffic on the LAN interface |
| TCP/IP Version | `IPV4/IPV6` | Both protocols are supported |
| Direction | `in` | By default we filter on inbound traffic |
| Destination | `__qfeeds_malware_ip` | The QFeeds offered malware locations |
| Logging | `checked` | With logging enabled, you can track offenders |

From WAN:

| Parameter | Value | Short description |
| --- | --- | --- |
| Action | `Block` | Drop packets silently |
| Interface | `WAN` | Traffic on the LAN interface |
| TCP/IP Version | `IPV4/IPV6` | Both protocols are supported |
| Direction | `in` | By default we filter on inbound traffic |
| Source | `__qfeeds_malware_ip` | The QFeeds offered malware locations |
| Logging | `checked` | With logging enabled, you can track offenders |

Note

Only non default rule settings which are offered in the tables above. More information about using firewall rules and aliases can be found in the [Firewall](<130 Firewall.md>) section.

## [DNS/Domain blocking using Unbound](#id8)

Note

In order to make us of DNS based logging you need to configure Unbound as your primary DNS server. More information on how to configure this can be found [here](<199 Unbound DNS.md>)

In Security ‣ Q-Feeds Connect make sure to enable **“Register domain feeds”** and hit Apply. For older versions (<25.7.9) also make sure Unbound Blocklists are enabled in Services ‣ Unbound DNS ‣ Blocklist.

Additional Unbound blocklist options: **Allowlist Domains** lets you whitelist domains that would otherwise be blocked (regex supported). **Source Net(s)** restricts the policy to specific client networks, e.g. 192.168.1.0/24; leave empty for all clients. **Destination Address** sets the IP returned for blocked domains (default 0.0.0.0). **Return NXDOMAIN** returns a non-existent domain response instead of redirecting, which hides blocklist behavior from clients.

You can use Reporting ‣ Unbound DNS to gain insights into the requested domains.

## [DNS/Domain blocking using DNSCrypt-Proxy](#id9)

When the DNSCrypt-Proxy plugin is installed, domain feeds can be used for DNS blocking. Enable **“Register domain feeds”** in Security ‣ Q-Feeds Connect, then select the Q-Feeds blocklist within the DNSCrypt-Proxy plugin settings to activate it.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zenarmor Installing via Command Line](<221 Zenarmor Installing via Command Line.md>)　｜　[下一篇：Troubleshooting ➡](<223 Troubleshooting.md>)
