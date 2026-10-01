---
title: "Using configd｜使用 configd"
title_original: "Using configd"
source: "https://docs.opnsense.org/development/backend/configd.html"
chapter: ["Development Manual","Backend"]
order: 247
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-26T11:33:45.417Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：CARP status｜CARP狀態](<246 CARP狀態.md>)　｜　[下一篇：Using plugins｜使用插件 ➡](<248 使用插件.md>)

# Using configd｜使用 configd

> 章節：[Development Manual](<000 目錄.md#c-52>) › [Backend](<000 目錄.md#c-54>)

## General｜一般的

To add new services and system calls, which can be used from the frontend system or command line, you can create configd actions.

若要新增可從前端系統或命令列使用的新服務和系統調用，您可以建立 configd 操作。

All available templates should be installed at the following location on the OPNsense system:

所有可用的模板都應安裝在 OPNsense 系統的以下位置：

```
/usr/local/opnsense/service/conf/actions.d/
```

*Please note that all actions which should be accessible from the frontend should have a registered configd action, if possible use standard rc(8) scripts for service start/stop.*

*請注意，所有需要從前端存取的操作都應該註冊一個 configd 操作；如果可能，請使用標準的 rc(8) 腳本來啟動/停止服務。 *

## Naming convention｜命名規則

Service templates should use distinctive names to identify your service and contain simple / clear actions.

服務模板應使用獨特的名稱來識別您的服務，並包含簡單/清晰的操作。

For example, we will describe the template for ssh, which is installed by default.

例如，我們將介紹預設安裝的 ssh 範本。

**File name:**

**檔名：**

```
/usr/local/opnsense/service/conf/actions.d/actions_sshd.conf
```

Our ssh service has two actions available:

我們的 SSH 服務提供兩種操作：

-   restart  
    重啟
    
    -   starts / restarts ssh service  
        啟動/重啟 SSH 服務
        
    
-   stop  
    停止
    
    -   stops / kills all ssh daemons  
        停止/終止所有 SSH 守護程式
        
    

```
[restart]
command:/usr/local/etc/rc.sshd
parameters:
type:script
message:starting sshd

[stop]
command:/bin/pkill -TERM sshd; exit 0
parameters:
type:script
message:stop sshd
```

Between brackets \[\] you find the name of the action, the definition of the actual call is defined in the following parameter:value pairs. When a service or module provides a lot of actions, it sometimes is practical to add another level of operation.

在方括號 [] 內是操作名稱，實際呼叫的定義則由後面的參數:值對構成。當服務或模組提供大量操作時，有時添加另一層操作會很實用。

For example, the restart service call for this service will translate to: **sshd restart**

例如，此服務的重啟呼叫將轉換為：**sshd restart**

In case we have an action like **filter diag info**, you can create an actions\_filter.conf which contains a section \[diag.info\].

如果我們有像 **filter diag info** 這樣的操作，您可以建立一個 actions\_filter.conf，其中包含 \[diag.info\] 部分。

## Action properties｜動作屬性

| Property<br>屬性 | Syntax<br>語法 | Description<br>描述 |
| --- | --- | --- |
| command<br>指令 | text<br>文字 | shell command string to execute<br>要執行的 shell 指令字串 |
| parameters<br>參數 | %s for every parameter<br>%s 代表每個參數 | list of parameters to use, example : /i %s<br>要使用的參數列表，例如：/i %s |
| type<br>類型 | script\|script\_output<br>腳本\| script\_output | type of call:<br>• script (only return exit status)<br>• script\_output (return result)<br>• stream\_output (return result in streaming mode)<br>呼叫類型： <br> • 腳本（僅返回退出狀態） <br> • script\_output（返回結果） <br> • stream\_output（以流模式傳回結果） |
| errors<br>錯誤 | text \[no\]<br>文字 [否] | `errors:no` ignores the scripts exit code<br>`errors:no`忽略腳本退出代碼 |
| allowed\_groups | text | list of groups allowed to execute this action (e.g. wheel)<br>允許執行此操作（例如 wheel）的群組清單 |
| message<br>訊息 | text<br>文字 | Message to send to syslog (you can use %s parameters)<br>要傳送到系統日誌的訊息（可以使用 %s 參數） |
| description<br>描述 | text<br>文字 | User-friendly description, also allows GUI usage<br>使用者友善的描述，也允許GUI使用 |

## Test action｜測試操作

To test a new configd action, please restart the configd service first using:

若要測試新的 configd 操作，請先使用下列指令重新啟動 configd 服務：

```
service configd restart
```

Next use the supplied helper command to execute our action:

接下來，使用提供的輔助命令來執行我們的操作：

```
configctl sshd restart
```

## Extending the Environment｜擴展環境

Configd’s own configuration can be found in the [configd.conf](https://github.com/opnsense/core/blob/master/src/opnsense/service/conf/configd.conf) file. In some cases it can be practical to extend the environment with additional settings for the configd actions to use.

Configd 本身的設定資訊位於 [configd.conf](https://github.com/opnsense/core/blob/master/src/opnsense/service/conf/configd.conf)檔案中。在某些情況下，為 configd 操作新增額外的設定會很實用。

To add environment variables, create a new config file in the `conf/configd.conf.d/` directory using the `.conf` extension containing an `[environment]` section. For example, to add a proxy server (for the firmware updater), use settings like these:

若要新增環境變量，請在`conf/configd.conf.d/`目錄中建立新的設定文件，並使用`.conf`副檔名，其中包含一個`[environment]`部分。例如，若要新增代理伺服器（用於韌體更新程式），請使用下列設定：

/usr/local/opnsense/service/conf/configd.conf.d/proxy.conf

```
[environment]
HTTP_PROXY=http://proxy-adddress:8080
HTTPS_PROXY=http://proxy-adddress:8080
NO_PROXY=192.168.1.2
```

Note

筆記

After changing the configd configuration, don’t forget to restart the configd service via the gui or service configd restart (as root).

更改 configd 設定後，不要忘記透過圖形介面或使用 service configd restart 命令（以 root 使用者身分）重新啟動 configd 服務。

Warning

警告

When using the same settings as already specified in the base configuration, these settings will be overwritten. The parsing order of configuration files is to read all vendor shipped properties first and read additional files next. Last property found is the one being used (e.g. specifying a new `PATH` in the environment, will overwrite the one being shipped in our `configd.conf`.)

如果使用與基本配置中已指定的設定相同的設置，則這些設定將被覆蓋。設定檔的解析順序是先讀取供應商提供的所有屬性，然後再讀取其他檔案。最後找到的屬性將被使用（例如，在環境中指定一個新的`PATH`將覆蓋我們`configd.conf`中提供的同名屬性）。

Note

筆記

The `NO_PROXY` setting may be used to exclude hosts from using a proxy, which is usually practical for xmlrpc sync

`NO_PROXY`設定可用於排除某些主機使用代理，這通常對 XMLRPC 同步很實用。

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：CARP status｜CARP狀態](<246 CARP狀態.md>)　｜　[下一篇：Using plugins｜使用插件 ➡](<248 使用插件.md>)
