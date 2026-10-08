---
title: "SpfReportSettings"
source: https://stalw.art/docs/ref/object/spf-report-settings/
description: "Configures SPF authentication failure report generation."
---

# SpfReportSettings

> Section: Schema reference › Objects

Configures SPF authentication failure report generation.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Reports › SPF

## Fields

##### `fromAddress`

> Type: [`Expression`](#expression) · default: `{"else":"'noreply-spf@' + system('domain')"}`
>
> Email address that will be used in the From header of the SPF authentication failure report email
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `fromName`

> Type: [`Expression`](#expression) · default: `{"else":"'Report Subsystem'"}`
>
> Name that will be used in the From header of the SPF authentication failure report email
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `sendFrequency`

> Type: [`Expression`](#expression) · default: `{"else":"[1, 1d]"}`
>
> Rate at which SPF reports will be sent to a given email address. When this rate is exceeded, no further SPF failure reports will be sent to that address
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `dkimSignDomain`

> Type: [`Expression`](#expression) · default: `{"else":"system('domain')"}`
>
> Which domain's DKIM signatures to use when signing the SPF authentication failure report
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `subject`

> Type: [`Expression`](#expression) · default: `{"else":"'SPF Authentication Failure Report'"}`
>
> Subject name that will be used in the SPF authentication failure report email
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

## JMAP API

The SpfReportSettings singleton is available via the `urn:stalwart:jmap` capability.

### `x:SpfReportSettings/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysSpfReportSettingsGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpfReportSettings/get",
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

### `x:SpfReportSettings/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysSpfReportSettingsUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpfReportSettings/set",
          {
            "update": {
              "singleton": {
                "fromAddress": {
                  "else": "'noreply-spf@' + system('domain')"
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
stalwart-cli get SpfReportSettings
```

### Update

```sh
stalwart-cli update SpfReportSettings --field fromAddress='{"else":"'\''noreply-spf@'\'' + system('\''domain'\'')"}'
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

- [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable) (Variables)
