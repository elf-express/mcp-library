---
title: "Rate limiting"
source: https://stalw.art/docs/email/settings/ratelimit/
---

# Settings - Rate limiting

> Section: Email settings › Settings

Rate limiting is a strategy to limit network traffic by capping how often a given action (for example, a login attempt) can be repeated within a time window. Rate limiting helps mitigate abuse such as brute-force attacks and reduces load on the mail server.

## IMAP/POP3

IMAP and POP3 rate-limit fields live on the [Imap](https://stalw.art/docs/ref/object/imap) singleton (found in the WebUI under <!-- breadcrumb:Imap --> Settings › Network › IMAP<!-- /breadcrumb:Imap -->).

### Concurrency

The maximum number of concurrent IMAP and POP3 connections a user may hold is set by [`maxConcurrent`](https://stalw.art/docs/ref/object/imap#maxconcurrent). The default is `16`; lowering it, for example to four connections per user:

```json
{
  "maxConcurrent": 4
}
```

### Requests

The per-minute request cap is set by [`maxRequestRate`](https://stalw.art/docs/ref/object/imap#maxrequestrate), which takes a `Rate` value of `count` and `period`, where `period` is a duration in milliseconds. The default is 2000 requests per minute.

For example, to allow 2000 requests per minute:

```json
{
  "maxRequestRate": {"count": 2000, "period": 60000}
}
```

## JMAP

Refer to the [JMAP Protocol limits](https://stalw.art/docs/http/jmap/protocol) page for details on how JMAP request limits and concurrency are configured on the [Jmap](https://stalw.art/docs/ref/object/jmap) singleton.
