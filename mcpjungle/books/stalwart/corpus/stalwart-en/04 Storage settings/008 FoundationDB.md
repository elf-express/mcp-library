---
title: "FoundationDB"
source: https://stalw.art/docs/storage/backends/foundationdb/
---

# FoundationDB

> Section: Storage settings › Backends

FoundationDB is a distributed database designed to handle large volumes of data across multiple machines. It combines ACID transactions with the scalability of NoSQL systems, providing high performance, fault tolerance, and straightforward horizontal scaling. It is the recommended backend for distributed deployments of Stalwart.

:::tip[Note]

The FoundationDB client library must be installed on the host before Stalwart can connect to a FoundationDB cluster.

:::

## Configuration

The FoundationDB backend is selected by choosing the `FoundationDb` variant on the [DataStore](https://stalw.art/docs/ref/object/data-store) object (found in the WebUI under <!-- breadcrumb:DataStore --> Settings › Storage › Data Store<!-- /breadcrumb:DataStore -->). The variant exposes the following fields:

- [`clusterFile`](https://stalw.art/docs/ref/object/data-store#clusterfile): filesystem path to the FoundationDB cluster configuration file. If unset, the default `/etc/foundationdb/fdb.cluster` is used.
- [`transactionTimeout`](https://stalw.art/docs/ref/object/data-store#transactiontimeout): duration after which a transaction times out if not completed.
- [`transactionRetryLimit`](https://stalw.art/docs/ref/object/data-store#transactionretrylimit): maximum number of transaction retries before giving up.
- [`transactionRetryDelay`](https://stalw.art/docs/ref/object/data-store#transactionretrydelay): maximum delay between transaction retries.
- [`machineId`](https://stalw.art/docs/ref/object/data-store#machineid): optional identifier for the machine, useful for logging and cluster-aware behaviour.
- [`datacenterId`](https://stalw.art/docs/ref/object/data-store#datacenterid): optional identifier for the data centre hosting the machine, used when tuning cross-datacentre replication.

FoundationDB is also available as a backend for the blob store, search store, and in-memory store; the same set of cluster-file and transaction fields is exposed on each of those objects under the `FoundationDb` variant.
