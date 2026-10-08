---
title: "Console"
source: https://stalw.art/docs/telemetry/tracing/console/
---

# Console

> Section: Telemetry › Tracing & Logging

The console output writes every log and trace entry to standard error. This is convenient when Stalwart runs in a container environment such as Docker, where the container runtime captures `stderr` directly.

The console output is represented by the `Stdout` variant of the [Tracer](https://stalw.art/docs/ref/object/tracer) object (found in the WebUI under <!-- breadcrumb:Tracer --> Settings › Telemetry › Tracers<!-- /breadcrumb:Tracer -->). Alongside the common tracer fields ([`enable`](https://stalw.art/docs/ref/object/tracer#enable), [`level`](https://stalw.art/docs/ref/object/tracer#level), [`lossy`](https://stalw.art/docs/ref/object/tracer#lossy), [`events`](https://stalw.art/docs/ref/object/tracer#events), [`eventsPolicy`](https://stalw.art/docs/ref/object/tracer#eventspolicy)), the variant carries:

- [`ansi`](https://stalw.art/docs/ref/object/tracer#ansi): whether ANSI escape sequences are used to colour the output. Default `false`.
- [`multiline`](https://stalw.art/docs/ref/object/tracer#multiline): whether each entry spans multiple lines. Default `false`.
- [`buffered`](https://stalw.art/docs/ref/object/tracer#buffered): whether entries are buffered before being written. Default `true`.

For example:

```json
{
  "@type": "Stdout",
  "ansi": true,
  "multiline": false,
  "buffered": true,
  "enable": true,
  "level": "trace"
}
```
