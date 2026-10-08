---
title: "TaskManager"
source: https://stalw.art/docs/ref/object/task-manager/
description: "Configures task execution settings including retry strategies."
---

# TaskManager

> Section: Schema reference › Objects

Configures task execution settings including retry strategies.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Task Manager

## Fields

##### `maxAttempts`

> Type: `UnsignedInt` · default: `3` · min: 1
>
> Maximum number of attempts for retrying a task

##### `strategy`

> Type: [`TaskRetryStrategy`](#taskretrystrategy) · required
>
> Strategy to use for retrying failed tasks

##### `totalDeadline`

> Type: `Duration` · default: `21600000`
>
> Total deadline for retrying a task before it is marked as failed

## JMAP API

The TaskManager singleton is available via the `urn:stalwart:jmap` capability.

### `x:TaskManager/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysTaskManagerGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:TaskManager/get",
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

### `x:TaskManager/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysTaskManagerUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:TaskManager/set",
          {
            "update": {
              "singleton": {
                "maxAttempts": 3
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
stalwart-cli get TaskManager
```

### Update

```sh
stalwart-cli update TaskManager --field maxAttempts=3
```

## Nested types

### TaskRetryStrategy

Retry strategy for failed tasks.

- **`ExponentialBackoff`**: Exponential backoff. Carries the fields of [`TaskRetryStrategyBackoff`](#taskretrystrategybackoff).
- **`FixedDelay`**: Fixed delay. Carries the fields of [`TaskRetryStrategyFixed`](#taskretrystrategyfixed).

#### TaskRetryStrategyBackoff

Exponential backoff retry strategy settings.

##### `factor`

> Type: `Float` · default: `2.0` · min: 1
>
> Backoff factor for calculating retry delays

##### `initialDelay`

> Type: `Duration` · default: `60000`
>
> Initial delay before retrying a failed task

##### `maxDelay`

> Type: `Duration` · default: `1800000`
>
> Maximum delay between retry attempts

##### `jitter`

> Type: `Boolean` · default: `true`
>
> Whether to apply jitter to the retry delay to avoid thundering herd problem

#### TaskRetryStrategyFixed

Fixed delay retry strategy settings.

##### `delay`

> Type: `Duration` · default: `300000`
>
> Fixed delay before retrying a failed task
