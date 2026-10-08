---

## title: "Introducing DNS-01 and HTTP-01 ACME Challenges｜推出DNS -01 和HTTP -01 ACME挑戰"

 title\_original: "Introducing DNS-01 and HTTP-01 ACME Challenges"
source: "[https://stalw.art/blog/acme-challenges](https://stalw.art/blog/acme-challenges)"
chapter: \["blog"\]
order: 7
lang: "bilingual"
translated\_by: "google\_v2+gtx"
captured: "2026-10-05T01:00:14.230Z"

 ⬆ 目錄　｜　⬅ 上一篇：Enhanced E-mail Security with Two-Factor Authentication｜透過雙重認證增強電子郵件安全性　｜　下一篇：ACME Integration for Effortless TLS Certificates｜ACME輕鬆整合TLS證書 ➡

# Introducing DNS-01 and HTTP-01 ACME Challenges｜推出DNS -01 和HTTP -01 ACME挑戰

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

Apr 17, 2024 - 3 min read

 2024年4月17日 - 閱讀時間：3分鐘

 \[![Mauro D.](assets/selected_534_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

### What is ACME?｜ACME是什麼？

 The Automated Certificate Management Environment \(ACME\) protocol is a cornerstone in the world of secure communications. ACME automates the process of certificate issuance, renewal, and revocation, thereby simplifying the management of SSL/TLS certificates. This protocol is not only designed to streamline administrative tasks but also to bolster security measures through rigorous validation mechanisms.

 自動憑證管理環境 \(ACME\) 協定是安全通訊領域的基石。 ACME自動化了證書頒發、更新和撤銷的過程，從而簡化了SSL/TLS證書的管理。該協議不僅旨在簡化管理任務，而且還透過嚴格的驗證機制來加強安全措施。

![acme social-card image](assets/selected_534_image_002.webp)

### Challenge Types｜挑戰類型

 Prior to version `0.7.2`, Stalwart Mail Server supported only the `TLS-ALPN-01` challenge, which utilizes the TLS Application Layer Protocol Negotiation extension for domain validation. This method, while robust, requires port 443 to be open and can limit flexibility for some users and environments.

 在`0.7.2`版本之前，Stalwart Mail Server 僅支援`TLS-ALPN-01`挑戰，該挑戰利用TLS應用層協定協商擴充進行網域驗證。雖然這種方法穩健可靠，但需要開放 443 端口，這可能會限制某些用戶和環境的靈活性。

 Recognizing the diverse needs of our users, we have expanded our support to include two additional types of challenges: `DNS-01` and `HTTP-01`. These new features are designed to offer more versatility in how users manage domain validation and certificate issuance.

 考慮到使用者的多樣化需求，我們擴展了支援範圍，新增了兩種挑戰類型： `DNS-01`和`HTTP-01` 。這些新功能旨在為使用者提供更靈活的網域驗證和憑證授權管理方式。

#### DNS-01 Challenge｜DNS -01 挑戰

 The `DNS-01` challenge validates domain ownership by creating a DNS TXT record. This method is particularly valuable for those needing to issue wildcard certificates, as it allows for the validation of the domain and all its subdomains collectively. It is an ideal choice for users who prefer or require managing their certificates at the DNS level, especially in scenarios where direct web traffic control is not feasible.

`DNS-01`挑戰透過創建DNS TXT記錄來驗證網域所有權。對於需要頒發通配符憑證的使用者來說，此方法尤其有用，因為它允許對網域及其所有子網域進行統一驗證。對於那些偏好或需要在DNS層級管理憑證的使用者來說，這尤其理想，尤其是在無法直接控製網路流量的情況下。

#### HTTP-01 Challenge｜HTTP -01 挑戰

 In contrast, the `HTTP-01` challenge involves responding to HTTP requests made by the ACME server. This method proves the control over a domain by placing a specific file on the server to be accessed via a standard web path. It is best suited for environments where port 80 is open and accessible. The simplicity of `HTTP-01` makes it an attractive option for many administrators, providing an efficient path to compliance without the need for complex DNS configurations.

 相反，`HTTP-01`挑戰涉及回應ACME伺服器發出的HTTP請求。此方法透過將特定檔案放置在伺服器上以透過標準 Web 路徑存取來證明對網域的控制。它最適合連接埠 80 開放且可存取的環境。 `HTTP-01` 的簡單性使其成為對許多管理員有吸引力的選擇，無需複雜的 DNS 配置即可提供有效的合規途徑。

### Benefits｜好處

 By integrating `DNS-01` and `HTTP-01` challenges into Stalwart Mail Server `0.7.2`, we are offering our users the flexibility to choose the validation method that best fits their technical requirements and security policies. Whether operating behind a TLS reverse proxy, managing multiple subdomains with a single certificate, or simply seeking a straightforward setup, the expanded challenge options cater to a wider range of use cases.

 透過將`DNS-01`和`HTTP-01`挑戰整合到Stalwart Mail `0.7.2`中，我們為使用者提供了更大的靈活性，使其能夠選擇最符合自身技術要求和安全策略的驗證方法。無論是在TLS反向代理後運行、使用單一證書管理多個子域，還是僅尋求簡單的設置，擴展後的挑戰選項都能滿足更廣泛的使用場景。

 We are committed to continually improving Stalwart Mail Server to meet the evolving needs of our customers. The inclusion of these new ACME challenges is a direct response to community feedback, and we are excited to see how our users will leverage these new capabilities to enhance their server security and certificate management processes.

 我們致力於持續改進 Stalwart Mail Server，以滿足客戶不斷變化的需求。新增的ACME挑戰正是對社群回饋的直接回應，我們非常期待看到使用者如何利用這些新功能來增強伺服器安全性和憑證管理流程。

 Stay tuned for more updates as we keep enhancing our mail server solutions. For detailed information on configuring and using the new challenge types in Stalwart Mail Server `0.7.2`, please refer to our updated documentation.

 請關注後續更新，我們將持續改進郵件伺服器解決方案。有關在 Stalwart Mail Server `0.7.2`中配置和使用新質詢類型的詳細信息，請參閱我們的更新文件 。

 We look forward to your feedback on these new features and to supporting you in your journey to a more secure and efficient server environment\!

 我們期待您對這些新功能的回饋，並支援您建立更安全、更有效率的伺服器環境！

**Tags:**

**標籤：**

- [acme](https://stalw.art/blog/tags/acme/)
[acme](https://stalw.art/blog/tags/acme/)
- [dns-01](https://stalw.art/blog/tags/dns-01/)
[dns-01](https://stalw.art/blog/tags/dns-01/)
- [http-01](https://stalw.art/blog/tags/http-01/)
[http-01](https://stalw.art/blog/tags/http-01/)
- [tls-alpn-01](https://stalw.art/blog/tags/tls-alpn-01/)
[tls-alpn-01](https://stalw.art/blog/tags/tls-alpn-01/)
- [mail](https://stalw.art/blog/tags/mail/)
[電子郵件](https://stalw.art/blog/tags/mail/)
- [server](https://stalw.art/blog/tags/server/)
[伺服器](https://stalw.art/blog/tags/server/)
Unlock Seamless Scalability with Stalwart Mail Server
 使用 Stalwart 郵件伺服器解鎖無縫擴充

 Goodbye SSH: Discover Stalwart's Web-Based Admin Interface

 再見SSH ：探索 Stalwart 的 Web 管理介面

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Enhanced E-mail Security with Two-Factor Authentication｜透過雙重認證增強電子郵件安全性　｜　下一篇：ACME Integration for Effortless TLS Certificates｜ACME輕鬆整合TLS證書 ➡
