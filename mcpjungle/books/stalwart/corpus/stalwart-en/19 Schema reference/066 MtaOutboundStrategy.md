---
title: "MtaOutboundStrategy"
source: https://stalw.art/docs/ref/object/mta-outbound-strategy/
description: "Configures outbound message delivery routing, scheduling, and TLS strategies."
---

# MtaOutboundStrategy

> Section: Schema reference › Objects

Configures outbound message delivery routing, scheduling, and TLS strategies.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Outbound › Strategy

## Fields

##### `connection`

> Type: [`Expression`](#expression) · default: `{"else":"'default'"}`
>
> An expression that returns the connection strategy to use when delivering messages to remote SMTP servers
>
> Available variables: [`MtaQueueHostVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-host-variable).

##### `route`

> Type: [`Expression`](#expression) · default: `{"else":"'mx'"}`
>
> An expression that returns the route name to use when delivering queued messages
>
> Available variables: [`MtaQueueRcptVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-rcpt-variable).

##### `schedule`

> Type: [`Expression`](#expression) · default: `{"else":"'remote'"}`
>
> An expression that returns the scheduling strategy to use when queueing messages
>
> Available variables: [`MtaQueueRcptVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-rcpt-variable).

##### `tls`

> Type: [`Expression`](#expression) · default: `{"else":"'default'"}`
>
> An expression that returns the TLS strategy to use when delivering messages to remote SMTP servers
>
> Available variables: [`MtaQueueHostVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-host-variable).

## JMAP API

The MtaOutboundStrategy singleton is available via the `urn:stalwart:jmap` capability.

### `x:MtaOutboundStrategy/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysMtaOutboundStrategyGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaOutboundStrategy/get",
          {
            "ids": [
              "singleton"
            ]
          },
          "c1"
        ]
      ],
      "using": [
        "urn:ietf:params:jmap:core",
        "urn:stalwart:jmap"
      ]
    }'
```

### `x:MtaOutboundStrategy/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysMtaOutboundStrategyUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaOutboundStrategy/set",
          {
            "update": {
              "singleton": {
                "connection": {
                  "else": "'default'"
                }
              }
            }
          },
          "c1"
        ]
      ],
      "using": [
        "urn:ietf:params:jmap:core",
        "urn:stalwart:jmap"
      ]
    }'
```

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get MtaOutboundStrategy
```

### Update

```sh
stalwart-cli update MtaOutboundStrategy --field connection='{"else":"'\''default'\''"}'
```

## Nested types

### Expression

A conditional expression with match rules and a default value.

##### `match`

> Type: `List<`[`ExpressionMatch`](#expressionmatch)`>`
>
> List of conditions and their corresponding results

##### `else`

> Type: `String` · required
>
> Else condition

#### ExpressionMatch

A single condition-result pair in an expression.

##### `if`

> Type: `String` · required
>
> If condition

##### `then`

> Type: `String` · required
>
> Then clause

## Expression references

The following expression contexts are used by fields on this page:

- [`MtaQueueHostVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-host-variable) (Variables)
- [`MtaQueueRcptVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-rcpt-variable) (Variables)
