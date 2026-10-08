---
title: "OidcProvider"
source: https://stalw.art/docs/ref/object/oidc-provider/
description: "Configures the OAuth and OpenID Connect provider settings."
---

# OidcProvider

> Section: Schema reference › Objects

Configures the OAuth and OpenID Connect provider settings.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Authentication › OIDC Provider

## Fields

##### `authCodeMaxAttempts`

> Type: `UnsignedInt` · default: `3` · min: 1 · max: 1000
>
> Number of failed login attempts before an authorization code is invalidated

##### `anonymousClientRegistration`

> Type: `Boolean` · default: `true`
>
> Whether to allow OAuth clients to register without authentication

##### `requireClientRegistration`

> Type: `Boolean` · default: `false`
>
> Whether to require OAuth client_ids to be registered before they can be used

##### `authCodeExpiry`

> Type: `Duration` · default: `600000`
>
> Expiration time of an authorization code issued by the authorization code flow

##### `refreshTokenExpiry`

> Type: `Duration` · default: `2592000000`
>
> Expiration time of an OAuth refresh token

##### `refreshTokenRenewal`

> Type: `Duration` · default: `345600000`
>
> Remaining time in a refresh token before a new one is issued to the client

##### `accessTokenExpiry`

> Type: `Duration` · default: `3600000`
>
> Expiration time of an OAuth access token

##### `userCodeExpiry`

> Type: `Duration` · default: `1800000`
>
> Expiration time of a user code issued by the device authentication flow

##### `idTokenExpiry`

> Type: `Duration` · default: `900000`
>
> Expiration time of an OpenID Connect ID token

##### `encryptionKey`

> Type: [`SecretKey`](#secretkey) · required
>
> Encryption key to use for OAuth

##### `signatureAlgorithm`

> Type: [`JwtSignatureAlgorithm`](#jwtsignaturealgorithm) · default: `"hs256"`
>
> JWT signature algorithm to use for OpenID Connect.

##### `signatureKey`

> Type: [`SecretText`](#secrettext) · required
>
> Contents of the private key PEM used to sign JWTs for OpenID Connect.

## JMAP API

The OidcProvider singleton is available via the `urn:stalwart:jmap` capability.

### `x:OidcProvider/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysOidcProviderGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:OidcProvider/get",
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

### `x:OidcProvider/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysOidcProviderUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:OidcProvider/set",
          {
            "update": {
              "singleton": {
                "authCodeMaxAttempts": 3
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
stalwart-cli get OidcProvider
```

### Update

```sh
stalwart-cli update OidcProvider --field authCodeMaxAttempts=3
```

## Nested types

### SecretKey

A secret value provided directly, from an environment variable, or from a file.

- **`Value`**: Secret value. Carries the fields of [`SecretKeyValue`](#secretkeyvalue).
- **`EnvironmentVariable`**: Secret read from environment variable. Carries the fields of [`SecretKeyEnvironmentVariable`](#secretkeyenvironmentvariable).
- **`File`**: Secret read from file. Carries the fields of [`SecretKeyFile`](#secretkeyfile).

#### SecretKeyValue

A secret value provided directly.

##### `secret`

> Type: `String` · required · secret
>
> Password or secret value

#### SecretKeyEnvironmentVariable

A secret value read from an environment variable.

##### `variableName`

> Type: `String` · required
>
> Environment variable name to read the secret from

#### SecretKeyFile

A secret value read from a file.

##### `filePath`

> Type: `String` · required
>
> File path to read the secret from

### SecretText

A secret text value provided directly, from an environment variable, or from a file.

- **`Text`**: Secret value. Carries the fields of [`SecretTextValue`](#secrettextvalue).
- **`EnvironmentVariable`**: Secret read from environment variable. Carries the fields of [`SecretKeyEnvironmentVariable`](#secretkeyenvironmentvariable).
- **`File`**: Secret read from file. Carries the fields of [`SecretKeyFile`](#secretkeyfile).

#### SecretTextValue

A secret text value provided directly.

##### `secret`

> Type: `Text` · required · secret
>
> Password or secret value

## Enums

### JwtSignatureAlgorithm

| Value | Label |
|---|---|
| `es256` | ECDSA using P-256 and SHA-256 |
| `es384` | ECDSA using P-384 and SHA-384 |
| `ps256` | RSASSA-PSS using SHA-256 and MGF1 with SHA-256 |
| `ps384` | RSASSA-PSS using SHA-384 and MGF1 with SHA-384 |
| `ps512` | RSASSA-PSS using SHA-512 and MGF1 with SHA-512 |
| `rs256` | RSASSA-PKCS1-v1_5 using SHA-256 |
| `rs384` | RSASSA-PKCS1-v1_5 using SHA-384 |
| `rs512` | RSASSA-PKCS1-v1_5 using SHA-512 |
| `hs256` | HMAC using SHA-256 |
| `hs384` | HMAC using SHA-384 |
| `hs512` | HMAC using SHA-512 |
