---
title: "BlockedIp"
source: https://stalw.art/docs/ref/object/blocked-ip/
description: "Defines a blocked IP address or network range."
---

# BlockedIp

> Section: Schema reference › Objects

Defines a blocked IP address or network range.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Security › Blocked IPs

## Fields

##### `address`

> Type: `IpMask` · read-only
>
> The IP address or mask to block

##### `reason`

> Type: [`BlockReason`](#blockreason) · default: `"manual"`
>
> The reason for blocking this IP address

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> The date and time when this IP address was blocked

##### `expiresAt`

> Type: `UTCDateTime?`
>
> The date and time when this IP address block will expire

## JMAP API

The BlockedIp object is available via the `urn:stalwart:jmap` capability.

### `x:BlockedIp/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysBlockedIpGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:BlockedIp/get",
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

### `x:BlockedIp/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysBlockedIpCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:BlockedIp/set",
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

This operation requires the `sysBlockedIpUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:BlockedIp/set",
          {
            "update": {
              "id1": {
                "reason": "manual"
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

This operation requires the `sysBlockedIpDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:BlockedIp/set",
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

### `x:BlockedIp/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysBlockedIpQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:BlockedIp/query",
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

The `x:BlockedIp/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `address` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get BlockedIp id1
```

### Create

```sh
stalwart-cli create BlockedIp
```

### Query

```sh
stalwart-cli query BlockedIp
stalwart-cli query BlockedIp --where address=example
```

### Update

```sh
stalwart-cli update BlockedIp id1 --field reason=manual
```

### Delete

```sh
stalwart-cli delete BlockedIp --ids id1
```

## Enums

### BlockReason

| Value | Label |
|---|---|
| `rcptToFailure` | Excessive failed RCPT TO commands |
| `authFailure` | Excessive failed authentication attempts |
| `loitering` | Excessive loitering connections |
| `portScanning` | Excessive port scanning attempts |
| `manual` | Manually blocked IP address |
| `other` | Other reason |
