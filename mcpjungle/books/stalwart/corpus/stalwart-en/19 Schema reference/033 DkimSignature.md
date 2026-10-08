---
title: "DkimSignature"
source: https://stalw.art/docs/ref/object/dkim-signature/
description: "Defines a DKIM signature used to sign outgoing email messages."
---

# DkimSignature

> Section: Schema reference › Objects

Defines a DKIM signature used to sign outgoing email messages.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Management › Domains › DKIM Signatures

## Fields

DkimSignature is a **multi-variant** object: each instance has an `@type` discriminator selecting one of the variants below, and each variant carries its own set of fields.

### `@type: "Dkim1Ed25519Sha256"`

DKIM1 (Ed25519 SHA-256)

##### `auid`

> Type: `String?`
>
> Agent or user identifier included in the DKIM signature header

##### `canonicalization`

> Type: [`DkimCanonicalization`](#dkimcanonicalization) · default: `"relaxed/relaxed"`
>
> Canonicalization algorithm applied to the headers and body before signing

##### `expire`

> Type: `Duration?`
>
> Time after which this DKIM signature expires and should no longer be considered valid

##### `headers`

> Type: `Set<String>` · default: `{"Date":true,"From":true,"Message-ID":true,"Subject":true,"To":true}`
>
> List of message headers to include in the DKIM signature

##### `privateKey`

> Type: [`SecretText`](#secrettext) · required
>
> PEM-encoded private key used to sign outgoing messages

##### `publicKey`

> Type: `Text` · server-set
>
> PEM-encoded public key used to verify signatures, derived from the private key

##### `report`

> Type: `Boolean` · default: `true`
>
> Whether to request failure reports when signature verification fails on the recipient side

##### `thirdParty`

> Type: `String?`
>
> Authorized third-party signature value, used when signing on behalf of another domain

##### `thirdPartyHash`

> Type: [`DkimHash`](#dkimhash)`?`
>
> Hashing algorithm used to verify the authorized third-party signature DNS record

##### `domainId`

> Type: `Id<`[`Domain`](https://stalw.art/docs/ref/object/domain)`>` · required
>
> Identifier for the domain this DKIM signature is associated with

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> Identifier for the tenant this DKIM signature belongs to

##### `selector`

> Type: `String` · required
>
> Selector used to locate the DKIM public key in DNS

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> Creation date of the DKIM signature

##### `nextTransitionAt`

> Type: `UTCDateTime?`
>
> Date when this key will transition to the next rotation stage, or null if no transition is scheduled

##### `stage`

> Type: [`DkimRotationStage`](#dkimrotationstage) · default: `"active"`
>
> Current stage of the DKIM key in its rotation lifecycle

### `@type: "Dkim1RsaSha256"`

DKIM1 (RSA SHA-256)

##### `auid`

> Type: `String?`
>
> Agent or user identifier included in the DKIM signature header

##### `canonicalization`

> Type: [`DkimCanonicalization`](#dkimcanonicalization) · default: `"relaxed/relaxed"`
>
> Canonicalization algorithm applied to the headers and body before signing

##### `expire`

> Type: `Duration?`
>
> Time after which this DKIM signature expires and should no longer be considered valid

##### `headers`

> Type: `Set<String>` · default: `{"Date":true,"From":true,"Message-ID":true,"Subject":true,"To":true}`
>
> List of message headers to include in the DKIM signature

##### `privateKey`

> Type: [`SecretText`](#secrettext) · required
>
> PEM-encoded private key used to sign outgoing messages

##### `publicKey`

> Type: `Text` · server-set
>
> PEM-encoded public key used to verify signatures, derived from the private key

##### `report`

> Type: `Boolean` · default: `true`
>
> Whether to request failure reports when signature verification fails on the recipient side

##### `thirdParty`

> Type: `String?`
>
> Authorized third-party signature value, used when signing on behalf of another domain

##### `thirdPartyHash`

> Type: [`DkimHash`](#dkimhash)`?`
>
> Hashing algorithm used to verify the authorized third-party signature DNS record

##### `domainId`

> Type: `Id<`[`Domain`](https://stalw.art/docs/ref/object/domain)`>` · required
>
> Identifier for the domain this DKIM signature is associated with

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> Identifier for the tenant this DKIM signature belongs to

##### `selector`

> Type: `String` · required
>
> Selector used to locate the DKIM public key in DNS

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> Creation date of the DKIM signature

##### `nextTransitionAt`

> Type: `UTCDateTime?`
>
> Date when this key will transition to the next rotation stage, or null if no transition is scheduled

##### `stage`

> Type: [`DkimRotationStage`](#dkimrotationstage) · default: `"active"`
>
> Current stage of the DKIM key in its rotation lifecycle

### `@type: "Dkim2Ed25519Sha256"`

DKIM2 (Ed25519 SHA-256)

##### `flags`

> Type: `Set<`[`Dkim2Flag`](#dkim2flag)`>`
>
> Policy flags added to the signature, requesting downstream handlers to honor delivery constraints or provide feedback

##### `privateKey`

> Type: [`SecretText`](#secrettext) · required
>
> PEM-encoded private key used to sign outgoing messages

##### `publicKey`

> Type: `Text` · server-set
>
> PEM-encoded public key used to verify signatures, derived from the private key

##### `domainId`

> Type: `Id<`[`Domain`](https://stalw.art/docs/ref/object/domain)`>` · required
>
> Identifier for the domain this DKIM signature is associated with

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> Identifier for the tenant this DKIM signature belongs to

##### `selector`

> Type: `String` · required
>
> Selector used to locate the DKIM public key in DNS

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> Creation date of the DKIM signature

##### `nextTransitionAt`

> Type: `UTCDateTime?`
>
> Date when this key will transition to the next rotation stage, or null if no transition is scheduled

##### `stage`

> Type: [`DkimRotationStage`](#dkimrotationstage) · default: `"active"`
>
> Current stage of the DKIM key in its rotation lifecycle

### `@type: "Dkim2RsaSha256"`

DKIM2 (RSA SHA-256)

##### `flags`

> Type: `Set<`[`Dkim2Flag`](#dkim2flag)`>`
>
> Policy flags added to the signature, requesting downstream handlers to honor delivery constraints or provide feedback

##### `privateKey`

> Type: [`SecretText`](#secrettext) · required
>
> PEM-encoded private key used to sign outgoing messages

##### `publicKey`

> Type: `Text` · server-set
>
> PEM-encoded public key used to verify signatures, derived from the private key

##### `domainId`

> Type: `Id<`[`Domain`](https://stalw.art/docs/ref/object/domain)`>` · required
>
> Identifier for the domain this DKIM signature is associated with

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> Identifier for the tenant this DKIM signature belongs to

##### `selector`

> Type: `String` · required
>
> Selector used to locate the DKIM public key in DNS

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> Creation date of the DKIM signature

##### `nextTransitionAt`

> Type: `UTCDateTime?`
>
> Date when this key will transition to the next rotation stage, or null if no transition is scheduled

##### `stage`

> Type: [`DkimRotationStage`](#dkimrotationstage) · default: `"active"`
>
> Current stage of the DKIM key in its rotation lifecycle

## JMAP API

The DkimSignature object is available via the `urn:stalwart:jmap` capability.

### `x:DkimSignature/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysDkimSignatureGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DkimSignature/get",
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

### `x:DkimSignature/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysDkimSignatureCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DkimSignature/set",
          {
            "create": {
              "new1": {
                "@type": "Dkim1Ed25519Sha256",
                "domainId": "<Domain id>",
                "privateKey": {
                  "@type": "Text",
                  "secret": "Example"
                },
                "selector": "Example"
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

This operation requires the `sysDkimSignatureUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DkimSignature/set",
          {
            "update": {
              "id1": {
                "auid": "updated value"
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

This operation requires the `sysDkimSignatureDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DkimSignature/set",
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

### `x:DkimSignature/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysDkimSignatureQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DkimSignature/query",
          {
            "filter": {
              "domainId": "id1"
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

The `x:DkimSignature/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `domainId` | id of Domain |
| `memberTenantId` | id of Tenant |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get DkimSignature id1
```

### Create

```sh
stalwart-cli create DkimSignature/Dkim1Ed25519Sha256 \
  --field 'privateKey={"@type":"Text","secret":"Example"}' \
  --field 'domainId=<Domain id>' \
  --field selector=Example
```

### Query

```sh
stalwart-cli query DkimSignature
stalwart-cli query DkimSignature --where domainId=id1
```

### Update

```sh
stalwart-cli update DkimSignature id1 --field auid='updated value'
```

### Delete

```sh
stalwart-cli delete DkimSignature --ids id1
```

## Nested types

### SecretText

A secret text value provided directly, from an environment variable, or from a file.

- **`Text`**: Secret value. Carries the fields of [`SecretTextValue`](#secrettextvalue).
- **`EnvironmentVariable`**: Secret read from environment variable. Carries the fields of [`SecretKeyEnvironmentVariable`](#secretkeyenvironmentvariable).
- **`File`**: Secret read from file. Carries the fields of [`SecretKeyFile`](#secretkeyfile).

#### SecretTextValue

A secret text value provided directly.

##### `secret`

> Type: `Text` · required · secret
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

### DkimCanonicalization

| Value | Label |
|---|---|
| `relaxed/relaxed` | Relaxed/Relaxed |
| `simple/simple` | Simple/Simple |
| `relaxed/simple` | Relaxed/Simple |
| `simple/relaxed` | Simple/Relaxed |

### DkimHash

| Value | Label |
|---|---|
| `sha256` | SHA-256 |
| `sha1` | SHA-1 |

### DkimRotationStage

| Value | Label |
|---|---|
| `active` | DKIM key is published in DNS and used for signing |
| `pending` | DKIM key is scheduled for DNS publication and not yet active |
| `retiring` | DKIM key has been superseded by a new key but still published in DNS |
| `retired` | DKIM key has been removed from DNS and is pending deletion |

### Dkim2Flag

| Value | Label |
|---|---|
| `donotmodify` | Request that the message not be modified in transit |
| `donotexplode` | Request that the message not be delivered to more than one recipient |
| `feedback` | Request feedback about how the message is handled during delivery |
