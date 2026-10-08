---
title: "Form Handling"
source: https://stalw.art/docs/http/form-submission/
---

# Form Handling

> Section: HTTP settings

Stalwart can accept HTTP form submissions on the `/form` endpoint and turn each submission into an email message delivered to one or more local recipients. The feature is typically used for web forms such as contact or feedback forms, where submissions need to be forwarded to a designated group of local recipients on the mail server.

Deliveries are limited to **local recipients only**. External recipients are rejected to prevent the form endpoint from being used as an open relay.

## Security Features

Two anti-abuse mechanisms protect the form endpoint:

- Per-IP rate limiting throttles how many submissions a single client can send within a given window, so that legitimate traffic is not crowded out by automated floods.
- A honeypot field is a hidden form field that is invisible to human users but visible to bots. Legitimate users will not fill it out; bots that attempt to fill every input will, and the server discards any submission in which the honeypot field is populated. This avoids the friction of CAPTCHAs while still filtering out automated spam.

## Configuration

Form handling is configured through the [HttpForm](https://stalw.art/docs/ref/object/http-form) singleton (found in the WebUI under <!-- breadcrumb:HttpForm --> Settings › Network › HTTP › Contact Form<!-- /breadcrumb:HttpForm -->). The relevant fields are:

- [`enable`](https://stalw.art/docs/ref/object/http-form#enable): turns the feature on or off. When `false`, the server returns an error for any request to `/form`. Default `false`.
- [`maxSize`](https://stalw.art/docs/ref/object/http-form#maxsize): maximum size of a single submission, in bytes. Default `102400` (100 KB).
- [`validateDomain`](https://stalw.art/docs/ref/object/http-form#validatedomain): whether the server validates the domain of the sender's email address. Default `true`.
- [`rateLimit`](https://stalw.art/docs/ref/object/http-form#ratelimit): per-IP submission rate, as a `count` over a `period` given in milliseconds. Default five submissions per hour.
- [`deliverTo`](https://stalw.art/docs/ref/object/http-form#deliverto): the set of local email addresses that receive the generated message.
- [`fieldEmail`](https://stalw.art/docs/ref/object/http-form#fieldemail): the name of the form field that carries the sender's email address, used as the message `From` address.
- [`defaultFromAddress`](https://stalw.art/docs/ref/object/http-form#defaultfromaddress): fallback `From` address used when the submission does not include one. Default `"postmaster@localhost"`.
- [`fieldHoneyPot`](https://stalw.art/docs/ref/object/http-form#fieldhoneypot): the name of the hidden honeypot field; a populated value flags the submission as spam.
- [`fieldName`](https://stalw.art/docs/ref/object/http-form#fieldname): the name of the form field that carries the sender's name, used in the `From` header.
- [`defaultName`](https://stalw.art/docs/ref/object/http-form#defaultname): fallback name used when the submission does not include one. Default `"Anonymous"`.
- [`fieldSubject`](https://stalw.art/docs/ref/object/http-form#fieldsubject): the name of the form field that carries the message subject.
- [`defaultSubject`](https://stalw.art/docs/ref/object/http-form#defaultsubject): fallback subject line used when the submission does not include one. Default `"Contact form submission"`.

Example configuration:

```json
{
  "enable": true,
  "maxSize": 10240,
  "validateDomain": true,
  "rateLimit": {"count": 5, "period": 3600000},
  "deliverTo": {"jane@example.org": true, "john@example.org": true},
  "fieldEmail": "email",
  "defaultFromAddress": "unknown@sender.org",
  "fieldHoneyPot": "subject",
  "fieldName": "name",
  "defaultName": "Anonymous",
  "fieldSubject": "subject",
  "defaultSubject": "Contact Form"
}
```
