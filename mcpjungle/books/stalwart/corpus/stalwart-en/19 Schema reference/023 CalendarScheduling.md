---
title: "CalendarScheduling"
source: https://stalw.art/docs/ref/object/calendar-scheduling/
description: "Configures calendar scheduling, iTIP messaging, and HTTP RSVP settings."
---

# CalendarScheduling

> Section: Schema reference › Objects

Configures calendar scheduling, iTIP messaging, and HTTP RSVP settings.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Calendar & Contacts › Scheduling

## Fields

##### `enable`

> Type: `Boolean` · default: `true`
>
> Enables the scheduling features for calendar events, allowing users to send and receive invitations

##### `httpRsvpEnable`

> Type: `Boolean` · default: `true`
>
> Enables the HTTP RSVP feature for calendar invitations, allowing users to respond via a web interface.

##### `httpRsvpLinkExpiry`

> Type: `Duration` · default: `7776000000`
>
> Sets the expiration duration for HTTP RSVP links, after which they will no longer be valid.

##### `httpRsvpUrl`

> Type: `Uri?`
>
> Specifies a custom URL for the HTTP RSVP endpoint, where users can respond to calendar invitations.

##### `autoAddInvitations`

> Type: `Boolean` · default: `false`
>
> Automatically adds incoming invitations to the user's calendar.

##### `itipMaxSize`

> Type: `Size` · default: `524288` · min: 100
>
> Sets the maximum iCalendar object size for incoming iTIP messages.

##### `maxRecipients`

> Type: `UnsignedInt` · default: `100` · min: 1
>
> Sets the maximum number of recipients for outbound iTIP messages.

##### `emailTemplate`

> Type: `Html?` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> Specifies the HTML template used for rendering iMIP invitations.

##### `httpRsvpTemplate`

> Type: `Html?` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> Replaces the built-in HTTP RSVP page. The document is served verbatim and is responsible for calling the /api/calendar/rsvp endpoint itself.

## JMAP API

The CalendarScheduling singleton is available via the `urn:stalwart:jmap` capability.

### `x:CalendarScheduling/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysCalendarSchedulingGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:CalendarScheduling/get",
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

### `x:CalendarScheduling/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysCalendarSchedulingUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:CalendarScheduling/set",
          {
            "update": {
              "singleton": {
                "enable": true
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
stalwart-cli get CalendarScheduling
```

### Update

```sh
stalwart-cli update CalendarScheduling --field enable=true
```
