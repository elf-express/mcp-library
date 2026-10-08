---
title: "DsnReportSettings"
source: https://stalw.art/docs/ref/object/dsn-report-settings/
description: "Configures Delivery Status Notification (DSN) report generation."
---

# DsnReportSettings

> Section: Schema reference › Objects

Configures Delivery Status Notification (DSN) report generation.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Reports › DSN

## Fields

##### `fromAddress`

> Type: [`Expression`](#expression) · default: `{"else":"'MAILER-DAEMON@' + system('domain')"}`
>
> Email address that will be used in the From header of Delivery Status Notifications (DSN) reports
>
> Available variables: [`MtaQueueSenderVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-sender-variable).

##### `fromName`

> Type: [`Expression`](#expression) · default: `{"else":"'Mail Delivery Subsystem'"}`
>
> Name that will be used in the From header of Delivery Status Notifications (DSN) reports
>
> Available variables: [`MtaQueueSenderVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-sender-variable).

##### `dkimSignDomain`

> Type: [`Expression`](#expression) · default: `{"else":"system('domain')"}`
>
> Which domain's DKIM signatures to use when signing the Delivery Status Notifications
>
> Available variables: [`MtaQueueSenderVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-sender-variable).

## JMAP API

The DsnReportSettings singleton is available via the `urn:stalwart:jmap` capability.

### `x:DsnReportSettings/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysDsnReportSettingsGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DsnReportSettings/get",
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

### `x:DsnReportSettings/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysDsnReportSettingsUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DsnReportSettings/set",
          {
            "update": {
              "singleton": {
                "fromAddress": {
                  "else": "'MAILER-DAEMON@' + system('domain')"
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

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get DsnReportSettings
```

### Update

```sh
stalwart-cli update DsnReportSettings --field fromAddress='{"else":"'\''MAILER-DAEMON@'\'' + system('\''domain'\'')"}'
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

## Expression references

The following expression contexts are used by fields on this page:

- [`MtaQueueSenderVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-sender-variable) (Variables)
