---
title: "SpamDnsblSettings"
source: https://stalw.art/docs/ref/object/spam-dnsbl-settings/
description: "Configures DNSBL query limits for spam filtering."
---

# SpamDnsblSettings

> Section: Schema reference › Objects

Configures DNSBL query limits for spam filtering.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Spam Filter › DNSBL › Settings

## Fields

##### `domainLimit`

> Type: `UnsignedInt` · default: `50` · min: 1
>
> Maximum number of DNSBL checks for domain names

##### `emailLimit`

> Type: `UnsignedInt` · default: `50` · min: 1
>
> Maximum number of DNSBL checks for E-mail addresses

##### `ipLimit`

> Type: `UnsignedInt` · default: `50` · min: 1
>
> Maximum number of DNSBL checks for IP addresses

##### `urlLimit`

> Type: `UnsignedInt` · default: `50` · min: 1
>
> Maximum number of DNSBL checks for URLs

## JMAP API

The SpamDnsblSettings singleton is available via the `urn:stalwart:jmap` capability.

### `x:SpamDnsblSettings/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysSpamDnsblSettingsGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamDnsblSettings/get",
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

### `x:SpamDnsblSettings/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysSpamDnsblSettingsUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamDnsblSettings/set",
          {
            "update": {
              "singleton": {
                "domainLimit": 50
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
stalwart-cli get SpamDnsblSettings
```

### Update

```sh
stalwart-cli update SpamDnsblSettings --field domainLimit=50
```
