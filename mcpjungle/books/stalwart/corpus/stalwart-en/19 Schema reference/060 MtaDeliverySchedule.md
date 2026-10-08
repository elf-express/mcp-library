---
title: "MtaDeliverySchedule"
source: https://stalw.art/docs/ref/object/mta-delivery-schedule/
description: "Defines retry and notification intervals for message delivery."
---

# MtaDeliverySchedule

> Section: Schema reference › Objects

Defines retry and notification intervals for message delivery.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Outbound › Delivery Schedules

## Fields

##### `name`

> Type: `String` · read-only
>
> Short identifier for the schedule

##### `description`

> Type: `String?`
>
> A short description of the schedule, which can be used to identify it in the list of schedules

##### `expiry`

> Type: [`MtaDeliveryExpiration`](#mtadeliveryexpiration) · required
>
> Whether to expire messages after a number of delivery attempts or after certain time (TTL)

##### `notify`

> Type: [`MtaDeliveryScheduleIntervalsOrDefault`](#mtadeliveryscheduleintervalsordefault) · required
>
> List of delayed delivery DSN notification intervals

##### `queueId`

> Type: `Id<`[`MtaVirtualQueue`](https://stalw.art/docs/ref/object/mta-virtual-queue)`>` · required
>
> The name of the virtual queue to use for this schedule

##### `retry`

> Type: [`MtaDeliveryScheduleIntervalsOrDefault`](#mtadeliveryscheduleintervalsordefault) · required
>
> List of retry intervals for message delivery

## JMAP API

The MtaDeliverySchedule object is available via the `urn:stalwart:jmap` capability.

### `x:MtaDeliverySchedule/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysMtaDeliveryScheduleGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaDeliverySchedule/get",
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

### `x:MtaDeliverySchedule/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysMtaDeliveryScheduleCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaDeliverySchedule/set",
          {
            "create": {
              "new1": {
                "expiry": {
                  "@type": "Ttl"
                },
                "notify": {
                  "@type": "Default"
                },
                "queueId": "<MtaVirtualQueue id>",
                "retry": {
                  "@type": "Default"
                }
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

This operation requires the `sysMtaDeliveryScheduleUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaDeliverySchedule/set",
          {
            "update": {
              "id1": {
                "description": "updated value"
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

This operation requires the `sysMtaDeliveryScheduleDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaDeliverySchedule/set",
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

### `x:MtaDeliverySchedule/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysMtaDeliveryScheduleQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaDeliverySchedule/query",
          {
            "filter": {
              "name": "example"
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

The `x:MtaDeliverySchedule/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `name` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get MtaDeliverySchedule id1
```

### Create

```sh
stalwart-cli create MtaDeliverySchedule \
  --field 'expiry={"@type":"Ttl"}' \
  --field 'notify={"@type":"Default"}' \
  --field 'queueId=<MtaVirtualQueue id>' \
  --field 'retry={"@type":"Default"}'
```

### Query

```sh
stalwart-cli query MtaDeliverySchedule
stalwart-cli query MtaDeliverySchedule --where name=example
```

### Update

```sh
stalwart-cli update MtaDeliverySchedule id1 --field description='updated value'
```

### Delete

```sh
stalwart-cli delete MtaDeliverySchedule --ids id1
```

## Nested types

### MtaDeliveryExpiration

Defines the message expiration policy for undelivered messages.

- **`Ttl`**: Time To Live. Carries the fields of [`MtaDeliveryExpirationTtl`](#mtadeliveryexpirationttl).
- **`Attempts`**: Delivery Attempts. Carries the fields of [`MtaDeliveryExpirationAttempts`](#mtadeliveryexpirationattempts).

#### MtaDeliveryExpirationTtl

Defines a time-to-live based message expiration policy.

##### `expire`

> Type: `Duration` · default: `259200000`
>
> Time after which the message will be expired if it is not delivered

#### MtaDeliveryExpirationAttempts

Defines a delivery-attempts based message expiration policy.

##### `maxAttempts`

> Type: `UnsignedInt` · default: `5` · min: 1
>
> Maximum number of delivery attempts before the message is considered failed

### MtaDeliveryScheduleIntervalsOrDefault

Defines whether to use the default delivery schedule intervals or specify custom intervals.

- **`Default`**: Use default intervals. No additional fields.
- **`Custom`**: Specify custom intervals. Carries the fields of [`MtaDeliveryScheduleIntervals`](#mtadeliveryscheduleintervals).

#### MtaDeliveryScheduleIntervals

Defines a custom list of delivery retry or notification intervals.

##### `intervals`

> Type: `List<`[`MtaDeliveryScheduleInterval`](#mtadeliveryscheduleinterval)`>` · min items: 1
>
> List of intervals

##### MtaDeliveryScheduleInterval

Defines a single time interval entry used in a delivery schedule.

##### `duration`

> Type: `Duration` · default: `3600000`
>
> Time interval for retries or notifications
