---
title: "MtaOutboundThrottle"
source: https://stalw.art/docs/ref/object/mta-outbound-throttle/
description: "Defines an outbound rate limit rule for message delivery."
---

# MtaOutboundThrottle

> Section: Schema reference › Objects

Defines an outbound rate limit rule for message delivery.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Rates & Quotas › Outbound Rate Limits

## Fields

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this throttle

##### `description`

> Type: `String` · required
>
> Short description for the throttle

##### `key`

> Type: `Set<`[`MtaOutboundThrottleKey`](#mtaoutboundthrottlekey)`>`
>
> Optional list of context variables that determine where this throttle should be applied

##### `match`

> Type: [`Expression`](#expression) · default: `{"else":"true"}`
>
> Enable the imposition of concurrency and rate limits only when a specific condition is met
>
> Available variables: [`MtaQueueHostVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-host-variable).

##### `rate`

> Type: [`Rate`](#rate) · required
>
> Number of incoming requests over a period of time that the rate limiter will allow

## JMAP API

The MtaOutboundThrottle object is available via the `urn:stalwart:jmap` capability.

### `x:MtaOutboundThrottle/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysMtaOutboundThrottleGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaOutboundThrottle/get",
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

### `x:MtaOutboundThrottle/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysMtaOutboundThrottleCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaOutboundThrottle/set",
          {
            "create": {
              "new1": {
                "description": "Example",
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

This operation requires the `sysMtaOutboundThrottleUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaOutboundThrottle/set",
          {
            "update": {
              "id1": {
                "description": "updated value"
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

This operation requires the `sysMtaOutboundThrottleDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaOutboundThrottle/set",
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

### `x:MtaOutboundThrottle/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysMtaOutboundThrottleQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaOutboundThrottle/query",
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
stalwart-cli get MtaOutboundThrottle id1
```

### Create

```sh
stalwart-cli create MtaOutboundThrottle \
  --field description=Example \
  --field 'key={}' \
  --field 'rate={}'
```

### Query

```sh
stalwart-cli query MtaOutboundThrottle
```

### Update

```sh
stalwart-cli update MtaOutboundThrottle id1 --field description='updated value'
```

### Delete

```sh
stalwart-cli delete MtaOutboundThrottle --ids id1
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

### MtaOutboundThrottleKey

| Value | Label |
|---|---|
| `mx` | MX Host |
| `remoteIp` | Remote IP |
| `localIp` | Local IP |
| `sender` | Sender |
| `senderDomain` | Sender Domain |
| `rcptDomain` | Recipient Domain |

## Expression references

The following expression contexts are used by fields on this page:

- [`MtaQueueHostVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-host-variable) (Variables)
