---
title: "Overview"
source: https://stalw.art/docs/http/
---

# HTTP settings - Overview

> Section: HTTP settings

Stalwart includes an HTTP service that is enabled by default. It supports JMAP access, WebDAV access, API management, ACME certificate issuance, autoconfig/autodiscover protocols, well-known resources, metrics collection, and OAuth authentication.

Multiple HTTP services can be defined, each with custom [access control rules](https://stalw.art/docs/http/access-control) expressed on the [Http](https://stalw.art/docs/ref/object/http) singleton (found in the WebUI under <!-- breadcrumb:Http --> Settings › Network › HTTP › General, Settings › Network › HTTP › Security<!-- /breadcrumb:Http -->). Rules can filter requests by IP address, resource, method name, or listener identity.

## HTTP Endpoints

The following endpoints are available through the HTTP service:

- `/jmap`: The JMAP endpoint provides access to the [JMAP API](https://stalw.art/docs/http/jmap/), allowing clients to interact with mailboxes, messages, and other resources.
- `/dav/*`: The WebDAV endpoint provides access to [WebDAV](https://stalw.art/docs/http/webdav/) resources, allowing clients to manage calendar, contact and file resources.
- `/calendar/rsvp`: The Calendar Scheduling [RSVP page](https://stalw.art/docs/collaboration/scheduling#http-rsvp) allows participants to respond to calendar invitations using a simple web interface. The page itself is static; it posts to `/api/calendar/rsvp` to read the invitation and record the response.
- `/.well-known/*`: The [well-known endpoint](#well-known-resources) provides access to resources that are commonly used by clients to discover service information.
- `/scim/v2/*`: The [SCIM provisioning endpoint](https://stalw.art/docs/auth/scim/) accepts user and group lifecycle operations from an external identity provider. Available in the Enterprise edition.
- `/api/*`: Provides access to the [HTTP API](https://stalw.art/docs/development/api), a small set of endpoints for authentication, account introspection, configuration schema retrieval, and live telemetry. Server configuration and mailbox data are accessed through JMAP, not through this endpoint.
- `/auth/device`: The device authorization endpoint is used for [OAuth device authorization](https://stalw.art/docs/auth/oauth/).
- `/auth/token`: The token endpoint is used for [OAuth token exchange](https://stalw.art/docs/auth/oauth/).
- `/auth/introspect`: The token introspection endpoint is used for [OAuth token introspection](https://stalw.art/docs/auth/oauth/endpoints#authintrospect).
- `/auth/userinfo`: The user information endpoint is used for [OpenID user information](https://stalw.art/docs/auth/openid/endpoints#authuserinfo).
- `/auth/jwks.json`: The JSON Web Key Set (JWKS) endpoint provides public keys for [JWT verification](https://stalw.art/docs/auth/openid/endpoints#authjwksjson).
- `/mail/config-v1.1.xml`: The [autodiscover](https://stalw.art/docs/server/autoconfig) endpoint provides email client configuration information.
- `/autodiscover/autodiscover.xml`: The [autodiscover](https://stalw.art/docs/server/autoconfig) endpoint provides email client configuration information.
- `/metrics/prometheus`: The [Prometheus](https://stalw.art/docs/telemetry/metrics/prometheus) metrics endpoint provides metrics for monitoring the server's performance.
- `/form`: The form endpoint is used for [Form submissions](https://stalw.art/docs/http/form-submission).
- `/healthz/ready`: The health check endpoint indicates whether the server is ready to accept requests.
- `/healthz/live`: The health check endpoint indicates whether the server is live and operational.
- `/robots.txt`: The robots.txt file provides instructions to web crawlers and other user agents about the server's content.
- `/*`: The default endpoint serves static files from the [WebUI bundle](https://stalw.art/docs/management/webui/).

## Well-known Resources

The following well-known resources are available through the HTTP service:

- `/.well-known/jmap`: The JMAP well-known resource provides information about the [JMAP](https://stalw.art/docs/http/jmap/) endpoint. 
- `/.well-known/caldav`: The CalDAV well-known resource provides information about the [CalDAV](https://stalw.art/docs/collaboration/calendar) endpoint.
- `/.well-known/carddav`: The CardDAV well-known resource provides information about the [CardDAV](https://stalw.art/docs/collaboration/contact) endpoint.
- `/.well-known/oauth-authorization-server`: The OAuth authorization server well-known resource provides information about the [OAuth](https://stalw.art/docs/auth/oauth/) authorization server.
- `/.well-known/openid-configuration`: The OIDC discovery well-known resource provides information about the [OIDC](https://stalw.art/docs/auth/openid/) discovery endpoint.
- `/.well-known/acme-challenge`: The ACME challenge well-known resource provides the HTTP-01 challenge for [ACME certificate issuance](https://stalw.art/docs/server/tls/acme/challenges#http-01).
- `/.well-known/mta-sts.txt`: The MTA-STS well-known resource provides information about the [MTA-STS](https://stalw.art/docs/mta/transport-security/mta-sts) policy.
- `/.well-known/mail-v1.xml`: The mail configuration well-known resource provides information about the [configuration endpoint](https://stalw.art/docs/server/autoconfig).
- `/.well-known/autoconfig/mail/config-v1.1.xml`: The autoconfig mail configuration well-known resource provides information about the [autconfig](https://stalw.art/docs/server/autoconfig) mail configuration endpoint.
