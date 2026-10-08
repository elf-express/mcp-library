---
title: "Protocol"
source: https://stalw.art/docs/http/jmap/protocol/
---

# JMAP - Protocol

> Section: HTTP settings › JMAP

JMAP protocol behaviour is configured on the [Jmap](https://stalw.art/docs/ref/object/jmap) singleton (found in the WebUI under <!-- breadcrumb:Jmap --> Settings › Network › JMAP › Limits, Settings › Network › JMAP › Push, Settings › Network › JMAP › WebSocket<!-- /breadcrumb:Jmap -->). The fields below influence request handling, upload quotas, and the size of responses returned by get, set, query, and changes methods.

## Request limits

Request limits guard the JMAP server against resource exhaustion:

- [`maxConcurrentRequests`](https://stalw.art/docs/ref/object/jmap#maxconcurrentrequests): the number of concurrent requests a single user may have in flight. Default `4`.
- [`maxRequestSize`](https://stalw.art/docs/ref/object/jmap#maxrequestsize): the maximum size of a single request, in bytes. Default `10000000`.
- [`maxMethodCalls`](https://stalw.art/docs/ref/object/jmap#maxmethodcalls): the maximum number of method calls that can be included in a single request. Default `16`.

## Upload limits

Upload limits restrict how often and how much data users can upload:

- [`maxUploadSize`](https://stalw.art/docs/ref/object/jmap#maxuploadsize): the maximum size of a single uploaded file, in bytes. Default `50000000`.
- [`maxConcurrentUploads`](https://stalw.art/docs/ref/object/jmap#maxconcurrentuploads): the number of concurrent uploads a single user may have in flight. Default `4`.
- [`uploadTtl`](https://stalw.art/docs/ref/object/jmap#uploadttl): how long each uploaded file is kept in temporary storage before it is [deleted](https://stalw.art/docs/storage/blob#maintenance). Default `"1h"`.
- [`maxUploadCount`](https://stalw.art/docs/ref/object/jmap#maxuploadcount): the maximum number of files a user may upload within the quota window. Default `1000`.
- [`uploadQuota`](https://stalw.art/docs/ref/object/jmap#uploadquota): the total aggregate size of uploaded files allowed per user within the quota window, in bytes. Default `50000000`.

## Object limits

Object limits restrict the number of objects returned or modified by a single method call:

- [`getMaxResults`](https://stalw.art/docs/ref/object/jmap#getmaxresults): the maximum number of objects that can be fetched in a single method call. Default `500`.
- [`setMaxObjects`](https://stalw.art/docs/ref/object/jmap#setmaxobjects): the maximum number of objects that can be modified in a single method call. Default `500`.
- [`queryMaxResults`](https://stalw.art/docs/ref/object/jmap#querymaxresults): the maximum number of results returned by a Query method. Default `5000`.
- [`changesMaxResults`](https://stalw.art/docs/ref/object/jmap#changesmaxresults): the maximum number of change objects returned by a Changes method. Default `5000`.
