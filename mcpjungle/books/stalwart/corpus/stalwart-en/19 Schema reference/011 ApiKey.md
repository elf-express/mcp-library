---
title: "ApiKey"
source: https://stalw.art/docs/ref/object/api-key/
description: "API key credential for programmatic access."
---

# ApiKey

> Section: Schema reference › Objects

API key credential for programmatic access.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Account › Credentials › API Keys

## Fields

##### `description`

> Type: `String` · required
>
> Description of the credential

##### `secret`

> Type: `String` · read-only · server-set · secret
>
> Secret value of the credential

##### `createdAt`

> Type: `UTCDateTime` · read-only · server-set
>
> Creation date of the credential

##### `expiresAt`

> Type: `UTCDateTime?`
>
> Expiration date of the credential

##### `permissions`

> Type: [`CredentialPermissions`](#credentialpermissions) · required
>
> List of permissions assigned to this credential

##### `allowedIps`

> Type: `Set<IpMask>`
>
> List of allowed IP addresses or CIDR ranges for this credential

## JMAP API

The ApiKey object is available via the `urn:stalwart:jmap` capability.

### `x:ApiKey/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysApiKeyGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ApiKey/get",
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

### `x:ApiKey/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysApiKeyCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ApiKey/set",
          {
            "create": {
              "new1": {
                "allowedIps": {},
                "description": "Example",
                "permissions": {
                  "@type": "Inherit"
                }
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

This operation requires the `sysApiKeyUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ApiKey/set",
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

This operation requires the `sysApiKeyDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ApiKey/set",
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

### `x:ApiKey/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysApiKeyQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ApiKey/query",
          {
            "filter": {
              "expiresAt": "2026-01-01T00:00:00Z"
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

The `x:ApiKey/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `expiresAt` | date |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get ApiKey id1
```

### Create

```sh
stalwart-cli create ApiKey \
  --field description=Example \
  --field 'permissions={"@type":"Inherit"}' \
  --field 'allowedIps={}'
```

### Query

```sh
stalwart-cli query ApiKey
stalwart-cli query ApiKey --where expiresAt=2026-01-01T00:00:00Z
```

### Update

```sh
stalwart-cli update ApiKey id1 --field description='updated value'
```

### Delete

```sh
stalwart-cli delete ApiKey --ids id1
```

## Nested types

### CredentialPermissions

Permission assignment mode for a credential.

- **`Inherit`**: Same permissions as account. No additional fields.
- **`Disable`**: Disable some permissions. Carries the fields of [`CredentialPermissionsList`](#credentialpermissionslist).
- **`Replace`**: Replace all permissions. Carries the fields of [`CredentialPermissionsList`](#credentialpermissionslist).

#### CredentialPermissionsList

List of permissions to assign to a credential.

##### `permissions`

> Type: `Set<`[`Permission`](https://stalw.art/docs/ref/permissions)`>`
>
> List of permissions to assign.
