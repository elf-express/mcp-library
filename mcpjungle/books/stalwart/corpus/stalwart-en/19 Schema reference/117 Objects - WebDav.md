---
title: "WebDav"
source: https://stalw.art/docs/ref/object/web-dav/
description: "Configures WebDAV protocol settings including property limits and locking."
---

# Objects - WebDav

> Section: Schema reference › Objects

Configures WebDAV protocol settings including property limits and locking.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Network › WebDAV

## Fields

##### `enableAssistedDiscovery`

> Type: `Boolean` · default: `true`
>
> Enables assisted discovery of WebDAV shared collections by modifying PROPFIND requests to the root collection. Requests with depth 1 are automatically changed to depth 2, which may cause compatibility issues with some clients that expect the original behavior.

##### `maxLockTimeout`

> Type: `Duration` · default: `3600000`
>
> Specifies the maximum duration for which a lock can be held on a resource

##### `maxLocks`

> Type: `UnsignedInt` · default: `10`
>
> Specifies the maximum number of locks that a user can create on a resource

##### `deadPropertyMaxSize`

> Type: `Size?` · default: `1024`
>
> Specifies the maximum size of a WebDAV dead property value that the server will accept

##### `livePropertyMaxSize`

> Type: `Size` · default: `250`
>
> Specifies the maximum size of a WebDAV live property value that the server will accept

##### `requestMaxSize`

> Type: `Size` · default: `26214400`
>
> Determines the maximum XML size of a WebDAV request that the server will accept

##### `maxResults`

> Type: `UnsignedInt` · default: `2000`
>
> Specifies the maximum number of results that a WebDAV query can return

## JMAP API

The WebDav singleton is available via the `urn:stalwart:jmap` capability.

### `x:WebDav/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysWebDavGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:WebDav/get",
          {
            "ids": [
              "singleton"
            ]
          },
          "c1"
        ]
      ],
      "using": [
        "urn:ietf:params:jmap:core",
        "urn:stalwart:jmap"
      ]
    }'
```

### `x:WebDav/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysWebDavUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:WebDav/set",
          {
            "update": {
              "singleton": {
                "enableAssistedDiscovery": true
              }
            }
          },
          "c1"
        ]
      ],
      "using": [
        "urn:ietf:params:jmap:core",
        "urn:stalwart:jmap"
      ]
    }'
```

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get WebDav
```

### Update

```sh
stalwart-cli update WebDav --field enableAssistedDiscovery=true
```
