---
title: "MtaStageRcpt"
source: https://stalw.art/docs/ref/object/mta-stage-rcpt/
description: "Configures RCPT TO stage processing and recipient validation."
---

# MtaStageRcpt

> Section: Schema reference › Objects

Configures RCPT TO stage processing and recipient validation.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Session › RCPT TO Stage

## Fields

##### `maxFailures`

> Type: [`Expression`](#expression) · default: `{"else":"5"}`
>
> Maximum number of recipient errors before the session is disconnected
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `waitOnFail`

> Type: [`Expression`](#expression) · default: `{"else":"5s"}`
>
> Amount of time to wait after a recipient error
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `maxRecipients`

> Type: [`Expression`](#expression) · default: `{"else":"100"}`
>
> Maximum number of recipients per message
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `allowRelaying`

> Type: [`Expression`](#expression) · default: `{"else":"!is_empty(authenticated_as)"}`
>
> Whether to allow relaying for non-local domains
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `rewrite`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Expression to rewrite the recipient address
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `script`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Which Sieve script to run after the client sends a RCPT command
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

## JMAP API

The MtaStageRcpt singleton is available via the `urn:stalwart:jmap` capability.

### `x:MtaStageRcpt/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysMtaStageRcptGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaStageRcpt/get",
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

### `x:MtaStageRcpt/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysMtaStageRcptUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaStageRcpt/set",
          {
            "update": {
              "singleton": {
                "maxFailures": {
                  "else": "5"
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
stalwart-cli get MtaStageRcpt
```

### Update

```sh
stalwart-cli update MtaStageRcpt --field maxFailures='{"else":"5"}'
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
- [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable) (Variables)
