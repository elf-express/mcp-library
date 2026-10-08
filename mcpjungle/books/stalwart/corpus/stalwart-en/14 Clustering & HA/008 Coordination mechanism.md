---
title: "Coordination mechanism"
source: https://stalw.art/docs/cluster/configuration/coordination/
---

# Coordination mechanism

> Section: Clustering & HA › Configuration

Stalwart requires a coordination mechanism to enable communication between nodes in a cluster. Coordination allows nodes to exchange internal updates, detect failures, and remain synchronised during operation. For a full overview of how coordination works and the available options (peer-to-peer, Kafka, NATS, and Redis), refer to the [Coordination](https://stalw.art/docs/cluster/coordination/) section of this documentation.

Coordination is configured on the [Coordinator](https://stalw.art/docs/ref/object/coordinator) singleton (found in the WebUI under <!-- breadcrumb:Coordinator --> Settings › Cluster › Coordinator<!-- /breadcrumb:Coordinator -->). The singleton is a multi-variant object: selecting a variant chooses the backend, and each variant carries its own fields. The supported variants are:

- `Disabled`: coordination is turned off. Suitable for single-node installations.
- `Default`: uses the configured [in-memory store](https://stalw.art/docs/storage/in-memory) for coordination (Redis only).
- `Zenoh`: peer-to-peer coordination over Eclipse Zenoh.
- `Kafka`: Apache Kafka or a Kafka-compatible platform such as Redpanda.
- `Nats`: NATS messaging.
- `Redis`: a standalone Redis server.
- `RedisCluster`: a Redis Cluster deployment.

All nodes in the cluster must use the same coordination backend to function correctly. The backend-specific configuration fields are covered in the dedicated pages for [peer-to-peer](https://stalw.art/docs/cluster/coordination/peer-to-peer), [Kafka](https://stalw.art/docs/cluster/coordination/kafka), [NATS](https://stalw.art/docs/cluster/coordination/nats), and [Redis](https://stalw.art/docs/cluster/coordination/redis).
