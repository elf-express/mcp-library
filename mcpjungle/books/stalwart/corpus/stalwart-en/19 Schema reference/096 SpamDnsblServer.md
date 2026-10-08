---
title: "SpamDnsblServer"
source: https://stalw.art/docs/ref/object/spam-dnsbl-server/
description: "Defines a DNSBL server used for spam filtering lookups."
---

# SpamDnsblServer

> Section: Schema reference › Objects

Defines a DNSBL server used for spam filtering lookups.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Spam Filter › DNSBL › Servers

## Fields

SpamDnsblServer is a **multi-variant** object: each instance has an `@type` discriminator selecting one of the variants below, and each variant carries its own set of fields.

### `@type: "Any"`

Any

##### `tag`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the tag to assign to the message.
>
> Available variables: [`SpamIpVariable`](https://stalw.art/docs/ref/expression/variable/spam-ip-variable).

##### `zone`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the DNS zone to query.
>
> Available variables: [`SpamGenericVariable`](https://stalw.art/docs/ref/expression/variable/spam-generic-variable).

##### `name`

> Type: `String` · read-only
>
> A unique name for this DNSBL server configuration

##### `description`

> Type: `String?`
>
> Description for the DNSBL server

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this DNSBL server

### `@type: "Url"`

URL

##### `tag`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the tag to assign to the message.
>
> Available variables: [`SpamIpVariable`](https://stalw.art/docs/ref/expression/variable/spam-ip-variable).

##### `zone`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the DNS zone to query.
>
> Available variables: [`SpamUrlVariable`](https://stalw.art/docs/ref/expression/variable/spam-url-variable).

##### `name`

> Type: `String` · read-only
>
> A unique name for this DNSBL server configuration

##### `description`

> Type: `String?`
>
> Description for the DNSBL server

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this DNSBL server

### `@type: "Domain"`

Domain

##### `tag`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the tag to assign to the message.
>
> Available variables: [`SpamIpVariable`](https://stalw.art/docs/ref/expression/variable/spam-ip-variable).

##### `zone`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the DNS zone to query.
>
> Available variables: [`SpamGenericVariable`](https://stalw.art/docs/ref/expression/variable/spam-generic-variable).

##### `name`

> Type: `String` · read-only
>
> A unique name for this DNSBL server configuration

##### `description`

> Type: `String?`
>
> Description for the DNSBL server

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this DNSBL server

### `@type: "Email"`

E-mail

##### `tag`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the tag to assign to the message.
>
> Available variables: [`SpamIpVariable`](https://stalw.art/docs/ref/expression/variable/spam-ip-variable).

##### `zone`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the DNS zone to query.
>
> Available variables: [`SpamEmailVariable`](https://stalw.art/docs/ref/expression/variable/spam-email-variable).

##### `name`

> Type: `String` · read-only
>
> A unique name for this DNSBL server configuration

##### `description`

> Type: `String?`
>
> Description for the DNSBL server

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this DNSBL server

### `@type: "Ip"`

IP

##### `tag`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the tag to assign to the message.
>
> Available variables: [`SpamIpVariable`](https://stalw.art/docs/ref/expression/variable/spam-ip-variable).

##### `zone`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the DNS zone to query.
>
> Available variables: [`SpamIpVariable`](https://stalw.art/docs/ref/expression/variable/spam-ip-variable).

##### `name`

> Type: `String` · read-only
>
> A unique name for this DNSBL server configuration

##### `description`

> Type: `String?`
>
> Description for the DNSBL server

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this DNSBL server

### `@type: "Header"`

Header

##### `tag`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the tag to assign to the message.
>
> Available variables: [`SpamIpVariable`](https://stalw.art/docs/ref/expression/variable/spam-ip-variable).

##### `zone`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the DNS zone to query.
>
> Available variables: [`SpamHeaderVariable`](https://stalw.art/docs/ref/expression/variable/spam-header-variable).

##### `name`

> Type: `String` · read-only
>
> A unique name for this DNSBL server configuration

##### `description`

> Type: `String?`
>
> Description for the DNSBL server

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this DNSBL server

### `@type: "Body"`

Body

##### `tag`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the tag to assign to the message.
>
> Available variables: [`SpamIpVariable`](https://stalw.art/docs/ref/expression/variable/spam-ip-variable).

##### `zone`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the DNS zone to query.
>
> Available variables: [`SpamGenericVariable`](https://stalw.art/docs/ref/expression/variable/spam-generic-variable).

##### `name`

> Type: `String` · read-only
>
> A unique name for this DNSBL server configuration

##### `description`

> Type: `String?`
>
> Description for the DNSBL server

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this DNSBL server

## JMAP API

The SpamDnsblServer object is available via the `urn:stalwart:jmap` capability.

### `x:SpamDnsblServer/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysSpamDnsblServerGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamDnsblServer/get",
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

### `x:SpamDnsblServer/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysSpamDnsblServerCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamDnsblServer/set",
          {
            "create": {
              "new1": {
                "@type": "Any",
                "tag": {
                  "else": "Example"
                },
                "zone": {
                  "else": "Example"
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

#### Update

This operation requires the `sysSpamDnsblServerUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamDnsblServer/set",
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

This operation requires the `sysSpamDnsblServerDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamDnsblServer/set",
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

### `x:SpamDnsblServer/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysSpamDnsblServerQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamDnsblServer/query",
          {
            "filter": {
              "name": "example"
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

The `x:SpamDnsblServer/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `name` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get SpamDnsblServer id1
```

### Create

```sh
stalwart-cli create SpamDnsblServer/Any \
  --field 'tag={"else":"Example"}' \
  --field 'zone={"else":"Example"}'
```

### Query

```sh
stalwart-cli query SpamDnsblServer
stalwart-cli query SpamDnsblServer --where name=example
```

### Update

```sh
stalwart-cli update SpamDnsblServer id1 --field description='updated value'
```

### Delete

```sh
stalwart-cli delete SpamDnsblServer --ids id1
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

- [`SpamIpVariable`](https://stalw.art/docs/ref/expression/variable/spam-ip-variable) (Variables)
- [`SpamGenericVariable`](https://stalw.art/docs/ref/expression/variable/spam-generic-variable) (Variables)
- [`SpamUrlVariable`](https://stalw.art/docs/ref/expression/variable/spam-url-variable) (Variables)
- [`SpamEmailVariable`](https://stalw.art/docs/ref/expression/variable/spam-email-variable) (Variables)
- [`SpamHeaderVariable`](https://stalw.art/docs/ref/expression/variable/spam-header-variable) (Variables)
