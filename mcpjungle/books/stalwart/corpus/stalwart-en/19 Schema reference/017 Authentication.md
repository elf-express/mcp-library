---
title: "Authentication"
source: https://stalw.art/docs/ref/object/authentication/
description: "Configures authentication settings including password policies and default roles."
---

# Authentication

> Section: Schema reference › Objects

Configures authentication settings including password policies and default roles.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Authentication › General

## Fields

##### `directoryId`

> Type: `Id<`[`Directory`](https://stalw.art/docs/ref/object/directory)`>?`
>
> External directory used for authentication, or null to use the internal directory

##### `defaultUserRoleIds`

> Type: `Set<Id<`[`Role`](https://stalw.art/docs/ref/object/role)`>>`
>
> Default roles to assign for accounts.

##### `defaultGroupRoleIds`

> Type: `Set<Id<`[`Role`](https://stalw.art/docs/ref/object/role)`>>`
>
> Default roles to assign for groups.

##### `defaultTenantRoleIds`

> Type: `Set<Id<`[`Role`](https://stalw.art/docs/ref/object/role)`>>` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> Default roles to assign for tenants in multi-tenant environments.

##### `defaultAdminRoleIds`

> Type: `Set<Id<`[`Role`](https://stalw.art/docs/ref/object/role)`>>`
>
> Default roles to assign for administrators.

##### `passwordHashAlgorithm`

> Type: [`PasswordHashAlgorithm`](#passwordhashalgorithm) · default: `"argon2id"`
>
> Password hashing algorithm to use for storing user passwords in the internal directory.

##### `passwordMinLength`

> Type: `UnsignedInt` · default: `8` · min: 1 · max: 100
>
> Minimum length for user passwords in the internal directory.

##### `passwordMaxLength`

> Type: `UnsignedInt` · default: `128` · min: 1 · max: 1000
>
> Maximum length for user passwords in the internal directory.

##### `passwordMinStrength`

> Type: [`PasswordStrength`](#passwordstrength) · default: `"three"`
>
> Minimum strength for user passwords in the internal directory, calculated using the zxcvbn algorithm.

##### `passwordDefaultExpiry`

> Type: `Duration?`
>
> Default expiration time for user passwords in the internal directory, after which the user will be required to change their password.

##### `maxAppPasswords`

> Type: `UnsignedInt?` · default: `5` · min: 1
>
> The default maximum number of app passwords a user can create

##### `maxApiKeys`

> Type: `UnsignedInt?` · default: `5` · min: 1
>
> The default maximum number of API keys a user can create

## JMAP API

The Authentication singleton is available via the `urn:stalwart:jmap` capability.

### `x:Authentication/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysAuthenticationGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Authentication/get",
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

### `x:Authentication/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysAuthenticationUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Authentication/set",
          {
            "update": {
              "singleton": {
                "directoryId": "<Directory id>"
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
stalwart-cli get Authentication
```

### Update

```sh
stalwart-cli update Authentication --field directoryId='<Directory id>'
```

## Enums

### PasswordHashAlgorithm

| Value | Label |
|---|---|
| `argon2id` | Argon2id |
| `bcrypt` | Bcrypt |
| `scrypt` | Scrypt |
| `pbkdf2` | Pbkdf2 |

### PasswordStrength

| Value | Label |
|---|---|
| `zero` | Too guessable: risky password. (guesses < 10^3) |
| `one` | Very guessable: protection from throttled online attacks. (guesses < 10^6) |
| `two` | Somewhat guessable: protection from unthrottled online attacks. (guesses < 10^8) |
| `three` | Safely unguessable: moderate protection from offline slow-hash scenario. (guesses < 10^10) |
| `four` | Very unguessable: strong protection from offline slow-hash scenario. (guesses >= 10^10) |
