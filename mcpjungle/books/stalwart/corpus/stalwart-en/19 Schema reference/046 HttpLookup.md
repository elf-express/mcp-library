---
title: "HttpLookup"
source: https://stalw.art/docs/ref/object/http-lookup/
description: "Defines an HTTP-based lookup list."
---

# HttpLookup

> Section: Schema reference › Objects

Defines an HTTP-based lookup list.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Lookups › HTTP Lists

## Fields

##### `namespace`

> Type: `String` · read-only
>
> Unique identifier for this store when used in lookups

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable this HTTP list

##### `format`

> Type: [`HttpLookupFormat`](#httplookupformat) · required
>
> Format of the list

##### `isGzipped`

> Type: `Boolean` · default: `false`
>
> Whether to use gzip compression when downloading the list

##### `maxEntries`

> Type: `UnsignedInt` · default: `100000` · max: 1048576 · min: 1
>
> Maximum number of entries allowed in the list. The list is truncated if it exceeds this limit.

##### `maxEntrySize`

> Type: `Size` · default: `512` · max: 1048576 · min: 1
>
> Maximum length of an entry in the list.

##### `maxSize`

> Type: `Size` · default: `104857600` · max: 1073741824 · min: 10
>
> Maximum size of the list. The list is truncated if it exceeds this size.

##### `refresh`

> Type: `Duration` · default: `43200000`
>
> How often to refresh the list

##### `retry`

> Type: `Duration` · default: `3600000`
>
> How long to wait before retrying to download the list in case of failure.

##### `timeout`

> Type: `Duration` · default: `30000`
>
> How long to wait for the list to download before timing out

##### `url`

> Type: `Uri` · required
>
> URL of the list

## JMAP API

The HttpLookup object is available via the `urn:stalwart:jmap` capability.

### `x:HttpLookup/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysHttpLookupGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:HttpLookup/get",
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

### `x:HttpLookup/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysHttpLookupCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:HttpLookup/set",
          {
            "create": {
              "new1": {
                "format": {
                  "@type": "Csv"
                },
                "url": "https://example.com"
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

This operation requires the `sysHttpLookupUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:HttpLookup/set",
          {
            "update": {
              "id1": {
                "enable": true
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

This operation requires the `sysHttpLookupDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:HttpLookup/set",
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

### `x:HttpLookup/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysHttpLookupQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:HttpLookup/query",
          {
            "filter": {}
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
stalwart-cli get HttpLookup id1
```

### Create

```sh
stalwart-cli create HttpLookup \
  --field 'format={"@type":"Csv"}' \
  --field url=https://example.com
```

### Query

```sh
stalwart-cli query HttpLookup
```

### Update

```sh
stalwart-cli update HttpLookup id1 --field enable=true
```

### Delete

```sh
stalwart-cli delete HttpLookup --ids id1
```

## Nested types

### HttpLookupFormat

Format of HTTP lookup lists.

- **`Csv`**: CSV. Carries the fields of [`HttpLookupCsv`](#httplookupcsv).
- **`List`**: List. No additional fields.

#### HttpLookupCsv

CSV parsing settings for HTTP lookup lists.

##### `indexKey`

> Type: `UnsignedInt` · default: `0`
>
> The position of the key field in the HTTP List.

##### `indexValue`

> Type: `UnsignedInt?`
>
> The position of the value field in the HTTP List.

##### `separator`

> Type: `String` · default: `","`
>
> The separator character used to parse the HTTP list.

##### `skipFirst`

> Type: `Boolean` · default: `false`
>
> Whether to skip the first line of the list
