---
title: "MemoryLookupKeyValue"
source: https://stalw.art/docs/ref/object/memory-lookup-key-value/
description: "Defines an in-memory lookup key-value pair."
---

# MemoryLookupKeyValue

> Section: Schema reference › Objects

Defines an in-memory lookup key-value pair.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Lookups › In-Memory Key-Values

## Fields

##### `namespace`

> Type: `String` · required
>
> The namespace of the key

##### `key`

> Type: `String` · required · max length: 255
>
> The key name

##### `value`

> Type: `String` · required
>
> The key value

##### `isGlobPattern`

> Type: `Boolean` · default: `false`
>
> Whether the key is a glob pattern

## JMAP API

The MemoryLookupKeyValue object is available via the `urn:stalwart:jmap` capability.

### `x:MemoryLookupKeyValue/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysMemoryLookupKeyValueGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MemoryLookupKeyValue/get",
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

### `x:MemoryLookupKeyValue/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysMemoryLookupKeyValueCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MemoryLookupKeyValue/set",
          {
            "create": {
              "new1": {
                "key": "Example",
                "namespace": "Example",
                "value": "Example"
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

This operation requires the `sysMemoryLookupKeyValueUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MemoryLookupKeyValue/set",
          {
            "update": {
              "id1": {
                "namespace": "updated value"
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

This operation requires the `sysMemoryLookupKeyValueDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MemoryLookupKeyValue/set",
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

### `x:MemoryLookupKeyValue/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysMemoryLookupKeyValueQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MemoryLookupKeyValue/query",
          {
            "filter": {
              "namespace": "example"
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

The `x:MemoryLookupKeyValue/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `namespace` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get MemoryLookupKeyValue id1
```

### Create

```sh
stalwart-cli create MemoryLookupKeyValue \
  --field namespace=Example \
  --field key=Example \
  --field value=Example
```

### Query

```sh
stalwart-cli query MemoryLookupKeyValue
stalwart-cli query MemoryLookupKeyValue --where namespace=example
```

### Update

```sh
stalwart-cli update MemoryLookupKeyValue id1 --field namespace='updated value'
```

### Delete

```sh
stalwart-cli delete MemoryLookupKeyValue --ids id1
```
