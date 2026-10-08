---
title: "ReportSettings"
source: https://stalw.art/docs/ref/object/report-settings/
description: "Configures inbound report analysis and outbound report settings."
---

# ReportSettings

> Section: Schema reference › Objects

Configures inbound report analysis and outbound report settings.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Reports › General

## Fields

##### `inboundReportAddresses`

> Type: `Set<String>` · default: `{"postmaster@*":true}`
>
> List of addresses (which may include wildcards) from which reports will be intercepted and analyzed

##### `inboundReportForwarding`

> Type: `Boolean` · default: `true`
>
> Whether reports should be forwarded to their final recipient after analysis

##### `outboundReportDomain`

> Type: `DomainName?`
>
> The default domain name used for DSNs and other reports. If left empty, the default domain will be used.

##### `outboundReportSubmitter`

> Type: [`Expression`](#expression) · default: `{"else":"system('hostname')"}`
>
> Report submitter address or leave empty to use the default hostname
>
> Available variables: [`MtaRcptDomainVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-domain-variable).

##### `inboundReportMaxSize`

> Type: `Integer` · default: `26214400` · min: 1024
>
> Maximum size of inbound reports to be intercepted and analyzed, in bytes. Reports larger than this size will be ignored

## JMAP API

The ReportSettings singleton is available via the `urn:stalwart:jmap` capability.

### `x:ReportSettings/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysReportSettingsGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ReportSettings/get",
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

### `x:ReportSettings/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysReportSettingsUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ReportSettings/set",
          {
            "update": {
              "singleton": {
                "inboundReportAddresses": {
                  "postmaster@*": true
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
stalwart-cli get ReportSettings
```

### Update

```sh
stalwart-cli update ReportSettings --field inboundReportAddresses='{"postmaster@*":true}'
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
