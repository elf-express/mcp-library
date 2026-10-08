---

## title: "DKIM2 and DMARCbis have landed, and Stalwart speaks them first｜DKIM2和 DMARCbis 已經著陸，Stalwart 首先與他們交談。"

 title\_original: "DKIM2 and DMARCbis have landed, and Stalwart speaks them first"
source: "[https://stalw.art/blog/dkim2-dmarcbis](https://stalw.art/blog/dkim2-dmarcbis)"
chapter: \["blog"\]
order: 21
lang: "bilingual"
translated\_by: "google\_v2+gtx"
captured: "2026-10-05T01:00:28.371Z"

 ⬆ 目錄　｜　⬅ 上一篇：DKIM, ARC, SPF and DMARC authentication in Rust｜Rust 中的DKIM, ARC, SPF和DMARC身份驗證　｜　下一篇：Introducing Encryption at Rest Protecting Your Emails Even When They Sleep｜推出靜態加密功能，即使在郵件休眠時也能保護您的郵件安全 ➡

# DKIM2 and DMARCbis have landed, and Stalwart speaks them first｜DKIM2和 DMARCbis 已經著陸，Stalwart 首先與他們交談。

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

Jul 6, 2026 - 27 min read

 2026年7月6日 - 閱讀時間：27分鐘

 \[![Mauro D.](assets/selected_548_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

 Email authentication has quietly held the internet’s mail together for two decades, and it has just taken its biggest step forward yet. Two efforts arrived at once. **DKIM2\(currently at [draft -04](https://datatracker.ietf.org/doc/draft-ietf-dkim-dkim2-spec/)\) reworks DKIM so that a signature is no longer a lonely statement about content but one link in a verifiable chain of custody that follows a message from author to final recipient: forwarding stops breaking signatures, replayed mail no longer verifies, and a bounce can prove it is genuine.**DMARCbis \(published in May 2026 as [RFC 9989](https://www.rfc-editor.org/rfc/rfc9989/), [RFC 9990](https://www.rfc-editor.org/rfc/rfc9990/), and [RFC 9991](https://www.rfc-editor.org/rfc/rfc9991/)\) is the long-awaited successor to DMARC: it replaces the static Public Suffix List with a live DNS tree walk, retires the tags that never worked, and folds a decade of hard-won operational lessons back into the standard.

 電子郵件認證默默地維繫了網路郵件二十年，如今它迎來了迄今為止最大的進步。兩項改進同時出台。 **DKIM2（目前為[draft -04](https://datatracker.ietf.org/doc/draft-ietf-dkim-dkim2-spec/) ）對DKIM進行了重新設計，使簽名不再僅僅是對內容的孤立聲明，而是可驗證的郵件流轉鏈中的一個環節，貫穿消息從作者到最終信的整個郵件**DMARCbis（於 2026 年 5 月發布，版本為 [RFC 9989](https://www.rfc-editor.org/rfc/rfc9989/) , [RFC 9990](https://www.rfc-editor.org/rfc/rfc9990/)和 \[ RFC \([https://www.rfc-editor.org/rfc/rfc9991/](https://www.rfc-editor.org/rfc/rfc9991/)\) ）是DMARC的期待已久的繼任者：它用實時DNS樹遍歷取代了靜態的公共後綴列表，棄用了從未生效的標籤，並將十年來來回的運營經驗教訓融入到標準中。

 Both matter because email authentication is what keeps a phisher from putting your bank’s domain in the `From:` line, and until now the machinery that does it has been showing its age. This post walks through what each protocol changes and why it matters.

 兩者都至關重要，因為電子郵件身份驗證可以防止網路釣魚者將您銀行的網域添加到`From:`行中，而目前用於執行此操作的機制已經顯得老舊。本文將詳細介紹每種協議的變更及其重要性。

 It is also an announcement. As of [Stalwart v0.16.12](https://github.com/stalwartlabs/stalwart/releases), both DKIM2 and DMARCbis are fully implemented, and Stalwart is the first mail server to support them. Anyone curious can sign and verify DKIM2 messages, and run DMARCbis checks, directly from the browser at the [mail-auth playground](https://mail-auth.stalw.art/), no install required. More on that at the end; first, the protocols.

 這也是一項公告。從 [Stalwart v0.16.12](https://github.com/stalwartlabs/stalwart/releases)開始， DKIM2和 DMARCbis 均已完全實現，Stalwart 是首個支援它們的郵件伺服器。任何有興趣的使用者都可以直接在 [mail-auth playground](https://mail-auth.stalw.art/)中透過瀏覽器簽署和驗證DKIM2郵件，並執行 DMARCbis 檢查，無需安裝任何軟體。更多詳情將在文末介紹；首先，我們來看看這些協議。

## Meet DKIM2｜遇見DKIM2

 DKIM \(DomainKeys Identified Mail, [RFC 6376](https://www.rfc-editor.org/rfc/rfc6376)\) does one deceptively simple thing: it lets a domain take responsibility for a message. The sending server hashes a chosen set of header fields and the body, signs the result with a private key, and staples the outcome to the message in a `DKIM-Signature` header. The matching public key lives in DNS at `selector._domainkey.domain`, so any receiver can fetch it, recompute the hashes, and confirm two things: the message really was authorised by that domain, and nothing covered by the signature changed along the way.

 DKIM （網域金鑰識別郵件，[RFC 6376](https://www.rfc-editor.org/rfc/rfc6376) ）的功能看似簡單，實則不然：它允許網域對郵件負責。發送伺服器對選定的郵件頭字段和郵件正文進行哈希運算，使用私鑰對結果進行簽名，並將結果附加到郵件的`DKIM-Signature`郵件頭中。匹配的公鑰位於DNS的`selector._domainkey.domain`處，因此任何接收者都可以獲取該公鑰，重新計算哈希值，並確認兩件事：郵件確實由該域名授權，並且簽名所涵蓋的內容在傳輸過程中沒有發生任何更改。

 That is the whole promise. A valid signature means “this domain vouches for this content.” It says nothing about who the message was for, where it has been, or where it is going next. For nearly twenty years that was enough, and DKIM quietly became one of the load-bearing walls of email authentication.

 這就是全部承諾。有效的簽名意味著「此網域保證此內容的真實性」。它不會透露郵件的收件者、流轉路徑或最終目的地。近二十年來，這已足夠， DKIM也悄悄成為電子郵件身份驗證的基石之一。

 On its own, a DKIM pass is just a true statement about some domain. [DMARC](https://www.rfc-editor.org/rfc/rfc9989/) is what turns it into a decision. DMARC ties authentication to the domain a human actually sees, the one in the `From:` header, through a rule called **identifier alignment**: a DKIM result only counts toward DMARC if the signing domain \(`d=`\) lines up with the `From:` domain. Pass alignment on either DKIM or SPF and the message clears DMARC; fail both and it meets the domain’s published policy, which can mean quarantine or outright rejection.

 就其本身而言， DKIM pass 只是關於某個領域的一個真實陳述。DMARC\]\([https://www.rfc-editor.org/rfc/rfc9989/](https://www.rfc-editor.org/rfc/rfc9989/)\) 正是這一點讓它變成了決定。 DMARC 將身分驗證與人們實際看到的網域（即在…中的網域）關聯起來 `From:` 標頭，透過名為「標識符對齊」的規則：a DKIM 結果僅計入 DMARC 如果簽章域（`d=`\) 與 `From:` 域。透過比對任一 DKIM 或者 SPF 訊息已清除。 DMARC; 如果兩項都失敗，則符合該網域的已發布策略，這表示隔離或直接拒絕。

 This is exactly why a broken DKIM signature is not a cosmetic problem. When DKIM breaks on a message from a domain publishing `p=reject`, and SPF cannot save it either, that message is gone. Which brings us to the reason DKIM2 exists: over two decades of real-world routing, DKIM1 signatures break far more often than anyone would like, and in a few cases they hold when we wish they wouldn’t.

 這就是為什麼DKIM簽名失效並非無關緊要的小問題。當DKIM在處理來自發布`p=reject`的域的訊息時失效，且SPF也無法保存該訊息時，該訊息就遺失了。這就引出了DKIM2存在的意義：在二十多年的實際路由實踐中， DKIM1簽名失效的頻率遠超預期，而且在某些情況下，即使我們不希望失效，它仍然有效。

### Issues with DKIM1｜DKIM1的問題

 None of what follows is a knock on the original design. These are the seams that two decades of deployment pulled apart, and they are the exact list DKIM2 sets out to close.

 以下內容並非對原設計的批評。這些是二十年部署過程中出現的缺陷，也是DKIM2旨在解決的問題。

- **Anyone could be the recipient.** A DKIM1 signature is bound to the content, not to a destination. Capture one legitimately signed message and you can replay it to millions of other addresses, unchanged, and every copy still verifies. The replay rides on the original signer’s good reputation, which is precisely what makes it valuable to abusers.
**任何人都可以是接收者。** DKIM1 簽名綁定到內容，而不是目的地。捕獲一條合法簽名的訊息，您可以將其重播到數百萬個其他地址，保持不變，並且每個副本仍然經過驗證。重播依賴原始簽署者的良好聲譽，這正是它對濫用者有價值的原因。
- **Forwarding breaks the signature, silently and ambiguously.** The moment a mailing list tags a subject, a gateway rewrites a link, or a forwarder appends a footer, the signed hashes no longer match and the signature fails. Worse, a verifier cannot tell an innocent `[list]` prefix from wholesale replacement by an attacker. Both look identical: broken.
**郵件轉寄會悄悄且含糊地破壞簽章。** 一旦郵件清單將標籤、網關重寫連結或轉發器新增頁腳，簽章雜湊值就會不再匹配，簽章也會失效。更糟的是，驗證者無法區分無辜的`[list]`前綴和攻擊者的大規模替換。兩者看起來完全相同：都已失效。
- **There was no record of the road travelled.** DKIM1 leaves no trustworthy trace of the path a message took. The `Received` and `Return-Path` headers are unauthenticated and trivial to forge, so there is no chain of custody to reason about.
**沒有留下行進路線的記錄。** DKIM1不會留下`Return-Path` `Received`頭未經認證且易於偽造，因此無法推斷資訊的流轉過程。
- **ARC was a patch that receivers struggle to trust.** [ARC](https://www.rfc-editor.org/rfc/rfc8617) tried to preserve authentication across intermediaries by having each hop attest to what it saw, but it sits alongside DKIM as a separate overlay, and in practice most receivers report that they cannot confidently trust ARC seals.
**ARC是一個接收方難以信任的補丁。** [ARC](https://www.rfc-editor.org/rfc/rfc8617)試圖透過讓每一跳都證明它所看到的內容來保持跨中間層的身份驗證，但它與DKIM一起作為單獨的覆蓋層存在，實際上大多數接收方報告說他們無法自信地信任ARC密封。
- **Header signing was inconsistent.** DKIM1 lets the signer choose which headers to cover and offers multiple canonicalization modes, which leaves gaps an attacker can slip unsigned headers through and makes signatures needlessly fragile.
**標頭簽名不一致。** DKIM1允許簽署者選擇要覆蓋哪些標頭，並提供多種規範化模式，這留下了漏洞，攻擊者可以趁機插入未簽名的標頭，使簽名變得不必要地脆弱。
- **Bounces could not be trusted, and hurt bystanders.**Because the return path can name a domain that never handled the message, a Delivery Status Notification \(DSN\) can land on a forged, innocent third party. This is**backscatter**, and the fear of it is why deferred bounces, the kind a provider would send after deciding a message is spam an hour later, are largely impractical today.
**退信不可信，會損害旁觀者的利益。**由於退信路徑可能指向從未處理過該郵件的域名，因此投遞狀態通知（ DSN ）可能會被偽造的、無辜的第三方收到。這就是**反向散射**，正是出於對反向散射的擔憂，延遲退信（即服務商在判定郵件為垃圾郵件一小時後發送的退信）如今已基本不切實際。

- **Feedback was ad hoc.** Intermediaries and senders exchange informal signals about how mail is performing, but there is no standard for requesting or routing that feedback, so it is inconsistent and often unhelpful.
**反饋是臨時的。** 中介和寄件者交換有關郵件執行情況的非正式訊號，但沒有要求或路由該回饋的標準，因此回饋不一致且通常沒有幫助。


### DKIM2, in a nutshell｜DKIM2 ，簡而言之

 DKIM2 keeps everything that worked and changes the thing that did not. The cryptography is familiar: hash the message, sign it, publish the public key in DNS at the same `_domainkey` location DKIM1 already uses. What changes is that a signature stops being a lonely statement about content and becomes one link in a **verifiable chain of custody** that follows the message from originator to final recipient.

 DKIM2保留了所有有效部分，並修改了無效部分。加密過程很熟悉：對訊息進行哈希處理，簽名，並將公鑰發佈到DNS中，位置DKIM1 `_domainkey`使用的位置相同。不同之處在於，簽章不再只是對內容的孤立描述，而是成為**可驗證的監管鏈**中的一個環節，該監管鏈追蹤訊息從發起者到最終接收者的完整過程。

 To do that, DKIM2 splits the old single header into two, each with its own job.

 為此， DKIM2將舊的單一標頭拆分為兩個，每個標頭都有自己的任務。

 The **`Message-Instance`** header describes the message at a point in time. It carries a revision number, a set of cryptographic fingerprints over the headers and body at that revision, and, when a hop has changed something, a compact “recipe” that spells out how to undo the change \(the mechanism covered later that makes forwarding survivable\).

**`Message-Instance`** 標頭描述了訊息在某個時間點的狀態。它包含一個修訂號，一組針對該修訂版標頭和正文的加密指紋，以及當某個躍點更改了某些內容時，一個簡潔的“配方”，詳細說明瞭如何撤銷更改（稍後將介紹的機制，它使轉發具有生存能力）。

 The **`DKIM2-Signature`** header records the envelope the message actually travelled with, then signs over it. Alongside the familiar DKIM pieces, the signing domain, the selector, the signature itself and a timestamp, it captures the SMTP `MAIL FROM` and `RCPT TO` of that hop, a sequence number so the signatures form an ordered chain, and a small set of flags that a sender or intermediary can raise to forbid fan-out, mark legitimate fan-out, or request feedback. Putting the envelope inside the signature is what lets consecutive hops be checked for consistency; recording who signed and in what order is what turns a pile of signatures into a chain.

**`DKIM2-Signature`** 頭部記錄郵件實際使用的信封，並對其進行簽名。除了常見的DKIM部分（簽名域、選擇器、簽名本身和時間戳）之外，它還捕獲了該跳轉的SMTP `MAIL FROM`和`RCPT TO`部分、一個用於確保簽名形成有序鏈的序號，以及一組發件人或中間人可以設置的標誌，用於禁止扇出、合法出扇或反饋。將信封資訊放入簽名中，可以檢查連續跳躍的一致性；記錄簽名者及其簽名順序，可以將一堆簽名變成一條鏈。

 Two counters drive everything. One counts signatures, one per hop. The other counts message revisions, incremented only when a hop actually changes the content. A purely transparent forwarder that touches nothing does not even need to be DKIM2-aware.

 一切都由兩個計數器驅動。一個計數器統計簽名，每個躍點統計一個簽名。另一個計數器統計訊息修訂次數，只有當躍點實際更改內容時才會遞增。一個完全透明、不觸及任何內容的轉發器甚至不需要了解DKIM2 。

### One mechanism per broken promise｜每違背一個承諾，就對應一種機制。

 The elegance of DKIM2 is that a handful of mechanisms retire the whole list above at once.

 DKIM2的精妙之處在於，只需少數幾個機制就能同時解決上述所有問題。

- **Replay** is answered by putting the envelope inside the signature. Each `DKIM2-Signature` records the `MAIL FROM` \(`mf=`\) and `RCPT TO` \(`rt=`\) it was sent with, and consecutive hops must line up: the sending domain of one hop has to match a recipient domain of the previous one. A message replayed to a different recipient no longer forms a valid chain. A sender can add `donotexplode` to forbid fan-out, and a mailing list marks legitimate fan-out with `exploded`.
**重播**的回覆方式是將信封放入簽名中。每個`DKIM2-Signature`記錄了與其一起發送的`MAIL FROM` （ `mf=` ）和`RCPT TO` （ `rt=` ），並且連續的躍點必須匹配：一個躍點的發送域必須與前一個躍點的接收域匹配。重播給不同接收者的訊息不再構成有效的鏈。發送者可以加`donotexplode`來禁止扇出，郵件列表使用`exploded`標記合法的扇出。

- **Forwarding breakage** is answered by recipes. A hop that modifies the message records a reversible recipe, so downstream verifiers can undo the change and re-check every earlier signature instead of throwing the whole thing out.
**轉發錯誤**由可逆配方解決。修改訊息的跳躍操作會記錄一個可逆配方，這樣下游驗證者就可以撤銷更改並重新檢查先前的每個簽名，而不是丟棄整個訊息。

- **The missing chain of custody** is the chain itself: each hop appends its own signature over the current snapshot and all prior signatures, forming a tamper-evident sequence from author to recipient.
**缺少的監管鏈**就是監管鏈本身：每一跳都會在當前快照和所有先前的簽名上附加自己的簽名，從而形成從作者到接收者的防篡改序列。

- **ARC’s role** is absorbed natively. The chain does what ARC attempted, without a parallel set of headers, and DKIM2 explicitly ignores both legacy `DKIM-Signature` and `ARC-*` headers so the two schemes can coexist during migration.
**ARC的作用** 已原生實作。該鏈實現了ARC嘗試的功能，無需並行的頭部信息，並且DKIM2明確忽略了舊版`DKIM-Signature`和`ARC-*`頭部信息，因此這兩個方案可以在遷移過程中共存。
- **Inconsistent header signing** is answered by a single fixed canonicalization and a defined hashing scheme, removing the per-signer guesswork.
**不一致的標頭簽章**問題透過單一的固定規範化和定義的雜湊方案得到解決，從而消除了每個簽署者都需要猜測的問題。

- **Backscatter** is answered by routing bounces along the recorded chain, covered next.
**反向散射**是透過沿著記錄鏈路由反彈來解決的，接下來將對此進行介紹。

- **Feedback** gets a standard channel through the `feedback` and `feedhere` flags.
**回饋** 透過`feedback`和`feedhere`標誌獲得標準通道。


 One caveat, contrary to a common claim: DKIM2 can require *more* signature checks, not fewer. A modified message adds a signature at every hop, and a verifier may need to check the whole chain. What the draft does allow is checking the most recently applied signature first and stopping at the first failure, so an unmodified message can often be cleared with a single verification.

 與常見的說法相反，需要注意一點： DKIM2可能需要*更多*的簽名檢查，而不是更少。修改後的訊息會在每一跳都添加一個簽名，驗證者可能需要檢查整個鏈。該草案允許先檢查最近應用的簽名，並在第一次失敗時停止，因此通常只需一次驗證即可清除未修改的訊息。

### Recipes: putting a message back the way it was｜食譜：將資訊恢復原狀

 This is the mechanism that makes forwarding survivable, so it is worth seeing in full.

 這是使轉發得以持續的機制，因此值得全面了解。

 A **recipe** is a small JSON object, base64-encoded into the `r=` tag, that tells a verifier how to turn the *current* message back into the *previous* one. It has two optional parts, `"h"` for header fields and `"b"` for the body, and each is a list of steps:

**配方**是一個小型的JSON對象，以base64編碼形式封裝在`r=`標籤中，它告訴驗證器如何將*當前*訊息轉換回*先前*的訊息。它有兩個可選部分， `"h"`用於標頭字段， `"b"`用於正文，每個部分都是一個步驟列表：

- `{"c": [start, end]}` copies a range of lines or header instances from the current message, inclusive.
`{"c": [start, end]}`從目前郵件複製一系列行或標頭實例（包括目前郵件本身）。
- `{"d": ["value", ...]}` inserts literal values that used to be there.
`{"d": ["value", ...]}`插入以前存在的字面值。
Two numbering rules matter. Header instances are counted **bottom-up\(the last `Subject:` is number 1, the one above it is 2\), and body lines are counted**top-down \(the first line is 1\). An empty step list `[]` for a header means “remove every instance.” A body recipe of `null` is a special case: it means the previous body genuinely cannot be reconstructed, which a verifier may accept from an entity it trusts, for example a contractually arranged redaction service.
 兩條編號規則至關重要。頭部實例依**自下而上**計數（最後一個`Subject:`編號為1，其上一個為2），主體行按**自上而下**計數（第一行編號為1）。頭部的空步驟清單`[]`表示「刪除所有實例」。主體配方`null`是一種特殊情況：它表示先前的主體確實無法重建，驗證者可以接受來自其信任的實體（例如，合約約定的編輯服務）的此類資訊。

#### A message through two hops｜一則經過兩跳的訊息

 Alice sends a note to a mailing list.

 愛麗絲向郵件清單發送了一封郵件。

**Hop 1, the originator signs.** The message leaves `example.com`:

**第一跳，發起者簽署。** 訊息離開`example.com` ：

```yaml
From: [email protected]
To: [email protected]
Subject: Trip report

Had a great time.
See you soon.
```

She stamps it with the first revision and the first signature \(hashes abbreviated\):

 她在上面蓋上了第一次修改的印章和第一個簽名（井號縮寫）：

```
Message-Instance: m=1; h=sha256:Hh1...:Bh1...
DKIM2-Signature: i=1; m=1; t=1782394336; d=example.com;
  s=ed25519:ed25519-sha256:rDU9v...;
  mf=PGFsaWNlQGV4YW1wbGUuY29tPg==;
  rt=PGxpc3RAbGlzdHMuZXhhbXBsZS5vcmc+
```

The `mf=` value decodes to `<[[email protected]](https://stalw.art/cdn-cgi/l/email-protection)>` and `rt=` to `<[[email protected]](https://stalw.art/cdn-cgi/l/email-protection)>`.

`mf=`值解碼為`<[[email protected]](https://stalw.art/cdn-cgi/l/email-protection)>` ， `rt=`解碼為`<[[email protected]](https://stalw.art/cdn-cgi/l/email-protection)>` 。

**Hop 2, the list revises.** The list software tags the subject and appends an unsubscribe footer, so the message is now:

**第二步，郵件清單進行修改。** 郵件列表軟體會為郵件主題添加標籤並附上取消訂閱鏈接，因此郵件內容現在為：

```yaml
From: [email protected]
To: [email protected]
Subject: [list] Trip report

Had a great time.
See you soon.
--
Unsubscribe: https://lists.example.org/u
```

Two things changed: the subject gained a `[list]` prefix, and two lines were appended. The list computes the recipe that reverses both. The subject \(one instance, so number 1\) is replaced with its old literal value, and the body copies the two original lines while dropping the footer:

 兩件事發生了變化：主題添加了`[list]`前綴，並且追加了兩行。列表計算出的配方會反轉這兩件事。主題（一個實例，即編號 1）被替換為其原來的字面值，正文複製原始的兩行，同時刪除頁腳：

```json
{"h":{"subject":[{"d":["Trip report"]}]},"b":[{"c":[1,2]}]}
```

Read the body step as “to rebuild the previous body, copy current lines 1 through 2, and stop.” The footer at current lines 3 and 4 simply is not copied, so it disappears on reversal. The list base64-encodes that JSON into `r=`, records a fresh fingerprint, and adds its own signature:

 將主體步驟理解為「要重建先前的主體，請複製目前第 1 行到第 2 行，然後停止。」目前第 3 行和第 4 行的頁腳不會被複製，因此在反轉時會消失。列表將JSON進行 base64 編碼為`r=` ，記錄一個新的指紋，並添加自己的簽名：

```
Message-Instance: m=2; h=sha256:Hh2...:Bh2...;
  r=eyJoIjp7InN1YmplY3QiOlt7ImQiOlsiVHJpcCByZXBvcnQiXX1dfSwiYiI6W3siYyI6WzEsMl19XX0=
DKIM2-Signature: i=2; m=2; t=1782394500; d=lists.example.org;
  s=ed25519:ed25519-sha256:9aBc...;
  mf=PGJvdW5jZXNAbGlzdHMuZXhhbXBsZS5vcmc+;
  rt=PGJvYkBleGFtcGxlLm5ldD4=
```

The chain of custody holds because hop 2’s `mf=` domain \(`lists.example.org`\) matches hop 1’s `rt=` domain \(`lists.example.org`\), and `d=lists.example.org` matches the rightmost labels of that `mf=`.

 監管鏈成立，因為跳躍 2 的`mf=`域 \( `lists.example.org` \) 與跳躍 1 的`rt=`域 \( `lists.example.org` \) 匹配，並且`d=lists.example.org`與`mf=`的最右邊的標籤匹配。

**Final recipient, Bob, verifies.** His server works backwards:

**最後收件者鮑伯進行了核實。** 他的伺服器運作方式相反：

1. Check the chain lines up: hop 2’s sending domain matches hop 1’s recipient domain. Good, no replay.
檢查連結：第二跳的發送域與第一跳的接收域相符。很好，沒有重播攻擊。
2. Verify each signature’s cryptography over its reconstructed input.
對每個簽章的重構輸入進行加密驗證。
3. Recompute the `m=2` fingerprint against the message as received. It matches.
根據接收到的訊息重新計算`m=2`指紋。結果匹配。
4. Apply the `r=` recipe to rebuild the `m=1` message: restore the subject to `Trip report` and drop the footer.
應用`r=`配方重建`m=1`郵件：將主題恢復為`Trip report`並刪除頁腳。
5. Recompute the `m=1` fingerprint against that reconstruction. It matches Alice’s original signature.
根據重建結果重新計算`m=1`指紋。它與Alice的原始簽名相符。
Alice’s signature validates even though the list rewrote her subject and appended a footer. And because every change is spelled out, Bob can see *exactly* what the list did. A footer tweak and a malicious body swap no longer look the same.
 即使郵件列表修改了愛麗絲的郵件主題並添加了頁腳，她的簽名仍然有效。而且由於每一處改動都清晰地記錄了下來，鮑勃可以*確切地*看到郵件列表做了什麼。頁腳的修改和惡意的郵件正文替換不再是一回事了。

 Bottom-up header numbering is not decoration; it is what keeps duplicated headers unambiguous. A recipe that deletes the middle of three `Subject:` headers, for instance, reads as copy the bottom one, insert the deleted literal, copy the top one:

 由下而上的標頭編號並非裝飾；它能確保重複標頭的區分度。例如，刪除三個`Subject:`標頭中間部分的配方，其內容為：複製最下面的標頭，插入刪除的文本，複製最上面的標頭：

```json
{"h":{"subject":[{"c":[1,1]},{"d":["four"]},{"c":[2,2]}]}}
```

And a hop that redacts content under an arrangement the verifier trusts marks the body as unreconstructable rather than pretending it can be undone:

 而根據驗證者信任的安排對內容進行編輯的跳躍操作，會將主體標記為不可重建，而不是假裝可以撤銷：

```json
{"b":null}
```

The chain still verifies up to that point; the body just cannot be rewound past it.

 鏈條到那個點為止仍然有效；只是鏈條主體無法倒轉超過那個點。

### Bounces carry their own proof｜反彈本身就是一種證明

 The same chain that stops replay also fixes bounces, and this is where DKIM2 quietly closes the backscatter problem for good.

 阻止重播的同一鏈也修復了反彈問題，而DKIM2正是在這裡悄悄地徹底解決了反向散射問題。

 First, DKIM2 stops trusting the headers that lie. `Received` and `Return-Path` are ignored outright. The authoritative return address is reconstructed from the signed `mf=` tags in the chain instead. The rule is blunt: a DSN must be addressed to the `mf=` of the highest-numbered `DKIM2-Signature`, that is, the hop that actually handed the message over, never the visible envelope sender. And if that `mf=` is the null reverse path \(`mf=<>`\), no DSN is sent at all. Backscatter has nowhere to land.

 首先，DKIM2 不再信任說謊的標頭。 `Received` 和 `Return-Path` 被完全忽略。權威回傳地址是根據鏈中簽署的`mf=`標籤重建的。這個規則很直白：DSN 必須尋址到編號最高的 `DKIM2-Signature` 的 `mf=`，即實際傳遞訊息的躍點，而不是可見的信封發送者。如果 `mf=` 是空反向路徑 \(`mf=<>`\)，則根本不會發送 DSN。反向散射无处可落。

 Better still, a DKIM2 bounce can prove it is genuine. A DSN is itself an ordinary DKIM2 message: a `multipart/report` sent with `MAIL FROM <>`, carrying its own `Message-Instance` and `DKIM2-Signature`, that embeds the original signed message \(as a full `message/rfc822` copy or just its `text/rfc822-headers`\). Because the original’s signature chain travels back inside the bounce, the receiver should re-verify the whole thing:

 更棒的是，DKIM2 反彈可以證明其真實性。 DSN 本身就是一個普通的 DKIM2 訊息：一個`multipart/report`與`MAIL FROM <>`一起發送，攜帶自身的`Message-Instance`和`DKIM2-Signature` ，其中嵌入了原始簽名訊息（完整的`message/rfc822`副本或僅包含其`text/rfc822-headers` ）。由於原始簽名鏈在反彈過程中會返回，因此接收方應該重新驗證整個過程：

1. The DSN’s own signing domain should align with the recipient recorded in the returned message’s last `rt=` tag.
DSN的簽章域應與回傳訊息的最後一個`rt=`標籤中記錄的收件者一致。
2. That returned message’s last signature should be one this system actually produced, checked against its `d=` and `mf=`.
傳回的訊息的最後一個簽名應該是該系統實際產生的簽名，並根據其`d=`和`mf=`進行檢查。
3. The embedded message’s headers, and its body if present, verify against the `Message-Instance` fingerprints.
嵌入訊息的標頭，以及（如果有的話）訊息正文，與`Message-Instance`指紋進行驗證。
Pass all three and the bounce is provably about a message you really sent to a recipient you really handed it to. Fail, and it must not be propagated further. That is what finally makes deferred bounces safe: a provider can accept a message, decide an hour later that it is spam, and send a signed bounce back along the recorded path, with no risk of mailbombing an innocent bystander. As the DSN travels back, each hop peels off the signature it added and forwards the bounce one step further toward the origin, so every party learns only about its own leg of the journey.
 如果三個驗證都通過，則可證明該退信確實與您發送給收件人的郵件有關。如果失敗，則該退信不得繼續傳播。這正是延遲退信最終確保安全的原因：服務商可以接收郵件，一小時後判斷其為垃圾郵件，然後沿著記錄的路徑發送一個帶有簽名的退信，而不會誤傷無辜的收件人。當DSN退信返回時，每一跳都會剝離其新增的簽名，並將退信進一步轉發至來源位址，因此每一方都只能了解其自身路徑上的資訊。

 A signature that used to vouch only for content now vouches for the entire journey: who sent it, who it was for, what each hop changed, and where a failure is allowed to go.

 過去僅對內容負責的簽名，現在對整個過程負責：誰發送的，收件人是誰，每一步發生了什麼變化，以及失敗後允許去向何方。

### ARC steps aside｜ARC讓開

 DKIM2 is not the first attempt to keep authentication alive across forwarders. ARC \([RFC 8617](https://www.rfc-editor.org/rfc/rfc8617)\) got there first, and it is worth a moment because it explains a lot about the shape of DKIM2. When an intermediary changed a message and broke DKIM, ARC let that intermediary record what it had seen just before the change and add its own signature. Each hop stamps an ARC set of three headers: `ARC-Authentication-Results` captures the authentication verdict the hop saw on input, `ARC-Message-Signature` signs the message as the hop passed it on, and `ARC-Seal` signs the chain so far. A downstream receiver could confirm the chain was cryptographically intact and read the upstream verdicts.

 DKIM2 並不是第一次嘗試在轉發器之間保持身份驗證活動。 ARC（[RFC 8617](https://www.rfc-editor.org/rfc/rfc8617)）首先到達那裡，值得花點時間，因為它解釋了很多關於DKIM2的形狀。當中介更改訊息並破壞DKIM, ARC時，請該中介記錄其在更改之前看到的內容並添加自己的簽名。每個躍點都會標記一組 ARC 三個標頭：`ARC-Authentication-Results` 捕獲躍點在輸入時看到的身份驗證判決，`ARC-Message-Signature` 在躍點傳遞訊息時對訊息進行簽名，`ARC-Seal` 到目前為止對鏈進行簽名。下游接收者可以確認該鏈的加密完整性並讀取上游的判決。

 The catch is that ARC records observations, not changes. A valid chain proves a message was handled, not that the handling was correct, and it never says what was actually modified. To act on an ARC chain a receiver has to decide whether it trusts every signer in it, which in practice means running a reputation system for thousands of forwarders across the open internet. That trust fabric never materialized. A decade on, there is no working internet-scale ARC reputation deployment and no plan for one, so early adopters fell back to hand-maintained allow lists of known intermediaries: useful inside a data center or a consortium, not on the wider internet. Receivers were also left to invent their own policy for how many hops to honor and how to treat partial or broken chains, so behaviour never converged. The IETF’s DMARC working group is now moving to reclassify RFC 8617 as Historic and discourage new deployments \([draft-ietf-dmarc-arc-to-historic](https://datatracker.ietf.org/doc/draft-ietf-dmarc-arc-to-historic/)\).

 問題在於， ARC記錄的是觀察結果，而非變更。一條有效的鏈證明訊息已被處理，但並未證明處理方式正確，而且它永遠不會說明實際修改了什麼。要對ARC鏈採取行動，接收方必須決定是否信任鏈中的每個簽署者，這在實踐中意味著要為開放互聯網上的數千個轉發者運行一個信譽系統。然而，這種信任機制從未真正建立起來。十年過去了，既沒有可用的互聯網規模的ARC信譽部署，也沒有任何相關計劃，因此早期採用者只能退回到手動維護的已知中間人允許列表：這在數據中心或聯盟內部有用，但在更廣泛的互聯網上則不然。接收方也只能自行製定策略，決定要允許多少跳以及如何處理不完整或斷裂的鏈，因此行為始終沒有統一的共識。 IETF的DMARC工作小組現在正著手將RFC 8617 重新分類為歷史性，並阻止新的部署（[draft-ietf-dmarc-arc-to-historic](https://datatracker.ietf.org/doc/draft-ietf-dmarc-arc-to-historic/) ）。

 DKIM2 removes the very thing that made ARC unworkable: the separate trust fabric. Rather than ask a receiver to trust an intermediary’s account of what it saw, DKIM2 has each hop record exactly what it changed as a reversible recipe. The verifier undoes those changes and re-checks the originator’s own signature, so trust flows back to the domain that actually authored the message rather than to every forwarder along the way. And because the recipe spells out each modification, a receiver can tell an innocent subject tag from something worth worrying about, the “what changed” question ARC left open. The handling assertions ARC was genuinely good at fold into the same chain, with no parallel reputation system holding them up.

 DKIM2 刪除了導致 ARC 無法運作的東西：單獨的信任結構。 DKIM2 不是要求接收者相信中間人對其所看到內容的描述，而是讓每一跳準確記錄其更改的內容作為可逆配方。驗證者撤銷這些變更並重新檢查發起者自己的簽名，因此信任會流回實際創作訊息的網域，而不是沿途的每個轉發者。而且因為配方詳細說明了每個修改，接收者可以區分無辜的主題標籤和值得擔心的事情，「改變了什麼」問題ARC懸而未決。處理斷言ARC確實擅長折疊到同一個鏈中，沒有平行的聲譽系統支持它們。

## Meet DMARCbis｜認識 DMARCbis

 After more than a decade of RFC 7489 doing quiet, load-bearing work behind the world’s inboxes, DMARC has a proper successor. In May 2026 the IETF published three new Standards Track documents, RFC 9989, RFC 9990, and RFC 9991, collectively known as DMARCbis. They obsolete the original 2015 specification \(and fold in the experimental Public Suffix Domain work from RFC 9091\).

 在RFC 7489默默地為全球用戶信箱默默付出十餘年後， DMARC終於迎來了它的正式繼任者。 2026年5月， IETF發布了三份新的標準追蹤文件： RFC 9989、 RFC 9990和RFC 9991，統稱為DMARCbis。它們取代了2015年的原始規範（並將RFC 9091中關於公共後綴域的實驗性工作納入其中）。

 Nothing about the day-to-day promise of DMARC has changed. What changed is the plumbing underneath it, and a few of those changes are the kind that quietly fix problems operators have lived with for years.

 DMARC的日常運作承諾沒有任何改變。改變的是其底層架構，其中一些改變悄無聲息地解決了營運商多年來一直面臨的問題。

### TL;DR

 For anyone who wants the gist before the details:

 對於那些只想了解重點而不想了解細節的人：

- The Public Suffix List is gone. Finding the boundary of an organization now happens with a live DNS lookup called the *tree walk*.
公共後綴列表已移除。現在，確定組織的邊界需要透過即時操作來完成。 DNS 找出方法稱為*樹狀圖*。
- The `pct` sampling tag is retired. A simpler `t` testing flag takes its place.
`pct`取樣標籤已停用。取而代之的是更簡單的`t`測試標誌。
- Two tags graduate from the experimental PSD extension into the core spec: `np` for non-existent subdomains and `psd` for public suffix operators.
兩個標籤從實驗性的PSD擴展升級到核心規範： `np`用於不存在的子域， `psd`用於公共後綴運算子。
- Reporting moved into its own two documents, gained a new XML schema, and picked up an extensibility slot so future additions no longer require reopening the whole standard.
報告功能被移至其自身的兩個文件中，獲得了一個新的XML模式，並獲得了擴展槽，因此未來的添加不再需要重新開放整個標準。
- `p=reject` is no longer treated as an unconditional instruction to bounce mail.
`p=reject`不再被視為無條件退回郵件的指令。
Existing DMARC records keep working. The retired tags are simply ignored, so there is no flag day and no forced migration.
 現有的DMARC記錄仍然有效。已停用的標籤會直接忽略，因此不會有停用日，也不會強制遷移。

### A quick refresher on DMARC｜快速回顧一下DMARC

 SPF and DKIM both authenticate a domain, but not the one that matters most to a human reading their mail. SPF checks the envelope sender used during the SMTP conversation, and DKIM checks whatever domain signed the message. Neither is required to match the `From:` address the recipient actually sees, which is exactly the address a phisher wants to forge.

 SPF 和 DKIM 都對網域進行身份驗證，但不是對閱讀郵件的人最重要的網域。 SPF 檢查SMTP 會話期間使用的信封寄件人，DKIM 檢查對訊息進行簽署的域。兩者都不需要與收件人實際看到的`From:`地址相匹配，這正是網絡釣魚者想要偽造的地址。

 DMARC closes that gap. It anchors authentication to the visible `From:` domain, the Author Domain, through a property called *alignment*: a message passes only when SPF or DKIM authenticates a domain that lines up with the Author Domain. The domain owner publishes a policy in DNS stating what receivers should do with mail that fails \(`none`, `quarantine`, or `reject`\) and where to send reports. That combination, authentication tied to the visible sender plus a published preference plus feedback, is what made DMARC the backbone of email anti-spoofing.

 DMARC 縮小了這一差距。它透過一個名為 *alignment* 的屬性將身份驗證錨定到可見的 `From:` 域（作者域）：僅當 SPF 或 DKIM 對與作者域對齊的域進行驗證時，訊息才會傳遞。域所有者在DNS中發布了一項策略，說明收件人應如何處理失敗的郵件（`none`, `quarantine`或`reject`）以及將報告發送到何處。這種組合，即與可見寄件者相關的身份驗證加上已發布的偏好加上回饋，使得 DMARC 成為電子郵件反欺騙的支柱。

### Issues with DMARC｜DMARC的問題

 RFC 7489 aged well, but a handful of design decisions turned into recurring headaches:

 RFC 7489 整體表現不錯，但有些設計決策卻成了反覆出現的難題：

- **The Public Suffix List was a soft spot.** To tell where one organization ends and a registrar’s namespace begins \(so that `mail.example.com` and `example.com` are understood to share an owner, while `example.com` and `example.co.uk` do not\), receivers leaned on Mozilla’s Public Suffix List. The spec never mandated a specific copy of it, said nothing about how often to refresh it, and openly acknowledged the interoperability risk. A single static file, maintained by volunteers, sat on the critical path of global mail authentication.
**公共後綴列表是一個薄弱環節。** 為了區分組織名稱的歸屬和註冊商命名空間的起始（例如， `mail.example.com`和`example.com`被理解為共享同一個所有者，而`example.com`和`example.co.uk`則不共享），收件人依賴 Mozilla 的公共後綴列表。該規範從未強制要求使用特定的清單副本，也未規定更新頻率，並且公開承認存在互通性風險。一個由志工維護的靜態文件，卻處於全球郵件認證的關鍵路徑上。
- **The `pct` tag promised more than it delivered.** It was meant to let a domain roll out a policy to a percentage of mail. In practice only two values behaved consistently across receivers: 0 and 100. Worse, `pct=0` had quietly acquired a special meaning of its own, so the tag was really a two-state switch wearing a percentage costume.
**`pct`標籤承諾的功能遠超實際效果。** 它原本旨在讓網域名稱能夠對一定比例的郵件套用策略。但實際上，只有兩個值在所有接收者中表現一致：0 和 100。更糟的是， `pct=0`標籤悄悄獲得了其自身特殊的含義，因此該標籤實際上是一個披著百分比外衣的二態開關。
- **Subdomains that did not exist were a spoofing gap.** A domain could set a strict policy for itself, yet an attacker could still forge a plausible looking subdomain that had never been registered. The experimental PSD DMARC work started to address this, but it lived outside the core standard.
**不存在的子網域構成了一個欺騙漏洞。** 網域可以設定嚴格的策略，但攻擊者仍然可以偽造一個看似可信但從未註冊過的子網域。實驗性的PSD DMARC方案開始著手解決這個問題，但它並未納入核心標準。
- **Everything was crammed into one document.** Core protocol, aggregate reporting, and failure reporting all shared a single RFC, which meant none of them could evolve without dragging the others along.
**所有內容都被塞進了一個文件中。**核心協議、匯總報告和故障報告都共享同一個RFC ，這意味著它們中的任何一個都無法單獨發展，否則就會牽連到其他部分。

### DMARCbis, one specification becomes three｜DMARCbis，一個規格變成三個

 DMARCbis splits the old monolith along its natural seams so each piece can advance on its own schedule:

 DMARCbis 將舊的整體沿著其自然的接縫分割開來，以便每一部分都能按照自己的時間表推進：

- **RFC 9989** is the core protocol: alignment, policy, record syntax, and the new discovery mechanism. It obsoletes both RFC 7489 and RFC 9091.
**RFC 9989** 是核心協議：包括對齊、策略、記錄語法和新的發現機制。它取代了RFC 7489 和RFC 9091。
- **RFC 9990** covers aggregate reporting, the daily domain-level XML summaries that most operators actually rely on.
**RFC 9990** 涵蓋匯總報告，即大多數運營商實際依賴的每日領域級XML摘要。
- **RFC 9991** covers failure reporting, the detailed per-message reports, and updates the older RFC 6591 reporting format along the way.
**RFC 9991** 涵蓋故障報告、詳細的每條訊息報告，並在此過程中更新了舊的RFC 6591 報告格式。
The move from a single Informational RFC to three Standards Track documents is not just bookkeeping. It reflects DMARC growing up into a first-class internet standard with the process discipline that implies.
 從單一資訊性的RFC到三個標準追蹤文件的轉變不僅僅是帳目上的改變。它反映了DMARC成長為一流的網路標準，並具備了相應的流程規範。

### Climbing the tree instead of trusting a list｜與其依賴清單，不如自己去探索。

 The headline change is how a receiver figures out where an organization’s authority begins. Instead of consulting a static list, DMARCbis defines the *DNS tree walk*: a live, ordered series of DNS queries that climb from the Author Domain toward the root until they find the records that apply.

 標題的變化是接收者如何確定組織的權威從哪裡開始。 DMARCbis 沒有查閱靜態列表，而是定義了 *DNS 樹遍歷*：一系列實時、有序的 DNS 查詢，從作者域向根爬升，直到找到適用的記錄。

 The receiver always queries the full Author Domain first, at `_dmarc.<author-domain>`. If nothing definitive turns up there, the walk begins: it drops labels from the left and queries the parent, then that parent’s parent, and so on toward the root. To keep a pathologically long domain from turning into a flood of lookups, the algorithm is capped at eight queries. For names of eight labels or fewer it strips one label at a time, but for anything longer it removes several labels at once so that only seven remain, then continues one label at a time from there. Eight was not arbitrary: names of up to seven labels were observed in real use, so the cap clears actual traffic while still bounding the work.

 接收者總是先查詢完整的作者域，即`_dmarc.<author-domain>` 。如果那裡沒有找到明確的結果，則開始遍歷：它從左側移除標籤，並查詢父級，然後是父級的父級，依此類推，直至根域。為了防止過長的域導致查詢量激增，演算法將查詢次數限制為八次。對於包含八個或更少標籤的名稱，它每次移除一個標籤；對於超過八個標籤的名稱，它一次性移除多個標籤，直至只剩下七個，然後從剩餘的標籤開始每次移除一個標籤。八次查詢並非隨意設定：在實際使用中觀察到最多包含七個標籤的名稱，因此該上限既能減少實際流量，又能控制查詢量。

 The canonical illustration from the spec makes the cap concrete. For `a.b.c.d.e.f.g.h.i.j.mail.example.com`, a receiver issues exactly eight queries and skips the deep intermediate labels entirely:

 規範中的標準範例使上限更加具體。對於`a.b.c.d.e.f.g.h.i.j.mail.example.com` ，接收器恰好發出八個查詢，並完全跳過深層中間標籤：

```
_dmarc.a.b.c.d.e.f.g.h.i.j.mail.example.com
_dmarc.g.h.i.j.mail.example.com
_dmarc.h.i.j.mail.example.com
_dmarc.i.j.mail.example.com
_dmarc.j.mail.example.com
_dmarc.mail.example.com
_dmarc.example.com
_dmarc.com
```

For the domains almost everyone actually runs, this is cheap. A name like `mail.marketing.example.com` resolves in a couple of lookups, and DNS caching absorbs most of the cost because the same parent records are queried over and over across many messages.

 對於幾乎每個人都實際運行的網域來說，這很便宜。像`mail.marketing.example.com`這樣的名稱只需幾次查找即可解析，而DNS快取承擔了大部分成本，因為相同的父記錄會在許多訊息中反覆查詢。

 Once the walk has collected the records that exist along the path, the receiver selects the Organizational Domain with a short, deterministic set of rules, working from the longest name to the shortest:

 當遍歷過程收集沿途的記錄後，接收者會根據一組簡短的確定性規則，從最長的名稱到最短的名稱，選擇組織域：

1. A record that declares `psd=n` marks its own domain as the Organizational Domain. Stop there.
宣告`psd=n`的記錄將其自身域標記為組織域。到此為止。
2. A record that declares `psd=y` \(and is not where the walk began\) means the Organizational Domain sits one label below it.
聲明為`psd=y` （且不是行走的起點）的記錄表示組織域位於其下方一個標籤。
3. Failing both of those, the record with the fewest labels wins.
如果以上兩種情況都不成立，則發行廠牌數量最少的唱片獲勝。
To make rule 3 concrete: for `a.mail.example.com`, absent any `psd` signals along the way, the walk settles on `example.com` as the Organizational Domain, exactly the answer the Public Suffix List used to hand back, now derived from live DNS instead.
 為了使規則 3 更具體：對於`a.mail.example.com` ，如果沒有沿途出現任何`psd`信號，則該路徑將`example.com`確定為組織域，這正是公共後綴列表過去返回的答案，現在則源自於實時DNS 。

 The payoff is that the Organizational Domain is now defined by DNS records that the domain owner controls, rather than inferred from a file the owner has no say over. It refreshes as fast as DNS does, and it removes an entire class of “why is the PSL wrong for my domain” problems.

 這樣做的好處是，組織域現在由域所有者控制的DNS記錄定義，而不是從所有者無法控制的文件中推斷出來。它的刷新速度與DNS一樣快，並且徹底解決了「為什麼PSL不適用於我的域」這類問題。

### Tuning the record: what arrived, what retired｜唱片調校：哪些來了，哪些走了

 The record itself picked up three new tags and lost three old ones. The valid set in DMARCbis is now `v`, `p`, `sp`, `np`, `adkim`, `aspf`, `fo`, `rua`, `ruf`, `psd`, and `t`.

 記錄本身新增了三個標籤，失去了三個舊標籤。 DMARCbis 中的有效集合現在是`v`, `p`, `sp`, `np`, `adkim`, `aspf`, `fo`, `rua`, `ruf`, `psd`和`t` 。

| Tag 標籤 | Status in DMARCbis 在 DMARCbis 中的狀態 | What it does 其作用 |
| --- | --- | --- |
| `np` | New 新增 | Policy for non-existent subdomains of the Organizational Domain 組織域中不存在的子域的策略 |
| `psd` | New 新增 | Declares whether the domain is a public suffix \(`y` / `n` / `u`\) 宣告網域是否為公共後綴 \( `y` / `n` / `u` \) |
| `t` | New 新增 | Testing flag that softens enforcement without turning it off 測試標誌，可在不完全關閉強制執行的情況下降低強制執行力度 |
| `pct` | Removed 已移除 | Percentage sampling; only 0 and 100 ever worked reliably 百分比抽樣；只有 0 和 100 始終可靠 |
| `rf` | Removed 已移除 | Failure report format; only one format was ever deployed 故障報告格式；僅部署過一種格式 |
| `ri` | Removed 已移除 | Aggregate report interval; effectively fixed at roughly one day 總結報告間隔；實際固定為約一天 |
| `v`, `p`, `sp`, `adkim`, `aspf`, `fo`, `rua`, `ruf` | Unchanged 未更改 | Version, policy, subdomain policy, alignment modes, failure options, report destinations 版本、策略、子域策略、對齊模式、故障選項、報告目標 |

A closer look at the newcomers:

 讓我們仔細看看這些新來者：

**`t` replaces `pct` with something clear.** Rather than pretending to be a dial, the testing flag is a plain switch. The default `t=n` applies the published policy as written. Setting `t=y` signals that the domain is still testing, so compliant receivers step the effective policy down one level: `reject` behaves like `quarantine`, and `quarantine` behaves like `none`, with intermediaries free to apply special handling such as rewriting the `From:` header. Crucially, `t` leaves report generation untouched, so a domain can watch the reports roll in while enforcement stays gentle. It is best understood as analogous to the old `pct=0` and `pct=100` behavior rather than an exact reimplementation of it.

 \*\*`t` 替換 `pct` 用清晰的方式。 \*\* 測試標誌並非模擬旋鈕，而是簡單的開關。預設值 `t=n` 按照已發布的政策原文執行。 `t=y` 這表示該網域仍在測試中，因此符合規定的接收方會將有效策略降低一個等級： `reject` 表現得像 `quarantine`， 和 `quarantine` 表現得像 `none`中間商可以自由地進行特殊處理，例如重寫 `From:` 標題。至關重要的是， `t` 它不會影響報告生成，因此域可以監控報告的接收情況，同時執法力度保持溫和。最好將其理解為類似於舊式 `pct=0` 和 `pct=100` 行為本身，而不是對其的精確重現。

**`np` closes the phantom-subdomain gap.** It sets the policy for subdomains that do not exist at all, identified by an NXDOMAIN response as described in RFC 8020. If a name has never been registered, an attacker should not be able to send convincing mail from it, and `np` lets a domain say exactly that. When `np` is absent the receiver falls back to `sp`, and then to `p`. The mechanism leans on RFC 8020’s rule that an NXDOMAIN answer means the name and everything beneath it truly does not exist, so it is only as reliable as the DNS returning that answer as the standard requires.

**`np`彌補了幽靈子網域漏洞。** 它為根本不存在的子網域設定了策略，這些子網域由NXDOMAIN回應標識，如RFC 8020 所述。如果一個網域從未註冊過，攻擊者就無法從中發送具有欺騙性的郵件，而`np`允許網域明確聲明這一點。當`np`缺失時，接收方會回退到`sp` ，然後回退到`p` 。此機制依賴於RFC 8020 的規則，即NXDOMAIN響應表示該域名及其下的所有內容確實不存在，因此它的可靠性僅取決於DNS是否按照標準要求返回該響應。

**`psd` brings public suffix operators into the fold.** Registry-style domains such as a country’s `gov` namespace can now declare `psd=y`, which both anchors the tree walk and lets the operator publish a protective default for every registered name underneath. `psd=n` states the opposite, that the domain is its own Organizational Domain, and the default `psd=u` leaves the decision to the tree walk. This is the RFC 9091 experiment, now standardized and freed from its separate registry.

**`psd` 將公共後綴運算子納入其中。** 註冊表風格的網域（例如國家的 `gov` 命名空間）現在可以宣告 `psd=y`，這既錨定樹行走，又允許操作員為下面的每個註冊名稱發布保護性預設值。 `psd=n` 表示相反，該域是其自己的組織域，預設的 `psd=u` 將決策權留給樹遍歷。這是RFC 9091 實驗，現已標準化並從其單獨的註冊表中釋放出來。

 The `sp` tag, meanwhile, keeps its meaning but is redefined in terms of the tree walk: it governs existing subdomains of the Organizational Domain, and it is read only from the record discovered at that Organizational Domain, not from a record sitting on the subdomain itself.

 同時， `sp`標籤保留了其含義，但根據樹遍歷進行了重新定義：它管理組織域的現有子域，並且僅從在該組織域中發現的記錄讀取，而不是從子域本身上的記錄讀取。

### The p=reject reality check｜p=拒絕現實檢驗

 One change is less about syntax and more about attitude. `p=reject` is no longer treated as an unconditional order to bounce.

 一項變化更多的是關於態度，而不是文法。 `p=reject`不再被視為無條件退貨訂單。

 The tension is real and was debated at length. Strict rejection is what protects the largest consumer mail platforms and the billions of inboxes behind them, and nobody wanted to weaken that. At the same time, blunt rejection breaks legitimate indirect mail flows, mailing lists and forwarders being the classic casualties, and the damage lands on innocent third parties who never chose the policy.

 這種緊張關係確實存在，並且經過了長時間的討論。嚴格的拒收機制保護了最大的消費者郵件平台及其背後數十億個郵箱，沒有人希望削弱這種保護。但同時，直接拒收也會破壞合法的間接郵件流通，郵件列表和轉發服務商首當其衝，而最終受損的卻是那些從未選擇過該政策的無辜第三方。

 DMARCbis threads the needle with sharper guidance rather than a weaker mechanism. Three distinct rules do the work:

 DMARCbis 採用更精準的導引而非更薄弱的機制來穿針引線。它由三條不同的規則構成：

| Party 黨 | Guidance 指導 |
| --- | --- |
| Sending domain \(general-purpose\) 發送域（通用） | SHOULD NOT publish `p=reject` if users might post to mailing lists; ramp through `none` and `quarantine` first SHOULD NOT發布`p=reject`如果用戶可能向郵件列表發布；先逐步通過`none`和`quarantine` |
| Sending domain \(any `p=reject`\) 發送網域名稱（任意`p=reject`） | MUST NOT rely on SPF alone, and MUST apply valid DKIM signatures, since DKIM is what survives forwarding MUST NOT 單獨依賴 SPF，並且 MUST 應用有效的 DKIM 簽名，因為 DKIM 是轉發後仍然存在的 |
| Receiver 接收方 | MUST NOT reject solely because a policy says `reject`; weigh other evidence before acting MUST NOT僅因政策規定`reject`而拒絕；在採取行動前權衡其他證據 |

The policy became a strong signal to weigh rather than a trigger to pull blindly.

 這項政策變成了一個需要權衡的強烈訊號，而不是一個可以盲目執行的觸發器。

### Reporting grows up｜報道日趨成熟

 Splitting reporting into its own documents came with real upgrades, not just a new table of contents.

 將報告拆分成單獨的文檔帶來了真正的升級，而不僅僅是一個新的目錄。

**Aggregate reports \(RFC 9990\)** move to a new XML namespace, `urn:ietf:params:xml:ns:dmarc-2.0`, and gain an extensibility slot so future data can be added without breaking existing parsers: consumers simply ignore extensions they do not understand. The schema now records how policy was discovered through a `discovery_method` field that distinguishes the old `psl` from the new `treewalk`, reflects the `t` testing flag, and carries the `np` policy. Reporting a DKIM result now requires naming the selector, which makes the reports genuinely more useful for debugging. These reports stay privacy-safe by design: they aggregate domain-level authentication counts and carry no message content and no end-user identifying data such as recipient addresses or the IP addresses of individuals. Transport remains email, with the XML gzipped and delivered as an attachment, and external report destinations still have to prove they consented through a `_report._dmarc` record.

**聚合報告（ RFC 9990）** 已遷移至新的XML命名空間`urn:ietf:params:xml:ns:dmarc-2.0` ，並獲得一個可擴展槽，以便未來添加資料而不會破壞現有解析器：用戶只需忽略它們無法理解的擴展即可。該模式現在透過一個`discovery_method`字段記錄策略的發現方式，該字段區分舊的`psl`和新的`treewalk` ，反映`t`測試標誌，並包含`np`策略。現在報告DKIM結果需要指定選擇器，這使得報告對於調試更加實用。這些報告在設計上就充分考慮了隱私安全：它們匯總了域級身份驗證計數，不包含任何訊息內容，也不包含任何最終用戶身份識別數據，例如收件人地址或個人的IP地址。傳輸方式仍為電子郵件， XML資料經過gzip壓縮後以附件形式發送，外部報告接收者仍需透過`_report._dmarc`記錄證明其已同意接收此類報告。

**Failure reports \(RFC 9991\)** get an honest treatment of why they are used so sparingly. Because they can carry entire messages, headers and body included, they raise real privacy and regulatory concerns, and many large providers disable them outright in favor of aggregate data. The format, updated from RFC 6591, adds a dedicated `dmarc` failure type and a required `Identity-Alignment` field that spells out which mechanisms failed to produce an aligned identifier. Generators must rate-limit what they send, and for public suffix domains they must not act on a `ruf` request at all unless the parties have a specific agreement in place, so a registry operator does not receive a stream of other people’s message content by default.

**失敗報告（ RFC 9991）** 的使用頻率極低，因此本文對其進行了客觀分析。由於失敗報告可以包含完整的訊息，包括郵件頭和郵件正文，這引發了隱私和監管方面的擔憂，許多大型服務提供者乾脆禁用失敗報告，轉而使用匯總資料。此格式在RFC 6591 的基礎上進行了更新，新增了專用的`dmarc`失敗類型和一個必填的`Identity-Alignment`字段，用於明確指出哪些機制未能產生匹配的標識符。生成器必須限制其發送的資料量，並且對於公共後綴域名，除非雙方另有約定，否則生成器不得回應`ruf`請求，因此註冊管理機構預設不會收到其他人發送的訊息內容流。

### What stayed exactly the same｜哪些方面始終保持不變？

 For all the moving parts, the fundamentals are untouched, which is worth stating plainly so nobody over-rotates on the release:

 儘管動作幅度很大，但基本原則保持不變，這一點值得明確指出，以免有人在出手時過度旋轉：

- Alignment still works the way it always has, in relaxed and strict flavors selected with `adkim` and `aspf`.
對齊方式仍然像以往一樣，有寬鬆和嚴格的口味，可透過`adkim`和`aspf`選擇。
- The three policies, `none`, `quarantine`, and `reject`, mean what they always meant.
這三項政策， `none`, `quarantine`和`reject` ，其意義與以往相同。
- DMARC still evaluates only the `From:` header and still builds on SPF and DKIM rather than replacing them.
DMARC仍然只評估`From:`標頭，並且仍然基於SPF和DKIM構建，而不是替換它們。
- Records written for RFC 7489 remain valid. The retired tags are ignored, not rejected, so there is no urgent rewrite waiting on anyone’s to-do list.
為RFC 7489 寫入的記錄仍然有效。已停用的標籤會被忽略，而不是被拒絕，因此無需任何人緊急重寫。
DMARCbis is less a reinvention than a long-overdue tidy-up: the same protocol, with its most useful experiments promoted to the core and a decade of operational lessons written back into the spec. The tree walk alone, trading a static list for live DNS, is the kind of change whose absence will not be missed at all.
 DMARCbis與其說是徹底的革新，不如說是一次姍姍來遲的整理：協議不變，但最有用的實驗成果被提升到核心，十年來的運作經驗也被重新寫入規範。單單是樹遍歷（用動態的DNS列表取代靜態列表）這一改動，即使沒有它，也不會讓人感到遺憾。

## Both protocols live in Stalwart today｜這兩個協定目前都存在於 Stalwart 中。

 As of [Stalwart v0.16.12](https://github.com/stalwartlabs/stalwart/releases), DKIM2 \(draft -04\) and DMARCbis are both fully implemented, and Stalwart is the first mail server to support either of them. Signing, verifying, the chain-of-custody logic, recipe reversal, bounce validation, the DNS tree walk, the new and retired DMARC tags: all of it ships and runs.

 截至目前，[Stalwart v0.16.12](https://github.com/stalwartlabs/stalwart/releases), DKIM2 （草案 -04）和 DMARCbis 均已完全實現，Stalwart 是首個同時支援這兩項技術的郵件伺服器。簽名、驗證、監管鏈邏輯、配方逆向、退信驗證、 DNS樹遍歷、新增和已棄用的DMARC標籤：所有這些功能都已發布並運行。

 We wanted the protocols to be easy to try without setting up a server, so both are exposed in the browser. At the [mail-auth playground](https://mail-auth.stalw.art/) anyone can sign a message with DKIM2 and watch it verify, break it and see the chain reject it, or run a message through DMARCbis side by side to see how the tree walk resolves the Organizational Domain. It runs Stalwart’s own authentication code compiled to WebAssembly, so what the playground shows is exactly what the server does, no install and nothing to configure.

 我們希望這些協定無需搭建伺服器即可輕鬆試用，因此它們都直接在瀏覽器中公開。在 [mail-auth playground](https://mail-auth.stalw.art/)中，任何人都可以使用DKIM2對郵件進行簽名，並觀察其驗證、破解以及鍊式拒絕過程，或者同時運行 DMARCbis 驗證郵件，以了解樹狀結構如何解析組織域。它運行的是 Stalwart 自行編譯為 WebAssembly 的身份驗證程式碼，因此 playground 展示的內容與伺服器的實際運作完全一致，無需安裝，也無需任何配置。

 For Rust developers, the same code is available as a library. DKIM2 and DMARCbis live in the [mail-auth](https://github.com/stalwartlabs/mail-auth) crate, the message authentication library Stalwart itself is built on, which also covers DKIM1, SPF, DMARC, and ARC. It is the engine behind both the server and the playground, and it is open source under the same permissive terms as the rest of Stalwart, so any Rust project can add DKIM2 and DMARCbis support by pulling in a single dependency.

 對於 Rust 開發者來說，相同的程式碼可以作為庫使用。 DKIM2 DMARCbis 居住在[mail-auth](https://github.com/stalwartlabs/mail-auth) crate，即 Stalwart 本身所基於的訊息認證庫，也涵蓋了 DKIM1, SPF, DMARC， 和 ARC它是伺服器和 Playground 背後的引擎，與 Stalwart 的其他部分一樣，以同樣寬鬆的開源條款運行，因此任何 Rust 專案都可以添加它。 DKIM2 透過引入單一依賴項來支持 DMARCbis。

## Looking forward｜期待

 DKIM2 and DMARCbis pull in the same direction. DKIM2 makes a signature vouch for the whole journey rather than a frozen snapshot of content. Forwarding stops breaking authentication, replayed mail no longer verifies on borrowed reputation, and bounces finally carry their own proof. DMARCbis takes the layer that ties all of this to the domain a person actually reads and rests it on live DNS the domain owner controls, retiring the tags that never worked and the static list that sat on the critical path of global mail. Neither demands a flag day: existing DKIM and DMARC records keep working, and the new mechanisms layer in alongside them.

 DKIM2 和 DMARCbis 拉向相同方向。 DKIM2為整個旅程提供簽名憑證，而不是內容的凍結快照。轉發停止破壞身份驗證，重播郵件不再驗證借用的聲譽，並且退回郵件最終帶有自己的證據。 DMARCbis 採用將所有這些與人們實際讀取的網域連結起來的層，並將其放置在網域擁有者控制的即時DNS上，淘汰從未起作用的標籤和位於全球郵件關鍵路徑上的靜態清單。兩者都不需要賣旗日：現有的DKIM和DMARC記錄繼續工作，新機制與它們並存。

 Supporting them first is the part of this that Stalwart cares most about. Being early to a standard is how the standard gets tested against real mail before it hardens, and it is how operators who want the newest protections get them without waiting for the rest of the ecosystem to catch up. Stalwart has made a habit of shipping the latest IETF work as it lands, and DKIM2 and DMARCbis are the newest entries on that list. Try them at the [mail-auth playground](https://mail-auth.stalw.art/), read the code in the [mail-auth](https://github.com/stalwartlabs/mail-auth) crate, and upgrade to [v0.16.12](https://github.com/stalwartlabs/stalwart/releases) to run them in production.

 Stalwart 最重視的就是率先支持這些標準。搶佔先機意味著該標準在正式發布前就能在真實郵件環境中接受測試，也意味著想要使用最新防護措施的運營商無需等待生態系統其他部分跟進即可獲得這些措施。 Stalwart 一直以來都會在最新IETF功能發布後立即發布，而DKIM2和 DMARCbis 則是最新加入的。您可以在 [mail-auth playground](https://mail-auth.stalw.art/)中試用它們，閱讀 [mail-auth](https://github.com/stalwartlabs/mail-auth) crate 中的程式碼，並升級到 [v0.16.12](https://github.com/stalwartlabs/stalwart/releases)運行它們。

**Tags:**

**標籤：**

- [dkim](https://stalw.art/blog/tags/dkim/)
[dkim](https://stalw.art/blog/tags/dkim/)
- [dmarc](https://stalw.art/blog/tags/dmarc/)
[dmarc](https://stalw.art/blog/tags/dmarc/)
- [dkim2](https://stalw.art/blog/tags/dkim2/)
[dkim2](https://stalw.art/blog/tags/dkim2/)
- [dmarcbis](https://stalw.art/blog/tags/dmarcbis/)
[dmarcbis](https://stalw.art/blog/tags/dmarcbis/)
- [email](https://stalw.art/blog/tags/email/)
[電子郵件](https://stalw.art/blog/tags/email/)
- [security](https://stalw.art/blog/tags/security/)
[安全](https://stalw.art/blog/tags/security/)
- [rust](https://stalw.art/blog/tags/rust/)
[鏽跡](https://stalw.art/blog/tags/rust/)
- [server](https://stalw.art/blog/tags/server/)
[伺服器](https://stalw.art/blog/tags/server/)
How we use AI at Stalwart
 我們在 Stalwart 如何使用AI

 Zero open bug reports: The road to Stalwart 1.0

 零未解決錯誤回報：通往堅韌之路1.0

 ---

 ⬆ 目錄　｜　⬅ 上一篇：DKIM, ARC, SPF and DMARC authentication in Rust｜Rust 中的DKIM, ARC, SPF和DMARC身份驗證　｜　下一篇：Introducing Encryption at Rest Protecting Your Emails Even When They Sleep｜推出靜態加密功能，即使在郵件休眠時也能保護您的郵件安全 ➡
