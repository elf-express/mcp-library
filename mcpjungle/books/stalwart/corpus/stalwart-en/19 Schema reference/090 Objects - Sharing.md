---
title: "Sharing"
source: https://stalw.art/docs/ref/object/sharing/
description: "Configures sharing settings for calendars, address books, and files."
---

# Objects - Sharing

> Section: Schema reference › Objects

Configures sharing settings for calendars, address books, and files.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Files & Sharing › Sharing

## Fields

##### `allowDirectoryQueries`

> Type: `Boolean` · default: `false`
>
> Whether authenticated users can query the directory via WebDAV and JMAP

##### `maxShares`

> Type: `UnsignedInt` · default: `10` · min: 1
>
> Specifies the maximum number of sharees that can be added to a single shared item (calendar, address book or file)

## JMAP API

The Sharing singleton is available via the `urn:stalwart:jmap` capability.

### `x:Sharing/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysSharingGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Sharing/get",
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

### `x:Sharing/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysSharingUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Sharing/set",
          {
            "update": {
              "singleton": {
                "allowDirectoryQueries": false
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
stalwart-cli get Sharing
```

### Update

```sh
stalwart-cli update Sharing --field allowDirectoryQueries=false
```
