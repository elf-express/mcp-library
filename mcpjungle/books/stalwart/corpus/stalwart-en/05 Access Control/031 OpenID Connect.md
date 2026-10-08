---
title: "OpenID Connect"
source: https://stalw.art/docs/auth/backend/oidc/
---

# OpenID Connect

> Section: Access Control › Directories

Stalwart can authenticate users against a third-party **OpenID Connect (OIDC) provider**. This allows the server to delegate authentication to an existing identity system, for example Google, Microsoft Entra ID, or any OIDC-compliant provider.

As Stalwart is primarily a mail server, it handles OIDC somewhat differently from a typical web application. Clients authenticate over IMAP, POP3, SMTP, or JMAP using the `OAUTHBEARER` SASL mechanism, which carries an access token already obtained from the identity provider. Stalwart does not initiate the OIDC flow itself and does not consume an ID token directly; it validates the access token and uses it to resolve the user's identity.

## Authentication flow

Clients (such as mail applications) present an access token issued by the external OIDC provider using the `OAUTHBEARER` SASL mechanism. Because Stalwart is not part of the OIDC flow, it does not see the [ID token](https://stalw.art/docs/auth/openid/id-tokens). To identify the user associated with an access token, Stalwart validates the token against the OIDC provider.

Validation is performed automatically through the provider's OIDC discovery document (the `/.well-known/openid-configuration` endpoint). From that document Stalwart resolves the provider's signing keys and the userinfo endpoint. The server first attempts offline validation of the access token using the JWT signing keys; when offline validation cannot be completed (for example, opaque tokens that are not JWTs), Stalwart queries the userinfo endpoint with the token to resolve the user's identity. In both cases the user's claims are read from the resulting payload. Token introspection with client credentials is not used.

## Limitations

### Offline access

Stalwart learns about an account only after the first time that account authenticates. OIDC does not provide an offline directory lookup, so an account that exists in the identity provider but has not yet signed in is unknown to the server. Mail addressed to such an account is rejected because the address does not resolve to a local recipient.

The account must therefore exist before the user does anything with it. Four mechanisms are available.

[SCIM provisioning](https://stalw.art/docs/auth/scim/) is the option that requires no manual step: the identity provider pushes each account to Stalwart as soon as it is created upstream, so the mailbox is ready during onboarding and accepts mail from the start. It is the recommended pairing for an OIDC-backed domain, and it is available in the Enterprise edition. The remaining three create accounts by hand or by script, through the [WebUI](https://stalw.art/docs/management/webui/), the JMAP API, or the [CLI](https://stalw.art/docs/management/cli/); the CLI's [bulk apply](https://stalw.art/docs/management/cli/apply) command is the practical form where accounts are created in batches.

Whichever is used, pre-creating the accounts ensures that inbound mail is accepted from the start, even for users who have not yet authenticated via OIDC.

### No deprovisioning

The same limitation applies at the end of an account's life, and it is the more consequential of the two. Just-in-time synchronisation reacts to what the identity provider returns during a login; it has no way to observe that an account has been deleted upstream, because a deleted account simply stops appearing. A departed user's mailbox therefore persists indefinitely, continues to accept mail, and continues to count against licensed mailbox limits.

An account disabled at the identity provider cannot sign in, since authentication fails there, but its mailbox keeps receiving mail. Suspending or removing it is a manual task unless [SCIM provisioning](https://stalw.art/docs/auth/scim/) is configured, in which case the identity provider suspends the account with `PATCH {"active": false}` and removes it with `DELETE`.

[Provisioning models](https://stalw.art/docs/auth/scim/provisioning) compares the two approaches in full.

### `OAUTHBEARER` SASL

Many widely deployed mail clients, including Outlook, Thunderbird, and Apple Mail, do not support the `OAUTHBEARER` or `XOAUTH2` SASL mechanism with third-party OAuth providers. Users of those clients cannot authenticate directly with OIDC. The standard workaround is to provision [App Passwords](https://stalw.art/docs/auth/authentication/app-password) for those users, as described in the [interoperability](https://stalw.art/docs/auth/oauth/interoperability) section of the OAuth documentation.

## Configuration

An OIDC integration is configured through the OIDC variant of the [Directory](https://stalw.art/docs/ref/object/directory) object (found in the WebUI under <!-- breadcrumb:Directory --> Settings › Authentication › Directories<!-- /breadcrumb:Directory -->). The relevant fields are:

- [`issuerUrl`](https://stalw.art/docs/ref/object/directory#issuerurl): the base URL of the OIDC provider, for example `https://accounts.example.org/realms/myrealm`. Stalwart uses this URL to discover the provider's endpoints.
- [`requireAudience`](https://stalw.art/docs/ref/object/directory#requireaudience): if set, access tokens whose `aud` claim does not include this value are rejected. The default is `"stalwart"`. Set this to the client id or resource identifier registered for Stalwart at the provider.
- [`requireScopes`](https://stalw.art/docs/ref/object/directory#requirescopes): if set, access tokens must include every listed scope. The value is a set of scope names. Default `{"openid": true, "email": true}`.
- [`claimUsername`](https://stalw.art/docs/ref/object/directory#claimusername): the claim used to derive the account login name. Default `"preferred_username"`. If the claim value is not already an email address and [`usernameDomain`](https://stalw.art/docs/ref/object/directory#usernamedomain) is set, the domain is appended automatically.
- [`usernameDomain`](https://stalw.art/docs/ref/object/directory#usernamedomain): the domain to append to the username claim when it does not already contain an `@`. When unset, the server falls back to the `email` claim.
- [`claimName`](https://stalw.art/docs/ref/object/directory#claimname): the claim used for the user's display name. Default `"name"`.
- [`claimGroups`](https://stalw.art/docs/ref/object/directory#claimgroups): the claim used for group memberships. Typical values are `"groups"` or `"roles"`, depending on the provider.

Example integration with a Keycloak-style provider that issues `preferred_username` as a bare username and exposes groups on the `groups` claim:

```json
{
  "@type": "Oidc",
  "description": "External IdP",
  "issuerUrl": "https://accounts.example.org/realms/myrealm",
  "requireAudience": "stalwart",
  "requireScopes": {"openid": true, "email": true},
  "claimUsername": "preferred_username",
  "usernameDomain": "example.org",
  "claimName": "name",
  "claimGroups": "groups"
}
```

In a domain where [SCIM provisioning](https://stalw.art/docs/auth/scim/) is enabled, the claims that write to the account are no longer applied. `claimUsername` still resolves the account on each login, but `claimName` and `claimGroups` are ignored, because SCIM is authoritative for the display name and for group membership in that domain. Leaving them configured is harmless and keeps the directory usable for domains that are not provisioned through SCIM.

Once configured, the Directory object is selected as the active authentication source by setting [`directoryId`](https://stalw.art/docs/ref/object/authentication#directoryid) on the [Authentication](https://stalw.art/docs/ref/object/authentication) singleton (found in the WebUI under <!-- breadcrumb:Authentication --> Settings › Authentication › General<!-- /breadcrumb:Authentication -->) to its id.
