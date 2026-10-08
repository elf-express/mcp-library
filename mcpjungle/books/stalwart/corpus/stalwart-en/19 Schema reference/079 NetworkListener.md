---
title: "NetworkListener"
source: https://stalw.art/docs/ref/object/network-listener/
description: "Defines a network listener for accepting incoming connections."
---

# NetworkListener

> Section: Schema reference › Objects

Defines a network listener for accepting incoming connections.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Network › Listeners

## Fields

##### `name`

> Type: `String` · read-only
>
> Unique identifier for the listener

##### `bind`

> Type: `Set<SocketAddr>` · min items: 1
>
> The addresses the listener will bind to

##### `protocol`

> Type: [`NetworkListenerProtocol`](#networklistenerprotocol) · default: `"smtp"`
>
> The protocol used by the listener

##### `overrideProxyTrustedNetworks`

> Type: `Set<IpMask>`
>
> Enable proxy protocol for connections from these networks

##### `socketBacklog`

> Type: `UnsignedInt?` · default: `1024` · min: 1
>
> The maximum number of incoming connections that can be pending in the backlog queue

##### `socketNoDelay`

> Type: `Boolean` · default: `true`
>
> Whether the Nagle algorithm should be disabled for the socket

##### `socketReceiveBufferSize`

> Type: `UnsignedInt?` · min: 1
>
> The size of the buffer used for receiving data

##### `socketReuseAddress`

> Type: `Boolean` · default: `true`
>
> Whether the socket can be bound to an address that is already in use by another socket

##### `socketReusePort`

> Type: `Boolean` · default: `true`
>
> Whether multiple sockets can be bound to the same address and port

##### `socketSendBufferSize`

> Type: `UnsignedInt?` · min: 1
>
> The size of the buffer used for sending data

##### `socketTosV4`

> Type: `UnsignedInt?` · min: 1
>
> The type of service (TOS) value for the socket, which determines the priority of the traffic sent through the socket

##### `socketTtl`

> Type: `UnsignedInt?` · min: 1
>
> Time-to-live (TTL) value for the socket, which determines how many hops a packet can make before it is discarded

##### `useTls`

> Type: `Boolean` · default: `true`
>
> Whether to enable TLS for this listener

##### `tlsDisableCipherSuites`

> Type: `Set<`[`TlsCipherSuite`](#tlsciphersuite)`>`
>
> Which cipher suites to disable

##### `tlsDisableProtocols`

> Type: `Set<`[`TlsVersion`](#tlsversion)`>`
>
> Which TLS protocols to disable

##### `tlsIgnoreClientOrder`

> Type: `Boolean` · default: `true`
>
> Whether to ignore the client's cipher order

##### `tlsImplicit`

> Type: `Boolean` · default: `false`
>
> Whether to use implicit TLS

##### `tlsTimeout`

> Type: `Duration?` · default: `60000`
>
> TLS handshake timeout

##### `maxConnections`

> Type: `UnsignedInt?` · default: `8192` · min: 1
>
> The maximum number of concurrent connections the listener will accept

## JMAP API

The NetworkListener object is available via the `urn:stalwart:jmap` capability.

### `x:NetworkListener/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysNetworkListenerGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:NetworkListener/get",
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

### `x:NetworkListener/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysNetworkListenerCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:NetworkListener/set",
          {
            "create": {
              "new1": {
                "bind": {},
                "overrideProxyTrustedNetworks": {},
                "tlsDisableCipherSuites": {},
                "tlsDisableProtocols": {}
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

This operation requires the `sysNetworkListenerUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:NetworkListener/set",
          {
            "update": {
              "id1": {
                "bind": {}
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

This operation requires the `sysNetworkListenerDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:NetworkListener/set",
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

### `x:NetworkListener/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysNetworkListenerQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:NetworkListener/query",
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

The `x:NetworkListener/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `name` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get NetworkListener id1
```

### Create

```sh
stalwart-cli create NetworkListener \
  --field 'bind={}' \
  --field 'overrideProxyTrustedNetworks={}' \
  --field 'tlsDisableCipherSuites={}' \
  --field 'tlsDisableProtocols={}'
```

### Query

```sh
stalwart-cli query NetworkListener
stalwart-cli query NetworkListener --where name=example
```

### Update

```sh
stalwart-cli update NetworkListener id1 --field bind='{}'
```

### Delete

```sh
stalwart-cli delete NetworkListener --ids id1
```

## Enums

### NetworkListenerProtocol

| Value | Label |
|---|---|
| `smtp` | SMTP |
| `lmtp` | LMTP |
| `http` | HTTP |
| `imap` | IMAP4 |
| `pop3` | POP3 |
| `manageSieve` | ManageSieve |

### TlsCipherSuite

| Value | Label |
|---|---|
| `tls13-aes-256-gcm-sha384` | TLS1.3 AES256 GCM SHA384 |
| `tls13-aes-128-gcm-sha256` | TLS1.3 AES128 GCM SHA256 |
| `tls13-chacha20-poly1305-sha256` | TLS1.3 CHACHA20 POLY1305 SHA256 |
| `tls-ecdhe-ecdsa-with-aes-256-gcm-sha384` | ECDHE ECDSA AES256 GCM SHA384 |
| `tls-ecdhe-ecdsa-with-aes-128-gcm-sha256` | ECDHE ECDSA AES128 GCM SHA256 |
| `tls-ecdhe-ecdsa-with-chacha20-poly1305-sha256` | ECDHE ECDSA CHACHA20 POLY1305 SHA256 |
| `tls-ecdhe-rsa-with-aes-256-gcm-sha384` | ECDHE RSA AES256 GCM SHA384 |
| `tls-ecdhe-rsa-with-aes-128-gcm-sha256` | ECDHE RSA AES128 GCM SHA256 |
| `tls-ecdhe-rsa-with-chacha20-poly1305-sha256` | ECDHE RSA CHACHA20 POLY1305 SHA256 |

### TlsVersion

| Value | Label |
|---|---|
| `tls12` | TLS version 1.2 |
| `tls13` | TLS version 1.3 |
