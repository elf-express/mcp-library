---
title: "Transparent Filtering Bridge"
source: https://docs.opnsense.org/manual/how-tos/transparent_bridge.html
chapter: ["Interfaces","Setup Guides","Interfaces"]
order: 118
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:41.195Z"
---

# Transparent Filtering Bridge

## [Transparent Filtering Bridge](#id1)

Index

-   [Transparent Filtering Bridge](#transparent-filtering-bridge)
    
    -   [Introduction](#introduction)
        
        -   [Requirements](#requirements)
            
    -   [Configuration](#configuration)
        
        -   [1\. Assign management interface](#assign-management-interface)
            
        -   [2\. Change system tuneables](#change-system-tuneables)
            
        -   [3\. Create the bridge](#create-the-bridge)
            
        -   [4\. Add Firewall rules](#add-firewall-rules)
            
        -   [5\. Enable IDS/IPS](#enable-ids-ips)
            
        -   [6\. Connect interfaces to existing infrastructure](#connect-interfaces-to-existing-infrastructure)
            

## [Introduction](#id2)

A transparent firewall can be used to filter traffic without creating different subnets. The firewall bridges the same layer 2 broadcast domain across two or more ports. If a VLAN trunk is connected, any VLAN tagged frames will be bridged transparently.

This setup can be used to filter via firewall rules and use IDS/IPS to inspect all packets via a netmap driver.

For more information on Filtering Bridged on FreeBSD, see [filtering-bridges](https://www.freebsd.org/doc/en/articles/filtering-bridges/article.html)

Attention

The bridge is not compatible with Traffic Shaping.

Attention

When vlan tagged frames should be passed through, do not create any vlans on the member ports of the bridge. Otherwise, vlan tagged frames would be filtered and the bridge would not be transparent anymore.

### [Requirements](#id3)

For best compatibility and performance, a bare metal appliance with at least 3 physical ports should be used. A virtualized appliance could also work, but there could be elusive layer 2 issues with bridging or vlans.

Attention

If a vlan trunk is used, you should always use a bare metal appliance, and preferably Intel network cards. The native netmap driver used for IDS/IPS in combination with VLANs does not always work correctly with other vendors or virtualized NICs. Please also ensure that only tagged frames are sent over this trunk.

## [Configuration](#id4)

Our example appliance has 3 available network ports:

-   igc0: LAN (Bridge)
    
-   igc1: WAN (Bridge)
    
-   igc2: Management
    

```
         +-----------------+                 +-----------------+
Internet |                 |      WAN (igc1) |     (Bridge)    | LAN (igc0)
-------->|    ISP Router   |---------------->|     OPNsense    |----------> Switch
         |                 |      trunk port |  Firewall, IPS  | trunk port
         +-----------------+                 +-----------------+
                                                      | Management (igc2)
                                                      |-------------------> Switch
                                                        access port
```

Tip

The management interface can either be directly connected to the ISP router on a separate port, or to an internal switch on a VLAN that will circle back through the bridge.

### [1\. Assign management interface](#id5)

The management interface will be used to access the firewall WebGUI and to enable access to the internet for firmware updates.

-   Go to Interfaces ‣ Assignments and Assign a new interface. Select one of the free available ports (e.g. igc2) and assign it, set the description to Management.
    
-   Afterwards go to Interfaces ‣ Management and set IPv4 Configuration Type to DHCP or Static IPv4 dependent on your usecase.
    

Next we add a firewall rule to allow access to the WebGUI on this management interface:

-   Go to Firewall ‣ Rules ‣ Management and add a new rule that allows HTTPS access to destination This Firewall.
    

After applying all of these settings, connect to your appliance over the management port for the next steps.

### [2\. Change system tuneables](#id6)

Here we change that the firewall rules should match on the bridge, instead of the bridge members.

-   Go to System ‣ Settings ‣ System Tuneables and set:
    
    > -   `net.link.bridge.pfil_bridge` - `1`
    >     
    > -   `net.link.bridge.pfil_member` - `0`
    >     
    

### [3\. Create the bridge](#id7)

-   Go to Interfaces ‣ WAN and Interfaces ‣ LAN:
    
    > -   Set IPv4 Configuration Type and IPv6 Configuration Type to `None`
    >     
    > -   Disable Block private networks and Block bogon networks
    >     
    

Attention

Disable any DHCP servers that are bound to the LAN interface.

-   Go to Interfaces ‣ Devices ‣ Bridge:
    
    > -   Add a new bridge and select WAN and LAN as Member interfaces
    >     
    

Attention

Do not select Enable link-local address, in this configuration the bridge interface should stay unnumbered (no IP addresses or any vlans assigned to it or its member interfaces)

-   Go to Interfaces ‣ Assignments:
    
    > -   Assign the new bridge interface, set the description to Bridge
    >     
    
-   Go to Interfaces ‣ Bridge:
    
    > -   Enable the bridge interface in the interface settings
    >     
    > -   Set IPv4 Configuration Type and IPv6 Configuration Type on `None`
    >     
    

### [4\. Add Firewall rules](#id8)

-   Go to Firewall ‣ Rules ‣ Bridge:
    
    > -   Add firewall rules on the bridge interface to allow all traffic (direction in and out)
    >     
    

Tip

You can create more restrictive rules if required. If only IDS/IPS should be used, rules that allow any traffic are sufficient. Since the bridge is fully transparent and unnumbered, no client can communicate with the firewall directly.

### [5\. Enable IDS/IPS](#id9)

To inspect all bridge traffic, we can enable the Intrusion Detection service.

Go to Services ‣ Intrusion Detection ‣ Administration ‣ General Settings

| Option | Description |
| --- | --- |
| Enabled | `X` |
| IPS mode | `X` |
| Promiscuous mode | `X` (if vlan tagged frames are received on bridge members) |
| Interfaces | `WAN` |

Afterwards download and activate the rules that you need and apply the configuration.

Attention

Do not choose the bridge interface, always choose the WAN interface. The emulated netmap driver cannot process vlans on the bridge, it must attach in native mode to the physical interface.

### [6\. Connect interfaces to existing infrastructure](#id10)

Now you can connect the bridge member interfaces to their respective switch or router.

WAN should be connected to a trunk port on the WAN facing side, and LAN to a trunk port on the internal protected side.

The firewall will be able to connect to the internet to fetch the latest updates via the management port.