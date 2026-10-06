---
title: "Organize PF Rules by Category"
source: "https://docs.opnsense.org/manual/how-tos/fwcategory.html"
chapter: ["Firewall","Setup guides"]
order: 151
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:58.876Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Diagnostics](<150 Diagnostics.md>)　｜　[下一篇：Configure Spamhaus DROP ➡](<152 Configure Spamhaus DROP.md>)

# Organize PF Rules by Category

> 章節：[Firewall](<000 目錄.md#c-26>) › [Setup guides](<000 目錄.md#c-31>)

OPNsense firewall rules can be organized per category. These categories can be freely chosen or selected.

Note

This feature was added in version 16.1.1. Always keep your system up to date.

## Adding a category to a rule

To add a category to a rule, open or create a new rule and scroll to **Category**. Then just add you category, if this is the first rule with a category no selection options will be visible.

[![../../_images/Rule_Category.png](<../images/92879ba3-Rule_Category.png>)](https://docs.opnsense.org/_images/Rule_Category.png)

## Firewall Rules Filter by category

Only when there are rules with a defined category, the **Filter by category** becomes visible at the bottom of the table.

If you click it is will look like this:

[![../../_images/Filter_by_Category.png](<../images/5fddd191-Filter_by_Category.png>)](https://docs.opnsense.org/_images/Filter_by_Category.png)

If you have a large number of categories, then just start typing and in search box to make a quick selection.

## Before Selection

Take a look at this simple rule set before selecting our “My IPs” category.

[![../../_images/Rules_Full.png](<../images/e15eecbf-Rules_Full.png>)](https://docs.opnsense.org/_images/Rules_Full.png)

## And after selection

Now when selecting our test category it will look like this:

[![../../_images/Filter_Category_Result.png](<../images/dc0a997f-Filter_Category_Result.png>)](https://docs.opnsense.org/_images/Filter_Category_Result.png)

That is all there is to it to organize your rules without messing anything up.

## Multi Select

In a later release of OPNsense 16.1 multi selection has been added. This features makes it possible to select rules from more than one category.

Example:

[![../../_images/fw_category_multiselect.png](<../images/45773ed6-fw_category_multiselect.png>)](https://docs.opnsense.org/_images/fw_category_multiselect.png)

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Diagnostics](<150 Diagnostics.md>)　｜　[下一篇：Configure Spamhaus DROP ➡](<152 Configure Spamhaus DROP.md>)
