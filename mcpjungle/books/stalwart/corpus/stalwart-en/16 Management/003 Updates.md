---
title: "Updates"
source: https://stalw.art/docs/management/applications/update/
---

# Updates

> Section: Management › Applications

Hosted applications in Stalwart are kept current by an on-demand refresh and a cache that expires on a configurable schedule. Each [Application](https://stalw.art/docs/ref/object/application) (found in the WebUI under <!-- breadcrumb:Application --> Settings › Web Applications<!-- /breadcrumb:Application -->) is refreshed on its own cadence, and the refresh can also be forced at any time through the [Action](https://stalw.art/docs/ref/object/action) object (found in the WebUI under <!-- breadcrumb:Action --> Management › Actions<!-- /breadcrumb:Action -->).

## Bundle expiry

A downloaded bundle is kept in the blob store and reused on every subsequent unpack, so a server that has already fetched an Application does not contact its [`resourceUrl`](https://stalw.art/docs/ref/object/application#resourceurl) again on restart. The [`autoUpdateFrequency`](https://stalw.art/docs/ref/object/application#autoupdatefrequency) field is a duration that sets how long that cached copy is retained. Once it elapses the maintenance task purges the bundle, and the next unpack downloads a fresh copy.

The field defaults to `90d`; the built-in WebUI record is seeded with `30d`. The setting is per-Application, so the WebUI and any additional Applications can be pinned to different retention periods. Shorter values mean more frequent downloads; longer values hold an Application on a given release until it is refreshed by hand.

The server does not poll on a timer, and it does not compare the remote bundle against the installed one. An expired cache only causes a download the next time an unpack runs, which happens when the server starts, when the Application record is edited, and when an `UpdateApps` Action is triggered. To pick up a new release at a predictable moment, trigger `UpdateApps`.

## On-demand updates

A refresh is forced by triggering the `UpdateApps` variant of the [Action](https://stalw.art/docs/ref/object/action) object. Creating an Action record with this variant instructs the server to download and unpack every enabled Application immediately, ignoring the cached bundle and whatever remains of its retention period. This is the only way to pick up a new release without restarting the server.

The trigger is exposed through every management surface:

- From the [WebUI](https://stalw.art/docs/management/webui/), administrators invoke the action from the management section dedicated to server actions. The interface creates the corresponding `UpdateApps` Action and reports on its outcome.
- From the [CLI](https://stalw.art/docs/management/cli/), the same operation is issued as a standard `stalwart-cli` command against the Action object. `stalwart-cli create action/update-apps` submits the request to the server.
- Over the JMAP API, administrators with the `sysActionCreate` and `actionUpdateApps` [permissions](https://stalw.art/docs/ref/permissions) submit an `x:Action/set` call whose `create` entry carries `{"@type": "UpdateApps"}`:

```json
{
  "using": ["urn:ietf:params:jmap:core", "urn:stalwart:jmap"],
  "methodCalls": [
    ["x:Action/set", {
      "create": {
        "new1": { "@type": "UpdateApps" }
      }
    }, "c1"]
  ]
}
```

## What happens during an update

The unpack procedure is identical whether it ran at startup, after an edit to the Application record, or from an `UpdateApps` Action. For each enabled Application the server:

1. Takes the bundle from the blob store, or downloads it from the configured [`resourceUrl`](https://stalw.art/docs/ref/object/application#resourceurl) over HTTPS when the cache is empty. An `UpdateApps` Action always downloads.
2. Unpacks the archive into a new directory under [`unpackDirectory`](https://stalw.art/docs/ref/object/application#unpackdirectory), rewriting the `<base href>` in `index.html` to match the mount path. The directory is created if it does not exist, so `unpackDirectory` may name a path several levels deep, but the server has to be able to write there.
3. Swaps the live mount over to the newly unpacked files so that subsequent HTTP requests for the Application's [`urlPrefix`](https://stalw.art/docs/ref/object/application#urlprefix) entries are served from the new version, then deletes the directory the previous version was served from.

No checksum or signature verification is performed on the downloaded bundle; see the [bundle format](https://stalw.art/docs/management/applications/#bundle-format) section for the security implications. A malformed archive, an unreachable download, or an unwritable `unpackDirectory` is logged and leaves the previously unpacked bundle mounted, so a failed update does not take an Application offline. The cached bundle is likewise only replaced once the new one has unpacked, so a failed update cannot poison the copy the next restart will use.

Disabled Applications (those with [`enabled`](https://stalw.art/docs/ref/object/application#enabled) set to `false`) are skipped. An `UpdateApps` Action always refreshes every enabled Application in a single run; the variant has no fields to limit the operation to a single Application.
