---
title: "OpenID 連接"
title_original: "OpenID Connect"
source: "https://docs.opnsense.org/vendor/deciso/oidc.html"
chapter: ["Business Edition"]
order: 50
lang: "zh-TW"
translated_by: "gtx"
captured: "2026-09-26T11:32:05.228Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：網路應用防火牆](<49 網路應用防火牆.md>)　｜　[下一篇：使用者入口網站 ➡](<51 使用者入口網站.md>)

# OpenID 連接

> 章節：[Business Edition](<000 目錄.md#c-4>)

OpenID Connect (OIDC) 是建構在 OAuth 2.0 協定之上的身分層，允許應用程式驗證使用者身分並以安全的方式取得基本設定檔資訊。 OAuth 2.0 主要用於授權（授予對資源的存取權限），而 OIDC 透過引入 ID 令牌來新增身份驗證，令牌是有關使用者的數位簽署資訊。這使得應用程式（稱為「依賴方」）可以確認使用者是誰，而無需直接管理密碼。 OIDC廣泛應用於單一登入（SSO）場景，使用戶能夠使用Google、微軟或企業系統等可信任身分提供者登錄，同時保持流程標準化和安全。

商業版包括對系統某些部分的 OpenID Connect 支持，這些將在本文檔中進一步詳細介紹

## 基本工作流程

在 OpenID Connect (OIDC) 驗證流程中，應用程式（用戶端）將使用者重新導向至身分提供者 (IdP)，使用者在其中登入。身份驗證成功後，IdP 向客戶端發回授權代碼（或令牌），用戶端將其交換為 ID 令牌（以及可選的存取/刷新令牌）。 IDToken包含使用者的身份訊息，允許客戶端驗證使用者是誰。

多個身分提供者確實支援OIDC，即為依賴方（在本例中為 OPNsense）提供的信息，通常包含以下項目：

-   客戶端ID（標識該客戶端的 ID）
    
-   該客戶應該使用的秘密
    
-   用於定位 `.well-known/openid-configuration` 檔案的 Uri
    
-   使用的身份驗證方法（例如`POST`）
    

通常提供者也需要配置返迴路徑，通常這些稱為*「重定向URI」*，當我們的位置不在清單中時，不允許將令牌返回到請求的路徑。

## 新增 OpenID 供應商

OpenID 提供者可以透過 System ‣ Access ‣ OpenID Connect 進行配置，下表描述了所有可用選項及其用途。服務類型決定哪些服務可用。

**本地設定**

在 OPNsense 上設定服務類型和識別。

| **欄位名稱**|**目的** |
| --- | --- |
|申請代碼 |我們端用於識別此提供者的應用程式代碼，此文字將在我們端用作 oidc 端點的一部分。需要唯一才能識別正確的 IdP。 |
|服務 |該提供者可以使用哪種類型的服務，請參閱服務部分 |
|豐富的日誌（調試）|記錄詳細的審核訊息 |
|描述 |該提供者的描述 |

**OpenID Connect 提供者**

這部分配置包含

| **欄位名稱**|**目的** |
| --- | --- |
|供應商URL | OpenID 連線供應商的位置，例如[https://id.provider.com](https://id.provider.com/)，路徑後綴為「.well-known/openid-configuration」即可找到此OP的設定 |
|客戶端ID | RP（請求方）在OP（OpenID 提供者）的客戶端標識符。 |
|客戶秘密 | RP（請求方）在OP（OpenID 提供者）的客戶端金鑰。 |
|認證方式 |所使用的驗證方法，POST, BASIC 或使用提供者提供的方法。 |
|附加範圍 |選擇要要求的其他範圍，預設僅請求 oidc。 |

**本地資料庫**

本節提供如何在本地處理經過驗證的使用者的控制，與所使用的服務類型無關。

| **欄位名稱**|**目的** |
| --- | --- |
|使用者識別欄位 |要使用的 UserInfo 回應中的欄位名稱。 |
|建立使用者 |成功登入後，建立或更新使用者（包括選擇的群組）|
|群組屬性| UserInfo 物件中的屬性名稱，包含該使用者所屬的群組。 |
|預設群組 |在本機建立時，請務必指派這些群組。 |
|限制群組 |在本機建立時，僅允許透過提供者提供這些群組。 |

## 服務

在 OPNsense 上使用 OIDC 時，此服務決定防火牆上使用的端點來啟動登入序列。由於每個身份驗證流程都可以使用自己的實現，因此我們需要一些墊腳石來引導瀏覽器到正確的登入提供者。

由於這些端點通常也是 openid 提供者的返迴路徑，因此我們將描述每種服務類型的相關路徑。

### WebGUI / 管理

選擇 `WebGui / Admin` 服務時，OPNsense 登入畫面將在使用者/密碼欄位下方顯示選項。

這些選項不需要在認證伺服器下的 System ‣ Settings ‣ Administration 頁面中選擇，因為只有一個 WebGui 可供選擇。

以下端點可用於此服務類型：

|烏裡 |目的|
| --- | --- |
| /api/oidc/rp/login/<<appcode>> |登錄，找到提供者 uri 並啟動流程 |
| /api/oidc/rp/finalize/<<appcode>> |登入後，openid 提供者轉送到此處，並使用適當的權限集建立會話。 |

### 強制門戶

需要在區域配置內的身份驗證選項中選擇強制門戶提供者，因為它們可以在不同的區域中使用。

以下端點可用於此服務類型：

|烏裡 |目的|
| --- | --- |
| /api/captiveportal/access\_oidc/login/\[<<appcode>>\] |登錄，當該區域只有一個 oidc 提供者時，appcode 可以省略。在這種情況下，控制器找到應用程式程式碼並從OP請求正確的最終路徑。 |
| /api/captiveportal/access\_oidc/finalize/<<appcode>> |登入後，openid 提供者轉送到此處並建立強制入口網站會話。 |
| /api/captiveportal/access\_oidc/logout/\[<<appcode>>\] |結束強制入口網站會話 |

將強制入口網站區域配置為使用OIDC提供者後，我們還需要部署自訂範本。下面的 html 範例解釋了使用 OIDC 時要實現的相關部分。

```
....
<script>
    $( document ).ready(function() {
        let addr = new URL(window.location);
        /* the status parameter is used to easily determine which action is requested  */
        switch (addr.searchParams.get('status')) {
            case null:
                /* When not set, request client status via the standard controller */
                $.ajax({url: "/api/captiveportal/access/status/", dataType:"json"}).done(function(data) {
                    if (data['clientState'] == 'AUTHORIZED') {
                        /* already logged in */
                        $(".status-logged-in").show();
                    } else {
                        /* unhide "loader" text and redirect to trampoline */
                        $(".status-empty").show();
                        window.location = '/api/captiveportal/access_oidc/login/';
                    }
                });
                break;
            case 'logged-in':
            case 'logged-out':
            case 'login-failed':
                /* show status <div/> */
                $(".status-" + addr.searchParams.get('status')).show();
                break;
        }
    });
</script>
....
<section class="content-row">
    <article class="wrapper">
        <div class="content status-logged-in" style="display: none;">
            <h1>Session logged in </h1><br/>
            <h1><a href="/api/captiveportal/access_oidc/logout/">Logout</a></h1>
        </div>
        <div class="content status-logged-out" style="display: none;">
            <h1>Session logged out </h1><br/>
            <h1><a href="/api/captiveportal/access_oidc/login/">Login</a></h1>
        </div>
        <div class="content status-login-failed" style="display: none;">
            <h1>Login failed </h1>
        </div>
        <div class="content status-empty" style="display: none;">
            <h1>Redirecting to login...</h1>
        </div>
    </article>
</section>
....
```

:[`Download full example`](https://docs.opnsense.org/_downloads/29602629f868898a9c07e34f66d5524d/cp_template.zip)

完整的範例 zip 是一個易於使用的範本包，可以透過範本標籤中的 Services ‣ Captive Portal ‣ Administration 上傳。

注意事項

當為強制門戶區域提供單一OIDC提供者時，我們可以通用模板，因為不需要提供應用程式程式碼。如果需要多個選項可用，則需要建立自訂模板，以便在尚不存在會話時為使用者提供選項之間的選擇。 （例如：code:\` window.location\`不能用於轉發給提供者）

由於使用者需要能夠存取 oidc 提供者（通常不在同一網路中），因此應排除該 IP 位址（或位址群組）進入入口網站。在大多數情況下，這些不僅僅是靜態位址，在這種情況下，您需要使用自訂防火牆規則來允許流量到達提供者（例如 Microsoft Entra ID）。 [強制入口網站文件](<200 強制入口網站和 GuestNET.md#captive-portal-firewall-rules>) 說明如何為這些情況定義自訂規則。

提示

當您的提供者託管在相當動態的環境中（例如 Microsoft Entra ID）時，您可能會想要將關聯的網域放入允許清單中。正如 [IPset](<194 Dnsmasq DNS & DHCP.md#firewall-alias-ipset>) 功能文件中所述，隨附的 Dnsmasq 服務可以提供很大幫助。

### OPNWAF（Web應用防火牆/反向代理）

當在虛擬伺服器配置中選擇「OIDC Provider」時，反向代理定義了一個專門供 oidc 使用的端點：

|烏裡 |目的|
| --- | --- |
| /oidc/回呼 |預先定義的虛榮 url 不能在應用程式中用作位置。它可以透過虛擬伺服器中的`OIDC Redirect URI`設定進行選擇性更改。 |

## 有用的連結

以下是如何在不同提供者設定 OpenID 的有用連結集合：

-   微軟 Entra ID ([https://learn.microsoft.com/en-us/azure/app-service/configure-authentication-provider-openid-connect](https://learn.microsoft.com/en-us/azure/app-service/configure-authentication-provider-openid-connect))
    
-   正品（[https://docs.goauthentik.io/add-secure-apps/providers/oauth2/](https://docs.goauthentik.io/add-secure-apps/providers/oauth2/)）
    
-   跳雲 ([https://jumpcloud.com/support/sso-with-oidc](https://jumpcloud.com/support/sso-with-oidc))

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：網路應用防火牆](<49 網路應用防火牆.md>)　｜　[下一篇：使用者入口網站 ➡](<51 使用者入口網站.md>)
