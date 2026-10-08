---

## title: "MTA Hooks at the IETF｜MTA鉤子位於IETF"

 title\_original: "MTA Hooks at the IETF"
source: "[https://stalw.art/blog/mta-hooks-ietf](https://stalw.art/blog/mta-hooks-ietf)"
chapter: \["blog"\]
order: 32
lang: "bilingual"
translated\_by: "google\_v2+gtx"
captured: "2026-10-05T01:03:02.670Z"

 ⬆ 目錄　｜　⬅ 上一篇：Introducing Milter Support to Stalwart SMTP｜為 Stalwart SMTP引入 Milter 支持　｜　下一篇：Unlock Multi-Tenancy, Branding, and Fine-Grained Control｜解鎖多租戶、品牌化和精細化控制 ➡

# MTA Hooks at the IETF｜MTA鉤子位於IETF

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

May 21, 2026 - 7 min read

 2026年5月21日 - 閱讀需時7分鐘

 \[![Mauro D.](assets/selected_559_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

### What is MTA Hooks｜什麼是MTA鉤子

 If you have been running Stalwart for a while you have probably already met MTA Hooks. We introduced it in version 0.8.2, alongside Webhooks, as part of our broader effort to make Stalwart’s filtering and observability layer feel like the rest of modern infrastructure rather than like 1998.

 如果您已經使用 Stalwart 一段時間了，您可能已經接觸過MTA Hooks。我們在0.8.2版本中引入了它 ，與 Webhooks 一起，作為我們更廣泛的努力的一部分，旨在使 Stalwart 的過濾和可觀測性層感覺像現代基礎設施的其他部分，而不是像 1998 年的。

 MTA Hooks is an HTTP-based protocol that lets a mail server delegate per-stage decisions to external services. At each SMTP stage \(connect, ehlo, mail, rcpt, data on the inbound side; delivery, defer, and DSN on the outbound side\), the MTA sends an HTTP POST to a registered scanner. The scanner gets the envelope, the parsed message, the raw message, authentication results, TLS state and connection context, and replies with an action \(accept, reject, quarantine, and so on\) plus optional modifications expressed as JSON Pointer patches. Multiple scanners can be chained. Serialization is JSON or CBOR. Everything is just HTTP over TLS with a documented schema, which means any language with an HTTP library can implement either side without a binary protocol parser in sight.

 MTA Hooks 是一個基於HTTP協議，它允許郵件伺服器將每個階段的決策委託給外部服務。在每個SMTP階段（入站端的連接、ehlo、郵件、rcpt、資料；出站端的投遞、延遲和DSN ）， MTA會向已註冊的掃描器發送HTTP POST 。掃描器會收到信封、已解析的郵件、原始郵件、驗證結果、 TLS狀態和連接上下文，並回覆一個操作（接受、拒絕、隔離等等），以及以JSON指針補丁形式表示的可選修改。可以連結多個掃描器。序列化方式為JSON或CBOR 。一切都只是HTTP在TLS之上，並有文檔化的模式，這意味著任何具有HTTP庫的語言都可以實現任一端，而無需二進制協議解析器。

### Why it was built｜建造原因

 Most mail filtering today still rides on Milter, the protocol Sendmail introduced around the year 2000. Milter does its job, but it carries a number of design choices that have aged poorly. There is no formal specification: the protocol is defined by `libmilter`, a C library whose wire semantics are documented only by reading the source. The two MTAs that support Milter \(Sendmail and Postfix\) have behaviourally divergent implementations, so a filter that works against one cannot always be relied on to behave identically against the other. Milter has no concept of outbound or post-delivery hooks, which means an entire category of use cases \(delivery logging, compliance, DSN policy\) sits outside its scope. And because the protocol is binary and C-centric, implementing a Milter filter in Go, Rust, Python, or whatever language your team actually uses is more painful than it should be in 2026.

 如今大多數郵件過濾仍然依賴 Milter 協議，這是 Sendmail 在 2000 年左右推出的協議。 Milter 的確能夠完成過濾工作，但它的一些設計選擇已經過時。它沒有正式的規範：該協定由`libmilter`定義，這是一個 C 語言庫，其網路語義只能透過閱讀原始碼來了解。支援 Milter 的兩個郵件傳輸代理程式（MTA）（Sendmail 和 Postfix）在行為上存在差異，因此針對其中一個有效的過濾器並不總是保證對另一個也同樣有效。 Milter 沒有出站或投遞後鉤子的概念，這意味著一整類用例（投遞日誌記錄、合規性、 DSN策略）都超出了它的適用範圍。而且由於該協議是二進制的，並且以 C 語言為中心，因此在 2026 年，用 Go、Rust、Python 或團隊實際使用的任何語言來實現 Milter 過濾器都比預期要困難得多。

 MTA Hooks addresses these specifically. It has a written specification. It covers the full SMTP lifecycle, inbound and outbound. It speaks HTTP, so every HTTP load balancer, reverse proxy, observability stack, and auth middleware you already run works out of the box. It has explicit capability negotiation, so a scanner that does not understand a new stage simply will not subscribe to it, and the MTA and the scanner can evolve independently without breaking each other.

 MTA Hooks 專門針對這些問題。它有書面規範，涵蓋完整的SMTP生命週期，包括入站和出站。它支援HTTP ，因此您已運行的每個HTTP負載平衡器、反向代理、可觀測性堆疊和身份驗證中間件都能開箱即用。它具有明確的功能協商機制，因此無法理解新階段的掃描器將不會訂閱該階段， MTA和掃描器可以獨立演進而不會相互幹擾。

### Why standardization matters｜標準化為何重要

 We could have kept MTA Hooks as a Stalwart-only feature and called it done. We deliberately did not, for two reasons.

 我們本來可以把MTA Hooks當作Stalwart專屬功能，然後就此完工。但我們故意不這樣做，原因有二。

 The first reason is that a protocol that only one mail server speaks is not a protocol, it is an API. If you want filter authors to invest real engineering effort into supporting it, they need confidence that the wire format will not shift under them at our convenience, and that other mail servers will speak it too. Standardization is how you give them that confidence.

 首先，如果一個協議只有一家郵件伺服器支持，那它就不是真正的協議，而是API 。如果你想讓過濾器開發者投入真正的工程精力來支援它，他們需要確信網路傳輸格式不會因為我們的便利而改變，而其他郵件伺服器也會支援它。標準化正是讓他們獲得這種信心的途徑。

 The second reason is the larger one. Email filtering is critical infrastructure for the internet. The mechanism by which a substantial fraction of the world’s mail gets inspected for spam, viruses, and policy violations should not be controlled by a single vendor’s source tree, no matter how friendly the vendor. The right home for a protocol of this scope is an open standards body, and for internet protocols the open standards body that matters is the IETF.

 第二個原因更為重要。電子郵件過濾是網際網路的關鍵基礎設施。全球相當大一部分郵件都透過此機制進行垃圾郵件、病毒和違規檢測，而此機制不應由單一供應商的原始碼控制，無論該供應商多麼友善。如此規模的協定應該由開放標準組織來管理，而對於網際網路協定而言，最重要的開放標準組織是IETF 。

 Standardization also forces a kind of rigour that internal development simply does not. Every assumption gets challenged, every edge case gets named, every security consideration gets cross-examined by people whose job is to find the corner you missed. The current draft is already noticeably better than what we shipped, precisely because reviewers have pushed back on parts we had taken for granted.

 標準化也帶來了一種內部開發所無法企及的嚴謹性。每一個假設都會受到質疑，每一個極端情況都會被明確指出，每一個安全考量都會被那些專門負責找出你疏漏之處的人員反覆審查。目前的草案已經明顯優於我們發布的版本，正是因為審閱者對我們之前想當然的部分提出了質疑。

### How the IETF actually works, briefly｜IETF工作原理簡述

 If you have never been near the IETF, the process is shorter to describe than it looks. Someone writes an Internet-Draft, a versioned document describing a proposed protocol. Drafts are individual submissions until a Working Group adopts them, at which point they become Working Group documents. The WG iterates on the document in public, on a mailing list and in meetings, until it reaches consensus. At that point the draft enters Working Group Last Call, then goes to the Internet Engineering Steering Group, and if approved becomes an RFC on the Standards Track.

 如果您從未接近IETF，那麼描述的過程比看起來要短。有人編寫了一份網路草案，這是一份描述擬議協議的版本化文件。草案是個人提交的材料，直到工作小組通過它們為止，它們成為工作小組文件。 WG 在公開場合、郵件列表和會議中迭代該文檔，直到達成共識。屆時，草案將進入工作小組最後決定，然後進入互聯網工程指導小組，如果獲得批准，將成為標準軌道上的RFC。

 For a Working Group to be chartered, the IETF needs to see two things: a clear problem that justifies dedicated effort, and a community of people prepared to actually do the work and use the result. This is established through a Birds of a Feather session, universally abbreviated to BOF. A BOF is a one-time meeting at an IETF where the proponents make the case for the work and the room either does or does not show enough interest to justify forming a Working Group. You get one BOF. If it does not go well, the work does not die exactly, but it loses a substantial amount of momentum and may take a long time to recover.

 對於要成立的工作小組，IETF 需要看到兩件事：一個證明專門努力是合理的明確問題，以及一個準備實際開展工作並使用結果的人員社區。這是透過「物以類聚」會議建立的，普遍縮寫為BOF。 BOF 是IETF 的一次性會議，支持者在會中闡述工作的理由，會議成員是否表現出足夠的興趣來證明組成工作小組的合理性。你得到一個BOF。如果進展不順利，作品並不會完全消亡，但會失去大量動力，可能需要很長時間才能恢復。

### Where MTA Hooks is right now｜MTA鉤子現在在哪裡

 The current draft is [draft-degennaro-mta-hooks-01](https://datatracker.ietf.org/doc/draft-degennaro-mta-hooks/). It has been presented twice at IETF meetings: at MAILMAINT at IETF 123 in Madrid, and at DISPATCH at IETF 125. Both sessions encouraged us to proceed toward a BOF. We have submitted the BOF request, and the responsible Area Director has asked us, very reasonably, to spend the time before the BOF building visible community engagement and a worked-out Working Group charter.

 目前的草案是 [draft-degennaro-mta-hooks-01](https://datatracker.ietf.org/doc/draft-degennaro-mta-hooks/) 。它已在IETF會議上兩次提出：一次是在馬德里舉行的IETF 123 號 MAILMAINT 會議上，另一次是在DISPATCH 125 號IETF會議上。這兩次會議都鼓勵我們繼續推進BOF製定。我們已提交BOF請求，負責的區域主管非常合理地要求我們在BOF會議之前，利用這段時間建立可見的社區參與度，並製定一份完善的工作小組章程。

 To support that, a dedicated mailing list now exists for the work:

 為了支持這項工作，現在已建立了一個專門的郵件清單：

- **List**: [\\[email protected\\]](https://stalw.art/cdn-cgi/l/email-protection#9bf6effaf3f4f4f0e8dbf2feeffdb5f4e9fc)
**列表**: [\\[email protected\\]](https://stalw.art/cdn-cgi/l/email-protection#9bf6effaf3f4f4f0e8dbf2feeffdb5f4e9fc)
- **Subscribe**: [https://mailman3.ietf.org/mailman3/lists/mtahooks.ietf.org/](https://mailman3.ietf.org/mailman3/lists/mtahooks.ietf.org/)
**訂閱**：[https://mailman3.ietf.org/mailman3/lists/mtahooks.ietf.org/](https://mailman3.ietf.org/mailman3/lists/mtahooks.ietf.org/)
On the ecosystem side, [Rspamd](https://rspamd.com/) plans to implement MTA Hooks support on the scanner side. [Fastmail](https://fastmail.com/) and [Heinlein](https://heinlein-support.de/) are also involved in the proposal. And of course MTA Hooks is in production today in every Stalwart deployment that uses it.
 在生態系方面，[Rspamd](https://rspamd.com/)計畫在掃描器端實作MTA Hooks 支援。 [Fastmail](https://fastmail.com/)和 [Heinlein](https://heinlein-support.de/)也參與了此提案。當然， MTA Hooks 目前已在所有使用 Stalwart 的部署中投入生產。

### How you can help｜您可以如何提供協助

 The single most useful thing a Stalwart user can do right now is post to the mailing list. Not a long technical review, not a polished position paper, just a short message saying that you exist, that you are interested in MTA Hooks becoming a standard, and \(if applicable\) a sentence or two about how you use it or plan to use it. That kind of post takes five minutes to write and is worth a surprising amount when the IETF is deciding whether to charter a Working Group. The IESG and the chairs look very hard at who is going to use the result; visible, named interest from real operators and real integrators is the most persuasive signal there is.

 Stalwart 用戶現在可以做的最有用的事情就是發佈到郵件清單。不是一篇冗長的技術評論，不是精心設計的立場文件，只是一條簡短的訊息，表明您的存在，您對 MTA Hooks 成為標準感興趣，以及（如果適用）一兩句話關於您如何使用它或計劃使用它。寫這樣的貼文需要五分鐘，當IETF決定是否要組成一個工作小組時，其價值是驚人的。 IESG 和椅子們非常努力地關注誰將使用結果；來自真實運營商和真實集成商的可見的、有名的興趣是最有說服力的信號。

 You do not need to be an IETF regular. You do not need to have read the entire 60-page draft. You do not need to have an opinion on every design decision. If you read this far and the idea of an open standard for MTA filtering matters to you, even passively, please join the list and say so. If you have time to read the draft and push back on anything in it, even better, but the bar for being useful is low and the impact is real.

 您無需成為IETF常客。您無需閱讀完整60頁的草案。您無需對每個設計決策都發表意見。如果您讀到這裡，並且對MTA過濾的開放標準感興趣（即使只是略有關注），也請加入郵件列表並表達您的意願。如果您有時間閱讀草稿並提出任何意見，那就更好了，但即便如此，您的貢獻也無需過分苛刻，而且其影響是實實在在的。

### What is next｜接下來會發生什麼事？

 The proximate milestone is the BOF, currently targeting IETF 126 if charter discussion converges in time, with a virtual interim BOF as the fallback. Between now and then, the work happens on the mailing list: refining the charter, gathering implementation reports, and addressing reviewer comments on the draft. If the BOF goes well, a Working Group gets chartered, the draft becomes a WG document, and the path to an RFC opens up.

 近期里程碑是BOF ，目前目標是IETF 126（如果章程討論能夠及時達成一致），並以虛擬的過渡版本BOF作為備選方案。在此之前，工作主要在郵件清單中進行：完善章程、收集實施報告並處理審閱者對草案的意見。如果BOF進展順利，將成立一個工作小組，草案將成為WG文件，並開啟通往RFC的道路。

 If it goes really well, the next time we write a blog post about MTA Hooks, we will be linking to an RFC number rather than a draft number. That is the goal. We would like as many of you as possible to be part of getting there.

 如果進展順利，下次我們寫關於MTA鉤子的部落格文章時，我們會連結到RFC正式版本，而不是草稿版本。這就是我們的目標。我們希望盡可能多的人參與實現這個目標的過程。

 See you on the list.

 名單上見。

**Tags:**

**標籤：**

- [mta-hooks](https://stalw.art/blog/tags/mta-hooks/)
[mta-hooks](https://stalw.art/blog/tags/mta-hooks/)
- [ietf](https://stalw.art/blog/tags/ietf/)
[ietf](https://stalw.art/blog/tags/ietf/)
- [standards](https://stalw.art/blog/tags/standards/)
[標準](https://stalw.art/blog/tags/standards/)
- [milter](https://stalw.art/blog/tags/milter/)
[軍事](https://stalw.art/blog/tags/milter/)
- [smtp](https://stalw.art/blog/tags/smtp/)
[smtp](https://stalw.art/blog/tags/smtp/)
- [mail](https://stalw.art/blog/tags/mail/)
[電子郵件](https://stalw.art/blog/tags/mail/)
- [server](https://stalw.art/blog/tags/server/)
[伺服器](https://stalw.art/blog/tags/server/)
Vandelay: the JMAP importer-exporter
 Vandelay： JMAP進出口商

 Introducing the Stalwart Support Portal

 隆重介紹 Stalwart 支援入口網站

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Introducing Milter Support to Stalwart SMTP｜為 Stalwart SMTP引入 Milter 支持　｜　下一篇：Unlock Multi-Tenancy, Branding, and Fine-Grained Control｜解鎖多租戶、品牌化和精細化控制 ➡
