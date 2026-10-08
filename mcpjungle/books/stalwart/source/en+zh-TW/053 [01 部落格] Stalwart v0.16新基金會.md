---

## title: "Stalwart v0.16 A New Foundation｜Stalwart v0.16新基金會"

 title\_original: "Stalwart v0.16 A New Foundation"
source: "[https://stalw.art/blog/stalwart-0-16](https://stalw.art/blog/stalwart-0-16)"
chapter: \["blog"\]
order: 53
lang: "bilingual"
translated\_by: "google\_v2+gtx"
captured: "2026-10-05T01:03:39.235Z"

 ⬆ 目錄　｜　⬅ 上一篇：Introducing Advanced Spam and Phishing Filtering｜推出高級垃圾郵件和網路釣魚過濾功能　｜　下一篇：Goodbye SSH Discover Stalwart's Web-Based Admin Interface｜再見SSH探索 Stalwart 的基於 Web 的管理介面 ➡

# Stalwart v0.16 A New Foundation｜Stalwart v0.16新基金會

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

## Stalwart v0.16: A New Foundation｜Stalwart v0.16 ：一個新基礎

 Apr 20, 2026 - 7 min read

 2026年4月20日 - 閱讀時間7分鐘

 \[![Mauro D.](assets/selected_362_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

## A Brand-New WebUI｜全新的Web使用者介面

 The [WebUI](https://github.com/stalwartlabs/webui) has been rewritten from the ground up. It has a refreshed, modern look, and it resolves a backlog of 76 enhancement requests and bug fixes that had accumulated over the years. If there was something you had been missing, there is a very good chance it is now there.

[WebUI](https://github.com/stalwartlabs/webui)已完全重寫。它擁有煥然一新的現代外觀，並解決了多年來積壓的 76 項功能增強請求和錯誤修復。如果您之前缺少某些功能，現在很可能已經可以使用了。

![Stalwart v0.16 WebUI](assets/selected_362_image_002.gif)

 The most requested addition is also the most consequential: the new WebUI can authenticate against external OIDC providers. Signing in with Keycloak, Authentik, Authelia, Zitadel, or any other standards-compliant identity provider is now a first-class flow, with full support for audience and scope validation, group claims, and PKCE \(RFC 7636\) for public clients. This has been one of the most frequent community asks, and it is finally here.

 最受用戶期待的新增功能也是影響最大的：全新的 WebUI 可以針對外部OIDC提供者進行身份驗證。現在，使用 Keycloak、Authentik、Authelia、Zitadel 或任何其他符合標準的身份提供者登入都已成為一流的體驗，並完全支援受眾和範圍驗證、群組聲明以及面向公共客戶端的PKCE \( RFC 7636\)。這是社群最常提出的功能之一，現在終於實現了。

## Unified Management via JMAP and a New CLI｜透過JMAP和新的CLI進行統一管理

 In previous releases, Stalwart was managed through a REST API that lived alongside its native JMAP interface. In v0.16, the REST API is gone. Every configuration and management action is now a JMAP object, reachable through the same `/jmap` endpoint that already serves email, calendars, contacts, and files.

 在先前的版本中，Stalwart 透過一個與原生介面JMAP並存的REST API進行管理。在v0.16中， REST API已被移除。現在，所有配置和管理操作都是一個JMAP對象，可透過同一個`/jmap`端點訪問，該端點也用於處理電子郵件、日曆、聯絡人和文件。

 The benefits of this change are hard to overstate. JMAP \(RFC 8620\) is a well-specified, transport-efficient protocol with first-class support for batch operations, push notifications, and fine-grained change tracking. In practice, this means dozens of configuration changes can be applied in a single round-trip, any JMAP client library can drive the management surface, and a single authentication flow covers both mail access and administration. Centralizing configuration inside the datastore as JMAP objects also removes an entire category of operator confusion: there is no longer a split between “settings in a file” and “settings in the database”, and in clustered deployments the configuration is consistent across every node by definition.

 這項變化的好處怎麼強調都不為過。 JMAP \(RFC 8620\) 是一個規範明確、傳輸效率高的協議，為批次操作、推送通知和細粒度更改追蹤提供一流的支援。實際上，這意味著可以在一次往返中應用數十個配置更改，任何JMAP客戶端庫都可以驅動管理介面，並且單一身份驗證流程涵蓋郵件存取和管理。將資料儲存內的配置集中為 JMAP 物件還消除了操作員的整個類別的混亂：「檔案中的設定」和「資料庫中的設定」之間不再存在分歧，並且在叢集部署中，根據定義，每個節點的配置都是一致的。

 Alongside the WebUI, we also shipped a [brand-new CLI](https://github.com/stalwartlabs/cli). The new `stalwart-cli` is built on top of the same JMAP management API and can configure and administer every aspect of Stalwart. It is designed for day-to-day administration, scripted deployments, and infrastructure-as-code workflows. The `stalwart-cli apply` subcommand takes a declarative plan file and idempotently reconciles the live server state to match it, creating what is missing, updating what has changed, and removing what the plan no longer declares. This fits naturally with Ansible, Terraform, NixOS, and similar tooling, and follows the same pattern used by projects like CockroachDB, Consul, Elasticsearch, and HashiCorp Vault, where infrastructure-as-code tools target an API rather than a configuration file.

 除了 WebUI 之外，我們還發布了[全新的CLI](https://github.com/stalwartlabs/cli)。新的`stalwart-cli`構建在相同的JMAP管理API之上，可以配置和管理Stalwart的各個方面。它專為日常管理、腳本化部署和基礎設施即程式碼工作流程而設計。 `stalwart-cli apply` 子命令採用聲明性計劃文件，並冪等地協調實時伺服器狀態以匹配它，創建丟失的內容，更新已更改的內容，並刪除計劃不再聲明的內容。這自然適合 Ansible、Terraform、NixOS 和類似工具，並遵循 CockroachDB、Consul、Elasticsearch 和 HashiCorp Vault 等專案使用的相同模式，其中基礎設施即程式碼工具的目標是 API 而不是設定檔。

 The new CLI is also a very pleasant surface for AI agents. Because every operation maps to a well-defined JMAP object with a clear schema, agents can discover capabilities, plan changes, and apply them idempotently without any bespoke integration work.

 新的CLI介面對AI代理來說也非常友善。由於每個操作都映射到具有清晰模式的、定義明確的JMAP對象，代理可以發現功能、規劃變更並以冪等的方式應用這些變更，而無需任何定制的集成工作。

## Automated DNS Management｜自動化DNS管理

 In previous releases, Stalwart only managed the `TXT` records required for the ACME DNS-01 challenge. In v0.16, it can take care of every DNS record a modern mail and collaboration server needs: `MX`, `TXT`, `CNAME`, `SRV`, `CAA`, and `TLSA`. The server computes the records your deployment should be publishing and keeps them in sync with your DNS provider automatically.

 在先前的版本中，Stalwart 僅管理ACME DNS -01 挑戰所需的`TXT`記錄。在v0.16中，它可以處理現代郵件和協作伺服器所需的所有DNS記錄： `MX`, `TXT`, `CNAME`, `SRV`, `CAA`和`TLSA` 。伺服器會自動計算您的部署應該發布的記錄，並使其與您的DNS提供者保持同步。

 This covers most of the authentication and discovery story out of the box. SPF, DKIM, and DMARC records are managed alongside autoconfig and autodiscover `SRV` records, `CAA` records for certificate issuance authorization \(including the `accounturi` parameter for account-scoped issuance\), and `TLSA` records for DANE. The `TLSA` records are automatically refreshed when ACME certificates are renewed, so DANE-enabled domains no longer risk a validation gap during certificate rotation.

 這涵蓋了大部分開箱即用的身份驗證和發現功能。 SPF, DKIM， 和 DMARC 記錄與自動配置和自動發現功能一起管理。 `SRV` 記錄， `CAA` 證書核發授權記錄（包括 `accounturi` （帳戶範圍發行的參數），以及 `TLSA` 記錄 DANE。 這 `TLSA` 當記錄自動刷新時 ACME 證書會續期，所以 DANE啟用 -enabled 的網域在憑證輪替期間不再面臨驗證失效的風險。

 On the provider side, v0.16 ships support for Route53, Google Cloud DNS, Bunny, Porkbun, DNSimple, and Spaceship, and also supports RFC 2136 dynamic updates signed with `SIG(0)` for operators running their own authoritative DNS.

 DNS提供者方面， v0.16提供對 Route53、Google Cloud DNS 、Bunny、Porkbun、DNSimple 和 Spaceship 的支持，並且還支持RFC 2136 個動態更新，這些更新由`SIG(0)` 。

## Automated DKIM Rotation｜自動DKIM旋轉

 DKIM key rotation is one of those tasks that everyone knows they should be doing, and almost nobody actually does, because it is tedious and easy to get wrong. In v0.16, Stalwart takes over the entire workflow. It can generate DKIM keys automatically, rotate them on a schedule, and publish the matching `TXT` records through the new DNS management layer so that the published keys always match the keys the server is signing with. DKIM keys are now stored in the database alongside the rest of the configuration, which means rotation works naturally in clustered deployments without any manual coordination.

 DKIM 金鑰輪換是每個人都知道應該做的任務之一，但幾乎沒有人真正這樣做，因為它很乏味且容易出錯。在v0.16中，Stalwart 接手了整個工作流程。它可以自動產生DKIM金鑰，按計劃輪換它們，並透過新的DNS管理層發布匹配的`TXT`記錄，以便發布的密鑰始終與伺服器簽署的密鑰相符。 DKIM 金鑰現在與其餘配置一起儲存在資料庫中，這意味著輪換在叢集部署中自然進行，無需任何手動協調。

## Masked Emails｜遮罩郵件

 Masked emails are disposable, per-service email addresses that route to a user’s real inbox. Instead of handing out a primary address to every newsletter, shop, or forum, a user can generate a unique masked address for each one. If a service leaks its database or starts sending unwanted mail, the corresponding masked address can be disabled individually, without affecting anything else and without touching the user’s real address. It is one of the most effective privacy tools available today, and it integrates cleanly with the rest of the directory in Stalwart.

 匿名郵箱是一次性的、針對特定服務的郵箱地址，這些地址會路由到使用者的真實郵箱。使用者無需為每個新聞郵件、商店或論壇提供一個主郵箱地址，而是可以為每個服務產生一個唯一的匿名郵箱地址。如果某個服務洩露了資料庫或開始發送垃圾郵件，可以單獨停用相應的匿名郵箱地址，而不會影響其他任何設置，也不會觸及用戶的真實郵箱地址。它是目前最有效的隱私保護工具之一，並且可以與 Stalwart 目錄中的其他功能無縫整合。

 This feature is part of the Enterprise edition.

 此功能屬於企業版。

## Security Enhancements｜安全增強

 Security gets a substantial upgrade in v0.16. User passwords can now be checked against the `zxcvbn` strength estimator at set-time, so weak credentials never make it into the system in the first place. Passwords can also be given explicit expiration and rotation policies, and user accounts can be restricted to specific IP ranges so that an account is only usable from expected networks.

 在v0.16中，安全性得到了顯著提升。現在，使用者密碼可以在設定時根據`zxcvbn`強度評估器進行檢查，從而從一開始就杜絕弱密碼進入系統。密碼還可以設定明確的過期和輪換策略，用戶帳戶也可以限制在特定的IP範圍內，從而確保帳戶只能在預期的網路中使用。

 App passwords and API keys receive the same treatment, and then some. Both can now be scoped to a specific set of permissions rather than inheriting the full privileges of the owning account, which means a token used by a single IMAP client or a single automation script can be limited to exactly what it needs. Both also support human-readable labels, expiration dates, and IP address restrictions, so long-lived credentials can be audited, rotated, and confined without having to revoke them entirely.

 應用密碼和API密鑰都獲得了相同的待遇，甚至更多。現在，它們都可以被限定在特定的權限範圍內，而不是繼承所屬帳戶的全部權限。這意味著單一IMAP客戶端或單一自動化腳本使用的令牌可以精確地限制在其所需的範圍內。此外，它們還支援易於理解的標籤、過期日期和IP地址限制，因此可以對長期有效的憑證進行審計、輪換和限制，而無需完全撤銷它們。

 Taken together, these features make the credentials surface of a Stalwart deployment dramatically easier to reason about and lock down.

 綜合來看，這些特性使得 Stalwart 部署的憑證表面更容易理解和鎖定。

## Other Highlights｜其他亮點

 There are many other additions worth calling out. On the account configuration front, v0.16 implements the new [Automatic Configuration of Email, Calendar, and Contact Server Settings draft](https://datatracker.ietf.org/doc/html/draft-eggert-mailmaint-uaautoconf-04), which is shaping up to replace the fragmented autoconfig and autodiscover mechanisms clients use today, and adds MS Autodiscover V2 support for environments that still rely on it.

 還有許多其他值得一提的新增功能。在帳戶配置方面， v0.16實現了新的[電子郵件、日曆和聯絡人伺服器設定的自動配置草案](https://datatracker.ietf.org/doc/html/draft-eggert-mailmaint-uaautoconf-04) ，該草案旨在取代客戶端目前使用的分散的自動配置和自動發現機制，並為仍然依賴自動發現 V2 的環境添加了MS自動發現 V2 支援。

 The directory layer gains domain aliases, alias descriptions, the ability to disable aliases without deleting them, and, for the Enterprise edition, account archiving and un-deletion and per-domain directory backends. The ACME layer picks up the new `DNS-PERSIST-01` challenge, on-demand certificate renewal, and a certificate detail view. Sieve scripts can now be deactivated without being deleted. Clustering is cleaner, with automatic node ID generation, unified cluster management, and a new outbound MTA role for dedicated queue nodes.

 目錄層新增了網域別名、別名描述、無需刪除即可停用別名的功能，企業版`DNS-PERSIST-01` ACME 、按需憑證續訂和憑證詳細資料檢視。現在可以停用 Sieve 腳本而無需刪除。叢集管理更加清晰，支援自動節點ID產生、統一叢集管理，並為專用佇列節點新增了出站MTA角色。

 On top of all of this, dozens of bug fixes land across the directory, MTA, JMAP, IMAP, WebDAV, CalDAV, OIDC, and storage backends. If you have been tracking an issue, there is a good chance it is resolved in v0.16.

 除此之外，目錄、 MTA, JMAP, IMAP 、WebDAV、CalDAV、 OIDC和儲存後端也修復了數十個錯誤。如果您一直在追蹤某個問題，那麼它很可能已在v0.16中得到解決。

## Upgrading｜升級

 Because of the scope of the architectural changes, v0.16 is a **major upgrade with multiple breaking changes**. Please do not upgrade a production deployment without first reading the [upgrading documentation](https://github.com/stalwartlabs/stalwart/blob/main/UPGRADING/v0_16.md) in full. We also strongly recommend spinning up a fresh v0.16 instance in a container or throwaway VM first, getting comfortable with the new WebUI and CLI, and exporting any settings you build there as an `apply` plan to replay against production after the migration.

 由於架構變更範圍較大， v0.16為**重大升級，包含多項重大變更**。請務必先完整閱讀升級文件\([https://github.com/stalwartlabs/stalwart/blob/main/UPGRADING/v0\_16.md](https://github.com/stalwartlabs/stalwart/blob/main/UPGRADING/v0_16.md)\) ，切勿在未閱讀完整文件的情況下升級生產環境。我們強烈建議您先在容器或臨時環境VM中啟動一個全新的v0.16實例，熟悉新的 WebUI 和CLI ，並將您在其中創建的任何設定匯出為`apply`計劃，以便在遷移後重新部署到生產環境。

 If any questions come up along the way, a dedicated discussion thread for the v0.16 upgrade is open at [https://github.com/stalwartlabs/stalwart/discussions/3004](https://github.com/stalwartlabs/stalwart/discussions/3004). We will be following it closely.

 若在此過程中遇到任何問題，請造訪 [https://github.com/stalwartlabs/stalwart/discussions/3004](https://github.com/stalwartlabs/stalwart/discussions/3004)專門的v0.16升級討論貼文。我們將密切關注。

 This release has been in the making for over three months, and it represents one of the largest single steps forward in Stalwart’s history. Thank you to everyone who filed bugs, contributed code, tested pre-releases, and kept the conversation going in issues and discussions: v0.16 is very much your release too. We cannot wait to hear what you build with it.

 這次版本發布歷時三個多月，是 Stalwart 史上最重要的重大突破。感謝所有提交 bug 報告、貢獻程式碼、測試預發布版本以及在 issues 和討論區積極參與交流的用戶： v0.16也是屬於你們的版本。我們迫不及待地想看看你們用它創造出了什麼。

**Tags:**

**標籤：**

- [release](https://stalw.art/blog/tags/release/)
[發布](https://stalw.art/blog/tags/release/)
- [webui](https://stalw.art/blog/tags/webui/)
[webui](https://stalw.art/blog/tags/webui/)
- [jmap](https://stalw.art/blog/tags/jmap/)
[jmap](https://stalw.art/blog/tags/jmap/)
- [cli](https://stalw.art/blog/tags/cli/)
[cli](https://stalw.art/blog/tags/cli/)
- [dns](https://stalw.art/blog/tags/dns/)
[dns](https://stalw.art/blog/tags/dns/)
- [dkim](https://stalw.art/blog/tags/dkim/)
[dkim](https://stalw.art/blog/tags/dkim/)
- [oidc](https://stalw.art/blog/tags/oidc/)
[oidc](https://stalw.art/blog/tags/oidc/)
- [security](https://stalw.art/blog/tags/security/)
[安全](https://stalw.art/blog/tags/security/)
Introducing the Stalwart Support Portal
 隆重介紹 Stalwart 支援入口網站

 Marginal Gains: Major Impact

 邊際收益：重大影響

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Introducing Advanced Spam and Phishing Filtering｜推出高級垃圾郵件和網路釣魚過濾功能　｜　下一篇：Goodbye SSH Discover Stalwart's Web-Based Admin Interface｜再見SSH探索 Stalwart 的基於 Web 的管理介面 ➡
