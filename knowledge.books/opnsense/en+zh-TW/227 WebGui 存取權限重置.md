---
title: "WebGui access reset｜WebGui 存取權限重置"
title_original: "WebGui access reset"
source: "https://docs.opnsense.org/troubleshooting/webgui.html"
chapter: ["Troubleshooting","Topics"]
order: 227
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:33:35.333Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Restore Configuration via Console｜透過控制台恢復配置](<226 透過控制台恢復配置.md>)　｜　[下一篇：Boot｜啟動 ➡](<228 啟動.md>)

# WebGui access reset｜WebGui 存取權限重置

> 章節：[Troubleshooting](<000 目錄.md#c-50>) › [Topics](<000 目錄.md#c-51>)

If for some reason the webgui certificate is broken, you can reconfigure access using the console menu. Select `Set interface IP address` (option 2) from the menu, reconfigure an interface, after providing the address configuration you can either (temporary) switch back to `HTTP` or in the next step generate a new self-signed certificate.

如果 Web 管理介面憑證因某些原因失效，您可以使用控制台選單重新配置存取權限。從選單中選擇`Set interface IP address` （選項 2），重新配置接口，提供地址配置後，您可以（暫時）切換回`HTTP` ，或在下一步生成新的自簽名證書。

It is also possible to reset the defaults in the final step (“**Restore web GUI access defaults?**”), in case something went wrong while setting up anti lockout policies or after changing interfaces.

如果在設定防鎖定策略或變更介面後出現問題，也可以在最後一步（「**恢復 web GUI存取預設值？**」）重設預設值。

Tip

提示

When logged in directly via a console or shell, you can also use the following command to generate a new self-signed certificate and restart the web ui:

直接透過控制台或 shell 登入後，您還可以使用以下命令產生新的自簽名憑證並重新啟動 Web UI：

`configctl webgui restart renew`

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Restore Configuration via Console｜透過控制台恢復配置](<226 透過控制台恢復配置.md>)　｜　[下一篇：Boot｜啟動 ➡](<228 啟動.md>)
