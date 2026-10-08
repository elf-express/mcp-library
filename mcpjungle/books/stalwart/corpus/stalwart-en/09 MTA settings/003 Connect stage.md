---
title: "Connect stage"
source: https://stalw.art/docs/mta/inbound/connect/
---

# Connect stage

> Section: MTA settings › Inbound

The connect stage is the initial stage of an SMTP session, where the server and client establish a connection. It determines the hostname and greeting the server advertises, and can run a Sieve script against the incoming connection.

Connect-stage behaviour is configured on the [MtaStageConnect](https://stalw.art/docs/ref/object/mta-stage-connect) singleton (found in the WebUI under <!-- breadcrumb:MtaStageConnect --> Settings › MTA › Session › Connect Stage<!-- /breadcrumb:MtaStageConnect -->).

## Hostname

The [`hostname`](https://stalw.art/docs/ref/object/mta-stage-connect#hostname) field is an expression that returns the hostname the server uses to identify itself during the SMTP session. By default it resolves to the system hostname via `system('hostname')`.

## Greeting

The [`smtpGreeting`](https://stalw.art/docs/ref/object/mta-stage-connect#smtpgreeting) field is an expression that returns the greeting message sent to the client when the SMTP session begins. The default greeting combines the system hostname with `Stalwart ESMTP at your service`.

## Sieve script

The [`script`](https://stalw.art/docs/ref/object/mta-stage-connect#script) field selects a [Sieve script](https://stalw.art/docs/sieve/) to run before the SMTP session is allowed to proceed. This is typically used to filter connections by remote IP address: an expression selects the script name at runtime, and the script itself may reject the connection based on connection-level variables such as `remote_ip`.

For example, setting [`script`](https://stalw.art/docs/ref/object/mta-stage-connect#script) to the expression `"'connect_filter'"` runs a Sieve script named `connect_filter` which can inspect `env.remote_ip` and reject unwanted sources:

```sieve
require ["variables", "reject"];

if string "${env.remote_ip}" "192.0.2.88" {
    reject "Connection from this IP is not accepted.";
}
```

<!-- sievepad { "environment": [ { "name": "remote_ip", "value": "192.0.2.88" } ] } -->
<p><a href="https://sievepad.com/#w=TU87bsMwDL0KQXQ0jCZT4o6duhXIGAWFqjApC4tyJdoZBAM9V4_Tk5RG-uNA8PEB71Nxwm7VoPhI2OFOfX_xWeGYQungPolQUCjqzwSf7x-wY5oISsg8KDZ4PQp2-_ojET3LwqQxhwVnehs5E-wdTj6zf-6pOGzAGfNq4g4Pd06c8MlsMsvZmJtKMrWZYlJ64mF2aM_Vdt3etut2szFYnYDNVcLI76ScBE45RdAXLvDwCLYlKfgQaFA6tg7NbHaC86HBSKVYsSW-oUKqZm-ootlzThJJ9H-330RWcPL9uPz-YpnmPH8B" target="_blank" rel="noopener">Try this script in Sievepad</a></p>
<!-- /sievepad -->
