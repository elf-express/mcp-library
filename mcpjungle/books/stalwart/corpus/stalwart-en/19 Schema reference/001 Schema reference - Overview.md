---
title: "Overview"
source: https://stalw.art/docs/ref/
description: "Reference documentation for every management and configuration object exposed by the Stalwart JMAP API."
---

# Schema reference - Overview

> Section: Schema reference

Every management and configuration object Stalwart exposes over JMAP is documented here. Each page covers the object's fields, the JMAP methods it supports (with `curl` examples), the equivalent `stalwart-cli` commands, and where to find the object in the WebUI.

All objects below are available via the `urn:stalwart:jmap` capability. Their JMAP type names are prefixed with `x:` on the wire (for example `x:Domain`); this prefix is omitted in the CLI.

For telemetry data and permission identifiers referenced from this documentation, see the [Events](https://stalw.art/docs/ref/events), [Metrics](https://stalw.art/docs/ref/metrics), and [Permissions](https://stalw.art/docs/ref/permissions) pages.

## Objects

| Object | Kind | Summary |
|---|---|---|
| [Account](https://stalw.art/docs/ref/object/account) | Object | Defines a user or group account for authentication and email access. |
| [AccountPassword](https://stalw.art/docs/ref/object/account-password) | Singleton | Password-based authentication credential. |
| [AccountSettings](https://stalw.art/docs/ref/object/account-settings) | Singleton | Configures default account settings for locale and encryption. |
| [AcmeProvider](https://stalw.art/docs/ref/object/acme-provider) | Object | Defines an ACME provider for automatic TLS certificate management. |
| [Action](https://stalw.art/docs/ref/object/action) | Object | Defines server management actions such as reloads, troubleshooting and cache operations. |
| [AddressBook](https://stalw.art/docs/ref/object/address-book) | Singleton | Configures address book and contact storage settings. |
| [AiModel](https://stalw.art/docs/ref/object/ai-model) | Object <sup>\*</sup> | Defines an AI model endpoint for LLM-based features. |
| [Alert](https://stalw.art/docs/ref/object/alert) | Object <sup>\*</sup> | Defines an alert rule triggered by metric conditions. |
| [AllowedIp](https://stalw.art/docs/ref/object/allowed-ip) | Object | Defines an allowed IP address or network range. |
| [ApiKey](https://stalw.art/docs/ref/object/api-key) | Object | API key credential for programmatic access. |
| [AppPassword](https://stalw.art/docs/ref/object/app-password) | Object | App password credential for programmatic access. |
| [Application](https://stalw.art/docs/ref/object/application) | Object | Defines a web application served by the server. |
| [ArchivedItem](https://stalw.art/docs/ref/object/archived-item) | Object <sup>\*</sup> | Represents an archived item that can be restored. |
| [ArfExternalReport](https://stalw.art/docs/ref/object/arf-external-report) | Object | Stores an ARF feedback report received from an external source. |
| [Asn](https://stalw.art/docs/ref/object/asn) | Singleton | Configures ASN and geolocation data sources for IP address lookups. |
| [Authentication](https://stalw.art/docs/ref/object/authentication) | Singleton | Configures authentication settings including password policies and default roles. |
| [BlobStore](https://stalw.art/docs/ref/object/blob-store) | Singleton | Configures the blob storage backend for messages and files. |
| [BlockedIp](https://stalw.art/docs/ref/object/blocked-ip) | Object | Defines a blocked IP address or network range. |
| [Bootstrap](https://stalw.art/docs/ref/object/bootstrap) | Singleton | Initial setup shown the first time Stalwart starts. |
| [Cache](https://stalw.art/docs/ref/object/cache) | Singleton | Configures in-memory cache sizes for data, DNS records, and authorization tokens. |
| [Calendar](https://stalw.art/docs/ref/object/calendar) | Singleton | Configures calendar settings including iCalendar limits and default names. |
| [CalendarAlarm](https://stalw.art/docs/ref/object/calendar-alarm) | Singleton | Configures calendar alarm email notifications. |
| [CalendarScheduling](https://stalw.art/docs/ref/object/calendar-scheduling) | Singleton | Configures calendar scheduling, iTIP messaging, and HTTP RSVP settings. |
| [Certificate](https://stalw.art/docs/ref/object/certificate) | Object | Defines a TLS certificate and its associated private key. |
| [ClusterNode](https://stalw.art/docs/ref/object/cluster-node) | Object | Represents a node in the cluster |
| [ClusterRole](https://stalw.art/docs/ref/object/cluster-role) | Object | Defines a cluster node role with enabled tasks and listeners. |
| [Coordinator](https://stalw.art/docs/ref/object/coordinator) | Singleton | Configures the cluster coordinator for inter-node communication. |
| [DataRetention](https://stalw.art/docs/ref/object/data-retention) | Singleton | Configures data retention policies, expunge schedules, and archival settings. |
| [DataStore](https://stalw.art/docs/ref/object/data-store) | Singleton | Configures the primary data store backend. |
| [Directory](https://stalw.art/docs/ref/object/directory) | Object | Defines an external directory for account authentication and lookups. |
| [DkimReportSettings](https://stalw.art/docs/ref/object/dkim-report-settings) | Singleton | Configures DKIM authentication failure report generation. |
| [DkimSignature](https://stalw.art/docs/ref/object/dkim-signature) | Object | Defines a DKIM signature used to sign outgoing email messages. |
| [DmarcExternalReport](https://stalw.art/docs/ref/object/dmarc-external-report) | Object | Stores a DMARC aggregate report received from an external source. |
| [DmarcInternalReport](https://stalw.art/docs/ref/object/dmarc-internal-report) | Object | Stores an outbound DMARC aggregate report pending delivery. |
| [DmarcReportSettings](https://stalw.art/docs/ref/object/dmarc-report-settings) | Singleton | Configures DMARC aggregate and failure report generation. |
| [DnsResolver](https://stalw.art/docs/ref/object/dns-resolver) | Singleton | Configures the DNS resolver used for domain lookups. |
| [DnsServer](https://stalw.art/docs/ref/object/dns-server) | Object | Defines a DNS server for automatic record management. |
| [Domain](https://stalw.art/docs/ref/object/domain) | Object | Defines an email domain and its DNS, DKIM, and TLS certificate settings. |
| [DsnReportSettings](https://stalw.art/docs/ref/object/dsn-report-settings) | Singleton | Configures Delivery Status Notification (DSN) report generation. |
| [Email](https://stalw.art/docs/ref/object/email) | Singleton | Configures email message limits, encryption, compression, and default folder settings. |
| [Enterprise](https://stalw.art/docs/ref/object/enterprise) | Singleton | Configures enterprise licensing and branding settings. |
| [EventTracingLevel](https://stalw.art/docs/ref/object/event-tracing-level) | Object | Defines a custom logging level override for a specific event type. |
| [FileStorage](https://stalw.art/docs/ref/object/file-storage) | Singleton | Configures file storage limits. |
| [Http](https://stalw.art/docs/ref/object/http) | Singleton | Configures HTTP server settings including rate limiting, CORS, and security headers. |
| [HttpForm](https://stalw.art/docs/ref/object/http-form) | Singleton | Configures the contact form submission endpoint. |
| [HttpLookup](https://stalw.art/docs/ref/object/http-lookup) | Object | Defines an HTTP-based lookup list. |
| [Imap](https://stalw.art/docs/ref/object/imap) | Singleton | Configures IMAP protocol settings including authentication, timeouts, and rate limits. |
| [InMemoryStore](https://stalw.art/docs/ref/object/in-memory-store) | Singleton | Configures the in-memory cache and lookup store. |
| [Jmap](https://stalw.art/docs/ref/object/jmap) | Singleton | Configures JMAP protocol limits for requests, uploads, and push notifications. |
| [Log](https://stalw.art/docs/ref/object/log) | Object | Represents a server log entry. |
| [MailingList](https://stalw.art/docs/ref/object/mailing-list) | Object | Defines a mailing list that distributes messages to a group of recipients. |
| [MaskedEmail](https://stalw.art/docs/ref/object/masked-email) | Object <sup>\*</sup> | Defines a masked email address for privacy protection. |
| [MemoryLookupKey](https://stalw.art/docs/ref/object/memory-lookup-key) | Object | Defines an in-memory lookup key for fast data access. |
| [MemoryLookupKeyValue](https://stalw.art/docs/ref/object/memory-lookup-key-value) | Object | Defines an in-memory lookup key-value pair. |
| [Metric](https://stalw.art/docs/ref/object/metric) | Object | Stores a collected server metric data point. |
| [Metrics](https://stalw.art/docs/ref/object/metrics) | Singleton | Configures metrics collection and export via OpenTelemetry and Prometheus. |
| [MetricsStore](https://stalw.art/docs/ref/object/metrics-store) | Singleton <sup>\*</sup> | Configures the storage backend for metrics data. |
| [MtaConnectionStrategy](https://stalw.art/docs/ref/object/mta-connection-strategy) | Object | Defines a connection strategy for outbound message delivery. |
| [MtaDeliverySchedule](https://stalw.art/docs/ref/object/mta-delivery-schedule) | Object | Defines retry and notification intervals for message delivery. |
| [MtaExtensions](https://stalw.art/docs/ref/object/mta-extensions) | Singleton | Configures SMTP protocol extensions offered to clients. |
| [MtaHook](https://stalw.art/docs/ref/object/mta-hook) | Object | Defines an MTA hook endpoint for message processing. |
| [MtaInboundSession](https://stalw.art/docs/ref/object/mta-inbound-session) | Singleton | Configures inbound SMTP session timeouts and transfer limits. |
| [MtaInboundThrottle](https://stalw.art/docs/ref/object/mta-inbound-throttle) | Object | Defines an inbound rate limit rule for SMTP connections. |
| [MtaMilter](https://stalw.art/docs/ref/object/mta-milter) | Object | Defines a Milter filter endpoint for message processing. |
| [MtaOutboundStrategy](https://stalw.art/docs/ref/object/mta-outbound-strategy) | Singleton | Configures outbound message delivery routing, scheduling, and TLS strategies. |
| [MtaOutboundThrottle](https://stalw.art/docs/ref/object/mta-outbound-throttle) | Object | Defines an outbound rate limit rule for message delivery. |
| [MtaQueueQuota](https://stalw.art/docs/ref/object/mta-queue-quota) | Object | Defines a quota rule for message queues. |
| [MtaRoute](https://stalw.art/docs/ref/object/mta-route) | Object | Defines a routing rule for outbound message delivery. |
| [MtaStageAuth](https://stalw.art/docs/ref/object/mta-stage-auth) | Singleton | Configures SMTP authentication requirements and error handling. |
| [MtaStageConnect](https://stalw.art/docs/ref/object/mta-stage-connect) | Singleton | Configures SMTP connection greeting and hostname settings. |
| [MtaStageData](https://stalw.art/docs/ref/object/mta-stage-data) | Singleton | Configures message processing rules for the SMTP DATA stage. |
| [MtaStageEhlo](https://stalw.art/docs/ref/object/mta-stage-ehlo) | Singleton | Configures EHLO command requirements and validation. |
| [MtaStageMail](https://stalw.art/docs/ref/object/mta-stage-mail) | Singleton | Configures MAIL FROM stage processing and sender validation. |
| [MtaStageRcpt](https://stalw.art/docs/ref/object/mta-stage-rcpt) | Singleton | Configures RCPT TO stage processing and recipient validation. |
| [MtaSts](https://stalw.art/docs/ref/object/mta-sts) | Singleton | Configures the MTA-STS policy for the server. |
| [MtaTlsStrategy](https://stalw.art/docs/ref/object/mta-tls-strategy) | Object | Defines a TLS security strategy for outbound connections. |
| [MtaVirtualQueue](https://stalw.art/docs/ref/object/mta-virtual-queue) | Object | Defines a virtual queue for organizing outbound message delivery. |
| [NetworkListener](https://stalw.art/docs/ref/object/network-listener) | Object | Defines a network listener for accepting incoming connections. |
| [OAuthClient](https://stalw.art/docs/ref/object/o-auth-client) | Object | Defines a registered OAuth client application. |
| [OidcProvider](https://stalw.art/docs/ref/object/oidc-provider) | Singleton | Configures the OAuth and OpenID Connect provider settings. |
| [PublicKey](https://stalw.art/docs/ref/object/public-key) | Object | Defines a public key for email encryption (OpenPGP or S/MIME). |
| [QueuedMessage](https://stalw.art/docs/ref/object/queued-message) | Object | Represents a queued email message pending delivery. |
| [ReportSettings](https://stalw.art/docs/ref/object/report-settings) | Singleton | Configures inbound report analysis and outbound report settings. |
| [Role](https://stalw.art/docs/ref/object/role) | Object | Defines a named set of permissions that can be assigned to accounts, groups, or tenants. |
| [Search](https://stalw.art/docs/ref/object/search) | Singleton | Configures full-text search indexing for emails, calendars, contacts, and tracing. |
| [SearchStore](https://stalw.art/docs/ref/object/search-store) | Singleton | Configures the full-text search backend. |
| [Security](https://stalw.art/docs/ref/object/security) | Singleton | Configures automatic IP banning rules for abuse, authentication failures, and port scanning. |
| [SenderAuth](https://stalw.art/docs/ref/object/sender-auth) | Singleton | Configures sender authentication verification including DKIM, SPF, DMARC, and ARC. |
| [Sharing](https://stalw.art/docs/ref/object/sharing) | Singleton | Configures sharing settings for calendars, address books, and files. |
| [SieveSystemInterpreter](https://stalw.art/docs/ref/object/sieve-system-interpreter) | Singleton | Configures the system-level Sieve script interpreter settings and limits. |
| [SieveSystemScript](https://stalw.art/docs/ref/object/sieve-system-script) | Object | Defines a system Sieve script executed by the server. |
| [SieveUserInterpreter](https://stalw.art/docs/ref/object/sieve-user-interpreter) | Singleton | Configures the user-level Sieve script interpreter settings and limits. |
| [SieveUserScript](https://stalw.art/docs/ref/object/sieve-user-script) | Object | Defines a global Sieve script available for user imports. |
| [SpamClassifier](https://stalw.art/docs/ref/object/spam-classifier) | Singleton | Configures the spam classifier model, training parameters, and auto-learning settings. |
| [SpamDnsblServer](https://stalw.art/docs/ref/object/spam-dnsbl-server) | Object | Defines a DNSBL server used for spam filtering lookups. |
| [SpamDnsblSettings](https://stalw.art/docs/ref/object/spam-dnsbl-settings) | Singleton | Configures DNSBL query limits for spam filtering. |
| [SpamFileExtension](https://stalw.art/docs/ref/object/spam-file-extension) | Object | Defines a file extension classification rule for spam filtering. |
| [SpamLlm](https://stalw.art/docs/ref/object/spam-llm) | Singleton <sup>\*</sup> | Configures the LLM-based spam classifier. |
| [SpamPyzor](https://stalw.art/docs/ref/object/spam-pyzor) | Singleton | Configures the Pyzor collaborative spam detection service. |
| [SpamRule](https://stalw.art/docs/ref/object/spam-rule) | Object | Defines a spam filter rule for message classification. |
| [SpamSettings](https://stalw.art/docs/ref/object/spam-settings) | Singleton | Configures global spam filter thresholds, greylisting, and trust settings. |
| [SpamTag](https://stalw.art/docs/ref/object/spam-tag) | Object | Defines a score or action assigned to a spam classification tag. |
| [SpamTrainingSample](https://stalw.art/docs/ref/object/spam-training-sample) | Object | Stores an email sample used for spam classifier training. |
| [SpfReportSettings](https://stalw.art/docs/ref/object/spf-report-settings) | Singleton | Configures SPF authentication failure report generation. |
| [StoreLookup](https://stalw.art/docs/ref/object/store-lookup) | Object | Defines an external store used for lookups. |
| [SystemSettings](https://stalw.art/docs/ref/object/system-settings) | Singleton | Configures core server settings including hostname, thread pool, and network services. |
| [Task](https://stalw.art/docs/ref/object/task) | Object | Represents a background task scheduled for execution. |
| [TaskManager](https://stalw.art/docs/ref/object/task-manager) | Singleton | Configures task execution settings including retry strategies. |
| [Tenant](https://stalw.art/docs/ref/object/tenant) | Object <sup>\*</sup> | Defines a tenant for multi-tenant environments with isolated resources and quotas. |
| [TlsExternalReport](https://stalw.art/docs/ref/object/tls-external-report) | Object | Stores a TLS aggregate report received from an external source. |
| [TlsInternalReport](https://stalw.art/docs/ref/object/tls-internal-report) | Object | Stores an outbound TLS aggregate report pending delivery. |
| [TlsReportSettings](https://stalw.art/docs/ref/object/tls-report-settings) | Singleton | Configures TLS aggregate report generation. |
| [Trace](https://stalw.art/docs/ref/object/trace) | Object <sup>\*</sup> | Stores a message delivery trace with associated events. |
| [Tracer](https://stalw.art/docs/ref/object/tracer) | Object | Defines a logging and tracing output method. |
| [TracingStore](https://stalw.art/docs/ref/object/tracing-store) | Singleton <sup>\*</sup> | Configures the storage backend for tracing data. |
| [WebDav](https://stalw.art/docs/ref/object/web-dav) | Singleton | Configures WebDAV protocol settings including property limits and locking. |
| [WebHook](https://stalw.art/docs/ref/object/web-hook) | Object | Defines a webhook endpoint for event notifications. |

<sup>\*</sup> [Enterprise-only](https://stalw.art/docs/server/enterprise).
