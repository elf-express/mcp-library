---
title: "設定雙重認證TOTP和 Google Authenticator"
title_original: "Configure 2FA TOTP & Google Authenticator"
source: https://docs.opnsense.org/manual/how-tos/two_factor.html
chapter: ["System","Setup guides"]
order: 103
lang: "zh-TW"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:32:31.958Z"
---

# 設定雙重認證TOTP和 Google Authenticator

本教學將向您展示如何使用 OPNsense 和 Google Authenticator 設定一次性密碼雙重認證。 OPNsense 的所有服務均可與此雙重認證解決方案搭配使用。

[圖](https://docs.opnsense.org/_images/two_factor_authentication.png)

注意事項

若要將此功能與任何基於時間的一次性密碼令牌一起使用，只需在步驟 3 中將種子輸入到對應欄位中，而無需建立新種子。種子必須採用 base32 格式。

## 步驟 1 - 新增的身份驗證伺服器

要新增TOTP伺服器，請前往“系統”‣“存取”‣“伺服器”，然後點擊右上角的**新增伺服器**。接下來，請如下填寫表單：

|   |   |   |
| --- | --- | --- |
| **描述性名稱** | TOTP伺服器 | *選擇伺服器名稱* |
| **類型** | 本地+基於時間的一次性密碼 | *選擇TOTP伺服器類型* |
| **令牌長度** | 6 | *Google Authenticator 為 6* |
| **時間視窗** | | *留空以使用 Google Authenticator* |
| **寬限期** | | *留空以使用 Google 驗證器* |

## 步驟 2 - 安裝 Google Authenticator

請前往您所用平台的應用程式商店，搜尋「Google Authenticator」。請依照適用於您裝置的正常安裝步驟進行安裝。

## 步驟 3 - 新增或修改用戶

在這個例子中，我們將建立一個新用戶，轉到“系統”‣“訪問”‣“用戶”，然後點擊右下角的加號。

輸入**使用者名稱**和**密碼**，並像填寫其他使用者資訊一樣填寫其他欄位。然後在**OTP種子**下選擇**產生新的（160位元）金鑰**。

完成後，請按**儲存**。

## 步驟 4 - 啟動此OTP種子的驗證器

若要啟動 Google Authenticator 上的新OTP種子，請先點選鉛筆圖示重新開啟您剛剛建立的使用者。

[圖](https://docs.opnsense.org/_images/OTP_seed.png)

現在會顯示QR程式碼：

[圖](https://docs.opnsense.org/_images/otp_qr_code.png)

警告

請務必妥善保管種子或QR代碼，因為這是計算代幣所需的唯一資訊。 **KEEP YOUR SEED/QR CODE SAFE ！**

現在打開您的 Google Authenticator 相容應用程序，選擇開始配置的選項，然後掃描QR代碼，或直接輸入種子。

對於 SailOTP，配置方式如下：

[圖](https://docs.opnsense.org/_images/sailotp_menu.jpg)

下拉開啟應用程式選單，然後選擇新增令牌的條目。

[圖](https://docs.opnsense.org/_images/sailotp_scan_qr.jpg)

下一步，您需要點擊螢幕掃描之前建立的QR碼。

[圖](https://docs.opnsense.org/_images/sailotp_scanresult.jpg)

掃描QR條碼後，將開啟一個新視圖，您可以在其中查看結果詳情。您可以使用此視圖檢查掃描結果產生的金鑰和OTP設定是否與您的設定相符。點選「新增」確認一切正常。

完成此步驟後，您將返回應用程式的主螢幕，並獲得有效期為 30 秒的令牌。

請注意，有很多應用程式可以產生令牌。一些比較知名的應用程式包括：

| 名稱 | 平台 | URL |
| --- | --- | --- |
| 免費一次性密碼 | 安卓、iOS | [https://freeotp.github.io/](https://freeotp.github.io/) |
| Google Authenticator | Android, iOS | [https://www.google.com/landing/2step/](https://www.google.com/landing/2step/) |

## 步驟 5 - 測試令牌

為了測試使用者身份驗證，OPNsense 提供了一個簡單的測試工具。請轉到“系統”‣“訪問”‣“測試工具”。

選擇您設定的身份驗證伺服器，然後輸入使用者名稱。然後輸入**\*令牌**+**密碼**，記住順序是令牌，然後是密碼**在同一欄位**。

注意事項

密碼欄位應用於輸入令牌和密碼，例如：**密碼：** 123456PASSWORD（使用預設設定時）。 OTP 驗證伺服器也可以配置為以相反的順序，如 PASSWORD123456。

點擊測試按鈕，如果一切順利，您應該會看到*成功通過身份驗證*。

[圖](https://docs.opnsense.org/_images/system_access_tester.png)

## 步驟 6 - 啟用身份驗證伺服器

預設情況下，系統會根據「本機資料庫」驗證使用者憑證。在 System ‣ Settings ‣ Administration 的 **Authentication** 部分中，您應該將其變更為新新增的驗證伺服器，以確保本機使用者在沒有 2FA 的情況下無法取得存取權限。

**注意：請確保您已測試過您的令牌！**

[圖](https://docs.opnsense.org/_images/auth_server.png)

## 步驟 7 - 使用令牌

要在您配置的任何應用程式/服務中使用該令牌，只需打開 Google Authenticator，並在常規密碼**之前**添加建立的令牌/密鑰即可。

警告

請記住，您需要在輸入密碼的**之前**或**之後**輸入令牌（取決於您的配置）！密碼欄位應同時輸入令牌和密碼，例如：**密碼：** 123456PASSWORD

代碼每 30 秒更新一次。範例程式碼：

[圖](https://docs.opnsense.org/_images/google_token_sample.png)