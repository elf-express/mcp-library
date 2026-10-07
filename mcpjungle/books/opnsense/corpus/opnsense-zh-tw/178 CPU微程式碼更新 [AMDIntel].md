---
title: "CPU微程式碼更新 [AMDIntel]"
title_original: "CPU Microcode updates [AMDIntel]"
source: https://docs.opnsense.org/manual/cpu-microcode.html
chapter: ["Community Plugins","Other"]
order: 178
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:33:10.485Z"
---

# CPU微程式碼更新 [AMDIntel]

## CPU微程式碼更新 \[ AMD /Intel\]

## 介紹

像AMD和英特爾這樣的處理器製造商經常發布微程式碼更新，以提高其產品的穩定性和安全性。微代碼更新可以彌補產品發布後發現的問題，因為微BIOS/UEFI更新通常發布頻率較低。

本文檔介紹了 OPNsense 中可用的兩個插件，以及如何驗證目前系統上使用的微程式碼版本。

注意事項

微代碼補丁已發佈在我們的軟體包倉庫中。如果有新的補丁版本可用，插件安裝後，系統更新時會自動套用該補丁。

## 安裝

安裝此外掛程式非常簡單，請前往“系統”‣“韌體”‣“插件”，搜尋 **os-cpu-microcode-amd**或​​**os-cpu-microcode-intel**，然後使用 \[+\] 按鈕進行安裝。

重新啟動機器以應用新的微代碼。

## [專家] 檢查微代碼版本

在機器上安裝插件後，微碼更新會自動套用。您可以使用以下命令透過控制台驗證微代碼版本：

```
x86info -a | grep -i micro
```

輸出結果應該類似：

```
Microcode patch level: 0x800126f
```

通常，製造商會發布補丁等級列表，例如AMD的補丁可以在 linux [原始碼](https://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git/tree/amd-ucode/README)樹中找到。