---
title: "SieveSystemInterpreter"
source: https://stalw.art/docs/ref/object/sieve-system-interpreter/
description: "Configures the system-level Sieve script interpreter settings and limits."
---

# SieveSystemInterpreter

> Section: Schema reference › Objects

Configures the system-level Sieve script interpreter settings and limits.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Sieve › System Interpreter

## Fields

##### `defaultFromAddress`

> Type: [`Expression`](#expression) · default: `{"else":"'MAILER-DAEMON@' + system('domain')"}`
>
> Default email address to use for the from field in email notifications sent from a Sieve script
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `defaultFromName`

> Type: [`Expression`](#expression) · default: `{"else":"'Automated Message'"}`
>
> Default name to use for the from field in email notifications sent from a Sieve script
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `messageIdHostname`

> Type: `String?`
>
> Override the default local hostname to use when generating a Message-Id header

##### `duplicateExpiry`

> Type: `Duration` · default: `604800000`
>
> Default expiration time for IDs stored by the duplicate extension from trusted scripts

##### `noCapabilityCheck`

> Type: `Boolean` · default: `true`
>
> If enabled, language extensions can be used without being explicitly declared using the require statement

##### `defaultReturnPath`

> Type: [`Expression`](#expression)
>
> Default return path to use in email notifications sent from a Sieve script
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `dkimSignDomain`

> Type: [`Expression`](#expression) · default: `{"else":"system('domain')"}`
>
> Which domain's DKIM signatures to use when signing the email notifications sent from a Sieve script
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `maxCpuCycles`

> Type: `UnsignedInt` · default: `1048576` · min: 1
>
> Maximum number CPU cycles a script can use

##### `maxNestedIncludes`

> Type: `UnsignedInt` · default: `5` · min: 1
>
> Maximum number of nested includes

##### `maxOutMessages`

> Type: `UnsignedInt` · default: `5`
>
> Maximum number of outgoing messages

##### `maxReceivedHeaders`

> Type: `UnsignedInt` · default: `50` · min: 1
>
> Maximum number of received headers

##### `maxRedirects`

> Type: `UnsignedInt` · default: `3`
>
> Maximum number of redirects

##### `maxVarSize`

> Type: `UnsignedInt` · default: `52428800` · min: 1
>
> Maximum size of a variable

## JMAP API

The SieveSystemInterpreter singleton is available via the `urn:stalwart:jmap` capability.

### `x:SieveSystemInterpreter/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysSieveSystemInterpreterGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SieveSystemInterpreter/get",
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

### `x:SieveSystemInterpreter/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysSieveSystemInterpreterUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SieveSystemInterpreter/set",
          {
            "update": {
              "singleton": {
                "messageIdHostname": "updated value"
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
stalwart-cli get SieveSystemInterpreter
```

### Update

```sh
stalwart-cli update SieveSystemInterpreter --field messageIdHostname='updated value'
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
