---
title: "Rate limiting"
source: https://stalw.art/docs/http/ratelimit/
---

# HTTP settings - Rate limiting

> Section: HTTP settings

Rate limiting restricts how often a client can repeat an action within a given time period. Applied to the HTTP server, it mitigates brute-force attacks and reduces overall load by capping the number of requests that any single source can issue in a short window.

Stalwart tracks the IP address of each incoming HTTP request and measures the number of requests received over the configured window. Once a client exceeds the configured rate, further requests from that source are rejected until the window elapses.

HTTP rate limits are configured on the [Http](https://stalw.art/docs/ref/object/http) singleton (found in the WebUI under <!-- breadcrumb:Http --> Settings › Network › HTTP › General, Settings › Network › HTTP › Security<!-- /breadcrumb:Http -->) through two separate fields, one for anonymous traffic and one for authenticated users. Each field is a `Rate` value: a `count` over a `period`, where the period is a duration in milliseconds.

## Anonymous limits

The [`rateLimitAnonymous`](https://stalw.art/docs/ref/object/http#ratelimitanonymous) field sets the request rate allowed to an anonymous IP address. The default is 100 requests per minute.

```json
{
  "rateLimitAnonymous": {"count": 100, "period": 60000}
}
```

## Authenticated limits

The [`rateLimitAuthenticated`](https://stalw.art/docs/ref/object/http#ratelimitauthenticated) field sets the request rate allowed to an authenticated user. The default is 1000 requests per minute.

```json
{
  "rateLimitAuthenticated": {"count": 1000, "period": 60000}
}
```
