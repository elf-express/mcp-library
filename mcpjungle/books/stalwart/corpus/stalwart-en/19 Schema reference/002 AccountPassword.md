---
title: "AccountPassword"
source: https://stalw.art/docs/ref/object/account-password/
description: "Password-based authentication credential."
---

# AccountPassword

> Section: Schema reference › Objects

Password-based authentication credential.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Account › Credentials › Password

## Fields

##### `secret`

> Type: `String?` · secret
>
> Secret value of the account

##### `currentSecret`

> Type: `String?` · secret
>
> The current secret value of the account, used for password verification.

##### `otpAuth`

> Type: [`OtpAuth`](#otpauth) · required
>
> OTP authentication settings for the account

## JMAP API

The AccountPassword singleton is available via the `urn:stalwart:jmap` capability.

### `x:AccountPassword/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysAccountPasswordGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AccountPassword/get",
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

### `x:AccountPassword/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysAccountPasswordUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AccountPassword/set",
          {
            "update": {
              "singleton": {
                "secret": "updated value"
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
stalwart-cli get AccountPassword
```

### Update

```sh
stalwart-cli update AccountPassword --field secret='updated value'
```

## Nested types

### OtpAuth

OTP-based authentication credential.

##### `otpCode`

> Type: `String?` · secret
>
> OTP code for the account, required for credential changes.

##### `otpUrl`

> Type: `Uri?` · secret
>
> OTP authentication URI for the account
