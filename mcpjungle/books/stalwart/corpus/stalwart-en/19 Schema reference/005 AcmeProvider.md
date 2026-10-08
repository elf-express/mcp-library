---
title: "AcmeProvider"
source: https://stalw.art/docs/ref/object/acme-provider/
description: "Defines an ACME provider for automatic TLS certificate management."
---

# AcmeProvider

> Section: Schema reference › Objects

Defines an ACME provider for automatic TLS certificate management.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › TLS › ACME Providers

## Fields

##### `challengeType`

> Type: [`AcmeChallengeType`](#acmechallengetype) · default: `"TlsAlpn01"`
>
> The ACME challenge type used to validate domain ownership

##### `contact`

> Type: `Set<EmailAddress>` · min items: 1
>
> Contact email address, which is used for important communications regarding your ACME account and certificates

##### `directory`

> Type: `Uri` · read-only · default: `"https://acme-v02.api.letsencrypt.org/directory"`
>
> The URL of the ACME directory endpoint

##### `eabHmacKey`

> Type: `String?` · read-only · secret
>
> The External Account Binding (EAB) HMAC key

##### `eabKeyId`

> Type: `String?` · read-only
>
> The External Account Binding (EAB) key ID

##### `accountKey`

> Type: `String` · server-set · secret
>
> The account key used to authenticate with the ACME provider.

##### `accountUri`

> Type: `Uri` · server-set
>
> The account URI returned by the ACME server after registration. Used for CAA record accounturi binding.

##### `renewBefore`

> Type: [`AcmeRenewBefore`](#acmerenewbefore) · default: `"R23"`
>
> How long before expiration the certificate should be renewed

##### `maxRetries`

> Type: `Integer` · default: `10`
>
> Maximum number of retry attempts for failed challenges

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> Identifier for the tenant this ACME provider belongs to

##### `preferredChain`

> Type: `String?`
>
> Preferred certificate chain to use when multiple chains are available

##### `reuseKey`

> Type: `Boolean` · default: `false`
>
> Whether to reuse the existing private key when renewing a certificate

## JMAP API

The AcmeProvider object is available via the `urn:stalwart:jmap` capability.

### `x:AcmeProvider/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysAcmeProviderGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AcmeProvider/get",
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

### `x:AcmeProvider/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysAcmeProviderCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AcmeProvider/set",
          {
            "create": {
              "new1": {
                "contact": {}
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

This operation requires the `sysAcmeProviderUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AcmeProvider/set",
          {
            "update": {
              "id1": {
                "preferredChain": "updated value"
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

This operation requires the `sysAcmeProviderDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AcmeProvider/set",
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

### `x:AcmeProvider/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysAcmeProviderQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AcmeProvider/query",
          {
            "filter": {
              "text": "example"
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

The `x:AcmeProvider/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `text` | text |
| `memberTenantId` | id of Tenant |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get AcmeProvider id1
```

### Create

```sh
stalwart-cli create AcmeProvider \
  --field 'contact={}'
```

### Query

```sh
stalwart-cli query AcmeProvider
stalwart-cli query AcmeProvider --where text=example
```

### Update

```sh
stalwart-cli update AcmeProvider id1 --field preferredChain='updated value'
```

### Delete

```sh
stalwart-cli delete AcmeProvider --ids id1
```

## Enums

### AcmeChallengeType

| Value | Label |
|---|---|
| `TlsAlpn01` | TLS-ALPN-01 |
| `DnsPersist01` | DNS-PERSIST-01 |
| `Dns01` | DNS-01 |
| `Http01` | HTTP-01 |

### AcmeRenewBefore

| Value | Label |
|---|---|
| `R12` | 1/2 of the remaining time until expiration |
| `R23` | 2/3 of the remaining time until expiration |
| `R34` | 3/4 of the remaining time until expiration |
| `R45` | 4/5 of the remaining time until expiration |
