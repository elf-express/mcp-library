---
title: "MtaExtensions"
source: https://stalw.art/docs/ref/object/mta-extensions/
description: "Configures SMTP protocol extensions offered to clients."
---

# MtaExtensions

> Section: Schema reference › Objects

Configures SMTP protocol extensions offered to clients.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Session › Extensions

## Fields

##### `chunking`

> Type: [`Expression`](#expression) · default: `{"else":"true"}`
>
> Enables chunking (RFC 1830), an extension that allows large messages to be transferred in chunks which may reduce the load on the network and server.
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `deliverBy`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Specifies the maximum delivery time for a message using the DELIVERBY (RFC 2852) extension, which allows the sender to request a specific delivery time for a message
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `dsn`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Enables delivery status notifications (RFC 3461), which allows the sender to request a delivery status notification (DSN) from the recipient's mail server
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `expn`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Specifies whether to enable the EXPN command, which allows the sender to request the membership of a mailing list. It is recommended to disable this command to prevent spammers from harvesting email addresses
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `futureRelease`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Specifies the maximum time that a message can be held for delivery using the FUTURERELEASE (RFC 4865) extension
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `mtPriority`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Specifies the priority assignment policy to advertise on the MT-PRIORITY (RFC 6710) extension, which allows the sender to specify a priority for a message. Available policies are mixer, stanag4406 and nsep, or false to disable this extension
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).
>
> Available constants: [`MtaPriorityConstant`](https://stalw.art/docs/ref/expression/constant/mta-priority-constant).

##### `noSoliciting`

> Type: [`Expression`](#expression) · default: `{"else":"''"}`
>
> Specifies the text to include in the NOSOLICITING (RFC 3865) message, which indicates that the server does not accept unsolicited commercial email (UCE or spam)
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `pipelining`

> Type: [`Expression`](#expression) · default: `{"else":"true"}`
>
> Enables SMTP pipelining (RFC 2920), which enables multiple commands to be sent in a single request to speed up communication between the client and server
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `requireTls`

> Type: [`Expression`](#expression) · default: `{"else":"true"}`
>
> Enables require TLS (RFC 8689), an extension that allows clients to require TLS encryption for the SMTP session
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

##### `vrfy`

> Type: [`Expression`](#expression) · default: `{"else":"false"}`
>
> Specifies whether to enable the VRFY command, which allows the sender to verify the existence of a mailbox. It is recommended to disable this command to prevent spammers from harvesting email addresses
>
> Available variables: [`MtaMailFromVariable`](https://stalw.art/docs/ref/expression/variable/mta-mail-from-variable).

## JMAP API

The MtaExtensions singleton is available via the `urn:stalwart:jmap` capability.

### `x:MtaExtensions/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysMtaExtensionsGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaExtensions/get",
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

### `x:MtaExtensions/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysMtaExtensionsUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaExtensions/set",
          {
            "update": {
              "singleton": {
                "chunking": {
                  "else": "true"
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
stalwart-cli get MtaExtensions
```

### Update

```sh
stalwart-cli update MtaExtensions --field chunking='{"else":"true"}'
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
- [`MtaPriorityConstant`](https://stalw.art/docs/ref/expression/constant/mta-priority-constant) (Constants)
