---
title: "AllowedIp"
source: https://stalw.art/docs/ref/object/allowed-ip/
description: "Defines an allowed IP address or network range."
---

# AllowedIp

> Section: Schema reference › Objects

Defines an allowed IP address or network range.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Security › Allowed IPs

## Fields

##### `address`

> Type: `IpMask` · read-only
>
> The IP address or mask to allow

##### `reason`

> Type: `String?`
>
> The reason for allowing this IP address

##### `createdAt`

> Type: `UTCDateTime` · read-only
>
> The date and time when this IP address was allowed

##### `expiresAt`

> Type: `UTCDateTime?`
>
> The date and time when this IP address allowance will expire

## JMAP API

The AllowedIp object is available via the `urn:stalwart:jmap` capability.

### `x:AllowedIp/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysAllowedIpGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AllowedIp/get",
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

### `x:AllowedIp/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysAllowedIpCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AllowedIp/set",
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

This operation requires the `sysAllowedIpUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AllowedIp/set",
          {
            "update": {
              "id1": {
                "reason": "updated value"
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

This operation requires the `sysAllowedIpDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AllowedIp/set",
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

### `x:AllowedIp/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysAllowedIpQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AllowedIp/query",
          {
            "filter": {
              "address": "example"
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

The `x:AllowedIp/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `address` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get AllowedIp id1
```

### Create

```sh
stalwart-cli create AllowedIp
```

### Query

```sh
stalwart-cli query AllowedIp
stalwart-cli query AllowedIp --where address=example
```

### Update

```sh
stalwart-cli update AllowedIp id1 --field reason='updated value'
```

### Delete

```sh
stalwart-cli delete AllowedIp --ids id1
```
