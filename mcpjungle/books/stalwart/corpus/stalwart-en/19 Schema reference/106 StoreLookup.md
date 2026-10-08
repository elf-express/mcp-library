---
title: "StoreLookup"
source: https://stalw.art/docs/ref/object/store-lookup/
description: "Defines an external store used for lookups."
---

# StoreLookup

> Section: Schema reference › Objects

Defines an external store used for lookups.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Lookups › Store Lookups

## Fields

##### `namespace`

> Type: `String` · read-only
>
> Unique identifier for this store when used in lookups

##### `store`

> Type: [`LookupStore`](#lookupstore) · required
>
> Store to use for lookups

## JMAP API

The StoreLookup object is available via the `urn:stalwart:jmap` capability.

### `x:StoreLookup/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysStoreLookupGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:StoreLookup/get",
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

### `x:StoreLookup/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysStoreLookupCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:StoreLookup/set",
          {
            "create": {
              "new1": {
                "store": {
                  "@type": "PostgreSql",
                  "authSecret": {
                    "@type": "None"
                  },
                  "host": "Example",
                  "readReplicas": {}
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

This operation requires the `sysStoreLookupUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:StoreLookup/set",
          {
            "update": {
              "id1": {
                "store": {
                  "@type": "PostgreSql",
                  "authSecret": {
                    "@type": "None"
                  },
                  "host": "Example",
                  "readReplicas": {}
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

#### Destroy

This operation requires the `sysStoreLookupDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:StoreLookup/set",
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

### `x:StoreLookup/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysStoreLookupQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:StoreLookup/query",
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
stalwart-cli get StoreLookup id1
```

### Create

```sh
stalwart-cli create StoreLookup \
  --field 'store={"@type":"PostgreSql","authSecret":{"@type":"None"},"host":"Example","readReplicas":{}}'
```

### Query

```sh
stalwart-cli query StoreLookup
```

### Update

```sh
stalwart-cli update StoreLookup id1 --field store='{"@type":"PostgreSql","authSecret":{"@type":"None"},"host":"Example","readReplicas":{}}'
```

### Delete

```sh
stalwart-cli delete StoreLookup --ids id1
```

## Nested types

### LookupStore

Lookup store backends.

- **`PostgreSql`**: PostgreSQL. Carries the fields of [`PostgreSqlStore`](#postgresqlstore).
- **`MySql`**: mySQL. Carries the fields of [`MySqlStore`](#mysqlstore).
- **`Sqlite`**: SQLite. Carries the fields of [`SqliteStore`](#sqlitestore).
- **`Sharded`**: Sharded Lookup Store. Carries the fields of [`ShardedInMemoryStore`](#shardedinmemorystore).
- **`Redis`**: Redis/Valkey. Carries the fields of [`RedisStore`](#redisstore).
- **`RedisCluster`**: Redis Cluster. Carries the fields of [`RedisClusterStore`](#redisclusterstore).
- **`RedisSentinel`**: Redis Sentinel. Carries the fields of [`RedisSentinelStore`](#redissentinelstore).

#### PostgreSqlStore

PostgreSQL data store.

##### `timeout`

> Type: `Duration?` · default: `15000`
>
> Connection timeout to the database

##### `useTls`

> Type: `Boolean` · default: `false`
>
> Use TLS to connect to the store

##### `allowInvalidCerts`

> Type: `Boolean` · default: `false`
>
> Allow invalid TLS certificates when connecting to the store

##### `poolMaxConnections`

> Type: `UnsignedInt?` · default: `10` · max: 8192 · min: 1
>
> Maximum number of connections to the store

##### `poolRecyclingMethod`

> Type: [`PostgreSqlRecyclingMethod`](#postgresqlrecyclingmethod) · default: `"fast"`
>
> Method to use when recycling connections in the pool

##### `readReplicas`

> Type: `List<`[`PostgreSqlSettings`](#postgresqlsettings)`>` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> List of read replicas for the store

##### `host`

> Type: `String` · required
>
> Hostname of the database server

##### `port`

> Type: `UnsignedInt` · default: `5432` · max: 65535 · min: 1
>
> Port of the database server

##### `database`

> Type: `String` · default: `"stalwart"`
>
> Name of the database

##### `authUsername`

> Type: `String?` · default: `"stalwart"`
>
> Username to connect to the store

##### `authSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Password to connect to the store

##### `options`

> Type: `String?`
>
> Additional connection options

##### PostgreSqlSettings

PostgreSQL connection settings.

##### `host`

> Type: `String` · required
>
> Hostname of the database server

##### `port`

> Type: `UnsignedInt` · default: `5432` · max: 65535 · min: 1
>
> Port of the database server

##### `database`

> Type: `String` · default: `"stalwart"`
>
> Name of the database

##### `authUsername`

> Type: `String?` · default: `"stalwart"`
>
> Username to connect to the store

##### `authSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Password to connect to the store

##### `options`

> Type: `String?`
>
> Additional connection options

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

#### MySqlStore

MySQL data store.

##### `timeout`

> Type: `Duration?` · default: `15000`
>
> Connection timeout to the database

##### `useTls`

> Type: `Boolean` · default: `false`
>
> Use TLS to connect to the store

##### `allowInvalidCerts`

> Type: `Boolean` · default: `false`
>
> Allow invalid TLS certificates when connecting to the store

##### `maxAllowedPacket`

> Type: `UnsignedInt?` · max: 1073741824 · min: 1024
>
> Maximum size of a packet in bytes

##### `poolMaxConnections`

> Type: `UnsignedInt?` · default: `10` · max: 8192 · min: 1
>
> Maximum number of connections to the store

##### `poolMinConnections`

> Type: `UnsignedInt?` · default: `5` · max: 8192 · min: 1
>
> Minimum number of connections to the store

##### `readReplicas`

> Type: `List<`[`MySqlSettings`](#mysqlsettings)`>` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> List of read replicas for the store

##### `host`

> Type: `String` · required
>
> Hostname of the database server

##### `port`

> Type: `UnsignedInt` · default: `3306` · max: 65535 · min: 1
>
> Port of the database server

##### `database`

> Type: `String` · default: `"stalwart"`
>
> Name of the database

##### `authUsername`

> Type: `String?` · default: `"stalwart"`
>
> Username to connect to the store

##### `authSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Password to connect to the store

##### MySqlSettings

MySQL connection settings.

##### `host`

> Type: `String` · required
>
> Hostname of the database server

##### `port`

> Type: `UnsignedInt` · default: `3306` · max: 65535 · min: 1
>
> Port of the database server

##### `database`

> Type: `String` · default: `"stalwart"`
>
> Name of the database

##### `authUsername`

> Type: `String?` · default: `"stalwart"`
>
> Username to connect to the store

##### `authSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Password to connect to the store

#### SqliteStore

SQLite embedded data store.

##### `path`

> Type: `String` · required
>
> Path to the SQLite data directory

##### `poolWorkers`

> Type: `UnsignedInt?` · max: 64 · min: 1
>
> Number of worker threads to use for the store, defaults to the number of cores

##### `poolMaxConnections`

> Type: `UnsignedInt` · default: `10` · max: 8192 · min: 1
>
> Maximum number of connections to the store

#### ShardedInMemoryStore

Sharded in-memory store configuration.

##### `stores`

> Type: `List<`[`InMemoryStoreBase`](#inmemorystorebase)`>` · min items: 2
>
> Stores to use for sharding

##### InMemoryStoreBase

In-memory store backends.

- **`Redis`**: Redis/Valkey. Carries the fields of [`RedisStore`](#redisstore).
- **`RedisCluster`**: Redis Cluster. Carries the fields of [`RedisClusterStore`](#redisclusterstore).
- **`RedisSentinel`**: Redis Sentinel. Carries the fields of [`RedisSentinelStore`](#redissentinelstore).

##### RedisStore

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

##### RedisClusterStore

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

##### RedisSentinelStore

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

### PostgreSqlRecyclingMethod

| Value | Label |
|---|---|
| `fast` | Fast recycling method |
| `verified` | Verified recycling method |
| `clean` | Clean recycling method |

### RedisProtocol

| Value | Label |
|---|---|
| `resp2` | RESP2 |
| `resp3` | RESP3 |
