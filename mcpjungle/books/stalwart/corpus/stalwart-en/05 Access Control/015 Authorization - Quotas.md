---
title: "Quotas"
source: https://stalw.art/docs/auth/authorization/quotas/
---

# Authorization - Quotas

> Section: Access Control › Authorization

Quotas regulate resource consumption on the server, ensuring fair allocation of storage and object capacity across accounts and tenants. They define limits on the amount of data an account may hold, as well as the number of objects of a given kind it may create. Quotas can be enforced per account or, in multi-tenant deployments, per tenant.

Stalwart supports two broad categories of quota. Disk-usage quotas control the total storage consumed by an account's data, while object quotas cap the number of distinct items (messages, mailboxes, calendar events, address book entries, and similar) that an account can hold.

Per-account limits are carried on the [Account](https://stalw.art/docs/ref/object/account) object (found in the WebUI under <!-- breadcrumb:Account --> Management › Directory › Groups, Management › Directory › Accounts<!-- /breadcrumb:Account -->) via its [`quotas`](https://stalw.art/docs/ref/object/account#quotas) field, which is a map from a `StorageQuota` key to a numeric limit. Per-tenant limits are carried on the [Tenant](https://stalw.art/docs/ref/object/tenant) object (found in the WebUI under <!-- breadcrumb:Tenant --> Management › Directory › Tenants<!-- /breadcrumb:Tenant -->) via its [`quotas`](https://stalw.art/docs/ref/object/tenant#quotas) field, which maps a `TenantStorageQuota` key to a numeric limit.

## Disk Usage Quotas

The total amount of disk space an account may consume is expressed through the `maxDiskQuota` entry in the account's [`quotas`](https://stalw.art/docs/ref/object/account#quotas) map, in bytes. Tenants expose an equivalent entry on their [`quotas`](https://stalw.art/docs/ref/object/tenant#quotas) map, capping total storage across the tenant's members.

Quota values are held exclusively on the Account and Tenant objects; the server does not read disk-quota attributes from external directories. Even when authentication is delegated to LDAP or SQL, quotas must be configured through the Account object (or the Tenant object for tenant-wide caps) from the WebUI or the JMAP API.

## Object Quotas

Object quotas cap the number of items of each kind that can be stored under an account or tenant. The available keys are defined by the `StorageQuota` enum on the Account object, and by the `TenantStorageQuota` enum on the Tenant object. Relevant `StorageQuota` values include [`maxEmails`](https://stalw.art/docs/ref/object/account#storagequota), [`maxMailboxes`](https://stalw.art/docs/ref/object/account#storagequota), [`maxCalendars`](https://stalw.art/docs/ref/object/account#storagequota), [`maxCalendarEvents`](https://stalw.art/docs/ref/object/account#storagequota), [`maxAddressBooks`](https://stalw.art/docs/ref/object/account#storagequota), [`maxContactCards`](https://stalw.art/docs/ref/object/account#storagequota), [`maxFiles`](https://stalw.art/docs/ref/object/account#storagequota), [`maxEmailIdentities`](https://stalw.art/docs/ref/object/account#storagequota), [`maxEmailSubmissions`](https://stalw.art/docs/ref/object/account#storagequota), [`maxSieveScripts`](https://stalw.art/docs/ref/object/account#storagequota), [`maxPushSubscriptions`](https://stalw.art/docs/ref/object/account#storagequota), [`maxAppPasswords`](https://stalw.art/docs/ref/object/account#storagequota), and [`maxApiKeys`](https://stalw.art/docs/ref/object/account#storagequota).

A value set under an account's [`quotas`](https://stalw.art/docs/ref/object/account#quotas) map overrides the server-wide default for that key. The defaults themselves live on the service-specific singletons rather than on the Account object: mail-related caps such as [`maxMessages`](https://stalw.art/docs/ref/object/email#maxmessages), [`maxMailboxes`](https://stalw.art/docs/ref/object/email#maxmailboxes), [`maxSubmissions`](https://stalw.art/docs/ref/object/email#maxsubmissions), and [`maxIdentities`](https://stalw.art/docs/ref/object/email#maxidentities) are defined on the [Email](https://stalw.art/docs/ref/object/email) singleton, calendar caps such as [`maxCalendars`](https://stalw.art/docs/ref/object/calendar#maxcalendars) and [`maxEvents`](https://stalw.art/docs/ref/object/calendar#maxevents) on the [Calendar](https://stalw.art/docs/ref/object/calendar) singleton, address-book caps such as [`maxAddressBooks`](https://stalw.art/docs/ref/object/address-book#maxaddressbooks) and [`maxContacts`](https://stalw.art/docs/ref/object/address-book#maxcontacts) on the [AddressBook](https://stalw.art/docs/ref/object/address-book) singleton, and file-storage caps such as [`maxFiles`](https://stalw.art/docs/ref/object/file-storage#maxfiles) on the [FileStorage](https://stalw.art/docs/ref/object/file-storage) singleton. Consult those objects for the server-wide default applied when an account does not set its own value.

To restrict the number of calendars and address books that a single account may create, set the relevant entries on the account's [`quotas`](https://stalw.art/docs/ref/object/account#quotas) field:

```json
{
  "quotas": {
    "maxCalendars": 300,
    "maxAddressBooks": 500
  }
}
```

Default maximum numbers of per-account app passwords and API keys are also controlled globally through [`maxAppPasswords`](https://stalw.art/docs/ref/object/authentication#maxapppasswords) and [`maxApiKeys`](https://stalw.art/docs/ref/object/authentication#maxapikeys) on the [Authentication](https://stalw.art/docs/ref/object/authentication) singleton (found in the WebUI under <!-- breadcrumb:Authentication --> Settings › Authentication › General<!-- /breadcrumb:Authentication -->).
