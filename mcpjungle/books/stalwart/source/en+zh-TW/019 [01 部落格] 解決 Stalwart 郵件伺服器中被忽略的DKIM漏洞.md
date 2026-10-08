---

## title: "Addressing the Overlooked DKIM Exploit in Stalwart Mail Server｜解決 Stalwart 郵件伺服器中被忽略的DKIM漏洞"

 title\_original: "Addressing the Overlooked DKIM Exploit in Stalwart Mail Server"
source: "[https://stalw.art/blog/dkim-exploit](https://stalw.art/blog/dkim-exploit)"
chapter: \["blog"\]
order: 19
lang: "bilingual"
translated\_by: "google\_v2+gtx"
captured: "2026-10-05T01:00:26.341Z"

 ⬆ 目錄　｜　⬅ 上一篇：Introducing Distributed SMTP Queues & Expressions｜分佈式SMTP隊列與表達式簡介　｜　下一篇：DKIM, ARC, SPF and DMARC authentication in Rust｜Rust 中的DKIM, ARC, SPF和DMARC身份驗證 ➡

# Addressing the Overlooked DKIM Exploit in Stalwart Mail Server｜解決 Stalwart 郵件伺服器中被忽略的DKIM漏洞

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

May 18, 2024 - 2 min read

 2024年5月18日 - 閱讀需時2分鐘

 \[![Mauro D.](assets/selected_546_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

### Introduction to DKIM and ARC｜DKIM和ARC簡介

 DKIM provides an email authentication method that allows an organization to take responsibility for a message in transit. The standard uses cryptographic signatures to verify that an email has not been altered since it was originally sent. ARC, on the other hand, is an email authentication system designed to provide a way to preserve email authentication results across subsequent intermediaries that might modify the message, thus extending the benefits of DKIM.

 DKIM提供了一種電子郵件認證方法，允許組織對傳輸中的郵件負責。該標準使用加密簽名來驗證電子郵件自最初發送以來是否已被篡改。另一方面， ARC是一種電子郵件認證系統，旨在提供一種方法來保留電子郵件認證結果，使其在後續可能修改郵件的中間環節中保持有效，從而擴展DKIM的優勢。

### The Exploit Revealed｜漏洞揭露

 The vulnerability uncovered by Zone.eu revolves around the DKIM’s “l=” parameter, which specifies the exact number of octets in the body of the email that are signed. This can be exploited by attackers who can append additional content to the message without affecting the validity of the DKIM signature. This oversight can lead emails with forged content to still appear as authenticated, deceiving both email systems and end-users, especially when visual trust indicators like BIMI are employed.

 Zone.eu 發現的漏洞與DKIM的「l=」參數有關，該參數指定了電子郵件正文中需要簽名的位元組數。攻擊者可以利用此漏洞，在不影響DKIM簽名有效性的情況下，在郵件中添加額外內容。這種疏忽會導致包含偽造內容的電子郵件仍然顯示為已驗證，從而欺騙電子郵件系統和最終用戶，尤其是在使用BIMI等視覺信任指示器時。

### Stalwart’s Response to the Exploit｜Stalwart 對此漏洞的回應

 Recognizing the gravity of this exploit, [Stalwart Mail Server](https://github.com/stalwartlabs/mail-server) has taken decisive steps to mitigate this risk and reinforce the security of email communications for its users. Initially, in Stalwart’s implementation of DKIM and ARC, the option to set a signature length was disabled by default, which was a preventive measure against potential misuse. To further strengthen security in light of the new findings, Stalwart has now entirely removed the ability to specify signature lengths in both DKIM signatures and ARC seals. This change ensures that users cannot accidentally enable this feature, which could lead to vulnerabilities.

 鑑於此次漏洞的嚴重性，[Stalwart Mail Server](https://github.com/stalwartlabs/mail-server)已採取果斷措施，降低風險並加強用戶電子郵件通訊的安全性。最初，在 Stalwart 實現的DKIM和ARC中，設定簽名長度的選項預設為停用狀態，這是為了防止潛在的濫用。為了根據最新發現進一步加強安全性，Stalwart 現在已完全移除在DKIM簽名和ARC印章中指定簽名長度的功能。此項目變更可確保使用者不會意外啟用此功能，從而避免安全漏洞的出現。

 Furthermore, Stalwart has enhanced its validation processes. Both DKIM signatures and ARC seals are now verified in strict mode exclusively. Stalwart will not validate any signatures or seals that include a length parameter \(the “l=” tag\). Instead, these will receive a neutral result, meaning they neither pass nor fail the verification process but are flagged for potential risk. This approach aligns with best practices recommended in the wake of the exploit’s discovery and is designed to prevent similar types of vulnerabilities from being exploited.

 此外，Stalwart 也增強了其驗證流程。 DKIM 簽名和 ARC 印章現在僅在嚴格模式下進行驗證。 Stalwart 不會驗證任何包含長度參數（「l=」標籤）的簽名或印章。相反，這些將收到中性結果，這意味著它們既不會通過也不會失敗驗證過程，但會被標記為潛在風險。這種方法符合漏洞發現後建議的最佳實踐，旨在防止類似類型的漏洞被利用。

### Conclusion｜結論

 Stalwart Mail Server’s response illustrates a proactive and security-conscious approach, ensuring that our users remain protected against emerging threats. By eliminating the option to specify signature lengths and enforcing strict validation standards, Stalwart continues to be at the forefront of safeguarding email communications against evolving cyber threats.

 Stalwart郵件伺服器的應對措施體現了其積極主動且注重安全的理念，確保用戶免受新興威脅的侵害。透過取消指定簽名長度的選項並強制執行嚴格的驗證標準，Stalwart始終走在保護電子郵件通訊免受不斷演變的網路威脅的最前沿。

 We extend our thanks to the researchers at Zone.eu for their diligence in uncovering this significant security concern, thereby contributing to the broader effort of enhancing email security across the globe.

 我們衷心感謝 Zone.eu 的研究人員，感謝他們孜孜不倦地發現了這一重大的安全問題，從而為在全球範圍內加強電子郵件安全做出了更廣泛的貢獻。

**Tags:**

**標籤：**

- [dkim](https://stalw.art/blog/tags/dkim/)
[dkim](https://stalw.art/blog/tags/dkim/)
- [exploit](https://stalw.art/blog/tags/exploit/)
[漏洞利用](https://stalw.art/blog/tags/exploit/)
- [bimi](https://stalw.art/blog/tags/bimi/)
[植物](https://stalw.art/blog/tags/bimi/)
- [mail](https://stalw.art/blog/tags/mail/)
[郵件](https://stalw.art/blog/tags/mail/)
- [server](https://stalw.art/blog/tags/server/)
[伺服器](https://stalw.art/blog/tags/server/)
Stalwart Unaffected by OOM Exploit Affecting Cyrus IMAP
 堅韌不拔不受OOM漏洞影響，但賽勒斯IMAP受到影響

 Unlock Seamless Scalability with Stalwart Mail Server

 使用 Stalwart 郵件伺服器解鎖無縫擴充

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Introducing Distributed SMTP Queues & Expressions｜分佈式SMTP隊列與表達式簡介　｜　下一篇：DKIM, ARC, SPF and DMARC authentication in Rust｜Rust 中的DKIM, ARC, SPF和DMARC身份驗證 ➡
