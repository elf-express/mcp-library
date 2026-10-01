---
title: "Wazuh Agent"
source: "https://docs.opnsense.org/manual/wazuh-agent.html"
chapter: ["Community Plugins","Other"]
order: 187
lang: "bilingual"
translated_by: "google_v2"
captured: "2026-09-26T11:33:15.056Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Relayd｜中繼](<186 中繼.md>)　｜　[下一篇：Cloudflare Tunnel｜Cloudflare隧道 ➡](<188 Cloudflare隧道.md>)

# Wazuh Agent

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Other](<000 目錄.md#c-38>)

## Introduction｜介紹

[Wazuh](https://wazuh.com/) is an open source unified XDR (Extended Detection and Response) and SIEM (Security Information en Event Management) system capable of offering protection for endpoints and cloud workloads.

[Wazuh](https://wazuh.com/)是一個開源的統一XDR （擴展檢測和回應）和SIEM （安全資訊和事件管理）系統，能夠為端點和雲端工作負載提供保護。

The Wazuh architecture is based on agents, running on the monitored endpoints, which collect information and are capable of executing active responses directed by the manager.

Wazuh 架構是基於在受監控端點上執行的代理，這些代理程式收集資訊並能夠執行管理員指示的主動回應。

The goal of this plugin is to offer an easily installable plugin to connect to the Wazuh manager.

該插件的目標是提供一個易於安裝的插件，用於連接到 Wazuh 管理器。

Note

筆記

The scope of Wazuh on OPNsense is only to offer configurable agent support. We do not plan nor advise to run the Wazuh central components on OPNsense. Detailed information on how to install these on supported platforms are available directly from the [Wazuh website](https://documentation.wazuh.com/current/installation-guide/index.html) or you can use their cloud based offering available [here](https://wazuh.com/cloud/)

Wazuh 在 OPNsense 上的功能僅限於提供可設定的代理支援。我們不計劃也不建議在 OPNsense 上運行 Wazuh 的核心組件。有關如何在受支援的平台上安裝這些組件的詳細信息，可直接從 [Wazuh 網站](https://documentation.wazuh.com/current/installation-guide/index.html)獲取，或者您可以使用其基於雲端的服務 [此處](https://wazuh.com/cloud/)

Warning

警告

This plugin is provided “as-is” and with very limited \[tier 3\] community support from the OPNsense team. Using a SIEM/XDR system requires knowledge which usually is out of the (free) community support scope.

此外掛程式是「原樣」提供，OPNsense 團隊僅提供非常有限的 [三級] 社群支援。使用SIEM/XDR系統需要一定的專業知識，而這些知識通常超出（免費）社群支援的範圍。

## Installation｜安裝

Installation of this plugin is rather easy, go to System ‣ Firmware ‣ Plugins and search for **os-wazuh-agent**, use the \[+\] button to install it.

安裝此外掛程式非常簡單，請前往“系統”‣“韌體”‣“插件”，搜尋**os-wazuh-agent**，然後使用\[+\]按鈕進行安裝。

Next go to Services ‣ Wazuh Agent ‣ Settings to configure the service.

接下來，前往「服務」‣「Wazuh Agent」‣「設定」來設定該服務。

Tip

提示

When the ossec log offers too limited insights when debugging issues, try to increase the debug level. You can find this setting under General settings when “advanced mode” is enabled.

當 OSSEC 日誌在偵錯問題時提供的資訊過於有限時，請嘗試提高偵錯等級。啟用“進階模式”後，您可以在“常規設定”中找到此設定。

## Connecting the agent｜連線代理

To connect the agent to the manager, just fill in a hostname under **General Settings/Manager hostname**, make sure the agent is marked enabled and optionally specify a connect password under **Authentication/Password**.

若要將代理程式連接至管理器，只需在**常規設定/管理器主機名稱**下填寫主機名，請確保代理程式已啟用，並可選擇在**驗證/密碼**下指定連線密碼。

Next go to the manager to see if the agent registered itself.

接下來去找經理，看看代理人是否已經註冊。

## Selecting which logs to ingest｜選擇要攝取的日誌

Our Wazuh agent plugin supports syslog targets like we use in the rest of the product, so if an application sends its feed to syslog and registers the application name as described in our [development documentation](<248 使用插件.md#syslog>) it can be selected to send to Wazuh as well.

我們的 Wazuh 代理插件支援 syslog 目標，就像我們在產品的其他部分使用的那樣。因此，如果一個應用程式將其資訊流傳送到 syslog 並按照我們的 [開發文件](<248 使用插件.md#syslog>)中所述註冊了應用程式名稱，則可以選擇將其傳送至 Wazuh。

For Intrusion detection we can send the events as well using the same (eve) datafeed used in OPNsense, just mark the **Intrusion detection events** in the general settings.

對於入侵偵測，我們也可以使用 OPNsense 中使用的相同 (eve) 資料來源發送事件，只需在常規設定中標記 **入侵偵測事件** 即可。

Note

筆記

Wazuh only supports [rfc3164](https://datatracker.ietf.org/doc/html/rfc3164) formatted syslog messages, for that reason we record a copy of the requested events into a file named `/var/ossec/logs/opnsense_syslog.log` using that format.

Wazuh 僅支援 [rfc3164](https://datatracker.ietf.org/doc/html/rfc3164)格式的 syslog 訊息，因此我們使用此格式將要求的事件副本記錄到名為`/var/ossec/logs/opnsense_syslog.log`的檔案中。

## Installing custom ossec.conf entries｜安裝自訂 ossec.conf 條目

Some Wazuh modules are directly selectable from the gui, but when a feature is needed, which is not offered in the plugin, it’s possible to add static sections manually.

一些 Wazuh 模組可以直接從圖形使用者介面中選擇，但當需要插件中未提供的功能時，可以手動添加靜態部分。

You can add these in `/usr/local/opnsense/service/templates/OPNsense/WazuhAgent/ossec_config.d/`, for example, to add a custom json feed, add a file containing the following content in there:

您可以在`/usr/local/opnsense/service/templates/OPNsense/WazuhAgent/ossec_config.d/`中新增這些內容，例如，若要新增自訂 JSON 來源，請在此處新增一個包含以下內容的檔案：

/usr/local/opnsense/service/templates/OPNsense/WazuhAgent/ossec\_config.d/099-my-feed.conf

```xml
<localfile>
  <log_format>json</log_format>
  <location>/path/to/my/file.json</location>
</localfile>
```

## Use active responses｜使用正面回應

Wazuh supports [active responses](https://documentation.wazuh.com/current/user-manual/capabilities/active-response/index.html) so the manager can direct defensive actions when needed. The plugin ships with one action named `opnsense-fw` to drop traffic from a specified source address.

Wazuh 支援 [主動回應](https://documentation.wazuh.com/current/user-manual/capabilities/active-response/index.html) ，以便管理員在必要時採取防禦措施。該插件自帶一個名為`opnsense-fw`的操作，用於阻止來自指定來源位址的流量。

Note

筆記

The opnsense-fw action is stateful and can add and delete addresses from the firewall, more context on these type of actions can be found in the [Wazuh](https://documentation.wazuh.com/current/user-manual/capabilities/active-response/custom-active-response-scripts.html) documentation.

opnsense-fw 操作是有狀態的，可以向防火牆添加和刪除地址，有關此類操作的更多上下文信息，請參閱 [Wazuh](https://documentation.wazuh.com/current/user-manual/capabilities/active-response/custom-active-response-scripts.html)文件。

To use this action, you need to add some configuration in the manager, starting with the definition of this action.

要使用此操作，您需要在管理員中新增一些配置，首先要定義此操作。

/var/ossec/etc/ossec.conf

```xml
<ossec_config>
  <command>
    <name>opnsense-fw</name>
    <executable>opnsense-fw</executable>
    <timeout_allowed>yes</timeout_allowed>
  </command>
</ossec_config>
```

After which you can use it in active-response rules, like this (adjust agent id):

之後，您就可以在主動回應規則中使用它，如下所示（調整代理 ID）：

/var/ossec/etc/ossec.conf

```xml
<ossec_config>
  <active-response>
    <disabled>no</disabled>
    <command>opnsense-fw</command>
    <location>defined-agent</location>
    <agent_id>001</agent_id>
    <rules_id>87702</rules_id>
    <timeout>180</timeout>
  </active-response>
</ossec_config>
```

The official [documentation](https://documentation.wazuh.com/current/user-manual/capabilities/active-response/how-to-configure.html) contains more information about the options available.

官方文件(https://documentation.wazuh.com/current/user-manual/capabilities/active-response/how-to-configure.html)包含有關可用選項的更多資訊。

Tip

提示

Active responses are logged into Services ‣ Wazuh Agent ‣ Logfile / active-responses, including the messages received from the manager.

活躍回應會記錄到 Services ‣ Wazuh Agent ‣ Logfile / active-responses 中，包括從管理員收到的訊息。

To quickly test if an active-response can be executed on the agent, we advise to use the API console under Wazuh ‣ Tools ‣ API console. Executing the `opnsense-fw` command for address `172.16.1.30` on agent `001` can be done using:

若要快速測試是否可以在代理程式上執行主動回應，我們建議使用 Wazuh ‣ 工具 ‣ API控制台下的API控制台。可以使用以下指令在代理程式`001`上對位址`172.16.1.30`執行`opnsense-fw`指令：

```
PUT /active-response?agents_list=001
{
  "command": "!opnsense-fw",
  "custom": false,
  "alert": {
    "data": {
      "srcip": "172.16.1.30"
    }
  }
}
```

Tip

提示

Wazuh offers quite some [proof of concept](https://documentation.wazuh.com/current/proof-of-concept-guide/index.html) documents and blog posts, like [this](https://wazuh.com/blog/responding-to-network-attacks-with-suricata-and-wazuh-xdr/) document explaining how Suricata and Wazuh can be combined to respond to detected threats.

Wazuh 提供了相當多的 [概念驗證](https://documentation.wazuh.com/current/proof-of-concept-guide/index.html)文檔和部落格文章，例如 [這篇](https://wazuh.com/blog/responding-to-network-attacks-with-suricata-and-wazuh-xdr/)文檔，解釋瞭如何將 Suricata 和 Wazuh 結合起來應對檢測到的威脅。

## Test rule detection｜測試規則檢測

In case log entries are being collected in `/var/ossec/logs/opnsense_syslog.log` and no events are being collected in the Manager, it’s usually a good idea to check how Wazuh processes these lines.

如果在`/var/ossec/logs/opnsense_syslog.log`中收集了日誌條目，但在管理器中沒有收集任何事件，通常最好檢查一下 Wazuh 如何處理這些行。

The Wazuh ‣ Tools ‣ Ruleset test menu item in the manager offers an easy to use tool to inspect log events.

管理器中的 Wazuh ‣ 工具 ‣ 規則集測試選單項目提供了一個易於使用的工具來檢查日誌事件。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Relayd｜中繼](<186 中繼.md>)　｜　[下一篇：Cloudflare Tunnel｜Cloudflare隧道 ➡](<188 Cloudflare隧道.md>)
