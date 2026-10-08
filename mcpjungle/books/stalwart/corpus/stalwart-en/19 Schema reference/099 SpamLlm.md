---
title: "SpamLlm"
source: https://stalw.art/docs/ref/object/spam-llm/
description: "Configures the LLM-based spam classifier."
---

# SpamLlm

> Section: Schema reference › Objects

Configures the LLM-based spam classifier.

:::note[Enterprise feature]
This object is only available with an [Enterprise license](https://stalw.art/docs/server/enterprise).
:::

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Spam Filter › LLM Classifier

## Fields

SpamLlm is a **multi-variant** object: each instance has an `@type` discriminator selecting one of the variants below, and each variant carries its own set of fields.

### `@type: "Disable"`

Disabled

### `@type: "Enable"`

Enabled

##### `categories`

> Type: `Set<String>` · default: `{"Commercial":true,"Harmful":true,"Legitimate":true,"Unsolicited":true}` · min items: 2
>
> The expected categories in the LLM response

##### `confidence`

> Type: `Set<String>` · default: `{"High":true,"Low":true,"Medium":true}`
>
> The expected confidence levels in the LLM response

##### `responsePosCategory`

> Type: `UnsignedInt` · default: `0`
>
> The position of the category field in the LLM response.

##### `responsePosConfidence`

> Type: `UnsignedInt?` · default: `1`
>
> The position of the confidence field in the LLM response.

##### `responsePosExplanation`

> Type: `UnsignedInt?` · default: `2`
>
> The position of the explanation field in the LLM response.

##### `modelId`

> Type: `Id<`[`AiModel`](https://stalw.art/docs/ref/object/ai-model)`>` · required
>
> The AI model to use for the LLM classifier

##### `prompt`

> Type: `Text` · required
>
> The prompt to use for the LLM classifier

##### `separator`

> Type: `String` · default: `","`
>
> The separator character used to parse the LLM response.

##### `temperature`

> Type: `Float` · default: `0.5` · max: 1 · min: 0
>
> The temperature to use for the LLM classifier

## JMAP API

The SpamLlm singleton is available via the `urn:stalwart:jmap` capability.

### `x:SpamLlm/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysSpamLlmGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamLlm/get",
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

### `x:SpamLlm/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysSpamLlmUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamLlm/set",
          {
            "update": {
              "singleton": {
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

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get SpamLlm
```

### Update

```sh
stalwart-cli update SpamLlm --field description='updated value'
```
