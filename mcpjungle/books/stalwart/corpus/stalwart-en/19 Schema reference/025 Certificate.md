---
title: "Certificate"
source: https://stalw.art/docs/ref/object/certificate/
description: "Defines a TLS certificate and its associated private key."
---

# Certificate

> Section: Schema reference › Objects

Defines a TLS certificate and its associated private key.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › TLS › Certificates

## Fields

##### `certificate`

> Type: [`PublicText`](#publictext) · required
>
> TLS certificate in PEM format

##### `privateKey`

> Type: [`SecretText`](#secrettext) · required
>
> Private key in PEM format

##### `subjectAlternativeNames`

> Type: `Set<String>` · server-set
>
> Subject Alternative Names (SAN) for the certificate

##### `notValidAfter`

> Type: `UTCDateTime` · server-set
>
> Expiration date of the certificate

##### `notValidBefore`

> Type: `UTCDateTime` · server-set
>
> Issuance date of the certificate

##### `issuer`

> Type: `String` · server-set
>
> Certificate issuer

## JMAP API

The Certificate object is available via the `urn:stalwart:jmap` capability.

### `x:Certificate/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysCertificateGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Certificate/get",
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

### `x:Certificate/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysCertificateCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Certificate/set",
          {
            "create": {
              "new1": {
                "certificate": {
                  "@type": "Text",
                  "value": "Example"
                },
                "privateKey": {
                  "@type": "Text",
                  "secret": "Example"
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

This operation requires the `sysCertificateUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Certificate/set",
          {
            "update": {
              "id1": {
                "certificate": {
                  "@type": "Text",
                  "value": "Example"
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

#### Destroy

This operation requires the `sysCertificateDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Certificate/set",
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

### `x:Certificate/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysCertificateQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Certificate/query",
          {
            "filter": {
              "subjectAlternativeNames": "example"
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

The `x:Certificate/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `subjectAlternativeNames` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get Certificate id1
```

### Create

```sh
stalwart-cli create Certificate \
  --field 'certificate={"@type":"Text","value":"Example"}' \
  --field 'privateKey={"@type":"Text","secret":"Example"}'
```

### Query

```sh
stalwart-cli query Certificate
stalwart-cli query Certificate --where subjectAlternativeNames=example
```

### Update

```sh
stalwart-cli update Certificate id1 --field certificate='{"@type":"Text","value":"Example"}'
```

### Delete

```sh
stalwart-cli delete Certificate --ids id1
```

## Nested types

### PublicText

A text value provided directly, from an environment variable, or from a file.

- **`Text`**: Text value. Carries the fields of [`PublicTextValue`](#publictextvalue).
- **`EnvironmentVariable`**: Text value read from environment variable. Carries the fields of [`SecretKeyEnvironmentVariable`](#secretkeyenvironmentvariable).
- **`File`**: Text value read from file. Carries the fields of [`SecretKeyFile`](#secretkeyfile).

#### PublicTextValue

A text value provided directly.

##### `value`

> Type: `Text` · required
>
> Text value

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
