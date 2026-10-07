---
title: "Troubleshooting"
source: https://docs.opnsense.org/troubleshooting.html
chapter: ["Troubleshooting"]
order: 223
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:33.308Z"
---


# Troubleshooting




Sometimes, even with all the hard work done to prepare your setup, issues occur. Generally it’s always good to check your logs (System ‣ Log Files or the ones found in the module your trying to setup), but sometimes more help is needed.

## General issue workflow

Before reporting issues, please make sure yours still exists on the latest version. We generally advice to check the existing [issues](https://github.com/opnsense/core/issues) and our [forum](https://forum.opnsense.org/) before reporting new ones.

In case your issue was introduced after a (minor) upgrade, you can use [opnsense-revert](<75 OPNsense Tools.md#opnsense-revert>) to downgrade specific packages installed on the system.

Using the firmware section (System ‣ Firmware ‣ Status) you can perform a health check on the system, on the bottom of the status overview is a button named **Run an audit** which can be expanded to offer the **Health** selection.

When clicked this outputs something like the following:

```yaml
***GOT REQUEST TO AUDIT HEALTH***
>>> Check installed kernel version
Version 19.7.3 is correct.
>>> Check for missing or altered kernel files
No problems detected.
>>> Check installed base version
Version 19.7.3 is correct.
>>> Check for missing or altered base files
No problems detected.
>>> Check for and install missing package dependencies
Checking all packages: .......... done
>>> Check for missing or altered package files
Checking all packages: ....
opnsense-19.7.4_1: checksum mismatch for /usr/local/etc/inc/auth.inc
Checking all packages...
Checking all packages......... done
***DONE***
```

When mismatches are reported, you can reinstall affected packages in the **Packages** section of the firmware screen. In the case above you would reinstall opnsense, since the `auth.inc` looks tainted.

Note

We advise to include the output of the health check if it seems to report issues when creating bug reports on GitHub.

Tip

Always try to be precise in issue reports, either if their about a possible bug or a feature request, it helps if intentions are absolutely clear. Our GitHub repositories use templates which should guide you through, we kindly ask you to use them (tickets not using our templates are treated as low priority).

## Topics

Some of the common mistakes we have seen over the years, combined with pointers where to look for solutions can be found in the list below.

-   [Password reset](<224 Password reset.md>)
-   [Reset firmware configuration](<225 Reset firmware configuration.md>)
-   [Restore Configuration via Console](<226 Restore Configuration via Console.md>)
-   [WebGui access reset](<227 WebGui access reset.md>)
-   [Boot](<228 Boot.md>)
-   [System hardening vs performance](<229 System hardening vs performance.md>)
-   [Gateways and monitoring](<230 Gateways and monitoring.md>)
-   [Network](<231 Network.md>)
-   [OpenVPN](<232 OpenVPN.md>)
-   [Performance](<233 Performance.md>)

---

