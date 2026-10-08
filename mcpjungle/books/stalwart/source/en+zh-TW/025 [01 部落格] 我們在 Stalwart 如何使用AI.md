---

## title: "How we use AI at Stalwart｜我們在 Stalwart 如何使用AI"

 title\_original: "How we use AI at Stalwart"
source: "[https://stalw.art/blog/how-we-use-ai](https://stalw.art/blog/how-we-use-ai)"
chapter: \["blog"\]
order: 25
lang: "bilingual"
translated\_by: "google\_v2+gtx"
captured: "2026-10-05T01:00:32.370Z"

 ⬆ 目錄　｜　⬅ 上一篇：Stalwart Joins GitHub's Open Source Secure Fund｜Stalwart 加入 GitHub 開源安全基金　｜　下一篇：Vandelay the JMAP importer-exporter｜Vandelay JMAP進出口商 ➡

# How we use AI at Stalwart｜我們在 Stalwart 如何使用AI

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

Aug 25, 2026 - 10 min read

 2026年8月25日 - 閱讀時間10分鐘

 \[![Mauro D.](assets/selected_552_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

 It is difficult to have a conversation about software in 2026 without AI showing up in it. Two years ago the interesting question was whether a model could write a correct function on the first try. Today the question on [Hacker News](https://news.ycombinator.com/) is how many agents you can usefully run at once, how to isolate them from each other, and what to do when your reading capacity becomes the bottleneck instead of your typing speed. Editors have been rebuilt around the idea: [Cursor 3](https://dev.to/onepizzateam/cursor-3-shipped-parallel-agents-and-the-community-cant-agree-on-whether-thats-good-1p3n) shipped a full-screen workspace for managing fleets of agents rather than a chat box beside your file. Teams are running specialized agents for review, test generation, and security scanning in parallel, each in its own git worktree so they do not step on one another.

 2026 年的軟體討論很難避免AI 。兩年前，人們熱議的問題是模型能否一次寫出正確的函數。而如今，[Hacker News](https://news.ycombinator.com/)上的問題是：同時運行多少個代理程式才算有效？如何將它們彼此隔離？以及當閱讀能力而非打字速度成為瓶頸時，該如何應對？編輯器也圍繞著這個理念進行了重構：[Cursor 3](https://dev.to/onepizzateam/cursor-3-shipped-parallel-agents-and-the-community-cant-agree-on-whether-thats-good-1p3n)提供了一個全螢幕工作區，用於管理大量代理程序，而不是像以前那樣在文件旁邊顯示一個聊天框。各個團隊並行運行專門的代理程序，分別用於程式碼審查、測試生成和安全掃描，每個代理程式都在各自的 Git 工作樹中運行，互不干擾。

 The models got better, and not in a vague way. The improvement shows up in benchmarks that people take seriously, and it shows up in the day-to-day experience of handing a model a hard problem and getting back something that works.

 模型性能確實提升了，而且提升幅度並非模糊不清。這種提升體現在人們高度重視的基準測試中，也體現在日常使用中，當模型處理難題並給出有效結果時，這種提升就更加明顯了。

 The vocabulary shifted along with the capability. For a couple of years, the standard reaction to AI-authored code across the internet was to call it *slop*, and we said it too. That word is doing less work now. It has not disappeared, but it has sharpened: a [2026 analysis](https://www.developersdigest.tech/blog/what-hacker-news-gets-right-about-ai-coding-agents-2026) of over a thousand posts across Hacker News and Reddit found that “slop” has narrowed to mean code that compiles, passes tests, and looks tidy while having no coherent intent and no awareness of the system it is being dropped into. That is a much more useful definition than “code a machine wrote”, and it happens to describe the exact failure mode we care about most.

 詞彙隨著能力的改變而改變。幾年來，網路上對 AI 所寫的程式碼的標準反應是稱之為 *slop*，我們也這麼說。這個字現在的作用越來越小了。它並沒有消失，但它已經變得更加尖銳：[2026 年分析](https://www.developersdigest.tech/blog/what-hacker-news-gets-right-about-ai-coding-agents-2026) 在 Hacker News 和 Reddit 上發布了一千多篇帖子，發現“slop”已經縮小到可以編譯、通過測試、看起來整潔的代碼，但沒有連貫的意圖，也沒有意識到它被放入的系統。這是一個比「機器編寫的程式碼」更有用的定義，它恰好描述了我們最關心的確切故障模式。

 So rather than making a general statement about being an AI-forward company, here is the specific version: what we use AI for at Stalwart Labs, what we refuse to use it for, and the reasoning behind each line we have drawn.

 因此，與其泛泛地聲明我們是一家面向AI的公司，不如具體說明：我們在Stalwart Labs使用AI做什麼，我們拒絕將其用於什麼，以及我們劃定的每一條線背後的原因。

## Fixing bugs｜修復漏洞

 This is where AI has changed our work the most, and the reason deserves some precision.

 這是AI對我們的工作影響最大的地方，原因值得詳細解釋。

 Fixing a bug was never the expensive part. Finding it was. A report like “under a specific sequence of moves, one IMAP client observes duplicate UIDs” used to mean hours of reading, adding trace points, and reconstructing state in your head across several subsystems. The actual patch, once you understood the problem, was often ten lines.

 修復 bug 從來都不是最貴的部分，找到 bug 才是。像是「在特定操作序列下，某個IMAP客戶端觀察到重複的 UID」這樣的報告，過去意味著要花幾個小時閱讀文件、新增追蹤點，並在腦海中重建多個子系統的狀態。而一旦了解問題所在，實際的補丁通常只有十行程式碼。

 An agent with the entire repository in context collapses the search phase. It reads the relevant call paths in parallel, narrows a vague symptom down to a handful of candidate sites, and usually proposes something close to correct. We still read the diff, still decide whether the proposed fix addresses the cause or just the symptom, and still write the regression test. But an investigation that used to consume an afternoon now takes minutes.

 擁有完整程式碼庫上下文的代理程式可以簡化搜尋階段。它並行讀取相關的呼叫路徑，將模糊的症狀縮小到少數候選位置，並且通常會提出接近正確的解決方案。我們仍然會查看差異，仍然會判斷提出的修復方案是針對根本原因還是僅僅針對症狀，仍然會編寫回歸測試。但過去需要花費一下午時間的調查現在只需幾分鐘即可完成。

 The practical consequence is that we can hold the bug queue at zero. Every week, across the Stalwart server and all of the tools and crates we maintain, open bug reports get triaged and closed. That was the milestone we wrote about in Zero open bug reports: the road to Stalwart 1.0, except it is no longer a milestone. It is the normal state, and AI is a large part of why keeping it there is sustainable.

 實際結果是我們可以將 bug 隊列保持在零。每週，在 Stalwart 伺服器以及我們維護的所有工具和 crate 中，所有未解決的 bug 報告都會被分類並關閉。這正是我們在 零未解決 bug 報告：通往 Stalwart 之路1.0中提到的里程碑，但現在它不再是一個里程碑。這已成為常態，而AI正是我們能夠持續保持這一狀態的重要原因。

## Security｜安全

 In April 2026, Anthropic announced [Project Glasswing](https://www.anthropic.com/glasswing) alongside a preview of a model called Mythos, and the results were remarkable. Run against the OSS-Fuzz corpus, Mythos Preview surfaced [more than 23,000 potential vulnerabilities across over 1,000 open source projects](https://www.securityweek.com/anthropic-mythos-detected-23000-potential-vulnerabilities-across-1000-oss-projects/). Roughly 1,700 have been confirmed through external review so far, over a thousand of them rated high or critical.

 2026年4月，Anthropic公司發表了[Project Glasswing](https://www.anthropic.com/glasswing)並同時發表了名為Mythos的模型預覽版，結果令人矚目。 Mythos預覽版在OSS -Fuzz語料庫上運行，發現了[超過1000個開源專案中的23000多個潛在漏洞](https://www.securityweek.com/anthropic-mythos-detected-23000-potential-vulnerabilities-across-1000-oss-projects/) 。迄今為止，已有約1700個漏洞透過外部審查得到確認，其中超過1000個被評為高風險或嚴重。

 The individual findings are the interesting part. Mythos found a 27-year-old flaw in OpenBSD, a project whose entire reputation rests on being the most carefully audited operating system in existence. It found a 16-year-old bug in FFmpeg that had survived roughly five million fuzzing executions without being triggered. These were not vulnerabilities that nobody had looked for. They were vulnerabilities that decades of skilled human attention and industrial-scale fuzzing had both walked straight past. That is a capability to take seriously.

 各個發現才是最有趣的部分。 Mythos 在 OpenBSD 中發現了一個存在了 27 年的漏洞，而 OpenBSD 的聲譽完全建立在其作為現存最嚴格審計的作業系統之上。它還在 FFmpeg 中發現了一個存在了 16 年的漏洞，該漏洞在大約 500 萬次模糊測試中都未被觸發。這些並非無人關注的漏洞，而是數十年來經驗豐富的專家和工業級模糊測試都未能發現的漏洞。這種能力值得我們認真對待。

 We have used AI-assisted analysis on the Stalwart codebase in the same spirit. It found a handful of minor issues, all of which have been fixed. Nothing serious turned up, which we are glad about but do not intend to oversell: a quiet result is evidence, not proof. It sits alongside our 2023 and 2025 independent security audits as one more angle of attack on our own code, not as a replacement for any of them.

 我們本著同樣的精神，利用AI輔助分析對Stalwart程式碼庫進行了分析。分析發現了一些小問題，這些問題都已修復。沒有發現任何嚴重問題，我們對此感到欣慰，但也不想過度誇大：結果只是證據，而非證明。它與我們2023和2025的獨立安全審計並列，作為我們自身代碼的另一個安全審查角度，而不是取代它們。

## Performance work｜表演作品

 Writing code became cheap, and that changed which experiments make sense to run.

 編寫程式碼變得成本低廉，改變了哪些實驗值得進行。

 A performance idea used to carry a fixed tax. Before you learned anything, you had to build a harness, generate representative data, wire up measurement, and control for noise. Half a day of setup to test a hunch you might discard in five minutes. In practice that tax meant a lot of ideas never got measured at all. They got argued about instead, and the argument was settled by whoever had the stronger intuition rather than by numbers.

 過去，一項表演創意往往要繳一筆固定費用。在學習任何相關知識之前，你必須先建造實驗裝置、產生代表性數據、連接測量設備並控制雜訊。半天的準備工作只是為了測試一個你可能五分鐘內就會放棄的直覺。實際上，這筆費用意味著許多創意根本沒有被測量過。取而代之的是爭論，而爭論的最終結果往往取決於誰的直覺更強烈，而不是數據。

 That tax is mostly gone. We now use AI to write benchmark harnesses, and we write a lot of them. Hundreds, at this point, all targeting the `v1.0.0` development branch. Ideas that would previously have been dismissed as too expensive to set up now get measured, and a reasonable share of them turn out to be right.

 那項稅收基本上已經取消了。我們現在使用AI來編寫基準測試框架，而且編寫量很大。目前已有數百個，全部針對`v1.0.0`開發分支。以前因為部署成本過高而被否決的想法，現在都可以進行測試，而且其中相當一部分最終被證明是正確的。

 The clearest result so far is the internal full-text search store, which matters most for operators who do not run an external Elasticsearch or Meilisearch backend. In `v1.0.0`, FTS queries run up to **124 times faster** than on the `v0.16` branch. That number came out of measurement, not inspiration. We tried a lot of things, most of which did not work, and the ones that did survived because a benchmark said so.

 迄今為止最清晰的結果是內部全文搜尋存儲，這對於不運行外部 Elasticsearch 或 Meil​​​​isearch 後端的運營商來說最為重要。在 `v1.0.0`, FTS 中，查詢的運行速度比在 `v0.16` 分支上**快 124 倍**。這個數字是透過測量得出的，而不是靈感。我們嘗試了很多方法，其中大部分都不起作用，而那些有效的方法卻倖存了下來，因為基準測試是這麼說的。

 Note the division of labour: AI wrote the benchmarks. Humans wrote the optimizations. That is not accidental, and it leads directly to the next section.

 注意分工： AI編寫了基準測試，而最佳化部分則由人類編寫。這並非偶然，並且直接引出了下一節。

## Writing code, and where we draw the line｜編寫程式碼，以及我們的界限在哪裡

 We do not use AI to make architectural decisions, and we do not let it write or modify large portions of the codebase. Not as a philosophical stance, but for reasons we can point at.

 我們不使用AI來制定架構決策，也不會讓它編寫或修改大量程式碼庫。這並非出於某種理念立場，而是有其合理的原因。

 The first is that even the best current models write inefficient Rust. Not incorrect Rust. Inefficient Rust. They allocate where a borrow would do. They `clone()` to get past the borrow checker instead of restructuring. They collect an iterator into a `Vec` in order to iterate it once. They perform a linear lookup inside a loop and turn something linear into something quadratic. Every one of these compiles cleanly, passes the tests, and reads well in a diff. On a developer laptop with a test mailbox, none of it is visible.

 首先，即使是目前最好的 Rust 寫法，效率也很低。不是寫錯了，而是效率低。它們會在可以使用借用的地方分配記憶體。它們為了繞過借用檢查器而使用`clone()`而不是重構。它們為了只迭代一次而將迭代器收集到`Vec`中。它們在迴圈內執行線性查找，把線性運算變成了二次運算。所有這些錯誤都能順利編譯，通過測試，並且在差異比較中看起來也不錯。但在開發者的筆記型電腦上，即使有測試郵箱，這些錯誤也完全不可見。

 Stalwart is designed to run in large clusters handling millions of requests. At that scale, allocation patterns are not a detail; they are the cost model. An unnecessary allocation on a hot path is a change in how many machines an operator has to pay for. We cannot let that class of code into the codebase, and the reason it is dangerous is precisely that it looks fine.

 Stalwart 的設計目標是在處理數百萬請求的大型叢集中運行。在這種規模下，資源分配模式並非細節，而是成本模型的核心。在關鍵路徑上進行不必要的資源分配，這意味著運維人員需要為多少台機器付費。我們絕不允許這類程式碼進入程式碼庫，而它危險的原因恰恰在於它看起來似乎沒有問題。

 The second reason is that models still make simple mistakes and confident wrong assumptions. They will assume a field is always present, that an error path is unreachable, or that a protocol behaves the way the common case suggests rather than the way the RFC specifies. Most of the time they are right, which is what makes the exceptions expensive to catch.

 第二個原因是模型仍然會犯一些簡單的錯誤，並做出一些錯誤的假設。例如，它們會假設某個欄位總是存在，某個錯誤路徑不可達，或某個協定的行為方式與常見情況一致，而不是與RFC規範一致。大多數情況下，它們的假設都是正確的，這也正是異常處理成本高昂的原因。

 The third reason is technical debt, and it is the one we weigh most heavily. We need to be able to understand and explain every line of code in Stalwart. Not “understand it if we sit down and study it”, but understand it now, when an operator reports something strange at three in the morning. Code that nobody on the team has ever reasoned through is a liability with a delayed fuse, however clean it looks on the day it lands.

 第三個原因是技術債，也是我們最重視的一點。我們需要能夠理解並解釋 Stalwart 中的每一行程式碼。不是“坐下來仔細研究後才能理解”，而是要能夠立即理解，尤其是在凌晨三點運維人員報告異常情況時。團隊中沒有人真正理解過的代碼，無論上線當天看起來多麼完美，都像是一個遲來的隱患。

 So the line we draw is about scope rather than about tooling. Localized, single-purpose changes with AI assistance work well and we use them daily. New features and anything architectural get written the old fashioned way, because reviewing generated code to the standard this project requires consistently takes longer than writing it ourselves.

 因此，我們劃定的界線在於範圍，而非工具。在AI幫助下進行局部、單用途的更改效果很好，我們每天都在使用。新功能和任何架構相關的內容都採用傳統方式編寫，因為按照本專案要求的標準審查產生的程式碼所花費的時間比我們自己編寫程式碼還要長。

 And there is a last reason, which is less rigorous but matters to us just as much. We write software because we enjoy writing software. Designing a subsystem, finding the shape that makes the hard case fall out for free, getting a data structure exactly right: that is the good part. Handing it to a model returns a diff and takes the pleasure with it. We are not interested in optimizing away the reason we do this.

 最後還有一個原因，雖然沒那麼嚴謹，但對我們來說也同樣重要。我們編寫軟體是因為我們喜歡寫軟體。設計子系統，找到能夠輕鬆解決棘手問題的結構，精確地建構資料結構：這才是樂趣所在。把這些交給模型處理，它只會返回一個差異，然後帶走我們編寫軟體的樂趣。我們並不想透過優化來抹殺我們寫軟體的初衷。

## Support｜支援

 Our support portal at [support.stalw.art](https://support.stalw.art/) runs an AI assistant we call **helpbot**. It has been given the current source of every Stalwart repository through retrieval, and it performs semantic search across the documentation and the full history of previous forum threads. When a question comes in, helpbot answers first, and a human follows up afterwards.

 我們的支援入口網站 [support.stalw.art](https://support.stalw.art/)運行著一個名為AI助手，我們稱之為 **helpbot**。它透過檢索獲得了所有 Stalwart 程式碼庫的當前原始程式碼，並可在文件和所有歷史論壇貼文中進行語義搜尋。當收到問題時，helpbot 會先回答，之後會有人工客服跟進。

 It works better than we expected. Most user questions are resolved by the bot alone, usually within a minute or two, at any hour and in any timezone. This is largely because a lot of support is not about novel problems. It is about connecting a symptom to the right documentation page or to the thread where somebody hit the same thing last March. That is a retrieval problem, and retrieval is something these systems are very good at.

 它的效果比我們預期的還要好。大多數使用者問題都能由機器人獨立解決，通常只需一兩分鐘，而且不受時間和時區限制。這主要是因為許多支援工作並非針對全新問題，而是將使用者遇到的問題與正確的文件頁面或去年三月有人遇到相同問題的貼文關聯起來。這是一個檢索問題，而檢索正是這些系統非常擅長的。

 Two things matter to us about how this is set up. First, helpbot is not a wall between users and people. Every thread stays open, and a human reads it regardless of whether the bot’s answer looked right. Second, users can opt out of AI involvement entirely. If you would rather talk to a person from the start, you can say so, and no model will touch your thread. Asking for help should not require accepting an AI intermediary.

 我們認為這個系統設定有兩點很重要。首先，幫助機器人並非使用者與真人之間的隔閡。每個貼文都會保持開放狀態，無論機器人的回答是否正確，都會有真人閱讀。其次，使用者可以完全選擇AI參與。如果您希望從一開始就與真人交流，您可以明確提出，這樣就不會有任何機器人介入您的貼文。尋求幫助不應該需要接受AI中間人。

## Documentation｜文件

 Documentation is where gaps are hardest to see from the inside. Once you know how a subsystem works, you cannot easily tell which part of the explanation is missing, because your own knowledge quietly fills it in as you read.

 文件中的漏洞最難從內部發現。一旦你了解了某個子系統的工作原理，就很難分辨出解釋中缺少了哪一部分，因為你自身的知識會在閱讀過程中悄悄填補空白。

 Support traffic solves that problem, and AI helps us read it at scale. Recurring questions are a direct map of where the documentation is thin, ambiguous, or simply absent. We use AI to find those patterns, to draft the missing sections, and to check existing pages for the assumptions they make without stating them. Every change is reviewed and edited by a human before it ships, the same as any other contribution, but the work of noticing what is missing has become far more systematic than it used to be.

 支援流量解決了這個問題，而AI則幫助我們大規模地閱讀這些流量。反覆出現的問題直接反映了文件的不足之處，例如內容不夠詳盡、含糊不清或根本沒有文件。我們使用AI來找出這些模式，撰寫缺少的章節，並檢查現有頁面是否有未明確說明的假設。每次變更在發布前都會經過人工審核和編輯，與其他任何貢獻一樣，但如今發現文件缺失的工作已經比以往更加系統化。

## What AI is not｜AI不是什麼

 AI has made Stalwart better. Bugs get found and fixed faster, performance ideas get measured instead of argued about, security gets another pair of eyes, and users get answers at three in the morning. None of that is a small thing, and we would not want to go back.

 AI讓 Stalwart 變得更好了。漏洞發現和修復速度更快，效能優化方案能夠實際驗證而不是爭論不休，安全方面有了額外的審查，用戶甚至在凌晨三點也能得到解答。這些都不是小事，我們不想回到過去。

 But it has not replaced human judgment anywhere that matters, and we do not expect it to. Everything above describes a tool being used well: an extremely fast, extremely well-read autocomplete that has read the entire codebase and never gets tired. It finds things. It drafts things. It measures things. It does not decide what Stalwart should be, it does not choose the shape of a subsystem, and it does not get the final word on a single line that ships.

 但它並未在任何重要領域取代人類的判斷，我們也不指望它能做到這一點。以上描述的是一個工具的良好使用狀態：一個速度極快、讀取能力極強的自動補全工具，它已經讀取了整個程式碼庫，並且永不疲倦。它能發現問題，能寫出程式碼草稿，能衡量效能。但它不會決定 Stalwart 應該是什麼樣子，不會選擇子系統的結構，也不會對最終發布的程式碼行擁有最終決定權。

 That distinction is not a temporary position we are holding until the models improve. The models will keep improving, and we will keep using them for more. But the responsibility for what we ship stays with the people who build it, and writing this software remains something we do because we want to. At Stalwart Labs, AI will not be replacing human developers.

 這種差異並非我們為了模型改進而暫時保留的立場。模型會不斷改進，我們也會繼續將其應用於更多領域。但我們交付的產品的責任始終在於開發人員，編寫這些軟體仍然是我們出於熱愛而做的事情。在 Stalwart Labs， AI不會取代人類開發人員。

**Tags:**

**標籤：**

- [ai](https://stalw.art/blog/tags/ai/)
[ai](https://stalw.art/blog/tags/ai/)
- [engineering](https://stalw.art/blog/tags/engineering/)
[工程](https://stalw.art/blog/tags/engineering/)
- [security](https://stalw.art/blog/tags/security/)
[安全](https://stalw.art/blog/tags/security/)
- [performance](https://stalw.art/blog/tags/performance/)
[表演](https://stalw.art/blog/tags/performance/)
- [support](https://stalw.art/blog/tags/support/)
[支持](https://stalw.art/blog/tags/support/)
- [process](https://stalw.art/blog/tags/process/)
[進程](https://stalw.art/blog/tags/process/)
Introducing Sievepad: write and debug Sieve scripts in the browser
 Sievepad 簡介：在瀏覽器中編寫和調試 Sieve 腳本

 DKIM2 and DMARCbis have landed, and Stalwart speaks them first

 DKIM2和 DMARCbis 已著陸，Stalwart 首先與他們交談

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Stalwart Joins GitHub's Open Source Secure Fund｜Stalwart 加入 GitHub 開源安全基金　｜　下一篇：Vandelay the JMAP importer-exporter｜Vandelay JMAP進出口商 ➡
