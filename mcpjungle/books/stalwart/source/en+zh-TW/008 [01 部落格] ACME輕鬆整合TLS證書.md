---

## title: "ACME Integration for Effortless TLS Certificates｜ACME輕鬆整合TLS證書"

 title\_original: "ACME Integration for Effortless TLS Certificates"
source: "[https://stalw.art/blog/acme-tls](https://stalw.art/blog/acme-tls)"
chapter: \["blog"\]
order: 8
lang: "bilingual"
translated\_by: "google\_v2"
captured: "2026-10-05T01:00:15.234Z"

 ⬆ 目錄　｜　⬅ 上一篇：Introducing DNS-01 and HTTP-01 ACME Challenges｜推出DNS -01 和HTTP -01 ACME挑戰　｜　下一篇：Unleashing Email Flexibility Address Rewriting is now available｜釋放電子郵件彈性：地址重寫功能現已推出 ➡

# ACME Integration for Effortless TLS Certificates｜ACME輕鬆整合TLS證書

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

Jan 7, 2024 - 2 min read

 2024年1月7日 - 閱讀時間：2分鐘

 \[![Mauro D.](assets/selected_535_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

### The Power of ACME｜ACME的力量

 The integration of ACME into [Stalwart Mail Server](https://github.com/stalwartlabs/mail-server) simplifies the complexities of TLS certificate management. It ensures that the certificates are always up-to-date, thereby enhancing the overall security of your communications. With ACME, the server automatically verifies domain ownership, obtains the necessary certificates, and handles renewals, all without manual intervention. This automation is not only a boon for security but also significantly reduces the administrative burden and the risk of service interruptions due to expired certificates.

 將ACME整合到[Stalwart Mail Server](https://github.com/stalwartlabs/mail-server)中，簡化了TLS憑證管理的複雜性。它確保憑證始終保持最新狀態，從而增強通訊的整體安全性。借助ACME ，伺服器會自動驗證網域所有權、取得必要的憑證並處理續期，所有操作均無需人工幹預。這種自動化不僅有利於安全性，還能顯著降低管理負擔，並減少因證書過期而導致的服務中斷風險。

### Embracing the Proxy Protocol｜採用代理協議

 The Proxy Protocol is another crucial feature in this release. When running servers behind load balancers or reverse proxies, such as Caddy, HAProxy, or Traefik, the server traditionally only sees the IP address of the proxy, not the actual client. This limitation can impact security and logging functions. By supporting the Proxy Protocol, [Stalwart Mail Server](https://github.com/stalwartlabs/mail-server) 0.5.2 can now accurately identify the original client’s IP address and connection details. This capability is essential for maintaining robust security measures and precise logging. It ensures that even in environments where Stalwart is behind a proxy, it retains full visibility over client connections.

 代理協定是此版本中的另一個關鍵特性。當伺服器運行在負載平衡器或反向代理（例如 Caddy、HAProxy 或 Traefik）之後時，伺服器通常只能看到代理的IP位址，而無法看到實際用戶端的位址。這種限制會影響安全性和日誌記錄功能。透過支援代理協議，[Stalwart 郵件伺服器](https://github.com/stalwartlabs/mail-server) 0.5.2現在可以準確識別原始客戶端的IP位址和連接詳細資訊。此功能對於維護強大的安全措施和精確的日誌至關重要。它確保即使在 Stalwart 位於代理商之後的環境中，它也能完全了解客戶端連線。

### Conclusion｜結論

 In conclusion, [Stalwart Mail Server](https://github.com/stalwartlabs/mail-server) 0.5.2 is a significant update, offering both ACME for simplified and automated TLS certificate management and the Proxy Protocol for enhanced functionality behind proxy environments. These features underscore our dedication to providing a secure, efficient, and user-friendly mail server solution. We look forward to seeing how our users leverage these new capabilities in their [Stalwart Mail Server](https://github.com/stalwartlabs/mail-server) deployments.

 總而言之，[Stalwart Mail Server](https://github.com/stalwartlabs/mail-server) 0.5.2是一次重大更新，它不僅提供了ACME以簡化和自動化TLS證書管理，還提供了代理協議以增強代理環境後的功能。這些特性彰顯了我們致力於提供安全、高效且使用者友好的郵件伺服器解決方案的決心。我們期待看到使用者如何在 [Stalwart Mail Server](https://github.com/stalwartlabs/mail-server)部署中充分利用這些新功能。

**Tags:**

**標籤：**

- [acme](https://stalw.art/blog/tags/acme/)
[acme](https://stalw.art/blog/tags/acme/)
- [tls](https://stalw.art/blog/tags/tls/)
[tls](https://stalw.art/blog/tags/tls/)
- [security](https://stalw.art/blog/tags/security/)
[安全](https://stalw.art/blog/tags/security/)
- [email](https://stalw.art/blog/tags/email/)
[電子郵件](https://stalw.art/blog/tags/email/)
Increase your mail server security with Fail2ban
 使用 Fail2ban 提升您的郵件伺服器安全性

 SMTP Smuggling: What it is and how Stalwart is protected

 SMTP走私：走私的定義以及斯塔爾沃特如何保護自身安全

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Introducing DNS-01 and HTTP-01 ACME Challenges｜推出DNS -01 和HTTP -01 ACME挑戰　｜　下一篇：Unleashing Email Flexibility Address Rewriting is now available｜釋放電子郵件彈性：地址重寫功能現已推出 ➡
