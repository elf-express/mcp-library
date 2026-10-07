---
title: "BIOS updates settings"
source: https://docs.opnsense.org/hardware/bios.html
chapter: ["Official hardware"]
order: 68
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:14.312Z"
---


# BIOS updates settings


## BIOS updates / settings

This page is dedicated to the latest BIOS update downloads for Deciso appliances as well as a generic instruction on how to install them.

---

Table of Contents

-   [**Product families**](#product-families)
    
    -   [DEC4200 series](#dec4200-series)
        
    -   [DEC800, DEC3800 & DEC4000 series](#dec800-dec3800-dec4000-series)
        
    -   [DEC700 and DEC2700 series](#dec700-and-dec2700-series)
        
    -   [DEC600 and DEC2600 2.5GbE series](#dec600-and-dec2600-2-5gbe-series)
        
-   [**Installation instructions**](#installation-instructions)
    
-   [**Hyper threading**](#hyper-threading)
    
-   [**Microcode updates**](#microcode-updates)
    

## [**Product families**](#id1)

### [DEC4200 series](#id2)

<table>
<tr><th colspan="2"><strong>08-2025</strong> Version 26</th></tr>
<tr><th>Download</th><th>SHA256 Checksum</th></tr>
<tr><td><a href="https://docs.opnsense.org/_downloads/e36311a4b499d5c6d2927bb8b9c084c6/A30_v26_bios.tar.gz"><code>Archive</code></a></td><td>b6833fc82902b67b1d5636f3df940f8a4d45cc157609c37d79139c3bc83325b3</td></tr>
<tr><td colspan="2">CVE updates and performance bugfix causing slow traffic throughput.</td></tr>
</table>

### [DEC800, DEC3800 & DEC4000 series](#id3)

<table>
<tr><th colspan="2"><strong>09-2026</strong> Version 05.22.01.0029.0020</th></tr>
<tr><th>Download</th><th>SHA256 Checksum</th></tr>
<tr><td><a href="https://docs.opnsense.org/_downloads/d328e53025e7f7ea079bdbe58af1f3e5/A20_05.22.01.0029.0020_bios.tar.gz"><code>Archive</code></a></td><td>71da143d1cdc311e9a28f04a3d8e42995d9381c8bc7577dd56c628092c2d4bfe</td></tr>
</table>

### [DEC700 and DEC2700 series](#id4)

<table>
<tr><th colspan="2"><strong>09-2026</strong> Version 05.3A.17.0031-A10.37</th></tr>
<tr><th>Download</th><th>SHA256 Checksum</th></tr>
<tr><td><a href="https://docs.opnsense.org/_downloads/23e853d96108bde669e0bafca81a0583/A10_05.3A.17.0031-A10.37_bios.tar.gz"><code>Archive</code></a></td><td>55efb8da1d9916d8215c6450f3823c9040f50722f5cc91e2e9ac6ef94880f9d7</td></tr>
</table>

### [DEC600 and DEC2600 2.5GbE series](#id5)

Warning

This firmware is exclusive to the DEC600 and DEC2600 2.5 Gigabit series of the A8 version 2 boards. Do not install this firmware on older DEC600/DEC2600 devices that only support 1 Gigabit Ethernet.

Attention

The DEC600 and DEC2600 series (2.5GbE) use an image file that must be written to a USB drive as described in the [OPNsense installation instructions](<55 Initial Installation & Configuration.md#installation-media>). Replace the OPNsense image in the instructions with the BIOS image and write it to the USB drive. After preparing the USB drive, you can ignore steps 1 to 3 and start from step 4 of the installation instructions below.

<table>
<tr><th colspan="2"><strong>03-2024</strong> Version 2</th></tr>
<tr><th>Download</th><th>SHA256 Checksum</th></tr>
<tr><td><a href="https://docs.opnsense.org/_downloads/4ed93e5d1e28d71a2f76120eeb619ab8/Coreboot_Deciso_A8V2.img.bz2"><code>Image</code></a></td><td>1f05ed6423dc45bf5c479a86e813ec2a87d73e77544eedd49f2343c5942d2218</td></tr>
<tr><td colspan="2">CPU Frequency corrections and minor bugfixes</td></tr>
</table>

## [**Installation instructions**](#id6)

Updating the UEFI firmware requires writing a bootable image to a USB drive on a separate machine. Make sure you have an empty or unused USB drive before starting this procedure. Also make sure the USB drive is FAT32 formatted.

Warning

As a general warning, following this procedure is at your own risk.

**Step 1**

Download the latest BIOS archive file for your platform from the downloads section above.

**Step 2**

Verify the SHA256 checksum.

**Step 3**

Insert the USB drive into your computer and extract the archive to the USB drive. Make sure the file structure is as follows:

```
USB drive:/
├── LATEST.FD
├── startup.nsh
├── H2OFFT-Sx64.efi
├── efi/
│   ├── boot/
│   │   ├── Bootx64.efi
```

**Step 4**

Safely remove the USB drive from the computer and plug it into the appliance.

**Step 5**

Connect to the appliance using a [Serial Console connectivity](<67 Serial Console connectivity.md#serial>) connection. Open a terminal to the relevant COM port.

**Step 6**

Boot the appliance and enter the BIOS by pressing Escape. The current BIOS version (suffix) should show up. Make note of it so you can compare it to the new version to verify everything went well.

**Step 7**

Go to Setup Utility –> AMD CBS –> FCH Common Options –> UART Configuration Options –> UART 0 Legacy Options. Make sure this setting is set to **Disabled**. This is explained in [Legacy UART vs. UEFI serial](<67 Serial Console connectivity.md#legacy-uart>).

Note

Should your serial terminal highlight a BIOS option selection in such a way that it is unreadable, for the A20 appliance it’s the very first option in the UART Configuration Options menu screen.

**Step 8**

Select **Boot manager** and boot the USB drive. The UEFI shell will take over and execute the necessary BIOS update. If the update is complete, the machine will power off. **Do NOT do anything until the machine has shutdown.**

Note

Should the USB drive not show up, something went wrong during writing. The newly created FAT32 partition should be the very first block on the drive. Inspect the drive on a different machine to check the layout.

**Step 9**

Reboot the machine and check the new BIOS version in either the boot log or the BIOS itself.

## [**Hyper threading**](#id7)

Selected models do support hyper threading, but as effectiveness depends on workload, we tend to disable it by default. If you do want to enable it when supported, enter the setup utility and search for the following menu item:

> AMD CBS -> Zen Common Options -> Core/Thread Enablement -> SMTEN

Select `Auto` here to enable the feature.

## [**Microcode updates**](#id8)

Microcode patches are distributed in our EFI firmware updates. If a Microcode update is required to address specific issues which are deemed important enough by AMD/Intel, you can install the microcode update yourself in a timely manner by using the [CPU Microcode updates \[AMD/Intel\]](<178 CPU Microcode updates [AMDIntel].md>) plugin.

---

