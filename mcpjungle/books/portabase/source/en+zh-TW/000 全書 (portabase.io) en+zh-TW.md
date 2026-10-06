---
title: "Portabase Documentation（中文（繁體）（雙語））"
source: "https://portabase.io"
pages: 108
chapters: 32
generated: "2026-09-27T12:11:40.104Z"
---

# Portabase Documentation（中文（繁體）（雙語））

> 共 108 篇 · 32 個章節 · 由「網頁轉 Markdown」依 chapter／order 自動編排

<a id="toc"></a>

## 目錄

- [Introduction｜介紹](#p-001)
- [[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-o](#c-1)
  - [portabase/portabase1.8K120](#c-2)
    - [Requirements｜要求](#p-002)
    - [Installation｜安裝](#c-3)
      - [Overview｜概述](#p-003)
      - [CLI](#p-004)
      - [Docker](#p-005)
      - [Kubernetes](#p-006)
      - [Coolify｜酷樂](#p-007)
      - [Dokploy｜Docploy](#p-008)
      - [Unraid｜榮譽](#p-009)
      - [Proxmox VE](#p-010)
    - [Portabase Dashboard｜Portabase 控制面板](#c-4)
      - [Getting Started｜入門](#c-5)
        - [Configuration｜配置](#c-6)
          - [Environment Variables｜環境變數](#c-7)
            - [Reverse Proxy｜反向代理](#p-013)
            - [Authentication｜驗證](#c-8)
              - [Global Configuration｜全域配置](#c-9)
                - [OpenID Connect](#c-10)
                  - [OIDC Configuration｜OIDC 配置](#c-11)
                    - [Examples｜範例](#c-12)
                      - [Keycloak｜鑰匙斗篷](#p-016)
                      - [PocketID](#p-017)
                      - [Authentik](#p-018)
                - [OAuth2](#c-13)
                  - [OAuth2 Configuration｜OAuth2 配置](#c-14)
                    - [Configurations｜配置](#c-15)
                      - [Google](#p-020)
                      - [GitHub](#p-021)
                      - [Discord](#p-022)
                      - [Reddit](#p-023)
                      - [LinkedIn](#p-024)
                      - [Apple｜蘋果](#p-025)
                      - [X (Twitter)｜X（推特）](#p-026)
        - [User Guide｜使用者指南](#p-027)
        - [Usage (How-to)｜使用方法（操作指南）](#c-16)
          - [Storage｜貯存](#c-17)
            - [Local Storage｜本地儲存](#p-028)
            - [Object Storage (S3)｜物件儲存 (S3)](#p-029)
            - [Google Drive｜Google雲端硬碟](#p-030)
            - [Azure Blob Storage｜Azure Blob 儲存](#p-031)
            - [Google Cloud Storage｜谷歌雲端儲存](#p-032)
            - [SFTP](#p-033)
            - [Rclone (any backend)｜Rclone（任何後端）](#p-034)
          - [Notification｜通知](#c-18)
            - [Slack｜鬆弛](#p-035)
            - [Email (SMTP)｜電子郵件 (SMTP)](#p-036)
            - [Webhook｜網路鉤子](#p-037)
            - [Discord](#p-038)
            - [Telegram｜電報](#p-039)
            - [Ntfy｜恩特菲](#p-040)
            - [Gotify｜戈蒂菲](#p-041)
            - [Nextcloud Talk｜下一個雲端談話](#p-042)
            - [Pushover｜推倒](#p-043)
            - [Microsoft Teams｜微軟團隊](#p-044)
            - [Apprise｜艾普瑞斯](#p-045)
            - [Healthchecks.io](#p-046)
        - [API](#c-19)
          - [API Introduction｜API簡介](#c-20)
            - [API Introduction｜API引言](#p-047)
            - [Agents｜代理人](#c-21)
              - [List agents｜經紀人名單](#p-048)
              - [Create an agent｜創建代理](#p-049)
              - [Get agent by ID｜透過ID獲取代理](#p-050)
              - [Delete agent｜刪除代理](#p-051)
              - [Get agent edge key｜取得代理邊緣密鑰](#p-052)
            - [Databases｜資料庫](#c-22)
              - [List databases｜列出資料庫](#p-053)
              - [Get database by ID｜透過ID取得資料庫](#p-054)
              - [Attach the database to a project, or detach it (projectId null)｜將資料庫附加到項目，或將其分開（projectId 為空）](#p-055)
              - [Get database status｜取得資料庫狀態](#p-056)
              - [List backups for a database｜列出資料庫備份](#p-057)
              - [Trigger a backup for a database｜觸發資料庫備份](#p-058)
              - [Get a specific backup with storage details｜取得包含儲存體詳情的特定備份](#p-059)
              - [Set or clear the backup schedule for a database｜設定或清除資料庫備份計劃](#p-060)
              - [Restore a database from a backup｜從備份還原資料庫](#p-061)
            - [Organizations｜組織](#c-23)
              - [List organizations for the current user｜列出目前使用者的組織](#p-062)
              - [Create an organization｜創建組織](#p-063)
              - [Get organization by ID｜透過ID進行整理](#p-064)
              - [Delete an organization｜刪除組織](#p-065)
              - [List projects for an organization｜列出組織的項目](#p-066)
              - [Create a project in an organization｜在組織內建立一個專案](#p-067)
              - [List agents attached to an organization｜列出隸屬於某個組織的代理人](#p-068)
              - [Attach an agent to an organization｜將代理人分配給組織](#p-069)
              - [Detach an agent from an organization｜將一名代理人從組織中分離出來](#p-070)
            - [Projects｜專案](#c-24)
              - [Get project by ID｜取得項目ID](#p-071)
              - [Archive (soft-delete) a project｜將項目歸檔（軟刪除）](#p-072)
        - [MCP Server｜MCP 伺服器](#c-25)
          - [MCP Tools Reference｜MCP工具參考](#p-074)
    - [Portabase Agent](#c-26)
      - [Configuration File｜設定檔](#c-27)
        - [Environment Variables｜環境變數](#p-076)
        - [Databases｜資料庫](#c-28)
          - [Supported Databases｜支援的資料庫](#p-077)
          - [PostgreSQL](#p-078)
          - [MySQL](#p-079)
          - [MariaDB](#p-080)
          - [MongoDB](#p-081)
          - [SQLite](#p-082)
          - [Redis](#p-083)
          - [Valkey｜瓦爾基](#p-084)
          - [Firebird｜火鳥](#p-085)
          - [MsSQL](#p-086)
          - [Docker Volume｜Docker 卷](#p-087)
    - [CLI｜命令列介面](#c-29)
      - [Introduction｜介紹](#c-30)
        - [Install the CLI｜安裝CLI](#p-089)
        - [Key concepts｜關鍵概念](#p-090)
        - [Guides｜指南](#c-31)
          - [Set up an agent｜設立代理](#p-091)
          - [Set up a dashboard｜設定儀表板](#p-092)
          - [Add a login provider｜新增登入提供者](#p-093)
          - [Decrypt a backup｜解密備份](#p-094)
        - [Commands｜命令](#c-32)
          - [agent｜代理人](#p-096)
          - [dashboard｜儀表板](#p-097)
          - [lifecycle｜生命週期](#p-098)
          - [build｜建造](#p-099)
          - [decrypt｜解密](#p-100)
          - [config & update｜配置和更新](#p-101)
        - [Troubleshooting｜故障排除](#p-102)
        - [Migration guide｜遷移指南](#p-103)
        - [CLI reference (Legacy)｜CLI 參考（舊版）](#p-104)
        - [Contributing｜貢獻](#p-105)
    - [FAQ](#p-106)
    - [Contributing｜貢獻](#p-107)
    - [Overview｜概述](#p-108)

---

<a id="p-001"></a>

## Introduction｜介紹

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs>

Portabase is the 100% open source and self-hosted solution to centralize, secure, and automate your database backups.

Portabase 是一個 100% 開源且可自行託管的解決方案，用於集中管理、保護資料庫備份並實現自動化。

### [Welcome to Portabase](#p-001)｜[歡迎使用 Portabase](#p-001)

**Portabase** is the solution designed to simplify the **backup** and **management** of your databases.

**Portabase**是設計用來簡化資料庫的**備份**和**管理** 的解決方案。

We know that managing backups manually is risky and tedious. Portabase automates this process by installing smart connectors (**Agents**) on your servers. These agents handle everything: they secure your data and send it to your preferred storage spaces, without requiring advanced technical skills.

我們知道手動管理備份既費時又費力。 Portabase 透過在您的伺服器上安裝智慧連接器（**代理**）來自動執行此程序。這些代理程式會處理所有事情：它們會保護您的資料並將其發送到您指定的儲存空間，而無需您具備高深的技術技能。

Simplicity First

簡單至上

No more writing complex scripts. Portabase connects your servers to a unique dashboard for serene data management.

無需再編寫複雜的腳本。 Portabase 將您的伺服器連接到一個統一的控制面板，讓您輕鬆管理資料。

![Portabase Video - Youtube](<../images/a30f3ea2-thumbnail-portabase-video.png>)

---

### [Architecture](#p-001)｜[建築](#p-001)

The central server provides the graphical interface and acts as the control plane: it allows users to declare agents, configure backups, launch restores, and connect third-party systems such as storage backends and notification services.

中央伺服器提供圖形介面並充當控制平面：它允許使用者聲明代理、配置備份、啟動復原以及連接第三方系統，例如儲存後端和通知服務。

The agent is deployed as close as possible to the databases: it executes backup and restore tasks.

代理程式部署在盡可能靠近資料庫的位置：它執行備份和復原任務。

This architectural choice is important: the central server never contacts the agents directly. Therefore, there is no need to open inbound ports into the environments where the databases reside. Instead, the agents periodically contact the central server.

這種架構選擇至關重要：中央伺服器從不直接聯繫代理程式。因此，無需在資料庫所在的環境中開放入站連接埠。相反，代理會定期聯繫中央伺服器。

This approach reduces the network exposure surface and limits the consequences of a compromise of the central server.

這種方法可以減少網路暴露面，並限制中央伺服器被攻破的後果。

![Google Drive configuration](<../images/81ac25bc-image.png>)

### [Features](#p-001)｜[功能](#p-001)

#### [Supported databases](#p-001)｜[支援的資料庫](#p-001)

| Database<br>資料庫 | Support<br>支援 | Tested versions<br>測試版本 | Restore<br>復原 |
| --- | --- | --- | --- |
| **PostgreSQL** | ✅ Stable<br>✅ 穩定版 | 12, 13, 14, 15, 16, 17 et 18<br>12、13、14、15、16、17 與 18 | Yes<br>是 |
| **MySQL** | ✅ Stable<br>✅ 穩定版 | 5.7, 8 et 9<br>5.7 ，8 和 9 | Yes<br>是 |
| **MariaDB** | ✅ Stable<br>✅ 穩定 | 10 et 11<br>10 和 11 | Yes<br>是 |
| **MongoDB** | ✅ Stable<br>✅ 穩定版 | 4, 5, 6, 7 et 8<br>4、5、6、7 與 8 | Yes<br>是 |
| **SQLite** | ✅ Stable<br>✅ 穩定版 | 3.x | Yes<br>是 |
| **Redis** | ✅ Stable<br>✅ 穩定版 | 2.8+<br>2.8 + | No<br>否 |
| **Valkey** | ✅ Stable<br>✅ 穩定版 | 7.2+<br>7.2 + | No<br>無 |
| **Firebird**<br>**火鳥** | ✅ Stable<br>✅ 穩定 | 3.0, 4.0, 5.0 | Yes<br>是 |
| **MSSQL Server**<br>**MSSQL伺服器** | ✅ Stable<br>✅ 穩定 | 2017, 2019, 2022 and Azure SQL<br>2017、2019、2022 和 Azure SQL | Yes<br>是 |
| **Docker Volume**<br>**Docker 磁碟區** | ✅ Stable<br>✅ 穩定 | Docker Engine 20.10+<br>Docker 引擎20.10 + | Yes<br>是 |

#### [Scheduled backups](#p-001)｜[計畫備份](#p-001)

-   **Cron-based scheduling**: For full control.  
    **基於 Cron 的調度**：實現完全控制。
-   **Manual trigger**: Support for on-demand backups.  
    **手動觸發**：支援按需備份。

#### [Storage backends](#p-001)｜[儲存後端](#p-001)

-   ✅ **On-premise storage**: Backups are stored directly on your server.  
    ✅ **本地儲存**：備份直接儲存在您的伺服器上。
-   ✅ **S3-compatible**: AWS S3, Minio, RustFS, etc.  
    ✅ **S3 相容**： AWS S3、Minio、RustFS 等。
-   ✅ **Google Drive**  
    ✅ **Google 雲端硬碟**
-   ✅ **Azure Blob Storage**  
    ✅ **Azure Blob 儲存**
-   ✅ **Google Cloud Storage**  
    ✅ **Google雲端儲存**
-   ✅ **SFTP**
-   ✅ **Rclone** (any backend)  
    ✅ **Rclone**（任何後端）

Important Note

重要提示

Portabase allows sending the same backup to **multiple destinations simultaneously**. You can combine local storage, private cloud, and S3 services, ensuring maximum redundancy and enhanced security in case one storage point fails.

Portabase 允許將同一份備份同時傳送到**多個目標位置**。您可以結合使用本機儲存、私有雲和 S3 服務，從而確保最大程度的冗餘，並在某個儲存點發生故障時增強安全性。

#### [Smart notifications](#p-001)｜[智慧通知](#p-001)

-   **Multi-channel delivery**: Email, Slack, Discord, Telegram, Ntfy, Gotify, webhooks.  
    **多重管道交付**：電子郵件、Slack、Discord、Telegram、Ntfy、Gotify、webhook。
-   **Real-time alerts**: Immediate feedback on success and failure.  
    **即時警報**：立即回饋成功和失敗情況。
-   **Custom alert policies**: Database-level notification rules.  
    **自訂警報策略**：資料庫層級的通知規則。
-   **Team-ready**: Designed for DevOps, on-call, and incident workflows.  
    **團隊就緒**：專為 DevOps、值班和事件工作流程而設計。

#### [Built for team environments](#p-001)｜[專為團隊環境打造](#p-001)

-   **Workspaces**: Organize databases, notification channels, and storage backends by organization and project.  
    **工作區**：依組織和專案組織資料庫、通知管道和儲存後端。
-   **Access control**: Fine-grained, role-based permissions on all resources.  
    **存取控制**：對所有資源進行細粒度、基於角色的權限控制。
-   **Role management**: Member, admin, and owner roles at both system and organization levels.  
    **角色管理**：系統和組織層級的成員、管理員和擁有者角色。

#### [Self-hosted & secure](#p-001)｜[自託管且安全](#p-001)

-   **Containerized deployment**: Docker-based setup for predictable installation and operations.  
    **容器化部署**：基於 Docker 的設置，實現可預測的安裝和操作。
-   **Privacy by design**: All data remains within your own infrastructure.  
    **隱私保護設計**：所有資料都保留在您自己的基礎設施內。
-   **Open source**: Apache 2.0 licensed - fully auditable codebase.  
    **開源**：採用 Apache 2.0許可 - 完全可審計的程式碼庫。
-   **Advanced Encryption**: Backups protected with AES-GCM to ensure data confidentiality and integrity.  
    **進階加密**：備份採用AES-GCM加密保護，以確保資料機密性和完整性。

#### [Portabase Agent](#p-001)｜[Portabase Agent](#p-001)

-   **Headless architecture**: Runs locally on your infrastructure to manage backups and database operations.  
    **無頭架構**：在您的基礎架構上本機運行，用於管理備份和資料庫操作。
-   **Multi-target support**: Single agent can connect to multiple databases across different servers.  
    **多目標支援**：單一代理可以連接到不同伺服器上的多個資料庫。
-   **Lightweight & efficient**: Minimal resource footprint while providing full operational control.  
    **輕巧有效率**：資源佔用極小，同時提供全面的操作控制。

---

### [How it works?](#p-001)｜[工作原理？](#p-001)

The ecosystem relies on three simple elements:

此生態系統依賴三個簡單的要素：

[

#### The Dashboard｜儀表板

The web interface to control your backups, view history, and restore your data if needed.

透過網頁介面控制備份、查看歷史記錄，並在需要時還原資料。

](https://portabase.io/docs/installation)[

#### The Agent｜特務

The connector that installs on your servers. It works in the background to protect your databases.

此連接器會安裝在您的伺服器上。它會在背景運行，保護您的資料庫。

](https://portabase.io/docs/installation#agent-coverage)[

#### The Assistant (CLI)｜助理（ CLI ）

A simple tool to run on your computer to install and configure your agents in seconds.

一款可在電腦上運行的簡單工具，可在幾秒鐘內安裝和設定代理程式。

](https://portabase.io/docs/cli)

Last updated on

最後更新於

[

Requirements

要求

System requirements to run Portabase.

運行 Portabase 的系統需求。

](https://portabase.io/docs/requirements)

---

<a id="c-1"></a>

## [data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-o

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-2"></a>

### portabase/portabase1.8K120

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-002"></a>

#### Requirements｜要求

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/requirements>

System requirements to run Portabase.

運行 Portabase 的系統需求。

To run Portabase, you need the following installed on your system:

要執行 Portabase，您的系統需要安裝以下軟體：

##### [1\. Docker & Docker Compose](#p-002)｜[1. Docker 與 Docker Compose](#p-002)

Portabase runs as a set of Docker containers. You must have Docker Engine (version 20.10+) and Docker Compose (version 2.0+) installed.

Portabase 以一組 Docker 容器的形式運作。您必須安裝 Docker Engine（版本20.10 +）和 Docker Compose（版本2.0 +）。

**Linux**

###### [Ubuntu / Debian / Fedora](#p-002)｜[Ubuntu / Debian / Fedora](#p-002)

The easiest way to install Docker on Linux is using the official convenience script:

在 Linux 上安裝 Docker 最簡單的方法是使用官方的便利腳本：

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

**Post-installation steps:** To run Docker without `sudo`, add your user to the `docker` group:

**安裝後步驟：** 若要在不使用`sudo`情況下執行 Docker，請將您的使用者加入到`docker`群組：

```bash
sudo usermod -aG docker $USER
```

*You may need to log out and back in for this change to take effect.*

*您可能需要登出並重新登入才能使變更生效。 *

**macOS**

---

##### [2\. Operating System](#p-002)｜[2. 作業系統](#p-002)

-   **Linux**: Any modern distribution (Ubuntu 22.04+, Debian 11+, CentOS, etc.).  
    **Linux**：任何現代發行版（Ubuntu 22.04 +、Debian 11+、CentOS 等）。
-   **macOS**: Catalina 10.15 or newer.  
    **macOS**：Catalina 10.15 或更高版本。

---

##### [3\. Network Requirements](#p-002)｜[3. 網路需求](#p-002)

-   **Local Port**: By default, the dashboard uses port `8887`. Ensure it is not being used by another service.  
    **本機連接埠**：預設情況下，控制面板使用連接埠`8887` 。請確保該連接埠未被其他服務佔用。
-   **Internet Access**: Required to pull Docker images and for the agent to communicate with the dashboard (if hosted remotely).  
    **網路存取**：需要網路存取才能拉取 Docker 映像，以及代理程式與控制面板通訊（如果遠端託管）。

You can check if Docker is correctly installed by running `docker compose version` in your terminal.

您可以透過在終端機中運行`docker compose version`來檢查 Docker 是否已正確安裝。

---

##### [4\. Development Requirements (Optional)](#p-002)｜[4. 開發要求（可選）](#p-002)

If you plan to contribute to Portabase or build it from source, you will need the following tools:

如果您打算為 Portabase 做出貢獻或從原始程式碼建置它，您將需要以下工具：

###### [Agent (Rust)](#p-002)｜[Agent (Rust)](#p-002)

The agent is built with Rust for performance and safety.

為了保證效能和安全性，該代理程式使用 Rust 語言編寫。

-   **Rust**: Version 1.75+ (latest stable recommended).  
    **Rust**：版本1.75 +（建議使用最新穩定版）。
-   **Package manager**: `cargo`, included with the Rust toolchain.  
    **套件管理器**： `cargo` ，包含在 Rust 工具鏈中。

###### [CLI (Python)](#p-002)｜[CLI (Python)](#p-002)

The CLI is written in Python with Typer.

CLI是用Python和Typer寫的。

-   **Python**: Version 3.12+.  
    **Python**：版本3.12 +。
-   **Package manager**: `uv`  
    **軟體套件管理器**： `uv`

###### [Dashboard (TypeScript)](#p-002)｜[儀錶板（TypeScript）](#p-002)

The dashboard is a modern web application built with Next.js and React.

該儀錶板是一個使用 Next.js 和 React 建立的現代化 Web 應用程式。

-   **Node.js**: Version 20+.  
    **Node.js**：版本 20+。
-   **Package manager**: `pnpm` Version 9+.  
    **軟體套件管理器**: `pnpm`版本 9+。

Last updated on

最後更新於

[

Introduction

介紹

Portabase is the 100% open source and self-hosted solution to centralize, secure, and automate your database backups.

Portabase 是一個 100% 開源且可自行託管的解決方案，用於集中管理、保護資料庫備份並實現自動化。

](https://portabase.io/docs)[

Overview

概述

Choose how you want to deploy the Portabase Dashboard and Agent.

選擇您希望如何部署 Portabase 控制面板和代理程式。

](https://portabase.io/docs/installation)

---

<a id="c-3"></a>

#### Installation｜安裝

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-003"></a>

##### Overview｜概述

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/installation>

Installation

安裝


Choose how you want to deploy the Portabase Dashboard and Agent.

選擇您希望如何部署 Portabase 控制面板和代理程式。

Portabase ships as two components, and both are installed from this section:

Portabase 由兩個元件組成，這兩個元件均可從此部分安裝：

-   The **Dashboard** - the control plane. Install it once, wherever you want to manage things from.  
    **控制面板**－控制平台。只需安裝一次，即可在任何您想管理的地方進行管理。
-   The **Agent** - the connector. Install one on each server that holds databases to back up.  
    **代理程式**——連接器。在每台存放待備份資料庫的伺服器上安裝一個。

Start with the Dashboard, then install your first Agent. Every page below covers both, in a **Dashboard** and an **Agent** tab.

從儀表板開始，然後安裝您的第一個代理程式。下面的每一頁都涵蓋了兩者，在**儀表板**和**代理**選項卡中。

Check the [Requirements](#p-002) before you start.

開始之前，請先查看[要求](#p-002) 。

---

###### [Choose a method](#p-003)｜[選擇方法](#p-003)

| Method<br>方法 | Best for<br>最佳用途 | Internal database<br>內部資料庫 | Support<br>支援 | Status<br>狀態 |
| --- | --- | --- | --- | --- |
| [**CLI**](#p-004)<br>[**CLI**](#p-004) | Getting started, and the fastest path on a plain server<br>入門指南，以及在普通伺服器上的最快路徑 | \- | Official<br>官方 | ✅ Tested<br>✅ 已測試 |
| [**Docker**](#p-005)<br>[**Docker**](#p-005) | Manual control, GitOps, existing Docker hosts<br>手動控制、GitOps、現有 Docker 主機 | Bundled or external<br>內建或外部 | Official<br>官方 | ✅ Tested<br>✅ 已測試 |
| [**Kubernetes**](#p-006)<br>[**Kubernetes**](#p-006) | Existing clusters, Helm-based workflows<br>現有集群，基於 Helm 的工作流程 | Bundled or external<br>內建或外部 | Official<br>官方 | ✅ Tested<br>✅ 已測試 |
| [**Coolify**](#p-007)<br>[**Coolify**](#p-007) | Self-hosted PaaS users who want a one-click deploy<br>為希望一鍵部署的自架 PaaS 用戶提供服務 | Managed by Coolify<br>由 Coolify 管理 | Official<br>官方 | ✅ Tested<br>✅ 已測試 |
| [**Dokploy**](#p-008)<br>[**Dokploy**](#p-008) | Self-hosted PaaS users who want a one-click deploy<br>為希望一鍵部署的自架 PaaS 用戶提供服務 | Managed by Dokploy<br>由 Dokploy 管理 | Official<br>官方 | ✅ Tested<br>✅ 已測試 |
| [**Unraid**](#p-009)<br>[**Unraid**](#p-009) | Unraid servers, install from Community Applications<br>Unraid 伺服器，從社群應用程式安裝 | External (PostgreSQL 17)<br>外部（PostgreSQL 17） | Official<br>官方 | ✅ Tested<br>✅ 已測試 |
| [**Proxmox VE**](#p-010)<br>[**Proxmox VE**](#p-010) | Proxmox hosts, LXC via the community helper script<br>Proxmox 主機， LXC透過社群助理腳本安裝 | Installed in the LXC<br>安裝在LXC | ⚠️ Unofficial<br>⚠️ 非官方 | ❌ Not tested<br>❌ 未經測試 |

**Support** - *Official* methods are published and maintained by the Portabase team. *Unofficial* ones are maintained by a third party; we do not control what they install or when they change.

**支援** - *官方*方法由Portabase團隊發布和維護。 *非官方*方法由第三方維護；我們無法控制他們安裝的內容或何時更改。

**Status** - *Tested* means we run the method ourselves before each release. *Not tested* means we have not verified it.

**狀態** - *已測試* 表示我們在每次發布前都會自行執行此方法。 *未測試* 表示我們尚未驗證方法。

If you have no strong preference, use the **CLI**. It generates the encryption secret and starts the containers for you.

如果您沒有特別偏好，請使用 **CLI**。它會產生加密金鑰並為您啟動容器。

[

**CLI**

One command to create and start the Dashboard or an Agent. Recommended.

一條指令即可建立並啟動儀錶板或代理程式。推薦使用。

](https://portabase.io/docs/installation/cli)[

**Docker**

Docker Run for a quick test, Docker Compose for production.

使用 Docker Run 進行快速測試，使用 Docker Compose 進行生產環境部署。

](https://portabase.io/docs/installation/docker)[

**Kubernetes**

Install the Helm chart from the OCI registry.

從OCI註冊表安裝Helm圖表。

](https://portabase.io/docs/installation/kubernetes)[

**Coolify｜酷樂**

Deploy the Dashboard from the Coolify service catalogue.

從 Coolify 服務目錄部署儀錶板。

](https://portabase.io/docs/installation/coolify)[

**Dokploy｜Docploy**

Deploy the Dashboard from the Dokploy template catalogue.

從 Dokploy 範本目錄部署儀表板。

](https://portabase.io/docs/installation/dokploy)[

**Unraid｜榮譽**

Install the Dashboard from the Community Applications catalogue.

從社區應用目錄安裝控制面板。

](https://portabase.io/docs/installation/unraid)[

**Proxmox VE**

Community helper script that builds a Debian LXC. Unofficial, untested.

用於建立 Debian LXC的社區輔助腳本。非官方，未經測試。

](https://portabase.io/docs/installation/proxmox)

---

###### [Agent coverage](#p-003)｜[代理商覆蓋範圍](#p-003)

The Agent runs next to your databases, so it is installed directly on the host rather than through a PaaS or a cluster.

代理程式與您的資料庫並行運行，因此它是直接安裝在主機上的，而不是透過 PaaS 或叢集安裝的。

| Method<br>方法 | Dashboard<br>控制面板 | Agent<br>代理 |
| --- | --- | --- |
| CLI | ✅ | ✅ |
| Docker | ✅ | ✅ |
| Kubernetes | ✅ | ❌ - use [Docker](#p-005)<br>❌ - 使用 [Docker](#p-005) |
| Coolify | ✅ | ❌ - use [CLI](#p-004) or [Docker](#p-005)<br>❌ - 使用 [CLI](#p-004)或 [Docker](#p-005) |
| Dokploy | ✅ | ❌ - use [CLI](#p-004) or [Docker](#p-005)<br>❌ - 使用 [CLI](#p-004)或 [Docker](#p-005) |
| Unraid | ✅ | ❌ - use [Docker](#p-005)<br>❌ - 使用 [Docker](#p-005) |
| Proxmox VE | ✅ | ❌ - use [CLI](#p-004) or [Docker](#p-005)<br>❌ - 使用 [CLI](#p-004)或 [Docker](#p-005) |

---

###### [After installing](#p-003)｜[安裝後](#p-003)

Once the Dashboard is up, continue with:

儀錶板啟動後，繼續執行以下操作：

-   [Environment variables](#p-012) - external database, mail, storage limits.  
    [環境變數](#p-012) - 外部資料庫、郵件、儲存限制。
-   [Reverse proxy](#p-013) - put it behind a domain with HTTPS.  
    [反向代理](#p-013) - 將其放在有HTTPS的域後面。
-   [Authentication](#p-014) - OAuth2 and OIDC providers.  
    [驗證](#p-014) - OAuth2 和OIDC提供程序。
-   [Getting started](#p-011) - create your first agent and backup.  
    [入門指南](#p-011) - 建立您的第一個代理程式和備份。

Last updated on

最後更新於

[

Requirements

要求

System requirements to run Portabase.

運行 Portabase 的系統需求。

](https://portabase.io/docs/requirements)[

CLI

Install the Portabase Dashboard and Agent with the Portabase CLI.

使用 Portabase CLI安裝 Portabase 控制面板和代理程式。

](https://portabase.io/docs/installation/cli)

---

<a id="p-004"></a>

##### CLI

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/installation/cli>

Installation

安裝


Install the Portabase Dashboard and Agent with the Portabase CLI.

使用 Portabase CLI安裝 Portabase 控制面板和代理程式。

The CLI is the recommended way to install Portabase. It generates the configuration and the encryption secret (`PROJECT_SECRET`), and starts the containers for you.

CLI是安裝 Portabase 的建議方法。它會產生配置和加密金鑰 ( `PROJECT_SECRET` )，並為您啟動容器。

Install the CLI first. If it isn't installed yet, follow the instructions [here](#p-089).

首先安裝CLI 。如果尚未安裝，請按照[此處](#p-089)說明進行操作。

Breaking changes in recent CLI versions

近期CLI版本中的重大變更

This guide uses the current syntax: `portabase dashboard create` and `portabase agent create`. With the **CLI 26.08.12 or earlier**, the commands were `portabase dashboard <name>` and `portabase agent <name>` — see the [legacy reference](#p-104). Upgrading an existing installation? Read the [migration guide](#p-103) first.

本指南使用目前語法： `portabase dashboard create`和`portabase agent create` 。對於 **CLI 26.08.12或更早版本**，指令為`portabase dashboard <name>`和`portabase agent <name>` — 請參閱[舊版參考](#p-104) 。要升級現有安裝？請先閱讀[遷移指南](#p-103) 。

---

###### [Quick install](#p-004)｜[快速安裝](#p-004)

```
portabase dashboard create my-dashboard --start
portabase agent create my-agent
portabase agent db add my-agent
portabase start my-agent
```

Open `http://localhost:8887` to reach the dashboard. The agent needs an Edge Key created in the dashboard.

打開`http://localhost:8887`即可進入控制面板。代理程式需要已在控制面板中建立的Edge金鑰。

###### [Step-by-step](#p-004)｜[逐步指南](#p-004)

-   [Set up a dashboard](#p-092)  
    [設定儀錶板](#p-092)
-   [Set up an agent](#p-091)  
    [設定代理](#p-091)

---

###### [Next steps](#p-004)｜[後續步驟](#p-004)

-   [CLI commands](#p-095) for every command and option.  
    [CLI指令](#p-095)每個指令和選項。
-   [Environment variables](#p-012) for the Dashboard, or [Agent environment](#p-076).  
    [環境變數](#p-012)用於儀表板，或 [代理環境](#p-076) 。
-   [Reverse proxy](#p-013) to expose the Dashboard behind a domain.  
    [反向代理](#p-013)將 Dashboard 暴露在域後面。
-   [Getting started](#p-011) to create your first backup.  
    [入門指南](#p-011)建立您的第一個備份。

Last updated on

最後更新於

[

Overview

概述

Choose how you want to deploy the Portabase Dashboard and Agent.

選擇您希望如何部署 Portabase 控制面板和代理程式。

](https://portabase.io/docs/installation)[

Docker

Deploy the Portabase Dashboard and Agent with Docker Run or Docker Compose.

使用 Docker Run 或 Docker Compose 部署 Portabase Dashboard 和 Agent。

](https://portabase.io/docs/installation/docker)

---

<a id="p-005"></a>

##### Docker

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/installation/docker>

Installation

安裝


Deploy the Portabase Dashboard and Agent with Docker Run or Docker Compose.

使用 Docker Run 或 Docker Compose 部署 Portabase Dashboard 和 Agent。

Deploy Portabase yourself, without the CLI. Use **Docker Run** for a quick test and **Docker Compose** for anything you intend to keep.

無需使用CLI ，即可自行部署 Portabase。使用 **Docker Run**進行快速測試，使用**Docker Compose** 進行任何需要保留的內容的部署。

Make sure the Docker engine is already installed on the host.

請確保主機上已安裝 Docker 引擎。

---

**Dashboard**

**儀表板**

###### [Docker Run](#p-005)｜[Docker 運行](#p-005)

Recommended for testing only, not for production: this uses the bundled internal database.

僅建議用於測試，不建議用於生產環境：此版本使用捆綁的內部資料庫。

**[Environment variables](#p-005)｜[環境變數](#p-005)**

Create the `.env` file. **Warning**, you must generate passwords and secrets yourself.

建立`.env`檔案。 **警告**，您必須自行產生密碼和金鑰。

```title=".env"
# --- App Configuration ---
PROJECT_URL=http://localhost:8887

# ⚠️ GENERATE A STRONG SECRET (e.g., openssl rand -hex 32)
# This secret is used to encrypt communications with agents.
PROJECT_SECRET=change_me_please_generate_a_secure_hex_token
```

**[Start the Dashboard](#p-005)｜[啟動儀錶板](#p-005)**

```bash
docker run -d \
    --name portabase-app-prod \
    -p 8887:80 \
    --restart unless-stopped \
    -e TZ="Europe/Paris" \
    --env-file .env \
    -v ./portabase-data:/data \
    portabase/portabase:latest
```

**[Access the interface](#p-005)｜[訪問介面](#p-005)**

Open your browser: **[http://localhost:8887](http://localhost:8887/)** (or the chosen port).

開啟瀏覽器：**[http://localhost:8887](http://localhost:8887/)**（或所選連接埠）。

###### [Docker Compose](#p-005)｜[Docker Compose](#p-005)

Recommended for production and GitOps workflows: the Dashboard runs alongside a dedicated PostgreSQL container.

推薦用於生產環境和 GitOps 工作流程：此儀錶板與專用的 PostgreSQL 容器一起運作。

**[File structure](#p-005)｜[文件結構](#p-005)**

Create a folder and place two files in it: `docker-compose.yml` and `.env`.

建立一個資料夾，並在其中放入兩個檔案： `docker-compose.yml`和`.env` 。

```bash
mkdir portabase-dashboard && cd portabase-dashboard
```

**[Docker configuration](#p-005)｜[Docker 配置](#p-005)**

```title="docker-compose.yml"
name: portabase-dashboard

services:
  portabase:
    container_name: portabase-app
    image: portabase/portabase:latest
    restart: always
    env_file: .env
    environment:
      - TZ=Europe/Paris
    ports:
      - "8887:80"
    volumes:
      - portabase-data:/data
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
        test: ["CMD-SHELL", "curl -f http://localhost/api/health"]
        interval: 30s
        timeout: 5s
        retries: 3
        start_period: 60s

  db:
    container_name: portabase-pg
    image: postgres:17-alpine
    restart: always
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres-data:
  portabase-data:
```

**[Environment variables](#p-005)｜[環境變數](#p-005)**

Create the `.env` file. **Warning**, you must generate passwords and secrets yourself.

建立`.env`檔案。 **警告**，您必須自行產生密碼和金鑰。

```title=".env"
# --- App Configuration ---
PROJECT_URL=http://localhost:8887

# ⚠️ GENERATE A STRONG SECRET (e.g., openssl rand -hex 32)
# This secret is used to encrypt communications with agents.
PROJECT_SECRET=change_me_please_generate_a_secure_hex_token

# --- Database URL ---
POSTGRES_USER=portabase
POSTGRES_PASSWORD=changeme
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_DB=portabase

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public
```

**[Startup](#p-005)｜[新創公司](#p-005)**

```bash
docker compose up -d
```

**[Access the interface](#p-005)｜[訪問介面](#p-005)**

Open your browser: **[http://localhost:8887](http://localhost:8887/)** (or the chosen port).

開啟瀏覽器：**[http://localhost:8887](http://localhost:8887/)**（或所選連接埠）。

**Agent**

**代理人**

---

###### [Next steps](#p-005)｜[後續步驟](#p-005)

-   [Environment variables](#p-012) for the Dashboard, or [Agent environment](#p-076).  
    [環境變數](#p-012)用於儀表板，或 [代理環境](#p-076) 。
-   [Reverse proxy](#p-013) to expose the Dashboard behind a domain.  
    [反向代理](#p-013)將 Dashboard 暴露在域後面。
-   [Getting started](#p-011) to create your first backup.  
    [入門指南](#p-011)建立您的第一個備份。

Last updated on

最後更新於

[

CLI

Install the Portabase Dashboard and Agent with the Portabase CLI.

使用 Portabase CLI安裝 Portabase 控制面板和代理程式。

](https://portabase.io/docs/installation/cli)[

Kubernetes

Deploy the Portabase Dashboard on Kubernetes with the official Helm chart.

使用官方 Helm chart 在 Kubernetes 上部署 Portabase Dashboard。

](https://portabase.io/docs/installation/kubernetes)

---

<a id="p-006"></a>

##### Kubernetes

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/installation/kubernetes>

Installation

安裝


Deploy the Portabase Dashboard on Kubernetes with the official Helm chart.

使用官方 Helm chart 在 Kubernetes 上部署 Portabase Dashboard。

For Kubernetes deployments, install the Dashboard directly from the OCI registry with Helm.

對於 Kubernetes 部署，請使用 Helm 從OCI註冊表直接安裝 Dashboard。

Requires a working cluster, `kubectl` configured against it, and Helm 3.8+ (OCI support).

需要一個正在運行的集群， `kubectl`已針對該集群配置，以及 Helm 3.8 +（ OCI支援）。

---

**Dashboard**

**儀表板**

###### [With ClusterIP + port-forward (for development/testing)](#p-006)｜[使用集群IP + 連接埠轉送（用於開發/測試）](#p-006)

```bash
helm install portabase oci://ghcr.io/portabase/charts/portabase \
-n portabase --create-namespace \
--set project.secret=$(openssl rand -hex 32)
```

```bash
kubectl port-forward svc/portabase 8887:80 -n portabase
# Access at http://localhost:8887
```

###### [With LoadBalancer (for cloud environments)](#p-006)｜[使用負載平衡器（適用於雲端環境）](#p-006)

```bash
helm install portabase oci://ghcr.io/portabase/charts/portabase \
-n portabase --create-namespace \
--set service.type=LoadBalancer \
--set project.secret=$(openssl rand -hex 32)
```

```bash
kubectl get svc portabase -n portabase
# Access at http://<EXTERNAL-IP>:8887
```

###### [With Ingress (domain-based access)](#p-006)｜[使用 Ingress（基於網域的存取）](#p-006)

```bash
helm install portabase oci://ghcr.io/portabase/charts/portabase \
-n portabase --create-namespace \
--set ingress.enabled=true \
--set ingress.hosts[0].host=portabase.example.com \
--set project.secret=$(openssl rand -hex 32)
```

**Agent**

**代理人**

---

###### [Next steps](#p-006)｜[後續步驟](#p-006)

-   [Environment variables](#p-012) - point the Dashboard at an external PostgreSQL.  
    [環境變數](#p-012) - 將儀表板指向外部 PostgreSQL。
-   [Authentication](#p-014) - OAuth2 and OIDC providers.  
    [驗證](#p-014) - OAuth2 和OIDC提供程序。
-   [Getting started](#p-011) - create your first backup.  
    [入門指南](#p-011) - 建立您的第一個備份。

Last updated on

最後更新於

[

Docker

Deploy the Portabase Dashboard and Agent with Docker Run or Docker Compose.

使用 Docker Run 或 Docker Compose 部署 Portabase Dashboard 和 Agent。

](https://portabase.io/docs/installation/docker)[

Coolify

酷樂

Deploy Portabase on Coolify in one click and automate backups of the PostgreSQL, MySQL, MariaDB, MongoDB and Redis databases your Coolify instance manages.

只需按一下即可在 Coolify 上部署 Portabase，並自動備份 Coolify 實例管理的 PostgreSQL、MySQL、MariaDB、MongoDB 和 Redis 資料庫。

](https://portabase.io/docs/installation/coolify)

---

<a id="p-007"></a>

##### Coolify｜酷樂

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/installation/coolify>

Installation

安裝


Deploy Portabase on Coolify in one click and automate backups of the PostgreSQL, MySQL, MariaDB, MongoDB and Redis databases your Coolify instance manages.

只需按一下即可在 Coolify 上部署 Portabase，並自動備份 Coolify 實例管理的 PostgreSQL、MySQL、MariaDB、MongoDB 和 Redis 資料庫。

[Coolify](https://coolify.io/) is an open-source, self-hosted PaaS - a Heroku/Netlify/Vercel alternative you run on your own servers. Portabase is published in its **service catalogue**, so the Dashboard and its PostgreSQL database deploy together in a few clicks, with no `docker-compose.yml` to write.

[Coolify](https://coolify.io/)是一個開源的、可自行託管的 PaaS 平台，是 Heroku/Netlify/Vercel 的替代方案，您可以將其運行在自己的伺服器上。 Portabase 已發佈在其**服務目錄**中，因此只需點擊幾下即可同時部署控制面板及其 PostgreSQL 資料庫，無需編寫任何`docker-compose.yml` 。

Useful links: [Coolify website](https://coolify.io/) · [Coolify documentation](https://coolify.io/docs) · [Coolify on GitHub](https://github.com/coollabsio/coolify)

實用連結：[Coolify 網址](https://coolify.io/) · [Coolify 文件](https://coolify.io/docs) · [Coolify GitHub 專案](https://github.com/coollabsio/coolify)

You need a working Coolify instance with at least one server connected, and a domain pointing at it if you want HTTPS. See the [requirements](#p-002) for the rest.

如果您想要HTTPS則需要一個可正常運作的 Coolify 實例，其中至少連接了一個伺服器，並且需要一個指向該實例的網域名稱。其餘要求，請參閱[要求](#p-002) 。

---

###### [Installation](#p-007)｜[安裝](#p-007)

**Dashboard**

**儀表板**

**[Create the resource](#p-007)｜[創建資源](#p-007)**

In your Coolify dashboard, open the project and environment you want to deploy into, then click **\+ New** and pick the **Service** tab.

在 Coolify 控制面板中，開啟要部署到的專案和環境，然後按一下 **\+ 新建**並選擇**服務** 標籤。

**[Pick Portabase from the catalogue](#p-007)｜[從目錄中選擇 Portabase](#p-007)**

Search for **Portabase** in the list of one-click services and select it.

在一鍵服務清單中搜尋 **Portabase** 並選擇它。

Coolify creates the Portabase container together with its PostgreSQL database, and pre-fills the generated values (database credentials, `PROJECT_SECRET`).

Coolify 建立 Portabase 容器及其 ​​PostgreSQL 資料庫，並預先填入產生的值（資料庫憑證， `PROJECT_SECRET` ）。

**[Set the domain](#p-007)｜[設定網域名稱](#p-007)**

Open the service settings and set the **Domain** (FQDN) of the Portabase container, for example `https://portabase.example.com`. Coolify handles the reverse proxy and the TLS certificate, so you do not need our own [reverse proxy guide](#p-013) here.

開啟服務設置，設定 Portabase 容器的**域名**（ FQDN ），例如`https://portabase.example.com`會處理反向代理程式和TLS證書，因此您不需要我們自己的[反向代理指南](#p-013) 。

Make sure the `PROJECT_URL` environment variable matches that exact public URL, scheme included. Agents use it to reach the Dashboard.

請確保環境變數`PROJECT_URL`公共環境變數URL完全匹配，包括方案。代理程式使用它來存取控制面板。

**[Review the secret](#p-007)｜[揭秘](#p-007)**

`PROJECT_SECRET` encrypts everything the agents exchange with the Dashboard, and the credentials stored in it. Keep it backed up, and **never change it once agents are connected** - previously encrypted data would no longer be readable.

`PROJECT_SECRET`會對代理與控制面板交換的所有內容以及儲存在控制面板中的憑證進行加密。請務必備份，並且**代理連接後切勿更改**——先前加密的資料將無法讀取。

If it wasn't generated for you, set it to a strong random value:

如果該值不是自動產生的，請將其設定為強隨機值：

```
openssl rand -hex 32
```

The full list of what you can tune is on the [environment variables](#p-012) page.

您可以調整的所有設定的完整清單位於 [環境變數](#p-012)頁面上。

**[Deploy](#p-007)｜[部署](#p-007)**

Click **Deploy** and wait for the container to become healthy, then open your domain and follow [getting started](#p-011).

點擊**部署**並等待容器運作正常，然後打開您的網域並按照[入門](#p-011)進行操作。

**Agent**

**代理人**

---

###### [Backing up Coolify-managed databases](#p-007)｜[備份 Coolify 管理的資料庫](#p-007)

Coolify runs each database as a Docker container on its own Docker network. For the Portabase Agent to reach them, connect the agent container to that network as well:

Coolify 將每個資料庫作為 Docker 容器運行在獨立的 Docker 網路上。為了讓 Portabase Agent 能夠存取這些資料庫，也需要將 Agent 容器連接到該網路：

```bash
# List the networks Coolify created, then attach the agent to the right one
docker network ls
docker network connect <coolify-network> portabase-agent
```

Then declare the database in the Dashboard using the **container name** as the host, and its normal port. Databases running on the host rather than in a container are reachable through the `extra_hosts` mapping already present in the [agent compose file](#p-005).

然後，在控制面板中使用**容器名稱**作為主機，並指定其正常連接埠來聲明資料庫。運行在主機上而不是容器中的資料庫可以透過[代理設定檔](#p-005)中已存在的`extra_hosts`映射來存取。

Per-engine settings - required grants, dump options, restore behaviour - are documented in the [databases section](#p-077).

每個引擎的設定（所需授權、轉儲選項、復原行為）均記錄在 [資料庫部分](#p-077)中。

---

###### [Troubleshooting](#p-007)｜[故障排除](#p-007)

-   **The agent shows as offline.** Check that `PROJECT_URL` is the public HTTPS URL of the Dashboard, not an internal container name, then review the [agent configuration](#p-075).  
    **代理顯示為離線。** 檢查`PROJECT_URL`是否為控制面板的公共HTTPS URL ，而不是內部容器名稱，然後查看 [代理配置](#p-075) 。
-   **The agent cannot reach a database.** It is almost always a Docker network issue - see the section above.  
    **代理無法連線到資料庫。** 這幾乎總是 Docker 網路問題——請參閱上文。
-   **You changed `PROJECT_SECRET`.** Existing encrypted data cannot be recovered. Restore the previous value.  
    **您更改了`PROJECT_SECRET`。**現有的加密資料無法復原。恢復之前的值。

More answers in the [FAQ](#p-106).

更多答案在 [FAQ](#p-106) 。

---

###### [Related pages](#p-007)｜[相關頁面](#p-007)

[

**Dokploy｜Docploy**

The same one-click deploy, on the Dokploy PaaS.

在 Dokploy PaaS 上實現同樣的一鍵部署。

](https://portabase.io/docs/installation/dokploy)[

**Docker**

Install the Agent next to your databases with Docker Compose.

使用 Docker Compose 將代理程式安裝到資料庫旁邊。

](https://portabase.io/docs/installation/docker)[

**Authentication｜驗證**

Add OAuth2 or OIDC providers in front of your Dashboard.

在您的控制面板前面新增 OAuth2 或OIDC提供者。

](https://portabase.io/docs/dashboard/configuration/auth/configuration)[

**Databases｜資料庫**

Per-engine configuration for every database Portabase supports.

Portabase 支援的每個資料庫的引擎級配置。

](https://portabase.io/docs/agent/db)

Last updated on

最後更新於

[

Kubernetes

Deploy the Portabase Dashboard on Kubernetes with the official Helm chart.

使用官方 Helm chart 在 Kubernetes 上部署 Portabase Dashboard。

](https://portabase.io/docs/installation/kubernetes)[

Dokploy

Docploy

Deploy Portabase on Dokploy in one click and automate backups of the PostgreSQL, MySQL, MariaDB, MongoDB and Redis databases your Dokploy instance manages.

一鍵在 Dokploy 上部署 Portabase，並自動備份 Dokploy 執行個體管理的 PostgreSQL、MySQL、MariaDB、MongoDB 和 Redis 資料庫。

](https://portabase.io/docs/installation/dokploy)

---

<a id="p-008"></a>

##### Dokploy｜Docploy

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/installation/dokploy>

Installation

安裝


Deploy Portabase on Dokploy in one click and automate backups of the PostgreSQL, MySQL, MariaDB, MongoDB and Redis databases your Dokploy instance manages.

一鍵在 Dokploy 上部署 Portabase，並自動備份 Dokploy 執行個體管理的 PostgreSQL、MySQL、MariaDB、MongoDB 和 Redis 資料庫。

[Dokploy](https://dokploy.com/) is an open-source, self-hosted PaaS built on Docker and Traefik - a Vercel/Netlify/Heroku alternative for your own servers. Portabase is published in its **template catalogue**, so the Dashboard and its PostgreSQL database deploy together in a few clicks, with no `docker-compose.yml` to write.

[Dokploy](https://dokploy.com/)是一個基於 Docker 和 Traefik 構建的開源自託管 PaaS 平台，是 Vercel/Netlify/Heroku 等其他伺服器解決方案。 Portabase 已發佈在其**模板目錄**中，因此只需點擊幾下即可同時部署控制面板及其 PostgreSQL 資料庫，無需編寫`docker-compose.yml` 。

Useful links: [Dokploy website](https://dokploy.com/) · [Dokploy documentation](https://docs.dokploy.com/) · [Dokploy on GitHub](https://github.com/Dokploy/dokploy)

實用連結：[Dokploy 網站](https://dokploy.com/) · [Dokploy 文件](https://docs.dokploy.com/) · [Dokploy GitHub 倉庫](https://github.com/Dokploy/dokploy)

You need a working Dokploy instance, and a domain pointing at it if you want HTTPS. See the [requirements](#p-002) for the rest.

如果您需要HTTPS ，則需要一個可正常運作的 Dokploy 實例和指向該實例的網域。其餘內容，請參閱[要求](#p-002) 。

---

###### [Installation](#p-008)｜[安裝](#p-008)

**Dashboard**

**儀表板**

**[Create the service](#p-008)｜[創建服務](#p-008)**

Open the project you want to deploy into, click **Create Service** and choose **Template**.

開啟要部署到的項目，點選**建立服務**，然後選擇**範本**。

**[Pick Portabase from the catalogue](#p-008)｜[從目錄中選擇 Portabase](#p-008)**

Search for **Portabase** in the template list and create it.

在模板清單中搜尋**Portabase**並建立它。

Dokploy provisions the Portabase container together with its PostgreSQL database, and pre-fills the generated values (database credentials, `PROJECT_SECRET`).

Dokploy 會設定 Portabase 容器及其 ​​PostgreSQL 資料庫，並預先填入產生的值（資料庫憑證， `PROJECT_SECRET` ）。

**[Set the domain](#p-008)｜[設定網域名稱](#p-008)**

In the service's **Domains** tab, add the public host of the Portabase container, for example `portabase.example.com`, targeting port **80**. Enable HTTPS so Dokploy issues the certificate through Traefik - our own [reverse proxy guide](#p-013) is not needed here.

在服務的**網域名稱**標籤中，新增 Portabase 容器的公共主機，例如`portabase.example.com` ，目標連接埠為**80**。啟用HTTPS ，以便 Dokploy 透過 Traefik 頒發憑證 - 這裡不需要我們自己的[反向代理指南](#p-013) 。

Make sure the `PROJECT_URL` environment variable matches that exact public URL, scheme included. Agents use it to reach the Dashboard.

請確保環境變數`PROJECT_URL`公共環境變數URL完全匹配，包括方案。代理程式使用它來存取控制面板。

**[Review the secret](#p-008)｜[揭秘](#p-008)**

`PROJECT_SECRET` encrypts everything the agents exchange with the Dashboard, and the credentials stored in it. Keep it backed up, and **never change it once agents are connected** - previously encrypted data would no longer be readable.

`PROJECT_SECRET`會對代理與控制面板交換的所有內容以及儲存在控制面板中的憑證進行加密。請務必備份，並且**代理連接後切勿更改**——先前加密的資料將無法讀取。

If it wasn't generated for you, set it to a strong random value:

如果該值不是自動產生的，請將其設定為強隨機值：

```
openssl rand -hex 32
```

The full list of what you can tune is on the [environment variables](#p-012) page.

您可以調整的所有設定的完整清單位於 [環境變數](#p-012)頁面上。

**[Deploy](#p-008)｜[部署](#p-008)**

Click **Deploy** and wait for the container to become healthy, then open your domain and follow [getting started](#p-011).

點擊**部署**並等待容器運作正常，然後打開您的網域並按照[入門](#p-011)進行操作。

**Agent**

**代理人**

---

###### [Backing up Dokploy-managed databases](#p-008)｜[備份 Dokploy 管理的資料庫](#p-008)

Dokploy runs each database as a Docker container on its own Docker network. For the Portabase Agent to reach them, connect the agent container to that network as well:

Dokploy 將每個資料庫作為 Docker 容器運行在各自的 Docker 網路上。為了讓 Portabase Agent 能夠存取這些資料庫，也需要將 Agent 容器連接到該網路：

```bash
# List the networks Dokploy created, then attach the agent to the right one
docker network ls
docker network connect <dokploy-network> portabase-agent
```

Then declare the database in the Dashboard using the **container name** as the host, and its normal port. Databases running on the host rather than in a container are reachable through the `extra_hosts` mapping already present in the [agent compose file](#p-005).

然後，在控制面板中使用**容器名稱**作為主機，並指定其正常連接埠來聲明資料庫。運行在主機上而不是容器中的資料庫可以透過[代理設定檔](#p-005)中已存在的`extra_hosts`映射來存取。

Per-engine settings - required grants, dump options, restore behaviour - are documented in the [databases section](#p-077).

每個引擎的設定（所需授權、轉儲選項、復原行為）均記錄在 [資料庫部分](#p-077)中。

---

###### [Troubleshooting](#p-008)｜[故障排除](#p-008)

-   **The agent shows as offline.** Check that `PROJECT_URL` is the public HTTPS URL of the Dashboard, not an internal container name, then review the [agent configuration](#p-075).  
    **代理顯示為離線。** 檢查`PROJECT_URL`是否為控制面板的公共HTTPS URL ，而不是內部容器名稱，然後查看 [代理配置](#p-075) 。
-   **The agent cannot reach a database.** It is almost always a Docker network issue - see the section above.  
    **代理無法連線到資料庫。** 這幾乎總是 Docker 網路問題——請參閱上文。
-   **You changed `PROJECT_SECRET`.** Existing encrypted data cannot be recovered. Restore the previous value.  
    **您更改了`PROJECT_SECRET`。**現有的加密資料無法復原。恢復之前的值。

More answers in the [FAQ](#p-106).

更多答案在 [FAQ](#p-106) 。

---

###### [Related pages](#p-008)｜[相關頁面](#p-008)

[

**Coolify｜酷樂**

The same one-click deploy, on the Coolify PaaS.

在 Coolify PaaS 上也能實現相同的一鍵部署。

](https://portabase.io/docs/installation/coolify)[

**Docker**

Install the Agent next to your databases with Docker Compose.

使用 Docker Compose 將代理程式安裝到資料庫旁邊。

](https://portabase.io/docs/installation/docker)[

**Authentication｜驗證**

Add OAuth2 or OIDC providers in front of your Dashboard.

在您的控制面板前面新增 OAuth2 或OIDC提供者。

](https://portabase.io/docs/dashboard/configuration/auth/configuration)[

**Databases｜資料庫**

Per-engine configuration for every database Portabase supports.

Portabase 支援的每個資料庫的引擎級配置。

](https://portabase.io/docs/agent/db)

Last updated on

最後更新於

[

Coolify

酷樂

Deploy Portabase on Coolify in one click and automate backups of the PostgreSQL, MySQL, MariaDB, MongoDB and Redis databases your Coolify instance manages.

只需按一下即可在 Coolify 上部署 Portabase，並自動備份 Coolify 實例管理的 PostgreSQL、MySQL、MariaDB、MongoDB 和 Redis 資料庫。

](https://portabase.io/docs/installation/coolify)[

Unraid

榮譽

Install the Portabase Dashboard on Unraid from the Community Applications catalogue and back up the databases running on your server.

從社群應用程式目錄在 Unraid 上安裝 Portabase Dashboard，並備份伺服器上執行的資料庫。

](https://portabase.io/docs/installation/unraid)

---

<a id="p-009"></a>

##### Unraid｜榮譽

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/installation/unraid>

Installation

安裝


Install the Portabase Dashboard on Unraid from the Community Applications catalogue and back up the databases running on your server.

從社群應用程式目錄在 Unraid 上安裝 Portabase Dashboard，並備份伺服器上執行的資料庫。

[Unraid](https://unraid.net/) is a NAS operating system with a Docker-based application store. Portabase is published as an **official template** in [Community Applications](https://ca.unraid.net/apps/portabase-dashboard-1sdc97m05ufd7q), so the Dashboard installs from the Apps tab with no `docker-compose.yml` to write.

[Unraid](https://unraid.net/)是一個NAS作業系統，有基於 Docker 的應用程式商店。 Portabase 作為 **官方範本** 發佈在 [社群應用程式](https://ca.unraid.net/apps/portabase-dashboard-1sdc97m05ufd7q)中，因此可以直接從「應用」標籤安裝控制面板，無需`docker-compose.yml`寫入。

Useful links: [Portabase on Community Applications](https://ca.unraid.net/apps/portabase-dashboard-1sdc97m05ufd7q) · [Unraid website](https://unraid.net/) · [Unraid documentation](https://docs.unraid.net/)

實用連結：[Portabase on Community Applications](https://ca.unraid.net/apps/portabase-dashboard-1sdc97m05ufd7q) · [Unraid 網站](https://unraid.net/) · [Unraid 文件](https://docs.unraid.net/)

The template does **not** ship a database. You need a reachable **PostgreSQL 17** instance before you install - either the PostgreSQL container from Community Applications, or an external server. See the [requirements](#p-002) for the rest.

該模板**不**包含資料庫。安裝前，您需要一個可存取的**PostgreSQL 17**實例－可以是來自社群應用程式的PostgreSQL容器，也可以是外部伺服器。更多詳情請參閱[要求](#p-002) 。

---

###### [Installation](#p-009)｜[安裝](#p-009)

**Dashboard**

**儀表板**

**[Install PostgreSQL 17](#p-009)｜[安裝 PostgreSQL 17](#p-009)**

From the **Apps** tab, install a PostgreSQL 17 container and create a database and a user for Portabase. Note the host, port, database name, user and password - you need them in the next step.

在 **Apps** 標籤中，安裝 PostgreSQL 17 容器並為 Portabase 建立資料庫和使用者。記下主機、連接埠、資料庫名稱、使用者和密碼 - 下一步需要它們。

**[Add the Portabase template](#p-009)｜[新增 Portabase 模板](#p-009)**

Still in the **Apps** tab, search for **Portabase**, then select **Portabase-Dashboard** and click **Install**.

仍在**應用**選項卡中，搜尋**Portabase**，然後選擇**Portabase-Dashboard**並點擊**安裝**。

The template uses the official `portabase/portabase:latest` image, in **bridge** network mode.

此模板使用官方的`portabase/portabase:latest`鏡像，採用**橋接**網路模式。

**[Fill in the required variables](#p-009)｜[填入所需變數](#p-009)**

| Field<br>欄位 | Default<br>預設值 | Notes<br>備註 |
| --- | --- | --- |
| WebUI port<br>WebUI 連接埠 | `8887` → container `80`<br>`8887` → 容器`80` | Change the host port if `8887` is taken<br>如果`8887`已被佔用，則更改主機連接埠 |
| `/data` | `/mnt/user/appdata/portabase/dashboard` | Persistent data, keep it on the array<br>持久化數據，保存在數組中 |
| `DATABASE_URL` | \- | `postgresql://user:password@host:5432/portabase` |
| `PROJECT_SECRET` | \- | Strong random hex value, see below<br>強隨機十六進位值，詳見下文 |
| `PROJECT_URL` | \- | The Dashboard URL **as the agents reach it**, e.g. `http://192.168.1.10:8887`<br>控制面板URL **當代理人到達時**，例如`http://192.168.1.10:8887` |
| `AUTH_SIGNUP_ENABLED` | \- | Turn it off once your account exists<br>帳戶登出後請關閉此功能 |
| `AUTH_PASSKEY_ENABLED` | `true` | Passkey authentication<br>通行金鑰認證 |

Optional variables - `PROJECT_NAME`, `AUTH_DEFAULT_USER_NAME`, `AUTH_DEFAULT_USER`, `AUTH_DEFAULT_PASSWORD`, the SMTP settings and `RETENTION_CRON` - are documented on the [environment variables](#p-012) page.

可選變數 - `PROJECT_NAME`, `AUTH_DEFAULT_USER_NAME`, `AUTH_DEFAULT_USER`, `AUTH_DEFAULT_PASSWORD` 、 SMTP設定和`RETENTION_CRON` - 已在 [環境變數](#p-012)頁面上記錄。

**[Generate the secret](#p-009)｜[生成秘密](#p-009)**

`PROJECT_SECRET` encrypts everything the agents exchange with the Dashboard, and the credentials stored in it. Keep it backed up, and **never change it once agents are connected** - previously encrypted data would no longer be readable.

`PROJECT_SECRET`會對代理與控制面板交換的所有內容以及儲存在控制面板中的憑證進行加密。請務必備份，並且**代理連接後切勿更改**——先前加密的資料將無法讀取。

From the Unraid terminal:

來自 Unraid 終端：

```
openssl rand -hex 32
```

**[Apply and open the WebUI](#p-009)｜[應用並開啟 WebUI](#p-009)**

Click **Apply**, wait for the container to start, then open `http://<unraid-ip>:8887` and follow [getting started](#p-011).

點選**套用**，等待容器啟動，然後開啟`http://<unraid-ip>:8887`並依照[入門](#p-011)進行操作。

To expose it on a domain with HTTPS, put it behind a reverse proxy - see the [reverse proxy guide](#p-013) - and set `PROJECT_URL` to that public URL.

要將其暴露在具有HTTPS的域上，請將其放在反向代理後面 - 請參閱 [反向代理指南](#p-013) - 並將`PROJECT_URL`設置為該公共URL 。

**Agent**

**代理人**

---

###### [Backing up databases running on Unraid](#p-009)｜[備份運行在 Unraid 上的資料庫](#p-009)

Unraid runs each database as a Docker container. For the Agent to reach one, both containers need to share a network:

Unraid 將每個資料庫都運行在 Docker 容器中。為了使代理程式能夠存取其中一個資料庫，兩個容器需要共用同一個網路：

```bash
# List the Docker networks, then attach the agent to the right one
docker network ls
docker network connect <network> portabase-agent
```

Then declare the database in the Dashboard using the **container name** as the host, and its normal port. Containers on the default `bridge` network are also reachable at the Unraid IP on their published port.

然後，在控制面板中聲明資料庫，使用**容器名稱**作為主機，並指定其預設連接埠。預設`bridge`網路上的容器也可以透過 Unraid IP伺服器上發布的連接埠存取。

Per-engine settings - required grants, dump options, restore behaviour - are documented in the [databases section](#p-077).

每個引擎的設定（所需授權、轉儲選項、復原行為）均記錄在 [資料庫部分](#p-077)中。

---

###### [Troubleshooting](#p-009)｜[故障排除](#p-009)

-   **The container restarts in a loop.** `DATABASE_URL` is wrong or PostgreSQL is unreachable. Check the container log from the Unraid UI.  
    **容器循環重啟。** `DATABASE_URL` 錯誤或 PostgreSQL 無法存取。從 Unraid UI 檢查容器日誌。
-   **The agent shows as offline.** `PROJECT_URL` must be the URL the agent can actually reach - the Unraid LAN IP, or the public HTTPS URL if you use a reverse proxy. See the [agent configuration](#p-075).  
    **代理顯示為離線。** `PROJECT_URL`必須是代理實際可以存取的URL ——Unraid LAN IP ，或者如果您使用反向代理，則為公共HTTPS URL 。請參閱 [代理配置](#p-075) 。
-   **The agent cannot reach a database.** Almost always a Docker network issue - see the section above.  
    **代理無法連線到資料庫。** 這幾乎總是 Docker 網路問題——請參閱上文。
-   **You changed `PROJECT_SECRET`.** Existing encrypted data cannot be recovered. Restore the previous value.  
    **您更改了`PROJECT_SECRET`。**現有的加密資料無法復原。恢復之前的值。

More answers in the [FAQ](#p-106).

更多答案請參考 [FAQ](#p-106) 。

---

###### [Related pages](#p-009)｜[相關頁](#p-009)

[

**Docker**

Install the Agent next to your databases with Docker Compose.

使用 Docker Compose 將代理程式安裝到資料庫旁邊。

](https://portabase.io/docs/installation/docker)[

**Proxmox VE**

Deploy the Dashboard in an LXC container with the community helper script.

使用社區助手腳本將儀表板部署到LXC容器中。

](https://portabase.io/docs/installation/proxmox)[

**Authentication｜驗證**

Add OAuth2 or OIDC providers in front of your Dashboard.

在您的控制面板前面新增 OAuth2 或OIDC提供者。

](https://portabase.io/docs/dashboard/configuration/auth/configuration)[

**Databases｜資料庫**

Per-engine configuration for every database Portabase supports.

Portabase 支援的每個資料庫的引擎級配置。

](https://portabase.io/docs/agent/db)

Last updated on

最後更新於

[

Dokploy

Docploy

Deploy Portabase on Dokploy in one click and automate backups of the PostgreSQL, MySQL, MariaDB, MongoDB and Redis databases your Dokploy instance manages.

一鍵在 Dokploy 上部署 Portabase，並自動備份 Dokploy 執行個體管理的 PostgreSQL、MySQL、MariaDB、MongoDB 和 Redis 資料庫。

](https://portabase.io/docs/installation/dokploy)[

Proxmox VE

Deploy the Portabase Dashboard in a Proxmox VE LXC container with the community-scripts helper script.

使用 community-scripts 輔助腳本將 Portabase Dashboard 部署到 Proxmox VE LXC容器中。

](https://portabase.io/docs/installation/proxmox)

---

<a id="p-010"></a>

##### Proxmox VE

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/installation/proxmox>

Installation

安裝


Deploy the Portabase Dashboard in a Proxmox VE LXC container with the community-scripts helper script.

使用 community-scripts 輔助腳本將 Portabase Dashboard 部署到 Proxmox VE LXC容器中。

[Proxmox VE](https://www.proxmox.com/en/proxmox-virtual-environment) is an open-source virtualisation platform. The [community-scripts](https://community-scripts.org/) project maintains a helper script that creates a Debian 13 LXC container and installs the Portabase Dashboard in it - PostgreSQL, tusd, nginx and the systemd services included.

[Proxmox VE](https://www.proxmox.com/en/proxmox-virtual-environment)是一個開源虛擬化平台。 [community-scripts](https://community-scripts.org/)專案維護著一個輔助腳本，該腳本創建一個 Debian 13 LXC容器，並在其中安裝 Portabase Dashboard——包括 PostgreSQL、tusd、nginx 和 systemd 服務。

Useful links: [Portabase helper script](https://community-scripts.org/scripts/portabase) · [community-scripts website](https://community-scripts.org/) · [Proxmox VE documentation](https://pve.proxmox.com/pve-docs/)

實用連結：[Portabase 輔助腳本](https://community-scripts.org/scripts/portabase) · [社群腳本網站](https://community-scripts.org/) · [Proxmox VE文件](https://pve.proxmox.com/pve-docs/)

**Unofficial and untested.** This script is maintained by the community-scripts project, not by the Portabase team, and it is currently in their **development** repository - marked as *in active development*, *may be unstable, incomplete, or subject to breaking changes*, and **not recommended for production use**. It is also the only installation method we have not tested ourselves. For a supported deployment, use the [CLI](#p-004) or [Docker](#p-005) instead.

**非官方且未經測試。** 此腳本由 community-scripts 專案維護，而非 Portabase 團隊維護，目前位於其**開發**倉庫中，標記為*正在積極開發中*，*可能不穩定、不完整或存在重大變更*，**不建議用於生產環境**。這也是我們唯一未經測試的安裝方法。如需受支援的部署，請改用 [CLI](#p-004)或 [Docker](#p-005) 。

---

###### [What the script installs](#p-010)｜[腳本安裝的內容](#p-010)

| Item<br>項目 | Value<br>金額 |
| --- | --- |
| Container type<br>容器類型 | Unprivileged LXC<br>非特權LXC |
| OS | Debian 13 |
| Default resources<br>預設資源 | 4 vCPU · 8192 MB RAM · 15 GB disk<br>4 個虛擬 CPU · 8192 MB RAM · 15 GB磁碟 |
| Port<br>連接埠 | `3000` (nginx in front of the app on `127.0.0.1:8887`)<br>`3000` （應用程式前端的 nginx 伺服器位於`127.0.0.1:8887` ） |
| Database<br>資料庫 | PostgreSQL 17, installed inside the container<br>PostgreSQL 17，安裝在容器內 |
| Uploads<br>上傳 | tusd, as the `portabase-tusd` service<br>tusd，作為`portabase-tusd`服務 |
| Config file<br>設定檔 | `/opt/portabase/.env` |
| Services<br>服務 | `portabase`, `portabase-tusd` |

---

###### [Installation](#p-010)｜[安裝](#p-010)

**Dashboard**

**儀表板**

**[Run the script from the Proxmox VE shell](#p-010)｜[從 Proxmox VE shell 運行腳本](#p-010)**

Open the **Shell** of your Proxmox VE node and run:

開啟 Proxmox VE節點的 **Shell** 並執行：

```
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVED/main/ct/portabase.sh)"
```

Always read the script before running it. The current, authoritative command is shown on the [script page](https://community-scripts.org/scripts/portabase) - check it there if the URL above has moved.

運行腳本前務必閱讀腳本。當前權威命令顯示在[腳本頁面](https://community-scripts.org/scripts/portabase)中 - 如果上面的URL已移動，請在此處查看。

Accept the defaults, or pick **Advanced** to change the CPU, RAM, disk and network settings.

接受預設設置，或選擇**高級**來更改CPU, RAM 、磁碟和網路設定。

**[Open the Dashboard](#p-010)｜[打開控制面板](#p-010)**

When the script finishes it prints the URL, `http://<container-ip>:3000`.

腳本執行完畢後，會印出URL, `http://<container-ip>:3000` 。

Sign in with the default account it created:

使用它創建的預設帳戶登入：

| User<br>用戶 | Password<br>密碼 |
| --- | --- |
| `admin@example.com` | `Portabase123!` |

Change this password immediately after the first login, and set `AUTH_SIGNUP_ENABLED=false` in `/opt/portabase/.env` once your account exists.

首次登入後立即變更此密碼，並在帳戶存在後將`AUTH_SIGNUP_ENABLED=false`設定為`/opt/portabase/.env` 。

**[Review the configuration](#p-010)｜[檢查配置](#p-010)**

The script generates `PROJECT_SECRET` for you and writes it to `/opt/portabase/.env`, alongside `DATABASE_URL`, `PROJECT_URL` and `TRUSTED_DOMAINS` - both set to `http://<container-ip>:3000`.

腳本會為您產生`PROJECT_SECRET`並將其寫入`/opt/portabase/.env` ，以及`DATABASE_URL`, `PROJECT_URL`和`TRUSTED_DOMAINS` - 兩者都設定為`http://<container-ip>:3000` 。

`PROJECT_SECRET` encrypts everything the agents exchange with the Dashboard, and the credentials stored in it. Back up `/opt/portabase/.env`, and **never change the secret once agents are connected** - previously encrypted data would no longer be readable.

`PROJECT_SECRET`會對代理與控制面板交換的所有內容以及儲存在控制面板中的憑證進行加密。備份`/opt/portabase/.env` ，且**代理連線後切勿更改金鑰**－先前加密的資料將無法讀取。

SMTP, storage backends and auth providers go in the same file - see [environment variables](#p-012). Apply changes with:

SMTP ，儲存後端和驗證提供者放在同一個檔案中 - 請參閱[環境變數](#p-012) 。使用以下命令應用變更：

```
systemctl restart portabase
```

If you put the Dashboard behind a domain with HTTPS - see the [reverse proxy guide](#p-013) - update `PROJECT_URL` and `TRUSTED_DOMAINS` to that public URL.

如果您將控制面板放在具有HTTPS的域後面 - 請參閱 [反向代理指南](#p-013) - 將`PROJECT_URL`和`TRUSTED_DOMAINS`更新到該公共URL 。

**[Updating](#p-010)｜[更新中](#p-010)**

Re-run the same command and choose **Update**. The script stops the services, backs up `/opt/portabase/.env`, deploys the new release, rebuilds the app and restores your configuration.

重新運行相同的命令並選擇**更新**。腳本將停止服務，備份`/opt/portabase/.env` ，部署新版本，重新建置應用程式並還原您的配置。

**Agent**

**代理人**

---

###### [Backing up databases hosted on Proxmox VE](#p-010)｜[備份託管在 Proxmox 上的資料庫VE](#p-010)

Databases usually run in other LXC containers or VMs on the same node. Install one Agent per container or VM, then declare each database in the Dashboard using the container or VM IP and the database port. Make sure the Proxmox firewall allows the Agent to reach it.

資料庫通常運行在同一節點上的其他LXC或虛擬機器。每個容器或VM安裝一個代理，然後在控制面板中使用容器或VM IP連接埠聲明每個資料庫。確保 Proxmox 防火牆允許代理程式存取資料庫。

Per-engine settings - required grants, dump options, restore behaviour - are documented in the [databases section](#p-077).

每個引擎的設定（所需授權、轉儲選項、復原行為）均記錄在 [資料庫部分](#p-077)中。

---

###### [Troubleshooting](#p-010)｜[故障排除](#p-010)

-   **The Dashboard does not answer on port 3000.** Check both services: `systemctl status portabase portabase-tusd`, and the logs with `journalctl -u portabase -f`.  
    **控制面板在連接埠 3000 上沒有回應。** 請檢查以下兩個服務： `systemctl status portabase portabase-tusd`和`journalctl -u portabase -f`的日誌。
-   **The agent shows as offline.** `PROJECT_URL` must be the URL the agent can actually reach. Update it in `/opt/portabase/.env` and restart. See the [agent configuration](#p-075).  
    **代理顯示為離線。** `PROJECT_URL`必須是代理實際可以存取的URL 。請在`/opt/portabase/.env`中更新並重新啟動。請參閱 [代理配置](#p-075) 。
-   **Uploads or restores fail.** The `portabase-tusd` service is down, or `TUSD_BEHIND_PROXY` was changed. Restart it with `systemctl restart portabase-tusd`.  
    **上傳或恢復失敗。** `portabase-tusd`服務已停止運行，或`TUSD_BEHIND_PROXY`服務已更改。請使用`systemctl restart portabase-tusd`重新啟動該服務。
-   **The script itself fails.** It is a community-scripts issue, not a Portabase one - report it on [their GitHub](https://github.com/community-scripts/ProxmoxVED/issues) with the advanced verbose-mode logs.  
    **腳本本身運行失敗。**這是社群腳本的問題，而不是 Portabase 的問題——請在 [他們的 GitHub](https://github.com/community-scripts/ProxmoxVED/issues)上提交高級詳細模式日誌。

More answers in the [FAQ](#p-106).

更多答案在 [FAQ](#p-106) 。

---

###### [Related pages](#p-010)｜[相關頁](#p-010)

[

**CLI**

The supported one-command install, on any Linux host.

支援在任何 Linux 主機上使用單命令安裝。

](https://portabase.io/docs/installation/cli)[

**Unraid｜榮譽**

Install the Dashboard from the Community Applications catalogue.

從社區應用目錄安裝控制面板。

](https://portabase.io/docs/installation/unraid)[

**Authentication｜驗證**

Add OAuth2 or OIDC providers in front of your Dashboard.

在您的控制面板前面新增 OAuth2 或OIDC提供者。

](https://portabase.io/docs/dashboard/configuration/auth/configuration)[

**Databases｜資料庫**

Per-engine configuration for every database Portabase supports.

Portabase 支援的每個資料庫的引擎級配置。

](https://portabase.io/docs/agent/db)

Last updated on

最後更新於

[

Unraid

榮譽

Install the Portabase Dashboard on Unraid from the Community Applications catalogue and back up the databases running on your server.

從社群應用程式目錄在 Unraid 上安裝 Portabase Dashboard，並備份伺服器上執行的資料庫。

](https://portabase.io/docs/installation/unraid)[

Getting Started

入門

Choose which component of Portabase you want to set up first.

首先選擇要設定的 Portabase 元件。

](https://portabase.io/docs/dashboard/getting-started)

---

<a id="c-4"></a>

#### Portabase Dashboard｜Portabase 控制面板

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-5"></a>

##### Getting Started｜入門

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-011"></a>

> 來源：<https://portabase.io/docs/dashboard/getting-started>

Portabase Dashboard

Portabase 控制面板


Choose which component of Portabase you want to set up first.

首先選擇要設定的 Portabase 元件。

Portabase is composed of three main parts. To get started, we recommend installing the **Dashboard** first, then your first **Agent**.

Portabase 由三個主要部分組成。為了方便入門，我們建議您先安裝**控制面板**，然後再安裝您的第一個**代理**。

![Portabase Onboarding - Youtube](<../images/4376cef4-thumbnail-portabase-onboarding.png>)

[

**Install the Dashboard｜安裝儀錶板**

Set up the central management interface to manage all your backups and agents.

設定中央管理介面來管理所有備份和代理程式。

](https://portabase.io/docs/installation)[

**Install an Agent｜安裝代理**

Deploy a lightweight agent on your database servers to handle backup tasks.

在資料庫伺服器上部署輕量級代理來處理備份任務。

](https://portabase.io/docs/installation#agent-coverage)[

**CLI Reference｜CLI參考**

Learn how to use the Portabase CLI to automate installation and management.

了解如何使用 Portabase CLI實現安裝和管理自動化。

](https://portabase.io/docs/cli)

---

**[Quick start (CLI)](#p-011)｜[快速入門 ( CLI )](#p-011)**

If you already have the requirements, you can install the CLI directly:

如果您已滿足所有要求，可以直接安裝CLI ：

```bash
curl -sL https://portabase.io/install | bash
```

Last updated on

最後更新於

[

Proxmox VE

Deploy the Portabase Dashboard in a Proxmox VE LXC container with the community-scripts helper script.

使用 community-scripts 輔助腳本將 Portabase Dashboard 部署到 Proxmox VE LXC容器中。

](https://portabase.io/docs/installation/proxmox)[

Environment Variables

環境變數

Complete reference of .env configuration options.

.env 配置選項完整參考。

](https://portabase.io/docs/dashboard/configuration/environment)

---

<a id="c-6"></a>

###### Configuration｜配置

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-7"></a>

###### Environment Variables｜環境變數

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-012"></a>

> 來源：<https://portabase.io/docs/dashboard/configuration/environment>

Portabase DashboardConfiguration

Portabase 儀表板配置


Complete reference of .env configuration options.

.env 配置選項完整參考。

Portabase provides flexibility through environment variables. These let you customize application behavior, database connection, authentication and storage.

Portabase 透過環境變數提供彈性。您可以利用這些環境變數自訂應用程式行為、資料庫連線、身份驗證和儲存。

If you use Docker Compose, set these variables in your `.env` file at the root of the project.

如果您使用 Docker Compose，請在專案根目錄下的`.env`檔案中設定這些變數。

---

**[Project](#p-012)｜[項目](#p-012)**

General instance configuration.

實例通用配置。

| Variable<br>變數 | Type<br>類型 | Optional<br>可選 | Default<br>預設值 | Description<br>描述 |
| --- | --- | --- | --- | --- |
| `PROJECT_URL` | `string` | No<br>否 | `http://localhost:8887` | Public URL of your dashboard (e.g. `https://backups.my-domain.com`). Important for generated links.<br>公開URL您的儀表板（例如`https://backups.my-domain.com` ）。這對產生的連結很重要。 |
| `PROJECT_SECRET` | `string` | No<br>否 | `None` | **Critical.** Secret used to encrypt sensitive data. Generate with `openssl rand -hex 32`.<br>**關鍵** 用於加密敏感資料的金鑰。使用`openssl rand -hex 32`生成。 |
| `PROJECT_NAME` | `string` | Yes<br>是 | `Portabase` | Display name in the UI (site title).<br>在UI （網站標題）中顯示名稱。 |
| `RETENTION_CRON` | `string` | Yes<br>是 | `0 7 * * *` | Schedule for automatic deletion of backups according to the retention policies.<br>依照保留策略安排自動刪除備份。 |
| `STALE_BACKUP_THRESHOLD_HOURS` | `number` | Yes<br>是 | `6` | Threshold, in hours, after which a backup without a recent successful run is flagged as stale.<br>閾值（以小時為單位），超過此閾值後，沒有近期成功運行記錄的備份將被標記為過期。 |
| `BACKUP_FOLDER_NAME` | `string` | Yes<br>是 | `backups` | Folder name for storing backup files in storage channels.<br>用於在儲存通道中儲存備份檔案的資料夾名稱。 |
| `LOG_LEVEL` | `string` | Yes<br>是 | `info` | Controls minimum log level. Options: `debug`, `info`, `warn`, `error`<br>控制最低日誌等級。選項： `debug`, `info`, `warn`, `error` |
| `SKIP_ONBOARDING` | `boolean` | Yes<br>是 | `false` | Skips the initial onboarding flow on first launch. Set to `true` when the instance is provisioned automatically.<br>首次啟動時跳過初始引導流程。如果實例是自動配置的，則設定為`true` 。 |
| `AUTH_DEFAULT_USER_NAME` | `string` | Yes<br>是 | `None` | The default user name<br>預設使用者名稱 |
| `AUTH_DEFAULT_USER` | `string` | Yes<br>是 | `None` | The default user email<br>預設使用者信箱 |
| `AUTH_DEFAULT_PASSWORD` | `string` | Yes<br>是 | `None` | Password must contain at least 8 characters, 1 number, 1 lowercase letter, 1 uppercase letter and 1 special character<br>密碼必須至少包含 8 個字符，1 個數字，1 個小寫字母，1 個大寫字母和 1 個特殊字符 |
| `TELEMETRY` | `boolean` | Yes<br>是 | `True` | Enables anonymous usage metrics collection.<br>啟用匿名使用指標收集。 |
| `TUSD_BEHIND_PROXY` | `boolean` | Yes<br>是 | `false` | Not always required. Set to `true` when the dashboard runs behind a reverse proxy, so the tusd upload server trusts `X-Forwarded-*` headers and generates correct upload URLs. May resolve upload issues depending on your proxy configuration.<br>並非總是必需。當控制面板運行在反向代理之後時，請設定為`true` ，以便 tusd 上傳伺服器信任`X-Forwarded-*`標頭並產生正確的上傳 URL。根據您的代理配置，這可能解決上傳問題。 |

In case you want to seed the default user using .env variables, use AUTH\_DEFAULT\_USER\_NAME, AUTH\_DEFAULT\_USER, and AUTH\_DEFAULT\_PASSWORD. These 3 variables must be filled.

如果您想使用 .env 變數來初始化預設用戶，請使用AUTH \_DEFAULT\_USER\_NAME、 AUTH \_DEFAULT\_USER 和AUTH \_DEFAULT\_PASSWORD。這 3 個變數必須填寫。

---

**[API & MCP](#p-012)**

Controls programmatic access to your dashboard.

控制對儀錶板的程式化存取。

| Variable<br>變數 | Type<br>類型 | Optional<br>可選 | Default<br>預設值 | Description<br>描述 |
| --- | --- | --- | --- | --- |
| `API_ENABLED` | `boolean` | Yes<br>是 | `false` | Enables all REST API routes under `/api/v1`. Required for both OpenAPI and MCP.<br>啟用`/api/v1`下的所有REST API路由。 OpenAPI 和MCP皆需要。 |
| `OPENAPI_ENABLED` | `boolean` | Yes<br>是 | `false` | Enables the OpenAPI specification and Swagger UI at `/api/v1/openapi` and `/api/v1/docs`. Requires `API_ENABLED=true`.<br>啟用 OpenAPI 規範與 Swagger UI位於`/api/v1/openapi`和`/api/v1/docs` 。需要`API_ENABLED=true` 。 |
| `MCP_ENABLED` | `boolean` | Yes<br>是 | `false` | Enables the MCP server at `/api/v1/mcp` for AI assistant integrations. Requires `API_ENABLED=true`.<br>啟用MCP伺服器（位於`/api/v1/mcp` ，用於AI助手整合。需要`API_ENABLED=true` 。 |

---

**[Cleanup](#p-012)｜[清理](#p-012)**

Scheduled maintenance jobs that permanently delete old data. Both jobs are disabled by default and each requires its own retention value to start.

計劃維護作業會永久刪除舊資料。這兩個作業預設都處於停用狀態，並且都需要各自的保留值才能啟動。

**[Job logs cleanup](#p-012)｜[作業日誌清理](#p-012)**

Permanently deletes old `job_logs` belonging to soft-deleted backups.

永久刪除屬於軟刪除備份的舊`job_logs` 。

| Variable<br>變數 | Type<br>類型 | Optional<br>可選 | Default<br>預設值 | Description<br>描述 |
| --- | --- | --- | --- | --- |
| `CLEANING_JOB_LOGS_ENABLED` | `boolean` | Yes<br>是 | `false` | Enables the job logs cleanup cron. Set to `true` to start it.<br>啟用作業日誌清理定時任務。設定為`true`即可啟動。 |
| `CLEANING_JOB_LOGS_CRON` | `string` | Yes<br>是 | `0 0 * * *` | Cron schedule for the cleanup (default: every day at midnight).<br>清理任務的定時任務（預設：每天午夜）。 |
| `CLEANING_JOB_LOGS_RETENTION_DAYS` | `number` | No\*<br>否* | `None` | Days to keep logs before purge. Positive integer. **Required** when `CLEANING_JOB_LOGS_ENABLED=true`. The cron will not start without it.<br>日誌保留天數（清除前）。正整數。當`CLEANING_JOB_LOGS_ENABLED=true`為真時，**必填**。缺少此值，cron 任務將無法啟動。 |
| `CLEANING_JOB_LOGS_BATCH_SIZE` | `number` | Yes<br>是 | `1000` | Rows deleted per batch.<br>每批次刪除的行數。 |

**[Deleted backups cleanup](#p-012)｜[已刪除備份清理](#p-012)**

Hard-deletes old soft-deleted backups; children cascade. Retention is measured from `deleted_at`.

徹底刪除舊的軟刪除備份；子級聯。保留期由`deleted_at`衡量。

| Variable<br>變數 | Type<br>類型 | Optional<br>可選 | Default<br>預設值 | Description<br>描述 |
| --- | --- | --- | --- | --- |
| `CLEANING_BACKUPS_ENABLED` | `boolean` | Yes<br>是 | `false` | Enables the deleted backups cleanup cron. Set to `true` to start it.<br>啟用已刪除備份的清理 cron 任務。設定為`true`即可啟動。 |
| `CLEANING_BACKUPS_CRON` | `string` | Yes<br>是 | `0 0 * * *` | Cron schedule for the cleanup (default: every day at midnight).<br>清理任務的定時任務（預設：每天午夜）。 |
| `CLEANING_BACKUPS_RETENTION_DAYS` | `number` | No\*<br>否* | `None` | Days to keep soft-deleted backups before hard-delete. Positive integer. **Required** when `CLEANING_BACKUPS_ENABLED=true`. The cron will not start without it.<br>軟刪除備份保留天數（在硬刪除之前）。正整數。當`CLEANING_BACKUPS_ENABLED=true`為**必填**時，cron 任務將無法啟動。 |
| `CLEANING_BACKUPS_BATCH_SIZE` | `number` | Yes<br>是 | `100` | Rows deleted per batch.<br>每批次刪除的行數。 |

These jobs permanently delete data. Retention days have no default: the corresponding cron will not start unless you set a positive integer when the job is enabled.

這些作業會永久刪除資料。資料保留天數沒有預設值：除非在啟用作業時設定一個正整數，否則對應的 cron 任務不會啟動。

---

**[Database](#p-012)｜[資料庫](#p-012)**

Configuration for the internal Portabase PostgreSQL connection.

Portabase 內部 PostgreSQL 連線的設定。

| Variable<br>變數 | Type<br>類型 | Optional<br>可選 | Default<br>預設值 | Description<br>描述 |
| --- | --- | --- | --- | --- |
| `DATABASE_URL` | `string` | Yes<br>是 | `None` | Database URL (e.g., `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public`). If not specified, the internal database will be used.<br>資料庫URL （例如， `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public` ）。如果未指定，則將使用內部資料庫。 |

---

**[Email (SMTP)](#p-012)｜[電子郵件 ( SMTP )](#p-012)**

Configuration for transactional email delivery (alerts, invitations).

事務性電子郵件發送（提醒、邀請）的配置。

If no configuration is provided, email-related features will be limited (no password reset, no email verification).

如果沒有提供配置，則與電子郵件相關的功能將受到限制（無法重設密碼，無法進行電子郵件驗證）。

| Variable<br>變數 | Type<br>類型 | Default<br>預設值 | Description<br>描述 |
| --- | --- | --- | --- |
| `SMTP_HOST` | `string` | `None` | SMTP server address (e.g. `smtp.resend.com`).<br>SMTP伺服器位址（例如`smtp.resend.com` ）。 |
| `SMTP_PORT` | `string` | `None` | SMTP server port (e.g. `587`).<br>SMTP伺服器連接埠（例如`587` ）。 |
| `SMTP_USER` | `string` | `None` | SMTP username.<br>SMTP用戶名。 |
| `SMTP_PASSWORD` | `string` | `None` | SMTP password.<br>SMTP密碼。 |
| `SMTP_FROM` | `string` | `None` | From email address (e.g. `no-reply@your-domain.com`).<br>寄件者電子郵件地址（例如`no-reply@your-domain.com` ）。 |
| `SMTP_SECURE` | `string` | `false` |  |

Last updated on

最後更新於

[

Getting Started

入門

Choose which component of Portabase you want to set up first.

首先選擇要設定的 Portabase 元件。

](https://portabase.io/docs/dashboard/getting-started)[

Reverse Proxy

反向代理

Expose your Dashboard to the internet securely with HTTPS.

使用HTTPS安全地將您的儀表板暴露給網路。

](https://portabase.io/docs/dashboard/configuration/reverse-proxy)

---

<a id="p-013"></a>

###### Reverse Proxy｜反向代理

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/reverse-proxy>

Portabase DashboardConfiguration

Portabase 儀表板配置


Expose your Dashboard to the internet securely with HTTPS.

使用HTTPS安全地將您的儀表板暴露給網路。

By default, the Portabase Dashboard listens on `http://localhost:8887`. To make it accessible from the outside (e.g. `portabase.example.com`) and secure it with HTTPS, use a **Reverse Proxy**.

預設情況下，Portabase 控制面板監聽`http://localhost:8887` 。若要使其可從外部存取（例如`portabase.example.com` ）並使用HTTPS對其進行保護，請使用**反向代理**。

---

**Traefik V3**

This setup assumes you already run a **Traefik** instance on your server and it watches the Docker network (commonly `traefik_network` or `proxy`).

此設定假設您的伺服器上已經運行了一個 **Traefik** 實例，並且它會監視 Docker 網路（通常是`traefik_network`或`proxy` ）。

**[Docker Compose changes](#p-013)｜[Docker Compose 變更](#p-013)**

Modify your `docker-compose.yml` to:

將您的`docker-compose.yml`修改為：

1.  Remove direct host port exposure (no `8887:80`).  
    移除直接主機連接埠暴露（無`8887:80` ）。
2.  Connect the container to Traefik's network.  
    將容器連接到 Traefik 的網路。
3.  Add Traefik labels.  
    新增 Traefik 標籤。

```title="docker-compose.yml"
name: portabase-dashboard

services:
  portabase:
    container_name: portabase-app
    image: portabase/portabase:latest
    restart: always
    env_file: .env
    environment:
        - TZ=Europe/Paris
    expose:
      - 80
    volumes:
      - portabase-data:/data
    depends_on:
      db:
        condition: service_healthy
    networks:
      - traefik_network # Network where Traefik lives
      - default # To talk to the local database
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.portabase.entrypoints=web,websecure"
      - "traefik.http.routers.portabase.rule=Host(`portabase.example.com`)"
      - "traefik.http.routers.portabase.tls.certresolver=myresolver"

  db:
    container_name: portabase-pg
    image: postgres:17-alpine
    restart: always
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - default

volumes:
  postgres-data:
  portabase-data:

networks:
  traefik_network:
  external: true
```

Name conflicts

名稱衝突

If you host **multiple dashboards** on the same Traefik server, change the router name in labels to unique values:

如果您在同一台 Traefik 伺服器上託管**多個儀表板**，請將標籤中的路由器名稱變更為唯一值：

-   Instance 1: `traefik.http.routers.portabase-prod...`  
    實例 1： `traefik.http.routers.portabase-prod...`
-   Instance 2: `traefik.http.routers.portabase-dev...`  
    實例 2： `traefik.http.routers.portabase-dev...`

**Nginx**

**GoDoxy**

---

**[`PROJECT_URL` environment variable](#p-013)｜[`PROJECT_URL`環境變數](#p-013)**

Whatever reverse proxy you use, update the `.env` file so generated links and emails use the correct public URL.

無論你使用什麼反向代理，都要更新`.env`文件，以便生成的連結和電子郵件使用正確的公共URL 。

```title=".env"
# Before
PROJECT_URL=http://localhost:8887

# After (your public domain)
PROJECT_URL=https://portabase.example.com
```

Restart the dashboard after changing this:

更改此設定後，請重新啟動儀錶板：

**Via CLI (Recommended)**

**建議使用CLI**

```
portabase restart .
```

**Via Docker Compose**

**透過 Docker Compose**

Last updated on

最後更新於

[

Environment Variables

環境變數

Complete reference of .env configuration options.

.env 配置選項完整參考。

](https://portabase.io/docs/dashboard/configuration/environment)[

Global Configuration

全域配置

General authentication configuration in Portabase.

Portabase中的通用身份驗證配置。

](https://portabase.io/docs/dashboard/configuration/auth/configuration)

---

<a id="c-8"></a>

###### Authentication｜驗證

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-9"></a>

###### Global Configuration｜全域配置

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-014"></a>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/configuration>

Portabase DashboardConfigurationAuthentication

Portabase 儀表板設定驗證


General authentication configuration in Portabase.

Portabase中的通用身份驗證配置。

These variables control the general authentication behavior and account security on your Portabase instance.

這些變數控制 Portabase 實例上的常規身份驗證行為和帳戶安全性。

**[General Settings](#p-014)｜[常規設定](#p-014)**

Prop

支柱

Type

類型

If you disable `AUTH_EMAIL_PASSWORD_ENABLED`, make sure you have configured at least one functional OAuth2 or OIDC provider, otherwise you might lose access to your instance.

如果停用`AUTH_EMAIL_PASSWORD_ENABLED` ，請確保至少配置一個功能正常的 OAuth2 或OIDC提供程序，否則您可能會失去對實例的存取權。

**[Account Linking](#p-014)｜[帳號關聯](#p-014)**

These variables control how a Portabase account is associated with an OAuth2 or OIDC provider. They apply to every configured provider.

這些變數控制 Portabase 帳戶如何與 OAuth2 或OIDC提供者關聯。它們適用於每個已配置的提供者。

Prop

支柱

Type

類型

Keep `AUTH_ALLOW_UNLINKING` at `false` when the provider is the only way into an account: with `AUTH_EMAIL_PASSWORD_ENABLED` disabled and no passkey registered, a user who unlinks their last provider locks themselves out.

當提供者是進入帳戶的唯一途徑時，請將`AUTH_ALLOW_UNLINKING`保持在`false` ：停用`AUTH_EMAIL_PASSWORD_ENABLED`且未註冊通行金鑰時，取消連結最後一個提供者的用戶將被鎖定在帳戶之外。

**[Configure with the CLI](#p-014)｜[使用CLI配置](#p-014)**

If the dashboard was created with the [Portabase CLI](#p-088), change these settings with [`portabase dashboard set`](#p-097) instead of editing `.env`, then restart:

如果儀表板是使用 [Portabase CLI](#p-088)創建的，請使用 [`portabase dashboard set`](#p-097)更改這些設置，而不是編輯`.env` ，然後重新啟動：

```
portabase dashboard set ./my-dashboard signup false passkey true
portabase dashboard set ./my-dashboard account_linking false account_unlinking false
portabase dashboard set ./my-dashboard trusted_domains "backup.example.com"
portabase restart ./my-dashboard
```

| Variable<br>變數 | CLI key<br>CLI鍵 |
| --- | --- |
| `AUTH_EMAIL_PASSWORD_ENABLED` | `password_auth` |
| `AUTH_SIGNUP_ENABLED` | `signup` |
| `AUTH_PASSKEY_ENABLED` | `passkey` |
| `AUTH_SYNC_OIDC_ROLES_ON_LOGIN` | `sync_oidc_roles` |
| `TRUSTED_DOMAINS` | `trusted_domains` |
| `AUTH_ALLOW_LINKING` | `account_linking` |
| `AUTH_ALLOW_UNLINKING` | `account_unlinking` |

Use [`portabase dashboard unset`](#p-097) to go back to the default value, and [`portabase dashboard show`](#p-097) to check the current configuration.

使用 [`portabase dashboard unset`](#p-097)恢復預設值，使用 [`portabase dashboard show`](#p-097)檢查目前配置。

The CLI refuses `password_auth false` while no OIDC or OAuth2 provider is configured.

當未配置OIDC或 OAuth2 提供程序時， CLI拒絕`password_auth false` 。

**[Security Recommendations](#p-014)｜[安全建議](#p-014)**

-   **Passkeys**: We recommend enabling `AUTH_PASSKEY_ENABLED` to provide a more secure and smooth login experience.  
    **密碼**：我們建議啟用`AUTH_PASSKEY_ENABLED` ，以提供更安全、更流暢的登入體驗。
-   **Registration**: For a private instance, set `AUTH_SIGNUP_ENABLED` to `false` after creating your administrator accounts.  
    **註冊**：對於私有實例，在建立管理員帳戶後，將`AUTH_SIGNUP_ENABLED`設定為`false` 。
-   **Account linking**: On a shared instance, set `AUTH_ALLOW_LINKING` to `false` unless your provider verifies email addresses. A provider that returns an unverified address could otherwise be used to take over an existing account with the same email.  
    **帳戶關聯**：在共用實例上，除非您的服務提供者會驗證電子郵件地址，否則請將`AUTH_ALLOW_LINKING`設定為`false` 。如果服務提供者傳回的地址未經驗證，則該地址可能用於接管使用相同電子郵件地址的現有帳戶。

Last updated on

最後更新於

[

Reverse Proxy

反向代理

Expose your Dashboard to the internet securely with HTTPS.

使用HTTPS安全地將您的儀表板暴露給網路。

](https://portabase.io/docs/dashboard/configuration/reverse-proxy)[

OIDC Configuration

OIDC配置

Configuration guide for OpenID Connect in Portabase.

Portabase 中 OpenID Connect 設定指南。

](https://portabase.io/docs/dashboard/configuration/auth/oidc/setup)

---

<a id="c-10"></a>

###### OpenID Connect

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-11"></a>

###### OIDC Configuration｜OIDC 配置

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-015"></a>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oidc/setup>

Portabase DashboardConfigurationAuthenticationOpenID Connect

Portabase 控制面板設定身份驗證 OpenID Connect


Configuration guide for OpenID Connect in Portabase.

Portabase 中 OpenID Connect 設定指南。

**OpenID Connect (OIDC)** integration allows connecting Portabase to any compatible identity provider, such as Keycloak, Auth0, Authentik, or Okta.

**OpenID Connect ( OIDC )** 整合允許將 Portabase 連接到任何相容的身份提供者，例如 Keycloak、Auth0、Authentik 或 Okta。

**[Implementation](#p-015)｜[實作](#p-015)**

To configure an OIDC provider, you must define a set of environment variables starting with `AUTH_OIDC_`.

要配置OIDC提供程序，您必須定義一組以`AUTH_OIDC_`開頭的環境變數。

**[Create the Client](#p-015)｜[建立客戶端](#p-015)**

On your identity server (e.g., Keycloak), create a new client of type "OIDC" or "OpenID Connect".

在您的身分識別伺服器（例如 Keycloak）上，建立類型為"OIDC"或"OpenID Connect"的新客戶端。

**[Configure URLs](#p-015)｜[配置 URL](#p-015)**

Define the redirect URL (Redirect URI): `https://<your-domain>/api/auth/sso/callback/<providerId>`

定義重定向URL （重定向URI ）： `https://<your-domain>/api/auth/sso/callback/<providerId>`

**[Enter Variables](#p-015)｜[輸入變數](#p-015)**

Add the credentials obtained into your Portabase configuration.

將取得到的憑證新增到您的 Portabase 配置中。

**[Configure with the CLI](#p-015)｜[使用CLI配置](#p-015)**

If the dashboard was created with the [Portabase CLI](#p-088), add the provider with [`portabase dashboard auth add`](#p-097). It writes the `AUTH_OIDC_<ID>_*` variables for you.

如果儀表板是使用 [Portabase CLI](#p-088)建立的，請使用 [`portabase dashboard auth add`](#p-097)新增提供者。它會自動為您寫入`AUTH_OIDC_<ID>_*`變數。

```
# The callback needs a public URL
portabase dashboard set ./my-dashboard url https://backup.example.com

printf '%s\n' "$OIDC_SECRET" | portabase dashboard auth add ./my-dashboard oidc keycloak \
  --issuer https://sso.example.com/realms/main \
  --client portabase --secret-stdin \
  --title "Company SSO" --scopes "openid profile email" --pkce

portabase restart ./my-dashboard
```

| Option<br>選項 | Variable<br>變數 |
| --- | --- |
| provider id (argument)<br>提供者 ID（參數） | `AUTH_OIDC_<ID>_ID` |
| `--issuer` | `AUTH_OIDC_<ID>_ISSUER_URL` |
| `--client` | `AUTH_OIDC_<ID>_CLIENT` |
| `--secret` / `--secret-stdin` | `AUTH_OIDC_<ID>_SECRET` |
| `--title` | `AUTH_OIDC_<ID>_TITLE` |
| `--scopes` | `AUTH_OIDC_<ID>_SCOPES` |
| `--pkce` | `AUTH_OIDC_<ID>_PKCE` |
| `--host` | `AUTH_OIDC_<ID>_HOST` |

List and remove providers with [`portabase dashboard auth list`](#p-097) and [`portabase dashboard auth remove`](#p-097). Restrict access to a group with `portabase dashboard set ./my-dashboard allowed_group <group>`.

使用 [`portabase dashboard auth list`](#p-097)和 [`portabase dashboard auth remove`](#p-097)列出並刪除提供者。使用`portabase dashboard set ./my-dashboard allowed_group <group>`限制對群組的存取。

`AUTH_OIDC_<ID>_DESC` and `AUTH_OIDC_<ID>_ICON` are not handled by the CLI: add them to `.env` by hand.

`AUTH_OIDC_<ID>_DESC`和`AUTH_OIDC_<ID>_ICON`不受CLI處理：手動將它們加到`.env` 。

**[Provider Settings](#p-015)｜[提供者設定](#p-015)**

Prop

支柱

Type

類型

Linking a provider to an existing account is controlled by `AUTH_ALLOW_LINKING`, and a user's ability to detach it afterwards by `AUTH_ALLOW_UNLINKING`. Both are described in [Account Linking](#p-014).

將提供者連結到現有帳戶由`AUTH_ALLOW_LINKING`控制，用戶之後將其分離的能力由`AUTH_ALLOW_UNLINKING`控制。兩者都在 [帳戶連結](#p-014)中進行了描述。

**[Multiple Providers](#p-015)｜[多家供應商](#p-015)**

Portabase supports configuring multiple OIDC providers simultaneously. To do this, replace the `AUTH_OIDC_` prefix with `AUTH_OIDC_<NAME>_`.

Portabase 支援同時配置多個OIDC提供者。為此，請將`AUTH_OIDC_`前綴替換為`AUTH_OIDC_<NAME>_` 。

**[Example with Pocket](#p-015)｜[附口袋範例](#p-015)**

```
AUTH_OIDC_POCKET_ID="portabase-pocketid"
AUTH_OIDC_POCKET_TITLE="Pocket ID"
AUTH_OIDC_POCKET_DESC=""
AUTH_OIDC_POCKET_ICON="https://github.com/user-attachments/assets/4ceb2708-9f29-4694-b797-be833efce17d"
AUTH_OIDC_POCKET_CLIENT="portabase"
AUTH_OIDC_POCKET_SECRET="dkNOnQwhDQVwLxoNbQOkJioMA3sQIPdk"
AUTH_OIDC_POCKET_ISSUER_URL="http://localhost:3055"
AUTH_OIDC_POCKET_HOST="localhost:8080"
```

Using a specific prefix allows isolating configurations if you use multiple identity servers.

如果使用多個身分識別伺服器，使用特定的前綴可以隔離不同的配置。

**[Configuration Examples](#p-015)｜[設定範例](#p-015)**

Learn how to integrate specific solutions:

了解如何整合特定解決方案：

**Keycloak**

**鑰匙斗篷**

Learn how to configure Keycloak with Portabase for enterprise identity management. [View the full guide](#p-016)

了解如何將 Keycloak 與 Portabase 集成，以實現企業身分管理。 [查看完整指南](#p-016)

**PocketID**

**[Groups and Roles](#p-015)｜[群組與角色](#p-015)**

You can restrict Portabase access to a specific group from your OIDC provider via the `ALLOWED_GROUP` variable. If the user does not belong to this group, login will be denied.

您可以透過`ALLOWED_GROUP`變量，將 Portabase 的存取權限限制在您的OIDC提供者的特定使用者群組。如果用戶不屬於此用戶群組，則登入將被拒絕。

Last updated on

最後更新於

[

Global Configuration

全域配置

General authentication configuration in Portabase.

Portabase中的通用身份驗證配置。

](https://portabase.io/docs/dashboard/configuration/auth/configuration)[

Keycloak

鑰匙斗篷

Configuration guide for Keycloak via OIDC in Portabase.

透過 Portabase 中的OIDC配置 Keycloak 的指南。

](https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/keycloak)

---

<a id="c-12"></a>

###### Examples｜範例

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-016"></a>

###### Keycloak｜鑰匙斗篷

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/keycloak>

Portabase DashboardConfigurationAuthenticationOpenID ConnectExamples

Portabase 控制面板設定身份驗證 OpenID Connect 範例


Configuration guide for Keycloak via OIDC in Portabase.

透過 Portabase 中的OIDC配置 Keycloak 的指南。

[Keycloak](https://www.keycloak.org/) integration offers robust identity management and SSO capabilities for your Portabase instance.

[Keycloak](https://www.keycloak.org/)集成為您的 Portabase 實例提供強大的身分管理和SSO功能。

**[Configuration Steps](#p-016)｜[設定步驟](#p-016)**

**[Create a Client](#p-016)｜[創建客戶](#p-016)**

Log in to the Keycloak admin console, choose your Realm, and create a new client:

登入 Keycloak 管理控制台，選擇你的 Realm，然後建立一個新客戶端：

-   **Client type**: `OpenID Connect`.  
    **客戶端類型**： `OpenID Connect` 。
-   **Client ID**: `portabase`.  
    **客戶ID**: `portabase` 。

![Keycloak configuration](<../images/e54ac8c7-image.png>)

**[Authentication and Flow](#p-016)｜[認證與流程](#p-016)**

In **Capability config**, enable **Client authentication** (Confidential Client) and ensure **Standard flow** is selected.

在**功能配置**中，啟用**客戶端身份驗證**（機密客戶端），並確保選擇**標準流程**。

![Keycloak configuration](<../images/0913c2fa-image.png>)

**[Login Settings](#p-016)｜[登入設定](#p-016)**

Define the allowed URLs:

定義允許的網址：

-   **Valid redirect URIs**: `https://portabase.your-domain.com/api/auth/sso/callback/your-provider-id`  
    **有效的重定向 URI**： `https://portabase.your-domain.com/api/auth/sso/callback/your-provider-id`

![Keycloak configuration](<../images/88645ad9-image.png>)

**[Get the Secret](#p-016)｜[揭秘](#p-016)**

Save, then go to the **Credentials** tab to copy your **Client Secret**.

儲存，然後前往 **Credentials**標籤複製您的**Client Secret**。

![Keycloak configuration](<../images/4f68c544-image.png>)

**[Environment Variables](#p-016)｜[環境變數](#p-016)**

Configure Portabase with the following values:

請使用以下值配置 Portabase：

```
# Identifier and Title
AUTH_OIDC_ID="your-provider-id"
AUTH_OIDC_TITLE="Keycloak"
AUTH_OIDC_DESC=""
AUTH_OIDC_ICON=""

# OIDC Credentials
AUTH_OIDC_CLIENT="portabase"
AUTH_OIDC_SECRET="your-keycloak-secret"
AUTH_OIDC_ISSUER_URL="https://keycloak.your-domain.com/realms/your-realm"
AUTH_OIDC_HOST="keycloak.your-domain.com"

# Advanced Settings
AUTH_OIDC_SCOPES="openid profile email"
AUTH_OIDC_PKCE=true

# Role Mapping
AUTH_OIDC_ROLE_MAP="admin:admin,default:pending"

TRUSTED_DOMAINS="https://{Keycloak URL}, https://{Portabase URL}"
```

If you changed `AUTH_OIDC_ID`, don't forget to adjust the redirect URL in Keycloak accordingly.

如果您更改了`AUTH_OIDC_ID` ，請不要忘記相應地調整 Keycloak 中的重定向URL 。

**[Advanced Configuration](#p-016)｜[進階配置](#p-016)**

If automatic discovery doesn't work, you can manually specify the endpoints:

如果自動發現功能失效，您可以手動指定端點：

```
AUTH_OIDC_POCKET_DISCOVERY_ENDPOINT="https://keycloak.your-domain.com/realms/your-realm/.well-known/openid-configuration"
AUTH_OIDC_POCKET_JWKS_ENDPOINT="https://keycloak.your-domain.com/realms/your-realm/protocol/openid-connect/certs"
```

Last updated on

最後更新於

[

OIDC Configuration

OIDC配置

Configuration guide for OpenID Connect in Portabase.

Portabase 中 OpenID Connect 設定指南。

](https://portabase.io/docs/dashboard/configuration/auth/oidc/setup)[

PocketID

Configuration guide for PocketID via OIDC in Portabase.

Portabase 中透過OIDC配置 PocketID 的指南。

](https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/pocketid)

---

<a id="p-017"></a>

###### PocketID

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/pocketid>

Portabase DashboardConfigurationAuthenticationOpenID ConnectExamples

Portabase 控制面板設定身份驗證 OpenID Connect 範例


Configuration guide for PocketID via OIDC in Portabase.

Portabase 中透過OIDC配置 PocketID 的指南。

The integration of [PocketID](https://github.com/pocket-id/pocket-id) offers a lightweight authentication solution, ideal for self-hosting your Portabase instance.

[PocketID](https://github.com/pocket-id/pocket-id)的整合提供了一種輕量級的身份驗證解決方案，非常適合自行託管 Portabase 實例。

**[Configuration Steps](#p-017)｜[設定步驟](#p-017)**

**[Create an Application](#p-017)｜[創建應用程式](#p-017)**

Log in to the PocketID administration interface and create a new application:

登入 PocketID 管理介面並建立一個新應用程式：

-   **Application name**: `portabase` (or the name of your choice).  
    **應用程式名稱**： `portabase` （或您選擇的名稱）。

![PocketID application configuration](<../images/716a5145-image.png>)

**[Redirect Settings](#p-017)｜[重定向設定](#p-017)**

Set the authorized redirect URL to allow returning to Portabase after logging in:

設定授權重定向URL以允許登入後返回 Portabase：

-   **Callback URL / Redirect URI**: `https://portabase.your-domain.com/api/auth/sso/callback/pocketid`  
    **回呼URL / 重定向URI**: `https://portabase.your-domain.com/api/auth/sso/callback/pocketid`

**[Get Credentials](#p-017)｜[取得憑證](#p-017)**

Save the configuration. You can then copy the **Client ID** and generate your **Client Secret** to add them to your environment variables.

儲存配置。然後您可以複製 **客戶端ID** 並產生您的 **客戶端金鑰**，並將它們新增至您的環境變數。

![PocketID getting credentials](<../images/847ae883-image.png>)

**[Environment Variables](#p-017)｜[環境變數](#p-017)**

Configure Portabase with the following values. This example uses the dynamic `AUTH_OIDC_POCKET_` prefix to isolate the configuration.

請使用下列值配置 Portabase。本範例使用動態前綴`AUTH_OIDC_POCKET_`來隔離配置。

```
# Identifier and Title
AUTH_OIDC_POCKET_ID="pocketid"
AUTH_OIDC_POCKET_TITLE="PocketID"
AUTH_OIDC_POCKET_DESC="Login via my PocketID instance"
AUTH_OIDC_POCKET_ICON="https://github.com/user-attachments/assets/4ceb2708-9f29-4694-b797-be833efce17d"

# OIDC Credentials
AUTH_OIDC_POCKET_CLIENT="portabase"
AUTH_OIDC_POCKET_SECRET="your-pocketid-secret"
AUTH_OIDC_POCKET_ISSUER_URL="https://pocketid.your-domain.com"
AUTH_OIDC_POCKET_HOST="pocketid:3000" # If in the same Docker network or pocketid.your-domain.com

# Advanced Settings
AUTH_OIDC_POCKET_SCOPES="openid profile email groups"
AUTH_OIDC_POCKET_PKCE=true

# Role Mapping
AUTH_OIDC_POCKET_ROLE_MAP="admin:admin,default:user"

AUTH_OIDC_POCKET_ALLOW_UNLINKING=false

TRUSTED_DOMAINS="https://{Pocket ID URL},https://{Portabase URL}"
```

PocketID allows passing user groups. Use `AUTH_OIDC_POCKET_ROLE_MAP` to automatically grant the administrator role to members of your `admin` group.

PocketID 允許傳遞使用者群組。使用`AUTH_OIDC_POCKET_ROLE_MAP`可自動授予`admin`組的成員管理員角色。

**[Specific Endpoints (Optional)](#p-017)｜[具體端點（可選）](#p-017)**

If automatic discovery doesn't work, you can manually specify the endpoints:

如果自動發現功能失效，您可以手動指定端點：

```
AUTH_OIDC_POCKET_DISCOVERY_ENDPOINT="https://pocketid.your-domain.com/.well-known/openid-configuration"
AUTH_OIDC_POCKET_JWKS_ENDPOINT="https://pocketid.your-domain.com/.well-known/jwks.json"
```

Last updated on

最後更新於

[

Keycloak

鑰匙斗篷

Configuration guide for Keycloak via OIDC in Portabase.

透過 Portabase 中的OIDC配置 Keycloak 的指南。

](https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/keycloak)[

Authentik

Configuration guide for Authentik via OIDC in Portabase.

Portabase 中透過OIDC配置 Authentik 的指南。

](https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/authentik)

---

<a id="p-018"></a>

###### Authentik

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/authentik>

Portabase DashboardConfigurationAuthenticationOpenID ConnectExamples

Portabase 控制面板設定身份驗證 OpenID Connect 範例


Configuration guide for Authentik via OIDC in Portabase.

Portabase 中透過OIDC配置 Authentik 的指南。

The integration of [Authentik](https://github.com/goauthentik/authentik) offers a modern authentication solution, ideal for self-hosting your Portabase instance.

[Authentik](https://github.com/goauthentik/authentik)的整合提供了一種現代化的身份驗證解決方案，非常適合自行託管 Portabase 實例。

**[Configuration Steps](#p-018)｜[設定步驟](#p-018)**

**[Configure the application](#p-018)｜[配置應用程式](#p-018)**

![Authentik - Configure the application](<../images/25e93a8d-image.png>)

**[Choose a provider type](#p-018)｜[選擇提供者類型](#p-018)**

Choose **OAuth2/OpenID Provider**.

選擇**OAuth2/OpenID 提供者**。

![Authentik - Choose a provider type](<../images/9b52ebd4-image.png>)

**[Configure OAuth2 provider](#p-018)｜[設定 OAuth2 提供者](#p-018)**

Set the authorized redirect URL to allow returning to Portabase after logging in:

設定授權重定向URL以允許登入後返回 Portabase：

-   **Redirect URLs/Origins**: [https://portabase.your-domain.com/api/auth/sso/callback/authentik](https://portabase.your-domain.com/api/auth/sso/callback/authentik)  
    **重定向 URL/來源**：[https://portabase.your-domain.com/api/auth/sso/callback/authentik](https://portabase.your-domain.com/api/auth/sso/callback/authentik)

![Authentik - Configure OAuth2 provider](<../images/e82a6d2b-image.png>)

**[Configure bindings](#p-018)｜[配置綁定](#p-018)**

![Authentik - Configure bindings](<../images/6d8436ca-image.png>)

**[Review the application and provider](#p-018)｜[審核申請與提供者](#p-018)**

![Authentik - Review the application and provider](<../images/0efdc129-image.png>)

**[Environment Variables](#p-018)｜[環境變數](#p-018)**

Configure Portabase with the following values. This example uses the dynamic `AUTH_OIDC_AUTHENTIK_` prefix to isolate the configuration.

請使用下列值配置 Portabase。本範例使用動態前綴`AUTH_OIDC_AUTHENTIK_`來隔離配置。

```
# Identifier and Title
AUTH_OIDC_AUTHENTIK_ID="authentik"
AUTH_OIDC_AUTHENTIK_TITLE="Authentik"
AUTH_OIDC_AUTHENTIK_DESC="Login via my Authentik instance"

# OIDC Credentials
AUTH_OIDC_AUTHENTIK_CLIENT="portabase"
AUTH_OIDC_AUTHENTIK_SECRET="your-authentik-secret"
AUTH_OIDC_AUTHENTIK_ISSUER_URL="https://authentik.your-domain.com/application/o/<authentik-slug>/"
AUTH_OIDC_AUTHENTIK_HOST="authentik:3000" # If in the same Docker network or authentik.your-domain.com

# Advanced Settings
AUTH_OIDC_AUTHENTIK_SCOPES="openid profile email groups"
AUTH_OIDC_AUTHENTIK_PKCE=true

# Role Mapping
AUTH_OIDC_AUTHENTIK_ROLE_MAP="admin:admin,default:user"

AUTH_OIDC_AUTHENTIK_ALLOW_UNLINKING=false

TRUSTED_DOMAINS="https://{Authentik URL}, https://{Portabase URL}"
```

**[Specific Endpoints (Optional)](#p-018)｜[具體端點（可選）](#p-018)**

If automatic discovery doesn't work, you can manually specify the endpoints:

如果自動發現功能失效，您可以手動指定端點：

```
AUTH_OIDC_AUTHENTIK_DISCOVERY_ENDPOINT="https://authentik.your-domain.com//application/o/<authentik-slug>/.well-known/openid-configuration"
AUTH_OIDC_AUTHENTIK_JWKS_ENDPOINT="https://authentik.your-domain.com//application/o/<authentik-slug>/.well-known/jwks.json"
```

Last updated on

最後更新於

[

PocketID

Configuration guide for PocketID via OIDC in Portabase.

Portabase 中透過OIDC配置 PocketID 的指南。

](https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/pocketid)[

OAuth2 Configuration

OAuth2 配置

Understand the generic OAuth2 configuration in Portabase.

了解 Portabase 中的通用 OAuth2 配置。

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/setup)

---

<a id="c-13"></a>

###### OAuth2

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-14"></a>

###### OAuth2 Configuration｜OAuth2 配置

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-019"></a>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oauth2/setup>

Portabase DashboardConfigurationAuthenticationOAuth2

Portabase 控制面板設定身份驗證 OAuth2


Understand the generic OAuth2 configuration in Portabase.

了解 Portabase 中的通用 OAuth2 配置。

Portabase supports dynamic addition of OAuth2 providers through a series of `AUTH_SOCIAL_*` variables. This page explains the general operation, available variables, and role management.

Portabase 支援透過一系列`AUTH_SOCIAL_*`變數動態新增 OAuth2 提供者。本頁面將介紹其一般操作、可用變數和角色管理。

**[Quick Setup](#p-019)｜[快速設定](#p-019)**

**[Enable a provider](#p-019)｜[啟用提供者](#p-019)**

Define a Client ID and Client Secret pair for the provider of your choice (e.g., Google, GitHub).

為您選擇的提供者（例如 Google、GitHub）定義客戶端ID和客戶端金鑰對。

**[Deploy](#p-019)｜[部署](#p-019)**

Apply these environment variables to your Portabase instance.

將這些環境變數套用到您的 Portabase 實例。

**[Configure Callback](#p-019)｜[配置回呼](#p-019)**

Add the redirect URL in the provider's console: `https://<your-domain>/api/auth/callback/<providerId>`

在提供者控制台中新增重定向URL ： `https://<your-domain>/api/auth/callback/<providerId>`

**[Verify](#p-019)｜[驗證](#p-019)**

Test the connection from your dashboard login page.

從您的控制面板登入頁面測試連線。

**[Configure with the CLI](#p-019)｜[使用CLI配置](#p-019)**

If the dashboard was created with the [Portabase CLI](#p-088), add the provider with [`portabase dashboard auth add`](#p-097). Supported providers: `google`, `github`, `discord`, `apple`, `linkedin`, `x`, `reddit`.

如果儀表板是使用 [Portabase CLI](#p-088)創建，則使用 [`portabase dashboard auth add`](#p-097)新增提供者。支援的提供程序： `google`, `github`, `discord`, `apple`, `linkedin`, `x`, `reddit` 。

```
portabase dashboard set ./my-dashboard url https://backup.example.com

printf '%s\n' "$GITHUB_SECRET" | portabase dashboard auth add ./my-dashboard oauth github \
  --client Iv1.0123456789 --secret-stdin --title "GitHub"

portabase restart ./my-dashboard
```

The command writes `AUTH_SOCIAL_<PROVIDER>_CLIENT`, `AUTH_SOCIAL_<PROVIDER>_SECRET` and `AUTH_SOCIAL_<PROVIDER>_TITLE`. Map roles with `portabase dashboard set ./my-dashboard role_map "admin:admin,default:user"`.

該指令寫入`AUTH_SOCIAL_<PROVIDER>_CLIENT`, `AUTH_SOCIAL_<PROVIDER>_SECRET`和`AUTH_SOCIAL_<PROVIDER>_TITLE` 。映射角色與`portabase dashboard set ./my-dashboard role_map "admin:admin,default:user"` 。

List and remove providers with [`portabase dashboard auth list`](#p-097) and [`portabase dashboard auth remove`](#p-097).

列出並刪除帶有 [`portabase dashboard auth list`](#p-097)和 [`portabase dashboard auth remove`](#p-097)的提供者。

The CLI prints a callback URL ending in `/api/auth/sso/callback/<providerId>`. For OAuth2 providers, register the URL shown in [Quick Setup](#p-019) instead.

CLI印一個回呼URL該回呼以`/api/auth/sso/callback/<providerId>`結尾。對於 OAuth2 提供程序，請改用 [快速設定](#p-019)中顯示的URL 。

**[Configuration Variables](#p-019)｜[配置變數](#p-019)**

You can configure a "default" provider via `AUTH_SOCIAL_*` or multiple providers via `AUTH_SOCIAL_<NAME>_*`.

您可以透過`AUTH_SOCIAL_*`配置一個「預設」供應商，或透過`AUTH_SOCIAL_<NAME>_*`配置多個提供者。

Prop

支柱

Type

類型

Linking a provider to an existing account is controlled by `AUTH_ALLOW_LINKING`, and a user's ability to detach it afterwards by `AUTH_ALLOW_UNLINKING`. Both are described in [Account Linking](#p-014).

將提供者連結到現有帳戶由`AUTH_ALLOW_LINKING`控制，用戶之後將其分離的能力由`AUTH_ALLOW_UNLINKING`控制。兩者都在 [帳戶連結](#p-014)中進行了描述。

**[Dynamic Providers](#p-019)｜[動態提供者](#p-019)**

To add multiple services, use the `AUTH_SOCIAL_<PROVIDER>_*` prefix. The `providerId` will be the lowercase version of the prefix.

若要新增多個服務，請使用 `AUTH_SOCIAL_<PROVIDER>_*` 前綴。 `providerId` 將是前綴的小寫版本。

```
# Example for Google
AUTH_SOCIAL_GOOGLE_CLIENT="xxx"
AUTH_SOCIAL_GOOGLE_SECRET="yyy"
AUTH_SOCIAL_GOOGLE_TITLE="Google Enterprise"
```

If you use standard names (`google`, `github`, `discord`, etc.), Portabase automatically applies the corresponding icon and brand color.

如果您使用標準名稱（ `google`, `github`, `discord`等），Portabase 會自動套用對應的圖示和品牌顏色。

**[Role Management](#p-019)｜[角色管理](#p-019)**

The `AUTH_ROLE_MAP` variable allows mapping your provider's groups/roles to Portabase's internal roles. It uses the format `remote_role:portabase_role`, separated by commas.

`AUTH_ROLE_MAP`變數可讓您將提供者的群組/角色對應到 Portabase 的內部角色。它使用`remote_role:portabase_role`格式，以逗號分隔。

-   `admin:admin`: Maps the remote "admin" role to the local "admin" role.  
    `admin:admin` ：將遠端「admin」角色對應到本地「admin」角色。
-   `default:user`: Sets the default role if no match is found.  
    `default:user` ：如果找不到匹配項，則設定預設角色。

Full example: `admin:admin,editor:member,default:user`

完整範例： `admin:admin,editor:member,default:user`

**[Configuration Guides](#p-019)｜[配置指南](#p-019)**

Choose a provider to see its specific configuration steps:

選擇服務提供者以查看其特定配置步驟：

[

**Google**

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/google)[

**GitHub**

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/github)[

**Discord**

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/discord)[

**Apple｜蘋果**

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/apple)[

**LinkedIn**

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/linkedin)[

**X (Twitter)｜X（推特）**

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/x)[

**Reddit**

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/reddit)

Last updated on

最後更新於

[

Authentik

Configuration guide for Authentik via OIDC in Portabase.

Portabase 中透過OIDC配置 Authentik 的指南。

](https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/authentik)[

Google

Configure authentication via Google in Portabase.

在Portabase中設定透過Google進行驗證。

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/google)

---

<a id="c-15"></a>

###### Configurations｜配置

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-020"></a>

###### Google

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/google>

Portabase DashboardConfigurationAuthenticationOAuth2Configurations

Portabase 控制面板配置身份驗證 OAuth2 配置


Configure authentication via Google in Portabase.

在Portabase中設定透過Google進行驗證。

Google integration allows your users to sign-in via their Google or Google Workspace account.

Google 整合可讓您的使用者透過他們的 Google 或 Google Workspace 帳戶登入。

Check the [OAuth2 configuration](#p-019) to understand global variables and role management.

查看 [OAuth2 設定](#p-019)以了解全域變數和角色管理。

**[Configuration Steps](#p-020)｜[設定步驟](#p-020)**

**[Project Creation](#p-020)｜[專案創建](#p-020)**

Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project or select an existing one.

前往 [Google Cloud Console](https://console.cloud.google.com/)並建立一個新專案或選擇一個現有專案。

**[Consent Screen](#p-020)｜[同意畫面](#p-020)**

Go to **APIs & Services** > **OAuth consent screen**:

前往**API 和服務**>**OAuth 授權同意頁面**：

-   Choose the user type: **External** (any Google account) or **Internal** (restricted to your Workspace organization).  
    選擇使用者類型：**外部使用者**（任何 Google 帳戶）或**內部使用者**（僅限於您的 Workspace 組織）。
-   Complete the mandatory information (App name, email).  
    請填寫必填資料（套用名稱、信箱）。

**[Credentials Creation](#p-020)｜[憑證創建](#p-020)**

Open **APIs & Services** > **Credentials**. Click **Create Credentials** > **OAuth client ID**. Select **Web application**.

開啟**API和服務**>**憑證**。點選**建立憑證**>**OAuth客戶端ID **。選擇**Web應用程式**。

**[Redirect URLs](#p-020)｜[重定向 URL](#p-020)**

In **Authorized redirect URIs**, add the following URL: `https://portabase.your-domain.com/api/auth/callback/google`

在**已授權重定向 URI**中，新增以下內容URL: `https://portabase.your-domain.com/api/auth/callback/google`

**[Get the Keys](#p-020)｜[取得鑰匙](#p-020)**

Validate to get your **client ID** and **client secret**.

驗證以取得您的**客戶端ID**和**客戶端金鑰**。

**[Environment Variables](#p-020)｜[環境變數](#p-020)**

Add the following variables to your `.env` file or Docker configuration:

將以下變數加入您的`.env`檔案或Docker配置中：

```
AUTH_SOCIAL_GOOGLE_CLIENT="your-google-client-id"
AUTH_SOCIAL_GOOGLE_SECRET="your-google-client-secret"
```

**[Restart the Dashboard](#p-020)｜[重啟控制面板](#p-020)**

After updating your `.env` file, restart the instance:

更新`.env`檔案後，請重新啟動實例：

**Via CLI (Recommended)**

**建議使用CLI**

```
portabase restart .
```

**Via Docker Compose**

**透過 Docker Compose**

Last updated on

最後更新於

[

OAuth2 Configuration

OAuth2 配置

Understand the generic OAuth2 configuration in Portabase.

了解 Portabase 中的通用 OAuth2 配置。

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/setup)[

GitHub

Configure authentication via GitHub in Portabase.

在 Portabase 中設定透過 GitHub 進行身份驗證。

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/github)

---

<a id="p-021"></a>

###### GitHub

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/github>

Portabase DashboardConfigurationAuthenticationOAuth2Configurations

Portabase 控制面板配置身份驗證 OAuth2 配置


Configure authentication via GitHub in Portabase.

在 Portabase 中設定透過 GitHub 進行身份驗證。

GitHub integration allows developers and organization members to sign in easily.

GitHub 整合可讓開發人員和組織成員輕鬆登入。

Check the [OAuth2 configuration](#p-019) to understand global variables and role management.

查看[OAuth2配置](#p-019)了解全域變數和角色管理。

**[Configuration Steps](#p-021)｜[設定步驟](#p-021)**

**[Access Developer Settings](#p-021)｜[訪問開發者設定](#p-021)**

Log in to GitHub and go to [Developer Settings](https://github.com/settings/developers).

登入GitHub，進入[開發者設定](https://github.com/settings/developers)。

![GitHub Developer Settings](<../images/857491de-image.png>)

**[Register an Application](#p-021)｜[註冊申請](#p-021)**

Click **New OAuth App**:

點擊**新建 OAuth 應用程式**：

-   **Application name**: Portabase.  
    **應用程式名稱**：Portabase。
    
-   **Homepage URL**: Your domain (e.g., `https://portabase.your-domain.com`).  
    **首頁 URL**：您的網域名稱（例如，`https://portabase.your-domain.com`）。
    
-   **Authorization callback URL**: `https://portabase.your-domain.com/api/auth/callback/github`  
    **授權回呼URL**：`https://portabase.your-domain.com/api/auth/callback/github`
    
    ![GitHub OAuth app creation](<../images/18b05ceb-image.png>)
    

**[Generate Keys](#p-021)｜[產生金鑰](#p-021)**

Click **Register application**. Copy the **Client ID**, then generate a **Client Secret** and store it securely.

點擊**註冊應用程式**。複製**Client ID**，然後產生**Client Secret**並安全儲存。

**[Environment Variables](#p-021)｜[環境變數](#p-021)**

Use the `GITHUB` prefix for your variables:

對變數使用 `GITHUB` 前綴：

```
AUTH_SOCIAL_GITHUB_CLIENT="your-github-client-id"
AUTH_SOCIAL_GITHUB_SECRET="your-github-client-secret"
```

**[Restart the Dashboard](#p-021)｜[重啟儀表板](#p-021)**

After updating your `.env` file, restart the instance:

更新 `.env` 檔案後，重新啟動執行個體：

**Via CLI (Recommended)**

**透過CLI（推薦）**

```
portabase restart .
```

**Via Docker Compose**

**透過 Docker Compose**

Last updated on

最後更新於

[

Google

Configure authentication via Google in Portabase.

在Portabase中設定透過Google進行驗證。

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/google)[

Discord

Configure authentication via Discord in Portabase.

透過 Portabase 中的 Discord 設定身份驗證。

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/discord)

---

<a id="p-022"></a>

###### Discord

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/discord>

Portabase DashboardConfigurationAuthenticationOAuth2Configurations

Portabase 控制面板配置身份驗證 OAuth2 配置


Configure authentication via Discord in Portabase.

透過 Portabase 中的 Discord 設定身份驗證。

Discord integration is ideal for communities and teams already using Discord for their communication.

Discord 整合對於已經使用 Discord 進行溝通的社群和團隊來說是理想的選擇。

Check the [OAuth2 configuration](#p-019) to understand global variables and role management.

查看[OAuth2配置](#p-019)了解全域變數和角色管理。

**[Configuration Steps](#p-022)｜[設定步驟](#p-022)**

**[Create an Application](#p-022)｜[創建應用程式](#p-022)**

Go to the [Discord Developer Portal](https://discord.com/developers/applications) and click **New Application**.

前往 [Discord 開發者入口網站](https://discord.com/developers/applications)，然後點選 **新應用程式**。

![GitHub Developer Settings](<../images/a7ee6d30-image.png>)

**[Configure OAuth2](#p-022)｜[配置OAuth2](#p-022)**

Go to the **OAuth2** > tab:

前往 **OAuth2** > 選項卡：

-   Add the redirect URL: `https://portabase.your-domain.com/api/auth/callback/discord`  
    新增重定向URL: `https://portabase.your-domain.com/api/auth/callback/discord`
    
    ![GitHub Developer Settings](<../images/7ce7201d-image.png>)
    

**[Select Permissions](#p-022)｜[選擇權限](#p-022)**

In **OAuth2** > **URL Generator**, select the `identify` and `email` scopes. These permissions are necessary to create the user account.

在 **OAuth2**>**URL 生成器**中，選擇 `identify` 和 `email` 範圍。建立使用者帳戶需要這些權限。

![GitHub Developer Settings](<../images/3b37f22e-image.png>)

**[Get Credentials](#p-022)｜[取得憑證](#p-022)**

Copy the **Client ID**. Click **Reset Secret** to get your **Client Secret**.

複製**客戶端ID**。點擊**重置密鑰**以獲取您的**客戶端密鑰**。

**[Environment Variables](#p-022)｜[環境變數](#p-022)**

Add these lines to your configuration:

將這些行新增到您的配置中：

```
AUTH_SOCIAL_DISCORD_CLIENT="your-discord-client-id"
AUTH_SOCIAL_DISCORD_SECRET="your-discord-client-secret"
```

**[Restart the Dashboard](#p-022)｜[重啟儀表板](#p-022)**

After updating your `.env` file, restart the instance:

更新 `.env` 檔案後，重新啟動執行個體：

**Via CLI (Recommended)**

**透過CLI（推薦）**

```
portabase restart .
```

**Via Docker Compose**

**透過 Docker Compose**

Last updated on

最後更新於

[

GitHub

Configure authentication via GitHub in Portabase.

在 Portabase 中設定透過 GitHub 進行身份驗證。

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/github)[

Reddit

Configure authentication via Reddit in Portabase.

透過 Portabase 中的 Reddit 配置身份驗證。

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/reddit)

---

<a id="p-023"></a>

###### Reddit

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/reddit>

Portabase DashboardConfigurationAuthenticationOAuth2Configurations

Portabase 控制面板配置身份驗證 OAuth2 配置


Configure authentication via Reddit in Portabase.

透過 Portabase 中的 Reddit 配置身份驗證。

Reddit integration allows your users to sign in via their Reddit account, ideal for community platforms.

Reddit 整合允許您的用戶透過其 Reddit 帳戶登錄，非常適合社群平台。

Check the [OAuth2 configuration](#p-019) to understand global variables and role management.

查看[OAuth2配置](#p-019)了解全域變數和角色管理。

**[Configuration Steps](#p-023)｜[設定步驟](#p-023)**

**[Access Reddit Apps](#p-023)｜[訪問 Reddit 應用程式](#p-023)**

Log in to your account on [Reddit](https://www.reddit.com/) and go to [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps).

在 [Reddit](https://www.reddit.com/) 上登入您的帳戶，然後前往 [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps)。

![Reddit - Authorized applications](<../images/ef7bf354-image.png>)

**[Create an Application](#p-023)｜[創建應用程式](#p-023)**

At the bottom of the page, click **Create another app...**:

在頁面底部，按一下「**建立另一個應用程式...**」：

-   **Name**: Portabase.  
    **名稱**：Portabase。
    
-   Select **Web app**.  
    選擇 **網頁應用程式**。
    
-   **Description**: Data management platform.  
    **描述**：資料管理平台。
    
-   **Redirect URI**: `https://portabase.your-domain.com/api/auth/callback/reddit`  
    **重定向URI**：`https://portabase.your-domain.com/api/auth/callback/reddit`
    
    ![Reddit - Create application](<../images/92ecdbce-image.png>)
    

**[Get Credentials](#p-023)｜[取得憑證](#p-023)**

After clicking **Create app**, you will see:

點擊**建立應用程式**後，您將看到：

-   The **Client ID** (indicated just below the application name).  
    **客戶端ID**（在應用程式名稱下方指示）。
-   The **Client Secret** (indicated next to the secret field).  
    **客戶端秘密**（在秘密字段旁邊指示）。

**[Environment Variables](#p-023)｜[環境變數](#p-023)**

Use these variables to configure Reddit authentication:

使用這些變數來配置 Reddit 身份驗證：

```
AUTH_SOCIAL_REDDIT_CLIENT="your-reddit-client-id"
AUTH_SOCIAL_REDDIT_SECRET="your-reddit-client-secret"
```

**[Restart the Dashboard](#p-023)｜[重啟控制面板](#p-023)**

After updating your `.env` file, restart the instance:

更新 `.env` 檔案後，重新啟動執行個體：

**Via CLI (Recommended)**

**透過CLI（推薦）**

```
portabase restart .
```

**Via Docker Compose**

**透過 Docker Compose**

Last updated on

最後更新於

[

Discord

Configure authentication via Discord in Portabase.

透過 Portabase 中的 Discord 設定身份驗證。

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/discord)[

LinkedIn

Configure authentication via LinkedIn in Portabase.

在 Portabase 中透過 LinkedIn 設定身份驗證。

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/linkedin)

---

<a id="p-024"></a>

###### LinkedIn

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/linkedin>

Portabase DashboardConfigurationAuthenticationOAuth2Configurations

Portabase 控制面板配置身份驗證 OAuth2 配置


Configure authentication via LinkedIn in Portabase.

在 Portabase 中透過 LinkedIn 設定身份驗證。

LinkedIn integration allows your users to sign in via their professional LinkedIn profile.

LinkedIn 整合允許您的用戶透過其專業的 LinkedIn 個人資料登入。

Check the [OAuth2 configuration](#p-019) to understand global variables and role management.

查看 [OAuth2 設定](#p-019)以了解全域變數和角色管理。

**[Configuration Steps](#p-024)｜[設定步驟](#p-024)**

**[Create a LinkedIn Application](#p-024)｜[建立 LinkedIn 應用程式](#p-024)**

Go to the [LinkedIn Developer Portal](https://www.linkedin.com/developers/apps) and click **Create app**.

前往[LinkedIn開發者入口網站](https://www.linkedin.com/developers/apps)，點選**建立應用程式**。

-   Fill in the name, organization (or personal profile), and your website URL.  
    填寫姓名、組織（或個人資料）和您的網站URL。
    
-   Accept the terms of use.  
    接受使用條款。
    
    ![Reddit - Authorized applications](<../images/432aca37-image.png>)
    

**[Enable Sign In with LinkedIn Product](#p-024)｜[啟用使用 LinkedIn 產品登入](#p-024)**

In the **Products** tab, find **Sign In with LinkedIn** and click **Request access**. This is necessary to enable authentication.

在 **產品**標籤中，找到**使用 LinkedIn 登入**並點擊**請求存取權限**。這是啟用身份驗證所必需的。

**[Configure OAuth 2.0](#p-024)｜[配置 OAuth 2.0](#p-024)**

Go to the **Auth** tab:

轉到 **驗證** 選項卡：

-   In **Authorized redirect URLs for your app**, add: `https://portabase.your-domain.com/api/auth/callback/linkedin`  
    在 **您的應用程式的授權重定向 URL** 中，新增：`https://portabase.your-domain.com/api/auth/callback/linkedin`

**[Get Credentials](#p-024)｜[取得憑證](#p-024)**

Still in the **Auth** tab, you will find your **Client ID** and **Client Secret**.

仍然在 **Auth**選項卡中，您將找到您的**Client ID**和**Client Secret**。

**[Environment Variables](#p-024)｜[環境變數](#p-024)**

Use these variables to configure LinkedIn authentication:

使用這些變數來配置 LinkedIn 身份驗證：

```
AUTH_SOCIAL_LINKEDIN_CLIENT="your-linkedin-client-id"
AUTH_SOCIAL_LINKEDIN_SECRET="your-linkedin-client-secret"
```

**[Restart the Dashboard](#p-024)｜[重啟儀表板](#p-024)**

After updating your `.env` file, restart the instance:

更新 `.env` 檔案後，重新啟動執行個體：

**Via CLI (Recommended)**

**透過CLI（推薦）**

```
portabase restart .
```

**Via Docker Compose**

**透過 Docker Compose**

Last updated on

最後更新於

[

Reddit

Configure authentication via Reddit in Portabase.

透過 Portabase 中的 Reddit 配置身份驗證。

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/reddit)[

Apple

蘋果

Configure authentication via Apple in Portabase.

在 Portabase 中透過 Apple 設定身份驗證。

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/apple)

---

<a id="p-025"></a>

###### Apple｜蘋果

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/apple>

Portabase DashboardConfigurationAuthenticationOAuth2Configurations

Portabase 控制面板配置身份驗證 OAuth2 配置


Configure authentication via Apple in Portabase.

在 Portabase 中透過 Apple 設定身份驗證。

Apple integration (Sign in with Apple) allows your users to sign in via their Apple account, offering a secure and privacy-respecting experience.

Apple 整合（使用 Apple 登入）可讓您的用戶透過其 Apple 帳戶登錄，從而提供安全且尊重隱私的體驗。

Sign in with Apple requires an **Apple Developer** account (paid program).

使用 Apple 登入需要 **Apple Developer** 帳戶（付費程式）。

Check the [OAuth2 configuration](#p-019) to understand global variables and role management.

查看[OAuth2配置](#p-019)了解全域變數和角色管理。

**[Configuration Steps](#p-025)｜[設定步驟](#p-025)**

**[Access Apple Developer Portal](#p-025)｜[訪問Apple開發者入口網站](#p-025)**

Log in to your account on the [Apple Developer Portal](https://developer.apple.com/account/).

在[Apple開發者入口網站](https://developer.apple.com/account/)登入您的帳戶。

**[Create an Identifier (Services ID)](#p-025)｜[建立標識符（服務ID）](#p-025)**

In **Certificates, Identifiers & Profiles** > **Identifiers**, create a new **Services ID**.

在 **證書、識別碼和設定檔**>**識別碼**中，建立新的**服務 ID**。

-   Select the **Services IDs** type.  
    選擇 **服務 ID** 類型。
-   Give a name and a unique identifier (e.g., `com.your-domain.portabase`).  
    給予名稱和唯一識別碼（例如，`com.your-domain.portabase`）。

**[Configure Sign In with Apple](#p-025)｜[設定使用 Apple 登入](#p-025)**

Enable **Sign In with Apple** for this Services ID and click **Configure**.

為此服務 ID 啟用 **使用 Apple 登入**，然後按一下**設定**。

-   In **Primary App ID**, select your primary application or create one.  
    在**主應用程式ID**中，選擇您的主應用程式或建立一個。
-   In **Domains and Subdomains**, add your domain (e.g., `portabase.your-domain.com`).  
    在**域和子域**中，新增您的域（例如，`portabase.your-domain.com`）。
-   In **Return URLs**, add: `https://portabase.your-domain.com/api/auth/callback/apple`  
    在 **返回 URL** 中，新增：`https://portabase.your-domain.com/api/auth/callback/apple`

**[Create an Authentication Key](#p-025)｜[建立認證金鑰](#p-025)**

In **Keys**, create a new key.

在 **Keys** 中，建立一個新密鑰。

-   Check **Sign In with Apple**.  
    選取**使用 Apple 登入**。
-   Associate it with the previously created Services ID.  
    將其與先前創建的服務ID相關聯。
-   Download the `.p8` file (keep it, it is only downloadable once).  
    下載 `.p8` 檔案（保留它，只能下載一次）。

**[Get Information](#p-025)｜[取得資料](#p-025)**

Note the following elements:

請注意以下要素：

-   **Services ID** (your Client ID).  
    **服務ID**（您的客戶ID）。
-   **Team ID** (visible in your Apple Developer profile).  
    **團隊ID**（在您的 Apple 開發者個人檔案中可見）。
-   **Key ID** (displayed in your key details).  
    **金鑰ID**（顯示在您的金鑰詳細資料中）。

**[Generate Client Secret](#p-025)｜[產生客戶端金鑰](#p-025)**

Apple does not use a static secret but a signed JWT token. Use a script or your pipeline to generate this secret using your `.p8` file.

Apple 不使用靜態金鑰，而是使用簽署的 JWT 令牌。使用腳本或管道透過 `.p8` 檔案產生此機密。

**[Environment Variables](#p-025)｜[環境變數](#p-025)**

Add these variables to your configuration:

將這些變數新增到您的配置中：

```
AUTH_SOCIAL_APPLE_CLIENT="your-apple-services-id"
AUTH_SOCIAL_APPLE_SECRET="your-apple-signed-jwt"
AUTH_SOCIAL_APPLE_APP_BUNDLE_IDENTIFIER="com.your-domain.portabase"
```

**[Restart the Dashboard](#p-025)｜[重啟儀表板](#p-025)**

After updating your `.env` file, restart the instance:

更新 `.env` 檔案後，重新啟動執行個體：

**Via CLI (Recommended)**

**透過CLI（推薦）**

```
portabase restart .
```

**Via Docker Compose**

**透過 Docker Compose**

Last updated on

最後更新於

[

LinkedIn

Configure authentication via LinkedIn in Portabase.

在 Portabase 中透過 LinkedIn 設定身份驗證。

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/linkedin)[

X (Twitter)

X（推特）

Configure authentication via X (formerly Twitter) in Portabase.

在 Portabase 中透過 X（以前稱為 Twitter）配置身份驗證。

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/x)

---

<a id="p-026"></a>

###### X (Twitter)｜X（推特）

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/x>

Portabase DashboardConfigurationAuthenticationOAuth2Configurations

Portabase 控制面板配置身份驗證 OAuth2 配置


Configure authentication via X (formerly Twitter) in Portabase.

在 Portabase 中透過 X（以前稱為 Twitter）配置身份驗證。

Integration with X (Twitter) allows users to sign in via their social account.

與 X (Twitter) 整合允許用戶透過其社交帳戶登入。

Check the [OAuth2 configuration](#p-019) to understand global variables and role management.

查看[OAuth2配置](#p-019)了解全域變數和角色管理。

**[Configuration Steps](#p-026)｜[設定步驟](#p-026)**

**[Create an Application](#p-026)｜[創建應用程式](#p-026)**

Log in to the [Twitter Console](https://console.x.com/) and create a **Project** and an **App**.

登入[Twitter控制台](https://console.x.com/) 並創建一個 **專案**和一個**應用程式**。

![Reddit - Authorized applications](<../images/f5bff6a9-image.png>)

**[OAuth 2.0 Settings](#p-026)｜[OAuth2.0設定](#p-026)**

In **User authentication settings**, enable **OAuth 2.0** and choose the type **Web App, Automated App or Bot**.

在 **使用者驗證設定**中，啟用**OAuth 2.0**並選擇類型**Web 應用程式、自動化應用程式或機器人**。

**[URLs and Scopes](#p-026)｜[URL 和範圍](#p-026)**

-   **Callback URL**: `https://portabase.your-domain.com/api/auth/callback/x`  
    **回呼URL**：`https://portabase.your-domain.com/api/auth/callback/x`
-   **Scopes**: Select at least `users.read` and `tweet.read`.  
    **範圍**：至少選擇`users.read`和`tweet.read`。

**[Credentials](#p-026)｜[憑證](#p-026)**

Save to get your **Client ID** and **Client Secret**.

儲存以取得您的 **Client ID**和**Client Secret**。

**[Environment Variables](#p-026)｜[環境變數](#p-026)**

You can use the `X` or `TWITTER` prefix depending on your preference (ensure the callback URL matches the lowercase version of the prefix).

您可以根據您的偏好使用 `X` 或 `TWITTER` 前綴（確保回呼 URL 與前綴的小寫版本相符）。

```
AUTH_SOCIAL_X_CLIENT="your-x-client-id"
AUTH_SOCIAL_X_SECRET="your-x-client-secret"
```

**[Restart the Dashboard](#p-026)｜[重啟儀表板](#p-026)**

After updating your `.env` file, restart the instance:

更新 `.env` 檔案後，重新啟動執行個體：

**Via CLI (Recommended)**

**透過CLI（推薦）**

```
portabase restart .
```

**Via Docker Compose**

**透過 Docker Compose**

Last updated on

最後更新於

[

Apple

蘋果

Configure authentication via Apple in Portabase.

在 Portabase 中透過 Apple 設定身份驗證。

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/apple)[

User Guide

使用者指南

Manage your agents, databases, channels and backup policies on a daily basis.

每天管理您的代理商、資料庫、頻道和備份策略。

](https://portabase.io/docs/dashboard/guide)

---

<a id="p-027"></a>

###### User Guide｜使用者指南

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/guide>

Portabase Dashboard

Portabase 控制面板


Manage your agents, databases, channels and backup policies on a daily basis.

每天管理您的代理商、資料庫、頻道和備份策略。

---

**[Understanding the Architecture](#p-027)｜[理解架構](#p-027)**

Portabase runs as two separately deployed components.

Portabase 會以兩個單獨部署的元件運作。

**The Dashboard** centralizes configuration: agents, databases, backup schedules, retention, alerts and storage channels.

**儀表板**集中配置：代理程式、資料庫、備份計畫、保留、警報和儲存通道。

**The Agent** is a Rust binary installed on the same network as your databases. It is responsible for:

**代理**是一個 Rust 二進位文件，安裝在與資料庫相同的網路上。它負責：

-   detecting and reporting your databases automatically  
    自動檢測並報告您的資料庫
-   executing backups according to the defined schedule  
    根據定義的計畫執行備份
-   sending backup files to your storage destinations  
    將備份檔案傳送到您的儲存目的地
-   reporting logs and status back to the dashboard  
    將日誌和狀態報告回儀表板

The dashboard never connects directly to your databases. Everything goes through the agent. This architecture lets you protect databases on a private network or behind a firewall without exposing your servers.

儀表板永遠不會直接連接到您的資料庫。一切都經過代理。此架構使您可以保護專用網路上或防火牆後面的資料庫，而無需暴露您的伺服器。

![Dashboard → Agent → Databases architecture](<../images/74b8d6ea-image.png>)

The agent regularly sends a **ping** to the dashboard. This ping transmits the list of available databases, agent status and operation results. In return, the dashboard sends instructions (schedules, restore orders, etc.).

代理定期向儀表板發送 **ping**。此 ping 傳輸可用資料庫清單、代理程式狀態和操作結果。作為回報，儀表板發送指示（時間表、恢復訂單等）。

**[Entity Hierarchy](#p-027)｜[實體層次結構](#p-027)**

```
Organisation
├── Agents
│   └── Databases (discovered automatically)
│       ├── Project assignment (optional)
│       ├── Backup policy (cron)
│       ├── Retention policy
│       ├── Alert policies  ──→  Notification channels
│       └── Storage policies ──→ Storage channels
├── Projects (logical grouping)
├── Notification channels
└── Storage channels
```

---

**[Managing Agents](#p-027)｜[管理代理人](#p-027)**

An agent represents one instance of the Portabase Agent program deployed on a server. A single agent can manage multiple databases on the same server. If you have databases on multiple servers, create one agent per server.

代理代表部署在伺服器上的 Portabase Agent 程式的一個實例。單一代理可以管理同一伺服器上的多個資料庫。如果您的資料庫位於多台伺服器上，請為每台伺服器建立一個代理程式。

**[Creating an Agent](#p-027)｜[建立代理](#p-027)**

Prerequisite: you must be `owner` or `admin` of the organisation.

先決條件：您必須是組織的`owner`或`admin`。

![Agents list page](<../images/9cd2c756-image.png>)

Go to **Organisation > Settings > Agents** and click **Add agent**.

前往 **組織 > 設定 > 代理**，然後按一下**新增代理**。

Fill in the fields:

填寫欄位：

-   **Name** - human-readable identifier (e.g. `Production Server EU`, `Dev Machine`)  
    **名稱** - 人類可讀的標識符（例如 `Production Server EU`, `Dev Machine`）
-   **Description** - free notes about this agent's role  
    **描述** - 關於該代理角色的免費註釋

![Create agent dialog](<../images/db8c39cd-image.png>)

Confirm. The agent is created and an **Edge Key** is generated automatically.

確認。代理程式已建立並自動產生 **Edge Key**。

Copy the **Edge Key** from the agent detail page (button **Show Key**), then paste it into the Portabase Agent Rust configuration on your server.

從代理程式詳細資料頁面複製 **Edge Key**（按鈕**顯示金鑰**），然後將其貼上到伺服器上的 Portabase Agent Rust 設定中。

![Registration & Setup panel with Edge Key](<../images/a4ea56f2-image.png>)

**[Verifying the Connection](#p-027)｜[驗證連線](#p-027)**

On next startup, the agent pings the dashboard. You'll know it's connected when:

下次啟動時，代理程式會對儀表板執行 ping 操作。在以下情況下您就會知道它已連接：

-   the **Last Contact** column shows a recent timestamp  
    **最後一次聯絡**列顯示最近的時間戳
-   the status turns green in the interface  
    介面狀態變成綠色

From the first ping, the agent transmits the list of all databases it can see. **These databases appear automatically in the dashboard - you don't need to create them manually.**

從第一次 ping 開始，代理程式會傳輸它可以看到的所有資料庫的清單。 **這些資料庫會自動顯示在儀表板中 - 您無需手動建立它們。**

**[Monitoring Agent Health](#p-027)｜[監控代理健康狀況](#p-027)**

From the agent detail page, the **Health** tab shows a 12-hour ping history as a grid. Each cell represents one ping: green if received, red if missed.

在代理詳細資料頁面中，**運行狀況**標籤以網格形式顯示 12 小時 ping 歷史記錄。每個儲存格代表一個 ping：如果收到則為綠色，如果未收到則為紅色。

![Agent health grid - 12h ping history](<../images/fb610142-image.png>)

---

**[Organising Databases with Projects](#p-027)｜[用專案組織資料庫](#p-027)**

A project is a **logical folder** for grouping databases. It has no effect on backup execution - it is purely an organisational tool.

項目是用於對資料庫進行分組的**邏輯資料夾**。它對備份執行沒有影響——它純粹是一個組織工具。

Typical uses: group all databases for an application, separate production from staging, organise by team or client.

典型用途：將應用程式的所有資料庫分組，將生產與暫存分開，並按團隊或客戶進行組織。

**[Creating a Project](#p-027)｜[創建專案](#p-027)**

Prerequisite: you must be `owner` or `admin` of the organisation.

前提條件：您必須是組織的`owner`或`admin`。

1.  Go to **Organisation > Projects**  
    前往 **組織 > 專案**
2.  Click **New project**  
    點選**新項目**
3.  Give the project a name, choose databases and confirm  
    為項目命名，選擇資料庫並確認

![Create project dialog](<../images/53e5f871-image.png>)

---

**[Configuring a Database](#p-027)｜[配置資料庫](#p-027)**

**[How Databases Appear](#p-027)｜[資料庫如何出現](#p-027)**

Databases are not created manually. They appear automatically as soon as the connected agent detects them via its ping.

資料庫不是手動建立的。一旦連接的代理透過其 ping 偵測到它們，它們就會自動出現。

If a database doesn't appear, check that:

如果資料庫未出現，請檢查：

-   the agent is connected (green status, recent **Last Contact**)  
    代理程式已連線（綠色狀態，最近**最後一次聯絡**）
-   the database is accessible from the agent's server  
    可以從代理伺服器存取資料庫

**[Configuration Tabs](#p-027)｜[配置選項卡](#p-027)**

From the database detail page (**Projects > \[project\] > \[database\]**):

從資料庫詳細資訊頁面（**項目 > \[項目\] > \[資料庫\]**）：

| Tab<br>選項卡 | Content<br>內容 |
| --- | --- |
| **Overview**<br>**概述** | KPIs, status, general information<br>KPI、狀態、一般資訊 |
| **Backups**<br>**備份** | Backup list, manual actions<br>備份列表，手動操作 |
| **Restore**<br>**恢復** | Available restore operations<br>可用的恢復操作 |
| **Schedule**<br>**日程** | Cron schedule + retention<br>Cron 計劃 + 保留 |
| **Alerts**<br>**警報** | Alert policies<br>警報政策 |
| **Storage**<br>**儲存** | Storage policies<br>儲存策略 |
| **Logs**<br>**日誌** | Detailed operation logs<br>詳細操作日誌 |

![Database header with navigation tabs](<../images/64d934d7-image.png>)

**[Triggering a Manual Backup](#p-027)｜[觸發手動備份](#p-027)**

From the **Backups** tab, click **Backup now**. The backup moves to `waiting` status, then `ongoing` as soon as the agent picks it up at the next ping.

在「**備份**」標籤中，按一下「**立即備份**」。一旦代理在下次 ping 時接收到備份，備份就會移至 `waiting` 狀態，然後移至 `ongoing`。

![Backup now button](<../images/17446355-image.png>)

| Status<br>狀態 | Meaning<br>意義 |
| --- | --- |
| `waiting` | Waiting to be picked up by the agent<br>等待代理來接 |
| `ongoing` | Currently running<br>目前正在運行 |
| `success` | Completed successfully<br>順利完成 |
| `failed` | Failed - check the **Logs** tab for details<br>失敗 - 檢查 **日誌** 標籤以取得詳細資訊 |

**[Importing an External Backup](#p-027)｜[導入外部備份](#p-027)**

1.  From the **Backups** tab, click **Import**  
    在“**備份**”標籤中，按一下“**導入**”
2.  Drag and drop your file or browse your filesystem  
    拖放檔案或瀏覽檔案系統

![Import backup dialog](<../images/d966cdaa-image.png>)

**[Restoring a Database](#p-027)｜[恢復資料庫](#p-027)**

Restoration overwrites the current data in the target database. Make sure you have a recent backup before restoring. Restore is not available for Redis and Valkey.

復原會覆蓋目標資料庫中的目前資料。恢復之前請確保您有最近的備份。恢復不適用於 Redis 和 Valkey。

From the **Restore** tab, two options:

在 **恢復** 選項卡中，有兩個選項：

-   **From an existing backup** - choose a backup from the list and click **Restore**  
    **從現有備份**- 從清單中選擇一個備份，然後按一下**還原**
-   **From external storage** - select a file available in one of your storage channels  
    **從外部儲存** - 選擇儲存通道之一可用的文件

---

**[Configuring Channels](#p-027)｜[配置頻道](#p-027)**

Channels are connectors to external services, used in two contexts: **notifications** and **storage**. They are configured at the organisation level and can be reused across multiple databases.

通道是外部服務的連接器，用於兩個上下文：**通知**和**儲存**。它們在組織層級進行配置，並且可以跨多個資料庫重複使用。

**Notification channels**

**通知頻道**

**Creating a channel:**

**建立頻道：**

1.  **Organisation > Notifications > Channels > Add channel**  
    **組織 > 通知 > 頻道 > 新增頻道**
2.  Choose the provider  
    選擇提供者

![Choose notification provider](<../images/d200c24e-image.png>)

3.  Fill in the connection details  
    填寫連接詳細信息
4.  Give the channel a recognisable name (e.g. `Slack #ops-alerts`)  
    為頻道指定一個可識別的名稱（例如`Slack #ops-alerts`）
5.  Test with the **Test** button  
    使用 **測試** 按鈕進行測試
6.  Enable the channel  
    啟用頻道

A disabled channel receives no notifications even if alert policies point to it. Use this flag to temporarily silence a channel without losing its configuration.

即使警報策略指向已停用的頻道，也不會收到任何通知。使用此標誌可以暫時使通道靜默，而不會遺失其配置。

**Storage channels**

**儲存通道**

---

**[Setting Up Policies](#p-027)｜[設定策略](#p-027)**

Policies are configured at the database level. A database can have multiple policies of different types.

策略是在資料庫層級配置的。一個資料庫可以有多個不同類型的策略。

**[Backup Schedule (cron)](#p-027)｜[備份計畫(cron)](#p-027)**

**Where to configure:** database detail page > **Schedule** tab

**配置位置：**資料庫詳細資訊頁面>**計劃**選項卡

The schedule is a cron expression that defines when automatic backups run.

計劃是一個 cron 表達式，定義何時執行自動備份。

```
┌──────── minute (0–59)
│  ┌───── hour (0–23)
│  │  ┌── day of month (1–31)
│  │  │  ┌─ month (1–12)
│  │  │  │  ┌ day of week (0–7, 0 and 7 = Sunday)
│  │  │  │  │
*  *  *  *  *
```

| Expression<br>表達 | Result<br>結果 |
| --- | --- |
| `0 2 * * *` | Every day at 2 AM<br>每天2點AM |
| `0 */6 * * *` | Every 6 hours<br>每 6 小時 |
| `0 2 * * 1` | Every Monday at 2 AM<br>每週一 2 點AM |
| `0 2 1 * *` | 1st of every month at 2 AM<br>每月 1 日 2 點 AM |

Need help building an expression? Use [crontab.guru](https://crontab.guru/?utm_source=portabase.io).

需要幫助建立表達式嗎？使用[crontab.guru](https://crontab.guru/?utm_source=portabase.io)。

![Backup schedule configuration](<../images/c25704d3-image.png>)

To disable automatic backups, switch to **Manual** mode. You can still trigger backups manually from the **Backup now** button.

若要停用自動備份，請切換至 **手動**模式。您仍然可以透過**立即備份** 按鈕手動觸發備份。

Deleting the schedule also deletes the associated retention policy. If you add a schedule later, you will need to reconfigure retention.

刪除計劃也會刪除關聯的保留策略。如果您稍後新增計劃，則需要重新配置保留。

**[Retention Policy](#p-027)｜[保留政策](#p-027)**

**Where to configure:** database detail page > **Schedule** tab > **Retention** section

**配置位置：**資料庫詳細資訊頁面 >**計劃**選項卡 >**保留**部分

**Prerequisite:** an active cron schedule must exist on the database.

**先決條件：** 資料庫上必須存在活動的 cron 計畫。

**count**

**計數**

Keeps only the N most recent backups. Older backups are deleted as new ones are created.

僅保留 N 個最近的備份。建立新備份時，舊備份將被刪除。

| Parameter<br>參數 | Min<br>最小 | Max<br>最大 | Default<br>預設 |
| --- | --- | --- | --- |
| Number of backups<br>備份數量 | 1 | 100 | 7<br>100 7 |

Ideal for development databases or when disk space is limited.

非常適合開發資料庫或磁碟空間有限的情況。

**days**

**天**

**gfs**

**政府飛行服務處**

There can only be one retention policy per database. Creating a new one automatically replaces the existing one.

每個資料庫只能有一個保留策略。建立新的會自動替換現有的。

![Backup retention policy configuration](<../images/dba355be-image.png>)

**[Alert Policies](#p-027)｜[提醒政策](#p-027)**

**Where to configure:** database detail page > **Alerts** tab

**配置位置：**資料庫詳細資訊頁面 >**警報**選項卡

**Prerequisite:** at least one notification channel must be configured and enabled.

**先決條件：** 必須設定並啟用至少一個通知頻道。

| Event<br>活動 | When is it triggered?<br>什麼時候觸發？ |
| --- | --- |
| `error_backup` | A backup fails<br>備份失敗 |
| `success_backup` | A backup completes successfully<br>備份成功完成 |
| `error_restore` | A restore fails<br>恢復失敗 |
| `success_restore` | A restore completes successfully<br>恢復成功完成 |
| `error_health_database` | The agent reports the database is no longer accessible<br>代理報告資料庫無法再存取 |

The `weekly_report` event is not yet implemented. Want to help? See the [Contributing](#p-107) guide.

`weekly_report`活動尚未實施。想幫忙嗎？請參閱[貢獻](#p-107)指南。

**Creating a policy:**

**建立政策：**

1.  **Alerts** tab > **Add policy**  
    **警報**選項卡 >**新增策略**
2.  Select the target notification channel  
    選擇目標通知管道
3.  Check the events to monitor  
    檢查要監控的事件
4.  Enable and save  
    啟用並儲存

![Notification policies panel](<../images/81bf5619-image.png>)

You can create multiple policies on the same database, for example, Slack for errors and SMTP for successes. Each policy can be individually disabled without deleting it.

您可以在同一資料庫上建立多個策略，例如，Slack 表示錯誤，SMTP 表示成功。每個策略都可以單獨停用，而無需刪除它。

**[Storage Policies](#p-027)｜[儲存策略](#p-027)**

**Where to configure:** database detail page > **Storage** tab

**配置位置：**資料庫詳細資訊頁面>**儲存**選項卡

**Prerequisite:** at least one storage channel must be configured and enabled.

**先決條件：** 必須配置並啟用至少一個儲存通道。

**Creating a policy:**

**建立政策：**

1.  **Storage** tab > **Add policy**  
    **儲存**選項卡 >**新增策略**
2.  Select the target storage channel  
    選擇目標儲存通道
3.  Enable and save  
    啟用並儲存

![Storage policies panel](<../images/94d6507b-image.png>)

You can create multiple storage policies on the same database. The backup file will be sent **simultaneously** to all active destinations.

您可以在同一資料庫上建立多個儲存策略。備份檔案將**同時**傳送到所有活動目的地。

From the **Backups** tab, each backup shows the send status per channel:

在 **備份** 標籤中，每個備份顯示每個通道的傳送狀態：

| Status<br>狀態 | Meaning<br>意義 |
| --- | --- |
| `pending` | Waiting to be sent<br>等待發送 |
| `success` | Sent (path, size and checksum verified)<br>已發送（已驗證路徑、大小和校驗和） |
| `failed` | Send failed for this channel<br>此頻道傳送失敗 |

---

**[Quick Reference](#p-027)｜[快速參考](#p-027)**

| What you're looking for<br>您在尋找什麼 | Path<br>路徑 |
| --- | --- |
| Create an agent<br>建立代理 | **Settings > Agents > Add agent**<br>**設定 > 代理 > 新增代理** |
| View an agent's key<br>查看代理程式的金鑰 | **Settings > Agents > \[agent\] > Show Key**<br>**設定 > 代理 > \[代理\] > 顯示金鑰** |
| Create a project<br>建立專案 | **Projects > New project**<br>**專案 > 新專案** |
| View an agent's databases<br>查看代理程式的資料庫 | **Settings > Agents > \[agent\] > Databases**<br>**設定 > 代理 > \[代理\] > 資料庫** |
| Configure backup schedule<br>設定備份計畫 | **Projects > \[project\] > \[database\] > Schedule**<br>**專案 > \[專案\] > \[資料庫\] > 時間表** |
| Configure retention<br>設定保留 | **Projects > \[project\] > \[database\] > Schedule > Retention**<br>**專案 > \[專案\] > \[資料庫\] > 計畫 > 保留** |
| Configure alerts<br>設定警報 | **Projects > \[project\] > \[database\] > Alerts**<br>**項目 > \[項目\] > \[資料庫\] > 警報** |
| Configure backup storage<br>設定備份儲存 | **Projects > \[project\] > \[database\] > Storage**<br>**專案 > \[專案\] > \[資料庫\] > 儲存** |
| Add a notification channel<br>新增通知頻道 | **Organisation > Notifications > Channels > Add channel**<br>**組織 > 通知 > 頻道 > 新增頻道** |
| Add a storage channel<br>新增儲存通道 | **Organisation > Storages > Channels > Add channel**<br>**組織 > 儲存 > 頻道 > 新增頻道** |
| Notification logs<br>通知日誌 | **Organisation > Notifications > Logs**<br>**組織 > 通知 > 日誌** |
| Agent health<br>代理健康 | **Settings > Agents > \[agent\] > Health**<br>**設定 > 代理 > \[代理\] > 健康狀況** |

---

[

**Configure Storage｜配置儲存**

Local storage, S3, Google Drive, Azure Blob Storage.

本機儲存、S3、Google Drive、Azure Blob 儲存。

](https://portabase.io/docs/dashboard/usage/storage/local)[

**Configure Notifications｜配置通知**

Slack, Discord, Telegram, Email and many more channels.

Slack、Discord、Telegram、電子郵件以及更多管道。

](https://portabase.io/docs/dashboard/usage/notifications/slack)

Last updated on

最後更新於

[

X (Twitter)

X（推特）

Configure authentication via X (formerly Twitter) in Portabase.

在 Portabase 中透過 X（以前稱為 Twitter）配置身份驗證。

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/x)[

Understanding the Architecture

了解架構

Next Page

下一頁

](https://portabase.io/docs/dashboard/guide#understanding-the-architecture)

---

<a id="c-16"></a>

###### Usage (How-to)｜使用方法（操作指南）

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-17"></a>

###### Storage｜貯存

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-028"></a>

###### Local Storage｜本地儲存

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/storage/local>

Portabase DashboardUsage (How-to)Storage

Portabase 儀表板使用（操作方法）存儲


Store your backups directly on the dashboard server.

將備份直接儲存在儀表板伺服器上。

By default, Portabase is configured to use **Local Storage**. This means that backups sent by your agents are stored on the disk of the machine where the dashboard is running.

預設情況下，Portabase 配置為使用**本地儲存**。這意味著代理程式發送的備份儲存在運行儀表板的電腦的磁碟上。

This method is ideal for:

此方法非常適合：

-   Testing and discovery.  
    測試和發現。
-   Small infrastructures.  
    小型基礎設施。
-   Using a network mount (NFS, EFS) already attached to the server.  
    使用已連接到伺服器的網路安裝 (NFS, EFS)。

**[Data Persistence](#p-028)｜[資料持久化](#p-028)**

If you are using **Docker**, it is crucial to use a volume to ensure your backups are not lost when the container is restarted or updated.

如果您使用 **Docker**，那麼使用磁碟區來確保您的備份在容器重新啟動或更新時不會遺失至關重要。

The default `docker-compose.yml` provided by the CLI already includes a volume for the `data` folder:

CLI 提供的預設`docker-compose.yml` 已包含`data` 資料夾的磁碟區：

```yaml title="docker-compose.yml"
services:
  portabase:
    # ...
    volumes:
      - portabase-data:/data
```

Backups are stored inside `/data/private/backups`.

備份儲存在`/data/private/backups`內。

Last updated on

最後更新於

[

Quick Reference

快速參考

Previous Page

上一頁

](https://portabase.io/docs/dashboard/guide#quick-reference)[

Object Storage (S3)

物件儲存 (S3)

Configure external storage for your backups (MinIO, AWS, Scaleway...).

為備份配置外部儲存（MinIO、AWS、Scaleway...）。

](https://portabase.io/docs/dashboard/usage/storage/s3)

---

<a id="p-029"></a>

###### Object Storage (S3)｜物件儲存 (S3)

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/storage/s3>

Portabase DashboardUsage (How-to)Storage

Portabase 儀表板使用（操作方法）存儲


Configure external storage for your backups (MinIO, AWS, Scaleway...).

為備份配置外部儲存（MinIO、AWS、Scaleway...）。

By default, Portabase stores backups on the local disk of the server. For production environments, we strongly recommend using external storage to:

預設情況下，Portabase 將備份儲存在伺服器的本機磁碟上。對於生產環境，我們強烈建議使用外部儲存來：

-   Decouple storage from compute resources.  
    將儲存與運算資源分離。
-   Benefit from virtually unlimited capacity.  
    受益於幾乎無限的容量。
-   Ensure data protection through the reliability of dedicated storage solutions.  
    透過專用儲存解決方案的可靠性確保資料保護。

---

**[Provider configuration (if self-hosted)](#p-029)｜[提供者配置（如果自架）](#p-029)**

**MinIO**

This adds a **MinIO** service to your Docker Compose stack, typically behind Traefik.

這會為您的 Docker Compose 堆疊新增 **MinIO** 服務，通常位於 Traefik 後面。

**[Docker Compose changes](#p-029)｜[Docker Compose 變更](#p-029)**

MinIO exposes two ports:

MinIO 公開兩個連接埠：

-   **9000**: S3 API (used by Portabase).  
    **9000**：S3 API（由 Portabase 使用）。
-   **9001**: Web Console (admin UI).  
    **9001**：Web 控制台（管理員UI）。

```title="docker-compose.yml"
name: portabase-stack

services:
  portabase:
    image: portabase/portabase:latest
    container_name: portabase-app
    env_file: .env
    volumes:
      - portabase-data:/data
    depends_on:
      db:
        condition: service_healthy
    networks:
      - traefik_network
      - default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.portabase.rule=Host(`dashboard.example.com`)"
      - "traefik.http.routers.portabase.entrypoints=websecure"
      - "traefik.http.routers.portabase.tls.certresolver=myresolver"

  # ... standard DB service ...

  s3:
    image: docker.io/bitnami/minio:latest
    container_name: portabase-minio
    expose:
      - 9000
      - 9001
    volumes:
      - minio-data:/data
    environment:
      - MINIO_ROOT_USER=${S3_ACCESS_KEY}
      - MINIO_ROOT_PASSWORD=${S3_SECRET_KEY}
      - MINIO_DEFAULT_BUCKETS=${S3_BUCKET_NAME}
    networks:
      - traefik_network
      - default
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.api-s3.rule=Host(`api.s3.example.com`)"
      - "traefik.http.routers.api-s3.entrypoints=websecure"
      - "traefik.http.routers.api-s3.tls.certresolver=myresolver"
      - "traefik.http.services.api-s3.loadbalancer.server.port=9000"
      - "traefik.http.routers.webui-s3.rule=Host(`console.s3.example.com`)"
      - "traefik.http.routers.webui-s3.entrypoints=websecure"
      - "traefik.http.services.webui-s3.loadbalancer.server.port=9001"

volumes:
  portabase-data:
  postgres-data:
  minio-data:

networks:
  traefik_network:
    external: true
```

**RustFS**

**[Configuration on the dashboard](#p-029)｜[儀表板配置](#p-029)**

In **Storage > Channels**, click on **\+ Add Storage Channel** choose **S3**.

在 **儲存 > 頻道**中，按一下**\+ 新增儲存頻道**選擇**S3**。

![Google Drive configuration](<../images/85c88281-image.png>)

Enter the credentials.

輸入憑證。

![Google Drive configuration](<../images/e81e4605-image.png>)

Click **Add Channel** to finalize the configuration.

按一下“**新增通道**”以完成配置。

---

**[Verification](#p-029)｜[驗證](#p-029)**

1.  Restart the dashboard:  
    重新啟動儀表板：

**Via CLI (Recommended)**

**透過CLI（推薦）**

```
portabase restart .
```

**Via Docker Compose**

**透過 Docker Compose**

2.  Log into the web UI.  
    登入網絡UI。
3.  Trigger a manual backup on an agent.  
    在代理上觸發手動備份。
4.  Check your bucket (or MinIO console) to confirm the backup file exists.  
    檢查您的儲存桶（或 MinIO 控制台）以確認備份檔案存在。

Last updated on

最後更新於

[

Local Storage

本地儲存

Store your backups directly on the dashboard server.

將備份直接儲存在儀表板伺服器上。

](https://portabase.io/docs/dashboard/usage/storage/local)[

Google Drive

Google雲端硬碟

Configure Google Drive as an external storage for your backups.

將 Google 雲端硬碟配置為備份的外部儲存。

](https://portabase.io/docs/dashboard/usage/storage/google-drive)

---

<a id="p-030"></a>

###### Google Drive｜Google雲端硬碟

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/storage/google-drive>

Portabase DashboardUsage (How-to)Storage

Portabase 儀表板使用（操作方法）存儲


Configure Google Drive as an external storage for your backups.

將 Google 雲端硬碟配置為備份的外部儲存。

By default, Portabase stores backups on the local disk of the Dashboard server. For production environments, we strongly recommend using external storage to:

預設情況下，Portabase 將備份儲存在 Dashboard 伺服器的本機磁碟上。對於生產環境，我們強烈建議使用外部儲存來：

-   Separate compute (Dashboard) from storage.  
    將計算（儀表板）與儲存分開。
-   Benefit from virtually unlimited capacity.  
    受益於幾乎無限的容量。
-   Protect data if the Dashboard server is lost.  
    如果儀表板伺服器遺失，請保護資料。

**[Creation of a new OAuth Client in the Google Cloud Console](#p-030)｜[在 Google Cloud Console 中建立新的 OAuth 用戶端](#p-030)**

Navigate to [Google Cloud Console](https://console.cloud.google.com/).

導航至 [Google Cloud Console](https://console.cloud.google.com/)。

2.  Open the sidebar menu and go to **API & Services > Credentials**.  
    打開側邊欄選單並前往 **API 和服務 > 憑證**。

![Google Cloud Console configuration](<../images/24dde0a7-image.png>)

Click **Create Credentials > OAuth Client ID**.

按一下 **建立憑證 > OAuth 用戶端 ID**。

![Google Cloud Console configuration](<../images/9f4f387c-image.png>)

Select **Web Application** as the application type and configure the **Authorized JavaScript origins** and **Authorized redirect URIs** according to your domain.

選擇 **Web 應用程式**作為應用程式類型，並根據您的網域配置**授權 JavaScript 來源**和**授權重定向 URI**。

![Google Cloud Console configuration](<../images/2afe06da-image.png>)

Click **Create**, then note the generated **Client ID** and **Client Secret**.

按一下 **建立**，然後記下產生的**Client ID**和**Client Secret**。

**[Configuration on the dashboard](#p-030)｜[儀表板配置](#p-030)**

In **Storage > Channels**, click on **\+ Add Storage Channel** and choose **Google Drive**.

在 **儲存 > 頻道**中，按一下**\+ 新增儲存頻道**並選擇**Google Drive**。

![Google Drive configuration](<../images/85c88281-image.png>)

Enter the credentials previously generated in the Google Cloud Console.

輸入先前在 Google Cloud Console 中產生的憑證。

![Google Drive configuration](<../images/fffb1901-image.png>)

Click **Connect Google Drive** to initiate the OAuth 2.0 authentication flow.

按一下 **連接 Google Drive** 以啟動 OAuth 2.0 身份驗證流程。

Click **Add Channel** to finalize the configuration.

按一下“**新增通道**”以完成配置。

Last updated on

最後更新於

[

Object Storage (S3)

物件儲存 (S3)

Configure external storage for your backups (MinIO, AWS, Scaleway...).

為備份配置外部儲存（MinIO、AWS、Scaleway...）。

](https://portabase.io/docs/dashboard/usage/storage/s3)[

Azure Blob Storage

Azure Blob 儲存

Configure Azure Blob Storage as an external storage for your backups.

將 Azure Blob 儲存體配置為備份的外部儲存體。

](https://portabase.io/docs/dashboard/usage/storage/azure-blob-storage)

---

<a id="p-031"></a>

###### Azure Blob Storage｜Azure Blob 儲存

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/storage/azure-blob-storage>

Portabase DashboardUsage (How-to)Storage

Portabase 儀表板使用（操作方法）存儲


Configure Azure Blob Storage as an external storage for your backups.

將 Azure Blob 儲存體配置為備份的外部儲存體。

By default, Portabase stores backups on the local disk of the server. For production environments, we strongly recommend using external storage to:

預設情況下，Portabase 將備份儲存在伺服器的本機磁碟上。對於生產環境，我們強烈建議使用外部儲存來：

-   Decouple storage from compute resources.  
    將儲存與運算資源分離。
-   Benefit from virtually unlimited capacity.  
    受益於幾乎無限的容量。
-   Ensure data protection through the reliability of dedicated storage solutions.  
    透過專用儲存解決方案的可靠性確保資料保護。

---

**[Creation of a Storage Account and Container](#p-031)｜[建立儲存帳戶和容器](#p-031)**

Navigate to the [Azure Portal](https://portal.azure.com/) and create a **Storage Account** (or use an existing one).

導覽至 [Azure 入口網站](https://portal.azure.com/) 並建立一個 **儲存帳戶**（或使用現有帳戶）。

Inside the Storage Account, go to **Containers** and create a new container for your backups.

在儲存帳戶內，請前往 **容器** 並為備份建立一個新容器。

Go to **Access keys** and note the **Storage account name** and **Key**.

前往 **存取金鑰**並記下**儲存帳戶名稱**和**金鑰**。

**[Configuration on the dashboard](#p-031)｜[儀表板配置](#p-031)**

In **Storage > Channels**, click on **\+ Add Storage Channel** and choose **Azure Blob Storage**.

在 **儲存 > 通道**中，按一下**\+ 新增儲存通道**並選擇**Azure Blob 儲存**。

Enter the storage account name, key, and container name previously noted.

輸入前面記下的儲存帳戶名稱、金鑰和容器名稱。

Click **Add Channel** to finalize the configuration.

按一下“**新增通道**”以完成配置。

---

**[Verification](#p-031)｜[驗證](#p-031)**

1.  Restart the dashboard:  
    重新啟動儀表板：

```
portabase restart .
```

2.  Log into the web UI.  
    登入網絡UI。
3.  Trigger a manual backup on an agent.  
    在代理上觸發手動備份。
4.  Check your container in the Azure Portal to confirm the backup file exists.  
    檢查 Azure 入口網站中的容器以確認備份檔案存在。

Last updated on

最後更新於

[

Google Drive

Google雲端硬碟

Configure Google Drive as an external storage for your backups.

將 Google 雲端硬碟配置為備份的外部儲存。

](https://portabase.io/docs/dashboard/usage/storage/google-drive)[

Google Cloud Storage

谷歌雲端儲存

Configure Google Cloud Storage as an external storage for your backups.

將 Google Cloud Storage 配置為備份的外部儲存。

](https://portabase.io/docs/dashboard/usage/storage/google-cloud-storage)

---

<a id="p-032"></a>

###### Google Cloud Storage｜谷歌雲端儲存

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/storage/google-cloud-storage>

Portabase DashboardUsage (How-to)Storage

Portabase 儀表板使用（操作方法）存儲


Configure Google Cloud Storage as an external storage for your backups.

將 Google Cloud Storage 配置為備份的外部儲存。

By default, Portabase stores backups on the local disk of the server. For production environments, we strongly recommend using external storage to:

預設情況下，Portabase 將備份儲存在伺服器的本機磁碟上。對於生產環境，我們強烈建議使用外部儲存來：

-   Decouple storage from compute resources.  
    將儲存與運算資源分離。
-   Benefit from virtually unlimited capacity.  
    受益於幾乎無限的容量。
-   Ensure data protection through the reliability of dedicated storage solutions.  
    透過專用儲存解決方案的可靠性確保資料保護。

---

**[Creation of a Service Account and Bucket](#p-032)｜[創建服務帳號和桶](#p-032)**

Navigate to the [Google Cloud Console](https://console.cloud.google.com/) and select your project (or create a new one).

導航至 [Google Cloud Console](https://console.cloud.google.com/) 並選擇您的專案（或建立新專案）。

Go to **Cloud Storage > Buckets** and create a new bucket for your backups. Note the **bucket name**.

前往 **雲端儲存 > 儲存桶**並為您的備份建立一個新儲存桶。請注意**存儲桶名稱**。

Go to **IAM & Admin > Service Accounts** and create a new service account.

前往 **IAM 和管理 > 服務帳戶** 並建立一個新的服務帳戶。

Assign the **Storage Object Admin** role (`roles/storage.objectAdmin`) to the service account on the bucket.

將 **儲存物件管理員** 角色 (`roles/storage.objectAdmin`) ​​指派給儲存桶上的服務帳戶。

In the service account details, go to **Keys > Add Key > Create new key** and select **JSON**. Download the generated key file.

在服務帳戶詳細資料中，前往 **Keys > Add Key > Create new key**並選擇**JSON**。下載產生的金鑰檔案。

**[Configuration on the dashboard](#p-032)｜[儀表板配置](#p-032)**

In **Storage > Channels**, click on **\+ Add Storage Channel** and choose **Google Cloud Storage**.

在 **儲存 > 頻道**中，按一下**\+ 新增儲存頻道**並選擇**Google 雲端儲存**。

Enter the bucket name and paste the content of the service account JSON key file.

輸入儲存桶名稱並貼上服務帳戶JSON金鑰檔案的內容。

Click **Add Channel** to finalize the configuration.

按一下“**新增通道**”以完成配置。

---

**[Verification](#p-032)｜[驗證](#p-032)**

1.  Restart the dashboard:  
    重新啟動儀表板：

```
portabase restart .
```

2.  Log into the web UI.  
    登入網絡UI。
3.  Trigger a manual backup on an agent.  
    在代理上觸發手動備份。
4.  Check your bucket in the Google Cloud Console to confirm the backup file exists.  
    在 Google Cloud Console 中檢查您的儲存桶以確認備份檔案存在。

Last updated on

最後更新於

[

Azure Blob Storage

Azure Blob 儲存

Configure Azure Blob Storage as an external storage for your backups.

將 Azure Blob 儲存體配置為備份的外部儲存體。

](https://portabase.io/docs/dashboard/usage/storage/azure-blob-storage)[

SFTP

Configure an SFTP server as external storage for your backups.

配置 SFTP 伺服器作為備份的外部儲存。

](https://portabase.io/docs/dashboard/usage/storage/sftp)

---

<a id="p-033"></a>

###### SFTP

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/storage/sftp>

Portabase DashboardUsage (How-to)Storage

Portabase 儀表板使用（操作方法）存儲


Configure an SFTP server as external storage for your backups.

配置 SFTP 伺服器作為備份的外部儲存。

Portabase can push backups to any server reachable over **SFTP** (SSH File Transfer Protocol). This is a good fit when you already have an SSH-accessible host (a NAS, a VPS, or a dedicated backup box) and want to keep backups on infrastructure you control.

Portabase 可以將備份推送到任何可透過 **SFTP**（SSH 檔案傳輸協定）存取的伺服器。當您已經擁有可存取 SSH 的主機（NAS、VPS 或專用備份盒）並希望在您控制的基礎設施上保留備份時，這是一個不錯的選擇。

**[Prerequisites](#p-033)｜[前提條件](#p-033)**

-   An SFTP/SSH server reachable from the Dashboard.  
    可從儀表板存取 SFTP/SSH 伺服器。
-   A user account on that server with write access to the target directory.  
    該伺服器上對目標目錄具有寫入權限的使用者帳戶。
-   Either a **password** or an **SSH private key** for that account.  
    該帳號的 **密碼**或**SSH 私鑰**。

**[Configuration on the dashboard](#p-033)｜[儀表板配置](#p-033)**

In **Storage > Channels**, click **\+ Add Storage Channel** and choose **SFTP**.

在**儲存 > 頻道**中，按一下**\+ 新增儲存頻道**，然後選擇**SFTP**。

Fill in the connection fields:

填寫連接欄位：

| Field<br>領域 | Required<br>必填 | Description<br>描述 |
| --- | --- | --- |
| **Channel Name**<br>**頻道名稱** | Yes<br>是的 | A label for this channel in the dashboard (e.g. `SFTP Channel`).<br>儀表板中該頻道的標籤（例如`SFTP Channel`）。 |
| **Host**<br>**主持人** | Yes<br>是的 | Hostname or IP of the SFTP server (e.g. `backup.example.com`).<br>SFTP 伺服器的主機名稱或 IP（例如 `backup.example.com`）。 |
| **Port**<br>**港口** | No<br>沒有 | SSH port. Defaults to `22`.<br>SSH 端口。預設為`22`。 |
| **Username**<br>**使用者名稱** | Yes<br>是的 | The SSH user (e.g. `deploy`).<br>SSH 使用者（例如`deploy`）。 |
| **Password**<br>**密碼** | No<br>沒有 | Account password. Provide a password or a private key (or both).<br>帳號密碼。提供密碼或私鑰（或兩者）。 |
| **Private key (PEM)**<br>**私鑰(PEM)** | No<br>沒有 | The SSH private key in PEM/OpenSSH format, starting with `-----BEGIN OPENSSH PRIVATE KEY-----`.<br>PEM/OpenSSH 格式的SSH 私鑰，以`-----BEGIN OPENSSH PRIVATE KEY-----` 開頭。 |
| **Remote path**<br>**遠端路徑** | No<br>沒有 | Optional prefix on the server. Backups are stored under `backups/YYYY-MM-DD/` beneath it.<br>伺服器上的可選前綴。備份儲存在其下方的`backups/YYYY-MM-DD/`下。 |

You must provide **a password or a private key** (or both). Key-based authentication is recommended.

您必須提供**密碼或私鑰**（或兩者）。建議使用基於金鑰的身份驗證。

Click **Test Storage** to verify the connection, then **Add Channel** to finalize.

按一下「**測試儲存**」以驗證連接，然後按一下「**新增通道**」以完成。

---

**[Verification](#p-033)｜[驗證](#p-033)**

1.  Log into the web UI.  
    登入網路UI。
2.  Trigger a manual backup on an agent using this channel.  
    使用此通道在代理程式上觸發手動備份。
3.  Connect to the SFTP server and confirm the backup file exists under the remote path (`backups/YYYY-MM-DD/`).  
    連接SFTP伺服器並確認遠端路徑（`backups/YYYY-MM-DD/`）下存在備份檔案。

Last updated on

最後更新於

[

Google Cloud Storage

谷歌雲端儲存

Configure Google Cloud Storage as an external storage for your backups.

將 Google Cloud Storage 配置為備份的外部儲存。

](https://portabase.io/docs/dashboard/usage/storage/google-cloud-storage)[

Rclone (any backend)

Rclone（任何後端）

Use any rclone remote as external storage for your backups.

使用任何 rclone 遠端作為備份的外部儲存。

](https://portabase.io/docs/dashboard/usage/storage/rclone)

---

<a id="p-034"></a>

###### Rclone (any backend)｜Rclone（任何後端）

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/storage/rclone>

Portabase DashboardUsage (How-to)Storage

Portabase 儀表板使用（操作方法）存儲


Use any rclone remote as external storage for your backups.

使用任何 rclone 遠端作為備份的外部儲存。

[Rclone](https://rclone.org/) supports 70+ storage backends. Configuring an **rclone** channel lets Portabase send backups to any of them (Backblaze B2, Dropbox, OneDrive, Wasabi, WebDAV, pCloud, and many more) by pasting a single remote definition from your `rclone.conf`.

[Rclone](https://rclone.org/)支援70+儲存後端。設定 **rclone** 通道可讓 Portabase 透過從 `rclone.conf` 貼上單一遠端定義來將備份傳送到其中任何一個（Backblaze B2、Dropbox、OneDrive、Wasabi、WebDAV、pCloud 等）。

**[Prerequisites](#p-034)｜[前提條件](#p-034)**

-   A working rclone remote. Create one locally with `rclone config`, or write the section by hand.  
    一個工作的 rclone 遠端。使用 `rclone config` 在本機上建立一個，或手動編寫該部分。
-   The credentials for the target backend (keys, tokens, endpoint…).  
    目標後端的憑證（密鑰、令牌、端點...）。

**[Configuration on the dashboard](#p-034)｜[儀表板配置](#p-034)**

In **Storage > Channels**, click **\+ Add Storage Channel** and choose **rclone (any backend)**.

在 **儲存 > 通道**中，按一下**\+ 新增儲存通道**並選擇**rclone（任何後端）**。

Fill in the fields:

填寫欄位：

| Field<br>領域 | Required<br>必填 | Description<br>描述 |
| --- | --- | --- |
| **Channel Name**<br>**頻道名稱** | Yes<br>是的 | A label for this channel in the dashboard.<br>儀表板中該頻道的標籤。 |
| **rclone config**<br>**rclone 設定** | Yes<br>是的 | Paste **exactly one** `[section]` from your `rclone.conf`. The section header names the remote.<br>從您的 `rclone.conf` 貼上**剛好一個** `[section]`。節標題命名了遙控器。 |
| **Remote path**<br>**遠端路徑** | No<br>沒有 | Path within the remote (e.g. a bucket or folder name, `my-bucket`).<br>遠端中的路徑（例如儲存桶或資料夾名稱，`my-bucket`）。 |

Example rclone config for an S3-compatible backend:

S3 相容後端的 rclone 設定範例：

```
[my-remote]
type = s3
provider = Other
access_key_id = ACCESS_KEY_ID
secret_access_key = SECRET_ACCESS_KEY
region = us-east-1
endpoint = https://s3.example.com
acl = private
```

Paste a single remote section. See the [rclone provider list](https://rclone.org/#providers) for the exact keys of each backend type.

貼上單一遠端部分。請參閱 [rclone 提供者清單](https://rclone.org/#providers) 以了解每種後端類型的確切鍵。

Click **Test Storage** to verify the remote, then **Add Channel** to finalize.

按一下「**測試儲存**」以驗證遠端，然後按一下「**新增頻道**」來完成。

---

**[Verification](#p-034)｜[驗證](#p-034)**

1.  Log into the web UI.  
    登入網絡UI。
2.  Trigger a manual backup on an agent using this channel.  
    使用此通道在代理程式上觸發手動備份。
3.  Confirm the backup file appears in the remote backend under the remote path (`backups/YYYY-MM-DD/`).  
    確認備份檔案出現在遠端後端的遠端路徑（`backups/YYYY-MM-DD/`）下。

Last updated on

最後更新於

[

SFTP

Configure an SFTP server as external storage for your backups.

配置 SFTP 伺服器作為備份的外部儲存。

](https://portabase.io/docs/dashboard/usage/storage/sftp)[

Slack

鬆弛

Receive backup notifications directly in a Slack channel.

直接在 Slack 頻道中接收備份通知。

](https://portabase.io/docs/dashboard/usage/notifications/slack)

---

<a id="c-18"></a>

###### Notification｜通知

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-035"></a>

###### Slack｜鬆弛

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/slack>

Portabase DashboardUsage (How-to)Notification

Portabase 儀表板使用（操作方法）通知


Receive backup notifications directly in a Slack channel.

直接在 Slack 頻道中接收備份通知。

Portabase allows you to send real-time notifications to a Slack channel when a backup succeeds or fails.

Portabase 可讓您在備份成功或失敗時向 Slack 通道發送即時通知。

**[Configuration on Slack API](#p-035)｜[Slack 上的配置API](#p-035)**

**[Create a Slack App](#p-035)｜[創建 Slack 應用程式](#p-035)**

1.  Go to [api.slack.com/apps](https://api.slack.com/apps).  
    前往 [api.slack.com/apps](https://api.slack.com/apps)。
2.  Click **Create New App** and select **From scratch**.  
    點擊“**建立新應用程式**”並選擇“**從頭開始**”。
3.  Name your app (e.g., "Portabase Bot"（連接埠庫機器人）) and select your workspace.  
    為您的應用程式命名（例如，"Portabase Bot"（連接埠庫機器人））並選擇您的工作區。

**[Activate Incoming Webhooks](#p-035)｜[啟動傳入 Webhooks](#p-035)**

1.  In the left sidebar, click on **Incoming Webhooks**.  
    在左側邊欄中，按一下 **傳入 Webhooks**。
2.  Toggle the switch to **On**.  
    將開關切換至**開**。
3.  Click the **Add New Webhook to Workspace** button at the bottom.  
    點擊底部的 **將新 Webhook 新增到工作區** 按鈕。
4.  Select the channel where you want notifications to appear and click **Allow**.  
    選擇您希望顯示通知的頻道，然後按一下「**允許**」。

**[Copy the Webhook URL](#p-035)｜[複製 Webhook URL](#p-035)**

You will see a URL that looks like this: `https://hooks.slack.com/services/<YOUR-WEBHOOK-PATH>`

您將看到一個URL，如下所示：`https://hooks.slack.com/services/<YOUR-WEBHOOK-PATH>`

Copy this URL.

複製這個URL。

**[Configuration on the dashboard](#p-035)｜[儀表板配置](#p-035)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Slack**.

前往 **通知 > 頻道**，按一下**\+ 新增通知頻道**，然後選擇**Slack**。

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the Slack webhook URL obtained earlier `https://hooks.slack.com/services/...` and click **Add Channel**.

輸入先前取得的 Slack webhook URL `https://hooks.slack.com/services/...`，然後點選 **新增頻道**。

![Slack channel configuration](<../images/6f301c29-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. Verify that a test message appears in the selected Slack channel.

若要測試配置，請按一下頻道的編輯圖標，然後按一下「**測試頻道**」。驗證測試訊息是否出現在選定的 Slack 頻道中。

Last updated on

最後更新於

[

Rclone (any backend)

Rclone（任何後端）

Use any rclone remote as external storage for your backups.

使用任何 rclone 遠端作為備份的外部儲存。

](https://portabase.io/docs/dashboard/usage/storage/rclone)[

Email (SMTP)

電子郵件 (SMTP)

Configure SMTP settings to receive alerts via email.

配置 SMTP 設定以透過電子郵件接收警報。

](https://portabase.io/docs/dashboard/usage/notifications/email)

---

<a id="p-036"></a>

###### Email (SMTP)｜電子郵件 (SMTP)

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/email>

Portabase DashboardUsage (How-to)Notification

Portabase 儀表板使用（操作方法）通知


Configure SMTP settings to receive alerts via email.

配置 SMTP 設定以透過電子郵件接收警報。

Email notifications are the most standard way to stay informed about your backups. To use them, you need to provide your own SMTP server credentials.

電子郵件通知是了解備份情況的最標準方式。要使用它們，您需要提供自己的 SMTP 伺服器憑證。

**[Configuration on the dashboard](#p-036)｜[儀表板配置](#p-036)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Email**.

前往 **通知 > 頻道**，按一下**\+ 新增通知頻道**，然後選擇**電子郵件**。

![Choose notification provider](<../images/ef21924f-image.png>)

-   **SMTP Host**: The address of your mail server (e.g., `smtp.gmail.com` or `smtp.sendgrid.net`).  
    **SMTP 主機**：您的郵件伺服器的位址（例如，`smtp.gmail.com` 或 `smtp.sendgrid.net`）。
-   **SMTP Port**: Usually `587` (TLS) or `465` (SSL).  
    **SMTP 端口**：通常為 `587` (TLS) 或 `465` (SSL)。
-   **Username**: Your email account username.  
    **使用者名稱**：您的電子郵件帳號使用者名稱。
-   **Password**: Your email account password or an App Password.  
    **密碼**：您的電子郵件帳號密碼或應用程式密碼。
-   **From Address**: The email address that will appear as the sender (e.g., `noreply@yourdomain.com`).  
    **寄件者地址**：將顯示為寄件者的電子郵件地址（例如，`noreply@yourdomain.com`）。

If you are using Gmail, you likely need to generate an **App Password** in your Google Account security settings instead of using your main password.

如果您使用 Gmail，您可能需要在 Google 帳戶安全設定中產生 **應用程式密碼**，而不是使用主密碼。

![SMTP channel configuration](<../images/aeb28bed-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. Portabase will attempt to send a test email to the configured administrator email address.

若要測試配置，請按一下頻道的編輯圖標，然後按一下「**測試頻道**」。 Portabase 將嘗試將測試電子郵件傳送到配置的管理員電子郵件地址。

Last updated on

最後更新於

[

Slack

鬆弛

Receive backup notifications directly in a Slack channel.

直接在 Slack 頻道中接收備份通知。

](https://portabase.io/docs/dashboard/usage/notifications/slack)[

Webhook

網路鉤子

Send HTTP alerts to your systems or third-party services.

向您的系統或第三方服務發送 HTTP 警報。

](https://portabase.io/docs/dashboard/usage/notifications/webhook)

---

<a id="p-037"></a>

###### Webhook｜網路鉤子

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/webhook>

Portabase DashboardUsage (How-to)Notification

Portabase 儀表板使用（操作方法）通知


Send HTTP alerts to your systems or third-party services.

向您的系統或第三方服務發送 HTTP 警報。

Webhook notifications allow you to send HTTP (POST) requests to a URL of your choice when an event occurs. This is the ideal solution for connecting Portabase to automation tools or custom scripts.

Webhook 通知可讓您在事件發生時向您選擇的 URL 發送 HTTP (POST) 請求。這是將 Portabase 連接到自動化工具或自訂腳本的理想解決方案。

**[Configuration on the dashboard](#p-037)｜[儀表板配置](#p-037)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Webhook**.

前往 **通知 > 頻道**，按一下**\+ 新增通知頻道**，然後選擇**Webhook**。

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

輸入以下資訊：

-   **Webhook URL**: The URL that will receive the POST request.  
    **Webhook URL**：將接收 POST 請求的 URL。
-   **Header** (optional): HTTP headers to secure or identify your requests (for example, `Authorization` to provide an authentication token). By default, Portabase sends `X-Webhook-Secret`.  
    **標頭**（可選）：用於保護或識別您的請求的 HTTP 標頭（例如，`Authorization` 用於提供身份驗證令牌）。預設情況下，Portabase 發送 `X-Webhook-Secret`。

![Webhook channel configuration](<../images/22ad160c-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. Verify that your endpoint responds correctly.

若要測試配置，請按一下頻道的編輯圖標，然後按一下「**測試頻道**」。驗證您的端點是否正確回應。

Last updated on

最後更新於

[

Email (SMTP)

電子郵件 (SMTP)

Configure SMTP settings to receive alerts via email.

配置 SMTP 設定以透過電子郵件接收警報。

](https://portabase.io/docs/dashboard/usage/notifications/email)[

Discord

Send alerts directly to your Discord channels.

直接向您的 Discord 頻道發送警報。

](https://portabase.io/docs/dashboard/usage/notifications/discord)

---

<a id="p-038"></a>

###### Discord

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/discord>

Portabase DashboardUsage (How-to)Notification

Portabase 儀表板使用（操作方法）通知


Send alerts directly to your Discord channels.

直接向您的 Discord 頻道發送警報。

Discord notifications use the platform's native Webhook system to post messages to a specific channel.

Discord 通知使用該平台的本機 Webhook 系統將訊息發佈到特定頻道。

**[Discord server configuration](#p-038)｜[Discord伺服器設定](#p-038)**

In Discord, go to **Server Settings > Integrations > Webhooks**.

在 Discord 中，前往 **伺服器設定 > 整合 > Webhooks**。

![Discord configuration](<../images/2d5d67c1-image.png>)

Create a new Webhook and copy its **URL**.

建立一個新的 Webhook 並複製其 **URL**。

![Discord configuration](<../images/428b61e8-image.png>)

**[Configuration on the dashboard](#p-038)｜[儀表板配置](#p-038)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Discord**.

前往 **通知 > 頻道**，按一下**\+ 新增通知頻道**，然後選擇**Discord**。

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the Discord webhook URL obtained earlier (e.g., `https://discord.com/api/webhooks/...`) and click **Add Channel**.

輸入先前獲得的 Discord webhook URL（例如 `https://discord.com/api/webhooks/...`），然後按一下 **新增頻道**。

![Discord channel configuration](<../images/aedfc105-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. Verify that a test message appears in the selected Discord channel.

若要測試配置，請按一下頻道的編輯圖標，然後按一下「**測試頻道**」。驗證測試訊息是否出現在所選的 Discord 頻道中。

Last updated on

最後更新於

[

Webhook

網路鉤子

Send HTTP alerts to your systems or third-party services.

向您的系統或第三方服務發送 HTTP 警報。

](https://portabase.io/docs/dashboard/usage/notifications/webhook)[

Telegram

電報

Receive alerts via a Telegram bot.

透過 Telegram 機器人接收警報。

](https://portabase.io/docs/dashboard/usage/notifications/telegram)

---

<a id="p-039"></a>

###### Telegram｜電報

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/telegram>

Portabase DashboardUsage (How-to)Notification

Portabase 儀表板使用（操作方法）通知


Receive alerts via a Telegram bot.

透過 Telegram 機器人接收警報。

To receive notifications on Telegram, you need to create a bot and obtain its access token as well as the recipient chat ID.

要在 Telegram 上接收通知，您需要建立機器人並取得其存取權杖以及收件人聊天ID。

**[Configuration of Telegram Bot](#p-039)｜[Telegram 機器人配置](#p-039)**

Contact [@BotFather](https://t.me/botfather) on Telegram to create a new bot and get your **Token** (e.g., `123456:ABC-DEF1234...`).

在 Telegram 上聯絡 [@BotFather](https://t.me/botfather) 創建一個新機器人並獲取您的**令牌**（例如，`123456:ABC-DEF1234...`）。

Start a conversation with your bot (click "Start"（開始）).

與您的機器人開始對話（點擊"Start"（開始））。

Retrieve your **Chat ID** (you can use a bot like `@userinfobot` to find it).

檢索您的**聊天ID**（您可以使用像`@userinfobot`這樣的機器人來尋找它）。

Warning

警告

You need to grant the bot the proper permissions (administrator or at least the right to manage topics). Otherwise, an error will occur.

您需要授予機器人適當的權限（管理員或至少管理主題的權限）。否則會出現錯誤。

**[Configuration on the dashboard](#p-039)｜[儀表板配置](#p-039)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Telegram**.

前往 **通知 > 頻道**，按一下**\+ 新增通知頻道**，然後選擇**Telegram**。

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

輸入以下資訊：

-   **Bot Token**: The token provided by BotFather.  
    **Bot Token**：BotFather 提供的令牌。
-   **Chat ID**: The numeric identifier of the conversation or group.  
    **聊天ID**：對話或群組的數字標識符。
-   **Topic ID** : The numeric identifier of the topic you want to monitor (optional, to filter notifications).  
    **主題ID**：您要監控的主題的數字標識符（可選，用於過濾通知）。

![Telegram channel configuration](<../images/4e19b91a-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. Your bot should send you a test message immediately.

若要測試配置，請按一下頻道的編輯圖標，然後按一下「**測試頻道**」。您的機器人應該立即向您發送測試訊息。

Last updated on

最後更新於

[

Discord

Send alerts directly to your Discord channels.

直接向您的 Discord 頻道發送警報。

](https://portabase.io/docs/dashboard/usage/notifications/discord)[

Ntfy

恩特菲

Push notifications via the Ntfy protocol (public server or self-hosted).

透過 Ntfy 協定（公共伺服器或自架）推播通知。

](https://portabase.io/docs/dashboard/usage/notifications/ntfy)

---

<a id="p-040"></a>

###### Ntfy｜恩特菲

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/ntfy>

Portabase DashboardUsage (How-to)Notification

Portabase 儀表板使用（操作方法）通知


Push notifications via the Ntfy protocol (public server or self-hosted).

透過 Ntfy 協定（公共伺服器或自架）推播通知。

[Ntfy](https://ntfy.sh/) is a simple HTTP notification service. You can use the official public server or your own self-hosted instance.

[ntfy](https://ntfy.sh/)是一個簡單的HTTP通知服務。您可以使用官方公共伺服器或您自己的自架執行個體。

**[Configuration on the dashboard](#p-040)｜[儀表板配置](#p-040)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **ntfy.sh**.

前往 **通知 > 頻道**，按一下**\+ 新增通知頻道**，然後選擇**ntfy.sh**。

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

輸入以下資訊：

-   **Server URL**: Your server address. Default: `https://ntfy.sh`.  
    **伺服器URL**：您的伺服器位址。預設值：`https://ntfy.sh`。
-   **Topic**: The name of the topic to subscribe to (e.g., `my-project-alerts`).  
    **主題**：要訂閱的主題的名稱（例如，`my-project-alerts`）。
-   **Token** (Optional): If your topic or server is protected by authentication.  
    **令牌**（可選）：如果您的主題或伺服器受身份驗證保護。

If you use the public server `ntfy.sh`, be aware that topics are public if not protected. Choose a complex name or configure access rights.

如果您使用公共伺服器`ntfy.sh`，請注意主題如果不受保護，也是公共的。選擇複雜的名稱或配置存取權限。

![Ntfy channel configuration](<../images/88b02b5e-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. The message should appear instantly in your Ntfy interface or on your mobile.

若要測試配置，請按一下頻道的編輯圖標，然後按一下「**測試頻道**」。該訊息應立即顯示在您的 Ntfy 介面或手機上。

Last updated on

最後更新於

[

Telegram

電報

Receive alerts via a Telegram bot.

透過 Telegram 機器人接收警報。

](https://portabase.io/docs/dashboard/usage/notifications/telegram)[

Gotify

戈蒂菲

Push notifications via your own Gotify server.

透過您自己的 Gotify 伺服器推播通知。

](https://portabase.io/docs/dashboard/usage/notifications/gotify)

---

<a id="p-041"></a>

###### Gotify｜戈蒂菲

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/gotify>

Portabase DashboardUsage (How-to)Notification

Portabase 儀表板使用（操作方法）通知


Push notifications via your own Gotify server.

透過您自己的 Gotify 伺服器推播通知。

[Gotify](https://gotify.net/) is a simple server for sending and receiving messages in real-time (WebSocket).

[Gotify](https://gotify.net/)是一個用於即時發送和接收訊息（WebSocket）的簡單伺服器。

**[Configuration on your Gotify instance](#p-041)｜[Gotify 實例上的設定](#p-041)**

1.  Log in to your Gotify instance.  
    登入您的 Gotify 實例。

2.  Create a new **Application** (e.g., "Portabase"（底座支架）).  
    建立一個新的**應用程式**（例如，"Portabase"（底座支架））。

3.  Copy the **Token** generated for this application.  
    複製為此應用程式產生的**令牌**。

**[Configuration on the dashboard](#p-041)｜[儀表板配置](#p-041)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Gotify**.

前往 **通知 > 頻道**，按一下**\+ 新增通知頻道**，然後選擇**Gotify**。

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

輸入以下資訊：

-   **Server URL**: The full URL of your Gotify instance (e.g., `https://gotify.yourdomain.com`).  
    **伺服器URL**：Gotify 實例的完整URL（例如，`https://gotify.yourdomain.com`）。
-   **App Token**: The application token you just created.  
    **應用程式令牌**：您剛剛建立的應用程式令牌。

![Gotify channel configuration](<../images/d36621d5-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. The message should appear instantly in your Gotify interface or on your mobile.

若要測試配置，請按一下頻道的編輯圖標，然後按一下「**測試頻道**」。該訊息應立即顯示在您的 Gotify 介面或手機上。

Last updated on

最後更新於

[

Ntfy

恩特菲

Push notifications via the Ntfy protocol (public server or self-hosted).

透過 Ntfy 協定（公共伺服器或自架）推播通知。

](https://portabase.io/docs/dashboard/usage/notifications/ntfy)[

Nextcloud Talk

下一個雲端談話

Send notifications to a Nextcloud Talk conversation through a bot.

透過機器人向 Nextcloud Talk 對話發送通知。

](https://portabase.io/docs/dashboard/usage/notifications/nextcloud-talk)

---

<a id="p-042"></a>

###### Nextcloud Talk｜下一個雲端談話

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/nextcloud-talk>

Portabase DashboardUsage (How-to)Notification

Portabase 儀表板使用（操作方法）通知


Send notifications to a Nextcloud Talk conversation through a bot.

透過機器人向 Nextcloud Talk 對話發送通知。

[Nextcloud Talk](https://nextcloud.com/talk/) is the chat app of Nextcloud. Portabase posts its notifications in a conversation using a **Talk bot**.

[Nextcloud Talk](https://nextcloud.com/talk/)是Nextcloud的聊天應用程式。 Portabase 使用 **Talk bot** 在對話中發布通知。

**[Configuration on your Nextcloud instance](#p-042)｜[Nextcloud 實例上的設定](#p-042)**

Install a bot with the `response` feature, using a secret of 40 to 128 characters (e.g., generated with `openssl rand -hex 32`): `occ talk:bot:install --feature=response "Portabase" "<secret>" "https://portabase.example.com"`.

安装具有 `response` 功能的机器人，使用 40 到 128 个字符的秘密（例如，使用 `openssl rand -hex 32` 生成）：`occ talk:bot:install --feature=response "Portabase" "<secret>" "https://portabase.example.com"`。

Get the bot ID with `occ talk:bot:list`, then enable the bot in the conversation that should receive the notifications: `occ talk:bot:setup <bot-id> <conversation-token>`.

使用 `occ talk:bot:list` 取得機器人 ID，然後在應接收通知的對話中啟用機器人：`occ talk:bot:setup <bot-id> <conversation-token>`。

Copy the **conversation token**: it is the last part of the conversation URL (e.g., `j3yujpuh` in `https://cloud.example.com/call/j3yujpuh`).

複製**對話令牌**：它是對話URL的最後一部分（例如，`https://cloud.example.com/call/j3yujpuh`中的`j3yujpuh`）。

Bots require Nextcloud 27.1 and Talk 17.1 or later. The URL given to `occ talk:bot:install` is required by Nextcloud but is never called by Portabase.

機器人需要 Nextcloud 27.1 和 Talk 17.1 或更高版本。 Nextcloud 需要提供給 `occ talk:bot:install` 的 URL，但 Portabase 永遠不會呼叫。

**[Configuration on the dashboard](#p-042)｜[儀表板配置](#p-042)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Nextcloud Talk**.

前往 **通知 > 頻道**，按一下**\+ 新增通知頻道**，然後選擇**Nextcloud Talk**。

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

輸入以下資訊：

-   **Channel Name**: A label for this channel in Portabase.  
    **頻道名稱**：Portabase 中此頻道的標籤。
-   **Nextcloud URL**: The full URL of your Nextcloud instance (e.g., `https://cloud.example.com`).  
    **Nextcloud URL**：Nextcloud 實例的完整 URL（例如 `https://cloud.example.com`）。
-   **Bot Token**: The token of the conversation where the bot is enabled (e.g., `j3yujpuh`).  
    **機器人令牌**：啟用機器人的對話的令牌（例如，`j3yujpuh`）。
-   **Bot Secret**: The secret used when installing the bot.  
    **機器人秘密**：安裝機器人時使用的秘密。

To test the configuration, click the channel's edit icon, then click **Test Channel**. The message should appear in your Talk conversation, posted by the bot.

若要測試配置，請按一下頻道的編輯圖標，然後按一下「**測試頻道**」。該訊息應出現在您的 Talk 對話中，由機器人發布。

Last updated on

最後更新於

[

Gotify

戈蒂菲

Push notifications via your own Gotify server.

透過您自己的 Gotify 伺服器推播通知。

](https://portabase.io/docs/dashboard/usage/notifications/gotify)[

Pushover

推倒

Send push notifications to your devices via Pushover.

透過 Pushover 將推播通知傳送到您的裝置。

](https://portabase.io/docs/dashboard/usage/notifications/pushover)

---

<a id="p-043"></a>

###### Pushover｜推倒

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/pushover>

Portabase DashboardUsage (How-to)Notification

Portabase 儀表板使用（操作方法）通知


Send push notifications to your devices via Pushover.

透過 Pushover 將推播通知傳送到您的裝置。

[Pushover](https://pushover.net/) is a service for sending real-time push notifications to your phone, tablet, or desktop.

[Pushover](https://pushover.net/)是一項用於向您的手機、平板電腦或桌上型電腦發送即時推播通知的服務。

**[Creation of an application on Pushover](#p-043)｜[在 Pushover 上建立應用程式](#p-043)**

Log in to your [Pushover](https://pushover.net/) account.

登入您的[Pushover](https://pushover.net/)帳戶。

Go to **Create an Application/API Token** and register a new application (e.g., "Portabase"（底座支架）).

前往**建立應用程式/API令牌**並註冊一個新應用程式（例如，"Portabase"（底座支架））。

Copy the generated **API Token/Key**.

複製產生的 **API Token/Key**。

On your Pushover dashboard, copy your **User Key** (top right of the page).

在 Pushover 儀表板上，複製您的**使用者金鑰**（頁面右上角）。

**[Configuration on the dashboard](#p-043)｜[儀表板配置](#p-043)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Pushover**.

前往 **通知 > 頻道**，按一下**\+ 新增通知頻道**，然後選擇**Pushover**。

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

輸入以下資訊：

-   **Channel Name**: A label for this channel in Portabase.  
    **頻道名稱**：Portabase 中此頻道的標籤。
-   **User Key**: Your personal User Key, or your **Group Key** to notify a team.  
    **使用者金鑰**：您的個人使用者金鑰，或通知團隊的**群組金鑰**。
-   **App API Token**: The application token created above.  
    **應用程式API令牌**：上面建立的應用程式令牌。
-   **Message Priority** (Optional): Emergency priority repeats every 60 seconds until acknowledged, for at most one hour.  
    **訊息優先順序**（可選）：緊急優先順序每 60 秒重複一次，直到確認，最多持續一小時。
-   **Device Name** (Optional): Target one registered device. Leave it empty to send to all of them.  
    **設備名稱**（選購）：定位一台已註冊的設備。將其留空以發送給所有人。

Then click **Add Channel**.

然後點擊“**新增頻道**”。

![Pushover channel configuration](<../images/e1c9edbb-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. The message should appear instantly on your device(s).

若要測試配置，請按一下頻道的編輯圖標，然後按一下「**測試頻道**」。該訊息應立即顯示在您的裝置上。

Last updated on

最後更新於

[

Nextcloud Talk

下一個雲端談話

Send notifications to a Nextcloud Talk conversation through a bot.

透過機器人向 Nextcloud Talk 對話發送通知。

](https://portabase.io/docs/dashboard/usage/notifications/nextcloud-talk)[

Microsoft Teams

微軟團隊

Send alerts directly to your Microsoft Teams channels.

直接向您的 Microsoft Teams 頻道發送警報。

](https://portabase.io/docs/dashboard/usage/notifications/ms-teams)

---

<a id="p-044"></a>

###### Microsoft Teams｜微軟團隊

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/ms-teams>

Portabase DashboardUsage (How-to)Notification

Portabase 儀表板使用（操作方法）通知


Send alerts directly to your Microsoft Teams channels.

直接向您的 Microsoft Teams 頻道發送警報。

Microsoft Teams notifications use an **Incoming Webhook** connector to post messages to a specific channel.

Microsoft Teams 通知使用 **傳入 Webhook** 連接器將訊息發佈到特定頻道。

**[Microsoft Teams configuration](#p-044)｜[Microsoft Teams 配置](#p-044)**

In Teams, go to the channel you want to notify, then **Channel options > Connectors** (or **Workflows** depending on your tenant).

在 Teams 中，前往要通知的頻道，然後前往**頻道選項 > 連接器**（或**工作流程**，取決於您的租用戶）。

Add an **Incoming Webhook** connector, give it a name (e.g., "Portabase"（底座支架）), and copy the generated **Webhook URL**.

新增 **Incoming Webhook**連接器，為其命名（例如 "Portabase"（底座支架）），然後複製產生的**Webhook URL**。

**[Configuration on the dashboard](#p-044)｜[儀表板配置](#p-044)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Microsoft Teams**.

前往 **通知 > 頻道**，按一下**\+ 新增通知頻道**，然後選擇**Microsoft Teams**。

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

輸入以下資訊：

-   **Channel Name**: A label for this channel in Portabase.  
    **頻道名稱**：Portabase 中此頻道的標籤。
-   **Teams Webhook URL**: The webhook URL obtained earlier.  
    **Teams Webhook URL**：先前取得的 webhook URL。

Then click **Add Channel**.

然後點擊“**新增頻道**”。

![Microsoft Teams channel configuration](<../images/5d87469a-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. Verify that a test message appears in the selected Teams channel.

若要測試配置，請按一下頻道的編輯圖標，然後按一下「**測試頻道**」。驗證測試訊息是否顯示在所選團隊頻道中。

Last updated on

最後更新於

[

Pushover

推倒

Send push notifications to your devices via Pushover.

透過 Pushover 將推播通知傳送到您的裝置。

](https://portabase.io/docs/dashboard/usage/notifications/pushover)[

Apprise

艾普瑞斯

Send notifications to 100+ services through your own Apprise API server.

透過您自己的 Apprise API 伺服器向 100 多個服務發送通知。

](https://portabase.io/docs/dashboard/usage/notifications/apprise)

---

<a id="p-045"></a>

###### Apprise｜艾普瑞斯

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/apprise>

Portabase DashboardUsage (How-to)Notification

Portabase 儀表板使用（操作方法）通知


Send notifications to 100+ services through your own Apprise API server.

透過您自己的 Apprise API 伺服器向 100 多個服務發送通知。

[Apprise](https://github.com/caronc/apprise) is a notification gateway that relays a single message to 100+ services (Discord, Telegram, Slack, email, ntfy, Gotify, and many more). Portabase talks to a self-hosted [Apprise API](https://github.com/caronc/apprise-api) server using a **persistent configuration**.

[Apprise](https://github.com/caronc/apprise) 是一個通知網關，可將單一訊息轉發到 100 多個服務（Discord、Telegram、Slack、電子郵件、ntfy、Gotify 等）。 Portabase 使用 **持久性設定** 與自架 [Apprise API](https://github.com/caronc/apprise-api) 伺服器進行通訊。

**[Configuration on your Apprise API server](#p-045)｜[Apprise API 伺服器上的設定](#p-045)**

Run an Apprise API instance (for example the `caronc/apprise` Docker image) and note its base URL (e.g., `http://localhost:8000`).

執行 Apprise API 實例（例如 `caronc/apprise` Docker 映像）並記下其基礎 URL（例如 `http://localhost:8000`）。

Register a **persistent configuration** under a key of your choice. Portabase sends to `POST /notify/{key}`, so this key must exist on the server. Add the target service URLs (Discord, Telegram, etc.) to that configuration.

在您選擇的金鑰下註冊**持久配置**。 Portabase 傳送到`POST /notify/{key}`，因此該金鑰必須存在於伺服器上。將目標服務 URL（Discord、Telegram 等）新增至該組態。

Copy the **config key** you chose (e.g., `my-alerts`).

複製您選擇的**配置金鑰**（例如，`my-alerts`）。

Portabase does not store the destination service URLs. They live in the persistent configuration on your Apprise server; Portabase only references it by its config key.

Portabase 不會儲存目標服務 URL。它們位於您的 Apprise 伺服器上的持久性配置中； Portabase 僅透過其配置鍵引用它。

**[Configuration on the dashboard](#p-045)｜[儀表板配置](#p-045)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Apprise**.

前往 **通知 > 頻道**，按一下**\+ 新增通知頻道**，然後選擇**Apprise**。

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

輸入以下資訊：

-   **Channel Name**: A label for this channel in Portabase.  
    **頻道名稱**：Portabase 中此頻道的標籤。
-   **Apprise Server URL**: The base URL of your Apprise API server (e.g., `http://localhost:8000`).  
    **Apprise 伺服器 URL**：Apprise API 伺服器的基礎 URL（例如 `http://localhost:8000`）。
-   **Config Key**: The persistent config key registered on your server (e.g., `my-alerts`).  
    **設定金鑰**：在您的伺服器上註冊的持久性設定金鑰（例如，`my-alerts`）。
-   **Custom Headers** (Optional): Add headers if your server sits behind a reverse proxy or basic auth (e.g., `Authorization`).  
    **自訂標頭**（可選）：如果您的伺服器位於反向代理或基本驗證（例如`Authorization`）後面，請新增標頭。

![Apprise channel configuration](<../images/923f42cf-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. The message should be relayed to every service in your Apprise configuration.

若要測試配置，請按一下頻道的編輯圖標，然後按一下「**測試頻道**」。該訊息應轉發到您的 Apprise 配置中的每個服務。

Last updated on

最後更新於

[

Microsoft Teams

微軟團隊

Send alerts directly to your Microsoft Teams channels.

直接向您的 Microsoft Teams 頻道發送警報。

](https://portabase.io/docs/dashboard/usage/notifications/ms-teams)[

Healthchecks.io

Monitor your backups with a dead man's switch and get alerted when a backup stops running.

使用死人開關監控您的備份，並在備份停止運作時收到警報。

](https://portabase.io/docs/dashboard/usage/notifications/healthchecks)

---

<a id="p-046"></a>

###### Healthchecks.io

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/healthchecks>

Portabase DashboardUsage (How-to)Notification

Portabase 儀表板使用（操作方法）通知


Monitor your backups with a dead man's switch and get alerted when a backup stops running.

使用緊急停止開關監控備份，並在備份停止運作時收到警報。

[Healthchecks.io](https://healthchecks.io/) watches for pings that are supposed to arrive on a schedule. If a ping does not arrive in time, it alerts you.

[Healthchecks.io](https://healthchecks.io/)會監控按計畫到達的 ping 要求。如果 ping 請求未按時到達，它會發出警報。

This flips the usual notification model. Slack or Discord tell you when a backup *fails*; Healthchecks tells you when a backup **stops happening at all** — a crashed agent, a paused schedule, a container that never restarted. Those silent failures are the ones you notice too late.

這顛覆了通常的通知模型。 Slack 或 Discord 會在備份*失敗*時告訴您；運行狀況檢查會告訴您備份何時**完全停止** - 代理崩潰、計劃暫停、容器從未重新啟動。那些無聲的失敗是你發現時為時已晚的。

Healthchecks.io is open source. These steps apply to the hosted service and to a self-hosted instance alike — only the ping server URL differs.

Healthchecks.io 是開源的。這些步驟同樣適用於託管服務和自託管執行個體－只有 ping 伺服器URL有所不同。

**[Choosing between a check UUID and a project ping key](#p-046)｜[在檢查UUID和項目 ping 鍵之間進行選擇](#p-046)**

Portabase can address your checks in two ways. Pick one before configuring the channel.

Portabase 可以透過兩種方式滿足您的檢查需求。請在配置通道之前選擇其中一種方式。

|  | Check UUID<br>檢查UUID | Project ping key<br>項目 ping 鍵 |
| --- | --- | --- |
| Pings<br>Ping | one single check<br>單次檢查 | any check, addressed by slug<br>任何檢查，由別名尋址 |
| Channels needed<br>所需通道數 | one per check<br>每次檢查一個通道 | one for every database<br>每個資料庫一個通道 |
| Where to find it<br>在哪裡可以找到它 | on the check's page<br>在支票頁面 | in your project settings<br>在您的項目設定中 |

**[Configuration on Healthchecks](#p-046)｜[健康檢查配置](#p-046)**

Create a check and give it a name, for example `portabase-production`.

建立一個檢查並給它命名，例如`portabase-production` 。

Set the **Period** to the interval between two backups, and the **Grace Time** to how long a backup may be late before you want to be alerted. A daily backup that takes about twenty minutes fits a period of 1 day and a grace time of 1 hour.

將 **Period**設定為兩次備份之間的時間間隔，並將**Grace Time** 設定為在您希望收到警報之前備份可能會延遲多長時間。每日備份大約需要 20 分鐘，適合 1 天的時間和 1 小時的寬限時間。

Copy the check's **UUID**, or, if you plan to cover several databases from one channel, copy the **ping key** from your project settings instead.

複製檢查的 **UUID**，或者，如果您打算從一個通道覆蓋多個資料庫，請從專案設定複製 **ping 金鑰**。

**[Configuration on the dashboard](#p-046)｜[儀表板配置](#p-046)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Healthchecks.io**.

前往**通知 > 頻道**，點選**\+ 新增通知管道**，然後選擇**Healthchecks.io**。

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

輸入以下資訊：

-   **Channel Name**: A label for this channel in Portabase.  
    **頻道名稱**：Portabase 中此頻道的標籤。
-   **Ping Server URL**: Leave `https://hc-ping.com` as is for the hosted service, or point it at your self-hosted instance.  
    **Ping 伺服器URL**：對於託管服務，請將`https://hc-ping.com`保留原樣，或將其指向您的自託管實例。
-   **Check UUID or Ping Key**: The check UUID, or the project ping key when you want to address checks by slug.  
    **檢查UUID或 Ping 金鑰**：檢查UUID ，或當您想要透過 slug 處理檢查時的項目 ping 金鑰。
-   **Use database name as slug** (Optional): One channel for every database — the slug is derived from the database name of each event. Requires a project ping key, not a check UUID.  
    **使用資料庫名稱作為別名**（可選）：每個資料庫對應一個通道－別名源自每個事件的資料庫名稱。需要項目 ping 金鑰，而不是檢查UUID 。
-   **Slug** (Optional): The slug to ping. Leave it empty when the field above holds a check UUID.  
    **Slug**（可選）：要 ping 的 slug。如果上面的欄位選取UUID ，則將其留空。
-   **Create missing checks** (Optional): Adds `?create=1` so a slug with no matching check is created on its first ping. Ignored when pinging a check UUID.  
    **建立缺少的檢查**（可選）：新增`?create=1` ，以便在首次 ping 時建立一個沒有匹配檢查的 slug。 ping 檢查UUID時忽略。

Then click **Add Channel**.

然後點擊“**新增頻道**”。

![Healthchecks.io channel configuration](<../images/13baf84e-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. The check should turn green in Healthchecks within a few seconds.

若要測試配置，請按一下頻道的編輯圖標，然後按一下「**測試頻道**」。此檢查應在幾秒鐘內在運行狀況檢查中變為綠色。

Treat the check UUID and the project ping key like passwords. Anyone who has them can mark your checks as up and hide a real outage.

請將檢查項目UUID和項目 ping 金鑰視為密碼。任何擁有它們的人都可以將您的檢查項目標記為正常，從而掩蓋真正的故障。

Last updated on

最後更新於

[

Apprise

艾普瑞斯

Send notifications to 100+ services through your own Apprise API server.

透過您自己的 Apprise API伺服器向 100 多個服務發送通知。

](https://portabase.io/docs/dashboard/usage/notifications/apprise)[

API Introduction

API引言

Get started with the Portabase REST API for database and agent management.

開始使用 Portabase REST API進行資料庫和代理管理。

](https://portabase.io/docs/dashboard/api/introduction)

---

<a id="c-19"></a>

###### API

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-20"></a>

###### API Introduction｜API簡介

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-047"></a>

###### API Introduction｜API引言

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/introduction>

Portabase DashboardAPI


Get started with the Portabase REST API for database and agent management.

開始使用 Portabase REST API進行資料庫和代理管理。

The Portabase dashboard exposes a REST API for programmatic management of databases and agents. Swagger UI and the OpenAPI specification are also available.

Portabase 控制面板提供了一個REST API ，用於以程式設計方式管理資料庫和代理程式。此外，它還支援 Swagger UI和 OpenAPI 規範。

**[Enable the API](#p-047)｜[啟用API](#p-047)**

Set the following environment variables in your dashboard configuration:

在儀表板配置中設定以下環境變數：

```
API_ENABLED=true
OPENAPI_ENABLED=true
```

-   `API_ENABLED=true` : enables all API routes under `/api/v1`.  
    `API_ENABLED=true` ：啟用`/api/v1`下的所有API路由。
-   `OPENAPI_ENABLED=true` : enables the OpenAPI specification and Swagger UI. The API must also be enabled for this to work.  
    `OPENAPI_ENABLED=true` ：啟用 OpenAPI 規範和 Swagger UI 。若要使此功能生效，也必須啟用API 。

**[API Documentation](#p-047)｜[API文檔](#p-047)**

Once enabled:

啟用後：

| Resource<br>資源 | URL |
| --- | --- |
| Swagger UI<br>炫耀UI | `/api/v1/docs` |
| OpenAPI specification<br>OpenAPI 規格 | `/api/v1/openapi` |

**[Authentication](#p-047)｜[認證](#p-047)**

To create an API token:

創建API令牌：

1.  Go to your **Profile** in the dashboard.  
    前往控制台中的**個人資料**。
2.  Open the **Account** tab.  
    開啟**帳戶**標籤。
3.  In the **API Token** section, generate a new token.  
    在 **API Token** 部分，產生一個新的令牌。

Tokens are user-level, all API actions inherit the permissions of the associated user.

令牌是使用者層級的，所有API操作都繼承關聯使用者的權限。

Use the `x-api-key` header to authenticate your requests:

使用`x-api-key`標頭來驗證您的要求：

```yaml
GET /api/v1/databases
x-api-key: <your-token>
```

API coverage is being extended. Check the [roadmap](https://github.com/orgs/Portabase/projects/1) for upcoming endpoints.

API覆蓋範圍正在擴大。請查看 [路線圖](https://github.com/orgs/Portabase/projects/1)以了解即將推出的端點。

Last updated on

最後更新於

[

Healthchecks.io

Monitor your backups with a dead man's switch and get alerted when a backup stops running.

使用死人開關監控您的備份，並在備份停止運作時收到警報。

](https://portabase.io/docs/dashboard/usage/notifications/healthchecks)[

List agents GET

列表代理GET

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/agents/get)

---

<a id="c-21"></a>

###### Agents｜代理人

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-048"></a>

###### List agents｜經紀人名單

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/agents/get>

Portabase DashboardAPIAgents

Portabase 控制台 API 代理


**[Authorization](#p-048)｜[授權](#p-048)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Response Body](#p-048)｜[回覆正文](#p-048)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X GET "https://example.com/agents"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": [    {      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",      "slug": "string",      "version": "string",      "name": "string",      "healthErrorCount": -2147483648,      "description": "string",      "isArchived": true,      "lastContact": "2019-08-24T14:15:22Z",      "organizationId": "7bc05553-4b68-44e8-b7bc-37be63c6d9e9",      "updatedAt": "2019-08-24T14:15:22Z",      "createdAt": "2019-08-24T14:15:22Z",      "deletedAt": "2019-08-24T14:15:22Z"    }  ]}
```

**401**

**500**

[

API Introduction

API引言

Get started with the Portabase REST API for database and agent management.

開始使用 Portabase REST API進行資料庫和代理管理。

](https://portabase.io/docs/dashboard/api/introduction)[

Create an agent POST

建立代理POST

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/agents/post)

---

<a id="p-049"></a>

###### Create an agent｜創建代理

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/agents/post>

Portabase DashboardAPIAgents

Portabase 控制台 API 代理


**[Authorization](#p-049)｜[授權](#p-049)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Request Body](#p-049)｜[請求正文](#p-049)**

`application/json`

TypeScript Definitions

TypeScript 定義

Use the request body type in TypeScript.

在 TypeScript 中使用請求體類型。

**[Response Body](#p-049)｜[回覆正文](#p-049)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X POST "https://example.com/agents" \  -H "Content-Type: application/json" \  -d '{    "name": "my-agent"  }'
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**201**

```json
{  "data": {    "name": "string",    "description": "string"  }}
```

**400**

**401**

**403**

**422**

**500**

[

List agents GET

列表代理GET

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/agents/get)[

Get agent by ID GET

透過ID GET獲取代理

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/agents/id/get)

---

<a id="p-050"></a>

###### Get agent by ID｜透過ID獲取代理

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/agents/id/get>

Portabase DashboardAPIAgents

Portabase 控制台 API 代理


**[Authorization](#p-050)｜[授權](#p-050)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-050)｜[路徑參數](#p-050)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Response Body](#p-050)｜[回覆正文](#p-050)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X GET "https://example.com/agents/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": {    "name": "string",    "description": "string"  }}
```

**401**

**403**

**404**

**500**

[

Create an agent POST

建立代理POST

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/agents/post)[

Delete agent DELETE

刪除代理DELETE

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/agents/id/delete)

---

<a id="p-051"></a>

###### Delete agent｜刪除代理

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/agents/id/delete>

Portabase DashboardAPIAgents

Portabase 控制台 API 代理


**[Authorization](#p-051)｜[授權](#p-051)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-051)｜[路徑參數](#p-051)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Response Body](#p-051)｜[回覆正文](#p-051)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X DELETE "https://example.com/agents/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**204**

Empty

空的

**401**

**403**

**404**

**500**

[

Get agent by ID GET

透過ID GET獲取代理

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/agents/id/get)[

Get agent edge key GET

取得代理邊緣金鑰GET

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/agents/id/key/get)

---

<a id="p-052"></a>

###### Get agent edge key｜取得代理邊緣密鑰

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/agents/id/key/get>

Portabase DashboardAPIAgents

Portabase 控制台 API 代理


**[Authorization](#p-052)｜[授權](#p-052)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-052)｜[路徑參數](#p-052)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Response Body](#p-052)｜[回覆正文](#p-052)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X GET "https://example.com/agents/123e4567-e89b-12d3-a456-426614174000/key"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": "string"}
```

**401**

**403**

**404**

**500**

[

Delete agent DELETE

刪除代理DELETE

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/agents/id/delete)[

List databases GET

列出資料庫GET

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/databases/get)

---

<a id="c-22"></a>

###### Databases｜資料庫

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-053"></a>

###### List databases｜列出資料庫

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/get>

Portabase DashboardAPIDatabases

Portabase 儀表板 API 資料庫


**[Authorization](#p-053)｜[授權](#p-053)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Response Body](#p-053)｜[回覆正文](#p-053)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X GET "https://example.com/databases"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": [    {      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",      "agentDatabaseId": "78f4c143-eccc-413e-8e8a-868364d45b73",      "name": "string",      "dbms": "postgresql",      "description": "string",      "backupPolicy": "string",      "isWaitingForBackup": true,      "backupToRestore": "string",      "healthErrorCount": -2147483648,      "agentId": "bc309ecf-5f66-4057-93c5-6611cc9cb7b2",      "lastContact": "2019-08-24T14:15:22Z",      "projectId": "5a8591dd-4039-49df-9202-96385ba3eff8",      "updatedAt": "2019-08-24T14:15:22Z",      "createdAt": "2019-08-24T14:15:22Z",      "deletedAt": "2019-08-24T14:15:22Z"    }  ]}
```

**401**

**500**

[

Get agent edge key GET

取得代理邊緣金鑰GET

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/agents/id/key/get)[

Get database by ID GET

透過ID GET取得資料庫

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/databases/id/get)

---

<a id="p-054"></a>

###### Get database by ID｜透過ID取得資料庫

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/id/get>

Portabase DashboardAPIDatabases

Portabase 儀表板 API 資料庫


**[Authorization](#p-054)｜[授權](#p-054)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-054)｜[路徑參數](#p-054)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Response Body](#p-054)｜[回覆正文](#p-054)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X GET "https://example.com/databases/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": {    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",    "agentDatabaseId": "78f4c143-eccc-413e-8e8a-868364d45b73",    "name": "string",    "dbms": "postgresql",    "description": "string",    "backupPolicy": "string",    "isWaitingForBackup": true,    "backupToRestore": "string",    "healthErrorCount": -2147483648,    "agentId": "bc309ecf-5f66-4057-93c5-6611cc9cb7b2",    "lastContact": "2019-08-24T14:15:22Z",    "projectId": "5a8591dd-4039-49df-9202-96385ba3eff8",    "updatedAt": "2019-08-24T14:15:22Z",    "createdAt": "2019-08-24T14:15:22Z",    "deletedAt": "2019-08-24T14:15:22Z"  }}
```

**401**

**403**

**404**

**500**

[

List databases GET

列出資料庫GET

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/databases/get)[

Attach the database to a project, or detach it (projectId: null) PATCH

將資料庫附加到項目，或將其分開（projectId：null） PATCH

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/databases/id/patch)

---

<a id="p-055"></a>

###### Attach the database to a project, or detach it (projectId null)｜將資料庫附加到項目，或將其分開（projectId 為空）

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/id/patch>

Portabase DashboardAPIDatabases

Portabase 儀表板 API 資料庫

**Attach the database to a project, or detach it (projectId: null)｜將資料庫附加到項目，或將其分開（projectId：null）**

**[Authorization](#p-055)｜[授權](#p-055)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-055)｜[路徑參數](#p-055)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Request Body](#p-055)｜[請求正文](#p-055)**

`application/json`

TypeScript Definitions

TypeScript 定義

Use the request body type in TypeScript.

在 TypeScript 中使用請求體類型。

**[Response Body](#p-055)｜[回覆正文](#p-055)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X PATCH "https://example.com/databases/123e4567-e89b-12d3-a456-426614174000" \  -H "Content-Type: application/json" \  -d '{    "projectId": "5a8591dd-4039-49df-9202-96385ba3eff8"  }'
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": null}
```

**401**

**403**

**404**

**422**

**500**

[

Get database by ID GET

透過ID GET取得資料庫

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/databases/id/get)[

Get database status GET

取得資料庫狀態GET

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/databases/id/status/get)

---

<a id="p-056"></a>

###### Get database status｜取得資料庫狀態

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/id/status/get>

Portabase DashboardAPIDatabases

Portabase 儀表板 API 資料庫


**[Authorization](#p-056)｜[授權](#p-056)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-056)｜[路徑參數](#p-056)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Response Body](#p-056)｜[回覆正文](#p-056)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X GET "https://example.com/databases/123e4567-e89b-12d3-a456-426614174000/status"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": {    "isWaitingForBackup": true,    "lastContact": "2019-08-24T14:15:22Z",    "latestBackup": {      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",      "status": "waiting",      "file": "string",      "fileSize": -9007199254740991,      "durationMs": -9007199254740991,      "databaseId": "d0f4f849-8ecf-4909-96bf-7953790e45f9",      "imported": true,      "migrated": true,      "updatedAt": "2019-08-24T14:15:22Z",      "createdAt": "2019-08-24T14:15:22Z",      "deletedAt": "2019-08-24T14:15:22Z"    },    "latestRestoration": {      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",      "status": "waiting",      "durationMs": -9007199254740991,      "backupStorageId": "a2051789-953f-432f-bf4f-6939c87a32b9",      "backupId": "eb7cea43-10b2-42dd-8819-ab9aed37565f",      "databaseId": "d0f4f849-8ecf-4909-96bf-7953790e45f9",      "updatedAt": "2019-08-24T14:15:22Z",      "createdAt": "2019-08-24T14:15:22Z",      "deletedAt": "2019-08-24T14:15:22Z"    }  }}
```

**401**

**403**

**404**

**500**

[

Attach the database to a project, or detach it (projectId: null) PATCH

將資料庫附加到項目，或將其分開（projectId：null） PATCH

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/databases/id/patch)[

List backups for a database GET

列出資料庫的備份GET

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/databases/id/backup/get)

---

<a id="p-057"></a>

###### List backups for a database｜列出資料庫備份

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/id/backup/get>

Portabase DashboardAPIDatabases

Portabase 儀表板 API 資料庫


**[Authorization](#p-057)｜[授權](#p-057)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-057)｜[路徑參數](#p-057)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Response Body](#p-057)｜[回覆正文](#p-057)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X GET "https://example.com/databases/123e4567-e89b-12d3-a456-426614174000/backup"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": [    {      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",      "status": "waiting",      "file": "string",      "fileSize": -9007199254740991,      "durationMs": -9007199254740991,      "databaseId": "d0f4f849-8ecf-4909-96bf-7953790e45f9",      "imported": true,      "migrated": true,      "updatedAt": "2019-08-24T14:15:22Z",      "createdAt": "2019-08-24T14:15:22Z",      "deletedAt": "2019-08-24T14:15:22Z"    }  ]}
```

**401**

**403**

**404**

**500**

[

Get database status GET

取得資料庫狀態GET

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/databases/id/status/get)[

Trigger a backup for a database POST

觸發資料庫備份POST

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/databases/id/backup/post)

---

<a id="p-058"></a>

###### Trigger a backup for a database｜觸發資料庫備份

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/id/backup/post>

Portabase DashboardAPIDatabases

Portabase 儀表板 API 資料庫


**[Authorization](#p-058)｜[授權](#p-058)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-058)｜[路徑參數](#p-058)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Response Body](#p-058)｜[回覆正文](#p-058)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X POST "https://example.com/databases/123e4567-e89b-12d3-a456-426614174000/backup"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**201**

```json
{  "data": {    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",    "status": "waiting",    "file": "string",    "fileSize": -9007199254740991,    "durationMs": -9007199254740991,    "databaseId": "d0f4f849-8ecf-4909-96bf-7953790e45f9",    "imported": true,    "migrated": true,    "updatedAt": "2019-08-24T14:15:22Z",    "createdAt": "2019-08-24T14:15:22Z",    "deletedAt": "2019-08-24T14:15:22Z"  }}
```

**401**

**403**

**404**

**409**

**500**

[

List backups for a database GET

列出資料庫的備份GET

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/databases/id/backup/get)[

Get a specific backup with storage details GET

取得包含儲存詳情的特定備份GET

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/databases/id/backup/backupid/get)

---

<a id="p-059"></a>

###### Get a specific backup with storage details｜取得包含儲存體詳情的特定備份

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/id/backup/backupid/get>

Portabase DashboardAPIDatabases

Portabase 儀表板 API 資料庫


**[Authorization](#p-059)｜[授權](#p-059)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-059)｜[路徑參數](#p-059)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

backupId\*string

backupId\*字串

Format`uuid`

格式`uuid`

**[Response Body](#p-059)｜[回覆正文](#p-059)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X GET "https://example.com/databases/123e4567-e89b-12d3-a456-426614174000/backup/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": {    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",    "status": "waiting",    "file": "string",    "fileSize": -9007199254740991,    "durationMs": -9007199254740991,    "databaseId": "d0f4f849-8ecf-4909-96bf-7953790e45f9",    "imported": true,    "migrated": true,    "updatedAt": "2019-08-24T14:15:22Z",    "createdAt": "2019-08-24T14:15:22Z",    "deletedAt": "2019-08-24T14:15:22Z",    "storages": [      {        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",        "backupId": "eb7cea43-10b2-42dd-8819-ab9aed37565f",        "storageChannelId": "b1f34603-bc6d-47ef-9b4b-df6729e51ad4",        "status": "pending",        "path": "string",        "size": -9007199254740991,        "checksum": "string",        "updatedAt": "2019-08-24T14:15:22Z",        "createdAt": "2019-08-24T14:15:22Z",        "deletedAt": "2019-08-24T14:15:22Z"      }    ]  }}
```

**401**

**403**

**404**

**500**

[

Trigger a backup for a database POST

觸發資料庫備份POST

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/databases/id/backup/post)[

Set or clear the backup schedule for a database PUT

設定或清除資料庫備份計畫PUT

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/databases/id/backup-policy/put)

---

<a id="p-060"></a>

###### Set or clear the backup schedule for a database｜設定或清除資料庫備份計劃

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/id/backup-policy/put>

Portabase DashboardAPIDatabases

Portabase 儀表板 API 資料庫


**[Authorization](#p-060)｜[授權](#p-060)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-060)｜[路徑參數](#p-060)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Request Body](#p-060)｜[請求正文](#p-060)**

`application/json`

TypeScript Definitions

TypeScript 定義

Use the request body type in TypeScript.

在 TypeScript 中使用請求體類型。

**[Response Body](#p-060)｜[回覆正文](#p-060)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X PUT "https://example.com/databases/123e4567-e89b-12d3-a456-426614174000/backup-policy" \  -H "Content-Type: application/json" \  -d '{    "backupPolicy": "string"  }'
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": null}
```

**401**

**403**

**404**

**422**

**500**

[

Get a specific backup with storage details GET

取得包含儲存詳情的特定備份GET

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/databases/id/backup/backupid/get)[

Restore a database from a backup POST

從備份還原資料庫POST

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/databases/id/restore/post)

---

<a id="p-061"></a>

###### Restore a database from a backup｜從備份還原資料庫

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/id/restore/post>

Portabase DashboardAPIDatabases

Portabase 儀表板 API 資料庫


**[Authorization](#p-061)｜[授權](#p-061)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-061)｜[路徑參數](#p-061)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Request Body](#p-061)｜[請求正文](#p-061)**

`application/json`

TypeScript Definitions

TypeScript 定義

Use the request body type in TypeScript.

在 TypeScript 中使用請求體類型。

**[Response Body](#p-061)｜[回覆正文](#p-061)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X POST "https://example.com/databases/123e4567-e89b-12d3-a456-426614174000/restore" \  -H "Content-Type: application/json" \  -d '{    "backupId": "eb7cea43-10b2-42dd-8819-ab9aed37565f",    "backupStorageId": "a2051789-953f-432f-bf4f-6939c87a32b9"  }'
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**201**

```json
{  "data": {    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",    "status": "waiting",    "durationMs": -9007199254740991,    "backupStorageId": "a2051789-953f-432f-bf4f-6939c87a32b9",    "backupId": "eb7cea43-10b2-42dd-8819-ab9aed37565f",    "databaseId": "d0f4f849-8ecf-4909-96bf-7953790e45f9",    "updatedAt": "2019-08-24T14:15:22Z",    "createdAt": "2019-08-24T14:15:22Z",    "deletedAt": "2019-08-24T14:15:22Z"  }}
```

**401**

**403**

**404**

**409**

**422**

**500**

[

Set or clear the backup schedule for a database PUT

設定或清除資料庫備份計畫PUT

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/databases/id/backup-policy/put)[

List organizations for the current user GET

列出目前使用者的組織GET

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/organizations/get)

---

<a id="c-23"></a>

###### Organizations｜組織

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-062"></a>

###### List organizations for the current user｜列出目前使用者的組織

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/get>

Portabase DashboardAPIOrganizations

Portabase 控制台 API 組織


**[Authorization](#p-062)｜[授權](#p-062)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Response Body](#p-062)｜[回覆正文](#p-062)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X GET "https://example.com/organizations"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": [    {      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",      "name": "string",      "slug": "string",      "logo": "string",      "metadata": "string",      "updatedAt": "2019-08-24T14:15:22Z",      "createdAt": "2019-08-24T14:15:22Z",      "deletedAt": "2019-08-24T14:15:22Z"    }  ]}
```

**401**

**500**

[

Restore a database from a backup POST

從備份還原資料庫POST

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/databases/id/restore/post)[

Create an organization POST

創建組織POST

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/organizations/post)

---

<a id="p-063"></a>

###### Create an organization｜創建組織

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/post>

Portabase DashboardAPIOrganizations

Portabase 控制台 API 組織


**[Authorization](#p-063)｜[授權](#p-063)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Request Body](#p-063)｜[請求正文](#p-063)**

`application/json`

TypeScript Definitions

TypeScript 定義

Use the request body type in TypeScript.

在 TypeScript 中使用請求體類型。

**[Response Body](#p-063)｜[回覆正文](#p-063)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X POST "https://example.com/organizations" \  -H "Content-Type: application/json" \  -d '{    "name": "Acme Inc"  }'
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**201**

```json
{  "data": {    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",    "name": "string",    "slug": "string",    "logo": "string",    "metadata": "string",    "updatedAt": "2019-08-24T14:15:22Z",    "createdAt": "2019-08-24T14:15:22Z",    "deletedAt": "2019-08-24T14:15:22Z"  }}
```

**401**

**403**

**409**

**422**

**500**

[

List organizations for the current user GET

列出目前使用者的組織GET

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/organizations/get)[

Get organization by ID GET

透過ID GET來整理收納

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/organizations/id/get)

---

<a id="p-064"></a>

###### Get organization by ID｜透過ID進行整理

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/id/get>

Portabase DashboardAPIOrganizations

Portabase 控制台 API 組織


**[Authorization](#p-064)｜[授權](#p-064)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-064)｜[路徑參數](#p-064)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Response Body](#p-064)｜[回覆正文](#p-064)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X GET "https://example.com/organizations/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": {    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",    "name": "string",    "slug": "string",    "logo": "string",    "metadata": "string",    "updatedAt": "2019-08-24T14:15:22Z",    "createdAt": "2019-08-24T14:15:22Z",    "deletedAt": "2019-08-24T14:15:22Z"  }}
```

**401**

**404**

**500**

[

Create an organization POST

創建組織POST

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/organizations/post)[

Delete an organization DELETE

刪除組織DELETE

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/organizations/id/delete)

---

<a id="p-065"></a>

###### Delete an organization｜刪除組織

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/id/delete>

Portabase DashboardAPIOrganizations

Portabase 控制台 API 組織


**[Authorization](#p-065)｜[授權](#p-065)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-065)｜[路徑參數](#p-065)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Response Body](#p-065)｜[回覆正文](#p-065)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X DELETE "https://example.com/organizations/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": {    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08"  }}
```

**401**

**403**

**404**

**500**

[

Get organization by ID GET

透過ID GET來整理收納

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/organizations/id/get)[

List projects for an organization GET

列出組織的項目GET

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/organizations/id/projects/get)

---

<a id="p-066"></a>

###### List projects for an organization｜列出組織的項目

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/id/projects/get>

Portabase DashboardAPIOrganizations

Portabase 控制台 API 組織


**[Authorization](#p-066)｜[授權](#p-066)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-066)｜[路徑參數](#p-066)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Response Body](#p-066)｜[回覆正文](#p-066)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X GET "https://example.com/organizations/123e4567-e89b-12d3-a456-426614174000/projects"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": [    null  ]}
```

**401**

**404**

**500**

[

Delete an organization DELETE

刪除組織DELETE

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/organizations/id/delete)[

Create a project in an organization POST

在組織中建立專案POST

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/organizations/id/projects/post)

---

<a id="p-067"></a>

###### Create a project in an organization｜在組織內建立一個專案

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/id/projects/post>

Portabase DashboardAPIOrganizations

Portabase 控制台 API 組織


**[Authorization](#p-067)｜[授權](#p-067)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-067)｜[路徑參數](#p-067)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Request Body](#p-067)｜[請求正文](#p-067)**

`application/json`

TypeScript Definitions

TypeScript 定義

Use the request body type in TypeScript.

在 TypeScript 中使用請求體類型。

**[Response Body](#p-067)｜[回覆正文](#p-067)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X POST "https://example.com/organizations/123e4567-e89b-12d3-a456-426614174000/projects" \  -H "Content-Type: application/json" \  -d '{    "name": "my-project"  }'
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**201**

```json
{  "data": null}
```

**401**

**403**

**404**

**409**

**422**

**500**

[

List projects for an organization GET

列出組織的項目GET

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/organizations/id/projects/get)[

List agents attached to an organization GET

列出隸屬於某個組織的代理人GET

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/organizations/id/agents/get)

---

<a id="p-068"></a>

###### List agents attached to an organization｜列出隸屬於某個組織的代理人

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/id/agents/get>

Portabase DashboardAPIOrganizations

Portabase 控制台 API 組織


**[Authorization](#p-068)｜[授權](#p-068)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-068)｜[路徑參數](#p-068)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Response Body](#p-068)｜[回覆正文](#p-068)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X GET "https://example.com/organizations/123e4567-e89b-12d3-a456-426614174000/agents"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": [    null  ]}
```

**401**

**404**

**500**

[

Create a project in an organization POST

在組織中建立專案POST

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/organizations/id/projects/post)[

Attach an agent to an organization POST

將代理人分配給組織POST

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/organizations/id/agents/post)

---

<a id="p-069"></a>

###### Attach an agent to an organization｜將代理人分配給組織

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/id/agents/post>

Portabase DashboardAPIOrganizations

Portabase 控制台 API 組織


**[Authorization](#p-069)｜[授權](#p-069)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-069)｜[路徑參數](#p-069)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Request Body](#p-069)｜[請求正文](#p-069)**

`application/json`

TypeScript Definitions

TypeScript 定義

Use the request body type in TypeScript.

在 TypeScript 中使用請求體類型。

**[Response Body](#p-069)｜[回覆正文](#p-069)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X POST "https://example.com/organizations/123e4567-e89b-12d3-a456-426614174000/agents" \  -H "Content-Type: application/json" \  -d '{    "agentId": "bc309ecf-5f66-4057-93c5-6611cc9cb7b2"  }'
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**201**

```json
{  "data": {    "organizationId": "7bc05553-4b68-44e8-b7bc-37be63c6d9e9",    "agentId": "bc309ecf-5f66-4057-93c5-6611cc9cb7b2"  }}
```

**401**

**403**

**404**

**409**

**422**

**500**

[

List agents attached to an organization GET

列出隸屬於某個組織的代理人GET

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/organizations/id/agents/get)[

Detach an agent from an organization DELETE

將代理人從組織中分離出來DELETE

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/organizations/id/agents/agentid/delete)

---

<a id="p-070"></a>

###### Detach an agent from an organization｜將一名代理人從組織中分離出來

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/id/agents/agentid/delete>

Portabase DashboardAPIOrganizations

Portabase 控制台 API 組織


**[Authorization](#p-070)｜[授權](#p-070)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-070)｜[路徑參數](#p-070)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

agentId\*string

agentId\*字串

Format`uuid`

格式`uuid`

**[Response Body](#p-070)｜[回覆正文](#p-070)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X DELETE "https://example.com/organizations/123e4567-e89b-12d3-a456-426614174000/agents/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": {    "organizationId": "7bc05553-4b68-44e8-b7bc-37be63c6d9e9",    "agentId": "bc309ecf-5f66-4057-93c5-6611cc9cb7b2"  }}
```

**401**

**403**

**404**

**500**

[

Attach an agent to an organization POST

將代理人分配給組織POST

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/organizations/id/agents/post)[

Get project by ID GET

取得項目ID GET

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/projects/id/get)

---

<a id="c-24"></a>

###### Projects｜專案

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-071"></a>

###### Get project by ID｜取得項目ID

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/projects/id/get>

Portabase DashboardAPIProjects

Portabase 儀表板 API 項目


**[Authorization](#p-071)｜[授權](#p-071)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-071)｜[路徑參數](#p-071)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Response Body](#p-071)｜[回覆正文](#p-071)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X GET "https://example.com/projects/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": {    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",    "slug": "string",    "name": "string",    "isArchived": true,    "organizationId": "7bc05553-4b68-44e8-b7bc-37be63c6d9e9",    "updatedAt": "2019-08-24T14:15:22Z",    "createdAt": "2019-08-24T14:15:22Z",    "deletedAt": "2019-08-24T14:15:22Z"  }}
```

**401**

**404**

**500**

[

Detach an agent from an organization DELETE

將代理人從組織中分離出來DELETE

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/organizations/id/agents/agentid/delete)[

Archive (soft-delete) a project DELETE

歸檔（軟刪除）項目DELETE

Next Page

下一頁

](https://portabase.io/docs/dashboard/api/projects/id/delete)

---

<a id="p-072"></a>

###### Archive (soft-delete) a project｜將項目歸檔（軟刪除）

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/projects/id/delete>

Portabase DashboardAPIProjects

Portabase 儀表板 API 項目


**[Authorization](#p-072)｜[授權](#p-072)**

`apiKeyAuth`

x-api-key<token>

x-api-key <token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

API金鑰由 Portabase 控制面板產生。將其作為 x-api-key 標頭傳遞。

In: `header`

在： `header`

**[Path Parameters](#p-072)｜[路徑參數](#p-072)**

id\*string

id\*字串

Format`uuid`

格式`uuid`

**[Response Body](#p-072)｜[回覆正文](#p-072)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

**捲曲**

```bash
curl -X DELETE "https://example.com/projects/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**去**

**Python**

**Java**

**C#**

**Rust**

**銹**

**200**

```json
{  "data": {    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",    "slug": "string",    "name": "string",    "isArchived": true,    "organizationId": "7bc05553-4b68-44e8-b7bc-37be63c6d9e9",    "updatedAt": "2019-08-24T14:15:22Z",    "createdAt": "2019-08-24T14:15:22Z",    "deletedAt": "2019-08-24T14:15:22Z"  }}
```

**401**

**403**

**404**

**500**

[

Get project by ID GET

取得項目ID GET

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/projects/id/get)[

MCP Server

MCP伺服器

Connect AI assistants to Portabase via the Model Context Protocol (MCP) server.

透過模型上下文協定 ( MCP ) 伺服器將AI助手連接到 Portabase。

](https://portabase.io/docs/dashboard/mcp/introduction)

---

<a id="c-25"></a>

###### MCP Server｜MCP 伺服器

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-073"></a>

> 來源：<https://portabase.io/docs/dashboard/mcp/introduction>

Portabase DashboardMCP Server

Portabase DashboardMCP 伺服器


Connect AI assistants to Portabase via the Model Context Protocol (MCP) server.

透過模型上下文協定（ MCP ）伺服器將AI助手連接到Portabase。

The Portabase MCP server exposes your dashboard over the [Model Context Protocol](https://modelcontextprotocol.io/), allowing AI assistants (Claude, Cursor, Windsurf, etc.) to manage databases, agents, and backups through natural language.

Portabase MCP伺服器透過 [模型上下文協定](https://modelcontextprotocol.io/)公開您的儀表板，讓AI助手（Claude、Cursor、Windsurf 等）透過自然語言管理資料庫、代理程式和備份。

**[Prerequisites](#p-073)｜[先修課程](#p-073)**

-   Portabase dashboard running with both `API_ENABLED=true` and `MCP_ENABLED=true`  
    Portabase 控制面板同時運作於`API_ENABLED=true`和`MCP_ENABLED=true`平台
-   An API token (see [API Introduction](#p-047))  
    API標記（參見 [API簡介](#p-047) ）
-   Node.js 18+ on the machine running your AI assistant  
    運作AI助手的機器上需要 Node.js 18+

**[Enable MCP](#p-073)｜[啟用MCP](#p-073)**

Set both environment variables before starting your dashboard:

在啟動儀表板之前，請先設定這兩個環境變數：

```
API_ENABLED=true
MCP_ENABLED=true
```

-   `API_ENABLED=true`: enables all API routes under `/api/v1`  
    `API_ENABLED=true` ：啟用`/api/v1`下的所有API路由
-   `MCP_ENABLED=true`: enables the MCP server at `/api/v1/mcp`  
    `MCP_ENABLED=true` ：啟用位於`/api/v1/mcp` MCP伺服器

**[Connection](#p-073)｜[連接](#p-073)**

Add the following to your AI assistant's MCP configuration, replacing the URL and API key with your own:

將以下內容加入您的AI助手的MCP配置中，並將URL和API鍵替換為您自己的鍵：

**Claude Desktop**

**克勞德桌面**

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

編輯`~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) 或`%APPDATA%\Claude\claude_desktop_config.json` (Windows)：

```json
{
  "mcpServers": {
    "portabase": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://your-dashboard.example.com/api/v1/mcp",
        "--header",
        "x-api-key: YOUR_API_TOKEN"
      ]
    }
  }
}
```

**Cursor / Windsurf**

**遊標/帆板**

**Other**

**其他**

Never commit your API token to version control. Use your environment's secret management to inject it where possible.

永遠不要將API令牌提交到版本控制系統中。盡可能使用環境的金鑰管理機制注入令牌。

**[Verify the connection](#p-073)｜[驗證連線](#p-073)**

Restart your AI assistant. Ask it:

重啟您的AI助手。詢問它：

> "List my Portabase databases"
>
> “列出我的Portabase資料庫”

A successful response confirms the MCP server is connected.

成功回應確認MCP伺服器已連線。

**[Available Tools](#p-073)｜[可用工具](#p-073)**

See the [Tools reference](#p-074) for the full list of operations.

有關操作的完整列表，請參閱[工具參考](#p-074) 。

Last updated on

最後更新於

[

Archive (soft-delete) a project DELETE

歸檔（軟刪除）項目DELETE

Previous Page

上一頁

](https://portabase.io/docs/dashboard/api/projects/id/delete)[

MCP Tools Reference

MCP工具參考

Complete reference for all tools exposed by the Portabase MCP server.

Portabase MCP伺服器公開的所有工具的完整參考。

](https://portabase.io/docs/dashboard/mcp/tools)

---

<a id="p-074"></a>

###### MCP Tools Reference｜MCP工具參考

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/mcp/tools>

Portabase DashboardMCP Server

Portabase DashboardMCP 伺服器


Complete reference for all tools exposed by the Portabase MCP server.

Portabase MCP伺服器公開的所有工具的完整參考。

The Portabase MCP server exposes 12 tools grouped into three categories: **Agents**, **Databases**, and **Backups**.

Portabase MCP伺服器公開了 12 個工具，分為三類：**代理**、**資料庫**和**備份**。

---

**[Agents](#p-074)｜[特工](#p-074)**

**[`list_agents`](#p-074)**

List all agents accessible to the authenticated user.

列出所有已認證使用者可存取的代理程式。

**Parameters:** none

**參數：** 無

**Returns:** Array of agent objects.

**傳回值：**代理物件數組。

---

**[`get_agent`](#p-074)**

Get details for a specific agent, including its associated databases.

取得特定代理商的詳細信息，包括其關聯的資料庫。

| Parameter<br>參數 | Type<br>類型 | Required<br>必填 | Description<br>說明 |
| --- | --- | --- | --- |
| `id` | string<br>字串 | Yes<br>是 | Agent ID<br>代理ID |

**Returns:** Agent object with associated databases.

**傳回值：** 包含關聯資料庫的代理物件。

---

**[`create_agent`](#p-074)**

Create a new agent, optionally scoped to an organization.

建立一個新代理，可以選擇將其作用域限定為某個組織。

| Parameter<br>參數 | Type<br>類型 | Required<br>必填 | Description<br>說明 |
| --- | --- | --- | --- |
| `name` | string<br>字串 | Yes<br>是 | Agent name (min 1 character)<br>代理名稱（至少 1 個字元） |
| `organizationId` | string (UUID)<br>字串 ( UUID ) | No<br>否 | Organization ID to scope the agent to<br>組織ID將代理範圍限定到 |

**Returns:** Created agent object.

**傳回值：** 已建立的代理物件。

---

**[`delete_agent`](#p-074)**

Delete an agent by ID.

透過ID刪除代理。

| Parameter<br>參數 | Type<br>類型 | Required<br>必填 | Description<br>說明 |
| --- | --- | --- | --- |
| `id` | string<br>字串 | Yes<br>是 | Agent ID<br>代理ID |

**Returns:** Confirmation message.

**退貨：**確認訊息。

---

**[`get_agent_key`](#p-074)**

Get the edge key for an agent. This key is used by the agent binary to authenticate with Portabase.

取得代理的邊緣密鑰。代理二進位檔案使用此金鑰向 Portabase 進行身份驗證。

| Parameter<br>參數 | Type<br>類型 | Required<br>必填 | Description<br>說明 |
| --- | --- | --- | --- |
| `id` | string<br>字串 | Yes<br>是 | Agent ID<br>代理ID |

**Returns:** Object containing the edge key.

**傳回值：**包含邊鍵的物件。

The edge key grants the agent access to your Portabase instance. Treat it like a password and never expose it in logs or version control.

邊緣金鑰授予代理程式存取您的 Portabase 實例的權限。請像對待密碼一樣對待它，切勿將其暴露在日誌或版本控制系統中。

---

**[Databases](#p-074)｜[資料庫](#p-074)**

**[`list_databases`](#p-074)**

List all databases accessible to the authenticated user.

列出已認證使用者可存取的所有資料庫。

**Parameters:** none

**參數：** 無

**Returns:** Array of database objects.

**傳回值：** 資料庫物件數組。

---

**[`get_database`](#p-074)**

Get details for a specific database.

取得特定資料庫的詳細資訊。

| Parameter<br>參數 | Type<br>類型 | Required<br>必填 | Description<br>說明 |
| --- | --- | --- | --- |
| `id` | string<br>字串 | Yes<br>是 | Database ID<br>資料庫ID |

**Returns:** Database object.

**傳回值：**資料庫物件。

---

**[`get_database_status`](#p-074)**

Get the current status of a database, including the latest backup and restoration state.

取得資料庫的目前狀態，包括最新的備份和復原狀態。

| Parameter<br>參數 | Type<br>類型 | Required<br>必填 | Description<br>說明 |
| --- | --- | --- | --- |
| `id` | string<br>字串 | Yes<br>是 | Database ID<br>資料庫ID |

**Returns:** Status object with backup and restore state.

**傳回值：**包含備份和復原狀態的狀態物件。

---

**[Backups](#p-074)｜[備份](#p-074)**

**[`list_backups`](#p-074)**

List all backups for a specific database, ordered by most recent first.

列出特定資料庫的所有備份，並按最新備份數量排序。

| Parameter<br>參數 | Type<br>類型 | Required<br>必填 | Description<br>說明 |
| --- | --- | --- | --- |
| `databaseId` | string<br>字串 | Yes<br>是 | Database ID<br>資料庫ID |

**Returns:** Array of backup objects.

**傳回值：**備份物件數組。

---

**[`get_backup`](#p-074)**

Get details for a specific backup, including its storage locations.

取得特定備份的詳細信息，包括其儲存位置。

| Parameter<br>參數 | Type<br>類型 | Required<br>必填 | Description<br>說明 |
| --- | --- | --- | --- |
| `databaseId` | string<br>字串 | Yes<br>是 | Database ID<br>資料庫ID |
| `backupId` | string<br>字串 | Yes<br>是 | Backup ID<br>備份ID |

**Returns:** Backup object with `storages` array. Use the `id` values from `storages` as `backupStorageId` in `trigger_restore`.

**傳回值：** 包含`storages`數組的備份物件。使用`storages`中的`id`值作為`trigger_restore`中的`backupStorageId` 。

---

**[`trigger_backup`](#p-074)**

Trigger an immediate backup for a database.

立即觸發資料庫備份。

| Parameter<br>參數 | Type<br>類型 | Required<br>必填 | Description<br>說明 |
| --- | --- | --- | --- |
| `databaseId` | string<br>字串 | Yes<br>是 | Database ID<br>資料庫ID |

**Returns:** Backup job object.

**傳回值：**備份作業物件。

Returns `409 Conflict` if a backup is already running for this database.

如果此資料庫的備份已經在運行，則傳回`409 Conflict` 。

---

**[`trigger_restore`](#p-074)**

Trigger a database restore from a specific backup storage. Use `get_backup` to find available `backupStorageId` values.

從指定的備份儲存觸發資料庫還原。使用`get_backup`找出可用的`backupStorageId`值。

| Parameter<br>參數 | Type<br>類型 | Required<br>必填 | Description<br>說明 |
| --- | --- | --- | --- |
| `databaseId` | string<br>字串 | Yes<br>是 | Database ID<br>資料庫ID |
| `backupId` | string (UUID)<br>字串 ( UUID ) | Yes<br>是 | Backup ID<br>備份ID |
| `backupStorageId` | string (UUID)<br>字串 ( UUID ) | Yes<br>是 | Backup storage ID (from `get_backup` storages list)<br>備份儲存ID （來自`get_backup`儲存清單） |

**Returns:** Restore job object.

**傳回值：**恢復作業物件。

Returns `409 Conflict` if a restore is already running for this database.

如果該資料庫的還原操作已在進行中，則傳回`409 Conflict` 。

Last updated on

最後更新於

[

MCP Server

MCP伺服器

Connect AI assistants to Portabase via the Model Context Protocol (MCP) server.

透過模型上下文協定 ( MCP ) 伺服器將AI助手連接到 Portabase。

](https://portabase.io/docs/dashboard/mcp/introduction)[

Configuration File

設定檔

Declare your databases manually via JSON or TOML.

透過JSON或TOML手動聲明您的資料庫。

](https://portabase.io/docs/agent/configuration)

---

<a id="c-26"></a>

#### Portabase Agent

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-27"></a>

##### Configuration File｜設定檔

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-075"></a>

> 來源：<https://portabase.io/docs/agent/configuration>

Portabase Agent


Declare your databases manually via JSON or TOML.

透過JSON或TOML手動聲明您的資料庫。

The Portabase Agent needs to know where your databases are located to connect to them. This configuration is done via a file (commonly named `databases.json`) mounted into the Docker container.

Portabase Agent 需要知道資料庫的位置才能連接到它們。此配置是透過掛載到 Docker 容器中的檔案（通常名為`databases.json` ）完成的。

You can manage this file in two ways:

您可以透過兩種方式管理此文件：

1.  **Via the CLI** (command `portabase agent db add`): recommended, as it generates IDs and validates the syntax for you.  
    **透過CLI**（命令`portabase agent db add` ）：推薦，因為它會產生 ID 並為您驗證語法。
2.  **Manually**: useful for automation (Ansible, Terraform) or when you prefer editing files by hand.  
    **手動**：適用於自動化（Ansible、Terraform）或您喜歡手動編輯文件的情況。

The agent supports two formats: **JSON** (default) and **TOML** (more human-friendly).

此代理程式支援兩種格式：**JSON**（預設）和 **TOML**（更人性化）。

---

###### [File structure](#p-075)｜[文件結構](#p-075)

You can define multiple databases in a single file. This allows a single agent to back up, for example, both your `staging` and `production` environments.

您可以在單一文件中定義多個資料庫。這樣，單一代理程式就可以備份例如您的`staging`和`production`環境。

**JSON (Default)**

**JSON （預設）**

Standard format used by the CLI.

CLI使用的標準格式。

```json title="databases.json"
{
  "databases": [
    {
      "name": "my-site-prod (readable name)",
      "database": "devdb",
      "type": "postgresql",
      "host": "localhost",
      "port": 5432,
      "username": "admin_prod",
      "password": "super_secure_password",
      "generated_id": "550e8400-e29b-41d4-a716-446655440000"
    },
    {
      "name": "my-site-dev (readable name)",
      "database": "mariadb",
      "type": "mysql",
      "host": "192.168.1.50",
      "port": 3306,
      "username": "root",
      "password": "dev_password",
      "generated_id": "123e4567-e89b-12d3-a456-426614174000"
    }
  ]
}
```

**TOML**

---

###### [Field reference](#p-075)｜[現場參考](#p-075)

Here is the meaning of each configuration parameter:

以下是每個配置參數的意思：

| Field<br>領域 | Required<br>必填 | Description<br>描述 |
| --- | --- | --- |
| `name` | Yes<br>是的 | The Readable name.<br>可讀名稱。 |
| `database` | Depends on the engine.<br>取決於引擎。 | The database to back up (e.g. "prod\_api").<br>要備份的資料庫（例如「prod\_api」）。 |
| `type` | Yes<br>是 | Engine type: `postgresql`,`sqlite`, `mysql`, `mariadb` (use `mysql` for MariaDB).<br>引擎類型： `postgresql`,`sqlite`, `mysql`, `mariadb` （MariaDB 使用`mysql` ）。 |
| `host` | Depends on the engine.<br>取決於引擎。 | Host IP or name. If the agent runs on the same server, use `localhost` (with `extra_hosts` in Docker) or the local IP.<br>主機IP或名稱。如果代理程式運行在同一台伺服器上，請使用`localhost` （在 Docker 中為`extra_hosts` ）或本地IP 。 |
| `port` | Depends on the engine.<br>取決於引擎。 | Listening port (`5432` for Postgres, `3306` for MySQL).<br>監聽埠（ `5432`用於 Postgres， `3306`用於 MySQL）。 |
| `username` | Depends on the engine.<br>取決於引擎。 | User with read/dump permissions.<br>具有讀取/轉儲權限的使用者。 |
| `password` | Depends on the engine.<br>取決於引擎。 | Password for that user.<br>該用戶的密碼。 |
| `generated_id` | **Yes**<br>**是** | A unique UUID v4 identifier.<br>一個唯一的UUID v4 識別符。 |

---

###### [The `generatedId` rule](#p-075)｜[`generatedId`規則](#p-075)

Each database must have a **unique ID**. This ID lets the Dashboard recognize a database's backup history even if you rename it.

每個資料庫必須有一個**唯一的ID**。即使您重新命名資料庫，此 ID 也可以讓儀表板識別資料庫的備份歷史記錄。

Attention

注意力

If you create this file manually, you **must** generate a valid UUID. Do not invent a simple random string.

如果您手動建立此文件，則**必須**產生有效的UUID 。不要隨意編造一個簡單的隨機字串。

Generate UUID for your configuration

為您的配置產生UUID

`Generating...`

---

###### [Docker mount](#p-075)｜[Docker 掛載](#p-075)

If you edit the file manually, ensure it's mounted into the agent container.

如果手動編輯文件，請確保將其掛載到代理容器中。

```yaml title="docker-compose.yml"
services:
  agent:
    # ...
    volumes:
      - ./databases.json:/config/config.json
```

After any manual change, restart the agent so it picks up the new configuration: `docker compose restart agent`

手動變更後，請重新啟動代理程式以套用新設定： `docker compose restart agent`

Last updated on

最後更新於

[

MCP Tools Reference

MCP工具參考

Complete reference for all tools exposed by the Portabase MCP server.

Portabase MCP伺服器公開的所有工具的完整參考。

](https://portabase.io/docs/dashboard/mcp/tools)[

Environment Variables

環境變數

Complete reference of .env configuration options.

.env 配置選項完整參考。

](https://portabase.io/docs/agent/environment)

---

<a id="p-076"></a>

###### Environment Variables｜環境變數

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/environment>

Portabase Agent


Complete reference of .env configuration options.

.env 配置選項完整參考。

Portabase provides flexibility through environment variables. These let you customize application behavior, database connection, authentication and storage.

Portabase 透過環境變數提供彈性。您可以利用這些環境變數自訂應用程式行為、資料庫連線、身份驗證和儲存。

If you use Docker Compose, set these variables in your `.env` file at the root of the project.

如果您使用 Docker Compose，請在專案根目錄下的`.env`檔案中設定這些變數。

---

| Variable<br>變數 | Type<br>類型 | Optional<br>可選 | Default<br>預設值 | Description<br>描述 |
| --- | --- | --- | --- | --- |
| `EDGE_KEY` | `string` | No<br>否 | `None` | Your agent's unique key from the dashboard.<br>您代理在控制面板中的唯一金鑰。 |
| `TZ` | `string` | Yes<br>是 | `UTC` | Timezone for the agent (e.g. `UTC`, `Europe/Paris`).<br>代理人的時區（例如`UTC`, `Europe/Paris` ）。 |
| `POLLING` | `number` | Yes<br>是 | `5` | Frequency (in seconds) to check for new tasks.<br>檢查新任務的頻率（秒）。 |
| `DATA_PATH` | `string` | Yes<br>是 | `/data` | Internal path where the agent stores its data.<br>代理儲存資料的內部路徑。 |
| `TMPDIR` | `string` | Yes<br>是 | `/tmp` | Directory where the agent builds the temporary backup/restore archive. Point it at a disk with enough free space for your largest volume (see [Docker Volume](#p-087)).<br>代理程式建構臨時備份/還原歸檔檔案的目錄。將其指向具有足夠可用空間的磁碟，以容納您的最大磁碟區（請參閱 [Docker 磁碟區](#p-087) ）。 |
| `RETRY_ATTEMPTS` | `number` | Yes | `3` | Total attempts (not retries after the first) for a database dump, each storage upload, and the restore download. `3` means one initial try plus two retries. Must be between 3 and 5. |

| `RETRY_ATTEMPTS` | `number` 是的 | `3` | 資料庫轉儲、每次儲存上傳和復原下載的總嘗試次數（不包括第一次之後的重試次數）。 `3` 表示一次初始嘗試加上兩次重試。結果必須介於 3 和 5 之間。
| `RETRY_BACKOFF_MS` | `number` | Yes<br>是 | `1000` | Base delay between retry attempts. Doubles each attempt, with equal jitter and a 30s ceiling per wait, so the default spends at most ~3s sleeping per seam. Must be between 100 and 30000.<br>重試嘗試之間的基本延遲。每次嘗試延遲翻倍，抖動幅度相同，每次等待的上限為 30 秒，因此預設每個連線最多休眠約 3 秒。值必須介於 100 和 30000 之間。 |
| `SSL_CERT_FILE` | `string` | Yes<br>是 | `None` | Path to a CA bundle used for the agent's outgoing TLS connections. Needed when the agent must trust an internal certificate authority (see below).<br>用於代理出TLS連接的CA捆綁包路徑。當代理必須信任內部憑證授權單位時需要此路徑（見下文）。 |

---

Internal certificate authority: update-ca-certificates has no effect

內部憑證授權單位：update-ca-certificates 指令無效

The agent is written in Rust and uses `rustls`, which does **not** read the system CA directory. Dropping your certificate into `/usr/local/share/ca-certificates/` and running `update-ca-certificates` satisfies tools such as `curl`, but the agent keeps failing with `InvalidCertificate(UnknownIssuer)`.

該代理是用 Rust 編寫的，並使用`rustls` ，它**不**讀取系統CA目錄。將您的證書放入`/usr/local/share/ca-certificates/`並運行`update-ca-certificates`可以滿足`curl`等工具的要求，但代理仍然會失敗，並出現`InvalidCertificate(UnknownIssuer)`錯誤。

Mount a CA bundle and point `SSL_CERT_FILE` at it instead:

安裝一個CA束，並將`SSL_CERT_FILE`指向它：

```yaml title="docker-compose.yml"
volumes:
  - ./ca-bundle.crt:/etc/ssl/certs/portabase-ca-bundle.crt:ro
environment:
  - SSL_CERT_FILE=/etc/ssl/certs/portabase-ca-bundle.crt
```

`SSL_CERT_FILE` **replaces** the default root store, it does not add to it. The bundle must therefore contain the standard Mozilla root certificates concatenated with your internal CA — otherwise the agent stops trusting public hosts, such as your S3 storage.

`SSL_CERT_FILE` **替換**了預設的根憑證存儲，而不是在其基礎上添加內容。因此，憑證包必須包含標準的 Mozilla 根憑證以及您內部的CA憑證－否則代理程式將停止信任公共主機，例如您的 S3 儲存。

Last updated on

最後更新於

[

Configuration File

設定檔

Declare your databases manually via JSON or TOML.

透過JSON或TOML手動聲明您的資料庫。

](https://portabase.io/docs/agent/configuration)[

Supported Databases

支援的資料庫

List and configuration of databases managed by the agent.

代理管理的資料庫清單和配置。

](https://portabase.io/docs/agent/db)

---

<a id="c-28"></a>

###### Databases｜資料庫

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-077"></a>

###### Supported Databases｜支援的資料庫

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db>

Portabase AgentDatabases


List and configuration of databases managed by the agent.

代理管理的資料庫清單和配置。

The Portabase agent is designed to be agnostic and modular. It natively supports several database engines, whether for local (Docker) or remote backups.

Portabase代理程式採用與平台無關且模組化的設計。它原生支援多種資料庫引擎，無論是本機（Docker）備份還是遠端備份。

**[Supported Databases](#p-077)｜[支援的資料庫](#p-077)**

| Database<br>資料庫 | Type Key<br>類型鍵 | Support<br>支援 | Tested Versions<br>測試版本 | Restore<br>還原 |
| --- | --- | --- | --- | --- |
| **PostgreSQL** | `postgresql` | ✅ Stable<br>✅ 穩定版 | 12, 13, 14, 15, 16, 17 and 18<br>12、13、14、15、16、17 和 18 | Yes<br>是 |
| **MySQL** | `mysql` | ✅ Stable<br>✅ 穩定 | 5.7, 8 and 9<br>5.7 、8 與 9 | Yes<br>是 |
| **MariaDB** | `mysql` | ✅ Stable<br>✅ 穩定 | 10 and 11<br>10 和 11 | Yes<br>是 |
| **MongoDB** | `mongodb` | ✅ Stable<br>✅ 穩定版 | 4, 5, 6, 7 and 8<br>支援 4、5、6、7 和 8 版本 | Yes<br>是 |
| **SQLite** | `sqlite` | ✅ Stable<br>✅ 穩定版 | 3.x | Yes<br>是 |
| **Redis** | `redis` | ✅ Stable<br>✅ 穩定版 | 2.8+<br>2.8 + | No<br>否 |
| **Valkey** | `valkey` | ✅ Stable<br>✅ 穩定版 | 7.2+<br>7.2 + | No<br>無 |
| **Firebird**<br>**火鳥** | `firebird` | ✅ Stable<br>✅ 穩定 | 3.0, 4.0, 5.0 | Yes<br>是 |
| **MSSQL Server**<br>**MSSQL伺服器** | `mssql` | ✅ Stable<br>✅ 穩定 | \- | Yes<br>是 |
| **Docker Volume**<br>**Docker 磁碟區** | `docker-volume` | ✅ Stable<br>✅ 穩定 | Docker Engine 20.10+<br>Docker 引擎20.10 + | Yes<br>是 |

**[Global Configuration](#p-077)｜[全域配置](#p-077)**

Regardless of the database, the configuration follows the same pattern. You must tell the agent how to connect (host, port, credentials).

無論使用哪個資料庫，配置都遵循相同的模式。您必須告訴代理程式如何連接（主機、連接埠、憑證）。

**Via CLI (Recommended)**

**經由CLI （推薦）**

This is the simplest method. The agent has a dedicated command to add a configuration without errors.

這是最簡單的方法。代理程式有一個專門的命令，可以無錯誤地新增配置。

```
# Inside your agent directory
portabase agent db add .
```

The wizard will ask for:

巫師會要求：

1.  The database **engine** (e.g., `postgresql`).  
    資料庫**引擎**（例如， `postgresql` ）。
2.  The **mode**: `new` (a container created by the CLI) or `existing` (your own server).  
    **模式**： `new` （由CLI建立的容器）或`existing` （您自己的伺服器）。
3.  For an existing database: the **display name**, the **host** (`localhost` or IP), the **port** and the **credentials**.  
    對於現有資料庫：**顯示名稱**、**主機**（ `localhost`或IP ）、**連接埠**和**憑證**。

Every answer can also be passed as a flag, for example `--engine postgresql --mode existing --host 10.0.0.12 --password-stdin`. See [`agent db add`](#p-096) for all options.

每個答案也可以作為標誌傳遞，例如`--engine postgresql --mode existing --host 10.0.0.12 --password-stdin` 。有關所有選項，請參閱 [`agent db add`](#p-096) 。

With the **CLI 26.08.12 or earlier**, this command is `portabase db add .` — see the [migration guide](#p-103).

對於 **CLI 26.08.12或更早版本**，此指令為`portabase db add .` — 請參閱 [遷移指南](#p-103) 。

**Manual**

**手動的**

Generate UUID for your configuration

為您的配置產生UUID

`Generating...`

For more details on each engine, check the dedicated pages in this section.

有關每款發動機的更多詳細信息，請查看本節中的相關頁面。

Last updated on

最後更新於

[

Environment Variables

環境變數

Complete reference of .env configuration options.

.env 配置選項完整參考。

](https://portabase.io/docs/agent/environment)[

PostgreSQL

Specific configuration for PostgreSQL.

PostgreSQL 的特定配置。

](https://portabase.io/docs/agent/db/postgresql)

---

<a id="p-078"></a>

###### PostgreSQL

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/postgresql>

Portabase AgentDatabases


Specific configuration for PostgreSQL.

PostgreSQL 的特定配置。

PostgreSQL is fully supported by the Portabase agent. We use native `pg_dump` tools to ensure consistent and reliable backups.

Portabase代理完全支援PostgreSQL。我們使用原生`pg_dump`工具來確保備份的一致性和可靠性。

Two modes are available:

有兩種模式可供選擇：

-   **`postgresql`**: Single database backup using `pg_dump`. Targets one specific database.  
    **`postgresql`**：使用`pg_dump`進行單一資料庫備份。目標是一個特定的資料庫。
-   **`postgresql-cluster`**: Full cluster backup using `pg_dumpall`. Dumps every database in the instance **plus global objects** (roles, ownership, grants, tablespaces). Useful when advanced roles and ownership are configured at the cluster level.  
    **`postgresql-cluster`**：使用`pg_dumpall`進行完整叢集備份。備份實例中的每個資料庫**以及全域物件**（角色、所有權、授權、表空間）。當在叢集層級配置了進階角色和所有權時，此功能非常有用。

**[Configuration](#p-078)｜[配置](#p-078)**

**Via CLI (Recommended)**

**經由CLI （推薦）**

When running `portabase agent db add`, select `postgresql` as the database type.

運行`portabase agent db add`時，選擇`postgresql`作為資料庫類型。

**Specific parameters asked:**

**具體要求：**

-   **Database Name**: The exact name of the database to backup (e.g., `app_db`). Unlike other engines, you must target a specific database.  
    **資料庫名稱**：要備份的資料庫的確切名稱（例如， `app_db` ）。與其他引擎不同，您必須指定一個特定的資料庫。

**Via Docker Compose**

**透過 Docker Compose**

**[Options](#p-078)｜[選項](#p-078)**

The following optional fields can be set under an `options` key in the database configuration.

可以在資料庫配置中的`options`鍵下設定以下可選欄位。

| Option<br>選項 | Type<br>類型 | Default<br>預設值 | Description<br>說明 |
| --- | --- | --- | --- |
| `keep_ownership` | `boolean` | `false` | When `true`, omits `--no-owner` and `--no-privileges` from the dump. Ownership and role assignments are preserved in the output. By default these flags are applied, keeping restores portable across different users and environments, for example, when migrating from one database instance to another.<br>當`true`時，從轉儲省略`--no-owner`和`--no-privileges`。所有權和角色分配保留在輸出中。預設情況下，套用這些標誌，保持恢復在不同使用者和環境之間的可移植性，例如，當從一個資料庫實例遷移到另一個資料庫實例時。 |
| `clean_mode` | `string` | `"clean"` | Controls how the target database is cleaned **before a restore**. One of `none`, `clean`, `drop_schemas`, `drop_database`. See [Clean mode](#p-078) below. |

| `clean_mode` | `string` | `"clean"` | 控制目標資料庫在**恢復**之前如何清理。 `none`, `clean`, `drop_schemas`, `drop_database`參見[清潔模式](#p-078) 下方。

```json title="databases.json (with options)"
{
  "name": "Database - PostgreSQL",
  "type": "postgresql",
  "host": "postgres",
  "port": 5432,
  "username": "postgres",
  "password": "mysecretpassword",
  "database": "app_db",
  "generated_id": "...",
  "options": {
    "keep_ownership": true,
    "clean_mode": "drop_schemas"
  }
}
```

**[Clean mode](#p-078)｜[清潔模式](#p-078)**

`pg_restore --clean` only drops objects that exist in the backup's own table of contents. Anything already present in the target that the dump does not know about survives and can collide with the restore, so restoring into a **populated** database can partially fail (`already exists`, constraint or key errors). `clean_mode` lets you guarantee a clean target before restoring.

`pg_restore --clean`僅刪除備份自身內容表中存在的物件。目標資料庫中已存在但備份檔案未識別的任何物件都會保留，並可能與復原作業衝突，因此還原至**已填入**的資料庫可能會部分失敗（ `already exists`約束或鍵錯誤） `clean_mode`允許您在恢復之前確保目標資料庫是乾淨的。

| Value<br>價值 | Behaviour<br>行為 | Use case<br>用例 |
| --- | --- | --- |
| `none` | No pre-clean and no `--clean`.<br>無需預先清理，也無需`--clean` 。 | Restore into a known-empty database. Fastest, least destructive.<br>恢復到已知為空的資料庫。速度最快，破壞性最小。 |
| `clean` | Current behaviour: `pg_restore --clean --if-exists`. **Default.**<br>當前行為： `pg_restore --clean --if-exists` 。 **預設設定。** | Existing setups. Not a full reset (see above).<br>現有設定。並非完全重置（見上文）。 |
| `drop_schemas` | Drops every non-system schema `CASCADE`, then restores.<br>刪除所有非系統模式`CASCADE` ，然後恢復。 | **Recommended for new setups.** Works on managed Postgres (RDS, Cloud SQL, Neon, Supabase) where the role cannot drop the database.<br>**推薦用於新部署。** 適用於託管 Postgres（ RDS 、Cloud SQL 、Neon、Supabase），這些角色無法刪除資料庫。 |
| `drop_database` | `DROP DATABASE` + `CREATE DATABASE` preserving encoding, collation and owner, then restores.<br>`DROP DATABASE` + `CREATE DATABASE`保留編碼、排序規則和所有者，然後恢復。 | Full reset on self-hosted Postgres where the role has `CREATEDB` + ownership, or is superuser.<br>將自架的 Postgres 完全重置，前提是角色擁有`CREATEDB`以上所有權，或為超級使用者。 |

If the value is absent or unrecognized, the agent falls back to `clean`. `drop_database` is never applied by default.

如果該值不存在或無法識別，代理程式將回退到`clean`. `drop_database`預設情況下永遠不會套用。

`drop_schemas` and `drop_database` are **destructive and have no rollback**. If the agent stops between the drop and the restore, the target is left empty or gone. `drop_database` additionally requires that the connecting role is the database owner **and** holds `CREATEDB`, or is a superuser, otherwise the restore fails a preflight check before anything is dropped. Prefer `drop_schemas` on managed providers where you cannot drop the database.

`drop_schemas` 和 `drop_database` 具有**破壞性且沒有回滾**。如果代理在刪除和復原之間停止，則目標會留空或消失。 `drop_database`還要求連接角色是資料庫所有者**並且**擁有`CREATEDB`，或者是超級用戶，否則在刪除任何內容之前恢復將無法通過預檢檢查。在無法刪除資料庫的託管提供者上首選 `drop_schemas`。

`drop_schemas` is schema-scoped: it does not remove database- or cluster-scoped objects (event triggers, publications/subscriptions, database-level settings, roles, tablespaces). Extensions installed into a dropped schema are recreated on restore only if the restoring role has permission (superuser-only extensions such as `pg_stat_statements` are not). For a fully pristine target including global objects, use `drop_database`.

`drop_schemas`作用域限定於模式：它不會移除資料庫或叢集範圍的物件（事件觸發器、發布/訂閱、資料庫層級設定、角色、表空間）。已刪除模式中安裝的擴充功能僅在恢復時，且恢復角色擁有相應權限的情況下才會重新建立（僅限超級使用者使用的擴充程序，例如`pg_stat_statements`則不會）。若要獲得包含全域物件在內的完全原始目標，請使用`drop_database` 。

```json title="databases.json (drop and recreate before restore)"
{
  "name": "Database - PostgreSQL",
  "type": "postgresql",
  "host": "postgres",
  "port": 5432,
  "username": "postgres",
  "password": "mysecretpassword",
  "database": "app_db",
  "generated_id": "...",
  "options": {
    "clean_mode": "drop_database"
  }
}
```

**[Cluster Backup (`pg_dumpall`)](#p-078)｜[叢集備份 ( `pg_dumpall` )](#p-078)**

Use the cluster mode when you need to back up the **entire instance**: all databases together with global objects such as roles, ownership and grants. This is the recommended choice when advanced roles and ownership are configured at the database cluster level, since a single `pg_dump` does not capture cluster-wide global objects.

當您需要備份**整個實例**時，請使用叢集模式：備份所有資料庫以及角色、所有權和授權等全域物件。如果在資料庫叢集層級配置了進階角色和所有權，則建議選擇此模式，因為單一`pg_dump`無法擷取叢集範圍內的全域物件。

User specified in the configuration must be a superadmin for `pg_dumpall` to dump all databases and global objects.

配置中指定的使用者必須是`pg_dumpall`的超級管理員才能匯出所有資料庫和全域物件。

**Via CLI (Recommended)**

**經由CLI （推薦）**

When running `portabase agent db add`, select `postgresql-cluster` as the database type.

運行`portabase agent db add`時，選擇`postgresql-cluster`作為資料庫類型。

**Specific parameters asked:**

**具體要求：**

-   **Database Name**: The exact name of the database to backup (e.g., `app_db`). Unlike other engines, you must target a specific database.  
    **資料庫名稱**：要備份的資料庫的確切名稱（例如， `app_db` ）。與其他引擎不同，您必須指定一個特定的資料庫。

**Via Docker Compose**

**透過 Docker Compose**

Cluster backups can be significantly larger and slower than single-database backups, since every database in the instance is included. Restoring a `pg_dumpall` output recreates roles and ownership globally.

叢集備份比單一資料庫備份大得多，速度也慢得多，因為實例中的每個資料庫都會備份。恢復`pg_dumpall`輸出會全域重新建立角色和所有權。

**[Docker Compose Example](#p-078)｜[Docker Compose 範例](#p-078)**

Here is how to configure a PostgreSQL service alongside the agent.

以下是如何在代理程式旁邊設定 PostgreSQL 服務的方法。

```yaml title="docker-compose.yml"
services:
  postgres:
    image: postgres:15-alpine
    container_name: my-postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: mysecretpassword
      POSTGRES_DB: app_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - portabase

  agent:
    image: portabase/agent:latest
    # ... agent configuration ...
    depends_on:
      - postgres
    networks:
      - portabase

networks:
  portabase:
    external: true

volumes:
  postgres_data:
```

Note that in this example, the host (`host`) to enter in the agent configuration will be `postgres` (the service name), not `localhost`.

請注意，在本例中，要在代理配置中輸入的主機（ `host` ）將是`postgres` （服務名稱），而不是`localhost` 。

Last updated on

最後更新於

[

Supported Databases

支援的資料庫

List and configuration of databases managed by the agent.

代理管理的資料庫清單和配置。

](https://portabase.io/docs/agent/db)[

MySQL

Configuration for MySQL.

MySQL配置。

](https://portabase.io/docs/agent/db/mysql)

---

<a id="p-079"></a>

###### MySQL

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/mysql>

Portabase AgentDatabases


Configuration for MySQL.

MySQL配置。

The agent will use `mysqldump` to perform backups and restore backups.

代理將使用`mysqldump`執行備份和還原備份。

**[Configuration](#p-079)｜[配置](#p-079)**

**Via CLI (Recommended)**

**經由CLI （推薦）**

When running `portabase agent db add`, select `mysql`.

運行`portabase agent db add`時，選擇`mysql` 。

**Specific parameters asked:**

**具體要求：**

-   **Database Name**: The name of the database to backup.  
    **資料庫名稱**：要備份的資料庫的名稱。

**Via Docker Compose**

**透過 Docker Compose**

**[Docker Compose Example](#p-079)｜[Docker Compose 範例](#p-079)**

Example with a MySQL image.

以 MySQL 鏡像為例。

```yaml title="docker-compose.yml"
services:
  db-mysql:
    container_name: db-mysql
    image: mysql:9.5
    ports:
      - "3312:3306"
    environment:
      - MYSQL_DATABASE=mysqldb
      - MYSQL_USER=mysqldb
      - MYSQL_PASSWORD=changeme
      - MYSQL_RANDOM_ROOT_PASSWORD=yes
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - portabase

  agent:
    image: portabase/agent:latest
    # ... agent configuration ...
    depends_on:
      - db-mysql
    networks:
      - portabase

networks:
  portabase:
    external: true

volumes:
  mysql-data:
```

If you use `localhost` as the host (because the agent is on the host machine and not in Docker, or via `host-gateway`), ensure your database is listening on all interfaces (`0.0.0.0`) or is accessible from the agent.

如果您使用`localhost`作為主機（因為代理位於主機上，而不是在 Docker 中，或透過`host-gateway` ），請確保您的資料庫正在監聽所有介面 ( `0.0.0.0` )，或可以從代理存取。

Last updated on

最後更新於

[

PostgreSQL

Specific configuration for PostgreSQL.

PostgreSQL 的特定配置。

](https://portabase.io/docs/agent/db/postgresql)[

MariaDB

Configuration for MariaDB.

MariaDB 配置。

](https://portabase.io/docs/agent/db/mariadb)

---

<a id="p-080"></a>

###### MariaDB

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/mariadb>

Portabase AgentDatabases


Configuration for MariaDB.

MariaDB 配置。

The agent will use `mariadb-dump` to perform backups and restore backups.

代理將使用`mariadb-dump`執行備份和還原備份。

**[Configuration](#p-080)｜[配置](#p-080)**

**Via CLI (Recommended)**

**經由CLI （推薦）**

When running `portabase agent db add`, select `mariadb` as the database type.

運行`portabase agent db add`時，選擇`mariadb`作為資料庫類型。

**Via Docker Compose**

**透過 Docker Compose**

**[Docker Compose Example](#p-080)｜[Docker Compose 範例](#p-080)**

Example with a MariaDB image.

以 MariaDB 鏡像為例。

```yaml title="docker-compose.yml"
services:
  db-mariadb:
    container_name: db-mariadb
    image: mariadb:latest
    ports:
      - "3311:3306"
    environment:
      - MYSQL_DATABASE=mariadb
      - MYSQL_USER=mariadb
      - MYSQL_PASSWORD=changeme
      - MYSQL_RANDOM_ROOT_PASSWORD=yes
    volumes:
      - mariadb-data:/var/lib/mysql
    networks:
      - portabase

  agent:
    image: portabase/agent:latest
    # ... agent configuration ...
    depends_on:
      - db-mariadb
    networks:
      - portabase

networks:
  portabase:
    external: true

volumes:
  mariadb-data:
```

If you use `localhost` as the host (because the agent is on the host machine and not in Docker, or via `host-gateway`), ensure your database is listening on all interfaces (`0.0.0.0`) or is accessible from the agent.

如果您使用`localhost`作為主機（因為代理位於主機上，而不是在 Docker 中，或透過`host-gateway` ），請確保您的資料庫正在監聽所有介面 ( `0.0.0.0` )，或可以從代理存取。

Last updated on

最後更新於

[

MySQL

Configuration for MySQL.

MySQL配置。

](https://portabase.io/docs/agent/db/mysql)[

MongoDB

Configuration for MongoDB.

MongoDB配置。

](https://portabase.io/docs/agent/db/mongodb)

---

<a id="p-081"></a>

###### MongoDB

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/mongodb>

Portabase AgentDatabases


Configuration for MongoDB.

MongoDB配置。

The agent will use `mongodump` to perform backups and `mongorestore` to restore backups.

代理程式將使用`mongodump`執行備份，並使用`mongorestore`恢復備份。

**[Configuration](#p-081)｜[配置](#p-081)**

**Via CLI (Recommended)**

**經由CLI （推薦）**

When running `portabase agent db add`, select `mongodb` as the database type.

運行`portabase agent db add`時，選擇`mongodb`作為資料庫類型。

**Via Docker Compose**

**透過 Docker Compose**

**[MongoDB Atlas / Cloud (SRV)](#p-081)｜[MongoDB Atlas / Cloud ( SRV )](#p-081)**

Managed MongoDB clusters (MongoDB Atlas and equivalents) are reached through a DNS `SRV` record instead of a fixed host and port. The connection string uses the `mongodb+srv://` scheme.

託管的 MongoDB 叢集（MongoDB Atlas 及同類產品）透過DNS `SRV`記錄而非固定的主機和連接埠進行連線。連接字串使用`mongodb+srv://`方案。

To use an SRV connection, **omit the `port` field** (or set it to `0`). The agent detects this and automatically switches to `mongodb+srv://`. Use the cluster hostname (ending in `.mongodb.net`) as the `host`.

若要使用SRV連接，**請省略`port`字段**（或將其設為`0` ）。代理程式會偵測到這一點並自動切換到`mongodb+srv://` 。使用叢集主機名稱（以`.mongodb.net`結尾）作為`host` 。

Via CLI: run `portabase agent db add`, choose `mongodb`, then set the port to `0` (`--port 0`) to enable the SRV connection.

透過CLI ：運行`portabase agent db add` ，選擇`mongodb` ，然後將連接埠設定為`0` ( `--port 0` ) 以啟用SRV連接。

```json title="databases.json"
{
  "name": "MongoDB Cluster Cloud",
  "database": "mydb",
  "type": "mongodb",
  "username": "username",
  "password": "password",
  "host": "cluster0.abcde.mongodb.net",
  "generated_id": "..."
}
```

Generate UUID for your configuration

為您的配置產生UUID

`Generating...`

No `port` is set for SRV connections. When `port` is absent (or `0`), the agent builds a `mongodb+srv://user:password@host/database?authSource=admin` URI. With authentication, the credentials are URL-encoded automatically and `authSource=admin` is appended. Without a username and password, the URI is built without credentials or query string.

對於SRV連接，未設定`port` 。當`port`缺失（或`0` ）時，代理程式會建構`mongodb+srv://user:password@host/database?authSource=admin` URI 。如果已進行身份驗證，則憑證會自動進行URL編碼，並附加`authSource=admin` 。如果沒有使用者名稱和密碼，則建構URI時不包含憑證或查詢字串。

**[Options](#p-081)｜[選項](#p-081)**

The following optional fields can be set under an `options` key in the database configuration. They map to standard MongoDB connection-string query parameters.

以下選用欄位可在資料庫配置中的`options`鍵下設定。它們對應於標準的 MongoDB 連接字串查詢參數。

| Option<br>選項 | Type<br>類型 | Default<br>預設值 | Description<br>說明 |
| --- | --- | --- | --- |
| `auth_source` | `string` | `admin` (when credentials are set)<br>`admin` （設定憑證時） | The authentication database. Sets `authSource` on the URI. Override when your user is defined in a database other than `admin`.<br>驗證資料庫。在URI上設定`authSource` 。如果您的使用者定義在`admin`以外的資料庫中，則覆寫此設定。 |
| `replica_set` | `string` | — | Replica set name. Sets `replicaSet` on the URI. Required when connecting to a self-hosted replica set.<br>副本集名稱。在URI上設定`replicaSet` 。連接至自架副本集時為必填項。 |
| `tls` | `boolean` | `false` | When `true`, appends `tls=true` to the URI to force a TLS connection.<br>當`true`時，將`tls=true`附加到URI以強制建立TLS連接。 |

```json title="databases.json (with options)"
{
  "name": "Database - MongoDB",
  "type": "mongodb",
  "host": "db-mongodb",
  "port": 27017,
  "username": "username",
  "password": "password",
  "database": "app_db",
  "generated_id": "...",
  "options": {
    "auth_source": "admin",
    "replica_set": "rs0",
    "tls": true
  }
}
```

When credentials are set and `auth_source` is omitted, the agent defaults `authSource` to `admin` (unchanged behaviour). Values are URL-encoded automatically.

當設定憑證且省略`auth_source`時，代理程式預設將`authSource`設定為`admin` （行為不變）。值會自動進行URL編碼。

**[Replica Set (multiple hosts)](#p-081)｜[副本集（多主機）](#p-081)**

To connect to a self-hosted replica set, put a **comma-separated host list** in the `host` field and **omit `port`** (each host carries its own port). Set the `replica_set` option to the replica set name.

若要連接至自架副本集，請將**逗號分隔的主機清單**放入`host`欄位中並**省略`port`**（每個主機都有自己的連接埠）。將 `replica_set` 選項設定為副本集名稱。

```json title="databases.json (replica set)"
{
  "name": "Database - MongoDB Replica Set",
  "type": "mongodb",
  "host": "mongodb0.example.internal:27017,mongodb1.example.internal:27017,mongodb2.example.internal:27017",
  "username": "myDatabaseUser",
  "password": "myPassword",
  "database": "myDB",
  "generated_id": "...",
  "options": {
    "replica_set": "myRepl"
  }
}
```

This builds `mongodb://myDatabaseUser:myPassword@mongodb0.example.internal:27017,mongodb1.example.internal:27017,mongodb2.example.internal:27017/myDB?authSource=admin&replicaSet=myRepl`.

這將建造`mongodb://myDatabaseUser:myPassword@mongodb0.example.internal:27017,mongodb1.example.internal:27017,mongodb2.example.internal:27017/myDB?authSource=admin&replicaSet=myRepl` 。

A comma in `host` marks a replica-set host list: the agent uses it verbatim (never SRV) and does not append a single `port`. Ports go inside the host list. If you omit ports in the list (`host1,host2,host3`), the MongoDB driver defaults each to `27017`.

`host`中的逗號表示副本集主機清單：代理程式會原樣使用該清單（絕不使用SRV ），且不會附加任何`port` 。連接埠號碼應放在主機清單內。如果清單中省略連接埠號碼（ `host1,host2,host3` ），MongoDB 驅動程式會將每個連接埠號碼預設為`27017` 。

An **empty `port`** means different things depending on the host: a comma list is a replica set, a single `.mongodb.net` host is SRV (`mongodb+srv://`), and a single regular host **requires** a port. In the dashboard form, leave Port empty **only** for a replica-set list or an SRV cluster.

**空的`port`**意味著不同的東西，取決於主機：逗號列表是副本集，單個`.mongodb.net`主機是SRV（`mongodb+srv://`），單個常規主機**需要**一個端口。在儀表板表單中，**僅**對於副本集清單或SRV叢集將連接埠留空。

**[Docker Compose Example](#p-081)｜[Docker Compose 範例](#p-081)**

Example with a MongoDB image.

以 MongoDB 鏡像為例。

```yaml title="docker-compose.yml"
services:
    db-mongodb-auth:
        container_name: db-mongodb-auth
        image: mongo:latest
        ports:
          - "27082:27017"
        environment:
          MONGO_INITDB_ROOT_USERNAME: root
          MONGO_INITDB_ROOT_PASSWORD: rootpassword
          MONGO_INITDB_DATABASE: testdbauth
        command: mongod --auth
        networks:
          - portabase
        volumes:
          - mongodb-data-auth:/data/db
        healthcheck:
          test: [ "CMD", "mongosh", "--eval", "db.adminCommand('ping')" ]
          interval: 5s
          timeout: 5s
          retries: 10

    db-mongodb:
        container_name: db-mongodb
        image: mongo:latest
        ports:
          - "27083:27017"
        volumes:
          - mongodb-data:/data/db
        healthcheck:
          test: [ "CMD", "mongosh", "--eval", "db.adminCommand('ping')" ]
          interval: 5s
          timeout: 5s
          retries: 10
        environment:
          MONGO_INITDB_DATABASE: testdb
        networks:
          - portabase

    agent:
        image: portabase/agent:latest
        # ... agent configuration ...
        depends_on:
          - db-mongodb
          - db-mongodb-auth
        networks:
          - portabase

networks:
  portabase:
    external: true

volumes:
  mongodb-data:
  mongodb-data-auth:
```

If you use `localhost` as the host (because the agent is on the host machine and not in Docker, or via `host-gateway`), ensure your database is listening on all interfaces (`0.0.0.0`) or is accessible from the agent.

如果您使用`localhost`作為主機（因為代理位於主機上，而不是在 Docker 中，或透過`host-gateway` ），請確保您的資料庫正在監聽所有介面 ( `0.0.0.0` ) 或可從代理存取。

Last updated on

最後更新於

[

MariaDB

Configuration for MariaDB.

MariaDB 配置。

](https://portabase.io/docs/agent/db/mariadb)[

SQLite

Configuration for SQLite.

SQLite配置。

](https://portabase.io/docs/agent/db/sqlite)

---

<a id="p-082"></a>

###### SQLite

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/sqlite>

Portabase AgentDatabases


Configuration for SQLite.

SQLite配置。

**[Configuration](#p-082)｜[配置](#p-082)**

**Via CLI (Recommended)**

**經由CLI （推薦）**

When running `portabase agent db add`, select `sqlite` as the database type.

運行`portabase agent db add`時，選擇`sqlite`作為資料庫類型。

**Via Docker Compose**

**透過 Docker Compose**

**[Docker Compose Example](#p-082)｜[Docker Compose 範例](#p-082)**

Example with a SQLite image.

SQLite鏡像範例。

```yaml title="docker-compose.yml"
services:

    sqlite:
      container_name: db-sqlite
      image: keinos/sqlite3
      volumes:
        - sqlite-data:/workspace/data
      working_dir: /workspace
      command: tail -f /dev/null
      stdin_open: true
      tty: true

    agent:
        image: portabase/agent:latest
        volumes:
          - ./databases.json:/config/config.json
        # Map data sqlite folder in order to access it then in agent container
          - sqlite-data:/sqlite-data/workspace/data
        # ... agent configuration ...
        networks:
          - portabase

networks:
  portabase:
    external: true

volumes:
  sqlite-data:
```

If you use a local SQLite database, you only have to map it in agent volumes `/var/lib/myapp:/sqlite-data/workspace/data`

如果您使用本機 SQLite 資料庫，則只需在代理程式磁碟區中對其進行對應`/var/lib/myapp:/sqlite-data/workspace/data`

Last updated on

最後更新於

[

MongoDB

Configuration for MongoDB.

MongoDB配置。

](https://portabase.io/docs/agent/db/mongodb)[

Redis

Configuration for Redis.

Redis配置。

](https://portabase.io/docs/agent/db/redis)

---

<a id="p-083"></a>

###### Redis

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/redis>

Portabase AgentDatabases


Configuration for Redis.

Redis配置。

The agent will use `redis-cli` to perform backups.

代理將使用`redis-cli`執行備份。

**[Configuration](#p-083)｜[配置](#p-083)**

**Via CLI (Recommended)**

**經由CLI （推薦）**

When running `portabase agent db add`, select `redis` as the database type.

運行`portabase agent db add`時，選擇`redis`作為資料庫類型。

**Via Docker Compose**

**透過 Docker Compose**

**[Docker Compose Example](#p-083)｜[Docker Compose 範例](#p-083)**

```yaml title="docker-compose.yml"
services:

    db-redis:
        image: redis:latest
        container_name: db-redis
        ports:
          - "6379:6379"
        volumes:
          - redis-data:/data
        command: [ "redis-server", "--appendonly", "yes" ]
        networks:
          - portabase

    db-redis-auth:
        image: redis:latest
        container_name: db-redis-auth
        ports:
          - "6380:6379"
        volumes:
          - redis-data-auth:/data
        environment:
          - REDIS_PASSWORD=<your-password>
        command: [ "redis-server", "--requirepass", "<your-password>", "--appendonly", "yes" ]
        networks:
          - portabase

    agent:
        image: portabase/agent:latest
        # ... agent configuration ...
        networks:
          - portabase

networks:
  portabase:
    external: true

volumes:
  redis-data-auth:
  redis-data:
```

**[Important: Localhost and Docker](#p-083)｜[重要提示：本機和 Docker](#p-083)**

If you use localhost as the host (because the agent is on the host machine and not in Docker, or via host-gateway), ensure your database is listening on all interfaces (0.0.0.0) or is accessible from the agent.

如果您使用 localhost 作為主機（因為代理程式位於主機上，而不是在 Docker 中，或透過主機閘道），請確保您的資料庫正在監聽所有介面（ 0.0.0.0 ），或可以從代理程式存取。

Try this: `"host": "host.docker.internal"` (replace host in config.json, toml) or `"host": "db-redis"` (if using Docker Compose).

試試這個： `"host": "host.docker.internal"` （取代 config.json、toml 中的 host）或`"host": "db-redis"` （如果使用 Docker Compose）。

Last updated on

最後更新於

[

SQLite

Configuration for SQLite.

SQLite配置。

](https://portabase.io/docs/agent/db/sqlite)[

Valkey

瓦爾基

Configuration for Valkey.

Valkey 的配置。

](https://portabase.io/docs/agent/db/valkey)

---

<a id="p-084"></a>

###### Valkey｜瓦爾基

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/valkey>

Portabase AgentDatabases


Configuration for Valkey.

Valkey 的配置。

The agent will use `valkey-cli` to perform backups.

代理將使用`valkey-cli`執行備份。

**[Configuration](#p-084)｜[配置](#p-084)**

**Via CLI (Recommended)**

**經由CLI （推薦）**

When running `portabase agent db add`, select `valkey` as the database type.

運行`portabase agent db add`時，選擇`valkey`作為資料庫類型。

**Via Docker Compose**

**透過 Docker Compose**

**[Docker Compose Example](#p-084)｜[Docker Compose 範例](#p-084)**

```yaml title="docker-compose.yml"
services:

    db-valkey:
        image: valkey/valkey
        container_name: db-valkey
        environment:
          - ALLOW_EMPTY_PASSWORD=yes
        ports:
          - '6381:6379'
        volumes:
          - valkey-data:/data
        networks:
          - portabase

    db-valkey-auth:
        image: valkey/valkey
        container_name: db-valkey-auth
        command: >
          --requirepass "supersecurepassword"
        ports:
          - '6382:6379'
        volumes:
          - valkey-data-auth:/data
        networks:
          - portabase

    agent:
        image: portabase/agent:latest
        # ... agent configuration ...
        networks:
          - portabase

networks:
  portabase:
    external: true

volumes:
  valkey-data-auth:
  valkey-data:
```

**[Important: Localhost and Docker](#p-084)｜[重要提示：本機和 Docker](#p-084)**

If you use localhost as the host (because the agent is on the host machine and not in Docker, or via host-gateway), ensure your database is listening on all interfaces (0.0.0.0) or is accessible from the agent.

如果您使用 localhost 作為主機（因為代理程式位於主機上，而不是在 Docker 中，或透過主機閘道），請確保您的資料庫正在監聽所有介面（ 0.0.0.0 ），或可以從代理程式存取。

Try this: `"host": "host.docker.internal"` (replace host in config.json, toml) or `"host": "db-valkey"` (if using Docker Compose).

試試這個： `"host": "host.docker.internal"` （取代 config.json、toml 中的 host）或`"host": "db-valkey"` （如果使用 Docker Compose）。

Last updated on

最後更新於

[

Redis

Configuration for Redis.

Redis配置。

](https://portabase.io/docs/agent/db/redis)[

Firebird

火鳥

Specific configuration for Firebird.

Firebird 的特定配置。

](https://portabase.io/docs/agent/db/firebird)

---

<a id="p-085"></a>

###### Firebird｜火鳥

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/firebird>

Portabase AgentDatabases


Specific configuration for Firebird.

Firebird 的特定配置。

Firebird is fully supported by the Portabase agent. We use native `gbak` and `isql` tools to ensure consistent and reliable backups.

Portabase代理程式完全支援Firebird。我們使用原生`gbak`和`isql`工具來確保備份的一致性和可靠性。

**[Configuration](#p-085)｜[配置](#p-085)**

**Via CLI (Recommended)**

**經由CLI （推薦）**

When running `portabase agent db add`, select `firebird` as the database type.

運行`portabase agent db add`時，選擇`firebird`作為資料庫類型。

**Via Docker Compose**

**透過 Docker Compose**

**[Docker Compose Example](#p-085)｜[Docker Compose 範例](#p-085)**

Here is how to configure a Firebird service alongside the agent.

以下是如何將 Firebird 服務與代理程式一起設定的方法。

```yaml title="docker-compose.yml"
services:
  db-firebird:
    image: firebirdsql/firebird
    container_name: db-firebird
    restart: always
    environment:
      - FIREBIRD_ROOT_PASSWORD=fake_root_password
      - FIREBIRD_USER=alice
      - FIREBIRD_PASSWORD=fake_password
      - FIREBIRD_DATABASE=mirror.fdb
      - FIREBIRD_DATABASE_DEFAULT_CHARSET=UTF8
    volumes:
      - firebird-data:/var/lib/firebird/data
    ports:
      - "3060:3050"
    networks:
      - portabase

  agent:
    image: portabase/agent:latest
    # ... agent configuration ...
    depends_on:
      - db-firebird
    networks:
      - portabase

networks:
  portabase:
    external: true

volumes:
  firebird-data:
```

If you use `localhost` as the host (because the agent is on the host machine and not in Docker, or via `host-gateway`), ensure your database is listening on all interfaces (`0.0.0.0`) or is accessible from the agent.

如果您使用`localhost`作為主機（因為代理位於主機上，而不是在 Docker 中，或透過`host-gateway` ），請確保您的資料庫正在監聽所有介面 ( `0.0.0.0` )，或可以從代理存取。

Last updated on

最後更新於

[

Valkey

瓦爾基

Configuration for Valkey.

Valkey 的配置。

](https://portabase.io/docs/agent/db/valkey)[

MsSQL

Specific configuration for MsSQL.

針對 MsSQL 的特定配置。

](https://portabase.io/docs/agent/db/mssql)

---

<a id="p-086"></a>

###### MsSQL

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/mssql>

Portabase AgentDatabases


Specific configuration for MsSQL.

針對 MsSQL 的特定配置。

MsSQL is fully supported by the Portabase agent. We use native `sqlpackage` tool to ensure consistent and reliable backups and restorations.

Portabase 代理程式完全支援 MsSQL。我們使用原生`sqlpackage`工具來確保備份和復原的一致性和可靠性。

MsSQL has strict password complexity requirements. Your password must be at least 8 characters long and contain characters from three of the following four categories: Latin uppercase letters, Latin lowercase letters, digits (0 through 9), and non-alphanumeric characters (e.g., !, $, #, %). Failure to meet these requirements will cause the container to crash.

MsSQL 對密碼複雜度有嚴格的要求。您的密碼長度必須至少為 8 個字符，並且必須包含以下四類字符中的至少三類：拉丁字母大寫、拉丁字母小寫、數字（0 到 9）以及非字母數字字符（例如，!、$、#、%）。不符合這些要求將導致容器崩潰。

**[Configuration](#p-086)｜[配置](#p-086)**

**Via CLI (Recommended)**

**經由CLI （推薦）**

When running `portabase agent db add`, select `mssql` as the database type.

運行`portabase agent db add`時，選擇`mssql`作為資料庫類型。

**Via Docker Compose**

**透過 Docker Compose**

**[Docker Compose Example](#p-086)｜[Docker Compose 範例](#p-086)**

Here is how to configure a MsSQL service alongside the agent.

以下是如何在代理程式旁邊設定 MsSQL 服務的方法。

```yaml title="docker-compose.yml"
services:
  db-mssql:
    container_name: db-mssql
    image: mcr.microsoft.com/azure-sql-edge:latest
    ports:
      - "1433:1433"
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: "Password!Strong1"
    volumes:
      - mssql-data:/var/opt/mssql
    networks:
      - portabase
    healthcheck:
      test: ["CMD-SHELL", "cat /proc/net/tcp6 | grep -q '059901' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 20

  agent:
    image: portabase/agent:latest
    # ... agent configuration ...
    depends_on:
      - db-mssql
    networks:
      - portabase

networks:
  portabase:
    external: true

volumes:
  mssql-data:
```

If you use `localhost` as the host (because the agent is on the host machine and not in Docker, or via `host-gateway`), ensure your database is listening on all interfaces (`0.0.0.0`) or is accessible from the agent.

如果您使用`localhost`作為主機（因為代理位於主機上，而不是在 Docker 中，或透過`host-gateway` ），請確保您的資料庫正在監聽所有介面 ( `0.0.0.0` )，或可以從代理存取。

Last updated on

最後更新於

[

Firebird

火鳥

Specific configuration for Firebird.

Firebird 的特定配置。

](https://portabase.io/docs/agent/db/firebird)[

Docker Volume

Docker 卷

Configuration for Docker Volume backups.

Docker 磁碟區備份配置。

](https://portabase.io/docs/agent/db/docker-volume)

---

<a id="p-087"></a>

###### Docker Volume｜Docker 卷

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/docker-volume>

Portabase AgentDatabases


Configuration for Docker Volume backups.

Docker 磁碟區備份配置。

The `docker-volume` type lets the agent back up a Docker named volume directly, without going through a database driver. It is useful for engines with no dedicated dump tool, or for protecting any container's data volume as-is.

`docker-volume` 類型允許代理直接備份 Docker 命名卷，而無需透過資料庫驅動程式。它對於沒有專用轉儲工具的引擎或按原樣保護任何容器的資料卷非常有用。

Backup and restore are performed **on the fly, hot**, without stopping the target container.

備份和還原是即時、熱執行的，無需停止目標容器。

This provider requires the agent to have access to the Docker socket. You must mount `/var/run/docker.sock:/var/run/docker.sock` on the agent container, otherwise it cannot inspect or archive the volume.

此提供者要求代理程式能夠存取 Docker 套接字。您必須在代理容器上安裝`/var/run/docker.sock:/var/run/docker.sock`，否則它無法檢查或歸檔該磁碟區。

**[Configuration](#p-087)｜[配置](#p-087)**

**Via CLI (Recommended)**

**建議使用CLI**

When running `portabase agent db add`, select `docker-volume` as the database type.

運行`portabase agent db add`時，選擇`docker-volume`作為資料庫類型。

**Specific parameters asked:**

**具體要求：**

-   **Volume Name**: The exact name of the Docker volume to back up (e.g., `databases_sqlite-data`).  
    **磁碟區名稱**：要備份的 Docker 磁碟區的確切名稱（例如，`databases_sqlite-data`）。
-   **Container Name**: (Optional, but recommended) The name of the container currently using the volume. Provide it so the agent can automatically restart that container after a restore.  
    **容器名稱**：（可選，但建議）目前使用該磁碟區的容器的名稱。提供它以便代理可以在恢復後自動重新啟動該容器。

**Via Docker Compose**

**透過 Docker Compose**

**[Docker Compose Example](#p-087)｜[Docker 撰寫範例](#p-087)**

The agent needs access to the Docker socket to inspect and archive volumes. Mount it alongside your regular agent configuration.

代理程式需要存取 Docker 套接字來檢查和歸檔磁碟區。將其與常規代理配置一起安裝。

```yaml title="docker-compose.yml"
services:
  agent:
    image: portabase/agent:latest
    volumes:
      - ./databases.json:/config/config.json
      # Required: gives the agent access to the Docker daemon
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      TZ: "Europe/Paris"
      EDGE_KEY: "..."
    networks:
      - portabase

networks:
  portabase:
    name: portabase_network
    external: true
```

Without the Docker socket mounted, the agent cannot resolve or archive the volume and the backup job will fail.

如果沒有安裝 Docker 套接字，代理程式將無法解析或存檔卷，且備份作業將失敗。

**[Temporary storage and disk space](#p-087)｜[暫存與磁碟空間](#p-087)**

During a `docker-volume` backup, the agent builds the backup archive in a **temporary directory** inside the agent container, using the system temp location, `/tmp` by default.

在 `docker-volume` 備份期間，代理程式會使用系統暫存位置（預設為 `/tmp`）在代理容器內的 **暫存目錄** 中建立備份檔案。

If `/tmp` sits on a cramped root filesystem, backing up a large volume fails with:

如果 `/tmp` 位於狹窄的根檔案系統上，則備份大磁碟區會失敗並顯示：

```
No space left on device
```

The temporary archive needs roughly the size of the volume being backed up. A 20 GB volume needs about 20 GB free at the temp location, not just at the destination.

臨時存檔大約需要備份磁碟區的大小。 20 GB 卷在臨時位置需要大約 20 GB 空閒，而不僅僅是在目的地。

**[Redirect the temp directory](#p-087)｜[重定向暫存目錄](#p-087)**

The agent honors the standard `TMPDIR` environment variable. Point it at a directory backed by a bigger disk, and mount host storage there:

此代理遵循標準 `TMPDIR` 環境變數。將其指向由更大磁碟支援的目錄，並在那裡掛載主機儲存：

```yaml title="docker-compose.yml"
services:
  agent:
    image: portabase/agent:latest
    volumes:
      - ./databases.json:/config/config.json
      - /var/run/docker.sock:/var/run/docker.sock
      # Host dir with enough free space
      - /mnt/bigdisk:/scratch
    environment:
      TZ: "Europe/Paris"
      EDGE_KEY: "..."
      # Tell the agent to build temp archives here instead of /tmp
      TMPDIR: /scratch
```

Use a host path (`/mnt/bigdisk`) with more free space than the backup size. The temp archive is built there instead of the cramped root filesystem.

使用可用空間大於備份大小的主機路徑 (`/mnt/bigdisk`)。臨時存檔是在那裡建構的，而不是狹窄的根檔案系統。

The temp archive is deleted automatically once the backup finishes. The same applies to **restores**: they unpack into the same temp location, so `TMPDIR` must point at a disk large enough for them too.

備份完成後，臨時存檔將自動刪除。這同樣適用於 **恢復**：它們解壓到相同的臨時位置，因此 `TMPDIR` 也必須指向足夠大的磁碟。

Last updated on

最後更新於

[

MsSQL

Specific configuration for MsSQL.

針對 MsSQL 的特定配置。

](https://portabase.io/docs/agent/db/mssql)[

Introduction

介紹

The Portabase command-line tool — install and manage agents and dashboards without touching Docker Compose.

Portabase 命令列工具 — 安裝和管理代理程式和儀表板，無需接觸 Docker Compose。

](https://portabase.io/docs/cli)

---

<a id="c-29"></a>

#### CLI｜命令列介面

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-30"></a>

##### Introduction｜介紹

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-088"></a>

> 來源：<https://portabase.io/docs/cli>

CLI


The Portabase command-line tool — install and manage agents and dashboards without touching Docker Compose.

Portabase 命令列工具－無需接觸 Docker Compose 即可安裝和管理代理程式和儀表板。

The **Portabase CLI** is a wrapper on top of Docker Compose. It:

**Portabase CLI** 是 Docker Compose 之上的包裝器。它：

1.  **Generates** valid and secure configurations for agents and dashboards.  
    **產生** 代理程式和儀表板的有效且安全的配置。
2.  **Administers** an agent's databases and a dashboard's settings and login providers — no hand-editing of `.env`, JSON or YAML.  
    **管理**代理的資料庫和儀表板的設定和登入提供者－無需手動編輯`.env`, JSON或YAML 。
3.  **Manages** the container lifecycle (start / stop / restart / logs / uninstall).  
    **管理**容器生命週期（啟動/停止/重新啟動/日誌/卸載）。
4.  **Decrypts** encrypted backups offline.  
    **離線解密**加密備份。

###### [Quickstart](#p-088)｜[快速入門](#p-088)

```bash
curl -sL https://portabase.io/install | bash
portabase dashboard create my-dashboard --start
portabase agent create my-agent
portabase agent db add my-agent
portabase start my-agent
```

###### [Where to go](#p-088)｜[去哪裡](#p-088)

[

**Guides｜指南**

Step-by-step: set up a dashboard, an agent, SSO, decrypt a backup.

逐步操作：設定儀表板、代理、 SSO 、解密備份。

](https://portabase.io/docs/cli/guides/dashboard)[

**Commands｜命令**

Every command and option.

所有命令和選項。

](https://portabase.io/docs/cli/commands)[

**Concepts｜概念**

Folders, generated compose, secrets, exit codes.

資料夾、產生的程式碼、金鑰、退出代碼。

](https://portabase.io/docs/cli/concepts)[

**Troubleshooting｜故障排除**

Fix common errors.

修復常見錯誤。

](https://portabase.io/docs/cli/troubleshooting)

Upgrading from CLI **26.08.12 or earlier**? Read the [migration guide](#p-103). Older syntax: [legacy reference](#p-104).

從 CLI **26.08.12 或更早版本** 升級？閱讀[遷移指南](#p-103)。舊語法：[遺留參考](#p-104)。

Last updated on

最後更新於

[

Docker Volume

Docker 卷

Configuration for Docker Volume backups.

Docker 磁碟區備份配置。

](https://portabase.io/docs/agent/db/docker-volume)[

Install the CLI

安裝CLI

Install, check and upgrade the Portabase CLI.

安裝、檢查和升級 Portabase CLI 。

](https://portabase.io/docs/cli/installation)

---

<a id="p-089"></a>

###### Install the CLI｜安裝CLI

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/installation>

CLI


Install, check and upgrade the Portabase CLI.

安裝、檢查和升級 Portabase CLI。

The CLI ships as a single binary for Linux (amd64 / arm64), macOS and Windows.

CLI 作為適用於 Linux (amd64 / arm64)、macOS 和 Windows 的單一二進位提供。

**Requirement:** **Docker** with the **Compose plugin** on the machine where you run the CLI.

**要求：** **Docker**以及運行 CLI 的電腦上的**Compose 插件**。

**[Install](#p-089)｜[安裝](#p-089)**

```bash
curl -sL https://portabase.io/install | bash
```

**[Check the version](#p-089)｜[查看版本](#p-089)**

```
portabase --version
```

This also tells you if a newer release is available.

這也可以告訴您是否有新版本可用。

**[Upgrade](#p-089)｜[升級](#p-089)**

```
portabase update
```

See [`update`](#p-101) for channels and details.

頻道及詳情請見[`update`](#p-101)。

Upgrading from 26.08.12 or earlier?

從 26.08.12 或更早版本升級？

Commands were renamed. Read the [migration guide](#p-103) before upgrading.

命令被重命名。升級前請閱讀[遷移指南](#p-103)。

`portabase: command not found` after install? See [Troubleshooting](#p-102).

`portabase: command not found`安裝後？請參閱[故障排除](#p-102)。

Last updated on

最後更新於

[

Introduction

介紹

The Portabase command-line tool — install and manage agents and dashboards without touching Docker Compose.

Portabase 命令列工具－無需接觸 Docker Compose 即可安裝和管理代理程式和儀表板。

](https://portabase.io/docs/cli)[

Key concepts

關鍵概念

How the Portabase CLI works — component folders, generated compose, interactive mode, secrets and exit codes.

Portabase CLI 的工作原理 — 元件資料夾、產生的撰寫、互動模式、秘密和退出程式碼。

](https://portabase.io/docs/cli/concepts)

---

<a id="p-090"></a>

###### Key concepts｜關鍵概念

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/concepts>

CLI


How the Portabase CLI works — component folders, generated compose, interactive mode, secrets and exit codes.

Portabase CLI 的工作原理 — 元件資料夾、產生的撰寫、互動模式、秘密和退出程式碼。

**[Component folders](#p-090)｜[組件資料夾](#p-090)**

Every `create` command produces a **folder**. All the other commands take that folder as their first argument (use `.` if you are already inside it).

每個`create`指令都會產生一個**資料夾**。所有其他命令都將該資料夾作為第一個參數（如果您已經在其中，請使用`.`）。

**Agent folder**

**代理資料夾**

```
my-agent/
├── .env                          # EDGE_KEY, TZ, POLLING, LOG_LEVEL, credentials of managed databases…
├── databases.json                # Databases the agent backs up (mounted as /config/config.json)
├── docker-compose.yml            # Generated by the CLI — do not edit
├── docker-compose.override.yml   # Optional — your own customisations (never touched by the CLI)
└── docker-compose.legacy.yml     # Only if you upgraded: backup of the hand-made compose
```

**Dashboard folder**

**儀表板資料夾**

The CLI recognises the kind of folder automatically: a folder with a `databases.json` is an **agent**, a folder whose `.env` contains `PROJECT_SECRET` is a **dashboard**.

CLI自動識別資料夾類型：帶有`databases.json`的資料夾是**代理**，`.env`包含`PROJECT_SECRET`的資料夾是**儀表板**。

**[`docker-compose.yml` is generated](#p-090)｜[生成`docker-compose.yml`](#p-090)**

The source of truth is `.env` (plus `databases.json` for an agent). `docker-compose.yml` is **re-rendered** from it by:

事實來源是`.env`（對於代理加上`databases.json`）。 `docker-compose.yml` 透過以下方式**重新渲染**：

-   `agent create`, `agent set`, `agent unset`, `agent db add`, `agent db remove`
-   `dashboard create`, `dashboard set`, `dashboard unset`, `dashboard auth add`, `dashboard auth remove`
-   `build`

A generated file starts with the header `# Generated by Portabase CLI <version>. Do not edit.`

產生的檔案以標頭 `# Generated by Portabase CLI <version>. Do not edit.` 開頭

Never edit docker-compose.yml by hand

切勿手動編輯 docker-compose.yml

Any change you make directly in `docker-compose.yml` is **lost** the next time one of the commands above runs. Put your customisations (extra labels, networks, resource limits, ports…) in a `docker-compose.override.yml` next to it — Docker Compose merges it automatically, and the CLI never touches it.

您直接在 `docker-compose.yml` 中所做的任何更改都會在下次執行上述命令之一時**丟失**。將您的自訂設定（額外標籤、網路、資源限制、連接埠...）放在旁邊的 `docker-compose.override.yml` 中 — Docker Compose 會自動合併它，而 CLI 永遠不會觸及它。

If the CLI finds a `docker-compose.yml` it did not generate (an installation made with an older CLI, or a hand-written file), it first copies it to `docker-compose.legacy.yml` and warns you. Use `portabase build <PATH> --diff` to preview the change without writing anything.

如果CLI發現它未產生的`docker-compose.yml`（使用較舊的CLI安裝的安裝，或手寫檔案），它首先將其複製到`docker-compose.legacy.yml`並警告您。使用`portabase build <PATH> --diff`預覽更改，無需編寫任何內容。

Values in the compose file are `${VAR}` references resolved from `.env`, so secrets stay in `.env` only (unless you explicitly use `build --inline-env`).

撰寫文件中的值是從 `.env` 解析的 `${VAR}` 引用，因此機密僅保留在 `.env` 中（除非您明確使用 `build --inline-env`）。

**[Interactive and non-interactive modes](#p-090)｜[互動與非互動模式](#p-090)**

By default the CLI asks for anything you did not pass as a flag. It switches to **non-interactive mode** when:

預設情況下，CLI 會詢問您未作為標誌傳遞的任何內容。在以下情況下它會切換到 **非互動模式**：

-   the global `--non-interactive` option is set, **or**  
    全域 `--non-interactive` 選項已設置，**或**
-   the environment variable `PORTABASE_NON_INTERACTIVE` is `1`, `true` or `yes`, **or**  
    環境變數`PORTABASE_NON_INTERACTIVE`是`1`, `true`或`yes`，**或**
-   standard input is not a terminal (CI job, pipe, `ssh host 'portabase …'` without `-t`, cron…).  
    標準輸入不是終端（CI作業、管道、`ssh host 'portabase …'`沒有`-t`、cron…）。

**[Passing secrets safely](#p-090)｜[安全傳遞秘密](#p-090)**

Every secret flag has a `-stdin` twin that reads the value from the first line of standard input, so it never appears in your shell history or in `ps`:

每個秘密標誌都有一個 `-stdin` 雙胞胎，它從標準輸入的第一行讀取值，因此它永遠不會出現在您的 shell 歷史記錄或 `ps` 中：

| Secret<br>秘密 | Visible flag (discouraged)<br>可見標誌（不鼓勵） | Safe flag<br>安全旗 |
| --- | --- | --- |
| Agent Edge Key<br>代理邊緣鍵 | `--key` | `--key-stdin` |
| Password of an existing database<br>現有資料庫的密碼 | `--password` | `--password-stdin` |
| Dashboard custom DB password<br>儀表板自訂DB密碼 | — | `--db-password-stdin` |
| Dashboard initial user password<br>儀表板初始使用者密碼 | `--admin-password` | `--admin-password-stdin` |
| OIDC / OAuth client secret<br>OIDC / OAuth 用戶端金鑰 | `--secret` | `--secret-stdin` |

```
printf '%s\n' "$EDGE_KEY" | portabase agent create my-agent --key-stdin --yes
```

Each `-stdin` flag consumes one line of standard input. Use a single `-stdin` flag per command to avoid mixing up values.

每個`-stdin`標誌消耗一行標準輸入。每個指令使用單一 `-stdin` 標誌以避免混淆值。

**[Non-interactive examples](#p-090)｜[非互動範例](#p-090)**

Complete, prompt-free commands for CI jobs and scripts.

適用於 CI 作業和腳本的完整、無提示指令。

**Agent**

**代理人**

```
printf '%s\n' "$EDGE_KEY" | portabase agent create my-agent \
  --key-stdin --tz Europe/Paris --polling 10 --log-level info \
  --no-host-gateway --yes --start

portabase agent db add my-agent --engine postgresql --mode new
portabase restart my-agent
```

**Dashboard**

**儀表板**

**[Applying changes](#p-090)｜[應用變更](#p-090)**

Commands that change a component (`set`, `unset`, `db add`, `db remove`, `auth add`, `auth remove`) only write files. Apply them with `portabase restart <PATH>`, which also creates any container added since the last start.

更改元件 (`set`, `unset`, `db add`, `db remove`, `auth add`, `auth remove`) 的指令僅寫入檔案。使用 `portabase restart <PATH>` 應用它們，這也會建立自上次啟動以來新增的任何容器。

**[Exit codes](#p-090)｜[退出代碼](#p-090)**

| Code<br>程式碼 | Meaning<br>意義 |
| --- | --- |
| `0` | Success.<br>成功。 |
| `1` | Generic or unexpected error (re-run with `--verbose` to get the traceback).<br>一般或意外錯誤（使用 `--verbose` 重新運行以獲取回溯）。 |
| `2` | Invalid input: unknown command, bad flag, missing value, validation failure.<br>無效輸入：未知指令、錯誤標誌、缺失值、驗證失敗。 |
| `3` | Configuration error: not a Portabase folder, invalid `databases.json`, missing file.<br>設定錯誤：不是 Portabase 資料夾、無效 `databases.json`、遺失檔案。 |
| `4` | Docker error: Docker missing, daemon not running, `docker compose` failed.<br>Docker 錯誤：Docker 遺失，守護程式未運行，`docker compose` 失敗。 |
| `5` | Template error (broken build or wrong `PORTABASE_TEMPLATES_DIR`).<br>模板錯誤（建置損壞或錯誤`PORTABASE_TEMPLATES_DIR`）。 |
| `6` | Network error.<br>網路錯誤。 |
| `7` | Update error (download, checksum, installation).<br>更新錯誤（下載、校驗、、安裝）。 |
| `130` | Canceled by the user (answered "no", `Ctrl+C`, or a refused confirmation).<br>被用戶取消（回答“否”，`Ctrl+C`，或拒絕確認）。 |

Last updated on

最後更新於

[

Install the CLI

安裝CLI

Install, check and upgrade the Portabase CLI.

安裝、檢查並升級 Portabase CLI。

](https://portabase.io/docs/cli/installation)[

Set up an agent

設立代理

Create an agent, add a database and connect it to your dashboard.

建立代理，新增資料庫並將其連接到您的儀表板。

](https://portabase.io/docs/cli/guides/agent)

---

<a id="c-31"></a>

###### Guides｜指南

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-091"></a>

###### Set up an agent｜設立代理

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/guides/agent>

CLIGuides

CLI指南


Create an agent, add a database and connect it to your dashboard.

建立代理，新增資料庫並將其連接到您的儀表板。

At the end of this guide, an agent runs next to your database and appears as connected in the dashboard.

在本指南的最後，代理程式將在您的資料庫旁邊運行，並在儀表板中顯示為已連線。

**Prerequisites:** the [CLI installed](#p-089), Docker running, a [dashboard](#p-092) reachable from this server.

**先決條件：** [已安裝CLI](#p-089)，Docker 正在運行，可從此伺服器存取[儀表板](#p-092)。

**[Get an Edge Key](#p-091)｜[取得邊緣鑰匙](#p-091)**

Before starting, go to your **Portabase Dashboard**, create a new Agent and copy its **Edge Key**.

開始之前，請前往 **Portabase 儀表板**，建立一個新代理並複製其**Edge Key**。

**[Create the agent](#p-091)｜[建立代理](#p-091)**

```
portabase agent create my-agent
```

Paste the Edge Key when asked. A `my-agent/` folder is created.

當詢問時貼上邊緣鍵。將會建立一個`my-agent/`資料夾。

The wizard then asks **"Add a database?"** — answer yes to add one now, or continue with the next step.

然後精靈會詢問 **「新增資料庫？」** — 回答「是」立即添加，或繼續下一步。

**[Add a database](#p-091)｜[新增資料庫](#p-091)**

```
portabase agent db add my-agent
```

Pick the engine, then `existing` for your own server or `new` for a test container. Engine-specific notes: [Databases](#p-077).

選擇引擎，然後為您自己的伺服器選擇`existing`，或為測試容器選擇`new`。引擎特定註解：[資料庫](#p-077)。

**[Start the agent](#p-091)｜[啟動代理](#p-091)**

```
portabase start my-agent
```

**[Check the connection](#p-091)｜[檢查連接](#p-091)**

```
portabase logs my-agent
```

The agent shows up as connected in the dashboard. If the logs show "Ping server failed", see [Troubleshooting](#p-102).

代理程式在儀表板中顯示為已連線。如果日誌顯示“Ping 伺服器失敗”，請參閱[故障排除](#p-102)。

**[Next steps](#p-091)｜[後續步驟](#p-091)**

-   [`agent` reference](#p-096) for every option (CA bundle, retries…).  
    [`agent`參考](#p-096)每個選項（CA捆綁，重試...）。
-   [Non-interactive examples](#p-090) to script this setup.  
    [非互動式範例](#p-090) 編寫此設定的腳本。
-   [Getting started](#p-011) to schedule your first backup.  
    [入門](#p-011) 安排您的第一次備份。

Last updated on

最後更新於

[

Key concepts

關鍵概念

How the Portabase CLI works — component folders, generated compose, interactive mode, secrets and exit codes.

Portabase CLI 的工作原理 — 元件資料夾、產生的撰寫、互動模式、秘密和退出程式碼。

](https://portabase.io/docs/cli/concepts)[

Set up a dashboard

設定儀表板

Create, start and open a Portabase dashboard with the CLI.

使用 CLI 建立、啟動並開啟 Portabase 儀表板。

](https://portabase.io/docs/cli/guides/dashboard)

---

<a id="p-092"></a>

###### Set up a dashboard｜設定儀表板

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/guides/dashboard>

CLIGuides

CLI指南


Create, start and open a Portabase dashboard with the CLI.

使用 CLI 建立、啟動並開啟 Portabase 儀表板。

At the end of this guide, a Portabase dashboard runs on your server and you can log in.

在本指南的最後，Portabase 儀表板在您的伺服器上運行，您可以登入。

**Prerequisites:** the [CLI installed](#p-089), Docker running.

**先決條件：** [CLI已安裝](#p-089)，Docker正在運作。

**[Create the dashboard](#p-092)｜[建立儀表板](#p-092)**

```
portabase dashboard create my-dashboard
```

The wizard asks for the web port (**8887** by default), the database (a dedicated PostgreSQL container is recommended) and the timezone. A `my-dashboard/` folder is created.

此精靈會詢問 Web 連接埠（預設為 **8887**）、資料庫（建議使用專用的 PostgreSQL 容器）和時區。將會建立一個`my-dashboard/`資料夾。

**[Start it](#p-092)｜[開始吧](#p-092)**

```
portabase start my-dashboard
```

Skip this step if you passed `--start` at creation.

如果您在創建時通過了`--start`，請跳過此步驟。

**[Open the interface](#p-092)｜[打開介面](#p-092)**

Go to `http://localhost:8887` (or your server's IP) and create the first account.

前往`http://localhost:8887`（或您伺服器的IP）並建立第一個帳戶。

**[Use your domain (optional)](#p-092)｜[使用您的網域名稱（可選）](#p-092)**

```
portabase dashboard set my-dashboard url https://backup.example.com behind_proxy true
portabase restart my-dashboard
```

Put a [reverse proxy](#p-013) in front of it.

前面放一個[反向代理](#p-013)。

**[Next steps](#p-092)｜[後續步驟](#p-092)**

-   [Set up an agent](#p-091) to back up your first database.  
    [設定代理](#p-091) 備份您的第一個資料庫。
-   [Add a login provider](#p-093) for single sign-on.  
    [新增登入提供者](#p-093)用於單一登入。
-   [`dashboard` reference](#p-097) for every option.  
    [`dashboard`參考](#p-097)每個選項。

Last updated on

最後更新於

[

Set up an agent

設立代理

Create an agent, add a database and connect it to your dashboard.

建立代理，新增資料庫並將其連接到您的儀表板。

](https://portabase.io/docs/cli/guides/agent)[

Add a login provider

新增登入提供者

Enable single sign-on (OIDC or OAuth) on a dashboard with the CLI.

使用 CLI 在儀表板上啟用單一登入（OIDC 或 OAuth）。

](https://portabase.io/docs/cli/guides/login-provider)

---

<a id="p-093"></a>

###### Add a login provider｜新增登入提供者

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/guides/login-provider>

CLIGuides

CLI指南


Enable single sign-on (OIDC or OAuth) on a dashboard with the CLI.

使用 CLI 在儀表板上啟用單一登入（OIDC 或 OAuth）。

At the end of this guide, users can log in to your dashboard with your identity provider.

在本指南的最後，使用者可以使用您的身分提供者登入您的儀表板。

**Prerequisites:** a [dashboard](#p-092) served on a public URL (not `localhost`), and a client ID / secret from your provider — see [OIDC setup](#p-015) or [OAuth2 setup](#p-019).

**先决条件：** 在公共 URL（不是 `localhost`）上提供的 [仪表板](#p-092)，以及来自您的提供商的客户端 ID/秘密 — 请参阅 [OIDC 设置](#p-015) 或 [OAuth2 设置](#p-019)。

**[Set the public URL](#p-093)｜[設定公開URL](#p-093)**

```
portabase dashboard set ./my-dashboard url https://backup.example.com
```

**[Add the provider](#p-093)｜[新增提供者](#p-093)**

```
printf '%s\n' "$KEYCLOAK_SECRET" | portabase dashboard auth add ./my-dashboard oidc keycloak \
  --issuer https://sso.example.com/realms/main \
  --client portabase --secret-stdin \
  --title "Company SSO" --scopes "openid profile email" --pkce
```

For OAuth (Google, GitHub…), use `oauth <provider>` and drop `--issuer`.

對於 OAuth（Google、GitHub...），請使用 `oauth <provider>` 並刪除 `--issuer`。

**[Register the callback URL](#p-093)｜[註冊回呼URL](#p-093)**

The CLI prints the callback URL. Add it to your provider's allowed redirect URIs.

CLI 列印回呼URL。將其新增至提供者允許的重定向 URI 中。

**[Restart and test](#p-093)｜[重啟測試](#p-093)**

```
portabase restart ./my-dashboard
```

The login page now shows a **Company SSO** button.

登入頁面現在顯示**公司SSO**按鈕。

**[Next steps](#p-093)｜[後續步驟](#p-093)**

-   [`dashboard auth` reference](#p-097) for every option.  
    [`dashboard auth`參考](#p-097)每個選項。
-   [Auth configuration](#p-014) to map roles or disable password login.  
    [認證設定](#p-014)映射角色或停用密碼登入。

Last updated on

最後更新於

[

Set up a dashboard

設定儀表板

Create, start and open a Portabase dashboard with the CLI.

使用 CLI 建立、啟動並開啟 Portabase 儀表板。

](https://portabase.io/docs/cli/guides/dashboard)[

Decrypt a backup

解密備份

Restore the original archive from an encrypted Portabase backup, offline.

從加密的 Portabase 備份中離線還原原始存檔。

](https://portabase.io/docs/cli/guides/decrypt)

---

<a id="p-094"></a>

###### Decrypt a backup｜解密備份

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/guides/decrypt>

CLIGuides

CLI指南


Restore the original archive from an encrypted Portabase backup, offline.

從加密的 Portabase 備份中離線還原原始存檔。

At the end of this guide, you have the original archive of an encrypted `.enc` backup — no dashboard needed.

在本指南的最後，您將獲得加密的 `.enc` 備份的原始存檔 - 無需儀表板。

**Prerequisites:** the [CLI installed](#p-089), the `.enc` file(s).

**先決條件：** [已安裝CLI](#p-089)、`.enc` 檔案。

**[Download the master key](#p-094)｜[下載主金鑰](#p-094)**

In the dashboard, open **Settings**, **Storage** section, and download the master key. Save it as `master_key.bin`.

在儀表板中，開啟 **設定**、**儲存** 部分，然後下載主金鑰。將其另存為`master_key.bin`。

**[Decrypt one file](#p-094)｜[解密一個檔案](#p-094)**

```
portabase decrypt backup.tar.gz.enc backup.tar.gz --key master_key.bin
```

**[Or a whole folder](#p-094)｜[或整個資料夾](#p-094)**

```
portabase decrypt ./backups ./restored --key master_key.bin
```

Each file is processed independently; a summary lists any failure.

每個文件獨立處理；摘要列出了所有失敗的情況。

**[Next steps](#p-094)｜[後續步驟](#p-094)**

-   [`decrypt` reference](#p-100) for defaults and large backups.  
    [`decrypt`參考](#p-100)用於預設和大型備份。
-   [Folder mode](#p-100) for how failures are reported (wrong key, corrupt file).  
    [資料夾模式](#p-100) 如何報告故障（金鑰錯誤、檔案損壞）。

Last updated on

最後更新於

[

Add a login provider

新增登入提供者

Enable single sign-on (OIDC or OAuth) on a dashboard with the CLI.

使用 CLI 在儀表板上啟用單一登入（OIDC 或 OAuth）。

](https://portabase.io/docs/cli/guides/login-provider)[

Commands

命令

Every Portabase CLI command, global options and environment variables.

每個 Portabase CLI 指令、全域選項和環境變數。

](https://portabase.io/docs/cli/commands)

---

<a id="c-32"></a>

###### Commands｜命令

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-095"></a>

> 來源：<https://portabase.io/docs/cli/commands>

CLICommands

CLI命令


Every Portabase CLI command, global options and environment variables.

每個 Portabase CLI 指令、全域選項和環境變數。

Syntax: `portabase [GLOBAL OPTIONS] COMMAND [ARGS] [OPTIONS]`. Every command accepts `--help`.

文法：`portabase [GLOBAL OPTIONS] COMMAND [ARGS] [OPTIONS]`。每個指令都接受`--help`。

**[Command overview](#p-095)｜[指令概述](#p-095)**

| Command<br>命令 | Description<br>描述 |
| --- | --- |
| [`agent create`](#p-096) | Create a new agent folder.<br>建立一個新的代理資料夾。 |
| [`agent show`](#p-096) | Show an agent's settings and databases.<br>顯示代理的設定與資料庫。 |
| [`agent set` / `agent unset`](#p-096) | Change or reset agent settings.<br>更改或重設代理設定。 |
| [`agent db add`](#p-096) | Add a database (new container or existing server).<br>新增資料庫（新容器或現有伺服器）。 |
| [`agent db list`](#p-096) | List an agent's databases.<br>列出代理人的資料庫。 |
| [`agent db remove`](#p-096) | Remove a database from an agent.<br>從代理程式中刪除資料庫。 |
| [`dashboard create`](#p-097) | Create a new dashboard folder.<br>建立一個新的儀表板資料夾。 |
| [`dashboard show`](#p-097) | Show a dashboard's settings and login providers.<br>顯示儀表板的設定與登入提供者。 |
| [`dashboard set` / `dashboard unset`](#p-097) | Change or reset dashboard settings.<br>更改或重設儀表板設定。 |
| [`dashboard auth add`](#p-097) | Add an OIDC or OAuth login provider.<br>新增 OIDC 或 OAuth 登入提供者。 |
| [`dashboard auth list`](#p-097) | List login providers.<br>列出登入提供者。 |
| [`dashboard auth remove`](#p-097) | Remove a login provider.<br>刪除登入提供者。 |
| [`start` / `stop` / `restart` / `logs` / `uninstall`](#p-098) | Container lifecycle.<br>容器生命週期。 |
| [`build`](#p-099) | Re-render `docker-compose.yml` from the configuration.<br>從配置重新渲染`docker-compose.yml`。 |
| [`decrypt`](#p-100) | Decrypt `.enc` backup files.<br>解密`.enc`備份檔。 |
| [`config`](#p-101) | Global CLI configuration (update channel).<br>全域CLI配置（更新通道）。 |
| [`update`](#p-101) | Update the CLI binary.<br>更新 CLI 二進位。 |

**[Global options](#p-095)｜[全域選項](#p-095)**

These options go **before** the command: `portabase [GLOBAL OPTIONS] COMMAND ...`

這些選項位於命令之前**： `portabase [GLOBAL OPTIONS] COMMAND ...`

| Option<br>選項 | Environment variable<br>環境變數 | Description<br>描述 |
| --- | --- | --- |
| `--version` |  | Print the CLI version, check for a newer release, and exit.<br>列印CLI版本，檢查是否有較新的版本，然後退出。 |
| `--verbose` |  | Show the cause and full traceback of errors.<br>顯示錯誤的原因和完整的回溯。 |
| `--no-color` | `NO_COLOR` | Disable colours (output and help).<br>禁用顏色（輸出與幫助）。 |
| `--non-interactive` | `PORTABASE_NON_INTERACTIVE` | Never prompt; fail on missing input.<br>從不提示；因缺少輸入而失敗。 |
| `--help` |  | Show help. Works on every command and sub-command.<br>顯示幫助。適用於每個命令和子命令。 |

```
portabase --non-interactive --no-color agent db list ./my-agent
```

**[Environment variables](#p-095)｜[環境變數](#p-095)**

| Variable<br>變數 | Description<br>描述 |
| --- | --- |
| `PORTABASE_NON_INTERACTIVE` | `1`, `true` or `yes` forces non-interactive mode.<br>`1`, `true` 或 `yes` 強制非交互模式。 |
| `NO_COLOR` | Any value disables colours.<br>任何值都會停用顏色。 |
| `PORTABASE_TEMPLATES_DIR` | Use compose templates from this folder instead of the ones bundled in the binary (advanced).<br>使用此資料夾中的撰寫模板，而不是二進位檔案中捆綁的模板（進階）。 |

Last updated on

最後更新於

[

Decrypt a backup

解密備份

Restore the original archive from an encrypted Portabase backup, offline.

從加密的 Portabase 備份中離線還原原始存檔。

](https://portabase.io/docs/cli/guides/decrypt)[

agent

代理人

Create and configure an agent and its databases.

建立並配置代理及其資料庫。

](https://portabase.io/docs/cli/commands/agent)

---

<a id="p-096"></a>

###### agent｜代理人

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/commands/agent>

CLICommands

CLI命令


Create and configure an agent and its databases.

建立並配置代理及其資料庫。

The agent is the connector installed next to your databases. It needs an **Edge Key**, created in the Dashboard when you add an agent. New to agents? Follow [Set up an agent](#p-091).

代理是安裝在資料庫旁邊的連接器。它需要一個 **Edge Key**，在您新增代理程式時在儀表板中建立。代理新手？依[設立代理](#p-091)。

**[`agent create`](#p-096)**

Creates the agent folder, generates `.env`, `databases.json` and `docker-compose.yml`, and creates the external Docker network `portabase_network` if needed. In interactive mode it then offers to add databases (**"Add a database?"**).

建立代理資料夾，產生`.env`, `databases.json`和`docker-compose.yml`，並根據需要建立外部Docker網路`portabase_network`。在互動模式下，它會提供新增資料庫（**「新增資料庫？」**）。

```
portabase agent create [OPTIONS] NAME
```

| Option<br>選項 | Description<br>描述 | Default<br>預設 |
| --- | --- | --- |
| `NAME` | Folder to create, e.g. `prod-db-01`. **Required.**<br>要建立的資料夾，例如`prod-db-01`。 **必填。** | — |
| `--key-stdin` | Read the Edge Key from standard input — see [secrets](#p-090).<br>從標準輸入讀取邊緣鍵 - 請參閱[秘密](#p-090)。 | asked<br>問 |
| `--key <str>` | Edge Key from the Dashboard (Base64 or JSON with `serverUrl`, `agentId`, `masterKeyB64`). Prefer `--key-stdin`.<br>儀表板中的邊緣金鑰（Base64 或 JSON 和 `serverUrl`, `agentId`, `masterKeyB64`）。更喜歡`--key-stdin`。 | asked<br>問 |
| `--tz <str>` | Agent timezone (`TZ`).<br>代理時區 (`TZ`)。 | `UTC` |
| `--polling <int>` | Polling frequency in seconds (`POLLING`). Must be ≥ 1. | `5` |

| `--polling <int>` |輪詢頻率（以秒為單位）（`POLLING`）。必須 ≥ 1。 `5` |
| `--log-level <str>` | `debug`, `info`, `warn` or `error` (`LOG_LEVEL`).<br>`debug`, `info`, `warn` 或 `error` (`LOG_LEVEL`)。 | `info` |
| `--host-gateway` / `--no-host-gateway` | Map `localhost` in the agent to the Docker host, to back up a database on the host itself (`extra_hosts: localhost:host-gateway`).<br>將代理程式中的`localhost`對應到Docker主機，以備份主機本身上的資料庫（`extra_hosts: localhost:host-gateway`）。 | `false` |
| `-s, --start` | Start the agent right after creation.<br>建立後立即啟動代理程式。 | `false` |
| `-f, --force` | Overwrite an existing folder without asking.<br>無需詢問即可覆蓋現有資料夾。 | `false` |
| `-y, --yes` | Skip the "Apply this configuration?" confirmation.<br>跳過「套用此配置？」確認。 | `false` |

See [Agent environment variables](#p-076) for the meaning and accepted ranges of each variable.

各變數的意義和可接受的範圍請參閱[Agent 環境變數](#p-076)。

**Example**

**範例**

```
portabase agent create my-agent
```

Non-interactive / CI example: see [Concepts](#p-090).

非互動式/CI範例：參見[概念](#p-090)。

**[`agent show`](#p-096)**

Displays the agent's settings grouped by section (Agent, Network, Storage, Resilience) — secrets are masked — followed by a table of its databases.

顯示按部分（代理、網路、儲存、彈性）分組的代理設定 — 秘密被屏蔽 — 後面是其資料庫表。

```
portabase agent show <AGENT_PATH>
```

**[`agent set` / `agent unset`](#p-096)**

Change one or more settings of an existing agent, then re-render `.env` and `docker-compose.yml`.

變更現有代理程式的一項或多項設置，然後重新渲染 `.env` 和 `docker-compose.yml`。

```
portabase agent set <AGENT_PATH> KEY VALUE [KEY VALUE ...]
portabase agent unset <AGENT_PATH> KEY [KEY ...]
```

`unset` removes the variable from `.env`, so the agent falls back to its own default. **Core** settings are required and cannot be unset (only changed).

`unset` 從 `.env` 中刪除變量，因此代理回退到其自己的預設值。 **核心**設定是必需的，不能取消設定（只能更改）。

| Key<br>關鍵 | Type<br>類型 | Written to<br>寫給 | Core<br>核心 |
| --- | --- | --- | --- |
| `key` | Edge Key (validated, secret)<br>邊緣金鑰（已驗證，秘密） | `EDGE_KEY` | Yes<br>是的 |
| `tz` | text<br>文字 | `TZ` | Yes<br>是的 |
| `polling` | integer ≥ 1<br>整數 ≥ 1 | `POLLING` | Yes<br>是的 |
| `log_level` | `debug` `info` `warn` `error` | `LOG_LEVEL` | Yes<br>是的 |
| `host_gateway` | boolean<br>布爾 | `extra_hosts` in `docker-compose.yml`<br>`extra_hosts` 於 `docker-compose.yml` | Yes<br>是的 |
| `data_path` | text<br>文字 | `DATA_PATH` | No<br>沒有 |
| `tmpdir` | text<br>文字 | `TMPDIR` | No<br>沒有 |
| `retry_attempts` | integer ≥ 1<br>整數 ≥ 1 | `RETRY_ATTEMPTS` | No<br>無 |
| `retry_backoff_ms` | integer ≥ 1<br>整數 ≥ 1 | `RETRY_BACKOFF_MS` | No<br>無 |
| `ca_bundle` | host path (must exist)<br>主機路徑（必須存在） | read-only volume + `SSL_CERT_FILE`<br>唯讀磁碟區 + `SSL_CERT_FILE` | No<br>沒有 |

Booleans accept `true`/`false`, `yes`/`no`, `on`/`off`, `1`/`0`.

布林值接受`true`/`false`, `yes`/`no`, `on`/`off`, `1`/`0`。

```
portabase agent set ./my-agent polling 30 log_level debug
portabase agent set ./my-agent tmpdir /scratch host_gateway true
portabase agent unset ./my-agent tmpdir retry_attempts
portabase restart ./my-agent
```

Apply with `portabase restart <AGENT_PATH>` ([why](#p-090)).

與`portabase restart <AGENT_PATH>`一起申請（[為什麼](#p-090)）。

`agent set <PATH> key <EDGE_KEY>` puts the key in your shell history. To rotate the key without leaving a trace, prefer editing `EDGE_KEY` in `.env` and running `portabase build <PATH>`.

`agent set <PATH> key <EDGE_KEY>` 將金鑰放入您的 shell 歷史記錄中。要旋轉金鑰而不留下痕跡，最好在`.env`中編輯`EDGE_KEY`並運行`portabase build <PATH>`。

**[`agent db add`](#p-096)**

Adds a database to an agent. It either **creates a new database container** in the agent's compose (`--mode new`, handy for tests and local projects) or **registers an existing server** (`--mode existing`).

將資料庫新增至代理程式。它要么在代理的組合中**創建一個新的資料庫容器**（`--mode new`，方便測試和本地專案），要么**註冊現有伺服器**（`--mode existing`）。

```
portabase agent db add [OPTIONS] <AGENT_PATH>
```

| Option<br>選項 | Description<br>說明 | Default<br>預設 |
| --- | --- | --- |
| `-e, --engine <key>` | Database engine (see table below). Applies to all engines.<br>資料庫引擎（請參閱下表）。適用於所有引擎。 | asked<br>問 |
| `--mode <new\|existing>` | `new` = container created by the CLI, `existing` = your own server. Applies to all engines except `docker-volume`.<br>`new` = 由 CLI, `existing` 建立的容器 = 您自己的伺服器。適用於 `docker-volume` 之外的所有引擎。 | `new` |
| `--label <str>` | Display name. Applies to `existing` mode and `docker-volume` (generated automatically in `new` mode).<br>顯示名稱。適用於`existing`模式和`docker-volume`（在`new`模式下自動產生）。 | `External DB` (`Docker Volume` for volumes)<br>`External DB`（`Docker Volume` 對於卷） |
| `--host <str>` | `existing` mode: host or IP. Default `localhost`.<br>`existing` 模式：主機或IP。預設`localhost`。 | `localhost` |
| `--port <int>` | `existing` mode: port.<br>`existing` 模式：連接埠。 | engine's standard port<br>引擎的標準端口 |
| `--database <str>` | `existing` mode: database name (Redis/Valkey: database index).<br>`existing` mode：資料庫名稱（Redis/Valkey：資料庫索引）。 | `0` (Redis/Valkey only)<br>`0`（僅限 Redis/Valkey） |
| `--user <str>` | `existing` mode: username (Redis/Valkey: optional).<br>`existing` mode：使用者名稱（Redis/Valkey：可選）。 | — |
| `--password-stdin` | `existing` mode: read the password from standard input.<br>`existing`模式：從標準輸入讀取密碼。 | — |
| `--password <str>` | `existing` mode: password. Visible in shell history — prefer `--password-stdin`.<br>`existing` 模式：密碼。在 shell 歷史記錄中可見 — 偏好 `--password-stdin`。 | — |

Passing a flag that does not apply to the chosen engine and mode fails with `Option(s) not applicable to …` and lists the valid ones.

傳遞不適用於所選引擎和模式的標誌會失敗，並顯示 `Option(s) not applicable to …` 並列出有效的標誌。

**[Supported engines](#p-096)｜[支援的引擎](#p-096)**

| `--engine` | Modes<br>模式 | Default port<br>預設連接埠 | Notes<br>筆記 |
| --- | --- | --- | --- |
| `postgresql` | `new`, `existing` | `5432` | Supports `-o keep_ownership` and `-o clean_mode`.<br>支持`-o keep_ownership`和`-o clean_mode`。 |
| `postgresql-cluster` | `new`, `existing` | `5432` | Uses `pg_dumpall`: the user **must be a superuser**.<br>使用`pg_dumpall`：使用者**必須是超級使用者**。 |
| `mysql` | `new`, `existing` | `3306` | `new` mode runs a `mariadb:latest` container.<br>`new` 模式運作`mariadb:latest` 容器。 |
| `mariadb` | `new`, `existing` | `3306` |  |
| `sqlite` | `new`, `existing` | — | File mounted into the agent under `/config/`.<br>檔案安裝到代理程式中的`/config/`下。 |
| `firebird` | `new`, `existing` | `3050` |  |
| `mongodb` | `new`, `existing` | `27017` | `--auth/--no-auth` in `new` mode. For SRV (Atlas), use `--port 0`.<br>`--auth/--no-auth` `new` 模式。對於SRV（Atlas），請使用`--port 0`。 |
| `redis` | `new`, `existing` | `6379` | `--auth/--no-auth` in `new` mode. Backup only.<br>`--auth/--no-auth` 處於`new` 模式。僅備份。 |
| `valkey` | `new`, `existing` | `6379` | `--auth/--no-auth` in `new` mode. Backup only.<br>`--auth/--no-auth` 處於`new` 模式。僅備份。 |
| `mssql` | `new`, `existing` | `1433` | `new` mode runs `azure-sql-edge` with the `sa` user.<br>`new` 模式與 `sa` 用戶一起運行 `azure-sql-edge`。 |
| `docker-volume` | — | — | Mounts `/var/run/docker.sock` into the agent automatically.<br>自動將 `/var/run/docker.sock` 安裝到代理程式中。 |

**Example**

**範例**

```
printf '%s\n' "$PG_PASSWORD" | portabase agent db add ./my-agent \
  --engine postgresql --mode existing \
  --label "Production app" --host 10.0.0.12 --port 5432 \
  --database app --user backup --password-stdin \
  -o clean_mode=drop_schemas -o keep_ownership=false
```

Apply with `portabase restart <AGENT_PATH>`.

使用`portabase restart <AGENT_PATH>`申請。

**[`agent db list`](#p-096)**

Displays a table of the agent's databases: display name, database, type, host:port (or file / volume), user, non-default options and the first 8 characters of the ID.

顯示代理資料庫表：顯示名稱、資料庫、類型、主機：連接埠（或檔案/磁碟區）、使用者、非預設選項以及ID的前 8 個字元。

```
portabase agent db list <AGENT_PATH>
```

**[`agent db remove`](#p-096)**

Removes a database from `databases.json`. For a database created with `--mode new`, its service is also removed from `docker-compose.yml` and its variables from `.env`.

從 `databases.json` 中刪除資料庫。對於使用`--mode new`建立的資料庫，其服務也會從`docker-compose.yml`中刪除，其變數也會從`.env`中刪除。

```
portabase agent db remove [OPTIONS] <AGENT_PATH>
```

| Option<br>選項 | Description<br>說明 | Default<br>預設 |
| --- | --- | --- |
| `-i, --id <str>` / `--name <str>` | Database to remove: full ID, ID prefix, or display name. Without it, an interactive menu is shown.<br>要刪除的資料庫：完整的 ID, ID 前綴或顯示名稱。如果沒有它，則會顯示互動式選單。 | — |
| `--purge-volume` | Also delete the Docker volume of a database created by the CLI.<br>同時刪除CLI所建立的資料庫的Docker磁碟區。 | `false` |
| `-y, --yes` | Skip the confirmation.<br>跳過確認。 | `false` |

```
portabase agent db remove ./my-agent --id 3f2a91c4 --yes
portabase agent db remove ./my-agent --name "Production app"
portabase agent db remove ./my-agent --id db-pg --purge-volume --yes
```

Data is kept unless you ask otherwise

除非您另有要求，否則資料將被保留

Without `--purge-volume`, the data volume of a managed container (`<project>_<service>-data`) is **kept**; the CLI prints the `docker volume rm` command to delete it later. With `--purge-volume`, the volume and **all its data** are deleted immediately — this is irreversible.

沒有`--purge-volume`，受管容器（`<project>_<service>-data`）的資料量被**保留**；CLI 列印 `docker volume rm` 指令以便稍後刪除它。使用`--purge-volume`，卷及其**所有資料**將立即刪除 - 這是不可逆轉的。

If a value matches several databases (e.g. a short ID prefix), the command fails and asks you to use the full ID.

如果一個值與多個資料庫相符（例如短的ID前綴），則該命令將失敗並要求您使用完整的ID。

Last updated on

最後更新於

[

Commands

命令

Every Portabase CLI command, global options and environment variables.

每個 Portabase CLI 指令、全域選項和環境變數。

](https://portabase.io/docs/cli/commands)[

dashboard

儀表板

Create and configure a dashboard and its login providers.

建立並配置儀表板及其登入提供者。

](https://portabase.io/docs/cli/commands/dashboard)

---

<a id="p-097"></a>

###### dashboard｜儀表板

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/commands/dashboard>

CLICommands

CLI命令


Create and configure a dashboard and its login providers.

建立並配置儀表板及其登入提供者。

Create and configure a Portabase dashboard. New here? Follow [Set up a dashboard](#p-092).

建立並配置 Portabase 儀表板。新來的？依[設定儀表板](#p-092)。

**[`dashboard create`](#p-097)**

Creates the dashboard folder with `.env` (including a random 64-character `PROJECT_SECRET`) and `docker-compose.yml`.

使用`.env`（包括隨機64個字元`PROJECT_SECRET`）和`docker-compose.yml`建立儀表板資料夾。

```
portabase dashboard create [OPTIONS] NAME
```

| Option<br>選項 | Description<br>說明 | Default<br>預設 |
| --- | --- | --- |
| `NAME` | Folder to create, e.g. `my-dashboard`. **Required.**<br>要建立的資料夾，例如`my-dashboard`。 **必填。** | — |
| `--port <int>` | Web port published on the host (`HOST_PORT`). `PROJECT_URL` becomes `http://localhost:<port>`.<br>主機上發佈的Web連接埠（`HOST_PORT`）。 `PROJECT_URL` 變為`http://localhost:<port>`。 | `8887` |
| `--tz <str>` | Timezone (`TZ`).<br>時區（`TZ`）。 | `Europe/Paris` |
| `--db-mode <mode>` | `external`, `internal` or `custom` (see below).<br>`external`, `internal` 或 `custom`（見下文）。 | `external` |
| `-s, --start` | Start the dashboard right after creation.<br>建立後立即啟動儀表板。 | `false` |
| `-f, --force` | Overwrite an existing folder without asking.<br>無需詢問即可覆蓋現有資料夾。 | `false` |
| `-y, --yes` | Skip the "Apply this configuration?" confirmation.<br>跳過「套用此配置？」確認。 | `false` |

**[Database modes](#p-097)｜[資料庫模式](#p-097)**

| Mode<br>模式 | What you get<br>你得到什麼 |
| --- | --- |
| `external` | **Recommended.** A dedicated `postgres:17-alpine` container (`db`) in the same compose, with random credentials and a random host port (`PG_PORT`).<br>**推薦。** 同一組合中的專用 `postgres:17-alpine` 容器 (`db`)，具有隨機憑證和隨機主機連接埠 (`PG_PORT`)。 |
| `internal` | The database embedded in the Portabase container. No extra service.<br>嵌入在 Portabase 容器中的資料庫。沒有額外的服務。 |
| `custom` | Your own PostgreSQL. `DATABASE_URL` is built from `--db-*` (user and password are URL-encoded).<br>你自己的 PostgreSQL。 `DATABASE_URL`是從`--db-*`建構的（使用者和密碼是URL編碼的）。 |

**Example**

**範例**

```
portabase dashboard create my-dashboard
```

Non-interactive / CI example: see [Concepts](#p-090).

非互動式/CI範例：參見[概念](#p-090)。

**[Setup wizard](#p-097)｜[設定嚮導](#p-097)**

In interactive mode, when **no** settings option was passed, the CLI asks **"Configure API, MCP and authentication now?"** (default: no). Answering yes walks you through:

在互動模式下，當**無**設定選項被傳遞時，CLI詢問**「立即配置API, MCP和身份驗證？」**（預設：否）。回答「是」將引導您完成：

1.  **API & MCP** — REST API, OpenAPI / Swagger UI, MCP server.  
    **API & MCP** — REST API，OpenAPI / Swagger UI, MCP 伺服器。
2.  **Onboarding** — skip the onboarding wizard; if skipped, the initial user's name, email and password.  
    **入職** — 跳過入職精靈；如果跳過，則顯示初始使用者名稱、電子郵件和密碼。
3.  **Authentication** — email/password login, self sign-up, passkeys.  
    **驗證** — 電子郵件/密碼登入、自我註冊、密碼。

Then the CLI shows the **SUMMARY**, asks for confirmation, writes the files and prints how to add single sign-on later.

然後CLI顯示**SUMMARY**，要求確認，寫入檔案並列印稍後如何新增單一登入。

**[`dashboard show`](#p-097)**

Displays the dashboard's settings grouped by section (Network, API & MCP, Onboarding, Authentication) — secrets are masked — and the table of login providers with their callback URL.

顯示按部分（網路、API & MCP、入職、驗證）分組的儀表板設定 — 秘密被封鎖 — 以及登入提供者及其回呼URL 的表。

```
portabase dashboard show <DASHBOARD_PATH>
```

**[`dashboard set` / `dashboard unset`](#p-097)**

Change or reset one or more settings of an existing dashboard, then re-render `.env` and `docker-compose.yml`.

變更或重設現有儀表板的一項或多項設置，然後重新渲染 `.env` 和 `docker-compose.yml`。

```
portabase dashboard set <DASHBOARD_PATH> KEY VALUE [KEY VALUE ...]
portabase dashboard unset <DASHBOARD_PATH> KEY [KEY ...]
```

`unset` removes the variable from `.env`, so the dashboard falls back to its default.

`unset` 從 `.env` 中刪除變量，因此儀表板回退到其預設值。

| Key<br>關鍵 | Type<br>類型 | Environment variable<br>環境變數 | Default<br>預設 |
| --- | --- | --- | --- |
| `url` | `http(s)://host[:port]` | `PROJECT_URL` | `http://localhost:<port>` |
| `behind_proxy` | boolean<br>布爾 | `TUSD_BEHIND_PROXY` | `false` |
| `trusted_domains` | comma-separated list<br>逗號分隔清單 | `TRUSTED_DOMAINS` | — |
| `api` | boolean<br>布爾 | `API_ENABLED` | `false` |
| `openapi` | boolean<br>布爾 | `OPENAPI_ENABLED` | `false` |
| `mcp` | boolean<br>布爾 | `MCP_ENABLED` | `false` |
| `skip_onboarding` | boolean<br>布爾 | `SKIP_ONBOARDING` | `false` |
| `admin_name` | text<br>文字 | `AUTH_DEFAULT_USER_NAME` | — |
| `admin_email` | text<br>文字 | `AUTH_DEFAULT_USER` | — |
| `admin_password` | strong password (secret)<br>強密碼（秘密） | `AUTH_DEFAULT_PASSWORD` | — |
| `password_auth` | boolean<br>布爾 | `AUTH_EMAIL_PASSWORD_ENABLED` | `true` |
| `signup` | boolean<br>布爾 | `AUTH_SIGNUP_ENABLED` | — |
| `passkey` | boolean<br>布爾 | `AUTH_PASSKEY_ENABLED` | — |
| `account_linking` | boolean<br>布爾 | `AUTH_ALLOW_LINKING` | — |
| `account_unlinking` | boolean<br>布爾 | `AUTH_ALLOW_UNLINKING` | — |
| `sync_oidc_roles` | boolean<br>布爾 | `AUTH_SYNC_OIDC_ROLES_ON_LOGIN` | — |
| `role_map` | `remote:portabase,...` | `AUTH_ROLE_MAP` | — |
| `allowed_group` | text<br>文字 | `ALLOWED_GROUP` | — |

See [Dashboard environment variables](#p-012) for details on each variable.

有關每個變數的詳細信息，請參閱[儀表板環境變數](#p-012)。

```
portabase dashboard set ./my-dashboard url https://backup.example.com behind_proxy true
portabase dashboard set ./my-dashboard api true mcp true
portabase dashboard unset ./my-dashboard trusted_domains
portabase restart ./my-dashboard
```

Changing `url` does not change the published port (`HOST_PORT`). Expose the dashboard behind a [reverse proxy](#p-013) and set `behind_proxy true`.

更改 `url` 不會更改已發布的連接埠 (`HOST_PORT`)。暴露[反向代理](#p-013)後面的儀表板並設定`behind_proxy true`。

Safety checks

安全檢查

The CLI refuses to write a configuration that would break your instance:

CLI 拒絕編寫會破壞您的實例的配置：

-   `skip_onboarding true` requires `admin_email` **and** `admin_password`.  
    `skip_onboarding true` 需要`admin_email` **和** `admin_password`。
-   `admin_password` must have at least 8 characters, a lowercase letter, an uppercase letter, a digit and a special character.  
    `admin_password` 必須至少有 8 個字符，一個小寫字母，一個大寫字母，一個數字和一個特殊字符。
-   `password_auth false` is refused while **no** OIDC or OAuth provider is configured (it would lock everyone out).  
    當 **沒有** OIDC 或配置 OAuth 提供者時，`password_auth false` 會被拒絕（這會將所有人拒之門外）。
-   Login providers require a public `url` — `localhost` and `127.0.0.1` are refused, since the identity provider must reach the callback.  
    登入提供者需要公開 `url` — `localhost` 和 `127.0.0.1` 被拒絕，因為身分提供者必須到達回呼。

**[`dashboard auth add`](#p-097)**

Adds a single sign-on provider. See [OIDC](#p-015) and [OAuth2](#p-019) for the provider-side configuration.

新增單一登入提供者。有關提供者端配置，請參閱 [OIDC](#p-015) 和 [OAuth2](#p-019)。

```
portabase dashboard auth add [OPTIONS] <DASHBOARD_PATH> [KIND] [PROVIDER_ID]
```

| Option<br>選項 | OIDC | OAuth | Description<br>說明 |
| --- | --- | --- | --- |
| `KIND` | Yes<br>是的 | Yes<br>是的 | `oidc` or `oauth`. Asked if omitted.<br>`oidc` 或 `oauth`。問是否省略。 |
| `PROVIDER_ID` | Yes<br>是的 | Yes<br>是的 | `oidc`: any slug (lowercase letters, digits, dashes, e.g. `keycloak`). `oauth`: one of `google`, `github`, `discord`, `apple`, `linkedin`, `x`, `reddit`. Asked if omitted.<br>`oidc`：任何 slug（小寫字母、數字、破折號，例如 `keycloak`）。 `oauth`：`google`, `github`, `discord`, `apple`, `linkedin`, `x`, `reddit`之一。問是否省略。 |
| `--issuer <url>` | Yes<br>是的 |  | Issuer / discovery URL (`http(s)://…`). Asked if omitted.<br>發行人/發現URL (`http(s)://…`)。問是否省略。 |
| `--client <str>` | Yes<br>是的 | Yes<br>是的 | Client ID. Asked if omitted.<br>客戶端ID。問是否省略。 |
| `--secret-stdin` | Yes<br>是的 | Yes<br>是的 | Read the client secret from standard input.<br>從標準輸入讀取客戶端金鑰。 |
| `--secret <str>` | Yes<br>是的 | Yes<br>是的 | Client secret. Prefer `--secret-stdin`. Asked if omitted.<br>客戶秘密。更喜歡`--secret-stdin`。問是否省略。 |
| `--title <str>` | Yes<br>是的 | Yes<br>是的 | Name displayed on the login button.<br>登入按鈕上顯示的名稱。 |
| `--scopes <str>` | Yes<br>是的 |  | Scopes to request.<br>要求的範圍。 |
| `--pkce` / `--no-pkce` | Yes<br>是的 |  | Use PKCE. Default `false`.<br>使用PKCE。預設`false`。 |
| `--host <str>` | Yes<br>是的 |  | Host override.<br>主機覆蓋。 |

An OIDC-only flag used with `oauth` fails with `Not applicable to oauth: --issuer`.

與 `oauth` 一起使用的僅 OIDC 標誌會因 `Not applicable to oauth: --issuer` 失敗。

**Example**

**範例**

```
portabase dashboard set ./my-dashboard url https://backup.example.com

printf '%s\n' "$KEYCLOAK_SECRET" | portabase dashboard auth add ./my-dashboard oidc keycloak \
  --issuer https://sso.example.com/realms/main \
  --client portabase --secret-stdin \
  --title "Company SSO" --scopes "openid profile email" --pkce

portabase restart ./my-dashboard
```

Callback URL

回撥URL

After adding a provider, the CLI prints the callback URL to register at the identity provider, built from `url`. For OIDC it is `https://<your-domain>/api/auth/sso/callback/<providerId>`. For OAuth providers, check the expected URL in the [OAuth2 setup](#p-019) page.

新增提供者後，CLI 列印回呼URL 以在身分提供者註冊，該身分提供者由`url` 建置。對於OIDC，它是`https://<your-domain>/api/auth/sso/callback/<providerId>`。對於 OAuth 提供者，請在 [OAuth2 設定](#p-019) 頁面中檢查預期的 URL。

A provider ID must be unique: adding an existing one fails — remove it first.

提供者ID必須是唯一的：新增現有的提供者會失敗 - 首先將其刪除。

**[`dashboard auth list`](#p-097)**

Lists the configured providers: kind, ID, title, issuer (or provider name) and callback URL.

列出已配置的提供者：種類、ID、標題、發行者（或提供者名稱）和回呼URL。

```
portabase dashboard auth list <DASHBOARD_PATH>
```

**[`dashboard auth remove`](#p-097)**

Removes a provider and all its `AUTH_OIDC_<ID>_*` / `AUTH_SOCIAL_<ID>_*` variables.

刪除提供者及其所有 `AUTH_OIDC_<ID>_*` / `AUTH_SOCIAL_<ID>_*` 變數。

```
portabase dashboard auth remove [OPTIONS] <DASHBOARD_PATH> [PROVIDER_ID]
```

`-y, --yes` skips the confirmation. Without `PROVIDER_ID`, an interactive menu is shown.

`-y, --yes` 跳過確認。如果沒有`PROVIDER_ID`，則會顯示互動式選單。

Removing the last provider while `password_auth` is `false` is refused. Re-enable password login first: `portabase dashboard set <PATH> password_auth true`.

當 `password_auth` 為 `false` 時，刪除最後一個提供者將被拒絕。首先重新啟用密碼登入：`portabase dashboard set <PATH> password_auth true`。

Last updated on

最後更新於

[

agent

代理人

Create and configure an agent and its databases.

建立並配置代理及其資料庫。

](https://portabase.io/docs/cli/commands/agent)[

lifecycle

生命週期

Start, stop, restart, read logs and uninstall an agent or a dashboard.

啟動、停止、重新啟動、讀取日誌以及卸載代理程式或儀表板。

](https://portabase.io/docs/cli/commands/lifecycle)

---

<a id="p-098"></a>

###### lifecycle｜生命週期

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/commands/lifecycle>

CLICommands

CLI命令


Start, stop, restart, read logs and uninstall an agent or a dashboard.

啟動、停止、重新啟動、讀取日誌以及卸載代理程式或儀表板。

These commands replace direct use of `docker compose`. They target the folder of a component (agent or dashboard), check that Docker is running, and use the folder name (slugified) as the Compose project name. Inside the component folder, use `.` as the path: `portabase logs .`

這些命令取代了直接使用`docker compose`。它們以元件（代理或儀表板）的資料夾為目標，檢查 Docker 是否正在運行，並使用資料夾名稱（slugified）作為 Compose 專案名稱。在元件資料夾中，使用`.`作為路徑：`portabase logs .`

| Command<br>命令 | Runs<br>運行 | Description<br>描述 |
| --- | --- | --- |
| `portabase start <PATH>` | `docker compose up -d` | Start the containers in the background.<br>在後台啟動容器。 |
| `portabase stop <PATH>` | `docker compose stop` | Stop the containers cleanly (containers and volumes are kept).<br>乾淨地停止容器（保留容器和捲）。 |
| `portabase restart <PATH>` | `docker compose up -d` then `docker compose restart`<br>`docker compose up -d` 然後`docker compose restart` | Apply configuration changes: creates services added since the last start, then restarts everything so `.env` is re-read.<br>應用設定變更：建立自上次啟動以來新增的服務，然後重新啟動所有內容，以便重新讀取`.env`。 |
| `portabase logs <PATH>` | `docker compose logs [-f]` | Show logs. `--follow/--no-follow` (`-f`), follow is enabled by default. `Ctrl+C` to exit.<br>顯示日誌。 `--follow/--no-follow` (`-f`)，預設開啟關注。 `Ctrl+C` 退出。 |
| `portabase uninstall <PATH>` | `docker compose down -v` then deletes the folder<br>`docker compose down -v` 然後刪除資料夾 | Remove everything. `--force` (`-f`) skips the confirmation.<br>刪除所有內容。 `--force` (`-f`) 跳過確認。 |

`uninstall` runs `docker compose down -v` and **deletes the folder**. It removes the containers, the **data volumes** (local databases, dashboard data) and the configuration (`.env`, `databases.json`, including the Edge Key and `PROJECT_SECRET`). This action is irreversible.

`uninstall` 運行`docker compose down -v` 並**刪除資料夾**。它會刪除容器、**資料磁碟區**（本機資料庫、儀表板資料）和配置（`.env`, `databases.json`，包括 Edge Key 和 `PROJECT_SECRET`）。此操作是不可逆轉的。

Last updated on

最後更新於

[

dashboard

儀表板

Create and configure a dashboard and its login providers.

建立並配置儀表板及其登入提供者。

](https://portabase.io/docs/cli/commands/dashboard)[

build

建造

Re-render docker-compose.yml from a component's configuration.

從元件的配置重新渲染 docker-compose.yml。

](https://portabase.io/docs/cli/commands/build)

---

<a id="p-099"></a>

###### build｜建造

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/commands/build>

CLICommands

CLI命令


Re-render docker-compose.yml from a component's configuration.

從元件的配置重新渲染 docker-compose.yml。

Re-renders `docker-compose.yml` (and `databases.json` for an agent) from the folder's configuration. Use it after editing `.env` or `databases.json` by hand, after upgrading the CLI to pick up new templates, or to inspect the result.

從資料夾的配置重新渲染`docker-compose.yml`（以及代理程式的`databases.json`）。手動編輯`.env`或`databases.json`後，升級CLI後使用它來拾取新模板，或檢查結果。

Why the compose is generated: see [Concepts](#p-090).

為什麼生成組合：參見[概念](#p-090)。

```
portabase build [OPTIONS] <PATH>
```

| Option<br>選項 | Description<br>說明 | Default<br>預設 |
| --- | --- | --- |
| `--diff` | Show the unified diff between the current and the rendered compose. Writes nothing.<br>顯示目前合成與渲染合成之間的統一差異。什麼也沒寫。 | — |
| `--stdout` | Print the rendered compose. Writes nothing.<br>印刷渲染的撰寫。什麼也沒寫。 | — |
| `-o, --output <dir>` | Write the files (compose, `databases.json`, and a copy of `.env`) to another directory.<br>將文件（撰寫、`databases.json` 和`.env` 的副本）寫入另一個目錄。 | — |
| `--inline-env` | Put the actual values in the compose instead of `${VAR}` references.<br>將實際值放入組合中，而非`${VAR}` 參考。 | — |

`--diff`, `--stdout` and `--output` are mutually exclusive.

`--diff`, `--stdout` 和 `--output` 是互斥的。

**Example**

**範例**

```
# Preview what the CLI would change (recommended after an upgrade)
portabase build ./my-agent --diff

# Apply
portabase build ./my-agent
portabase restart ./my-agent

# Export a self-contained compose, e.g. for Portainer or Coolify
portabase build ./my-dashboard --stdout --inline-env > compose.yml
```

`--inline-env` writes **secrets in clear text** (Edge Key, database passwords, `PROJECT_SECRET`) in the compose file. Never commit or share that file.

`--inline-env` 在撰寫文件中以明文形式寫入**秘密**（邊緣金鑰、資料庫密碼、`PROJECT_SECRET`）。切勿提交或共用該文件。

Last updated on

最後更新於

[

lifecycle

生命週期

Start, stop, restart, read logs and uninstall an agent or a dashboard.

啟動、停止、重新啟動、讀取日誌以及卸載代理程式或儀表板。

](https://portabase.io/docs/cli/commands/lifecycle)[

decrypt

解密

Decrypt Portabase .enc backup files offline.

離線解密 Portabase .enc 備份檔。

](https://portabase.io/docs/cli/commands/decrypt)

---

<a id="p-100"></a>

###### decrypt｜解密

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/commands/decrypt>

CLICommands

CLI命令


Decrypt Portabase .enc backup files offline.

離線解密 Portabase .enc 備份檔。

Decrypts Portabase `.enc` backup files (AES-256-GCM) and restores the original archive. Works on a single file or on a whole folder of `.enc` files. Step-by-step: [Decrypt a backup](#p-094).

解密Portabase`.enc`備份檔案（AES-256-GCM）並還原原始檔案。適用於單一檔案或 `.enc` 檔案的整個資料夾。逐步操作：[解密備份](#p-094)。

```
portabase decrypt [OPTIONS] INPUT_PATH [OUTPUT_PATH]
```

| Option<br>選項 | Description<br>說明 | Default<br>預設 |
| --- | --- | --- |
| `INPUT_PATH` | A `.enc` file, or a folder containing `.enc` files (top level; all are decrypted). **Required.**<br>`.enc` 文件，或包含 `.enc` 文件的資料夾（頂層；全部已解密）。 **必填。** | — |
| `OUTPUT_PATH` | Output file or folder, matching the input type. Defaults to the input's directory.<br>輸出檔或資料夾，與輸入類型相符。預設為輸入目錄。 | — |
| `-k, --key <path>` | Path to the master key file (raw 32-byte or Base64 AES-256 key).<br>主金鑰檔案的路徑（原始 32 位元組或 Base64 AES-256 金鑰）。 | `./master_key.bin` |

**Example**

**範例**

```
portabase decrypt backup.tar.gz.enc backup.tar.gz --key master_key.bin
```

**[Master key](#p-100)｜[萬能鑰匙](#p-100)**

The master key is the same 32-byte AES-256 key used for encryption. Download it from the dashboard in **Settings**, **Storage** section. When `--key` is not provided, the CLI looks for `master_key.bin` in the current directory.

主金鑰與用於加密的 32 位元組 AES-256 金鑰相同。從儀表板的 **設定**、**儲存** 部分下載。當`--key`未提供時，CLI在目前目錄中尋找`master_key.bin`。

**[Folder mode](#p-100)｜[資料夾模式](#p-100)**

When decrypting a folder, each file is handled independently: one corrupt or wrong-key file does not stop the batch. At the end, a summary gives the number of successes and failures and lists each failed file with its reason; the command then exits with a non-zero code if any failed.

解密資料夾時，每個檔案都是獨立處理的：一個損壞或錯誤金鑰的檔案不會停止批次。最後，總結給出了成功和失敗的次數，並列出了每個失敗的文件及其原因；如果任何失敗，該命令都會以非零代碼退出。

**[Large backups](#p-100)｜[大量備份](#p-100)**

Decryption is fully streaming: files are processed chunk by chunk, so memory stays bounded (tens of MB) even for multi-gigabyte (>2 GB) backups. The output is written atomically, so a failure never leaves a partial file behind.

解密是完全串流的：檔案是逐塊處理的，因此即使對於多千兆位元組 (>2 GB) 備份，記憶體也保持有限（數十MB）。輸出是自動寫入的，因此失敗永遠不會留下部分文件。

Last updated on

最後更新於

[

build

建造

Re-render docker-compose.yml from a component's configuration.

從元件的配置重新渲染 docker-compose.yml。

](https://portabase.io/docs/cli/commands/build)[

config & update

配置和更新

Global CLI configuration and self-update.

全域CLI配置和自我更新。

](https://portabase.io/docs/cli/commands/config)

---

<a id="p-101"></a>

###### config & update｜配置和更新

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/commands/config>

CLICommands

CLI命令


Global CLI configuration and self-update.

全域CLI配置和自我更新。

**[CLI configuration (`config`)](#p-101)｜[CLI配置(`config`)](#p-101)**

The global configuration is stored in `~/.portabase/config.json`.

全域配置儲存在`~/.portabase/config.json`中。

| Command<br>命令 | Description<br>描述 |
| --- | --- |
| `portabase config show` | Show the file path and every known key (`unset` when not set). Unknown keys are flagged.<br>显示文件路径和每个已知密钥（未设置时为`unset`）。未知的鍵被標記。 |
| `portabase config get <KEY>` | Print one value. Fails (exit `2`) if the key is not set.<br>列印一個值。如果未設定金鑰，則會失敗（退出`2`）。 |
| `portabase config set <KEY> <VALUE>` | Set a value.<br>設定一個值。 |
| `portabase config channel <stable\|beta>` | Shortcut for `config set update_channel <stable\|beta>`.<br>`config set update_channel <stable\|beta>` 的捷徑。 |

| Key<br>關鍵 | Values<br>價值 | Description<br>說明 |
| --- | --- | --- |
| `update_channel` | `stable`, `beta` | Which releases `update` and the update notification follow. When unset, a beta CLI follows `beta`, a stable CLI follows `stable`.<br>隨後發布了`update`以及更新通知。未設定時，測試版CLI緊接在`beta`，穩定版CLI緊接在`stable`。 |

```
portabase config channel beta
portabase config get update_channel
```

**[`update`](#p-101)**

Updates the CLI binary to the latest release of the active channel.

将 CLI 二进制文件更新为活动通道的最新版本。

```
portabase update
```

-   Downloads the binary for your platform and **verifies its SHA-256** against the release's `checksums.txt`. The update is refused if the checksum file is missing or does not match.  
    下載適合您平台的二進位檔案並**根據版本的 `checksums.txt` 驗證其 SHA-256**。如果校驗和檔案遺失或不匹配，更新將被拒絕。
-   Replaces the running binary and keeps the previous one next to it as `portabase.old`. Uses `sudo` if the install directory is not writable.  
    替换正在运行的二进制文件并将其旁边的前一个保留为`portabase.old`。如果安裝目錄不可寫，則使用`sudo`。
-   Asks for confirmation before a downgrade (e.g. switching from `beta` back to `stable`).  
    降級前要求確認（例如從`beta`切換回`stable`）。
-   Only works with the released binary, not from source.  
    僅適用於已發布的二進位文件，不適用於原始程式碼。

After a successful command, the CLI may display **"A new version of Portabase CLI is available"**. The check is cached for 24 hours (`~/.portabase/cache/release.json`) and never runs in non-interactive mode.

指令成功後，CLI可能會顯示**「新版的PortabaseCLI可用」**。此檢查會快取 24 小時 (`~/.portabase/cache/release.json`)，並且從不在非互動模式下運作。

Last updated on

最後更新於

[

decrypt

解密

Decrypt Portabase .enc backup files offline.

離線解密 Portabase .enc 備份檔。

](https://portabase.io/docs/cli/commands/decrypt)[

Troubleshooting

故障排除

Fix common Portabase CLI errors.

修復常見的 Portabase CLI 錯誤。

](https://portabase.io/docs/cli/troubleshooting)

---

<a id="p-102"></a>

###### Troubleshooting｜故障排除

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/troubleshooting>

CLI


Fix common Portabase CLI errors.

修復常見的 Portabase CLI 錯誤。

Still stuck? Re-run the command with `--verbose` and [open an issue](https://github.com/Portabase/cli/issues).

還卡住了嗎？使用 `--verbose` 和 [打开问题](https://github.com/Portabase/cli/issues) 重新运行命令。

Last updated on

最後更新於

[

config & update

配置和更新

Global CLI configuration and self-update.

全域CLI配置和自我更新。

](https://portabase.io/docs/cli/commands/config)[

Migration guide

遷移指南

Upgrade from the Portabase CLI 26.08.12 or earlier.

從 Portabase CLI 26.08.12 或更早版本升級。

](https://portabase.io/docs/cli/migration)

---

<a id="p-103"></a>

###### Migration guide｜遷移指南

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/migration>

CLI


Upgrade from the Portabase CLI 26.08.12 or earlier.

從 Portabase CLI 26.08.12 或更早版本升級。

This page covers the changes that can break an installation or a script when upgrading from the **CLI 26.08.12 or earlier**. The old commands are documented in [Legacy CLI](#p-104).

本頁介紹了從 **CLI 26.08.12 或更早版本** 升級時可能會破壞安裝或腳本的變更。舊指令記錄在 [Legacy CLI](#p-104) 中。

Existing agent and dashboard folders keep working, but the CLI now **regenerates `docker-compose.yml`**. Manual edits to that file are lost. Follow the [upgrade steps](#p-103).

現有的代理程式和儀表板資料夾繼續工作，但CLI現在**重新生成`docker-compose.yml`**。對該文件的手動編輯將會遺失。依[升級步驟](#p-103)。

**[Renamed commands](#p-103)｜[重新命名指令](#p-103)**

| Before<br>之前 | Now<br>現在 |
| --- | --- |
| `portabase agent NAME` | `portabase agent create NAME` |
| `portabase dashboard NAME` | `portabase dashboard create NAME` |
| `portabase db add <PATH>` | `portabase agent db add <PATH>` |
| `portabase db list <PATH>` | `portabase agent db list <PATH>` |
| `portabase db remove <PATH>` | `portabase agent db remove <PATH>` |

The old forms fail. `portabase db` was removed: database commands only apply to an agent, so they live under `portabase agent db`.

舊的形式失效了。 `portabase db` 已刪除：資料庫命令僅適用於代理，因此它們位於 `portabase agent db` 下。

**[`docker-compose.yml` is generated](#p-103)｜[生成`docker-compose.yml`](#p-103)**

The CLI rebuilds `docker-compose.yml` from `.env` and `databases.json` every time the configuration changes (`set`, `unset`, `db add`, `db remove`, `auth add`, `auth remove`, `build`).

每次配置變更 (`set`, `unset`, `db add`, `db remove`, `auth add`, `auth remove`, `build`) 時，CLI 都會從`.env` 和`databases.json` 重建`docker-compose.yml`。

-   Put your customisations in `docker-compose.override.yml`. Docker Compose merges it and the CLI never touches it.  
    將您的客製化放入`docker-compose.override.yml`。 Docker Compose 合併了它，而 CLI 從未觸及它。
-   The first time, the old file is saved as `docker-compose.legacy.yml`.  
    第一次，舊文件保存為`docker-compose.legacy.yml`。
-   Service and volume names do not change: your data is kept.  
    服務和磁碟區名稱不會變更：您的資料將保留。

**[Scripts](#p-103)｜[腳本](#p-103)**

-   Without a terminal (CI, pipes, cron), the CLI **never prompts**. Pass every value as a flag, and secrets with `--key-stdin`, `--password-stdin`, etc.  
    如果沒有終端（CI、管道、cron），CLI **永遠不會提示**。將每個值作為標誌傳遞，並使用 `--key-stdin`, `--password-stdin` 等傳遞秘密。
-   Confirmations that default to *no* are refused in that mode: add `--force` or `--yes`.  
    在該模式下拒絕預設為 *no* 的確認：新增 `--force` 或 `--yes`。
-   Exit codes changed: `2` for invalid input, `3` configuration, `4` Docker, `130` canceled. See [Exit codes](#p-090).  
    退出代碼已更改：`2` 無效輸入、`3` 配置、`4` Docker、`130` 已取消。請參閱[退出代碼](#p-090)。

```
printf '%s\n' "$EDGE_KEY" | portabase agent create my-agent --key-stdin --tz UTC --yes
```

**[Other changes](#p-103)｜[其他變更](#p-103)**

-   `agent db remove` asks for confirmation (`--yes` to skip) and accepts `--id`.  
    `agent db remove`要求確認（`--yes`跳過）並接受`--id`。
-   `restart` also creates containers added since the last start.  
    `restart` 也建立自上次啟動以來新增的容器。
-   Templates ship with the CLI: no internet access needed to create a component.  
    模板隨CLI一起提供：創建組件無需訪問互聯網。
-   `update` verifies the binary checksum.  
    `update` 驗證二進位校驗和。

**[Upgrade steps](#p-103)｜[升級步驟](#p-103)**

**[Back up your folders](#p-103)｜[備份資料夾](#p-103)**

```
tar czf my-agent-backup.tgz my-agent/
```

**[Update the CLI](#p-103)｜[更新CLI](#p-103)**

```
portabase update
```

**[Preview the new compose](#p-103)｜[預覽新作文](#p-103)**

```
portabase build ./my-agent --diff
```

Move anything you still need into `docker-compose.override.yml`.

將您仍需要的任何內容移至`docker-compose.override.yml`。

**[Apply](#p-103)｜[申請](#p-103)**

```
portabase build ./my-agent
portabase restart ./my-agent
```

**[Update your scripts](#p-103)｜[更新你的腳本](#p-103)**

Apply the renamed commands and add the flags needed in non-interactive mode.

應用重新命名的命令並添加非交互模式所需的標誌。

Last updated on

最後更新於

[

Troubleshooting

故障排除

Fix common Portabase CLI errors.

修復常見的 Portabase CLI 錯誤。

](https://portabase.io/docs/cli/troubleshooting)[

CLI reference (Legacy)

CLI 參考（舊版）

Command reference of the Portabase CLI up to version 26.08.12.

Portabase CLI 至版本 26.08.12 的指令參考。

](https://portabase.io/docs/cli/legacy)

---

<a id="p-104"></a>

###### CLI reference (Legacy)｜CLI 參考（舊版）

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/legacy>

CLI


Command reference of the Portabase CLI up to version 26.08.12.

Portabase CLI 至版本 26.08.12 的指令參考。

Legacy documentation

遺留文檔

This page documents the **Portabase CLI 26.08.12 and earlier**. For newer versions, see the [current reference](#p-088) and the [migration guide](#p-103).

本頁記錄了 **Portabase CLI 26.08.12 及更早版本**。較新的版本，請參閱[目前參考](#p-088)和[遷移指南](#p-103)。

The **Portabase CLI** is the central orchestration tool. It acts as an intelligent wrapper on top of Docker Compose to:

**Portabase CLI** 是中央編排工具。它充當 Docker Compose 之上的智慧包裝器，用於：

1.  **Generate** valid and secure configurations.  
    **產生**有效且安全的配置。
2.  **Manage** the container lifecycle (start/stop/logs).  
    **管理**容器生命週期（啟動/停止/日誌）。
3.  **Administer** database connections without manually editing JSON files.  
    **管理**資料庫連接，無需手動編輯 JSON 檔案。

In these versions, compose templates are downloaded from the Portabase servers when a component is created (internet access required), and the generated `docker-compose.yml` can be edited by hand.

在這些版本中，建立元件時（需要存取網路）從 Portabase 伺服器下載撰寫模板，並且可以手動編輯產生的 `docker-compose.yml`。

---

**[Component Initialization](#p-104)｜[組件初始化](#p-104)**

These commands generate the folder structure, `docker-compose.yml` files, `.env` configurations, and security keys.

這些指令產生資料夾結構、`docker-compose.yml` 檔案、`.env` 配置和安全金鑰。

**[`agent`](#p-104)**

Creates a new backup agent. The agent is the connector that installs on your database servers.

建立新的備份代理程式。代理是安裝在資料庫伺服器上的連接器。

```
portabase agent [OPTIONS] NAME
```

**Arguments**

**參數**

| Argument<br>論證 | Required<br>必填 | Description<br>描述 |
| --- | --- | --- |
| `NAME` | Yes<br>是的 | The name of the folder to create (e.g., `prod-db-01`).<br>要建立的資料夾的名稱（例如，`prod-db-01`）。 |

**Options**

**選項**

| Option<br>選項 | Alias<br>別名 | Description<br>描述 | Default<br>預設 |
| --- | --- | --- | --- |
| `--key <str>` | `-k` | The **Edge Key** provided by the Dashboard. If omitted, it will be requested interactively.<br>儀表板提供的 **邊緣按鍵**。如果省略，將以互動方式請求。 | `None` |
| `--tz <str>` |  | Timezone for the agent. Asked interactively when left to `UTC`.<br>代理人的時區。當剩下`UTC`時互動詢問。 | `UTC` |
| `--polling <int>` |  | Polling frequency in seconds. Asked interactively when left to `5`.<br>輪詢頻率（以秒為單位）。當剩下`5`時互動詢問。 | `5` |
| `--start` | `-s` | Start the agent immediately after creation.<br>建立後立即啟動代理程式。 | `False` |

Interactive Assistant

互動助手

If you simply run `portabase agent my-agent`, the CLI will launch an assistant to:

如果您只需運行`portabase agent my-agent`，CLI將啟動一個助手來：

1.  Request the key, the timezone and the polling frequency.  
    請求密鑰、時區和輪詢頻率。
2.  Ask whether to add an `extra_hosts` mapping (`localhost:host-gateway`).  
    詢問是否新增`extra_hosts`映射（`localhost:host-gateway`）。
3.  Loop on **"What do you want to configure?"** (`database`, `docker-volume` or `done`) to add new database containers or existing databases.  
    循環 **「您要配置什麼？」**（`database`, `docker-volume` 或 `done`）以新增新的資料庫容器或現有資料庫。
4.  Show the proposed configuration and ask for confirmation before writing the files.  
    在寫入文件之前顯示建議的配置並要求確認。

**[`dashboard`](#p-104)**

Creates a Dashboard instance (the web management interface).

建立一個 Dashboard 實例（Web 管理介面）。

```
portabase dashboard [OPTIONS] NAME
```

**Options**

**選項**

| Option<br>選項 | Alias<br>別名 | Description<br>描述 | Default<br>預設 |
| --- | --- | --- | --- |
| `--port <int>` |  | The web listening port for the interface.<br>介面的Web監聽埠。 | `8887` |
| `--start` | `-s` | Start the dashboard immediately after creation.<br>建立後立即啟動儀表板。 | `False` |

The assistant asks for the database setup: `external` (dedicated PostgreSQL container, recommended), `internal` (embedded database) or `custom` (credentials of an existing PostgreSQL).

助理要求資料庫設定：`external`（專用 PostgreSQL 容器，建議）、`internal`（嵌入式資料庫）或`custom`（現有 PostgreSQL 的憑證）。

---

**[Database Management (`db`)](#p-104)｜[資料庫管理(`db`)](#p-104)**

The `db` module allows you to modify an agent's `databases.json` configuration without risk of syntax errors.

`db` 模組可讓您修改代理程式的 `databases.json` 配置，而不會出現語法錯誤的風險。

These commands modify the configuration. For them to take effect, you must restart the agent (`portabase restart <AGENT_PATH>`).

這些命令修改配置。為了使它們生效，您必須重新啟動代理程式（`portabase restart <AGENT_PATH>`）。

**[`db list`](#p-104)**

Displays a summary table of databases configured for a given agent.

顯示為給定代理程式配置的資料庫的總計表。

```
portabase db list <AGENT_PATH>
```

**[`db add`](#p-104)**

Launches an interactive assistant to add a new connection to the configuration.

啟動互動式助理以將新連線新增至組態。

```
portabase db add <AGENT_PATH>
```

The assistant will ask you for:

助理會詢問您：

-   **What to configure**: a `database` or a `docker-volume`.  
    **配置什麼**：`database` 或`docker-volume`。
-   **Mode**: `new` (a container added to the agent's `docker-compose.yml`) or `existing`.  
    **模式**：`new`（加入代理的`docker-compose.yml`的容器）或`existing`。
-   **Type**: `postgresql`, `postgresql-cluster`, `mysql`, `mariadb`, `sqlite`, `firebird`, `mongodb`, `redis`, `valkey`, `mssql`.  
    **類型**：`postgresql`, `postgresql-cluster`, `mysql`, `mariadb`, `sqlite`, `firebird`, `mongodb`, `redis`, `valkey`, `mssql`。
-   **Host**: The IP address or hostname (use `localhost` for a DB on the same server).  
    **主機**：IP 位址或主機名稱（對同一伺服器上的 DB 使用 `localhost`）。
-   **Port**: The listening port (e.g., 5432).  
    **連接埠**：偵聽連接埠（例如 5432）。
-   **Credentials**: Username and password.  
    **憑證**：使用者名稱和密碼。

**[`db remove`](#p-104)**

Removes a database from the configuration via an interactive selection menu.

透過互動式選擇選單從配置中刪除資料庫。

```
portabase db remove <AGENT_PATH>
```

Only the entry in `databases.json` is removed. A container created with `db add` stays in `docker-compose.yml`, with its variables in `.env` and its data volume.

僅刪除`databases.json`中的條目。使用`db add`建立的容器保留在`docker-compose.yml`中，其變數及其資料量位於`.env`中。

---

**[Lifecycle (Operations)](#p-104)｜[生命週期（操作）](#p-104)**

These commands replace direct use of `docker compose`. They must target the folder of a component (Agent or Dashboard).

這些命令取代了直接使用`docker compose`。它們必須以元件（代理或儀表板）的資料夾為目標。

Productivity tip

生產力秘訣

If you are already in the component folder, you can use `.` as the path. Example: `portabase logs .`

如果您已經在元件資料夾中，則可以使用`.`作為路徑。例：`portabase logs .`

**[`start`](#p-104)**

Starts containers in detached mode (background). Equivalent to `docker compose up -d`.

以分離模式（後台）啟動容器。相當於`docker compose up -d`。

```
portabase start <PATH>
```

**[`stop`](#p-104)**

Stops containers cleanly.

乾淨地停止容器。

```
portabase stop <PATH>
```

**[`restart`](#p-104)**

Restarts all services (`docker compose restart`). Useful after a configuration change (`db add` or modification in `.env`).

重新啟動所有服務（`docker compose restart`）。在配置更改後有用（`db add` 或修改`.env`）。

```
portabase restart <PATH>
```

`docker compose restart` does not create containers added since the last start. After `db add` with a new container, run `portabase start <PATH>`.

`docker compose restart` 不會建立自上次啟動以來新增的容器。在使用新容器執行`db add`之後，運行`portabase start <PATH>`。

**[`logs`](#p-104)**

Displays container logs.

顯示容器日誌。

```
portabase logs [OPTIONS] <PATH>
```

**Options**

**選項**

| Option<br>選項 | Alias<br>別名 | Description<br>說明 |
| --- | --- | --- |
| `--follow` / `--no-follow` | `-f` | Follows logs in real time (enabled by default). Press `Ctrl+C` to exit.<br>即時追蹤日誌（預設為啟用）。按`Ctrl+C`退出。 |

**[`uninstall`](#p-104)**

Removes the entire deployment.

刪除整個部署。

```
portabase uninstall [OPTIONS] <PATH>
```

**Options**

**選項**

| Option<br>選項 | Alias<br>別名 | Description<br>說明 |
| --- | --- | --- |
| `--force` | `-f` | Does not ask for confirmation before deleting.<br>刪除前不要求確認。 |

This command performs a `docker compose down -v`. This **removes containers AND data volumes** (local databases, configurations). This action is irreversible.

該指令執行`docker compose down -v`。這**刪除容器AND資料卷**（本地資料庫、配置）。此操作是不可逆轉的。

---

**[Backup Decryption (`decrypt`)](#p-104)｜[備份解密(`decrypt`)](#p-104)**

Decrypts Portabase `.enc` backup files (AES-256-GCM) and restores the original archive. Works on a single file or on a whole folder of `.enc` files.

解密Portabase`.enc`備份檔案（AES-256-GCM）並還原原始檔案。適用於單一檔案或`.enc` 檔案的整個資料夾。

```
portabase decrypt [OPTIONS] INPUT_PATH [OUTPUT_PATH]
```

**Arguments**

**參數**

| Argument<br>論證 | Required<br>必填 | Description<br>描述 |
| --- | --- | --- |
| `INPUT_PATH` | Yes<br>是的 | A `.enc` file, or a folder containing `.enc` files (top level; all are decrypted).<br>`.enc` 文件，或包含 `.enc` 文件的資料夾（頂層；全部已解密）。 |
| `OUTPUT_PATH` | No<br>沒有 | Output file or folder, matching the input type. Defaults to the input's directory.<br>輸出檔或資料夾，與輸入類型相符。預設為輸入目錄。 |

**Options**

**選項**

| Option<br>選項 | Alias<br>別名 | Description<br>描述 | Default<br>預設 |
| --- | --- | --- | --- |
| `--key <path>` | `-k` | Path to the master key file (raw 32-byte or Base64 AES-256 key).<br>主金鑰檔案的路徑（原始 32 位元組或 Base64 AES-256 金鑰）。 | `./master_key.bin` |

Decrypt a single file:

解密單一檔案：

```
portabase decrypt backup.tar.gz.enc backup.tar.gz --key master_key.bin
```

Decrypt every `.enc` in a folder into another folder:

將資料夾中的每個`.enc`解密到另一個資料夾：

```
portabase decrypt ./backups ./restored --key master_key.bin
```

Omit the output to write next to the input, and omit `--key` to use `master_key.bin` from the current directory:

省略輸出以寫入輸入旁邊，並省略 `--key` 以使用目前目錄中的 `master_key.bin`：

```
portabase decrypt backup.tar.gz.enc
```

Master key

萬能鑰匙

The master key is the same 32-byte AES-256 key used for encryption. Download it from the dashboard in **Settings**, **Storage** section. When `--key` is not provided, the CLI looks for `master_key.bin` in the current directory.

主金鑰與用於加密的 32 位元組 AES-256 金鑰相同。從儀表板的 **設定**、**儲存** 部分下載。當`--key`未提供時，CLI在目前目錄中尋找`master_key.bin`。

Folder mode is resilient

資料夾模式具有彈性

When decrypting a folder, each file is handled independently: one corrupt or wrong-key file does not stop the batch. A summary lists which files succeeded and which failed (with the reason), and the command exits with a non-zero code if any failed.

解密資料夾時，每個檔案都是獨立處理的：一個損壞或錯誤金鑰的檔案不會停止批次。摘要列出了哪些文件成功，哪些文件失敗（以及原因），如果有任何失敗，該命令將退出並傳回非零代碼。

Large backups

大備份

Decryption is fully streaming: files are processed chunk by chunk, so memory stays bounded (tens of MB) even for multi-gigabyte (>2 GB) backups. The output is written atomically, so a failure never leaves a partial file behind.

解密完全串流：檔案以區塊處理，因此即使對於多 GB (>2 GB) 備份，記憶體也保持有限（數十MB）。輸出是自動寫入的，因此失敗永遠不會留下部分文件。

**[Maintenance and Troubleshooting](#p-104)｜[維護與故障排除](#p-104)**

Manage the global behavior and settings of the Portabase CLI.

管理 Portabase CLI 的全域行為和設定。

**[`config channel`](#p-104)**

Changes the update channel to switch between stable and beta versions.

變更更新頻道以在穩定版和測試版之間切換。

```
portabase config channel <stable|beta>
```

**[`config show`](#p-104)**

Displays the current CLI configuration, including the active update channel.

顯示目前CLI配置，包括活動更新頻道。

```
portabase config show
```

**[`update`](#p-104)**

Updates the CLI to the latest available version. This command checks for updates on the official repository and applies security patches or new features.

將 CLI 更新至最新可用版本。此命令檢查官方儲存庫上的更新並應用安全性修補程式或新功能。

```
portabase update
```

---

**[Common Troubleshooting](#p-104)｜[常見故障處理](#p-104)**

Last updated on

最後更新於

[

Migration guide

遷移指南

Upgrade from the Portabase CLI 26.08.12 or earlier.

從 Portabase CLI 26.08.12 或更早版本升級。

](https://portabase.io/docs/cli/migration)[

Contributing

貢獻

Run and test the Portabase CLI from source.

從原始程式碼運行並測試 Portabase CLI。

](https://portabase.io/docs/cli/contributing)

---

<a id="p-105"></a>

###### Contributing｜貢獻

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/contributing>

CLI


Run and test the Portabase CLI from source.

從原始程式碼運行並測試 Portabase CLI。

If you want to contribute to the CLI or test your changes locally:

如果您想為 CLI 做出貢獻或在本地測試您的變更：

**[Clone the repository](#p-105)｜[克隆存儲庫](#p-105)**

```bash
git clone https://github.com/Portabase/cli.git
cd cli
```

**[Install dependencies](#p-105)｜[安裝依賴](#p-105)**

```
uv sync
```

**[Run the CLI from source](#p-105)｜[從原始碼運行CLI](#p-105)**

```
uv run main.py --help
uv run main.py agent create my-agent
```

**[Run the checks](#p-105)｜[運轉檢查](#p-105)**

```
uv run ruff check .
uv run mypy
uv run pytest
```

`portabase update` only works with the released binary. When running from source, update with `git pull`.

`portabase update` 僅適用於已發布的二進位。從原始碼執行時，請使用 `git pull` 進行更新。

Last updated on

最後更新於

[

CLI reference (Legacy)

CLI 參考（舊版）

Command reference of the Portabase CLI up to version 26.08.12.

Portabase CLI 至版本 26.08.12 的指令參考。

](https://portabase.io/docs/cli/legacy)[

FAQ

Frequently asked questions.

常見問題。

](https://portabase.io/docs/faq)

---

<a id="p-106"></a>

#### FAQ

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/faq>

Frequently asked questions.

常見問題。

Last updated on

最後更新於

[

Contributing

貢獻

Run and test the Portabase CLI from source.

從原始程式碼運行並測試 Portabase CLI。

](https://portabase.io/docs/cli/contributing)[

Contributing

貢獻

Learn how to contribute to the Portabase ecosystem.

了解如何為 Portabase 生態系統做出貢獻。

](https://portabase.io/docs/contributing)

---

<a id="p-107"></a>

#### Contributing｜貢獻

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/contributing>

Learn how to contribute to the Portabase ecosystem.

了解如何為 Portabase 生態系統做出貢獻。

We love contributions! Portabase is an open-source project, and we welcome help with the Dashboard, the Agent, and the CLI.

我們熱愛貢獻！ Portabase 是一個開源項目，我們歡迎儀表板、代理程式和CLI 的協助。

Whether you want to fix a bug, add a new feature, or improve the documentation, here is how you can get started with development for each component.

無論您是想修復錯誤、添加新功能還是改進文檔，您都可以透過以下方法開始每個組件的開發。

[

###### Dashboard Development｜儀表板開發

Contribute to the Next.js web interface. Learn how to run it locally and manage the database.

為 Next.js Web 介面做出貢獻。了解如何在本地運行它並管理資料庫。

](https://portabase.io/docs/contributing#dashboard-development)[

###### Agent Development｜代理開發

Improve the Rust-based agent that handles backups and communication with the dashboard.

改進基於 Rust 的代理，用於處理備份以及與儀表板的通訊。

](https://portabase.io/docs/contributing#agent-development)[

###### CLI Development｜CLI 開發

Help enhance the Python command-line tool that orchestrates the entire ecosystem.

幫助增強協調整個生態系統的 Python 命令列工具。

](https://portabase.io/docs/cli/contributing)[

###### E2E Tests｜E2E 測試

Maintain the shared end-to-end test suite, reused to validate both the Dashboard and the Agent.

維護共享的端到端測試套件，重新用於驗證儀表板和代理程式。

](https://github.com/Portabase/e2e-tests)

---

###### [Dashboard development](#p-107)｜[儀錶板開發](#p-107)

Run the Dashboard from source:

從原始碼運行儀表板：

**[Clone the repository](#p-107)｜[克隆存儲庫](#p-107)**

```bash
git clone https://github.com/Portabase/portabase.git
cd portabase
```

**[Install dependencies](#p-107)｜[安裝依賴](#p-107)**

```bash
pnpm install
```

**[Environment configuration](#p-107)｜[環境配置](#p-107)**

Copy the example environment file and adjust values if necessary:

複製範例環境文件並根據需要調整值：

```
cp .env.example .env
```

**[Start in development mode](#p-107)｜[以開發模式啟動](#p-107)**

```
make up
```

###### [Agent development](#p-107)｜[代理開發](#p-107)

Set up the agent in a development environment:

在開發環境中設定代理：

**[Clone the repository](#p-107)｜[克隆存儲庫](#p-107)**

```bash
git clone https://github.com/Portabase/agent.git
cd agent
```

**[Build the agent](#p-107)｜[建構代理](#p-107)**

```
cargo build
```

**[Start in development mode](#p-107)｜[以開發模式啟動](#p-107)**

```bash
docker compose up
```

See the [development requirements](#p-002) for the toolchain versions.

工具鏈版本請參考[開發需求](#p-002)。

---

###### [General Workflow](#p-107)｜[一般流程](#p-107)

1.  **Fork** the repository you want to contribute to.  
    **分叉**您想要貢獻的儲存庫。
2.  **Clone** your fork locally.  
    **在本地克隆**您的分叉。
3.  **Create a branch** for your changes.  
    **為您的變更建立一個分支**。
4.  **Commit** your work with clear and concise messages.  
    **以清晰簡潔的資訊提交**您的工作。
5.  **Run the tests** and make sure they pass, including the [end-to-end tests](https://github.com/Portabase/e2e-tests) where relevant (see [Testing](#p-107) below).  
    **執行測試**並確保它們通過，包括相關的[端對端測試](https://github.com/Portabase/e2e-tests)（請參閱下面的[測試](#p-107)）。
6.  **Push** to your fork and **open a Pull Request**.  
    **推送**到您的分叉並**打開拉取請求**。

Thank you for helping make Portabase better!

感謝您協助讓 Portabase 變得更好！

---

###### [Testing](#p-107)｜[測試](#p-107)

Portabase ships with an automated test pipeline that runs on every pull request.

Portabase 附帶了一個針對每個拉取請求運行的自動化測試管道。

The **end-to-end (E2E) tests** are maintained in a dedicated repository, [`Portabase/e2e-tests`](https://github.com/Portabase/e2e-tests), rather than inside the main project repositories. Keeping them separate makes them easier to maintain and lets us reuse the same suite for agent-side testing.

**端對端 (E2E) 測試**維護在專用儲存庫 [`Portabase/e2e-tests`](https://github.com/Portabase/e2e-tests) 中，而不是在主專案儲存庫中。將它們分開使它們更易於維護，並讓我們可以重複使用相同套件進行代理端測試。

[

###### Dashboard｜儀表板

Currently relies exclusively on end-to-end tests. Unit tests are not yet included.

目前完全依賴端到端測試。尚未包括單元測試。

](https://github.com/Portabase/e2e-tests)[

###### Agent｜代理商

Includes unit tests run on every pull request with a code coverage report, alongside the end-to-end tests.

包括在每個拉取請求上執行的單元測試以及程式碼覆蓋率報告以及端對端測試。

](https://github.com/Portabase/e2e-tests)

###### [Useful Development Commands](#p-107)｜[實用開發指令](#p-107)

To make managing the development environment easier, `make` commands are available to handle authentication provider data.

為了更輕鬆地管理開發環境，可以使用`make`指令來處理身分驗證提供者資料。

###### Seed authentication test data｜種子鑑定測試數據

This command loads test data for Keycloak and Pocket ID. It is an alias for `make seed-keycloak` and `make seed-pocket`.

此指令載入 Keycloak 和 Pocket ID 的測試資料。它是`make seed-keycloak`和`make seed-pocket`的別名。

```
make seed-auth
```

###### Seed Keycloak test data｜種子Keycloak測試數據

Resets and loads test data for Keycloak from `seeds/keycloak/*.json`.

從 `seeds/keycloak/*.json` 重設並載入 Keycloak 的測試資料。

```
make seed-keycloak
```

###### Seed Pocket ID test data｜種子袋ID測試數據

Resets and loads test data for Pocket ID from `seeds/pocket-id/portabase.zip`.

從 `seeds/pocket-id/portabase.zip` 重設並載入 Pocket ID 的測試資料。

```
make seed-pocket
```

###### Export Keycloak data｜匯出Keycloak數據

Exports Keycloak configuration and users to `seeds/keycloak/`.

將 Keycloak 配置和使用者匯出到`seeds/keycloak/`。

```
make export-keycloak
```

###### Export Pocket ID data｜導出PocketID數據

Exports Pocket ID data to `seeds/pocket-id/portabase.zip`.

將 Pocket ID 資料匯出至 `seeds/pocket-id/portabase.zip`。

```
make export-pocket
```

###### Generate Pocket ID access token｜產生 Pocket ID 訪問令牌

Generates a one-time access token for the Pocket ID administrator.

為 Pocket ID 管理員產生一次性存取權杖。

```
make pocket-token
```

Last updated on

最後更新於

[

FAQ

Frequently asked questions.

常見問題。

](https://portabase.io/docs/faq)[

Overview

概述

Analysis and comparison of database backup solutions

資料庫備份方案分析比較

](https://portabase.io/docs/comparisons/overview)

---

<a id="p-108"></a>

#### Overview｜概述

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/comparisons/overview>

Comparisons

比較


Analysis and comparison of database backup solutions

資料庫備份方案分析比較

Database backup tools vary significantly in architecture and operational scope. Some solutions focus on a single database engine and rely primarily on command-line tooling, while others provide broader platform capabilities such as web interfaces, multi-database support, and team-oriented management features.

資料庫備份工具在架構和操作範圍上差異很大。有些解決方案專注於單一資料庫引擎並主要依賴命令列工具，而其他解決方案則提供更廣泛的平台功能，例如 Web 介面、多資料庫支援和團隊導向的管理功能。

##### [Overview of existing solutions](#p-108)｜[現有解決方案概述](#p-108)

Traditional tools like [Barman](https://pgbarman.org/), [pgBackRest](https://pgbackrest.org/), and [WAL-G](https://wal-g.readthedocs.io/) offer robust backup and recovery capabilities but are typically aimed at infrastructure specialists, requiring configuration via files and command-line interfaces.

[Barman](https://pgbarman.org/)、[pgBackRest](https://pgbackrest.org/) 和 [WAL-G](https://wal-g.readthedocs.io/) 等傳統工具提供強大的備份和復原功能，但通常是針對基礎設施專家，需要透過檔案和命令列介面進行設定。

Newer platforms such as [Databasus](https://databasus.com/) and [Databasement](https://david-crty.github.io/databasement/) simplify backup management through graphical interfaces and guided configuration, making them more accessible to development teams.

[Databasus](https://databasus.com/) 和 [Databasement](https://david-crty.github.io/databasement/) 等較新的平台透過圖形介面和引導配置簡化了備份管理，使開發團隊更容易使用它們。

Enterprise solutions like [Veeam](https://www.veeam.com/) provide comprehensive backup across multiple systems but are proprietary and primarily targeted at large organizations.

[Veeam](https://www.veeam.com/) 等企業解決方案提供跨多個系統的全面備份，但它們是專有的，主要針對大型組織。

Portabase adopts a different approach: an open-source, lightweight platform with agent-based architecture, a web interface, and multi-database support. It is fully self-hosted and designed to simplify backup management for teams handling multiple databases.

Portabase 採用了不同的方法：具有基於代理的架構、Web 介面和多資料庫支援的開源輕量級平台。它是完全自架的，旨在簡化處理多個資料庫的團隊的備份管理。

##### [Feature Comparison](#p-108)｜[功能對比](#p-108)

| Feature<br>特色 | Portabase<br>資料庫 | Barman<br>酒保 | pgBackRest<br>pg靠背 | WAL-G | Databasus<br>資料庫 | Databasement<br>資料庫 | Veeam<br>維姆 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Multiple DBMS supported<br>支援多個DBMS | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Web UI<br>網頁 UI | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Agent Architecture<br>代理人架構 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Organizations/Teams<br>組織/團隊 | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| Built-in notifications<br>內建通知 | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| OIDC/OAuth2 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Docker installation<br>Docker 安裝 | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ |
| Self-hosted support<br>自架支援 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Encryption<br>加密 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Built-in retention policies<br>內建保留策略 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Open-Source<br>開源 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |

Last updated on

最後更新於

[

Contributing

貢獻

Learn how to contribute to the Portabase ecosystem.

了解如何為 Portabase 生態系統做出貢獻。

](https://portabase.io/docs/contributing)
