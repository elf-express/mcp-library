---
title: "AiModel"
source: https://stalw.art/docs/ref/object/ai-model/
description: "Defines an AI model endpoint for LLM-based features."
---

# AiModel

> Section: Schema reference › Objects

Defines an AI model endpoint for LLM-based features.

:::note[Enterprise feature]
This object is only available with an [Enterprise license](https://stalw.art/docs/server/enterprise).
:::

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › AI

## Fields

##### `name`

> Type: `String` · required
>
> Short name for the AI Model

##### `allowInvalidCerts`

> Type: `Boolean` · default: `false`
>
> Whether Stalwart should connect to an endpoint that has an invalid TLS certificate

##### `temperature`

> Type: `Float` · default: `0.7` · max: 1 · min: 0
>
> The temperature of the AI model, which controls the randomness of the output. A higher temperature will produce more random output.

##### `model`

> Type: `String` · required
>
> The name of the AI model to use.

##### `timeout`

> Type: `Duration` · default: `120000`
>
> Maximum amount of time that Stalwart will wait for a response from this endpoint

##### `modelType`

> Type: [`AiModelType`](#aimodeltype) · default: `"Chat"`
>
> API type

##### `url`

> Type: `Uri` · required
>
> URL of the OpenAI compatible endpoint

##### `httpAuth`

> Type: [`HttpAuth`](#httpauth) · required
>
> The type of HTTP authentication to use

##### `httpHeaders`

> Type: `Map<String, String>`
>
> Additional headers to include in HTTP requests

## JMAP API

The AiModel object is available via the `urn:stalwart:jmap` capability.

### `x:AiModel/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysAiModelGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AiModel/get",
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

### `x:AiModel/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysAiModelCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AiModel/set",
          {
            "create": {
              "new1": {
                "httpAuth": {
                  "@type": "Unauthenticated"
                },
                "httpHeaders": {},
                "model": "Example",
                "name": "Example",
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

This operation requires the `sysAiModelUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AiModel/set",
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

This operation requires the `sysAiModelDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AiModel/set",
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

### `x:AiModel/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysAiModelQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AiModel/query",
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
stalwart-cli get AiModel id1
```

### Create

```sh
stalwart-cli create AiModel \
  --field name=Example \
  --field model=Example \
  --field url=https://example.com \
  --field 'httpAuth={"@type":"Unauthenticated"}' \
  --field 'httpHeaders={}'
```

### Query

```sh
stalwart-cli query AiModel
```

### Update

```sh
stalwart-cli update AiModel id1 --field name='updated value'
```

### Delete

```sh
stalwart-cli delete AiModel --ids id1
```

## Nested types

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

### AiModelType

| Value | Label |
|---|---|
| `Chat` | Chat Completion |
| `Text` | Text Generation |
