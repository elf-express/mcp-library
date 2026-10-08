---
title: "Imap"
source: https://stalw.art/docs/ref/object/imap/
description: "Configures IMAP protocol settings including authentication, timeouts, and rate limits."
---

# Objects - Imap

> Section: Schema reference › Objects

Configures IMAP protocol settings including authentication, timeouts, and rate limits.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Network › IMAP

## Fields

##### `allowPlainTextAuth`

> Type: `Boolean` · default: `false`
>
> Whether to allow plain text authentication on unencrypted connections

##### `maxAuthFailures`

> Type: `UnsignedInt` · default: `3` · min: 1
>
> Number of authentication attempts a user can make before being disconnected by the server

##### `maxConcurrent`

> Type: `UnsignedInt?` · default: `16` · min: 1
>
> The maximum number of concurrent connections

##### `maxRequestRate`

> Type: [`Rate`](#rate)`?` · default: `{"count":2000,"period":60000}`
>
> The maximum number of requests per minute

##### `maxRequestSize`

> Type: `Size` · default: `52428800`
>
> Maximum size of an IMAP request that the server will accept

##### `timeoutAnonymous`

> Type: `Duration` · default: `60000`
>
> Time an unauthenticated session can stay inactive before being ended by the server

##### `timeoutAuthenticated`

> Type: `Duration` · default: `1800000`
>
> Time an authenticated session can remain idle before the server terminates it

##### `timeoutIdle`

> Type: `Duration` · default: `1800000`
>
> Time a connection can stay idle in the IMAP IDLE state before the server breaks the connection

##### `maxMessagesPerCommand`

> Type: `UnsignedInt` · default: `1000000` · min: 1000
>
> Maximum number of messages processed by a single FETCH, SEARCH, STORE, MOVE or UID EXPUNGE command, announced to clients through the MESSAGELIMIT capability. Lowering this truncates results for clients that do not implement RFC 9738

##### `minUidBatchSize`

> Type: `UnsignedInt` · default: `500` · min: 1 · max: 500
>
> Smallest batch size a client may ask for in a UIDBATCHES command; smaller requests are rejected with a TOOFEW response code. Cannot exceed 500, which is the batch size every server is required to support

##### `maxUidBatches`

> Type: `UnsignedInt` · default: `10000` · min: 1
>
> Maximum number of UID ranges returned by a single UIDBATCHES command; wider requests are rejected with a TOOMANY response code

##### `maxMessagesPerSave`

> Type: `UnsignedInt` · default: `1000000` · min: 1000
>
> Maximum number of messages accepted by a single COPY or APPEND command, announced to clients through the SAVELIMIT capability. These commands are atomic, so exceeding the limit stores nothing; keep it at or above the MESSAGELIMIT value

## JMAP API

The Imap singleton is available via the `urn:stalwart:jmap` capability.

### `x:Imap/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysImapGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Imap/get",
          {
            "ids": [
              "singleton"
            ]
          },
          "c1"
        ]
      ],
      "using": [
        "urn:ietf:params:jmap:core",
        "urn:stalwart:jmap"
      ]
    }'
```

### `x:Imap/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysImapUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Imap/set",
          {
            "update": {
              "singleton": {
                "allowPlainTextAuth": false
              }
            }
          },
          "c1"
        ]
      ],
      "using": [
        "urn:ietf:params:jmap:core",
        "urn:stalwart:jmap"
      ]
    }'
```

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get Imap
```

### Update

```sh
stalwart-cli update Imap --field allowPlainTextAuth=false
```

## Nested types

### Rate

Defines a rate limit as a count over a time period.

##### `count`

> Type: `UnsignedInt` · default: `0` · min: 1 · max: 1000000
>
> Count

##### `period`

> Type: `Duration` · default: `0` · min: 1
>
> Period
