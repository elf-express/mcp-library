---
title: "Jmap"
source: https://stalw.art/docs/ref/object/jmap/
description: "Configures JMAP protocol limits for requests, uploads, and push notifications."
---

# Objects - Jmap

> Section: Schema reference › Objects

Configures JMAP protocol limits for requests, uploads, and push notifications.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Network › JMAP › Limits Settings › Network › JMAP › Push Settings › Network › JMAP › WebSocket

## Fields

##### `parseLimitEvent`

> Type: `UnsignedInt` · default: `10` · min: 1
>
> Limits the maximum number of iCalendar items that can be parsed in a single request

##### `parseLimitContact`

> Type: `UnsignedInt` · default: `10` · min: 1
>
> Limits the maximum number of vCard items that can be parsed in a single request

##### `parseLimitEmail`

> Type: `UnsignedInt` · default: `10` · min: 1
>
> Limits the maximum number of e-mail message that can be parsed in a single request

##### `changesMaxResults`

> Type: `UnsignedInt` · default: `5000` · min: 1
>
> Determines the maximum number of change objects that a Changes method can return

##### `getMaxResults`

> Type: `UnsignedInt` · default: `500` · min: 1
>
> Determines the maximum number of objects that can be fetched in a single method call

##### `queryMaxResults`

> Type: `UnsignedInt` · default: `5000` · min: 1
>
> Sets the maximum number of results that a Query method can return

##### `maxMethodCalls`

> Type: `UnsignedInt` · default: `16` · min: 1
>
> Limits the maximum number of method calls that can be included in a single request

##### `maxConcurrentRequests`

> Type: `UnsignedInt?` · default: `4` · min: 1
>
> Restricts the number of concurrent requests a user can make to the JMAP server

##### `maxRequestSize`

> Type: `Size` · default: `10000000` · min: 1
>
> Defines the maximum size of a single request, in bytes, that the server will accept

##### `setMaxObjects`

> Type: `UnsignedInt` · default: `500` · min: 1
>
> Establishes the maximum number of objects that can be modified in a single method call

##### `snippetMaxResults`

> Type: `UnsignedInt` · default: `100` · min: 1
>
> Maximum number of search snippets to return in a single request

##### `maxConcurrentUploads`

> Type: `UnsignedInt?` · default: `4` · min: 1
>
> Restricts the number of concurrent file uploads a user can perform

##### `maxUploadSize`

> Type: `UnsignedInt` · default: `50000000` · min: 1
>
> Defines the maximum file size for file uploads to the server

##### `maxUploadCount`

> Type: `UnsignedInt` · default: `1000` · min: 1
>
> Specifies the maximum number of files that a user can upload within a certain period

##### `uploadQuota`

> Type: `UnsignedInt` · default: `50000000` · min: 1
>
> Defines the total size of files that a user can upload within a certain period

##### `uploadTtl`

> Type: `Duration` · default: `3600000` · min: 1000
>
> Specifies the Time-To-Live (TTL) for each uploaded file, after which the file is deleted from temporary storage. Set a long duration to effectively keep uploads until they are referenced

##### `eventSourceThrottle`

> Type: `Duration` · default: `1000`
>
> Specifies the minimum time between two event source notifications

##### `pushAttemptWait`

> Type: `Duration` · default: `60000`
>
> Time to wait between push attempts

##### `pushMaxAttempts`

> Type: `UnsignedInt` · default: `3` · min: 1
>
> Maximum number of push attempts before a notification is discarded

##### `pushRetryWait`

> Type: `Duration` · default: `1000`
>
> Time to wait between retry attempts

##### `pushThrottle`

> Type: `Duration` · default: `1000`
>
> Time to wait before sending a new request to the push service

##### `pushRequestTimeout`

> Type: `Duration` · default: `10000`
>
> Time before a connection with a push service URL times out

##### `pushVerifyTimeout`

> Type: `Duration` · default: `60000`
>
> Time to wait for the push service to verify a subscription

##### `pushShardsTotal`

> Type: `UnsignedInt` · default: `1` · min: 1
>
> Total number of shards for push notification processing across multiple nodes

##### `websocketHeartbeat`

> Type: `Duration` · default: `60000`
>
> Time to wait before sending a new heartbeat to the WebSocket client

##### `websocketThrottle`

> Type: `Duration` · default: `1000`
>
> Amount of time to wait before sending a batch of notifications to a WS client

##### `websocketTimeout`

> Type: `Duration` · default: `600000`
>
> Time before an inactive WebSocket connection times out

##### `maxSubscriptions`

> Type: `UnsignedInt?` · default: `15` · min: 1
>
> The default maximum number of push subscriptions a user can create

##### `webPushKey`

> Type: [`SecretTextOptional`](#secrettextoptional) · required
>
> ECDSA P-256 private key (PKCS#8 PEM) used to sign VAPID (RFC 8292) authentication tokens for Web Push.

##### `webPushContact`

> Type: `String?`
>
> Optional contact URI (a mailto: or https: address) included as the sub claim of VAPID tokens so that push services can reach the server operator. Leave empty to omit the claim.

##### `maxPushSize`

> Type: `UnsignedInt` · default: `4096` · min: 512
>
> Maximum size in bytes for a Web Push notification payload; EmailPush objects are truncated to fit within this limit

## JMAP API

The Jmap singleton is available via the `urn:stalwart:jmap` capability.

### `x:Jmap/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysJmapGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Jmap/get",
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

### `x:Jmap/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysJmapUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Jmap/set",
          {
            "update": {
              "singleton": {
                "webPushContact": "updated value"
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
stalwart-cli get Jmap
```

### Update

```sh
stalwart-cli update Jmap --field webPushContact='updated value'
```

## Nested types

### SecretTextOptional

An optional secret text value, or none.

- **`None`**: No secret. No additional fields.
- **`Text`**: Secret value. Carries the fields of [`SecretTextValue`](#secrettextvalue).
- **`EnvironmentVariable`**: Secret read from environment variable. Carries the fields of [`SecretKeyEnvironmentVariable`](#secretkeyenvironmentvariable).
- **`File`**: Secret read from file. Carries the fields of [`SecretKeyFile`](#secretkeyfile).

#### SecretTextValue

A secret text value provided directly.

##### `secret`

> Type: `Text` · required · secret
>
> Password or secret value

#### SecretKeyEnvironmentVariable

A secret value read from an environment variable.

##### `variableName`

> Type: `String` · required
>
> Environment variable name to read the secret from

#### SecretKeyFile

A secret value read from a file.

##### `filePath`

> Type: `String` · required
>
> File path to read the secret from
