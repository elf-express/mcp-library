---
title: "Trace"
source: https://stalw.art/docs/ref/object/trace/
description: "Stores a message delivery trace with associated events."
---

# Trace

> Section: Schema reference › Objects

Stores a message delivery trace with associated events.

:::note[Enterprise feature]
This object is only available with an [Enterprise license](https://stalw.art/docs/server/enterprise).
:::

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Management › Emails › History › Inbound Delivery Management › Emails › History › Outbound Delivery

## Fields

##### `events`

> Type: `List<`[`TraceEvent`](#traceevent)`>`
>
> List of events associated with the trace entry

##### `timestamp`

> Type: `UTCDateTime` · server-set
>
> Timestamp of the trace entry

##### `from`

> Type: `String` · server-set
>
> Sender address

##### `to`

> Type: `String` · server-set
>
> Recipient addresses

##### `size`

> Type: `Size` · server-set
>
> Size of the message

## JMAP API

The Trace object is available via the `urn:stalwart:jmap` capability.

### `x:Trace/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysTraceGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Trace/get",
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

### `x:Trace/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysTraceCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Trace/set",
          {
            "create": {
              "new1": {
                "events": {}
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

This operation requires the `sysTraceUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Trace/set",
          {
            "update": {
              "id1": {
                "events": {}
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

This operation requires the `sysTraceDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Trace/set",
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

### `x:Trace/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysTraceQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Trace/query",
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

The `x:Trace/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `text` | text |
| `timestamp` | date |
| `queueId` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get Trace id1
```

### Create

```sh
stalwart-cli create Trace \
  --field 'events={}'
```

### Query

```sh
stalwart-cli query Trace
```

### Update

```sh
stalwart-cli update Trace id1 --field events='{}'
```

### Delete

```sh
stalwart-cli delete Trace --ids id1
```

## Nested types

### TraceEvent

A single event within a delivery trace.

##### `event`

> Type: [`EventType`](https://stalw.art/docs/ref/events) · required
>
> Event type

##### `timestamp`

> Type: `UTCDateTime` · required
>
> Timestamp when the event occurred

##### `keyValues`

> Type: `List<`[`TraceKeyValue`](#tracekeyvalue)`>`
>
> List of key-value pairs associated with the trace entry

#### TraceKeyValue

A key-value pair associated with a trace event.

##### `key`

> Type: [`Key`](https://stalw.art/docs/ref/events#keys) · required
>
> Key name

##### `value`

> Type: [`TraceValue`](#tracevalue) · required
>
> Key value

##### TraceValue

A typed value in a trace key-value pair.

- **`String`**: String value. Carries the fields of [`TraceValueString`](#tracevaluestring).
- **`UnsignedInt`**: Unsigned integer value. Carries the fields of [`TraceValueUnsignedInt`](#tracevalueunsignedint).
- **`Integer`**: Integer value. Carries the fields of [`TraceValueInteger`](#tracevalueinteger).
- **`Boolean`**: Boolean value. Carries the fields of [`TraceValueBoolean`](#tracevalueboolean).
- **`Float`**: Float value. Carries the fields of [`TraceValueFloat`](#tracevaluefloat).
- **`UTCDateTime`**: UTC date and time value. Carries the fields of [`TraceValueUTCDateTime`](#tracevalueutcdatetime).
- **`Duration`**: Duration value in seconds. Carries the fields of [`TraceValueDuration`](#tracevalueduration).
- **`IpAddr`**: IP address value. Carries the fields of [`TraceValueIpAddr`](#tracevalueipaddr).
- **`List`**: Value list. Carries the fields of [`TraceValueList`](#tracevaluelist).
- **`Event`**: Nested event value. Carries the fields of [`TraceValueEvent`](#tracevalueevent).
- **`Null`**: Null value. No additional fields.

##### TraceValueString

A string trace value.

##### `value`

> Type: `String` · required
>
> String value

##### TraceValueUnsignedInt

An unsigned integer trace value.

##### `value`

> Type: `UnsignedInt` · default: `0`
>
> Unsigned integer value

##### TraceValueInteger

An integer trace value.

##### `value`

> Type: `Integer` · default: `0`
>
> Integer value

##### TraceValueBoolean

A boolean trace value.

##### `value`

> Type: `Boolean` · default: `false`
>
> Boolean value

##### TraceValueFloat

A floating-point trace value.

##### `value`

> Type: `Float` · default: `0`
>
> Float value

##### TraceValueUTCDateTime

A UTC date-time trace value.

##### `value`

> Type: `UTCDateTime` · required
>
> UTC date and time value

##### TraceValueDuration

A duration trace value in seconds.

##### `value`

> Type: `UnsignedInt` · default: `0`
>
> Duration value in seconds

##### TraceValueIpAddr

An IP address trace value.

##### `value`

> Type: `IpAddr` · required
>
> IP address value

##### TraceValueList

A list of trace values.

##### `value`

> Type: `List<`[`TraceValue`](#tracevalue)`>`
>
> Value list

##### TraceValueEvent

A nested event trace value.

##### `event`

> Type: [`EventType`](https://stalw.art/docs/ref/events) · required
>
> Event type

##### `value`

> Type: `List<`[`TraceKeyValue`](#tracekeyvalue)`>`
>
> List of key-value pairs associated with the trace entry
