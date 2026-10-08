---
title: "Tracer"
source: https://stalw.art/docs/ref/object/tracer/
description: "Defines a logging and tracing output method."
---

# Tracer

> Section: Schema reference › Objects

Defines a logging and tracing output method.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Telemetry › Tracers

## Fields

Tracer is a **multi-variant** object: each instance has an `@type` discriminator selecting one of the variants below, and each variant carries its own set of fields.

### `@type: "Log"`

Log file

##### `path`

> Type: `String` · required
>
> The path to the log file

##### `prefix`

> Type: `String` · default: `"stalwart"`
>
> The prefix for the log file

##### `rotate`

> Type: [`LogRotateFrequency`](#logrotatefrequency) · default: `"daily"`
>
> The frequency to rotate the log file

##### `ansi`

> Type: `Boolean` · default: `true`
>
> Whether to use ANSI colors in logs

##### `multiline`

> Type: `Boolean` · default: `false`
>
> Whether to write log entries as a single line or multiline

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

### `@type: "Stdout"`

Console

##### `buffered`

> Type: `Boolean` · default: `true`
>
> Whether to buffer log entries before writing to console

##### `ansi`

> Type: `Boolean` · default: `false`
>
> Whether to use ANSI colors in logs

##### `multiline`

> Type: `Boolean` · default: `false`
>
> Whether to write log entries as a single line or multiline

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

### `@type: "Journal"`

Systemd Journal

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

### `@type: "OtelHttp"`

Open Telemetry (HTTP)

##### `endpoint`

> Type: `Uri` · required
>
> The endpoint for Open Telemetry

##### `enableLogExporter`

> Type: `Boolean` · default: `true`
>
> Whether to export logs to OpenTelemetry

##### `enableSpanExporter`

> Type: `Boolean` · default: `true`
>
> Whether to export spans to OpenTelemetry

##### `throttle`

> Type: `Duration` · default: `1000`
>
> The minimum amount of time that must pass between each request to the OpenTelemetry endpoint

##### `timeout`

> Type: `Duration` · default: `10000`
>
> Maximum amount of time that Stalwart will wait for a response from the OpenTelemetry endpoint

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

### `@type: "OtelGrpc"`

Open Telemetry (gRPC)

##### `endpoint`

> Type: `Uri?`
>
> The endpoint for Open Telemetry

##### `enableLogExporter`

> Type: `Boolean` · default: `true`
>
> Whether to export logs to OpenTelemetry

##### `enableSpanExporter`

> Type: `Boolean` · default: `true`
>
> Whether to export spans to OpenTelemetry

##### `throttle`

> Type: `Duration` · default: `1000`
>
> The minimum amount of time that must pass between each request to the OpenTelemetry endpoint

##### `timeout`

> Type: `Duration` · default: `10000`
>
> Maximum amount of time that Stalwart will wait for a response from the OpenTelemetry endpoint

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

The Tracer object is available via the `urn:stalwart:jmap` capability.

### `x:Tracer/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysTracerGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Tracer/get",
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

### `x:Tracer/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysTracerCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Tracer/set",
          {
            "create": {
              "new1": {
                "@type": "Log",
                "events": {},
                "path": "Example"
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

This operation requires the `sysTracerUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Tracer/set",
          {
            "update": {
              "id1": {
                "path": "updated value"
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

This operation requires the `sysTracerDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Tracer/set",
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

### `x:Tracer/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysTracerQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Tracer/query",
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
stalwart-cli get Tracer id1
```

### Create

```sh
stalwart-cli create Tracer/Log \
  --field path=Example \
  --field 'events={}'
```

### Query

```sh
stalwart-cli query Tracer
```

### Update

```sh
stalwart-cli update Tracer id1 --field path='updated value'
```

### Delete

```sh
stalwart-cli delete Tracer --ids id1
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

### LogRotateFrequency

| Value | Label |
|---|---|
| `daily` | Daily |
| `hourly` | Hourly |
| `minutely` | Minutely |
| `never` | Never |

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
