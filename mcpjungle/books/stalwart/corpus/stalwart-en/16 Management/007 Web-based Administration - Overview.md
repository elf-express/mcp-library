---
title: "Overview"
source: https://stalw.art/docs/management/webui/
---

# Web-based Administration - Overview

> Section: Management › Web-based Administration

The WebUI is the browser-based front end for managing a Stalwart server and for giving end users control over their own account. It is delivered as a single-page application packaged as an [Application](https://stalw.art/docs/ref/object/application) (found in the WebUI under <!-- breadcrumb:Application --> Settings › Web Applications<!-- /breadcrumb:Application -->) and mounted at two URL prefixes on any HTTP listener the server exposes:

- `/admin`, the administrator console used to configure the server, manage directories and policy, and investigate the running system.
- `/account`, the Account Manager used by end users to manage their own credentials and settings.

Both surfaces are served by the same Application bundle; the prefix determines which entry point the browser lands on and which views are available after sign-in. Installation, download location, update cadence, unpack directory, and on-demand refreshes are not configured on the WebUI itself: the WebUI is a hosted application like any other, and those topics are covered under [Applications](https://stalw.art/docs/management/applications/).

## Administrator console

The `/admin` mount is the administration surface. After signing in with an account that holds the required permissions, operators configure and operate the server from a single interface. The console covers the configuration objects that make up the running system and the operational views that report on its behaviour.

Configuration screens are organised around the same object model exposed over the JMAP API and the [CLI](https://stalw.art/docs/management/cli/): every configurable object edited in the WebUI corresponds to a singleton or collection on the server, and every form submission is translated into a `set` call on that object. The breadcrumb notations used throughout the rest of the documentation (for example, <!-- breadcrumb:Account --> Management › Directory › Groups, Management › Directory › Accounts<!-- /breadcrumb:Account -->) name the exact location under which an object is edited.

The console groups the available views into the following broad areas:

- **Directory management.** Accounts, groups, roles, permissions, tenants, and domains, together with the authentication backends that resolve them. Operators create and edit principals, assign roles, and manage credentials from these screens.
- **Server configuration.** Listeners, TLS, storage backends, transport pipelines, filtering rules, and the general server objects. The breadcrumbs on each reference page point to the corresponding location in the tree.
- **Operational tooling.** Live sessions, queued messages, retry logic, scheduled tasks, and manually triggered [Actions](https://stalw.art/docs/ref/object/action). This is where administrators start, stop, or reload subsystems without leaving the browser.
- **Reports.** DMARC, TLS, and ARF reports delivered to the server are browsable from the console, alongside [telemetry](https://stalw.art/docs/telemetry/) dashboards covering metrics, traces, and event history.
- **Backup and recovery.** Archived items recovery, snapshots, and the maintenance workflows that read from the [data retention](https://stalw.art/docs/ref/object/data-retention) schedule.

A global search at the top of the console locates settings by name; the search index is derived from the same object schema that drives the configuration screens, so results point directly at the field being looked for.

## Account Manager

The `/account` mount is the [Account Manager](https://stalw.art/docs/management/webui/account-manager). End users sign in with their mailbox credentials and manage their own password, [application passwords](https://stalw.art/docs/auth/authentication/app-password), [two-factor authentication](https://stalw.art/docs/auth/authentication/2fa), email aliases, and, under the Enterprise Edition, [masked email addresses](https://stalw.art/docs/email/management/masked-email). The Account Manager intentionally exposes a small subset of the object model: users see only the objects that belong to their own account and only the fields they are permitted to edit.

When an account without administrator permissions signs in at `/admin`, the console redirects to the Account Manager rather than rejecting the request outright.

## Access and routing

The WebUI is served over HTTP and so depends on a [NetworkListener](https://stalw.art/docs/ref/object/network-listener) (found in the WebUI under <!-- breadcrumb:NetworkListener --> Settings › Network › Listeners<!-- /breadcrumb:NetworkListener -->) whose [`protocol`](https://stalw.art/docs/ref/object/network-listener#protocol) is set to `http`. Because the `/admin` and `/account` prefixes are matched against the same HTTP surface that carries JMAP, WebDAV, and the `.well-known` endpoints, operators can restrict exposure of the administrator console to a private listener while keeping the rest of the HTTP traffic on a public one. The mechanics of scoping mount paths to specific listeners are covered under [HTTP access control](https://stalw.art/docs/http/access-control).

Authentication at both mounts uses the server's standard [authentication stack](https://stalw.art/docs/auth/authentication/), so operators can protect access with [two-factor authentication](https://stalw.art/docs/auth/authentication/2fa) and app-scoped credentials just like any other client.

## Relationship to the CLI and the JMAP API

Every action taken in the WebUI is backed by a JMAP method call on a documented object. The same calls are available through `stalwart-cli` (see the [CLI reference](https://stalw.art/docs/management/cli/)) and directly over the [JMAP API](https://stalw.art/docs/http/jmap/), so automated provisioning and interactive administration share the same surface. Administrators who prefer a terminal workflow, or who need to script bulk operations, can reach for the CLI without losing parity with what the WebUI offers.

## Outbound network requirement

The WebUI bundle is not bundled with the server binary. It is fetched on demand from `https://github.com/stalwartlabs/webui/releases/latest/` (the [`resourceUrl`](https://stalw.art/docs/ref/object/application#resourceurl) of the built-in [Application](https://stalw.art/docs/management/applications/) record) the first time the server starts, then cached and reused until the retention period set by [`autoUpdateFrequency`](https://stalw.art/docs/ref/object/application#autoupdatefrequency) expires or an `UpdateApps` Action forces a fresh download. The Stalwart host therefore needs outbound HTTPS access to GitHub's release storage, which is served from `github.com` and `objects.githubusercontent.com`.

When the very first download fails, no bundle has been unpacked locally yet and **both `/admin` and `/account` return `404 Not Found`** until a download succeeds. This is a frequent symptom on freshly installed and freshly migrated servers that sit behind a restrictive egress firewall: the rest of the server starts cleanly, the HTTP listener answers, but the WebUI mount paths reply with 404 because there is no bundle to serve. Once a successful download has happened, subsequent failed refreshes are non-fatal: the previously unpacked bundle stays mounted and the WebUI keeps responding until a refresh succeeds.

A WebUI that loads its login page but reports a failure to import or fetch a module after sign-in is a different fault, and it is almost always the [unpack directory](https://stalw.art/docs/management/applications/#the-unpack-directory) being swept out from under the server.

For deployments where outbound HTTPS to GitHub is not permitted, the WebUI bundle can be downloaded out-of-band, staged on an internal HTTPS server, and the [`resourceUrl`](https://stalw.art/docs/ref/object/application#resourceurl) on the WebUI's [Application](https://stalw.art/docs/ref/object/application) record updated to point at the internal location. The general [outbound network requirement](https://stalw.art/docs/management/applications/#outbound-network-requirement) for hosted Applications applies to the WebUI in exactly the same way; it is documented separately here only because misconfiguring it on a fresh install produces the WebUI-shaped 404 most operators encounter first.
