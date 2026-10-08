---
title: "PublicKey"
source: https://stalw.art/docs/ref/object/public-key/
description: "Defines a public key for email encryption (OpenPGP or S/MIME)."
---

# PublicKey

> Section: Schema reference › Objects

Defines a public key for email encryption (OpenPGP or S/MIME).

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Account › Public Keys

## Fields

##### `accountId`

> Type: `Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>` · read-only
>
> Identifier for the account this public key belongs to

##### `key`

> Type: `Text` · required
>
> OpenPGP or S/MIME public key data

##### `description`

> Type: `String` · required
>
> Description of the public key

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> Creation date of the public key

##### `expiresAt`

> Type: `UTCDateTime?`
>
> Expiration date of the public key

##### `emailAddresses`

> Type: `Set<EmailAddress>`
>
> Email addresses associated with the public key

## JMAP API

The PublicKey object is available via the `urn:stalwart:jmap` capability.

### `x:PublicKey/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysPublicKeyGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:PublicKey/get",
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

### `x:PublicKey/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysPublicKeyCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:PublicKey/set",
          {
            "create": {
              "new1": {
                "description": "Example",
                "emailAddresses": {},
                "key": "Example"
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

This operation requires the `sysPublicKeyUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:PublicKey/set",
          {
            "update": {
              "id1": {
                "key": "updated value"
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

This operation requires the `sysPublicKeyDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:PublicKey/set",
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

### `x:PublicKey/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysPublicKeyQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:PublicKey/query",
          {
            "filter": {
              "accountId": "id1"
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

The `x:PublicKey/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `accountId` | id of Account |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get PublicKey id1
```

### Create

```sh
stalwart-cli create PublicKey \
  --field key=Example \
  --field description=Example \
  --field 'emailAddresses={}'
```

### Query

```sh
stalwart-cli query PublicKey
stalwart-cli query PublicKey --where accountId=id1
```

### Update

```sh
stalwart-cli update PublicKey id1 --field key='updated value'
```

### Delete

```sh
stalwart-cli delete PublicKey --ids id1
```
