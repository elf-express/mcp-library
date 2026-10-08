---
title: "SQLite"
source: https://stalw.art/docs/storage/backends/sqlite/
---

# SQLite

> Section: Storage settings › Backends

SQLite is a self-contained, serverless, zero-configuration database engine. Its simplicity and reliability make it well suited to small single-node installations. Data can be replicated for redundancy using external tools such as Litestream, which provides continuous replication of SQLite database files.

## Configuration

The SQLite backend is selected by choosing the `Sqlite` variant on the [DataStore](https://stalw.art/docs/ref/object/data-store) object (found in the WebUI under <!-- breadcrumb:DataStore --> Settings › Storage › Data Store<!-- /breadcrumb:DataStore -->). The variant exposes the following fields:

- [`path`](https://stalw.art/docs/ref/object/data-store#path): path to the SQLite database file (required). If the file does not exist, it is created automatically.
- [`poolMaxConnections`](https://stalw.art/docs/ref/object/data-store#poolmaxconnections): maximum number of concurrent database connections. Default: `10`.
- [`poolWorkers`](https://stalw.art/docs/ref/object/data-store#poolworkers): number of worker threads dedicated to blocking database operations. Defaults to the number of CPU cores available on the host.
