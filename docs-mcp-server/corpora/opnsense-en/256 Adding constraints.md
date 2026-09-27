---
title: "Adding constraints"
source: "https://docs.opnsense.org/development/frontend/models_constraints.html"
chapter: ["Development Manual","Frontend","Creating Models"]
order: 256
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:50.754Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Custom (app specific) field types](<255 Custom (app specific) field types.md>)　｜　[下一篇：Migrations ➡](<257 Migrations.md>)

# Adding constraints

> 章節：[Development Manual](<000 目錄.md#c-52>) › [Frontend](<000 目錄.md#c-55>) › [Creating Models](<000 目錄.md#c-56>)

Constraints can be used on top of type validations provided by the base fields described in the previous chapter. The base class BaseConstraint is used as base type and contains shared functionality.

Since fields are usually only validated when there’s change detected, it’s usually necessary to add back references to chain validations.

## DependConstraint

When choices depend on each other, you can use the DependConstraint type. The following example makes sslurlonly depend on the sslbump option, since the <reference> tag is needed to make sure when one of the settings changes, the other is validated again too.

```xml
<sslbump type="BooleanField">
    <Constraints>
        <check001>
            <type>DependConstraint</type>
            <addFields>
                <field1>sslurlonly</field1>
            </addFields>
        </check001>
    </Constraints>
</sslbump>
<sslurlonly type="BooleanField">
    <Constraints>
        <check001>
            <reference>sslbump.check001</reference>
        </check001>
    </Constraints>
</sslurlonly>
```

## AllOrNoneConstraint

Make sure that options are only valid when selected in combination.

## SingleSelectConstraint

When options are not valid in combination, you can hook options together so only one of the options can be selected at the same time.

## UniqueConstraint

This constraint helps to make sure all items within an ArrayField are unique, such as the following example which makes sure all “filenames” in this set are unique.

```xml
<filename type="TextField">
    <Constraints>
        <check001>
            <type>UniqueConstraint</type>
        </check001>
    </Constraints>
</filename>
```

## ComparedToFieldConstraint

The ComparedToFieldConstraint compares the value of the current field to the value of a referenced field on the same level (for example in the same ArrayField). It is for example used for the [rspamd](https://github.com/opnsense/plugins/blob/master/mail/rspamd/src/opnsense/mvc/app/models/OPNsense/Rspamd/RSpamd.xml) plugin, to ensure that some values are in the correct order. This constraint can be used to compare numeric values.

Example:

```xml
<check003>
  <ValidationMessage>This field must be bigger than the greylist score.</ValidationMessage>
  <type>ComparedToFieldConstraint</type>
  <field>greylistscore</field>
  <operator>gt</operator>
</check003>
```

In this example, the valueof the current field must be greater than the value of the field “greylistscore”.

Field values:

|   |   |
| --- | --- |
| ValidationMessage | Validation message (translateable) which will be shown in case the validation fails. |
| type | ComparedToFieldConstraint |
| field | the other field which we reference |
| operator | The operator to check the value. Valid operators are gt, gte, lt, lte, eq, neq |

Operators:

|   |   |
| --- | --- |
| gt | greater than |
| gte | greater than or equal |
| lt | lesser than |
| lte | lesser than or equal |
| eq | equal |
| neq | not equal |

## SetIfConstraint

The SetIfConstraint is used to make some fields conditionally mandatory. It is mainly used in the [nginx](https://github.com/opnsense/plugins/blob/master/www/nginx/src/opnsense/mvc/app/models/OPNsense/Nginx/Nginx.xml) plugin for example to choose an implementation type. In general the other field should be an OptionField, but does not need to. In general it is a good idea to hide or show fields which are (not) required by an implementation in the frontend as well to simplify the web interface. Please note: the checked field is intended to be on the same level (for example ArrayField).

Example:

```xml
<check001>
  <ValidationMessage>This field must be set.</ValidationMessage>
  <type>SetIfConstraint</type>
  <field>match_type</field>
  <check>id</check>
</check001>
```

In this example, the value will be mandatory, if the field “match\_type” has the value “id”.

Field Values:

|   |   |
| --- | --- |
| ValidationMessage | Validation message (translateable) which will be shown in case the validation fails. |
| type | SetIfConstraint |
| field | the other field which we reference |
| check | The value of the other field which makes this field required |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Custom (app specific) field types](<255 Custom (app specific) field types.md>)　｜　[下一篇：Migrations ➡](<257 Migrations.md>)
