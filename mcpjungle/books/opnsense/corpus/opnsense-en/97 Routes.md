---
title: "Routes"
source: https://docs.opnsense.org/manual/routes.html
chapter: ["System"]
order: 97
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:28.930Z"
---

# Routes

Routing is one of the core features of your firewall, which is responsible for forwarding packets over the network based on (predefined) paths.

Within the routing section of your firewall you can keep track of configured routes and define static routes yourself to teach your firewall which path it should take when forwarding packets to a specific network.



When a client sends a packet to the firewall for a network not directly attached to it, the firewall would normally check its routing table to determine to which gateway (see [Gateways](<93 Gateways.md>)) it should be send.

Tip

Use traceroute (Interfaces ‣ Diagnostics ‣ Trace Route) to verify which path traffic would follow to reach its destination.

## Configuration

This is where you can setup static routes, looking at the diagram in the previous chapter, here you would define how `[1]` would access `[2]` using router `[3]`.

The number of settings are obviously limited, we need to know the gateway and the target network.

---

|   |   |
| --- | --- |
| Disabled | (temporary) disable this item |
| Network Address | Destination network to reach |
| Gateway | The gateway to use. |
| Description | Optional description for this item |

Note

Some services are known to update the routing table themselves, in which case you shouldn’t add static routes manually (OpenVPN manages its own routes for example).

## Status

The status page shows the current active content of the routing table.

---

|   |   |
| --- | --- |
| Proto | Protocol (IPv4 or IPv6) |
| Destination | Destination network |
| Gateway | Where to send the packet for this destination network |
| Flags | Routes have associated flags which influence operation of the protocols when sending to destinations matched by the routes. See the **Flags** table below for details. |
| Use | Counts the number of packets sent via this route |
| MTU | The MTU set for this route |
| Netif | Interface to use for this route |
| Netif (name) | Name of the interface if found |
| Expire | The time at which this route should expire, or zero if it should never expire. It is the responsibility of individual protocol suites to ensure that routes are actually deleted once they expire. |

### Flags

The following flags are supported by the kernel.

| Letter / Flag | Description |
| --- | --- |
| 1 \[RTF\_PROTO1\] | Protocol specific routing flag |
| 2 \[RTF\_PROTO2\] | Protocol specific routing flag |
| 3 \[RTF\_PROTO3\] | Protocol specific routing flag |
| B \[RTF\_BLACKHOLE\] | Just discard pkts (during updates) |
| b \[RTF\_BROADCAST\] | The route represents a broadcast address |
| C \[RTF\_CLONING\] | Generate new routes on use |
| c \[RTF\_PRCLONING\] | Protocol-specified generate new routes on use |
| D \[RTF\_DYNAMIC\] | Created dynamically (by redirect) |
| d \[RTF\_DONE\] | Message confirmed |
| G \[RTF\_GATEWAY\] | Destination is a gateway |
| H \[RTF\_HOST\] | Host entry (net otherwise) |
| L \[RTF\_LLINFO\] | Valid protocol to link address translation |
| M \[RTF\_MODIFIED\] | Modified dynamically (by redirect) |
| R \[RTF\_REJECT\] | Host or net unreachable |
| S \[RTF\_STATIC\] | Manually added |
| U \[RTF\_UP\] | Route usable |
| X \[RTF\_XRESOLVE\] | External daemon resolves name |

## Logs

Route related logging, like `radvd` and `rtsold` for IPv6 write messages to this logging section which can be used for debugging purposes.