---

## title: "Stalwart Receives NLNet Grant to Build Collaboration Server｜Stalwart公司獲得NLNet撥款，用於建立協作伺服器"

 title\_original: "Stalwart Receives NLNet Grant to Build Collaboration Server"
source: "[https://stalw.art/blog/nlnet-grant-collaboration](https://stalw.art/blog/nlnet-grant-collaboration)"
chapter: \["blog"\]
order: 36
lang: "bilingual"
translated\_by: "google\_v2+gtx"
captured: "2026-10-05T01:03:08.227Z"

 ⬆ 目錄　｜　⬅ 上一篇：Stalwart and Nextcloud Join Forces｜Stalwart 和 Nextcloud 強強聯手　｜　下一篇：Stalwart Mail Server is awarded a grant from NLnet NGI0 Entrust Fund｜Stalwart Mail Server 獲得了 NLnet NGI0 Entrust Fund 的資助。 ➡

# Stalwart Receives NLNet Grant to Build Collaboration Server｜Stalwart公司獲得NLNet撥款，用於建立協作伺服器

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

Mar 21, 2025 - 3 min read

 2025年3月21日 - 閱讀時間：3分鐘

 \[![Mauro D.](assets/selected_563_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

## Expanding the Vision: From Email to Collaboration｜拓展視野：從電子郵件到協作

 Stalwart Mail Server was created to address the challenges of self-hosting email by offering a secure, easy-to-maintain, and high-performance solution. With native support for JMAP, IMAP4, POP3, and SMTP, it already serves as a powerful alternative to traditional email solutions, giving individuals and organizations full control over their email systems.

 Stalwart Mail Server 的創建旨在解決自架電子郵件所面臨的挑戰，提供安全、易於維護且高效能的解決方案。它原生支援JMAP, IMAP4, POP3和SMTP ，已成為傳統電子郵件解決方案的強大替代方案，使個人和組織能夠完全掌控自己的電子郵件系統。

 With the help of this new grant, we are now expanding the Stalwart platform beyond email. Development is officially underway on the **Stalwart Collaboration Server**, a new component that will integrate seamlessly with Stalwart Mail Server. This addition will provide support for calendaring through CalDAV and JMAP for Calendars, contact management using CardDAV and JMAP for Contacts, and file storage and sharing using WebDAV and JMAP for File Management. Together, these features will form the foundation of a fully integrated, open-source collaboration suite.

 借助這筆新的撥款，我們正在將 Stalwart 平台的功能擴展到電子郵件之外。 **Stalwart 協作伺服器**的開發工作已正式啟動，這是一個將與 Stalwart 郵件伺服器無縫整合的新元件。該元件將支援透過 CalDAV 和JMAP進行日曆管理，透過 CardDAV 和JMAP進行聯絡人管理，以及透過 WebDAV 和JMAP進行檔案儲存和共用。這些功能將共同構成一個完全整合的開源協作套件的基礎。

 Our goal is to offer a privacy-focused, vendor-neutral alternative to platforms like Microsoft Exchange. By consolidating email, calendar, contacts, and file sharing into one unified system, Stalwart will give users the ability to self-host their entire collaboration stack without sacrificing modern functionality, scalability, or security.

 我們的目標是提供一個以隱私為中心、廠商中立的平台，作為微軟 Exchange 等平台的替代方案。 Stalwart 將電子郵件、日曆、聯絡人和文件共享整合到一個統一的系統中，使用戶能夠自行託管整個協作堆疊，同時又不犧牲現代化的功能、可擴展性和安全性。

## What the Grant Will Fund｜撥款將用於哪些方面

 The new funding will support a series of developments that will be released gradually throughout the year under the AGPL-3.0 license:

 這筆新資金將支持一系列開發項目，這些項目將在AGPL-3.0許可協議下於年內逐步發布：

- A full-featured CalDAV and CardDAV server will be implemented, allowing users to manage their calendars and contacts directly within Stalwart. This means there will be no need to rely on external software to provide these functions. Users will be able to keep all of their collaboration data in one place, within a single, tightly integrated platform.
我們將部署功能齊全的 CalDAV 和 CardDAV 伺服器，使用戶能夠直接在 Stalwart 內管理日曆和聯絡人。這意味著用戶無需依賴外部軟體即可實現這些功能。使用者可以將所有協作資料集中儲存在一個高度整合的平台中。
- In addition, we will extend Stalwart’s existing JMAP implementation to support JMAP for Calendars and JMAP for Contacts. This will involve developing parsers for JSCalendar and JSContact, as well as creating bidirectional converters between JSCalendar and iCalendar, and JSContact and vCard.
此外，我們將擴展 Stalwart 現有的JMAP實現，以支援日曆的JMAP和聯絡人的JMAP 。這將涉及開發 JSCalendar 和 JSContact 的解析器，以及建立 JSCalendar 和 iCalendar 之間、JSContact 和 vCard 之間的雙向轉換器。
- File storage and management will also become a first-class feature of the platform. A WebDAV-based file storage system will be built on top of Stalwart’s internal blob store. Alongside this, we will implement support for JMAP for File Management, allowing users to upload, organize, and share files using either standard WebDAV clients or JMAP-based applications. The JMAP support will align with the ongoing efforts to standardize file management within the JMAP ecosystem.
文件儲存和管理也將成為該平台的一流功能。基於 WebDAV 的檔案儲存系統將建置在 Stalwart 的內部 Blob 儲存之上。除此之外，我們還將實現對 JMAP 檔案管理的支持，允許使用者使用標準 WebDAV 用戶端或基於 JMAP 的應用程式上傳、組織和共享檔案。 JMAP 支援將與JMAP 生態系統內標準化文件管理的持續努力保持一致。
- Finally, the grant will fund the implementation of the three most requested features by the Stalwart community. These include support for the IMAP XAPPLEPUSHSERVICE extension, which enables push notifications on iOS devices; automatic DKIM record updates via RFC2136, making it easier to manage DNS records dynamically; and support for exporting Maildir mailboxes with nested folders, improving compatibility and backup workflows.
最後，該筆撥款將用於實現 Stalwart 社區最迫切需要的三個功能。這些功能包括：支援IMAP擴充功能（可在 iOS 裝置上啟用推播通知）；透過DKIM自動更新記錄RFC2136可更輕鬆地DNS管理記錄）；以及支援匯出包含巢狀資料夾的 Maildir 信箱，從而提高相容性並最佳化備份工作流程。


## Acknowledgements｜致謝

 We would like to express our sincere thanks to the [NLnet Foundation](https://nlnet.nl/) and the **European Commission**for making this work possible. The project is funded through the [NGI0 Core Fund](https://nlnet.nl/core/), a fund established by NLnet with financial support from the**European Commission’s Next Generation Internet programme, under the aegis of**DG Communications Networks, Content and Technology**, as part of**grant agreement No. 101092990.

 我們衷心感謝 [NLnet 基金會](https://nlnet.nl/) 和 **歐盟委員會**讓這項工作成為可能。該項目由 [NGI0 核心基金](https://nlnet.nl/core/) 資助，該基金是 NLnet 在**歐盟委員會下一代互聯網計劃**的財政支持下設立的基金，由**DG 通信網絡、內容和技術**贊助，作為**贈款協議 101092990** 的一部分。

 This support plays a vital role in advancing open-source infrastructure and helps ensure that secure, decentralized alternatives remain viable and accessible to everyone.

 這種支援在推進開源基礎設施方面發揮著至關重要的作用，並有助於確保安全、去中心化的替代方案保持可行性，並讓每個人都能使用。

## Looking Ahead｜展望未來

 As we roll out these new features throughout the year, we remain committed to the core values that drive Stalwart’s development: privacy, performance, transparency, and user empowerment. The Stalwart Collaboration Server will transform the platform into a comprehensive, modern collaboration suite — one that is open, scalable, and fully self-hosted.

 隨著我們全年陸續推出這些新功能，我們將始終秉持Stalwart發展的核心價值：隱私、效能、透明度和使用者賦能。 Stalwart協作伺服器將把平台轉型為全面、現代化的協作套件——一個開放、可擴展且完全自架的套件。

 We look forward to sharing more progress soon. In the meantime, we invite developers, testers, and curious users to follow our work, contribute ideas, and help shape the future of self-hosted collaboration.

 我們期待盡快與大家分享更多進展。同時，我們誠摯邀請開發者、測試人員和有興趣的使用者關注我們的工作，貢獻您的想法，共同塑造自託管協作的未來。

 Stay tuned, and thank you for your continued support.

 敬請期待，感謝您一直以來的支持。

**Tags:**

**標籤：**

- [nlnet](https://stalw.art/blog/tags/nlnet/)
[nlnet](https://stalw.art/blog/tags/nlnet/)
- [ngi0](https://stalw.art/blog/tags/ngi0/)
[ngi0](https://stalw.art/blog/tags/ngi0/)
- [grant](https://stalw.art/blog/tags/grant/)
[grant](https://stalw.art/blog/tags/grant/)
- [collaboration](https://stalw.art/blog/tags/collaboration/)
[合作](https://stalw.art/blog/tags/collaboration/)
- [caldav](https://stalw.art/blog/tags/caldav/)
[caldav](https://stalw.art/blog/tags/caldav/)
- [carddav](https://stalw.art/blog/tags/carddav/)
[carddav](https://stalw.art/blog/tags/carddav/)
- [webdav](https://stalw.art/blog/tags/webdav/)
[webdav](https://stalw.art/blog/tags/webdav/)
- [jmap](https://stalw.art/blog/tags/jmap/)
[jmap](https://stalw.art/blog/tags/jmap/)
Introducing Calendars, Contacts and Files in Stalwart
 Stalwart 日曆、聯絡人與文件功能簡介

 OpenID Connect Integration is now Open Source

 OpenID Connect 整合現已開源

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Stalwart and Nextcloud Join Forces｜Stalwart 和 Nextcloud 強強聯手　｜　下一篇：Stalwart Mail Server is awarded a grant from NLnet NGI0 Entrust Fund｜Stalwart Mail Server 獲得了 NLnet NGI0 Entrust Fund 的資助。 ➡
