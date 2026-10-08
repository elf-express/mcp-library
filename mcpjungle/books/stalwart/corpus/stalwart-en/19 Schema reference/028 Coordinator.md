---
title: "Coordinator"
source: https://stalw.art/docs/ref/object/coordinator/
description: "Configures the cluster coordinator for inter-node communication."
---

# Coordinator

> Section: Schema reference › Objects

Configures the cluster coordinator for inter-node communication.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Cluster › Coordinator

## Fields

Coordinator is a **multi-variant** object: each instance has an `@type` discriminator selecting one of the variants below, and each variant carries its own set of fields.

### `@type: "Disabled"`

Disabled

### `@type: "Default"`

Use in-memory store (Redis only)

### `@type: "Kafka"`

Kafka

##### `brokers`

> Type: `Set<String>` · min items: 1
>
> List of Kafka brokers

##### `groupId`

> Type: `String` · required
>
> Consumer group ID

##### `timeoutMessage`

> Type: `Duration` · default: `5000`
>
> Timeout for message processing

##### `timeoutSession`

> Type: `Duration` · default: `5000`
>
> Timeout for session

### `@type: "Nats"`

NATS

##### `addresses`

> Type: `Set<String>` · default: `{"127.0.0.1:4444":true}` · min items: 1
>
> Address of the NATS server

##### `maxReconnects`

> Type: `UnsignedInt?`
>
> Maximum number of times to attempt to reconnect to the server

##### `timeoutConnection`

> Type: `Duration` · default: `5000`
>
> Timeout for establishing a connection to the server

##### `timeoutRequest`

> Type: `Duration` · default: `10000`
>
> Timeout for requests to the server

##### `pingInterval`

> Type: `Duration` · default: `60000`
>
> Interval between pings to the server

##### `capacityClient`

> Type: `UnsignedInt` · default: `2048` · min: 1
>
> By default, Client dispatches op's to the Client onto the channel with capacity of 2048. This option enables overriding it

##### `capacityReadBuffer`

> Type: `UnsignedInt` · default: `65535` · min: 1
>
> Sets the initial capacity of the read buffer. Which is a buffer used to gather partial protocol messages.

##### `capacitySubscription`

> Type: `UnsignedInt` · default: `65536` · min: 1
>
> Sets the capacity for Subscribers. Exceeding it will trigger slow consumer error callback and drop messages.

##### `noEcho`

> Type: `Boolean` · default: `true`
>
> Disables delivering messages that were published from the same connection.

##### `useTls`

> Type: `Boolean` · default: `false`
>
> Use TLS to connect to the store

##### `authSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Password to connect to the store

##### `authUsername`

> Type: `String?` · default: `"stalwart"`
>
> Username to connect to the store

##### `credentials`

> Type: [`SecretTextOptional`](#secrettextoptional) · required
>
> String containing the JWT credentials

### `@type: "Zenoh"`

Eclipse Zenoh

##### `config`

> Type: `Text` · required
>
> Zenoh configuration string

### `@type: "Redis"`

Redis

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

The Coordinator singleton is available via the `urn:stalwart:jmap` capability.

### `x:Coordinator/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysCoordinatorGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Coordinator/get",
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

### `x:Coordinator/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysCoordinatorUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Coordinator/set",
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
stalwart-cli get Coordinator
```

### Update

```sh
stalwart-cli update Coordinator --field description='updated value'
```

## Nested types

### SecretKeyOptional

An optional secret value, or none.

- **`None`**: No secret. No additional fields.
- **`Value`**: Secret value. Carries the fields of [`SecretKeyValue`](#secretkeyvalue).
- **`EnvironmentVariable`**: Secret read from environment variable. Carries the fields of [`SecretKeyEnvironmentVariable`](#secretkeyenvironmentvariable).
- **`File`**: Secret read from file. Carries the fields of [`SecretKeyFile`](#secretkeyfile).

#### SecretKeyValue

A secret value provided directly.

##### `secret`

> Type: `String` · required · secret
>
> Password or secret value

#### SecretKeyEnvironmentVariable

A secret value read from an environment variable.

##### `variableName`

> Type: `String` · required
>
> Environment variable name to read the secret from

#### SecretKeyFile

A secret value read from a file.

##### `filePath`

> Type: `String` · required
>
> File path to read the secret from

### SecretTextOptional

An optional secret text value, or none.

- **`None`**: No secret. No additional fields.
- **`Text`**: Secret value. Carries the fields of [`SecretTextValue`](#secrettextvalue).
- **`EnvironmentVariable`**: Secret read from environment variable. Carries the fields of [`SecretKeyEnvironmentVariable`](#secretkeyenvironmentvariable).
- **`File`**: Secret read from file. Carries the fields of [`SecretKeyFile`](#secretkeyfile).

#### SecretTextValue

A secret text value provided directly.

##### `secret`

> Type: `Text` · required · secret
>
> Password or secret value

## Enums

### RedisProtocol

| Value | Label |
|---|---|
| `resp2` | RESP2 |
| `resp3` | RESP3 |
