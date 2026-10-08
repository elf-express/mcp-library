---
title: "SpamClassifier"
source: https://stalw.art/docs/ref/object/spam-classifier/
description: "Configures the spam classifier model, training parameters, and auto-learning settings."
---

# SpamClassifier

> Section: Schema reference › Objects

Configures the spam classifier model, training parameters, and auto-learning settings.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Spam Filter › Classifier

## Fields

##### `model`

> Type: [`SpamClassifierModel`](#spamclassifiermodel) · required
>
> The spam classifier model to use.

##### `learnHamFromCard`

> Type: `Boolean` · default: `true`
>
> Whether to automatically learn ham messages from senders in the user's address book.

##### `learnSpamFromRblHits`

> Type: `UnsignedInt` · default: `2` · max: 100
>
> Number of DNSBL servers that list the sender to auto-learn as spam

##### `learnSpamFromTraps`

> Type: `Boolean` · default: `true`
>
> Train as spam messages sent to spam trap addresses

##### `holdSamplesFor`

> Type: `Duration` · default: `15552000000`
>
> Duration to hold training samples for

##### `minHamSamples`

> Type: `UnsignedInt` · default: `100` · max: 10000 · min: 1
>
> Minimum number of ham samples required for training

##### `minSpamSamples`

> Type: `UnsignedInt` · default: `100` · max: 10000 · min: 1
>
> Minimum number of spam samples required for training

##### `reservoirCapacity`

> Type: `UnsignedInt` · default: `1024` · max: 100000 · min: 100
>
> The capacity of the training sample reservoir

##### `trainFrequency`

> Type: `Duration?` · default: `43200000`
>
> Frequency to train the spam classifier

##### `learnHamFromReply`

> Type: `Boolean` · default: `true`
>
> Whether to automatically learn ham messages that are replies to messages sent by the recipient.

## JMAP API

The SpamClassifier singleton is available via the `urn:stalwart:jmap` capability.

### `x:SpamClassifier/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysSpamClassifierGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamClassifier/get",
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

### `x:SpamClassifier/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysSpamClassifierUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:SpamClassifier/set",
          {
            "update": {
              "singleton": {
                "model": {
                  "@type": "FtrlFh"
                }
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
stalwart-cli get SpamClassifier
```

### Update

```sh
stalwart-cli update SpamClassifier --field model='{"@type":"FtrlFh"}'
```

## Nested types

### SpamClassifierModel

Defines the model used for spam classification.

- **`FtrlFh`**: FTRL-Proximal + Feature Hashing. Carries the fields of [`SpamClassifierFtrlFh`](#spamclassifierftrlfh).
- **`FtrlCcfh`**: FTRL-Proximal + Cuckoo Feature Hashing. Carries the fields of [`SpamClassifierFtrlCcfh`](#spamclassifierftrlccfh).
- **`Disabled`**: Disabled. No additional fields.

#### SpamClassifierFtrlFh

Defines a spam classifier model using FTRL-Proximal optimization with feature hashing.

##### `parameters`

> Type: [`FtrlParameters`](#ftrlparameters) · default: `{"numFeatures":"20"}`
>
> Hyperparameters for the FTRL-FH model

##### `featureL2Normalize`

> Type: `Boolean` · default: `true`
>
> Whether to L2-normalize feature values in the spam classifier

##### `featureLogScale`

> Type: `Boolean` · default: `true`
>
> Whether to apply sublinear scaling to feature values in the spam classifier

##### FtrlParameters

Hyperparameters for the FTRL-Proximal optimization algorithm.

##### `alpha`

> Type: `Float` · default: `2` · min: 0
>
> The alpha parameter for the FTRL-Proximal algorithm

##### `beta`

> Type: `Float` · default: `1` · min: 0
>
> The beta parameter for the FTRL-Proximal algorithm

##### `numFeatures`

> Type: [`ModelSize`](#modelsize) · default: `"20"`
>
> The number of parameters (2^n)

##### `l1Ratio`

> Type: `Float` · default: `0.001` · min: 0
>
> The L1 regularization parameter for the FTRL-Proximal algorithm

##### `l2Ratio`

> Type: `Float` · default: `0.0001` · min: 0
>
> The L2 regularization parameter for the FTRL-Proximal algorithm

#### SpamClassifierFtrlCcfh

Defines a spam classifier model using FTRL-Proximal optimization with cuckoo feature hashing.

##### `indicatorParameters`

> Type: [`FtrlParameters`](#ftrlparameters) · default: `{"numFeatures":"18"}`
>
> Hyperparameters for the indicator features in the FTRL-CCFH model

##### `parameters`

> Type: [`FtrlParameters`](#ftrlparameters) · default: `{"numFeatures":"20"}`
>
> Hyperparameters for the FTRL-FH model

##### `featureL2Normalize`

> Type: `Boolean` · default: `true`
>
> Whether to L2-normalize feature values in the spam classifier

##### `featureLogScale`

> Type: `Boolean` · default: `true`
>
> Whether to apply sublinear scaling to feature values in the spam classifier

## Enums

### ModelSize

| Value | Label |
|---|---|
| `16` | 65k |
| `17` | 131k |
| `18` | 262k |
| `19` | 524k |
| `20` | 1M |
| `21` | 2M |
| `22` | 4M |
| `23` | 8M |
| `24` | 16M |
| `25` | 33M |
| `26` | 67M |
| `27` | 134M |
| `28` | 268M |
