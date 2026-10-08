---
title: "Webhooks"
source: https://stalw.art/docs/telemetry/webhooks/
---

# Webhooks

> Section: Telemetry

Webhooks deliver real-time notifications about server events by posting to an HTTP endpoint of the operator's choice. They let external systems react to activity in the server without polling; typical uses include recording deliveries into an analytics pipeline, flagging authentication anomalies to a SIEM, or triggering automated workflows on message ingestion.

## Configuration

Each webhook is represented by a [WebHook](https://stalw.art/docs/ref/object/web-hook) object (found in the WebUI under <!-- breadcrumb:WebHook --> Settings › Telemetry › Webhooks<!-- /breadcrumb:WebHook -->). Relevant fields are:

- [`url`](https://stalw.art/docs/ref/object/web-hook#url): endpoint to which `POST` requests are sent.
- [`events`](https://stalw.art/docs/ref/object/web-hook#events) and [`eventsPolicy`](https://stalw.art/docs/ref/object/web-hook#eventspolicy): set of events and how to interpret it. Each selected event is a key mapped to `true`. With `eventsPolicy` set to `include`, only the selected events trigger the webhook; with `exclude`, all events except the selected ones trigger it. Event identifiers are documented on the [Events](https://stalw.art/docs/telemetry/events#event-types) page.
- [`timeout`](https://stalw.art/docs/ref/object/web-hook#timeout): maximum time to wait for a response, in milliseconds. Default `30000` (30 seconds).
- [`throttle`](https://stalw.art/docs/ref/object/web-hook#throttle): minimum interval between batches, in milliseconds. Events that fall within the same window are grouped. Default `1000` (one second).
- [`discardAfter`](https://stalw.art/docs/ref/object/web-hook#discardafter): time in milliseconds after which an undelivered webhook request is discarded. Default `300000` (five minutes).
- [`signatureKey`](https://stalw.art/docs/ref/object/web-hook#signaturekey): optional HMAC key used to sign each request body. The signature is base64-encoded and carried in the `X-Signature` header. The field is a `SecretKeyOptional` with variants `None`, `Value`, `EnvironmentVariable`, and `File`.
- [`httpAuth`](https://stalw.art/docs/ref/object/web-hook#httpauth): HTTP authentication used by the request. A nested type with variants `Unauthenticated`, `Basic`, and `Bearer`.
- [`httpHeaders`](https://stalw.art/docs/ref/object/web-hook#httpheaders): additional HTTP headers to include on each request.
- [`allowInvalidCerts`](https://stalw.art/docs/ref/object/web-hook#allowinvalidcerts): whether to permit requests to endpoints with an invalid TLS certificate. Default `false`.
- [`lossy`](https://stalw.art/docs/ref/object/web-hook#lossy): whether to drop events when the endpoint is unreachable or persistently failing. When `false`, events accumulate until delivery succeeds or [`discardAfter`](https://stalw.art/docs/ref/object/web-hook#discardafter) elapses.
- [`enable`](https://stalw.art/docs/ref/object/web-hook#enable): whether the webhook is active.
- [`level`](https://stalw.art/docs/ref/object/web-hook#level): minimum severity of events delivered to this endpoint.

## API documentation

### Response object

The main object in the webhook response is `WebhookEvents`, which contains a list of `WebhookEvent` objects:

```json
{
    "events": [
        {
            "id": "12345",
            "createdAt": "2023-06-21T14:55:00Z",
            "type": "auth.success",
            "data": {}
        }
    ]
}
```

Each `WebhookEvent` contains the following fields:

- `id` (String): Unique identifier for the event.
- `createdAt` (RFC3339 timestamp): Timestamp when the event was created.
- `type` (WebhookType): Type of the [event](https://stalw.art/docs/telemetry/events#event-types).
- `data` (WebhookPayload): Detailed data associated with the event.

### Data payload

The `data` payload is a nested object that contains additional information about the event. The structure of the `data` object varies depending on the event type and it may contain any of the supported [keys](https://stalw.art/docs/telemetry/events#key-types).

## Example

The equivalent of a webhook firing on `auth.success` and `store.ingest`, signed with a shared secret, with a custom header and Basic authentication:

```json
{
  "url": "https://example.com/webhook",
  "events": {"auth.success": true, "store.ingest": true},
  "eventsPolicy": "include",
  "timeout": 30000,
  "throttle": 1000,
  "signatureKey": {"@type": "Value", "secret": "my-secret-key"},
  "httpHeaders": {"X-My-Header": "my-value"},
  "httpAuth": {
    "@type": "Basic",
    "username": "account",
    "secret": {"@type": "Value", "secret": "password"}
  },
  "allowInvalidCerts": false,
  "enable": true
}
```

Each key in [`events`](https://stalw.art/docs/ref/object/web-hook#events) selects a single event from the EventType enum; wildcard patterns are not supported, so every event to be delivered must be listed explicitly.
