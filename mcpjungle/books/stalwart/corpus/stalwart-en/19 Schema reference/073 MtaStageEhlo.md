---
title: "MtaStageEhlo"
source: https://stalw.art/docs/ref/object/mta-stage-ehlo/
description: "Configures EHLO command requirements and validation."
---

# MtaStageEhlo

> Section: Schema reference › Objects

Configures EHLO command requirements and validation.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Session › EHLO Stage

## Fields

##### `rejectNonFqdn`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Whether to reject EHLO commands that do not include a fully-qualified domain name as a parameter
>
> Available variables: [`MtaConnectionVariable`](https://stalw.art/docs/ref/expression/variable/mta-connection-variable).

##### `require`

> Type: [`Expression`](#expression) · default: `{"else":"true"}`
>
> Whether the remote client must send an EHLO command before starting an SMTP transaction
>
> Available variables: [`MtaConnectionVariable`](https://stalw.art/docs/ref/expression/variable/mta-connection-variable).

##### `script`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Which Sieve script to run after the client sends an EHLO command
>
> Available variables: [`MtaConnectionVariable`](https://stalw.art/docs/ref/expression/variable/mta-connection-variable).

## JMAP API

The MtaStageEhlo singleton is available via the `urn:stalwart:jmap` capability.

### `x:MtaStageEhlo/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysMtaStageEhloGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaStageEhlo/get",
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

### `x:MtaStageEhlo/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysMtaStageEhloUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaStageEhlo/set",
          {
            "update": {
              "singleton": {
                "rejectNonFqdn": {
                  "else": "false"
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
stalwart-cli get MtaStageEhlo
```

### Update

```sh
stalwart-cli update MtaStageEhlo --field rejectNonFqdn='{"else":"false"}'
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

- [`MtaConnectionVariable`](https://stalw.art/docs/ref/expression/variable/mta-connection-variable) (Variables)
