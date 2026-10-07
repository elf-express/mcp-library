---
title: "Generic info"
source: https://docs.opnsense.org/manual/firewall_generic.html
chapter: ["Firewall"]
order: 131
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:46.585Z"
---


# Generic info


This chapter explains some of the concepts that are used in different modules of our firewall system and therefore don’t belong to a specific section of this topic.

## Address types

When choosing source and/or destination addresses, the user can choose several options depending on the context. To explain what the different options mean when being presented, we will summarize them below:

---

|   |   |
| --- | --- |
| Alias | Flexible type of network or address definition for easy reuse, explained in [aliases](<132 Aliases.md>) |
| Single host or network | Standard host or network in [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) |
| any | All IPv4 and/or IPv6 addresses (in the world) |
| This Firewall | All IPv4 and/or IPv6 addresses assigned to this firewall |
| \[Interface\] Network | All networks assigned to the device, this will also include networks of assigned virtual addresses (\[Interface\] is explained in the [interfaces](<106 Interface configuration.md>) topic). Normally used to allow traffic from or to clients connected to a specific interface. |
| \[Interface\] Address | All addresses configured on an interface, this includes all virtual (alias) addresses as well. |
| Virtual IPs | Explicit selection for addresses defined in [Virtual IPs](<111 Virtual IPs.md>) |

---

