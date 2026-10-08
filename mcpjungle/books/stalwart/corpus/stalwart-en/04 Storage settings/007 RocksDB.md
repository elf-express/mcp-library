---
title: "RocksDB"
source: https://stalw.art/docs/storage/backends/rocksdb/
---

# RocksDB

> Section: Storage settings › Backends

RocksDB is an embeddable, high-performance, persistent key-value store originally developed at Facebook. It is well suited to fast storage devices such as SSDs, and its efficient use of CPU and memory makes it a popular choice for embedded workloads. RocksDB is the recommended backend for single-node installations of Stalwart because of its speed and reliability.

## Configuration

The RocksDB backend is selected by choosing the `RocksDb` variant on the [DataStore](https://stalw.art/docs/ref/object/data-store) object (found in the WebUI under <!-- breadcrumb:DataStore --> Settings › Storage › Data Store<!-- /breadcrumb:DataStore -->). The variant exposes the following fields:

- [`path`](https://stalw.art/docs/ref/object/data-store#path): filesystem path where the RocksDB data directory is stored (required).
- [`blobSize`](https://stalw.art/docs/ref/object/data-store#blobsize): minimum size, in bytes, for an object to be stored in the blob store rather than inline in the metadata store. Default: `16834`.
- [`bufferSize`](https://stalw.art/docs/ref/object/data-store#buffersize): size of the in-memory write buffer, in bytes. A larger buffer improves write throughput at the cost of memory. Default: `134217728` (128 MB).
- [`poolWorkers`](https://stalw.art/docs/ref/object/data-store#poolworkers): number of worker threads dedicated to database operations. Defaults to the number of CPU cores available on the host.

RocksDB is also available as a backend for other stores (blob, search, in-memory) through the `Default` variant of the [BlobStore](https://stalw.art/docs/ref/object/blob-store), [SearchStore](https://stalw.art/docs/ref/object/search-store), and [InMemoryStore](https://stalw.art/docs/ref/object/in-memory-store) objects, in which case they reuse the configured data store.
