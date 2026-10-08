---
title: "DmarcReportSettings"
source: https://stalw.art/docs/ref/object/dmarc-report-settings/
description: "Configures DMARC aggregate and failure report generation."
---

# DmarcReportSettings

> Section: Schema reference › Objects

Configures DMARC aggregate and failure report generation.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Reports › DMARC

## Fields

##### `aggregateContactInfo`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Contact information to be included in the report
>
> Available variables: [`MtaRcptDomainVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-domain-variable).

##### `aggregateFromAddress`

> Type: [`Expression`](#expression) · default: `{"else":"'noreply-dmarc@' + system('domain')"}`
>
> Email address that will be used in the From header of the DMARC aggregate report email
>
> Available variables: [`MtaRcptDomainVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-domain-variable).

##### `aggregateFromName`

> Type: [`Expression`](#expression) · default: `{"else":"'Report Subsystem'"}`
>
> Name that will be used in the From header of the DMARC aggregate report email
>
> Available variables: [`MtaRcptDomainVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-domain-variable).

##### `aggregateMaxReportSize`

> Type: [`Expression`](#expression) · default: `{"else":"5242880"}`
>
> Maximum size of the DMARC aggregate report in bytes
>
> Available variables: [`MtaRcptDomainVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-domain-variable).

##### `aggregateOrgName`

> Type: [`Expression`](#expression) · default: `{"else":"system('domain')"}`
>
> Name of the organization to be included in the report
>
> Available variables: [`MtaRcptDomainVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-domain-variable).

##### `aggregateSendFrequency`

> Type: [`Expression`](#expression) · default: `{"else":"daily"}`
>
> Frequency at which the DMARC aggregate reports will be sent. The options are hourly, daily, weekly, or disable to disable reporting
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).
>
> Available constants: [`MtaAggregateConstant`](https://stalw.art/docs/ref/expression/constant/mta-aggregate-constant).

##### `aggregateDkimSignDomain`

> Type: [`Expression`](#expression) · default: `{"else":"system('domain')"}`
>
> Which domain's DKIM signatures to use when signing the DMARC aggregate report
>
> Available variables: [`MtaRcptDomainVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-domain-variable).

##### `aggregateSubject`

> Type: [`Expression`](#expression) · default: `{"else":"'DMARC Aggregate Report'"}`
>
> Subject name that will be used in the DMARC aggregate report email
>
> Available variables: [`MtaRcptDomainVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-domain-variable).

##### `failureFromAddress`

> Type: [`Expression`](#expression) · default: `{"else":"'noreply-dmarc@' + system('domain')"}`
>
> Email address that will be used in the From header of the DMARC authentication failure report email
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `failureFromName`

> Type: [`Expression`](#expression) · default: `{"else":"'Report Subsystem'"}`
>
> Name that will be used in the From header of the DMARC report email
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `failureSendFrequency`

> Type: [`Expression`](#expression) · default: `{"else":"[1, 1d]"}`
>
> Rate at which DMARC reports will be sent to a given email address. When this rate is exceeded, no further DMARC failure reports will be sent to that address
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `failureDkimSignDomain`

> Type: [`Expression`](#expression) · default: `{"else":"system('domain')"}`
>
> Which domain's DKIM signatures to use when signing the DMARC authentication failure report
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `failureSubject`

> Type: [`Expression`](#expression) · default: `{"else":"'DMARC Authentication Failure Report'"}`
>
> Subject name that will be used in the DMARC authentication failure report email
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

## JMAP API

The DmarcReportSettings singleton is available via the `urn:stalwart:jmap` capability.

### `x:DmarcReportSettings/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysDmarcReportSettingsGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DmarcReportSettings/get",
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

### `x:DmarcReportSettings/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysDmarcReportSettingsUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DmarcReportSettings/set",
          {
            "update": {
              "singleton": {
                "aggregateContactInfo": {
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
stalwart-cli get DmarcReportSettings
```

### Update

```sh
stalwart-cli update DmarcReportSettings --field aggregateContactInfo='{"else":"false"}'
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

- [`MtaRcptDomainVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-domain-variable) (Variables)
- [`MtaAggregateConstant`](https://stalw.art/docs/ref/expression/constant/mta-aggregate-constant) (Constants)
- [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable) (Variables)
