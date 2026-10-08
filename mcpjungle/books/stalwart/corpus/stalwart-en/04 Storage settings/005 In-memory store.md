---
title: "In-memory store"
source: https://stalw.art/docs/storage/in-memory/
---

# In-memory store

> Section: Storage settings

In-memory data stores (such as Redis) are high-performance databases that keep data entirely in RAM, making read and write operations extremely fast. They are well suited to caching, message brokering, and short-lived state that does not need long-term persistence.

Within Stalwart, the in-memory store backs a range of short-lived data:

- [Rate limiting](https://stalw.art/docs/mta/outbound/rate-limit) and [fail2ban](https://stalw.art/docs/server/auto-ban) counters, such as the number of messages sent by a given sender or the number of failed authentication attempts from an IP.
- Distributed locks that coordinate concurrent tasks, including account purge, email queue processing, and housekeeping.
- [OAuth authorisation codes](https://stalw.art/docs/auth/oauth/) used during the authorisation flow.
- [ACME tokens](https://stalw.art/docs/server/tls/acme/) for SSL/TLS certificate management.
- Short-lived tracking data such as [greylisting](https://stalw.art/docs/spamfilter/greylist) tokens and [Sieve](https://stalw.art/docs/sieve/) auto-responder IDs.

## Backends

Backend selection is made on the [InMemoryStore](https://stalw.art/docs/ref/object/in-memory-store) singleton (found in the WebUI under <!-- breadcrumb:InMemoryStore --> Settings › Storage › In-Memory Store<!-- /breadcrumb:InMemoryStore -->). The object is a multi-variant type. The supported variants are:

- [Redis, Valkey, Memcached, or compatible](https://stalw.art/docs/storage/backends/redis): the `Redis` and `RedisCluster` variants, recommended for high-performance, distributed, or heavily loaded environments.
- The `Default` variant, which uses the configured data store (SQL, FoundationDB, RocksDB) as the in-memory store. This is a convenient choice when minimising external dependencies, though Redis is better suited to heavy write loads and distributed setups.
- The `Sharded` variant, which distributes key-value pairs across multiple Redis or Redis Cluster backends by hashing keys modulo the number of configured stores. See the [Sharded in-memory store](https://stalw.art/docs/storage/backends/composite/sharded-in-memory) page for further detail.

## Key prefixes

In-memory stores operate as key-value stores. Stalwart assigns a unique integer prefix to each category of data so that keys never collide across subsystems. The mapping is fixed and shown below for reference:

| **Short name**                      | **Description**                                      | **Integer prefix** |
|-------------------------------------|------------------------------------------------------|--------------------|
| `KV_ACME`                           | ACME tokens for SSL/TLS certificate management       | 0                  |
| `KV_OAUTH`                          | OAuth authorisation codes                            | 1                  |
| `KV_RATE_LIMIT_RCPT`                | Rate limiting data for recipient addresses           | 2                  |
| `KV_RATE_LIMIT_SCAN`                | Rate limiting data for email scanning                | 3                  |
| `KV_RATE_LIMIT_LOITER`              | Rate limiting data for idle connections              | 4                  |
| `KV_RATE_LIMIT_AUTH`                | Rate limiting data for authentication attempts       | 5                  |
| `KV_RATE_LIMIT_SMTP`                | Rate limiting data for SMTP throttles                | 6                  |
| `KV_RATE_LIMIT_CONTACT`             | Rate limiting data for contact forms                 | 7                  |
| `KV_RATE_LIMIT_HTTP_AUTHENTICATED`  | Rate limiting data for authenticated HTTP requests   | 8                  |
| `KV_RATE_LIMIT_HTTP_ANONYMOUS`      | Rate limiting data for anonymous HTTP requests       | 9                  |
| `KV_RATE_LIMIT_IMAP`                | Rate limiting data for IMAP connections              | 10                 |
| `KV_QUOTA_BLOB`                     | Blob-quota accounting                                | 11                 |
| `KV_GREYLIST`                       | Spam filter greylist tokens                          | 16                 |
| `KV_LOCK_QUEUE_MESSAGE`             | Lock for SMTP message queues                         | 21                 |
| `KV_LOCK_TASK`                      | Lock for background tasks                            | 23                 |
| `KV_LOCK_DAV`                       | WebDAV locks                                         | 25                 |
| `KV_SIEVE_ID`                       | Sieve auto-responder tracking ids                    | 26                 |

This structured approach ensures data integrity and prevents key collisions across subsystems within the in-memory store.

## Data persistence

Most keys held in the in-memory store are transient: rate-limit counters, fail2ban records, authorisation codes, and short-lived tokens do not need to survive a restart. Configuring persistence on the backend is therefore not usually required.

## Configuration

To change the in-memory store backend, update the InMemoryStore singleton and select the appropriate variant. Variant-specific fields such as [`url`](https://stalw.art/docs/ref/object/in-memory-store#url) and [`timeout`](https://stalw.art/docs/ref/object/in-memory-store#timeout) apply to the Redis variant; [`urls`](https://stalw.art/docs/ref/object/in-memory-store#urls), [`authUsername`](https://stalw.art/docs/ref/object/in-memory-store#authusername), [`authSecret`](https://stalw.art/docs/ref/object/in-memory-store#authsecret), [`readFromReplicas`](https://stalw.art/docs/ref/object/in-memory-store#readfromreplicas), and [`protocolVersion`](https://stalw.art/docs/ref/object/in-memory-store#protocolversion) apply to the RedisCluster variant. See the [InMemoryStore reference](https://stalw.art/docs/ref/object/in-memory-store) for the full field list per variant.

## Lookup keys for expressions and Sieve

Lookup data consumed by expressions and Sieve scripts is kept in the same InMemoryStore singleton; there is no separate named store per lookup. Individual entries are modelled as [MemoryLookupKey](https://stalw.art/docs/ref/object/memory-lookup-key) (found in the WebUI under <!-- breadcrumb:MemoryLookupKey --> Settings › Lookups › In-Memory Keys, Settings › Spam Filter › Lists › Blocked Domains, Settings › Spam Filter › Lists › Spam Traps, Settings › Spam Filter › Lists › Trusted Domains, Settings › Spam Filter › Lists › URL Redirectors<!-- /breadcrumb:MemoryLookupKey -->) for membership-style lookups and as [MemoryLookupKeyValue](https://stalw.art/docs/ref/object/memory-lookup-key-value) (found in the WebUI under <!-- breadcrumb:MemoryLookupKeyValue --> Settings › Lookups › In-Memory Key-Values<!-- /breadcrumb:MemoryLookupKeyValue -->) for key-value lookups. Each record carries its own [`namespace`](https://stalw.art/docs/ref/object/memory-lookup-key#namespace), so distinct lookup sets coexist within the single backend.

## Maintenance

When a persistent data store (SQL, FoundationDB, RocksDB) is used as the in-memory store through the `Default` variant, expired keys must be purged periodically. This is handled by the general data-store clean-up task, scheduled through [`dataCleanupSchedule`](https://stalw.art/docs/ref/object/data-retention#datacleanupschedule) on the [DataRetention](https://stalw.art/docs/ref/object/data-retention) object (found in the WebUI under <!-- breadcrumb:DataRetention --> Settings › Storage › Data Retention › Archiving, Settings › Storage › Data Retention › Data Cleanup, Settings › Storage › Data Retention › Auto-Expunge, Settings › Storage › Data Retention › Telemetry<!-- /breadcrumb:DataRetention -->). When Redis or Redis Cluster is used, expiry is handled natively by the backend and no scheduled clean-up is required.
