---
title: "S3-compatible"
source: https://stalw.art/docs/storage/backends/s3/
---

# S3-compatible

> Section: Storage settings › Backends

For distributed and larger-scale deployments, Stalwart supports S3-compatible object storage services as a blob store. S3 (Simple Storage Service) is a scalable object-storage protocol supported by many cloud providers. Using an S3-compatible service lets the server hold email bodies, Sieve scripts, and other blobs on remote infrastructure suited to large-scale storage management, replication, and backup.

## Configuration

The S3-compatible backend is selected by choosing the `S3` variant on the [BlobStore](https://stalw.art/docs/ref/object/blob-store) object (found in the WebUI under <!-- breadcrumb:BlobStore --> Settings › Storage › Blob Store<!-- /breadcrumb:BlobStore -->). The variant exposes the following fields:

- [`bucket`](https://stalw.art/docs/ref/object/blob-store#bucket): the S3 bucket where blobs are stored (required).
- [`region`](https://stalw.art/docs/ref/object/blob-store#region): the S3 region where the bucket resides (required). A large set of well-known regions is supported; a custom endpoint and region name can be supplied for S3-compatible services such as MinIO.
- [`accessKey`](https://stalw.art/docs/ref/object/blob-store#accesskey): the S3 access key identifying the account.
- [`secretKey`](https://stalw.art/docs/ref/object/blob-store#secretkey): the secret key associated with the account (required). The secret may be supplied inline, read from an environment variable, or loaded from a file.
- [`securityToken`](https://stalw.art/docs/ref/object/blob-store#securitytoken) and [`sessionToken`](https://stalw.art/docs/ref/object/blob-store#sessiontoken): optional tokens used for temporary credentials such as those issued by AWS STS. Leave set to `None` for permanent IAM credentials or for services that do not support STS.
- [`profile`](https://stalw.art/docs/ref/object/blob-store#profile): optional profile name for retrieving credentials from a shared credentials file.
- [`timeout`](https://stalw.art/docs/ref/object/blob-store#timeout): maximum time to wait for a response from the S3 service. Default: `"30s"`.
- [`maxRetries`](https://stalw.art/docs/ref/object/blob-store#maxretries): maximum number of retries for a failed operation. Default: `3`.
- [`verifyAfterWrite`](https://stalw.art/docs/ref/object/blob-store#verifyafterwrite): when `true`, performs a `HEAD` after every successful `PUT` to confirm the object is readable on the backend. Defends against backends that acknowledge writes without persisting the data. Default: `true`.
- [`keyPrefix`](https://stalw.art/docs/ref/object/blob-store#keyprefix): optional prefix prepended to every object key, useful for organising or segregating data within a bucket.
- [`allowInvalidCerts`](https://stalw.art/docs/ref/object/blob-store#allowinvalidcerts): when `true`, accepts connections with invalid TLS certificates. Default: `false`.

For a custom S3-compatible endpoint, set `region` to the `Custom` variant and supply the target endpoint URL and region name.

:::caution
Some S3-compatible backends acknowledge a `PUT` with `200 OK` before the bytes are actually persisted, then silently lose the data if a replica fails: no error ever reaches the client. This has been observed on self-hosted Ceph clusters under load, on certain low-cost S3-compatible providers, and through misbehaving sigv4 implementations or intermediate proxies that drop the request body. Because email is archival (once accepted, a delivery cannot be replayed), Stalwart enables [`verifyAfterWrite`](https://stalw.art/docs/ref/object/blob-store#verifyafterwrite) by default, issuing a `HEAD` after every successful `PUT` to confirm the object is visible to the read path. If your provider honors the durability contract (AWS S3, Cloudflare R2, Backblaze B2, and similar reputable services do), you can safely set this option to `false` to save one round-trip per write.
:::
