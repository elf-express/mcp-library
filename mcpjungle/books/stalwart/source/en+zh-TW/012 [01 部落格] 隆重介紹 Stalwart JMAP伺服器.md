---

## title: "Announcing Stalwart JMAP server｜隆重介紹 Stalwart JMAP伺服器"

 title\_original: "Announcing Stalwart JMAP server"
source: "[https://stalw.art/blog/announcing-stalwart-jmap](https://stalw.art/blog/announcing-stalwart-jmap)"
chapter: \["blog"\]
order: 12
lang: "bilingual"
translated\_by: "google\_v2"
captured: "2026-10-05T01:00:19.267Z"

 ⬆ 目錄　｜　⬅ 上一篇：Announcing Stalwart Mail Server unified, efficient, and more powerful than ever\!｜隆重介紹 Stalwart 郵件伺服器，統一、有效率、功能更強大！　｜　下一篇：Announcing Stalwart SMTP with DMARC, DANE, MTA-STS support｜隆重介紹 Stalwart SMTP ，並支援DMARC, DANE, MTA-STS ➡

# Announcing Stalwart JMAP server｜隆重介紹 Stalwart JMAP伺服器

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

Sep 20, 2022 - 1 min read

 2022年9月20日 - 閱讀時間：1分鐘

 \[![Mauro D.](assets/selected_539_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

 Some of its key features are:

 它的一些主要特點包括：

- JMAP Core, JMAP Mail and JMAP over WebSocket full compliance.
JMAP Core、 JMAP Mail 和JMAP透過 WebSocket 完全相容。
- IMAP4 rev2/1 support via [Stalwart IMAP](https://github.com/stalwartlabs/imap-server), an imap-to-jmap proxy.
IMAP4 rev2/1 支援透過 [Stalwart IMAP](https://github.com/stalwartlabs/imap-server) ，一個 imap 到 jmap 的代理。
- Scalable and fault tolerant: consensus over Raft, node autodiscovery over gossip and read-only replicas.
可擴展且容錯：基於 Raft 的共識機制、基於 gossip 的節點自動發現機制以及唯讀副本。
- RocksDB backend with full-text search support in 17 languages.
RocksDB 後端支援 17 種語言的全文搜尋。
- OAuth 2.0 authorization code and device authorization flows.
OAuth 2.0授權碼和設備授權流程。
- Domain Keys Identified Mail \(DKIM\) message signing.
已識別的網域金鑰郵件（ DKIM ）訊息簽署。
- Written in Rust.
用 Rust 編寫。
- No third-party software required to run or scale.
運行或擴充無需第三方軟體。
Currently Stalwart JMAP requires an SMTP server such as Postfix in order to receive e-mails. However, the next item on the roadmap is to release an SMTP server in Rust with the goal of making self-hosting an e-mail server much simpler without sacrificing any security.
 目前，Stalwart JMAP需要 Postfix 等SMTP伺服器才能接收電子郵件。然而，下一步計畫是用 Rust 編寫SMTP伺服器，目標是在不犧牲任何安全性的前提下，大幅簡化自託管電子郵件伺服器的操作。

**Tags:**

**標籤：**

- [jmap](https://stalw.art/blog/tags/jmap/)
[jmap](https://stalw.art/blog/tags/jmap/)
- [email](https://stalw.art/blog/tags/email/)
[電子郵件](https://stalw.art/blog/tags/email/)
- [rust](https://stalw.art/blog/tags/rust/)
[休息](https://stalw.art/blog/tags/rust/)
- [server](https://stalw.art/blog/tags/server/)
[伺服器](https://stalw.art/blog/tags/server/)
Sieve filter interpreter for Rust
 Rust 的 Sieve 過濾器解釋器

 Sending DKIM signed e-mail messages over SMTP in Rust

 使用 Rust 透過SMTP發送DKIM簽名電子郵件

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Announcing Stalwart Mail Server unified, efficient, and more powerful than ever\!｜隆重介紹 Stalwart 郵件伺服器，統一、有效率、功能更強大！　｜　下一篇：Announcing Stalwart SMTP with DMARC, DANE, MTA-STS support｜隆重介紹 Stalwart SMTP ，並支援DMARC, DANE, MTA-STS ➡
