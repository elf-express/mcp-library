---
title: "AI Models"
source: https://stalw.art/docs/server/ai-models/
---

# AI Models

> Section: Server settings

Stalwart can call out to large language models for tasks such as [spam classification](https://stalw.art/docs/spamfilter/llm), threat detection, and [message categorization](https://stalw.art/docs/sieve/llm). Any endpoint that exposes an OpenAI-compatible chat or text-completion API is supported, whether hosted by a provider such as OpenAI or Anthropic or run locally through a tool such as LocalAI. This choice lets operators balance cost, latency, and privacy according to the deployment.

:::tip[Enterprise feature]

This feature is available exclusively in the [Enterprise Edition](https://stalw.art/docs/server/enterprise) of Stalwart and is not included in the Community Edition.

:::

## Configuration

Each AI endpoint is represented by an [AiModel](https://stalw.art/docs/ref/object/ai-model) object (found in the WebUI under <!-- breadcrumb:AiModel --> Settings › AI<!-- /breadcrumb:AiModel -->). The relevant fields are:

- [`name`](https://stalw.art/docs/ref/object/ai-model#name): short identifier for the model within Stalwart.
- [`url`](https://stalw.art/docs/ref/object/ai-model#url): full URL of the OpenAI-compatible endpoint (for example `https://api.openai.com/v1/chat/completions`).
- [`model`](https://stalw.art/docs/ref/object/ai-model#model): the model name to send to the endpoint, such as `gpt-4`.
- [`modelType`](https://stalw.art/docs/ref/object/ai-model#modeltype): `Chat` for chat completions or `Text` for text completions. Default `Chat`.
- [`timeout`](https://stalw.art/docs/ref/object/ai-model#timeout): maximum time to wait for a response, in milliseconds. Default two minutes (`120000`).
- [`temperature`](https://stalw.art/docs/ref/object/ai-model#temperature): randomness of the response, in the range `0.0` to `1.0`. Default `0.7`.
- [`allowInvalidCerts`](https://stalw.art/docs/ref/object/ai-model#allowinvalidcerts): whether to accept invalid TLS certificates. Default `false`. Recommended only for local or self-signed endpoints.
- [`httpAuth`](https://stalw.art/docs/ref/object/ai-model#httpauth): authentication method, either `Unauthenticated`, `Basic`, or `Bearer`.
- [`httpHeaders`](https://stalw.art/docs/ref/object/ai-model#httpheaders): additional HTTP headers sent with every request.

For example, a chat endpoint authenticated with a bearer token and an extra custom header:

```json
{
  "name": "chat",
  "url": "https://api.openai.com/v1/chat/completions",
  "model": "gpt-4",
  "modelType": "Chat",
  "timeout": 120000,
  "temperature": 0.7,
  "allowInvalidCerts": false,
  "httpAuth": {
    "@type": "Bearer",
    "bearerToken": {
      "@type": "Value",
      "secret": "my-secret-token"
    }
  },
  "httpHeaders": {
    "X-My-Header": "my-value"
  }
}
```
