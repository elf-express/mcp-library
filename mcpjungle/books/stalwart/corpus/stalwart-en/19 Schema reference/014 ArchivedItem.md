---
title: "ArchivedItem"
source: https://stalw.art/docs/ref/object/archived-item/
description: "Represents an archived item that can be restored."
---

# ArchivedItem

> Section: Schema reference › Objects

Represents an archived item that can be restored.

:::note[Enterprise feature]
This object is only available with an [Enterprise license](https://stalw.art/docs/server/enterprise).
:::

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Account › Archived Items

## Fields

ArchivedItem is a **multi-variant** object: each instance has an `@type` discriminator selecting one of the variants below, and each variant carries its own set of fields.

### `@type: "Email"`

Archived Email message

##### `from`

> Type: `String` · required
>
> Sender of the archived email message

##### `subject`

> Type: `String` · required
>
> Subject of the archived email message

##### `receivedAt`

> Type: `UTCDateTime` · required
>
> Received date of the archived email message

##### `size`

> Type: `Size` · read-only · default: `0`
>
> Size of the archived email message

##### `accountId`

> Type: `Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>` · required
>
> The account to which the archived item belongs

##### `archivedAt`

> Type: `UTCDateTime` · required
>
> Timestamp when the item was archived

##### `archivedUntil`

> Type: `UTCDateTime` · required
>
> Timestamp until which the archived item will be deleted permanently if not restored

##### `blobId`

> Type: `BlobId` · required
>
> Identifier of the archived blob

##### `status`

> Type: [`ArchivedItemStatus`](#archiveditemstatus) · required
>
> Current status of the archived item

### `@type: "FileNode"`

Archived File

##### `name`

> Type: `String` · required
>
> Name of the archived file

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> Creation date of the archived file

##### `accountId`

> Type: `Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>` · required
>
> The account to which the archived item belongs

##### `archivedAt`

> Type: `UTCDateTime` · required
>
> Timestamp when the item was archived

##### `archivedUntil`

> Type: `UTCDateTime` · required
>
> Timestamp until which the archived item will be deleted permanently if not restored

##### `blobId`

> Type: `BlobId` · required
>
> Identifier of the archived blob

##### `status`

> Type: [`ArchivedItemStatus`](#archiveditemstatus) · required
>
> Current status of the archived item

### `@type: "CalendarEvent"`

Archived Calendar Event

##### `title`

> Type: `String` · required
>
> Title of the archived calendar event

##### `startTime`

> Type: `UTCDateTime?`
>
> Start time of the archived calendar event

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> Creation date of the archived calendar event

##### `accountId`

> Type: `Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>` · required
>
> The account to which the archived item belongs

##### `archivedAt`

> Type: `UTCDateTime` · required
>
> Timestamp when the item was archived

##### `archivedUntil`

> Type: `UTCDateTime` · required
>
> Timestamp until which the archived item will be deleted permanently if not restored

##### `blobId`

> Type: `BlobId` · required
>
> Identifier of the archived blob

##### `status`

> Type: [`ArchivedItemStatus`](#archiveditemstatus) · required
>
> Current status of the archived item

### `@type: "ContactCard"`

Archived Contact Card

##### `name`

> Type: `String?`
>
> Full name of the archived contact card

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> Creation date of the archived contact card

##### `accountId`

> Type: `Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>` · required
>
> The account to which the archived item belongs

##### `archivedAt`

> Type: `UTCDateTime` · required
>
> Timestamp when the item was archived

##### `archivedUntil`

> Type: `UTCDateTime` · required
>
> Timestamp until which the archived item will be deleted permanently if not restored

##### `blobId`

> Type: `BlobId` · required
>
> Identifier of the archived blob

##### `status`

> Type: [`ArchivedItemStatus`](#archiveditemstatus) · required
>
> Current status of the archived item

### `@type: "SieveScript"`

Archived Sieve Script

##### `name`

> Type: `String` · required
>
> Name of the archived sieve script

##### `createdAt`

> Type: `UTCDateTime` · server-set
>
> Creation date of the archived sieve script

##### `content`

> Type: `String` · required
>
> Content of the archived sieve script

##### `accountId`

> Type: `Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>` · required
>
> The account to which the archived item belongs

##### `archivedAt`

> Type: `UTCDateTime` · required
>
> Timestamp when the item was archived

##### `archivedUntil`

> Type: `UTCDateTime` · required
>
> Timestamp until which the archived item will be deleted permanently if not restored

##### `blobId`

> Type: `BlobId` · required
>
> Identifier of the archived blob

##### `status`

> Type: [`ArchivedItemStatus`](#archiveditemstatus) · required
>
> Current status of the archived item

## JMAP API

The ArchivedItem object is available via the `urn:stalwart:jmap` capability.

### `x:ArchivedItem/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysArchivedItemGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ArchivedItem/get",
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

### `x:ArchivedItem/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysArchivedItemCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ArchivedItem/set",
          {
            "create": {
              "new1": {
                "@type": "Email",
                "accountId": "<Account id>",
                "archivedAt": "2026-01-01T00:00:00Z",
                "archivedUntil": "2026-01-01T00:00:00Z",
                "blobId": "abc123",
                "from": "Example",
                "receivedAt": "2026-01-01T00:00:00Z",
                "subject": "Example"
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

This operation requires the `sysArchivedItemUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ArchivedItem/set",
          {
            "update": {
              "id1": {
                "from": "updated value"
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

This operation requires the `sysArchivedItemDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ArchivedItem/set",
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

### `x:ArchivedItem/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysArchivedItemQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ArchivedItem/query",
          {
            "filter": {
              "accountId": "id1"
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

The `x:ArchivedItem/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `accountId` | id of Account |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get ArchivedItem id1
```

### Create

```sh
stalwart-cli create ArchivedItem/Email \
  --field from=Example \
  --field subject=Example \
  --field receivedAt=2026-01-01T00:00:00Z \
  --field 'accountId=<Account id>' \
  --field archivedAt=2026-01-01T00:00:00Z \
  --field archivedUntil=2026-01-01T00:00:00Z \
  --field blobId=abc123
```

### Query

```sh
stalwart-cli query ArchivedItem
stalwart-cli query ArchivedItem --where accountId=id1
```

### Update

```sh
stalwart-cli update ArchivedItem id1 --field from='updated value'
```

### Delete

```sh
stalwart-cli delete ArchivedItem --ids id1
```

## Enums

### ArchivedItemStatus

| Value | Label |
|---|---|
| `archived` | Item is archived and available for restoration |
| `requestRestore` | Request item restoration |
