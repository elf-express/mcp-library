---
title: "SpamFileExtension"
source: https://stalw.art/docs/ref/object/spam-file-extension/
description: "Defines a file extension classification rule for spam filtering."
---

# SpamFileExtension

> Section: Schema reference › Objects

Defines a file extension classification rule for spam filtering.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Spam Filter › Lists › File Extensions

## Fields

##### `extension`

> Type: `String` · read-only
>
> The file name extension

##### `isArchive`

> Type: `Boolean` · default: `false`
>
> Whether this file extension is considered an archive

##### `isBad`

> Type: `Boolean` · default: `false`
>
> Whether this file extension is considered bad

##### `isNz`

> Type: `Boolean` · default: `false`
>
> Whether this file extension is considered a NZ file

##### `contentTypes`

> Type: `Set<String>`
>
> The MIME types associated with this file extension

## JMAP API

The SpamFileExtension object is available via the `urn:stalwart:jmap` capability.

### `x:SpamFileExtension/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysSpamFileExtensionGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamFileExtension/get",
          {
            "ids": [
              "id1"
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

### `x:SpamFileExtension/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysSpamFileExtensionCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamFileExtension/set",
          {
            "create": {
              "new1": {
                "contentTypes": {}
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

#### Update

This operation requires the `sysSpamFileExtensionUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamFileExtension/set",
          {
            "update": {
              "id1": {
                "isArchive": false
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

#### Destroy

This operation requires the `sysSpamFileExtensionDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamFileExtension/set",
          {
            "destroy": [
              "id1"
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

### `x:SpamFileExtension/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysSpamFileExtensionQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamFileExtension/query",
          {
            "filter": {
              "extension": "example"
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

The `x:SpamFileExtension/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `extension` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get SpamFileExtension id1
```

### Create

```sh
stalwart-cli create SpamFileExtension \
  --field 'contentTypes={}'
```

### Query

```sh
stalwart-cli query SpamFileExtension
stalwart-cli query SpamFileExtension --where extension=example
```

### Update

```sh
stalwart-cli update SpamFileExtension id1 --field isArchive=false
```

### Delete

```sh
stalwart-cli delete SpamFileExtension --ids id1
```
