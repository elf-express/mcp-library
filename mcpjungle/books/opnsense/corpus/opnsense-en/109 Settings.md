---
title: "Settings"
source: https://docs.opnsense.org/manual/interfaces_settings.html
chapter: ["Interfaces"]
order: 109
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:35.849Z"
---

# Settings

There are some advanced settings, which you can alter in Interfaces ‣ Settings, most of the time you should leave these settings default, but advanced scenarios may require specific settings.

The settings on this page will be applied after reboot or a reconfiguration of each interface.

## Hardware CRC

Disable hardware checksum offloading, which is checked by default, controls if user-configurable checksum offloading might be handled by the network card. Not all technologies support this (IPS for example) and some drivers have issues when enabled. We generally advise to keep this disabled, the performance gain is debatable as well.

(the `ifconfig` settings in the OS related to this setting are `txcsum` , `rxcsum` , `txcsum6` , `rxcsum6`)

## Hardware TSO

Disable hardware TCP segmentation offload, also checked by default, prevents the system to offload packet segmentation to the network card. This option is incompatible with IPS in OPNsense and is broken in some network cards.

(the `ifconfig` settings in the OS related to this setting are `tso` , `tso4` , `tso6`)

## Hardware LRO

Disable hardware large receive offload, which is checked by default, prevents the network card from aggregating incoming packets into a larger buffer before passing it further on the network stack (in order to decrease the number of packets to process).

For routing traffic its usually advisable to disable options which queue traffic in the network card to prevent additional latency.

Enabling LRO might degrade routing performance or for some drivers is incompatible with packet-forwarding at all.

(the `ifconfig` setting in the OS related to this setting is `lro`)

## VLAN Hardware Filtering

Set usage of VLAN hardware filtering. This hardware acceleration may be broken in some device drivers, our advice is to keep this setting on “Disable VLAN Hardware Filtering”, which is the default as of 20.7. In some cases (pre 20.7) we have seen random disconnects when the driver is forced into a mode it was not set at by default.

(the `ifconfig` settings in the OS related to this setting are `vlanhwtag`, `vlanhwcsum` , `vlanhwfilter` , `vlanhwtso`)

## ARP Handling

By default the kernel logs movement of ip addresses from one hardware address to another and when an arp request is received on the wrong interface. When checking this option, it will stop doing so, which is practical if multiple interfaces reside on the same broadcast domain.

(for a more detailed description, see `man arp` and search `log_arp_wrong_iface` and `log_arp_movements`)

## Allow IPv6

By default selected, when deselected IPv6 related configuration will be ignored and a firewall rule will be generated blocking all transit IPv6 traffic on this machine. The floating firewall section will display this rule when “Automatically generated rules” is expanded.

## Prevent release

Do not send a release message on client exit to prevent the release of an allocated address or prefix on the server.

## Log level

Modify log level for IPv6 clients. Info will give status, interface leases and addresses. Debug will give full diagnostics.

## DHCP Unique Identifier

This option can be used to enter an explicit DUID for use by IPv6 DHCP clients, the different types are detailed in [section 11 of rfc8415](https://tools.ietf.org/html/rfc8415#section-11)

When not set, the dhcp v6 client (`dhcp6c`) will assign one automatically.