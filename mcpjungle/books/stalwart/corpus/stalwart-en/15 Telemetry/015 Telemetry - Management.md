---
title: "Management"
source: https://stalw.art/docs/telemetry/management/
---

# Telemetry - Management

> Section: Telemetry

Traces, metrics, and log entries are runtime telemetry records produced by the server and retained according to the configured telemetry history. The existing [Live telemetry](https://stalw.art/docs/telemetry/live) page covers real-time streaming, and the [History](https://stalw.art/docs/telemetry/history) page covers the backends and retention windows that persist this data. Once persisted, the records themselves are accessible as management objects through the [WebUI](https://stalw.art/docs/management/webui/), the [CLI](https://stalw.art/docs/management/cli/), and the JMAP API.

## Traces

A [Trace](https://stalw.art/docs/ref/object/trace) (found in the WebUI under <!-- breadcrumb:Trace --> Management › Emails › History › Inbound Delivery, Management › Emails › History › Outbound Delivery<!-- /breadcrumb:Trace -->) represents a single message-delivery trace with its associated events: inbound reception, queueing, outbound delivery attempts, and the outcome of each hop. Traces are retrievable by id, filterable by account, remote host, domain, and time range, and are primarily surfaced through the `History` view of the WebUI. Retention is governed by [`holdTracesFor`](https://stalw.art/docs/ref/object/data-retention#holdtracesfor) on the [DataRetention](https://stalw.art/docs/ref/object/data-retention) object.

:::tip[Enterprise feature]

This object is available exclusively in the [Enterprise Edition](https://stalw.art/docs/server/enterprise) of Stalwart and is not included in the Community Edition.

:::

## Metrics

A [Metric](https://stalw.art/docs/ref/object/metric) is a single sampled data point of a server metric (counter, gauge, or histogram variants). Samples are collected on the schedule defined by [`metricsCollectionInterval`](https://stalw.art/docs/ref/object/data-retention#metricscollectioninterval) and retained for the duration given by [`holdMetricsFor`](https://stalw.art/docs/ref/object/data-retention#holdmetricsfor). Queries support filtering by metric name and time range and drive the Dashboard charts in the WebUI.

Individual samples are consumed by the Dashboard in the WebUI and do not have a dedicated inspection surface; administrators who need raw samples can fetch them through the [CLI](https://stalw.art/docs/management/cli/) or the JMAP API.

:::tip[Enterprise feature]

This object is available exclusively in the [Enterprise Edition](https://stalw.art/docs/server/enterprise) of Stalwart and is not included in the Community Edition.

:::

## Logs

A [Log](https://stalw.art/docs/ref/object/log) (found in the WebUI under <!-- breadcrumb:Log --> Management › Observability › Logs<!-- /breadcrumb:Log -->) is a server log entry captured by the tracing subsystem and persisted to the history store. Unlike traces and metrics, log access is available in the Community Edition. Entries carry a timestamp, level, and the structured keys documented on the [Events](https://stalw.art/docs/telemetry/events) page, and can be queried through the same management surfaces.
