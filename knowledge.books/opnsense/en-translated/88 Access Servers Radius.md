---
title: "Access Servers Radius"
source: "https://docs.opnsense.org/manual/how-tos/user-radius.html"
chapter: ["System","Access / User Management","Configuration"]
order: 88
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:32:24.383Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Access Servers LDAP](<87 Access Servers LDAP.md>)　｜　[下一篇：Two-factor authentication ➡](<89 Two-factor authentication.md>)

# Access Servers Radius

> 章節：[System](<000 目錄.md#c-11>) › [Access / User Management](<000 目錄.md#c-12>) › [Configuration](<000 目錄.md#c-13>)

## Access / Servers / Radius

Configuring a Radius server for user authentication in services like vpn or captive portal is easy just go to System ‣ Access ‣ Servers and click on **Add server** in the top right corner.

Fill in the form:

|   |   |   |
| --- | --- | --- |
| **Descriptive name** | radius\_test | *Enter a descriptive name* |
| **Type** | Radius | *Select Radius* |
| **Hostname or IP address** | 10.10.10.1 | *Enter the IP of your Radius server* |
| **Shared Secret** | secret | *Shared secret for your Radius server* |
| **Services offered** | Authentication | *Select Authentication,for Captive portal + accounting* |
| **Authentication port value** | 1812 | *Port number, 1812 is default; for accounting it’s 1813* |
| **Authentication Timeout** | 5 | *Timeout for Radius to respond on requests* |
| **Synchronize groups** |  | *Enable to read group(s) from RADIUS server - requires the CLASS attribute to return the designated group\** |
| **Limit groups** |  | *Select list of groups that may be considered during sync* |
| **Automatic user creation** |  | *This offers the ability to automatically create the user when it doesn’t exist - requires “Synchronize groups” to be enabled and actually return a group for a user.* |

Note

*RADIUS does not support a \*memberOf* group concept by design. OPNsense uses the returned CLASS attribute instead to find a string containing the user’s group membership. Since the **Synchronize groups** feature shares the same code of the LDAP server feature **Synchronize groups** the string defined as CLASS value must be prefixed with *CN=* (e.g. *CLASS=”CN=MyVPN-Group”*)!

Additionally the group separator must be a line break (*n*). Some RADIUS servers (e.g. MS NPS) will not support special characters in the string value, the return value is therefore limited to a single line (which in turn translates into a single group).

Use the tester under System ‣ Access ‣ Tester to test the Radius server.

If you want to use the FreeRADIUS plugin set up the server as 127.0.0.1 and don’t forget to add a **Client** in the FreeRADIUS configuration.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Access Servers LDAP](<87 Access Servers LDAP.md>)　｜　[下一篇：Two-factor authentication ➡](<89 Two-factor authentication.md>)
