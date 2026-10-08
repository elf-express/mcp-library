---
title: "DataRetention"
source: https://stalw.art/docs/ref/object/data-retention/
description: "Configures data retention policies, expunge schedules, and archival settings."
---

# DataRetention

> Section: Schema reference › Objects

Configures data retention policies, expunge schedules, and archival settings.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Storage › Data Retention › Archiving Settings › Storage › Data Retention › Data Cleanup Settings › Storage › Data Retention › Auto-Expunge Settings › Storage › Data Retention › Telemetry

## Fields

##### `expungeTrashAfter`

> Type: `Duration?` · default: `2592000000`
>
> How long to keep messages in the Trash and Junk Mail folders before auto-expunging

##### `expungeSubmissionsAfter`

> Type: `Duration?` · default: `259200000`
>
> How long to keep sent e-mail submissions before auto-expunging

##### `expungeShareNotifyAfter`

> Type: `Duration?` · default: `2592000000`
>
> Specifies the duration for which the JMAP share notification history is retained before it is automatically purged.

##### `expungeSchedulingInboxAfter`

> Type: `Duration?` · default: `2592000000`
>
> Sets the duration after which the iTIP inbox will automatically expunge old messages.

##### `expungeSchedule`

> Type: [`Cron`](#cron) · default: `{"@type":"Daily","hour":0,"minute":0}`
>
> Specifies when to run the auto-expunge process

##### `dataCleanupSchedule`

> Type: [`Cron`](#cron) · default: `{"@type":"Daily","hour":2,"minute":0}`
>
> How often to purge the data store. Expects a cron expression.

##### `blobCleanupSchedule`

> Type: [`Cron`](#cron) · default: `{"@type":"Daily","hour":4,"minute":0}`
>
> How often to purge the data store. Expects a cron expression.

##### `maxChangesHistory`

> Type: `UnsignedInt?` · default: `10000`
>
> How many changes to keep in the history for each account. This is used to determine the changes that have occurred since the last time the client requested changes.

##### `archiveDeletedItemsFor`

> Type: `Duration?` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> How long to keep deleted items in the archive before they are permanently deleted. If null, deleted items will not be archived and will be permanently deleted immediately.

##### `archiveDeletedAccountsFor`

> Type: `Duration?` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> How long to keep deleted accounts in the archive before they are permanently deleted. If null, deleted accounts will be permanently deleted immediately.

##### `holdMtaReportsFor`

> Type: `Duration?` · default: `2592000000`
>
> The duration for which MTA reports should be stored before being deleted, or None to disable storage

##### `holdTracesFor`

> Type: `Duration?` · [enterprise](https://stalw.art/docs/server/enterprise) · default: `2592000000`
>
> How long to keep message delivery history before it is permanently deleted.

##### `holdMetricsFor`

> Type: `Duration?` · [enterprise](https://stalw.art/docs/server/enterprise) · default: `7776000000`
>
> How long to keep metrics history before it is permanently deleted.

##### `metricsCollectionInterval`

> Type: [`Cron`](#cron) · [enterprise](https://stalw.art/docs/server/enterprise) · default: `{"@type":"Hourly","minute":0}`
>
> Specifies how often to collect metrics history.

## JMAP API

The DataRetention singleton is available via the `urn:stalwart:jmap` capability.

### `x:DataRetention/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysDataRetentionGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DataRetention/get",
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

### `x:DataRetention/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysDataRetentionUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DataRetention/set",
          {
            "update": {
              "singleton": {
                "expungeTrashAfter": 2592000000
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
stalwart-cli get DataRetention
```

### Update

```sh
stalwart-cli update DataRetention --field expungeTrashAfter=2592000000
```

## Nested types

### Cron

Defines a recurring schedule.

- **`Daily`**: Every day. Carries the fields of [`CronDaily`](#crondaily).
- **`Weekly`**: Every week. Carries the fields of [`CronWeekly`](#cronweekly).
- **`Hourly`**: Every hour. Carries the fields of [`CronHourly`](#cronhourly).

#### CronDaily

A daily recurring schedule at a specific time.

##### `hour`

> Type: `UnsignedInt` · default: `0` · max: 23
>
> Hour

##### `minute`

> Type: `UnsignedInt` · default: `0` · max: 59
>
> Minute

#### CronWeekly

A weekly recurring schedule on a specific day and time.

##### `day`

> Type: `UnsignedInt` · default: `0` · max: 6
>
> Day

##### `hour`

> Type: `UnsignedInt` · default: `0` · max: 23
>
> Hour

##### `minute`

> Type: `UnsignedInt` · default: `0` · max: 59
>
> Minute

#### CronHourly

An hourly recurring schedule at a specific minute.

##### `minute`

> Type: `UnsignedInt` · default: `0` · max: 59
>
> Minute
