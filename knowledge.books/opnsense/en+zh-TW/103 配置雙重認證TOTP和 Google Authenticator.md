---
title: "Configure 2FA TOTP & Google Authenticator｜配置雙重認證TOTP和 Google Authenticator"
title_original: "Configure 2FA TOTP & Google Authenticator"
source: "https://docs.opnsense.org/manual/how-tos/two_factor.html"
chapter: ["System","Setup guides"]
order: 103
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:31.958Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Diagnostics｜診斷](<102 診斷.md>)　｜　[下一篇：Setup Self-Signed Certificate Chains｜設定自簽名憑證鏈 ➡](<104 設定自簽名憑證鏈.md>)

# Configure 2FA TOTP & Google Authenticator｜配置雙重認證TOTP和 Google Authenticator

> 章節：[System](<000 目錄.md#c-11>) › [Setup guides](<000 目錄.md#c-18>)

This how-to will show you how to setup a One-time Password 2 Factor Authentication using OPNsense and Google’s Authenticator. All services of OPNsense can be used with this 2FA solution.

本教學將向您展示如何使用 OPNsense 和 Google Authenticator 設定一次性密碼雙重認證。 OPNsense 的所有服務均可與此雙重認證解決方案搭配使用。

[![../../_images/two_factor_authentication.png](<../images/8614e4c5-two_factor_authentication.png>)](https://docs.opnsense.org/_images/two_factor_authentication.png)

Note

注意事項

To use the same feature with any time based one-time password token just enter the seed into the field in step 3 instead of creating a new seed. The seed needs to be in base32 format.

若要將此功能與任何基於時間的一次性密碼令牌一起使用，只需在步驟 3 中將種子輸入到對應欄位中，而無需建立新種子。種子必須採用 base32 格式。

## Step 1 - Add New Authentication Server｜步驟 1 - 新增的身份驗證伺服器

To add a TOTP server go to System ‣ Access ‣ Servers and press **Add server** in the top right corner. Then fill in the form as follows:

要新增TOTP伺服器，請前往“系統”‣“存取”‣“伺服器”，然後點擊右上角的**新增伺服器**。接下來，請如下填寫表單：

|   |   |   |
| --- | --- | --- |
| **Descriptive name**<br>**描述性名稱** | TOTP Server<br>TOTP伺服器 | *Choose a server name*<br>*選擇伺服器名稱* |
| **Type**<br>**類型** | Local+Timebased One Time Password<br>本地+基於時間的一次性密碼 | *Select the TOTP server Type*<br>*選擇TOTP伺服器類型* |
| **Token length**<br>**令牌長度** | 6 | *6 for Google Authenticator*<br>*Google Authenticator 為 6* |
| **Time window**<br>**時間視窗** |  | *Leave Empty for Google Authenticator*<br>*留空以使用 Google Authenticator* |
| **Grace period**<br>**寬限期** |  | *Leave Empty for Google Authenticator*<br>*留空以使用 Google 驗證器* |

## Step 2 - Install Google Authenticator｜步驟 2 - 安裝 Google Authenticator

Go to the App Store of your platform and search for Google Authenticator. Install using the normal procedure for your device.

請前往您所用平台的應用程式商店，搜尋「Google Authenticator」。請依照適用於您裝置的正常安裝步驟進行安裝。

## Step 3 - Add or modify user｜步驟 3 - 新增或修改用戶

For this example we will create a new user, go to System ‣ Access ‣ Users and click on the plus sign in the lower right corner.

在這個例子中，我們將建立一個新用戶，轉到“系統”‣“訪問”‣“用戶”，然後點擊右下角的加號。

Enter a **Username** and **Password** and fill in the other fields just as you would do for any other user. Then select the **Generate new (160bit) secret** under **OTP seed**.

輸入**使用者名稱**和**密碼**，並像填寫其他使用者資訊一樣填寫其他欄位。然後在**OTP種子**下選擇**產生新的（160位元）金鑰**。

When done press **Save**.

完成後，請按**儲存**。

## Step 4 - Activate Authenticator for this OTP seed｜步驟 4 - 啟動此OTP種子的驗證器

To activate your new OTP seed on the Google Authenticator, first reopen the user you just created by clicking on the pencil icon.

若要啟動 Google Authenticator 上的新OTP種子，請先點選鉛筆圖示重新開啟您剛剛建立的使用者。

[![../../_images/OTP_seed.png](<../images/831dcf85-OTP_seed.png>)](https://docs.opnsense.org/_images/OTP_seed.png)

Now it will show a QR code:

現在會顯示QR程式碼：

[![../../_images/otp_qr_code.png](<../images/f4fd79a3-otp_qr_code.png>)](https://docs.opnsense.org/_images/otp_qr_code.png)

Warning

警告

Be very careful with the seed or QR code as this is the only thing you need to calculate the token. **KEEP YOUR SEED/QR CODE SAFE !**

請務必妥善保管種子或QR代碼，因為這是計算代幣所需的唯一資訊。 **KEEP YOUR SEED/QR CODE SAFE ！**

Now open your Google Authenticator compatible application and select the option to start the configuration and then scan the QR code or alternatively enter the seed directly.

現在打開您的 Google Authenticator 相容應用程序，選擇開始配置的選項，然後掃描QR代碼，或直接輸入種子。

In case of SailOTP the configuration works like this:

對於 SailOTP，配置方式如下：

[![../../_images/sailotp_menu.jpg](<../images/2201289e-sailotp_menu.jpg>)](https://docs.opnsense.org/_images/sailotp_menu.jpg)

Pull down to open the application menu and choose the entry to add a new Token.

下拉開啟應用程式選單，然後選擇新增令牌的條目。

[![../../_images/sailotp_scan_qr.jpg](<../images/9835d174-sailotp_scan_qr.jpg>)](https://docs.opnsense.org/_images/sailotp_scan_qr.jpg)

In the next step, you have to scan the previously created QR code by clicking on the screen.

下一步，您需要點擊螢幕掃描之前建立的QR碼。

[![../../_images/sailotp_scanresult.jpg](<../images/26644d39-sailotp_scanresult.jpg>)](https://docs.opnsense.org/_images/sailotp_scanresult.jpg)

When the QR code is scanned, a new view will open where you can see the details of the result. This view can be used to check if the generated key and OTP settings of the scan results do match your settings. Confirm if everything is ok by clicking “Add”（添加）.

掃描QR條碼後，將開啟一個新視圖，您可以在其中查看結果詳情。您可以使用此視圖檢查產生的金鑰和OTP設定是否與您的設定相符。點選“Add”（添加）確認一切正常。

After this step, you will be back on the home screen of the app and will get a Token for 30 Seconds.

完成此步驟後，您將返回應用程式的主螢幕，並獲得有效期為 30 秒的令牌。

Please note that there are many apps to generate the token. Some well known are:

請注意，有很多應用程式可以產生令牌。一些比較知名的應用程式包括：

| Name<br>名稱 | Platform<br>平台 | URL |
| --- | --- | --- |
| FreeOTP<br>免費一次性密碼 | Android, iOS<br>安卓、iOS | [https://freeotp.github.io/](https://freeotp.github.io/)<br>[https://freeotp.github.io/](https://freeotp.github.io/) |
| Google Authenticator | Android, iOS | [https://www.google.com/landing/2step/](https://www.google.com/landing/2step/)<br>[https://www.google.com/landing/2step/](https://www.google.com/landing/2step/) |

## Step 5 - Test the token｜步驟 5 - 測試令牌

For testing the user authentication, OPNsense offers a simple tester. Go to System ‣ Access ‣ Tester

為了測試使用者身份驗證，OPNsense 提供了一個簡單的測試工具。請轉到“系統”‣“訪問”‣“測試工具”。

Select the Authentication server you have configured, and enter the user name. Then enter the **\*token** + **password**, remember the order is token and then password **in the same field**.

選擇您設定的身份驗證伺服器，然後輸入使用者名稱。然後輸入**\*令牌**+**密碼**，記住順序是令牌，然後是密碼**在同一欄位**。

Note

注意事項

Password field should be used to enter both token and your password, like: **Password:** 123456PASSWORD when the default configuration is used. The OTP authentication server can also be configured to have it in the reverse order like PASSWORD123456.

密碼欄位應用於輸入令牌和密碼，例如：**密碼：** 123456PASSWORD（使用預設設定時）。 OTP 身份验证服务器也可以配置为以相反的顺序，如 PASSWORD123456。

Hit the test button and if all goes well you should see *successfully authenticated*.

點擊測試按鈕，如果一切順利，您應該會看到*成功通過身份驗證*。

[![../../_images/system_access_tester.png](<../images/acf16400-system_access_tester.png>)](https://docs.opnsense.org/_images/system_access_tester.png)

## Step 6 - Enable authentication server｜步驟 6 - 啟用身份驗證伺服器

Per default the system validates user credentials against the “Local Database”（本地資料庫）. In System ‣ Settings ‣ Administration, section **Authentication** you should change this to your newly added authentication server to make sure no local user can gain access without 2FA.

默认情况下，系统根据 “Local Database”（本地資料庫） 验证用户凭据。在 System ‣ Settings ‣ Administration 的 **Authentication** 部分中，您應該將其變更為新新增的驗證伺服器，以確保本機使用者在沒有 2FA 的情況下無法取得存取權限。

**Note: Make sure you’ve tested your token!**

**注意：請確保您已測試過您的令牌！**

[![../../_images/auth_server.png](<../images/553d6650-auth_server.png>)](https://docs.opnsense.org/_images/auth_server.png)

## Step 7 - Using the token｜步驟 7 - 使用令牌

To use the token in any application/service that you have configured, just open the Google Authenticator and add the created token/key **before** your regular password.

要在您配置的任何應用程式/服務中使用該令牌，只需打開 Google Authenticator，並在常規密碼**之前**添加建立的令牌/密鑰即可。

Warning

警告

Remember, you need to enter the token **before** or **after** you password (depending on your configuration)! And the password field should be used to enter both token and your password, like: **Password:** 123456PASSWORD

請記住，您需要在輸入密碼的**之前**或**之後**輸入令牌（取決於您的配置）！密碼欄位應同時輸入令牌和密碼，例如：**密碼：** 123456PASSWORD

The code will change every 30 seconds. Sample code:

代碼每 30 秒更新一次。範例程式碼：

[![../../_images/google_token_sample.png](<../images/0fd40a08-google_token_sample.png>)](https://docs.opnsense.org/_images/google_token_sample.png)

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Diagnostics｜診斷](<102 診斷.md>)　｜　[下一篇：Setup Self-Signed Certificate Chains｜設定自簽名憑證鏈 ➡](<104 設定自簽名憑證鏈.md>)
