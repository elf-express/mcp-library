---

## title: "Stalwart Joins GitHub's Open Source Secure Fund｜Stalwart 加入 GitHub 開源安全基金"

 title\_original: "Stalwart Joins GitHub's Open Source Secure Fund"
source: "[https://stalw.art/blog/github-ossf](https://stalw.art/blog/github-ossf)"
chapter: \["blog"\]
order: 24
lang: "bilingual"
translated\_by: "google\_v2"
captured: "2026-10-05T01:02:51.476Z"

 ⬆ 目錄　｜　⬅ 上一篇：Increase your mail server security with Fail2ban｜使用 Fail2ban 提升您的郵件伺服器安全性　｜　下一篇：How we use AI at Stalwart｜我們在 Stalwart 如何使用AI ➡

# Stalwart Joins GitHub's Open Source Secure Fund｜Stalwart 加入 GitHub 開源安全基金

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

Aug 11, 2025 - 6 min read

 2025年8月11日 - 閱讀時間：6分鐘

 \[![Mauro D.](assets/selected_551_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

## About GitHub’s OSSF｜關於 GitHub 的OSSF

 GitHub launched the [Open Source Secure Fund](https://resources.github.com/github-secure-open-source-fund/) in November 2024 as a comprehensive initiative to strengthen security across the software supply chain. The program represents a strategic approach to open source security that goes far beyond simple financial support. Instead of merely providing funding, the initiative creates a structured pathway for maintainers to develop deep security expertise while building lasting connections within a community of security-focused developers.

 GitHub 於 2024 年 11 月啟動了 [開源安全基金](https://resources.github.com/github-secure-open-source-fund/)這是一項旨在加強整個軟體供應鏈安全性的綜合性計畫。該計劃代表了一種超越簡單資金支持的開源安全戰略。它不僅提供資金，還為維護者創建了一條結構化的路徑，幫助他們發展深厚的安全專業知識，並在專注於安全的開發者社群中建立持久的聯繫。

 The fund operates on a model that combines immediate intensive training with long-term support and accountability. Each session consists of a three-week sprint, delivered by security experts from GitHub and their partners through the GitHub Security Lab. However, the relationship extends far beyond these initial weeks, with participants receiving ongoing support and resources throughout a full twelve-month engagement period.

 該基金採用的模式是將即時強化培訓與長期支持和問責機制結合。每個培訓課程為期三週，由 GitHub 及其合作夥伴的安全專家透過 GitHub 安全實驗室進行授課。然而，這種合作關係遠不止於最初的幾週，參與者將在為期十二個月的整個參與期內持續獲得支持和資源。

 What makes this program particularly valuable is its emphasis on community building and ongoing support. Participants gain access to a specialized security-focused community and regular office hours with the GitHub Security Lab throughout the entire twelve-month period. This extended engagement ensures that the security improvements initiated during the sprint continue to evolve and mature over time.

 該計畫最寶貴之處在於其對社區建設和持續支持的重視。參與者可以加入一個專注於安全領域的專業社區，並在整個十二個月期間定期獲得 GitHub 安全實驗室的線上支援。這種長期的參與確保了在專案初期啟動的安全改進能夠隨著時間的推移而不斷發展和改進。

## Our Experience｜我們的經驗

 The training component of our participation concluded six weeks ago, and we can confidently say it provided valuable insights that have already begun to shape Stalwart’s security posture. The comprehensive nature of the program allowed us to step back and evaluate our security practices from multiple perspectives, leading to concrete improvements in our security infrastructure.

 我們參與的培訓部分已於六週前結束，我們可以自信地說，它為我們提供了寶貴的見解，這些見解已經開始影響Stalwart的安全態勢。此專案的全面性使我們能夠從多個角度審視自身的安全實踐，從而切實改善了我們的安全基礎設施。

 One of the most significant outcomes of our participation has been the development of a comprehensive [Incident Response Plan](https://github.com/stalwartlabs/stalwart/blob/main/SECURITY_PROCESS.md) specifically tailored to Stalwart’s architecture and user base. This plan establishes clear protocols for identifying, containing, and resolving security incidents while maintaining transparency with our community. Having a well-defined incident response strategy is crucial for any mail server software, given the sensitive nature of email communications and the potential impact of security breaches.

 我們參與此專案最重要的成果之一是製定了一套全面的[事件回應計畫](https://github.com/stalwartlabs/stalwart/blob/main/SECURITY_PROCESS.md)該計畫專門針對 Stalwart 的架構和用戶群量身定制。該計劃建立了清晰的流程，用於識別、遏制和解決安全事件，同時保持與社區的透明度。鑑於電子郵件通訊的敏感度以及安全漏洞可能造成的影響，對於任何郵件伺服器軟體而言，制定完善的事件回應策略都至關重要。

 Additionally, we’ve substantially enhanced our existing [Security Policy](https://github.com/stalwartlabs/stalwart/blob/main/SECURITY.md), incorporating lessons learned from the GitHub training and feedback from security experts. This updated policy provides clearer guidelines for security researchers, establishes more robust vulnerability disclosure procedures, and outlines our commitment to maintaining security standards throughout Stalwart’s development lifecycle.

 此外，我們大幅改進了現有的[安全策略](https://github.com/stalwartlabs/stalwart/blob/main/SECURITY.md) ，融入了從GitHub培訓中汲取的經驗教訓以及安全專家的回饋。更新後的策略為安全研究人員提供了更清晰的指導，建立了更完善的漏洞揭露流程，並闡述了我們對在Stalwart整個開發生命週期中維護安全標準的承諾。

 The training also introduced us to various security concepts and tools, including an introduction to fuzzing techniques for discovering potential vulnerabilities. However, the Rust programming language’s memory safety guarantees and the security-conscious culture of the Rust community mean that many of the security recommendations from the GitHub program were already implemented in Stalwart’s codebase. This validation from security experts reinforced our choice of Rust as the foundation for Stalwart and highlighted the proactive security feedback we’ve received from the broader Rust ecosystem.

 此次培訓也向我們介紹了各種安全概念和工具，包括模糊測試技術，用於發現潛在漏洞。然而，Rust 程式語言的記憶體安全保障以及 Rust 社群的安全意識文化意味著，GitHub 計畫中的許多安全建議已經在 Stalwart 的程式碼庫中實現。安全專家的這項驗證進一步鞏固了我們選擇 Rust 作為 Stalwart 基礎語言的決定，並凸顯了我們從更廣泛的 Rust 生態系統中收到的積極主動的安全回饋。

## Leveraging Azure Credits｜利用 Azure 積分

 While the GitHub funding provides important financial support for the project, we’re particularly excited about the $100,000 in Azure credits that accompany our participation in the program. These credits represent an unprecedented opportunity to conduct large-scale testing and optimization of Stalwart’s performance and security characteristics.

 GitHub 的資助為專案提供了重要的資金支持，但我們尤其興奮的是，參與該計劃還能獲得價值 10 萬美元的 Azure 抵用金。這些抵用金為我們提供了一個前所未有的機會，可以對 Stalwart 的性能和安全特性進行大規模測試和最佳化。

 We plan to use these Azure credits to deploy Stalwart across a massive cluster configuration, enabling us to generate millions of concurrent connections and simulate real-world load scenarios that would be impossible to replicate in smaller testing environments. This extensive testing will focus on three critical areas that are essential for any mail server infrastructure.

 我們計劃利用這些 Azure 額度，在大規模叢集配置中部署 Stalwart，從而產生數百萬個並發連接，並模擬在小型測試環境中無法重現的真實負載場景。這項廣泛的測試將重點放在對任何郵件伺服器基礎架構至關重要的三個領域。

 First, we’ll conduct comprehensive performance testing to identify and resolve bottlenecks that might emerge under extreme load conditions. Email servers must handle varying loads gracefully, from quiet periods to sudden spikes in activity, and this testing will help us optimize Stalwart’s resource utilization and response times across all scenarios.

 首先，我們將進行全面的效能測試，以識別並解決在極端負載條件下可能出現的瓶頸。郵件伺服器必須能夠優雅地應對各種負載變化，從低流量時段到突發高峰，而這項測試將幫助我們優化 Stalwart 在各種場景下的資源利用率和回應時間。

 Second, we’ll focus extensively on scalability improvements, ensuring that Stalwart can grow seamlessly from small deployments to enterprise-scale installations. Understanding how different components interact and potentially conflict under high-load conditions will enable us to make architectural improvements that benefit all users, regardless of their deployment size.

 其次，我們將專注於提升可擴展性，確保 Stalwart 能夠從小型部署無縫擴展到企業級規模。了解不同元件在高負載條件下的互動方式以及潛在衝突，將有助於我們進行架構改進，從而使所有使用者受益，無論其部署規模大小。

 Finally, and perhaps most importantly for security, we’ll conduct thorough resilience testing against various types of Denial of Service \(DoS\) attacks. Mail servers are frequent targets for such attacks, and having the ability to simulate these scenarios in a controlled environment will allow us to implement and verify defensive mechanisms that protect real deployments. The insights gained from this testing will be invaluable for administrators who need to deploy Stalwart in security-conscious environments.

 最後，或許對安全性而言最重要的是，我們將針對各種類型的拒絕服務 \(DoS\) 攻擊進行全面的彈性測試。郵件伺服器經常成為此類攻擊的目標，​​在受控環境中模擬這些場景將使我們能夠實施並驗證保護實際部署的防禦機制。從這項測試中獲得的經驗對於需要在註重安全性的環境中部署 Stalwart 的管理員來說將彌足珍貴。

## Ongoing Security Audit｜持續安全審計

 Our commitment to security extends beyond the GitHub program, as evidenced by our current engagement with [Radically Open Security](https://www.radicallyopensecurity.com/) for a comprehensive second security audit of Stalwart. This audit represents a significant milestone in our security journey, coming approximately two years after our first security audit conducted on October 7, 2023.

 我們對安全的承諾不僅限於 GitHub 項目，我們目前正與 Radically Open Security 合作，對 Stalwart 進行第二次全面的安全審計，這就是最好的證明。這項審計是我們安全發展歷程中的一個重要里程碑，距離我們於 2023 年 10 月 7 日進行的第一次安全審計\([https://stalw.art/blog/security-audit/](https://stalw.art/blog/security-audit/)\) \([https://www.radicallyopensecurity.com/\)過去了大約兩年。](https://www.radicallyopensecurity.com/%2529%2525E9%252581%25258E%2525E5%25258E%2525BB%2525E4%2525BA%252586%2525E5%2525A4%2525A7%2525E7%2525B4%252584%2525E5%252585%2525A9%2525E5%2525B9%2525B4%2525E3%252580%252582)

 The timing of this second audit is particularly important because Stalwart has evolved considerably since that initial security review. New features have been added, performance optimizations have been implemented, and the overall architecture has matured significantly. A fresh security perspective is essential to ensure that these improvements haven’t introduced new vulnerabilities and that our security posture has kept pace with the software’s development.

 這次第二次安全審計的時機尤其重要，因為自首次安全審查以來，Stalwart 已經發生了顯著變化。新增了多項功能，實施了效能最佳化，整體架構也日趨成熟。因此，必須從全新的安全視角出發，確保這些改進沒有引入新的漏洞，並確保我們的安全態勢與軟體的開發保持同步。

 Radically Open Security brings extensive experience in open source security auditing, and their thorough approach will provide valuable insights into Stalwart’s current security status. This audit is being financed through a grant from NLNet, demonstrating the broader open source community’s investment in Stalwart’s security and reliability.

 Radically Open Security 在開源安全審計方面擁有豐富的經驗，他們嚴謹細緻的方法將​​為 Stalwart 目前的安全性提供寶貴的見解。此次審計由 NLNet \([https://stalw.art/blog/nlnet-grant-collaboration\)資助，體現了更廣泛的開源社群對](https://stalw.art/blog/nlnet-grant-collaboration%2529%2525E8%2525B3%252587%2525E5%25258A%2525A9%2525EF%2525BC%25258C%2525E9%2525AB%252594%2525E7%25258F%2525BE%2525E4%2525BA%252586%2525E6%25259B%2525B4%2525E5%2525BB%2525A3%2525E6%2525B3%25259B%2525E7%25259A%252584%2525E9%252596%25258B%2525E6%2525BA%252590%2525E7%2525A4%2525BE%2525E7%2525BE%2525A4%2525E5%2525B0%25258D) Stalwart 安全性和可靠性的重視。

 We expect to release the complete results of this security audit soon, continuing our commitment to transparency and community trust. The combination of the GitHub security training, the ongoing Azure-powered testing, and this comprehensive security audit represents a multi-faceted approach to security that reflects the importance we place on protecting our users’ communications and data.

 我們預計很快就會發布此安全審計的完整結果，這反映了我們對透明度和社區信任的承諾。 GitHub 安全訓練、持續進行的 Azure 測試以及全面的安全性稽核相結合，構成了多管齊下的安全策略，反映了我們對保護使用者通訊和資料的重視。

## Acknowledgments｜致謝

 We want to take a moment to express our sincere thanks to [GitHub](https://github.com/) for selecting Stalwart to participate in the Open Source Secure Fund and for providing us with the training and resources that will help strengthen the security of our project. We also want to extend our gratitude to [Zerodha](https://zerodha.com/) for referring Stalwart to be part of GitHub’s OSSF Session 2. Their support has been invaluable, and we look forward to continuing this journey of growth and improvement with their help.

 我們衷心感謝 GitHub \([https://github.com/\)選擇](https://github.com/%2529%2525E9%252581%2525B8%2525E6%252593%252587) Stalwart 參與開源安全基金，並為我們提供培訓和資源，這將有助於加強我們專案的安全性。我們也要感謝 Zerodha \([https://zerodha.com/\)推薦](https://zerodha.com/%2529%2525E6%25258E%2525A8%2525E8%252596%2525A6) Stalwart 參加 GitHub OSSF第二期專案。他們的支持彌足珍貴，我們期待在他們的幫助下繼續這段成長和進步的旅程。

 Stalwart is committed to providing secure and reliable mail and collaboration services, and with the backing of the GitHub OSSF and the ongoing work of our team, we are confident that we can continue to meet and exceed the expectations of our users.

 Stalwart 致力於提供安全可靠的郵件和協作服務，在 GitHub OSSF的支援和我們團隊的持續努力下，我們有信心能夠繼續滿足並超越用戶的期望。

 Thank you for your continued support\!

 感謝您一直以來的支持！

**Tags:**

**標籤：**

- [ossf](https://stalw.art/blog/tags/ossf/)
[ossf](https://stalw.art/blog/tags/ossf/)
- [open-source](https://stalw.art/blog/tags/open-source/)
[開源](https://stalw.art/blog/tags/open-source/)
- [security](https://stalw.art/blog/tags/security/)
[安全](https://stalw.art/blog/tags/security/)
- [stalwart](https://stalw.art/blog/tags/stalwart/)
[堅定者](https://stalw.art/blog/tags/stalwart/)
Security at the Core: Stalwart completes Second Security Audit
 安全至上：Stalwart 完成第二次安全審計

 Introducing Virtual Queues and Strategy-Driven Delivery in Stalwart MTA

 Stalwart 中引入虛擬隊列與策略驅動交付MTA

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Increase your mail server security with Fail2ban｜使用 Fail2ban 提升您的郵件伺服器安全性　｜　下一篇：How we use AI at Stalwart｜我們在 Stalwart 如何使用AI ➡
