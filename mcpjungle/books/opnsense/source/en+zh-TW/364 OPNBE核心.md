---
title: "OPNBECore｜OPNBE核心"
title_original: "OPNBECore"
source: "https://docs.opnsense.org/development/api/be/OPNBEcore.html"
chapter: ["Development Manual","API Reference","Business edition API"]
order: 364
lang: "bilingual"
translated_by: "gtx"
captured: "2026-09-26T11:34:44.664Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zerotier｜澤羅蒂爾](<363 澤羅蒂爾.md>)　｜　[下一篇：Examples｜範例 ➡](<365 範例.md>)

# OPNBECore｜OPNBE核心

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Business edition API](<000 目錄.md#c-61>)

*Resources (SyncController.php) – extends : ApiControllerBase*

*資源 (SyncController.php) – 擴充：ApiControllerBase*

| Method<br>方法 | Module<br>模組 | Controller<br>控制器 | Command<br>指令 | Parameters<br>參數 |
| --- | --- | --- | --- | --- |
| `GET` | opncentral<br>中央 | sync<br>同步 | listServices<br>清單服務 |  |
| `GET` | opncentral<br>中央 | sync<br>同步 | listClasses<br>清單類別 |  |
| `GET` | opncentral<br>中央 | sync<br>同步 | metrics<br>指標 |  |
| `GET` | opncentral<br>中央 | sync<br>同步 | readConfig<br>讀取配置 | $paths<br>$路徑 |
| `POST` | opncentral<br>中央 | sync<br>同步 | reconfigure<br>重新配置 |  |
| `POST` | opncentral<br>中央 | sync<br>同步 | restartService<br>重啟服務 |  |

## Sync API explained｜同步API解釋

The `sync` API is being used to process central actions in parallel from the OPNcentral dashboard. As explained in the documentation for OPNcentral, provisioning is able to detect change on the sections it may distribute. In order to do this the `listClasses` API action plays a large role here.

`sync` API 用於並行處理來自 OPNcentral 儀表板的中央操作。正如 OPNcentral 文件中所解釋的，配置能夠偵測它可能分發的部分的變更。為此，`listClasses` API 動作在這裡發揮著重要作用。

### listClasses｜列出類別

The list classes endpoint provides insights into the different configuration items the target host understands and how these are tied into services. It’s also a key component in comparing configuration items.

清單類別端點提供了對目標主機理解的不同配置項目以及這些配置項目如何與服務綁定的見解。它也是比較配置項的關鍵組成部分。

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

When the target firewall is 100% equal to the central node, the `md5` values will match. In order to steer specific overrides on the synchronisation action, it is possible to send a json encoded base64 structure as `metadata` post parameter (not available in the online documentation, advanced usage only).

當目標防火牆與中心節點100%相等時，`md5`值將會相符。為了引導同步操作的特定覆蓋，可以發送 json 編碼的 base64 結構作為 `metadata` post 參數（線上文件中不可用，僅限高級用法）。

### readConfig｜讀取配置

This endpoint is responsible for providing access to various parts of the configuration and mostly practical to retrieve parts of the configuration.

此端點負責提供對配置各個部分的訪問，並且主要用於檢索部分配置。

Example usage of this endpoint is provided below.

下面提供了此端點的範例用法。

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

When executed, this will dump the contents of the configuration path `OPNsense.Firewall.Alias` into a named array with serialisable content.

執行時，這會將配置路徑`OPNsense.Firewall.Alias`的內容轉儲到具有可序列化內容的命名數組中。

### reconfigure｜重新配置

The reconfigure action is the counterpart of the readConfig endpoint and accepts new configuration data specified in the `payload` attribute of the `POST` request.

重新配置操作是 readConfig 端點的對應操作，並接受 `POST` 請求的 `payload` 屬性中指定的新配置資料。

In some cases configuration merges have ways to handle local changes, which is documented in the “Provisioning classes” section of the OPNcentral documentation.

在某些情況下，配置合併有處理本機變更的方法，這在 OPNcentral 文件的「配置類別」部分中進行了記錄。

After merging the new configuration, this endpoint also detects which services need to be restarted and will issue a restart command automatically.

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

### listServices｜清單服務

In order to gain insights on the active running services, you can use the listServices api action. This will report all active services and their status.

為了深入了解正在執行的活動服務，您可以使用 listServices api 操作。這將報告所有活動服務及其狀態。

### restartService｜重啟服務

The restart service action is also used in Management: Status / Services and offers the ability to restart a list of selected services on the target host.

重新啟動服務操作也用於管理：狀態/服務，並提供重新啟動目標主機上選定服務清單的功能。

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

The example above will restart the `cron` service.

上面的範例將重新啟動`cron`服務。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Zerotier｜澤羅蒂爾](<363 澤羅蒂爾.md>)　｜　[下一篇：Examples｜範例 ➡](<365 範例.md>)
