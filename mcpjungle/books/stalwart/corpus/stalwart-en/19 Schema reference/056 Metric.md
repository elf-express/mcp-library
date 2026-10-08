---
title: "Metric"
source: https://stalw.art/docs/ref/object/metric/
description: "Stores a collected server metric data point."
---

# Metric

> Section: Schema reference › Objects

Stores a collected server metric data point.

## Fields

Metric is a **multi-variant** object: each instance has an `@type` discriminator selecting one of the variants below, and each variant carries its own set of fields.

### `@type: "Counter"`

Counter metric

##### `count`

> Type: `UnsignedInt` · default: `0`
>
> Count associated with the metric

##### `metric`

> Type: [`MetricType`](https://stalw.art/docs/ref/metrics) · required
>
> Metric event type

##### `timestamp`

> Type: `UTCDateTime` · required
>
> Timestamp of the metric entry

### `@type: "Gauge"`

Gauge metric

##### `count`

> Type: `UnsignedInt` · default: `0`
>
> Count associated with the metric

##### `metric`

> Type: [`MetricType`](https://stalw.art/docs/ref/metrics) · required
>
> Metric event type

##### `timestamp`

> Type: `UTCDateTime` · required
>
> Timestamp of the metric entry

### `@type: "Histogram"`

Histogram metric

##### `count`

> Type: `UnsignedInt` · default: `0`
>
> Value associated with the metric

##### `sum`

> Type: `UnsignedInt` · default: `0`
>
> Sum associated with the metric

##### `metric`

> Type: [`MetricType`](https://stalw.art/docs/ref/metrics) · required
>
> Metric event type

##### `timestamp`

> Type: `UTCDateTime` · required
>
> Timestamp of the metric entry

## JMAP API

The Metric object is available via the `urn:stalwart:jmap` capability.

### `x:Metric/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysMetricGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Metric/get",
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

### `x:Metric/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysMetricCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Metric/set",
          {
            "create": {
              "new1": {
                "@type": "Counter"
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

This operation requires the `sysMetricUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Metric/set",
          {
            "update": {
              "id1": {
                "count": 0
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

This operation requires the `sysMetricDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Metric/set",
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

### `x:Metric/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysMetricQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Metric/query",
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
stalwart-cli get Metric id1
```

### Create

```sh
stalwart-cli create Metric/Counter
```

### Query

```sh
stalwart-cli query Metric
```

### Update

```sh
stalwart-cli update Metric id1 --field count=0
```

### Delete

```sh
stalwart-cli delete Metric --ids id1
```
