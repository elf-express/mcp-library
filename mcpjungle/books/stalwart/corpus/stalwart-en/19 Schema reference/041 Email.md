---
title: "Email"
source: https://stalw.art/docs/ref/object/email/
description: "Configures email message limits, encryption, compression, and default folder settings."
---

# Email

> Section: Schema reference › Objects

Configures email message limits, encryption, compression, and default folder settings.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Email › Defaults Settings › Email › Encryption Settings › Email › Limits Settings › Email › Storage

## Fields

##### `maxAttachmentSize`

> Type: `Size` · default: `50000000` · min: 1
>
> Specifies the maximum size for an email attachment

##### `maxMessageSize`

> Type: `Size` · default: `75000000` · min: 1
>
> Determines the maximum size for an email message

##### `maxMailboxDepth`

> Type: `UnsignedInt` · default: `10` · min: 1
>
> Restricts the maximum depth of nested mailboxes a user can create

##### `maxMailboxNameLength`

> Type: `UnsignedInt` · default: `255` · min: 1
>
> Establishes the maximum length of a mailbox name

##### `encryptOnAppend`

> Type: `Boolean` · default: `false`
>
> Encrypt messages that are manually appended by the user using JMAP or IMAP

##### `encryptAtRest`

> Type: `Boolean` · default: `true`
>
> Allow users to configure encryption at rest for their data

##### `compressionAlgorithm`

> Type: [`CompressionAlgo`](#compressionalgo) · default: `"lz4"`
>
> Algorithm to use to compress e-mail data

##### `defaultFolders`

> Type: `Map<`[`SpecialUse`](#specialuse)`, `[`EmailFolder`](#emailfolder)`>`
>
> Default special-use folders to create for new users

##### `maxMessages`

> Type: `UnsignedInt?` · min: 1
>
> The default maximum number of emails a user can create

##### `maxSubmissions`

> Type: `UnsignedInt?` · default: `500` · min: 1
>
> The default maximum number of email submissions a user can create

##### `maxIdentities`

> Type: `UnsignedInt?` · default: `20` · min: 1
>
> The default maximum number of identities a user can create

##### `maxMailboxes`

> Type: `UnsignedInt?` · default: `250` · min: 1
>
> The default maximum number of mailboxes a user can create

##### `maxMaskedAddresses`

> Type: `UnsignedInt?` · [enterprise](https://stalw.art/docs/server/enterprise) · default: `5` · min: 1
>
> The default maximum number of masked email addresses a user can create

##### `maxPublicKeys`

> Type: `UnsignedInt?` · default: `5` · min: 1
>
> The default maximum number of encryption-at-rest public keys a user can create

## JMAP API

The Email singleton is available via the `urn:stalwart:jmap` capability.

### `x:Email/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysEmailGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Email/get",
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

### `x:Email/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysEmailUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Email/set",
          {
            "update": {
              "singleton": {
                "maxAttachmentSize": 50000000
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
stalwart-cli get Email
```

### Update

```sh
stalwart-cli update Email --field maxAttachmentSize=50000000
```

## Nested types

### EmailFolder

Defines a default email folder configuration.

##### `name`

> Type: `String` · required
>
> Default name for the folder

##### `create`

> Type: `Boolean` · default: `true`
>
> Whether to create the folder automatically

##### `subscribe`

> Type: `Boolean` · default: `true`
>
> Whether to subscribe to the folder automatically

##### `aliases`

> Type: `Set<String>`
>
> List of folder aliases

## Enums

### CompressionAlgo

| Value | Label |
|---|---|
| `lz4` | LZ4 |
| `none` | None |

### SpecialUse

| Value | Label |
|---|---|
| `inbox` | Inbox |
| `trash` | Trash |
| `junk` | Junk |
| `drafts` | Drafts |
| `archive` | Archive |
| `sent` | Sent |
| `shared` | Shared Folders |
| `important` | Important |
| `memos` | Memos |
| `scheduled` | Scheduled |
| `snoozed` | Snoozed |
