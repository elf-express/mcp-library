---
title: "Sharded In-Memory Store"
source: https://stalw.art/docs/storage/backends/composite/sharded-in-memory/
---

# Sharded In-Memory Store

> Section: Storage settings › Backends › Composite

Sharding distributes data across multiple backends to improve throughput and balance load. In the sharded in-memory store, each key is hashed and a modulus operation selects one of the configured backends to hold or serve the associated value. Each backend owns a deterministic subset of keys, which avoids hotspots and allows capacity to scale horizontally.

:::tip[Enterprise feature]

This feature is available exclusively in the [Enterprise Edition](https://stalw.art/docs/server/enterprise) of Stalwart and is not included in the Community Edition.

:::

## Configuration

The sharded in-memory backend is selected by choosing the `Sharded` variant on the [InMemoryStore](https://stalw.art/docs/ref/object/in-memory-store) object (found in the WebUI under <!-- breadcrumb:InMemoryStore --> Settings › Storage › In-Memory Store<!-- /breadcrumb:InMemoryStore -->). The variant exposes a single field:

- [`stores`](https://stalw.art/docs/ref/object/in-memory-store#stores): list of two or more backend in-memory stores that make up the shard. Each entry selects one of the base in-memory variants (Redis or Redis Cluster).

**IMPORTANT**: the order and number of backends in [`stores`](https://stalw.art/docs/ref/object/in-memory-store#stores) must remain stable once set. Reordering or adding or removing entries changes the hash-to-store mapping and leaves previously written data unreachable. Plan capacity carefully before configuring a shard.
