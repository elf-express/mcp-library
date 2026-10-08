---
title: "Task"
source: https://stalw.art/docs/ref/object/task/
description: "Represents a background task scheduled for execution."
---

# Task

> Section: Schema reference › Objects

Represents a background task scheduled for execution.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Management › Tasks › Scheduled Management › Tasks › Failed

## Fields

Task is a **multi-variant** object: each instance has an `@type` discriminator selecting one of the variants below, and each variant carries its own set of fields.

### `@type: "IndexDocument"`

Index document

##### `documentType`

> Type: [`IndexDocumentType`](#indexdocumenttype) · read-only
>
> Type of document associated with the task

##### `accountId`

> Type: `Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>` · read-only
>
> Identifier of the account associated with this task

##### `documentId`

> Type: `Id` · read-only
>
> Identifier of the document associated with this task

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

### `@type: "UnindexDocument"`

Unindex document

##### `documentType`

> Type: [`IndexDocumentType`](#indexdocumenttype) · read-only
>
> Type of document associated with the task

##### `accountId`

> Type: `Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>` · read-only
>
> Identifier of the account associated with this task

##### `documentId`

> Type: `Id` · read-only
>
> Identifier of the document associated with this task

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

### `@type: "IndexTrace"`

Index telemetry trace

##### `traceId`

> Type: `Id<`[`Trace`](https://stalw.art/docs/ref/object/trace)`>` · read-only
>
> Identifier of the trace associated with this task

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

### `@type: "CalendarAlarmEmail"`

Calendar alarm e-mail

##### `alarmId`

> Type: `UnsignedInt` · server-set · default: `0`
>
> Identifier of the calendar alarm associated with this task

##### `eventId`

> Type: `UnsignedInt` · server-set · default: `0`
>
> Identifier of the calendar event associated with this task

##### `eventStart`

> Type: `UTCDateTime` · server-set
>
> Start date and time of the calendar event

##### `eventEnd`

> Type: `UTCDateTime` · server-set
>
> End date and time of the calendar event

##### `eventStartTz`

> Type: `UnsignedInt` · server-set · default: `0`
>
> Timezone identifier for the start date and time

##### `eventEndTz`

> Type: `UnsignedInt` · server-set · default: `0`
>
> Timezone identifier for the end date and time

##### `accountId`

> Type: `Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>` · read-only
>
> Identifier of the account associated with this task

##### `documentId`

> Type: `Id` · read-only
>
> Identifier of the document associated with this task

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

### `@type: "CalendarAlarmNotification"`

Calendar alarm notification

##### `alarmId`

> Type: `UnsignedInt` · server-set · default: `0`
>
> Identifier of the calendar alarm associated with this task

##### `eventId`

> Type: `UnsignedInt` · server-set · default: `0`
>
> Identifier of the calendar event associated with this task

##### `recurrenceId`

> Type: `Integer?` · server-set
>
> Recurrence identifier for the alarm, if applicable

##### `accountId`

> Type: `Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>` · read-only
>
> Identifier of the account associated with this task

##### `documentId`

> Type: `Id` · read-only
>
> Identifier of the document associated with this task

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

### `@type: "CalendarItipMessage"`

Calendar iTIP message

##### `messages`

> Type: `List<`[`TaskCalendarItipContents`](#taskcalendaritipcontents)`>` · server-set
>
> List of iTIP messages associated with this task

##### `accountId`

> Type: `Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>` · read-only
>
> Identifier of the account associated with this task

##### `documentId`

> Type: `Id` · read-only
>
> Identifier of the document associated with this task

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

### `@type: "MergeThreads"`

Merge email threads

##### `accountId`

> Type: `Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>` · server-set
>
> Identifier of the account associated with this task

##### `threadName`

> Type: `String` · server-set
>
> Name of the thread to be merged

##### `messageIds`

> Type: `Set<String>` · server-set
>
> Message-IDs of the email messages to be merged into the thread

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

### `@type: "DmarcReport"`

Send DMARC report to remote server

##### `reportId`

> Type: `Id<`[`DmarcInternalReport`](https://stalw.art/docs/ref/object/dmarc-internal-report)`>` · server-set
>
> Identifier for the DMARC aggregate report associated with this task

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

### `@type: "TlsReport"`

Send TLS report to remote server

##### `reportId`

> Type: `Id<`[`TlsInternalReport`](https://stalw.art/docs/ref/object/tls-internal-report)`>` · server-set
>
> Identifier for the TLS aggregate report associated with this task

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

### `@type: "RestoreArchivedItem"`

Restore archived item

##### `blobId`

> Type: `BlobId` · server-set
>
> Identifier of the archived blob to be restored

##### `archivedItemType`

> Type: [`ArchivedItemType`](#archiveditemtype) · server-set
>
> Type of the archived item associated with the blob

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> Timestamp when the item was originally created

##### `archivedUntil`

> Type: `UTCDateTime` · server-set
>
> Timestamp until which the archived item will be deleted permanently if not restored

##### `accountId`

> Type: `Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>` · server-set
>
> Identifier of the account to which the archived item belongs

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

### `@type: "DestroyAccount"`

Destroy account and all associated data

##### `accountId`

> Type: `Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>` · server-set
>
> Identifier of the account to be destroyed

##### `accountName`

> Type: `String` · required
>
> Name of the account to be destroyed

##### `accountDomainId`

> Type: `Id<`[`Domain`](https://stalw.art/docs/ref/object/domain)`>` · required
>
> Domain identifier of the account to be destroyed, if applicable

##### `accountType`

> Type: [`AccountType`](#accounttype) · server-set
>
> Type of the deleted account (user or group)

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

### `@type: "AccountMaintenance"`

Perform account maintenance operations

##### `accountId`

> Type: `Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>` · read-only
>
> Identifier of the account to be maintained

##### `maintenanceType`

> Type: [`TaskAccountMaintenanceType`](#taskaccountmaintenancetype) · read-only
>
> Type of maintenance operation to perform on the account

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

### `@type: "TenantMaintenance"`

Perform tenant maintenance operations

##### `tenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>` · read-only
>
> Identifier of the tenant to be maintained

##### `maintenanceType`

> Type: [`TaskTenantMaintenanceType`](#tasktenantmaintenancetype) · read-only
>
> Type of maintenance operation to perform on the tenant

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

### `@type: "StoreMaintenance"`

Perform store maintenance operations

##### `maintenanceType`

> Type: [`TaskStoreMaintenanceType`](#taskstoremaintenancetype) · read-only
>
> Type of maintenance operation to perform on the store

##### `shardIndex`

> Type: `UnsignedInt?`
>
> Index of the shard to perform maintenance on, if applicable for the maintenance type

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

### `@type: "SpamFilterMaintenance"`

Perform spam filter maintenance operations

##### `maintenanceType`

> Type: [`TaskSpamFilterMaintenanceType`](#taskspamfiltermaintenancetype) · read-only
>
> Type of maintenance operation to perform on the spam filter

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

### `@type: "AcmeRenewal"`

Perform ACME certificate renewal for a domain

##### `domainId`

> Type: `Id<`[`Domain`](https://stalw.art/docs/ref/object/domain)`>` · read-only
>
> Identifier of the domain associated with this task

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

### `@type: "DkimManagement"`

Perform DKIM key rotation for a domain

##### `domainId`

> Type: `Id<`[`Domain`](https://stalw.art/docs/ref/object/domain)`>` · read-only
>
> Identifier of the domain associated with this task

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

### `@type: "DnsManagement"`

Perform DNS management for a domain

##### `updateRecords`

> Type: `Set<`[`DnsRecordType`](#dnsrecordtype)`>`
>
> Which DNS records should be updated for the domain as part of this task

##### `onSuccessRenewCertificate`

> Type: `Boolean` · default: `false`
>
> Whether to automatically renew the domain's TLS certificate using ACME after successfully updating DNS records

##### `domainId`

> Type: `Id<`[`Domain`](https://stalw.art/docs/ref/object/domain)`>` · read-only
>
> Identifier of the domain associated with this task

##### `status`

> Type: [`TaskStatus`](#taskstatus) · required
>
> Current status of the task

##### `due`

> Type: `UTCDateTime?` · server-set
>
> Due date and time for the task

## JMAP API

The Task object is available via the `urn:stalwart:jmap` capability.

### `x:Task/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysTaskGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Task/get",
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

### `x:Task/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysTaskCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Task/set",
          {
            "create": {
              "new1": {
                "@type": "IndexDocument",
                "status": {
                  "@type": "Pending",
                  "due": "2026-01-01T00:00:00Z"
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

This operation requires the `sysTaskUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Task/set",
          {
            "update": {
              "id1": {
                "status": {
                  "@type": "Pending",
                  "due": "2026-01-01T00:00:00Z"
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

#### Destroy

This operation requires the `sysTaskDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Task/set",
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

### `x:Task/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysTaskQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Task/query",
          {
            "filter": {
              "@type": "value"
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

The `x:Task/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `@type` | enum: TaskType |
| `status` | enum: TaskStatusType |
| `due` | date |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get Task id1
```

### Create

```sh
stalwart-cli create Task/IndexDocument \
  --field 'status={"@type":"Pending","due":"2026-01-01T00:00:00Z"}'
```

### Query

```sh
stalwart-cli query Task
stalwart-cli query Task --where @type=value
```

### Update

```sh
stalwart-cli update Task id1 --field status='{"@type":"Pending","due":"2026-01-01T00:00:00Z"}'
```

### Delete

```sh
stalwart-cli delete Task --ids id1
```

## Nested types

### TaskStatus

Execution status of a background task.

- **`Pending`**: Pending task awaiting execution. Carries the fields of [`TaskStatusPending`](#taskstatuspending).
- **`Retry`**: Task scheduled for retry. Carries the fields of [`TaskStatusRetry`](#taskstatusretry).
- **`Failed`**: Failed task. Carries the fields of [`TaskStatusFailed`](#taskstatusfailed).

#### TaskStatusPending

Pending task status details.

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> Date and time when the task was created

##### `due`

> Type: `UTCDateTime` · required
>
> Due date and time for the task

#### TaskStatusRetry

Task retry status details.

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> Date and time when the task was created

##### `due`

> Type: `UTCDateTime` · required
>
> Due date and time for the task

##### `attemptNumber`

> Type: `UnsignedInt` · default: `1`
>
> Number of attempts made to complete the task

##### `failureReason`

> Type: `Text` · required
>
> Reason for the last failure

#### TaskStatusFailed

Failed task status details.

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> Date and time when the task was created

##### `failedAt`

> Type: `UTCDateTime` · required
>
> Date and time when the task failed

##### `failedAttemptNumber`

> Type: `UnsignedInt` · default: `0`
>
> Number of attempts made before the task failed

##### `failureReason`

> Type: `Text` · required
>
> Reason for task failure

### TaskCalendarItipContents

Contents of an iTIP message to be delivered.

##### `from`

> Type: `EmailAddress` · server-set
>
> Email address of the sender of the iTIP message

##### `to`

> Type: `Set<EmailAddress>` · server-set
>
> Email addresses of the recipients of the iTIP message

##### `isFromOrganizer`

> Type: `Boolean` · server-set · default: `false`
>
> Indicates whether the sender is the organizer of the calendar event

##### `iCalendarData`

> Type: `String` · server-set
>
> iCalendar data associated with the iTIP message

##### `summary`

> Type: `String` · server-set
>
> Summary of the calendar event associated with the iTIP message

## Enums

### IndexDocumentType

| Value | Label |
|---|---|
| `email` | Email |
| `calendar` | Calendar |
| `contacts` | Contacts |
| `file` | File |

### ArchivedItemType

| Value | Label |
|---|---|
| `Email` | Archived Email message |
| `FileNode` | Archived File |
| `CalendarEvent` | Archived Calendar Event |
| `ContactCard` | Archived Contact Card |
| `SieveScript` | Archived Sieve Script |

### AccountType

| Value | Label |
|---|---|
| `User` | User account |
| `Group` | Group account |

### TaskAccountMaintenanceType

| Value | Label |
|---|---|
| `purge` | Purge expired data from the account |
| `reindex` | Reindex the account's data for search |
| `recalculateImapUid` | Recalculate IMAP UIDs for the account's email messages |
| `recalculateQuota` | Recalculate storage quota usage for the account |

### TaskTenantMaintenanceType

| Value | Label |
|---|---|
| `recalculateQuota` | Recalculate storage quota usage for the tenant |

### TaskStoreMaintenanceType

| Value | Label |
|---|---|
| `reindexAccounts` | Reindex all accounts' data for search |
| `reindexTelemetry` | Reindex all telemetry data for search |
| `purgeAccounts` | Purge expired data from all accounts |
| `purgeData` | Purge data store |
| `purgeBlob` | Purge blob store |
| `resetRateLimiters` | Reset all rate limiters |
| `resetUserQuotas` | Reset all user quotas |
| `resetTenantQuotas` | Reset all tenant quotas |
| `resetBlobQuotas` | Reset all blob quotas |
| `removeAuthTokens` | Delete all temporary ACME and OAuth tokens |
| `removeLockQueueMessage` | Delete all MTA queue message locks |
| `removeLockTask` | Delete all task manager locks |
| `removeLockDav` | Delete all DAV locks |
| `removeSieveId` | Delete all Sieve vacation and duplicate ID lists |
| `removeGreylist` | Delete all spam filter grey list entries |

### TaskSpamFilterMaintenanceType

| Value | Label |
|---|---|
| `train` | Train the spam classifier with the latest samples |
| `retrain` | Retrain the spam classifier with all available samples |
| `abort` | Abort the ongoing training process of the spam classifier |
| `reset` | Delete the spam classifier's model and reset it to the default state |
| `updateRules` | Download and update the spam filter rules from the configured source |

### DnsRecordType

| Value | Label |
|---|---|
| `dkim` | DKIM public keys |
| `tlsa` | TLSA records |
| `spf` | SPF records |
| `mx` | MX records |
| `dmarc` | DMARC policy |
| `srv` | SRV records |
| `mtaSts` | MTA-STS policy record |
| `tlsRpt` | TLS reporting record |
| `caa` | CAA records |
| `autoConfig` | Autoconfig records |
| `autoConfigLegacy` | Legacy Autoconfig records |
| `autoDiscover` | Microsoft Autodiscover records |
