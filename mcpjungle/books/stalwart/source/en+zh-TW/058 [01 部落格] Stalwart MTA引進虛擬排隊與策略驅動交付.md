---

## title: "Introducing Virtual Queues and Strategy-Driven Delivery in Stalwart MTA｜Stalwart MTA引進虛擬排隊與策略驅動交付"

 title\_original: "Introducing Virtual Queues and Strategy-Driven Delivery in Stalwart MTA"
source: "[https://stalw.art/blog/virtual-queues](https://stalw.art/blog/virtual-queues)"
chapter: \["blog"\]
order: 58
lang: "bilingual"
translated\_by: "google\_v2+gtx"
captured: "2026-10-05T01:03:51.230Z"

 ⬆ 目錄　｜　⬅ 上一篇：Diagnose and Resolve Email Issues Faster｜更快診斷和解決電子郵件問題　｜　下一篇：Introducing Webhooks and MTA Hooks｜介紹 Webhook 和MTA Hooks ➡

# Introducing Virtual Queues and Strategy-Driven Delivery in Stalwart MTA｜Stalwart MTA引進虛擬排隊與策略驅動交付

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

Jul 15, 2025 - 4 min read

 2025年7月15日 - 閱讀時間：4分鐘

 \[![Mauro D.](assets/selected_367_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

## Smarter Queueing with Virtual Queues｜利用虛擬隊列實現更智慧的排隊

 To solve this, we’ve introduced virtual queues—a powerful feature that allows administrators to define **separate, independently managed delivery queues** for different categories of mail.

 為了解決這個問題，我們引入了虛擬隊列一項強大的功能，允許管理員為不同類別的郵件定義**單獨的、獨立管理的投遞隊列**。

 Each virtual queue operates with its own set of **delivery threads, giving you control over how system resources are allocated. Messages can now be segmented by**message type**,**source**,**priority**,**recipient domain, or any other attribute, and assigned to different queues with tailored delivery policies.

 每個虛擬佇列都使用自己的一組**傳遞執行緒**運行，使您可以控制系統資源的分配方式。現在可以按**訊息類型、**來源**、**優先權**、**收件人網域或任何其他屬性對訊息進行分段，並將其指派到具有自訂傳遞策略的不同佇列中。

 For example, you can isolate system-generated messages such as DSNs or reports into low-concurrency queues, while prioritizing user-facing transactional mail in high-capacity queues—ensuring the latter is never blocked or delayed by the former.

 例如，您可以將系統產生的訊息（例如 DSN 或報告）隔離到低並發佇列中，同時優先處理面向使用者的交易郵件，並將其放入高容量佇列中－確保後者永遠不會被前者阻塞或延遲。

## Strategy-Driven Delivery｜戰略驅動型交付

 At the core of this system is a strategy-based architecture that governs how messages are handled from the moment they’re queued to the point of delivery. These strategies are dynamically evaluated per recipient and control four key aspects of delivery:

 這個系統的核心是一個基於策略的架構\([https://stalw.art/docs/mta/outbound/strategy](https://stalw.art/docs/mta/outbound/strategy)\) ，它控制著訊息從排隊到最終送達的整個處理過程。這些策略會根據每個接收者動態評估，並控制訊息送達的四個關鍵面向：

- **Scheduling Strategy**: Determines which virtual queue to use, how frequently to retry failed deliveries, when to notify the sender of delays, and when to give up and bounce a message.
**調度策略**：決定使用哪個虛擬佇列、重試失敗投遞的頻率、何時通知寄件者延遲情況以及何時放棄並退回訊息。
- **Routing Strategy**: Controls whether a message should be delivered locally, via MX resolution, or relayed through a smart host.
**路由策略**：控制訊息是應該在本地傳遞、透過MX解析傳遞，還是透過智慧主機轉送。
- **Connection Strategy**: Defines connection parameters such as the source IP address, EHLO hostname, and SMTP timeouts.
**連接策略**：定義連接參數，例如來源位址IP 、主機名稱EHLO和逾時時間SMTP 。
- **TLS Strategy**: Enforces transport-layer security policies, including STARTTLS behavior and support for MTA-STS and DANE.
**TLS策略**：強制執行傳輸層安全策略，包括STARTTLS行為以及對MTA-STS和DANE支援。
All of these strategies are defined through **expressions** that can evaluate runtime variables like the sender, recipient, message size, source classification, and more. This enables extremely granular control over delivery logic, with different strategies dynamically assigned to different recipients within the same message.
 所有這些策略都是透過**表達式**定義的，這些表達式可以評估執行時間變量，例如寄件者、收件者、訊息大小、來源分類等等。這使得對傳遞邏輯進行極其精細的控製成為可能，可以在同一則訊息中為不同的收件者動態分配不同的策略。

 With this enhancement, Stalwart now gives you the tools to build highly customized delivery workflows. You can throttle or isolate problematic traffic, prioritize VIP clients, set domain-specific retry policies, and fine-tune your system for performance, reliability, and security—all with a simple and transparent configuration model.

 透過這項增強功能，Stalwart 現在為您提供了建構高度客製化交付工作流程的工具。您可以限製或隔離問題流量、優先處理VIP客戶端、設定特定網域的重試策略，並針對效能、可靠性和安全性對系統進行微調—所有這些都可透過簡單透明的設定模型實現。

## MTA Hooks: Moving Toward Standardization｜MTA鉤子：邁向標準化

 For those not already familiar, MTA Hooks is a modern alternative to the legacy Milter protocol originally developed for Sendmail. Milter has long served as a way to inspect, modify, or reject messages during the SMTP transaction, but its binary format and low-level implementation have made it difficult to work with and integrate into modern systems.

 對於還不熟悉的人來說，MTA Hooks是傳統 Milter協議的現代替代方案，後者最初是為 Sendmail 開發的。 Milter 長期以來一直用於在SMTP事務期間檢查、修改或拒絕訊息，但其二進位格式和底層實作使其難以與現代系統相容和整合。

**MTA Hooks, introduced by**Stalwart Labs**some years ago, was designed to solve these problems with a cleaner, more accessible approach. Instead of relying on obscure binary protocols, MTA Hooks uses**HTTP**and a**human-readable JSON schema, making it easy for administrators and developers to write filters in any language, debug behavior transparently, and integrate with modern infrastructure.

**MTA Hooks**由**Stalwart Labs**於幾年前推出，旨在以更簡潔、更易用的方式解決這些問題MTA Hooks 不依賴晦澀的二進制協議，而是使用**HTTP**和**易於理解的JSON schema**，這使得管理員和開發人員能夠輕鬆地使用任何語言編寫過濾器，透明地調試行為，並與現代基礎架構集成。

 Using MTA Hooks, it’s possible to **intercept, inspect, and alter** any part of the SMTP transaction—whether that’s rejecting mail during `RCPT TO`, modifying headers after `DATA`, or applying policy logic during message queuing. Many users are already using MTA Hooks in production for a wide range of use cases, from spam filtering and data leak prevention to routing logic and outbound content policy enforcement.

 使用MTA Hooks，可以**攔截、檢查和修改** SMTP事務的任何部分－無論是`RCPT TO`期間拒絕郵件、 `DATA`之後修改郵件頭，還是在郵件排隊期間應用策略邏輯。許多用戶已經在生產環境中使用MTA Hooks，用於各種用例，從垃圾郵件過濾和資料外洩防護到路由邏輯和出站內容策略執行。

 Now, we’re excited to share that **Stalwart Labs will begin the process of standardizing MTA Hooks** with the broader email community.

 現在，我們很高興地告訴大家，**Stalwart Labs 將開始與更廣泛的電子郵件社區一起標準化 MTA Hooks** 。

 We’ll be presenting the protocol at [IETF 123](https://www.ietf.org/meeting/123/) in **Madrid**, where we plan to engage with the [mailmaint working group](https://datatracker.ietf.org/wg/mailmaint/about/) to start formal discussions around standardization. Our goal is to make MTA Hooks an open, community-driven specification—so it can serve as a modern, interoperable alternative to Milter for the entire mail ecosystem.

 我們將在**馬德里**的 [IETF 123](https://www.ietf.org/meeting/123/) 上展示該協議，我們計劃在那裡與 [mailmaint 工作組](https://datatracker.ietf.org/wg/mailmaint/about/) 合作，開始圍繞標準化進行正式討論。我們的目標是使 MTA Hooks 成為一個開放的、社區驅動的規範，這樣它就可以作為整個郵件生態系統的 Milter 的現代、可互通的替代方案。

 If you’re attending IETF 123 and would like to connect with us about this effort, we welcome your input. Please reach out through any of our official channels or come speak with us during the event. Whether you’re an MTA developer, operator, or interested party, we’d love to hear your perspective.

 如果您將參加IETF 123 大會，並希望就此項目與我們交流，我們非常歡迎您的意見。請透過我們的官方管道聯絡我們，或在大會期間與我們直接溝通。無論您是MTA開發者、營運者或其他相關人士，我們都期待聆聽您的見解。

## Looking Ahead｜展望未來

 Stalwart is evolving rapidly, and this release represents a major step forward in performance, flexibility, and modern protocol design. As always, we’re grateful to our community for your feedback and support. We look forward to seeing what you build with these new capabilities.

 Stalwart 正在快速發展，此次版本發佈在效能、靈活性和現代協議設計方面都取得了重大進展。一如既往，我們感謝社群的回饋和支持。我們期待看到您利用這些新功能建構出怎樣的作品。

 Stay tuned for more updates—and see you in Madrid\!

 請關注後續更新—馬德里見！

**Tags:**

**標籤：**

- [mta](https://stalw.art/blog/tags/mta/)
[mta](https://stalw.art/blog/tags/mta/)
- [smtp](https://stalw.art/blog/tags/smtp/)
[smtp](https://stalw.art/blog/tags/smtp/)
- [queue](https://stalw.art/blog/tags/queue/)
[隊列](https://stalw.art/blog/tags/queue/)
- [mta-hooks](https://stalw.art/blog/tags/mta-hooks/)
[mta-hooks](https://stalw.art/blog/tags/mta-hooks/)
- [ietf123](https://stalw.art/blog/tags/ietf123/)
[ietf123](https://stalw.art/blog/tags/ietf123/)
- [stalwart](https://stalw.art/blog/tags/stalwart/)
[堅韌不拔](https://stalw.art/blog/tags/stalwart/)
Stalwart Joins GitHub's Open Source Secure Fund
 Stalwart 加入 GitHub 開源安全基金

 The Future of Stalwart: Webmail, Roadmap, and Beyond

 Stalwart 的未來：Webmail、路線圖及其他

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Diagnose and Resolve Email Issues Faster｜更快診斷和解決電子郵件問題　｜　下一篇：Introducing Webhooks and MTA Hooks｜介紹 Webhook 和MTA Hooks ➡
