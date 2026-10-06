---
title: "DHCP"
source: "https://docs.opnsense.org/manual/dhcp.html"
chapter: ["Services"]
order: 192
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:19.090Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Services](<191 Services.md>)　｜　[下一篇：DHCrelay ➡](<193 DHCrelay.md>)

# DHCP

> 章節：[Services](<000 目錄.md#c-40>)

DHCP is used to automatically provide clients with an IP address (instead of clients having to set one themselves). DHCP is available for both IPv4 and IPv6 clients, referred to as DHCPv4 and DHCPv6, respectively.

## Available Options

There are different DHCP servers/relays to choose from:

> -   [Dnsmasq](#dnsmasq-dhcp) (default)
>     
> -   [KEA](#kea-dhcp)
>     
> -   [Dhcrelay](#dhcrelay)
>     
> -   [ISC](#isc-dhcp) (EOL)
>     

For DHCPv6 these services can offer Router Advertisements:

> -   [radvd](<197 Router Advertisements.md>)
>     
> -   [Dnsmasq](#dnsmasq-dhcp)
>     

### Dnsmasq DNS & DHCP

[Dnsmasq Manual](<194 Dnsmasq DNS & DHCP.md>)

Dnsmasq is a lightweight DNS, router advertisement and DHCP server. It is intended to provide coupled DNS and DHCP service to a LAN. Dnsmasq accepts DNS queries and either answers them from a small, local, cache or forwards them to a real, recursive, DNS server.

The dnsmasq DHCP server supports static address assignments and multiple networks. It automatically sends a sensible default set of DHCP options, and can be configured to send any desired set of DHCP options, including vendor-encapsulated options.

The dnsmasq DHCPv6 server provides the same set of features as the DHCPv4 server, and in addition, it includes router advertisements and a neat feature which allows naming for clients which use DHCPv4 and stateless autoconfiguration only for IPv6 configuration. There is support for doing address allocation (both DHCPv6 and RA) from subnets which are dynamically delegated via DHCPv6 prefix delegation.

Tip

Dnsmasq is the perfect DNS & DHCP server for small and medium sized setups (less than 1000 unique clients). It is the default for DHCPv4, DHCPv6 and Router Advertisements out of the box.

### KEA DHCP

[KEA Manual](<196 KEA DHCP.md>)

KEA is a modern, modular, and high-performance DHCP server developed by ISC to succeed the legacy ISC DHCP server. It supports both DHCPv4 and DHCPv6 and is designed for scalable and high-availability environments.

KEA does not include DNS or router advertisement features, and is typically integrated with external services (such as Unbound DNS and radvd Router Advertisement Daemon) to provide full-stack DNS/DHCP/RA functionality.

Please note that there is no dynamic DNS lease registration functionality via Unbound implemented.

Tip

KEA is the perfect DHCP server for medium to large sized HA setups (more than 1000 unique clients) or environments requiring dynamic configuration via API.

### ISC DHCP

[ISC Manual](<195 ISC DHCP.md>)

ISC DHCP was the DHCP server developed and maintained by the Internet Systems Consortium (ISC). It supported both DHCPv4 and DHCPv6 and was widely used across a broad range of systems and distributions for many years.

While it provided reliable service for static and dynamic address assignments, its monolithic architecture and limited extensibility led to challenges in modern, dynamic, or high-availability environments. Support for ISC DHCP has officially ended, and it has been fully replaced by KEA DHCP in most setups.

Attention

ISC DHCP is end-of-life and no longer receives updates or security patches. It is strongly recommended to migrate to KEA or Dnsmasq.

### DHCRelay

[DHCrelay Manual](<193 DHCrelay.md>)

DHCP relaying is the forwarding of DHCP requests received on one interface to a DHCP server on another network. This is useful when the DHCP server is not on the same broadcast domain as the client.

The dhcrelay service supports both DHCPv4 and DHCPv6 and can forward requests to multiple upstream servers. It is lightweight and suitable for setups where centralized DHCP servers serve multiple network segments.

Note

DHCrelay binds to port 67 like other available DHCP servers. To run multiple servers side by side, use strict interface binding if available.

## Reservations

ISC, KEA and Dnsmasq offer the possibility to reserve an IP address for a specific client. This is useful when a client needs to have the same IP address every time it connects to the network. All services also offer the ability to define reservations inside and outside of the assigned pool of dynamic IP addresses.

For **Dnsmasq**, you should define reservations **inside of the pool**. The IP address will be completely reserved inside the dynamic range, meaning the reserved IP will not be offered to dynamic clients.

For **ISC and KEA**, you should only define reservations **outside of the pool**. Unless you can guarantee that this client is online at all times when the reservation is in the dynamic range, the DHCP server is free to offer this IP address to a different client when the first client goes offline.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Services](<191 Services.md>)　｜　[下一篇：DHCrelay ➡](<193 DHCrelay.md>)
