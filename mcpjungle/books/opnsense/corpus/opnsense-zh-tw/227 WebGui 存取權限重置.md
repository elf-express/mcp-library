---
title: "WebGui 存取權限重置"
title_original: "WebGui access reset"
source: https://docs.opnsense.org/troubleshooting/webgui.html
chapter: ["Troubleshooting","Topics"]
order: 227
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:33:35.333Z"
---


# WebGui 存取權限重置


如果 Web 管理介面憑證因某種原因失效，您可以使用控制台選單重新配置存取權限。從選單中選擇`Set interface IP address` （選項 2），重新配置接口，提供地址配置後，您可以（暫時）切換回`HTTP` ，或在下一步生成新的自簽名證書。

如果在設定防鎖定策略或變更介面後出現問題，也可以在最後一步（「**恢復 web GUI存取預設值？**」）重設預設值。

提示

直接透過控制台或 shell 登入後，您還可以使用以下命令產生新的自簽名憑證並重新啟動 Web UI：

`configctl webgui restart renew`

---

