---
title: "ClusterNode"
source: https://stalw.art/docs/ref/object/cluster-node/
description: "Represents a node in the cluster"
---

# ClusterNode

> Section: Schema reference › Objects

Represents a node in the cluster

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Management › Cluster

## Fields

##### `nodeId`

> Type: `UnsignedInt` · default: `1`
>
> Unique identifier for the node in the cluster

##### `hostname`

> Type: `String` · required
>
> Hostname of the node

##### `lastRenewal`

> Type: `UTCDateTime` · required
>
> Timestamp of the last lease renewal from this node, used to determine if the node is still active in the cluster

##### `status`

> Type: [`ClusterNodeStatus`](#clusternodestatus) · required
>
> Current status of the node in the cluster

## JMAP API

The ClusterNode object is available via the `urn:stalwart:jmap` capability.

### `x:ClusterNode/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysClusterNodeGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ClusterNode/get",
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

### `x:ClusterNode/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysClusterNodeCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ClusterNode/set",
          {
            "create": {
              "new1": {
                "hostname": "Example",
                "lastRenewal": "2026-01-01T00:00:00Z",
                "status": "active"
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

This operation requires the `sysClusterNodeUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ClusterNode/set",
          {
            "update": {
              "id1": {
                "hostname": "updated value"
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

This operation requires the `sysClusterNodeDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ClusterNode/set",
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

### `x:ClusterNode/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysClusterNodeQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ClusterNode/query",
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
stalwart-cli get ClusterNode id1
```

### Create

```sh
stalwart-cli create ClusterNode \
  --field hostname=Example \
  --field lastRenewal=2026-01-01T00:00:00Z \
  --field status=active
```

### Query

```sh
stalwart-cli query ClusterNode
```

### Update

```sh
stalwart-cli update ClusterNode id1 --field hostname='updated value'
```

### Delete

```sh
stalwart-cli delete ClusterNode --ids id1
```

## Enums

### ClusterNodeStatus

| Value | Label |
|---|---|
| `active` | Active |
| `stale` | Stale |
| `inactive` | Inactive |
