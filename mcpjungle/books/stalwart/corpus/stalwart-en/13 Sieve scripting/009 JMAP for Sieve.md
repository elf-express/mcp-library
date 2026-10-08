---
title: "JMAP for Sieve"
source: https://stalw.art/docs/sieve/jmap/
---

# JMAP for Sieve

> Section: Sieve scripting

JMAP for Sieve ([RFC9661](https://www.rfc-editor.org/rfc/rfc9661.html)) is an extension to the [JMAP protocol](https://stalw.art/docs/http/jmap/) that allows users to manage their Sieve scripts using the JMAP API. This extension provides a way for users to upload, delete, and list their Sieve scripts, as well as to set a default script for their account.
Support for JMAP for Sieve is enabled by default in Stalwart, and no additional configuration is required. However, it is possible to disable on a per-user basis by disabling the JMAP for Sieve [permissions](https://stalw.art/docs/auth/authorization/permissions) for the user.
