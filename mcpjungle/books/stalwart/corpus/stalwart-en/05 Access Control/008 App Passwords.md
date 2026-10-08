---
title: "App Passwords"
source: https://stalw.art/docs/auth/authentication/app-password/
---

# App Passwords

> Section: Access Control › Authentication

Application Passwords are unique passwords that allow users to access their email accounts from devices or applications that do not support [Two-Factor Authentication](https://stalw.art/docs/auth/authentication/2fa). They provide a way to use legacy mail clients or tools that do not support the `OAUTHBEARER` or `XOAUTH2` SASL mechanisms while preserving the benefits of 2FA on the primary account password.

Application Passwords are most useful in a few scenarios. Older email clients that do not support OAuth cannot prompt for a TOTP code, so standard 2FA is impractical with them; an Application Password allows these clients to authenticate securely. Third-party applications and services that have not adopted modern authentication mechanisms can also connect using an Application Password rather than the main account password. Finally, automated scripts and tools that need non-interactive access to a mailbox can authenticate with an Application Password scoped to the required permissions.

Each Application Password is managed as a distinct credential, so it can be named, inspected, and revoked without affecting other sessions.

## Managing App Passwords

Users create and remove Application Passwords from the [self-service portal](https://stalw.art/docs/management/webui/), under the App Passwords menu option. The portal lists existing Application Passwords and allows individual entries to be revoked.

Each Application Password is represented by an [AppPassword](https://stalw.art/docs/ref/object/app-password) object (found in the WebUI under <!-- breadcrumb:AppPassword --> Account › Credentials › App Passwords<!-- /breadcrumb:AppPassword -->). The credential carries a [`description`](https://stalw.art/docs/ref/object/app-password#description), an optional [`expiresAt`](https://stalw.art/docs/ref/object/app-password#expiresat), an optional list of [`allowedIps`](https://stalw.art/docs/ref/object/app-password#allowedips) that restrict where the credential may be used, and a [`permissions`](https://stalw.art/docs/ref/object/app-password#permissions) mode controlling whether the credential inherits, restricts, or replaces the account's permissions. The secret itself is server-set and returned only on creation.

Administrators have limited control over Application Passwords. They can view and revoke a user's Application Passwords but cannot create new ones on a user's behalf.

## Internal Storage

Each Application Password is stored on the account as one of its secrets, in the form `$app$name$password`, where `$app$` marks the secret as an Application Password, `name` is the unique identifier for the credential, and `password` is the hashed secret. The `$app$` prefix keeps Application Passwords distinguishable from other credential kinds, and storing only the hash of the generated secret prevents the raw password from being recovered from the directory.
