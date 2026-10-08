---
title: "WebHook"
source: https://stalw.art/docs/ref/object/web-hook/
description: "Defines a webhook endpoint for event notifications."
---

# WebHook

> Section: Schema reference › Objects

Defines a webhook endpoint for event notifications.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Telemetry › Webhooks

## Fields

##### `allowInvalidCerts`

> Type: `Boolean` · default: `false`
>
> Whether Stalwart should connect to a webhook endpoint that has an invalid TLS certificate

##### `signatureKey`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> The HMAC key used to sign the webhook request body to prevent tampering

##### `throttle`

> Type: `Duration` · default: `1000`
>
> The minimum amount of time that must pass between each request to the webhook endpoint

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Maximum amount of time that Stalwart will wait for a response from this webhook

##### `discardAfter`

> Type: `Duration` · default: `300000`
>
> The duration after which the webhook will be discarded if it cannot be delivered

##### `url`

> Type: `Uri` · required
>
> URL of the webhook endpoint

##### `httpAuth`

> Type: [`HttpAuth`](#httpauth) · required
>
> The type of HTTP authentication to use

##### `httpHeaders`

> Type: `Map<String, String>`
>
> Additional headers to include in HTTP requests

##### `enable`

> Type: `Boolean` · default: `true`
>
> Enable or disable the tracer

##### `level`

> Type: [`TracingLevel`](#tracinglevel) · default: `"info"`
>
> The logging level for this tracer

##### `lossy`

> Type: `Boolean` · default: `false`
>
> Whether to drop log entries if there is backlog

##### `events`

> Type: `Set<`[`EventType`](https://stalw.art/docs/ref/events)`>`
>
> List of events to include or exclude based on filter mode

##### `eventsPolicy`

> Type: [`EventPolicy`](#eventpolicy) · default: `"exclude"`
>
> How to interpret the events list

## JMAP API

The WebHook object is available via the `urn:stalwart:jmap` capability.

### `x:WebHook/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysWebHookGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:WebHook/get",
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

### `x:WebHook/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysWebHookCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:WebHook/set",
          {
            "create": {
              "new1": {
                "events": {},
                "httpAuth": {
                  "@type": "Unauthenticated"
                },
                "httpHeaders": {},
                "signatureKey": {
                  "@type": "None"
                },
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

This operation requires the `sysWebHookUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:WebHook/set",
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

This operation requires the `sysWebHookDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:WebHook/set",
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

### `x:WebHook/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysWebHookQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:WebHook/query",
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
stalwart-cli get WebHook id1
```

### Create

```sh
stalwart-cli create WebHook \
  --field 'signatureKey={"@type":"None"}' \
  --field url=https://example.com \
  --field 'httpAuth={"@type":"Unauthenticated"}' \
  --field 'httpHeaders={}' \
  --field 'events={}'
```

### Query

```sh
stalwart-cli query WebHook
```

### Update

```sh
stalwart-cli update WebHook id1 --field allowInvalidCerts=false
```

### Delete

```sh
stalwart-cli delete WebHook --ids id1
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

#### HttpAuthBearer

HTTP Bearer token authentication.

##### `bearerToken`

> Type: [`SecretKey`](#secretkey) · required
>
> Bearer token for HTTP Bearer Authentication

## Enums

### TracingLevel

| Value | Label |
|---|---|
| `error` | Error |
| `warn` | Warning |
| `info` | Info |
| `debug` | Debug |
| `trace` | Trace |

### EventPolicy

| Value | Label |
|---|---|
| `include` | Only include the specified events |
| `exclude` | Exclude the specified events |
