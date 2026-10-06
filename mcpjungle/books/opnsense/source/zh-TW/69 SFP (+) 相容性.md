---
title: "SFP (+) 相容性"
title_original: "SFP(+) Compatibility"
source: "https://docs.opnsense.org/hardware/sfp_compatibility.html"
chapter: ["Official hardware"]
order: 69
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:15.318Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：BIOS更新設定](<68 BIOS更新設定.md>)　｜　[下一篇：支援 ➡](<70 支援.md>)

# SFP (+) 相容性

> 章節：[Official hardware](<000 目錄.md#c-7>)

大多數 OPNsense® 設備都配備由AMD供電的 10 千兆SFP + 網籠，以實現靈活的連接。根據您的需求，可以使用不同的SFP (+) 收發器模組連接到不同類型的介質（例如銅纜或光纖）。

我們的企業和資料中心 OPNsense® 設備還可以配備由 Intel® ice 提供支援的 25 千兆級SFP28機箱。

下面您可以找到一些一般信息，以及經過測試並驗證可與 OPNsense® 設備配合使用的SFP (+)/ SFP28收發器模組列表。

提示

如果您在某個未在下方列出的 OPNsense® 裝置上使用SFP (+)/ SFP28模組，且該模組運作正常，請考慮向 [我們的文件](https://github.com/opnsense/docs)提交 Pull Request 以擴充清單。歡迎任何貢獻！

---

目錄

-   [**一般資訊**](#general-information)
    
-   [**Axgbe**](#axgbe)
    
    -   [1G 單模光纖](#g-single-mode-optical-fiber)
        
    -   [1G 多模光纖](#g-multi-mode-optical-fiber)
        
    -   [10G 單模光纖](#id1)
        
    -   [10G 多模光纖](#id2)
        
    -   [1G 銅RJ45](#g-copper-rj45)
        
    -   [10G 銅RJ45](#id3)
        
    -   [10G 直連](#g-direct-attach)
        
    -   [10G 主動光纜](#g-active-optical-cable)
        
-   [**ICE**](#ice)
    
    -   [25G 單模光纖](#id4)
        
    -   [25G 多模光纖](#id5)
        
    -   [25G 直連](#id6)
        

## [**一般資訊**](#id7)

市面上有許多收發器模組，它們通常是以下幾種類型之一：

-   銅RJ45
    

通常用於最大距離為 100 公尺的連接，而且價格相對便宜。

警告

與光纖或DAC模組相比， RJ45 SFP +模組（10GBASE-T）可在更高的工作溫度下運作。只有資料中心級OPNsense®設備才配備用於SFP +機櫃的被動散熱裝置。若環境溫度不超過50°C，則所有OPNsense®設備均可安全使用RJ45 SFP +模組。

-   單模光纖（ SMF ）
    

通常用於遠距離（100+公里）通信，通常與單工-LC或雙工-LC OS2跳線連接。它可能比多模光纖承載更多的頻寬，但使用SMF所需的設備通常比MMF更昂貴。

-   多模光纖（ MMF ）
    

多模光纖是SMF的替代方案（10Gb/s 時可達 550M），常用於建築物內的骨幹應用，通常與OM3雙工- LC跳線連接。

-   直連銅（ DAC ）
    

對於短距離（10公尺以內）應用，由於成本低、延遲低，通常是熱門選擇。

-   有源光纜（ AOC ）
    

它是一種替代DAC的方案，具有更低的延遲、更遠的傳輸距離、抗電磁幹擾( EMI )以及更小巧、更易於管理的線纜。與使用MMF跳線和網路介面模組相比，它是一種更經濟的選擇。

注意

大多數收發器模組都提供多種不同的程式選項，以相容於不同廠商的產品。除非另有說明，所有模組均預設採用通用/ MSA標準編程。

## [**Axgbe**](#id8)

注意事項

Axgbe 目前不支援 10 Mbit/s。

注意事項

使用SFP +模組時，請勿混合使用2.5 /5Gbps 和 10Gbps 鏈路速度，因為硬體不支援由於頻率不同而混合使用這些鏈路速度。

### [1G 單模光纖](#id9)

| 供應商 | 類型 | 速度 | 備註 |
| --- | --- | --- | --- |
| BeanField | 100BASE- BX0 -D53 | 100Mb | |
| FlexOptix | S.B1312.20. DL BiDi LX | 1G | 經測試，此模組額定傳輸距離為 20 公里，其他距離預計也能正常工作 |
| FlexOptix | S.B1312.10.D | 1G | 經測試，此模組額定傳輸距離為10公里，其他距離預計也能正常運作 |
| FS | SFP-FE-BX | 100Mb | |
| FS | SFP-GE-BX | 1G |  |
|米克羅蒂克 | S-53LC20D | 1G | |
| TP -連結 | 1000Base- BX WDM雙向 | 1G | |
|優比快 | UACC-OM-SM -1G-S | 1G | |

### [1G 多模光纖](#id10)

| 供應商 | 類型 | 速度 | 備註 |
| --- | --- | --- | --- |
| FlexOptix | S. 8512.02 .D | 1G | |

### [10G 單模光纖](#id11)

| 供應商 | 類型 | 速度 | 備註 |
| --- | --- | --- | --- |
| FlexOptix | P. 1396.10 SMF 1310nm 雙工- LC | 10G | 經測試，此模組額定傳輸距離為 10km，其他距離預計也能正常工作 |
| FlexOptix | P.B1696.10. DA + P.B1696.10. AD | 10G | 單工- LC 。需要兩個互補模組。 |
| FS | XGS-ONU-25-20NI | 10G | XGSPON |
| Zaram | ZXOS11NPI | 10G | XGSPON |
| Nokia | XS -010S-Q | 10G | XGSPON |

### [10G 多模光纖](#id12)

| 供應商 | 類型 | 速度 | 備註 |
| --- | --- | --- | --- |
| FlexOptix | P. 8596.02 MMF 850奈米 | 10G | |
| Cisco-Finisar | SFP -10G- SR | 10G | |
| FS | SFP-10GSR-85 | 10G |  |
| FS | SFP-10/25GR-85 | 10G |  |
| IBM -Finisar | FTLX8571D3BCL- IC | 10G | |
| 英特爾 | AFBR -709DMZ- IN2 | 10G | |
| Mellanox | MFM1T01A-SR | 10G | |
| Ubiquiti | UF-MM -10G | 10G | |
|優比快 | UACC-OM-MM -10G-D | 10G | |
| 正常運作時間 | UP-TR-SR-CI 10G | 10G | |

### [1G 銅RJ45](#id13)

| 供應商 | 類型 | 速度 | 備註 |
| --- | --- | --- | --- |
| FS | SFP-GB-GE -T | 10/100/1000Mb | |
| HP （阿魯巴）| 即時開機 | 1G | |
|米克羅蒂克 | S- RJ01 | 10/100/1000Mb | |
|星科技 | GLCTST | 1G | |
| Ubiquiti | UF-RJ45 -1G | 10/100/1000Mb | |

### [10G 銅RJ45](#id14)

| 供應商 | 類型 | 速度 | 備註 |
| --- | --- | --- | --- |
| FS | SFP-10G-T | 10G |  |
| 正常運轉時間 | UP-TR -10G- RJ45-CI | 1/ 2.5 /5/10G | 在 AXGBE 上始終以 10G 速度連接，最大速度由鏈路夥伴決定 |
| FlexOptix | T.C96.02. KMF | 1/ 2.5 /5/10G | 在 AXGBE 上始終以 10G 連接，最大速度由鏈路夥伴決定 |
| Ubiquiti | UACC-CM-RJ45-MG | 2.5 /5/10G | 在 AXGBE 網路上始終以 10G 速度連接，最大速度取決於鏈路夥伴。此模組與 1G 網路不相容。 |

### [10G 直連](#id15)

| 供應商 | 類型 | 速度 | 備註 |
| --- | --- | --- | --- |
| 阿魯巴 | SFP+ DAC | 10G | |
| 思科 | SFP-H10GB-CU1M | 10G | |
| FS | SFPP-PC02 | 10G |  |
| MikroTik | XS+DA0001 | 10G | 額定頻寬 1/10/25G，僅支援 10G 連線 |
| Netgear | AXC761 | 10G | |
|星泰科技| DACSFP10G1M | 10G | |
|優比快 | UniFi 1m DAC | 10G | |
| Ubiquiti | UACC-DAC-SFP10 | 10G | |

### [10G 主動光纜](#id16)

| 供應商 | 類型 | 速度 | 備註 |
| --- | --- | --- | --- |
| Cisco-Finisar | SFP -10G- AOC3M | 10G | |

## [**ICE**](#id17)

### [25G 單模光纖](#id18)

| 供應商 | 類型 | 速度 | 備註 |
| --- | --- | --- | --- |
| FlexOptix | P. B1625G .10. ADI | 25G | 經測試，此模組額定傳輸距離為 10 公里，其他距離預計也能正常運作 |

### [25G 多模光纖](#id19)

| 供應商 | 類型 | 速度 | 備註 |
| --- | --- | --- | --- |
| FlexOptix | P.8525G.01 | 25G | |
| FS | SFP28-25GSR-85 | 25G |  |
| 正常運作時間 | UP-SFP28-SR-CI | 25G | |

### [25G 直連](#id20)

| 供應商 | 類型 | 速度 | 備註 |
| --- | --- | --- | --- |
| FlexOptix | P. C3025G .H 被動 | 25G | |
| FS | SFP-H25G-CU1M | 25G | 相容英特爾 |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：BIOS更新設定](<68 BIOS更新設定.md>)　｜　[下一篇：支援 ➡](<70 支援.md>)
