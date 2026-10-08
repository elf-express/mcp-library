---
title: "DmarcInternalReport"
source: https://stalw.art/docs/ref/object/dmarc-internal-report/
description: "Stores an outbound DMARC aggregate report pending delivery."
---

# DmarcInternalReport

> Section: Schema reference › Objects

Stores an outbound DMARC aggregate report pending delivery.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Management › Reports › Outbox › DMARC

## Fields

##### `rua`

> Type: `Set<EmailAddress>`
>
> Reporting email addresses from the DMARC policy

##### `policyIdentifier`

> Type: `UnsignedInt` · default: `0`
>
> Identifier for the DMARC policy that generated this report

##### `report`

> Type: [`DmarcReport`](#dmarcreport) · required
>
> DMARC report content

##### `domain`

> Type: `DomainName` · required
>
> Domain this report is associated with

##### `createdAt`

> Type: `UTCDateTime` · required
>
> When the report was created

##### `deliverAt`

> Type: `UTCDateTime` · required
>
> When the report is scheduled to be delivered

## JMAP API

The DmarcInternalReport object is available via the `urn:stalwart:jmap` capability.

### `x:DmarcInternalReport/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysDmarcInternalReportGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DmarcInternalReport/get",
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

### `x:DmarcInternalReport/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysDmarcInternalReportCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DmarcInternalReport/set",
          {
            "create": {
              "new1": {
                "createdAt": "2026-01-01T00:00:00Z",
                "deliverAt": "2026-01-01T00:00:00Z",
                "domain": "example.com",
                "report": {
                  "dateRangeBegin": "2026-01-01T00:00:00Z",
                  "dateRangeEnd": "2026-01-01T00:00:00Z",
                  "email": "user@example.com",
                  "errors": {},
                  "extensions": {},
                  "orgName": "Example",
                  "policyAdkim": "relaxed",
                  "policyAspf": "relaxed",
                  "policyDisposition": "none",
                  "policyDomain": "Example",
                  "policyFailureReportingOptions": {},
                  "policySubdomainDisposition": "none",
                  "records": {},
                  "reportId": "Example"
                },
                "rua": {}
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

This operation requires the `sysDmarcInternalReportUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DmarcInternalReport/set",
          {
            "update": {
              "id1": {
                "rua": {}
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

This operation requires the `sysDmarcInternalReportDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DmarcInternalReport/set",
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

### `x:DmarcInternalReport/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysDmarcInternalReportQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DmarcInternalReport/query",
          {
            "filter": {
              "domain": "example"
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

The `x:DmarcInternalReport/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `domain` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get DmarcInternalReport id1
```

### Create

```sh
stalwart-cli create DmarcInternalReport \
  --field 'rua={}' \
  --field 'report={"dateRangeBegin":"2026-01-01T00:00:00Z","dateRangeEnd":"2026-01-01T00:00:00Z","email":"user@example.com","errors":{},"extensions":{},"orgName":"Example","policyAdkim":"relaxed","policyAspf":"relaxed","policyDisposition":"none","policyDomain":"Example","policyFailureReportingOptions":{},"policySubdomainDisposition":"none","records":{},"reportId":"Example"}' \
  --field domain=example.com \
  --field createdAt=2026-01-01T00:00:00Z \
  --field deliverAt=2026-01-01T00:00:00Z
```

### Query

```sh
stalwart-cli query DmarcInternalReport
stalwart-cli query DmarcInternalReport --where domain=example
```

### Update

```sh
stalwart-cli update DmarcInternalReport id1 --field rua='{}'
```

### Delete

```sh
stalwart-cli delete DmarcInternalReport --ids id1
```

## Nested types

### DmarcReport

Content of a DMARC aggregate report.

##### `version`

> Type: `Float` · default: `1.0`
>
> DMARC report format version

##### `orgName`

> Type: `String` · required
>
> Name of the organization that generated the report

##### `email`

> Type: `EmailAddress` · required
>
> Contact email address of the reporting organization

##### `extraContactInfo`

> Type: `String?`
>
> Additional contact information for the reporting organization

##### `reportId`

> Type: `String` · required
>
> Unique identifier for this report

##### `dateRangeBegin`

> Type: `UTCDateTime` · required
>
> Start of the reporting period

##### `dateRangeEnd`

> Type: `UTCDateTime` · required
>
> End of the reporting period

##### `errors`

> Type: `Set<String>`
>
> Errors encountered during report generation

##### `policyDomain`

> Type: `String` · required
>
> Domain for which the DMARC policy is published

##### `policyVersion`

> Type: `String?`
>
> Version of the published DMARC policy

##### `policyAdkim`

> Type: [`DmarcAlignment`](#dmarcalignment) · required
>
> DKIM alignment mode specified in the policy

##### `policyAspf`

> Type: [`DmarcAlignment`](#dmarcalignment) · required
>
> SPF alignment mode specified in the policy

##### `policyDisposition`

> Type: [`DmarcDisposition`](#dmarcdisposition) · required
>
> Requested handling policy for failing messages

##### `policySubdomainDisposition`

> Type: [`DmarcDisposition`](#dmarcdisposition) · required
>
> Requested handling policy for failing messages from subdomains

##### `policyTestingMode`

> Type: `Boolean` · default: `false`
>
> Whether the policy is in testing mode

##### `policyFailureReportingOptions`

> Type: `Set<`[`FailureReportingOption`](#failurereportingoption)`>`
>
> Conditions under which failure reports should be generated

##### `records`

> Type: `List<`[`DmarcReportRecord`](#dmarcreportrecord)`>`
>
> Aggregated authentication results grouped by source

##### `extensions`

> Type: `List<`[`DmarcExtension`](#dmarcextension)`>`
>
> Custom vendor-specific extensions to the report

##### `generator`

> Type: `String?`
>
> Name and version of the software that generated the report

##### `policyNp`

> Type: [`DmarcDisposition`](#dmarcdisposition) · default: `"unspecified"`
>
> Requested handling policy for failing messages from non-existent subdomains

##### `policyDiscoveryMethod`

> Type: [`DmarcDiscovery`](#dmarcdiscovery) · default: `"unspecified"`
>
> Method used to discover the DMARC policy record

#### DmarcReportRecord

An aggregated authentication result record from a single source.

##### `sourceIp`

> Type: `IpAddr?`
>
> IP address of the sending mail server

##### `count`

> Type: `UnsignedInt` · default: `0`
>
> Number of messages from this source matching this result

##### `evaluatedDisposition`

> Type: [`DmarcActionDisposition`](#dmarcactiondisposition) · required
>
> Action taken on the messages

##### `evaluatedDkim`

> Type: [`DmarcResult`](#dmarcresult) · required
>
> DMARC result based on DKIM authentication

##### `evaluatedSpf`

> Type: [`DmarcResult`](#dmarcresult) · required
>
> DMARC result based on SPF authentication

##### `policyOverrideReasons`

> Type: `List<`[`DmarcPolicyOverrideReason`](#dmarcpolicyoverridereason)`>`
>
> Reasons why the evaluated disposition differs from the published policy

##### `envelopeTo`

> Type: `String?`
>
> Envelope recipient domain

##### `envelopeFrom`

> Type: `String` · required
>
> Envelope sender domain (MAIL FROM)

##### `headerFrom`

> Type: `String` · required
>
> Domain from the message From header

##### `dkimResults`

> Type: `List<`[`DmarcDkimResult`](#dmarcdkimresult)`>`
>
> DKIM authentication results for the messages

##### `spfResults`

> Type: `List<`[`DmarcSpfResult`](#dmarcspfresult)`>`
>
> SPF authentication results for the messages

##### `extensions`

> Type: `List<`[`DmarcExtension`](#dmarcextension)`>`
>
> Custom vendor-specific extensions to this record

##### DmarcPolicyOverrideReason

Reason for a DMARC policy override.

##### `overrideType`

> Type: [`DmarcPolicyOverride`](#dmarcpolicyoverride) · required
>
> Type of policy override applied

##### `comment`

> Type: `String?`
>
> Additional explanation for the override

##### DmarcDkimResult

DKIM authentication result within a DMARC report record.

##### `domain`

> Type: `DomainName` · required
>
> Domain that signed the message

##### `selector`

> Type: `String` · required
>
> DKIM selector used for signing

##### `result`

> Type: [`DkimAuthResult`](#dkimauthresult) · required
>
> DKIM verification result

##### `humanResult`

> Type: `String?`
>
> Human-readable explanation of the result

##### DmarcSpfResult

SPF authentication result within a DMARC report record.

##### `domain`

> Type: `DomainName` · required
>
> Domain checked for SPF

##### `scope`

> Type: [`SpfDomainScope`](#spfdomainscope) · required
>
> Which identity was checked

##### `result`

> Type: [`SpfAuthResult`](#spfauthresult) · required
>
> SPF verification result

##### `humanResult`

> Type: `String?`
>
> Human-readable explanation of the result

##### DmarcExtension

A vendor-specific extension in a DMARC report.

##### `name`

> Type: `String` · required
>
> Extension identifier

##### `definition`

> Type: `String` · required
>
> Extension content or value

## Enums

### DmarcAlignment

| Value | Label |
|---|---|
| `relaxed` | Organizational domain match is sufficient |
| `strict` | Exact domain match is required |
| `unspecified` | Alignment mode not specified |

### DmarcDisposition

| Value | Label |
|---|---|
| `none` | No specific action requested |
| `quarantine` | Treat failing messages as suspicious |
| `reject` | Reject failing messages |
| `unspecified` | Disposition not specified |

### FailureReportingOption

| Value | Label |
|---|---|
| `all` | Generate report if all authentication mechanisms fail |
| `any` | Generate report if any authentication mechanism fails |
| `dkimFailure` | Generate report if DKIM authentication fails |
| `spfFailure` | Generate report if SPF authentication fails |

### DmarcActionDisposition

| Value | Label |
|---|---|
| `none` | No action taken |
| `pass` | Message passed evaluation |
| `quarantine` | Message was quarantined |
| `reject` | Message was rejected |
| `unspecified` | Disposition not specified |

### DmarcResult

| Value | Label |
|---|---|
| `pass` | Authentication passed |
| `fail` | Authentication failed |
| `unspecified` | Result not specified |

### DmarcPolicyOverride

| Value | Label |
|---|---|
| `Forwarded` | Message was forwarded |
| `SampledOut` | Message was excluded by policy sampling (pct) |
| `TrustedForwarder` | Message came from a trusted forwarder |
| `MailingList` | Message came from a mailing list |
| `LocalPolicy` | Local policy override was applied |
| `Other` | Other reason for override |
| `PolicyTestMode` | Message exempted because the DMARC policy is in test mode |

### DkimAuthResult

| Value | Label |
|---|---|
| `none` | No DKIM signature present |
| `pass` | DKIM signature verified successfully |
| `fail` | DKIM signature verification failed |
| `policy` | DKIM signature not accepted due to policy |
| `neutral` | DKIM verification returned neutral |
| `tempError` | Temporary error during verification |
| `permError` | Permanent error in DKIM record or signature |

### SpfDomainScope

| Value | Label |
|---|---|
| `helo` | SPF check performed on HELO/EHLO identity |
| `mailFrom` | SPF check performed on MAIL FROM identity |
| `unspecified` | Scope not specified |

### SpfAuthResult

| Value | Label |
|---|---|
| `none` | No SPF record found |
| `neutral` | SPF record returned neutral |
| `pass` | SPF check passed |
| `fail` | SPF check failed (hard fail) |
| `softFail` | SPF check returned soft fail |
| `tempError` | Temporary error during SPF check |
| `permError` | Permanent error in SPF record |

### DmarcDiscovery

| Value | Label |
|---|---|
| `psl` | Public Suffix List method (RFC 7489) |
| `treewalk` | DNS Tree Walk method (RFC 9989) |
| `unspecified` | Discovery method not specified |
