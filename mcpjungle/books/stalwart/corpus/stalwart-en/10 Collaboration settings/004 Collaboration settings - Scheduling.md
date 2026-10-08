---
title: "Scheduling"
source: https://stalw.art/docs/collaboration/scheduling/
---

# Collaboration settings - Scheduling

> Section: Collaboration settings

Calendar scheduling coordinates meetings and events by automating the exchange of invitations. Rather than relying on manual email, calendar scheduling systems handle communication between organisers and attendees, track participation status, and manage updates and cancellations in real time.

Stalwart supports calendar scheduling through two primary mechanisms:

- **JMAP for Calendars**, which includes built-in support for scheduling operations such as sending invitations, processing responses, and managing event updates using the JMAP protocol.
- **Scheduling Extensions to CalDAV**, as defined in [RFC 6638](https://datatracker.ietf.org/doc/html/rfc6638). This specification extends the CalDAV protocol to support server-based scheduling operations. Events with attendee information trigger the necessary scheduling logic on the server, including delivery of invitations, processing of replies, and updates to calendars.

Calendar scheduling relies on two core protocols from the iCalendar ecosystem:

- **iCalendar Transport-Independent Interoperability Protocol (iTIP)**, defined in [RFC 5546](https://datatracker.ietf.org/doc/html/rfc5546), describes how scheduling messages (event invitations, updates, cancellations, and responses) are structured and processed using the iCalendar data format. It defines a set of methods (`REQUEST`, `REPLY`, `CANCEL`, and so on) used to negotiate scheduling operations between organisers and attendees. iTIP itself is transport-agnostic.
- **iCalendar Message-Based Interoperability Protocol (iMIP)**, described in [RFC 6047](https://datatracker.ietf.org/doc/html/rfc6047), specifies how iTIP messages are transported over email (typically via SMTP). It supports calendar scheduling between systems that may not implement CalDAV, for example sending a calendar invitation from a CalDAV account to an external recipient via email.

When Stalwart encounters a recipient that cannot be reached via CalDAV (such as an external attendee), it falls back to iMIP and delivers the scheduling message as an email with an attached `.ics` file.

## Enabling scheduling

Scheduling configuration is carried on the [CalendarScheduling](https://stalw.art/docs/ref/object/calendar-scheduling) singleton (found in the WebUI under <!-- breadcrumb:CalendarScheduling --> Settings › Calendar & Contacts › Scheduling<!-- /breadcrumb:CalendarScheduling -->). Scheduling is enabled by default so that invitations, participant management, and automated scheduling workflows interoperate with CalDAV clients that implement the Scheduling Extensions (RFC 6638) and with email-based iMIP.

Scheduling can be disabled globally by setting [`enable`](https://stalw.art/docs/ref/object/calendar-scheduling#enable) to `false`. With that field disabled, Stalwart no longer processes scheduling requests or generates scheduling messages. Events that include attendee information are stored as standard calendar entries, but no invitations, updates, or replies are sent or processed. Both iTIP and iMIP paths are bypassed.

:::tip[Tip]

Calendar Scheduling can also be enabled or disabled on a per-account basis by setting the appropriate [permissions](https://stalw.art/docs/auth/authorization/permissions).

:::

## Automatic event addition

RFC 6638 mandates that CalDAV servers automatically add scheduling messages (invitations received via iTIP or iMIP) to the recipient's calendar. This removes the need for manual review before events appear on the calendar.

Stalwart takes a more deliberate approach. Automatic addition can be convenient, but it creates the potential for calendar spam and undermines user control over which events appear on personal or work schedules.

By default, Stalwart only adds invitations to calendars automatically when two conditions are met. First, the sender must be authenticated via [DMARC](https://stalw.art/docs/mta/authentication/dmarc), confirming that the message originates from a domain authorised to send on behalf of the claimed sender. Second, the sender must be listed in the recipient's [address book](https://stalw.art/docs/collaboration/contact), indicating an established relationship. Together these safeguards support auto-processing of legitimate invitations without compromising account safety.

For deployments that wish to conform strictly to RFC 6638 and automatically accept all incoming scheduling messages, set [`autoAddInvitations`](https://stalw.art/docs/ref/object/calendar-scheduling#autoaddinvitations) to `true`. With that setting enabled, Stalwart accepts all valid iTIP and iMIP invitations without verifying the sender's authenticity or presence in the address book. This should be used with caution, particularly in open or federated environments.

## Scheduling limits

To prevent misuse of the calendar scheduling system and to protect server stability, the CalendarScheduling singleton exposes limits on the size and scope of scheduling operations.

### iTIP message size

[`itipMaxSize`](https://stalw.art/docs/ref/object/calendar-scheduling#itipmaxsize) defines the maximum size in bytes of an incoming iTIP message that the server accepts and processes. Messages larger than this limit are rejected before parsing. The default is `524288` (512 KB). This guards against excessively large or malformed calendar invitations that could be used to exhaust memory or processing capacity.

### Outbound recipient limit

[`maxRecipients`](https://stalw.art/docs/ref/object/calendar-scheduling#maxrecipients) limits the number of recipients that a single outbound iTIP scheduling message may include. The default is `100`. Requests that exceed this limit are rejected before delivery. This guards against mass-invitation abuse, where the calendar system might otherwise be used to send messages to a large number of users in a single operation.

In addition to these scheduling-specific limits, all existing [MTA-level throttling policies](https://stalw.art/docs/mta/outbound/rate-limit) apply to outbound iMIP messages. Outbound scheduling emails are subject to the same rate limits, message size limits, and delivery policies as any other email traffic.

## Inbox auto-expunge

As part of the CalDAV Scheduling Extensions, each account includes a Scheduling Inbox, a special collection where incoming iTIP messages (invitations, replies, cancellations, updates) are stored. These messages serve as a log of scheduling activity and are used by calendar clients to synchronise and process meeting-related actions.

Not all CalDAV clients reliably delete messages from the Scheduling Inbox after processing them, so the inbox can accumulate outdated or redundant scheduling messages over time. This consumes storage unnecessarily and may cause clients to continue synchronising stale data.

The retention period for the Scheduling Inbox is controlled by [`expungeSchedulingInboxAfter`](https://stalw.art/docs/ref/object/data-retention#expungeschedulinginboxafter) on the [DataRetention](https://stalw.art/docs/ref/object/data-retention) singleton (found in the WebUI under <!-- breadcrumb:DataRetention --> Settings › Storage › Data Retention › Archiving, Settings › Storage › Data Retention › Data Cleanup, Settings › Storage › Data Retention › Auto-Expunge, Settings › Storage › Data Retention › Telemetry<!-- /breadcrumb:DataRetention -->). The value is a duration in milliseconds; the default is `2592000000` (thirty days), meaning messages older than thirty days are removed during the routine auto-expunge run. Leaving the field unset keeps messages in the inbox indefinitely unless removed by the client or the account holder.

## HTTP RSVP

Stalwart allows participants to respond to calendar invitations using a web link. When enabled, a unique RSVP URL is included in the iMIP invitation email sent to each attendee. Recipients can click the link to accept, decline, or tentatively respond to the invitation through a web interface, without needing a CalDAV-capable client.

This is particularly useful when scheduling with external participants or with clients that do not support calendaring or scheduling protocols.

### Endpoint

The RSVP endpoint is accessible at `https://<server-host>/calendar/rsvp`, where `<server-host>` is based on the configured [hostname](https://stalw.art/docs/server/general#server-hostname). Accessing this URL serves a self-contained web page; it never records a response by itself, so link scanners and mail gateways that follow links in messages cannot answer on the attendee's behalf.

The page reads the signed token from the `i` query parameter and calls `POST /api/calendar/rsvp` to do the actual work. That endpoint takes a JSON body and is used twice: first with only the token, to retrieve the invitation details, and then with a participation status, to record the response.

```json
{ "token": "<signed token>", "partstat": "accepted", "comment": "Bringing dessert" }
```

`partstat` accepts `accepted`, `declined` or `tentative`, and the optional `comment` is a short note for the organizer. The response is one of `invitation` (the event details), `recorded` (the stored participation status), or `error` together with a localised `message`.

Responses are applied directly to the organizer's calendar and a reply is placed in their Scheduling Inbox, without an intermediate email.

### Enabling

HTTP RSVP is enabled by default. The feature is disabled by setting [`httpRsvpEnable`](https://stalw.art/docs/ref/object/calendar-scheduling#httprsvpenable) on the CalendarScheduling singleton to `false`. When disabled, RSVP links are no longer included in outgoing iMIP messages and the RSVP endpoint stops serving requests.

### Custom URL

Stalwart builds the RSVP URL from the configured [`server.hostname`](https://stalw.art/docs/server/general#server-hostname). The base URL used in invitation emails can be overridden by setting [`httpRsvpUrl`](https://stalw.art/docs/ref/object/calendar-scheduling#httprsvpurl). The path component `/calendar/rsvp` is fixed, but the hostname and any prefix path can be customised. This is particularly useful when deploying Stalwart behind a reverse proxy or on a different hostname.

### Expiration

[`httpRsvpLinkExpiry`](https://stalw.art/docs/ref/object/calendar-scheduling#httprsvplinkexpiry) defines how long an RSVP link remains valid after being issued. The value is a duration in milliseconds; the default is `7776000000` (ninety days). Once expired, the link no longer allows a response.

A representative HTTP RSVP configuration:

```json
{
  "httpRsvpEnable": true,
  "httpRsvpUrl": "https://calendar.example.org/custom-path/calendar/rsvp",
  "httpRsvpLinkExpiry": 604800000
}
```

## Branding and templating

Stalwart supports custom branding and templating for calendar scheduling so that outbound invitations and RSVP responses can be aligned with organisational branding.

:::tip[Enterprise feature]

This feature is available exclusively in the [Enterprise Edition](https://stalw.art/docs/server/enterprise) of Stalwart and not included in the Community Edition.

:::

### Templates

Stalwart ships with a built-in default for both the scheduling email and the RSVP web page. Both are set on the CalendarScheduling singleton.

#### iMIP email template

The iMIP template renders outbound iMIP scheduling messages (invitations, updates, cancellations). Each message contains a rich HTML MIME part rendered from the template, including event details, sender information, and the RSVP link (if HTTP RSVP is enabled). A custom template can be supplied through [`emailTemplate`](https://stalw.art/docs/ref/object/calendar-scheduling#emailtemplate).

#### HTTP RSVP web page

The RSVP page is a static HTML document served as-is; it is not rendered from template variables. A replacement page can be supplied through [`httpRsvpTemplate`](https://stalw.art/docs/ref/object/calendar-scheduling#httprsvptemplate), and is returned verbatim in place of the built-in one.

A custom page is responsible for the whole flow: read the `i` query parameter, call `POST /api/calendar/rsvp` with the token to load the invitation, render it, and post the chosen participation status back. The endpoint returns localised labels alongside the event data, so a custom page does not need to ship its own translations.

### Logo

Both default templates include a logo, which by default is the system-wide branding logo. The logo can be overridden on a per-tenant or per-domain basis, so that different business units or hosted domains display their own branding. For details, refer to the [Branding](https://stalw.art/docs/management/webui/branding) section.
