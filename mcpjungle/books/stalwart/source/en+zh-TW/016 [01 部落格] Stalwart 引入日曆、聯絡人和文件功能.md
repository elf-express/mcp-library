---

## title: "Introducing Calendars, Contacts and Files in Stalwart｜Stalwart 引入日曆、聯絡人和文件功能"

 title\_original: "Introducing Calendars, Contacts and Files in Stalwart"
source: "[https://stalw.art/blog/collaboration](https://stalw.art/blog/collaboration)"
chapter: \["blog"\]
order: 16
lang: "bilingual"
translated\_by: "google\_v2+gtx"
captured: "2026-10-05T01:00:23.310Z"

 ⬆ 目錄　｜　⬅ 上一篇：Unlock Seamless Scalability with Stalwart Mail Server｜透過 Stalwart 郵件伺服器解鎖無縫擴充能力　｜　下一篇：Announcing Dashboards and Strengthened Security｜推出儀錶板並加強安全性 ➡

# Introducing Calendars, Contacts and Files in Stalwart｜Stalwart 引入日曆、聯絡人和文件功能

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

May 26, 2025 - 3 min read

 2025年5月26日 - 閱讀需時3分鐘

 \[![Mauro D.](assets/selected_543_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

## Calendars, Contacts & Files – All in One Place｜日曆、聯絡人和文件——盡在一處

 With v0.12, you no longer need to integrate third-party groupware solutions or run parallel systems to support collaboration. Stalwart now includes first-class support for CalDAV calendars, CardDAV contacts, and WebDAV-based file storage. This means users can manage their events, address books, and documents through any standards-compliant client, seamlessly connected to the same backend that handles their email.

 借助v0.12 ，您不再需要整合第三方群組解決方案或運行並行系統來支援協作。 Stalwart 現在提供對 CalDAV 日曆 、CardDAV 聯絡人和 基於 WebDAV 的文件儲存的一流支援。這意味著用戶可以透過任何符合標準的用戶端管理他們的事件、通訊錄和文檔，並與處理電子郵件的相同後端無縫連接。

 Shared resources such as **group calendars,**shared address books**, and**team-accessible file folders**are also fully supported, providing a robust foundation for collaboration without the need for external software or services. And, to support flexible collaboration, Stalwart includes full support for the**WebDAV Access Control List \(ACL\) extension, enabling detailed, per-user and per-group permission management.

 Stalwart 也全面支援共享資源，例如**群組行事曆、**共用通訊錄**和**團隊可存取的資料資料夾**，無需外部軟體或服務即可為協作提供強大的基礎。此外，為了支援靈活協作，Stalwart 也完全支援**WebDAV 存取控制清單 \( ACL \) 擴充，從而實現詳細的、基於使用者和群組的權限管理。

## Improved Spam Filtering｜改進的垃圾郵件過濾

 Another thoughtful addition in this release is the integration of the spam filter with users’ personal address books. Messages from known or trusted contacts are now far less likely to be incorrectly flagged as spam. And if a legitimate message does get misclassified, the system automatically trains the **Bayesian classifier** to treat future similar messages as legitimate, improving accuracy over time without additional user intervention.

 此次更新的另一項貼心改進是將垃圾郵件過濾器與用戶的個人通訊錄整合在一起。來自已知或可信任聯絡人的郵件現在被錯誤標記為垃圾郵件的可能性大大降低。即使合法郵件確實被錯誤分類，系統也會自動訓練**貝葉斯分類器**，使其將未來類似的郵件識別為合法郵件，從而在無需用戶額外幹預的情況下，隨著時間的推移不斷提高識別準確率。

## Performance Enhancements｜性能提升

 Under the hood, Stalwart v0.12 introduces several key performance optimizations designed especially for large, multi-node environments. One of the most impactful changes is the introduction of incremental caching: Stalwart now keeps account metadata in memory and only fetches updates when something changes in the database. This significantly reduces load and speeds up response times.

 在底層，Stalwart v0.12引進了多項關鍵的效能最佳化，專為大型多節點環境設計。其中一項影響最大的改進是引入了增量快取 ：Stalwart 現在將帳戶元資料保存在記憶體中，僅在資料庫發生變更時才獲取更新。這顯著降低了負載並加快了響應速度。

 Another major enhancement is the use of **zero-copy deserialization. This means Stalwart can read data directly from memory buffers without copying it into new structures, lowering CPU usage and improving throughput. Combined with optimizations that reduce the number of required**database queries for common operations, these changes result in a leaner, faster backend that scales much more efficiently.

 另一項重大改進是採用了**零拷貝反序列化。這意味著 Stalwart 可以直接從記憶體緩衝區讀取數據，而無需將其複製到新的結構中，從而降低了CPU使用率並提高了吞吐量。結合減少常用操作所需**資料庫查詢次數的最佳化，這些改進使得後端更加精簡、快速，並且擴展性也更強。

 While these gains may not be noticeable in smaller setups, **larger clusters and high-volume deployments will see noticeable performance improvements**.

 雖然這些收益在較小的配置中可能並不明顯，但**較大的叢集和高容量部署將會看到明顯的效能提升**。

## Smarter and Faster Clustering｜更聰明、更快速的聚類

 We’ve also made big strides in cluster coordination. Previously, Stalwart relied on a UDP-based gossip protocol that performed well but didn’t scale ideally under heavy workloads. With v0.12, cluster behavior is now adaptable based on deployment size.

 我們在集群協調方面也取得了重大進展（ \([https://stalw.art/docs/cluster/coordination/](https://stalw.art/docs/cluster/coordination/)\) ）。此前，Stalwart 依賴基於UDP的 gossip 協議，該協議性能良好，但在高負載下擴展性不佳。借助v0.12 ，叢集行為現在可以根據部署規模進行調整。

 In **small deployments, Stalwart uses Eclipse Zenoh, a lightweight and efficient peer-to-peer pub/sub protocol. For**larger infrastructures, you can now choose from robust, scalable backends like Apache Kafka, Redpanda, NATS, or Redis for handling inter-node coordination, state synchronization, and workload distribution.

 在**小型部署**中，Stalwart 使用 Eclipse Zenoh，一種輕量級且高效的點對點發布/訂閱協議。對於**大型基礎架構**，您現在可以選擇強大、可擴展的後端，例如 Apache Kafka、Redpanda、NATS 或 Redis 來處理負載間負載狀態。

## Looking Ahead: What’s Next?｜展望未來：下一步是什麼？

 With Stalwart v0.12, we’re delivering more than just features—we’re delivering **freedom from fragmented infrastructure. No more patching together third-party services to get the basics of collaboration working. Now, everything—**email, calendars, contacts, files, and sharing—lives in a single, efficient, and secure system.

 Stalwart v0.12不僅提供各種功能，更重要的是，它能讓你**擺脫基礎設施碎片化的困擾。你無需再為了實現基本的協作功能而拼湊第三方服務。現在，所有功能——**電子郵件、日曆、聯絡人、文件和共享——都整合在一個高效且安全的系統中。

 While v0.12 is a major leap forward, we’re already preparing additional enhancements for the next point release. In **v0.12.1, you can expect support for**CalDAV Scheduling \(RFC 6638\)**, enabling automatic meeting invitations and attendee responses. We’re also adding support for**event notification alerts via email, so users are always aware of upcoming events, even if they’re not logged into their calendars.

 雖然v0.12是一次重大飛躍，但我們已經在為下一個版本準備更多增強功能。在 **v0.12.1**中，您將獲得對**CalDAV 日程安排 \( RFC 6638\)**的支持，從而實現自動會議邀請和與會者回复。我們還將添加對**透過電子郵件接收活動通知提醒** 的支持，以便用戶即使未登入日曆也能隨時了解即將發生的活動。

 Additionally, in the coming months, we will be releasing support for the **JMAP for Calendars,**JMAP for Contacts**, and**JMAP for File Storage extensions. JMAP offers a modern, efficient, and JSON-based alternative to legacy protocols, making it faster and easier to develop responsive, real-time collaboration tools. These additions will further streamline the user experience and reduce bandwidth and processing overhead across client-server interactions.

 此外，在接下來的幾個月中，我們將發布**JMAP日曆、**JMAP聯絡人**和**JMAP檔案儲存擴充功能的支援。 JMAP 為傳統協議提供了現代、高效且基於 JSON 的替代方案，使開發響應式即時協作工具變得更快、更容易。這些新增功能將進一步簡化使用者體驗，並減少客戶端與伺服器互動的頻寬和處理開銷。

 Thank you to everyone who contributed feedback, suggestions, and encouragement. We can’t wait to hear what you build with this release—and we’re just getting started.

 感謝所有提供回饋、建議和鼓勵的朋友。我們迫不及待想看看大家用這個版本發展出什麼作品——而這只是個開始。

**Tags:**

**標籤：**

- [calendars](https://stalw.art/blog/tags/calendars/)
[日曆](https://stalw.art/blog/tags/calendars/)
- [contact](https://stalw.art/blog/tags/contact/)
[聯絡方式](https://stalw.art/blog/tags/contact/)
- [files](https://stalw.art/blog/tags/files/)
[文件](https://stalw.art/blog/tags/files/)
- [collaboration](https://stalw.art/blog/tags/collaboration/)
[合作](https://stalw.art/blog/tags/collaboration/)
- [caldav](https://stalw.art/blog/tags/caldav/)
[caldav](https://stalw.art/blog/tags/caldav/)
- [carddav](https://stalw.art/blog/tags/carddav/)
[carddav](https://stalw.art/blog/tags/carddav/)
- [webdav](https://stalw.art/blog/tags/webdav/)
[webdav](https://stalw.art/blog/tags/webdav/)
The Future of Stalwart: Webmail, Roadmap, and Beyond
 Stalwart 的未來：Webmail、路線圖及其他

 Stalwart Receives NLNet Grant to Build Collaboration Server

 Stalwart 獲得 NLNet 資助，用於建立協作伺服器

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Unlock Seamless Scalability with Stalwart Mail Server｜透過 Stalwart 郵件伺服器解鎖無縫擴充能力　｜　下一篇：Announcing Dashboards and Strengthened Security｜推出儀錶板並加強安全性 ➡
