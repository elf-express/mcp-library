---

## title: "DKIM, ARC, SPF and DMARC authentication in Rust｜Rust 中的DKIM, ARC, SPF和DMARC身份驗證"

 title\_original: "DKIM, ARC, SPF and DMARC authentication in Rust"
source: "[https://stalw.art/blog/dkim-spf-dmarc-rust](https://stalw.art/blog/dkim-spf-dmarc-rust)"
chapter: \["blog"\]
order: 20
lang: "bilingual"
translated\_by: "google\_v2"
captured: "2026-10-05T01:00:31.359Z"

 ⬆ 目錄　｜　⬅ 上一篇：Addressing the Overlooked DKIM Exploit in Stalwart Mail Server｜解決 Stalwart 郵件伺服器中被忽略的DKIM漏洞　｜　下一篇：DKIM2 and DMARCbis have landed, and Stalwart speaks them first｜DKIM2和 DMARCbis 已經著陸，Stalwart 首先與他們交談。 ➡

# DKIM, ARC, SPF and DMARC authentication in Rust｜Rust 中的DKIM, ARC, SPF和DMARC身份驗證

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

Dec 1, 2022 - 1 min read

 2022年12月1日 - 閱讀時間：1分鐘

 \[![Mauro D.](assets/selected_547_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

## DKIM Signature Verification｜DKIM簽名驗證

```rust
        // Create a resolver using Cloudflare DNS
        let resolver = Resolver::new_cloudflare_tls().unwrap();

        // Parse message
        let authenticated_message = AuthenticatedMessage::parse(RFC5322_MESSAGE.as_bytes()).unwrap();

        // Validate signature
        let result = resolver.verify_dkim(&authenticated_message).await;

        // Make sure all signatures passed verification
        assert!(result.iter().all(|s| s.result() == &DKIMResult::Pass));
```

## DKIM Signing｜DKIM簽名

```rust
        // Sign an e-mail message using RSA-SHA256
        let pk_rsa = PrivateKey::from_rsa_pkcs1_pem(RSA_PRIVATE_KEY).unwrap();
        let signature_rsa = Signature::new()
            .headers(["From", "To", "Subject"])
            .domain("example.com")
            .selector("default")
            .sign(RFC5322_MESSAGE.as_bytes(), &pk_rsa)
            .unwrap();

        // Sign an e-mail message using ED25519-SHA256
        let pk_ed = PrivateKey::from_ed25519(
            &base64_decode(ED25519_PUBLIC_KEY.as_bytes()).unwrap(),
            &base64_decode(ED25519_PRIVATE_KEY.as_bytes()).unwrap(),
        )
        .unwrap();
        let signature_ed = Signature::new()
            .headers(["From", "To", "Subject"])
            .domain("example.com")
            .selector("default-ed")
            .sign(RFC5322_MESSAGE.as_bytes(), &pk_ed)
            .unwrap();

        // Print the message including both signatures to stdout
        println!(
            "{}{}{}",
            signature_rsa.to_header(),
            signature_ed.to_header(),
            RFC5322_MESSAGE
        );
```

## ARC Chain Verification｜ARC鏈驗證

```rust
        // Create a resolver using Cloudflare DNS
        let resolver = Resolver::new_cloudflare_tls().unwrap();

        // Parse message
        let authenticated_message = AuthenticatedMessage::parse(RFC5322_MESSAGE.as_bytes()).unwrap();

        // Validate ARC chain
        let result = resolver.verify_arc(&authenticated_message).await;

        // Make sure ARC passed verification
        assert_eq!(result.result(), &DKIMResult::Pass);
```

## ARC Chain Sealing｜ARC鍊式密封

```rust
        // Create a resolver using Cloudflare DNS
        let resolver = Resolver::new_cloudflare_tls().unwrap();

        // Parse message to be sealed
        let authenticated_message = AuthenticatedMessage::parse(RFC5322_MESSAGE.as_bytes()).unwrap();

        // Verify ARC and DKIM signatures
        let arc_result = resolver.verify_arc(&authenticated_message).await;
        let dkim_result = resolver.verify_dkim(&authenticated_message).await;

        // Build Authenticated-Results header
        let auth_results = AuthenticationResults::new("mx.mydomain.org")
            .with_dkim_result(&dkim_result, "[email protected]")
            .with_arc_result(&arc_result, "127.0.0.1".parse().unwrap());

        // Seal message
        if arc_result.can_be_sealed() {
            // Seal the e-mail message using RSA-SHA256
            let pk_rsa = PrivateKey::from_rsa_pkcs1_pem(RSA_PRIVATE_KEY).unwrap();
            let arc_set = ARC::new(&auth_results)
                .domain("example.org")
                .selector("default")
                .headers(["From", "To", "Subject", "DKIM-Signature"])
                .seal(&authenticated_message, &arc_result, &pk_rsa)
                .unwrap();

            // Print the sealed message to stdout
            println!("{}{}", arc_set.to_header(), RFC5322_MESSAGE)
        } else {
            eprintln!("The message could not be sealed, probably an ARC chain with cv=fail was found.")
        }
```

## SPF Policy Evaluation｜SPF政策評估

```rust
        // Create a resolver using Cloudflare DNS
        let resolver = Resolver::new_cloudflare_tls().unwrap();

        // Verify HELO identity
        let result = resolver
            .verify_spf_helo("127.0.0.1".parse().unwrap(), "gmail.com")
            .await;
        assert_eq!(result.result(), SPFResult::Fail);

        // Verify MAIL-FROM identity
        let result = resolver
            .verify_spf_sender("::1".parse().unwrap(), "gmail.com", "[email protected]")
            .await;
        assert_eq!(result.result(), SPFResult::Fail);
```

## DMARC Policy Evaluation｜DMARC政策評估

```rust
        // Create a resolver using Cloudflare DNS
        let resolver = Resolver::new_cloudflare_tls().unwrap();

        // Verify DKIM signatures
        let authenticated_message = AuthenticatedMessage::parse(RFC5322_MESSAGE.as_bytes()).unwrap();
        let dkim_result = resolver.verify_dkim(&authenticated_message).await;

        // Verify SPF MAIL-FROM identity
        let spf_result = resolver
            .verify_spf_sender("::1".parse().unwrap(), "example.org", "[email protected]")
            .await;

        // Verify DMARC
        let dmarc_result = resolver
            .verify_dmarc(
                &authenticated_message,
                &dkim_result,
                "example.org",
                &spf_result,
            )
            .await;
        assert_eq!(dmarc_result.dkim_result(), &DMARCResult::Pass);
        assert_eq!(dmarc_result.spf_result(), &DMARCResult::Pass);
```

More examples available on Github under the [examples](https://github.com/stalwartlabs/mail-auth/blob/HEAD/examples) directory.

 更多範例可在 Github 的 [examples](https://github.com/stalwartlabs/mail-auth/blob/HEAD/examples)目錄下找到。

**Tags:**

**標籤：**

- [dkim](https://stalw.art/blog/tags/dkim/)
[dkim](https://stalw.art/blog/tags/dkim/)
- [arc](https://stalw.art/blog/tags/arc/)
[弧](https://stalw.art/blog/tags/arc/)
- [spf](https://stalw.art/blog/tags/spf/)
[spf](https://stalw.art/blog/tags/spf/)
- [dmarc](https://stalw.art/blog/tags/dmarc/)
[dmarc](https://stalw.art/blog/tags/dmarc/)
- [rust](https://stalw.art/blog/tags/rust/)
[休息](https://stalw.art/blog/tags/rust/)
Announcing Stalwart SMTP with DMARC, DANE, MTA-STS support
 隆重介紹 Stalwart SMTP ，支援DMARC, DANE, MTA-STS

 Sieve filters are now available on Stalwart JMAP v0.2

 Stalwart 現已推出篩網過濾器JMAP v0.2

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Addressing the Overlooked DKIM Exploit in Stalwart Mail Server｜解決 Stalwart 郵件伺服器中被忽略的DKIM漏洞　｜　下一篇：DKIM2 and DMARCbis have landed, and Stalwart speaks them first｜DKIM2和 DMARCbis 已經著陸，Stalwart 首先與他們交談。 ➡
