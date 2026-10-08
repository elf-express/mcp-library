---
title: "HttpForm"
source: https://stalw.art/docs/ref/object/http-form/
description: "Configures the contact form submission endpoint."
---

# HttpForm

> Section: Schema reference › Objects

Configures the contact form submission endpoint.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Network › HTTP › Contact Form

## Fields

##### `deliverTo`

> Type: `Set<EmailAddress>`
>
> List of local e-mail addresses to deliver the contact form to.

##### `defaultFromAddress`

> Type: `String` · default: `"postmaster@localhost"`
>
> The default e-mail address to use when the sender does not provide one.

##### `fieldEmail`

> Type: `String?`
>
> The name of the field in the contact form that contains the e-mail address of the sender.

##### `enable`

> Type: `Boolean` · default: `false`
>
> Whether to enable contact form submissions.

##### `fieldHoneyPot`

> Type: `String?`
>
> The name of the field in the contact form that is used as a honey pot to catch spam bots.

##### `maxSize`

> Type: `Size` · default: `102400`
>
> Maximum size of the contact form submission in bytes.

##### `defaultName`

> Type: `String` · default: `"Anonymous"`
>
> The default name to use when the sender does not provide one.

##### `fieldName`

> Type: `String?`
>
> The name of the field in the contact form that contains the name of the sender.

##### `rateLimit`

> Type: [`Rate`](#rate)`?` · default: `{"count":5,"period":3600000}`
>
> Maximum number of contact form submissions that can be made in a timeframe by a given IP address.

##### `defaultSubject`

> Type: `String` · default: `"Contact form submission"`
>
> The default subject to use when the sender does not provide one.

##### `fieldSubject`

> Type: `String?`
>
> The name of the field in the contact form that contains the subject of the message.

##### `validateDomain`

> Type: `Boolean` · default: `true`
>
> Whether to validate the domain of the sender's email address.

## JMAP API

The HttpForm singleton is available via the `urn:stalwart:jmap` capability.

### `x:HttpForm/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysHttpFormGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:HttpForm/get",
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

### `x:HttpForm/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysHttpFormUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:HttpForm/set",
          {
            "update": {
              "singleton": {
                "defaultFromAddress": "updated value"
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
stalwart-cli get HttpForm
```

### Update

```sh
stalwart-cli update HttpForm --field defaultFromAddress='updated value'
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
