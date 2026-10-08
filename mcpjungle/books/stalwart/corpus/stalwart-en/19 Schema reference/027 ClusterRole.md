---
title: "ClusterRole"
source: https://stalw.art/docs/ref/object/cluster-role/
description: "Defines a cluster node role with enabled tasks and listeners."
---

# ClusterRole

> Section: Schema reference › Objects

Defines a cluster node role with enabled tasks and listeners.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Cluster › Roles

## Fields

##### `name`

> Type: `String` · read-only
>
> Unique identifier for the role

##### `description`

> Type: `String?`
>
> Description of the role

##### `tasks`

> Type: [`ClusterTaskGroup`](#clustertaskgroup) · required
>
> Which tasks are enabled for this cluster role

##### `listeners`

> Type: [`ClusterListenerGroup`](#clusterlistenergroup) · required
>
> Which network listeners are enabled for this cluster role

## JMAP API

The ClusterRole object is available via the `urn:stalwart:jmap` capability.

### `x:ClusterRole/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysClusterRoleGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ClusterRole/get",
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

### `x:ClusterRole/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysClusterRoleCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ClusterRole/set",
          {
            "create": {
              "new1": {
                "listeners": {
                  "@type": "EnableAll"
                },
                "tasks": {
                  "@type": "EnableAll"
                }
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

This operation requires the `sysClusterRoleUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ClusterRole/set",
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

This operation requires the `sysClusterRoleDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ClusterRole/set",
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

### `x:ClusterRole/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysClusterRoleQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:ClusterRole/query",
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

The `x:ClusterRole/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `name` | text |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get ClusterRole id1
```

### Create

```sh
stalwart-cli create ClusterRole \
  --field 'tasks={"@type":"EnableAll"}' \
  --field 'listeners={"@type":"EnableAll"}'
```

### Query

```sh
stalwart-cli query ClusterRole
stalwart-cli query ClusterRole --where name=example
```

### Update

```sh
stalwart-cli update ClusterRole id1 --field description='updated value'
```

### Delete

```sh
stalwart-cli delete ClusterRole --ids id1
```

## Nested types

### ClusterTaskGroup

Defines which cluster tasks are enabled for a cluster role.

- **`EnableAll`**: Enable all tasks. No additional fields.
- **`DisableAll`**: Disable all tasks. No additional fields.
- **`EnableSome`**: Enable some tasks. Carries the fields of [`ClusterTaskGroupProperties`](#clustertaskgroupproperties).
- **`DisableSome`**: Disable some tasks. Carries the fields of [`ClusterTaskGroupProperties`](#clustertaskgroupproperties).

#### ClusterTaskGroupProperties

Specifies which tasks are enabled or disabled.

##### `taskTypes`

> Type: `Set<`[`ClusterTaskType`](#clustertasktype)`>`
>
> Tasks to enable or disable for this group

### ClusterListenerGroup

Defines which network listeners are enabled for a cluster role.

- **`EnableAll`**: Enable all network listeners. No additional fields.
- **`DisableAll`**: Disable all network listeners. No additional fields.
- **`EnableSome`**: Enable some network listeners. Carries the fields of [`ClusterListenerGroupProperties`](#clusterlistenergroupproperties).
- **`DisableSome`**: Disable some network listeners. Carries the fields of [`ClusterListenerGroupProperties`](#clusterlistenergroupproperties).

#### ClusterListenerGroupProperties

Specifies which listeners are enabled or disabled.

##### `listenerIds`

> Type: `Set<Id<`[`NetworkListener`](https://stalw.art/docs/ref/object/network-listener)`>>`
>
> List of network listeners to enable or disable for this group

## Enums

### ClusterTaskType

| Value | Label |
|---|---|
| `storeMaintenance` | Store Maintenance |
| `accountMaintenance` | Account Maintenance |
| `metricsCalculate` | Calculate Metrics |
| `metricsPush` | Push Metrics |
| `pushNotifications` | Push Notifications |
| `searchIndexing` | Search Indexing |
| `spamClassifierTraining` | Spam Classifier Training |
| `outboundMta` | Outbound Email MTA |
| `taskQueueProcessing` | Task Queue Processing |
| `taskScheduler` | Task Scheduling |
