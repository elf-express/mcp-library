---
title: "AddressBook"
source: https://stalw.art/docs/ref/object/address-book/
description: "Configures address book and contact storage settings."
---

# AddressBook

> Section: Schema reference › Objects

Configures address book and contact storage settings.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Calendar & Contacts › Address Book

## Fields

##### `defaultDisplayName`

> Type: `String?` · default: `"Stalwart Address Book"`
>
> Specifies the default display name for a contact when it is created

##### `defaultHrefName`

> Type: `String?` · default: `"default"`
>
> Specifies the default href name for a contact when it is created

##### `maxVCardSize`

> Type: `Size` · default: `524288`
>
> Specifies the maximum size of a vCard file that can be uploaded to the server

##### `maxAddressBooks`

> Type: `UnsignedInt?` · default: `250` · min: 1
>
> The default maximum number of address books a user can create

##### `maxContacts`

> Type: `UnsignedInt?` · min: 1
>
> The default maximum number of contact cards a user can create

##### `vCardVersion`

> Type: [`VCardVersion`](#vcardversion) · default: `"v4"`
>
> vCard version used when serializing contact cards for clients that do not request a specific version

## JMAP API

The AddressBook singleton is available via the `urn:stalwart:jmap` capability.

### `x:AddressBook/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysAddressBookGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AddressBook/get",
          {
            "ids": [
              "singleton"
            ]
          },
          "c1"
        ]
      ],
      "using": [
        "urn:ietf:params:jmap:core",
        "urn:stalwart:jmap"
      ]
    }'
```

### `x:AddressBook/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysAddressBookUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:AddressBook/set",
          {
            "update": {
              "singleton": {
                "defaultDisplayName": "updated value"
              }
            }
          },
          "c1"
        ]
      ],
      "using": [
        "urn:ietf:params:jmap:core",
        "urn:stalwart:jmap"
      ]
    }'
```

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get AddressBook
```

### Update

```sh
stalwart-cli update AddressBook --field defaultDisplayName='updated value'
```

## Enums

### VCardVersion

| Value | Label |
|---|---|
| `v4` | vCard 4.0 |
| `v3` | vCard 3.0 |
