---
title: "MtaStageConnect"
source: https://stalw.art/docs/ref/object/mta-stage-connect/
description: "Configures SMTP connection greeting and hostname settings."
---

# MtaStageConnect

> Section: Schema reference › Objects

Configures SMTP connection greeting and hostname settings.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Session › Connect Stage

## Fields

##### `smtpGreeting`

> Type: [`Expression`](#expression) · default: `{"else":"system('hostname') + ' Stalwart ESMTP at your service'"}`
>
> The greeting message sent by the SMTP/LMTP server
>
> Available variables: [`MtaConnectionVariable`](https://stalw.art/docs/ref/expression/variable/mta-connection-variable).

##### `hostname`

> Type: [`Expression`](#expression) · default: `{"else":"system('hostname')"}`
>
> The SMTP server hostname
>
> Available variables: [`MtaConnectionVariable`](https://stalw.art/docs/ref/expression/variable/mta-connection-variable).

##### `script`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Which Sieve script to run when a client connects
>
> Available variables: [`MtaConnectionVariable`](https://stalw.art/docs/ref/expression/variable/mta-connection-variable).

## JMAP API

The MtaStageConnect singleton is available via the `urn:stalwart:jmap` capability.

### `x:MtaStageConnect/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysMtaStageConnectGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaStageConnect/get",
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

### `x:MtaStageConnect/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysMtaStageConnectUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaStageConnect/set",
          {
            "update": {
              "singleton": {
                "smtpGreeting": {
                  "else": "system('hostname') + ' Stalwart ESMTP at your service'"
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
stalwart-cli get MtaStageConnect
```

### Update

```sh
stalwart-cli update MtaStageConnect --field smtpGreeting='{"else":"system('\''hostname'\'') + '\'' Stalwart ESMTP at your service'\''"}'
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
