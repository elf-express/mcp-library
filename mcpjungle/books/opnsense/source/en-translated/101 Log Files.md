---
title: "Log Files"
source: "https://docs.opnsense.org/manual/logging_system.html"
chapter: ["System"]
order: 101
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:32:30.954Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Trust](<100 Trust.md>)　｜　[下一篇：Diagnostics ➡](<102 Diagnostics.md>)

# Log Files

> 章節：[System](<000 目錄.md#c-11>)

When troubleshooting problems with your firewall, it is very likely you have to check the logs available on your system. In the UI of OPNsense, the log files are generally grouped with the settings of the component they belong to. The log files can be found here:

|   |   |   |
| --- | --- | --- |
| **System Log** | System ‣ Log Files ‣ General | *Most of all system related events go here* |
| **Backend / config daemon** | System ‣ Log Files ‣ Backend | *Here you can find logs for config generation of API usage* |
| **Web GUI** | System ‣ Log Files ‣ Web GUI | *Lighttpd, the webserver of OPNsense itself, logs here* |
| **Firmware** | System ‣ Firmware ‣ Log File | *Updates from the packaging system go here* |
| **Gateways** | System ‣ Gateways ‣ Log File | *Lists Dpinger gateway tracking related log messages* |
| **Routing** | System ‣ Routes ‣ Log File | *Routing changes or interface events* |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Trust](<100 Trust.md>)　｜　[下一篇：Diagnostics ➡](<102 Diagnostics.md>)
