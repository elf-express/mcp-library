---

## title: "Goodbye SSH Discover Stalwart's Web-Based Admin Interface｜再見SSH探索 Stalwart 的基於 Web 的管理介面"

 title\_original: "Goodbye SSH Discover Stalwart's Web-Based Admin Interface"
source: "[https://stalw.art/blog/stalwart-webadmin](https://stalw.art/blog/stalwart-webadmin)"
chapter: \["blog"\]
order: 54
lang: "bilingual"
translated\_by: "google\_v2"
captured: "2026-10-05T01:03:43.220Z"

 ⬆ 目錄　｜　⬅ 上一篇：Stalwart v0.16 A New Foundation｜Stalwart v0.16新基金會　｜　下一篇：Elevating Performance and Flexibility｜提升效能和靈活性 ➡

# Goodbye SSH Discover Stalwart's Web-Based Admin Interface｜再見SSH探索 Stalwart 的基於 Web 的管理介面

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

## Goodbye SSH: Discover Stalwart's Web-Based Admin Interface｜再見SSH ：探索 Stalwart 的基於 Web 的管理介面

 Apr 9, 2024 - 3 min read

 2024年4月9日 - 閱讀時間：3分鐘

 \[![Mauro D.](assets/selected_363_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

### Introducing Web-Based Administration｜引入基於 Web 的管理

![Setup screencast](assets/selected_363_image_002.gif)

 At the heart of version `0.7.0` is the introduction of a new, web-based administration tool. Developed in Rust, this single-page application \(SPA\) represents a monumental shift in how you interact with Stalwart Mail Server. Gone are the days of relying on SSH connections or command-line interfaces for routine administration tasks. Now, every aspect of your mail server can be managed from the convenience of a web browser.

`0.7.0`版本的核心在於引進了全新的基於 Web 的管理工具。這款單頁應用程式 \( SPA \) 使用 Rust 開發，它標誌著您與 Stalwart 郵件伺服器互動方式的重大變革。過去那種依賴SSH連接或命令列介面進行日常管理的日子已經一去不復返了。現在，您可以透過便利的 Web 瀏覽器管理郵件伺服器的各個方面。

 The new web administration tool is designed to streamline and simplify the management of your mail server, offering a wide array of features:

 這款全新的網路管理工具旨在簡化和最佳化您的郵件伺服器管理，並提供一系列豐富的功能：

- **Complete Control Over Accounts and Domains**: Easily manage user accounts, domains, groups, and mailing lists, all from a user-friendly interface.
**完全掌控帳戶和網域**：透過使用者友善的介面輕鬆管理使用者帳戶、網域、群組和郵件清單。
- **Advanced Queue Management**: Monitor and manage your SMTP queues with ease, including messages and outbound DMARC and TLS reports, ensuring timely delivery and compliance.
**進階隊列管理**：輕鬆監控和管理您的SMTP隊列，包括訊息和出站DMARC和TLS報告，確保及時交付和合規性。
- **Insightful Report Visualization**: Gain valuable insights into your email security with a dedicated interface for visualizing received DMARC, TLS-RPT, and Failure \(ARF\) reports.
**深入的報告視覺化**：透過專門的介面視覺化收到的DMARC, TLS-RPT和失敗（ ARF ）報告，深入了解您的電子郵件安全。
- **Full Configuration Flexibility**: Adjust and fine-tune every aspect of your mail server settings directly from the webadmin, tailored to meet your specific requirements.
**完全配置靈活性**：您可以直接透過 Web 管理介面調整和微調郵件伺服器設定的各個方面，以滿足您的特定需求。
- **Enhanced Log Viewing and Searching**: Navigate through logs effortlessly with advanced search and filtering capabilities, making it easier to pinpoint issues or monitor activity.
**增強的日誌檢視和搜尋功能**：透過進階搜尋和篩選功能，輕鬆瀏覽日誌，更容易找出問題或監控活動。
- **Self-Service Portal for Users**: Empower your users with a self-service portal for password resets and managing encryption-at-rest keys, enhancing security and convenience.
**使用者自助服務入口網站**：透過自助服務門戶，為使用者提供密碼重設和管理靜態加密金鑰的功能，從而增強安全性和便利性。
This transformative approach to mail server management not only elevates the administration experience but also significantly reduces the complexity and time required to manage your email infrastructure.
 這種變革性的郵件伺服器管理方法不僅提升了管理體驗，而且顯著降低了管理電子郵件基礎架構所需的複雜性和時間。

### Enhanced Performance and Efficiency｜效能和效率提升

 Beyond management improvements, Stalwart Mail Server `0.7.0` introduces significant performance enhancements to ensure swift and efficient email delivery. A major focus has been placed on optimizing mailbox retrieval speeds to accommodate IMAP clients, particularly those without client-side caching, ensuring that large mailboxes are displayed promptly. This version also integrates automatic compression for messages and binaries stored in the blob store using LZ4, a move that conservatively manages storage space while improving access and transfer speeds. These enhancements collectively ensure that Stalwart Mail Server `0.7.0` delivers unparalleled performance, making it faster and more efficient than ever before.

 除了管理方面的改進，Stalwart Mail Server `0.7.0`還引入了顯著的效能提升，以確保郵件快速且有效率地送達。此次更新的重點在於優化郵箱檢索速度，以更好地適配IMAP客戶端，特別是那些未啟用客戶端快取的用戶端，從而確保大型郵箱能夠及時顯示。此外，該版本還整合了LZ4功能，用於自動壓縮儲存在 Blob 儲存中的郵件和二進位文件，此舉既能有效管理儲存空間，又能提升存取和傳輸速度。所有這些改進共同確保了 Stalwart Mail Server `0.7.0`擁有無與倫比的效能，使其比以往任何時候都更加快速且有效率。

### Embracing the Future｜擁抱未來

 With the release of version `0.7.0`, Stalwart Mail Server sets a new standard for email server solutions. The introduction of a web-based administration tool and significant performance improvements underscore our commitment to innovation and excellence. We invite you to experience the future of email server management and performance with Stalwart Mail Server `0.7.0`.

 隨著`0.7.0`版本的發布，Stalwart Mail Server為郵件伺服器解決方案樹立了新的標竿。新增的基於Web的管理工具以及顯著的效能提升，彰顯了我們對創新和卓越的不懈追求。我們誠摯邀請您體驗Stalwart Mail Server `0.7.0`所帶來的郵件伺服器管理與效能的未來。

**Tags:**

**標籤：**

- [webadmin](https://stalw.art/blog/tags/webadmin/)
[webadmin](https://stalw.art/blog/tags/webadmin/)
- [mail](https://stalw.art/blog/tags/mail/)
[郵件](https://stalw.art/blog/tags/mail/)
- [server](https://stalw.art/blog/tags/server/)
[伺服器](https://stalw.art/blog/tags/server/)
Introducing DNS-01 and HTTP-01 ACME Challenges
 介紹DNS -01 和HTTP -01 ACME挑戰

 Introducing Distributed SMTP Queues & Expressions

 【分佈式隊列與表達式\([https://stalw.art/blog/distributed-smtp-queues/](https://stalw.art/blog/distributed-smtp-queues/)\) 】 SMTP

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Stalwart v0.16 A New Foundation｜Stalwart v0.16新基金會　｜　下一篇：Elevating Performance and Flexibility｜提升效能和靈活性 ➡
