---

## title: "Security at the Core Stalwart completes Second Security Audit｜安全至上：Stalwart 完成第二次安全審計"

 title\_original: "Security at the Core Stalwart completes Second Security Audit"
source: "[https://stalw.art/blog/security-audit-2025](https://stalw.art/blog/security-audit-2025)"
chapter: \["blog"\]
order: 44
lang: "bilingual"
translated\_by: "google\_v2"
captured: "2026-10-05T01:03:25.230Z"

 ⬆ 目錄　｜　⬅ 上一篇：The Future of Stalwart Webmail, Roadmap, and Beyond｜Stalwart Webmail 的未來、路線圖及其他　｜　下一篇：Stalwart Mail Server passes Security Audit｜堅固郵件伺服器通過安全審計 ➡

# Security at the Core Stalwart completes Second Security Audit｜安全至上：Stalwart 完成第二次安全審計

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

## Security at the Core: Stalwart completes Second Security Audit｜安全至上：Stalwart完成第二次安全審計

 Oct 7, 2025 - 3 min read

 2025年10月7日 - 閱讀時間：3分鐘

 \[![Mauro D.](assets/selected_353_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

## Comprehensive Assessment｜綜合評估

 The audit, conducted between **September 9 and September 25, 2025, focused on version**v0.13.2 of Stalwart mail and collaboration server. The goal was clear: rigorously evaluate the security posture of the platform, identify potential vulnerabilities, and ensure our defenses are as strong as possible.

 本審計於**2025年9月9日至9月25日**期間進行，重點在於針對Stalwart郵件和協作伺服器的**v0.13.2**版本。目標明確：嚴格評估平台的安全狀況，識別潛在漏洞，並確保我們的防禦措施盡可能強大。

 The penetration test followed a “crystal-box” methodology, combining source code review with targeted exploitation attempts. This included testing against the latest [OWASP Top 10](https://owasp.org/) risks, analyzing protocol implementations, and probing external interfaces — the most exposed and therefore most critical components of the system.

 滲透測試採用「水晶盒」方法，結合原始碼審查和有針對性的攻擊嘗試。這包括針對最新的[OWASP Top 10](https://owasp.org/)風險進行測試、分析協議實現以及探測外部介面——這些是系統中暴露程度最高、因而也是最關鍵的組件。

## Findings｜發現

 The audit uncovered a total of **seven security issues:**two high-severity vulnerabilities**and**five low-severity issues. All but one minor issue were promptly addressed.

 審計共發現**七項安全問題：**兩項高危險漏洞**和**五項低危險問題。除一項輕微問題外，其餘問題均已及時解決。

 The most significant findings involved **Denial-of-Service \(DoS\) vulnerabilities**:

 最重要的發現涉及**拒絕服務 \(DoS\) 漏洞**：

- **CVE-2025-59045 — Memory Exhaustion via CalDAV REPORT**: A crafted CalDAV request could trigger unbounded memory usage, potentially crashing the server.
**CVE -2025-59045 — 透過 CalDAV 耗盡記憶體REPORT**：精心建構的 CalDAV 請求可能會觸發無限制的記憶體使用，可能會導致伺服器崩潰。
- **CVE-2025-61600 — Unbounded Buffer Growth in IMAP Parser**: A flaw in the IMAP protocol parser could allow an attacker — even without authentication — to cause memory exhaustion.
**CVE -2025-61600 — IMAP解析器中的無限緩衝區增長**： IMAP協定解析器中的一個缺陷可能允許攻擊者（即使沒有身份驗證）導致記憶體耗盡。
Both of these high-severity vulnerabilities were resolved **within four hours of disclosure**, underscoring our team’s rapid response capability and deep focus on platform resilience. Patches were released in versions [v0.13.3](https://github.com/stalwartlabs/stalwart/releases/tag/v0.13.3) and [v0.13.4](https://github.com/stalwartlabs/stalwart/releases/tag/v0.13.4), and the issues have been assigned [CVE-2025-59045](https://github.com/stalwartlabs/stalwart/security/advisories/GHSA-xv4r-q6gr-6pfg) and [CVE-2025-61600](https://github.com/stalwartlabs/stalwart/security/advisories/GHSA-8jqj-qj5p-v5rr), respectively.
 這兩個高危險漏洞均在揭露後**四小時內**得到解決，凸顯了我們團隊的快速反應能力和對平台彈性的高度重視。補丁已在版本\[ \]中發布。v0.13.3\]\([https://github.com/stalwartlabs/stalwart/releases/tag/v0.13.3](https://github.com/stalwartlabs/stalwart/releases/tag/v0.13.3)\) 和 [v0.13.4](https://github.com/stalwartlabs/stalwart/releases/tag/v0.13.4)並且這些問題已被分配[CVE-2025-59045](https://github.com/stalwartlabs/stalwart/security/advisories/GHSA-xv4r-q6gr-6pfg) 和 [CVE-2025-61600](https://github.com/stalwartlabs/stalwart/security/advisories/GHSA-8jqj-qj5p-v5rr)， 分別。

 Among the lower-severity findings were issues related to RFC compliance in email parsing, permission checks, and quota enforcement. These were addressed swiftly as well, with most fixes included in [v0.13.4](https://github.com/stalwartlabs/stalwart/releases/tag/v0.13.4). One low-severity race condition related to disk quotas \(TOCTOU\) remains partially mitigated; however, its practical impact is limited due to built-in concurrency controls.

 在一些低嚴重性問題中，包括與電子郵件解析、權限檢查和配額執行相關的RFC合規性問題。這些問題也得到了迅速解決，大部分修復已包含在[v0.13.4](https://github.com/stalwartlabs/stalwart/releases/tag/v0.13.4)中。一個與​​磁碟配額相關的低嚴重性競爭條件（ TOCTOU ）仍部分得到緩解；然而，由於內建的並發控制機制，其實際影響有限。

 For those who would like a deep dive into the audit’s findings, the full report is accessible [here](https://stalw.art/blog/ros-report.pdf).

 對於想要深入了解審計結果的人來說，完整的報告可在此處存取\([https://stalw.art/blog/ros-report.pdf](https://stalw.art/blog/ros-report.pdf)\) 。

## Our Commitment to Security｜我們對安全的承諾

 The final report praised Stalwart’s codebase as **robust, well-architected, and cleanly compartmentalized**, with memory safety ensured by Rust and attacker-aware design principles evident throughout. At the same time, the audit highlighted that our “build everything in-house” philosophy — while a strength — requires careful attention to detail, particularly in protocol parsing and input handling.

 最終報告稱讚 Stalwart 的程式碼庫**穩健、架構良好且程式碼模組化**，Rust 確保了記憶體安全，貫穿始終的防攻擊者設計原則也得到了充分體現。同時，審計報告也強調，我們「所有功能自主開發」的理念——雖然是一項優勢——但也需要我們格外注重細節，尤其是在協議解析和輸入處理方面。

 Security is never a one-time checkbox — it’s an ongoing process. That’s why regular audits like this one are an integral part of how we develop Stalwart. As our platform evolves, so does our approach to safeguarding it.

 安全絕非一勞永逸，而是持續的過程。正因如此，像這樣的定期審計是我們開發 Stalwart 平台不可或缺的一部分。隨著平台的不斷發展，我們的安全防護措施也不斷改進。

 We’re proud of how quickly and effectively our team responded to the findings of this audit, and we remain committed to maintaining transparency and trust with our users and the broader open-source community.

 我們為團隊能夠如此迅速有效地應對此次審計結果而感到自豪，我們將繼續致力於維護與用戶和更廣泛的開源社群之間的透明度和信任。

**Tags:**

**標籤：**

- [security](https://stalw.art/blog/tags/security/)
[安全](https://stalw.art/blog/tags/security/)
- [audit](https://stalw.art/blog/tags/audit/)
[審計](https://stalw.art/blog/tags/audit/)
- [penetration](https://stalw.art/blog/tags/penetration/)
[滲透](https://stalw.art/blog/tags/penetration/)
- [test](https://stalw.art/blog/tags/test/)
[測試](https://stalw.art/blog/tags/test/)
JMAP for Calendars, Contacts and Files now in Stalwart
 JMAP日曆、聯絡人和文件現已加入 Stalwart 系統

 Stalwart Joins GitHub's Open Source Secure Fund

 Stalwart 加入 GitHub 開源安全基金

 ---

 ⬆ 目錄　｜　⬅ 上一篇：The Future of Stalwart Webmail, Roadmap, and Beyond｜Stalwart Webmail 的未來、路線圖及其他　｜　下一篇：Stalwart Mail Server passes Security Audit｜堅固郵件伺服器通過安全審計 ➡
