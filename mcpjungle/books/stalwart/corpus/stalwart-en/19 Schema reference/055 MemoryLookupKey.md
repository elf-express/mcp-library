---
title: "MemoryLookupKey"
source: https://stalw.art/docs/ref/object/memory-lookup-key/
description: "Defines an in-memory lookup key for fast data access."
---

# MemoryLookupKey

> Section: Schema reference › Objects

Defines an in-memory lookup key for fast data access.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Lookups › In-Memory Keys Settings › Spam Filter › Lists › Blocked Domains Settings › Spam Filter › Lists › Spam Traps Settings › Spam Filter › Lists › Trusted Domains Settings › Spam Filter › Lists › URL Redirectors

## Fields

##### `namespace`

> Type: `String` · required
>
> The namespace of the key

##### `key`

> Type: `String` · required · max length: 255
>
> The key name

##### `isGlobPattern`

> Type: `Boolean` · default: `false`
>
> Whether the key is a glob pattern

## JMAP API

The MemoryLookupKey object is available via the `urn:stalwart:jmap` capability.

### `x:MemoryLookupKey/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysMemoryLookupKeyGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MemoryLookupKey/get",
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

### `x:MemoryLookupKey/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysMemoryLookupKeyCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MemoryLookupKey/set",
          {
            "create": {
              "new1": {
                "key": "Example",
                "namespace": "Example"
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

This operation requires the `sysMemoryLookupKeyUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MemoryLookupKey/set",
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

This operation requires the `sysMemoryLookupKeyDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MemoryLookupKey/set",
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

### `x:MemoryLookupKey/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysMemoryLookupKeyQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MemoryLookupKey/query",
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

The `x:MemoryLookupKey/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `namespace` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get MemoryLookupKey id1
```

### Create

```sh
stalwart-cli create MemoryLookupKey \
  --field namespace=Example \
  --field key=Example
```

### Query

```sh
stalwart-cli query MemoryLookupKey
stalwart-cli query MemoryLookupKey --where namespace=example
```

### Update

```sh
stalwart-cli update MemoryLookupKey id1 --field namespace='updated value'
```

### Delete

```sh
stalwart-cli delete MemoryLookupKey --ids id1
```
