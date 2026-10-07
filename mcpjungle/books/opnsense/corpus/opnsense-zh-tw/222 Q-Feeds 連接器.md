---
title: "Q-Feeds 連接器"
title_original: "Q-Feeds connector"
source: https://docs.opnsense.org/manual/qfeeds.html
chapter: ["Third-party Plugins","Q-Feeds Threat Intelligence"]
order: 222
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:32.806Z"
---

# Q-Feeds 連接器

## [Q-Feeds 連接器](#id1)

指數

-   [Q-Feeds 連接器](#q-feeds-connector)
    
    -   [引言](#introduction)
        
    -   [外部資源](#external-resources)
        
    -   [安裝](#installation)
        
    -   [啟用插件](#activate-the-plugin)
        
    -   [選單選項](#menu-options)
        
    -   [防火牆設定](#firewall-setup)
        
    -   [DNS /使用 Unbound 進行網域屏蔽](#dns-domain-blocking-using-unbound)
        
    -   [DNS /使用 DNSCrypt-Proxy 進行網域屏蔽](#dns-domain-blocking-using-dnscrypt-proxy)
        

## [引言](#id2)

在現今世界，保障網路安全至關重要。新一代防火牆 (NGFW) 是保護網路安全的必備工具。它們可以利用外部動態威脅指標清單（稱為入侵指標 (IoC)）過濾DNS和 Web 流量。

Q-Feeds 提供動態更新的 IoC 列表，專為與下一代防火牆 (NGFW) 等安全控制措施配合使用而設計。透過將 Q-Feeds 整合到 OPNsense 防火牆中，您可以增強網路抵禦新興威脅的能力。這意味著您的防火牆可以自動阻止有害流量，並持續更新最新的威脅資訊。

該插件支援兩種類型的清單：使用防火牆別名的 IP 清單和使用與 Unbound 黑名單或 DNSCrypt-Proxy 整合的網域清單。

本文檔說明如何在 OPNsense 防火牆上安裝和使用 Q-Feeds。

## [外部資源](#id3)

要使用 Q-Feeds，需要訂閱（免費或付費）。請造訪 [https://qfeeds.com/opnsense/](https://qfeeds.com/opnsense/)以了解更多資訊並註冊存取權限。您還可以在那裡找到不同服務之間的差異以及詳細的文件。

## [安裝](#id4)

安裝此外掛程式非常簡單，請前往“系統”‣“韌體”‣“插件”，搜尋**os-q-feeds-connector**，然後使用\[+\]按鈕進行安裝。

接下來，前往「安全性」‣「Q-Feeds Connect」設定服務。

## [啟用插件](#id5)

要啟動該插件，請前往「安全性」‣「Q-Feeds Connect」。此時將開啟 Q-Feeds 插件的設定頁面，並要求輸入API令牌。

您可以透過在我們的威脅情報入口網站（[https://tip.qfeeds.com](https://tip.qfeeds.com/) ）上註冊帳戶來取得此令牌。

註冊帳戶並登入後，在儀表板上您將找到**管理API金鑰**頁面。在此頁面上點擊**建立免費API金鑰**。

將API令牌複製到OPNsense設備上插件的設定頁面。點擊“應用”，插件將開始獲取威脅情報並建立防火牆別名。

## [選單選項](#id6)

您可以透過「安全性」‣「Q-Feeds Connect」中的一組標籤存取插件提供的（設定）選項。以下是它們的用途。

**環境**

訂閱配置

| **選項**|**描述** |
| --- | --- |
| **//常規設定** | |
| **API金鑰** | 存取Q-Feeds所需的API鑰。 |
| **註冊網域來源** | 在 Unbound DNS和 DNScrypt-proxy 黑名單中使用網域來源，需要啟用黑名單才能生效 |
| **//無限制黑名單設定** | |
| **允許網域清單** | 要允許的網域名稱（支援正規表示式），僅適用於黑名單符合項目 |
| **來源網絡** | 要套用策略的來源網絡，留空則表示全部應用 |
| **目標位址** | IP用於黑名單條目（預設0.0.0.0 ） |
| **返回NXDOMAIN** | 使用NXDOMAIN回應取代目標位址 |

**飼料**

顯示訂閱狀態。

| **字段**|**描述** |
| --- | --- |
| 描述 | 清單名稱 |
| 類型 | IP （防火牆規則），域（ DNS ，Unbound 或 DNSCrypt-Proxy） |
| 更新於 | 最後更新於（ISO 日期） |
| 下次更新 | 計劃於（iso 日期）再更新 |
| 已授權 | 已安裝此清單中有效的許可證 |

**活動**

當防火牆規則被傳送到日誌時，您可以收集防火牆表中各項發生的事件清單。

| **字段**|**描述** |
| --- | --- |
| 時間戳 | 事件發生的時間 |
| 介面 | 登入的介面 |
| 方向 | 此問題涉及的是進站（入境）還是出站（出城）交通？
| 來源 | 來源IP地址 |
| 目的地 | 目的地IP地址 |

## [防火牆設定](#id7)

若要封鎖源自或發送至清單中位址的流量，您需要設定防火牆規則。最簡單的方案是阻止來自`lan`且指向清單中項目的流量，或阻止源自清單中項目的、經由`wan`進入清單的流量。

來自LAN ：

|參數|價值|簡短描述 |
| --- | --- | --- |
| 操作 | `Block` | 靜默丟棄資料包 |
| 介面 | `LAN` | LAN介面上的流量 |
| TCP/IP版本 | `IPV4/IPV6` | 兩種協定皆受支援 |
| 方向 | `in` | 預設情況下，我們只過濾入站流量 |
| 目的地 | `__qfeeds_malware_ip` | QFeeds 提供惡意軟體位置 |
| 日誌記錄 | `checked` | 啟用日誌記錄後，您可以追蹤違規者 |

來自WAN ：

|參數|價值|簡短描述 |
| --- | --- | --- |
| 操作 | `Block` | 靜默丟棄資料包 |
| 介面 | `WAN` | LAN介面上的流量 |
| TCP/IP版本 | `IPV4/IPV6` | 兩種協定皆受支援 |
| 方向 | `in` | 預設情況下，我們只過濾入站流量 |
| 來源 | `__qfeeds_malware_ip` | QFeeds 提供惡意軟體位置 |
| 日誌記錄 | `checked` | 啟用日誌記錄後，您可以追蹤違規者 |

注意事項

僅提供上表中列出的非預設規則設定。有關使用防火牆規則和別名的更多信息，請參閱[防火牆](<130 防火牆.md>)部分。

## [DNS /使用 Unbound 進行網域屏蔽](#id8)

注意事項

若要使用基於DNS的日誌記錄，您需要將 Unbound 設定為主DNS伺服器。有關如何配置的更多信息，請參閱[此處](<199 未綁定DNS.md>)

在「安全性」‣「Q-Feeds Connect」中，確保啟用**「註冊網域來源」**並點選「套用」。對於舊版（< 25.7.9 ），也要確保在「服務」‣「Unbound」 DNS 「阻止清單」中啟用「Unbound封鎖清單」。

附加的 Unbound 黑名單選項：**允許網域**允許您將原本會被封鎖的網域新增至白名單（支援正規表示式）。**來源網路**將策略限制在特定的客戶端網絡，例如192.168.1.0/24 ；留空則表示所有客戶端。**目標位址**設定被阻止域回傳的IP （預設為0.0.0.0 ）。**返回NXDOMAIN **傳回一個不存在的網域回應，而不是重定向，這樣可以對客戶端隱藏黑名單行為。

您可以使用「報告」‣ Unbound DNS來深入了解所要求的網域。

## [DNS /使用 DNSCrypt-Proxy 進行網域屏蔽](#id9)

安裝 DNSCrypt-Proxy 外掛程式後，網域提要可用於 DNS 封鎖。在安全性‣ Q-Feeds Connect 中啟用**「註冊網域提要」**，然後在 DNSCrypt-Proxy 插件設定中選擇 Q-Feeds 封鎖清單以將其啟動。