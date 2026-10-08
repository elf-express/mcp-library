---

## title: "The Future of Stalwart Webmail, Roadmap, and Beyond｜Stalwart Webmail 的未來、路線圖及其他"

 title\_original: "The Future of Stalwart Webmail, Roadmap, and Beyond"
source: "[https://stalw.art/blog/roadmap](https://stalw.art/blog/roadmap)"
chapter: \["blog"\]
order: 43
lang: "bilingual"
translated\_by: "google\_v2+gtx"
captured: "2026-10-05T01:03:20.228Z"

 ⬆ 目錄　｜　⬅ 上一篇：Zero open bug reports The road to Stalwart 1.0｜零未解決的錯誤回報 通往堅韌之路1.0　｜　下一篇：Security at the Core Stalwart completes Second Security Audit｜安全至上：Stalwart 完成第二次安全審計 ➡

# The Future of Stalwart Webmail, Roadmap, and Beyond｜Stalwart Webmail 的未來、路線圖及其他

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

## The Future of Stalwart: Webmail, Roadmap, and Beyond｜Stalwart 的未來：Webmail、路線圖及其他

 Jun 20, 2025 - 3 min read

 2025年6月20日 - 閱讀時間：3分鐘

 \[![Mauro D.](assets/selected_570_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

 Almost exactly one year later, on [September 17th, 2022](https://github.com/stalwartlabs/jmap-server/releases/tag/v0.1.0), we proudly released version 0.1, initially known as the [Stalwart JMAP server](https://github.com/stalwartlabs/jmap-server). From that initial launch, we’ve continuously expanded Stalwart’s capabilities, consistently introducing valuable new features. Just last month, we celebrated a major milestone by transforming Stalwart from solely a mail server into a comprehensive mail and collaboration server. This significant update brought CalDAV, CardDAV, and WebDAV support, positioning Stalwart as the open-source mail and collaboration server with the most extensive feature set available today—even compared to many commercial solutions.

 大約一年後，在[2022年9月17日](https://github.com/stalwartlabs/jmap-server/releases/tag/v0.1.0) ，我們自豪地發布了0.1版本，最初被稱為[Stalwart JMAP伺服器](https://github.com/stalwartlabs/jmap-server) 。自首次發布以來，我們不斷擴展Stalwart的功能，持續推出極具價值的新功能。就在上個月，我們慶祝了一個重要的里程碑 ，將Stalwart從單純的郵件伺服器轉型為功能全面的郵件和協作伺服器。此次重大更新帶來了對CalDAV、CardDAV和WebDAV的支持，使Stalwart成為目前功能最全面的開源郵件和協作伺服器——即使與許多商業解決方案相比也是如此。

 Despite these significant advancements and the existing web-based administration interface that includes essential self-service capabilities, we’ve noticed one prominent request from our community: a built-in webmail client. Many of you have been eagerly asking whether we plan to offer this feature. Today, we’re excited to share with you that yes, a dedicated Stalwart Webmail is indeed in our plans—but it’s not currently our immediate priority.

 儘管我們取得了這些顯著進展，並且現有的基於 Web 的管理介面也包含了必要的自助服務功能，但我們注意到社群中有一個突出的需求：內建 Webmail 用戶端。許多用戶都迫切地詢問我們是否計劃提供此功能。今天，我們很高興地告訴大家，我們確實計劃推出專門的 Stalwart Webmail 用戶端——但這並非我們目前的首要任務。

 Our roadmap for the remainder of 2025 is already well-defined. We will first release JMAP support for Calendars, Contacts, and File Storage, which will further strengthen Stalwart’s position as a powerful collaborative tool. Immediately following these updates, our main focus will shift to preparing for our much-anticipated version 1.0 release.

 我們已經制定了2025年剩餘時間的詳細路線圖。首先，我們將發布JMAP新增對日曆、聯絡人和文件儲存的支持，這將進一步鞏固Stalwart作為強大協作工具的地位。緊跟在後，我們將把主要精力轉移到備受期待的1.0版本發布準備工作上。

 Although Stalwart is already being confidently used in production environments globally, version 1.0 marks an essential milestone. It signifies that we’ve finalized our database schema—no more daunting database migrations\!—ensuring stability for long-term users. Unless an entirely new protocol surpassing email emerges \(who knows?\), our database schema will remain stable and optimized. Moreover, this version will involve a comprehensive performance optimization initiative. Every line of our code was initially written with speed and efficiency in mind, yet there are still critical areas we believe can be further improved. By systematically benchmarking critical code paths, we’re confident we’ll find opportunities to make Stalwart even faster and more efficient.

 儘管 Stalwart 已在全球生產環境中廣泛應用，但1.0版本標誌著一個重要的里程碑。它意味著我們已最終確定資料庫架構——無需再進行繁瑣的資料庫遷移！ ——從而確保了長期用戶的穩定性。除非出現一種超越電子郵件的全新協定（誰知道呢？），否則我們的資料庫架構將保持穩定和最佳化。此外，此版本還將包含一項全面的效能最佳化計畫。我們編寫的每一行程式碼都以速度和效率為目標，但我們認為仍有一些關鍵領域可以進一步改進。透過有系統地對關鍵程式碼路徑進行基準測試，我們相信能夠找到讓 Stalwart 更快、更有效率的機會。

 Post version 1.0, our commitment remains firm: Stalwart will remain lean and specialized. While our GitHub issue tracker proudly showcases [numerous exciting enhancement requests](https://github.com/stalwartlabs/stalwart/issues?q=is%25253Aissue+is%25253Aopen+sort%25253Areactions-%25252B1-desc+label%25253Aenhancement), rest assured we won’t lose sight of our core mission. Our primary goal is to continue being the absolute best in JMAP, IMAP, POP3, SMTP, and WebDAV protocols—nothing more, nothing less. We strive to avoid becoming a proverbial jack-of-all-trades, instead remaining focused and exceptional at our core competencies.

 自從版本1.0發布以來，我們的承諾依然堅定：Stalwart 將保持精簡和專業化。雖然我們的 GitHub 問題追蹤器上展示了許多令人興奮的增強功能請求\([https://github.com/stalwartlabs/stalwart/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement](https://github.com/stalwartlabs/stalwart/issues?q=is%25253Aissue+is%25253Aopen+sort%25253Areactions-%25252B1-desc+label%25253Aenhancement)\) ，但請放心，我們不會偏離核心使命。我們的首要目標是繼續在JMAP, IMAP, POP3, SMTP和 WebDAV 協議領域保持絕對領先——不多不少，僅此而已。我們力求避免成為樣樣通卻樣樣鬆的“萬事通”，而是專注於核心競爭力，力求做到卓越。

 As for the much-requested Webmail, once we’ve achieved the critical milestone of version 1.0, we plan to start its development—most likely sometime in 2026. We’ll be building a Single Page Application \(SPA\) using Rust and the [Dioxus](https://github.com/DioxusLabs/dioxus) framework. Dioxus is quite distinct from more popular frameworks like React, meaning many necessary UI components still don’t exist. Consequently, we’ll likely spend considerable time contributing directly to the Dioxus ecosystem, expanding available components and features.

 至於大家呼聲很高的 Webmail 功能，一旦我們達到版本1.0的關鍵里程碑，我們計劃啟動其開發——很可能在 2026 年的某個時候。我們將使用 Rust 和 [Dioxus](https://github.com/DioxusLabs/dioxus)框架建立一個單頁應用程式 \( SPA \)。 Dioxus 與 React 等更流行的框架截然不同，這意味著許多必要的UI組件目前尚不存在。因此，我們可能會花費大量時間直接為 Dioxus 生態系統做出貢獻，擴展可用的組件和功能。

 Now, you might ask, “Why not simply use React or another established framework?” Well, humorously and earnestly, at Stalwart, we operate by an unofficial motto: “**Aut Rust aut nihil**,” meaning “Either Rust or nothing.” We’re committed to Rust because we truly believe it’s the best language for creating secure, reliable, and performant software—even if this approach means occasionally delaying releases by a few months.

 現在，您可能會問，“為什麼不簡單地使用 React 或其他已建立的框架呢？”好吧，幽默而認真地，在 Stalwart，我們遵循一個非官方的座右銘：“**Aut Rust aut nihil**”，意思是“要么生鏽，要么什麼都沒有”。我們致力於 Rust，因為我們堅信它是創建安全、可靠和高效能軟體的最佳語言——即使這種方法意味著偶爾會延遲幾個月發布。

 In the meantime, while our webmail is in development, we highly recommend using alternative webmail solutions that integrate smoothly with Stalwart. Some choices include [Roundcube](https://github.com/roundcube/roundcubemail), [SnappyMail](https://github.com/the-djmaze/snappymail), [SoGo](https://github.com/Alinto/sogo), or [TMail Web](https://github.com/linagora/tmail-flutter)—which notably supports the JMAP protocol.

 同時，在我們網頁郵件系統開發期間，我們強烈建議您使用與 Stalwart 無縫整合的其他網頁郵件解決方案。一些選擇包括 [Roundcube](https://github.com/roundcube/roundcubemail) 、[SnappyMail](https://github.com/the-djmaze/snappymail) 、[SoGo](https://github.com/Alinto/sogo)或 [TMail Web](https://github.com/linagora/tmail-flutter)值得注意的是，後者支援JMAP協定。

 We’re grateful for your continued support and patience as we steadily build toward a fully integrated Stalwart experience. Stay tuned, and thank you for being part of this exciting journey\!

 感謝您一直以來的支持與耐心，我們將穩定地推動 Stalwart 全面整合體驗的開發。敬請期待，感謝您參與這段令人興奮的旅程！

**Tags:**

**標籤：**

- [webmail](https://stalw.art/blog/tags/webmail/)
[webmail](https://stalw.art/blog/tags/webmail/)
- [roadmap](https://stalw.art/blog/tags/roadmap/)
[路線圖](https://stalw.art/blog/tags/roadmap/)
- [stalwart](https://stalw.art/blog/tags/stalwart/)
[堅定者](https://stalw.art/blog/tags/stalwart/)
- [jmap](https://stalw.art/blog/tags/jmap/)
[jmap](https://stalw.art/blog/tags/jmap/)
- [imap](https://stalw.art/blog/tags/imap/)
[imap](https://stalw.art/blog/tags/imap/)
- [pop3](https://stalw.art/blog/tags/pop3/)
[pop3](https://stalw.art/blog/tags/pop3/)
- [smtp](https://stalw.art/blog/tags/smtp/)
[smtp](https://stalw.art/blog/tags/smtp/)
- [webdav](https://stalw.art/blog/tags/webdav/)
[webdav](https://stalw.art/blog/tags/webdav/)
- [dioxus](https://stalw.art/blog/tags/dioxus/)
[二噁英](https://stalw.art/blog/tags/dioxus/)
Introducing Virtual Queues and Strategy-Driven Delivery in Stalwart MTA
 Stalwart 中引入虛擬隊列與策略驅動交付MTA

 Introducing Calendars, Contacts and Files in Stalwart

 Stalwart 新增日曆、聯絡人和檔案功能

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Zero open bug reports The road to Stalwart 1.0｜零未解決的錯誤回報 通往堅韌之路1.0　｜　下一篇：Security at the Core Stalwart completes Second Security Audit｜安全至上：Stalwart 完成第二次安全審計 ➡
