---
title: "MtaQueueQuota"
source: https://stalw.art/docs/ref/object/mta-queue-quota/
description: "Defines a quota rule for message queues."
---

# MtaQueueQuota

> Section: Schema reference › Objects

Defines a quota rule for message queues.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Rates & Quotas › Queue Quotas

## Fields

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this quota

##### `description`

> Type: `String?` · read-only
>
> Short description for the quota

##### `key`

> Type: `Set<`[`MtaQueueQuotaKey`](#mtaqueuequotakey)`>`
>
> Optional list of context variables that determine where this quota should be applied

##### `match`

> Type: [`Expression`](#expression)
>
> Enable the imposition of concurrency and rate limits only when a specific condition is met
>
> Available variables: [`MtaQueueHostVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-host-variable).

##### `messages`

> Type: `UnsignedInt?` · min: 1
>
> Maximum number of messages in the queue that this quota will allow

##### `size`

> Type: `Size?`
>
> Maximum total size of messages in the queue that this quota will allow

## JMAP API

The MtaQueueQuota object is available via the `urn:stalwart:jmap` capability.

### `x:MtaQueueQuota/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysMtaQueueQuotaGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaQueueQuota/get",
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

### `x:MtaQueueQuota/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysMtaQueueQuotaCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaQueueQuota/set",
          {
            "create": {
              "new1": {
                "key": {},
                "match": {
                  "else": "Example"
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

#### Update

This operation requires the `sysMtaQueueQuotaUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaQueueQuota/set",
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

This operation requires the `sysMtaQueueQuotaDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaQueueQuota/set",
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

### `x:MtaQueueQuota/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysMtaQueueQuotaQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaQueueQuota/query",
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
stalwart-cli get MtaQueueQuota id1
```

### Create

```sh
stalwart-cli create MtaQueueQuota \
  --field 'key={}' \
  --field 'match={"else":"Example"}'
```

### Query

```sh
stalwart-cli query MtaQueueQuota
```

### Update

```sh
stalwart-cli update MtaQueueQuota id1 --field enable=true
```

### Delete

```sh
stalwart-cli delete MtaQueueQuota --ids id1
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

## Enums

### MtaQueueQuotaKey

| Value | Label |
|---|---|
| `sender` | Sender |
| `senderDomain` | Sender Domain |
| `rcpt` | Recipient |
| `rcptDomain` | Recipient Domain |

## Expression references

The following expression contexts are used by fields on this page:

- [`MtaQueueHostVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-host-variable) (Variables)
