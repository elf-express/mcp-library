---
title: "IMAP and POP3"
source: https://stalw.art/docs/email/settings/imap/
---

# IMAP and POP3

> Section: Email settings › Settings

IMAP protocol settings cover request handling, authentication, timeouts, and rate limits. Several of these settings also apply to the POP3 server, as both protocols share the same configuration surface. IMAP and POP3 settings are carried on the [Imap](https://stalw.art/docs/ref/object/imap) singleton (found in the WebUI under <!-- breadcrumb:Imap --> Settings › Network › IMAP<!-- /breadcrumb:Imap -->). Default special-use folders, which are used by IMAP clients as well as JMAP, are configured on the [Email](https://stalw.art/docs/ref/object/email) singleton (found in the WebUI under <!-- breadcrumb:Email --> Settings › Email › Defaults, Settings › Email › Encryption, Settings › Email › Limits, Settings › Email › Storage<!-- /breadcrumb:Email -->).

## Request size

The [`maxRequestSize`](https://stalw.art/docs/ref/object/imap#maxrequestsize) field sets the maximum size of an IMAP request that the server will accept, in bytes. Requests larger than this limit are rejected. The default is `52428800` (50 MB).

## Message limits

Two fields bound how many messages a single IMAP command may process. Both are announced to clients through the [MESSAGELIMIT extension](https://www.rfc-editor.org/rfc/rfc9738.html), so a client that implements it can page through large mailboxes instead of being cut off:

- [`maxMessagesPerCommand`](https://stalw.art/docs/ref/object/imap#maxmessagespercommand): announced as `MESSAGELIMIT` and applied to `FETCH`, `SEARCH`, `STORE`, `MOVE` and `UID EXPUNGE`. When a command exceeds it, the highest UIDs are processed and the tagged `OK` carries a `MESSAGELIMIT` response code naming the lowest UID that was handled. Default `1000000`.
- [`maxMessagesPerSave`](https://stalw.art/docs/ref/object/imap#maxmessagespersave): announced as `SAVELIMIT` and applied to `COPY` and `APPEND`. These commands are atomic, so exceeding the limit stores nothing and returns a tagged `NO`. Default `1000000`.

Both default to one million messages, which is above any realistic mailbox, so the limits act as a safety net rather than a policy. Lowering them is safe only for clients that implement RFC 9738. Clients that do not will silently receive partial results from `FETCH` and `SEARCH`, and will see `COPY` and `APPEND` fail outright, so reduce these values only when a specific workload requires it. `EXPUNGE` and `CLOSE` are never limited.

Example:

```json
{
  "maxMessagesPerCommand": 1000000,
  "maxMessagesPerSave": 1000000
}
```

## UID batches

The [UIDBATCHES extension](https://www.rfc-editor.org/rfc/rfc10022.html) lets a client ask the server to split the selected mailbox into equally sized batches and return the UID range covering each one, which is how a client paginates a large mailbox without relying on message sequence numbers. Two fields bound what may be requested:

- [`minUidBatchSize`](https://stalw.art/docs/ref/object/imap#minuidbatchsize): smallest batch size a client may ask for. Smaller requests are rejected with a `TOOFEW` response code. Default `500`, which is the minimum the specification requires servers to support. It also prevents clients from reconstructing sequence numbers when `UIDONLY` is in effect, so raising it is safe but lowering it is discouraged.
- [`maxUidBatches`](https://stalw.art/docs/ref/object/imap#maxuidbatches): maximum number of UID ranges returned by a single command. Wider requests are rejected with a `TOOMANY` response code. Default `10000`, which covers a mailbox of five million messages at the default minimum batch size.

Example:

```json
{
  "minUidBatchSize": 500,
  "maxUidBatches": 10000
}
```

## Authentication

Two fields on the Imap singleton control IMAP and POP3 authentication behaviour:

- [`maxAuthFailures`](https://stalw.art/docs/ref/object/imap#maxauthfailures): maximum number of authentication attempts allowed before the session is disconnected. Default `3`.
- [`allowPlainTextAuth`](https://stalw.art/docs/ref/object/imap#allowplaintextauth): whether plain-text authentication is permitted over an unencrypted connection. For security reasons, this should be left at its default `false` unless strictly required, so that credentials are not transmitted in the clear.

Example:

```json
{
  "maxAuthFailures": 3,
  "allowPlainTextAuth": false
}
```

## Default folders

Default special-use folders created for new accounts are defined by [`defaultFolders`](https://stalw.art/docs/ref/object/email#defaultfolders) on the [Email](https://stalw.art/docs/ref/object/email) singleton. The field is a map keyed by special-use type; supported keys are `inbox`, `trash`, `junk`, `drafts`, `archive`, `sent`, `shared`, `important`, `memos`, `scheduled`, and `snoozed`.

Each entry carries the fields of the nested `EmailFolder` type:

- [`name`](https://stalw.art/docs/ref/object/email#name): display name of the folder. Required.
- [`create`](https://stalw.art/docs/ref/object/email#create): whether the folder is created automatically. Default `true`.
- [`subscribe`](https://stalw.art/docs/ref/object/email#subscribe): whether the folder is subscribed by default. Default `true`.
- [`aliases`](https://stalw.art/docs/ref/object/email#aliases): additional names under which the folder is recognised.

Example:

```json
{
  "defaultFolders": {
    "sent": {"name": "Sent Items", "create": true, "subscribe": true},
    "junk": {"name": "SPAM", "create": true, "subscribe": false},
    "shared": {"name": "Shared Folders"}
  }
}
```

## Timeouts

Idle timeouts are controlled by three fields on the Imap singleton. Each is expressed in milliseconds:

- [`timeoutAuthenticated`](https://stalw.art/docs/ref/object/imap#timeoutauthenticated): time an authenticated session can remain idle before the server terminates it. Default `1800000` (30 minutes).
- [`timeoutAnonymous`](https://stalw.art/docs/ref/object/imap#timeoutanonymous): time an anonymous (unauthenticated) session can stay inactive before being ended by the server. Default `60000` (one minute).
- [`timeoutIdle`](https://stalw.art/docs/ref/object/imap#timeoutidle): time a connection can stay idle in the IMAP `IDLE` state before the server breaks the connection. Default `1800000` (30 minutes).

Example:

```json
{
  "timeoutAuthenticated": 1800000,
  "timeoutAnonymous": 60000,
  "timeoutIdle": 1800000
}
```
