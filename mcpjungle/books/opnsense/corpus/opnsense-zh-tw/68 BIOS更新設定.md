---
title: "BIOS更新設定"
title_original: "BIOS updates settings"
source: https://docs.opnsense.org/hardware/bios.html
chapter: ["Official hardware"]
order: 68
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:14.312Z"
---

# BIOS更新設定

## BIOS更新/設定

本頁面專門提供 Deciso 裝置的最新BIOS更新下載，以及如何安裝它們的通用說明。

---

目錄

-   [**產品系列**](#product-families)
    
    -   [DEC4200系列](#dec4200-series)
        
    -   [DEC800, DEC3800 & DEC4000系列](#dec800-dec3800-dec4000-series)
        
    -   [DEC700和DEC2700系列](#dec700-and-dec2700-series)
        
    -   [DEC600和DEC2600 2.5GbE 系列](#dec600-and-dec2600-2-5gbe-series)
        
-   [**安裝說明**](#installation-instructions)
    
-   [**超線程**](#hyper-threading)
    
-   [**微程式碼更新**](#microcode-updates)
    

## [**產品系列**](#id1)

### [DEC4200系列](#id2)

<table>
<tr><th colspan="2"><strong> 08-2025 </strong>版本 26 </th></tr>
<tr><th>下載</th><th>SHA256校驗</th></tr>
<tr><td><a href="https://docs.opnsense.org/_downloads/e36311a4b499d5c6d2927bb8b9c084c6/A30_v26_bios.tar.gz"><code>存檔</code></a></td><td>b6833fc82902b67b1d5636f3df940f8a4d45cc157609c37d79139c3bc83325b3</td></tr>
<tr><td colspan="2">CVE更新和效能錯誤修復，導致流量吞吐量緩慢</td></tr>
</table>

### [DEC800, DEC3800 & DEC4000系列](#id3)

<table>
<tr><th colspan="2"><strong> 09-2026 </strong>版本05.22.01.0029 .0020 </th></tr>
<tr><th>下載</th><th>SHA256校驗</th></tr>
<tr><td><a href="https://docs.opnsense.org/_downloads/d328e53025e7f7ea079bdbe58af1f3e5/A20_05.22.01.0029.0020_bios.tar.gz"><code>存檔</code></a></td><td>71da143d1cdc311e9a28f04a3d8e42995d9381c8bc7577dd56c628092c2d4bfe</td></tr>
</table>

### [DEC700和DEC2700系列](#id4)

<table>
<tr><th colspan="2"><strong> 09-2026 </strong>版本 05.3A。 17.0031-A10.37</th></tr>
<tr><th>下載</th><th>SHA256校驗</th></tr>
<tr><td><a href="https://docs.opnsense.org/_downloads/23e853d96108bde669e0bafca81a0583/A10_05.3A.17.0031-A10.37_bios.tar.gz"><code>存檔</code></a></td><td>55efb8da1d9916d8215c6450f3823c9040f50722f5cc91e2e9ac6ef94880f9d7</td></tr>
</table>

### [DEC600和DEC2600 2.5GbE 系列](#id5)

警告

此韌體僅適用於 A8 版本 2 主機板的DEC600和DEC2600 2.5千兆系列。請勿將此韌體安裝在僅支援 1 千兆乙太網路的舊款DEC600/DEC2600裝置上。

注意

DEC600和DEC2600系列（2.5GbE）使用鏡像文件，必須依照 [OPNsense 安裝說明](<55 初始安裝和配置.md#installation-media>)中的說明將其寫入USB驅動器。將說明中的 OPNsense 鏡像替換為BIOS鏡像，並將其寫入USB驅動器。準備好USB驅動器後，您可以忽略步驟 1 至 3，直接從下方安裝說明的步驟 4 開始。

<table>
<tr><th colspan="2"><strong> 03-2024 </strong>版本 2 </th></tr>
<tr><th>下載</th><th>SHA256校驗</th></tr>
<tr><td><a href="https://docs.opnsense.org/_downloads/4ed93e5d1e28d71a2f76120eeb619ab8/Coreboot_Deciso_A8V2.img.bz2"><code>圖片</code></a></td><td>1f05ed6423dc45bf5c479a86e813ec2a87d73e77544eedd49f2343c5942d2218</td></tr>
<tr><td colspan="2">CPU頻率校正和一些小錯誤修復</td></tr>
</table>

## [**安裝說明**](#id6)

更新UEFI韌體需要將可啟動映像寫入另一台電腦上的USB驅動器。在開始此過程之前，請確保您有一個空的或未使用的USB驅動器。同時，請確保USB驅動器已FAT32格式化。

警告

需要提醒的是，依照此方法操作風險自負。

**第一步**

從上面的下載部分下載適用於您平台的最新BIOS存檔檔案。

**第二步**

驗證SHA256校驗和。

**步驟 3**

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

**步驟4**

安全地從電腦中取出USB驅動器，然後將其插入裝置。

**步驟5**

使用 [序列控制台連接](<67 串行控制台連接.md#serial>)連接連接到設備。打開終端並連接到相關的COM埠。

**步驟6**

啟動設備，然後按 Esc 鍵輸入BIOS 。此時應該會顯示目前的BIOS版本（後綴）。記下該版本號，以便與新版本進行比較，驗證一切是否正常。

**步驟7**

前往設定實用程式 –> AMD CBS –> FCH 常用選項 –> UART 設定選項 –> UART 0 舊選項。確保此設定設定為 **停用**。這在[舊版UART與UEFI系列](<67 串行控制台連接.md#legacy-uart>)中進行了解釋。

注意事項

如果您的序列終端突出顯示BIOS選項選擇，以至於無法讀取，則對於 A20 設備，它是UART配置選項選單畫面中的第一個選項。

**步驟 8**

選擇 **啟動管理器**並啟動 USB 驅動器。 UEFI shell 將接管並執行必要的 BIOS 更新。如果更新完成，機器將關閉。**執行NOT 執行任何操作，直到機器關閉。 **

注意事項

如果USB分區未顯示，則表示寫入過程中出現問題。新建的FAT32分區應該是硬碟上的第一個區塊。請在另一台電腦上檢查該硬碟，確認其佈局。

**步驟 9**

重新啟動機器，並在啟動日誌或BIOS本身中檢查新的BIOS版本。

## [**超線程**](#id7)

部分機型支援超執行緒技術，但由於其效能取決於工作負載，我們通常會預設為停用該功能。如果您希望在支援的機型上啟用超線程，請進入設定程式並尋找以下選單項目：

> AMD CBS -> Zen 通用選項 -> 核心/線程啟用 -> SMTEN

選擇`Auto`以啟用該功能。

## [**微程式碼更新**](#id8)

微代碼補丁包含在我們的EFI韌體更新中。如果需要微程式碼更新來解決AMD /Intel 認為足夠重要的特定問題，您可以使用 [ CPU微程式碼更新 \[ AMD /Intel\]]( https://docs.opnsense.org/manual/cpu-microcode.html ) 外掛程式自行安裝微程式碼更新。