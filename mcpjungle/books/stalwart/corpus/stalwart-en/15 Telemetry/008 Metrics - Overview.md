---
title: "Overview"
source: https://stalw.art/docs/telemetry/metrics/
---

# Metrics - Overview

> Section: Telemetry › Metrics

Metrics are quantitative measurements of the server's operation, resource use, and workload. They let administrators see how the server behaves over time, spot trends, and react to anomalies. Metric collection in Stalwart is controlled by the [Metrics](https://stalw.art/docs/ref/object/metrics) singleton (found in the WebUI under <!-- breadcrumb:Metrics --> Settings › Telemetry › Metrics › General, Settings › Telemetry › Metrics › OpenTelemetry, Settings › Telemetry › Metrics › Prometheus<!-- /breadcrumb:Metrics -->).

## Push and pull exporters

Two export models are supported:

- Push: the server actively sends metric samples to a collection system at regular intervals. Push is simple to configure, and metrics arrive at the collector as they are produced.
- Pull: the collection system queries an HTTP endpoint on the server at a cadence it controls. Pull lets the collector manage the scraping load and is the model used by tools such as Prometheus.

## Supported backends

Stalwart supports both models through a single configuration surface:

- [OpenTelemetry](https://stalw.art/docs/telemetry/metrics/opentelemetry) is used for push. It is configured through [`openTelemetry`](https://stalw.art/docs/ref/object/metrics#opentelemetry) on the `Metrics` singleton, which is a nested type with variants `Disabled`, `Http`, and `Grpc`.
- [Prometheus](https://stalw.art/docs/telemetry/metrics/prometheus) is used for pull. It is configured through [`prometheus`](https://stalw.art/docs/ref/object/metrics#prometheus) on the `Metrics` singleton, which is a nested type with variants `Disabled` and `Enabled`.

Both exporters can be configured at the same time when two independent collectors need the same signal.

## Selecting metrics

The set of metrics exported is controlled by [`metrics`](https://stalw.art/docs/ref/object/metrics) and [`metricsPolicy`](https://stalw.art/docs/ref/object/metrics#metricspolicy) on the `Metrics` singleton. [`metrics`](https://stalw.art/docs/ref/object/metrics) is a set in which each selected metric is a key mapped to `true`. With [`metricsPolicy`](https://stalw.art/docs/ref/object/metrics#metricspolicy) set to `exclude` (the default), the selected metrics are suppressed and everything else is emitted; with `include`, only the selected metrics are emitted.

For example, to suppress the noise of `auth.error` and `smtp.error` while leaving every other metric enabled:

```json
{
  "metrics": {"auth.error": true, "smtp.error": true},
  "metricsPolicy": "exclude"
}
```
