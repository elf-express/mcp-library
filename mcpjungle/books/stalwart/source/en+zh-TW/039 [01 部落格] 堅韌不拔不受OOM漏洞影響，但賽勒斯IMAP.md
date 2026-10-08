---

## title: "Stalwart Unaffected by OOM Exploit Affecting Cyrus IMAP｜堅韌不拔不受OOM漏洞影響，但賽勒斯IMAP"

 title\_original: "Stalwart Unaffected by OOM Exploit Affecting Cyrus IMAP"
source: "[https://stalw.art/blog/oom-cyrus-exploit](https://stalw.art/blog/oom-cyrus-exploit)"
chapter: \["blog"\]
order: 39
lang: "bilingual"
translated\_by: "google\_v2"
captured: "2026-10-05T01:03:12.237Z"

 ⬆ 目錄　｜　⬅ 上一篇：OpenID Connect Integration is now Open Source｜OpenID Connect 整合現在是開源的　｜　下一篇：OpenID Connect - Secure Authentication Just Got Easier｜OpenID Connect－安全認證變得更簡單 ➡

# Stalwart Unaffected by OOM Exploit Affecting Cyrus IMAP｜堅韌不拔不受OOM漏洞影響，但賽勒斯IMAP

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

Jun 7, 2024 - 2 min read

 2024年6月7日 - 閱讀時間：2分鐘

 \[![Mauro D.](assets/selected_566_image_001.png)

 Mauro D.

 毛羅·D.

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

### Understanding the CVE-2024-34055 Exploit｜了解CVE -2024-34055 漏洞利用

 The CVE-2024-34055 exploit leverages a specific weakness in the Cyrus IMAP server. By sending numerous LITERALs in a single command, an attacker can trigger excessive memory allocation. The vulnerability can be demonstrated with the following example:

 CVE -2024-34055 漏洞利用了 Cyrus IMAP伺服器中的一個特定弱點。攻擊者透過在單一命令中發送大量 LITERAL 值，可以觸發過多的記憶體分配。以下範例可以演示此漏洞：

```title=&amp;quot;Project Maintainer&amp;quot;
A2 SEARCH BODY {1048576}
+ Ready for 1048576 bytes.
[1048576 bytes chunk] BODY {1048576}
+ Ready for 1048576 bytes.
[1048576 bytes chunk] BODY {1048576}
...
+ Ready for 1048576 bytes.
[1048576 bytes chunk] BODY {1048576}
<cyrus crashes with oom>
```

In this scenario, the server is repeatedly asked to allocate large chunks of memory, eventually leading to an OOM crash.

 在這種情況下，伺服器被反覆要求分配大量內存，最終導致OOM崩潰。

### Why Stalwart is Secure｜為什麼 Stalwart 安全可靠

 Stalwart Mail Server is designed with security and robustness in mind, and it is not susceptible to the type of attacks outlined in CVE-2024-34055. Here’s why:

 Stalwart郵件伺服器在設計時充分考慮了安全性和穩定性，因此不會受到CVE -2024-34055中所述的攻擊。原因如下：

- **Strict Parsers:** Stalwart’s parsers are highly strict when reading input from the network. This strictness ensures that any malformed or malicious commands are promptly identified and handled without leading to excessive resource allocation.
**嚴格解析器：** Stalwart 的解析器在讀取網路輸入時非常嚴格。這種嚴格性確保任何格式錯誤或惡意命令都能及時識別和處理，而不會導致過多的資源浪費。
- **Extensive Fuzzing and Testing:** All parsers in Stalwart have undergone rigorous fuzzing and testing. Fuzzing is a testing technique that involves providing invalid, unexpected, or random data inputs to the software to identify vulnerabilities. This meticulous testing regime ensures that Stalwart can robustly handle a wide range of inputs without compromising on stability or security.
**廣泛的模糊測試和驗證：** Stalwart 中的所有解析器都經過了嚴格的模糊測試和驗證。模糊測試是一種測試技術，它透過向軟體提供無效、意外或隨機的資料輸入來識別漏洞。這種嚴謹的測試機制確保 Stalwart 能夠穩健地處理各種輸入，而不會影響其穩定性或安全性。
- **Written in Rust:** Stalwart is developed using the Rust programming language, which offers inherent safety features. Rust’s ownership model and type system prevent many common vulnerabilities associated with memory management that are prevalent in languages like C. This makes Stalwart inherently less susceptible to memory-related exploits compared to other mail servers such as Cyrus and Dovecot.
**使用 Rust 編寫：** Stalwart 使用 Rust 程式語言開發，該語言本身就具有安全特性。 Rust 的所有權模型和類型系統可以避免許多在 C 等語言中常見的記憶體管理漏洞。這使得 Stalwart 相比 Cyrus 和 Dovecot 等其他郵件伺服器，更不容易受到記憶體相關攻擊。
### Conclusion｜結論

 At Stalwart, we prioritize security and reliability. Our commitment to using secure coding practices, comprehensive testing, and leveraging the advantages of Rust ensures that Stalwart Mail Server remains resilient against the latest threats. We encourage our users to continue enjoying the peace of mind that comes with knowing their mail server is robust against vulnerabilities like [CVE-2024-34055](https://nvd.nist.gov/vuln/detail/CVE-2024-34055).

 在 Stalwart，我們始終將安全性和可靠性放在首位。我們致力於採用安全的編碼實踐、全面的測試，並充分利用 Rust 的優勢，確保 Stalwart 郵件伺服器能夠抵禦最新的威脅。我們鼓勵使用者繼續安心使用 Stalwart 郵件伺服器，因為他們知道該伺服器能夠抵禦諸如 [CVE -2024-34055](https://nvd.nist.gov/vuln/detail/CVE-2024-34055)之類的漏洞。

 For more information or support, please contact our team or visit our website. Stay secure with Stalwart\!

 如需更多資訊或協助，請聯絡我們的團隊或造訪我們的網站。選擇 Stalwart，安全無憂！

**Tags:**

**標籤：**

- [oom](https://stalw.art/blog/tags/oom/)
[oom](https://stalw.art/blog/tags/oom/)
- [exploit](https://stalw.art/blog/tags/exploit/)
[漏洞利用](https://stalw.art/blog/tags/exploit/)
- [cyrus](https://stalw.art/blog/tags/cyrus/)
[cyrus](https://stalw.art/blog/tags/cyrus/)
- [mail](https://stalw.art/blog/tags/mail/)
[郵件](https://stalw.art/blog/tags/mail/)
- [server](https://stalw.art/blog/tags/server/)
[伺服器](https://stalw.art/blog/tags/server/)
Introducing Webhooks and MTA Hooks
 Webhooks 與MTA Hooks 簡介

 Addressing the Overlooked DKIM Exploit in Stalwart Mail Server

 解決 Stalwart 郵件伺服器中被忽略的DKIM漏洞

 ---

 ⬆ 目錄　｜　⬅ 上一篇：OpenID Connect Integration is now Open Source｜OpenID Connect 整合現在是開源的　｜　下一篇：OpenID Connect - Secure Authentication Just Got Easier｜OpenID Connect－安全認證變得更簡單 ➡
