---
title: "Action"
source: https://stalw.art/docs/ref/object/action/
description: "Defines server management actions such as reloads, troubleshooting and cache operations."
---

# Action

> Section: Schema reference › Objects

Defines server management actions such as reloads, troubleshooting and cache operations.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Management › Actions

## Fields

Action is a **multi-variant** object: each instance has an `@type` discriminator selecting one of the variants below, and each variant carries its own set of fields.

### `@type: "ReloadSettings"`

Reload: Server settings

### `@type: "ReloadTlsCertificates"`

Reload: TLS certificates

### `@type: "ReloadLookupStores"`

Reload: Lookup stores

### `@type: "ReloadBlockedIps"`

Reload: Blocked IPs list

### `@type: "UpdateApps"`

Application Management: Update applications

### `@type: "TroubleshootDmarc"`

DMARC: Troubleshooting

##### `remoteIp`

> Type: `IpAddr` · required
>
> Remote IP address of the SMTP client

##### `ehloDomain`

> Type: `String` · required
>
> EHLO domain provided by the SMTP client

##### `mailFrom`

> Type: `EmailAddress` · required
>
> MAIL FROM address provided by the SMTP client

##### `to`

> Type: `Set<EmailAddress>`
>
> RCPT TO addresses provided by the SMTP client, used for DKIM2 envelope verification

##### `message`

> Type: `Text?`
>
> Body of the email message used for DMARC troubleshooting, if applicable

##### `spfEhloDomain`

> Type: `String` · required
>
> Domain used for SPF check based on EHLO domain

##### `spfEhloResult`

