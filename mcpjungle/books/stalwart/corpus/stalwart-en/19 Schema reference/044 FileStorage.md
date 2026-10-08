---
title: "FileStorage"
source: https://stalw.art/docs/ref/object/file-storage/
description: "Configures file storage limits."
---

# FileStorage

> Section: Schema reference › Objects

Configures file storage limits.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Files & Sharing › File Storage

## Fields

##### `maxSize`

> Type: `Size` · default: `26214400`
>
> Specifies the maximum size of a file that can be uploaded to the server

##### `maxFiles`

> Type: `UnsignedInt?` · min: 1
>
> The default maximum number of files a user can create

##### `maxFolders`

> Type: `UnsignedInt?` · min: 1
>
> The default maximum number of file folders a user can create

## JMAP API

The FileStorage singleton is available via the `urn:stalwart:jmap` capability.

### `x:FileStorage/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysFileStorageGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:FileStorage/get",
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

### `x:FileStorage/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysFileStorageUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:FileStorage/set",
          {
            "update": {
              "singleton": {
                "maxSize": 26214400
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
stalwart-cli get FileStorage
```

### Update

```sh
stalwart-cli update FileStorage --field maxSize=26214400
```
