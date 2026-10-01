---
title: "Updates"
source: "https://docs.opnsense.org/manual/updates.html"
chapter: ["Installation and setup"]
order: 57
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:32:09.249Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Virtual & Cloud-Based Installation](<56 Virtual & Cloud-Based Installation.md>)　｜　[下一篇：Included software ➡](<58 Included software.md>)

# Updates

> 章節：[Installation and setup](<000 目錄.md#c-5>)

The OPNsense update schedule consists of two major releases each year, which receive minor updates about every two weeks. The major release version number consists of the year and month of release (e.g. 25.1 for the January 2025 release), with the fortnightly minor updates adding a third number (e.g. 25.1.3 for the third update to 25.1).

## Update settings

By navigating to System ‣ Firmware ‣ Settings, you can influence the firmware update settings:

-   **Firmware Mirror:** this influences where OPNsense tries to get its updates from. If you have trouble updating or searching for updates, or if your current mirror is running slowly, you can change it here.
    
-   **Release Type:** this switches between the regular fortnightly schedule of tested releases (Production) or the newest, not fully tested code (Development). **Please leave this setting on “Production”, unless you fully understand the implications of switching.**
    

Tip

The settings page is also the place where you can run audits which help in debugging common connectivity issues. Just press “Run an audit” and choose “Connectivity” from the list if you encounter issues with the remote server.

## Minor updates

Updates can be installed from the web interface by going to System ‣ Firmware ‣ Status. On this page, you can click **Check for updates** to search for updates. If they are available, a button will appear asking to install them.

## Major Upgrades

Major upgrades are recommended to be done via a VGA display or serial console so you can see what is going on.

Note

You can find documentation about serial access under [Serial Access](<60 Serial Access.md>)

Warning

Major updates are installed offline. This means no web or SSH server is running for you to monitor the upgrade. If something fails, you will need a secondary connection or direct access to revert to a snapshot or repair the installation.

If you choose option 12 on the console menu on latest release, you are asked if you want to upgrade to the newest version or to the next major release. Type in the major release number (for example “19.1”) and press enter. OPNsense will download all release files for an offline upgrade (kernel, packages etc.) and reboot afterwards.

After the reboot, it will install all updates and when it is done, it will reboot again. You should then be on the desired release.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Virtual & Cloud-Based Installation](<56 Virtual & Cloud-Based Installation.md>)　｜　[下一篇：Included software ➡](<58 Included software.md>)
