---
title: "Introduction"
source: "https://portabase.io/docs"
chapter: []
order: 1
lang: "en"
translated_by: "original"
captured: "2026-09-27T12:06:16.844Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[下一篇：Requirements ➡](<002 [01.01 portabaseportabase1.8K120] Requirements.md>)

# Introduction

Portabase is the 100% open source and self-hosted solution to centralize, secure, and automate your database backups.

## [Welcome to Portabase](#welcome-to-portabase)

**Portabase** is the solution designed to simplify the **backup** and **management** of your databases.

We know that managing backups manually is risky and tedious. Portabase automates this process by installing smart connectors (**Agents**) on your servers. These agents handle everything: they secure your data and send it to your preferred storage spaces, without requiring advanced technical skills.

Simplicity First

No more writing complex scripts. Portabase connects your servers to a unique dashboard for serene data management.

![Portabase Video - Youtube](<../images/a30f3ea2-thumbnail-portabase-video.png>)

---

## [Architecture](#architecture)

The central server provides the graphical interface and acts as the control plane: it allows users to declare agents, configure backups, launch restores, and connect third-party systems such as storage backends and notification services.

The agent is deployed as close as possible to the databases: it executes backup and restore tasks.

This architectural choice is important: the central server never contacts the agents directly. Therefore, there is no need to open inbound ports into the environments where the databases reside. Instead, the agents periodically contact the central server.

This approach reduces the network exposure surface and limits the consequences of a compromise of the central server.

![Google Drive configuration](<../images/81ac25bc-image.png>)

## [Features](#features)

### [Supported databases](#supported-databases)

| Database | Support | Tested versions | Restore |
| --- | --- | --- | --- |
| **PostgreSQL** | ✅ Stable | 12, 13, 14, 15, 16, 17 et 18 | Yes |
| **MySQL** | ✅ Stable | 5.7, 8 et 9 | Yes |
| **MariaDB** | ✅ Stable | 10 et 11 | Yes |
| **MongoDB** | ✅ Stable | 4, 5, 6, 7 et 8 | Yes |
| **SQLite** | ✅ Stable | 3.x | Yes |
| **Redis** | ✅ Stable | 2.8+ | No |
| **Valkey** | ✅ Stable | 7.2+ | No |
| **Firebird** | ✅ Stable | 3.0, 4.0, 5.0 | Yes |
| **MSSQL Server** | ✅ Stable | 2017, 2019, 2022 and Azure SQL | Yes |
| **Docker Volume** | ✅ Stable | Docker Engine 20.10+ | Yes |

### [Scheduled backups](#scheduled-backups)

-   **Cron-based scheduling**: For full control.
-   **Manual trigger**: Support for on-demand backups.

### [Storage backends](#storage-backends)

-   ✅ **On-premise storage**: Backups are stored directly on your server.
-   ✅ **S3-compatible**: AWS S3, Minio, RustFS, etc.
-   ✅ **Google Drive**
-   ✅ **Azure Blob Storage**
-   ✅ **Google Cloud Storage**
-   ✅ **SFTP**
-   ✅ **Rclone** (any backend)

Important Note

Portabase allows sending the same backup to **multiple destinations simultaneously**. You can combine local storage, private cloud, and S3 services, ensuring maximum redundancy and enhanced security in case one storage point fails.

### [Smart notifications](#smart-notifications)

-   **Multi-channel delivery**: Email, Slack, Discord, Telegram, Ntfy, Gotify, webhooks.
-   **Real-time alerts**: Immediate feedback on success and failure.
-   **Custom alert policies**: Database-level notification rules.
-   **Team-ready**: Designed for DevOps, on-call, and incident workflows.

### [Built for team environments](#built-for-team-environments)

-   **Workspaces**: Organize databases, notification channels, and storage backends by organization and project.
-   **Access control**: Fine-grained, role-based permissions on all resources.
-   **Role management**: Member, admin, and owner roles at both system and organization levels.

### [Self-hosted & secure](#self-hosted--secure)

-   **Containerized deployment**: Docker-based setup for predictable installation and operations.
-   **Privacy by design**: All data remains within your own infrastructure.
-   **Open source**: Apache 2.0 licensed - fully auditable codebase.
-   **Advanced Encryption**: Backups protected with AES-GCM to ensure data confidentiality and integrity.

### [Portabase Agent](#portabase-agent)

-   **Headless architecture**: Runs locally on your infrastructure to manage backups and database operations.
-   **Multi-target support**: Single agent can connect to multiple databases across different servers.
-   **Lightweight & efficient**: Minimal resource footprint while providing full operational control.

---

## [How it works?](#how-it-works)

The ecosystem relies on three simple elements:

[

### The Dashboard

The web interface to control your backups, view history, and restore your data if needed.

](https://portabase.io/docs/installation)[

### The Agent

The connector that installs on your servers. It works in the background to protect your databases.

](https://portabase.io/docs/installation#agent-coverage)[

### The Assistant (CLI)

A simple tool to run on your computer to install and configure your agents in seconds.

](https://portabase.io/docs/cli)

Last updated on

[

Requirements

System requirements to run Portabase.

](https://portabase.io/docs/requirements)

---

[⬆ 目錄](<000 目錄.md>)　｜　[下一篇：Requirements ➡](<002 [01.01 portabaseportabase1.8K120] Requirements.md>)
