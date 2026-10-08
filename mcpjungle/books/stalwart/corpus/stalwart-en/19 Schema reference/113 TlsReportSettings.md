---
title: "TlsReportSettings"
source: https://stalw.art/docs/ref/object/tls-report-settings/
description: "Configures TLS aggregate report generation."
---

# TlsReportSettings

> Section: Schema reference › Objects

Configures TLS aggregate report generation.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Reports › TLS

## Fields

##### `contactInfo`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Contact information to be included in the report
>
> Available variables: [`MtaQueueHostVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-host-variable).

##### `fromAddress`

> Type: [`Expression`](#expression) · default: `{"else":"'noreply-tls@' + system('domain')"}`
>
> Email address that will be used in the From header of the TLS aggregate report email
>
> Available variables: [`MtaQueueHostVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-host-variable).

##### `fromName`

> Type: [`Expression`](#expression) · default: `{"else":"'Report Subsystem'"}`
>
> Name that will be used in the From header of the TLS aggregate report email
>
> Available variables: [`MtaQueueHostVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-host-variable).

##### `maxReportSize`

> Type: [`Expression`](#expression) · default: `{"else":"5242880"}`
>
> Maximum size of the TLS aggregate report in bytes
>
> Available variables: [`MtaQueueHostVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-host-variable).

##### `orgName`

> Type: [`Expression`](#expression) · default: `{"else":"system('domain')"}`
>
> Name of the organization to be included in the report
>
> Available variables: [`MtaQueueHostVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-host-variable).

##### `sendFrequency`

> Type: [`Expression`](#expression) · default: `{"else":"daily"}`
>
> Frequency at which the TLS aggregate reports will be sent. The options are hourly, daily, weekly, or disable to disable reporting
>
> Available variables: [`MtaQueueHostVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-host-variable).
>
> Available constants: [`MtaAggregateConstant`](https://stalw.art/docs/ref/expression/constant/mta-aggregate-constant).

##### `dkimSignDomain`

> Type: [`Expression`](#expression) · default: `{"else":"system('domain')"}`
>
> Which domain's DKIM signatures to use when signing the TLS aggregate report
>
> Available variables: [`MtaQueueHostVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-host-variable).

##### `subject`

> Type: [`Expression`](#expression) · default: `{"else":"'TLS Aggregate Report'"}`
>
> Subject name that will be used in the TLS aggregate report email
>
> Available variables: [`MtaQueueHostVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-host-variable).

## JMAP API

The TlsReportSettings singleton is available via the `urn:stalwart:jmap` capability.

### `x:TlsReportSettings/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysTlsReportSettingsGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:TlsReportSettings/get",
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

### `x:TlsReportSettings/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysTlsReportSettingsUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:TlsReportSettings/set",
          {
            "update": {
              "singleton": {
                "contactInfo": {
                  "else": "false"
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
stalwart-cli get TlsReportSettings
```

### Update

```sh
stalwart-cli update TlsReportSettings --field contactInfo='{"else":"false"}'
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

- [`MtaQueueHostVariable`](https://stalw.art/docs/ref/expression/variable/mta-queue-host-variable) (Variables)
- [`MtaAggregateConstant`](https://stalw.art/docs/ref/expression/constant/mta-aggregate-constant) (Constants)
