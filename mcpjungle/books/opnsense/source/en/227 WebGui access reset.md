---
title: "WebGui access reset"
source: "https://docs.opnsense.org/troubleshooting/webgui.html"
chapter: ["Troubleshooting","Topics"]
order: 227
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:35.333Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Restore Configuration via Console](<226 Restore Configuration via Console.md>)　｜　[下一篇：Boot ➡](<228 Boot.md>)

# WebGui access reset

> 章節：[Troubleshooting](<000 目錄.md#c-50>) › [Topics](<000 目錄.md#c-51>)

If for some reason the webgui certificate is broken, you can reconfigure access using the console menu. Select `Set interface IP address` (option 2) from the menu, reconfigure an interface, after providing the address configuration you can either (temporary) switch back to `HTTP` or in the next step generate a new self-signed certificate.

It is also possible to reset the defaults in the final step (“**Restore web GUI access defaults?**”), in case something went wrong while setting up anti lockout policies or after changing interfaces.

Tip

When logged in directly via a console or shell, you can also use the following command to generate a new self-signed certificate and restart the web ui:

`configctl webgui restart renew`

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Restore Configuration via Console](<226 Restore Configuration via Console.md>)　｜　[下一篇：Boot ➡](<228 Boot.md>)
