---

## title: "Introducing Milter Support to Stalwart SMTP｜為 Stalwart SMTP引入 Milter 支持"

 title\_original: "Introducing Milter Support to Stalwart SMTP"
source: "[https://stalw.art/blog/milter-support-smtp](https://stalw.art/blog/milter-support-smtp)"
chapter: \["blog"\]
order: 31
lang: "bilingual"
translated\_by: "google\_v2+gtx"
captured: "2026-10-05T01:02:59.638Z"

 ⬆ 目錄　｜　⬅ 上一篇：Migration proxy zero-downtime upgrades｜遷移代理零停機升級　｜　下一篇：MTA Hooks at the IETF｜MTA鉤子位於IETF ➡

# Introducing Milter Support to Stalwart SMTP｜為 Stalwart SMTP引入 Milter 支持

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

Jul 22, 2023 - 1 min read

 2023年7月22日 - 閱讀時間：1分鐘

 \[![Mauro D.](assets/selected_558_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

 A **milter**, or “mail filter”, is an extension to mail servers based on the Sendmail protocol. Milters allow third-party software to access mail messages as they are being processed in order to filter, modify, or annotate them. By using Milters, a mail server can utilize a variety of functionalities such as spam filtering, virus scanning, and other types of mail processing, beyond what is built into the mail server itself. Milters operate at the SMTP protocol level, which means they have access to both the SMTP envelope and the message contents.

**milter**，或“郵件過濾器”，是基於 Sendmail 協定的郵件伺服器的擴充。 Milters 允許第三方軟體在處理郵件訊息時存取它們，以便對其進行過濾、修改或註釋。透過使用 Milters，郵件伺服器可以利用郵件伺服器本身內建功能以外的各種功能，例如垃圾郵件過濾、病毒掃描和其他類型的郵件處理。 Milters 在SMTP協議層級運行，這表示它們可以存取SMTP信封和訊息內容。

 This new feature not only responds to our users’ needs but also ensures that Stalwart can work seamlessly with any existing setup. Whether you are seeking better spam protection, antivirus measures, or implementing specific processing rules, milter filtering has got you covered.

 這項新功能不僅滿足了用戶的需求，還能確保 Stalwart 與任何現有系統無縫整合。無論您是需要更強大的垃圾郵件防護、更完善的防毒措施，還是需要實施特定的處理規則，milter 過濾都能滿足您的需求。

 Learn more about milter filters and how to set them up in our documentation.

 了解更多關於milter過濾器以及如何設定它們的信息，請參閱我們的文件 。

**Tags:**

**標籤：**

- [milter](https://stalw.art/blog/tags/milter/)
[軍事](https://stalw.art/blog/tags/milter/)
- [smtp](https://stalw.art/blog/tags/smtp/)
[smtp](https://stalw.art/blog/tags/smtp/)
- [stalwart](https://stalw.art/blog/tags/stalwart/)
[堅定者](https://stalw.art/blog/tags/stalwart/)
- [mail](https://stalw.art/blog/tags/mail/)
[郵件](https://stalw.art/blog/tags/mail/)
- [server](https://stalw.art/blog/tags/server/)
[伺服器](https://stalw.art/blog/tags/server/)
Unleashing Email Flexibility: Address Rewriting is now available
 釋放電子郵件彈性：位址重寫功能現已上線

 Announcing Stalwart Mail Server: unified, efficient, and more powerful than ever\!

 隆重推出 Stalwart 郵件伺服器：統一、有效率、功能更強大！

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Migration proxy zero-downtime upgrades｜遷移代理零停機升級　｜　下一篇：MTA Hooks at the IETF｜MTA鉤子位於IETF ➡
