---
title: "InMemoryStore"
source: https://stalw.art/docs/ref/object/in-memory-store/
description: "Configures the in-memory cache and lookup store."
---

# InMemoryStore

> Section: Schema reference › Objects

Configures the in-memory cache and lookup store.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Storage › In-Memory Store

## Fields

InMemoryStore is a **multi-variant** object: each instance has an `@type` discriminator selecting one of the variants below, and each variant carries its own set of fields.

### `@type: "Default"`

Use data store

### `@type: "Sharded"`

Sharded Store

##### `stores`

> Type: `List<`[`InMemoryStoreBase`](#inmemorystorebase)`>` · min items: 2
>
> Stores to use for sharding

### `@type: "Redis"`

Redis/Valkey

##### `url`

> Type: `Uri` · default: `"redis://127.0.0.1"`
>
> URL of the Redis server

##### `timeout`

> Type: `Duration` · default: `10000`
>
> Connection timeout to the database

##### `poolMaxConnections`

> Type: `UnsignedInt` · default: `10` · max: 8192 · min: 1
>
> Maximum number of connections to the store

##### `poolTimeoutCreate`

> Type: `Duration?` · default: `30000`
>
> Timeout for creating a new connection

##### `poolTimeoutWait`

> Type: `Duration?` · default: `30000`
>
> Timeout for waiting for a connection from the pool

##### `poolTimeoutRecycle`

> Type: `Duration?` · default: `30000`
>
> Timeout for recycling a connection

### `@type: "RedisCluster"`

Redis Cluster

##### `urls`

> Type: `Set<Uri>` · default: `{"redis://127.0.0.1":true}`
>
> URL(s) of the Redis server(s)

##### `timeout`

> Type: `Duration` · default: `10000`
>
> Connection timeout to the database

##### `authUsername`

> Type: `String?` · default: `"stalwart"`
>
> Username to connect to the store

##### `authSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Password to connect to the store

##### `maxRetryWait`

> Type: `Duration?` · max: 1024 · min: 1
>
> Maximum time to wait between retries

##### `minRetryWait`

> Type: `Duration?` · max: 1024 · min: 1
>
> Minimum time to wait between retries

##### `maxRetries`

> Type: `UnsignedInt?` · max: 1024 · min: 1
>
> Number of retries to connect to the Redis cluster

##### `readFromReplicas`

> Type: `Boolean` · default: `true`
>
> Whether to read from replicas

##### `protocolVersion`

> Type: [`RedisProtocol`](#redisprotocol) · default: `"resp2"`
>
> Protocol Version

##### `poolMaxConnections`

> Type: `UnsignedInt` · default: `10` · max: 8192 · min: 1
>
> Maximum number of connections to the store

##### `poolTimeoutCreate`

> Type: `Duration?` · default: `30000`
>
> Timeout for creating a new connection

##### `poolTimeoutWait`

> Type: `Duration?` · default: `30000`
>
> Timeout for waiting for a connection from the pool

##### `poolTimeoutRecycle`

> Type: `Duration?` · default: `30000`
>
> Timeout for recycling a connection

### `@type: "RedisSentinel"`

Redis Sentinel

##### `urls`

> Type: `Set<Uri>` · default: `{"redis://127.0.0.1:26379":true}`
>
> Address(es) of the Sentinel node(s)

##### `serviceName`

> Type: `String` · default: `"mymaster"`
>
> Name of the monitored master (service) to query via the Sentinels

##### `timeout`

> Type: `Duration` · default: `10000`
>
> Connection timeout to the database

##### `authUsername`

> Type: `String?` · default: `"stalwart"`
>
> Username to connect to the data nodes

##### `authSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Password to connect to the data nodes

##### `sentinelUsername`

> Type: `String?`
>
> Username to connect to the Sentinel nodes

##### `sentinelSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Password to connect to the Sentinel nodes

##### `protocolVersion`

> Type: [`RedisProtocol`](#redisprotocol) · default: `"resp2"`
>
> Protocol Version

##### `poolMaxConnections`

> Type: `UnsignedInt` · default: `10` · max: 8192 · min: 1
>
> Maximum number of connections to the store

##### `poolTimeoutCreate`

> Type: `Duration?` · default: `30000`
>
> Timeout for creating a new connection

##### `poolTimeoutWait`

> Type: `Duration?` · default: `30000`
>
> Timeout for waiting for a connection from the pool

##### `poolTimeoutRecycle`

> Type: `Duration?` · default: `30000`
>
> Timeout for recycling a connection

## JMAP API

The InMemoryStore singleton is available via the `urn:stalwart:jmap` capability.

### `x:InMemoryStore/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysInMemoryStoreGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:InMemoryStore/get",
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

### `x:InMemoryStore/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysInMemoryStoreUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:InMemoryStore/set",
          {
            "update": {
              "singleton": {
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

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get InMemoryStore
```

### Update

```sh
stalwart-cli update InMemoryStore --field description='updated value'
```

## Nested types

### InMemoryStoreBase

In-memory store backends.

- **`Redis`**: Redis/Valkey. Carries the fields of [`RedisStore`](#redisstore).
- **`RedisCluster`**: Redis Cluster. Carries the fields of [`RedisClusterStore`](#redisclusterstore).
- **`RedisSentinel`**: Redis Sentinel. Carries the fields of [`RedisSentinelStore`](#redissentinelstore).

#### RedisStore

Redis/Valkey store.

##### `url`

> Type: `Uri` · default: `"redis://127.0.0.1"`
>
> URL of the Redis server

##### `timeout`

> Type: `Duration` · default: `10000`
>
> Connection timeout to the database

##### `poolMaxConnections`

> Type: `UnsignedInt` · default: `10` · max: 8192 · min: 1
>
> Maximum number of connections to the store

##### `poolTimeoutCreate`

> Type: `Duration?` · default: `30000`
>
> Timeout for creating a new connection

##### `poolTimeoutWait`

> Type: `Duration?` · default: `30000`
>
> Timeout for waiting for a connection from the pool

##### `poolTimeoutRecycle`

> Type: `Duration?` · default: `30000`
>
> Timeout for recycling a connection

#### RedisClusterStore

Redis Cluster store.

##### `urls`

> Type: `Set<Uri>` · default: `{"redis://127.0.0.1":true}`
>
> URL(s) of the Redis server(s)

##### `timeout`

> Type: `Duration` · default: `10000`
>
> Connection timeout to the database

##### `authUsername`

> Type: `String?` · default: `"stalwart"`
>
> Username to connect to the store

##### `authSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Password to connect to the store

##### `maxRetryWait`

> Type: `Duration?` · max: 1024 · min: 1
>
> Maximum time to wait between retries

##### `minRetryWait`

> Type: `Duration?` · max: 1024 · min: 1
>
> Minimum time to wait between retries

##### `maxRetries`

> Type: `UnsignedInt?` · max: 1024 · min: 1
>
> Number of retries to connect to the Redis cluster

##### `readFromReplicas`

> Type: `Boolean` · default: `true`
>
> Whether to read from replicas

##### `protocolVersion`

> Type: [`RedisProtocol`](#redisprotocol) · default: `"resp2"`
>
> Protocol Version

##### `poolMaxConnections`

> Type: `UnsignedInt` · default: `10` · max: 8192 · min: 1
>
> Maximum number of connections to the store

##### `poolTimeoutCreate`

> Type: `Duration?` · default: `30000`
>
> Timeout for creating a new connection

##### `poolTimeoutWait`

> Type: `Duration?` · default: `30000`
>
> Timeout for waiting for a connection from the pool

##### `poolTimeoutRecycle`

> Type: `Duration?` · default: `30000`
>
> Timeout for recycling a connection

##### SecretKeyOptional

An optional secret value, or none.

- **`None`**: No secret. No additional fields.
- **`Value`**: Secret value. Carries the fields of [`SecretKeyValue`](#secretkeyvalue).
- **`EnvironmentVariable`**: Secret read from environment variable. Carries the fields of [`SecretKeyEnvironmentVariable`](#secretkeyenvironmentvariable).
- **`File`**: Secret read from file. Carries the fields of [`SecretKeyFile`](#secretkeyfile).

##### SecretKeyValue

A secret value provided directly.

##### `secret`

> Type: `String` · required · secret
>
> Password or secret value

##### SecretKeyEnvironmentVariable

A secret value read from an environment variable.

##### `variableName`

> Type: `String` · required
>
> Environment variable name to read the secret from

##### SecretKeyFile

A secret value read from a file.

##### `filePath`

> Type: `String` · required
>
> File path to read the secret from

#### RedisSentinelStore

Redis Sentinel store.

##### `urls`

> Type: `Set<Uri>` · default: `{"redis://127.0.0.1:26379":true}`
>
> Address(es) of the Sentinel node(s)

##### `serviceName`

> Type: `String` · default: `"mymaster"`
>
> Name of the monitored master (service) to query via the Sentinels

##### `timeout`

> Type: `Duration` · default: `10000`
>
> Connection timeout to the database

##### `authUsername`

> Type: `String?` · default: `"stalwart"`
>
> Username to connect to the data nodes

##### `authSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Password to connect to the data nodes

##### `sentinelUsername`

> Type: `String?`
>
> Username to connect to the Sentinel nodes

##### `sentinelSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Password to connect to the Sentinel nodes

##### `protocolVersion`

> Type: [`RedisProtocol`](#redisprotocol) · default: `"resp2"`
>
> Protocol Version

##### `poolMaxConnections`

> Type: `UnsignedInt` · default: `10` · max: 8192 · min: 1
>
> Maximum number of connections to the store

##### `poolTimeoutCreate`

> Type: `Duration?` · default: `30000`
>
> Timeout for creating a new connection

##### `poolTimeoutWait`

> Type: `Duration?` · default: `30000`
>
> Timeout for waiting for a connection from the pool

##### `poolTimeoutRecycle`

> Type: `Duration?` · default: `30000`
>
> Timeout for recycling a connection

## Enums

### RedisProtocol

| Value | Label |
|---|---|
| `resp2` | RESP2 |
| `resp3` | RESP3 |
