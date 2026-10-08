---
title: "Log file"
source: https://stalw.art/docs/telemetry/tracing/log/
---

# Log file

> Section: Telemetry › Tracing & Logging

Log-file output writes entries to a text file on disk. The file can be rotated at a fixed frequency so that long-running installations do not accumulate a single unbounded log.

Log-file output is represented by the `Log` variant of the [Tracer](https://stalw.art/docs/ref/object/tracer) object (found in the WebUI under <!-- breadcrumb:Tracer --> Settings › Telemetry › Tracers<!-- /breadcrumb:Tracer -->). Alongside the common tracer fields ([`enable`](https://stalw.art/docs/ref/object/tracer#enable), [`level`](https://stalw.art/docs/ref/object/tracer#level), [`lossy`](https://stalw.art/docs/ref/object/tracer#lossy), [`events`](https://stalw.art/docs/ref/object/tracer#events), [`eventsPolicy`](https://stalw.art/docs/ref/object/tracer#eventspolicy)), the variant carries:

- [`path`](https://stalw.art/docs/ref/object/tracer#path): directory in which the log files are written. Required.
- [`prefix`](https://stalw.art/docs/ref/object/tracer#prefix): filename prefix for each log file. Default `"stalwart"`.
- [`rotate`](https://stalw.art/docs/ref/object/tracer#rotate): rotation frequency. One of `daily`, `hourly`, `minutely`, or `never`. Default `daily`.
- [`ansi`](https://stalw.art/docs/ref/object/tracer#ansi): whether ANSI escape sequences are used to colour the output. Default `true`.
- [`multiline`](https://stalw.art/docs/ref/object/tracer#multiline): whether each entry spans multiple lines. Default `false`.

For example:

```json
{
  "@type": "Log",
  "path": "/opt/stalwart/logs",
  "prefix": "stalwart.log",
  "rotate": "daily",
  "ansi": true,
  "multiline": false,
  "enable": true,
  "level": "info"
}
```
