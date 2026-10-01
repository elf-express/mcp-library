---
title: "CPU Microcode updates [AMDIntel]｜CPU微程式碼更新 [AMDIntel]"
title_original: "CPU Microcode updates [AMDIntel]"
source: "https://docs.opnsense.org/manual/cpu-microcode.html"
chapter: ["Community Plugins","Other"]
order: 178
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:33:10.485Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Caddy Reverse Proxy｜Caddy 反向代理](<177 Caddy 反向代理.md>)　｜　[下一篇：Caching Proxy｜快取代理 ➡](<179 快取代理.md>)

# CPU Microcode updates [AMDIntel]｜CPU微程式碼更新 [AMDIntel]

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Other](<000 目錄.md#c-38>)

## CPU Microcode updates \[AMD/Intel\]｜CPU微程式碼更新 \[ AMD /Intel\]

## Introduction｜介紹

Processor manufacturers like AMD and Intel often release microcode updates to increase the stability and security of their products. Microcode updates can close the gap between BIOS/UEFI updates, which are generally less frequently available, to fix issues found after the product’s release.

像AMD和英特爾這樣的處理器製造商經常發布微程式碼更新，以提高其產品的穩定性和安全性。微代碼更新可以彌補產品發布後發現的問題，因為微BIOS/UEFI更新通常發布頻率較低。

This document describes the two plugins available in OPNsense and how to verify the microcode version being used on the system at hand.

本文檔介紹了 OPNsense 中可用的兩個插件，以及如何驗證目前系統上使用的微程式碼版本。

Note

筆記

Microcode patches are shipped in our package repository. If there is a new patch level available, it will automatically be applied on a system update while the plugin is installed.

微代碼補丁已發佈在我們的軟體包倉庫中。如果有新的補丁版本可用，插件安裝後，系統更新時會自動套用該補丁。

## Installation｜安裝

Installation of this plugin is rather easy, go to System ‣ Firmware ‣ Plugins and search for **os-cpu-microcode-amd** or **os-cpu-microcode-intel**, then use the \[+\] button to install it.

安裝此外掛程式非常簡單，請前往“系統”‣“韌體”‣“插件”，搜尋 **os-cpu-microcode-amd**或​​**os-cpu-microcode-intel**，然後使用 \[+\] 按鈕進行安裝。

Reboot the machine to apply the new microcode.

重新啟動機器以應用新的微代碼。

## \[Expert\] Check microcode version｜[專家] 檢查微代碼版本

After installing the plugin on the machine, the microcode update is applied. You can validate the microcode version via the console by using the following command:

在機器上安裝插件後，微碼更新會自動套用。您可以使用以下命令透過控制台驗證微代碼版本：

```
x86info -a | grep -i micro
```

Which should output something like:

輸出結果應該類似：

```
Microcode patch level: 0x800126f
```

Usually manufacturers publish a list of patch levels, for example AMD’s patches can be found in the linux [source](https://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git/tree/amd-ucode/README) tree.

通常，製造商會發布補丁等級列表，例如AMD的補丁可以在 linux [原始碼](https://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git/tree/amd-ucode/README)樹中找到。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Caddy Reverse Proxy｜Caddy 反向代理](<177 Caddy 反向代理.md>)　｜　[下一篇：Caching Proxy｜快取代理 ➡](<179 快取代理.md>)
