---
title: "Overview"
source: https://docs.opnsense.org/development/backend/overview.html
chapter: ["Development Manual","Backend"]
order: 244
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:43.885Z"
---

# Overview

The life of a service starts during the boot process, but with different hooks available, sometimes it is challenging to find the correct one. This paragraph aims to explain the various integration spots available, which are being explained in more detail in the rest of the chapter.

## Bootup

After the kernel is loaded and the machine starts to boot, the following integration points are being executed in sequence:

1.  [syshook/early](<245 Bootup autorun options.md>), simple shell scripts to run before any network services are loaded, can for example be used to load specific drivers.
    
2.  [plugins/device](<248 Using plugins.md>), register and create devices, services like OpenVPN use this on our end to make sure `tun` and `tap` devices exist before doing further configuration.
    
3.  [plugins/configure/early](<248 Using plugins.md>), configure `early` event in bootup process, before normal services are being started (things like ssh and the webconfigurator use this spot)
    
4.  [plugins/firewall](<248 Using plugins.md>) allows for automatic firewall (nat) rule registration in cases where the service is able to ship its own rules. (some do this optionally for easy setup)
    
5.  [plugins/configure/vpn](<248 Using plugins.md>), configure `vpn` event, vpn type services are being configured here (e.g. IPsec, OpenVPN)
    
6.  [plugins/configure/bootup](<248 Using plugins.md>), configure `bootup` event, normal legacy service configuration, when not using the rc(8) system (for example: unbound, ntpd)
    
7.  [syshook/start](<245 Bootup autorun options.md>), simple shell scripts to run after all networking has been setup.
    
8.  [rc(8)](<245 Bootup autorun options.md>), regular rc(8) scripts (executed using the above `` the rc.syshook.d/start` ``)
    

Tip

Use `pluginctl -c` to display available events and the plugins attached to them.

## Running stage

Now the system is booted and events may take place, some of the common integration points with their purpose are listed below:

-   [syshook/carp](<245 Bootup autorun options.md>), when a high-availability node changes roles from/to master or backup, these scripts are being executed. This offers the ability to prevent client services from connecting when in the wrong mode.
    
-   [plugins/configure/newwanip](<248 Using plugins.md>) will be triggered after an interface retrieves a dynamic address.
    
-   [plugins/configure/vpn](<248 Using plugins.md>) will be triggered when the VPN subsystem requires reloading.
    
-   [plugins/interface](<248 Using plugins.md>) handles dynamic registration of new (virtual) interfaces.
    
-   [plugins/syslog](<248 Using plugins.md>) registers syslog facilities
    
-   [plugins/xmlrpc](<248 Using plugins.md>) registers configuration synchronisation points.
    

## Shutdown (reboot)

When the system is shutdown or being rebooted, we can hook actions using the [syshook/stop](<245 Bootup autorun options.md>) script directory. Services like the backup hook into this to flush contents before being terminated.