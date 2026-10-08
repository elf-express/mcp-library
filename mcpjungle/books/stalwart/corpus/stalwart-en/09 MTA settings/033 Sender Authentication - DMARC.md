---
title: "DMARC"
source: https://stalw.art/docs/mta/authentication/dmarc/
---

# Sender Authentication - DMARC

> Section: MTA settings › Sender Authentication

DMARC (Domain-based Message Authentication, Reporting & Conformance) is an email-authentication protocol that allows receivers to determine whether incoming messages are legitimate and were sent from authorised sources. A sending domain publishes a DMARC policy as a DNS TXT record, specifying how receivers should treat messages that fail SPF or DKIM authentication. DMARC also provides a reporting mechanism that lets the sender receive feedback on how their messages are handled, which can be used to detect abuse of the domain.

## Verification

DMARC verification is configured on the [SenderAuth](https://stalw.art/docs/ref/object/sender-auth) singleton (found in the WebUI under <!-- breadcrumb:SenderAuth --> Settings › MTA › Inbound › Sender Authentication<!-- /breadcrumb:SenderAuth -->). The [`dmarcVerify`](https://stalw.art/docs/ref/object/sender-auth#dmarcverify) field accepts an expression that returns one of:

- `relaxed`: verify DMARC and report the results in the `Authentication-Results` header.
- `strict`: reject the message if DMARC fails verification; otherwise report the results.
- `disable`: do not perform DMARC verification.

The default policy applies `relaxed` when `local_port == 25` and `disable` otherwise, so verification runs only on the cleartext inbound SMTP port. The equivalent configuration is:

```json
{
  "dmarcVerify": {
    "match": {
      "0": {"if": "listener == 'smtp'", "then": "relaxed"}
    },
    "else": "disable"
  }
}
```
