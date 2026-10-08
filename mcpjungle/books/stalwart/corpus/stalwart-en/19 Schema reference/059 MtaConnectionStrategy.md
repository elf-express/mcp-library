---
title: "MtaConnectionStrategy"
source: https://stalw.art/docs/ref/object/mta-connection-strategy/
description: "Defines a connection strategy for outbound message delivery."
---

# MtaConnectionStrategy

> Section: Schema reference › Objects

Defines a connection strategy for outbound message delivery.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Outbound › Connection Strategies

## Fields

##### `name`

> Type: `String` · read-only
>
> Short identifier for the strategy

##### `description`

> Type: `String?`
>
> Short description of the connection strategy

##### `ehloHostname`

> Type: `HostName?`
>
> Overrides the EHLO hostname that will be used when connecting using this strategy

##### `sourceIps`

> Type: `List<`[`MtaConnectionIpHost`](#mtaconnectioniphost)`>`
>
> List of local IPv4 and IPv6 addresses to use when delivering emails to remote SMTP servers

##### `connectTimeout`

> Type: `Duration` · default: `300000`
>
> Maximum time to wait for the connection to be established

##### `dataTimeout`

> Type: `Duration` · default: `600000`
>
> Maximum time to wait for the DATA command response

##### `ehloTimeout`

> Type: `Duration` · default: `300000`
>
> Maximum time to wait for the EHLO command response

##### `greetingTimeout`

> Type: `Duration` · default: `300000`
>
> Maximum time to wait for the SMTP greeting message

##### `mailFromTimeout`

> Type: `Duration` · default: `300000`
>
> Maximum time to wait for the MAIL-FROM command response

##### `rcptToTimeout`

> Type: `Duration` · default: `300000`
>
> Maximum time to wait for the RCPT-TO command response

## JMAP API

The MtaConnectionStrategy object is available via the `urn:stalwart:jmap` capability.

### `x:MtaConnectionStrategy/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysMtaConnectionStrategyGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaConnectionStrategy/get",
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

### `x:MtaConnectionStrategy/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysMtaConnectionStrategyCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaConnectionStrategy/set",
          {
            "create": {
              "new1": {
                "sourceIps": {}
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

This operation requires the `sysMtaConnectionStrategyUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaConnectionStrategy/set",
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

This operation requires the `sysMtaConnectionStrategyDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaConnectionStrategy/set",
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

### `x:MtaConnectionStrategy/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysMtaConnectionStrategyQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaConnectionStrategy/query",
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

The `x:MtaConnectionStrategy/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `name` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get MtaConnectionStrategy id1
```

### Create

```sh
stalwart-cli create MtaConnectionStrategy \
  --field 'sourceIps={}'
```

### Query

```sh
stalwart-cli query MtaConnectionStrategy
stalwart-cli query MtaConnectionStrategy --where name=example
```

### Update

```sh
stalwart-cli update MtaConnectionStrategy id1 --field description='updated value'
```

### Delete

```sh
stalwart-cli delete MtaConnectionStrategy --ids id1
```

## Nested types

### MtaConnectionIpHost

Defines a source IP address and optional EHLO hostname override for outbound connections.

##### `ehloHostname`

> Type: `HostName?`
>
> Overrides the EHLO hostname that will be used when connecting from this IP address

##### `sourceIp`

> Type: `IpAddr` · required
>
> Local IPv4 and IPv6 address to use when delivering emails to remote SMTP servers
