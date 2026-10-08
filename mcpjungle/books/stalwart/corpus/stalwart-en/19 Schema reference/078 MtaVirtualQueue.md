---
title: "MtaVirtualQueue"
source: https://stalw.art/docs/ref/object/mta-virtual-queue/
description: "Defines a virtual queue for organizing outbound message delivery."
---

# MtaVirtualQueue

> Section: Schema reference › Objects

Defines a virtual queue for organizing outbound message delivery.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › MTA › Outbound › Virtual Queues

## Fields

##### `name`

> Type: `String` · read-only · max length: 8
>
> Unique identifier for the queue, max 8 characters

##### `description`

> Type: `String?`
>
> A short description of the queue, which can be used to identify it in the list of queues

##### `threadsPerNode`

> Type: `UnsignedInt` · default: `25` · min: 1
>
> Maximum number of threads to use for delivery on each node in the cluster

## JMAP API

The MtaVirtualQueue object is available via the `urn:stalwart:jmap` capability.

### `x:MtaVirtualQueue/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysMtaVirtualQueueGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaVirtualQueue/get",
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

### `x:MtaVirtualQueue/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysMtaVirtualQueueCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaVirtualQueue/set",
          {
            "create": {
              "new1": {}
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

This operation requires the `sysMtaVirtualQueueUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaVirtualQueue/set",
          {
            "update": {
              "id1": {
                "description": "updated value"
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

This operation requires the `sysMtaVirtualQueueDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaVirtualQueue/set",
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

### `x:MtaVirtualQueue/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysMtaVirtualQueueQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MtaVirtualQueue/query",
          {
            "filter": {
              "name": "example"
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

The `x:MtaVirtualQueue/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `name` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get MtaVirtualQueue id1
```

### Create

```sh
stalwart-cli create MtaVirtualQueue
```

### Query

```sh
stalwart-cli query MtaVirtualQueue
stalwart-cli query MtaVirtualQueue --where name=example
```

### Update

```sh
stalwart-cli update MtaVirtualQueue id1 --field description='updated value'
```

### Delete

```sh
stalwart-cli delete MtaVirtualQueue --ids id1
```
