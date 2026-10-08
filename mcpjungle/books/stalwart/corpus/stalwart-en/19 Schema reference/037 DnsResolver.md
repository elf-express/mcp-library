---
title: "DnsResolver"
source: https://stalw.art/docs/ref/object/dns-resolver/
description: "Configures the DNS resolver used for domain lookups."
---

# DnsResolver

> Section: Schema reference › Objects

Configures the DNS resolver used for domain lookups.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Network › DNS › DNS Resolver

## Fields

DnsResolver is a **multi-variant** object: each instance has an `@type` discriminator selecting one of the variants below, and each variant carries its own set of fields.

### `@type: "System"`

System Resolver

##### `attempts`

> Type: `UnsignedInt` · default: `2`
>
> Number of times a resolution request will be retried before it is considered failed

##### `concurrency`

> Type: `UnsignedInt` · default: `2`
>
> Number of concurrent resolution requests that can be made at the same time

##### `enableEdns`

> Type: `Boolean` · default: `true`
>
> Whether to enable EDNS (Extension Mechanisms for DNS) support

##### `preserveIntermediates`

> Type: `Boolean` · default: `true`
>
> Whether to preserve the intermediate name servers in the DNS resolution results

##### `timeout`

> Type: `Duration` · default: `5000`
>
> Time after which a resolution request will be timed out if no response is received

##### `tcpOnError`

> Type: `Boolean` · default: `true`
>
> Whether to try using TCP for resolution requests if an error occurs during a UDP resolution request

### `@type: "Custom"`

Custom DNS

##### `servers`

> Type: `List<`[`DnsCustomResolver`](#dnscustomresolver)`>` · min items: 1
>
> List of custom DNS server URLs to use for resolution

##### `attempts`

> Type: `UnsignedInt` · default: `2`
>
> Number of times a resolution request will be retried before it is considered failed

##### `concurrency`

> Type: `UnsignedInt` · default: `2`
>
> Number of concurrent resolution requests that can be made at the same time

##### `enableEdns`

> Type: `Boolean` · default: `true`
>
> Whether to enable EDNS (Extension Mechanisms for DNS) support

##### `preserveIntermediates`

> Type: `Boolean` · default: `true`
>
> Whether to preserve the intermediate name servers in the DNS resolution results

##### `timeout`

> Type: `Duration` · default: `5000`
>
> Time after which a resolution request will be timed out if no response is received

##### `tcpOnError`

> Type: `Boolean` · default: `true`
>
> Whether to try using TCP for resolution requests if an error occurs during a UDP resolution request

### `@type: "Cloudflare"`

Cloudflare DNS

##### `useTls`

> Type: `Boolean` · default: `true`
>
> Whether to use TLS for DNS resolution

##### `attempts`

> Type: `UnsignedInt` · default: `2`
>
> Number of times a resolution request will be retried before it is considered failed

##### `concurrency`

> Type: `UnsignedInt` · default: `2`
>
> Number of concurrent resolution requests that can be made at the same time

##### `enableEdns`

> Type: `Boolean` · default: `true`
>
> Whether to enable EDNS (Extension Mechanisms for DNS) support

##### `preserveIntermediates`

> Type: `Boolean` · default: `true`
>
> Whether to preserve the intermediate name servers in the DNS resolution results

##### `timeout`

> Type: `Duration` · default: `5000`
>
> Time after which a resolution request will be timed out if no response is received

##### `tcpOnError`

> Type: `Boolean` · default: `true`
>
> Whether to try using TCP for resolution requests if an error occurs during a UDP resolution request

### `@type: "Quad9"`

Quad9 DNS

##### `useTls`

> Type: `Boolean` · default: `true`
>
> Whether to use TLS for DNS resolution

##### `attempts`

> Type: `UnsignedInt` · default: `2`
>
> Number of times a resolution request will be retried before it is considered failed

##### `concurrency`

> Type: `UnsignedInt` · default: `2`
>
> Number of concurrent resolution requests that can be made at the same time

##### `enableEdns`

> Type: `Boolean` · default: `true`
>
> Whether to enable EDNS (Extension Mechanisms for DNS) support

##### `preserveIntermediates`

> Type: `Boolean` · default: `true`
>
> Whether to preserve the intermediate name servers in the DNS resolution results

##### `timeout`

> Type: `Duration` · default: `5000`
>
> Time after which a resolution request will be timed out if no response is received

##### `tcpOnError`

> Type: `Boolean` · default: `true`
>
> Whether to try using TCP for resolution requests if an error occurs during a UDP resolution request

### `@type: "Google"`

Google DNS

##### `attempts`

> Type: `UnsignedInt` · default: `2`
>
> Number of times a resolution request will be retried before it is considered failed

##### `concurrency`

> Type: `UnsignedInt` · default: `2`
>
> Number of concurrent resolution requests that can be made at the same time

##### `enableEdns`

> Type: `Boolean` · default: `true`
>
> Whether to enable EDNS (Extension Mechanisms for DNS) support

##### `preserveIntermediates`

> Type: `Boolean` · default: `true`
>
> Whether to preserve the intermediate name servers in the DNS resolution results

##### `timeout`

> Type: `Duration` · default: `5000`
>
> Time after which a resolution request will be timed out if no response is received

##### `tcpOnError`

> Type: `Boolean` · default: `true`
>
> Whether to try using TCP for resolution requests if an error occurs during a UDP resolution request

## JMAP API

The DnsResolver singleton is available via the `urn:stalwart:jmap` capability.

### `x:DnsResolver/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysDnsResolverGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DnsResolver/get",
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

### `x:DnsResolver/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysDnsResolverUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DnsResolver/set",
          {
            "update": {
              "singleton": {
                "attempts": 2
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
stalwart-cli get DnsResolver
```

### Update

```sh
stalwart-cli update DnsResolver --field attempts=2
```

## Nested types

### DnsCustomResolver

Custom DNS server endpoint.

##### `protocol`

> Type: [`DnsResolverProtocol`](#dnsresolverprotocol) · default: `"udp"`
>
> Protocol to use for DNS queries

##### `address`

> Type: `IpAddr` · default: `"127.0.0.1"`
>
> Address of the DNS server

##### `port`

> Type: `UnsignedInt` · default: `53` · min: 1 · max: 65535
>
> Port of the DNS server

## Enums

### DnsResolverProtocol

| Value | Label |
|---|---|
| `tls` | DNS over TLS |
| `udp` | UDP |
| `tcp` | TCP |
