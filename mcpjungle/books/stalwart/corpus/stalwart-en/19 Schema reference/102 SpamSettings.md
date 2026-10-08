---
title: "SpamSettings"
source: https://stalw.art/docs/ref/object/spam-settings/
description: "Configures global spam filter thresholds, greylisting, and trust settings."
---

# SpamSettings

> Section: Schema reference › Objects

Configures global spam filter thresholds, greylisting, and trust settings.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Spam Filter › General

## Fields

##### `trustContacts`

> Type: `Boolean` · default: `true`
>
> Never classify messages as spam if they are sent from addresses present in the user's address book.

##### `enable`

> Type: `Boolean` · default: `true`
>
> Whether to enable the spam filter

##### `greylistFor`

> Type: `Duration?`
>
> Time to keep an IP address in the grey list. The grey list is used to delay messages from unknown senders.

##### `scoreDiscard`

> Type: `Float` · default: `0` · max: 100 · min: -100
>
> Discard messages with a score above this threshold

##### `scoreReject`

> Type: `Float` · default: `0` · max: 100 · min: -100
>
> Reject messages with a score above this threshold

##### `scoreSpam`

> Type: `Float` · default: `5` · max: 100 · min: -100
>
> Mark as Spam messages with a score above this threshold

##### `trustReplies`

> Type: `Boolean` · default: `true`
>
> Never classify messages as spam if they are replies to messages sent by the recipient.

##### `spamFilterRulesUrl`

> Type: `Uri?` · default: `"https://github.com/stalwartlabs/spam-filter/releases/latest/download/spam-filter-rules.json.gz"`
>
> URL to download spam filter rules from

## JMAP API

The SpamSettings singleton is available via the `urn:stalwart:jmap` capability.

### `x:SpamSettings/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysSpamSettingsGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamSettings/get",
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

### `x:SpamSettings/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysSpamSettingsUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamSettings/set",
          {
            "update": {
              "singleton": {
                "trustContacts": true
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
stalwart-cli get SpamSettings
```

### Update

```sh
stalwart-cli update SpamSettings --field trustContacts=true
```
