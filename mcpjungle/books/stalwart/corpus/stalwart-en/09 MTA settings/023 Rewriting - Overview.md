---
title: "Overview"
source: https://stalw.art/docs/mta/rewrite/
---

# Rewriting - Overview

> Section: MTA settings › Rewriting

Message rewriting alters aspects of an email message as it is processed by the mail server. This can involve changing the sender or recipient addresses in the envelope (the 'outside' of the message), or modifying the content itself, including headers, body, and attachments.

Typical reasons for rewriting a message include [changing recipient addresses](https://stalw.art/docs/mta/rewrite/address) to redirect mail traffic, obfuscating the original sender's address for privacy, or altering the domain in an address to match an organisation's branding. Modifying the content of a message is useful for managing how it is presented to the recipient: operators may [add, delete, or change headers](https://stalw.art/docs/mta/rewrite/headers) for tracking or compliance, [alter the body](https://stalw.art/docs/mta/rewrite/content) to append a disclaimer or signature, or manage attachments for security, for example by removing potentially harmful files.

Stalwart supports both address rewriting and content modification.
