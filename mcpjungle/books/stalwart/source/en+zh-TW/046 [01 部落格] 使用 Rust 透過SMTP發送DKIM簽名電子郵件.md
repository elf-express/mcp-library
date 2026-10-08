---

## title: "Sending DKIM signed e-mail messages over SMTP in Rust｜使用 Rust 透過SMTP發送DKIM簽名電子郵件"

 title\_original: "Sending DKIM signed e-mail messages over SMTP in Rust"
source: "[https://stalw.art/blog/send-dkim-email-rust](https://stalw.art/blog/send-dkim-email-rust)"
chapter: \["blog"\]
order: 46
lang: "bilingual"
translated\_by: "google\_v2+gtx"
captured: "2026-10-05T01:03:31.241Z"

 ⬆ 目錄　｜　⬅ 上一篇：Stalwart Mail Server passes Security Audit｜堅固郵件伺服器通過安全審計　｜　下一篇：Advanced Filtering with Sieve Expressions｜使用篩分錶達式進行進階過濾 ➡

# Sending DKIM signed e-mail messages over SMTP in Rust｜使用 Rust 透過SMTP發送DKIM簽名電子郵件

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

May 30, 2022 - 1 min read

 2022年5月30日 - 閱讀時間：1分鐘

 \[![Mauro D.](assets/selected_355_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

- Generates **e-mail**messages conforming to the Internet Message Format standard \(*RFC 5322*\) with full**MIME** support \(*RFC 2045–2049*\) and automatic selection of the most optimal encoding for each message body part.
產生符合網路訊息格式標準 \(*RFC 5322*\) 的 **電子郵件**訊息，並完全支援**MIME** \(*RFC 2045–2049*\)，並自動為每個訊息正文部分選擇最佳編碼。
- DomainKeys Identified Mail \(**DKIM**\) Signatures \(*RFC 6376*\).
DomainKeys 已識別郵件 \(**DKIM**\) 簽章 \(\* RFC 6376\*\)。
- **SMTP**support with**TLS** and multiple authentication mechanisms \(XOAUTH2, CRAM-MD5, DIGEST-MD5, LOGIN and PLAIN\).
**SMTP**支援**TLS** 和多種驗證機制（ XOAUTH2, CRAM-MD5, DIGEST-MD5, LOGIN和PLAIN ）。

- Full async \(requires Tokio\).
完全異步（需要 Tokio）。
Composing and sending an e-mail message via SMTP is as simple as:
 透過SMTP撰寫和發送電子郵件非常簡單：

```rust
        // Build a simple multipart message
        let message = MessageBuilder::new()
            .from(("John Doe", "[email protected]"))
            .to(vec![
                ("Jane Doe", "[email protected]"),
                ("James Smith", "[email protected]"),
            ])
            .subject("Hi!")
            .html_body("<h1>Hello, world!</h1>")
            .text_body("Hello world!");

        // Connect to an SMTP relay server over TLS and
        // authenticate using the provided credentials.
        Transport::new("smtp.gmail.com")
            .credentials("john", "p4ssw0rd")
            .connect_tls()
            .await
            .unwrap()
            .send(message)
            .await
            .unwrap();
```

And to sign a message with DKIM just do:

 要使用DKIM簽名，只需執行以下操作：

```rust
    // Build a simple text message with a single attachment
        let message = MessageBuilder::new()
            .from(("John Doe", "[email protected]"))
            .to("[email protected]")
            .subject("Howdy!")
            .text_body("These pretzels are making me thirsty.")
            .binary_attachment("image/png", "pretzels.png", [1, 2, 3, 4].as_ref());

        // Set up DKIM signer
        let dkim = DKIM::from_pkcs1_pem_file("./cert.pem")
            .unwrap()
            .domain("example.com")
            .selector("2022")
            .headers(["From", "To", "Subject"]) // Headers to sign
            .expiration(60 * 60 * 7); // Number of seconds before this signature expires (optional)

        // Connect to an SMTP relay server over TLS.
        // Signs each message with the configured DKIM signer.
        Transport::new("smtp.example.com")
            .dkim(dkim)
            .connect_tls()
            .await
            .unwrap()
            .send(message)
            .await
            .unwrap();
```

More examples can be found on [Github](https://github.com/stalwartlabs/mail-send/tree/main/examples). Enjoy DKIM signing\!

 更多範例請參見 [Github](https://github.com/stalwartlabs/mail-send/tree/main/examples) 。祝您簽名愉快！ DKIM

**Tags:**

**標籤：**

- [email](https://stalw.art/blog/tags/email/)
[電子郵件](https://stalw.art/blog/tags/email/)
- [rust](https://stalw.art/blog/tags/rust/)
[休息](https://stalw.art/blog/tags/rust/)
- [send](https://stalw.art/blog/tags/send/)
[發送](https://stalw.art/blog/tags/send/)
- [dkim](https://stalw.art/blog/tags/dkim/)
[dkim](https://stalw.art/blog/tags/dkim/)
Announcing Stalwart JMAP server
 Stalwart JMAP伺服器上線

 Building E-mail messages in Rust

 使用 Rust 建立電子郵件

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Stalwart Mail Server passes Security Audit｜堅固郵件伺服器通過安全審計　｜　下一篇：Advanced Filtering with Sieve Expressions｜使用篩分錶達式進行進階過濾 ➡
