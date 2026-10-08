---
title: "Application"
source: https://stalw.art/docs/ref/object/application/
description: "Defines a web application served by the server."
---

# Application

> Section: Schema reference › Objects

Defines a web application served by the server.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Web Applications

## Fields

##### `enabled`

> Type: `Boolean` · default: `true`
>
> Whether the application is enabled and should be served by the server

##### `description`

> Type: `String` · required
>
> A short description of the web application

##### `resourceUrl`

> Type: `String` · required
>
> Override the URL to download application updates from.

##### `urlPrefix`

> Type: `Set<String>` · min items: 1
>
> The URL prefixes to serve the application on. For example, if set to "/admin", the application will be accessible at http://server/admin.

##### `autoUpdateFrequency`

> Type: `Duration` · default: `7776000000`
>
> Frequency to check for application updates

##### `unpackDirectory`

> Type: `String?`
>
> The local path to unpack the application bundle to. If left empty, the application will be unpacked to /tmp.

##### `oauthClientId`

> Type: `String?`
>
> The OAuth client identifier that this application uses to start the authorization flow. Only required when the domain is served by an external identity provider, in which case it must match a client registered with that provider.

## JMAP API

The Application object is available via the `urn:stalwart:jmap` capability.

### `x:Application/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysApplicationGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Application/get",
          {
            "ids": [
              "id1"
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

### `x:Application/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysApplicationCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Application/set",
          {
            "create": {
              "new1": {
                "description": "Example",
                "resourceUrl": "Example",
                "urlPrefix": {}
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

#### Update

This operation requires the `sysApplicationUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Application/set",
          {
            "update": {
              "id1": {
                "description": "updated value"
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

#### Destroy

This operation requires the `sysApplicationDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Application/set",
          {
            "destroy": [
              "id1"
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

### `x:Application/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysApplicationQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Application/query",
          {
            "filter": {}
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
stalwart-cli get Application id1
```

### Create

```sh
stalwart-cli create Application \
  --field description=Example \
  --field resourceUrl=Example \
  --field 'urlPrefix={}'
```

### Query

```sh
stalwart-cli query Application
```

### Update

```sh
stalwart-cli update Application id1 --field description='updated value'
```

### Delete

```sh
stalwart-cli delete Application --ids id1
```
