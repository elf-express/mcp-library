---
title: "How To Setting Up A Mail Gateway"
source: "https://docs.opnsense.org/manual/how-tos/mailgateway.html"
chapter: ["Community Plugins","Other"]
order: 182
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:33:13.554Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Setup FreeRADIUS for accounting](<181 Setup FreeRADIUS for accounting.md>)　｜　[下一篇：Netbird Plugin Setup Guide ➡](<183 Netbird Plugin Setup Guide.md>)

# How To Setting Up A Mail Gateway

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Other](<000 目錄.md#c-38>)

## How To: Setting Up A Mail Gateway

Warning

A mail gateway under high load may need a lot of memory and CPU power. Keep in mind that the components have some hardware requirements like the ClamAV- and the Redis plugin. It is not recommended to run this software on weak hardware.

## Installation

First of all, you have to install the required plugins from the plugins view.

![../../_images/menu_plugins.png](<../images/a11a0992-menu_plugins.png>)

The required plugins are:

-   ClamAV
    
-   Postfix
    
-   Redis
    
-   Rspamd
    

After a page reload you will get some new menu entry under services for all installed plugins.

## Configuration Of The Plugins

### 1\. ClamAV

For ClamAV, you can follow the instructions in [ClamAV](<167 ClamAV.md>).

### 2\. Redis (optional but recommended)

In the next step, we need to install the Redis database. Redis is required for caching and for some features of the rspamd plugin.

Warning

If you don’t set up a Redis instance, some components of rspamd will automatically disable themself silently and it will not be visible in the GUI.

![../../_images/redis_general.png](<../images/97109700-redis_general.png>)

For a basic Redis instance, you can just check Enable Redis and click Apply to start the servers.

### 3\. Rspamd

First of all, you will need to activate the plugin by checking the Enable rspamd checkbox. If you have installed and configured the Redis plugin, you should check the second checkbox as well.

![../../_images/rspamd_general.png](<../images/0340e784-rspamd_general.png>)

If you are ready, rspamd should be up and running.

Now you should configure the rspamd modules you need.

Note

The ClamAV component does enable or disable itself automatically if it has been configured depending on the ClamAV (clamd) configuration.

For example, if the MX should be checked, the menu for the Spam Protection:

![../../_images/rspamd_antispam_menu.png](<../images/c7a88731-rspamd_antispam_menu.png>)

After a click, you will see the form:

![../../_images/rspamd_mx_check.png](<../images/ea5293d0-rspamd_mx_check.png>)

In this case the configuration is quite simple: Check Enabled, add a cache expiration time (in Seconds) as well as clicking at the Apply button.

### Postfix

First of all, you need to configure the domains you want to forward in the Domains menu.

![../../_images/postfix_add_new_domain.png](<../images/7bad0657-postfix_add_new_domain.png>)

Enter the values for your mail server in the dialog after clicking +:

![../../_images/postfix_add_domain_forward.png](<../images/2c56ccbe-postfix_add_domain_forward.png>)

After saving usually the apply button needs to be hit but the server is not running anyway as it needs to be configured first. If you add new domains, you have to hit this button to apply changes.

![../../_images/postfix_general_tab.png](<../images/309249fe-postfix_general_tab.png>)

In the General tab, the Postfix service must be enabled. If your system settings differ from your system settings, you may override them here. For example overriding the hostname makes sense because you may want to use the hostname which has been configured as the MX host in the DNS.

You should keep the checkboxes at the bottom enabled as they enable restrictions, which provide an additional layer of security.

Save the changes and switch to Antispam tab.

![../../_images/postfix_antispam_tab.png](<../images/7a28cb4d-postfix_antispam_tab.png>)

Enable the Checkbox and click Save.

## Follow Up Tasks

In the next step, you should go to the Firewall menu. Create a new rule to pass port TCP/25 traffic from Any to This Firewall.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Setup FreeRADIUS for accounting](<181 Setup FreeRADIUS for accounting.md>)　｜　[下一篇：Netbird Plugin Setup Guide ➡](<183 Netbird Plugin Setup Guide.md>)
