---
title: "History"
source: https://stalw.art/docs/telemetry/history/
---

# History

> Section: Telemetry

Telemetry history retains selected event spans (for example, incoming messages and completed deliveries) and periodic metric samples in a dedicated database, so that past activity can be reviewed after the fact. Unlike [live telemetry](https://stalw.art/docs/telemetry/live), which streams data to connected clients in real time, history persists the signal to storage for later query.

Stored spans and metrics can be retrieved through the JMAP API, which exposes filtering on time range, event type, and other criteria. The same data drives the `Dashboard` and `History` views in the [WebUI](https://stalw.art/docs/management/webui/).

:::tip[Enterprise feature]

This feature is available exclusively in the [Enterprise Edition](https://stalw.art/docs/server/enterprise) of Stalwart and is not included in the Community Edition.

:::

## Tracing history

Tracing history is controlled through the [TracingStore](https://stalw.art/docs/ref/object/tracing-store) singleton (found in the WebUI under <!-- breadcrumb:TracingStore --> Settings › Storage › Tracing Store<!-- /breadcrumb:TracingStore -->). The object is multi-variant: the chosen variant selects the backend used to store spans. Selecting `Disabled` turns tracing history off; selecting `Default` reuses the main [data store](https://stalw.art/docs/storage/data); other variants (such as `FoundationDb` or `PostgreSql`) point history at a dedicated backend.

Retention is controlled by [`holdTracesFor`](https://stalw.art/docs/ref/object/data-retention#holdtracesfor) on the [DataRetention](https://stalw.art/docs/ref/object/data-retention) object (found in the WebUI under <!-- breadcrumb:DataRetention --> Settings › Storage › Data Retention › Archiving, Settings › Storage › Data Retention › Data Cleanup, Settings › Storage › Data Retention › Auto-Expunge, Settings › Storage › Data Retention › Telemetry<!-- /breadcrumb:DataRetention -->). The value is a duration, for example `"7d"`, `"12h"`, or `"30m"`. The default is `"30d"`.

For example, to retain delivery traces in the main data store for thirty days, set the `TracingStore` singleton to `{"@type": "Default"}` and leave [`holdTracesFor`](https://stalw.art/docs/ref/object/data-retention#holdtracesfor) at its default.

## Metrics history

Metrics history is controlled through the [MetricsStore](https://stalw.art/docs/ref/object/metrics-store) singleton (found in the WebUI under <!-- breadcrumb:MetricsStore --> Settings › Storage › Metrics Store<!-- /breadcrumb:MetricsStore -->). The object is multi-variant in the same way as `TracingStore`: `Disabled` turns metrics history off, `Default` reuses the main data store, and the backend-specific variants point history at a dedicated store.

Retention and sampling frequency are set on the [DataRetention](https://stalw.art/docs/ref/object/data-retention) object:

- [`holdMetricsFor`](https://stalw.art/docs/ref/object/data-retention#holdmetricsfor): duration for which metrics are retained. Default `"90d"`.
- [`metricsCollectionInterval`](https://stalw.art/docs/ref/object/data-retention#metricscollectioninterval): how often metrics are sampled. Specified as a cron expression. The default samples once per hour at minute zero.
