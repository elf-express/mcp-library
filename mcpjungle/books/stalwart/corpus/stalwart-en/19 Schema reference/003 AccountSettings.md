---
title: "AccountSettings"
source: https://stalw.art/docs/ref/object/account-settings/
description: "Configures default account settings for locale and encryption."
---

# AccountSettings

> Section: Schema reference › Objects

Configures default account settings for locale and encryption.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Account › Settings

## Fields

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

## JMAP API

The AccountSettings singleton is available via the `urn:stalwart:jmap` capability.

### `x:AccountSettings/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysAccountSettingsGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AccountSettings/get",
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

### `x:AccountSettings/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysAccountSettingsUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AccountSettings/set",
          {
            "update": {
              "singleton": {
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

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get AccountSettings
```

### Update

```sh
stalwart-cli update AccountSettings --field description='updated value'
```

## Nested types

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
