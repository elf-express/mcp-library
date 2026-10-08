---

## title: "OpenID Connect - Secure Authentication Just Got Easier｜OpenID Connect－安全認證變得更簡單"

 title\_original: "OpenID Connect - Secure Authentication Just Got Easier"
source: "[https://stalw.art/blog/openid-connect](https://stalw.art/blog/openid-connect)"
chapter: \["blog"\]
order: 40
lang: "bilingual"
translated\_by: "google\_v2"
captured: "2026-10-05T01:03:14.228Z"

 ⬆ 目錄　｜　⬅ 上一篇：Stalwart Unaffected by OOM Exploit Affecting Cyrus IMAP｜堅韌不拔不受OOM漏洞影響，但賽勒斯IMAP　｜　下一篇：Parsing E-mail messages in Rust｜使用 Rust 解析電子郵件。 ➡

# OpenID Connect - Secure Authentication Just Got Easier｜OpenID Connect－安全認證變得更簡單

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

Oct 2, 2024 - 3 min read

 2024年10月2日 - 閱讀時間：3分鐘

 \[![Mauro D.](assets/selected_567_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

## What is OpenID Connect?｜什麼是 OpenID Connect？

 OpenID Connect \(OIDC\) is an identity layer built on top of OAuth 2.0 that allows clients to verify the identity of users. With OIDC, instead of just authorizing an app to access a resource, the system can also **authenticate**the user securely. This means users can log in to multiple applications with a single set of credentials, making OIDC ideal for**Single Sign-On \(SSO\)** across services.

 OpenID Connect \( OIDC \) 是一個建構在 OAuth 2.0之上的身份層，它允許客戶端驗證使用者身分。借助OIDC ，系統不僅可以授權應用程式存取資源，還可以安全地對使用者進行**身份驗證。這意味著用戶可以使用一套憑證登入多個應用程序，這使得OIDC非常適合跨服務的**單點登入 \( SSO \)。

 Why is this important? Because it saves users from password fatigue, reduces login complexity, and centralizes authentication in a secure manner. Stalwart Mail Server’s new OIDC support allows you to authenticate your users either directly through Stalwart as an OpenID Provider or by integrating with **third-party OIDC providers** like Authentik, Keycloak, or any compliant identity system.

 為什麼這很重要？因為它能避免使用者重複輸入密碼，降低登入複雜度，並以安全的方式集中進行身份驗證。 Stalwart Mail Server 新增的OIDC支援可讓您直接透過 Stalwart 作為 OpenID 提供者對使用者進行身份驗證，或透過與 Authentik、Keycloak 或任何相容的身份系統等 **第三方OIDC提供者** 整合來驗證使用者身分。

 Alongside full OIDC support, Stalwart Mail Server v0.10.2 also introduces several important new features that expand its capabilities:

 除了全面支援OIDC之外，Stalwart Mail Server v0.10.2還引進了幾項重要的新功能，擴展了其功能：

### OpenID Connect Dynamic Client Registration｜OpenID Connect 動態用戶端註冊

 Dynamic Client Registration allows clients \(applications\) to automatically register with the OIDC provider without requiring manual intervention. This feature makes it easier to integrate multiple applications, as clients can dynamically obtain credentials \(like client IDs\) directly from Stalwart Mail Server. This adds flexibility and reduces administrative overhead.

 動態客戶端註冊允許客戶端（應用程式）自動向OIDC提供者註冊，無需人工幹預。此功能簡化了多個應用程式的集成，因為客戶端可以直接從Stalwart郵件伺服器動態取得憑證（例如客戶端ID）。這提高了靈活性並降低了管理開銷。

### OpenID Connect Discovery｜OpenID Connect 發現

 With the OpenID Connect Discovery feature, clients can automatically discover the relevant OIDC endpoints and supported capabilities via the `/.well-known/openid-configuration` endpoint. This simplifies the configuration of OIDC clients, as they don’t need to be manually configured with URLs for token, authorization, and userinfo endpoints — they just query the discovery endpoint and set themselves up\!

 借助 OpenID Connect Discovery 功能，客戶端可以透過`/.well-known/openid-configuration`端點自動發現相關的OIDC端點和支援的功能。這簡化了OIDC客戶端的配置，因為它們無需手動配置令牌、授權和用戶資訊端點的 URL——只需查詢發現端點即可完成設定！

### OAuth 2.0 Token Introspection｜OAuth 2.0令牌自省

 OAuth 2.0 Token Introspection allows resource servers \(like APIs or mail servers\) to validate access tokens provided by clients. This ensures that the token being used is still active, hasn’t expired, and has the right permissions attached. This is particularly useful for securing interactions between various services while verifying that tokens are still valid.

 OAuth 2.0令牌自省允許資源伺服器（例如 API 或郵件伺服器）驗證用戶端提供的存取令牌。這可確保所使用的令牌仍然有效、未過期，並且具有正確的權限。這對於在驗證令牌是否仍然有效的同時，保護各種服務之間的互動尤其有用。

## OpenID Provider or Third-Party OIDC Support｜OpenID 供應商或第三方OIDC支持

 Stalwart Mail Server v0.10.2 can now act as an OpenID Provider \(issuing ID tokens and managing authentication\), which means your organization can use it to handle authentication for all your internal applications and services. Alternatively, Stalwart can also integrate with third-party OIDC providers, so you can delegate authentication to systems like **Authentik**or**Auth0**, while still using Stalwart to manage your email infrastructure.

 Stalwart 郵件伺服器v0.10.2現在可以作為 OpenID 提供者 （頒發ID令牌並管理身份驗證），這意味著您的組織可以使用它來處理所有內部應用程式和服務的身份驗證。此外，Stalwart 還可以與 \[第三方提供者\]OIDC \([https://stalw.art/docs/auth/backend/oidc\)集成，因此您可以將身份驗證委託給](https://stalw.art/docs/auth/backend/oidc%2529%2525E9%25259B%252586%2525E6%252588%252590%2525EF%2525BC%25258C%2525E5%25259B%2525A0%2525E6%2525AD%2525A4%2525E6%252582%2525A8%2525E5%25258F%2525AF%2525E4%2525BB%2525A5%2525E5%2525B0%252587%2525E8%2525BA%2525AB%2525E4%2525BB%2525BD%2525E9%2525A9%252597%2525E8%2525AD%252589%2525E5%2525A7%252594%2525E8%2525A8%252597%2525E7%2525B5%2525A6) **Authentik**或**Auth0** 等系統，同時仍使用 Stalwart 來管理您的電子郵件基礎架構。

 This dual functionality gives you the flexibility to choose how you want to manage authentication while taking full advantage of OIDC’s security features.

 此雙重功能讓您可以靈活地選擇如何管理身分驗證，同時充分利用OIDC的安全功能。

## About OAUTHBEARER…｜關於 OAUTHBEARER…

 Now, let’s talk about mail clients and the OAUTHBEARER SASL mechanism. While Stalwart fully supports OIDC, the majority of mainstream mail clients \(looking at you, Outlook, Thunderbird, and Apple Mail\) still don’t support OAUTHBEARER for OAuth-based authentication. Sure, we’ve done our part by adding OpenID support to Stalwart — now it’s up to the mail clients to follow suit and add proper support for OIDC authentication. Maybe one day, we’ll see these clients finally catch up, and we can all enjoy the seamless authentication experience that OIDC offers.

 現在，我們來聊聊郵件用戶端和 OAUTHBEARER SASL機制 。雖然 Stalwart 完全支援OIDC ，但大多數主流郵件用戶端（說的就是你們，Outlook、Thunderbird 和 Apple Mail）仍然不支援基於 OAuth 的身份驗證。當然，我們已經盡力了，在 Stalwart 中添加了 OpenID 支援——現在就看郵件用戶端能否跟進，並添加對OIDC身份驗證的正確支援了。也許有一天，我們會看到這些客戶端最終趕上，我們都能享受OIDC帶來的無縫身份驗證體驗。

 In the meantime, users of these clients will need to continue using App Passwords to access their email accounts. But hey, maybe this is the gentle nudge the developers of these clients need to jump on the OpenID bandwagon\!

 同時，這些用戶端的使用者仍需繼續使用套用密碼來存取他們的電子郵件帳號。不過，或許這正是促使這些客戶端開發者加入OpenID陣營的契機！

## Try It Out｜試試看

 Stalwart Mail Server v0.10.2 is available now, so download it, upgrade your server, and start taking advantage of these new features\! Whether you’re setting up Stalwart as your OpenID Provider or integrating with a third-party provider, this release gives you the tools to secure authentication with modern standards like OpenID Connect.

 Stalwart Mail Server v0.10.2現已發布，立即下載升級您的伺服器，開始體驗這些新功能！無論您是將 Stalwart 設定為 OpenID 供應商，還是與第三方提供者集成，此版本都為您提供了使用 OpenID Connect 等現代標準進行安全身份驗證的工具。

 Happy mailing and happy authenticating\!

 祝您郵寄順利，鑑定成功！

**Tags:**

**標籤：**

- [oidc](https://stalw.art/blog/tags/oidc/)
[oidc](https://stalw.art/blog/tags/oidc/)
- [openid](https://stalw.art/blog/tags/openid/)
[openid](https://stalw.art/blog/tags/openid/)
- [stalwart](https://stalw.art/blog/tags/stalwart/)
[堅定者](https://stalw.art/blog/tags/stalwart/)
- [mail](https://stalw.art/blog/tags/mail/)
[郵件](https://stalw.art/blog/tags/mail/)
- [server](https://stalw.art/blog/tags/server/)
[伺服器](https://stalw.art/blog/tags/server/)
Revolutionize Your Email Workflow with AI
 使用AI徹底革新您的電子郵件工作流程

 Unlock Multi-Tenancy, Branding, and Fine-Grained Control

 解鎖多租戶、品牌客製化與精細化控制

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Stalwart Unaffected by OOM Exploit Affecting Cyrus IMAP｜堅韌不拔不受OOM漏洞影響，但賽勒斯IMAP　｜　下一篇：Parsing E-mail messages in Rust｜使用 Rust 解析電子郵件。 ➡
