---
title: "MaskedEmail"
source: https://stalw.art/docs/ref/object/masked-email/
description: "Defines a masked email address for privacy protection."
---

# MaskedEmail

> Section: Schema reference › Objects

Defines a masked email address for privacy protection.

:::note[Enterprise feature]
This object is only available with an [Enterprise license](https://stalw.art/docs/server/enterprise).
:::

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Account › Masked Addresses

## Fields

##### `enabled`

> Type: `Boolean` · default: `true`
>
> Whether this masked email address is enabled

##### `accountId`

> Type: `Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>` · read-only
>
> Identifier for the account this masked email address belongs to

##### `email`

> Type: `String` · server-set
>
> The masked email address

##### `description`

> Type: `String?`
>
> Description of the masked email address

##### `forDomain`

> Type: `String?`
>
> The domain name of the site this address was created for, e.g. "https://example.com". This is intended to be added automatically by password managers.

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> The date-time the email address was created.

##### `createdBy`

> Type: `String?`
>
> The name of the client that created this email address. This will be set by the server automatically based on the credentials used to authenticate the request, e.g. "ACME Password Manager".

##### `expiresAt`

> Type: `UTCDateTime?` · read-only
>
> Expiration date of the email address

##### `url`

> Type: `String?`
>
> A URL pointing back to the integrator's use of this email address, e.g. a custom-uri to open "ACME Password Manager" at the appropriate entry.

##### `emailPrefix`

> Type: `EmailLocalPart?` · read-only
>
> This is only used on create and otherwise ignored; if supplied, the server-assigned email will start with the given prefix. The string MUST be &lt;= 64 characters in length and MUST only contain characters a-z, 0-9 and _ (underscore).

##### `emailDomain`

> Type: `DomainName?` · read-only
>
> This is only used on create and otherwise ignored; if supplied, the server-assigned email will end with the given domain.

## JMAP API

The MaskedEmail object is available via the `urn:stalwart:jmap` capability.

### `x:MaskedEmail/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysMaskedEmailGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MaskedEmail/get",
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

### `x:MaskedEmail/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysMaskedEmailCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MaskedEmail/set",
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

This operation requires the `sysMaskedEmailUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MaskedEmail/set",
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

This operation requires the `sysMaskedEmailDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MaskedEmail/set",
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

### `x:MaskedEmail/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysMaskedEmailQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MaskedEmail/query",
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

The `x:MaskedEmail/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `accountId` | id of Account |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get MaskedEmail id1
```

### Create

```sh
stalwart-cli create MaskedEmail
```

### Query

```sh
stalwart-cli query MaskedEmail
stalwart-cli query MaskedEmail --where accountId=id1
```

### Update

```sh
stalwart-cli update MaskedEmail id1 --field description='updated value'
```

### Delete

```sh
stalwart-cli delete MaskedEmail --ids id1
```
