---

## title: "Vandelay the JMAP importer-exporter｜Vandelay JMAP進出口商"

 title\_original: "Vandelay the JMAP importer-exporter"
source: "[https://stalw.art/blog/jmap-account-migration](https://stalw.art/blog/jmap-account-migration)"
chapter: \["blog"\]
order: 26
lang: "bilingual"
translated\_by: "google\_v2"
captured: "2026-10-05T01:02:54.475Z"

 ⬆ 目錄　｜　⬅ 上一篇：How we use AI at Stalwart｜我們在 Stalwart 如何使用AI　｜　下一篇：JMAP for Calendars, Contacts and Files now in Stalwart｜JMAP適用於日曆、聯絡人和文件，現已整合到 Stalwart 中 ➡

# Vandelay the JMAP importer-exporter｜Vandelay JMAP進出口商

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

## Vandelay: the JMAP importer-exporter｜Vandelay： JMAP進出口商

 May 29, 2026 - 7 min read

 2026年5月29日 - 閱讀需時7分鐘

 \[![Mauro D.](assets/selected_553_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

 A good number of Stalwart deployments are running an older version not because the operators want to be, but because they cannot afford the disruption. Upgrading across a major release sometimes means migrating off an older on-disk schema, and migrating data means downtime, and downtime on a mail server is the one thing nobody wants to schedule. So the upgrade gets postponed, again, and a deployment that should be on the current line stays where it is. The question we get asked most often is when we will ship something to fix exactly this.

 許多 Stalwart 部署仍在運行舊版本，並非維運人員所願，而是因為他們無法承受升級帶來的中斷。跨主要版本升級有時意味著要遷移舊的磁碟資料架構，而資料遷移必然導致停機，郵件伺服器的停機是任何人都不願安排的事情。因此，升級只能再次推遲，原本應該升級到最新版本的部署只能繼續停留在原地。我們被問到最多的問題是：何時才能發布解決方案來徹底解決這個問題？

 We have said before that the right answer is a zero-downtime migration path, built from two parts: a proxy that sits in front of both the old and the new server so that clients keep working throughout, and a transfer tool that moves account data from one to the other. Today we are shipping the first of those two parts.

 我們之前說過，正確的解決方案是建立一個零停機遷移路徑，它由兩部分組成：一個代理伺服器，它同時位於新舊伺服器的前端，確保客戶端在整個遷移過程中都能正常工作；以及一個傳輸工具，用於將帳戶資料從一台伺服器遷移到另一台伺服器。今天，我們將發布這兩部分中的第一部分。

 It is called [Vandelay](https://github.com/stalwartlabs/vandelay/), and it is a one-shot account migration and backup utility for JMAP. Yes, it is named after Art Vandelay, the importer-exporter George Costanza made up as a cover story on Seinfeld. The tool imports and it exports, so the reference wrote itself.

 它名為 [Vandelay](https://github.com/stalwartlabs/vandelay/) ，是一款適用於JMAP一次性帳戶遷移和備援工具。沒錯，它的名字來自 Art Vandelay，也就是喬治·科斯坦薩在《宋飛正傳》中虛構的那個進出口商。該工具既能導入也能導出，所以這個名字自然而然就成了它的靈感來源。

### What Vandelay does｜Vandelay 做什麼

 Vandelay is the JMAP analogue of [imapsync](https://github.com/imapsync/imapsync), generalized from mail to every JMAP data type: mail, contacts, calendars, identities, sieve scripts, and file storage. It works in two stages that never talk to each other directly. An import reads a source account into a local SQLite file that Vandelay calls an *archive*; one archive holds exactly one account and fully describes it on its own. An export then pushes an archive into a target JMAP server. Because import and export only ever touch the archive, never each other, the two halves are completely decoupled: you can import today and export next week, import from one protocol and export to JMAP, or keep the archive around and do nothing with it at all.

 Vandelay是 JMAP [imapsync 的類似物](https://github.com/imapsync/imapsync)從郵件到所有 JMAP 資料類型：郵件、聯絡人、日曆、識別資訊、Sieve 腳本和檔案儲存。它分兩個階段運行，這兩個階段互不直接互動。匯入操作會將來源帳戶讀取到本機 SQLite 檔案中，Vandelay 稱之為「歸檔檔案」；一個歸檔檔案只包含一個帳戶，並對其進行完整描述。匯出操作則會將歸檔檔案推送到目標位置。 JMAP 伺服器.由於導入和導出操作只會訪問歸檔文件，彼此之間不會交互，因此這兩個部分完全解耦：您可以今天導入，下週導出；可以從一種協議導入，導出到另一種協議。 JMAP或者，把存檔保留下來，什麼都不做。

 A few properties make it pleasant to operate at scale. Both halves are convergent, so re-running an interrupted import or export simply picks up where it left off, with no bookkeeping flags to reset and no half-finished state to clean up; re-running an import later also catches anything new since the last snapshot. Every command takes `--dry-run`, which computes the full plan without writing anything, so you can see exactly what a run would do before it does it. Emails, sieve scripts, and file payloads are content-addressed, stored once by their hash and deduplicated across the archive. Work runs multi-threaded across a worker pool sized to your CPUs, with per-server connection caps respected automatically and no async runtime involved. And each archive remembers which account filled it, so pointing it at a different one by mistake fails unless you explicitly allow it.

 一些特性使其在大規模操作中非常便捷。匯入和匯出過程是收斂的，因此重新執行中斷的匯入或匯出操作會直接從上次中斷的地方繼續，無需重置簿記標誌，也無需清理未完成的狀態；稍後重新執行匯入操作還能擷取自上次快照以來的所有新增內容。每個命令都會執行`--dry-run` ，它會在不寫入任何內容的情況下計算完整的執行計劃，因此您可以在執行之前準確地了解其執行過程。電子郵件、篩選腳本和檔案有效負載均採用內容尋址，透過雜湊值儲存一次，並在整個歸檔中進行去重。工作在與您的 CPU 數量相符的工作池中以多執行緒方式運行，每個伺服器的連線數上限會自動遵守，且不涉及非同步執行時間。每個歸檔都會記住填充它的帳戶，因此除非您明確允許，否則錯誤地將其指向其他帳戶將導致失敗。

 A typical migration is two commands:

 典型的遷移過程包含兩個指令：

```bash title=&amp;quot;Terminal window&amp;quot;
# 1. Import an IMAP mailbox into a fresh archive.
export VANDELAY_PASSWORD='source-app-password'
vandelay import imap \
  --url imaps://imap.example.com \
  --auth-basic [email protected] \
  alice.sqlite

# 2. Push the archive into a target JMAP server.
export VANDELAY_PASSWORD='target-password'
vandelay export \
  --url https://jmap.example.org \
  --auth-basic [email protected] \
  --account-name [email protected] \
  alice.sqlite
```

There is also an `inspect` command that dumps any object type from an archive \(mailbox tree, message list, contacts, calendar events, and so on\) without ever opening a network connection, which is handy for verifying a capture before you push it anywhere.

 還有`inspect`命令，它可以從存檔中導出任何物件類型（郵箱樹、郵件列表、聯絡人、日曆事件等），而無需打開網路連接，這對於在將捕獲內容推送到任何地方之前進行驗證非常有用。

### Account backup tool｜帳戶備份工具

 Migrating between Stalwart versions over JMAP is what prompted Vandelay, but it is far from all it does. The first thing that falls out of the design is backup. Because an archive is a self-contained SQLite file that fully describes one account, you can treat it as a per-account backup in its own right. Run an import on a schedule to capture a fresh snapshot, keep the resulting file, and restore it later by running an export against any JMAP target. Since imports are convergent, each scheduled run only has to fetch what changed rather than re-reading the whole account every time.

 Vandelay 的開發初衷是為了在 Stalwart 版本之間進行遷移JMAP ，但這遠非它的全部功能。首先，它還著重於備份。由於歸檔文件是一個獨立的 SQLite 文件，完整地描述了一個帳戶，因此您可以將其視為一個獨立的帳戶備份。您可以設定計劃任務運行導入，以獲取最新的快照，保存生成的文件，並在之後通過針對任何JMAP目標運行導出來恢復它。由於導入是收斂的，因此每次計劃任務只需獲取更改的部分，而無需每次都重新讀取整個帳戶。

### Migrating from legacy servers and formats｜從舊版伺服器和格式遷移

 Vandelay reads from a wide range of sources, not just JMAP, which makes it a practical way off an older self-hosted stack. Over IMAP it imports mail from any server, with folder selection by regex, exact name, or SPECIAL-USE role. Over CalDAV and CardDAV it imports calendars and events, address books and contacts, and over WebDAV it imports a file collection as a JMAP `FileNode` tree. ManageSieve brings across sieve scripts and records which one is active. It can also read a local Maildir++ tree straight off disk, with no network involved at all.

 Vandelay 可從多種來源讀取數據，而不僅僅是JMAP ，這使其成為從舊版自託管堆疊遷移的實用方案。它透過IMAP從任何伺服器匯入郵件，並支援以正規表示式、確切名稱或SPECIAL-USE角色選擇資料夾。它透過 CalDAV 和 CardDAV 匯入日曆和事件、通訊錄和聯絡人，並透過 WebDAV 將檔案集合匯入為JMAP `FileNode`樹狀結構。 ManageSieve 會匯入 Sieve 腳本並記錄哪個腳本處於活動狀態。它也可以直接從磁碟讀取本機 Maildir++ 樹狀結構，完全無需網路操作。

 In practice this means Vandelay is a path off Dovecot, Cyrus, Radicale, Baikal, Apache `mod_dav`, and similar servers, and onto a JMAP server such as Stalwart, with mail, calendars, contacts, files, and filters all moving through the same tool.

 實際上，這意味著 Vandelay 是一條從 Dovecot、Cyrus、Radicale、Baikal、Apache `mod_dav`和類似伺服器到JMAP伺服器（例如 Stalwart）的路徑，郵件、日曆、聯絡人、檔案和過濾器都透過同一個工具傳輸。

### Moving off Google and Microsoft Exchange｜放棄 Google 和 Microsoft Exchange

 For accounts that live on a proprietary platform, Vandelay can pull data out of the two big ones. Google data exported through Takeout imports directly: Vandelay scans a directory tree for `.mbox`, `.ics`, and `.vcf` files and brings in the mail, calendars, and contacts it finds. It is tuned to the Takeout layout but works on any such tree.

 對於託管在專有平台上的帳戶，Vandelay 可以從兩大平台擷取資料。透過 Takeout 匯出的 Google 資料可以直接匯入：Vandelay 會掃描目錄樹中的`.mbox`, `.ics`和`.vcf`文件，並匯入找到的郵件、行事曆和聯絡人。它針對 Takeout 的佈局進行了最佳化，但也適用於任何類似的目錄樹。

 For Microsoft Exchange, Vandelay can read mailboxes two ways. Over EWS it works against either on-premises Exchange Server or Exchange Online, with autodiscover, Basic auth, pre-acquired bearer tokens, interactive device-code OAuth, and app-only client-credentials OAuth. Over Microsoft Graph it reads Exchange Online mailboxes, using the interactive device-code flow by default.

 對於 Microsoft Exchange，Vandelay 可以透過兩種方式讀取郵箱。透過EWS它可以存取本機 Exchange Server 或 Exchange Online，支援自動發現、基本驗證、預先取得的持有者令牌、互動式裝置程式碼 OAuth 和僅限應用程式用戶端憑證 OAuth。透過 Microsoft Graph，它預設使用互動式裝置程式碼流程讀取 Exchange Online 信箱。

 One clear caveat: Exchange support is experimental. So far it has only been tested against a mock server, not a real Exchange deployment. The code paths are there and they pass against the mock, but Exchange is a large and quirky target, and we would not feel right calling this production-ready until it has met real mailboxes. If you have an Exchange tenant or an on-prem server and some appetite for testing, this is exactly the kind of help that moves a feature from experimental to supported. Please [open an issue](https://github.com/stalwartlabs/vandelay/) with what you find.

 需要特別說明的是：Exchange 支援目前仍處於實驗階段。到目前為止，它僅在模擬伺服器上進行了測試，尚未在真實的 Exchange 部署環境中進行測試。程式碼路徑已經存在，並且在模擬伺服器上也能正常運行，但 Exchange 是一個龐大且特性複雜的系統，因此在經過真實郵箱的測試之前，我們認為不宜將其視為生產環境就緒。如果您擁有 Exchange 租用戶或本機伺服器，並且願意進行測試，那麼這正是推動功能從實驗階段過渡到正式支援階段所需的協助。請將您的發現提交至 [issue](https://github.com/stalwartlabs/vandelay/) 。

### Sovereignty over your data｜數據主權

 There is a bigger reason we built the importers as broadly as we did, and it is not only about Stalwart upgrades.

 我們之所以如此廣泛地建立進口商，還有一個更重要的原因，而這不僅僅是關於 Stalwart 的升級。

 A lot of email, calendar, and contact data lives today on platforms where the operator, not the user, holds the keys. Getting your own data out of Google or Microsoft in a form you can actually use somewhere else is harder than it should be, and that friction is not accidental. It is what keeps people on a platform long after the reasons for choosing it have faded.

 如今，大量的電子郵件、日曆和聯絡人資料都儲存在營運商而非使用者掌握控制權的平台上。從Google或微軟等平台提取自己的數據，並以可在其他地方使用的形式呈現，比想像中要困難得多，而這種障礙並非偶然。正是這種障礙使得用戶即使當初選擇某個平台的理由早已消失，仍然會長期留在該平台上。

 Owning your data means being able to leave. Vandelay is meant to make leaving straightforward: pull a full account out of a proprietary platform, hold it in an open, inspectable SQLite file that you control, and push it into a modern open-source JMAP server that you run yourself. No lock-in on the way in, and an open format in the middle that you can read with `sqlite3` if you ever want to. Self-hosting is the part of the privacy conversation that is easy to agree with and hard to act on, and a migration tool that actually works is one of the things that makes acting on it realistic.

 擁有自己的數據意味著可以隨時退出。 Vandelay 旨在讓退出變得簡單：將完整的帳戶從專有平台提取出來，保存在您控制的開放且可檢查的 SQLite 檔案中，然後將其推送到您自己運行的現代開源JMAP伺服器。遷移過程中沒有任何鎖定，中間採用開放格式，如果您需要，可以使用`sqlite3`讀取資料。自託管是隱私討論中容易達成共識卻難以付諸行動的部分，而一款真正有效的遷移工具正是讓自託管成為現實的關鍵因素之一。

### What is next｜接下來會發生什麼事？

 Vandelay is the first installment, not the whole story. The zero-downtime migration path we described still needs its second half, the migration proxy that lets clients keep talking to a single endpoint while accounts move from the old server to the new one behind it. That work is underway now, and we expect to release it in about two to three weeks.

 Vandelay 只是第一部分，並非全部。我們先前描述的零停機遷移方案還需要第二部分，也就是遷移代理。此代理程式可讓客戶端在​​帳戶從舊伺服器遷移到新伺服器的過程中，繼續與單一端點通訊。這項工作目前正在進行中，預計將在兩到三週內發布。

 When the proxy ships, we will also publish proper documentation covering the full migration workflow end to end, including how to use Vandelay as part of it. For now, the [README](https://github.com/stalwartlabs/vandelay/) is the documentation, and it covers every importer, every flag, and the quick-start path in detail.

 代理發布後，我們也會發布完整的文檔，涵蓋端到端的遷移工作流程，包括如何使用 Vandelay。目前，[README](https://github.com/stalwartlabs/vandelay/)就是文檔，它詳細介紹了每個導入器、每個標誌以及快速入門指南。

 If you have been putting off an upgrade, or you have data sitting on a platform you would rather not be on, [Vandelay](https://github.com/stalwartlabs/vandelay/) is ready to try today. We would love to hear how it goes, and if you can help us test the Exchange importers against the real thing, even better.

 如果您一直猶豫是否要升級，或者您的資料儲存在您不想使用的平台上，[Vandelay](https://github.com/stalwartlabs/vandelay/)現已準備就緒，歡迎立即試用。我們非常希望了解您的使用體驗，如果您能幫助我們測試 Exchange 導入器在實際環境中的表現，那就更好了。

**Tags:**

**標籤：**

- [vandelay](https://stalw.art/blog/tags/vandelay/)
[vandelay](https://stalw.art/blog/tags/vandelay/)
- [migration](https://stalw.art/blog/tags/migration/)
[遷移](https://stalw.art/blog/tags/migration/)
- [backup](https://stalw.art/blog/tags/backup/)
[備份](https://stalw.art/blog/tags/backup/)
- [jmap](https://stalw.art/blog/tags/jmap/)
[jmap](https://stalw.art/blog/tags/jmap/)
- [imap](https://stalw.art/blog/tags/imap/)
[imap](https://stalw.art/blog/tags/imap/)
- [caldav](https://stalw.art/blog/tags/caldav/)
[caldav](https://stalw.art/blog/tags/caldav/)
- [carddav](https://stalw.art/blog/tags/carddav/)
[carddav](https://stalw.art/blog/tags/carddav/)
- [exchange](https://stalw.art/blog/tags/exchange/)
[交換](https://stalw.art/blog/tags/exchange/)
- [server](https://stalw.art/blog/tags/server/)
[伺服器](https://stalw.art/blog/tags/server/)
Migration proxy: zero-downtime upgrades
 遷移代理：零停機升級

 MTA Hooks at the IETF

 MTA鉤子位於IETF

 ---

 ⬆ 目錄　｜　⬅ 上一篇：How we use AI at Stalwart｜我們在 Stalwart 如何使用AI　｜　下一篇：JMAP for Calendars, Contacts and Files now in Stalwart｜JMAP適用於日曆、聯絡人和文件，現已整合到 Stalwart 中 ➡
