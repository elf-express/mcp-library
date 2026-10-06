---
title: "CPU Microcode updates [AMDIntel]"
source: "https://docs.opnsense.org/manual/cpu-microcode.html"
chapter: ["Community Plugins","Other"]
order: 178
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:10.485Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Caddy Reverse Proxy](<177 Caddy Reverse Proxy.md>)　｜　[下一篇：Caching Proxy ➡](<179 Caching Proxy.md>)

# CPU Microcode updates [AMDIntel]

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Other](<000 目錄.md#c-38>)

## CPU Microcode updates \[AMD/Intel\]

## Introduction

Processor manufacturers like AMD and Intel often release microcode updates to increase the stability and security of their products. Microcode updates can close the gap between BIOS/UEFI updates, which are generally less frequently available, to fix issues found after the product’s release.

This document describes the two plugins available in OPNsense and how to verify the microcode version being used on the system at hand.

Note

Microcode patches are shipped in our package repository. If there is a new patch level available, it will automatically be applied on a system update while the plugin is installed.

## Installation

Installation of this plugin is rather easy, go to System ‣ Firmware ‣ Plugins and search for **os-cpu-microcode-amd** or **os-cpu-microcode-intel**, then use the \[+\] button to install it.

Reboot the machine to apply the new microcode.

## \[Expert\] Check microcode version

After installing the plugin on the machine, the microcode update is applied. You can validate the microcode version via the console by using the following command:

```
x86info -a | grep -i micro
```

Which should output something like:

```
Microcode patch level: 0x800126f
```

Usually manufacturers publish a list of patch levels, for example AMD’s patches can be found in the linux [source](https://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git/tree/amd-ucode/README) tree.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Caddy Reverse Proxy](<177 Caddy Reverse Proxy.md>)　｜　[下一篇：Caching Proxy ➡](<179 Caching Proxy.md>)