> Type: [`DmarcTroubleshootAuthResult`](#dmarctroubleshootauthresult) · server-set
>
> Result of the SPF check based on EHLO domain

##### `spfMailFromDomain`

> Type: `String` · required
>
> Domain used for SPF check based on MAIL FROM address

##### `spfMailFromResult`

> Type: [`DmarcTroubleshootAuthResult`](#dmarctroubleshootauthresult) · server-set
>
> Result of the SPF check based on MAIL FROM address

##### `ipRevResult`

> Type: [`DmarcTroubleshootAuthResult`](#dmarctroubleshootauthresult) · server-set
>
> Result of the reverse DNS check for the remote IP address

##### `ipRevPtr`

> Type: `Set<String>` · server-set
>
> PTR records returned by the reverse DNS lookup for the remote IP address

##### `dkimResults`

> Type: `List<`[`DmarcTroubleshootAuthResult`](#dmarctroubleshootauthresult)`>` · server-set
>
> Results of the DKIM signature verification checks

##### `dkimPass`

> Type: `Boolean` · server-set · default: `false`
>
> Whether the DKIM checks passed

##### `dkim2Result`

> Type: [`DmarcTroubleshootAuthResult`](#dmarctroubleshootauthresult) · server-set
>
> Result of the DKIM2 signature chain verification

##### `dkim2Pass`

> Type: `Boolean` · server-set · default: `false`
>
> Whether the DKIM2 checks passed

##### `arcResult`

> Type: [`DmarcTroubleshootAuthResult`](#dmarctroubleshootauthresult) · server-set
>
> Result of the ARC validation check

##### `dmarcResult`

> Type: [`DmarcTroubleshootAuthResult`](#dmarctroubleshootauthresult) · server-set
>
> Result of the DMARC check

##### `dmarcPass`

> Type: `Boolean` · server-set · default: `false`
>
> Whether the DMARC check passed

##### `dmarcPolicy`

> Type: [`DmarcDisposition`](#dmarcdisposition) · server-set
>
> DMARC policy applied to the email message

##### `elapsed`

> Type: `Duration` · server-set · default: `0`
>
> Time taken to perform the DMARC troubleshooting

### `@type: "ClassifySpam"`

Spam Filter: Classify a message

##### `message`

> Type: `Text` · required
>
> Raw email message to classify for spam

##### `remoteIp`

> Type: `IpAddr` · required
>
> Remote IP address of the SMTP client

##### `ehloDomain`

> Type: `String` · required
>
> EHLO domain provided by the SMTP client

##### `authenticatedAs`

> Type: `String?`
>
> Authentication identity of the SMTP client, if authenticated

##### `isTls`

> Type: `Boolean` · default: `true`
>
> Whether the SMTP connection is secured with TLS

##### `envFrom`

> Type: `EmailAddress` · required
>
> MAIL FROM address provided by the SMTP client

##### `envFromParameters`

> Type: [`SpamClassifyParameters`](#spamclassifyparameters)`?`
>
> Parameters related to the MAIL FROM address

##### `envRcptTo`

> Type: `Set<EmailAddress>`
>
> List of RCPT TO addresses provided by the SMTP client

##### `score`

> Type: `Float` · server-set · default: `0`
>
> Spam score for the classified message

##### `tags`

> Type: `Map<String, `[`SpamClassifyTag`](#spamclassifytag)`>` · server-set
>
> List of tags contributing to the spam classification of the message

##### `result`

> Type: [`SpamClassifyResult`](#spamclassifyresult) · server-set
>
> Overall spam classification result for the message

### `@type: "InvalidateCaches"`

Cache: Invalidate all caches

### `@type: "InvalidateNegativeCaches"`

Cache: Invalidate negative caches

### `@type: "PauseMtaQueue"`

MTA: Pause queue processing

### `@type: "ResumeMtaQueue"`

MTA: Resume queue processing

## JMAP API

The Action object is available via the `urn:stalwart:jmap` capability.

### `x:Action/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysActionGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Action/get",
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

### `x:Action/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysActionCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Action/set",
          {
            "create": {
              "new1": {
                "@type": "ReloadSettings"
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

This operation requires the `sysActionUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Action/set",
          {
            "update": {
              "id1": {
                "description": "updated value"
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

This operation requires the `sysActionDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Action/set",
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

### `x:Action/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysActionQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Action/query",
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
stalwart-cli get Action id1
```

### Create

```sh
stalwart-cli create Action/ReloadSettings
```

### Query

```sh
stalwart-cli query Action
```

### Update

```sh
stalwart-cli update Action id1 --field description='updated value'
```

### Delete

```sh
stalwart-cli delete Action --ids id1
```

## Nested types

### DmarcTroubleshootAuthResult

Authentication check result for DMARC troubleshooting.

- **`Pass`**: Pass. No additional fields.
- **`Fail`**: Fail. Carries the fields of [`DmarcTroubleshootDetails`](#dmarctroubleshootdetails).
- **`SoftFail`**: SoftFail. Carries the fields of [`DmarcTroubleshootDetails`](#dmarctroubleshootdetails).
- **`TempError`**: TempError. Carries the fields of [`DmarcTroubleshootDetails`](#dmarctroubleshootdetails).
- **`PermError`**: PermError. Carries the fields of [`DmarcTroubleshootDetails`](#dmarctroubleshootdetails).
- **`Neutral`**: Neutral. Carries the fields of [`DmarcTroubleshootDetails`](#dmarctroubleshootdetails).
- **`None`**: None. No additional fields.

#### DmarcTroubleshootDetails

Details for a failed authentication check.

##### `details`

> Type: `String?` · server-set
>
> Authentication result details

### SpamClassifyTag

A tag and score contributing to spam classification.

##### `score`

> Type: `Float` · server-set · default: `0`
>
> Score associated with the tag

##### `disposition`

> Type: [`SpamClassifyTagDisposition`](#spamclassifytagdisposition) · server-set
>
> Disposition associated with the tag

## Enums

### DmarcDisposition

| Value | Label |
|---|---|
| `none` | No specific action requested |
| `quarantine` | Treat failing messages as suspicious |
| `reject` | Reject failing messages |
| `unspecified` | Disposition not specified |

### SpamClassifyParameters

| Value | Label |
|---|---|
| `bit7` | 7-bit message content |
| `bit8Mime - 8-bit MIME message content` | bit8Mime - 8-bit MIME message content |
| `binaryMime` | Binary MIME message content |
| `smtpUtf8` | UTF-8 message content |

### SpamClassifyTagDisposition

| Value | Label |
|---|---|
| `score` | Assign the tag's score to the overall spam score |
| `reject` | Reject the message |
| `discard` | Discard the message |

### SpamClassifyResult

| Value | Label |
|---|---|
| `spam` | Classify as spam |
| `ham` | Classify as non-spam (ham) |
| `reject` | Reject message |
| `discard` | Discard message |
