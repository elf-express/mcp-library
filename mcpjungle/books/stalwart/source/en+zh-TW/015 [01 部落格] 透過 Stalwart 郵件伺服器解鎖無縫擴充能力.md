---

## title: "Unlock Seamless Scalability with Stalwart Mail Server｜透過 Stalwart 郵件伺服器解鎖無縫擴充能力"

 title\_original: "Unlock Seamless Scalability with Stalwart Mail Server"
source: "[https://stalw.art/blog/clustering-ha](https://stalw.art/blog/clustering-ha)"
chapter: \["blog"\]
order: 15
lang: "bilingual"
translated\_by: "google\_v2"
captured: "2026-10-05T01:00:27.341Z"

 ⬆ 目錄　｜　⬅ 上一篇：Building E-mail messages in Rust｜使用 Rust 建立電子郵件　｜　下一篇：Introducing Calendars, Contacts and Files in Stalwart｜Stalwart 引入日曆、聯絡人和文件功能 ➡

# Unlock Seamless Scalability with Stalwart Mail Server｜透過 Stalwart 郵件伺服器解鎖無縫擴充能力

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

May 13, 2024 - 2 min read

 2024年5月13日 - 閱讀時間：2分鐘

 \[![Mauro D.](assets/selected_542_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

### Enhanced Clustering Capabilities｜增強的叢集功能

 A major highlight of this release is the introduction of advanced clustering support, a feature aimed at enterprises needing high availability and fault tolerance in their email services. The new clustering functionality includes node auto-discovery, which simplifies the scaling process by automatically detecting and integrating new nodes into the existing cluster. Additionally, the partition-tolerant failure detection system ensures that the system remains operational even when network partitions occur. These features collectively enhance the resilience of the mail server, ensuring continuous service availability and reliability.

 此版本更新的一大亮點是引入了高級叢集支持，該功能旨在滿足企業對電子郵件服務高可用性和容錯性的需求。新的叢集功能包括節點自動發現，它能夠自動偵測新節點並將其整合到現有叢集中，從而簡化擴展流程。此外，分區容錯故障偵測系統確保即使發生網路分區，系統也能保持運作。這些功能共同增強了郵件伺服器的彈性，從而確保服務的持續可用性和可靠性。

### Simplified Email Client Configuration｜簡化電子郵件用戶端配置

 Stalwart v0.8.0 also brings support for Autoconfig and Autodiscover protocols, which are essential for streamlining the user experience. These protocols automate the configuration process for email clients, eliminating the need for manual setup and reducing the potential for errors. By supporting these standards, Stalwart makes it easier for users to connect their email clients to the server, promoting a seamless integration with a variety of platforms.

 Stalwart v0.8.0還支援自動配置和自動發現協議，這對於簡化使用者體驗至關重要。這些協定可自動完成電子郵件用戶端的設定流程，無需手動設置，從而降低出錯的可能性。透過支援這些標準，Stalwart 使用戶能夠更輕鬆地將電子郵件用戶端連接到伺服器，從而促進與各種平台的無縫整合。

### Performance and Storage Optimizations｜效能和儲存優化

 We have implemented significant performance improvements, particularly in our integration with FoundationDB, enhancing the speed and efficiency of our database interactions. This version also introduces improved full-text indexing, which now uses less disk space without compromising search capabilities. These optimizations ensure that Stalwart Mail Server can handle larger volumes of data more efficiently, making it ideal for organizations with high email traffic.

 我們顯著提升了效能，尤其是在與 FoundationDB 的整合方面，顯著提高了資料庫互動的速度和效率。此版本還引入了改進的全文索引，在不影響搜尋功能的前提下，減少了磁碟空間佔用。這些優化確保 Stalwart Mail Server 能夠更有效率地處理大量數據，使其成為郵件流量高的組織的理想之選。

### Security and Administration Enhancements｜安全性和管理增強功能

 Stalwart v0.8.0 enhances security measures by automatically publishing MTA-STS policies and generating TLSA records for DANE, providing an additional layer of security by enabling encrypted email transport. These features help in preventing man-in-the-middle attacks and ensure that email communications are secured at transit.

 Stalwart v0.8.0透過自動發布MTA-STS策略並為DANE產生TLSA記錄來增強安全措施，並透過啟用加密電子郵件傳輸提供額外的安全層。這些功能有助於防止中間人攻擊，並確保電子郵件通訊在傳輸過程中安全無虞。

 Furthermore, this release includes a new feature in the web-admin panel that allows administrators to visualize queued messages. This tool is invaluable for monitoring and managing email flow, providing insights into the server’s operational status and helping to quickly address delivery issues.

 此外，此版本在 Web 管理面板中新增了一項功能，可讓管理員視覺化已排隊的郵件。該工具對於監控和管理郵件流至關重要，能夠幫助管理員深入了解伺服器的運作狀態，並快速解決郵件投遞問題。

### Looking Forward｜期待

 The release of Stalwart Mail Server v0.8.0 with its focus on clustering, autoconfiguration, and performance improvements demonstrates our ongoing commitment to developing cutting-edge technology that meets the needs of our users. We believe these enhancements will make a significant difference in how businesses and organizations manage their email infrastructures.

 Stalwart Mail Server v0.8.0的發布，重點在於叢集、自動配置和效能提升，體現了我們持續致力於開發滿足使用者需求的尖端技術的承諾。我們相信，這些改進將顯著改變企業和組織管理其電子郵件基礎架構的方式。

 We invite you to download and experience the new features of Stalwart Mail Server v0.8.0. As always, we look forward to your feedback, which is crucial in helping us continue to improve and evolve our product to better serve you.

 我們誠摯邀請您下載並體驗 Stalwart Mail Server v0.8.0的全新功能。一如既往，我們期待您的回饋，這對於我們不斷改進和完善產品，更好地為您服務至關重要。

**Tags:**

**標籤：**

- [clustering](https://stalw.art/blog/tags/clustering/)
[聚類](https://stalw.art/blog/tags/clustering/)
- [high](https://stalw.art/blog/tags/high/)
[高](https://stalw.art/blog/tags/high/)
- [availability](https://stalw.art/blog/tags/availability/)
[可用性](https://stalw.art/blog/tags/availability/)
- [load](https://stalw.art/blog/tags/load/)
[加載](https://stalw.art/blog/tags/load/)
- [balancing](https://stalw.art/blog/tags/balancing/)
[平衡](https://stalw.art/blog/tags/balancing/)
- [mail](https://stalw.art/blog/tags/mail/)
[郵件](https://stalw.art/blog/tags/mail/)
- [server](https://stalw.art/blog/tags/server/)
[伺服器](https://stalw.art/blog/tags/server/)
Addressing the Overlooked DKIM Exploit in Stalwart Mail Server
 解決 Stalwart 郵件伺服器中被忽略的DKIM漏洞

 Introducing DNS-01 and HTTP-01 ACME Challenges

 介紹DNS -01 和HTTP -01 ACME挑戰

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Building E-mail messages in Rust｜使用 Rust 建立電子郵件　｜　下一篇：Introducing Calendars, Contacts and Files in Stalwart｜Stalwart 引入日曆、聯絡人和文件功能 ➡
