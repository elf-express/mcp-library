---
title: "Overview"
source: https://stalw.art/docs/auth/authentication/
---

# Authentication - Overview

> Section: Access Control › Authentication

Stalwart authenticates users against several [backends](https://stalw.art/docs/auth/backend/), allowing integration with existing identity systems. Supported backends include LDAP directories, SQL databases such as PostgreSQL, MySQL, and SQLite, and an internal directory managed directly by the server.

Stalwart also supports [OpenID Connect](https://stalw.art/docs/auth/openid/) and [OAuth](https://stalw.art/docs/auth/oauth/), which allow authentication against the built-in OpenID server or integration with external identity providers. Security controls include authentication rate limiting to reduce the risk of password guessing, and built-in [Fail2Ban](https://stalw.art/docs/server/auto-ban) support, which applies temporary IP bans to sources that repeatedly trigger suspicious activity.
