---
title: "Gateway groups Multi WAN"
source: "https://docs.opnsense.org/manual/multiwan.html"
chapter: ["System","Gateway groups / Multi WAN"]
order: 94
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:32:27.436Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Gateways](<93 Gateways.md>)　｜　[下一篇：Multi WAN ➡](<95 Multi WAN.md>)

# Gateway groups Multi WAN

> 章節：[System](<000 目錄.md#c-11>) › [Gateway groups / Multi WAN](<000 目錄.md#c-16>)

## Gateway groups / Multi WAN

Multi WAN scenarios are commonly used for failover or load balancing, but combinations are also possible with OPNsense.

![](<../images/109fc484-blockdiag-1047710c3257429e30bd2ac4adccfc.png>)

The technology used to offer multiwan is called “policy based routing” or “source routing” and depends on the [firewall](<137 Rules.md>) functionality of OPNsense.

Note

Currently it’s not possible to use gateways without an address (Interface option “Dynamic gateway policy”) inside a group. This is due to the fact that the firewall requires an address of the right family (IPv4 / IPv6) to be present on the interface, which can not be guaranteed based on its configuration at the moment.

## Terminology

When configuring gateway groups, there is a limited number of options and terms being used. Besides the name of the group, one can find the following terms on the page:

---

|   |   |
| --- | --- |
| Gateway Priority | If a gateway is configured for a group, the ‘when’ part is divided into ‘tiers,’ with lower numbers (starting at 1) indicating higher importance. When no usable gateways are present within a peer, the next one is considered. |
| Trigger Level | When a gateway inside the tier is considered offline, either when its fully down, has loss or increased latency. |
| Pool Options | Usually left to default, but can influence stickiness for sources on a per group basis. |

## Roles

Using ‘tiers’, multiple scenarios can be constructed, by grouping gateways inside the same tier or choosing to move them to different ones. Below the most common scenarios.

### WAN Failover

WAN failover automatically switches between WAN connections in case of connectivity loss (or high latency) of your primary ISP. As long as the connection is not good all traffic will be routed of the next available ISP/WAN connection and when connectivity is fully restored so will the routing switch back to the primary ISP.

### WAN Load Balancing

Load balancing can be used to split the load between two (or more) ISPs. This enhances the total available bandwidth and/or lowers the load on each ISP.

The principle is simple: Each WAN connection (gateway) gets a portion of the traffic. The traffic can be divided equally or weighted.

### Combining Balancing & Failover

It is also possible to combine Load Balancing with Failover in such scenarios you will have 2 or more WAN connections for Balancing purposes and 1 or more for Failover. OPNsense offers 5 tiers (Failover groups) each tier can hold multiple ISPs/WAN gateways.

## Configuration

For a how to configure read:

-   [Multi WAN](<95 Multi WAN.md>)

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Gateways](<93 Gateways.md>)　｜　[下一篇：Multi WAN ➡](<95 Multi WAN.md>)
