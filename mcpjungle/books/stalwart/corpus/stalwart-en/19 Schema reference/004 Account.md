---
title: "Account"
source: https://stalw.art/docs/ref/object/account/
description: "Defines a user or group account for authentication and email access."
---

# Account

> Section: Schema reference › Objects

Defines a user or group account for authentication and email access.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Management › Directory › Groups Management › Directory › Accounts

## Fields

Account is a **multi-variant** object: each instance has an `@type` discriminator selecting one of the variants below, and each variant carries its own set of fields.

### `@type: "User"`

User account

##### `name`

> Type: `EmailLocalPart` · required
>
> Name of the account, typically an email address local part.

##### `domainId`

> Type: `Id<`[`Domain`](https://stalw.art/docs/ref/object/domain)`>` · required
>
> Identifier for the domain this account belongs to. This is used to determine the email address of the account, which is formed as name@domain.

##### `emailAddress`

> Type: `EmailAddress` · server-set
>
> Email address for the user account, formed as name@domain.

##### `credentials`

> Type: `List<`[`Credential`](#credential)`>`
>
> List of credential objects representing authentication methods for the account

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> Creation date of the account

##### `memberGroupIds`

> Type: `Set<Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>>`
>
> List of groups that this account is a member of

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this account belongs to

##### `roles`

> Type: [`UserRoles`](#userroles) · required
>
> Roles assigned to this user account

##### `permissions`

> Type: [`Permissions`](#permissions) · required
>
> Permissions assigned to this account

##### `quotas`

> Type: `Map<`[`StorageQuota`](#storagequota)`, UnsignedInt>`
>
> Quotas for different object types within this account

##### `usedDiskQuota`

> Type: `Size` · server-set
>
> Amount of disk space currently used by this account (bytes)

##### `aliases`

> Type: `List<`[`EmailAlias`](#emailalias)`>`
>
> List of email aliases for the account

##### `externalId`

> Type: `String?` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> Identifier assigned by an external provisioning client such as a SCIM identity provider

##### `description`

> Type: `String?`
>
> Description of the account

##### `locale`

> Type: [`Locale`](https://stalw.art/docs/ref/enum/locale) · default: `"en-US"`
>
> Preferred locale for the account

##### `timeZone`

> Type: [`TimeZone`](https://stalw.art/docs/ref/enum/time-zone)`?`
>
> Preferred time zone for the account

##### `encryptionAtRest`

> Type: [`EncryptionAtRest`](#encryptionatrest) · required
>
> Encryption-at-rest settings for the account

### `@type: "Group"`

Group account

##### `name`

> Type: `EmailLocalPart` · required
>
> Name of the group, typically an email address local part.

##### `domainId`

> Type: `Id<`[`Domain`](https://stalw.art/docs/ref/object/domain)`>` · required
>
> Identifier for the domain this group belongs to. This is used to determine the email address of the group, which is formed as name@domain.

##### `emailAddress`

> Type: `EmailAddress` · server-set
>
> Email address of the group, formed as name@domain.

##### `description`

> Type: `String?`
>
> Description of the group

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> Creation date of the account

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this group belongs to

##### `roles`

> Type: [`Roles`](#roles) · required
>
> Roles assigned to this group

##### `quotas`

> Type: `Map<`[`StorageQuota`](#storagequota)`, UnsignedInt>`
>
> Quotas for different object types within this group

##### `usedDiskQuota`

> Type: `Size` · server-set
>
> Amount of disk space currently used by this account (bytes)

##### `permissions`

> Type: [`Permissions`](#permissions) · required
>
> Permissions assigned to this group

##### `aliases`

> Type: `List<`[`EmailAlias`](#emailalias)`>`
>
> List of email aliases for the group

##### `locale`

> Type: [`Locale`](https://stalw.art/docs/ref/enum/locale) · default: `"en-US"`
>
> Preferred locale for the group

##### `timeZone`

> Type: [`TimeZone`](https://stalw.art/docs/ref/enum/time-zone)`?`
>
> Preferred time zone for the account

##### `externalId`

> Type: `String?` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> Identifier assigned by an external provisioning client such as a SCIM identity provider

## JMAP API

The Account object is available via the `urn:stalwart:jmap` capability.

### `x:Account/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysAccountGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Account/get",
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

### `x:Account/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysAccountCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Account/set",
          {
            "create": {
              "new1": {
                "@type": "User",
                "aliases": {},
                "credentials": {},
                "domainId": "<Domain id>",
                "encryptionAtRest": {
                  "@type": "Disabled"
                },
                "memberGroupIds": {},
                "name": "alice",
                "permissions": {
                  "@type": "Inherit"
                },
                "quotas": {},
                "roles": {
                  "@type": "User"
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

This operation requires the `sysAccountUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Account/set",
          {
            "update": {
              "id1": {
                "externalId": "updated value"
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

This operation requires the `sysAccountDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Account/set",
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

### `x:Account/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysAccountQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Account/query",
          {
            "filter": {}
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

The `x:Account/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `text` | text |
| `name` | text |
| `domainId` | id of Domain |
| `memberTenantId` | id of Tenant |
| `memberGroupIds` | id of Account/Group |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get Account id1
```

### Create

```sh
stalwart-cli create Account/User \
  --field name=alice \
  --field 'domainId=<Domain id>' \
  --field 'credentials={}' \
  --field 'memberGroupIds={}' \
  --field 'roles={"@type":"User"}' \
  --field 'permissions={"@type":"Inherit"}' \
  --field 'quotas={}' \
  --field 'aliases={}' \
  --field 'encryptionAtRest={"@type":"Disabled"}'
```

### Query

```sh
stalwart-cli query Account
```

### Update

```sh
stalwart-cli update Account id1 --field externalId='updated value'
```

### Delete

```sh
stalwart-cli delete Account --ids id1
```

## Nested types

### Credential

Defines an authentication credential for an account.

- **`Password`**: Password for authenticating to the account. Carries the fields of [`PasswordCredential`](#passwordcredential).
- **`AppPassword`**: App password for third-party applications. Carries the fields of [`SecondaryCredential`](#secondarycredential).
- **`ApiKey`**: API key for programmatic access. Carries the fields of [`SecondaryCredential`](#secondarycredential).

#### PasswordCredential

Password-based authentication credential.

##### `secret`

> Type: `String` · required · secret
>
> Secret value of the account

##### `otpAuth`

> Type: `Uri?` · secret
>
> OTP authentication URI for the account

##### `expiresAt`

> Type: `UTCDateTime?`
>
> Expiration date of the credential

##### `allowedIps`

> Type: `Set<IpMask>`
>
> List of allowed IP addresses or CIDR ranges for this credential

#### SecondaryCredential

App password or API key credential for programmatic access.

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

##### CredentialPermissions

Permission assignment mode for a credential.

- **`Inherit`**: Same permissions as account. No additional fields.
- **`Disable`**: Disable some permissions. Carries the fields of [`CredentialPermissionsList`](#credentialpermissionslist).
- **`Replace`**: Replace all permissions. Carries the fields of [`CredentialPermissionsList`](#credentialpermissionslist).

##### CredentialPermissionsList

List of permissions to assign to a credential.

##### `permissions`

> Type: `Set<`[`Permission`](https://stalw.art/docs/ref/permissions)`>`
>
> List of permissions to assign.

### UserRoles

Role assignment for user accounts.

- **`User`**: User role. No additional fields.
- **`Admin`**: Administrator role. No additional fields.
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

### EmailAlias

Defines an email alias for an account or mailing list.

##### `enabled`

> Type: `Boolean` · default: `true`
>
> Whether this email alias is enabled

##### `name`

> Type: `EmailLocalPart` · required
>
> The local part of the email alias (the part before the @ symbol)

##### `domainId`

> Type: `Id<`[`Domain`](https://stalw.art/docs/ref/object/domain)`>` · required
>
> Identifier for the domain of the email alias (the part after the @ symbol).

##### `description`

> Type: `String?`
>
> Description of the email alias

### EncryptionAtRest

Encryption-at-rest algorithm selection.

- **`Disabled`**: Disabled. No additional fields.
- **`Aes128`**: AES-128. Carries the fields of [`EncryptionSettings`](#encryptionsettings).
- **`Aes256`**: AES-256. Carries the fields of [`EncryptionSettings`](#encryptionsettings).
- **`Aes256Gcm`**: AES-256-GCM (S/MIME only). Carries the fields of [`EncryptionSettings`](#encryptionsettings).
- **`ChaCha20Poly1305`**: ChaCha20-Poly1305 (S/MIME only). Carries the fields of [`EncryptionSettings`](#encryptionsettings).

#### EncryptionSettings

Encryption-at-rest settings for an account.

##### `publicKey`

> Type: `Id<`[`PublicKey`](https://stalw.art/docs/ref/object/public-key)`>` · required
>
> Public key used for encrypting emails

##### `encryptOnAppend`

> Type: `Boolean` · default: `false`
>
> Whether to encrypt emails when they are appended to mailboxes

##### `allowSpamTraining`

> Type: `Boolean` · default: `false`
>
> Whether to allow training the spam classifier with plaintext emails before encryption

### Roles

Role assignment for groups and tenants.

- **`Default`**: Default role. No additional fields.
- **`Custom`**: Custom role. Carries the fields of [`CustomRoles`](#customroles).

## Enums

### StorageQuota

| Value | Label |
|---|---|
| `maxEmails` | Maximum number of emails |
| `maxMailboxes` | Maximum number of mailboxes |
| `maxEmailSubmissions` | Maximum number of email submissions |
| `maxEmailIdentities` | Maximum number of email identities |
| `maxParticipantIdentities` | Maximum number of participant identities |
| `maxSieveScripts` | Maximum number of Sieve scripts |
| `maxPushSubscriptions` | Maximum number of push subscriptions |
| `maxCalendars` | Maximum number of calendars |
| `maxCalendarEvents` | Maximum number of calendar events |
| `maxCalendarEventNotifications` | Maximum number of calendar event notifications |
| `maxAddressBooks` | Maximum number of address books |
| `maxContactCards` | Maximum number of contact cards |
| `maxFiles` | Maximum number of files |
| `maxFolders` | Maximum number of folders |
| `maxMaskedAddresses` | Maximum number of masked email addresses |
| `maxAppPasswords` | Maximum number of app passwords |
| `maxApiKeys` | Maximum number of API keys |
| `maxPublicKeys` | Maximum number of public keys |
| `maxDiskQuota` | Maximum disk space allocated (bytes) |
