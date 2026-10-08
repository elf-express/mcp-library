---

## title: "Introducing Webhooks and MTA Hooks｜介紹 Webhook 和MTA Hooks"

 title\_original: "Introducing Webhooks and MTA Hooks"
source: "[https://stalw.art/blog/webhooks](https://stalw.art/blog/webhooks)"
chapter: \["blog"\]
order: 59
lang: "bilingual"
translated\_by: "google\_v2+gtx"
captured: "2026-10-05T01:03:53.231Z"

 ⬆ 目錄　｜　⬅ 上一篇：Introducing Virtual Queues and Strategy-Driven Delivery in Stalwart MTA｜Stalwart MTA引進虛擬排隊與策略驅動交付　｜　下一篇：Collaboration,｜合作， ➡

# Introducing Webhooks and MTA Hooks｜介紹 Webhook 和MTA Hooks

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

Jun 22, 2024 - 3 min read

 2024年6月22日 - 閱讀時間：3分鐘

 \[![Mauro D.](assets/selected_368_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

### Webhooks: Real-Time Notifications for Your Email System｜Webhooks：電子郵件系統的即時通知

 Webhooks provide a modern way to receive real-time notifications about various events in your email system. By setting up HTTP callbacks, you can automatically trigger actions or receive alerts when specific events occur. This feature is invaluable for maintaining the health and security of your email operations.

 Webhook 提供了一種現代化的方式，讓您可以即時接收電子郵件系統中各種事件的通知。透過設定HTTP回調，您可以設定特定事件發生時自動觸發操作或接收警報。此功能對於維護電子郵件系統的健康和安全至關重要。

 With Stalwart Mail Server’s Webhooks, you can be notified about a range of events, including:

 透過 Stalwart Mail Server 的 Webhook 功能，您可以接收一系列事件的通知，包括：

- **Message Receipt and Delivery**: Stay informed when emails are received by or delivered from your server, allowing you to track email flow in real-time.
**郵件接收和發送**：隨時了解您的伺服器何時接收或發送電子郵件，以便您即時追蹤電子郵件流。
- **User Authentication**: Receive alerts for successful logins, authentication failures, or attempts by banned users, helping you monitor and secure user access.
**使用者驗證**：接收成功登入、驗證失敗或被禁止使用者嘗試登入的警報，幫助您監控和保護使用者存取。
- **Account Quota Management**: Get notified when an account exceeds its quota, enabling proactive management of storage limits and user activities.
**帳戶配額管理**：當帳戶超出其配額時收到通知，從而能夠主動管理儲存限制和使用者活動。
- **DMARC and TLS Reports**: Keep track of email security by receiving notifications for incoming DMARC reports and TLS reports, ensuring you stay updated on your email authentication status.
**DMARC和TLS報告**：透過接收傳入的DMARC報告和TLS報告的通知來追蹤電子郵件安全，確保您隨時了解您的電子郵件驗證狀態。
By leveraging Webhooks, you can enhance the automation and responsiveness of your email infrastructure, making it easier to manage and monitor various aspects of email activity and security.
 透過利用 Webhooks，您可以增強電子郵件基礎架構的自動化和回應能力，從而更容易管理和監控電子郵件活動和安全性的各個方面。

### MTA Hooks: A Modern Replacement for Milter｜MTA鉤子：Milter 的現代替代品

 Stalwart Mail Server version 0.8.2 also introduces MTA Hooks, an exciting new protocol developed by Stalwart Labs to replace the traditional milter protocol. MTA Hooks offers a more flexible and straightforward way to handle email processing at various stages of the SMTP transaction.

 Stalwart Mail Server版本0.8.2還引入了MTA Hooks，這是由Stalwart Labs開發的令人興奮的新協議，用於取代傳統的milter協議。 MTA Hooks 提供了一種更靈活、更直接的方式來處理SMTP 交易各個階段的電子郵件處理。

#### What are MTA Hooks?｜什麼是MTA鉤子？

 MTA Hooks is an HTTP-based protocol that uses POST requests to submit a JSON payload containing details about the SMTP transaction. It supports comprehensive coverage of SMTP stages, from the initial connection to final message delivery. By using JSON, MTA Hooks provides a clear and human-readable format, making it easier to implement and debug.

 MTA Hooks 是一個基於HTTP協議，它使用POST請求來提交包含JSON SMTP詳細資訊的有效負載。它支援從初始連接到最終訊息傳遞的SMTP階段的全面覆蓋。透過使用JSON, MTA Hooks，它提供了一種清晰易讀的格式，使實現和調試更加容易。

#### Benefits of MTA Hooks｜MTA鉤子的優點

- **Enhanced Flexibility**: MTA Hooks can be invoked at any stage of the SMTP transaction, allowing for precise control over email processing.
**增強的靈活性**： MTA鉤子可以在SMTP事務的任何階段調用，從而可以精確控制電子郵件處理。
- **Ease of Integration**: Using standard HTTP and JSON makes it simpler to integrate MTA Hooks into your existing infrastructure.
**易於整合**：使用標準的HTTP和JSON ，可以更輕鬆地將MTA Hooks整合到您現有的基礎架構中。
- **Real-Time Processing**: MTA Hooks enables real-time processing and modification of email transactions, ensuring immediate response to critical events.
**即時處理**： MTA Hooks 可實現電子郵件事務的即時處理和修改，確保對關鍵事件做出即時回應。
#### Standardization Efforts｜標準化工作

 Stalwart Labs is actively working to have MTA Hooks standardized as an IETF RFC, aiming to establish it as a new industry standard for email processing. This effort underscores our commitment to innovation and leadership in the email infrastructure space.

 Stalwart Labs 正積極致力於將MTA Hooks 標準化為IETF RFC ，旨在將其打造為電子郵件處理領域的新行業標準。此舉彰顯了我們對電子郵件基礎設施領域創新和領導地位的承諾。

### Looking Ahead｜展望未來

 We invite you to upgrade to Stalwart Mail Server version 0.8.2 and experience the benefits of Webhooks and MTA Hooks. These new features are designed to provide you with greater control, automation, and real-time capabilities, making your email infrastructure more robust and responsive.

 我們誠摯邀請您升級至 Stalwart Mail Server 版本0.8.2 ，體驗 Webhook 和MTA Hooks 的強大功能。這些新功能旨在為您提供更強大的控制、自動化和即時功能，讓您的電子郵件基礎架構更加穩健且有效率。

**Tags:**

**標籤：**

- [webhook](https://stalw.art/blog/tags/webhook/)
[webhook](https://stalw.art/blog/tags/webhook/)
- [mtahook](https://stalw.art/blog/tags/mtahook/)
[mtahook](https://stalw.art/blog/tags/mtahook/)
- [milter](https://stalw.art/blog/tags/milter/)
[milter](https://stalw.art/blog/tags/milter/)
- [mail](https://stalw.art/blog/tags/mail/)
[郵件](https://stalw.art/blog/tags/mail/)
- [server](https://stalw.art/blog/tags/server/)
[伺服器](https://stalw.art/blog/tags/server/)
Enhanced E-mail Security with Two-Factor Authentication
 透過雙重認證增強電子郵件安全性

 Stalwart Unaffected by OOM Exploit Affecting Cyrus IMAP

 堅韌不拔不受OOM漏洞影響，但賽勒斯IMAP受到影響

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Introducing Virtual Queues and Strategy-Driven Delivery in Stalwart MTA｜Stalwart MTA引進虛擬排隊與策略驅動交付　｜　下一篇：Collaboration,｜合作， ➡
