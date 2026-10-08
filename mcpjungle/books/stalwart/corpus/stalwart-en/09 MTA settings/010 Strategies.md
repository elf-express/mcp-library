---
title: "Strategies"
source: https://stalw.art/docs/mta/outbound/strategy/
---

# Strategies

> Section: MTA settings › Outbound

Delivery strategies define the behaviour and policies used when Stalwart MTA delivers email messages, whether to local recipients or remote systems. Strategies allow dynamic delivery logic driven by runtime conditions: [expressions](https://stalw.art/docs/configuration/expressions/) are evaluated for each recipient and message, so routing, scheduling, connection parameters, and transport security can all adapt to the context of each delivery.

Each message processed by the MTA is evaluated against four strategy expressions to determine how it should be handled. The expressions inspect attributes such as sender, recipient, message headers, IP address, or other metadata, and return the name of a named strategy (defined by the appropriate reference object) that should be applied.

There are four types of strategies:

- [Routing strategy](https://stalw.art/docs/mta/outbound/routing): determines the delivery target. A recipient may be routed for local delivery, to a remote host via MX resolution, or through a predefined relay host.
- [Scheduling strategy](https://stalw.art/docs/mta/outbound/schedule): governs how messages are queued and retried. It determines which virtual queue should be used, how frequently delivery attempts are made, how messages are prioritised, and when undeliverable messages expire.
- [Connection strategy](https://stalw.art/docs/mta/outbound/connection): defines how outbound connections to remote mail servers are established, including source IP address, connection timeouts, and custom EHLO domains.
- [TLS strategy](https://stalw.art/docs/mta/outbound/tls): determines the transport-layer security settings applied to the connection, including DANE, MTA-STS, STARTTLS, and certificate-validation policy.

Each strategy type is evaluated independently, but together they define a complete delivery policy.

## Configuration

Delivery behaviour is governed by four fields on the [MtaOutboundStrategy](https://stalw.art/docs/ref/object/mta-outbound-strategy) singleton (found in the WebUI under <!-- breadcrumb:MtaOutboundStrategy --> Settings › MTA › Outbound › Strategy<!-- /breadcrumb:MtaOutboundStrategy -->):

- [`route`](https://stalw.art/docs/ref/object/mta-outbound-strategy#route): expression selecting the route name, resolved to an [MtaRoute](https://stalw.art/docs/ref/object/mta-route) object.
- [`schedule`](https://stalw.art/docs/ref/object/mta-outbound-strategy#schedule): expression selecting the scheduling strategy name, resolved to an [MtaDeliverySchedule](https://stalw.art/docs/ref/object/mta-delivery-schedule) object.
- [`connection`](https://stalw.art/docs/ref/object/mta-outbound-strategy#connection): expression selecting the connection strategy name, resolved to an [MtaConnectionStrategy](https://stalw.art/docs/ref/object/mta-connection-strategy) object.
- [`tls`](https://stalw.art/docs/ref/object/mta-outbound-strategy#tls): expression selecting the TLS strategy name, resolved to an [MtaTlsStrategy](https://stalw.art/docs/ref/object/mta-tls-strategy) object.

Each expression is evaluated for every recipient in a message. They have access to a wide set of [variables](https://stalw.art/docs/configuration/variables#mta-variables) describing the message, its origin, recipients, delivery status, and more, so expressions can match against domain names, message metadata, delivery conditions, or error states. A named strategy object with the returned name must exist. If it does not, delivery does not fail: Stalwart logs an `smtp.id-not-found` warning and falls back to a built-in default (route `mx`, a 2 minute to 2 hour retry schedule expiring after 5 days on the `default` virtual queue, optional TLS, and default connection timeouts). Since that fallback silently replaces the policy you configured, treat these warnings as configuration errors rather than informational messages.

## Example

A typical configuration sets each expression to pick a different strategy name based on context: `route` returns `'local'` when the recipient domain is local (`is_local_domain(rcpt_domain)`) and `'mx'` otherwise; `schedule` returns `'local'` for local recipients, `'dsn'` for delivery-status notifications, `'report'` for aggregate reports, and `'remote'` otherwise; `connection` returns `'long-timeout'` when a previous attempt failed with a connection error and `'default'` otherwise; and `tls` returns `'invalid-tls'` when a previous attempt failed due to a TLS error and `'default'` otherwise. Corresponding [MtaRoute](https://stalw.art/docs/ref/object/mta-route), [MtaDeliverySchedule](https://stalw.art/docs/ref/object/mta-delivery-schedule), [MtaConnectionStrategy](https://stalw.art/docs/ref/object/mta-connection-strategy), and [MtaTlsStrategy](https://stalw.art/docs/ref/object/mta-tls-strategy) objects must be defined with the names referenced by the expressions.

```json
{
  "route": {
    "match": {
      "0": {"if": "is_local_domain(rcpt_domain)", "then": "'local'"}
    },
    "else": "'mx'"
  },
  "schedule": {
    "match": {
      "0": {"if": "is_local_domain(rcpt_domain)", "then": "'local'"},
      "1": {"if": "source == 'dsn'", "then": "'dsn'"},
      "2": {"if": "source == 'report'", "then": "'report'"}
    },
    "else": "'remote'"
  },
  "connection": {
    "match": {
      "0": {"if": "retry_num > 0 && last_error == 'connection'", "then": "'long-timeout'"}
    },
    "else": "'default'"
  },
  "tls": {
    "match": {
      "0": {"if": "retry_num > 0 && last_error == 'tls'", "then": "'invalid-tls'"}
    },
    "else": "'default'"
  }
}
```

:::note
Values on this page follow the [object encoding](https://stalw.art/docs/configuration/object-encoding) rules: list and set fields are JSON objects rather than arrays, and durations and sizes are integers.
:::
