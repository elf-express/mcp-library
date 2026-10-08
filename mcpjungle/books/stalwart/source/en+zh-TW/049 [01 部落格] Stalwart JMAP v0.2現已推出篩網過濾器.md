---

## title: "Sieve filters are now available on Stalwart JMAP v0.2｜Stalwart JMAP v0.2現已推出篩網過濾器"

 title\_original: "Sieve filters are now available on Stalwart JMAP v0.2"
source: "[https://stalw.art/blog/sieve-stalwart-jmap](https://stalw.art/blog/sieve-stalwart-jmap)"
chapter: \["blog"\]
order: 49
lang: "bilingual"
translated\_by: "google\_v2"
captured: "2026-10-05T01:03:37.220Z"

 ⬆ 目錄　｜　⬅ 上一篇：Sieve filter interpreter for Rust｜Rust 的 Sieve 過濾器解釋器　｜　下一篇：Introducing Sievepad write and debug Sieve scripts in the browser｜隆重介紹 Sievepad，可在瀏覽器中編寫和偵錯 Sieve 腳本。 ➡

# Sieve filters are now available on Stalwart JMAP v0.2｜Stalwart JMAP v0.2現已推出篩網過濾器

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

Oct 31, 2022 - 2 min read

 2022年10月31日 - 閱讀時間：2分鐘

 \[![Mauro D.](assets/selected_358_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

 Today [Stalwart JMAP v0.2](https://github.com/stalwartlabs/jmap-server/) was released including support for the for [JMAP for Sieve Scripts](https://www.ietf.org/archive/id/draft-ietf-jmap-sieve-12.html) draft. Additionally, [ManageSieve](https://datatracker.ietf.org/doc/html/rfc5804) support was added to [Stalwart IMAP v0.2](https://github.com/stalwartlabs/imap-server/).

 今天發布了 [Stalwart JMAP v0.2](https://github.com/stalwartlabs/jmap-server/)其中包括對 [JMAP for Sieve Scripts](https://www.ietf.org/archive/id/draft-ietf-jmap-sieve-12.html)草稿的支援。此外，[ManageSieve](https://datatracker.ietf.org/doc/html/rfc5804)支援也已加入 [Stalwart IMAP v0.2](https://github.com/stalwartlabs/imap-server/)中。

 Stalwart JMAP safely runs Sieve scripts in a controlled sandbox that ensures that programs do not exceed or abuse their allocated system resources.

 Stalwart JMAP在受控沙箱中安全地執行 Sieve 腳本，確保程式不會超出或濫用其分配的系統資源。

 Unlike other mail servers that offer limited support for Sieve extensions, Stalwart JMAP supports all existing Sieve extensions including:

 與其他對 Sieve 擴展支援有限的郵件伺服器不同，Stalwart JMAP支援所有現有的 Sieve 擴展，包括：

- [RFC 5228 — Sieve: An Email Filtering Language](https://datatracker.ietf.org/doc/html/rfc5228)
[RFC 5228 — Sieve：一種電子郵件過濾語言](https://datatracker.ietf.org/doc/html/rfc5228)
- [RFC 3894 — Copying Without Side Effects](https://datatracker.ietf.org/doc/html/rfc3894)
[RFC 3894 — 無副作用複製](https://datatracker.ietf.org/doc/html/rfc3894)
- [RFC 5173 — Body Extension](https://datatracker.ietf.org/doc/html/rfc5173)
[RFC 5173 — 身體伸展](https://datatracker.ietf.org/doc/html/rfc5173)
- [RFC 5183 — Environment Extension](https://datatracker.ietf.org/doc/html/rfc5183)
[RFC 5183 — 環境擴展](https://datatracker.ietf.org/doc/html/rfc5183)
- [RFC 5229 — Variables Extension](https://datatracker.ietf.org/doc/html/rfc5229)
[RFC 5229 — 變數擴充](https://datatracker.ietf.org/doc/html/rfc5229)
- [RFC 5230 — Vacation Extension](https://datatracker.ietf.org/doc/html/rfc5230)
[RFC 5230 — 假期延期](https://datatracker.ietf.org/doc/html/rfc5230)
- [RFC 5231 — Relational Extension](https://datatracker.ietf.org/doc/html/rfc5231)
[RFC 5231 — 關係擴展](https://datatracker.ietf.org/doc/html/rfc5231)
- [RFC 5232 — Imap4flags Extension](https://datatracker.ietf.org/doc/html/rfc5232)
[RFC 5232 — Imap4flags 擴充](https://datatracker.ietf.org/doc/html/rfc5232)
- [RFC 5233 — Subaddress Extension](https://datatracker.ietf.org/doc/html/rfc5233)
[RFC 5233 — 子位址擴充](https://datatracker.ietf.org/doc/html/rfc5233)
- [RFC 5235 — Spamtest and Virustest Extensions](https://datatracker.ietf.org/doc/html/rfc5235)
[RFC 5235 — Spamtest 與 Virustest 擴充程式](https://datatracker.ietf.org/doc/html/rfc5235)
- [RFC 5260 — Date and Index Extensions](https://datatracker.ietf.org/doc/html/rfc5260)
[RFC 5260 — 日期與索引擴充](https://datatracker.ietf.org/doc/html/rfc5260)
- [RFC 5293 — Editheader Extension](https://datatracker.ietf.org/doc/html/rfc5293)
[RFC 5293 — 編輯頁眉擴充](https://datatracker.ietf.org/doc/html/rfc5293)
- [RFC 5429 — Reject and Extended Reject Extensions](https://datatracker.ietf.org/doc/html/rfc5429)
[RFC 5429 — 拒絕與擴展拒絕擴展](https://datatracker.ietf.org/doc/html/rfc5429)
- [RFC 5435 — Extension for Notifications](https://datatracker.ietf.org/doc/html/rfc5435)
[RFC 5435 — 通知擴充](https://datatracker.ietf.org/doc/html/rfc5435)
- [RFC 5463 — Ihave Extension](https://datatracker.ietf.org/doc/html/rfc5463)
[RFC 5463 — 我有擴充](https://datatracker.ietf.org/doc/html/rfc5463)
- [RFC 5490 — Extensions for Checking Mailbox Status and Accessing Mailbox Metadata](https://datatracker.ietf.org/doc/html/rfc5490)
[RFC 5490 — 用於檢查郵箱狀態和存取郵箱元資料的擴充功能](https://datatracker.ietf.org/doc/html/rfc5490)
- [RFC 5703 — MIME Part Tests, Iteration, Extraction, Replacement, and Enclosure](https://datatracker.ietf.org/doc/html/rfc5703)
[RFC 5703 — MIME零件測試、迭代、提取、替換和封裝](https://datatracker.ietf.org/doc/html/rfc5703)
- [RFC 6009 — Delivery Status Notifications and Deliver-By Extensions](https://datatracker.ietf.org/doc/html/rfc6009)
[RFC 6009 — 配送狀態通知及預計送達日期延長](https://datatracker.ietf.org/doc/html/rfc6009)
- [RFC 6131 — Sieve Vacation Extension: “Seconds”（秒） Parameter](https://datatracker.ietf.org/doc/html/rfc6131)
[RFC 6131 — 篩分休假擴展： “Seconds”（秒）參數](https://datatracker.ietf.org/doc/html/rfc6131)
- [RFC 6134 — Externally Stored Lists](https://datatracker.ietf.org/doc/html/rfc6134)
[RFC 6134 — 外部儲存清單](https://datatracker.ietf.org/doc/html/rfc6134)
- [RFC 6558 — Converting Messages before Delivery](https://datatracker.ietf.org/doc/html/rfc6558)
[RFC 6558 — 發送前轉換訊息](https://datatracker.ietf.org/doc/html/rfc6558)
- [RFC 6609 — Include Extension](https://datatracker.ietf.org/doc/html/rfc6609)
[RFC 6609 — 包含擴充](https://datatracker.ietf.org/doc/html/rfc6609)
- [RFC 7352 — Detecting Duplicate Deliveries](https://datatracker.ietf.org/doc/html/rfc7352)
[RFC 7352 — 偵測重複投遞](https://datatracker.ietf.org/doc/html/rfc7352)
- [RFC 8579 — Delivering to Special-Use Mailboxes](https://datatracker.ietf.org/doc/html/rfc8579)
[RFC 8579 — 投遞至特殊用途信箱](https://datatracker.ietf.org/doc/html/rfc8579)
- [RFC 8580 — File Carbon Copy \(FCC\)](https://datatracker.ietf.org/doc/html/rfc8580)
[RFC 8580 — 文件副本 \( FCC \)](https://datatracker.ietf.org/doc/html/rfc8580)
- [RFC 9042 — Delivery by MAILBOXID](https://datatracker.ietf.org/doc/html/rfc9042)
[RFC 9042 — 透過郵件 ID 投遞](https://datatracker.ietf.org/doc/html/rfc9042)
- [REGEX-01 — Regular Expression Extension \(draft-ietf-sieve-regex-01\)](https://www.ietf.org/archive/id/draft-ietf-sieve-regex-01.html)
[REGEX -01 — 正規表示式擴充 \(draft-ietf-sieve-regex-01\)](https://www.ietf.org/archive/id/draft-ietf-sieve-regex-01.html)
**Tags:**
**標籤：**

- [sieve](https://stalw.art/blog/tags/sieve/)
[篩子](https://stalw.art/blog/tags/sieve/)
- [jmap](https://stalw.art/blog/tags/jmap/)
[jmap](https://stalw.art/blog/tags/jmap/)
- [server](https://stalw.art/blog/tags/server/)
[伺服器](https://stalw.art/blog/tags/server/)
DKIM, ARC, SPF and DMARC authentication in Rust
 Rust 中的DKIM, ARC, SPF和DMARC身份驗證

 Sieve filter interpreter for Rust

 Rust 的 Sieve 過濾器解釋器

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Sieve filter interpreter for Rust｜Rust 的 Sieve 過濾器解釋器　｜　下一篇：Introducing Sievepad write and debug Sieve scripts in the browser｜隆重介紹 Sievepad，可在瀏覽器中編寫和偵錯 Sieve 腳本。 ➡
