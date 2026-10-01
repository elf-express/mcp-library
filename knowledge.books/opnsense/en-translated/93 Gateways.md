---
title: "Gateways"
source: "https://docs.opnsense.org/manual/gateways.html"
chapter: ["System"]
order: 93
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:32:28.431Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Firmware](<92 Firmware.md>)　｜　[下一篇：Gateway groups Multi WAN ➡](<94 Gateway groups Multi WAN.md>)

# Gateways

> 章節：[System](<000 目錄.md#c-11>)

![](<../images/7238aa1d-blockdiag-1ac1ecbed766e9941fcce1f649bea0.png>)

Gateways define the possible routes that can be used to access other networks, such as the internet. All different paths that are available to your firewall can be managed from this page, which can be found at System->Gateways->Configuration.

You can either define these gateways yourself, or they can be provided automatically from dynamical configured interfaces (e.g. dhcp), in which case they won’t have a predefined address.

When a gateway is generated automatically, you still have the ability to change its settings. Automatically generated gateways usually have names like `WAN_DHCP`.

In cases where you need to forward specific networks to a specific target, you can use static routes, which can be configured in System->Routes->Configuration and depend on the entries shown in the gateway page.

A specific kind of route is the `default` route, this is where all traffic is being send when no other static route is configured. There can only be one default at a time per ip protocol (ipv4, ipv6) in the system routing table.

## Default gateways

Since there can only be one active default gateway, we need a method to figure out which one to use. For both ip protocols (ipv4, ipv6), this is determined equally.

Gateways have priorities, ranging from `1` \[very important\] to `255` \[least important\], automatically generated gateways will receive a low priority by default (which you can change manually).

Next there is a setting called `upstream`, which marks the gateway as favourable for default gateway selection, there can be more than one upstream configured at the same time.

When choosing a default, the algorithm will always sort `upstream` gateways higher (more attractive) and will use the priority next. If none of the gateways is explicitly chosen as upstream, the first non upstream is chosen.

In cases where gateway monitoring is configured, choosing a gateway also involves testing its current status and act accordingly when the monitored address is not reachable.

By default the system only chooses a (new) default gateway on startup or when an interface is connected or disconnected. In many cases you might want the default gateway also changed when the current gateway is not reachable anymore (via configured monitoring), in which case you can enable “Gateway switching” in System->Settings->General

Tip

In case you have multiple (dynamic) gateways, which should fall over in a specific order on failure, just set a **priority** and **upstream** flag. (e.g. favour fiber optics above 4g) Your choices should be reflected accordingly in the gateway grid (most important first).

## Overview page

The overview page (System->Gateways->Configuration) shows all currently known gateways and their statuses in order of importance (most important on top). When a gateway is considered “default” it will show **(active)** behind the name.

Note

The **(active)** status shown in the list reflects the current calculated default, which might differ from the machine routing if gateway switching is not enabled. You can always check the current active default in System->Routes->Status

Tip

When debugging dynamic gateway issues, always check if your expected gateway is actually in the list. The system will only consider items shown here.

## Settings

Below you will find the most important settings that are available for a gateway item.

|   |   |
| --- | --- |
| Disabled | (temporary) disable this item |
| Name | Unique name for this gateway |
| Description | Optional description for this item |
| Interface | The interface this gateway is connected to |
| Address Family | IP family (v4 or v6) |
| IP address | Address of our gateway, empty/**dynamic** when dynamically generated. |
| Upstream Gateway | Upstream gateway, consider this gateway as default gateway candidate |
| Far Gateway | Checkbox to allow the gateway to exist outside of the interface subnet. |
| Disable Gateway Monitoring | Disable monitoring (consider **online**) |
| Disable Host Route | Do not create a dedicated host route for this monitor. |
| Failover States | If this gateway goes down, force clients to reconnect over a different online gateway by killing states associated with this gateway. This option requires “default gateway switching” to be enabled, or this gateway assigned as part of a gateway group to trigger. |
| Failback States | If another gateway comes up with a higher priority than this gateway, force clients to reconnect by killing states associated with this gateway. This option requires “default gateway switching” to be enabled, or this gateway assigned as part of a gateway group to trigger. The common use case for this option are metered connections over LTE that should only be used when no other gateway is online. |
| Monitor IP | Alternative address to monitor, always make sure the address is actually reachable and using this interface (via a static gateway) |
| Mark Gateway as Down | Consider this gateway as down, so it can’t be considered as default gateway |
| Priority | Prioritizes this gateway, a lower value means more important. |

## Troubleshooting

### Missing dynamic gateway

Most dynamic interface types write their current gateway into a file named `/tmp/[interface]_router` or `/tmp/[interface]_routerv6`. When the expected gateway is not listed in the page, there might be an issue with the interface type (for example the remote server isn’t providing one at the moment).

Note

Some VPN types support sending traffic to the interface without knowing an intermediate gateway, to enable this check “Dynamic gateway policy” in the interface settings.

### Gateway marked offline

When a gateway is marked offline, always check if the monitor address is reachable via the correct interface first. You can use Interfaces->Diagnostics->Ping to test connectivity. In case the monitor address is not in the same subnet as the interface, also check if there’s a static route (System->Routes->Status) available which sends the requested traffic to the correct upstream gateway.

There should always be a `dpinger` process active, which you can check on the services page (System->Diagnostics->Services), finally if all seems to be running you can deep dive into the packets leaving the interface, if dpinger is active, there should be ICMP packets heading to your monitor address, which you can inspect using Interfaces->Diagnostics->Packet Capture.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Firmware](<92 Firmware.md>)　｜　[下一篇：Gateway groups Multi WAN ➡](<94 Gateway groups Multi WAN.md>)
