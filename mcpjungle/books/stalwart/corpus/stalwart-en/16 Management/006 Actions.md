---
title: "Actions"
source: https://stalw.art/docs/management/tasks-actions/actions/
---

# Actions

> Section: Management › Tasks & Actions

An Action is a server management operation triggered on demand. Unlike a scheduled [Task](https://stalw.art/docs/management/tasks-actions/tasks), an Action runs immediately in response to an administrator request: reloading configuration, flushing caches, pausing the outbound queue, running a troubleshooting probe, or classifying a message through the spam filter. Each invocation is represented as an [Action](https://stalw.art/docs/ref/object/action) object (found in the WebUI under <!-- breadcrumb:Action --> Management › Actions<!-- /breadcrumb:Action -->) of one of the variants described below.

Actions can be created from the [WebUI](https://stalw.art/docs/management/webui/), through the [CLI](https://stalw.art/docs/management/cli/) using `stalwart-cli create action/<variant-name>`, or over the JMAP API through the `x:Action/set` method on the [Action](https://stalw.art/docs/ref/object/action) object. The server records each Action so that results, such as the spam classification score or a DMARC troubleshooting report, can be retrieved afterwards with `x:Action/get` or `stalwart-cli get action <id>`.

## Variants

Variants that require input fields, such as a message body or a remote IP, carry those fields alongside the variant identifier; the full schema for each is on the reference page.

### Reload settings

The `ReloadSettings` variant rereads the server settings from the data store without restarting the process. No input fields are required.

### Reload TLS certificates

The `ReloadTlsCertificates` variant reloads TLS certificates from disk or from the configured ACME store so that renewals take effect without a restart. No input fields are required.

### Reload lookup stores

The `ReloadLookupStores` variant refreshes the lookup stores backing access lists, blocklists, and similar in-memory datasets. No input fields are required.

### Reload blocked IPs

The `ReloadBlockedIps` variant reloads the blocked IP list applied by the inbound filters. No input fields are required.

### Update applications

The `UpdateApps` variant installs pending updates for the hosted web [Applications](https://stalw.art/docs/ref/object/application), such as the WebUI bundle. No input fields are required. Spam-filter rule updates are handled separately through the asynchronous `SpamFilterMaintenance` variant of [Task](https://stalw.art/docs/ref/object/task).

### Troubleshoot DMARC

The `TroubleshootDmarc` variant runs the same SPF, DKIM, ARC, and DMARC checks that the server applies to an incoming message. The caller supplies the [`remoteIp`](https://stalw.art/docs/ref/object/action#remoteip), the [`ehloDomain`](https://stalw.art/docs/ref/object/action#ehlodomain), the [`mailFrom`](https://stalw.art/docs/ref/object/action#mailfrom) address, the [`spfEhloDomain`](https://stalw.art/docs/ref/object/action#spfehlodomain) and [`spfMailFromDomain`](https://stalw.art/docs/ref/object/action#spfmailfromdomain) used for the SPF checks, and an optional [`message`](https://stalw.art/docs/ref/object/action#message) body. The server populates the per-check results (SPF, reverse DNS, DKIM, ARC, DMARC), the overall DKIM and DMARC pass flags, the applied [`dmarcPolicy`](https://stalw.art/docs/ref/object/action#dmarcpolicy), and the [`elapsed`](https://stalw.art/docs/ref/object/action#elapsed) time.

### Classify spam

The `ClassifySpam` variant submits a raw message to the spam filter and returns the resulting score, tags, and overall classification. The caller supplies the raw [`message`](https://stalw.art/docs/ref/object/action#message) together with the envelope context: [`remoteIp`](https://stalw.art/docs/ref/object/action#remoteip), [`ehloDomain`](https://stalw.art/docs/ref/object/action#ehlodomain), optional [`authenticatedAs`](https://stalw.art/docs/ref/object/action#authenticatedas) identity, [`isTls`](https://stalw.art/docs/ref/object/action#istls) flag, [`envFrom`](https://stalw.art/docs/ref/object/action#envfrom) address with optional [`envFromParameters`](https://stalw.art/docs/ref/object/action#envfromparameters), and the list of [`envRcptTo`](https://stalw.art/docs/ref/object/action#envrcptto) recipients. The server populates the numeric [`score`](https://stalw.art/docs/ref/object/action#score), the map of contributing [`tags`](https://stalw.art/docs/ref/object/action#tags), and the final [`result`](https://stalw.art/docs/ref/object/action#result): spam, ham, reject, or discard.

### Invalidate caches

The `InvalidateCaches` variant clears all in-memory caches. No input fields are required.

### Invalidate negative caches

The `InvalidateNegativeCaches` variant clears only negative cache entries, such as failed DNS lookups or missing-record results, leaving positive cache entries in place. No input fields are required.

### Pause the outbound queue

The `PauseMtaQueue` variant pauses outbound MTA queue processing. Messages continue to accumulate but delivery attempts stop until resumed. No input fields are required.

### Resume the outbound queue

The `ResumeMtaQueue` variant resumes outbound MTA queue processing after a pause. No input fields are required.

## Permissions

Creating, reading, querying, and destroying Actions are gated by the `sysActionCreate`, `sysActionGet`, `sysActionQuery`, and `sysActionDestroy` permissions respectively. Administrators granted these permissions can invoke any variant; finer-grained restrictions are expressed through the standard permission model.
