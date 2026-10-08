---
title: "MetricsStore"
source: https://stalw.art/docs/ref/object/metrics-store/
description: "Configures the storage backend for metrics data."
---

# MetricsStore

> Section: Schema reference › Objects

Configures the storage backend for metrics data.

:::note[Enterprise feature]
This object is only available with an [Enterprise license](https://stalw.art/docs/server/enterprise).
:::

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Storage › Metrics Store

## Fields

MetricsStore is a **multi-variant** object: each instance has an `@type` discriminator selecting one of the variants below, and each variant carries its own set of fields.

### `@type: "Disabled"`

Do not store metrics data

### `@type: "Default"`

Use data store

### `@type: "FoundationDb"`

FoundationDB

##### `clusterFile`

> Type: `String?`
>
> Path to the cluster file for the FoundationDB cluster

##### `datacenterId`

> Type: `String?`
>
> Data center ID (optional)

##### `machineId`

> Type: `String?`
>
> Machine ID in the FoundationDB cluster (optional)

##### `transactionRetryDelay`

> Type: `Duration?`
>
> Transaction maximum retry delay

##### `transactionRetryLimit`

> Type: `UnsignedInt?` · max: 1000 · min: 1
>
> Transaction retry limit

##### `transactionTimeout`

> Type: `Duration?`
>
> Transaction timeout

### `@type: "PostgreSql"`

PostgreSQL

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

### `@type: "MySql"`

mySQL

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

## JMAP API

The MetricsStore singleton is available via the `urn:stalwart:jmap` capability.

### `x:MetricsStore/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysMetricsStoreGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MetricsStore/get",
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

### `x:MetricsStore/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysMetricsStoreUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:MetricsStore/set",
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
stalwart-cli get MetricsStore
```

### Update

```sh
stalwart-cli update MetricsStore --field description='updated value'
```

## Nested types

### PostgreSqlSettings

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

#### SecretKeyOptional

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

### MySqlSettings

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

## Enums

### PostgreSqlRecyclingMethod

| Value | Label |
|---|---|
| `fast` | Fast recycling method |
| `verified` | Verified recycling method |
| `clean` | Clean recycling method |
