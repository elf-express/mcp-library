---
title: "Protocol"
source: https://stalw.art/docs/http/webdav/protocol/
---

# WebDAV - Protocol

> Section: HTTP settings › WebDAV

WebDAV behaviour is tuned through the [WebDav](https://stalw.art/docs/ref/object/web-dav) singleton (found in the WebUI under <!-- breadcrumb:WebDav --> Settings › Network › WebDAV<!-- /breadcrumb:WebDav -->). Two fields in particular control resource usage under heavy client activity: the maximum incoming request size and the maximum number of results returned in a single response.

- [`requestMaxSize`](https://stalw.art/docs/ref/object/web-dav#requestmaxsize): the maximum XML size of a WebDAV request that the server will accept, in bytes. Default `26214400` (25 MB). This limit matters most for file uploads, calendar imports, and contact synchronisation, which tend to carry large payloads. Administrators can raise it to support larger transfers or lower it to reduce resource consumption.
- [`maxResults`](https://stalw.art/docs/ref/object/web-dav#maxresults): the maximum number of items (calendar events, contact entries, and similar) that the server will include in a single WebDAV response. Default `2000`. Adjust this value to balance response size against network and memory efficiency during bulk sync operations.

Example:

```json
{
  "requestMaxSize": 26214400,
  "maxResults": 2000
}
```
