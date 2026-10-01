---
title: "Mdnsrepeater"
source: "https://docs.opnsense.org/development/api/plugins/mdnsrepeater.html"
chapter: ["Development Manual","API Reference","Plugins API"]
order: 320
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:34:24.362Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Maltrail｜馬爾特雷爾](<319 馬爾特雷爾.md>)　｜　[下一篇：Muninnode｜穆尼諾德 ➡](<321 穆尼諾德.md>)

# Mdnsrepeater

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Plugins API](<000 目錄.md#c-60>)

*Service (ServiceController.php)*

*服務（ServiceController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `POST` | mdnsrepeater | service<br>服務 | reconfigure<br>重新設定 |  |
| `POST` | mdnsrepeater | service<br>服務 | restart<br>重啟 |  |
| `POST` | mdnsrepeater | service<br>服務 | start<br>開始 |  |
| `GET` | mdnsrepeater | service<br>服務 | status<br>狀態 |  |
| `POST` | mdnsrepeater | service<br>服務 | stop<br>停止 |  |

*Resources (SettingsController.php)*

*資源（SettingsController.php）*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | mdnsrepeater | settings<br>設定 | get<br>取得 |  |
| `POST` | mdnsrepeater | settings<br>設定 | set<br>設定 |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [MDNSRepeater.xml](https://github.com/opnsense/plugins/blob/master/net/mdns-repeater/src/opnsense/mvc/app/models/OPNsense/MDNSRepeater/MDNSRepeater.xml)<br>*模型* [MDNSRepeater.xml](https://github.com/opnsense/plugins/blob/master/net/mdns-repeater/src/opnsense/mvc/app/models/OPNsense/MDNSRepeater/MDNSRepeater.xml) |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Maltrail｜馬爾特雷爾](<319 馬爾特雷爾.md>)　｜　[下一篇：Muninnode｜穆尼諾德 ➡](<321 穆尼諾德.md>)
