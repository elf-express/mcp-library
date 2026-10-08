---
title: "Security"
source: https://stalw.art/docs/ref/object/security/
description: "Configures automatic IP banning rules for abuse, authentication failures, and port scanning."
---

# Objects - Security

> Section: Schema reference › Objects

Configures automatic IP banning rules for abuse, authentication failures, and port scanning.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Security › Settings

## Fields

##### `abuseBanRate`

> Type: [`Rate`](#rate)`?` · default: `{"count":35,"period":86400000}`
>
> The maximum number of abuse attempts (relaying or failed RCPT TO attempts) before the IP is banned

##### `abuseBanPeriod`

> Type: `Duration?`
>
> The duration of the ban for abuse attempts

##### `authBanRate`

> Type: [`Rate`](#rate)`?` · default: `{"count":100,"period":86400000}`
>
> The maximum number of failed login attempts before the IP is banned

##### `authBanPeriod`

> Type: `Duration?`
>
> The duration of the ban for failed login attempts

##### `loiterBanRate`

> Type: [`Rate`](#rate)`?` · default: `{"count":150,"period":86400000}`
>
> The maximum number of loitering disconnections before the IP is banned

##### `loiterBanPeriod`

> Type: `Duration?`
>
> The duration of the ban for loitering connections.

##### `scanBanPaths`

> Type: `Set<String>` · default: `{"*../*":true,"*.asp*":true,"*.cgi*":true,"*.php*":true,"*/..*":true,"*/cgi-bin*":true,"*/php*":true,"*/wp-*":true,"*drupal*":true,"*joomla*":true,"*wordpress*":true,"*xmlrpc*":true}`
>
> The paths that will trigger an immediate ban if accessed. Each path should be a glob expression

##### `scanBanRate`

> Type: [`Rate`](#rate)`?` · default: `{"count":30,"period":86400000}`
>
> The maximum number of port scanning attempts before the IP is banned

##### `scanBanPeriod`

> Type: `Duration?`
>
> The duration of the ban for port scanning attempts

## JMAP API

The Security singleton is available via the `urn:stalwart:jmap` capability.

### `x:Security/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysSecurityGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Security/get",
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

### `x:Security/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysSecurityUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Security/set",
          {
            "update": {
              "singleton": {
                "abuseBanRate": {
                  "count": 35,
                  "period": 86400000
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
stalwart-cli get Security
```

### Update

```sh
stalwart-cli update Security --field abuseBanRate='{"count":35,"period":86400000}'
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
