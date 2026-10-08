---
sidebar_position: 3
title: "MTA-STS"
---

MTA-STS, or Mail Transfer Agent Strict Transport Security, is a security mechanism for email systems to protect against eavesdropping and tampering of emails during transmission. It is designed to ensure that email is sent and received over secure connections, such as TLS.

MTA-STS is enforced by the sending server, not the receiving one. A recipient domain advertises a policy through a `_mta-sts` DNS TXT record and serves the policy itself over HTTPS at `https://mta-sts.<domain>/.well-known/mta-sts.txt`. Before delivering a message, the sending server fetches and caches that policy, checks that the MX host it is about to use is listed in it, and requires the connection to that host to be authenticated and encrypted with TLS. When the policy is in `enforce` mode and either check fails, the message is not delivered.

This closes the two weaknesses of opportunistic TLS: an attacker on the network path can no longer strip the STARTTLS advertisement to force the message into plaintext, nor redirect it to a mail server of their choosing, because the sender now knows in advance that the domain requires TLS and which hosts are allowed to receive its mail.

## Outbound configuration

Whether to use MTA-STS on outbound connections is configured per TLS strategy on the [MtaTlsStrategy](/docs/ref/object/mta-tls-strategy) object (found in the WebUI under <!-- breadcrumb:MtaTlsStrategy --><svg class="lucide-icon" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M10 5H3" /><path d="M12 19H3" /><path d="M14 3v4" /><path d="M16 17v4" /><path d="M21 12h-9" /><path d="M21 19h-5" /><path d="M21 5h-7" /><path d="M8 10v4" /><path d="M8 12H3" /></svg> Settings › <svg class="lucide-icon" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" /></svg> MTA › Outbound › TLS Strategies<!-- /breadcrumb:MtaTlsStrategy -->). The [`mtaSts`](/docs/ref/object/mta-tls-strategy#mtasts) field accepts one of:

- `optional`: use MTA-STS only if an STS policy for the domain has been published.
- `require`: require MTA-STS and refuse delivery unless a valid STS policy is available. Not recommended as a global default.
- `disable`: never use MTA-STS.

### What is validated

When a policy in `enforce` mode applies to the recipient domain, Stalwart delivers the message only if every one of the following holds:

- The MX hostname is authorised by the `mx` patterns published in the policy.
- STARTTLS is offered by the MX and the handshake succeeds.
- The certificate presented by the MX chains to a trusted certificate authority and is within its validity period.
- The certificate carries a subject alternative name matching the MX hostname.

If any of them fails, the delivery attempt fails and a [TLS report](/docs/mta/reports/tls) is generated for the domain. The message remains queued and is retried on the usual schedule; if the condition persists until the message expires, it is returned to the sender.

Policies in `testing` mode are reported on but never block delivery, which is what makes `testing` the safe mode to publish first.

### Interaction with `allowInvalidCerts`

The [`allowInvalidCerts`](/docs/ref/object/mta-tls-strategy#allowinvalidcerts) field of a TLS strategy has no effect while an `enforce` policy is in force: certificates are validated regardless. This matters because the default TLS expression on [MtaOutboundStrategy](/docs/ref/object/mta-outbound-strategy) falls back to the built-in `invalid-tls` strategy, which sets `allowInvalidCerts` to `true`, on any retry that follows a TLS error:

```json
{
  "tls": {
    "match": {
      "0": {"if": "retry_num > 0 && last_error == 'tls'", "then": "'invalid-tls'"}
    },
    "else": "'default'"
  }
}
```

That fallback exists so mail still flows to hosts with expired, self-signed or mismatched certificates, which is common among domains that publish no policy at all. It never relaxes validation for a domain that published an enforcing MTA-STS policy, and it never relaxes [DANE](/docs/mta/transport-security/dane).

To deliberately bypass an enforcing policy, for example when relaying to a host under your own control whose certificate cannot be fixed, set `mtaSts` to `disable` on the strategy concerned. Be aware that this also drops the policy's requirement that the connection be encrypted at all, so pair it with `startTls: require` if plaintext delivery to that host should still be refused.

```json
{
  "name": "bypass-mta-sts",
  "mtaSts": "disable",
  "allowInvalidCerts": true,
  "startTls": "require"
}
```

## Policy publishing

An MTA-STS policy lets domain owners declare that their mail servers support TLS and that messages should only be delivered over a secure connection. The policy reduces the risk of man-in-the-middle attacks and ensures transport-layer encryption is used consistently.

The MTA-STS policy is published at `https://mta-sts.<domain>/.well-known/mta-sts.txt`, which is the location senders fetch it from. The policy file includes:

- **version**: the version of the MTA-STS standard. Currently `STSv1`.
- **mode**: the operational mode of the policy (`none`, `testing`, or `enforce`). `enforce` mode requires sending servers to connect only over secure connections, while `testing` mode lets domain owners monitor policy failures without affecting mail delivery.
- **mx**: the list of mail servers permitted to receive mail for the domain.
- **max_age**: the length of time, in seconds, the sender should cache and apply the policy.

Stalwart can automate the publication of MTA-STS policy files for all hosted domains, keeping every policy up to date without manual intervention. Policy publishing is configured on the [MtaSts](/docs/ref/object/mta-sts) singleton (found in the WebUI under <!-- breadcrumb:MtaSts --><svg class="lucide-icon" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M10 5H3" /><path d="M12 19H3" /><path d="M14 3v4" /><path d="M16 17v4" /><path d="M21 12h-9" /><path d="M21 19h-5" /><path d="M21 5h-7" /><path d="M8 10v4" /><path d="M8 12H3" /></svg> Settings › <svg class="lucide-icon" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" /></svg> MTA › Inbound › MTA-STS<!-- /breadcrumb:MtaSts -->):

- [`mode`](/docs/ref/object/mta-sts#mode): operational mode of the policy. Accepted values are `enforce`, `testing`, and `disable`. Default `testing`.
- [`maxAge`](/docs/ref/object/mta-sts#maxage): how long clients should cache the policy, in milliseconds. Default 7 days (`604800000`).
- [`mxHosts`](/docs/ref/object/mta-sts#mxhosts): optional override for the set of mail servers permitted to receive mail for the domain. If left empty, the hostnames included in all TLS certificates for the domain are used.

Example:

```json
{
  "mode": "testing",
  "maxAge": 604800000,
  "mxHosts": {"mx1.example.com": true, "mx2.example.com": true}
}
```

:::note
Values on this page follow the [object encoding](/docs/configuration/object-encoding) rules: list and set fields are JSON objects rather than arrays, and durations and sizes are integers.
:::

Note that the `max_age` field published in the policy file itself is expressed in seconds, as required by RFC 8461; the millisecond encoding applies only to the configuration object.

:::tip[Note]

To automatically publish MTA-STS policies, port 443 (HTTPS) must be open. This port allows Stalwart to serve the policy files via HTTPS so that other mail servers can perform policy checks.

:::

Stalwart can also automatically generate MTA-STS DNS records for hosted domains; the records are available in the [WebUI](/docs/management/webui/) under Management > Directory > Domains.
