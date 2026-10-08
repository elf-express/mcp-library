---
title: "SystemSettings"
source: https://stalw.art/docs/ref/object/system-settings/
description: "Configures core server settings including hostname, thread pool, and network services."
---

# SystemSettings

> Section: Schema reference › Objects

Configures core server settings including hostname, thread pool, and network services.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Network › Services Settings › Network › General

## Fields

##### `defaultHostname`

> Type: `HostName` · required
>
> The default hostname to use in SMTP greetings, MTA reports and other places where a hostname is needed but not specified.

##### `defaultDomainId`

> Type: `Id<`[`Domain`](https://stalw.art/docs/ref/object/domain)`>` · required
>
> Default domain to use for authentication and reports.

##### `defaultCertificateId`

> Type: `Id<`[`Certificate`](https://stalw.art/docs/ref/object/certificate)`>?`
>
> Default TLS certificate to use when no SNI is provided by the client

##### `threadPoolSize`

> Type: `UnsignedInt?` · min: 1
>
> The number of threads in the global thread pool for CPU intensive tasks. Defaults to the number of CPU cores

##### `maxConnections`

> Type: `UnsignedInt` · default: `8192` · min: 1
>
> The maximum number of concurrent connections the server will accept

##### `proxyTrustedNetworks`

> Type: `Set<IpMask>`
>
> Enable proxy protocol for connections from these networks

##### `mailExchangers`

> Type: `List<`[`MailExchanger`](#mailexchanger)`>` · default: `{"0":{"priority":10}}`
>
> List of mail exchangers to publish in DNS MX records.

##### `services`

> Type: `Map<`[`ServiceProtocol`](#serviceprotocol)`, `[`Service`](#service)`>` · default: `{"caldav":{"cleartext":false},"carddav":{"cleartext":false},"imap":{"cleartext":false},"jmap":{"cleartext":false},"managesieve":{"cleartext":false},"pop3":{"cleartext":false},"smtp":{"cleartext":false},"webdav":{"cleartext":false}}`
>
> List of services to advertise in DNS and auto configuration services

##### `providerInfo`

> Type: `Map<`[`ProviderInfo`](#providerinfo)`, String>`
>
> Information about the provider to advertise in auto configuration services.

## JMAP API

The SystemSettings singleton is available via the `urn:stalwart:jmap` capability.

### `x:SystemSettings/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysSystemSettingsGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SystemSettings/get",
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

### `x:SystemSettings/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysSystemSettingsUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SystemSettings/set",
          {
            "update": {
              "singleton": {
                "defaultHostname": "mail.example.com"
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
stalwart-cli get SystemSettings
```

### Update

```sh
stalwart-cli update SystemSettings --field defaultHostname=mail.example.com
```

## Nested types

### MailExchanger

Defines a mail exchanger for DNS MX records.

##### `hostname`

> Type: `HostName?`
>
> The hostname of the mail exchanger, or null to use the default hostname

##### `priority`

> Type: `UnsignedInt` · default: `10` · min: 1 · max: 65535
>
> The priority of the mail exchanger, lower values are preferred. Mail exchangers with the same priority will be selected randomly.

### Service

Defines a service endpoint advertised in auto-configuration.

##### `hostname`

> Type: `HostName?`
>
> The hostname of the service, or null to use the server's default hostname

##### `cleartext`

> Type: `Boolean` · default: `false`
>
> Whether to advertise the service as available without TLS encryption. This does not affect whether the service actually accepts cleartext connections, which is configured separately for each network listener.

## Enums

### ServiceProtocol

| Value | Label |
|---|---|
| `jmap` | JMAP |
| `imap` | IMAP |
| `pop3` | POP3 |
| `smtp` | SMTP submission |
| `caldav` | CalDAV |
| `carddav` | CardDAV |
| `webdav` | WebDAV |
| `managesieve` | ManageSieve |

### ProviderInfo

| Value | Label |
|---|---|
| `providerName` | Provider name |
| `providerShortName` | Short provider name |
| `userDocumentation` | URL with user-facing documentation |
| `developerDocumentation` | URL with developer-facing documentation |
| `contactUri` | Contact information URI |
| `logoUrl` | URL to a logo image for the provider |
| `logoWidth` | Logo width in pixels |
| `logoHeight` | Logo height in pixels |
