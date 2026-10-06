---
title: "SFP(+) Compatibility｜SFP (+) 相容性"
title_original: "SFP(+) Compatibility"
source: "https://docs.opnsense.org/hardware/sfp_compatibility.html"
chapter: ["Official hardware"]
order: 69
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:15.318Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：BIOS updates settings｜BIOS更新設定](<68 BIOS更新設定.md>)　｜　[下一篇：Support｜支援 ➡](<70 支援.md>)

# SFP(+) Compatibility｜SFP (+) 相容性

> 章節：[Official hardware](<000 目錄.md#c-7>)

Most OPNsense® appliances feature 10 Gigabit SFP+ cages powered by AMD® axgbe to allow for flexible connectivity. Different SFP(+) transceiver modules can be used to connect to different types of media (e.g. copper or fiber) depending on your needs.

大多數 OPNsense® 設備都配備由AMD供電的 10 千兆SFP + 網籠，以實現靈活的連接。根據您的需求，可以使用不同的SFP (+) 收發器模組連接到不同類型的介質（例如銅纜或光纖）。

Our enterprise & datacenter OPNsense® appliances may also feature 25 Gigabit capable SFP28 cages powered by Intel® ice.

我們的企業和資料中心 OPNsense® 設備還可以配備由 Intel® ice 提供支援的 25 千兆級SFP28機箱。

Below you can find some general information as well as a list of tested SFP(+)/SFP28 transceiver modules that are verified to work with OPNsense® appliances.

下面您可以找到一些一般信息，以及經過測試並驗證可與 OPNsense® 設備配合使用的SFP (+)/ SFP28收發器模組列表。

Tip

提示

If you are using an SFP(+)/SFP28 module on one of the OPNsense® appliances that is not listed below but is working properly, consider submitting a Pull Request to [our documentation](https://github.com/opnsense/docs) to extend the list. Any contribution is welcome!

如果您在某個未在下方列出的 OPNsense® 裝置上使用SFP (+)/ SFP28模組，且該模組運作正常，請考慮向 [我們的文件](https://github.com/opnsense/docs)提交 Pull Request 以擴充清單。歡迎任何貢獻！

---

Table of Contents

目錄

-   [**General Information**](#general-information)  
    [**一般資訊**](#general-information)
    
-   [**Axgbe**](#axgbe)  
    [**Axgbe**](#axgbe)
    
    -   [1G Single-mode optical fiber](#g-single-mode-optical-fiber)  
        [1G 單模光纖](#g-single-mode-optical-fiber)
        
    -   [1G Multi-mode optical fiber](#g-multi-mode-optical-fiber)  
        [1G 多模光纖](#g-multi-mode-optical-fiber)
        
    -   [10G Single-mode optical fiber](#id1)  
        [10G 單模光纖](#id1)
        
    -   [10G Multi-mode optical fiber](#id2)  
        [10G 多模光纖](#id2)
        
    -   [1G Copper RJ45](#g-copper-rj45)  
        [1G 銅RJ45](#g-copper-rj45)
        
    -   [10G Copper RJ45](#id3)  
        [10G 銅RJ45](#id3)
        
    -   [10G Direct-Attach](#g-direct-attach)  
        [10G 直連](#g-direct-attach)
        
    -   [10G Active Optical Cable](#g-active-optical-cable)  
        [10G 主動光纜](#g-active-optical-cable)
        
-   [**ICE**](#ice)
    
    -   [25G Single-mode optical fiber](#id4)  
        [25G 單模光纖](#id4)
        
    -   [25G Multi-mode optical fiber](#id5)  
        [25G 多模光纖](#id5)
        
    -   [25G Direct-Attach](#id6)  
        [25G 直連](#id6)
        

## [**General Information**](#id7)｜[**一般資訊**](#id7)

There are a lot of transceiver modules available on the market and they are usually one of the following types:

市面上有許多收發器模組，它們通常是以下幾種類型之一：

-   Copper RJ45  
    銅RJ45
    

Often used for connectivity up to a distance of 100 meters maximum and are relatively inexpensive.

通常用於最大距離為 100 公尺的連接，而且價格相對便宜。

Warning

警告

RJ45 SFP+ modules (10GBASE-T) can run at high operating temperatures in comparison to Fiber or DAC modules. Only the datacenter level OPNsense® appliances are equipped with passive cooling for the SFP+ cages. If the ambient temperature does not exceed 50°C, RJ45 SFP+ modules can be used in all OPNsense® appliances without issue.

與光纖或DAC模組相比， RJ45 SFP +模組（10GBASE-T）可在更高的工作溫度下運作。只有資料中心級OPNsense®設備才配備用於SFP +機櫃的被動散熱裝置。若環境溫度不超過50°C，則所有OPNsense®設備均可安全使用RJ45 SFP +模組。

-   Single-mode optical fiber (SMF)  
    單模光纖（ SMF ）
    

Often used for communication across large distances (100+km) and usually connected with either Simplex-LC or Duplex-LC OS2 patch cords. It can potentially carry more bandwidth than Multi-mode fiber, but the equipment needed to use SMF is often more expensive in comparison to MMF.

通常用於遠距離（100+公里）通信，通常與單工-LC或雙工-LC OS2跳線連接。它可能比多模光纖承載更多的頻寬，但使用SMF所需的設備通常比MMF更昂貴。

-   Multi-mode optical fiber (MMF)  
    多模光纖（ MMF ）
    

Multi-mode fiber is the alternative for SMF (up to 550M for 10Gb/s), often used for backbone applications in buildings and usually connected with OM3 Duplex-LC patch cords.

多模光纖是SMF的替代方案（10Gb/s 時可達 550M），常用於建築物內的骨幹應用，通常與OM3雙工- LC跳線連接。

-   Direct-Attach Copper (DAC)  
    直連銅（ DAC ）
    

For short ranges (up to 10M), often a popular choice due to low cost and low latency.

對於短距離（10公尺以內）應用，由於成本低、延遲低，通常是熱門選擇。

-   Active Optical Cable (AOC)  
    有源光纜（ AOC ）
    

An alternative to DAC with lower latency, longer reach, electromagnetic interference (EMI) immunity and smaller, more manageable cable. An economical option compared to using MMF patch cable and network interface modules.

它是一種替代DAC的方案，具有更低的延遲、更遠的傳輸距離、抗電磁幹擾( EMI )以及更小巧、更易於管理的線纜。與使用MMF跳線和網路介面模組相比，它是一種更經濟的選擇。

Attention

注意

Most transceiver modules are available for purchase with a variety of different programming options for compatibility with different vendors. Unless specified otherwise, all modules are assumed to have the generic / MSA standard default programming.

大多數收發器模組都提供多種不同的程式選項，以相容於不同廠商的產品。除非另有說明，所有模組均預設採用通用/ MSA標準編程。

## [**Axgbe**](#id8)｜[**Axgbe**](#id8)

Note

注意事項

10 Mbit/s is currently not supported by Axgbe.

Axgbe 目前不支援 10 Mbit/s。

Note

注意事項

When using SFP+Modules, do not mix 2.5/5Gbps and 10Gbps link-speed as the hardware does not support mixing these due to different frequencies.

使用SFP +模組時，請勿混合使用2.5 /5Gbps 和 10Gbps 鏈路速度，因為硬體不支援由於頻率不同而混合使用這些鏈路速度。

### [1G Single-mode optical fiber](#id9)｜[1G 單模光纖](#id9)

| Vendor<br>供應商 | Type<br>類型 | Speed<br>速度 | Notes<br>備註 |
| --- | --- | --- | --- |
| BeanField | 100BASE-BX0-D53<br>100BASE- BX0 -D53 | 100Mb |  |
| FlexOptix | S.B1312.20.DL BiDi LX<br>S.B1312.20. DL BiDi LX | 1G | Tested module rated for 20km, other distances are assumed to function properly<br>經測試，此模組額定傳輸距離為 20 公里，其他距離預計也能正常工作 |
| FlexOptix | S.B1312.10.D | 1G | Tested module rated for 10km, other distances are assumed to function properly<br>經測試，此模組額定傳輸距離為10公里，其他距離預計也能正常運作 |
| FS | SFP-FE-BX | 100Mb |  |
| FS | SFP-GE-BX | 1G |  |
| MikroTik<br>米克羅蒂克 | S-53LC20D | 1G |  |
| TP-Link<br>TP -連結 | 1000Base-BX WDM Bi-Directional<br>1000Base- BX WDM雙向 | 1G |  |
| Ubiquiti<br>優比快 | UACC-OM-SM-1G-S<br>UACC-OM-SM -1G-S | 1G |  |

### [1G Multi-mode optical fiber](#id10)｜[1G 多模光纖](#id10)

| Vendor<br>供應商 | Type<br>類型 | Speed<br>速度 | Notes<br>備註 |
| --- | --- | --- | --- |
| FlexOptix | S.8512.02.D<br>S. 8512.02 .D | 1G |  |

### [10G Single-mode optical fiber](#id11)｜[10G 單模光纖](#id11)

| Vendor<br>供應商 | Type<br>類型 | Speed<br>速度 | Notes<br>備註 |
| --- | --- | --- | --- |
| FlexOptix | P.1396.10 SMF 1310nm Duplex-LC<br>P. 1396.10 SMF 1310nm 雙工- LC | 10G | Tested module rated for 10km, other distances are assumed to function properly<br>經測試，此模組額定傳輸距離為 10km，其他距離預計也能正常工作 |
| FlexOptix | P.B1696.10.DA + P.B1696.10.AD<br>P.B1696.10. DA + P.B1696.10. AD | 10G | Simplex-LC. Two complementary modules are needed.<br>單工- LC 。需要兩個互補模組。 |
| FS | XGS-ONU-25-20NI | 10G | XGSPON |
| Zaram | ZXOS11NPI | 10G | XGSPON |
| Nokia | XS-010S-Q<br>XS -010S-Q | 10G | XGSPON |

### [10G Multi-mode optical fiber](#id12)｜[10G 多模光纖](#id12)

| Vendor<br>供應商 | Type<br>類型 | Speed<br>速度 | Notes<br>備註 |
| --- | --- | --- | --- |
| FlexOptix | P.8596.02 MMF 850-nm<br>P. 8596.02 MMF 850奈米 | 10G |  |
| Cisco-Finisar | SFP-10G-SR<br>SFP -10G- SR | 10G |  |
| FS | SFP-10GSR-85 | 10G |  |
| FS | SFP-10/25GR-85 | 10G |  |
| IBM-Finisar<br>IBM -Finisar | FTLX8571D3BCL-IC<br>FTLX8571D3BCL- IC | 10G |  |
| Intel<br>英特爾 | AFBR-709DMZ-IN2<br>AFBR -709DMZ- IN2 | 10G |  |
| Mellanox | MFM1T01A-SR | 10G |  |
| Ubiquiti | UF-MM-10G<br>UF-MM -10G | 10G |  |
| Ubiquiti<br>優比快 | UACC-OM-MM-10G-D<br>UACC-OM-MM -10G-D | 10G |  |
| Uptimed<br>正常運作時間 | UP-TR-SR-CI 10G | 10G |  |

### [1G Copper RJ45](#id13)｜[1G 銅RJ45](#id13)

| Vendor<br>供應商 | Type<br>類型 | Speed<br>速度 | Notes<br>備註 |
| --- | --- | --- | --- |
| FS | SFP-GB-GE-T<br>SFP-GB-GE -T | 10/100/1000Mb |  |
| HP (Aruba)<br>HP （阿魯巴） | Instant On<br>即時開機 | 1G |  |
| MikroTik<br>米克羅蒂克 | S-RJ01<br>S- RJ01 | 10/100/1000Mb |  |
| StarTech<br>星科技 | GLCTST | 1G |  |
| Ubiquiti | UF-RJ45-1G<br>UF-RJ45 -1G | 10/100/1000Mb |  |

### [10G Copper RJ45](#id14)｜[10G 銅RJ45](#id14)

| Vendor<br>供應商 | Type<br>類型 | Speed<br>速度 | Notes<br>備註 |
| --- | --- | --- | --- |
| FS | SFP-10G-T | 10G |  |
| Uptimed<br>正常運轉時間 | UP-TR-10G-RJ45-CI<br>UP-TR -10G- RJ45-CI | 1/2.5/5/10G<br>1/ 2.5 /5/10G | Will always link at 10G on axgbe, maximum speed is determined by link partner<br>在 AXGBE 上始終以 10G 速度連接，最大速度由鏈路夥伴決定 |
| FlexOptix | T.C96.02.KMF<br>T.C96.02. KMF | 1/2.5/5/10G<br>1/ 2.5 /5/10G | Will always link at 10G on axgbe, maximum speed is determined by link partner<br>在 AXGBE 上始終以 10G 連接，最大速度由鏈路夥伴決定 |
| Ubiquiti | UACC-CM-RJ45-MG | 2.5/5/10G<br>2.5 /5/10G | Will always link at 10G on axgbe, maximum speed is determined by link partner. Module not compatible with 1G.<br>在 AXGBE 網路上始終以 10G 速度連接，最大速度取決於鏈路夥伴。此模組與 1G 網路不相容。 |

### [10G Direct-Attach](#id15)｜[10G 直連](#id15)

| Vendor<br>供應商 | Type<br>類型 | Speed<br>速度 | Notes<br>備註 |
| --- | --- | --- | --- |
| Aruba<br>阿魯巴 | SFP+ DAC | 10G |  |
| Cisco<br>思科 | SFP-H10GB-CU1M | 10G |  |
| FS | SFPP-PC02 | 10G |  |
| MikroTik | XS+DA0001 | 10G | Rated for 1/10/25G, only links on 10G<br>額定頻寬 1/10/25G，僅支援 10G 連線 |
| Netgear | AXC761 | 10G |  |
| Startech<br>星泰科技 | DACSFP10G1M | 10G |  |
| Ubiquiti<br>優比快 | UniFi 1m DAC | 10G |  |
| Ubiquiti | UACC-DAC-SFP10 | 10G |  |

### [10G Active Optical Cable](#id16)｜[10G 主動光纜](#id16)

| Vendor<br>供應商 | Type<br>類型 | Speed<br>速度 | Notes<br>備註 |
| --- | --- | --- | --- |
| Cisco-Finisar | SFP-10G-AOC3M<br>SFP -10G- AOC3M | 10G |  |

## [**ICE**](#id17)

### [25G Single-mode optical fiber](#id18)｜[25G 單模光纖](#id18)

| Vendor<br>供應商 | Type<br>類型 | Speed<br>速度 | Notes<br>備註 |
| --- | --- | --- | --- |
| FlexOptix | P.B1625G.10.ADI<br>P. B1625G .10. ADI | 25G | Tested module rated for 10km, other distances are assumed to function properly<br>經測試，此模組額定傳輸距離為 10 公里，其他距離預計也能正常運作 |

### [25G Multi-mode optical fiber](#id19)｜[25G 多模光纖](#id19)

| Vendor<br>供應商 | Type<br>類型 | Speed<br>速度 | Notes<br>備註 |
| --- | --- | --- | --- |
| FlexOptix | P.8525G.01 | 25G |  |
| FS | SFP28-25GSR-85 | 25G |  |
| Uptimed<br>正常運作時間 | UP-SFP28-SR-CI | 25G |  |

### [25G Direct-Attach](#id20)｜[25G 直連](#id20)

| Vendor<br>供應商 | Type<br>類型 | Speed<br>速度 | Notes<br>備註 |
| --- | --- | --- | --- |
| FlexOptix | P.C3025G.H Passive<br>P. C3025G .H 被動 | 25G |  |
| FS | SFP-H25G-CU1M | 25G | With Intel compatibility<br>相容英特爾 |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：BIOS updates settings｜BIOS更新設定](<68 BIOS更新設定.md>)　｜　[下一篇：Support｜支援 ➡](<70 支援.md>)
