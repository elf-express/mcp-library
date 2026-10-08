---
title: "Search"
source: https://stalw.art/docs/ref/object/search/
description: "Configures full-text search indexing for emails, calendars, contacts, and tracing."
---

# Search

> Section: Schema reference › Objects

Configures full-text search indexing for emails, calendars, contacts, and tracing.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Search

## Fields

##### `indexBatchSize`

> Type: `UnsignedInt` · default: `100` · min: 1
>
> Number of items to process in each batch during indexing operations

##### `defaultLanguage`

> Type: [`Locale`](https://stalw.art/docs/ref/enum/locale) · default: `"en-US"`
>
> Default language to use when language detection is not possible

##### `supportedLanguages`

> Type: `Set<`[`Locale`](https://stalw.art/docs/ref/enum/locale)`>` · default: `{"en-US":true}`
>
> List of languages to enable for full-text search

##### `indexCalendar`

> Type: `Boolean` · default: `true`
>
> Enable full-text search indexing for calendar data

##### `indexCalendarFields`

> Type: `Set<`[`SearchCalendarField`](#searchcalendarfield)`>` · default: `{"attendee":true,"description":true,"location":true,"owner":true,"start":true,"title":true,"uid":true}`
>
> List of calendar fields to index

##### `indexContacts`

> Type: `Boolean` · default: `true`
>
> Enable full-text search indexing for contacts data

##### `indexContactFields`

> Type: `Set<`[`SearchContactField`](#searchcontactfield)`>` · default: `{"address":true,"email":true,"kind":true,"member":true,"name":true,"nickname":true,"note":true,"onlineService":true,"organization":true,"phone":true,"uid":true}`
>
> List of contact fields to index

##### `indexEmail`

> Type: `Boolean` · default: `true`
>
> Enable full-text search indexing for email content and metadata

##### `indexEmailFields`

> Type: `Set<`[`SearchEmailField`](#searchemailfield)`>` · default: `{"attachment":true,"bcc":true,"body":true,"cc":true,"from":true,"hasAttachment":true,"receivedAt":true,"sentAt":true,"size":true,"subject":true,"to":true}`
>
> List of email fields to index

##### `indexTelemetry`

> Type: `Boolean` · [enterprise](https://stalw.art/docs/server/enterprise) · default: `true`
>
> Enable full-text search indexing for tracing data

##### `indexTracingFields`

> Type: `Set<`[`SearchTracingField`](#searchtracingfield)`>` · [enterprise](https://stalw.art/docs/server/enterprise) · default: `{"eventType":true,"keywords":true,"queueId":true}`
>
> List of tracing fields to index

## JMAP API

The Search singleton is available via the `urn:stalwart:jmap` capability.

### `x:Search/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysSearchGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Search/get",
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

### `x:Search/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysSearchUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Search/set",
          {
            "update": {
              "singleton": {
                "indexBatchSize": 100
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
stalwart-cli get Search
```

### Update

```sh
stalwart-cli update Search --field indexBatchSize=100
```

## Enums

### SearchCalendarField

| Value | Label |
|---|---|
| `title` | Event Title |
| `description` | Event Description |
| `location` | Event Location |
| `owner` | Event Owner |
| `attendee` | Event Attendee |
| `start` | Event Start Date |
| `uid` | Event UID |

### SearchContactField

| Value | Label |
|---|---|
| `member` | Group Member |
| `kind` | Contact Kind |
| `name` | Contact Name |
| `nickname` | Contact Nickname |
| `organization` | Contact Organization |
| `email` | Contact Email |
| `phone` | Contact Phone |
| `onlineService` | Contact Online Service |
| `address` | Contact Address |
| `note` | Contact Note |
| `uid` | Contact UID |

### SearchEmailField

| Value | Label |
|---|---|
| `from` | From Address |
| `to` | To Address |
| `cc` | Cc Address |
| `bcc` | Bcc Address |
| `subject` | Subject |
| `body` | Body Content |
| `attachment` | Attachment Content |
| `receivedAt` | Received Date |
| `sentAt` | Sent Date |
| `size` | Message Size |
| `hasAttachment` | Has Attachment |
| `headers` | Email Headers |

### SearchTracingField

| Value | Label |
|---|---|
| `eventType` | Event Type |
| `queueId` | Queue ID |
| `keywords` | Keywords |
