---
title: "SpamTrainingSample"
source: https://stalw.art/docs/ref/object/spam-training-sample/
description: "Stores an email sample used for spam classifier training."
---

# SpamTrainingSample

> Section: Schema reference › Objects

Stores an email sample used for spam classifier training.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Account › Spam Samples

## Fields

##### `from`

> Type: `EmailAddress` · read-only · server-set
>
> Email address of the sender of the message associated with this training sample

##### `subject`

> Type: `String` · server-set
>
> Subject of the message associated with this training sample

##### `blobId`

> Type: `BlobId` · read-only
>
> Reference to the stored message content

##### `isSpam`

> Type: `Boolean` · read-only · default: `false`
>
> Indicates whether the sample is spam (true) or ham (false)

##### `accountId`

> Type: `Id<`[`Account`](https://stalw.art/docs/ref/object/account)`>?` · read-only
>
> Identifier of the account associated with this training sample

##### `expiresAt`

> Type: `UTCDateTime` · server-set
>
> Timestamp when the training sample is scheduled to expire

##### `deleteAfterUse`

> Type: `Boolean` · read-only · default: `false`
>
> Indicates whether the training sample should be deleted after being used for training

## JMAP API

The SpamTrainingSample object is available via the `urn:stalwart:jmap` capability.

### `x:SpamTrainingSample/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysSpamTrainingSampleGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamTrainingSample/get",
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

### `x:SpamTrainingSample/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysSpamTrainingSampleCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamTrainingSample/set",
          {
            "create": {
              "new1": {}
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

This operation requires the `sysSpamTrainingSampleUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamTrainingSample/set",
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

This operation requires the `sysSpamTrainingSampleDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamTrainingSample/set",
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

### `x:SpamTrainingSample/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysSpamTrainingSampleQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamTrainingSample/query",
          {
            "filter": {
              "accountId": "id1"
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

The `x:SpamTrainingSample/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `accountId` | id of Account |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get SpamTrainingSample id1
```

### Create

```sh
stalwart-cli create SpamTrainingSample
```

### Query

```sh
stalwart-cli query SpamTrainingSample
stalwart-cli query SpamTrainingSample --where accountId=id1
```

### Update

```sh
stalwart-cli update SpamTrainingSample id1 --field description='updated value'
```

### Delete

```sh
stalwart-cli delete SpamTrainingSample --ids id1
```
