---
title: "OAuthClient"
source: https://stalw.art/docs/ref/object/o-auth-client/
description: "Defines a registered OAuth client application."
---

# OAuthClient

> Section: Schema reference › Objects

Defines a registered OAuth client application.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Management › Directory › OAuth Clients

## Fields

##### `clientId`

> Type: `String` · required
>
> Unique identifier of the OAuth client

##### `description`

> Type: `String?`
>
> Description of the OAuth client

##### `contacts`

> Type: `Set<EmailAddress>`
>
> Contact email addresses for the OAuth client

##### `secret`

> Type: `String?` · secret
>
> Secret value of the OAuth client

##### `createdAt`

> Type: `UTCDateTime` · read-only · server-set
>
> Creation date of the OAuth client

##### `expiresAt`

> Type: `UTCDateTime?`
>
> Expiration date of the OAuth client

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this OAuth client belongs to

##### `redirectUris`

> Type: `Set<Uri>`
>
> List of redirect URIs for the OAuth client

##### `logo`

> Type: `String?`
>
> URL or base64-encoded image representing the OAuth client

## JMAP API

The OAuthClient object is available via the `urn:stalwart:jmap` capability.

### `x:OAuthClient/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysOAuthClientGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:OAuthClient/get",
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

### `x:OAuthClient/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysOAuthClientCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:OAuthClient/set",
          {
            "create": {
              "new1": {
                "clientId": "Example",
                "contacts": {},
                "redirectUris": {}
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

This operation requires the `sysOAuthClientUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:OAuthClient/set",
          {
            "update": {
              "id1": {
                "clientId": "updated value"
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

This operation requires the `sysOAuthClientDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:OAuthClient/set",
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

### `x:OAuthClient/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysOAuthClientQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:OAuthClient/query",
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

The `x:OAuthClient/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `text` | text |
| `clientId` | text |
| `memberTenantId` | id of Tenant |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get OAuthClient id1
```

### Create

```sh
stalwart-cli create OAuthClient \
  --field clientId=Example \
  --field 'contacts={}' \
  --field 'redirectUris={}'
```

### Query

```sh
stalwart-cli query OAuthClient
stalwart-cli query OAuthClient --where text=example
```

### Update

```sh
stalwart-cli update OAuthClient id1 --field clientId='updated value'
```

### Delete

```sh
stalwart-cli delete OAuthClient --ids id1
```
