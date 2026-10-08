---
title: "SQL Read Replicas"
source: https://stalw.art/docs/storage/backends/composite/sql-replica/
---

# SQL Read Replicas

> Section: Storage settings › Backends › Composite

SQL read replicas are a well-known database architecture pattern for separating read and write traffic. A primary database handles all write operations, ensuring consistent updates; one or more read replicas, synchronised from the primary, handle read traffic. This separation reduces load on the primary and allows the read path to scale horizontally.

Stalwart supports this pattern for any SQL backend that itself supports read replicas (PostgreSQL, MySQL, MariaDB, Galera, AlloyDB, and similar). Using read replicas improves throughput in read-heavy environments while preserving write consistency.

:::tip[Enterprise feature]

This feature is available exclusively in the [Enterprise Edition](https://stalw.art/docs/server/enterprise) of Stalwart and is not included in the Community Edition.

:::

## Configuration

Read replicas are configured directly on the [PostgreSQL](https://stalw.art/docs/storage/backends/postgresql#read-replicas) or [MySQL / MariaDB](https://stalw.art/docs/storage/backends/mysql#read-replicas) store; there is no standalone SQL-replica variant at the top level of [DataStore](https://stalw.art/docs/ref/object/data-store), [BlobStore](https://stalw.art/docs/ref/object/blob-store), or [SearchStore](https://stalw.art/docs/ref/object/search-store). See the backend-specific pages for the exact field list and examples.
