---
title: "QueuedMessage"
source: https://stalw.art/docs/ref/object/queued-message/
description: "Represents a queued email message pending delivery."
---

# QueuedMessage

> Section: Schema reference › Objects

Represents a queued email message pending delivery.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Management › Emails › Queued

## Fields

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> When the message was received and queued

##### `nextRetry`

> Type: `UTCDateTime?`
>
> When the next delivery attempt is scheduled

##### `nextNotify`

> Type: `UTCDateTime?` · server-set
>
> When the next DSN notification is scheduled

##### `blobId`

> Type: `BlobId` · server-set
>
> Reference to the stored message content

##### `returnPath`

> Type: `String` · server-set
>
> Envelope sender address (MAIL FROM)

##### `recipients`

> Type: `Map<EmailAddress, `[`QueuedRecipient`](#queuedrecipient)`>`
>
> List of envelope recipients and their delivery status

##### `receivedFromIp`

> Type: `IpAddr` · server-set
>
> IP address of the client that submitted the message

##### `receivedViaPort`

> Type: `UnsignedInt` · server-set · default: `25` · min: 1 · max: 65535
>
> Local port on which the message was received

##### `flags`

> Type: `Set<`[`MessageFlag`](#messageflag)`>` · server-set
>
> Classification flags for the message

##### `envId`

> Type: `String?`
>
> SMTP ENVID parameter for delivery status notifications

##### `priority`

> Type: `Integer` · default: `0` · min: -100 · max: 100
>
> Message priority (lower values = higher priority)

##### `size`

> Type: `UnsignedInt` · server-set · default: `0`
>
> Size of the message in bytes

## JMAP API

The QueuedMessage object is available via the `urn:stalwart:jmap` capability.

### `x:QueuedMessage/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysQueuedMessageGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:QueuedMessage/get",
          {
            "ids": [
              "id1"
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

### `x:QueuedMessage/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysQueuedMessageCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:QueuedMessage/set",
          {
            "create": {
              "new1": {
                "recipients": {}
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

#### Update

This operation requires the `sysQueuedMessageUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:QueuedMessage/set",
          {
            "update": {
              "id1": {
                "envId": "updated value"
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

#### Destroy

This operation requires the `sysQueuedMessageDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:QueuedMessage/set",
          {
            "destroy": [
              "id1"
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

### `x:QueuedMessage/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysQueuedMessageQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:QueuedMessage/query",
          {
            "filter": {
              "text": "example"
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

The `x:QueuedMessage/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `text` | text |
| `to` | text |
| `due` | date |
| `queueName` | text |
| `returnPath` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get QueuedMessage id1
```

### Create

```sh
stalwart-cli create QueuedMessage \
  --field 'recipients={}'
```

### Query

```sh
stalwart-cli query QueuedMessage
stalwart-cli query QueuedMessage --where text=example
```

### Update

```sh
stalwart-cli update QueuedMessage id1 --field envId='updated value'
```

### Delete

```sh
stalwart-cli delete QueuedMessage --ids id1
```

## Nested types

### QueuedRecipient

Delivery status and scheduling for a message recipient.

##### `retryCount`

> Type: `UnsignedInt` · default: `0`
>
> Number of delivery attempts made

##### `retryDue`

> Type: `UTCDateTime` · required
>
> When the next delivery attempt is scheduled

##### `notifyCount`

> Type: `UnsignedInt` · default: `0`
>
> Number of DSN notifications sent

##### `notifyDue`

> Type: `UTCDateTime` · required
>
> When the next DSN notification is scheduled

##### `expires`

> Type: [`QueueExpiry`](#queueexpiry) · required
>
> Message expiry information for this recipient

##### `queueName`

> Type: `String` · server-set · max length: 8
>
> Queue name for this recipient

##### `status`

> Type: [`RecipientStatus`](#recipientstatus) · required
>
> Current delivery status

##### `flags`

> Type: `Set<`[`RecipientFlag`](#recipientflag)`>` · server-set
>
> Status flags for this recipient

##### `orcpt`

> Type: `String?`
>
> Original recipient address (SMTP ORCPT parameter)

#### QueueExpiry

Message expiry strategy for a queued recipient.

- **`Ttl`**: TTL-based expiry. Carries the fields of [`QueueExpiryTtl`](#queueexpiryttl).
- **`Attempts`**: Attempt-based expiry. Carries the fields of [`QueueExpiryAttempts`](#queueexpiryattempts).

##### QueueExpiryTtl

TTL-based message expiry settings.

##### `expiresAt`

> Type: `UTCDateTime` · required
>
> Absolute time when the message expires

##### QueueExpiryAttempts

Attempt-based message expiry settings.

##### `expiresAttempts`

> Type: `UnsignedInt` · default: `0`
>
> Maximum number of delivery attempts before the message expires

#### RecipientStatus

Delivery status for a queued message recipient.

- **`Scheduled`**: Delivery is pending. No additional fields.
- **`Completed`**: Message was successfully delivered. Carries the fields of [`ServerResponse`](#serverresponse).
- **`TemporaryFailure`**: Delivery failed temporarily, will retry. Carries the fields of [`DeliveryError`](#deliveryerror).
- **`PermanentFailure`**: Delivery failed permanently, will not retry. Carries the fields of [`DeliveryError`](#deliveryerror).

##### ServerResponse

SMTP server response details.

##### `responseHostname`

> Type: `String?`
>
> Hostname of the remote server that responded

##### `responseCode`

> Type: `UnsignedInt?` · min: 100 · max: 599
>
> SMTP response code from the remote server

##### `responseEnhanced`

> Type: `String?`
>
> SMTP enhanced status code (e.g., "4.7.1")

##### `responseMessage`

> Type: `String?`
>
> SMTP response message from the remote server

##### DeliveryError

Details of a delivery error including the triggering command.

##### `errorType`

> Type: [`DeliveryErrorType`](#deliveryerrortype) · required
>
> Type of delivery error encountered

##### `errorMessage`

> Type: `String?`
>
> Detailed error message

##### `errorCommand`

> Type: `String?`
>
> SMTP command that triggered an unexpected response

##### `responseHostname`

> Type: `String?`
>
> Hostname of the remote server that responded

##### `responseCode`

> Type: `UnsignedInt?` · min: 100 · max: 599
>
> SMTP response code from the remote server

##### `responseEnhanced`

> Type: `String?`
>
> SMTP enhanced status code (e.g., "4.7.1")

##### `responseMessage`

> Type: `String?`
>
> SMTP response message from the remote server

## Enums

### DeliveryErrorType

| Value | Label |
|---|---|
| `dnsError` | DNS resolution failed |
| `unexpectedResponse` | Remote server returned an unexpected SMTP response |
| `connectionError` | Failed to establish connection to remote server |
| `tlsError` | TLS handshake or encryption failed |
| `daneError` | DANE validation failed |
| `mtaStsError` | MTA-STS policy validation failed |
| `rateLimited` | Delivery delayed due to rate limiting |
| `concurrencyLimited` | Delivery delayed due to connection limits |
| `io` | Network I/O error occurred |

### RecipientFlag

| Value | Label |
|---|---|
| `dsnSent` | A delivery status notification has been sent for this recipient |
| `spamPayload` | Message content was classified as spam |

### MessageFlag

| Value | Label |
|---|---|
| `authenticated` | Message was received from an authenticated session |
| `unauthenticated` | Message was received without authentication |
| `unauthenticatedDmarc` | Message was received without authentication but passed DMARC |
| `dsn` | Message is a Delivery Status Notification |
| `report` | Message is an automated report (DMARC, TLS-RPT, etc.) |
| `autogenerated` | Message was automatically generated by the server |
