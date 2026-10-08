---
title: "MtaHook"
source: https://stalw.art/docs/ref/object/mta-hook/
description: "Defines an MTA hook endpoint for message processing."
---

# MtaHook

> Section: Schema reference › Objects

Defines an MTA hook endpoint for message processing.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Filters › MTA Hooks

## Fields

##### `allowInvalidCerts`

> Type: `Boolean` · default: `false`
>
> Whether Stalwart should connect to a hook server that has an invalid TLS certificate

##### `enable`

> Type: [`Expression`](#expression) · default: `{"else":"true"}`
>
> Expression that determines whether to enable this hook
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `maxResponseSize`

> Type: `Size` · default: `52428800`
>
> Maximum size, in bytes, of a response that Stalwart will accept from this MTA Hook server

##### `tempFailOnError`

> Type: `Boolean` · default: `true`
>
> Whether to respond with a temporary failure (typically a 4xx SMTP status code) when Stalwart encounters an error while communicating with this MTA Hook server

##### `stages`

> Type: `Set<`[`MtaStage`](#mtastage)`>` · default: `{"data":true}`
>
> Which SMTP stages to run this hook on

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Maximum amount of time that Stalwart will wait for a response from this hook server

##### `url`

> Type: `Uri` · required
>
> URL of the hook endpoint

##### `httpAuth`

> Type: [`HttpAuth`](#httpauth) · required
>
> The type of HTTP authentication to use

##### `httpHeaders`

> Type: `Map<String, String>`
>
> Additional headers to include in HTTP requests

## JMAP API

The MtaHook object is available via the `urn:stalwart:jmap` capability.

### `x:MtaHook/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysMtaHookGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaHook/get",
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

### `x:MtaHook/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysMtaHookCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaHook/set",
          {
            "create": {
              "new1": {
                "httpAuth": {
                  "@type": "Unauthenticated"
                },
                "httpHeaders": {},
                "url": "https://example.com"
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

This operation requires the `sysMtaHookUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaHook/set",
          {
            "update": {
              "id1": {
                "allowInvalidCerts": false
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

This operation requires the `sysMtaHookDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaHook/set",
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

### `x:MtaHook/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysMtaHookQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaHook/query",
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

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get MtaHook id1
```

### Create

```sh
stalwart-cli create MtaHook \
  --field url=https://example.com \
  --field 'httpAuth={"@type":"Unauthenticated"}' \
  --field 'httpHeaders={}'
```

### Query

```sh
stalwart-cli query MtaHook
```

### Update

```sh
stalwart-cli update MtaHook id1 --field allowInvalidCerts=false
```

### Delete

```sh
stalwart-cli delete MtaHook --ids id1
```

## Nested types

### Expression

A conditional expression with match rules and a default value.

##### `match`

> Type: `List<`[`ExpressionMatch`](#expressionmatch)`>`
>
> List of conditions and their corresponding results

##### `else`

> Type: `String` · required
>
> Else condition

#### ExpressionMatch

A single condition-result pair in an expression.

##### `if`

> Type: `String` · required
>
> If condition

##### `then`

> Type: `String` · required
>
> Then clause

### HttpAuth

Defines the HTTP authentication method to use for HTTP requests.

- **`Unauthenticated`**: Anonymous. No additional fields.
- **`Basic`**: Basic Authentication. Carries the fields of [`HttpAuthBasic`](#httpauthbasic).
- **`Bearer`**: Bearer Token. Carries the fields of [`HttpAuthBearer`](#httpauthbearer).

#### HttpAuthBasic

HTTP Basic authentication credentials.

##### `username`

> Type: `String` · required
>
> Username for HTTP Basic Authentication

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> Password for HTTP Basic Authentication

##### SecretKey

A secret value provided directly, from an environment variable, or from a file.

- **`Value`**: Secret value. Carries the fields of [`SecretKeyValue`](#secretkeyvalue).
- **`EnvironmentVariable`**: Secret read from environment variable. Carries the fields of [`SecretKeyEnvironmentVariable`](#secretkeyenvironmentvariable).
- **`File`**: Secret read from file. Carries the fields of [`SecretKeyFile`](#secretkeyfile).

##### SecretKeyValue

A secret value provided directly.

##### `secret`

> Type: `String` · required · secret
>
> Password or secret value

##### SecretKeyEnvironmentVariable

A secret value read from an environment variable.

##### `variableName`

> Type: `String` · required
>
> Environment variable name to read the secret from

##### SecretKeyFile

A secret value read from a file.

##### `filePath`

> Type: `String` · required
>
> File path to read the secret from

#### HttpAuthBearer

HTTP Bearer token authentication.

##### `bearerToken`

> Type: [`SecretKey`](#secretkey) · required
>
> Bearer token for HTTP Bearer Authentication

## Enums

### MtaStage

| Value | Label |
|---|---|
| `connect` | Connect |
| `ehlo` | EHLO |
| `auth` | AUTH |
| `mail` | MAIL FROM |
| `rcpt` | RCPT TO |
| `data` | DATA |

## Expression references

The following expression contexts are used by fields on this page:

- [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable) (Variables)
