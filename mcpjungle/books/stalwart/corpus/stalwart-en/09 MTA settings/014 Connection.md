---
title: "Connection"
source: https://stalw.art/docs/mta/outbound/connection/
---

# Connection

> Section: MTA settings › Outbound

A connection strategy defines how Stalwart MTA establishes SMTP connections to remote servers during message delivery. While [routing strategies](https://stalw.art/docs/mta/outbound/routing) determine *where* messages are delivered, connection strategies control *how* those connections are made. A connection strategy specifies parameters such as the source IP address to bind to, the hostname to advertise in the `EHLO` command, and timeout values for each stage of the SMTP session. This level of control is useful in multi-homed systems, outbound IP rotation setups, or when complying with specific policy or network constraints.

Each connection strategy is defined as an [MtaConnectionStrategy](https://stalw.art/docs/ref/object/mta-connection-strategy) object (found in the WebUI under <!-- breadcrumb:MtaConnectionStrategy --> Settings › MTA › Outbound › Connection Strategies<!-- /breadcrumb:MtaConnectionStrategy -->). Strategies are selected dynamically for each recipient via the connection expression on [MtaOutboundStrategy](https://stalw.art/docs/ref/object/mta-outbound-strategy); see [Strategies](https://stalw.art/docs/mta/outbound/strategy) for details.

Each connection strategy operates independently and can be tailored to specific domains, message types, or security requirements. For example, one strategy might use a dedicated IP address and hostname for high-volume transactional mail, while another uses different parameters for low-volume or internal mail.

## EHLO hostname

The [`ehloHostname`](https://stalw.art/docs/ref/object/mta-connection-strategy#ehlohostname) field overrides the EHLO hostname used when this strategy is applied. When left empty, the system hostname is used. For example:

```json
{
  "name": "default",
  "ehloHostname": "mx.example.org"
}
```

## Source IP

The [`sourceIps`](https://stalw.art/docs/ref/object/mta-connection-strategy#sourceips) field accepts a list of local IPv4 and IPv6 addresses to use when delivering messages to remote servers. If multiple entries are provided, Stalwart randomly selects one for each new connection. Each entry carries a required `sourceIp` and an optional `ehloHostname` that overrides the strategy-wide EHLO hostname for that source address.

Correct configuration of `sourceIps` is important for deliverability on multi-homed systems. If no source address is set and the system has several local IPs, the kernel chooses one arbitrarily, which may hurt reputation or violate policy. Per-source EHLO overrides are useful when different IPs are associated with different domains or services.

Example strategy with four source addresses, one of which overrides the EHLO hostname:

```json
{
  "name": "default",
  "ehloHostname": "mx.example.org",
  "sourceIps": {
    "0": {"sourceIp": "192.0.2.10", "ehloHostname": "mx-192-0-2-10.example.org"},
    "1": {"sourceIp": "192.0.2.11"},
    "2": {"sourceIp": "2001:db8::a"},
    "3": {"sourceIp": "2001:db8::b"}
  }
}
```

## Timeouts

Timeouts cap how long Stalwart waits for the remote server to respond at each stage of the SMTP dialogue: [`connectTimeout`](https://stalw.art/docs/ref/object/mta-connection-strategy#connecttimeout) (connection establishment, default 5 minutes), [`greetingTimeout`](https://stalw.art/docs/ref/object/mta-connection-strategy#greetingtimeout) (SMTP greeting, default 5 minutes), [`ehloTimeout`](https://stalw.art/docs/ref/object/mta-connection-strategy#ehlotimeout) (`EHLO` response, default 5 minutes), [`mailFromTimeout`](https://stalw.art/docs/ref/object/mta-connection-strategy#mailfromtimeout) (`MAIL FROM` response, default 5 minutes), [`rcptToTimeout`](https://stalw.art/docs/ref/object/mta-connection-strategy#rcpttotimeout) (`RCPT TO` response, default 5 minutes), and [`dataTimeout`](https://stalw.art/docs/ref/object/mta-connection-strategy#datatimeout) (`DATA` response, default 10 minutes):

```json
{
  "connectTimeout": 180000,
  "greetingTimeout": 180000,
  "ehloTimeout": 180000,
  "mailFromTimeout": 180000,
  "rcptToTimeout": 180000,
  "dataTimeout": 600000
}
```

:::note
Values on this page follow the [object encoding](https://stalw.art/docs/configuration/object-encoding) rules: list and set fields are JSON objects rather than arrays, and durations and sizes are integers.
:::
