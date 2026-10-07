---
title: "Multicast DNS Proxy"
source: https://docs.opnsense.org/manual/how-tos/multicast-dns.html
chapter: ["Community Plugins","DNS"]
order: 216
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:29.746Z"
---

# Multicast DNS Proxy

If you want to connect multicast DNS of multiple networks, you will need to proxy between them.

## Installation

First of all, you have to install the mdns-repeater plugin (os-mdns-repeater) from the plugins view.



After a page reload you will get a new menu entry under services for MDNS Repeater. Select it and you will get to the following screen:



## Configuration

Warning

mdns-repeater requires at least 2 interfaces, and no more than 5 interfaces to work.

The configuration is fairly simple. Just enable the service and add the interfaces. For example:

| Property | Value |
| --- | --- |
| Enabled | checked |
| Interfaces | LAN, OPT1, OPT2 |