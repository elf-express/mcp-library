---
title: "Calendar"
source: https://stalw.art/docs/ref/object/calendar/
description: "Configures calendar settings including iCalendar limits and default names."
---

# Objects - Calendar

> Section: Schema reference › Objects

Configures calendar settings including iCalendar limits and default names.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Calendar & Contacts › Calendar

## Fields

##### `defaultDisplayName`

> Type: `String?` · default: `"Stalwart Calendar"`
>
> Specifies the default display name for a calendar when it is created

##### `defaultHrefName`

> Type: `String?` · default: `"default"`
>
> Specifies the default href name for a calendar when it is created

##### `maxAttendees`

> Type: `UnsignedInt` · default: `20` · max: 100000
>
> Specifies the maximum number of attendees that can be included in a single iCalendar instance

##### `maxRecurrenceExpansions`

> Type: `UnsignedInt` · default: `3000`
>
> Specifies the maximum number of instances that can be generated from a recurring iCalendar event

##### `maxICalendarSize`

> Type: `Size` · default: `524288`
>
> Specifies the maximum size of an iCalendar file that can be uploaded to the server

##### `maxCalendars`

> Type: `UnsignedInt?` · default: `250` · min: 1
>
> The default maximum number of calendars a user can create

##### `maxEvents`

> Type: `UnsignedInt?` · min: 1
>
> The default maximum number of calendar events a user can create

##### `maxParticipantIdentities`

> Type: `UnsignedInt?` · default: `100` · min: 1
>
> The default maximum number of participant identities a user can create

##### `maxEventNotifications`

> Type: `UnsignedInt?` · min: 1
>
> The default maximum number of notifications a user can create for calendar events

## JMAP API

The Calendar singleton is available via the `urn:stalwart:jmap` capability.

### `x:Calendar/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysCalendarGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Calendar/get",
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

### `x:Calendar/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysCalendarUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Calendar/set",
          {
            "update": {
              "singleton": {
                "defaultDisplayName": "updated value"
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
stalwart-cli get Calendar
```

### Update

```sh
stalwart-cli update Calendar --field defaultDisplayName='updated value'
```
