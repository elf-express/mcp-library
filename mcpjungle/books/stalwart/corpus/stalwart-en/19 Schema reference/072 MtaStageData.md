---
title: "MtaStageData"
source: https://stalw.art/docs/ref/object/mta-stage-data/
description: "Configures message processing rules for the SMTP DATA stage."
---

# MtaStageData

> Section: Schema reference › Objects

Configures message processing rules for the SMTP DATA stage.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Session › DATA Stage

## Fields

##### `addAuthResultsHeader`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Whether to add an Authentication-Results header to the message
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `addDateHeader`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Whether to add a Date header to the message
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `addDeliveredToHeader`

> Type: `Boolean` · default: `true`
>
> Whether to add a Delivered-To header to the message

##### `addMessageIdHeader`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Whether to add a Message-Id header to the message
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `addReceivedHeader`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Whether to add a Received header to the message
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `addReceivedSpfHeader`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Whether to add a Received-SPF header to the message
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `addReturnPathHeader`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Whether to add a Return-Path header to the message
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `maxMessages`

> Type: [`Expression`](#expression) · default: `{"else":"10"}`
>
> Maximum number of messages that can be submitted per SMTP session
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `maxReceivedHeaders`

> Type: [`Expression`](#expression) · default: `{"else":"50"}`
>
> Maximum limit on the number of Received headers, which helps to prevent message loops
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `maxMessageSize`

> Type: [`Expression`](#expression) · default: `{"else":"104857600"}`
>
> Maximum size of a message in bytes
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `script`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Which Sieve script to run after the client sends a DATA command
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `enableSpamFilter`

> Type: [`Expression`](#expression) · default: `{"else":"is_empty(authenticated_as)"}`
>
> Whether to enable the spam filter for incoming messages
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

## JMAP API

The MtaStageData singleton is available via the `urn:stalwart:jmap` capability.

### `x:MtaStageData/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysMtaStageDataGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaStageData/get",
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

### `x:MtaStageData/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysMtaStageDataUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaStageData/set",
          {
            "update": {
              "singleton": {
                "addAuthResultsHeader": {
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
stalwart-cli get MtaStageData
```

### Update

```sh
stalwart-cli update MtaStageData --field addAuthResultsHeader='{"else":"false"}'
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
