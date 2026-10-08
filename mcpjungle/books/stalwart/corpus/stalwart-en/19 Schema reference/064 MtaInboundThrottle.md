---
title: "MtaInboundThrottle"
source: https://stalw.art/docs/ref/object/mta-inbound-throttle/
description: "Defines an inbound rate limit rule for SMTP connections."
---

# MtaInboundThrottle

> Section: Schema reference › Objects

Defines an inbound rate limit rule for SMTP connections.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Rates & Quotas › Inbound Rate Limits

## Fields

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this throttle

##### `description`

> Type: `String` · read-only
>
> Short description for the throttle

##### `key`

> Type: `Set<`[`MtaInboundThrottleKey`](#mtainboundthrottlekey)`>`
>
> Optional list of context variables that determine where this throttle should be applied

##### `match`

> Type: [`Expression`](#expression) · default: `{"else":"true"}`
>
> Enable the imposition of concurrency and rate limits only when a specific condition is met
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `rate`

> Type: [`Rate`](#rate) · required
>
> Number of incoming requests over a period of time that the rate limiter will allow

## JMAP API

The MtaInboundThrottle object is available via the `urn:stalwart:jmap` capability.

### `x:MtaInboundThrottle/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysMtaInboundThrottleGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaInboundThrottle/get",
          {
            "ids": [
              "id1"
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

### `x:MtaInboundThrottle/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysMtaInboundThrottleCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaInboundThrottle/set",
          {
            "create": {
              "new1": {
                "key": {},
                "rate": {}
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

#### Update

This operation requires the `sysMtaInboundThrottleUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaInboundThrottle/set",
          {
            "update": {
              "id1": {
                "enable": true
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

#### Destroy

This operation requires the `sysMtaInboundThrottleDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaInboundThrottle/set",
          {
            "destroy": [
              "id1"
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

### `x:MtaInboundThrottle/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysMtaInboundThrottleQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaInboundThrottle/query",
          {
            "filter": {}
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
stalwart-cli get MtaInboundThrottle id1
```

### Create

```sh
stalwart-cli create MtaInboundThrottle \
  --field 'key={}' \
  --field 'rate={}'
```

### Query

```sh
stalwart-cli query MtaInboundThrottle
```

### Update

```sh
stalwart-cli update MtaInboundThrottle id1 --field enable=true
```

### Delete

```sh
stalwart-cli delete MtaInboundThrottle --ids id1
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

### Rate

Defines a rate limit as a count over a time period.

##### `count`

> Type: `UnsignedInt` · default: `0` · min: 1 · max: 1000000
>
> Count

##### `period`

> Type: `Duration` · default: `0` · min: 1
>
> Period

## Enums

### MtaInboundThrottleKey

| Value | Label |
|---|---|
| `listener` | Listener |
| `remoteIp` | Remote IP |
| `localIp` | Local IP |
| `authenticatedAs` | Authenticated As |
| `heloDomain` | EHLO Domain |
| `sender` | Sender |
| `senderDomain` | Sender Domain |
| `rcpt` | Recipient |
| `rcptDomain` | Recipient Domain |

## Expression references

The following expression contexts are used by fields on this page:

- [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable) (Variables)
