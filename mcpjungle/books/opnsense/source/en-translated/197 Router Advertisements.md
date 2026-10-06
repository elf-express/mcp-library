---
title: "Router Advertisements"
source: "https://docs.opnsense.org/manual/radvd.html"
chapter: ["Services"]
order: 197
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:33:20.609Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：KEA DHCP](<196 KEA DHCP.md>)　｜　[下一篇：OpenDNS ➡](<198 OpenDNS.md>)

# Router Advertisements

> 章節：[Services](<000 目錄.md#c-40>)

## [Router Advertisements](#id1)

Index

-   [Router Advertisements](#router-advertisements)
    
    -   [General Settings](#general-settings)
        
    -   [Router Advertisements (Mode)](#router-advertisements-mode)
        
    -   [Configuration examples](#configuration-examples)
        
        -   [Advertise a prefix on LAN](#advertise-a-prefix-on-lan)
            
        -   [Advertise multiple prefixes on LAN](#advertise-multiple-prefixes-on-lan)
            
        -   [DHCPv6](#dhcpv6)
            
        -   [High availability](#high-availability)
            

radvd (the service responsible for this functionality) is the router advertisement daemon for IPv6. It listens to router solicitations and sends router advertisements as described in “Neighbor Discovery for IP Version 6 (IPv6)” ([RFC 4861](https://tools.ietf.org/html/rfc4861)). With these advertisements hosts can automatically configure their addresses and some other parameters. It also defines “Neighbor Discovery Optimization for IPv6 over Low-Power Wireless Personal Area Networks (6LoWPANs)” ([RFC6775](https://tools.ietf.org/html/rfc6775)). They also can choose a default router based on these advertisements.

Attention

[Dnsmasq](<194 Dnsmasq DNS & DHCP.md>) is the default RA daemon in new installations, deactivate its *Router Advertisement* setting if you want to use radvd.

## [General Settings](#id2)

The service can be configured in Services ‣ Router Advertisements.

**General Settings**

| **Option** | **Description** |
| --- | --- |
| **Enabled** | Enable or disable this entry. If “Track Interface (legacy)” is used, an existing disabled entry will also deactivate advertisements on that interface. Alternatively, switch to “Identity association” for full manual configuration if needed. |
| **Interface** | Choose the interface that should send Router Advertisements. A prefix will be constructed from the primary IP of that interface, which is assigned by “Identity association” or “Track interface (legacy)” IPv6 modes of said interface. If additional virtual IP addresses exist on this interface, their prefixes will also be advertised. |
| **Mode** | Select which flags to set in Router Advertisements sent from this interface. |
| **Minimum interval** | The minimum time allowed between sending unsolicited multicast router advertisements from the interface, in seconds. |
| **Maximum interval** | The maximum time allowed between sending unsolicited multicast router advertisements from the interface, in seconds. |
| **Recursive DNS Servers (RDNSS)** | The default is to use this interface IP address with an enabled DNS service or the configured global DNS servers. You may specify up to three explicit servers here instead. |
| **DNS Search List (DNSSL)** | The default is to use the domain name of this system as the DNSSL option. You may specify explicit domains here instead. |
| **Routes** | Routes are specified in CIDR format. The prefix of a route definition should be network prefix; it can be used to advertise more specific routes to the hosts. |

**Advanced Settings**

| **Option** | **Description** |
| --- | --- |
| **Constructor** | Per default, the primary prefix of the given *Interface* in *General Settings* is used. When setting a constructor, the primary prefix of a WAN interface can be used instead. An [NDP proxy](<212 ndp-proxy-go (Neighbor Discovery Proxy).md>) is required if the same WAN prefix is shared by multiple LAN interfaces. |
| **Preference** | Select the Priority for the Router Advertisement (RA) Daemon. |
| **Deprecate Prefix** | Deprecate advertised prefixes on shutdown by announcing a zero preferred lifetime. |
| **Shutdown Advertisement** | Upon shutdown, send a final advertisement with zero router lifetime. |
| **Default Lifetime** | Lifetime in seconds this router is considered a valid default router. |
| **Preferred Lifetime** | Lifetime in seconds addresses remain preferred for new connections. |
| **Valid Lifetime** | Lifetime in seconds addresses remain valid before becoming unusable. |
| **Source Address** | Select the source address embedded in the RA messages. If a CARP address is used DeprecatePrefix and RemoveRoute are both set to “off” by default. |
| **NAT64 prefix** | The NAT64 prefix included in the router advertisements. The “well-known prefix” reserved for this service is 64:ff9b::/96. |
| **Link MTU** | Advertise a specific MTU to clients. Must be equal or greater than 1280 and valid for the link. |
| **Enable DNS** | Control the sending of the embedded DNS configuration (RFC 8106). |
| **Recursive DNS Servers Lifetime** | Lifetime in seconds for advertised recursive DNS servers. |
| **DNS Search List Lifetime** | Lifetime in seconds for advertised DNS search domains. |
| **Route Lifetime** | Lifetime in seconds for advertised routes. |
| **Remove Route** | Withdraw advertised routes on shutdown by sending a zero lifetime. |

## [Router Advertisements (Mode)](#id3)

The mode selection contains some predefined settings for radvd, which influence a set of configuration options and are intended for specific implementation scenarios. They define the type of client deployment used in your network.

---

|   |   |
| --- | --- |
| Router Only | Only advertise this router, clients are using static IPv6 addresses |
| Unmanaged | Clients will use Stateless Address Autoconfiguration (SLAAC), without other (non-address) information being provided. |
| Managed | Stateful configuration, address configuration provided by DHCPv6 |
| Assisted | Stateful configuration, address configuration provided by DHCPv6, although advertised routes can also be used on Stateless Address Autoconfiguration setups (SLAAC). |
| Stateless | Clients will use Stateless Address Autoconfiguration (SLAAC) |

A detailed overview of the `radvd` settings determined by the mode can be found below:

<table>
<tr><td>scope</td><td>Settings</td><td>Router Only</td><td>Unmanaged</td><td>Managed</td><td>Assisted</td><td>Stateless</td></tr>
<tr><td rowspan="2">Per interface</td><td>AdvManagedFlag</td><td></td><td></td><td>X</td><td>X</td><td></td></tr>
<tr><td>AdvOtherConfigFlag</td><td></td><td></td><td>X</td><td>X</td><td>X</td></tr>
<tr><td rowspan="2">Per prefix</td><td>AdvOnLink</td><td></td><td>X</td><td>X</td><td>X</td><td>X</td></tr>
<tr><td>AdvAutonomous</td><td></td><td>X</td><td></td><td>X</td><td>X</td></tr>
</table>

Note

Technical details about the options can be found in the [man](https://www.freebsd.org/cgi/man.cgi?query=radvd.conf) page of radvd

## [Configuration examples](#id4)

### [Advertise a prefix on LAN](#id5)

The most common configuration would be DHCPv6 on the WAN interface and receiving a routed prefix via DHCPv6-PD. When setting the LAN IPv6 configuration to either of “Track Interface (legacy)” or “Identity association” with a unique prefix ID, router advertisements can send that prefix and a default route to clients.

Go to Services ‣ Router Advertisements and add a new entry:

| **Option** | **Description** |
| --- | --- |
| **Enabled** | X |
| **Interface** | LAN |

Press **Save** and **Apply**

Per default, RDNSS and DNSSL options will be sent to clients, containing the IPv6 address of the LAN interface, and the default system domain.

### [Advertise multiple prefixes on LAN](#id6)

If an ULA (Unique Local Address) prefix should be sent in addition to a GUA (Global Unicast Address) prefix, create a virtual IPv6 address in Interfaces ‣ Virtual IPs. Configure it on the LAN interface, make sure the prefix length is /64.

Afterwards, applying the configuration in Services ‣ Router Advertisements will configure the additional prefix.

### [DHCPv6](#id7)

Router Advertisements are sufficient for clients to auto-generate a SLAAC address, receive a default gateway and a DNS server. These are the basic requirement for IPv6 connectivity.

There can be advanced requirements like hostname registration, static reservations and DHCPv6 options.

For these cases, there are two DHCPv6 servers available: [KEA](<196 KEA DHCP.md>) and [Dnsmasq](<194 Dnsmasq DNS & DHCP.md>). As Dnsmasq is best used with its own router advertisement functionality, KEA is the most logical choice to pair with radvd. This is especially true for HA setups, as KEA can synchronize IPv6 leases.

Attention

A combination of KEA and radvd requires a static WAN prefix, as KEA cannot track prefixes dynamically.

To advertise a DHCPv6 server to clients, configure the available [modes](#radvd-mode) to your requirements.

### [High availability](#id8)

For high availability with IPv6, static prefixes are a requirement for seamless failover.

You can follow this setup example: [Configure CARP](<148 Configure CARP.md>)

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：KEA DHCP](<196 KEA DHCP.md>)　｜　[下一篇：OpenDNS ➡](<198 OpenDNS.md>)
