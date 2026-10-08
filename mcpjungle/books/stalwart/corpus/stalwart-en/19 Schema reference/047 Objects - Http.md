---
title: "Http"
source: https://stalw.art/docs/ref/object/http/
description: "Configures HTTP server settings including rate limiting, CORS, and security headers."
---

# Objects - Http

> Section: Schema reference › Objects

Configures HTTP server settings including rate limiting, CORS, and security headers.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Network › HTTP › General Settings › Network › HTTP › Security

## Fields

##### `rateLimitAuthenticated`

> Type: [`Rate`](#rate)`?` · default: `{"count":1000,"period":60000}`
>
> Specifies the request rate limit for authenticated users

##### `rateLimitAnonymous`

> Type: [`Rate`](#rate)`?` · default: `{"count":100,"period":60000}`
>
> Specifies the request rate limit for unauthenticated users

##### `allowedEndpoints`

> Type: [`Expression`](#expression) · default: `{"else":"200"}`
>
> An expression that determines whether access to an endpoint is allowed. The expression should an HTTP status code (200, 403, etc.)
>
> Available variables: [`HttpVariable`](https://stalw.art/docs/ref/expression/variable/http-variable).

##### `enableHsts`

> Type: `Boolean` · default: `false`
>
> Specifies whether to enable HTTP Strict Transport Security for the HTTP server.

##### `usePermissiveCors`

> Type: `Boolean` · default: `false`
>
> Specifies whether to allow all origins in the CORS policy for the HTTP server

##### `responseHeaders`

> Type: `Map<String, String>`
>
> Additional headers to include in HTTP responses

##### `useXForwarded`

> Type: `Boolean` · default: `false`
>
> Specifies whether to use the Forwarded or X-Forwarded-For header to determine the client's IP address

##### `redirectRoot`

> Type: `String?` · default: `"/account"`
>
> The URL to redirect users to when they access the root path of the HTTP server. If not set, the server will return a 404 Not Found response.

## JMAP API

The Http singleton is available via the `urn:stalwart:jmap` capability.

### `x:Http/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysHttpGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Http/get",
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

### `x:Http/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysHttpUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Http/set",
          {
            "update": {
              "singleton": {
                "redirectRoot": "updated value"
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
stalwart-cli get Http
```

### Update

```sh
stalwart-cli update Http --field redirectRoot='updated value'
```

## Nested types

### Rate

Defines a rate limit as a count over a time period.

##### `count`

> Type: `UnsignedInt` · default: `0` · min: 1 · max: 1000000
>
> Count

##### `period`

> Type: `Duration` · default: `0` · min: 1
>
> Period

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

- [`HttpVariable`](https://stalw.art/docs/ref/expression/variable/http-variable) (Variables)
