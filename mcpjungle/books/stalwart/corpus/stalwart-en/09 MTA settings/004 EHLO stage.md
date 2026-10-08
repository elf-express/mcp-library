---
title: "EHLO stage"
source: https://stalw.art/docs/mta/inbound/ehlo/
---

# EHLO stage

> Section: MTA settings › Inbound

The `EHLO` (Extended Hello) command is sent by an email client to the server to initiate an SMTP session and negotiate the features and extensions that will be used during the session. The `EHLO` command provides a way for the email client to identify itself, and for the server to advertise the capabilities and extensions it supports, such as authentication mechanisms, message size limits, and others. The response to the `EHLO` command provides information to the client about the server's capabilities, which the client can then use to determine the best way to send the email.

## Settings

EHLO-stage behaviour is configured on the [MtaStageEhlo](https://stalw.art/docs/ref/object/mta-stage-ehlo) singleton (found in the WebUI under <!-- breadcrumb:MtaStageEhlo --> Settings › MTA › Session › EHLO Stage<!-- /breadcrumb:MtaStageEhlo -->). The relevant fields are [`require`](https://stalw.art/docs/ref/object/mta-stage-ehlo#require) (whether the remote client must send an `EHLO`, `HELO`, or `LHLO` command before starting an SMTP transaction; enabling this lets Stalwart verify the [SPF](https://stalw.art/docs/mta/authentication/spf) EHLO identity of the client, default `true`), [`rejectNonFqdn`](https://stalw.art/docs/ref/object/mta-stage-ehlo#rejectnonfqdn) (whether to reject `EHLO` commands that do not include a fully-qualified domain name as a parameter; the default enables the check only on `local_port == 25`, so that submission listeners accept client hostnames that may not be fully qualified), and [`script`](https://stalw.art/docs/ref/object/mta-stage-ehlo#script) (the [Sieve script](https://stalw.art/docs/sieve/) to run after a successful `EHLO` command; a typical use is to block specific HELO domains by matching the `helo_domain` variable against an in-memory list).

Example configuration setting all three fields together, including a per-listener override for `rejectNonFqdn` and a Sieve script selector:

```json
{
  "require": {"else": "true"},
  "rejectNonFqdn": {
    "match": {"0": {"if": "listener == 'smtp'", "then": "true"}},
    "else": "false"
  },
  "script": {"else": "'ehlo'"}
}
```

A companion Sieve script `ehlo` rejects HELO domains present in a blocked-domain list:

```sieve
require ["variables", "extlists", "reject"];

if string :list "${env.helo_domain}" "blocked-domain" {
    reject "551 5.1.1 Sending domain '${env.helo_domain}' has been blocklisted.";
}
```

<!-- sievepad { "environment": [ { "name": "helo_domain", "value": "spam.example.net" } ], "lists": [ { "name": "blocked-domain", "values": [ "spam.example.net" ] } ] } -->
<p><a href="https://sievepad.com/#w=ZVDBaoRADP2VEAp7sYIHL_Zc6KHQwx53pIya7k47RndmtAsi9Lv6Of2SZtYKls0tLy_vJW_CEYssQdYtYYH7oO2ndgGarvYFPD49v4AP-kjw8_UNewrB8NFjgr52pg8ei8O07rbacJx0g6tj7-g8GEdwUDhqZ3RlyStMQCFdgjU-_HWO3qkOCssHxYrNmxg6cYEicmR-NxGP6Yls99p00WRWKHBlu_qDmvsFE2hSDFKLnBDyPIM8zdJM7uYmKi5U2N0q7uCkPVREDFfdaE1NqlBumhXjXCbYkveSRPxZOr9mUUwoasZ13BKHbSAbA8ll1HaIqO91m9JFt72llClcta9xbHf_f7euR8qtQDmX8_wL" target="_blank" rel="noopener">Try this script in Sievepad</a></p>
<!-- /sievepad -->

The `blocked-domain` list used by the `:list` match is backed by entries on the [MemoryLookupKey](https://stalw.art/docs/ref/object/memory-lookup-key) object (found in the WebUI under <!-- breadcrumb:MemoryLookupKey --> Settings › Lookups › In-Memory Keys, Settings › Spam Filter › Lists › Blocked Domains, Settings › Spam Filter › Lists › Spam Traps, Settings › Spam Filter › Lists › Trusted Domains, Settings › Spam Filter › Lists › URL Redirectors<!-- /breadcrumb:MemoryLookupKey -->). Each blocked domain is a separate key created under the `blocked-domain` [`namespace`](https://stalw.art/docs/ref/object/memory-lookup-key#namespace), with the domain name itself as the [`key`](https://stalw.art/docs/ref/object/memory-lookup-key#key):

```json
{
  "namespace": "blocked-domain",
  "key": "spammer.example",
  "isGlobPattern": false
}
```

Additional entries use the same namespace with different key values, and glob patterns such as `*.spammer.example` can be enabled by setting [`isGlobPattern`](https://stalw.art/docs/ref/object/memory-lookup-key#isglobpattern) to `true`.

## SMTP extensions

Stalwart supports a range of [SMTP extensions](https://stalw.art/docs/development/rfcs#smtp), configured on the [MtaExtensions](https://stalw.art/docs/ref/object/mta-extensions) singleton (found in the WebUI under <!-- breadcrumb:MtaExtensions --> Settings › MTA › Session › Extensions<!-- /breadcrumb:MtaExtensions -->). Each field accepts an expression that returns either a boolean, a duration, or the extension-specific value described below.

- [`pipelining`](https://stalw.art/docs/ref/object/mta-extensions#pipelining): SMTP pipelining (RFC 2920). Multiple commands can be sent in a single request.
- [`chunking`](https://stalw.art/docs/ref/object/mta-extensions#chunking): chunking (RFC 3030). Large messages can be transferred in chunks.
- [`requireTls`](https://stalw.art/docs/ref/object/mta-extensions#requiretls): REQUIRETLS (RFC 8689). Clients can require TLS encryption for the SMTP session.
- [`noSoliciting`](https://stalw.art/docs/ref/object/mta-extensions#nosoliciting): text advertised via `NOSOLICITING` (RFC 3865), indicating the server does not accept unsolicited commercial email.
- [`dsn`](https://stalw.art/docs/ref/object/mta-extensions#dsn): delivery status notifications (RFC 3461). Senders can request a DSN from the recipient's mail server.
- [`futureRelease`](https://stalw.art/docs/ref/object/mta-extensions#futurerelease): maximum time a message can be held for delivery via the `FUTURERELEASE` (RFC 4865) extension. Returning `false` disables the extension.
- [`deliverBy`](https://stalw.art/docs/ref/object/mta-extensions#deliverby): maximum delivery time allowed by the `DELIVERBY` (RFC 2852) extension. Returning `false` disables the extension.
- [`mtPriority`](https://stalw.art/docs/ref/object/mta-extensions#mtpriority): priority-assignment policy advertised on the `MT-PRIORITY` (RFC 6710) extension. Accepted values are `mixer`, `stanag4406`, and `nsep`, or `false` to disable the extension.
- [`vrfy`](https://stalw.art/docs/ref/object/mta-extensions#vrfy): whether to advertise the `VRFY` command, used by senders to verify the existence of a mailbox. Disabling it by default prevents address harvesting; the default policy only enables it for authenticated sessions.
- [`expn`](https://stalw.art/docs/ref/object/mta-extensions#expn): whether to advertise the `EXPN` command, used to request the membership of a mailing list. The default policy mirrors `vrfy`.

The `SIZE`, `ENHANCEDSTATUSCODES`, `8BITMIME`, and `SMTPUTF8` extensions are always advertised and are not configurable. The `AUTH` extension is governed by the [AUTH stage](https://stalw.art/docs/mta/inbound/auth).

Example configuration restricting advanced extensions to authenticated sessions:

```json
{
  "pipelining": {"else": "true"},
  "chunking": {"else": "true"},
  "requireTls": {"else": "true"},
  "noSoliciting": {"else": "''"},
  "dsn": {
    "match": {"0": {"if": "!is_empty(authenticated_as)", "then": "true"}},
    "else": "false"
  },
  "futureRelease": {
    "match": {"0": {"if": "!is_empty(authenticated_as)", "then": "7d"}},
    "else": "false"
  },
  "deliverBy": {
    "match": {"0": {"if": "!is_empty(authenticated_as)", "then": "15d"}},
    "else": "false"
  },
  "mtPriority": {
    "match": {"0": {"if": "!is_empty(authenticated_as)", "then": "mixer"}},
    "else": "false"
  },
  "vrfy": {
    "match": {"0": {"if": "!is_empty(authenticated_as)", "then": "true"}},
    "else": "false"
  },
  "expn": {
    "match": {"0": {"if": "!is_empty(authenticated_as)", "then": "true"}},
    "else": "false"
  }
}
```
