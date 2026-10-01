---
title: "ClamAV"
source: "https://docs.opnsense.org/manual/how-tos/clamav.html"
chapter: ["Community Plugins","Web"]
order: 167
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:04.924Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：c-icap](<166 c-icap.md>)　｜　[下一篇：nginx Basic Load Balancing｜nginx 基本負載平衡 ➡](<168 nginx 基本負載平衡.md>)

# ClamAV

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Web](<000 目錄.md#c-37>)

The ClamAV plugin can be used with other plugins, like c-icap and rspamd, to scan for viruses.

ClamAV 插件可以與其他插件（如 c-icap 和 rspamd）一起使用，以掃描病毒。

Warning

警告

Your machine needs at least 1.5 GB RAM. Otherwise the machine will run out of memory and crash because of out of memory kills. Using a machine with at least 2 GB RAM is recommended.

您的機器至少需要1.5 GB RAM 。否則，機器會因記憶體不足而崩潰。建議使用至少配備 2 個GB RAM的機器。

Warning

警告

There are some techniques to avoid detection and scanning using AV software and not every malware is known by AV products. Signature based AV software can decrease the risk of getting hit by a known malware but it does never guarantee that your computers don’t get infected. It is **important** to teach the users how to handle files from the internet and untrusted devices safely. Also plan a regular Backup of important files, make sure, that ACLs are used correctly and apply patches asap to keep the attack surface and damage as small as possible.

有一些技巧可以避免使用AV軟體進行偵測和掃描，而且並非所有惡意軟體都能被AV產品識別。基於特徵碼的AV軟體可以降低感染已知惡意軟體的風險，但並不能保證您的電腦完全不被感染。 **至關重要**的是，要教導使用者如何安全地處理來自網路和不受信任設備的文件。此外，還要製定定期備份重要文件的計劃，確保正確使用存取控制清單（ACL），並儘快應用修補程式，以盡可能縮小攻擊面並減少損失。

Note

筆記

To make ClamAV working, you need to download signatures. Please note that those files need to be fetched after a reboot again if they are stored on a ram disk.

要讓 ClamAV 正常運作，您需要下載簽署檔案。請注意，如果這些檔案儲存在記憶體盤上，則重新啟動後需要重新取得這些檔案。

## Installation｜安裝

First of all, you have to install the ClamAV plugin (os-clamav) from the plugins view.

首先，您需要從外掛程式視圖安裝 ClamAV 外掛程式 (os-clamav)。

![../../_images/menu_plugins.png](<../images/a11a0992-menu_plugins.png>)

After a page reload you will get a new menu entry under services for ClamAV. Select it and you will get to the following screen:

頁面刷新後，您會在「服務」選單下看到 ClamAV 的新選項。選擇它，您將進入以下介面：

![../../_images/clamav_settings.png](<../images/736df8b2-clamav_settings.png>)

## Configuration Options｜配置選項

Enable clamd service

啟用 clamd 服務

Selecting this checkbox enables clamd so you can use it to scan files.

選取此核取方塊即可啟用 clamd，以便您可以使用它來掃描檔案。

Enable freshclam service

啟用鮮蛤服務

Freshclam is a service to update your malware signatures. If you use ClamAV, it is recommended to update the signatures on a regular basis.

Freshclam 是用於更新惡意軟體特徵碼的服務。如果您使用 ClamAV，建議定期更新特徵碼。

Enable TCP Port

啟用TCP端口

This checkbox needs to be checked, if you want to use clamd over the network or for local services, which use a TCP connection.

如果您想透過網路或使用TCP連接的本機服務來使用 clamd，則需要選取此核取方塊。

Maximum number of threads running

運行線程的最大數量

Thread limit is used to avoid a denial of service of the daemon and your machine. Usually a number next or equal to the number of cores would be good.

設定線程限制是為了避免守護程序和您的機器出現拒絕服務的情況。通常來說，線程數設定為接近或等於核心數是一個不錯的選擇。

Maximum number of queued items

隊列項的最大數量

This is the maximum of files which can be in the queued for scanning. The reason is the same as for the threads.

這是掃描佇列中可以容納的最大檔案數。原因與線程數的限制相同。

Idle Timeout

空閒超時

The connection will be dropped if it is inactive for this amount of time. If the other socket endpoint is a machine, this value can be low but if you plan to use it for development reasons, you may set it to a higher value.

如果連線在此時間內處於非活動狀態，則會中斷連線。如果另一端是計算機，則此值可以設定得較低；但如果您打算將其用於開發目的，則可以將其設定為較高的值。

Max directory recursion

最大目錄遞迴

Limit the depth of the directory tree. In the worst case there is a loop which causes the scanner to run endlessly and this setting should prevent it.

限制目錄樹的深度。最壞情況下，會形成循環，導致掃描程式無限運行，此設定可以防止這種情況發生。

Follow directory symlinks

跟隨目錄符號鏈接

If this is checked, clamav will follow directory symlinks which may lead to a loop. If you want to check this, make sure the recursion limit is set to a useful value.

如果選取此項，ClamAV 將追蹤目錄符號鏈接，這可能會導致循環。如果要啟用此功能，請確保將遞歸限制設為一個合理的值。

Follow regular file symlinks

遵循常規文件符號鏈接

If this is checked, clamav will follow symlinks to regular files. This may expose information about the filesystem, the user should not have access to.

如果選取此項，ClamAV 將跟隨符號連結存取普通檔案。這可能會暴露檔案系統中使用者不應存取的資訊。

Disable cache

禁用快取

If you check this, the results are not cached. This is only useful in development environments as it slows down the response time.

如果勾選此項，則結果不會被快取。這僅在開發環境中有用，因為它會降低響應速度。

Scan portable executable

掃描可移植可執行文件

Check this box, if you want to scan PE files. If you are using PE-files (\*.exe, \*.dll etc.) files in your network, checking this box is recommended.

如果您想掃描PE文件，請選取此方塊。如果您在網路中使用PE檔案（*.exe、*.dll等），建議勾選此方塊。

Scan executable and linking format

掃描可執行檔和連結格式

Check this box, if you want to scan ELF-files. ELF is for example used on Linux based operating systems and on \*BSD.

如果要掃描ELF文件，請勾選此方塊ELF例如用於基於 Linux 的作業系統和 \* BSD 。

Detect broken executables

檢測損壞的可執行檔

This setting will mark an executable as broken if it does not match the spec. A executable may be broken because of a download issue or manipulation. In any case, there should not be any legit case to pass a broken executable.

如果可執行檔不符合規範，此設定會將其標記為損壞。可執行檔損壞可能是由於下載問題或被篡改造成的。無論如何，在任何情況下都不應該允許通過損壞的可執行檔。

Scan OLE2

掃描OLE2

If this is checked, OLE2 files (for example Microsoft Office files) will be analyzed. Such files should be analyzed as they may contain macros which have been used to download and install malware (usually ransomware).

如果選取此項，系統將分析OLE2文件（例如Microsoft Office文件）。此類文件需要進行分析，因為它們可能包含用於下載和安裝惡意軟體（通常是勒索軟體）的巨集。

OLE2 block macros

OLE2塊宏

Check this box, if documents containing macros should be blocked. If you don’t use macros and you don’t expect them from your business partners or friends, this setting is recommended.

如果要封鎖包含巨集的文檔，請選取此複選框。如果您不使用宏，也不希望您的業務夥伴或朋友使用宏，建議進行此設定。

Scan PDF files

掃描PDF文件

If this checkbox is checked, PDF files will be scanned. PDF files can carry other files or multimedia as well as javascript and fonts. Scanning PDF files is recommended.

如果選取此複選框，將掃描PDF 檔案。 PDF文件可以攜帶其他文件或多媒體以及javascript和字體。建議掃描PDF文件。

Scan SWF

掃描SWF

If you check this box, Flash files will be scanned. Flash is used to provide video players or interactive content. Nowadays it should have been replaced by HTML5.

如果選取此框，系統將掃描 Flash 檔案。 Flash 用於提供影片播放器或互動式內容。如今，它應該已被HTML5取代。

Scan XMLDOCS

掃描XMLDOCS

Scan XML Documents

掃描XML文檔

Scan HWP3

掃描HWP3

HWP seems to be a korean document format. If you don’t use them, it is better to block them in the proxy than scanning them. If you have them in use, you should scan them.

HWP似乎是韓國的文檔格式。如果您不使用這種格式的文件，最好在代理伺服器中封鎖它們，而不是掃描它們。如果您正在使用這種格式的文件，則應該掃描它們。

Decode mail files

解碼郵件文件

If you select this option, the sections of emails will be read and therefore it will be possible to scan email attachments. Mail attachments are important to scan as an attached file may contain malware. For example, some malware campaigns used a JScript file which has been packed in a ZIP file which was attached to an email.

選擇此選項後，系統將讀取電子郵件正文，從而可以掃描電子郵件附件。掃描郵件附件非常重要，因為附件可能包含惡意軟體。例如，某些惡意軟體活動會使用打包在ZIP檔案中的 JScript 檔案作為電子郵件附件。

Scan HTML

掃描HTML

Scans HTML files which may have dangerous embedded JavaScript.

掃描可能包含危險嵌入式 JavaScript 的HTML檔案。

Scan archives

掃描檔案

Scan files inside archives. This is very important as archives can contain malware. Please note that archive nesting is used to bypass scans, so scanners detect such archives as dangerous at a specific recursion level. Also keep in mind that zip bombs may be possible to DoS a scanner.

掃描壓縮包內的檔案。這一點非常重要，因為壓縮包可能包含惡意軟體。請注意，壓縮包嵌套可以繞過掃描，因此掃描器會在特定的遞歸層級將此類壓縮包偵測為危險檔案。此外，也要注意，壓縮包炸彈可能會對掃描器造成拒絕服務攻擊 (DoS)。

Block encrypted archive

區塊加密存檔

Encrypted archives are usually used to transfer files encrypted which don’t support encryption on their own or the sender is not aware how to encrypt those files. A tool like 7z can derive a key from a password given by the creator of the file, which will be used to encrypt the compressed data. The ClamAV cannot scan this data as it is missing the key/password. Some malware authors used encrypted archives to avoid scanning and told the victim in the email text how to unpack it.

加密壓縮包通常用於傳輸本身不支援加密的文件，或者發送者不知道如何加密這些文件的文件。像 7z 這樣的工具可以根據檔案建立者提供的密碼產生金鑰，該金鑰將用於加密壓縮資料。由於缺少金鑰/密碼，ClamAV 無法掃描此類資料。一些惡意軟體作者使用加密壓縮套件來規避掃描，並在電子郵件正文中告知受害者如何解壓縮。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：c-icap](<166 c-icap.md>)　｜　[下一篇：nginx Basic Load Balancing｜nginx 基本負載平衡 ➡](<168 nginx 基本負載平衡.md>)
