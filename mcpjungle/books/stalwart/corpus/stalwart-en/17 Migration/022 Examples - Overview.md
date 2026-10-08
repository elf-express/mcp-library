---
title: "Overview"
source: https://stalw.art/docs/migration/proxy/examples/
---

# Examples - Overview

> Section: Migration › Proxy server › Examples

The pages in this section present complete, working configurations for the three scenarios the proxy is designed for. Each is a self-contained TOML file with the surrounding context explained, and each can be adapted by substituting real hostnames, addresses, ports and certificate paths.

- [Migrating from Dovecot](https://stalw.art/docs/migration/proxy/examples/dovecot) fronts a legacy Dovecot and Postfix stack alongside a new Stalwart server, routing per account with file mappings and using `XCLIENT` forwarding for the legacy backend.
- [Upgrading Stalwart](https://stalw.art/docs/migration/proxy/examples/stalwart-upgrade) places an older and a newer Stalwart deployment behind the proxy, cutting accounts over one at a time and routing both mail and HTTP/JMAP traffic with PROXY protocol forwarding.
- [Cluster cache-locality routing](https://stalw.art/docs/migration/proxy/examples/cluster) uses the proxy in front of a Stalwart cluster to pin each account to a consistent node, keeping that node's caches warm.

The general principles behind these configurations are covered under [Destinations](https://stalw.art/docs/migration/proxy/destinations), [Listeners](https://stalw.art/docs/migration/proxy/listeners), [Mappings](https://stalw.art/docs/migration/proxy/mappings/) and [Routing](https://stalw.art/docs/migration/proxy/routing/); the examples show how the pieces fit together.
