---
title: "MtaRoute"
source: https://stalw.art/docs/ref/object/mta-route/
description: "Defines a routing rule for outbound message delivery."
---

# MtaRoute

> Section: Schema reference › Objects

Defines a routing rule for outbound message delivery.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Outbound › Routes

## Fields

MtaRoute is a **multi-variant** object: each instance has an `@type` discriminator selecting one of the variants below, and each variant carries its own set of fields.

### `@type: "Mx"`

Remote Delivery (MX)

##### `ipLookupStrategy`

> Type: [`MtaIpStrategy`](#mtaipstrategy) · default: `"v4ThenV6"`
>
> IP resolution strategy for MX hosts

##### `maxMultihomed`

> Type: `UnsignedInt` · default: `2` · min: 1
>
> For multi-homed remote servers, it is the maximum number of IP addresses to try on each delivery attempt

##### `maxMxHosts`

> Type: `UnsignedInt` · default: `5` · min: 1
>
> Maximum number of MX hosts to try on each delivery attempt

##### `name`

> Type: `String` · read-only
>
> Short identifier for the route

##### `description`

> Type: `String?`
>
> A short description of the route, which can be used to identify it in the list of routes

### `@type: "Relay"`

Relay Host

##### `address`

> Type: `String` · required
>
> The address of the remote SMTP server, which can be an IP address or a domain name

##### `authSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> The secret to use when authenticating with the remote server

##### `authUsername`

> Type: `String?`
>
> The username to use when authenticating with the remote server

##### `port`

> Type: `UnsignedInt` · default: `25` · max: 65535 · min: 1
>
> The port number of the remote server, which is typically 25 for SMTP and 11200 for LMTP

##### `protocol`

> Type: [`MtaProtocol`](#mtaprotocol) · default: `"smtp"`
>
> The protocol to use when delivering messages to the remote server, which can be either SMTP or LMTP

##### `allowInvalidCerts`

> Type: `Boolean` · default: `false`
>
> Whether to allow connections to servers with invalid TLS certificates

##### `implicitTls`

> Type: `Boolean` · default: `false`
>
> Whether to use TLS encryption for all connections to the remote server

##### `name`

> Type: `String` · read-only
>
> Short identifier for the route

##### `description`

> Type: `String?`
>
> A short description of the route, which can be used to identify it in the list of routes

### `@type: "Local"`

Local Delivery

##### `name`

> Type: `String` · read-only
>
> Short identifier for the route

##### `description`

> Type: `String?`
>
> A short description of the route, which can be used to identify it in the list of routes

## JMAP API

The MtaRoute object is available via the `urn:stalwart:jmap` capability.

### `x:MtaRoute/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysMtaRouteGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaRoute/get",
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

### `x:MtaRoute/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysMtaRouteCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaRoute/set",
          {
            "create": {
              "new1": {
                "@type": "Mx"
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

This operation requires the `sysMtaRouteUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaRoute/set",
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

This operation requires the `sysMtaRouteDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaRoute/set",
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

### `x:MtaRoute/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysMtaRouteQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaRoute/query",
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

The `x:MtaRoute/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `name` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get MtaRoute id1
```

### Create

```sh
stalwart-cli create MtaRoute/Mx
```

### Query

```sh
stalwart-cli query MtaRoute
stalwart-cli query MtaRoute --where name=example
```

### Update

```sh
stalwart-cli update MtaRoute id1 --field description='updated value'
```

### Delete

```sh
stalwart-cli delete MtaRoute --ids id1
```

## Nested types

### SecretKeyOptional

An optional secret value, or none.

- **`None`**: No secret. No additional fields.
- **`Value`**: Secret value. Carries the fields of [`SecretKeyValue`](#secretkeyvalue).
- **`EnvironmentVariable`**: Secret read from environment variable. Carries the fields of [`SecretKeyEnvironmentVariable`](#secretkeyenvironmentvariable).
- **`File`**: Secret read from file. Carries the fields of [`SecretKeyFile`](#secretkeyfile).

#### SecretKeyValue

A secret value provided directly.

##### `secret`

> Type: `String` · required · secret
>
> Password or secret value

#### SecretKeyEnvironmentVariable

A secret value read from an environment variable.

##### `variableName`

> Type: `String` · required
>
> Environment variable name to read the secret from

#### SecretKeyFile

A secret value read from a file.

##### `filePath`

> Type: `String` · required
>
> File path to read the secret from

## Enums

### MtaIpStrategy

| Value | Label |
|---|---|
| `v4ThenV6` | IPv4 then IPv6 |
| `v6ThenV4` | IPv6 then IPv4 |
| `v4Only` | IPv4 Only |
| `v6Only` | IPv6 Only |

### MtaProtocol

| Value | Label |
|---|---|
| `smtp` | SMTP |
| `lmtp` | LMTP |
