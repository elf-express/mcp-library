---
title: "MailingList"
source: https://stalw.art/docs/ref/object/mailing-list/
description: "Defines a mailing list that distributes messages to a group of recipients."
---

# MailingList

> Section: Schema reference › Objects

Defines a mailing list that distributes messages to a group of recipients.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Management › Directory › Mailing Lists

## Fields

##### `name`

> Type: `EmailLocalPart` · required
>
> Name of the mailing list, typically an email address local part.

##### `domainId`

> Type: `Id<`[`Domain`](https://stalw.art/docs/ref/object/domain)`>` · required
>
> Identifier for the domain this mailing list belongs to. This is used to determine the email address of the mailing list, which is formed as name@domain.

##### `emailAddress`

> Type: `EmailAddress` · server-set
>
> The email address of the mailing list, formed as name@domain.

##### `description`

> Type: `String?`
>
> Description of the mailing list

##### `aliases`

> Type: `List<`[`EmailAlias`](#emailalias)`>`
>
> List of email aliases for the mailing list

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this mailing list belongs to

##### `recipients`

> Type: `Set<EmailAddress>`
>
> List of email addresses that are members of the mailing list

## JMAP API

The MailingList object is available via the `urn:stalwart:jmap` capability.

### `x:MailingList/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysMailingListGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MailingList/get",
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

### `x:MailingList/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysMailingListCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MailingList/set",
          {
            "create": {
              "new1": {
                "aliases": {},
                "domainId": "<Domain id>",
                "name": "alice",
                "recipients": {}
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

This operation requires the `sysMailingListUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MailingList/set",
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

This operation requires the `sysMailingListDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MailingList/set",
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

### `x:MailingList/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysMailingListQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MailingList/query",
          {
            "filter": {
              "text": "example"
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

The `x:MailingList/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `text` | text |
| `memberTenantId` | id of Tenant |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get MailingList id1
```

### Create

```sh
stalwart-cli create MailingList \
  --field name=alice \
  --field 'domainId=<Domain id>' \
  --field 'aliases={}' \
  --field 'recipients={}'
```

### Query

```sh
stalwart-cli query MailingList
stalwart-cli query MailingList --where text=example
```

### Update

```sh
stalwart-cli update MailingList id1 --field description='updated value'
```

### Delete

```sh
stalwart-cli delete MailingList --ids id1
```

## Nested types

### EmailAlias

Defines an email alias for an account or mailing list.

##### `enabled`

> Type: `Boolean` · default: `true`
>
> Whether this email alias is enabled

##### `name`

> Type: `EmailLocalPart` · required
>
> The local part of the email alias (the part before the @ symbol)

##### `domainId`

> Type: `Id<`[`Domain`](https://stalw.art/docs/ref/object/domain)`>` · required
>
> Identifier for the domain of the email alias (the part after the @ symbol).

##### `description`

> Type: `String?`
>
> Description of the email alias
