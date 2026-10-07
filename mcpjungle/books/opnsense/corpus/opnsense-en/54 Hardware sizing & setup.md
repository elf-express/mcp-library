---
title: "Hardware sizing & setup"
source: https://docs.opnsense.org/manual/hardware.html
chapter: ["Installation and setup"]
order: 54
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:07.757Z"
---


# Hardware sizing & setup


The **hardware setup** requires a careful preparation and selection of the standard PC hardware components for the intended installation of OPNsense.

⚠ Computer hardware with the open source security software OPNsense® pre-installed can be purchased directly from various (online) stores.

Tip

The OPNsense development team encourages everyone looking for a turn-key solution to buy from [Deciso](https://www.deciso.com/) or one of the other partners listed on our partner page. **Listed partners make significant contributions back to the project.**

## Supported hardware architectures

OPNsense® is available for [x86-64](https://en.wikipedia.org/wiki/X86-64) (amd64) bit microprocessor architectures. Full installs on [SD memory cards](https://en.wikipedia.org/wiki/Secure_Digital), [solid-state disks (SSD)](https://en.wikipedia.org/wiki/Solid-state_drive) or [hard disk drives (HDD)](https://en.wikipedia.org/wiki/Hard_disk_drive) are intended for OPNsense.

While supported devices range from embedded systems to rack-mounted servers, the hardware must be capable of running 64-bit [operating systems](https://en.wikipedia.org/wiki/operating_system).

## Hardware requirements

For substantially narrowed OPNsense® functionality there is the basic specification. For full functionality there are minimum, reasonable and recommended specifications.

Minimum

This is the minimum specification to run all OPNsense standard features that do not need disk writes. It means that you can run all standard features, except for the ones that require disk writes, e.g. a caching proxy (cache) or intrusion detection and prevention (alert database).

|   |   |
| --- | --- |
| Processor | 1 GHz dual-core CPU |
| RAM | 3 GB |
| Install method | Serial console or video (VGA) |
| Install target | SD or CF card with a minimum of 4 GB, use nano images for installation. |

Table: *Minimum hardware requirements*

Reasonable

This is the reasonable specification to run all OPNsense standard features. It means that every feature is functional, but perhaps not with a lot of users or high loads.

|   |   |
| --- | --- |
| Processor | 1 GHz dual-core CPU |
| RAM | 4 GB |
| Install method | Serial console or video (VGA) |
| Install target | 40 GB SSD, a minimum of 3 GB memory is needed for the installer to run. |

Table: *Reasonable hardware requirements*

Recommended

This is the recommended specification to run all OPNsense standard features. It means that every feature is functional and fits most use cases.

|   |   |
| --- | --- |
| Processor | 1.5 GHz multi-core CPU |
| RAM | 8 GB |
| Install method | Serial console or video (VGA) |
| Install target | 120 GB SSD |

Table: *Recommended hardware requirements*

Hardware guide

The hardware required for your local OPNsense will be determined by the intended minimum [throughput](#throughput) and feature set.

## Impact of Feature set

While most features do not affect hardware dimensioning, a few features have a massive impact on it. These include:

[Squid](https://en.wikipedia.org/wiki/Squid_\(software\))

A caching web proxy which can be used for web-content control. These packages rely strongly on CPU load and disk-cache writes.

[Captive portal](https://en.wikipedia.org/wiki/Captive_portal)

Settings with hundreds of simultaneously served captive portal users will require more CPU power in all the hardware specifications displayed below.

[State transition tables](https://en.wikipedia.org/wiki/State_transition_table)

It is a known fact that each state table entry requires about 1 kB (kilobytes) of RAM. The average state table, filled with 1000 entries, will occupy about 1 MB (megabytes) of [RAM](https://en.wikipedia.org/wiki/Random-access_memory). OPNsense usage settings with hundreds of thousands of connections will require memory accordingly.

  

## Throughput

The main hardware factors of the OPNsense setup involved are CPU, RAM, mass storage (disc), the number and quality of network interfaces.

<table>
<tr><th>Throughput (Mbps)</th><th>Hardware requirements</th><th>Feature set</th><th>Users / Networks</th></tr>
<tr><td>11-150</td><td>Basic spec.</td><td>narrowed</td><td>adjusted (10-30)</td></tr>
<tr><td>11-150</td><td>Minimum spec.</td><td>reduced</td><td>adjusted (10-30)</td></tr>
<tr><td>151-350</td><td>Reasonable spec.</td><td>all</td><td>substantial (30-50)</td></tr>
<tr><td>350-750+</td><td>Recommended spec.</td><td>all</td><td>substantial+ (50-150+)</td></tr>
<tr><td colspan="4">Mbps (Mbit/s or Mb/s) - Megabit per second - 1,000,000 bits per second</td></tr>
</table>

Network interface cards

As the FreeBSD hardware-lists and -recommendations say, Intel® network interface cards (NIC) for [LAN](https://en.wikipedia.org/wiki/Local_area_network) connections are reliable, fast and not error-prone. Intel chipset NICs deliver higher throughput at a reduced [CPU load](https://en.wikipedia.org/wiki/Load_\(computing\)).

Supported hardware

FreeBSD is the base of OPNsense. All FreeBSD drivers are included in the OPNsense kernel, and the hardware compatibility is the same.

Tip

If you are looking to buy new hardware then take a look at our [partner page](https://opnsense.org/partners) as these partners contribute back to OPNsense and sell hardware that is know to work well.

For further help and support, see

-   [FreeBSD 14.1 Hardware Compatibility List](https://www.freebsd.org/releases/14.1R/hardware/)
    
-   [OPNsense Forum](https://forum.opnsense.org/)
    

List of references

-   Schellevis, Jos; *Hardware requirements*; [OPNsense > Get started](https://opnsense.org/users/get-started/) (2015)
    
-   McKusick, Marshall; Neville-Neil, George V; Warson, Robert NM; *The Design and Implementation of the FreeBSD Operating System* (2015); Addison-Wesley, New Jersey; ISBN 978-0321968975

---

