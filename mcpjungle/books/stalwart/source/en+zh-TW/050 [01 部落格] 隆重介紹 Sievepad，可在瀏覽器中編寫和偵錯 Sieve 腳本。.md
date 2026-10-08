---

## title: "Introducing Sievepad write and debug Sieve scripts in the browser｜隆重介紹 Sievepad，可在瀏覽器中編寫和偵錯 Sieve 腳本。"

 title\_original: "Introducing Sievepad write and debug Sieve scripts in the browser"
source: "[https://stalw.art/blog/sievepad](https://stalw.art/blog/sievepad)"
chapter: \["blog"\]
order: 50
lang: "bilingual"
translated\_by: "google\_v2+gtx"
captured: "2026-10-05T01:03:33.240Z"

 ⬆ 目錄　｜　⬅ 上一篇：Sieve filters are now available on Stalwart JMAP v0.2｜Stalwart JMAP v0.2現已推出篩網過濾器　｜　下一篇：SMTP Smuggling What it is and how Stalwart is protected｜SMTP走私：它的定義以及「堅韌」如何受到保護 ➡

# Introducing Sievepad write and debug Sieve scripts in the browser｜隆重介紹 Sievepad，可在瀏覽器中編寫和偵錯 Sieve 腳本。

> 章節：\\\[blog｜部落格\\\]\\\(&lt;000 目錄.md#c-1&gt;\\\)

## Introducing Sievepad: write and debug Sieve scripts in the browser｜隆重介紹 Sievepad：在瀏覽器中編寫和調試 Sieve 腳本

 Sep 14, 2026 - 9 min read

 2026年9月14日 - 閱讀時間9分鐘

 \[![Mauro D.](assets/selected_359_image_001.png)

 Mauro D.

 毛羅·D.

 Project Maintainer

 專案維護者

 \]\([https://github.com/mdecimus](https://github.com/mdecimus)\)

[Sieve](https://www.rfc-editor.org/rfc/rfc5228) is the standard language for filtering email on the server. The rules people create to move newsletters into a folder, flag messages from their manager or answer automatically while on holiday are, on many servers, Sieve scripts, uploaded over [ManageSieve](https://www.rfc-editor.org/rfc/rfc5804) or [JMAP for Sieve](https://www.rfc-editor.org/rfc/rfc9661) and executed every time a message arrives. Stalwart runs these scripts for its users, and administrators use the same language at the SMTP stages to reject, rewrite and route messages before they are accepted.

[Sieve](https://www.rfc-editor.org/rfc/rfc5228)是伺服器上過濾電子郵件的標準語言。在許多伺服器上，人們創建的用於將時事通訊移入資料夾、標記來自經理的訊息或在度假時自動回复的規則是 Sieve 腳本，透過 [ManageSieve](https://www.rfc-editor.org/rfc/rfc5804) 或 [JMAP for Sieve](https://www.rfc-editor.org/rfc/rfc9661) 上傳，並在每次訊息到達時執行。 Stalwart 為其使用者執行這些腳本，管理員在 SMTP 階段使用相同的語言來拒絕、重寫和路由訊息，然後再接受訊息。

 Sieve was designed to be safe to run on a shared server. The base language has no loops, no variables unless an extension adds them, and no access to the network or the file system. That restraint is what makes it reasonable to let every user of a mail server upload their own filters, but it also leaves nothing to reach for when a filter misbehaves. Today we are releasing [Sievepad](https://sievepad.com/), a playground that runs the Stalwart Sieve interpreter directly in the browser, so that a script can be written, run and debugged against test messages in seconds, without a server and without sending a single email.

 Sieve 的設計初衷就是為了在共享伺服器上安全運作。其基礎語言沒有循環，除非透過擴展添加，否則沒有變量，也無法存取網路或檔案系統。正是這種限制使得郵件伺服器的每個使用者都可以上傳自己的過濾器，但同時也意味著當過濾器發生故障時，我們無計可施。今天，我們發布了 [Sievepad](https://sievepad.com/) ，這是一個可以直接在瀏覽器中運行 Stalwart Sieve 解釋器的測試平台，因此無需伺服器，也無需發送任何電子郵件，即可在幾秒鐘內編寫、運行腳本並針對測試郵件進行調試。

## Debugging Sieve by email｜透過電子郵件調試 Sieve

 A Sieve script is not a program anyone runs by hand. The server executes it at delivery time, in response to a message sent by someone else, and the language gives the script no way to report back: there is no print statement, no logging command and no debugger. When a filter does something other than what its author intended, the only evidence is the outcome. The message landed in the wrong folder, stayed in the inbox, or never showed up at all.

 Sieve 腳本並非手動執行的程式。伺服器會在郵件送達時執行它，以回應其他人發送的訊息。語言本身並沒有提供腳本回饋機制：沒有列印語句、沒有日誌指令，也沒有偵錯器。當過濾器執行的操作與作者預期不符時，唯一的證據就是最終結果。郵件可能被發送到了錯誤的資料夾、留在了收件匣，或者根本沒有被發送出去。

 Administrators can at least turn to the server logs, which record the actions a script took and any runtime errors it hit, but not the values it looked at or the reason a test failed to match. End users do not have even that. Someone writing a filter in their mail client has no access to the logs, and a script that uploads without complaint can still be wrong in ways that surface only days later, when an important message turns out to have been filed where nobody looked. Syntax errors are the easy case, because the server refuses the upload and says why. The hard cases are the scripts that compile and then quietly do the wrong thing.

 管理員至少可以查看伺服器日誌，其中記錄了腳本執行的操作以及遇到的任何執行時間錯誤，但不會記錄腳本檢查的值或測試失敗的原因。最終用戶甚至連這些資訊都無法取得。在郵件用戶端中編寫過濾器的使用者無法存取日誌，即使腳本上傳成功且沒有報錯，也可能存在一些錯誤，這些錯誤可能要幾天後才會顯現出來，例如當一條重要郵件被歸檔到無人檢查的地方時。語法錯誤比較容易處理，因為伺服器會拒絕上傳並說明原因。真正棘手的是那些編譯後卻悄無聲息地執行錯誤操作的腳本。

 Consider a filter that sorts mailing lists into one folder per list, using a regular expression to pull the list name out of the `List-Id` header. It handles every list its owner reads until a new one arrives whose messages keep landing in the inbox. With no way to print anything, the standard technique is to turn the message itself into a debug channel: add `addheader` statements that copy the values in question into the headers, upload the script, send a test email, wait for it to arrive and read its raw source.

 假設有一個過濾器，它使用正規表示式從`List-Id`頭中提取清單名稱，並將郵件清單按清單分類到不同的資料夾中。它會處理所有者讀取的每個列表，直到收到一個新列表，並且該列表的郵件不斷出現在收件匣中。由於無法列印任何內容，標準做法是將郵件本身變成一個調試通道：添加`addheader`語句，將相關值複製到郵件頭中，上傳腳本，發送測試郵件，等待郵件到達並讀取其原始原始碼。

```sieve
require ["fileinto", "mailbox", "variables", "regex", "editheader"];

if header :matches "List-Id" "*" {
    addheader "X-Sieve-Debug" "List-Id is ${1}";
}

if header :regex "List-Id" "<([a-z0-9-]+)\\." {
    set :lower "list" "${1}";
    addheader "X-Sieve-Debug" "Matched list ${list}";
    fileinto :create "Lists/${list}";
}
```

Getting to this script usually takes more than one round. A first attempt places a debug header only inside the `if`, and the test message comes back without it, which confirms that the condition failed and nothing else. Only the next attempt, which copies the raw header before the test, reveals the value: `Release notes <Release-Notes.lists.example.com>`, with capital letters that the character class `[a-z0-9-]` does not cover.

 通常需要多次嘗試才能找到這段腳本。第一次嘗試只在`if`內放置了一個調試頭，測試訊息返回時沒有顯示調試頭，這證實了條件判斷失敗，僅此而已。只有第二次嘗試，複製測試前的原始頭部訊息，才能顯示`Release notes <Release-Notes.lists.example.com>`的值，其中包含字元類`[a-z0-9-]`不包含的大寫字母。

 Each of those questions costs a round trip through the mail system, and some conditions are awkward to set up from an ordinary mail client at all. A rule that depends on the envelope sender, the spam score the server assigns or the current date cannot be exercised just by composing a message. The `vacation` extension answers a given sender only once within its `:days` period, so a second test needs a different sender or a long wait, and `duplicate` exists precisely to detect the second copy of a message. Even the workaround is not guaranteed, since administrators can disable `editheader` for user scripts.

 這些問題都需要透過郵件系統進行一次往返，而且有些條件很難透過普通郵件用戶端設定。例如，依賴信封寄件者、伺服器分配的垃圾郵件評分或目前日期的規則，無法透過撰寫郵件來觸發`vacation`擴充程式在其`:days`週期內只會對特定寄件者進行一次回應，因此第二次測試需要不同的寄件者或長時間等待，而`duplicate`存在正是為了偵測郵件的第二個副本。即使是這種變通方法也無法保證有效，因為管理員可以停用使用者腳本的`editheader`功能。

## Meet Sievepad｜認識 Sievepad

[Sievepad](https://sievepad.com/) is a Sieve playground that runs entirely in the browser. It executes scripts with [sieve-rs](https://github.com/stalwartlabs/sieve), the interpreter inside Stalwart, compiled to WebAssembly. A script is parsed, compiled and run by the same code that runs it on the server, so given the same message and settings it behaves in Sievepad exactly as it does in production, and the errors Sievepad reports are the errors the server would report.

[Sievepad](https://sievepad.com/)是一個完全在瀏覽器中運作的 Sieve 測試環境。它使用 Stalwart 內部的解釋器 [sieve-rs](https://github.com/stalwartlabs/sieve)執行編譯為 WebAssembly 的腳本。腳本的解析、編譯和運行都由與伺服器端相同的程式碼完成，因此，在相同的訊息和設定下，腳本在 Sievepad 中的行為與在生產環境中完全相同，Sievepad 報告的錯誤也與伺服器端報告的錯誤一致。

 Nothing leaves the browser. There is no account to create and no backend to talk to: scripts, test messages and settings are stored locally, and the interpreter runs in a background worker on the visitor’s own machine.

 所有資料都不會離開瀏覽器。無需建立帳戶，也無需與後端通訊：腳本、測試訊息和設定都儲存在本地，解釋器在訪客本地機器的後台工作進程中運行。

![Sievepad with a Sieve script, a test message and the outcome of running the script](assets/selected_359_image_002.webp)

### An editor that knows Sieve｜一位了解 Sieve 的編輯

 Writing Sieve in a plain text area gets tedious quickly, so Sievepad is built on [Monaco](https://microsoft.github.io/monaco-editor/), the editor component behind Visual Studio Code. The conveniences of a desktop editor come with it: syntax highlighting for scripts and for raw messages, multiple cursors, find and replace, a command palette, and a formatter that re-indents a script in one step.

 在純文字區域中編寫 Sieve 很快就會變得枯燥乏味，因此 Sievepad 是基於 Visual Studio Code 背後的編輯器元件 [Monaco](https://microsoft.github.io/monaco-editor/)構建。它具備桌面編輯器的許多便利功能：腳本和原始訊息的語法高亮顯示、多遊標、查找和替換、命令面板以及可一步完成腳本重新縮排的格式化程序。

 Autocomplete takes the position of the cursor into account. It suggests commands, tests and tagged arguments together with their documentation, offers extension names inside `require`, mailbox names inside `fileinto` and built-in functions inside Stalwart expressions, and completes the names of variables the script has set inside a `${...}` reference. Hovering over a command or a tagged argument explains what it does and which extension it needs.

 自動完成功能會考慮遊標位置。它會建議指令、測試和帶標籤的參數及其文檔，在`require`中提供擴展名，在`fileinto`中提供郵箱名，在 Stalwart 表達式中提供內建函數，並在`${...}`引用中自動補全腳本設定的變數名稱。將滑鼠懸停在命令或帶有標籤的參數上，即可查看其功能說明以及所需的副檔名。

![Autocomplete offering the mailbox names configured for the workspace](assets/selected_359_image_003.webp)

 The script is compiled while it is being typed. Errors are underlined at the line and column the compiler reports and listed under the editor, so a mistake shows up before the script ever runs. A frequent Sieve error, using an extension without declaring it in `require`, comes with a quick fix that adds the missing declaration.

 腳本會在輸入過程中進行編譯。編譯器會報告錯誤，並在錯誤所在的行和列處添加下劃線，同時在編輯器下方列出，因此錯誤會在腳本運行之前就被發現。 Sieve 中常見的錯誤是使用了未在`require`中聲明的擴展，這種錯誤可以透過添加缺少的聲明來快速修復。

![A compile error underlined in the editor, with the compiler message, the documentation for the tagged argument and a quick fix](assets/selected_359_image_004.webp)

### Running scripts against test messages｜針對測試訊息運行腳本

 A workspace keeps one or more test messages next to the script, each in its own tab. A message can be pasted in as raw text or dropped onto the page as an `.eml` file, and the envelope sender and recipients can be set independently of the headers. Pressing Run, or Ctrl+Enter \(Cmd+Enter on macOS\), executes the script against the selected message.

 工作區會在腳本旁邊保留一條或多條測試訊息，每個訊息都位於各自的標籤頁中。訊息可以以純文字形式貼上，也可以作為`.eml`檔案拖放到頁面上，信封的寄件者和收件人可以獨立於郵件頭進行設定。按下「執行」按鈕，或按Ctrl+Enter（macOS上為Cmd+Enter），即可針對選取的訊息執行腳本。

 The Result pane shows what happened. Its Actions tab lists every action in order, with the details that matter: the folder a message was filed into and the flags set on it, the address it was redirected to, the reason given for a rejection, or the vacation reply that would have been sent. The Messages tab shows each message the script produced, from the delivered message after `editheader` or `replace` changed it to the vacation replies and notifications it generated. The Variables tab lists global variables and the number of instructions the script executed. When a script fails at run time, the error is marked on the line where it occurred.

 「結果」窗格顯示了發生的情況。其「操作」標籤按順序列出了每個操作，並包含重要的詳細資訊：郵件歸檔到的資料夾及其設定的標記、郵件重定向到的地址、拒絕原因，以及原本要發送的休假回覆。 「郵件」標籤顯示腳本產生的每條郵件，從`editheader`或`replace`修改後的已發送郵件，到產生的休假回覆和通知。 「變數」標籤列出了全域變數以及腳本執行的指令數。如果腳本在執行時失敗，則會在發生錯誤的行上標記錯誤。

 Situations that are impractical to reproduce by email take a click. “Run again as a redelivery” runs the script a second time as if the same message had been delivered twice, which is exactly the case `duplicate` is meant to catch. Settings let a workspace stand in for the account a script will run under: its mailboxes and their special-use attributes, the spam and virus scores the server would assign, the current time, external lists, environment values and interpreter limits, all of which can also be edited as JSON.

 透過電子郵件難以重現的情況只需點擊一下即可。 「再次運行以重新投遞」會再次運行腳本，就好像同一封郵件已經投遞了兩次一樣，這正是`duplicate`旨在捕獲的情況。設定允許工作區代表腳本運行所使用的帳戶：包括其郵箱及其特殊用途屬性、伺服器分配的垃圾郵件和病毒評分、當前時間、外部清單、環境變數值和解釋器限制，所有這些都可以在JSON中進行編輯。

 Sievepad supports the same Sieve extensions as Stalwart, including Stalwart’s own `vnd.stalwart.expressions` and `vnd.stalwart.while`, together with the functions that user scripts can call on the server. Functions reserved for system scripts, such as DNS, HTTP and SQL lookups or LLM prompts, depend on services that exist only on the server and are not available.

 Sievepad 支援與 Stalwart 相同的 Sieve 擴展，包括 Stalwart 自帶的`vnd.stalwart.expressions`和`vnd.stalwart.while` ，以及使用者腳本可以在伺服器上呼叫的函數。而係統腳本專用的函數，例如DNS, HTTP和SQL查找或 LLM提示 ，則依賴於僅存在於伺服器上且不可用的服務。

### Includes, workspaces and sharing｜包括工作區和共享

 Larger filters are often split across several scripts. A workspace can hold any number of them, and `include` resolves each one by name, so a shared set of rules can be tested together with the scripts that pull it in. Workspaces can be duplicated, renamed, exported to a file and imported again, and the Examples menu opens ready-made workspaces for mailing lists, spam and virus tests, vacation replies, redirects and notifications, includes, and Stalwart’s expressions and loops.

 較大的過濾器通常會分佈在多個腳本中。一個工作區可以容納任意數量的過濾器， `include`會按名稱解析每個過濾器，因此可以同時測試一組共享規則以及呼叫這些規則的腳本。工作區可以複製、重新命名、匯出到檔案並重新匯入。 「範例」選單提供了現成的工作區範例，涵蓋郵件清單、垃圾郵件和病毒測試、假期自動回覆、重定向和通知、包含以及 Stalwart 的表達式和循環等。

 A workspace can also be shared as a link. The link carries the workspace, with or without its test messages, compressed into the URL fragment, the part of a URL that browsers never send to the web server. Creating a link uploads nothing, and opening one adds a new workspace to the recipient’s browser without touching the ones already there. That makes a link a convenient way to attach a reproducible example to a bug report, a forum post or a support ticket.

 工作區也可以透過連結共享。此連結會將工作區（包含或不包含測試訊息）壓縮到URL片段中，而URL片段是瀏覽器永遠不會傳送到 Web 伺服器的部分。建立連結不會上傳任何內容，開啟連結會在接收者的瀏覽器中新增一個新的工作區，而不會影響現有的工作區。因此，連結是一種便捷的方式，可以將可重現的範例附加到錯誤報告、論壇貼文或支援工單中。

## Getting started｜入門

 Sievepad needs nothing more than a browser:

 Sievepad只需要一個瀏覽器：

1. Open [sievepad.com](https://sievepad.com/). The first visit loads a short welcome tour, and the Examples menu has more to explore.
開啟 [sievepad.com](https://sievepad.com/) 。首次訪問會載入一個簡短的歡迎導覽，「範例」選單中還有更多內容可供探索。
2. Write or paste a script into the Script pane. Errors are underlined as the script is typed.
在「腳本」窗格中編寫或貼上腳本。輸入腳本時，錯誤會以以下劃線標示。
3. Paste a test message into the Message pane, or drop an `.eml` file onto the page, and fill in the envelope below the message if the script tests it.
將測試訊息貼到「訊息」窗格中，或將`.eml`檔案拖放到頁面上，如果腳本測試它，則填寫訊息下面的信封。
4. Press Run or Ctrl+Enter and read the outcome in the Result pane.
按下「執行」或 Ctrl+Enter 鍵，然後在「結果」窗格中查看結果。
5. Adjust the script or the message and run it again. When the script behaves as intended, Share turns the workspace into a link.
調整腳本或訊息，然後再次執行。當腳本按預期運行時，「共享」會將工作區轉換為連結。
The mailing list filter from earlier makes a good first exercise. The link below the script opens it together with the `Release-Notes` message, and Sievepad runs it straight away: the Actions tab reports that the message is kept in INBOX. Changing the character class to `[A-Za-z0-9-]` and pressing Ctrl+Enter files the message into `Lists/release-notes` instead.
 前面提到的郵件清單過濾器是一個很好的入門練習。腳本下方的連結會打開它以及`Release-Notes`訊息，Sievepad 會立即執行它：「操作」標籤顯示該訊息保存在INBOX中。將字元類別改為`[A-Za-z0-9-]`並按 Ctrl+Enter，訊息就會被歸檔到`Lists/release-notes`中。

```sieve
require ["fileinto", "mailbox", "variables", "regex"];

if header :regex "List-Id" "<([a-z0-9-]+)\\." {
    set :lower "list" "${1}";
    fileinto :create "Lists/${list}";
}
```

[Try this script in Sievepad](https://sievepad.com/#w=bVLBTuMwEP2VkcWBFXFwu2glTIUQQouQFg4U7aXuwUmmxcixi8dpEVH-HacJ2q1gTp6Z956fZ9yyLZOTjDldI5NsHrXd6RChsH4t4RZjNG4NFFMNK5YxKoPZRGJy0X5yam1c3_FNKPs84GtjAsJCsZWxaFz0imWgeqAt_NuQbHUwurBIQxpwjamzvFBOObOCZ9QVBpD7eur_MRT5XaVYOs-OF5q_C37Olyc_VIo8lVvlIAVhBGn9LnEVs4m0Zxy1k06xiwHyaQpkGVBHHNXp9KjtCQOwU451y4zVSKTXePDggBY1IXc-IvEtBjLe8SkX3BD3Tcyxtv8P5HfwtYTHgQXXPsJslKCr_kbK8U3XG4t56etL5Z68hIM7vqKUmzfFC5ZRwmIU5g89dAl_Bz8wzQUYguRHuXF6_0zsZWF2QM2_83I_vJ_f3UiYbZPmt45v0hgl3HuXweQM5riBqZj-AnEufwopBJyIFP1mv5rLYGfiM6w0xbSzojG2ItCuAg0Od7DyodYxtfJxITR8ybSQtus-AA)

[在 Sievepad 中嘗試此腳本](https://sievepad.com/#w=bVLBTuMwEP2VkcWBFXFwu2glTIUQQouQFg4U7aXuwUmmxcixi8dpEVH-HacJ2q1gTp6Z956fZ9yyLZOTjDldI5NsHrXd6RChsH4t4RZjNG4NFFMNK5YxKoPZRGJy0X5yam1c3_FNKPs84GtjAsJCsZWxaFz0imWgeqAt_NuQbHUwurBIQxpwjamzvFBOObOCZ9QVBpD7eur_MRT5XaVYOs-OF5q_C37Olyc_VIo8lVvlIAVhBGn9LnEVs4m0Zxy1k06xiwHyaQpkGVBHHNXp9KjtCQOwU451y4zVSKTXePDggBY1IXc-IvEtBjLe8SkX3BD3Tcyxtv8P5HfwtYTHgQXXPsJslKCr_kbK8U3XG4t56etL5Z68hIM7vqKUmzfFC5ZRwmIU5g89dAl_Bz8wzQUYguRHuXF6_0zsZWF2QM2_83I_vJ_f3UiYbZPmt45v0hgl3HuXweQM5riBqZj-AnEufwopBJyIFP1mv5rLYGfiM6w0xbSzojG2ItCuAg0Od7DyodYxtfJxITR8ybSQtus-AA)

## Sievepad in Stalwart｜Stalwart 篩墊

 Stalwart now links to Sievepad from its documentation and its WebUI. Examples in the Sieve documentation that run in Sievepad end with a “Try this script in Sievepad” link, which opens the example together with a test message that exercises it. In the WebUI, the Sieve script editor has a Debug button that opens the script in Sievepad.

 Stalwart 現在在其文件和 Web 使用者介面中都提供了指向 Sievepad 的連結。 Sieve 文件中可在 Sievepad 中運行的示例末尾會提供一個“在 Sievepad 中嘗試此腳本”的鏈接，點擊該鏈接即可打開示例並顯示一條測試信息。在 Web 使用者介面中，Sieve 腳本編輯器有一個「偵錯」按鈕，點擊即可在 Sievepad 中開啟腳本。

 Sievepad is open source, and its code lives in the [sieve-rs repository](https://github.com/stalwartlabs/sieve) next to the interpreter it runs. Bug reports and suggestions are welcome there.

 Sievepad 是開源的，其程式碼位於 [sieve-rs 程式碼庫](https://github.com/stalwartlabs/sieve)中，與它運行的解釋器位於同一目錄下。歡迎在那裡提交 bug 報告和建議。

**Tags:**

**標籤：**

- [sieve](https://stalw.art/blog/tags/sieve/)
[篩子](https://stalw.art/blog/tags/sieve/)
- [sievepad](https://stalw.art/blog/tags/sievepad/)
[篩墊](https://stalw.art/blog/tags/sievepad/)
- [debugging](https://stalw.art/blog/tags/debugging/)
[調試](https://stalw.art/blog/tags/debugging/)
- [webassembly](https://stalw.art/blog/tags/webassembly/)
[webassembly](https://stalw.art/blog/tags/webassembly/)
- [email](https://stalw.art/blog/tags/email/)
[電子郵件](https://stalw.art/blog/tags/email/)
How we use AI at Stalwart
 我們在 Stalwart 如何使用AI

 ---

 ⬆ 目錄　｜　⬅ 上一篇：Sieve filters are now available on Stalwart JMAP v0.2｜Stalwart JMAP v0.2現已推出篩網過濾器　｜　下一篇：SMTP Smuggling What it is and how Stalwart is protected｜SMTP走私：它的定義以及「堅韌」如何受到保護 ➡
