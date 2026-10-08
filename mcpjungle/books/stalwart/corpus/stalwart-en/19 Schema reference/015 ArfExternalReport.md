---
title: "ArfExternalReport"
source: https://stalw.art/docs/ref/object/arf-external-report/
description: "Stores an ARF feedback report received from an external source."
---

# ArfExternalReport

> Section: Schema reference › Objects

Stores an ARF feedback report received from an external source.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Management › Reports › Inbox › ARF

## Fields

##### `report`

> Type: [`ArfFeedbackReport`](#arffeedbackreport) · required
>
> Parsed ARF feedback report content

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

The ArfExternalReport object is available via the `urn:stalwart:jmap` capability.

### `x:ArfExternalReport/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysArfExternalReportGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ArfExternalReport/get",
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

### `x:ArfExternalReport/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysArfExternalReportCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ArfExternalReport/set",
          {
            "create": {
              "new1": {
                "expiresAt": "2026-01-01T00:00:00Z",
                "from": "user@example.com",
                "receivedAt": "2026-01-01T00:00:00Z",
                "report": {
                  "authFailure": "adsp",
                  "authenticationResults": {},
                  "deliveryResult": "delivered",
                  "feedbackType": "abuse",
                  "identityAlignment": "none",
                  "reportedDomains": {},
                  "reportedUris": {}
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

This operation requires the `sysArfExternalReportUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ArfExternalReport/set",
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

This operation requires the `sysArfExternalReportDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ArfExternalReport/set",
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

### `x:ArfExternalReport/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysArfExternalReportQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ArfExternalReport/query",
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
stalwart-cli get ArfExternalReport id1
```

### Create

```sh
stalwart-cli create ArfExternalReport \
  --field 'report={"authFailure":"adsp","authenticationResults":{},"deliveryResult":"delivered","feedbackType":"abuse","identityAlignment":"none","reportedDomains":{},"reportedUris":{}}' \
  --field from=user@example.com \
  --field subject=Example \
  --field 'to={}' \
  --field receivedAt=2026-01-01T00:00:00Z \
  --field expiresAt=2026-01-01T00:00:00Z
```

### Query

```sh
stalwart-cli query ArfExternalReport
```

### Update

```sh
stalwart-cli update ArfExternalReport id1 --field subject='updated value'
```

### Delete

```sh
stalwart-cli delete ArfExternalReport --ids id1
```

## Nested types

### ArfFeedbackReport

Parsed content of an ARF feedback report.

##### `feedbackType`

> Type: [`ArfFeedbackType`](#arffeedbacktype) · required
>
> Type of feedback being reported

##### `arrivalDate`

> Type: `UTCDateTime?`
>
> When the original message arrived

##### `authenticationResults`

> Type: `Set<String>`
>
> Authentication-Results header values from the original message

##### `incidents`

> Type: `UnsignedInt` · default: `0`
>
> Number of incidents represented by this report

##### `originalEnvelopeId`

> Type: `String?`
>
> Original SMTP envelope ID (ENVID)

##### `originalMailFrom`

> Type: `EmailAddress?`
>
> Original envelope sender address (MAIL FROM)

##### `originalRcptTo`

> Type: `EmailAddress?`
>
> Original envelope recipient address (RCPT TO)

##### `reportedDomains`

> Type: `Set<DomainName>`
>
> Domains being reported

##### `reportedUris`

> Type: `Set<Uri>`
>
> URIs being reported

##### `reportingMta`

> Type: `String?`
>
> Hostname of the MTA generating this report

##### `sourceIp`

> Type: `IpAddr?`
>
> IP address of the original message source

##### `sourcePort`

> Type: `UnsignedInt?` · min: 1 · max: 65535
>
> Port of the original message source

##### `userAgent`

> Type: `String?`
>
> Software that generated this report

##### `version`

> Type: `UnsignedInt` · default: `1`
>
> ARF format version

##### `authFailure`

> Type: [`ArfAuthFailureType`](#arfauthfailuretype) · required
>
> Type of authentication failure (for auth-failure reports)

##### `deliveryResult`

> Type: [`ArfDeliveryResult`](#arfdeliveryresult) · required
>
> What happened to the original message

##### `dkimAdspDns`

> Type: `String?`
>
> DKIM ADSP DNS record content

##### `dkimCanonicalizedBody`

> Type: `String?`
>
> Message body after DKIM canonicalization

##### `dkimCanonicalizedHeader`

> Type: `String?`
>
> Message headers after DKIM canonicalization

##### `dkimDomain`

> Type: `String?`
>
> Domain from the DKIM signature

##### `dkimIdentity`

> Type: `String?`
>
> Identity from the DKIM signature (i= tag)

##### `dkimSelector`

> Type: `String?`
>
> Selector from the DKIM signature

##### `dkimSelectorDns`

> Type: `String?`
>
> DKIM selector DNS record content

##### `spfDns`

> Type: `String?`
>
> SPF DNS record content

##### `identityAlignment`

> Type: [`ArfIdentityAlignment`](#arfidentityalignment) · required
>
> Which identities were aligned

##### `message`

> Type: `String?`
>
> Original message content that triggered the report

##### `headers`

> Type: `String?`
>
> Original message headers that triggered the report

## Enums

### ArfFeedbackType

| Value | Label |
|---|---|
| `abuse` | Message was reported as abusive or unwanted |
| `authFailure` | Message failed authentication checks |
| `fraud` | Message was reported as fraudulent |
| `notSpam` | Message was incorrectly classified as spam |
| `virus` | Message contained a virus |
| `other` | Other feedback type |

### ArfAuthFailureType

| Value | Label |
|---|---|
| `adsp` | DKIM ADSP policy failure |
| `bodyHash` | DKIM body hash verification failed |
| `revoked` | DKIM key has been revoked |
| `signature` | DKIM signature verification failed |
| `spf` | SPF authentication failed |
| `dmarc` | DMARC authentication failed |
| `unspecified` | Authentication failure type not specified |

### ArfDeliveryResult

| Value | Label |
|---|---|
| `delivered` | Message was delivered to recipient |
| `spam` | Message was delivered to spam folder |
| `policy` | Message was handled according to policy |
| `reject` | Message was rejected |
| `other` | Other delivery result |
| `unspecified` | Delivery result not specified |

### ArfIdentityAlignment

| Value | Label |
|---|---|
| `none` | No identity alignment |
| `spf` | SPF identity aligned |
| `dkim` | DKIM identity aligned |
| `dkimSpf` | Both DKIM and SPF identities aligned |
| `unspecified` | Identity alignment not specified |
