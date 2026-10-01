---
title: "OPNBECore"
source: "https://docs.opnsense.org/development/api/be/OPNBEcore.html"
chapter: ["Development Manual","API Reference","Business edition API"]
order: 364
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:34:44.664Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：零層](<363 零層.md>)　｜　[下一篇：範例 ➡](<365 範例.md>)

# OPNBECore

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Business edition API](<000 目錄.md#c-61>)

*資源（SyncController.php）– 繼承自：ApiControllerBase*

|方法|模組|控制器|指令 |參數|
| --- | --- | --- | --- | --- |
| `GET` | opncentral | 同步 | 服務清單 | |
| `GET` | opncentral | 同步 | 列出課程 | |
| `GET` | opncentral | 同步 | 指標 | |
| `GET` | opncentral | 同步 | 讀取設定 | $paths |
| `POST` | opncentral | 同步 | 重新配置 | |
| `POST` | opncentral | 同步 | 重啟服務 | |

## 同步API說明

`sync` API用於並行處理來自 OPNcentral 控制面板的中心操作。正如 OPNcentral 文件中所述，配置功能能夠偵測其可能分發的模組的變更。為此， `listClasses` API操作在此發揮重要作用。

### 列表類

清單類別端點提供了目標主機所理解的不同配置項目以及這些配置項目如何與服務關聯的詳細資訊。它也是比較配置項的關鍵元件。

```
{
  "classes": [
    {
      "description": "Aliases",
      "help": "Synchronize the aliases over to the other HA host.",
      "section": "OPNsense.Firewall.Alias",
      "services": [
        "pf"
      ],
      "md5": "942d6358fb4f17abed7cf4f5de6c5b24",
      "id": "aliases"
    },
  "runtime": 0.07380509376525879
}
```

當目標防火牆與中心節點完全一致時， `md5`值將會相符。為了對同步操作進行特定覆蓋，可以發送 JSON 編碼的 base64 結構作為`metadata` POST 參數（在線文檔中未提供，僅限高級用法）。

### 讀取配置

此端點負責提供對配置各個部分的訪問，主要用於檢索配置的各個部分。

下面提供了此端點的使用範例。

```js
import json
import requests
auth = {
  "key":"3RhWOno+HwvtmT406I6zw8of8J6n9FOKlWK6U0B+K7stt/fDaJg7bjeF3QAshlScYqC+3o5THy3vQViW",
  "secret":"uaBk27NKhQCZSDpfAlG6YJ473MzvsCNiED6kzbYuykzU05fCRkcJADhDm5nxbZt8yREC74ZpvD/vbcEx"
}
r = requests.get(
    'https://127.0.0.1/api/opncentral/sync/read_config/OPNsense.Firewall.Alias',
    auth=(auth['key'], auth['secret']),
    verify=False    # use for localhost testing only
)
print(r.text)
```

執行此操作後，會將配置路徑`OPNsense.Firewall.Alias`的內容轉儲到具有可序列化內容的命名數組中。

### 重新配置

重新配置操作是 readConfig 端點的對應物，它接受在`POST`請求的`payload`屬性中指定的新配置資料。

在某些情況下，配置合併有辦法處理本地更改，這在 OPNcentral 文件的「配置類別」部分中有詳細說明。

合併新配置後，該端點還會偵測哪些服務需要重啟，並自動發出重啟指令。

```js
import json
import requests
auth = {
  "key":"3RhWOno+HwvtmT406I6zw8of8J6n9FOKlWK6U0B+K7stt/fDaJg7bjeF3QAshlScYqC+3o5THy3vQViW",
  "secret":"uaBk27NKhQCZSDpfAlG6YJ473MzvsCNiED6kzbYuykzU05fCRkcJADhDm5nxbZt8yREC74ZpvD/vbcEx"
}

payload = "<<dictionary type content from readConfig>>"

r = requests.post(
    'https://127.0.0.1/api/opncentral/sync/reconfigure',
    auth=(auth['key'], auth['secret']),
    json={'payload': payload},
    verify=False,   # use for localhost testing only
    headers={'Content-Type': 'application/json; charset=UTF-8'}
)
```

### 清單服務

為了深入了解正在執行的服務，您可以使用 listServices API 操作。該操作將報告所有正在執行的服務及其狀態。

### 重啟服務

重新啟動服務操作也用於管理：狀態/服務，它提供了在目標主機上重新啟動一系列選定服務的功能。

```js
import json
import requests
auth = {
  "key":"3RhWOno+HwvtmT406I6zw8of8J6n9FOKlWK6U0B+K7stt/fDaJg7bjeF3QAshlScYqC+3o5THy3vQViW",
  "secret":"uaBk27NKhQCZSDpfAlG6YJ473MzvsCNiED6kzbYuykzU05fCRkcJADhDm5nxbZt8yREC74ZpvD/vbcEx"
}

r = requests.post(
    'https://127.0.0.1/api/opncentral/sync/restart_service',
    auth=(auth['key'], auth['secret']),
    json={'services':['cron']},
    verify=False,     # use for localhost testing only
    headers={'Content-Type': 'application/json; charset=UTF-8'}
)
```

上面的範例將重啟`cron`服務。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：零層](<363 零層.md>)　｜　[下一篇：範例 ➡](<365 範例.md>)
