---
title: "TlsExternalReport"
source: https://stalw.art/docs/ref/object/tls-external-report/
description: "Stores a TLS aggregate report received from an external source."
---

# TlsExternalReport

> Section: Schema reference › Objects

Stores a TLS aggregate report received from an external source.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Management › Reports › Inbox › TLS

## Fields

##### `report`

> Type: [`TlsReport`](#tlsreport) · required
>
> TLS report content

##### `from`

> Type: `EmailAddress` · required
>
> Email address of the report sender

##### `subject`

> Type: `String` · required
>
> Subject line of the report email

##### `to`

> Type: `Set<EmailAddress>`
>
> List of recipient email addresses

##### `receivedAt`

> Type: `UTCDateTime` · required
>
> When the report email was received

##### `expiresAt`

> Type: `UTCDateTime` · required
>
> When the report is scheduled to be deleted

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> Identifier for the tenant this report belongs to

## JMAP API

The TlsExternalReport object is available via the `urn:stalwart:jmap` capability.

### `x:TlsExternalReport/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysTlsExternalReportGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:TlsExternalReport/get",
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

### `x:TlsExternalReport/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysTlsExternalReportCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:TlsExternalReport/set",
          {
            "create": {
              "new1": {
                "expiresAt": "2026-01-01T00:00:00Z",
                "from": "user@example.com",
                "receivedAt": "2026-01-01T00:00:00Z",
                "report": {
                  "dateRangeEnd": "2026-01-01T00:00:00Z",
                  "dateRangeStart": "2026-01-01T00:00:00Z",
                  "policies": {},
                  "reportId": "Example"
                },
                "subject": "Example",
                "to": {}
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

This operation requires the `sysTlsExternalReportUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:TlsExternalReport/set",
          {
            "update": {
              "id1": {
                "subject": "updated value"
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

This operation requires the `sysTlsExternalReportDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:TlsExternalReport/set",
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

### `x:TlsExternalReport/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysTlsExternalReportQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:TlsExternalReport/query",
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
stalwart-cli get TlsExternalReport id1
```

### Create

```sh
stalwart-cli create TlsExternalReport \
  --field 'report={"dateRangeEnd":"2026-01-01T00:00:00Z","dateRangeStart":"2026-01-01T00:00:00Z","policies":{},"reportId":"Example"}' \
  --field from=user@example.com \
  --field subject=Example \
  --field 'to={}' \
  --field receivedAt=2026-01-01T00:00:00Z \
  --field expiresAt=2026-01-01T00:00:00Z
```

### Query

```sh
stalwart-cli query TlsExternalReport
```

### Update

```sh
stalwart-cli update TlsExternalReport id1 --field subject='updated value'
```

### Delete

```sh
stalwart-cli delete TlsExternalReport --ids id1
```

## Nested types

### TlsReport

Content of a TLS aggregate report.

##### `organizationName`

> Type: `String?`
>
> Name of the organization that generated the report

##### `contactInfo`

> Type: `String?`
>
> Contact information for the reporting organization

##### `reportId`

> Type: `String` · required
>
> Unique identifier for this report

##### `dateRangeStart`

> Type: `UTCDateTime` · required
>
> Start of the reporting period

##### `dateRangeEnd`

> Type: `UTCDateTime` · required
>
> End of the reporting period

##### `policies`

> Type: `List<`[`TlsReportPolicy`](#tlsreportpolicy)`>`
>
> Policy evaluation results for each domain

#### TlsReportPolicy

TLS policy evaluation result for a specific domain.

##### `policyType`

> Type: [`TlsPolicyType`](#tlspolicytype) · required
>
> Type of TLS policy that was evaluated

##### `policyStrings`

> Type: `Set<String>`
>
> Raw policy strings as retrieved

##### `policyDomain`

> Type: `DomainName` · required
>
> Domain the policy applies to

##### `mxHosts`

> Type: `Set<String>`
>
> MX hostnames covered by the policy

##### `totalSuccessfulSessions`

> Type: `UnsignedInt` · default: `0`
>
> Number of sessions that successfully established TLS

##### `totalFailedSessions`

> Type: `UnsignedInt` · default: `0`
>
> Number of sessions that failed TLS establishment

##### `failureDetails`

> Type: `List<`[`TlsFailureDetails`](#tlsfailuredetails)`>`
>
> Details of TLS failures encountered

##### TlsFailureDetails

Details of a TLS failure encountered during delivery.

##### `resultType`

> Type: [`TlsResultType`](#tlsresulttype) · required
>
> Type of failure encountered

##### `sendingMtaIp`

> Type: `IpAddr?`
>
> IP address of the sending mail server

##### `receivingMxHostname`

> Type: `String?`
>
> Hostname of the receiving mail server

##### `receivingMxHelo`

> Type: `String?`
>
> HELO/EHLO string of the receiving mail server

##### `receivingIp`

> Type: `IpAddr?`
>
> IP address of the receiving mail server

##### `failedSessionCount`

> Type: `UnsignedInt` · default: `0`
>
> Number of sessions that failed with this error

##### `additionalInformation`

> Type: `String?`
>
> Additional context about the failure

##### `failureReasonCode`

> Type: `String?`
>
> Error code or reason string for the failure

## Enums

### TlsPolicyType

| Value | Label |
|---|---|
| `tlsa` | DANE TLSA policy |
| `sts` | MTA-STS policy |
| `noPolicyFound` | No TLS policy was found for the domain |
| `other` | Other or unrecognized policy type |

### TlsResultType

| Value | Label |
|---|---|
| `startTlsNotSupported` | Remote server does not support STARTTLS |
| `certificateHostMismatch` | Certificate hostname does not match server |
| `certificateExpired` | Certificate has expired |
| `certificateNotTrusted` | Certificate is not trusted |
| `validationFailure` | General certificate validation failure |
| `tlsaInvalid` | DANE TLSA record is invalid |
| `dnssecInvalid` | DNSSEC validation failed |
| `daneRequired` | DANE is required but not available |
| `stsPolicyFetchError` | Failed to fetch MTA-STS policy |
| `stsPolicyInvalid` | MTA-STS policy is invalid |
| `stsWebpkiInvalid` | MTA-STS WebPKI validation failed |
| `other` | Other or unrecognized failure type |
