---
title: "MtaStageAuth"
source: https://stalw.art/docs/ref/object/mta-stage-auth/
description: "Configures SMTP authentication requirements and error handling."
---

# MtaStageAuth

> Section: Schema reference › Objects

Configures SMTP authentication requirements and error handling.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Session › AUTH Stage

## Fields

##### `maxFailures`

> Type: [`Expression`](#expression) · default: `{"else":"3"}`
>
> Maximum number of authentication errors allowed before the session is disconnected
>
> Available variables: [`MtaEhloVariable`](https://stalw.art/docs/ref/expression/variable/mta-ehlo-variable).

##### `waitOnFail`

> Type: [`Expression`](#expression) · default: `{"else":"5s"}`
>
> Time interval to wait after an authentication failure
>
> Available variables: [`MtaEhloVariable`](https://stalw.art/docs/ref/expression/variable/mta-ehlo-variable).

##### `saslMechanisms`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> A list of SASL authentication mechanisms offered to clients, or an empty list to disable authentication. Stalwart supports PLAIN, LOGIN, and OAUTHBEARER mechanisms
>
> Available variables: [`MtaEhloVariable`](https://stalw.art/docs/ref/expression/variable/mta-ehlo-variable).
>
> Available constants: [`MtaAuthTypeConstant`](https://stalw.art/docs/ref/expression/constant/mta-auth-type-constant).

##### `mustMatchSender`

> Type: [`Expression`](#expression) · default: `{"else":"true"}`
>
> Specifies whether the authenticated user or any of their associated e-mail addresses must match the sender of the email message
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `require`

> Type: [`Expression`](#expression) · default: `{"else":"local_port != 25"}`
>
> Specifies whether authentication is necessary to send email messages
>
> Available variables: [`MtaEhloVariable`](https://stalw.art/docs/ref/expression/variable/mta-ehlo-variable).

## JMAP API

The MtaStageAuth singleton is available via the `urn:stalwart:jmap` capability.

### `x:MtaStageAuth/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysMtaStageAuthGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaStageAuth/get",
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

### `x:MtaStageAuth/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysMtaStageAuthUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaStageAuth/set",
          {
            "update": {
              "singleton": {
                "maxFailures": {
                  "else": "3"
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
stalwart-cli get MtaStageAuth
```

### Update

```sh
stalwart-cli update MtaStageAuth --field maxFailures='{"else":"3"}'
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

- [`MtaEhloVariable`](https://stalw.art/docs/ref/expression/variable/mta-ehlo-variable) (Variables)
- [`MtaAuthTypeConstant`](https://stalw.art/docs/ref/expression/constant/mta-auth-type-constant) (Constants)
- [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable) (Variables)
