---
title: "Overview"
source: https://stalw.art/docs/mta/reports/
---

# Reports - Overview

> Section: MTA settings › Reports

Stalwart MTA supports both the generation and analysis of a variety of email-related reports, aiding message-delivery transparency, authentication monitoring, and transport-security compliance. These reports provide insight into the health and trustworthiness of the mail infrastructure and can be used both operationally and for long-term policy evaluation.

Stalwart can generate and send the following types of standardised reports:

- [Delivery Status Notifications (DSNs)](https://stalw.art/docs/mta/reports/dsn): inform senders about delivery issues such as delays, soft failures, or permanent bounces. DSNs are sent automatically based on delivery outcomes and configuration.
- [DMARC aggregate reports](https://stalw.art/docs/mta/reports/dmarc#aggregate-reports): summarise authentication results (SPF, DKIM) for messages claiming to come from a domain, typically on a daily cadence.
- [DMARC failure reports](https://stalw.art/docs/mta/reports/dmarc#failure-reports): sent when a message claiming to be from a domain fails DMARC alignment. Useful to identify spoofing or unauthorised senders.
- [TLS aggregate reports](https://stalw.art/docs/mta/reports/tls): summarise the success or failure of STARTTLS connections with other mail servers. Useful for detecting transport-security misconfigurations.
- [DKIM failure reports](https://stalw.art/docs/mta/reports/dkim): triggered when a message fails DKIM validation. Useful for diagnosing signing or policy issues.
- [SPF failure reports](https://stalw.art/docs/mta/reports/spf): sent when a message fails SPF checks. Useful to identify unauthorised senders or misconfigured SPF records.

In addition to sending reports, Stalwart can [receive and automatically analyse](https://stalw.art/docs/mta/reports/analysis) a wide range of incoming email-security reports: DMARC aggregate reports, SMTP TLS aggregate reports, authentication-failure reports (DKIM, SPF, and DMARC failures), and ARF reports (Abuse Reporting Format, used for spam complaints and security incidents). Received reports are parsed and stored for visualisation within the [WebUI](https://stalw.art/docs/management/webui/), allowing review of authentication trends, anomaly detection, and tracking of policy-enforcement results over time.

If anomalies are detected, such as unusually high failure rates or authentication misalignments, Stalwart generates warnings forwarded to the configured [logging or tracing](https://stalw.art/docs/telemetry/) mechanism. Warnings can also trigger [webhooks](https://stalw.art/docs/telemetry/webhooks) for integration with external monitoring systems or automated response workflows.

## Configuration

Shared report settings are configured on the [ReportSettings](https://stalw.art/docs/ref/object/report-settings) singleton (found in the WebUI under <!-- breadcrumb:ReportSettings --> Settings › MTA › Reports › General<!-- /breadcrumb:ReportSettings -->).

### Report domain

The [`outboundReportDomain`](https://stalw.art/docs/ref/object/report-settings#outboundreportdomain) field specifies the default domain used as the organisational identity in outgoing reports. This domain appears in the sender address and in fields such as `Reporting-MTA` in DSNs, `reporting-org` in DMARC aggregate reports, and the domain portion of the `report-id` used for message correlation. If left empty, the default domain is used.

```json
{
  "outboundReportDomain": "example.org"
}
```

### Submitter address

The [`outboundReportSubmitter`](https://stalw.art/docs/ref/object/report-settings#outboundreportsubmitter) field defines the hostname or identifier used in the `Submitter` field of certain report types, such as DMARC aggregate reports. This helps distinguish between MTA instances in multi-node or distributed environments. If left unset, the default expression resolves to the system hostname.

```json
{
  "outboundReportSubmitter": {"else": "'mx.example.org'"}
}
```
