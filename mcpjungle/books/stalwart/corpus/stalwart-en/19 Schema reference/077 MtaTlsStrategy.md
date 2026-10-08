---
title: "MtaTlsStrategy"
source: https://stalw.art/docs/ref/object/mta-tls-strategy/
description: "Defines a TLS security strategy for outbound connections."
---

# MtaTlsStrategy

> Section: Schema reference › Objects

Defines a TLS security strategy for outbound connections.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Outbound › TLS Strategies

## Fields

##### `name`

> Type: `String` · read-only
>
> Short identifier for the TLS strategy

##### `allowInvalidCerts`

> Type: `Boolean` · default: `false`
>
> Whether to allow connections to servers with invalid TLS certificates

##### `dane`

> Type: [`MtaRequiredOrOptional`](#mtarequiredoroptional) · default: `"optional"`
>
> Whether DANE is required, optional, or disabled

##### `description`

> Type: `String?`
>
> A short description of the TLS strategy, which can be used to identify it in the list of strategies

##### `mtaSts`

> Type: [`MtaRequiredOrOptional`](#mtarequiredoroptional) · default: `"optional"`
>
> Whether MTA-STS is required, optional, or disabled

##### `startTls`

> Type: [`MtaRequiredOrOptional`](#mtarequiredoroptional) · default: `"optional"`
>
> Whether TLS support is required, optional, or disabled

##### `mtaStsTimeout`

> Type: `Duration` · default: `300000`
>
> Maximum time to wait for the MTA-STS policy lookup to complete

##### `tlsTimeout`

> Type: `Duration` · default: `180000`
>
> Maximum time to wait for the TLS handshake to complete

## JMAP API

The MtaTlsStrategy object is available via the `urn:stalwart:jmap` capability.

### `x:MtaTlsStrategy/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysMtaTlsStrategyGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaTlsStrategy/get",
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

### `x:MtaTlsStrategy/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysMtaTlsStrategyCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaTlsStrategy/set",
          {
            "create": {
              "new1": {}
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

This operation requires the `sysMtaTlsStrategyUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaTlsStrategy/set",
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

This operation requires the `sysMtaTlsStrategyDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaTlsStrategy/set",
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

### `x:MtaTlsStrategy/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysMtaTlsStrategyQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaTlsStrategy/query",
          {
            "filter": {
              "name": "example"
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

The `x:MtaTlsStrategy/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `name` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get MtaTlsStrategy id1
```

### Create

```sh
stalwart-cli create MtaTlsStrategy
```

### Query

```sh
stalwart-cli query MtaTlsStrategy
stalwart-cli query MtaTlsStrategy --where name=example
```

### Update

```sh
stalwart-cli update MtaTlsStrategy id1 --field description='updated value'
```

### Delete

```sh
stalwart-cli delete MtaTlsStrategy --ids id1
```

## Enums

### MtaRequiredOrOptional

| Value | Label |
|---|---|
| `optional` | Optional |
| `require` | Required |
| `disable` | Disabled |
