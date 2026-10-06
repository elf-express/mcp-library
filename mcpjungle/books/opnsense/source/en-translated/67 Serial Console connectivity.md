---
title: "Serial Console connectivity"
source: "https://docs.opnsense.org/hardware/serial_connectivity.html"
chapter: ["Official hardware"]
order: 67
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:32:14.808Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Default Configurations](<66 Default Configurations.md>)　｜　[下一篇：BIOS updates settings ➡](<68 BIOS updates settings.md>)

# Serial Console connectivity

> 章節：[Official hardware](<000 目錄.md#c-7>)

The following device families offer a mini-usb connection which can be used for serial communication:

| Series | Formfactor | Range |
| --- | --- | --- |
| DEC6XX | Desktop | Entry level |
| DEC7XX | Desktop | Midrange |
| DEC8XX | Desktop | Enterprise |
| DEC26XX | Rack | Entry level |
| DEC27XX | Rack | Midrange |
| DEC38XX | Rack | Enterprise |
| DEC40XX | Rack | Enterprise / Datacenter |

Supplied with the firewall is a mini-usb to usb cable, use this to connect the to your PC (Windows, Linux, Mac) next start your terminal program (Putty, screen, etc).

The baudrate should be set to `115200,8N1`, more information about how to use the serial console is available in our [serial access guide](<60 Serial Access.md>)

Note

The default configured settings in OPNsense for proper serial connectivity in System->Settings->Administration are as followed:

| setting | value |
| --- | --- |
| Primary Console | Serial Console |
| Secondary Console | None |
| Serial Speed | 115200 |
| USB-based serial | (unchecked) |
| Console menu | (checked) |

Windows Tip

On windows a COM port would be assigned after connecting the unit to usb, to find which one (COM1, COM2, .,) to use, keep the windows key pressed and hit `R` (Windows+R) and execute the following command `devmgmt.msc` to open the device manager.

In the device manager all available ports are visible under the “Ports (COM & LPT)” section.

## **Legacy UART vs. UEFI serial**

Starting from OPNsense 22.1 (22.4 for the business edition) and the change to FreeBSD 13-STABLE, support for EFI serial has changed, which requires EFI based systems to disable legacy support to prevent confusing the operating system. Should you connect your Deciso appliance with a serial line and get limited output / no output from the point of handover to the OS, it is important your BIOS settings are updated to disable legacy UART.

While in the BIOS, go to Setup Utility –> AMD CBS –> FCH Common Options –> UART Configuration Options –> UART 0 Legacy Options. and make sure this setting is set to **Disabled**.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Default Configurations](<66 Default Configurations.md>)　｜　[下一篇：BIOS updates settings ➡](<68 BIOS updates settings.md>)
