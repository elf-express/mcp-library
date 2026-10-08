---
title: "SpamPyzor"
source: https://stalw.art/docs/ref/object/spam-pyzor/
description: "Configures the Pyzor collaborative spam detection service."
---

# SpamPyzor

> Section: Schema reference › Objects

Configures the Pyzor collaborative spam detection service.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Spam Filter › Pyzor

## Fields

##### `blockCount`

> Type: `UnsignedInt` · default: `5` · max: 1000 · min: 1
>
> The number of times the hash appears in the Pyzor blocklist

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable the Pyzor classifier. Pyzor is a collaborative, networked system to detect and report spam.

##### `host`

> Type: `String` · default: `"public.pyzor.org"`
>
> The hostname of the Pyzor server

##### `port`

> Type: `UnsignedInt` · default: `24441` · max: 65535 · min: 100
>
> The port to connect to the Pyzor server

##### `ratio`

> Type: `Float` · default: `0.2` · max: 1 · min: 0
>
> The ratio of the number of times the hash appears in the Pyzor allowlist to the blocklist

##### `timeout`

> Type: `Duration` · default: `5000`
>
> The timeout for the Pyzor server. If the server does not respond within this time, the check is considered failed.

##### `allowCount`

> Type: `UnsignedInt` · default: `10` · max: 1000 · min: 1
>
> The number of times the hash appears in the Pyzor allowlist

## JMAP API

The SpamPyzor singleton is available via the `urn:stalwart:jmap` capability.

### `x:SpamPyzor/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysSpamPyzorGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamPyzor/get",
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

### `x:SpamPyzor/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysSpamPyzorUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamPyzor/set",
          {
            "update": {
              "singleton": {
                "host": "updated value"
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
stalwart-cli get SpamPyzor
```

### Update

```sh
stalwart-cli update SpamPyzor --field host='updated value'
```
