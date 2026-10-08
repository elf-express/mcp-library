---
title: "Alert"
source: https://stalw.art/docs/ref/object/alert/
description: "Defines an alert rule triggered by metric conditions."
---

# Alert

> Section: Schema reference › Objects

Defines an alert rule triggered by metric conditions.

:::note[Enterprise feature]
This object is only available with an [Enterprise license](https://stalw.art/docs/server/enterprise).
:::

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Telemetry › Alerts

## Fields

##### `condition`

> Type: [`Expression`](#expression) · required
>
> The condition that triggers the alert.

##### `emailAlert`

> Type: [`AlertEmail`](#alertemail) · required
>
> Email notification settings

##### `eventAlert`

> Type: [`AlertEvent`](#alertevent) · required
>
> Event notification settings

##### `enable`

> Type: `Boolean` · default: `true`
>
> Enable or disable the alert

## JMAP API

The Alert object is available via the `urn:stalwart:jmap` capability.

### `x:Alert/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysAlertGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Alert/get",
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

### `x:Alert/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysAlertCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Alert/set",
          {
            "create": {
              "new1": {
                "condition": {
                  "else": "Example"
                },
                "emailAlert": {
                  "@type": "Disabled"
                },
                "eventAlert": {
                  "@type": "Disabled"
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

This operation requires the `sysAlertUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Alert/set",
          {
            "update": {
              "id1": {
                "condition": {
                  "else": "Example"
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

This operation requires the `sysAlertDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Alert/set",
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

### `x:Alert/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysAlertQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Alert/query",
          {
            "filter": {}
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
stalwart-cli get Alert id1
```

### Create

```sh
stalwart-cli create Alert \
  --field 'condition={"else":"Example"}' \
  --field 'emailAlert={"@type":"Disabled"}' \
  --field 'eventAlert={"@type":"Disabled"}'
```

### Query

```sh
stalwart-cli query Alert
```

### Update

```sh
stalwart-cli update Alert id1 --field condition='{"else":"Example"}'
```

### Delete

```sh
stalwart-cli delete Alert --ids id1
```

## Nested types

### Expression

A conditional expression with match rules and a default value.

##### `match`

> Type: `List<`[`ExpressionMatch`](#expressionmatch)`>`
>
> List of conditions and their corresponding results

##### `else`

> Type: `String` · required
>
> Else condition

#### ExpressionMatch

A single condition-result pair in an expression.

##### `if`

> Type: `String` · required
>
> If condition

##### `then`

> Type: `String` · required
>
> Then clause

### AlertEmail

Defines email notification settings for alerts.

- **`Disabled`**: Disabled. No additional fields.
- **`Enabled`**: Enabled. Carries the fields of [`AlertEmailProperties`](#alertemailproperties).

#### AlertEmailProperties

Alert email notification settings.

##### `body`

> Type: `Text` · required
>
> The body of the email

##### `fromAddress`

> Type: `EmailAddress` · required
>
> The email address of the sender

##### `fromName`

> Type: `String?`
>
> The name of the sender

##### `subject`

> Type: `String` · required
>
> The subject of the email

##### `to`

> Type: `Set<EmailAddress>` · min items: 1
>
> The email address of the recipient(s)

### AlertEvent

Defines event notification settings for alerts.

- **`Disabled`**: Disabled. No additional fields.
- **`Enabled`**: Enabled. Carries the fields of [`AlertEventProperties`](#alerteventproperties).

#### AlertEventProperties

Alert event notification settings.

##### `eventMessage`

> Type: `Text?`
>
> The message of the event to trigger
