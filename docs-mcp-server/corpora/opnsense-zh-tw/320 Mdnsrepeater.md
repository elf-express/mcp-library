---
title: "Mdnsrepeater"
source: "https://docs.opnsense.org/development/api/plugins/mdnsrepeater.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 320
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:24.362Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：馬爾特雷爾](<319 馬爾特雷爾.md>)　｜　[下一篇：穆尼諾德 ➡](<321 穆尼諾德.md>)

# Mdnsrepeater

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*服務（ServiceController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `POST` | mdnsrepeater | 服務 | 重新設定 | |
| `POST` | mdnsrepeater | 服務 | 重啟 | |
| `POST` | mdnsrepeater | 服務 | 開始 | |
| `GET` | mdnsrepeater | 服務 | 狀態 | |
| `POST` | mdnsrepeater | 服務 | 停止 | |

*資源（SettingsController.php）*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | mdnsrepeater | 設定 | 取得 | |
| `POST` | mdnsrepeater | 設定 | 設定 | |
|  |  |  |  |  |
| `<<uses>>` | | | | *模型* [MDNSRepeater.xml](https://github.com/opnsense/plugins/blob/master/net/mdns-repeater/src/opnsense/mvc/app/models/OPNsense/MDNSRepeater/MDNSRepeater.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：馬爾特雷爾](<319 馬爾特雷爾.md>)　｜　[下一篇：穆尼諾德 ➡](<321 穆尼諾德.md>)
