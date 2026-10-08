---
title: "MtaSts"
source: https://stalw.art/docs/ref/object/mta-sts/
description: "Configures the MTA-STS policy for the server."
---

# MtaSts

> Section: Schema reference › Objects

Configures the MTA-STS policy for the server.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Inbound › MTA-STS

## Fields

##### `maxAge`

> Type: `Duration` · default: `604800000`
>
> Maximum time to cache the MTA-STS policy

##### `mode`

> Type: [`PolicyEnforcement`](#policyenforcement) · default: `"testing"`
>
> Whether to enforce, test, or disable the MTA-STS policy

##### `mxHosts`

> Type: `Set<String>`
>
> Override the allowed MX hosts for the MTA-STS policy domain. If empty, the MX hosts are determined from the system settings

## JMAP API

The MtaSts singleton is available via the `urn:stalwart:jmap` capability.

### `x:MtaSts/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysMtaStsGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaSts/get",
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

### `x:MtaSts/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysMtaStsUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaSts/set",
          {
            "update": {
              "singleton": {
                "maxAge": 604800000
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
stalwart-cli get MtaSts
```

### Update

```sh
stalwart-cli update MtaSts --field maxAge=604800000
```

## Enums

### PolicyEnforcement

| Value | Label |
|---|---|
| `enforce` | Enforce |
| `testing` | Testing |
| `disable` | Disabled |
