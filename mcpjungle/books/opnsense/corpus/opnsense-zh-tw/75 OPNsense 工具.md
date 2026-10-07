---
title: "OPNsense 工具"
title_original: "OPNsense Tools"
source: https://docs.opnsense.org/manual/opnsense_tools.html
chapter: ["Lobby"]
order: 75
lang: "zh-TW"
translated_by: "google_v2"
captured: "2026-09-26T11:32:19.842Z"
---


# OPNsense 工具


OPNsense 專案提供了許多工具，可以立即修補系統、將軟體包恢復到先前的（舊版本）狀態或恢復整個核心。

## opsense-更新

opnsense-update 工具提供核心和基礎系統組合升級，可透過遠端取得二進位檔案集進行升級，也可透過 pkg 進行軟體套件升級。有關完整選項列表，請參閱系統手冊頁。

### 範例：

一次小更新也更新了內核，導致您的NIC出現一些驅動程式問題。打開瀏覽器並訪問

[https://pkg.opnsense.org/FreeBSD:11:amd64/18.1/sets/](https://pkg.opnsense.org/FreeBSD:11:amd64/18.1/sets/)

這裡可以看到版本18.1的所有核心。如果您使用的是更新的版本，請注意更改版本號。例如，如果您從18.1.4更新到18.1.5則現在安裝的是核心18.1.5 。要恢復到上一個穩定版本，您可以查看內核18.1語法如下：

\# opnsense-update -kr 18.1

## opnsense-shell 重啟

其中 -k 只修改內核，-r 指定版本號。

要切換回當前內核，只需使用

## opnsense-update -k

## opnsense-shell 重啟

警告

在回滾核心版本之前，請先查閱論壇或透過 GitHub 提交 issue。您只能在測試機器上回滾內核，或在合格的團隊成員建議下進行回滾！

## opnsense-revert

opnsense-revert 工具可以安全地安裝 OPNsense 版本中包含的軟體包的先前版本，前提是所選鏡像快取了該版本。有關完整選項列表，請參閱系統上的手冊頁。

### 例1：

OPNsense 最新更新至18.1.5版本後，IPSec 軟體套件「strongswan」的版本號略有變化。從現在開始，您的 VPN 連線將不穩定，只有重新啟動才能解決問題。

要檢查軟體包更新是否是原因，您可以在運行最新 OPNsense 版本的同時，輕鬆地將軟體包恢復到先前的狀態。

## opnsense-revert -r 18.1.4 strongswan

例如，您可以使用此指令在執行 StrongSwan 的18.1.4版本時執行 OPNsense 18.1.5 。如果您想返回目前版本，只需執行以下操作即可。

## opnsense-revert strongswan

### 例2：

先前對 strongswan 的回滾操作並沒有達到預期效果，因此您嘗試完全回滾到先前的 OPNsense 版本：

## opnsense-revert -r 18.1.4 opnsense

請注意，也要檢查是否有類似上述的核心更新，以便在需要時降級核心！

## opnsense-patch

opnsense-patch 工具會將所有參數視為上游 Git 倉庫的提交雜湊值，下載這些雜湊值，然後按順序套用它們。也可以透過重新套用補丁來撤銷已套用的補丁，但要成功套用多個補丁，必須按相反的順序輸入。有關完整的選項列表，請參閱系統上的手冊頁。

### 例1：

流量整形器中新引入的一個拼字錯誤導致系統無法設定正確的 ipfw 規則集。開發人員要求您在URL [https://github.com/opnsense/core/commit/63cfe0a96c83eee0e8aea0caa841f4fc7b92a8d0](https://github.com/opnsense/core/commit/63cfe0a96c83eee0e8aea0caa841f4fc7b92a8d0)處測試新修補程式 63cfe0a。頁面末尾顯示的是簡寫版本 63cfe0a，因此命令應為：

## opnsense-patch 63cfe0a

如果這樣做沒有解決您的問題，或者使問題變得更糟，您可以重新執行該命令以撤銷操作。

### 例2：

你需要插件的一個特殊功能，並在 GitHub 上提出請求。開發者添加了該功能，並要求你安裝補丁 699f1f2 進行測試。完整的連結是 [https://github.com/opnsense/plugins/commit/699f1f28a33ce0122fa0e2f5e6e1f48eb3c4f074](https://github.com/opnsense/plugins/commit/699f1f28a33ce0122fa0e2f5e6e1f48eb3c4f074)

## opnsense-patch -c plugins 699f1f2

-c 參數將預設核心變更為插件倉庫，並將補丁新增至系統。

也可以新增來自不同使用者的補丁，只需在 -c 前新增 -a githubusername 即可。

---

