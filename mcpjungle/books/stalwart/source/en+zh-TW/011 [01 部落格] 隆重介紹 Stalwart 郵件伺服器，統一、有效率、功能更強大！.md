---

## title: "Announcing Stalwart Mail Server unified, efficient, and more powerful than ever\!｜隆重介紹 Stalwart 郵件伺服器，統一、有效率、功能更強大！"

 title\_original: "Announcing Stalwart Mail Server unified, efficient, and more powerful than ever\!"
source: "[https://stalw.art/blog/announcing-mail-server](https://stalw.art/blog/announcing-mail-server)"
chapter: \["blog"\]
order: 11
lang: "bilingual"
translated\_by: "google\_v2+gtx"
captured: "2026-10-05T01:00:18.250Z"

 ⬆ 目錄　｜　⬅ 上一篇：Boost Your Insights with Advanced Telemetry｜利用進階遙測技術提升您的洞察力　｜　下一篇：Announcing Stalwart JMAP server｜隆重介紹 Stalwart JMAP伺服器 ➡

# Announcing Stalwart Mail Server unified, efficient, and more powerful than ever\!｜隆重介紹 Stalwart 郵件伺服器，統一、有效率、功能更強大！

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

## Announcing Stalwart Mail Server: unified, efficient, and more powerful than ever\!｜隆重推出 Stalwart 郵件伺服器：統一、高效、功能更強大！

 Jul 17, 2023 - 2 min read

 2023年7月17日 - 閱讀時間：2分鐘

 \[![Mauro D.](assets/selected_538_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

 Here are some of the exciting new features:

 以下是一些令人興奮的新功能：

- **LDAP**and**SQL** authentication support was added, giving you more flexibility and options to integrate Stalwart with your existing infrastructure.
**LDAP**和**SQL** 身份驗證支援已添加，為您提供了更多靈活性和選擇，可將 Stalwart 與您現有的基礎架構整合。

- We’ve incorporated support for **disk quotas** to provide better control over your storage resources.
我們加入了對**磁碟配額**的支持，以便更好地控制您的儲存資源。
- **Subaddressing**and**catch-all** addresses are now supported. These features make the email handling process more flexible and efficient.
現在支援 **子尋址**和**catch-all** 位址。這些功能使電子郵件處理過程更加靈活和有效率。
- Storage options have been extended with the inclusion of **S3-compatible storage**. Now you can store your emails and blobs using reliable and scalable solutions such as MinIO, Amazon S3, or Google Cloud Storage.
儲存選項已擴展，新增了**S3相容儲存**。現在，您可以使用可靠且可擴展的解決方案（例如MinIO、Amazon S3或Google Cloud Storage）來儲存電子郵件和資料區塊。
- In response to user feedback, we’ve replaced RocksDB with **SQLite**. Our community told us they wanted an open, trusted database technology with easier access to their data, and we listened\!
根據使用者回饋，我們已將 RocksDB 替換為 **SQLite**。我們的社群告訴我們，他們想要一種開放、值得信賴的資料庫技術，並且能夠更輕鬆地存取他們的數據，我們聽取了他們的意見！
- For those operating in distributed environments, you can now opt for the **FoundationDB** backend, supporting millions of users without sacrificing performance.
對於在分散式環境中運行的用戶，現在可以選擇 **FoundationDB** 後端，它支援數百萬用戶，而不會犧牲效能。
- Stalwart IMAP is no longer an IMAP-to-JMAP proxy, instead, it now provides direct access to the message store. This significant change has brought a tremendous improvement in performance, reducing latency, and making your mail operations faster than ever.
Stalwart IMAP不再是IMAP到JMAP代理，而是直接存取郵件儲存。這項重大改變顯著提升了效能，降低了延遲，使您的郵件操作比以往任何時候都更快捷。
- We’ve also made significant strides in enhancing performance by rewriting the JMAP protocol parser and the storage API.
我們也透過重寫JMAP協定解析器和儲存API來顯著提高效能。
- Lastly, we’ve made the decision to switch from Actix Web Server to Hyper. This change has allowed us to reduce memory footprint and increase performance, resulting in a more optimized and efficient mail server.
最後，我們決定將伺服器從 Actix Web Server 切換到 Hyper。這項改變使我們能夠減少記憶體佔用並提高效能，從而打造出更優化、更有效率的郵件伺服器。
With Stalwart Mail Server, we’re delivering a more unified, powerful, and efficient solution that meets your growing email infrastructure needs. We’re excited to see how you’ll leverage these new capabilities, and as always, we’re here to support you every step of the way\!
 Stalwart Mail Server 為您提供了一個更統一、更強大、更有效率的解決方案，能夠滿足您不斷成長的電子郵件基礎架構需求。我們非常期待看到您如何利用這些新功能，並且一如既往，我們將全程為您提供支援！

**Tags:**

**標籤：**

- [mail](https://stalw.art/blog/tags/mail/)
[電子郵件](https://stalw.art/blog/tags/mail/)
- [server](https://stalw.art/blog/tags/server/)
[伺服器](https://stalw.art/blog/tags/server/)
- [jmap](https://stalw.art/blog/tags/jmap/)
[jmap](https://stalw.art/blog/tags/jmap/)
- [imap](https://stalw.art/blog/tags/imap/)
[imap](https://stalw.art/blog/tags/imap/)
- [smtp](https://stalw.art/blog/tags/smtp/)
[smtp](https://stalw.art/blog/tags/smtp/)
Introducing Milter Support to Stalwart SMTP
 為 Stalwart 引入 Milter 支持SMTP

 Stalwart Mail Server is awarded a grant from NLnet NGI0 Entrust Fund

 Stalwart Mail Server 獲得 NLnet NGI0 Entrust Fund 的資助

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Boost Your Insights with Advanced Telemetry｜利用進階遙測技術提升您的洞察力　｜　下一篇：Announcing Stalwart JMAP server｜隆重介紹 Stalwart JMAP伺服器 ➡
