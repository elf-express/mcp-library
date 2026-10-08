---
title: "Spamtrap"
source: https://stalw.art/docs/spamfilter/spamtrap/
---

# Spamtrap

> Section: Spam & Phishing filter

A spam trap is an email address set up specifically to attract spam. These addresses are not used for regular communication and do not belong to real users, so any message sent to one is, by definition, unsolicited. Spam traps therefore provide a reliable indicator of spam activity.

Beyond flagging individual messages, spam traps also help train and refine the [spam classifier](https://stalw.art/docs/spamfilter/classifier/). Each message received at a trap address is treated as a clear spam sample; Stalwart can automatically add it to the training data so that the classifier adapts to the latest spam tactics.

The list of spam trap addresses is maintained as an in-memory lookup list entry. Each trap address is a [MemoryLookupKey](https://stalw.art/docs/ref/object/memory-lookup-key) (found in the WebUI under <!-- breadcrumb:MemoryLookupKey --> Settings › Lookups › In-Memory Keys, Settings › Spam Filter › Lists › Blocked Domains, Settings › Spam Filter › Lists › Spam Traps, Settings › Spam Filter › Lists › Trusted Domains, Settings › Spam Filter › Lists › URL Redirectors<!-- /breadcrumb:MemoryLookupKey -->) in the `spam-trap` namespace. When a delivery matches a configured trap address, the message is tagged with `SPAM_TRAP`. By default, this tag is associated with a spam score of `15.0` (via a [SpamTag](https://stalw.art/docs/ref/object/spam-tag) object).

To have messages hitting a trap be dropped silently and never reach a real inbox, administrators can change the action associated with the `SPAM_TRAP` tag by editing the corresponding [SpamTag](https://stalw.art/docs/ref/object/spam-tag) entry under the [Spam scores](https://stalw.art/docs/spamfilter/settings/scores) configuration.

Automatic learning from spam traps is controlled by [`learnSpamFromTraps`](https://stalw.art/docs/ref/object/spam-classifier#learnspamfromtraps) on the [SpamClassifier](https://stalw.art/docs/ref/object/spam-classifier) singleton.
