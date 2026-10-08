---
title: "SpamRule"
source: https://stalw.art/docs/ref/object/spam-rule/
description: "Defines a spam filter rule for message classification."
---

# SpamRule

> Section: Schema reference › Objects

Defines a spam filter rule for message classification.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Spam Filter › Rules

## Fields

SpamRule is a **multi-variant** object: each instance has an `@type` discriminator selecting one of the variants below, and each variant carries its own set of fields.

### `@type: "Any"`

Any

##### `condition`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the tag to assign to the message.
>
> Available variables: [`SpamGenericVariable`](https://stalw.art/docs/ref/expression/variable/spam-generic-variable).

##### `name`

> Type: `String` · read-only
>
> Short name for the rule

##### `description`

> Type: `String?`
>
> Description for the rule

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this rule

##### `priority`

> Type: `Integer` · default: `500` · max: 99999 · min: -99999
>
> The priority of the rule

### `@type: "Url"`

URL

##### `condition`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the tag to assign to the message.
>
> Available variables: [`SpamUrlVariable`](https://stalw.art/docs/ref/expression/variable/spam-url-variable).

##### `name`

> Type: `String` · read-only
>
> Short name for the rule

##### `description`

> Type: `String?`
>
> Description for the rule

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this rule

##### `priority`

> Type: `Integer` · default: `500` · max: 99999 · min: -99999
>
> The priority of the rule

### `@type: "Domain"`

Domain

##### `condition`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the tag to assign to the message.
>
> Available variables: [`SpamGenericVariable`](https://stalw.art/docs/ref/expression/variable/spam-generic-variable).

##### `name`

> Type: `String` · read-only
>
> Short name for the rule

##### `description`

> Type: `String?`
>
> Description for the rule

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this rule

##### `priority`

> Type: `Integer` · default: `500` · max: 99999 · min: -99999
>
> The priority of the rule

### `@type: "Email"`

E-mail

##### `condition`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the tag to assign to the message.
>
> Available variables: [`SpamEmailVariable`](https://stalw.art/docs/ref/expression/variable/spam-email-variable).

##### `name`

> Type: `String` · read-only
>
> Short name for the rule

##### `description`

> Type: `String?`
>
> Description for the rule

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this rule

##### `priority`

> Type: `Integer` · default: `500` · max: 99999 · min: -99999
>
> The priority of the rule

### `@type: "Ip"`

IP

##### `condition`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the tag to assign to the message.
>
> Available variables: [`SpamIpVariable`](https://stalw.art/docs/ref/expression/variable/spam-ip-variable).

##### `name`

> Type: `String` · read-only
>
> Short name for the rule

##### `description`

> Type: `String?`
>
> Description for the rule

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this rule

##### `priority`

> Type: `Integer` · default: `500` · max: 99999 · min: -99999
>
> The priority of the rule

### `@type: "Header"`

Header

##### `condition`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the tag to assign to the message.
>
> Available variables: [`SpamHeaderVariable`](https://stalw.art/docs/ref/expression/variable/spam-header-variable).

##### `name`

> Type: `String` · read-only
>
> Short name for the rule

##### `description`

> Type: `String?`
>
> Description for the rule

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this rule

##### `priority`

> Type: `Integer` · default: `500` · max: 99999 · min: -99999
>
> The priority of the rule

### `@type: "Body"`

Body

##### `condition`

> Type: [`Expression`](#expression) · required
>
> Expression that returns the tag to assign to the message.
>
> Available variables: [`SpamGenericVariable`](https://stalw.art/docs/ref/expression/variable/spam-generic-variable).

##### `name`

> Type: `String` · read-only
>
> Short name for the rule

##### `description`

> Type: `String?`
>
> Description for the rule

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this rule

##### `priority`

> Type: `Integer` · default: `500` · max: 99999 · min: -99999
>
> The priority of the rule

## JMAP API

The SpamRule object is available via the `urn:stalwart:jmap` capability.

### `x:SpamRule/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysSpamRuleGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamRule/get",
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

### `x:SpamRule/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysSpamRuleCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamRule/set",
          {
            "create": {
              "new1": {
                "@type": "Any",
                "condition": {
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

This operation requires the `sysSpamRuleUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamRule/set",
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

This operation requires the `sysSpamRuleDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamRule/set",
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

### `x:SpamRule/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysSpamRuleQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamRule/query",
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

The `x:SpamRule/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `name` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get SpamRule id1
```

### Create

```sh
stalwart-cli create SpamRule/Any \
  --field 'condition={"else":"Example"}'
```

### Query

```sh
stalwart-cli query SpamRule
stalwart-cli query SpamRule --where name=example
```

### Update

```sh
stalwart-cli update SpamRule id1 --field description='updated value'
```

### Delete

```sh
stalwart-cli delete SpamRule --ids id1
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

- [`SpamGenericVariable`](https://stalw.art/docs/ref/expression/variable/spam-generic-variable) (Variables)
- [`SpamUrlVariable`](https://stalw.art/docs/ref/expression/variable/spam-url-variable) (Variables)
- [`SpamEmailVariable`](https://stalw.art/docs/ref/expression/variable/spam-email-variable) (Variables)
- [`SpamIpVariable`](https://stalw.art/docs/ref/expression/variable/spam-ip-variable) (Variables)
- [`SpamHeaderVariable`](https://stalw.art/docs/ref/expression/variable/spam-header-variable) (Variables)
