---
title: "MtaStageMail"
source: https://stalw.art/docs/ref/object/mta-stage-mail/
description: "Configures MAIL FROM stage processing and sender validation."
---

# MtaStageMail

> Section: Schema reference › Objects

Configures MAIL FROM stage processing and sender validation.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Session › MAIL FROM Stage

## Fields

##### `isSenderAllowed`

> Type: [`Expression`](#expression) · default: `{"else":"!is_empty(authenticated_as) || !key_exists('spam-block', sender_domain)"}`
>
> Expression that returns true when the sender is allowed to send
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `rewrite`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Expression to rewrite the sender address
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `script`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Which Sieve script to run after the client sends a MAIL command
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

## JMAP API

The MtaStageMail singleton is available via the `urn:stalwart:jmap` capability.

### `x:MtaStageMail/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysMtaStageMailGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaStageMail/get",
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

### `x:MtaStageMail/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysMtaStageMailUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaStageMail/set",
          {
            "update": {
              "singleton": {
                "isSenderAllowed": {
                  "else": "!is_empty(authenticated_as) || !key_exists('spam-block', sender_domain)"
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
stalwart-cli get MtaStageMail
```

### Update

```sh
stalwart-cli update MtaStageMail --field isSenderAllowed='{"else":"!is_empty(authenticated_as) || !key_exists('\''spam-block'\'', sender_domain)"}'
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
