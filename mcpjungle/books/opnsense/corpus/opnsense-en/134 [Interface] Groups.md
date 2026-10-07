---
title: "[Interface] Groups"
source: https://docs.opnsense.org/manual/firewall_groups.html
chapter: ["Firewall"]
order: 134
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:48.737Z"
---


# [Interface] Groups


## \[Interface\] Groups

To simplify rulesets, you can combine interfaces into **Interface Groups** and add policies which will be applied to all interfaces in the group.

Since interface groups are processed before normal interfaces, you should not have issues with overlapping rules in the interface tabs itself. More details about processing order can be found [here](<137 Rules.md#firewall-rule-processing-order>)

Note

For multiwan setups be careful with groups. Since groups are not bound to a specific interface, they will use the normal routing system to determine the next hop when applied on WAN type interfaces (`reply-to` is not used here).

## Settings

|   |   |
| --- | --- |
| Name | The technical name of the group. Has some restrictions which also apply to the underlying operating system. |
| Description | A user friendly description, informational use only |
| Members | Member interfaces |

For a deployment strategy visit [Security Zones](<153 Security Zones.md>)

---

