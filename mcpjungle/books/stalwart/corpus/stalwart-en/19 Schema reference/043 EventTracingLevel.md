---
title: "EventTracingLevel"
source: https://stalw.art/docs/ref/object/event-tracing-level/
description: "Defines a custom logging level override for a specific event type."
---

# EventTracingLevel

> Section: Schema reference › Objects

Defines a custom logging level override for a specific event type.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Telemetry › Event Levels

## Fields

##### `event`

> Type: [`EventType`](https://stalw.art/docs/ref/events) · read-only
>
> Unique identifier of the event

##### `level`

> Type: [`TracingLevelOpt`](#tracinglevelopt) · default: `"info"`
>
> The logging level for this event

## JMAP API

The EventTracingLevel object is available via the `urn:stalwart:jmap` capability.

### `x:EventTracingLevel/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysEventTracingLevelGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:EventTracingLevel/get",
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

### `x:EventTracingLevel/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysEventTracingLevelCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:EventTracingLevel/set",
          {
            "create": {
              "new1": {}
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

This operation requires the `sysEventTracingLevelUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:EventTracingLevel/set",
          {
            "update": {
              "id1": {
                "level": "info"
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

This operation requires the `sysEventTracingLevelDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:EventTracingLevel/set",
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

### `x:EventTracingLevel/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysEventTracingLevelQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:EventTracingLevel/query",
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
stalwart-cli get EventTracingLevel id1
```

### Create

```sh
stalwart-cli create EventTracingLevel
```

### Query

```sh
stalwart-cli query EventTracingLevel
```

### Update

```sh
stalwart-cli update EventTracingLevel id1 --field level=info
```

### Delete

```sh
stalwart-cli delete EventTracingLevel --ids id1
```

## Enums

### TracingLevelOpt

| Value | Label |
|---|---|
| `disable` | Disabled |
| `error` | Error - Only errors are logged |
| `warn` | Warning - Errors and warnings are logged |
| `info` | Info - Errors, warnings and info are logged |
| `debug` | Debug - Errors, warnings, info and debug are logged |
| `trace` | Trace - Errors, warnings, info, debug and trace are logged |
