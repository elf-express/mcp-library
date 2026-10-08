---
title: "Enterprise"
source: https://stalw.art/docs/ref/object/enterprise/
description: "Configures enterprise licensing and branding settings."
---

# Enterprise

> Section: Schema reference › Objects

Configures enterprise licensing and branding settings.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Enterprise

## Fields

##### `apiKey`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> API key for license retrieval and automatic renewals. Obtain your API key at https://license.stalw.art.

##### `licenseKey`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Upgrade to the enterprise version of Stalwart by entering your license key here. Obtain your license at https://license.stalw.art/buy

##### `logoUrl`

> Type: `Uri?` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> URL to the default logo to use in the Webadmin interface.

## JMAP API

The Enterprise singleton is available via the `urn:stalwart:jmap` capability.

### `x:Enterprise/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysEnterpriseGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Enterprise/get",
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

### `x:Enterprise/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysEnterpriseUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Enterprise/set",
          {
            "update": {
              "singleton": {
                "apiKey": {
                  "@type": "None"
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

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get Enterprise
```

### Update

```sh
stalwart-cli update Enterprise --field apiKey='{"@type":"None"}'
```

## Nested types

### SecretKeyOptional

An optional secret value, or none.

- **`None`**: No secret. No additional fields.
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
