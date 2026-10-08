---
title: "Metrics"
source: https://stalw.art/docs/ref/object/metrics/
description: "Configures metrics collection and export via OpenTelemetry and Prometheus."
---

# Objects - Metrics

> Section: Schema reference › Objects

Configures metrics collection and export via OpenTelemetry and Prometheus.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Telemetry › Metrics › General Settings › Telemetry › Metrics › OpenTelemetry Settings › Telemetry › Metrics › Prometheus

## Fields

##### `openTelemetry`

> Type: [`MetricsOtel`](#metricsotel) · required
>
> OpenTelemetry metrics configuration

##### `prometheus`

> Type: [`MetricsPrometheus`](#metricsprometheus) · required
>
> Prometheus metrics endpoint configuration

##### `metrics`

> Type: `Set<`[`MetricType`](https://stalw.art/docs/ref/metrics)`>`
>
> List of metrics to include or exclude based on filter mode

##### `metricsPolicy`

> Type: [`EventPolicy`](#eventpolicy) · default: `"exclude"`
>
> How to interpret the metrics list

## JMAP API

The Metrics singleton is available via the `urn:stalwart:jmap` capability.

### `x:Metrics/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysMetricsGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Metrics/get",
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

### `x:Metrics/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysMetricsUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Metrics/set",
          {
            "update": {
              "singleton": {
                "openTelemetry": {
                  "@type": "Disabled"
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
stalwart-cli get Metrics
```

### Update

```sh
stalwart-cli update Metrics --field openTelemetry='{"@type":"Disabled"}'
```

## Nested types

### MetricsOtel

OpenTelemetry metrics configuration.

- **`Disabled`**: Disabled. No additional fields.
- **`Http`**: HTTP. Carries the fields of [`MetricsOtelHttp`](#metricsotelhttp).
- **`Grpc`**: gRPC. Carries the fields of [`MetricsOtelGrpc`](#metricsotelgrpc).

#### MetricsOtelHttp

OpenTelemetry HTTP metrics exporter.

##### `endpoint`

> Type: `Uri` · required
>
> The endpoint for Open Telemetry

##### `interval`

> Type: `Duration` · default: `60000`
>
> The minimum amount of time that must pass between each push request to the OpenTelemetry endpoint

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

##### HttpAuth

Defines the HTTP authentication method to use for HTTP requests.

- **`Unauthenticated`**: Anonymous. No additional fields.
- **`Basic`**: Basic Authentication. Carries the fields of [`HttpAuthBasic`](#httpauthbasic).
- **`Bearer`**: Bearer Token. Carries the fields of [`HttpAuthBearer`](#httpauthbearer).

##### HttpAuthBasic

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

##### HttpAuthBearer

HTTP Bearer token authentication.

##### `bearerToken`

> Type: [`SecretKey`](#secretkey) · required
>
> Bearer token for HTTP Bearer Authentication

#### MetricsOtelGrpc

OpenTelemetry gRPC metrics exporter.

##### `endpoint`

> Type: `Uri?`
>
> The endpoint for Open Telemetry

##### `interval`

> Type: `Duration` · default: `60000`
>
> The minimum amount of time that must pass between each push request to the OpenTelemetry endpoint

##### `timeout`

> Type: `Duration` · default: `10000`
>
> Maximum amount of time that Stalwart will wait for a response from the OpenTelemetry endpoint

### MetricsPrometheus

Prometheus metrics endpoint configuration.

- **`Disabled`**: Disabled. No additional fields.
- **`Enabled`**: Enabled. Carries the fields of [`MetricsPrometheusProperties`](#metricsprometheusproperties).

#### MetricsPrometheusProperties

Prometheus metrics endpoint authentication.

##### `authSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> The Prometheus endpoint's secret for Basic authentication

##### `authUsername`

> Type: `String?`
>
> The Prometheus endpoint's username for Basic authentication

##### SecretKeyOptional

An optional secret value, or none.

- **`None`**: No secret. No additional fields.
- **`Value`**: Secret value. Carries the fields of [`SecretKeyValue`](#secretkeyvalue).
- **`EnvironmentVariable`**: Secret read from environment variable. Carries the fields of [`SecretKeyEnvironmentVariable`](#secretkeyenvironmentvariable).
- **`File`**: Secret read from file. Carries the fields of [`SecretKeyFile`](#secretkeyfile).

## Enums

### EventPolicy

| Value | Label |
|---|---|
| `include` | Only include the specified events |
| `exclude` | Exclude the specified events |
