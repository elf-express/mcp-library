---
title: "Cache"
source: https://stalw.art/docs/ref/object/cache/
description: "Configures in-memory cache sizes for data, DNS records, and authorization tokens."
---

# Cache

> Section: Schema reference › Objects

Configures in-memory cache sizes for data, DNS records, and authorization tokens.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Storage › Cache

## Fields

##### `accessTokens`

> Type: `Size` · default: `10485760` · min: 2048
>
> Maximum size of the access tokens cache

##### `contacts`

> Type: `Size` · default: `10485760` · min: 2048
>
> Maximum size of the address books and contacts cache

##### `dnsIpv4`

> Type: `Size` · default: `5242880` · min: 2048
>
> Maximum size of the IPv4 record cache

##### `dnsIpv6`

> Type: `Size` · default: `5242880` · min: 2048
>
> Maximum size of the IPv6 record cache

##### `dnsMtaSts`

> Type: `Size` · default: `1048576` · min: 2048
>
> Maximum size of the MTA-STS record cache

##### `dnsMx`

> Type: `Size` · default: `5242880` · min: 2048
>
> Maximum size of the MX record cache

##### `dnsPtr`

> Type: `Size` · default: `1048576` · min: 2048
>
> Maximum size of the PTR record cache

##### `dnsRbl`

> Type: `Size` · default: `5242880` · min: 2048
>
> Maximum size of the DNSBl record cache

##### `dnsTlsa`

> Type: `Size` · default: `1048576` · min: 2048
>
> Maximum size of the TLSA record cache

##### `dnsTxt`

> Type: `Size` · default: `5242880` · min: 2048
>
> Maximum size of the TXT record cache

##### `events`

> Type: `Size` · default: `10485760` · min: 2048
>
> Maximum size of the calendar and events cache

##### `scheduling`

> Type: `Size` · default: `1048576` · min: 2048
>
> Maximum size of the scheduling cache

##### `files`

> Type: `Size` · default: `10485760` · min: 2048
>
> Maximum size of the file storage data cache

##### `httpAuth`

> Type: `Size` · default: `1048576` · min: 2048
>
> Maximum size of the HTTP authorization headers cache

##### `messages`

> Type: `Size` · default: `52428800` · min: 2048
>
> Maximum size of the e-mail data cache

##### `domains`

> Type: `Size` · default: `5242880` · min: 2048
>
> Maximum size of the domains cache

##### `domainNames`

> Type: `Size` · default: `10485760` · min: 2048
>
> Maximum size of the domain name lookup cache

##### `domainNamesNegative`

> Type: `Size` · default: `1048576` · min: 2048
>
> Maximum size of the domain name lookup negative cache

##### `emailAddresses`

> Type: `Size` · default: `10485760` · min: 2048
>
> Maximum size of the email addresses lookup cache

##### `emailAddressesNegative`

> Type: `Size` · default: `2097152` · min: 2048
>
> Maximum size of the email addresses lookup negative cache

##### `accounts`

> Type: `Size` · default: `20971520` · min: 2048
>
> Maximum size of the accounts cache

##### `roles`

> Type: `Size` · default: `5242880` · min: 2048
>
> Maximum size of the roles cache

##### `tenants`

> Type: `Size` · default: `5242880` · min: 2048
>
> Maximum size of the tenants cache

##### `mailingLists`

> Type: `Size` · default: `2097152` · min: 2048
>
> Maximum size of the mailing lists cache

##### `dkimSignatures`

> Type: `Size` · default: `10485760` · min: 2048
>
> Maximum size of the DKIM signatures cache

##### `negativeTtl`

> Type: `Duration` · default: `3600000`
>
> Time-to-live for domain and account name lookup negative cache entries

## JMAP API

The Cache singleton is available via the `urn:stalwart:jmap` capability.

### `x:Cache/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysCacheGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Cache/get",
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

### `x:Cache/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysCacheUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Cache/set",
          {
            "update": {
              "singleton": {
                "accessTokens": 10485760
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
stalwart-cli get Cache
```

### Update

```sh
stalwart-cli update Cache --field accessTokens=10485760
```
