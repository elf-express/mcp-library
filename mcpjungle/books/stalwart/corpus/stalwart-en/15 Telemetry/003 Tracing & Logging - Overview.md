---
title: "Overview"
source: https://stalw.art/docs/telemetry/tracing/
---

# Tracing & Logging - Overview

> Section: Telemetry › Tracing & Logging

Stalwart produces detailed tracing and logging output that can be directed to several destinations in parallel, each with its own severity threshold and event filters. Multiple tracers can be configured side by side; the destination and filter choices determine what each consumer receives.

Each tracer is an instance of the [Tracer](https://stalw.art/docs/ref/object/tracer) object (found in the WebUI under <!-- breadcrumb:Tracer --> Settings › Telemetry › Tracers<!-- /breadcrumb:Tracer -->). The object is multi-variant: the chosen variant selects the output method and the fields it carries, while a set of common fields ([`enable`](https://stalw.art/docs/ref/object/tracer#enable), [`level`](https://stalw.art/docs/ref/object/tracer#level), [`lossy`](https://stalw.art/docs/ref/object/tracer#lossy), [`events`](https://stalw.art/docs/ref/object/tracer#events), [`eventsPolicy`](https://stalw.art/docs/ref/object/tracer#eventspolicy)) apply to every variant.

The supported variants are:

- [OpenTelemetry](https://stalw.art/docs/telemetry/tracing/opentelemetry): sends traces and logs to an OpenTelemetry collector over HTTP or gRPC. Two variants, `OtelHttp` and `OtelGrpc`, cover the two transports.
- [Log file](https://stalw.art/docs/telemetry/tracing/log): writes entries to a text file with rotation (`Log` variant).
- [Journal](https://stalw.art/docs/telemetry/tracing/journal): forwards entries to the systemd journal (`Journal` variant). Linux only.
- [Console](https://stalw.art/docs/telemetry/tracing/console): prints entries to standard error (`Stdout` variant).

## Logging levels

The verbosity of a tracer is set through [`level`](https://stalw.art/docs/ref/object/tracer#level). The available levels are:

- `error`: only critical errors that threaten normal operation.
- `warn`: warnings that indicate potential problems.
- `info`: general informational output.
- `debug`: detailed diagnostic information useful when troubleshooting.
- `trace`: the most verbose level, logging nearly every internal operation.

A tracer can be switched off without deleting it by setting [`enable`](https://stalw.art/docs/ref/object/tracer#enable) to `false`.

## Event filters

Each tracer can be narrowed to a specific set of events through [`events`](https://stalw.art/docs/ref/object/tracer#events) together with [`eventsPolicy`](https://stalw.art/docs/ref/object/tracer#eventspolicy). The policy is either `include` (only the listed events are emitted) or `exclude` (the listed events are suppressed and everything else is emitted). The list of event identifiers is documented on the [Events](https://stalw.art/docs/telemetry/events) page.

## Backpressure

If a tracer cannot keep up with the emitted volume, the default behaviour is to apply backpressure. Setting [`lossy`](https://stalw.art/docs/ref/object/tracer#lossy) to `true` lets the server drop entries instead, which is appropriate when loss of detail is preferable to slowing down the main event path.
