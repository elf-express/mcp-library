---
title: "BIOS updates settings｜BIOS更新設定"
title_original: "BIOS updates settings"
source: "https://docs.opnsense.org/hardware/bios.html"
chapter: ["Official hardware"]
order: 68
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:14.312Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Serial Console connectivity｜串行控制台連接](<67 串行控制台連接.md>)　｜　[下一篇：SFP(+) Compatibility｜SFP (+) 相容性 ➡](<69 SFP (+) 相容性.md>)

# BIOS updates settings｜BIOS更新設定

> 章節：[Official hardware](<000 目錄.md#c-7>)

## BIOS updates / settings｜BIOS更新/設定

This page is dedicated to the latest BIOS update downloads for Deciso appliances as well as a generic instruction on how to install them.

本頁面專門提供 Deciso 裝置的最新BIOS更新下載，以及如何安裝它們的通用說明。

---

Table of Contents

目錄

-   [**Product families**](#product-families)  
    [**產品系列**](#product-families)
    
    -   [DEC4200 series](#dec4200-series)  
        [DEC4200系列](#dec4200-series)
        
    -   [DEC800, DEC3800 & DEC4000 series](#dec800-dec3800-dec4000-series)  
        [DEC800, DEC3800 & DEC4000系列](#dec800-dec3800-dec4000-series)
        
    -   [DEC700 and DEC2700 series](#dec700-and-dec2700-series)  
        [DEC700和DEC2700系列](#dec700-and-dec2700-series)
        
    -   [DEC600 and DEC2600 2.5GbE series](#dec600-and-dec2600-2-5gbe-series)  
        [DEC600和DEC2600 2.5GbE 系列](#dec600-and-dec2600-2-5gbe-series)
        
-   [**Installation instructions**](#installation-instructions)  
    [**安裝說明**](#installation-instructions)
    
-   [**Hyper threading**](#hyper-threading)  
    [**超線程**](#hyper-threading)
    
-   [**Microcode updates**](#microcode-updates)  
    [**微程式碼更新**](#microcode-updates)
    

## [**Product families**](#id1)｜[**產品系列**](#id1)

### [DEC4200 series](#id2)｜[DEC4200系列](#id2)

<table>
<tr><th colspan="2"><strong>08-2025</strong>Version 26<br>版本 26</th></tr>
<tr><th>Download<br>下載</th><th>SHA256Checksum<br>校驗</th></tr>
<tr><td><a href="https://docs.opnsense.org/_downloads/e36311a4b499d5c6d2927bb8b9c084c6/A30_v26_bios.tar.gz"><code>Archive<br>存檔</code></a></td><td>b6833fc82902b67b1d5636f3df940f8a4d45cc157609c37d79139c3bc83325b3</td></tr>
<tr><td colspan="2">CVEupdates and performance bugfix causing slow traffic throughput.<br>更新和效能錯誤修復，導致流量吞吐量緩慢</td></tr>
</table>

### [DEC800, DEC3800 & DEC4000 series](#id3)｜[DEC800, DEC3800 & DEC4000系列](#id3)

<table>
<tr><th colspan="2"><strong>09-2026</strong>Version<br>版本05.22.01.0029.0020</th></tr>
<tr><th>Download<br>下載</th><th>SHA256Checksum<br>校驗</th></tr>
<tr><td><a href="https://docs.opnsense.org/_downloads/d328e53025e7f7ea079bdbe58af1f3e5/A20_05.22.01.0029.0020_bios.tar.gz"><code>Archive<br>存檔</code></a></td><td>71da143d1cdc311e9a28f04a3d8e42995d9381c8bc7577dd56c628092c2d4bfe</td></tr>
</table>

### [DEC700 and DEC2700 series](#id4)｜[DEC700和DEC2700系列](#id4)

<table>
<tr><th colspan="2"><strong>09-2026</strong>Version 05.3A.<br>版本 05.3A。17.0031-A10.37</th></tr>
<tr><th>Download<br>下載</th><th>SHA256Checksum<br>校驗</th></tr>
<tr><td><a href="https://docs.opnsense.org/_downloads/23e853d96108bde669e0bafca81a0583/A10_05.3A.17.0031-A10.37_bios.tar.gz"><code>Archive<br>存檔</code></a></td><td>55efb8da1d9916d8215c6450f3823c9040f50722f5cc91e2e9ac6ef94880f9d7</td></tr>
</table>

### [DEC600 and DEC2600 2.5GbE series](#id5)｜[DEC600和DEC2600 2.5GbE 系列](#id5)

Warning

警告

This firmware is exclusive to the DEC600 and DEC2600 2.5 Gigabit series of the A8 version 2 boards. Do not install this firmware on older DEC600/DEC2600 devices that only support 1 Gigabit Ethernet.

此韌體僅適用於 A8 版本 2 主機板的DEC600和DEC2600 2.5千兆系列。請勿將此韌體安裝在僅支援 1 千兆乙太網路的舊款DEC600/DEC2600裝置上。

Attention

注意

The DEC600 and DEC2600 series (2.5GbE) use an image file that must be written to a USB drive as described in the [OPNsense installation instructions](<55 初始安裝和配置.md#installation-media>). Replace the OPNsense image in the instructions with the BIOS image and write it to the USB drive. After preparing the USB drive, you can ignore steps 1 to 3 and start from step 4 of the installation instructions below.

DEC600和DEC2600系列（2.5GbE）使用鏡像文件，必須依照 [OPNsense 安裝說明](<55 初始安裝和配置.md#installation-media>)中的說明將其寫入USB驅動器。將說明中的 OPNsense 鏡像替換為BIOS鏡像，並將其寫入USB驅動器。準備好USB驅動器後，您可以忽略步驟 1 至 3，直接從下方安裝說明的步驟 4 開始。

<table>
<tr><th colspan="2"><strong>03-2024</strong>Version 2<br>版本 2</th></tr>
<tr><th>Download<br>下載</th><th>SHA256Checksum<br>校驗</th></tr>
<tr><td><a href="https://docs.opnsense.org/_downloads/4ed93e5d1e28d71a2f76120eeb619ab8/Coreboot_Deciso_A8V2.img.bz2"><code>Image<br>圖片</code></a></td><td>1f05ed6423dc45bf5c479a86e813ec2a87d73e77544eedd49f2343c5942d2218</td></tr>
<tr><td colspan="2">CPUFrequency corrections and minor bugfixes<br>頻率校正和一些小錯誤修復</td></tr>
</table>

## [**Installation instructions**](#id6)｜[**安裝說明**](#id6)

Updating the UEFI firmware requires writing a bootable image to a USB drive on a separate machine. Make sure you have an empty or unused USB drive before starting this procedure. Also make sure the USB drive is FAT32 formatted.

更新UEFI韌體需要將可啟動映像寫入另一台電腦上的USB驅動器。在開始此過程之前，請確保您有一個空的或未使用的USB驅動器。同時，請確保USB驅動器已FAT32格式化。

Warning

警告

As a general warning, following this procedure is at your own risk.

需要提醒的是，依照此方法操作風險自負。

**Step 1**

**第一步**

Download the latest BIOS archive file for your platform from the downloads section above.

從上面的下載部分下載適用於您平台的最新BIOS存檔檔案。

**Step 2**

**第二步**

Verify the SHA256 checksum.

驗證SHA256校驗和。

**Step 3**

**步驟 3**

Insert the USB drive into your computer and extract the archive to the USB drive. Make sure the file structure is as follows:

將USB驅動器插入電腦，並將壓縮包解壓到USB驅動器。請確保文件結構如下：

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

**步驟4**

Safely remove the USB drive from the computer and plug it into the appliance.

安全地從電腦中取出USB驅動器，然後將其插入裝置。

**Step 5**

**步驟5**

Connect to the appliance using a [Serial Console connectivity](<67 串行控制台連接.md#serial>) connection. Open a terminal to the relevant COM port.

使用 [序列控制台連接](<67 串行控制台連接.md#serial>)連接連接到設備。打開終端並連接到相關的COM埠。

**Step 6**

**步驟6**

Boot the appliance and enter the BIOS by pressing Escape. The current BIOS version (suffix) should show up. Make note of it so you can compare it to the new version to verify everything went well.

啟動設備，然後按 Esc 鍵輸入BIOS 。此時應該會顯示目前的BIOS版本（後綴）。記下該版本號，以便與新版本進行比較，驗證一切是否正常。

**Step 7**

**步驟7**

Go to Setup Utility –> AMD CBS –> FCH Common Options –> UART Configuration Options –> UART 0 Legacy Options. Make sure this setting is set to **Disabled**. This is explained in [Legacy UART vs. UEFI serial](<67 串行控制台連接.md#legacy-uart>).

前往設定實用程式 –> AMD CBS –> FCH 常用選項 –> UART 設定選項 –> UART 0 舊選項。確保此設定設定為 **停用**。這在[舊版UART與UEFI系列](<67 串行控制台連接.md#legacy-uart>)中進行了解釋。

Note

注意事項

Should your serial terminal highlight a BIOS option selection in such a way that it is unreadable, for the A20 appliance it’s the very first option in the UART Configuration Options menu screen.

如果您的序列終端突出顯示BIOS選項選擇，以至於無法讀取，則對於 A20 設備，它是UART配置選項選單畫面中的第一個選項。

**Step 8**

**步驟 8**

Select **Boot manager** and boot the USB drive. The UEFI shell will take over and execute the necessary BIOS update. If the update is complete, the machine will power off. **Do NOT do anything until the machine has shutdown.**

選擇 **啟動管理器**並啟動 USB 驅動器。 UEFI shell 將接管並執行必要的 BIOS 更新。如果更新完成，機器將關閉。**執行NOT 執行任何操作，直到機器關閉。 **

Note

注意事項

Should the USB drive not show up, something went wrong during writing. The newly created FAT32 partition should be the very first block on the drive. Inspect the drive on a different machine to check the layout.

如果USB分區未顯示，則表示寫入過程中出現問題。新建的FAT32分區應該是硬碟上的第一個區塊。請在另一台電腦上檢查該硬碟，確認其佈局。

**Step 9**

**步驟 9**

Reboot the machine and check the new BIOS version in either the boot log or the BIOS itself.

重新啟動機器，並在啟動日誌或BIOS本身中檢查新的BIOS版本。

## [**Hyper threading**](#id7)｜[**超線程**](#id7)

Selected models do support hyper threading, but as effectiveness depends on workload, we tend to disable it by default. If you do want to enable it when supported, enter the setup utility and search for the following menu item:

部分機型支援超執行緒技術，但由於其效能取決於工作負載，我們通常會預設為停用該功能。如果您希望在支援的機型上啟用超線程，請進入設定程式並尋找以下選單項目：

> AMD CBS -> Zen Common Options -> Core/Thread Enablement -> SMTEN
>
> AMD CBS -> Zen 通用選項 -> 核心/線程啟用 -> SMTEN

Select `Auto` here to enable the feature.

選擇`Auto`以啟用該功能。

## [**Microcode updates**](#id8)｜[**微程式碼更新**](#id8)

Microcode patches are distributed in our EFI firmware updates. If a Microcode update is required to address specific issues which are deemed important enough by AMD/Intel, you can install the microcode update yourself in a timely manner by using the [CPU Microcode updates \[AMD/Intel\]](<178 CPU微程式碼更新 [AMDIntel].md>) plugin.

微代碼補丁包含在我們的EFI韌體更新中。如果需要微程式碼更新來解決AMD /Intel 認為足夠重要的特定問題，您可以使用 [ CPU微程式碼更新 \[ AMD /Intel\]]( https://docs.opnsense.org/manual/cpu-microcode.html ) 外掛程式自行安裝微程式碼更新。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Serial Console connectivity｜串行控制台連接](<67 串行控制台連接.md>)　｜　[下一篇：SFP(+) Compatibility｜SFP (+) 相容性 ➡](<69 SFP (+) 相容性.md>)
