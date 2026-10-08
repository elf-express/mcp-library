---
title: "Internal"
source: https://stalw.art/docs/auth/backend/internal/
---

# Internal

> Section: Access Control › Directories

The internal directory handles credential validation, email address lookup, and storage of account-level settings such as disk quotas and group memberships. It is suitable for deployments where Stalwart is the primary identity store and no external directory is in use. All account management, including the creation of new accounts, password changes, and quota adjustments, is carried out directly on the server.

Internally, account records are kept in the configured [data store](https://stalw.art/docs/storage/data), which is where account information is written to and read from.

## Configuration

The internal directory is selected by leaving [`directoryId`](https://stalw.art/docs/ref/object/authentication#directoryid) unset on the [Authentication](https://stalw.art/docs/ref/object/authentication) singleton (found in the WebUI under <!-- breadcrumb:Authentication --> Settings › Authentication › General<!-- /breadcrumb:Authentication -->). In that configuration Stalwart reads account records from the [DataStore](https://stalw.art/docs/ref/object/data-store) singleton (found in the WebUI under <!-- breadcrumb:DataStore --> Settings › Storage › Data Store<!-- /breadcrumb:DataStore -->), and no external Directory object is required.

## Account management

Account management is performed through the [WebUI](https://stalw.art/docs/management/webui/), the JMAP API, or the [CLI](https://stalw.art/docs/management/cli/), all of which operate on the same underlying objects ([Account](https://stalw.art/docs/ref/object/account), [AccountPassword](https://stalw.art/docs/ref/object/account-password), [AppPassword](https://stalw.art/docs/ref/object/app-password), [ApiKey](https://stalw.art/docs/ref/object/api-key), and related principals).
