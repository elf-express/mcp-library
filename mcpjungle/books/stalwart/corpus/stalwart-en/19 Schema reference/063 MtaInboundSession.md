---
title: "MtaInboundSession"
source: https://stalw.art/docs/ref/object/mta-inbound-session/
description: "Configures inbound SMTP session timeouts and transfer limits."
---

# MtaInboundSession

> Section: Schema reference › Objects

Configures inbound SMTP session timeouts and transfer limits.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Inbound › Session

## Fields

##### `maxDuration`

> Type: [`Expression`](#expression) · default: `{"else":"10m"}`
>
> The maximum duration of a session
>
> Available variables: [`MtaConnectionVariable`](https://stalw.art/docs/ref/expression/variable/mta-connection-variable).

##### `timeout`

> Type: [`Expression`](#expression) · default: `{"else":"5m"}`
>
> How long to wait for a client to send a command before timing out
>
> Available variables: [`MtaConnectionVariable`](https://stalw.art/docs/ref/expression/variable/mta-connection-variable).

##### `transferLimit`

> Type: [`Expression`](#expression) · default: `{"else":"262144000"}`
>
> The maximum number of bytes that can be transferred per session
>
> Available variables: [`MtaConnectionVariable`](https://stalw.art/docs/ref/expression/variable/mta-connection-variable).

## JMAP API

The MtaInboundSession singleton is available via the `urn:stalwart:jmap` capability.

### `x:MtaInboundSession/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysMtaInboundSessionGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaInboundSession/get",
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

### `x:MtaInboundSession/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysMtaInboundSessionUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaInboundSession/set",
          {
            "update": {
              "singleton": {
                "maxDuration": {
                  "else": "10m"
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
stalwart-cli get MtaInboundSession
```

### Update

```sh
stalwart-cli update MtaInboundSession --field maxDuration='{"else":"10m"}'
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
