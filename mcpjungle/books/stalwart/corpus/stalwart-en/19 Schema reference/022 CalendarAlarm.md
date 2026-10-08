---
title: "CalendarAlarm"
source: https://stalw.art/docs/ref/object/calendar-alarm/
description: "Configures calendar alarm email notifications."
---

# CalendarAlarm

> Section: Schema reference › Objects

Configures calendar alarm email notifications.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Calendar & Contacts › Alarms

## Fields

##### `allowExternalRcpts`

> Type: `Boolean` · default: `false`
>
> Allows calendar alarms to be sent to external recipients, enabling notifications to users outside the server

##### `enable`

> Type: `Boolean` · default: `true`
>
> Enables the calendar alarms feature, allowing users to set alarms for events and receive notifications via e-mail

##### `fromEmail`

> Type: `EmailAddress?`
>
> Specifies the e-mail address that will appear in the 'From' field of calendar alarm e-mails, ensuring that users can reply to or contact the sender

##### `fromName`

> Type: `String` · default: `"Stalwart Calendar"`
>
> Specifies the name that will appear in the 'From' field of calendar alarm e-mails, providing a recognizable sender name for users

##### `minTriggerInterval`

> Type: `Duration` · default: `3600000`
>
> Specifies the minimum interval for calendar alarms, ensuring that alarms are not triggered too frequently

##### `template`

> Type: `Html?` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> Specifies the HTML template used for rendering calendar alarm e-mails, allowing customization of the alarm notification format

## JMAP API

The CalendarAlarm singleton is available via the `urn:stalwart:jmap` capability.

### `x:CalendarAlarm/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysCalendarAlarmGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:CalendarAlarm/get",
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

### `x:CalendarAlarm/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysCalendarAlarmUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:CalendarAlarm/set",
          {
            "update": {
              "singleton": {
                "fromName": "updated value"
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
stalwart-cli get CalendarAlarm
```

### Update

```sh
stalwart-cli update CalendarAlarm --field fromName='updated value'
```
