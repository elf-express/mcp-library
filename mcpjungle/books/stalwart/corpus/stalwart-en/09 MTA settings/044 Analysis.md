---
title: "Analysis"
source: https://stalw.art/docs/mta/reports/analysis/
---

# Analysis

> Section: MTA settings › Reports

Stalwart automatically analyses incoming DMARC, DKIM, SPF, and TLS reports sent by other domains, removing the need for manual intervention and saving time for administrators. If TLS or message-authentication issues are detected, an event is recorded in the log file or sent to [OpenTelemetry](https://stalw.art/docs/telemetry/tracing/opentelemetry). Turning reports into actionable events allows administrators to detect and respond to configuration errors and abuse (such as spam or phishing), helping maintain the integrity of the email system.

## Settings

Inbound analysis is configured on the [ReportSettings](https://stalw.art/docs/ref/object/report-settings) singleton (found in the WebUI under <!-- breadcrumb:ReportSettings --> Settings › MTA › Reports › General<!-- /breadcrumb:ReportSettings -->):

- [`inboundReportAddresses`](https://stalw.art/docs/ref/object/report-settings#inboundreportaddresses): set of addresses (with optional wildcards) from which reports are intercepted and analysed. These addresses must be routable. Default `{"postmaster@*": true}`.
- [`inboundReportForwarding`](https://stalw.art/docs/ref/object/report-settings#inboundreportforwarding): whether reports are forwarded to their final recipient after analysis. Default `true`.

Example intercepting `dmarc@*` and `abuse@*` while still forwarding the report to the original recipient:

```json
{
  "inboundReportAddresses": {"dmarc@*": true, "abuse@*": true},
  "inboundReportForwarding": true
}
```

:::note
Values on this page follow the [object encoding](https://stalw.art/docs/configuration/object-encoding) rules: list and set fields are JSON objects rather than arrays, and durations and sizes are integers.
:::

## Retention

How long intercepted reports are kept is controlled globally by the [DataRetention](https://stalw.art/docs/ref/object/data-retention) singleton (found in the WebUI under <!-- breadcrumb:DataRetention --> Settings › Storage › Data Retention › Archiving, Settings › Storage › Data Retention › Data Cleanup, Settings › Storage › Data Retention › Auto-Expunge, Settings › Storage › Data Retention › Telemetry<!-- /breadcrumb:DataRetention -->) through the [`holdMtaReportsFor`](https://stalw.art/docs/ref/object/data-retention#holdmtareportsfor) field, which accepts a duration in milliseconds or `null` to disable storage. The default is 30 days (`2592000000`).
