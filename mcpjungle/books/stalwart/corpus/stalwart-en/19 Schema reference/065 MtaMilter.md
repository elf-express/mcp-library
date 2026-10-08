---
title: "MtaMilter"
source: https://stalw.art/docs/ref/object/mta-milter/
description: "Defines a Milter filter endpoint for message processing."
---

# MtaMilter

> Section: Schema reference › Objects

Defines a Milter filter endpoint for message processing.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Filters › Milters

## Fields

##### `allowInvalidCerts`

> Type: `Boolean` · default: `false`
>
> Whether Stalwart should connect to a Milter filter server that has an invalid TLS certificate

##### `enable`

> Type: [`Expression`](#expression) · default: `{"else":"true"}`
>
> Expression that determines whether to enable this milter
>
> Available variables: [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable).

##### `hostname`

> Type: `String` · required
>
> Hostname or IP address of the server where the Milter filter is running

##### `maxResponseSize`

> Type: `Size` · default: `52428800`
>
> Maximum size, in bytes, of a response that Stalwart will accept from this Milter server

##### `tempFailOnError`

> Type: `Boolean` · default: `true`
>
> Whether to respond with a temporary failure (typically a 4xx SMTP status code) when Stalwart encounters an error while communicating with this Milter server

##### `protocolVersion`

> Type: [`MilterVersion`](#milterversion) · default: `"v6"`
>
> Version of the Milter protocol that Stalwart should use when communicating with the Milter server

##### `port`

> Type: `UnsignedInt` · default: `11332` · max: 65535 · min: 1
>
> Network port on the Milter filter host server

##### `stages`

> Type: `Set<`[`MtaStage`](#mtastage)`>` · default: `{"data":true}` · min items: 1
>
> Which SMTP stages to run the milter on

##### `timeoutCommand`

> Type: `Duration` · default: `30000`
>
> How long Stalwart will wait to send a command to the Milter server

##### `timeoutConnect`

> Type: `Duration` · default: `30000`
>
> Maximum amount of time that Stalwart will wait to establish a connection with this Milter server

##### `timeoutData`

> Type: `Duration` · default: `60000`
>
> Maximum amount of time Stalwart will wait for a response from the Milter server

##### `useTls`

> Type: `Boolean` · default: `false`
>
> Whether to use Transport Layer Security (TLS) for the connection between Stalwart and the Milter filter

##### `flagsAction`

> Type: `UnsignedInt?`
>
> Optional flags to set on the Milter connection. See the Milter protocol documentation for details on available flags.

##### `flagsProtocol`

> Type: `UnsignedInt?`
>
> Optional protocol flags to set on the Milter connection. See the Milter protocol documentation for details on available protocol flags.

## JMAP API

The MtaMilter object is available via the `urn:stalwart:jmap` capability.

### `x:MtaMilter/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysMtaMilterGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaMilter/get",
          {
            "ids": [
              "id1"
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

### `x:MtaMilter/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysMtaMilterCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaMilter/set",
          {
            "create": {
              "new1": {
                "hostname": "Example"
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

#### Update

This operation requires the `sysMtaMilterUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaMilter/set",
          {
            "update": {
              "id1": {
                "hostname": "updated value"
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

#### Destroy

This operation requires the `sysMtaMilterDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaMilter/set",
          {
            "destroy": [
              "id1"
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

### `x:MtaMilter/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysMtaMilterQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaMilter/query",
          {
            "filter": {}
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
stalwart-cli get MtaMilter id1
```

### Create

```sh
stalwart-cli create MtaMilter \
  --field hostname=Example
```

### Query

```sh
stalwart-cli query MtaMilter
```

### Update

```sh
stalwart-cli update MtaMilter id1 --field hostname='updated value'
```

### Delete

```sh
stalwart-cli delete MtaMilter --ids id1
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

## Enums

### MilterVersion

| Value | Label |
|---|---|
| `v2` | Version 2 |
| `v6` | Version 6 |

### MtaStage

| Value | Label |
|---|---|
| `connect` | Connect |
| `ehlo` | EHLO |
| `auth` | AUTH |
| `mail` | MAIL FROM |
| `rcpt` | RCPT TO |
| `data` | DATA |

## Expression references

The following expression contexts are used by fields on this page:

- [`MtaRcptToVariable`](https://stalw.art/docs/ref/expression/variable/mta-rcpt-to-variable) (Variables)
