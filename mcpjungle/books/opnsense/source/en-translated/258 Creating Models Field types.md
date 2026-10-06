---
title: "Creating Models Field types"
source: "https://docs.opnsense.org/development/frontend/models_fieldtypes.html"
chapter: ["Development Manual","Frontend"]
order: 258
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:33:51.587Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Migrations](<257 Migrations.md>)　｜　[下一篇：Routing ➡](<259 Routing.md>)

# Creating Models Field types

> 章節：[Development Manual](<000 目錄.md#c-52>) › [Frontend](<000 目錄.md#c-55>)

## Creating Models / Field types

OPNsense comes with a collection of standard field types, which can be used to perform standard field type validations. These field types can be found in [/usr/local/opnsense/mvc/app/models/OPNsense/Base/FieldTypes/](https://github.com/opnsense/core/tree/master/src/opnsense/mvc/app/models/OPNsense/Base/FieldTypes) and usually decent from the BaseField type.

This paragraph aims to provide an overview of the types included by default and their use.

Tip

When using lists, the `Multiple` (Y/N) keyword defines if there may be more than one item selected at a time.

Tip

The xml keyword `Required` can be used to mark a field as being required.

## ArrayField

The basic field type to describe a container of objects, such as a list of addresses.

Note

This type can’t be nested, only one level of ArrayField types is supported, you can use ModelRelationField to describe master-detail constructions.

Tip

In case a model needs static (non persistent) records, the `getStaticChildren()` method may be implemented to spawn static entries. See also the custom field chapter for implementation scenarios.

## AuthGroupField

Returns and validates system (user) groups (found in System ‣ Access ‣ Groups)

*AuthGroupField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| BlankDesc | `text` | Set a label for the empty option |
| Multiple | Y,N | Allow to select multiple options |

## AuthenticationServerField

Select and validate authentication providers, maintained in System ‣ Access ‣ Servers.

*AuthenticationServerField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| BlankDesc | `text` | Set a label for the empty option |
| Multiple | Y,N | Allow to select multiple options |
| Filters | Y,N | A structure of regex filters per attribute to exclude certain options from the list |

## AutoNumberField

An integer sequence, which automatically increments on every new item of the same type in the same level.

*AutoNumberField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| MinimumValue | `int` | Minimum number also starting point of the sequence |
| MaximumValue | `int` | Maximum number |

## Base64Field

Validate if a given string contains a valid base64 decodable value.

*Base64Field*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| Mask | `regex` | Optional validation regex |

## BooleanField

Boolean field, where 0 means `false` and 1 is defined as `true`

*BooleanField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |

## CertificateField

Option list with system certificates defined in System ‣ Trust.

*CertificateField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| BlankDesc | `text` | Set a label for the empty option |
| Multiple | Y,N | Allow to select multiple options |
| Type | `ca`, `crl`, `cert` | Type of certificate to select, defaults to `cert` |

## CSVListField

List of (comma) separated values, which can be validated using a regex.

*CSVListField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| Mask | `regex` | Optional validation regex |
| MaskPerItem | Y,N | Apply regex validation to each item separately |

## ConfigdActionsField

Select available configd actions, supports filters to limit the number of choices. For example, the example below only shows actions which have a description.

```xml
<command type="ConfigdActionsField">
    <filters>
        <description>/(.){1,255}/</description>
    </filters>
</command>
```

*ConfigdActionsField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| BlankDesc | `text` | Set a label for the empty option |
| Multiple | Y,N | Allow to select multiple options |
| Filters | Y,N | A structure of regex filters per attribute to exclude certain options from the list |

## CountryField

Select and validate countries in the world.

*CountryField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| BlankDesc | `text` | Set a label for the empty option |
| Multiple | Y,N | Allow to select multiple options |
| AddInverted | Y,N | Add ‘inverted’/excluded countries to the list, copies country codes prefixes an `!` (e.g. `!NL`) |

## DescriptionField

Validate if the input contains a valid description, meaning it should be a string of 1 to 255 characters.

*DescriptionField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |

## EmailField

Validate if the input contains an email address.

*EmailField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |

## HostnameField

Check if hostnames are valid, includes the following options:

*HostnameField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| IpAllowed | Y,N | Allow an ip address |
| HostWildcardAllowed | Y,N | Allow `*` for all hostnames |
| FqdnWildcardAllowed | Y,N | Allow partial wildcard for fully qualified domain names (e.g. `*.my.top.level.domain`) |
| ZoneRootAllowed | Y,N | Allow the zone root marker (`@`) |
| IsDNSName | Y,N | Allow less strict names, used for various dns entries as specified by RFC2181 |
| AsList | Y,N | Field type should return list items |
| FieldSeparator | `text` | Separator character to use |

## IntegerField

Validate if the input contains an integer value, optionally constrained by minimum and maximum values.

*EmailField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| MinimumValue | `int` | Minimum number |
| MaximumValue | `int` | Maximum number |

## InterfaceField

Option list with interfaces defined in Interfaces ‣ Assignments, supports filters. The example below shows a list of non-dhcp active interfaces, for which multiple items may be selected, but at least one should be. It defaults to `lan`

*InterfaceField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| BlankDesc | `text` | Set a label for the empty option |
| Multiple | Y,N | Allow to select multiple options |
| Filters | Y,N | A structure of regex filters per attribute to exclude certain options from the list |
| AddParentDevices | Y,N | Add parent devices in the list when not assigned |
| AllowDynamic | Y,N,S | Allow dynamic (hotplug) interfaces, when set to `S` hotplug interfaces without a static address are ignored |

```xml
<interfaces type="InterfaceField">
    <Required>Y</Required>
    <multiple>Y</multiple>
    <default>lan</default>
    <filters>
        <enable>/^(?!0).*$/</enable>
        <ipaddr>/^((?!dhcp).)*$/</ipaddr>
    </filters>
</interfaces>
```

## IPPortField

Validates an IP:port combination (e.g. `192.168.1.1:22`). Can be used to validate a single item or a list of items and can optionally enforce either ipv4 or ipv6 addresses.

*IPPortField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| AsList | Y,N | Field type should return list items |
| FieldSeparator | `text` | Separator character to use |
| AddressFamily | `ipv4`, `ipv6` | Which address family to use, blank means ipv4+ipv6 |

## JsonKeyValueStoreField

A construct to validate against a json dataset retrieved via configd, such as

```xml
<program type="JsonKeyValueStoreField">
  <ConfigdPopulateAct>syslog list applications</ConfigdPopulateAct>
  <SourceFile>/tmp/syslog_applications.json</SourceFile>
  <ConfigdPopulateTTL>20</ConfigdPopulateTTL>
  <SortByValue>Y</SortByValue>
</program>
```

In which case `syslog list applications` is called to retrieved options, which is valid for 20 seconds (TTL) before fetching again.

*JsonKeyValueStoreField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| BlankDesc | `text` | Set a label for the empty option |
| Multiple | Y,N | Allow to select multiple options |
| ConfigdPopulateAct | `text` | Configd command responsible for the data |
| SourceFile | `text` | Temporary filename where results are stored |
| ConfigdPopulateTTL | `int` | Time To Live in seconds |
| SortByValue | Y,N | Sort by value, default sorts by key |

## LegacyLinkField

Read-only pointer to legacy config data, reads (single) property from the legacy configuration and returns its content when it exists (`null` if xml item doesn’t exist).

The following example would read the enabled property from the config xml, which resides in `<ipsec><enabled>1</enabled></ipsec>`

```xml
<enabled type="LegacyLinkField">
    <Source>ipsec.enable</Source>
</enabled>
```

Note

Values stored into this fieldtype will be discarded without further notice, which practically means the target structure will always contain an empty field as long as its used as a pointer. When functionality migrates to mvc, you can switch the type and supply migration code to load the initial values.

## MacAddressField

Validate if the given value (or multiple values) is a valid MAC address.

*MacAddressField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| AsList | Y,N | Field type should return list items |
| FieldSeparator | `text` | Separator character to use |

## ModelRelationField

Define relations to other nodes in the model, such as to point the attribute `pipe` to a `pipe` node in the TrafficShaper model.

```xml
<pipe type="ModelRelationField">
    <Model>
        <pipes>
            <source>OPNsense.TrafficShaper.TrafficShaper</source>
            <items>pipes.pipe</items>
            <display>description</display>
        </pipes>
    </Model>
</pipe>
```

To display multiple fields, the `display_format` is required.

```xml
<pipe type="ModelRelationField">
    <Model>
        <pipes>
            <source>OPNsense.TrafficShaper.TrafficShaper</source>
            <items>pipes.pipe</items>
            <display>number,description</display>
            <display_format>%s - %s</display_format>
        </pipes>
    </Model>
</pipe>
```

*ModelRelationField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| display | `text` | Comma separated list of fields to display |
| display\_format | `text` | `vsprintf()` format string |
| filters | `xml` | `regex` filters to apply on the dataset, name of the tag is the attribute name, content is used for the regex |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| BlankDesc | `text` | Set a label for the empty option |
| Multiple | Y,N | Allow to select multiple options |
| Model | `xml` | structure as described in the sample above |

## NetworkAliasField

Validate if the value is a valid network address (IPv4, IPv6), special net or alias. Predefined special networks contain the following choices:

> -   any
>     
>     -   any network
>         
>     
> -   (self)
>     
>     -   This firewall
>         
>     
> -   \[interface\]
>     
>     -   Interface network, where interface is one of `lan`, `wan`, `opt[XX]` (e.g. opt1, opt2)
>         
>     
> -   \[interface\]ip
>     
>     -   Interface address
>         
>     

All network/host type aliases (including, but not limited to GeoIP) defined in Firewall -> Aliases are also valid choices.

*NetworkAliasField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| BlankDesc | `text` | Set a label for the empty option |

## NetworkField

Validate if the value is a valid network address (IPv4, IPv6).

*NetworkField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| Mask | `regex` | Optional validation regex |
| NetMaskRequired | Y,N | Is a netmask required |
| NetMaskAllowed | Y,N | Is a netmask allowed |
| AddressFamily | `ipv4`, `ipv6` | Which address family to use, blank means ipv4+ipv6 |
| FieldSeparator | `text` | Separator character to use |
| WildcardEnabled | Y,N | Allow the use of the `any` clause |
| AsList | Y,N | Field type should return list items |
| Strict | Y,N | Disallow the usage of host bits when a netmask is used |

## NumericField

Validate input to be of numeric type.

*NumericField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| MinimumValue | `int` | Minimum number |
| MaximumValue | `int` | Maximum number |

## OptionField

Validate against a static list of options.

*OptionField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| BlankDesc | `text` | Set a label for the empty option |
| Multiple | Y,N | Allow to select multiple options |
| OptionValues | `xml` | Xml structure containing keys and values, when keys should be numeric, the value tag is also supported `<opt1 value='1'>option1</opt1>` |

When the list of available options is relatively large, its also possible to nest the options one level, which generates `<optgroup>` clauses in our model. As of 24.1 they can be defined using the following structure:

```xml
<field type="OptionField">
    <OptionValues>
        <opt1 value='option group 1'>
           <opt1 value='option1'>option 1</opt1>
        </opt1>
        <option_group2>
           <opt2>option 2</option2>
        </option_group2>
    </OptionValues>
</field>
```

## PortField

Check if the input contains a valid port number or (optionally) predefined service name. Can be a range when `EnableRanges` is set to `Y`.

*PortField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| BlankDesc | `text` | Set a label for the empty option |
| Multiple | Y,N | Allow to select multiple options, when set the type is treated as a list |
| EnableWellKnown | Y,N | Allow the usage of well known names such as ‘http’ and ‘ssh’ |
| EnableRanges | Y,N | Allow the usage of ranges, such as `80:100` |

## ProtocolField

List field type to validate if the provided value is a valid protocol name as defined by /etc/protocols (e.g. TCP, UDP) extended with the `any` option.

*ProtocolField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| BlankDesc | `text` | Set a label for the empty option |
| Multiple | Y,N | Allow to select multiple options |

## StrictTextField

Validate regular text using a regex.

This field disables some special characters in text by default.

*StrictTextField*

| Parameter | Options | Default | Purpose |
| --- | --- | --- | --- |
| default | `text` |  | Default value for new attributes |
| Required | Y,N | N | Mark field as required |
| ValidationMessage | `text` | Text does not validate. | Error message on validation failure |
| AllowSpaces | Y,N | N | Allow spaces or tabs |
| AllowNewlines | Y,N | N | Allow newlines |
| AllowSpecial | Y,N | N | Allow special control characters |
| Mask | `regex` |  | Optional validation regex |

## TextField

Validate regular text using a regex.

*TextField*

| Parameter | Options | Default | Purpose |
| --- | --- | --- | --- |
| default | `text` |  | Default value for new attributes |
| Required | Y,N | N | Mark field as required |
| ValidationMessage | `text` | Text does not validate. | Error message on validation failure |
| AllowSpaces | Y,N | Y | Allow spaces or tabs |
| AllowNewlines | Y,N | Y | Allow newlines |
| AllowSpecial | Y,N | Y | Allow special control characters |
| Mask | `regex` |  | Optional validation regex |

## UniqueIdField

Generate unique id numbers.

*UniqueIdField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |

## UpdateOnlyTextField

Write only text fields, can be used to store passwords

*TextField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| Mask | `regex` | Optional validation regex |

## UrlField

Validate if the input contains a valid URL.

*UrlField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |

## VirtualIPField

Select a virtual address defined in Interfaces -> Virtual IPs -> Settings, use with a bit of care as the keys (addresses) are subjected to change.

*VirtualIPField*

| Parameter | Options | Purpose |
| --- | --- | --- |
| default | `text` | Default value for new attributes |
| Required | Y,N | Mark field as required |
| ValidationMessage | `text` | Error message on validation failure |
| BlankDesc | `text` | Set a label for the empty option |
| Multiple | Y,N | Allow to select multiple options |
| Type | `text` | The virtual ip type to select, `*` for all (default) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Migrations](<257 Migrations.md>)　｜　[下一篇：Routing ➡](<259 Routing.md>)
