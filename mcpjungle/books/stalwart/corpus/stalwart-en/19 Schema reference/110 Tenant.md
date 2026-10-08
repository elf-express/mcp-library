---
title: "Tenant"
source: https://stalw.art/docs/ref/object/tenant/
description: "Defines a tenant for multi-tenant environments with isolated resources and quotas."
---

# Tenant

> Section: Schema reference › Objects

Defines a tenant for multi-tenant environments with isolated resources and quotas.

:::note[Enterprise feature]
This object is only available with an [Enterprise license](https://stalw.art/docs/server/enterprise).
:::

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Management › Directory › Tenants

## Fields

##### `name`

> Type: `String` · required
>
> Name of the tenant

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> Creation date of the tenant

##### `logo`

> Type: `String?`
>
> URL or base64-encoded image representing the tenant

##### `roles`

> Type: [`Roles`](#roles) · required
>
> Roles assigned to this tenant

##### `permissions`

> Type: [`Permissions`](#permissions) · required
>
> Permissions assigned to this tenant

##### `quotas`

> Type: `Map<`[`TenantStorageQuota`](#tenantstoragequota)`, UnsignedInt>`
>
> Quotas for different object types within this tenant

##### `usedDiskQuota`

> Type: `Size` · server-set
>
> Amount of disk space currently used by this tenant (bytes)

## JMAP API

The Tenant object is available via the `urn:stalwart:jmap` capability.

### `x:Tenant/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysTenantGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Tenant/get",
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

### `x:Tenant/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysTenantCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Tenant/set",
          {
            "create": {
              "new1": {
                "name": "Example",
                "permissions": {
                  "@type": "Inherit"
                },
                "quotas": {},
                "roles": {
                  "@type": "Default"
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

This operation requires the `sysTenantUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Tenant/set",
          {
            "update": {
              "id1": {
                "name": "updated value"
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

This operation requires the `sysTenantDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Tenant/set",
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

### `x:Tenant/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysTenantQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Tenant/query",
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

The `x:Tenant/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `text` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get Tenant id1
```

### Create

```sh
stalwart-cli create Tenant \
  --field name=Example \
  --field 'roles={"@type":"Default"}' \
  --field 'permissions={"@type":"Inherit"}' \
  --field 'quotas={}'
```

### Query

```sh
stalwart-cli query Tenant
stalwart-cli query Tenant --where text=example
```

### Update

```sh
stalwart-cli update Tenant id1 --field name='updated value'
```

### Delete

```sh
stalwart-cli delete Tenant --ids id1
```

## Nested types

### Roles

Role assignment for groups and tenants.

- **`Default`**: Default role. No additional fields.
- **`Custom`**: Custom role. Carries the fields of [`CustomRoles`](#customroles).

#### CustomRoles

Custom role assignment with specific role references.

##### `roleIds`

> Type: `Set<Id<`[`Role`](https://stalw.art/docs/ref/object/role)`>>`
>
> List of roles assigned to this principal.

### Permissions

Permission assignment mode for accounts, groups, and tenants.

- **`Inherit`**: Inherited permissions. No additional fields.
- **`Merge`**: Permissions are combined with inherited permissions. Carries the fields of [`PermissionsList`](#permissionslist).
- **`Replace`**: Permissions replace all inherited permissions. Carries the fields of [`PermissionsList`](#permissionslist).

#### PermissionsList

Explicit permission grants and denials.

##### `enabledPermissions`

> Type: `Set<`[`Permission`](https://stalw.art/docs/ref/permissions)`>`
>
> List of permissions that are explicitly enabled.

##### `disabledPermissions`

> Type: `Set<`[`Permission`](https://stalw.art/docs/ref/permissions)`>`
>
> List of permissions that are explicitly disabled, even if they would be inherited through other roles or groups. This takes precedence over enabled permissions.

## Enums

### TenantStorageQuota

| Value | Label |
|---|---|
| `maxAccounts` | Maximum number of accounts |
| `maxGroups` | Maximum number of groups |
| `maxDomains` | Maximum number of domains |
| `maxMailingLists` | Maximum number of mailing lists |
| `maxRoles` | Maximum number of roles |
| `maxOauthClients` | Maximum number of OAuth clients |
| `maxDkimKeys` | Maximum number of DKIM keys |
| `maxDnsServers` | Maximum number of DNS servers |
| `maxDirectories` | Maximum number of external directories |
| `maxAcmeProviders` | Maximum number of ACME providers |
| `maxDiskQuota` | Maximum disk space allocated (bytes) |
