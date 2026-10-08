---
title: "SenderAuth"
source: https://stalw.art/docs/ref/object/sender-auth/
description: "Configures sender authentication verification including DKIM, SPF, DMARC, and ARC."
---

# SenderAuth

> Section: Schema reference › Objects

Configures sender authentication verification including DKIM, SPF, DMARC, and ARC.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Inbound › Sender Authentication

## Fields

##### `dkimSignDomain`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Domain to use for DKIM signing
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `dkimStrict`

> Type: `Boolean` · default: `true`
>
> Whether to ignore insecure DKIM signatures such as those containing a length parameter

##### `dkimVerify`

> Type: [`Expression`](#expression) · default: `{"else":"relaxed"}`
>
> Whether DKIM verification is strict, relaxed or disabled
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).
>
> Available constants: [`MtaVerifyConstant`](https://stalw.art/docs/ref/expression/constant/mta-verify-constant).

##### `spfEhloVerify`

> Type: [`Expression`](#expression) · default: `{"else":"disable"}`
>
> Whether SPF EHLO verification is strict, relaxed or disabled
>
> Available variables: [`MtaConnectionVariable`](https://stalw.art/docs/ref/expression/variable/mta-connection-variable).
>
> Available constants: [`MtaVerifyConstant`](https://stalw.art/docs/ref/expression/constant/mta-verify-constant).

##### `spfFromVerify`

> Type: [`Expression`](#expression) · default: `{"else":"disable"}`
>
> Whether SPF MAIL FROM verification is strict, relaxed or disabled
>
> Available variables: [`MtaConnectionVariable`](https://stalw.art/docs/ref/expression/variable/mta-connection-variable).
>
> Available constants: [`MtaVerifyConstant`](https://stalw.art/docs/ref/expression/constant/mta-verify-constant).

##### `arcVerify`

> Type: [`Expression`](#expression) · default: `{"else":"disable"}`
>
> Whether ARC verification is strict, relaxed or disabled.
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).
>
> Available constants: [`MtaVerifyConstant`](https://stalw.art/docs/ref/expression/constant/mta-verify-constant).

##### `dmarcVerify`

> Type: [`Expression`](#expression) · default: `{"else":"disable"}`
>
> Whether DMARC verification is strict, relaxed or disabled
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).
>
> Available constants: [`MtaVerifyConstant`](https://stalw.art/docs/ref/expression/constant/mta-verify-constant).

##### `reverseIpVerify`

> Type: [`Expression`](#expression) · default: `{"else":"disable"}`
>
> How strict to be when verifying the reverse DNS of the client IP
>
> Available variables: [`MtaConnectionVariable`](https://stalw.art/docs/ref/expression/variable/mta-connection-variable).
>
> Available constants: [`MtaVerifyConstant`](https://stalw.art/docs/ref/expression/constant/mta-verify-constant).

## JMAP API

The SenderAuth singleton is available via the `urn:stalwart:jmap` capability.

### `x:SenderAuth/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysSenderAuthGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SenderAuth/get",
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

### `x:SenderAuth/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysSenderAuthUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SenderAuth/set",
          {
            "update": {
              "singleton": {
                "dkimSignDomain": {
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
stalwart-cli get SenderAuth
```

### Update

```sh
stalwart-cli update SenderAuth --field dkimSignDomain='{"else":"false"}'
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

- [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable) (Variables)
- [`MtaVerifyConstant`](https://stalw.art/docs/ref/expression/constant/mta-verify-constant) (Constants)
- [`MtaConnectionVariable`](https://stalw.art/docs/ref/expression/variable/mta-connection-variable) (Variables)
