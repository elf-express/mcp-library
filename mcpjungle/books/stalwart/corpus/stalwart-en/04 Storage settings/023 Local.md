---
title: "Local"
source: https://stalw.art/docs/storage/lookup/local/
---

# Local

> Section: Storage settings › Lookup lists

Local lookup lists hold key-only membership sets and key-value pairs entirely in memory. They are well suited to small, slow-changing sets of static data, consulted from expressions or Sieve filters.

## Key-only lists

Key-only lists, useful for membership tests such as allow-lists and deny-lists, are defined through the [MemoryLookupKey](https://stalw.art/docs/ref/object/memory-lookup-key) object (found in the WebUI under <!-- breadcrumb:MemoryLookupKey --> Settings › Lookups › In-Memory Keys, Settings › Spam Filter › Lists › Blocked Domains, Settings › Spam Filter › Lists › Spam Traps, Settings › Spam Filter › Lists › Trusted Domains, Settings › Spam Filter › Lists › URL Redirectors<!-- /breadcrumb:MemoryLookupKey -->). Each record has:

- [`namespace`](https://stalw.art/docs/ref/object/memory-lookup-key#namespace): the lookup namespace the key belongs to (required). All records sharing a namespace form a single lookup list.
- [`key`](https://stalw.art/docs/ref/object/memory-lookup-key#key): the key name (required, up to 255 characters).
- [`isGlobPattern`](https://stalw.art/docs/ref/object/memory-lookup-key#isglobpattern): when `true`, the key is interpreted as a glob pattern, matching multiple concrete keys (for example `*.example.com` or `mx?.example.org`). Default: `false`.

To build a list of allowed domains, for instance, create one MemoryLookupKey record per entry, all sharing the namespace `allow-list-domain`, with the domain as the key.

## Key-value lists

Lists that associate a value with each key are defined through the [MemoryLookupKeyValue](https://stalw.art/docs/ref/object/memory-lookup-key-value) object (found in the WebUI under <!-- breadcrumb:MemoryLookupKeyValue --> Settings › Lookups › In-Memory Key-Values<!-- /breadcrumb:MemoryLookupKeyValue -->). Each record has the same [`namespace`](https://stalw.art/docs/ref/object/memory-lookup-key-value#namespace), [`key`](https://stalw.art/docs/ref/object/memory-lookup-key-value#key), and [`isGlobPattern`](https://stalw.art/docs/ref/object/memory-lookup-key-value#isglobpattern) fields as MemoryLookupKey, plus:

- [`value`](https://stalw.art/docs/ref/object/memory-lookup-key-value#value): the value associated with the key (required).
