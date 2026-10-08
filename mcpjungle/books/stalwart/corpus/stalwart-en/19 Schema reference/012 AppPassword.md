---
title: "AppPassword"
source: https://stalw.art/docs/ref/object/app-password/
description: "App password credential for programmatic access."
---

# AppPassword

> Section: Schema reference › Objects

App password credential for programmatic access.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Account › Credentials › App Passwords

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

The AppPassword object is available via the `urn:stalwart:jmap` capability.

### `x:AppPassword/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysAppPasswordGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AppPassword/get",
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

### `x:AppPassword/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysAppPasswordCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AppPassword/set",
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

This operation requires the `sysAppPasswordUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AppPassword/set",
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

This operation requires the `sysAppPasswordDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AppPassword/set",
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

### `x:AppPassword/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysAppPasswordQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AppPassword/query",
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

The `x:AppPassword/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `expiresAt` | date |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get AppPassword id1
```

### Create

```sh
stalwart-cli create AppPassword \
  --field description=Example \
  --field 'permissions={"@type":"Inherit"}' \
  --field 'allowedIps={}'
```

### Query

```sh
stalwart-cli query AppPassword
stalwart-cli query AppPassword --where expiresAt=2026-01-01T00:00:00Z
```

### Update

```sh
stalwart-cli update AppPassword id1 --field description='updated value'
```

### Delete

```sh
stalwart-cli delete AppPassword --ids id1
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
