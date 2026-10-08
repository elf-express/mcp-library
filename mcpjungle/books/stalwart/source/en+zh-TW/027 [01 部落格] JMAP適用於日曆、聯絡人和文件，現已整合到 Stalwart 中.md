---

## title: "JMAP for Calendars, Contacts and Files now in Stalwart｜JMAP適用於日曆、聯絡人和文件，現已整合到 Stalwart 中"

 title\_original: "JMAP for Calendars, Contacts and Files now in Stalwart"
source: "[https://stalw.art/blog/jmap-collaboration](https://stalw.art/blog/jmap-collaboration)"
chapter: \["blog"\]
order: 27
lang: "bilingual"
translated\_by: "google\_v2+gtx"
captured: "2026-10-05T01:02:57.492Z"

 ⬆ 目錄　｜　⬅ 上一篇：Vandelay the JMAP importer-exporter｜Vandelay JMAP進出口商　｜　下一篇：Revolutionize Your Email Workflow with AI｜使用AI徹底革新您的電子郵件工作流程 ➡

# JMAP for Calendars, Contacts and Files now in Stalwart｜JMAP適用於日曆、聯絡人和文件，現已整合到 Stalwart 中

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

Oct 22, 2025 - 4 min read

 2025年10月22日 - 閱讀時間：4分鐘

 \[![Mauro D.](assets/selected_554_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

## A New Generation of Protocols｜新一代協議

 Over the past few years, the IETF has been redefining how email, calendars, and contacts are synchronized and shared. Building upon the success of JMAP for Mail, several new protocol extensions have been introduced:

 過去幾年， IETF一直在重新定義電子郵件、行事曆和聯絡人的同步和共用方式。在JMAP郵件應用程式成功的基礎上，又推出了幾個新的協定擴充：

- [JMAP for Calendars](https://datatracker.ietf.org/doc/draft-ietf-jmap-calendars) \- A modern replacement for CalDAV and CalDAV Scheduling.
[JMAP用於日曆](https://datatracker.ietf.org/doc/draft-ietf-jmap-calendars) \- CalDAV 和 CalDAV 調度的現代替代品。
- [JMAP for Contacts](https://datatracker.ietf.org/doc/rfc9610/) – A powerful alternative to CardDAV.
[JMAP用於聯絡人](https://datatracker.ietf.org/doc/rfc9610/) – CardDAV 的強大替代方案。
- [JMAP for File Storage](https://datatracker.ietf.org/doc/draft-ietf-jmap-filenode/) – A replacement for WebDAV-based file storage.
[JMAP用於檔案儲存](https://datatracker.ietf.org/doc/draft-ietf-jmap-filenode/) – WebDAV 檔案儲存的替代方案。
- [JMAP Sharing](https://datatracker.ietf.org/doc/rfc9670/) – A modern successor to WebDAV ACL.
[JMAP共享](https://datatracker.ietf.org/doc/rfc9670/) – WebDAV 的現代繼任者ACL 。
- [JSCalendar](https://datatracker.ietf.org/doc/draft-ietf-calext-jscalendarbis/) \- A clean, JSON-based evolution of iCalendar.
[JSCalendar](https://datatracker.ietf.org/doc/draft-ietf-calext-jscalendarbis/) \- 基於JSON的 iCalendar 的簡潔演進版本。
- [JSContact](https://datatracker.ietf.org/doc/rfc9553/) – A modernized, JSON-native successor to vCard.
[JSContact](https://datatracker.ietf.org/doc/rfc9553/) – vCard 的現代化原生版本JSON 。
Together, these standards offer a cohesive and elegant ecosystem that replaces decades of fragmented WebDAV-based technologies.
 這些標準共同構成了一個統一而優雅的生態系統，取代了數十年來分散的基於 WebDAV 的技術。

## Limitations of Yesterday’s Technology｜昨日技術的局限性

 WebDAV and its descendants — CalDAV, CardDAV, and related extensions — have served the Internet well. They are robust, widely adopted, and battle-tested. Yet, their **XML-based** design is notoriously verbose, inconsistent, and difficult to implement correctly. Information is scattered across HTTP headers, XML payloads, and even embedded iCalendar data, creating endless compatibility and interoperability challenges between clients and servers.

 WebDAV及其衍生版本——CalDAV、CardDAV及相關擴充功能——為網路做出了巨大貢獻。它們功能強大、應用廣泛且久經考驗。然而，它們基於**XML**的設計卻以冗長、不一致和難以正確實現而臭名昭著。資訊分散在HTTP頭部、 XML有效載荷，甚至嵌入式iCalendar資料中，這給客戶端和伺服器之間帶來了無窮無盡的兼容性和互通性挑戰。

 Similarly, **iCalendar**and**vCard**, while expressive and versatile, have accumulated decades of technical debt. They contain countless properties and parameters—many rarely used, some obsolete, and others inconsistently implemented across versions. This clutter has made both formats unwieldy and error-prone, often requiring complex parsing logic to handle edge cases.

 同樣，**iCalendar**和**vCard** 雖然功能強大且用途廣泛，但也累積了數十年的技術債。它們包含無數的屬性和參數——其中許多很少使用，有些已經過時，有些在不同版本中的實作方式不一致。這種混亂使得這兩種格式都難以管理且容易出錯，通常需要複雜的解析邏輯來處理特殊情況。

## JMAP: A Modern Solution for Modern Needs｜JMAP ：滿足現代需求的現代解決方案

 The **JMAP protocol** was originally developed as a more efficient, modern replacement for IMAP and SMTP submissions. Its strengths lie in simplicity, clarity, and network efficiency — all built on top of JSON over HTTPS.

**JMAP 協議** 最初是作為 IMAP 和 SMTP 提交的更高效、現代的替代品而開發的。它的優勢在於簡單、清晰和網路效率——所有這些都建立在 JSON 之上，而不是 HTTPS 之上。

 Now, with the introduction of **JMAP for Calendars,**Contacts**,**Files**, and**Sharing, the same design philosophy extends beyond email to the entire collaboration stack. These protocols deliver what DAV always aimed for but never quite achieved: a clean, uniform, and easily implementable API for all personal and group data — mail, calendars, contacts, files, and shared resources.

 現在，隨著 **JMAP for Calendars、**Contacts**、**Files**和**Sharing 的推出，同樣的設計理念已從電子郵件擴展到整個協作堆疊。這些協定實現了 DAV 一直以來追求但從未完全達成的目標：為所有個人和群組資料（包括郵件、日曆、聯絡人、文件和共享資源）提供簡潔、統一且易於實現的 API。

 Meanwhile, **JSCalendar**and**JSContact** reimagine iCalendar and vCard as elegant JSON-based formats. They strip away decades of accumulated cruft, unify representations, and offer a clear, unambiguous, and expressive data model. Both are human-readable, developer-friendly, and efficient to parse — a perfect fit for modern applications.

 同時，**JSCalendar**和**JSContact** 將 iCalendar 和 vCard 重新構想為優雅的基於JSON的格式。它們摒棄了數十年來累積的冗餘程式碼，統一了數據表示，並提供了一個清晰、明確且富有表現力的數據模型。兩者都易於閱讀、對開發者友好且解析高效——完美契合現代應用程式的需求。

 Together, JMAP and these new data models make calendaring, contact management, and file sharing not only easier to implement but also faster and more reliable.

 JMAP與這些新的資料模型結合，不僅使日曆、聯絡人管理和文件共享更容易實現，而且速度更快、更可靠。

## Why This Matters｜為什麼這很重要

 This release represents more than new features — it marks a shift in how groupware protocols are designed and implemented. For the first time, developers and organizations can build on **a single, coherent, JSON-based framework** for mail, contacts, calendars, and shared resources.

 此次版本更新不僅帶來了新功能，更標誌著群件協定設計與實現方式的轉變。開發者和組織首次能夠基於**單一、統一的、基於JSON的框架**建立郵件、聯絡人、日曆和共享資源。

 We believe this will **revolutionize calendaring and collaboration**. Implementations will become easier, interoperability issues will decrease, and innovation will accelerate. The simplicity and predictability of JMAP empower both clients and servers to focus on features and user experience, not protocol gymnastics.

 我們相信這將**徹底改變日曆和協作**。實施將變得更加容易，互通性問題將減少，創新將加速。 JMAP 的簡單性和可預測性使客戶端和伺服器能夠專注於功能和使用者體驗，而不是協定體操。

## Client Support and Ecosystem｜客戶支援和生態系統

 As Stalwart is the first complete JMAP server to support these new protocols, client support is still emerging. However, we’re excited to share that several projects are already working to adopt these new standards. [Mailtemi](https://mailtemi.com/) and [OpenCloud](https://opencloud.eu/en) are actively developing client-side implementations for **JMAP Calendars,**Contacts**, and**File Storage. The ecosystem is growing, and we expect rapid adoption as developers experience the elegance and power of JMAP firsthand.

 由於 Stalwart 是首個完全支援這些新協定的JMAP伺服器，客戶端支援仍在發展中。不過，我們很高興地宣布，已有多個專案正在著手採用這些新標準。 [Mailtemi](https://mailtemi.com/)和 [OpenCloud](https://opencloud.eu/en)正在積極開發 **JMAP日曆、**聯絡人**和**檔案儲存 的客戶端實作。生態系統正在不斷發展壯大，我們預計隨著開發者親身體驗JMAP的優雅和強大，這些協議將會被迅速採用。

## A Word of Thanks｜致謝

 We would like to express our sincere gratitude to [NLNet](https://nlnet.nl/) for supporting the development of these features through the [NGI Zero grant program](https://nlnet.nl/commonsfund/). Their commitment to open standards and privacy-respecting technology continues to make projects like Stalwart possible.

 我們衷心感謝 [NLNet](https://nlnet.nl/)透過 [NGI Zero grant program](https://nlnet.nl/commonsfund/)對這些功能開發的支援。他們對開放標準和尊重隱私技術的承諾，使得像 Stalwart 這樣的計畫成為可能。

## Looking Ahead to 1.0.0｜展望1.0.0

 After four years of dedicated development, we’re proud to announce that **Stalwart is now feature complete**. With this milestone, all the core capabilities of a modern mail and collaboration server are fully implemented.

 經過四年的潛心開發，我們很榮幸地宣布**Stalwart 功能已全部開發完成**。至此，現代郵件和協作伺服器的所有核心功能均已全面實現。

 That said, our work is far from over. We are now focusing on **finalizing the database schema,**improving performance, and addressing the [hundreds of enhancement requests](https://github.com/stalwartlabs/stalwart/issues?q=is%25253Aissue+is%25253Aopen+sort%25253Areactions-%25252B1-desc+label%25253Aenhancement) on GitHub. Our goal is to deliver a stable `1.0.0` release within the next few months — one that sets a new standard for open, efficient, and modern communication servers.

 儘管如此，我們的工作遠未結束。我們目前正專注於**最終確定資料庫架構、**提升效能，並解決GitHub上數百個增強功能請求\([https://github.com/stalwartlabs/stalwart/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement](https://github.com/stalwartlabs/stalwart/issues?q=is%25253Aissue+is%25253Aopen+sort%25253Areactions-%25252B1-desc+label%25253Aenhancement)\) 。我們的目標是在未來幾個月內發布一個穩定的`1.0.0`版本——一個為開放、高效、現代化的通訊伺服器樹立新標竿的版本。

 Stalwart is now the most complete, elegant, and forward-looking JMAP collaboration platform available.

 Stalwart 現在是最完整、最優雅、最具前瞻性的JMAP協作平台。

 And this is only the beginning.

 而這只是個開始。

**Tags:**

**標籤：**

- [jmap](https://stalw.art/blog/tags/jmap/)
[jmap](https://stalw.art/blog/tags/jmap/)
- [calendar](https://stalw.art/blog/tags/calendar/)
[日曆](https://stalw.art/blog/tags/calendar/)
- [contacts](https://stalw.art/blog/tags/contacts/)
[聯絡方式](https://stalw.art/blog/tags/contacts/)
- [files](https://stalw.art/blog/tags/files/)
[文件](https://stalw.art/blog/tags/files/)
- [collaboration](https://stalw.art/blog/tags/collaboration/)
[合作](https://stalw.art/blog/tags/collaboration/)
- [groupware](https://stalw.art/blog/tags/groupware/)
[群件](https://stalw.art/blog/tags/groupware/)
Marginal Gains: Major Impact
 邊際收益：重大影響

 Security at the Core: Stalwart completes Second Security Audit

 安全至上：Stalwart 完成第二次安全審計

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Vandelay the JMAP importer-exporter｜Vandelay JMAP進出口商　｜　下一篇：Revolutionize Your Email Workflow with AI｜使用AI徹底革新您的電子郵件工作流程 ➡
