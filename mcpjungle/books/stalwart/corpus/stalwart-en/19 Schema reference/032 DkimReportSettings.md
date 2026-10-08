---
title: "DkimReportSettings"
source: https://stalw.art/docs/ref/object/dkim-report-settings/
description: "Configures DKIM authentication failure report generation."
---

# DkimReportSettings

> Section: Schema reference › Objects

Configures DKIM authentication failure report generation.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Reports › DKIM

## Fields

##### `fromAddress`

> Type: [`Expression`](#expression) · default: `{"else":"'noreply-dkim@' + system('domain')"}`
>
> Email address that will be used in the From header of the DKIM report email
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `fromName`

> Type: [`Expression`](#expression) · default: `{"else":"'Report Subsystem'"}`
>
> Name that will be used in the From header of the DKIM report email
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `sendFrequency`

> Type: [`Expression`](#expression) · default: `{"else":"[1, 1d]"}`
>
> Rate at which DKIM reports will be sent to a given email address. When this rate is exceeded, no further DKIM failure reports will be sent to that address
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `dkimSignDomain`

> Type: [`Expression`](#expression) · default: `{"else":"system('domain')"}`
>
> Which domain's DKIM signatures to use when signing the DKIM report
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `subject`

> Type: [`Expression`](#expression) · default: `{"else":"'DKIM Authentication Failure Report'"}`
>
> Subject name that will be used in the DKIM report email
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

## JMAP API

The DkimReportSettings singleton is available via the `urn:stalwart:jmap` capability.

### `x:DkimReportSettings/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysDkimReportSettingsGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DkimReportSettings/get",
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

### `x:DkimReportSettings/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysDkimReportSettingsUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DkimReportSettings/set",
          {
            "update": {
              "singleton": {
                "fromAddress": {
                  "else": "'noreply-dkim@' + system('domain')"
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
stalwart-cli get DkimReportSettings
```

### Update

```sh
stalwart-cli update DkimReportSettings --field fromAddress='{"else":"'\''noreply-dkim@'\'' + system('\''domain'\'')"}'
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

- [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable) (Variables)
