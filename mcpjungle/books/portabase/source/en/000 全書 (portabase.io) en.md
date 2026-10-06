---
title: "Portabase Documentation（原文（English））"
source: "https://portabase.io"
pages: 108
chapters: 32
generated: "2026-09-27T12:11:39.737Z"
---

# Portabase Documentation（原文（English））

> 共 108 篇 · 32 個章節 · 由「網頁轉 Markdown」依 chapter／order 自動編排

<a id="toc"></a>

## 目錄

- [Introduction](#p-001)
- [[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-o](#c-1)
  - [portabase/portabase1.8K120](#c-2)
    - [Requirements](#p-002)
    - [Installation](#c-3)
      - [Overview](#p-003)
      - [CLI](#p-004)
      - [Docker](#p-005)
      - [Kubernetes](#p-006)
      - [Coolify](#p-007)
      - [Dokploy](#p-008)
      - [Unraid](#p-009)
      - [Proxmox VE](#p-010)
    - [Portabase Dashboard](#c-4)
      - [Getting Started](#c-5)
        - [Configuration](#c-6)
          - [Environment Variables](#c-7)
            - [Reverse Proxy](#p-013)
            - [Authentication](#c-8)
              - [Global Configuration](#c-9)
                - [OpenID Connect](#c-10)
                  - [OIDC Configuration](#c-11)
                    - [Examples](#c-12)
                      - [Keycloak](#p-016)
                      - [PocketID](#p-017)
                      - [Authentik](#p-018)
                - [OAuth2](#c-13)
                  - [OAuth2 Configuration](#c-14)
                    - [Configurations](#c-15)
                      - [Google](#p-020)
                      - [GitHub](#p-021)
                      - [Discord](#p-022)
                      - [Reddit](#p-023)
                      - [LinkedIn](#p-024)
                      - [Apple](#p-025)
                      - [X (Twitter)](#p-026)
        - [User Guide](#p-027)
        - [Usage (How-to)](#c-16)
          - [Storage](#c-17)
            - [Local Storage](#p-028)
            - [Object Storage (S3)](#p-029)
            - [Google Drive](#p-030)
            - [Azure Blob Storage](#p-031)
            - [Google Cloud Storage](#p-032)
            - [SFTP](#p-033)
            - [Rclone (any backend)](#p-034)
          - [Notification](#c-18)
            - [Slack](#p-035)
            - [Email (SMTP)](#p-036)
            - [Webhook](#p-037)
            - [Discord](#p-038)
            - [Telegram](#p-039)
            - [Ntfy](#p-040)
            - [Gotify](#p-041)
            - [Nextcloud Talk](#p-042)
            - [Pushover](#p-043)
            - [Microsoft Teams](#p-044)
            - [Apprise](#p-045)
            - [Healthchecks.io](#p-046)
        - [API](#c-19)
          - [API Introduction](#c-20)
            - [Agents](#c-21)
              - [List agents](#p-048)
              - [Create an agent](#p-049)
              - [Get agent by ID](#p-050)
              - [Delete agent](#p-051)
              - [Get agent edge key](#p-052)
            - [Databases](#c-22)
              - [List databases](#p-053)
              - [Get database by ID](#p-054)
              - [Attach the database to a project, or detach it (projectId null)](#p-055)
              - [Get database status](#p-056)
              - [List backups for a database](#p-057)
              - [Trigger a backup for a database](#p-058)
              - [Get a specific backup with storage details](#p-059)
              - [Set or clear the backup schedule for a database](#p-060)
              - [Restore a database from a backup](#p-061)
            - [Organizations](#c-23)
              - [List organizations for the current user](#p-062)
              - [Create an organization](#p-063)
              - [Get organization by ID](#p-064)
              - [Delete an organization](#p-065)
              - [List projects for an organization](#p-066)
              - [Create a project in an organization](#p-067)
              - [List agents attached to an organization](#p-068)
              - [Attach an agent to an organization](#p-069)
              - [Detach an agent from an organization](#p-070)
            - [Projects](#c-24)
              - [Get project by ID](#p-071)
              - [Archive (soft-delete) a project](#p-072)
        - [MCP Server](#c-25)
          - [MCP Tools Reference](#p-074)
    - [Portabase Agent](#c-26)
      - [Configuration File](#c-27)
        - [Environment Variables](#p-076)
        - [Databases](#c-28)
          - [Supported Databases](#p-077)
          - [PostgreSQL](#p-078)
          - [MySQL](#p-079)
          - [MariaDB](#p-080)
          - [MongoDB](#p-081)
          - [SQLite](#p-082)
          - [Redis](#p-083)
          - [Valkey](#p-084)
          - [Firebird](#p-085)
          - [MsSQL](#p-086)
          - [Docker Volume](#p-087)
    - [CLI](#c-29)
      - [Introduction](#c-30)
        - [Install the CLI](#p-089)
        - [Key concepts](#p-090)
        - [Guides](#c-31)
          - [Set up an agent](#p-091)
          - [Set up a dashboard](#p-092)
          - [Add a login provider](#p-093)
          - [Decrypt a backup](#p-094)
        - [Commands](#c-32)
          - [agent](#p-096)
          - [dashboard](#p-097)
          - [lifecycle](#p-098)
          - [build](#p-099)
          - [decrypt](#p-100)
          - [config & update](#p-101)
        - [Troubleshooting](#p-102)
        - [Migration guide](#p-103)
        - [CLI reference (Legacy)](#p-104)
        - [Contributing](#p-105)
    - [FAQ](#p-106)
    - [Contributing](#p-107)
    - [Overview](#p-108)

---

<a id="p-001"></a>

## Introduction

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs>

Portabase is the 100% open source and self-hosted solution to centralize, secure, and automate your database backups.

### [Welcome to Portabase](#p-001)

**Portabase** is the solution designed to simplify the **backup** and **management** of your databases.

We know that managing backups manually is risky and tedious. Portabase automates this process by installing smart connectors (**Agents**) on your servers. These agents handle everything: they secure your data and send it to your preferred storage spaces, without requiring advanced technical skills.

Simplicity First

No more writing complex scripts. Portabase connects your servers to a unique dashboard for serene data management.

![Portabase Video - Youtube](<../images/a30f3ea2-thumbnail-portabase-video.png>)

---

### [Architecture](#p-001)

The central server provides the graphical interface and acts as the control plane: it allows users to declare agents, configure backups, launch restores, and connect third-party systems such as storage backends and notification services.

The agent is deployed as close as possible to the databases: it executes backup and restore tasks.

This architectural choice is important: the central server never contacts the agents directly. Therefore, there is no need to open inbound ports into the environments where the databases reside. Instead, the agents periodically contact the central server.

This approach reduces the network exposure surface and limits the consequences of a compromise of the central server.

![Google Drive configuration](<../images/81ac25bc-image.png>)

### [Features](#p-001)

#### [Supported databases](#p-001)

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

#### [Scheduled backups](#p-001)

-   **Cron-based scheduling**: For full control.
-   **Manual trigger**: Support for on-demand backups.

#### [Storage backends](#p-001)

-   ✅ **On-premise storage**: Backups are stored directly on your server.
-   ✅ **S3-compatible**: AWS S3, Minio, RustFS, etc.
-   ✅ **Google Drive**
-   ✅ **Azure Blob Storage**
-   ✅ **Google Cloud Storage**
-   ✅ **SFTP**
-   ✅ **Rclone** (any backend)

Important Note

Portabase allows sending the same backup to **multiple destinations simultaneously**. You can combine local storage, private cloud, and S3 services, ensuring maximum redundancy and enhanced security in case one storage point fails.

#### [Smart notifications](#p-001)

-   **Multi-channel delivery**: Email, Slack, Discord, Telegram, Ntfy, Gotify, webhooks.
-   **Real-time alerts**: Immediate feedback on success and failure.
-   **Custom alert policies**: Database-level notification rules.
-   **Team-ready**: Designed for DevOps, on-call, and incident workflows.

#### [Built for team environments](#p-001)

-   **Workspaces**: Organize databases, notification channels, and storage backends by organization and project.
-   **Access control**: Fine-grained, role-based permissions on all resources.
-   **Role management**: Member, admin, and owner roles at both system and organization levels.

#### [Self-hosted & secure](#p-001)

-   **Containerized deployment**: Docker-based setup for predictable installation and operations.
-   **Privacy by design**: All data remains within your own infrastructure.
-   **Open source**: Apache 2.0 licensed - fully auditable codebase.
-   **Advanced Encryption**: Backups protected with AES-GCM to ensure data confidentiality and integrity.

#### [Portabase Agent](#p-001)

-   **Headless architecture**: Runs locally on your infrastructure to manage backups and database operations.
-   **Multi-target support**: Single agent can connect to multiple databases across different servers.
-   **Lightweight & efficient**: Minimal resource footprint while providing full operational control.

---

### [How it works?](#p-001)

The ecosystem relies on three simple elements:

[

#### The Dashboard

The web interface to control your backups, view history, and restore your data if needed.

](https://portabase.io/docs/installation)[

#### The Agent

The connector that installs on your servers. It works in the background to protect your databases.

](https://portabase.io/docs/installation#agent-coverage)[

#### The Assistant (CLI)

A simple tool to run on your computer to install and configure your agents in seconds.

](https://portabase.io/docs/cli)

Last updated on

[

Requirements

System requirements to run Portabase.

](https://portabase.io/docs/requirements)

---

<a id="c-1"></a>

## [data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-o

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-2"></a>

### portabase/portabase1.8K120

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-002"></a>

#### Requirements

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/requirements>

System requirements to run Portabase.

To run Portabase, you need the following installed on your system:

##### [1\. Docker & Docker Compose](#p-002)

Portabase runs as a set of Docker containers. You must have Docker Engine (version 20.10+) and Docker Compose (version 2.0+) installed.

**Linux**

###### [Ubuntu / Debian / Fedora](#p-002)

The easiest way to install Docker on Linux is using the official convenience script:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

**Post-installation steps:** To run Docker without `sudo`, add your user to the `docker` group:

```bash
sudo usermod -aG docker $USER
```

*You may need to log out and back in for this change to take effect.*

**macOS**

---

##### [2\. Operating System](#p-002)

-   **Linux**: Any modern distribution (Ubuntu 22.04+, Debian 11+, CentOS, etc.).
-   **macOS**: Catalina 10.15 or newer.

---

##### [3\. Network Requirements](#p-002)

-   **Local Port**: By default, the dashboard uses port `8887`. Ensure it is not being used by another service.
-   **Internet Access**: Required to pull Docker images and for the agent to communicate with the dashboard (if hosted remotely).

You can check if Docker is correctly installed by running `docker compose version` in your terminal.

---

##### [4\. Development Requirements (Optional)](#p-002)

If you plan to contribute to Portabase or build it from source, you will need the following tools:

###### [Agent (Rust)](#p-002)

The agent is built with Rust for performance and safety.

-   **Rust**: Version 1.75+ (latest stable recommended).
-   **Package manager**: `cargo`, included with the Rust toolchain.

###### [CLI (Python)](#p-002)

The CLI is written in Python with Typer.

-   **Python**: Version 3.12+.
-   **Package manager**: `uv`

###### [Dashboard (TypeScript)](#p-002)

The dashboard is a modern web application built with Next.js and React.

-   **Node.js**: Version 20+.
-   **Package manager**: `pnpm` Version 9+.

Last updated on

[

Introduction

Portabase is the 100% open source and self-hosted solution to centralize, secure, and automate your database backups.

](https://portabase.io/docs)[

Overview

Choose how you want to deploy the Portabase Dashboard and Agent.

](https://portabase.io/docs/installation)

---

<a id="c-3"></a>

#### Installation

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-003"></a>

##### Overview

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/installation>

Installation


Choose how you want to deploy the Portabase Dashboard and Agent.

Portabase ships as two components, and both are installed from this section:

-   The **Dashboard** - the control plane. Install it once, wherever you want to manage things from.
-   The **Agent** - the connector. Install one on each server that holds databases to back up.

Start with the Dashboard, then install your first Agent. Every page below covers both, in a **Dashboard** and an **Agent** tab.

Check the [Requirements](#p-002) before you start.

---

###### [Choose a method](#p-003)

| Method | Best for | Internal database | Support | Status |
| --- | --- | --- | --- | --- |
| [**CLI**](#p-004) | Getting started, and the fastest path on a plain server | \- | Official | ✅ Tested |
| [**Docker**](#p-005) | Manual control, GitOps, existing Docker hosts | Bundled or external | Official | ✅ Tested |
| [**Kubernetes**](#p-006) | Existing clusters, Helm-based workflows | Bundled or external | Official | ✅ Tested |
| [**Coolify**](#p-007) | Self-hosted PaaS users who want a one-click deploy | Managed by Coolify | Official | ✅ Tested |
| [**Dokploy**](#p-008) | Self-hosted PaaS users who want a one-click deploy | Managed by Dokploy | Official | ✅ Tested |
| [**Unraid**](#p-009) | Unraid servers, install from Community Applications | External (PostgreSQL 17) | Official | ✅ Tested |
| [**Proxmox VE**](#p-010) | Proxmox hosts, LXC via the community helper script | Installed in the LXC | ⚠️ Unofficial | ❌ Not tested |

**Support** - *Official* methods are published and maintained by the Portabase team. *Unofficial* ones are maintained by a third party; we do not control what they install or when they change.

**Status** - *Tested* means we run the method ourselves before each release. *Not tested* means we have not verified it.

If you have no strong preference, use the **CLI**. It generates the encryption secret and starts the containers for you.

[

**CLI**

One command to create and start the Dashboard or an Agent. Recommended.

](https://portabase.io/docs/installation/cli)[

**Docker**

Docker Run for a quick test, Docker Compose for production.

](https://portabase.io/docs/installation/docker)[

**Kubernetes**

Install the Helm chart from the OCI registry.

](https://portabase.io/docs/installation/kubernetes)[

**Coolify**

Deploy the Dashboard from the Coolify service catalogue.

](https://portabase.io/docs/installation/coolify)[

**Dokploy**

Deploy the Dashboard from the Dokploy template catalogue.

](https://portabase.io/docs/installation/dokploy)[

**Unraid**

Install the Dashboard from the Community Applications catalogue.

](https://portabase.io/docs/installation/unraid)[

**Proxmox VE**

Community helper script that builds a Debian LXC. Unofficial, untested.

](https://portabase.io/docs/installation/proxmox)

---

###### [Agent coverage](#p-003)

The Agent runs next to your databases, so it is installed directly on the host rather than through a PaaS or a cluster.

| Method | Dashboard | Agent |
| --- | --- | --- |
| CLI | ✅ | ✅ |
| Docker | ✅ | ✅ |
| Kubernetes | ✅ | ❌ - use [Docker](#p-005) |
| Coolify | ✅ | ❌ - use [CLI](#p-004) or [Docker](#p-005) |
| Dokploy | ✅ | ❌ - use [CLI](#p-004) or [Docker](#p-005) |
| Unraid | ✅ | ❌ - use [Docker](#p-005) |
| Proxmox VE | ✅ | ❌ - use [CLI](#p-004) or [Docker](#p-005) |

---

###### [After installing](#p-003)

Once the Dashboard is up, continue with:

-   [Environment variables](#p-012) - external database, mail, storage limits.
-   [Reverse proxy](#p-013) - put it behind a domain with HTTPS.
-   [Authentication](#p-014) - OAuth2 and OIDC providers.
-   [Getting started](#p-011) - create your first agent and backup.

Last updated on

[

Requirements

System requirements to run Portabase.

](https://portabase.io/docs/requirements)[

CLI

Install the Portabase Dashboard and Agent with the Portabase CLI.

](https://portabase.io/docs/installation/cli)

---

<a id="p-004"></a>

##### CLI

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/installation/cli>

Installation


Install the Portabase Dashboard and Agent with the Portabase CLI.

The CLI is the recommended way to install Portabase. It generates the configuration and the encryption secret (`PROJECT_SECRET`), and starts the containers for you.

Install the CLI first. If it isn't installed yet, follow the instructions [here](#p-089).

Breaking changes in recent CLI versions

This guide uses the current syntax: `portabase dashboard create` and `portabase agent create`. With the **CLI 26.08.12 or earlier**, the commands were `portabase dashboard <name>` and `portabase agent <name>` — see the [legacy reference](#p-104). Upgrading an existing installation? Read the [migration guide](#p-103) first.

---

###### [Quick install](#p-004)

```
portabase dashboard create my-dashboard --start
portabase agent create my-agent
portabase agent db add my-agent
portabase start my-agent
```

Open `http://localhost:8887` to reach the dashboard. The agent needs an Edge Key created in the dashboard.

###### [Step-by-step](#p-004)

-   [Set up a dashboard](#p-092)
-   [Set up an agent](#p-091)

---

###### [Next steps](#p-004)

-   [CLI commands](#p-095) for every command and option.
-   [Environment variables](#p-012) for the Dashboard, or [Agent environment](#p-076).
-   [Reverse proxy](#p-013) to expose the Dashboard behind a domain.
-   [Getting started](#p-011) to create your first backup.

Last updated on

[

Overview

Choose how you want to deploy the Portabase Dashboard and Agent.

](https://portabase.io/docs/installation)[

Docker

Deploy the Portabase Dashboard and Agent with Docker Run or Docker Compose.

](https://portabase.io/docs/installation/docker)

---

<a id="p-005"></a>

##### Docker

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/installation/docker>

Installation


Deploy the Portabase Dashboard and Agent with Docker Run or Docker Compose.

Deploy Portabase yourself, without the CLI. Use **Docker Run** for a quick test and **Docker Compose** for anything you intend to keep.

Make sure the Docker engine is already installed on the host.

---

**Dashboard**

###### [Docker Run](#p-005)

Recommended for testing only, not for production: this uses the bundled internal database.

**[Environment variables](#p-005)**

Create the `.env` file. **Warning**, you must generate passwords and secrets yourself.

```title=".env"
# --- App Configuration ---
PROJECT_URL=http://localhost:8887

# ⚠️ GENERATE A STRONG SECRET (e.g., openssl rand -hex 32)
# This secret is used to encrypt communications with agents.
PROJECT_SECRET=change_me_please_generate_a_secure_hex_token
```

**[Start the Dashboard](#p-005)**

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

**[Access the interface](#p-005)**

Open your browser: **[http://localhost:8887](http://localhost:8887/)** (or the chosen port).

###### [Docker Compose](#p-005)

Recommended for production and GitOps workflows: the Dashboard runs alongside a dedicated PostgreSQL container.

**[File structure](#p-005)**

Create a folder and place two files in it: `docker-compose.yml` and `.env`.

```bash
mkdir portabase-dashboard && cd portabase-dashboard
```

**[Docker configuration](#p-005)**

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

**[Environment variables](#p-005)**

Create the `.env` file. **Warning**, you must generate passwords and secrets yourself.

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

**[Startup](#p-005)**

```bash
docker compose up -d
```

**[Access the interface](#p-005)**

Open your browser: **[http://localhost:8887](http://localhost:8887/)** (or the chosen port).

**Agent**

---

###### [Next steps](#p-005)

-   [Environment variables](#p-012) for the Dashboard, or [Agent environment](#p-076).
-   [Reverse proxy](#p-013) to expose the Dashboard behind a domain.
-   [Getting started](#p-011) to create your first backup.

Last updated on

[

CLI

Install the Portabase Dashboard and Agent with the Portabase CLI.

](https://portabase.io/docs/installation/cli)[

Kubernetes

Deploy the Portabase Dashboard on Kubernetes with the official Helm chart.

](https://portabase.io/docs/installation/kubernetes)

---

<a id="p-006"></a>

##### Kubernetes

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/installation/kubernetes>

Installation


Deploy the Portabase Dashboard on Kubernetes with the official Helm chart.

For Kubernetes deployments, install the Dashboard directly from the OCI registry with Helm.

Requires a working cluster, `kubectl` configured against it, and Helm 3.8+ (OCI support).

---

**Dashboard**

###### [With ClusterIP + port-forward (for development/testing)](#p-006)

```bash
helm install portabase oci://ghcr.io/portabase/charts/portabase \
-n portabase --create-namespace \
--set project.secret=$(openssl rand -hex 32)
```

```bash
kubectl port-forward svc/portabase 8887:80 -n portabase
# Access at http://localhost:8887
```

###### [With LoadBalancer (for cloud environments)](#p-006)

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

###### [With Ingress (domain-based access)](#p-006)

```bash
helm install portabase oci://ghcr.io/portabase/charts/portabase \
-n portabase --create-namespace \
--set ingress.enabled=true \
--set ingress.hosts[0].host=portabase.example.com \
--set project.secret=$(openssl rand -hex 32)
```

**Agent**

---

###### [Next steps](#p-006)

-   [Environment variables](#p-012) - point the Dashboard at an external PostgreSQL.
-   [Authentication](#p-014) - OAuth2 and OIDC providers.
-   [Getting started](#p-011) - create your first backup.

Last updated on

[

Docker

Deploy the Portabase Dashboard and Agent with Docker Run or Docker Compose.

](https://portabase.io/docs/installation/docker)[

Coolify

Deploy Portabase on Coolify in one click and automate backups of the PostgreSQL, MySQL, MariaDB, MongoDB and Redis databases your Coolify instance manages.

](https://portabase.io/docs/installation/coolify)

---

<a id="p-007"></a>

##### Coolify

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/installation/coolify>

Installation


Deploy Portabase on Coolify in one click and automate backups of the PostgreSQL, MySQL, MariaDB, MongoDB and Redis databases your Coolify instance manages.

[Coolify](https://coolify.io/) is an open-source, self-hosted PaaS - a Heroku/Netlify/Vercel alternative you run on your own servers. Portabase is published in its **service catalogue**, so the Dashboard and its PostgreSQL database deploy together in a few clicks, with no `docker-compose.yml` to write.

Useful links: [Coolify website](https://coolify.io/) · [Coolify documentation](https://coolify.io/docs) · [Coolify on GitHub](https://github.com/coollabsio/coolify)

You need a working Coolify instance with at least one server connected, and a domain pointing at it if you want HTTPS. See the [requirements](#p-002) for the rest.

---

###### [Installation](#p-007)

**Dashboard**

**[Create the resource](#p-007)**

In your Coolify dashboard, open the project and environment you want to deploy into, then click **\+ New** and pick the **Service** tab.

**[Pick Portabase from the catalogue](#p-007)**

Search for **Portabase** in the list of one-click services and select it.

Coolify creates the Portabase container together with its PostgreSQL database, and pre-fills the generated values (database credentials, `PROJECT_SECRET`).

**[Set the domain](#p-007)**

Open the service settings and set the **Domain** (FQDN) of the Portabase container, for example `https://portabase.example.com`. Coolify handles the reverse proxy and the TLS certificate, so you do not need our own [reverse proxy guide](#p-013) here.

Make sure the `PROJECT_URL` environment variable matches that exact public URL, scheme included. Agents use it to reach the Dashboard.

**[Review the secret](#p-007)**

`PROJECT_SECRET` encrypts everything the agents exchange with the Dashboard, and the credentials stored in it. Keep it backed up, and **never change it once agents are connected** - previously encrypted data would no longer be readable.

If it wasn't generated for you, set it to a strong random value:

```
openssl rand -hex 32
```

The full list of what you can tune is on the [environment variables](#p-012) page.

**[Deploy](#p-007)**

Click **Deploy** and wait for the container to become healthy, then open your domain and follow [getting started](#p-011).

**Agent**

---

###### [Backing up Coolify-managed databases](#p-007)

Coolify runs each database as a Docker container on its own Docker network. For the Portabase Agent to reach them, connect the agent container to that network as well:

```bash
# List the networks Coolify created, then attach the agent to the right one
docker network ls
docker network connect <coolify-network> portabase-agent
```

Then declare the database in the Dashboard using the **container name** as the host, and its normal port. Databases running on the host rather than in a container are reachable through the `extra_hosts` mapping already present in the [agent compose file](#p-005).

Per-engine settings - required grants, dump options, restore behaviour - are documented in the [databases section](#p-077).

---

###### [Troubleshooting](#p-007)

-   **The agent shows as offline.** Check that `PROJECT_URL` is the public HTTPS URL of the Dashboard, not an internal container name, then review the [agent configuration](#p-075).
-   **The agent cannot reach a database.** It is almost always a Docker network issue - see the section above.
-   **You changed `PROJECT_SECRET`.** Existing encrypted data cannot be recovered. Restore the previous value.

More answers in the [FAQ](#p-106).

---

###### [Related pages](#p-007)

[

**Dokploy**

The same one-click deploy, on the Dokploy PaaS.

](https://portabase.io/docs/installation/dokploy)[

**Docker**

Install the Agent next to your databases with Docker Compose.

](https://portabase.io/docs/installation/docker)[

**Authentication**

Add OAuth2 or OIDC providers in front of your Dashboard.

](https://portabase.io/docs/dashboard/configuration/auth/configuration)[

**Databases**

Per-engine configuration for every database Portabase supports.

](https://portabase.io/docs/agent/db)

Last updated on

[

Kubernetes

Deploy the Portabase Dashboard on Kubernetes with the official Helm chart.

](https://portabase.io/docs/installation/kubernetes)[

Dokploy

Deploy Portabase on Dokploy in one click and automate backups of the PostgreSQL, MySQL, MariaDB, MongoDB and Redis databases your Dokploy instance manages.

](https://portabase.io/docs/installation/dokploy)

---

<a id="p-008"></a>

##### Dokploy

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/installation/dokploy>

Installation


Deploy Portabase on Dokploy in one click and automate backups of the PostgreSQL, MySQL, MariaDB, MongoDB and Redis databases your Dokploy instance manages.

[Dokploy](https://dokploy.com/) is an open-source, self-hosted PaaS built on Docker and Traefik - a Vercel/Netlify/Heroku alternative for your own servers. Portabase is published in its **template catalogue**, so the Dashboard and its PostgreSQL database deploy together in a few clicks, with no `docker-compose.yml` to write.

Useful links: [Dokploy website](https://dokploy.com/) · [Dokploy documentation](https://docs.dokploy.com/) · [Dokploy on GitHub](https://github.com/Dokploy/dokploy)

You need a working Dokploy instance, and a domain pointing at it if you want HTTPS. See the [requirements](#p-002) for the rest.

---

###### [Installation](#p-008)

**Dashboard**

**[Create the service](#p-008)**

Open the project you want to deploy into, click **Create Service** and choose **Template**.

**[Pick Portabase from the catalogue](#p-008)**

Search for **Portabase** in the template list and create it.

Dokploy provisions the Portabase container together with its PostgreSQL database, and pre-fills the generated values (database credentials, `PROJECT_SECRET`).

**[Set the domain](#p-008)**

In the service's **Domains** tab, add the public host of the Portabase container, for example `portabase.example.com`, targeting port **80**. Enable HTTPS so Dokploy issues the certificate through Traefik - our own [reverse proxy guide](#p-013) is not needed here.

Make sure the `PROJECT_URL` environment variable matches that exact public URL, scheme included. Agents use it to reach the Dashboard.

**[Review the secret](#p-008)**

`PROJECT_SECRET` encrypts everything the agents exchange with the Dashboard, and the credentials stored in it. Keep it backed up, and **never change it once agents are connected** - previously encrypted data would no longer be readable.

If it wasn't generated for you, set it to a strong random value:

```
openssl rand -hex 32
```

The full list of what you can tune is on the [environment variables](#p-012) page.

**[Deploy](#p-008)**

Click **Deploy** and wait for the container to become healthy, then open your domain and follow [getting started](#p-011).

**Agent**

---

###### [Backing up Dokploy-managed databases](#p-008)

Dokploy runs each database as a Docker container on its own Docker network. For the Portabase Agent to reach them, connect the agent container to that network as well:

```bash
# List the networks Dokploy created, then attach the agent to the right one
docker network ls
docker network connect <dokploy-network> portabase-agent
```

Then declare the database in the Dashboard using the **container name** as the host, and its normal port. Databases running on the host rather than in a container are reachable through the `extra_hosts` mapping already present in the [agent compose file](#p-005).

Per-engine settings - required grants, dump options, restore behaviour - are documented in the [databases section](#p-077).

---

###### [Troubleshooting](#p-008)

-   **The agent shows as offline.** Check that `PROJECT_URL` is the public HTTPS URL of the Dashboard, not an internal container name, then review the [agent configuration](#p-075).
-   **The agent cannot reach a database.** It is almost always a Docker network issue - see the section above.
-   **You changed `PROJECT_SECRET`.** Existing encrypted data cannot be recovered. Restore the previous value.

More answers in the [FAQ](#p-106).

---

###### [Related pages](#p-008)

[

**Coolify**

The same one-click deploy, on the Coolify PaaS.

](https://portabase.io/docs/installation/coolify)[

**Docker**

Install the Agent next to your databases with Docker Compose.

](https://portabase.io/docs/installation/docker)[

**Authentication**

Add OAuth2 or OIDC providers in front of your Dashboard.

](https://portabase.io/docs/dashboard/configuration/auth/configuration)[

**Databases**

Per-engine configuration for every database Portabase supports.

](https://portabase.io/docs/agent/db)

Last updated on

[

Coolify

Deploy Portabase on Coolify in one click and automate backups of the PostgreSQL, MySQL, MariaDB, MongoDB and Redis databases your Coolify instance manages.

](https://portabase.io/docs/installation/coolify)[

Unraid

Install the Portabase Dashboard on Unraid from the Community Applications catalogue and back up the databases running on your server.

](https://portabase.io/docs/installation/unraid)

---

<a id="p-009"></a>

##### Unraid

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/installation/unraid>

Installation


Install the Portabase Dashboard on Unraid from the Community Applications catalogue and back up the databases running on your server.

[Unraid](https://unraid.net/) is a NAS operating system with a Docker-based application store. Portabase is published as an **official template** in [Community Applications](https://ca.unraid.net/apps/portabase-dashboard-1sdc97m05ufd7q), so the Dashboard installs from the Apps tab with no `docker-compose.yml` to write.

Useful links: [Portabase on Community Applications](https://ca.unraid.net/apps/portabase-dashboard-1sdc97m05ufd7q) · [Unraid website](https://unraid.net/) · [Unraid documentation](https://docs.unraid.net/)

The template does **not** ship a database. You need a reachable **PostgreSQL 17** instance before you install - either the PostgreSQL container from Community Applications, or an external server. See the [requirements](#p-002) for the rest.

---

###### [Installation](#p-009)

**Dashboard**

**[Install PostgreSQL 17](#p-009)**

From the **Apps** tab, install a PostgreSQL 17 container and create a database and a user for Portabase. Note the host, port, database name, user and password - you need them in the next step.

**[Add the Portabase template](#p-009)**

Still in the **Apps** tab, search for **Portabase**, then select **Portabase-Dashboard** and click **Install**.

The template uses the official `portabase/portabase:latest` image, in **bridge** network mode.

**[Fill in the required variables](#p-009)**

| Field | Default | Notes |
| --- | --- | --- |
| WebUI port | `8887` → container `80` | Change the host port if `8887` is taken |
| `/data` | `/mnt/user/appdata/portabase/dashboard` | Persistent data, keep it on the array |
| `DATABASE_URL` | \- | `postgresql://user:password@host:5432/portabase` |
| `PROJECT_SECRET` | \- | Strong random hex value, see below |
| `PROJECT_URL` | \- | The Dashboard URL **as the agents reach it**, e.g. `http://192.168.1.10:8887` |
| `AUTH_SIGNUP_ENABLED` | \- | Turn it off once your account exists |
| `AUTH_PASSKEY_ENABLED` | `true` | Passkey authentication |

Optional variables - `PROJECT_NAME`, `AUTH_DEFAULT_USER_NAME`, `AUTH_DEFAULT_USER`, `AUTH_DEFAULT_PASSWORD`, the SMTP settings and `RETENTION_CRON` - are documented on the [environment variables](#p-012) page.

**[Generate the secret](#p-009)**

`PROJECT_SECRET` encrypts everything the agents exchange with the Dashboard, and the credentials stored in it. Keep it backed up, and **never change it once agents are connected** - previously encrypted data would no longer be readable.

From the Unraid terminal:

```
openssl rand -hex 32
```

**[Apply and open the WebUI](#p-009)**

Click **Apply**, wait for the container to start, then open `http://<unraid-ip>:8887` and follow [getting started](#p-011).

To expose it on a domain with HTTPS, put it behind a reverse proxy - see the [reverse proxy guide](#p-013) - and set `PROJECT_URL` to that public URL.

**Agent**

---

###### [Backing up databases running on Unraid](#p-009)

Unraid runs each database as a Docker container. For the Agent to reach one, both containers need to share a network:

```bash
# List the Docker networks, then attach the agent to the right one
docker network ls
docker network connect <network> portabase-agent
```

Then declare the database in the Dashboard using the **container name** as the host, and its normal port. Containers on the default `bridge` network are also reachable at the Unraid IP on their published port.

Per-engine settings - required grants, dump options, restore behaviour - are documented in the [databases section](#p-077).

---

###### [Troubleshooting](#p-009)

-   **The container restarts in a loop.** `DATABASE_URL` is wrong or PostgreSQL is unreachable. Check the container log from the Unraid UI.
-   **The agent shows as offline.** `PROJECT_URL` must be the URL the agent can actually reach - the Unraid LAN IP, or the public HTTPS URL if you use a reverse proxy. See the [agent configuration](#p-075).
-   **The agent cannot reach a database.** Almost always a Docker network issue - see the section above.
-   **You changed `PROJECT_SECRET`.** Existing encrypted data cannot be recovered. Restore the previous value.

More answers in the [FAQ](#p-106).

---

###### [Related pages](#p-009)

[

**Docker**

Install the Agent next to your databases with Docker Compose.

](https://portabase.io/docs/installation/docker)[

**Proxmox VE**

Deploy the Dashboard in an LXC container with the community helper script.

](https://portabase.io/docs/installation/proxmox)[

**Authentication**

Add OAuth2 or OIDC providers in front of your Dashboard.

](https://portabase.io/docs/dashboard/configuration/auth/configuration)[

**Databases**

Per-engine configuration for every database Portabase supports.

](https://portabase.io/docs/agent/db)

Last updated on

[

Dokploy

Deploy Portabase on Dokploy in one click and automate backups of the PostgreSQL, MySQL, MariaDB, MongoDB and Redis databases your Dokploy instance manages.

](https://portabase.io/docs/installation/dokploy)[

Proxmox VE

Deploy the Portabase Dashboard in a Proxmox VE LXC container with the community-scripts helper script.

](https://portabase.io/docs/installation/proxmox)

---

<a id="p-010"></a>

##### Proxmox VE

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/installation/proxmox>

Installation


Deploy the Portabase Dashboard in a Proxmox VE LXC container with the community-scripts helper script.

[Proxmox VE](https://www.proxmox.com/en/proxmox-virtual-environment) is an open-source virtualisation platform. The [community-scripts](https://community-scripts.org/) project maintains a helper script that creates a Debian 13 LXC container and installs the Portabase Dashboard in it - PostgreSQL, tusd, nginx and the systemd services included.

Useful links: [Portabase helper script](https://community-scripts.org/scripts/portabase) · [community-scripts website](https://community-scripts.org/) · [Proxmox VE documentation](https://pve.proxmox.com/pve-docs/)

**Unofficial and untested.** This script is maintained by the community-scripts project, not by the Portabase team, and it is currently in their **development** repository - marked as *in active development*, *may be unstable, incomplete, or subject to breaking changes*, and **not recommended for production use**. It is also the only installation method we have not tested ourselves. For a supported deployment, use the [CLI](#p-004) or [Docker](#p-005) instead.

---

###### [What the script installs](#p-010)

| Item | Value |
| --- | --- |
| Container type | Unprivileged LXC |
| OS | Debian 13 |
| Default resources | 4 vCPU · 8192 MB RAM · 15 GB disk |
| Port | `3000` (nginx in front of the app on `127.0.0.1:8887`) |
| Database | PostgreSQL 17, installed inside the container |
| Uploads | tusd, as the `portabase-tusd` service |
| Config file | `/opt/portabase/.env` |
| Services | `portabase`, `portabase-tusd` |

---

###### [Installation](#p-010)

**Dashboard**

**[Run the script from the Proxmox VE shell](#p-010)**

Open the **Shell** of your Proxmox VE node and run:

```
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVED/main/ct/portabase.sh)"
```

Always read the script before running it. The current, authoritative command is shown on the [script page](https://community-scripts.org/scripts/portabase) - check it there if the URL above has moved.

Accept the defaults, or pick **Advanced** to change the CPU, RAM, disk and network settings.

**[Open the Dashboard](#p-010)**

When the script finishes it prints the URL, `http://<container-ip>:3000`.

Sign in with the default account it created:

| User | Password |
| --- | --- |
| `admin@example.com` | `Portabase123!` |

Change this password immediately after the first login, and set `AUTH_SIGNUP_ENABLED=false` in `/opt/portabase/.env` once your account exists.

**[Review the configuration](#p-010)**

The script generates `PROJECT_SECRET` for you and writes it to `/opt/portabase/.env`, alongside `DATABASE_URL`, `PROJECT_URL` and `TRUSTED_DOMAINS` - both set to `http://<container-ip>:3000`.

`PROJECT_SECRET` encrypts everything the agents exchange with the Dashboard, and the credentials stored in it. Back up `/opt/portabase/.env`, and **never change the secret once agents are connected** - previously encrypted data would no longer be readable.

SMTP, storage backends and auth providers go in the same file - see [environment variables](#p-012). Apply changes with:

```
systemctl restart portabase
```

If you put the Dashboard behind a domain with HTTPS - see the [reverse proxy guide](#p-013) - update `PROJECT_URL` and `TRUSTED_DOMAINS` to that public URL.

**[Updating](#p-010)**

Re-run the same command and choose **Update**. The script stops the services, backs up `/opt/portabase/.env`, deploys the new release, rebuilds the app and restores your configuration.

**Agent**

---

###### [Backing up databases hosted on Proxmox VE](#p-010)

Databases usually run in other LXC containers or VMs on the same node. Install one Agent per container or VM, then declare each database in the Dashboard using the container or VM IP and the database port. Make sure the Proxmox firewall allows the Agent to reach it.

Per-engine settings - required grants, dump options, restore behaviour - are documented in the [databases section](#p-077).

---

###### [Troubleshooting](#p-010)

-   **The Dashboard does not answer on port 3000.** Check both services: `systemctl status portabase portabase-tusd`, and the logs with `journalctl -u portabase -f`.
-   **The agent shows as offline.** `PROJECT_URL` must be the URL the agent can actually reach. Update it in `/opt/portabase/.env` and restart. See the [agent configuration](#p-075).
-   **Uploads or restores fail.** The `portabase-tusd` service is down, or `TUSD_BEHIND_PROXY` was changed. Restart it with `systemctl restart portabase-tusd`.
-   **The script itself fails.** It is a community-scripts issue, not a Portabase one - report it on [their GitHub](https://github.com/community-scripts/ProxmoxVED/issues) with the advanced verbose-mode logs.

More answers in the [FAQ](#p-106).

---

###### [Related pages](#p-010)

[

**CLI**

The supported one-command install, on any Linux host.

](https://portabase.io/docs/installation/cli)[

**Unraid**

Install the Dashboard from the Community Applications catalogue.

](https://portabase.io/docs/installation/unraid)[

**Authentication**

Add OAuth2 or OIDC providers in front of your Dashboard.

](https://portabase.io/docs/dashboard/configuration/auth/configuration)[

**Databases**

Per-engine configuration for every database Portabase supports.

](https://portabase.io/docs/agent/db)

Last updated on

[

Unraid

Install the Portabase Dashboard on Unraid from the Community Applications catalogue and back up the databases running on your server.

](https://portabase.io/docs/installation/unraid)[

Getting Started

Choose which component of Portabase you want to set up first.

](https://portabase.io/docs/dashboard/getting-started)

---

<a id="c-4"></a>

#### Portabase Dashboard

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-5"></a>

##### Getting Started

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-011"></a>

> 來源：<https://portabase.io/docs/dashboard/getting-started>

Portabase Dashboard


Choose which component of Portabase you want to set up first.

Portabase is composed of three main parts. To get started, we recommend installing the **Dashboard** first, then your first **Agent**.

![Portabase Onboarding - Youtube](<../images/4376cef4-thumbnail-portabase-onboarding.png>)

[

**Install the Dashboard**

Set up the central management interface to manage all your backups and agents.

](https://portabase.io/docs/installation)[

**Install an Agent**

Deploy a lightweight agent on your database servers to handle backup tasks.

](https://portabase.io/docs/installation#agent-coverage)[

**CLI Reference**

Learn how to use the Portabase CLI to automate installation and management.

](https://portabase.io/docs/cli)

---

**[Quick start (CLI)](#p-011)**

If you already have the requirements, you can install the CLI directly:

```bash
curl -sL https://portabase.io/install | bash
```

Last updated on

[

Proxmox VE

Deploy the Portabase Dashboard in a Proxmox VE LXC container with the community-scripts helper script.

](https://portabase.io/docs/installation/proxmox)[

Environment Variables

Complete reference of .env configuration options.

](https://portabase.io/docs/dashboard/configuration/environment)

---

<a id="c-6"></a>

###### Configuration

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-7"></a>

###### Environment Variables

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-012"></a>

> 來源：<https://portabase.io/docs/dashboard/configuration/environment>

Portabase DashboardConfiguration


Complete reference of .env configuration options.

Portabase provides flexibility through environment variables. These let you customize application behavior, database connection, authentication and storage.

If you use Docker Compose, set these variables in your `.env` file at the root of the project.

---

**[Project](#p-012)**

General instance configuration.

| Variable | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
| `PROJECT_URL` | `string` | No | `http://localhost:8887` | Public URL of your dashboard (e.g. `https://backups.my-domain.com`). Important for generated links. |
| `PROJECT_SECRET` | `string` | No | `None` | **Critical.** Secret used to encrypt sensitive data. Generate with `openssl rand -hex 32`. |
| `PROJECT_NAME` | `string` | Yes | `Portabase` | Display name in the UI (site title). |
| `RETENTION_CRON` | `string` | Yes | `0 7 * * *` | Schedule for automatic deletion of backups according to the retention policies. |
| `STALE_BACKUP_THRESHOLD_HOURS` | `number` | Yes | `6` | Threshold, in hours, after which a backup without a recent successful run is flagged as stale. |
| `BACKUP_FOLDER_NAME` | `string` | Yes | `backups` | Folder name for storing backup files in storage channels. |
| `LOG_LEVEL` | `string` | Yes | `info` | Controls minimum log level. Options: `debug`, `info`, `warn`, `error` |
| `SKIP_ONBOARDING` | `boolean` | Yes | `false` | Skips the initial onboarding flow on first launch. Set to `true` when the instance is provisioned automatically. |
| `AUTH_DEFAULT_USER_NAME` | `string` | Yes | `None` | The default user name |
| `AUTH_DEFAULT_USER` | `string` | Yes | `None` | The default user email |
| `AUTH_DEFAULT_PASSWORD` | `string` | Yes | `None` | Password must contain at least 8 characters, 1 number, 1 lowercase letter, 1 uppercase letter and 1 special character |
| `TELEMETRY` | `boolean` | Yes | `True` | Enables anonymous usage metrics collection. |
| `TUSD_BEHIND_PROXY` | `boolean` | Yes | `false` | Not always required. Set to `true` when the dashboard runs behind a reverse proxy, so the tusd upload server trusts `X-Forwarded-*` headers and generates correct upload URLs. May resolve upload issues depending on your proxy configuration. |

In case you want to seed the default user using .env variables, use AUTH\_DEFAULT\_USER\_NAME, AUTH\_DEFAULT\_USER, and AUTH\_DEFAULT\_PASSWORD. These 3 variables must be filled.

---

**[API & MCP](#p-012)**

Controls programmatic access to your dashboard.

| Variable | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
| `API_ENABLED` | `boolean` | Yes | `false` | Enables all REST API routes under `/api/v1`. Required for both OpenAPI and MCP. |
| `OPENAPI_ENABLED` | `boolean` | Yes | `false` | Enables the OpenAPI specification and Swagger UI at `/api/v1/openapi` and `/api/v1/docs`. Requires `API_ENABLED=true`. |
| `MCP_ENABLED` | `boolean` | Yes | `false` | Enables the MCP server at `/api/v1/mcp` for AI assistant integrations. Requires `API_ENABLED=true`. |

---

**[Cleanup](#p-012)**

Scheduled maintenance jobs that permanently delete old data. Both jobs are disabled by default and each requires its own retention value to start.

**[Job logs cleanup](#p-012)**

Permanently deletes old `job_logs` belonging to soft-deleted backups.

| Variable | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
| `CLEANING_JOB_LOGS_ENABLED` | `boolean` | Yes | `false` | Enables the job logs cleanup cron. Set to `true` to start it. |
| `CLEANING_JOB_LOGS_CRON` | `string` | Yes | `0 0 * * *` | Cron schedule for the cleanup (default: every day at midnight). |
| `CLEANING_JOB_LOGS_RETENTION_DAYS` | `number` | No\* | `None` | Days to keep logs before purge. Positive integer. **Required** when `CLEANING_JOB_LOGS_ENABLED=true`. The cron will not start without it. |
| `CLEANING_JOB_LOGS_BATCH_SIZE` | `number` | Yes | `1000` | Rows deleted per batch. |

**[Deleted backups cleanup](#p-012)**

Hard-deletes old soft-deleted backups; children cascade. Retention is measured from `deleted_at`.

| Variable | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
| `CLEANING_BACKUPS_ENABLED` | `boolean` | Yes | `false` | Enables the deleted backups cleanup cron. Set to `true` to start it. |
| `CLEANING_BACKUPS_CRON` | `string` | Yes | `0 0 * * *` | Cron schedule for the cleanup (default: every day at midnight). |
| `CLEANING_BACKUPS_RETENTION_DAYS` | `number` | No\* | `None` | Days to keep soft-deleted backups before hard-delete. Positive integer. **Required** when `CLEANING_BACKUPS_ENABLED=true`. The cron will not start without it. |
| `CLEANING_BACKUPS_BATCH_SIZE` | `number` | Yes | `100` | Rows deleted per batch. |

These jobs permanently delete data. Retention days have no default: the corresponding cron will not start unless you set a positive integer when the job is enabled.

---

**[Database](#p-012)**

Configuration for the internal Portabase PostgreSQL connection.

| Variable | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
| `DATABASE_URL` | `string` | Yes | `None` | Database URL (e.g., `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public`). If not specified, the internal database will be used. |

---

**[Email (SMTP)](#p-012)**

Configuration for transactional email delivery (alerts, invitations).

If no configuration is provided, email-related features will be limited (no password reset, no email verification).

| Variable | Type | Default | Description |
| --- | --- | --- | --- |
| `SMTP_HOST` | `string` | `None` | SMTP server address (e.g. `smtp.resend.com`). |
| `SMTP_PORT` | `string` | `None` | SMTP server port (e.g. `587`). |
| `SMTP_USER` | `string` | `None` | SMTP username. |
| `SMTP_PASSWORD` | `string` | `None` | SMTP password. |
| `SMTP_FROM` | `string` | `None` | From email address (e.g. `no-reply@your-domain.com`). |
| `SMTP_SECURE` | `string` | `false` |  |

Last updated on

[

Getting Started

Choose which component of Portabase you want to set up first.

](https://portabase.io/docs/dashboard/getting-started)[

Reverse Proxy

Expose your Dashboard to the internet securely with HTTPS.

](https://portabase.io/docs/dashboard/configuration/reverse-proxy)

---

<a id="p-013"></a>

###### Reverse Proxy

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/reverse-proxy>

Portabase DashboardConfiguration


Expose your Dashboard to the internet securely with HTTPS.

By default, the Portabase Dashboard listens on `http://localhost:8887`. To make it accessible from the outside (e.g. `portabase.example.com`) and secure it with HTTPS, use a **Reverse Proxy**.

---

**Traefik V3**

This setup assumes you already run a **Traefik** instance on your server and it watches the Docker network (commonly `traefik_network` or `proxy`).

**[Docker Compose changes](#p-013)**

Modify your `docker-compose.yml` to:

1.  Remove direct host port exposure (no `8887:80`).
2.  Connect the container to Traefik's network.
3.  Add Traefik labels.

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

If you host **multiple dashboards** on the same Traefik server, change the router name in labels to unique values:

-   Instance 1: `traefik.http.routers.portabase-prod...`
-   Instance 2: `traefik.http.routers.portabase-dev...`

**Nginx**

**GoDoxy**

---

**[`PROJECT_URL` environment variable](#p-013)**

Whatever reverse proxy you use, update the `.env` file so generated links and emails use the correct public URL.

```title=".env"
# Before
PROJECT_URL=http://localhost:8887

# After (your public domain)
PROJECT_URL=https://portabase.example.com
```

Restart the dashboard after changing this:

**Via CLI (Recommended)**

```
portabase restart .
```

**Via Docker Compose**

Last updated on

[

Environment Variables

Complete reference of .env configuration options.

](https://portabase.io/docs/dashboard/configuration/environment)[

Global Configuration

General authentication configuration in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/configuration)

---

<a id="c-8"></a>

###### Authentication

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-9"></a>

###### Global Configuration

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-014"></a>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/configuration>

Portabase DashboardConfigurationAuthentication


General authentication configuration in Portabase.

These variables control the general authentication behavior and account security on your Portabase instance.

**[General Settings](#p-014)**

Prop

Type

If you disable `AUTH_EMAIL_PASSWORD_ENABLED`, make sure you have configured at least one functional OAuth2 or OIDC provider, otherwise you might lose access to your instance.

**[Account Linking](#p-014)**

These variables control how a Portabase account is associated with an OAuth2 or OIDC provider. They apply to every configured provider.

Prop

Type

Keep `AUTH_ALLOW_UNLINKING` at `false` when the provider is the only way into an account: with `AUTH_EMAIL_PASSWORD_ENABLED` disabled and no passkey registered, a user who unlinks their last provider locks themselves out.

**[Configure with the CLI](#p-014)**

If the dashboard was created with the [Portabase CLI](#p-088), change these settings with [`portabase dashboard set`](#p-097) instead of editing `.env`, then restart:

```
portabase dashboard set ./my-dashboard signup false passkey true
portabase dashboard set ./my-dashboard account_linking false account_unlinking false
portabase dashboard set ./my-dashboard trusted_domains "backup.example.com"
portabase restart ./my-dashboard
```

| Variable | CLI key |
| --- | --- |
| `AUTH_EMAIL_PASSWORD_ENABLED` | `password_auth` |
| `AUTH_SIGNUP_ENABLED` | `signup` |
| `AUTH_PASSKEY_ENABLED` | `passkey` |
| `AUTH_SYNC_OIDC_ROLES_ON_LOGIN` | `sync_oidc_roles` |
| `TRUSTED_DOMAINS` | `trusted_domains` |
| `AUTH_ALLOW_LINKING` | `account_linking` |
| `AUTH_ALLOW_UNLINKING` | `account_unlinking` |

Use [`portabase dashboard unset`](#p-097) to go back to the default value, and [`portabase dashboard show`](#p-097) to check the current configuration.

The CLI refuses `password_auth false` while no OIDC or OAuth2 provider is configured.

**[Security Recommendations](#p-014)**

-   **Passkeys**: We recommend enabling `AUTH_PASSKEY_ENABLED` to provide a more secure and smooth login experience.
-   **Registration**: For a private instance, set `AUTH_SIGNUP_ENABLED` to `false` after creating your administrator accounts.
-   **Account linking**: On a shared instance, set `AUTH_ALLOW_LINKING` to `false` unless your provider verifies email addresses. A provider that returns an unverified address could otherwise be used to take over an existing account with the same email.

Last updated on

[

Reverse Proxy

Expose your Dashboard to the internet securely with HTTPS.

](https://portabase.io/docs/dashboard/configuration/reverse-proxy)[

OIDC Configuration

Configuration guide for OpenID Connect in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oidc/setup)

---

<a id="c-10"></a>

###### OpenID Connect

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-11"></a>

###### OIDC Configuration

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-015"></a>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oidc/setup>

Portabase DashboardConfigurationAuthenticationOpenID Connect


Configuration guide for OpenID Connect in Portabase.

**OpenID Connect (OIDC)** integration allows connecting Portabase to any compatible identity provider, such as Keycloak, Auth0, Authentik, or Okta.

**[Implementation](#p-015)**

To configure an OIDC provider, you must define a set of environment variables starting with `AUTH_OIDC_`.

**[Create the Client](#p-015)**

On your identity server (e.g., Keycloak), create a new client of type "OIDC" or "OpenID Connect".

**[Configure URLs](#p-015)**

Define the redirect URL (Redirect URI): `https://<your-domain>/api/auth/sso/callback/<providerId>`

**[Enter Variables](#p-015)**

Add the credentials obtained into your Portabase configuration.

**[Configure with the CLI](#p-015)**

If the dashboard was created with the [Portabase CLI](#p-088), add the provider with [`portabase dashboard auth add`](#p-097). It writes the `AUTH_OIDC_<ID>_*` variables for you.

```
# The callback needs a public URL
portabase dashboard set ./my-dashboard url https://backup.example.com

printf '%s\n' "$OIDC_SECRET" | portabase dashboard auth add ./my-dashboard oidc keycloak \
  --issuer https://sso.example.com/realms/main \
  --client portabase --secret-stdin \
  --title "Company SSO" --scopes "openid profile email" --pkce

portabase restart ./my-dashboard
```

| Option | Variable |
| --- | --- |
| provider id (argument) | `AUTH_OIDC_<ID>_ID` |
| `--issuer` | `AUTH_OIDC_<ID>_ISSUER_URL` |
| `--client` | `AUTH_OIDC_<ID>_CLIENT` |
| `--secret` / `--secret-stdin` | `AUTH_OIDC_<ID>_SECRET` |
| `--title` | `AUTH_OIDC_<ID>_TITLE` |
| `--scopes` | `AUTH_OIDC_<ID>_SCOPES` |
| `--pkce` | `AUTH_OIDC_<ID>_PKCE` |
| `--host` | `AUTH_OIDC_<ID>_HOST` |

List and remove providers with [`portabase dashboard auth list`](#p-097) and [`portabase dashboard auth remove`](#p-097). Restrict access to a group with `portabase dashboard set ./my-dashboard allowed_group <group>`.

`AUTH_OIDC_<ID>_DESC` and `AUTH_OIDC_<ID>_ICON` are not handled by the CLI: add them to `.env` by hand.

**[Provider Settings](#p-015)**

Prop

Type

Linking a provider to an existing account is controlled by `AUTH_ALLOW_LINKING`, and a user's ability to detach it afterwards by `AUTH_ALLOW_UNLINKING`. Both are described in [Account Linking](#p-014).

**[Multiple Providers](#p-015)**

Portabase supports configuring multiple OIDC providers simultaneously. To do this, replace the `AUTH_OIDC_` prefix with `AUTH_OIDC_<NAME>_`.

**[Example with Pocket](#p-015)**

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

**[Configuration Examples](#p-015)**

Learn how to integrate specific solutions:

**Keycloak**

Learn how to configure Keycloak with Portabase for enterprise identity management. [View the full guide](#p-016)

**PocketID**

**[Groups and Roles](#p-015)**

You can restrict Portabase access to a specific group from your OIDC provider via the `ALLOWED_GROUP` variable. If the user does not belong to this group, login will be denied.

Last updated on

[

Global Configuration

General authentication configuration in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/configuration)[

Keycloak

Configuration guide for Keycloak via OIDC in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/keycloak)

---

<a id="c-12"></a>

###### Examples

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-016"></a>

###### Keycloak

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/keycloak>

Portabase DashboardConfigurationAuthenticationOpenID ConnectExamples


Configuration guide for Keycloak via OIDC in Portabase.

[Keycloak](https://www.keycloak.org/) integration offers robust identity management and SSO capabilities for your Portabase instance.

**[Configuration Steps](#p-016)**

**[Create a Client](#p-016)**

Log in to the Keycloak admin console, choose your Realm, and create a new client:

-   **Client type**: `OpenID Connect`.
-   **Client ID**: `portabase`.

![Keycloak configuration](<../images/e54ac8c7-image.png>)

**[Authentication and Flow](#p-016)**

In **Capability config**, enable **Client authentication** (Confidential Client) and ensure **Standard flow** is selected.

![Keycloak configuration](<../images/0913c2fa-image.png>)

**[Login Settings](#p-016)**

Define the allowed URLs:

-   **Valid redirect URIs**: `https://portabase.your-domain.com/api/auth/sso/callback/your-provider-id`

![Keycloak configuration](<../images/88645ad9-image.png>)

**[Get the Secret](#p-016)**

Save, then go to the **Credentials** tab to copy your **Client Secret**.

![Keycloak configuration](<../images/4f68c544-image.png>)

**[Environment Variables](#p-016)**

Configure Portabase with the following values:

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

**[Advanced Configuration](#p-016)**

If automatic discovery doesn't work, you can manually specify the endpoints:

```
AUTH_OIDC_POCKET_DISCOVERY_ENDPOINT="https://keycloak.your-domain.com/realms/your-realm/.well-known/openid-configuration"
AUTH_OIDC_POCKET_JWKS_ENDPOINT="https://keycloak.your-domain.com/realms/your-realm/protocol/openid-connect/certs"
```

Last updated on

[

OIDC Configuration

Configuration guide for OpenID Connect in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oidc/setup)[

PocketID

Configuration guide for PocketID via OIDC in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/pocketid)

---

<a id="p-017"></a>

###### PocketID

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/pocketid>

Portabase DashboardConfigurationAuthenticationOpenID ConnectExamples


Configuration guide for PocketID via OIDC in Portabase.

The integration of [PocketID](https://github.com/pocket-id/pocket-id) offers a lightweight authentication solution, ideal for self-hosting your Portabase instance.

**[Configuration Steps](#p-017)**

**[Create an Application](#p-017)**

Log in to the PocketID administration interface and create a new application:

-   **Application name**: `portabase` (or the name of your choice).

![PocketID application configuration](<../images/716a5145-image.png>)

**[Redirect Settings](#p-017)**

Set the authorized redirect URL to allow returning to Portabase after logging in:

-   **Callback URL / Redirect URI**: `https://portabase.your-domain.com/api/auth/sso/callback/pocketid`

**[Get Credentials](#p-017)**

Save the configuration. You can then copy the **Client ID** and generate your **Client Secret** to add them to your environment variables.

![PocketID getting credentials](<../images/847ae883-image.png>)

**[Environment Variables](#p-017)**

Configure Portabase with the following values. This example uses the dynamic `AUTH_OIDC_POCKET_` prefix to isolate the configuration.

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

**[Specific Endpoints (Optional)](#p-017)**

If automatic discovery doesn't work, you can manually specify the endpoints:

```
AUTH_OIDC_POCKET_DISCOVERY_ENDPOINT="https://pocketid.your-domain.com/.well-known/openid-configuration"
AUTH_OIDC_POCKET_JWKS_ENDPOINT="https://pocketid.your-domain.com/.well-known/jwks.json"
```

Last updated on

[

Keycloak

Configuration guide for Keycloak via OIDC in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/keycloak)[

Authentik

Configuration guide for Authentik via OIDC in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/authentik)

---

<a id="p-018"></a>

###### Authentik

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/authentik>

Portabase DashboardConfigurationAuthenticationOpenID ConnectExamples


Configuration guide for Authentik via OIDC in Portabase.

The integration of [Authentik](https://github.com/goauthentik/authentik) offers a modern authentication solution, ideal for self-hosting your Portabase instance.

**[Configuration Steps](#p-018)**

**[Configure the application](#p-018)**

![Authentik - Configure the application](<../images/25e93a8d-image.png>)

**[Choose a provider type](#p-018)**

Choose **OAuth2/OpenID Provider**.

![Authentik - Choose a provider type](<../images/9b52ebd4-image.png>)

**[Configure OAuth2 provider](#p-018)**

Set the authorized redirect URL to allow returning to Portabase after logging in:

-   **Redirect URLs/Origins**: [https://portabase.your-domain.com/api/auth/sso/callback/authentik](https://portabase.your-domain.com/api/auth/sso/callback/authentik)

![Authentik - Configure OAuth2 provider](<../images/e82a6d2b-image.png>)

**[Configure bindings](#p-018)**

![Authentik - Configure bindings](<../images/6d8436ca-image.png>)

**[Review the application and provider](#p-018)**

![Authentik - Review the application and provider](<../images/0efdc129-image.png>)

**[Environment Variables](#p-018)**

Configure Portabase with the following values. This example uses the dynamic `AUTH_OIDC_AUTHENTIK_` prefix to isolate the configuration.

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

**[Specific Endpoints (Optional)](#p-018)**

If automatic discovery doesn't work, you can manually specify the endpoints:

```
AUTH_OIDC_AUTHENTIK_DISCOVERY_ENDPOINT="https://authentik.your-domain.com//application/o/<authentik-slug>/.well-known/openid-configuration"
AUTH_OIDC_AUTHENTIK_JWKS_ENDPOINT="https://authentik.your-domain.com//application/o/<authentik-slug>/.well-known/jwks.json"
```

Last updated on

[

PocketID

Configuration guide for PocketID via OIDC in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/pocketid)[

OAuth2 Configuration

Understand the generic OAuth2 configuration in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/setup)

---

<a id="c-13"></a>

###### OAuth2

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-14"></a>

###### OAuth2 Configuration

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-019"></a>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oauth2/setup>

Portabase DashboardConfigurationAuthenticationOAuth2


Understand the generic OAuth2 configuration in Portabase.

Portabase supports dynamic addition of OAuth2 providers through a series of `AUTH_SOCIAL_*` variables. This page explains the general operation, available variables, and role management.

**[Quick Setup](#p-019)**

**[Enable a provider](#p-019)**

Define a Client ID and Client Secret pair for the provider of your choice (e.g., Google, GitHub).

**[Deploy](#p-019)**

Apply these environment variables to your Portabase instance.

**[Configure Callback](#p-019)**

Add the redirect URL in the provider's console: `https://<your-domain>/api/auth/callback/<providerId>`

**[Verify](#p-019)**

Test the connection from your dashboard login page.

**[Configure with the CLI](#p-019)**

If the dashboard was created with the [Portabase CLI](#p-088), add the provider with [`portabase dashboard auth add`](#p-097). Supported providers: `google`, `github`, `discord`, `apple`, `linkedin`, `x`, `reddit`.

```
portabase dashboard set ./my-dashboard url https://backup.example.com

printf '%s\n' "$GITHUB_SECRET" | portabase dashboard auth add ./my-dashboard oauth github \
  --client Iv1.0123456789 --secret-stdin --title "GitHub"

portabase restart ./my-dashboard
```

The command writes `AUTH_SOCIAL_<PROVIDER>_CLIENT`, `AUTH_SOCIAL_<PROVIDER>_SECRET` and `AUTH_SOCIAL_<PROVIDER>_TITLE`. Map roles with `portabase dashboard set ./my-dashboard role_map "admin:admin,default:user"`.

List and remove providers with [`portabase dashboard auth list`](#p-097) and [`portabase dashboard auth remove`](#p-097).

The CLI prints a callback URL ending in `/api/auth/sso/callback/<providerId>`. For OAuth2 providers, register the URL shown in [Quick Setup](#p-019) instead.

**[Configuration Variables](#p-019)**

You can configure a "default" provider via `AUTH_SOCIAL_*` or multiple providers via `AUTH_SOCIAL_<NAME>_*`.

Prop

Type

Linking a provider to an existing account is controlled by `AUTH_ALLOW_LINKING`, and a user's ability to detach it afterwards by `AUTH_ALLOW_UNLINKING`. Both are described in [Account Linking](#p-014).

**[Dynamic Providers](#p-019)**

To add multiple services, use the `AUTH_SOCIAL_<PROVIDER>_*` prefix. The `providerId` will be the lowercase version of the prefix.

```
# Example for Google
AUTH_SOCIAL_GOOGLE_CLIENT="xxx"
AUTH_SOCIAL_GOOGLE_SECRET="yyy"
AUTH_SOCIAL_GOOGLE_TITLE="Google Enterprise"
```

If you use standard names (`google`, `github`, `discord`, etc.), Portabase automatically applies the corresponding icon and brand color.

**[Role Management](#p-019)**

The `AUTH_ROLE_MAP` variable allows mapping your provider's groups/roles to Portabase's internal roles. It uses the format `remote_role:portabase_role`, separated by commas.

-   `admin:admin`: Maps the remote "admin" role to the local "admin" role.
-   `default:user`: Sets the default role if no match is found.

Full example: `admin:admin,editor:member,default:user`

**[Configuration Guides](#p-019)**

Choose a provider to see its specific configuration steps:

[

**Google**

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/google)[

**GitHub**

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/github)[

**Discord**

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/discord)[

**Apple**

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/apple)[

**LinkedIn**

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/linkedin)[

**X (Twitter)**

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/x)[

**Reddit**

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/reddit)

Last updated on

[

Authentik

Configuration guide for Authentik via OIDC in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oidc/examples/authentik)[

Google

Configure authentication via Google in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/google)

---

<a id="c-15"></a>

###### Configurations

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-020"></a>

###### Google

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/google>

Portabase DashboardConfigurationAuthenticationOAuth2Configurations


Configure authentication via Google in Portabase.

Google integration allows your users to sign-in via their Google or Google Workspace account.

Check the [OAuth2 configuration](#p-019) to understand global variables and role management.

**[Configuration Steps](#p-020)**

**[Project Creation](#p-020)**

Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project or select an existing one.

**[Consent Screen](#p-020)**

Go to **APIs & Services** > **OAuth consent screen**:

-   Choose the user type: **External** (any Google account) or **Internal** (restricted to your Workspace organization).
-   Complete the mandatory information (App name, email).

**[Credentials Creation](#p-020)**

Open **APIs & Services** > **Credentials**. Click **Create Credentials** > **OAuth client ID**. Select **Web application**.

**[Redirect URLs](#p-020)**

In **Authorized redirect URIs**, add the following URL: `https://portabase.your-domain.com/api/auth/callback/google`

**[Get the Keys](#p-020)**

Validate to get your **client ID** and **client secret**.

**[Environment Variables](#p-020)**

Add the following variables to your `.env` file or Docker configuration:

```
AUTH_SOCIAL_GOOGLE_CLIENT="your-google-client-id"
AUTH_SOCIAL_GOOGLE_SECRET="your-google-client-secret"
```

**[Restart the Dashboard](#p-020)**

After updating your `.env` file, restart the instance:

**Via CLI (Recommended)**

```
portabase restart .
```

**Via Docker Compose**

Last updated on

[

OAuth2 Configuration

Understand the generic OAuth2 configuration in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/setup)[

GitHub

Configure authentication via GitHub in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/github)

---

<a id="p-021"></a>

###### GitHub

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/github>

Portabase DashboardConfigurationAuthenticationOAuth2Configurations


Configure authentication via GitHub in Portabase.

GitHub integration allows developers and organization members to sign in easily.

Check the [OAuth2 configuration](#p-019) to understand global variables and role management.

**[Configuration Steps](#p-021)**

**[Access Developer Settings](#p-021)**

Log in to GitHub and go to [Developer Settings](https://github.com/settings/developers).

![GitHub Developer Settings](<../images/857491de-image.png>)

**[Register an Application](#p-021)**

Click **New OAuth App**:

-   **Application name**: Portabase.
    
-   **Homepage URL**: Your domain (e.g., `https://portabase.your-domain.com`).
    
-   **Authorization callback URL**: `https://portabase.your-domain.com/api/auth/callback/github`
    
    ![GitHub OAuth app creation](<../images/18b05ceb-image.png>)
    

**[Generate Keys](#p-021)**

Click **Register application**. Copy the **Client ID**, then generate a **Client Secret** and store it securely.

**[Environment Variables](#p-021)**

Use the `GITHUB` prefix for your variables:

```
AUTH_SOCIAL_GITHUB_CLIENT="your-github-client-id"
AUTH_SOCIAL_GITHUB_SECRET="your-github-client-secret"
```

**[Restart the Dashboard](#p-021)**

After updating your `.env` file, restart the instance:

**Via CLI (Recommended)**

```
portabase restart .
```

**Via Docker Compose**

Last updated on

[

Google

Configure authentication via Google in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/google)[

Discord

Configure authentication via Discord in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/discord)

---

<a id="p-022"></a>

###### Discord

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/discord>

Portabase DashboardConfigurationAuthenticationOAuth2Configurations


Configure authentication via Discord in Portabase.

Discord integration is ideal for communities and teams already using Discord for their communication.

Check the [OAuth2 configuration](#p-019) to understand global variables and role management.

**[Configuration Steps](#p-022)**

**[Create an Application](#p-022)**

Go to the [Discord Developer Portal](https://discord.com/developers/applications) and click **New Application**.

![GitHub Developer Settings](<../images/a7ee6d30-image.png>)

**[Configure OAuth2](#p-022)**

Go to the **OAuth2** > tab:

-   Add the redirect URL: `https://portabase.your-domain.com/api/auth/callback/discord`
    
    ![GitHub Developer Settings](<../images/7ce7201d-image.png>)
    

**[Select Permissions](#p-022)**

In **OAuth2** > **URL Generator**, select the `identify` and `email` scopes. These permissions are necessary to create the user account.

![GitHub Developer Settings](<../images/3b37f22e-image.png>)

**[Get Credentials](#p-022)**

Copy the **Client ID**. Click **Reset Secret** to get your **Client Secret**.

**[Environment Variables](#p-022)**

Add these lines to your configuration:

```
AUTH_SOCIAL_DISCORD_CLIENT="your-discord-client-id"
AUTH_SOCIAL_DISCORD_SECRET="your-discord-client-secret"
```

**[Restart the Dashboard](#p-022)**

After updating your `.env` file, restart the instance:

**Via CLI (Recommended)**

```
portabase restart .
```

**Via Docker Compose**

Last updated on

[

GitHub

Configure authentication via GitHub in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/github)[

Reddit

Configure authentication via Reddit in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/reddit)

---

<a id="p-023"></a>

###### Reddit

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/reddit>

Portabase DashboardConfigurationAuthenticationOAuth2Configurations


Configure authentication via Reddit in Portabase.

Reddit integration allows your users to sign in via their Reddit account, ideal for community platforms.

Check the [OAuth2 configuration](#p-019) to understand global variables and role management.

**[Configuration Steps](#p-023)**

**[Access Reddit Apps](#p-023)**

Log in to your account on [Reddit](https://www.reddit.com/) and go to [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps).

![Reddit - Authorized applications](<../images/ef7bf354-image.png>)

**[Create an Application](#p-023)**

At the bottom of the page, click **Create another app...**:

-   **Name**: Portabase.
    
-   Select **Web app**.
    
-   **Description**: Data management platform.
    
-   **Redirect URI**: `https://portabase.your-domain.com/api/auth/callback/reddit`
    
    ![Reddit - Create application](<../images/92ecdbce-image.png>)
    

**[Get Credentials](#p-023)**

After clicking **Create app**, you will see:

-   The **Client ID** (indicated just below the application name).
-   The **Client Secret** (indicated next to the secret field).

**[Environment Variables](#p-023)**

Use these variables to configure Reddit authentication:

```
AUTH_SOCIAL_REDDIT_CLIENT="your-reddit-client-id"
AUTH_SOCIAL_REDDIT_SECRET="your-reddit-client-secret"
```

**[Restart the Dashboard](#p-023)**

After updating your `.env` file, restart the instance:

**Via CLI (Recommended)**

```
portabase restart .
```

**Via Docker Compose**

Last updated on

[

Discord

Configure authentication via Discord in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/discord)[

LinkedIn

Configure authentication via LinkedIn in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/linkedin)

---

<a id="p-024"></a>

###### LinkedIn

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/linkedin>

Portabase DashboardConfigurationAuthenticationOAuth2Configurations


Configure authentication via LinkedIn in Portabase.

LinkedIn integration allows your users to sign in via their professional LinkedIn profile.

Check the [OAuth2 configuration](#p-019) to understand global variables and role management.

**[Configuration Steps](#p-024)**

**[Create a LinkedIn Application](#p-024)**

Go to the [LinkedIn Developer Portal](https://www.linkedin.com/developers/apps) and click **Create app**.

-   Fill in the name, organization (or personal profile), and your website URL.
    
-   Accept the terms of use.
    
    ![Reddit - Authorized applications](<../images/432aca37-image.png>)
    

**[Enable Sign In with LinkedIn Product](#p-024)**

In the **Products** tab, find **Sign In with LinkedIn** and click **Request access**. This is necessary to enable authentication.

**[Configure OAuth 2.0](#p-024)**

Go to the **Auth** tab:

-   In **Authorized redirect URLs for your app**, add: `https://portabase.your-domain.com/api/auth/callback/linkedin`

**[Get Credentials](#p-024)**

Still in the **Auth** tab, you will find your **Client ID** and **Client Secret**.

**[Environment Variables](#p-024)**

Use these variables to configure LinkedIn authentication:

```
AUTH_SOCIAL_LINKEDIN_CLIENT="your-linkedin-client-id"
AUTH_SOCIAL_LINKEDIN_SECRET="your-linkedin-client-secret"
```

**[Restart the Dashboard](#p-024)**

After updating your `.env` file, restart the instance:

**Via CLI (Recommended)**

```
portabase restart .
```

**Via Docker Compose**

Last updated on

[

Reddit

Configure authentication via Reddit in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/reddit)[

Apple

Configure authentication via Apple in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/apple)

---

<a id="p-025"></a>

###### Apple

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/apple>

Portabase DashboardConfigurationAuthenticationOAuth2Configurations


Configure authentication via Apple in Portabase.

Apple integration (Sign in with Apple) allows your users to sign in via their Apple account, offering a secure and privacy-respecting experience.

Sign in with Apple requires an **Apple Developer** account (paid program).

Check the [OAuth2 configuration](#p-019) to understand global variables and role management.

**[Configuration Steps](#p-025)**

**[Access Apple Developer Portal](#p-025)**

Log in to your account on the [Apple Developer Portal](https://developer.apple.com/account/).

**[Create an Identifier (Services ID)](#p-025)**

In **Certificates, Identifiers & Profiles** > **Identifiers**, create a new **Services ID**.

-   Select the **Services IDs** type.
-   Give a name and a unique identifier (e.g., `com.your-domain.portabase`).

**[Configure Sign In with Apple](#p-025)**

Enable **Sign In with Apple** for this Services ID and click **Configure**.

-   In **Primary App ID**, select your primary application or create one.
-   In **Domains and Subdomains**, add your domain (e.g., `portabase.your-domain.com`).
-   In **Return URLs**, add: `https://portabase.your-domain.com/api/auth/callback/apple`

**[Create an Authentication Key](#p-025)**

In **Keys**, create a new key.

-   Check **Sign In with Apple**.
-   Associate it with the previously created Services ID.
-   Download the `.p8` file (keep it, it is only downloadable once).

**[Get Information](#p-025)**

Note the following elements:

-   **Services ID** (your Client ID).
-   **Team ID** (visible in your Apple Developer profile).
-   **Key ID** (displayed in your key details).

**[Generate Client Secret](#p-025)**

Apple does not use a static secret but a signed JWT token. Use a script or your pipeline to generate this secret using your `.p8` file.

**[Environment Variables](#p-025)**

Add these variables to your configuration:

```
AUTH_SOCIAL_APPLE_CLIENT="your-apple-services-id"
AUTH_SOCIAL_APPLE_SECRET="your-apple-signed-jwt"
AUTH_SOCIAL_APPLE_APP_BUNDLE_IDENTIFIER="com.your-domain.portabase"
```

**[Restart the Dashboard](#p-025)**

After updating your `.env` file, restart the instance:

**Via CLI (Recommended)**

```
portabase restart .
```

**Via Docker Compose**

Last updated on

[

LinkedIn

Configure authentication via LinkedIn in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/linkedin)[

X (Twitter)

Configure authentication via X (formerly Twitter) in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/x)

---

<a id="p-026"></a>

###### X (Twitter)

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/x>

Portabase DashboardConfigurationAuthenticationOAuth2Configurations


Configure authentication via X (formerly Twitter) in Portabase.

Integration with X (Twitter) allows users to sign in via their social account.

Check the [OAuth2 configuration](#p-019) to understand global variables and role management.

**[Configuration Steps](#p-026)**

**[Create an Application](#p-026)**

Log in to the [Twitter Console](https://console.x.com/) and create a **Project** and an **App**.

![Reddit - Authorized applications](<../images/f5bff6a9-image.png>)

**[OAuth 2.0 Settings](#p-026)**

In **User authentication settings**, enable **OAuth 2.0** and choose the type **Web App, Automated App or Bot**.

**[URLs and Scopes](#p-026)**

-   **Callback URL**: `https://portabase.your-domain.com/api/auth/callback/x`
-   **Scopes**: Select at least `users.read` and `tweet.read`.

**[Credentials](#p-026)**

Save to get your **Client ID** and **Client Secret**.

**[Environment Variables](#p-026)**

You can use the `X` or `TWITTER` prefix depending on your preference (ensure the callback URL matches the lowercase version of the prefix).

```
AUTH_SOCIAL_X_CLIENT="your-x-client-id"
AUTH_SOCIAL_X_SECRET="your-x-client-secret"
```

**[Restart the Dashboard](#p-026)**

After updating your `.env` file, restart the instance:

**Via CLI (Recommended)**

```
portabase restart .
```

**Via Docker Compose**

Last updated on

[

Apple

Configure authentication via Apple in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/apple)[

User Guide

Manage your agents, databases, channels and backup policies on a daily basis.

](https://portabase.io/docs/dashboard/guide)

---

<a id="p-027"></a>

###### User Guide

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/guide>

Portabase Dashboard


Manage your agents, databases, channels and backup policies on a daily basis.

---

**[Understanding the Architecture](#p-027)**

Portabase runs as two separately deployed components.

**The Dashboard** centralizes configuration: agents, databases, backup schedules, retention, alerts and storage channels.

**The Agent** is a Rust binary installed on the same network as your databases. It is responsible for:

-   detecting and reporting your databases automatically
-   executing backups according to the defined schedule
-   sending backup files to your storage destinations
-   reporting logs and status back to the dashboard

The dashboard never connects directly to your databases. Everything goes through the agent. This architecture lets you protect databases on a private network or behind a firewall without exposing your servers.

![Dashboard → Agent → Databases architecture](<../images/74b8d6ea-image.png>)

The agent regularly sends a **ping** to the dashboard. This ping transmits the list of available databases, agent status and operation results. In return, the dashboard sends instructions (schedules, restore orders, etc.).

**[Entity Hierarchy](#p-027)**

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

**[Managing Agents](#p-027)**

An agent represents one instance of the Portabase Agent program deployed on a server. A single agent can manage multiple databases on the same server. If you have databases on multiple servers, create one agent per server.

**[Creating an Agent](#p-027)**

Prerequisite: you must be `owner` or `admin` of the organisation.

![Agents list page](<../images/9cd2c756-image.png>)

Go to **Organisation > Settings > Agents** and click **Add agent**.

Fill in the fields:

-   **Name** - human-readable identifier (e.g. `Production Server EU`, `Dev Machine`)
-   **Description** - free notes about this agent's role

![Create agent dialog](<../images/db8c39cd-image.png>)

Confirm. The agent is created and an **Edge Key** is generated automatically.

Copy the **Edge Key** from the agent detail page (button **Show Key**), then paste it into the Portabase Agent Rust configuration on your server.

![Registration & Setup panel with Edge Key](<../images/a4ea56f2-image.png>)

**[Verifying the Connection](#p-027)**

On next startup, the agent pings the dashboard. You'll know it's connected when:

-   the **Last Contact** column shows a recent timestamp
-   the status turns green in the interface

From the first ping, the agent transmits the list of all databases it can see. **These databases appear automatically in the dashboard - you don't need to create them manually.**

**[Monitoring Agent Health](#p-027)**

From the agent detail page, the **Health** tab shows a 12-hour ping history as a grid. Each cell represents one ping: green if received, red if missed.

![Agent health grid - 12h ping history](<../images/fb610142-image.png>)

---

**[Organising Databases with Projects](#p-027)**

A project is a **logical folder** for grouping databases. It has no effect on backup execution - it is purely an organisational tool.

Typical uses: group all databases for an application, separate production from staging, organise by team or client.

**[Creating a Project](#p-027)**

Prerequisite: you must be `owner` or `admin` of the organisation.

1.  Go to **Organisation > Projects**
2.  Click **New project**
3.  Give the project a name, choose databases and confirm

![Create project dialog](<../images/53e5f871-image.png>)

---

**[Configuring a Database](#p-027)**

**[How Databases Appear](#p-027)**

Databases are not created manually. They appear automatically as soon as the connected agent detects them via its ping.

If a database doesn't appear, check that:

-   the agent is connected (green status, recent **Last Contact**)
-   the database is accessible from the agent's server

**[Configuration Tabs](#p-027)**

From the database detail page (**Projects > \[project\] > \[database\]**):

| Tab | Content |
| --- | --- |
| **Overview** | KPIs, status, general information |
| **Backups** | Backup list, manual actions |
| **Restore** | Available restore operations |
| **Schedule** | Cron schedule + retention |
| **Alerts** | Alert policies |
| **Storage** | Storage policies |
| **Logs** | Detailed operation logs |

![Database header with navigation tabs](<../images/64d934d7-image.png>)

**[Triggering a Manual Backup](#p-027)**

From the **Backups** tab, click **Backup now**. The backup moves to `waiting` status, then `ongoing` as soon as the agent picks it up at the next ping.

![Backup now button](<../images/17446355-image.png>)

| Status | Meaning |
| --- | --- |
| `waiting` | Waiting to be picked up by the agent |
| `ongoing` | Currently running |
| `success` | Completed successfully |
| `failed` | Failed - check the **Logs** tab for details |

**[Importing an External Backup](#p-027)**

1.  From the **Backups** tab, click **Import**
2.  Drag and drop your file or browse your filesystem

![Import backup dialog](<../images/d966cdaa-image.png>)

**[Restoring a Database](#p-027)**

Restoration overwrites the current data in the target database. Make sure you have a recent backup before restoring. Restore is not available for Redis and Valkey.

From the **Restore** tab, two options:

-   **From an existing backup** - choose a backup from the list and click **Restore**
-   **From external storage** - select a file available in one of your storage channels

---

**[Configuring Channels](#p-027)**

Channels are connectors to external services, used in two contexts: **notifications** and **storage**. They are configured at the organisation level and can be reused across multiple databases.

**Notification channels**

**Creating a channel:**

1.  **Organisation > Notifications > Channels > Add channel**
2.  Choose the provider

![Choose notification provider](<../images/d200c24e-image.png>)

3.  Fill in the connection details
4.  Give the channel a recognisable name (e.g. `Slack #ops-alerts`)
5.  Test with the **Test** button
6.  Enable the channel

A disabled channel receives no notifications even if alert policies point to it. Use this flag to temporarily silence a channel without losing its configuration.

**Storage channels**

---

**[Setting Up Policies](#p-027)**

Policies are configured at the database level. A database can have multiple policies of different types.

**[Backup Schedule (cron)](#p-027)**

**Where to configure:** database detail page > **Schedule** tab

The schedule is a cron expression that defines when automatic backups run.

```
┌──────── minute (0–59)
│  ┌───── hour (0–23)
│  │  ┌── day of month (1–31)
│  │  │  ┌─ month (1–12)
│  │  │  │  ┌ day of week (0–7, 0 and 7 = Sunday)
│  │  │  │  │
*  *  *  *  *
```

| Expression | Result |
| --- | --- |
| `0 2 * * *` | Every day at 2 AM |
| `0 */6 * * *` | Every 6 hours |
| `0 2 * * 1` | Every Monday at 2 AM |
| `0 2 1 * *` | 1st of every month at 2 AM |

Need help building an expression? Use [crontab.guru](https://crontab.guru/?utm_source=portabase.io).

![Backup schedule configuration](<../images/c25704d3-image.png>)

To disable automatic backups, switch to **Manual** mode. You can still trigger backups manually from the **Backup now** button.

Deleting the schedule also deletes the associated retention policy. If you add a schedule later, you will need to reconfigure retention.

**[Retention Policy](#p-027)**

**Where to configure:** database detail page > **Schedule** tab > **Retention** section

**Prerequisite:** an active cron schedule must exist on the database.

**count**

Keeps only the N most recent backups. Older backups are deleted as new ones are created.

| Parameter | Min | Max | Default |
| --- | --- | --- | --- |
| Number of backups | 1 | 100 | 7 |

Ideal for development databases or when disk space is limited.

**days**

**gfs**

There can only be one retention policy per database. Creating a new one automatically replaces the existing one.

![Backup retention policy configuration](<../images/dba355be-image.png>)

**[Alert Policies](#p-027)**

**Where to configure:** database detail page > **Alerts** tab

**Prerequisite:** at least one notification channel must be configured and enabled.

| Event | When is it triggered? |
| --- | --- |
| `error_backup` | A backup fails |
| `success_backup` | A backup completes successfully |
| `error_restore` | A restore fails |
| `success_restore` | A restore completes successfully |
| `error_health_database` | The agent reports the database is no longer accessible |

The `weekly_report` event is not yet implemented. Want to help? See the [Contributing](#p-107) guide.

**Creating a policy:**

1.  **Alerts** tab > **Add policy**
2.  Select the target notification channel
3.  Check the events to monitor
4.  Enable and save

![Notification policies panel](<../images/81bf5619-image.png>)

You can create multiple policies on the same database, for example, Slack for errors and SMTP for successes. Each policy can be individually disabled without deleting it.

**[Storage Policies](#p-027)**

**Where to configure:** database detail page > **Storage** tab

**Prerequisite:** at least one storage channel must be configured and enabled.

**Creating a policy:**

1.  **Storage** tab > **Add policy**
2.  Select the target storage channel
3.  Enable and save

![Storage policies panel](<../images/94d6507b-image.png>)

You can create multiple storage policies on the same database. The backup file will be sent **simultaneously** to all active destinations.

From the **Backups** tab, each backup shows the send status per channel:

| Status | Meaning |
| --- | --- |
| `pending` | Waiting to be sent |
| `success` | Sent (path, size and checksum verified) |
| `failed` | Send failed for this channel |

---

**[Quick Reference](#p-027)**

| What you're looking for | Path |
| --- | --- |
| Create an agent | **Settings > Agents > Add agent** |
| View an agent's key | **Settings > Agents > \[agent\] > Show Key** |
| Create a project | **Projects > New project** |
| View an agent's databases | **Settings > Agents > \[agent\] > Databases** |
| Configure backup schedule | **Projects > \[project\] > \[database\] > Schedule** |
| Configure retention | **Projects > \[project\] > \[database\] > Schedule > Retention** |
| Configure alerts | **Projects > \[project\] > \[database\] > Alerts** |
| Configure backup storage | **Projects > \[project\] > \[database\] > Storage** |
| Add a notification channel | **Organisation > Notifications > Channels > Add channel** |
| Add a storage channel | **Organisation > Storages > Channels > Add channel** |
| Notification logs | **Organisation > Notifications > Logs** |
| Agent health | **Settings > Agents > \[agent\] > Health** |

---

[

**Configure Storage**

Local storage, S3, Google Drive, Azure Blob Storage.

](https://portabase.io/docs/dashboard/usage/storage/local)[

**Configure Notifications**

Slack, Discord, Telegram, Email and many more channels.

](https://portabase.io/docs/dashboard/usage/notifications/slack)

Last updated on

[

X (Twitter)

Configure authentication via X (formerly Twitter) in Portabase.

](https://portabase.io/docs/dashboard/configuration/auth/oauth2/configurations/x)[

Understanding the Architecture

Next Page

](https://portabase.io/docs/dashboard/guide#understanding-the-architecture)

---

<a id="c-16"></a>

###### Usage (How-to)

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-17"></a>

###### Storage

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-028"></a>

###### Local Storage

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/storage/local>

Portabase DashboardUsage (How-to)Storage


Store your backups directly on the dashboard server.

By default, Portabase is configured to use **Local Storage**. This means that backups sent by your agents are stored on the disk of the machine where the dashboard is running.

This method is ideal for:

-   Testing and discovery.
-   Small infrastructures.
-   Using a network mount (NFS, EFS) already attached to the server.

**[Data Persistence](#p-028)**

If you are using **Docker**, it is crucial to use a volume to ensure your backups are not lost when the container is restarted or updated.

The default `docker-compose.yml` provided by the CLI already includes a volume for the `data` folder:

```yaml title="docker-compose.yml"
services:
  portabase:
    # ...
    volumes:
      - portabase-data:/data
```

Backups are stored inside `/data/private/backups`.

Last updated on

[

Quick Reference

Previous Page

](https://portabase.io/docs/dashboard/guide#quick-reference)[

Object Storage (S3)

Configure external storage for your backups (MinIO, AWS, Scaleway...).

](https://portabase.io/docs/dashboard/usage/storage/s3)

---

<a id="p-029"></a>

###### Object Storage (S3)

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/storage/s3>

Portabase DashboardUsage (How-to)Storage


Configure external storage for your backups (MinIO, AWS, Scaleway...).

By default, Portabase stores backups on the local disk of the server. For production environments, we strongly recommend using external storage to:

-   Decouple storage from compute resources.
-   Benefit from virtually unlimited capacity.
-   Ensure data protection through the reliability of dedicated storage solutions.

---

**[Provider configuration (if self-hosted)](#p-029)**

**MinIO**

This adds a **MinIO** service to your Docker Compose stack, typically behind Traefik.

**[Docker Compose changes](#p-029)**

MinIO exposes two ports:

-   **9000**: S3 API (used by Portabase).
-   **9001**: Web Console (admin UI).

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

**[Configuration on the dashboard](#p-029)**

In **Storage > Channels**, click on **\+ Add Storage Channel** choose **S3**.

![Google Drive configuration](<../images/85c88281-image.png>)

Enter the credentials.

![Google Drive configuration](<../images/e81e4605-image.png>)

Click **Add Channel** to finalize the configuration.

---

**[Verification](#p-029)**

1.  Restart the dashboard:

**Via CLI (Recommended)**

```
portabase restart .
```

**Via Docker Compose**

2.  Log into the web UI.
3.  Trigger a manual backup on an agent.
4.  Check your bucket (or MinIO console) to confirm the backup file exists.

Last updated on

[

Local Storage

Store your backups directly on the dashboard server.

](https://portabase.io/docs/dashboard/usage/storage/local)[

Google Drive

Configure Google Drive as an external storage for your backups.

](https://portabase.io/docs/dashboard/usage/storage/google-drive)

---

<a id="p-030"></a>

###### Google Drive

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/storage/google-drive>

Portabase DashboardUsage (How-to)Storage


Configure Google Drive as an external storage for your backups.

By default, Portabase stores backups on the local disk of the Dashboard server. For production environments, we strongly recommend using external storage to:

-   Separate compute (Dashboard) from storage.
-   Benefit from virtually unlimited capacity.
-   Protect data if the Dashboard server is lost.

**[Creation of a new OAuth Client in the Google Cloud Console](#p-030)**

Navigate to [Google Cloud Console](https://console.cloud.google.com/).

2.  Open the sidebar menu and go to **API & Services > Credentials**.

![Google Cloud Console configuration](<../images/24dde0a7-image.png>)

Click **Create Credentials > OAuth Client ID**.

![Google Cloud Console configuration](<../images/9f4f387c-image.png>)

Select **Web Application** as the application type and configure the **Authorized JavaScript origins** and **Authorized redirect URIs** according to your domain.

![Google Cloud Console configuration](<../images/2afe06da-image.png>)

Click **Create**, then note the generated **Client ID** and **Client Secret**.

**[Configuration on the dashboard](#p-030)**

In **Storage > Channels**, click on **\+ Add Storage Channel** and choose **Google Drive**.

![Google Drive configuration](<../images/85c88281-image.png>)

Enter the credentials previously generated in the Google Cloud Console.

![Google Drive configuration](<../images/fffb1901-image.png>)

Click **Connect Google Drive** to initiate the OAuth 2.0 authentication flow.

Click **Add Channel** to finalize the configuration.

Last updated on

[

Object Storage (S3)

Configure external storage for your backups (MinIO, AWS, Scaleway...).

](https://portabase.io/docs/dashboard/usage/storage/s3)[

Azure Blob Storage

Configure Azure Blob Storage as an external storage for your backups.

](https://portabase.io/docs/dashboard/usage/storage/azure-blob-storage)

---

<a id="p-031"></a>

###### Azure Blob Storage

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/storage/azure-blob-storage>

Portabase DashboardUsage (How-to)Storage


Configure Azure Blob Storage as an external storage for your backups.

By default, Portabase stores backups on the local disk of the server. For production environments, we strongly recommend using external storage to:

-   Decouple storage from compute resources.
-   Benefit from virtually unlimited capacity.
-   Ensure data protection through the reliability of dedicated storage solutions.

---

**[Creation of a Storage Account and Container](#p-031)**

Navigate to the [Azure Portal](https://portal.azure.com/) and create a **Storage Account** (or use an existing one).

Inside the Storage Account, go to **Containers** and create a new container for your backups.

Go to **Access keys** and note the **Storage account name** and **Key**.

**[Configuration on the dashboard](#p-031)**

In **Storage > Channels**, click on **\+ Add Storage Channel** and choose **Azure Blob Storage**.

Enter the storage account name, key, and container name previously noted.

Click **Add Channel** to finalize the configuration.

---

**[Verification](#p-031)**

1.  Restart the dashboard:

```
portabase restart .
```

2.  Log into the web UI.
3.  Trigger a manual backup on an agent.
4.  Check your container in the Azure Portal to confirm the backup file exists.

Last updated on

[

Google Drive

Configure Google Drive as an external storage for your backups.

](https://portabase.io/docs/dashboard/usage/storage/google-drive)[

Google Cloud Storage

Configure Google Cloud Storage as an external storage for your backups.

](https://portabase.io/docs/dashboard/usage/storage/google-cloud-storage)

---

<a id="p-032"></a>

###### Google Cloud Storage

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/storage/google-cloud-storage>

Portabase DashboardUsage (How-to)Storage


Configure Google Cloud Storage as an external storage for your backups.

By default, Portabase stores backups on the local disk of the server. For production environments, we strongly recommend using external storage to:

-   Decouple storage from compute resources.
-   Benefit from virtually unlimited capacity.
-   Ensure data protection through the reliability of dedicated storage solutions.

---

**[Creation of a Service Account and Bucket](#p-032)**

Navigate to the [Google Cloud Console](https://console.cloud.google.com/) and select your project (or create a new one).

Go to **Cloud Storage > Buckets** and create a new bucket for your backups. Note the **bucket name**.

Go to **IAM & Admin > Service Accounts** and create a new service account.

Assign the **Storage Object Admin** role (`roles/storage.objectAdmin`) to the service account on the bucket.

In the service account details, go to **Keys > Add Key > Create new key** and select **JSON**. Download the generated key file.

**[Configuration on the dashboard](#p-032)**

In **Storage > Channels**, click on **\+ Add Storage Channel** and choose **Google Cloud Storage**.

Enter the bucket name and paste the content of the service account JSON key file.

Click **Add Channel** to finalize the configuration.

---

**[Verification](#p-032)**

1.  Restart the dashboard:

```
portabase restart .
```

2.  Log into the web UI.
3.  Trigger a manual backup on an agent.
4.  Check your bucket in the Google Cloud Console to confirm the backup file exists.

Last updated on

[

Azure Blob Storage

Configure Azure Blob Storage as an external storage for your backups.

](https://portabase.io/docs/dashboard/usage/storage/azure-blob-storage)[

SFTP

Configure an SFTP server as external storage for your backups.

](https://portabase.io/docs/dashboard/usage/storage/sftp)

---

<a id="p-033"></a>

###### SFTP

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/storage/sftp>

Portabase DashboardUsage (How-to)Storage


Configure an SFTP server as external storage for your backups.

Portabase can push backups to any server reachable over **SFTP** (SSH File Transfer Protocol). This is a good fit when you already have an SSH-accessible host (a NAS, a VPS, or a dedicated backup box) and want to keep backups on infrastructure you control.

**[Prerequisites](#p-033)**

-   An SFTP/SSH server reachable from the Dashboard.
-   A user account on that server with write access to the target directory.
-   Either a **password** or an **SSH private key** for that account.

**[Configuration on the dashboard](#p-033)**

In **Storage > Channels**, click **\+ Add Storage Channel** and choose **SFTP**.

Fill in the connection fields:

| Field | Required | Description |
| --- | --- | --- |
| **Channel Name** | Yes | A label for this channel in the dashboard (e.g. `SFTP Channel`). |
| **Host** | Yes | Hostname or IP of the SFTP server (e.g. `backup.example.com`). |
| **Port** | No | SSH port. Defaults to `22`. |
| **Username** | Yes | The SSH user (e.g. `deploy`). |
| **Password** | No | Account password. Provide a password or a private key (or both). |
| **Private key (PEM)** | No | The SSH private key in PEM/OpenSSH format, starting with `-----BEGIN OPENSSH PRIVATE KEY-----`. |
| **Remote path** | No | Optional prefix on the server. Backups are stored under `backups/YYYY-MM-DD/` beneath it. |

You must provide **a password or a private key** (or both). Key-based authentication is recommended.

Click **Test Storage** to verify the connection, then **Add Channel** to finalize.

---

**[Verification](#p-033)**

1.  Log into the web UI.
2.  Trigger a manual backup on an agent using this channel.
3.  Connect to the SFTP server and confirm the backup file exists under the remote path (`backups/YYYY-MM-DD/`).

Last updated on

[

Google Cloud Storage

Configure Google Cloud Storage as an external storage for your backups.

](https://portabase.io/docs/dashboard/usage/storage/google-cloud-storage)[

Rclone (any backend)

Use any rclone remote as external storage for your backups.

](https://portabase.io/docs/dashboard/usage/storage/rclone)

---

<a id="p-034"></a>

###### Rclone (any backend)

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/storage/rclone>

Portabase DashboardUsage (How-to)Storage


Use any rclone remote as external storage for your backups.

[Rclone](https://rclone.org/) supports 70+ storage backends. Configuring an **rclone** channel lets Portabase send backups to any of them (Backblaze B2, Dropbox, OneDrive, Wasabi, WebDAV, pCloud, and many more) by pasting a single remote definition from your `rclone.conf`.

**[Prerequisites](#p-034)**

-   A working rclone remote. Create one locally with `rclone config`, or write the section by hand.
-   The credentials for the target backend (keys, tokens, endpoint…).

**[Configuration on the dashboard](#p-034)**

In **Storage > Channels**, click **\+ Add Storage Channel** and choose **rclone (any backend)**.

Fill in the fields:

| Field | Required | Description |
| --- | --- | --- |
| **Channel Name** | Yes | A label for this channel in the dashboard. |
| **rclone config** | Yes | Paste **exactly one** `[section]` from your `rclone.conf`. The section header names the remote. |
| **Remote path** | No | Path within the remote (e.g. a bucket or folder name, `my-bucket`). |

Example rclone config for an S3-compatible backend:

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

Click **Test Storage** to verify the remote, then **Add Channel** to finalize.

---

**[Verification](#p-034)**

1.  Log into the web UI.
2.  Trigger a manual backup on an agent using this channel.
3.  Confirm the backup file appears in the remote backend under the remote path (`backups/YYYY-MM-DD/`).

Last updated on

[

SFTP

Configure an SFTP server as external storage for your backups.

](https://portabase.io/docs/dashboard/usage/storage/sftp)[

Slack

Receive backup notifications directly in a Slack channel.

](https://portabase.io/docs/dashboard/usage/notifications/slack)

---

<a id="c-18"></a>

###### Notification

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-035"></a>

###### Slack

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/slack>

Portabase DashboardUsage (How-to)Notification


Receive backup notifications directly in a Slack channel.

Portabase allows you to send real-time notifications to a Slack channel when a backup succeeds or fails.

**[Configuration on Slack API](#p-035)**

**[Create a Slack App](#p-035)**

1.  Go to [api.slack.com/apps](https://api.slack.com/apps).
2.  Click **Create New App** and select **From scratch**.
3.  Name your app (e.g., "Portabase Bot") and select your workspace.

**[Activate Incoming Webhooks](#p-035)**

1.  In the left sidebar, click on **Incoming Webhooks**.
2.  Toggle the switch to **On**.
3.  Click the **Add New Webhook to Workspace** button at the bottom.
4.  Select the channel where you want notifications to appear and click **Allow**.

**[Copy the Webhook URL](#p-035)**

You will see a URL that looks like this: `https://hooks.slack.com/services/<YOUR-WEBHOOK-PATH>`

Copy this URL.

**[Configuration on the dashboard](#p-035)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Slack**.

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the Slack webhook URL obtained earlier `https://hooks.slack.com/services/...` and click **Add Channel**.

![Slack channel configuration](<../images/6f301c29-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. Verify that a test message appears in the selected Slack channel.

Last updated on

[

Rclone (any backend)

Use any rclone remote as external storage for your backups.

](https://portabase.io/docs/dashboard/usage/storage/rclone)[

Email (SMTP)

Configure SMTP settings to receive alerts via email.

](https://portabase.io/docs/dashboard/usage/notifications/email)

---

<a id="p-036"></a>

###### Email (SMTP)

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/email>

Portabase DashboardUsage (How-to)Notification


Configure SMTP settings to receive alerts via email.

Email notifications are the most standard way to stay informed about your backups. To use them, you need to provide your own SMTP server credentials.

**[Configuration on the dashboard](#p-036)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Email**.

![Choose notification provider](<../images/ef21924f-image.png>)

-   **SMTP Host**: The address of your mail server (e.g., `smtp.gmail.com` or `smtp.sendgrid.net`).
-   **SMTP Port**: Usually `587` (TLS) or `465` (SSL).
-   **Username**: Your email account username.
-   **Password**: Your email account password or an App Password.
-   **From Address**: The email address that will appear as the sender (e.g., `noreply@yourdomain.com`).

If you are using Gmail, you likely need to generate an **App Password** in your Google Account security settings instead of using your main password.

![SMTP channel configuration](<../images/aeb28bed-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. Portabase will attempt to send a test email to the configured administrator email address.

Last updated on

[

Slack

Receive backup notifications directly in a Slack channel.

](https://portabase.io/docs/dashboard/usage/notifications/slack)[

Webhook

Send HTTP alerts to your systems or third-party services.

](https://portabase.io/docs/dashboard/usage/notifications/webhook)

---

<a id="p-037"></a>

###### Webhook

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/webhook>

Portabase DashboardUsage (How-to)Notification


Send HTTP alerts to your systems or third-party services.

Webhook notifications allow you to send HTTP (POST) requests to a URL of your choice when an event occurs. This is the ideal solution for connecting Portabase to automation tools or custom scripts.

**[Configuration on the dashboard](#p-037)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Webhook**.

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

-   **Webhook URL**: The URL that will receive the POST request.
-   **Header** (optional): HTTP headers to secure or identify your requests (for example, `Authorization` to provide an authentication token). By default, Portabase sends `X-Webhook-Secret`.

![Webhook channel configuration](<../images/22ad160c-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. Verify that your endpoint responds correctly.

Last updated on

[

Email (SMTP)

Configure SMTP settings to receive alerts via email.

](https://portabase.io/docs/dashboard/usage/notifications/email)[

Discord

Send alerts directly to your Discord channels.

](https://portabase.io/docs/dashboard/usage/notifications/discord)

---

<a id="p-038"></a>

###### Discord

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/discord>

Portabase DashboardUsage (How-to)Notification


Send alerts directly to your Discord channels.

Discord notifications use the platform's native Webhook system to post messages to a specific channel.

**[Discord server configuration](#p-038)**

In Discord, go to **Server Settings > Integrations > Webhooks**.

![Discord configuration](<../images/2d5d67c1-image.png>)

Create a new Webhook and copy its **URL**.

![Discord configuration](<../images/428b61e8-image.png>)

**[Configuration on the dashboard](#p-038)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Discord**.

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the Discord webhook URL obtained earlier (e.g., `https://discord.com/api/webhooks/...`) and click **Add Channel**.

![Discord channel configuration](<../images/aedfc105-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. Verify that a test message appears in the selected Discord channel.

Last updated on

[

Webhook

Send HTTP alerts to your systems or third-party services.

](https://portabase.io/docs/dashboard/usage/notifications/webhook)[

Telegram

Receive alerts via a Telegram bot.

](https://portabase.io/docs/dashboard/usage/notifications/telegram)

---

<a id="p-039"></a>

###### Telegram

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/telegram>

Portabase DashboardUsage (How-to)Notification


Receive alerts via a Telegram bot.

To receive notifications on Telegram, you need to create a bot and obtain its access token as well as the recipient chat ID.

**[Configuration of Telegram Bot](#p-039)**

Contact [@BotFather](https://t.me/botfather) on Telegram to create a new bot and get your **Token** (e.g., `123456:ABC-DEF1234...`).

Start a conversation with your bot (click "Start").

Retrieve your **Chat ID** (you can use a bot like `@userinfobot` to find it).

Warning

You need to grant the bot the proper permissions (administrator or at least the right to manage topics). Otherwise, an error will occur.

**[Configuration on the dashboard](#p-039)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Telegram**.

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

-   **Bot Token**: The token provided by BotFather.
-   **Chat ID**: The numeric identifier of the conversation or group.
-   **Topic ID** : The numeric identifier of the topic you want to monitor (optional, to filter notifications).

![Telegram channel configuration](<../images/4e19b91a-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. Your bot should send you a test message immediately.

Last updated on

[

Discord

Send alerts directly to your Discord channels.

](https://portabase.io/docs/dashboard/usage/notifications/discord)[

Ntfy

Push notifications via the Ntfy protocol (public server or self-hosted).

](https://portabase.io/docs/dashboard/usage/notifications/ntfy)

---

<a id="p-040"></a>

###### Ntfy

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/ntfy>

Portabase DashboardUsage (How-to)Notification


Push notifications via the Ntfy protocol (public server or self-hosted).

[Ntfy](https://ntfy.sh/) is a simple HTTP notification service. You can use the official public server or your own self-hosted instance.

**[Configuration on the dashboard](#p-040)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **ntfy.sh**.

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

-   **Server URL**: Your server address. Default: `https://ntfy.sh`.
-   **Topic**: The name of the topic to subscribe to (e.g., `my-project-alerts`).
-   **Token** (Optional): If your topic or server is protected by authentication.

If you use the public server `ntfy.sh`, be aware that topics are public if not protected. Choose a complex name or configure access rights.

![Ntfy channel configuration](<../images/88b02b5e-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. The message should appear instantly in your Ntfy interface or on your mobile.

Last updated on

[

Telegram

Receive alerts via a Telegram bot.

](https://portabase.io/docs/dashboard/usage/notifications/telegram)[

Gotify

Push notifications via your own Gotify server.

](https://portabase.io/docs/dashboard/usage/notifications/gotify)

---

<a id="p-041"></a>

###### Gotify

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/gotify>

Portabase DashboardUsage (How-to)Notification


Push notifications via your own Gotify server.

[Gotify](https://gotify.net/) is a simple server for sending and receiving messages in real-time (WebSocket).

**[Configuration on your Gotify instance](#p-041)**

1.  Log in to your Gotify instance.

2.  Create a new **Application** (e.g., "Portabase").

3.  Copy the **Token** generated for this application.

**[Configuration on the dashboard](#p-041)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Gotify**.

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

-   **Server URL**: The full URL of your Gotify instance (e.g., `https://gotify.yourdomain.com`).
-   **App Token**: The application token you just created.

![Gotify channel configuration](<../images/d36621d5-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. The message should appear instantly in your Gotify interface or on your mobile.

Last updated on

[

Ntfy

Push notifications via the Ntfy protocol (public server or self-hosted).

](https://portabase.io/docs/dashboard/usage/notifications/ntfy)[

Nextcloud Talk

Send notifications to a Nextcloud Talk conversation through a bot.

](https://portabase.io/docs/dashboard/usage/notifications/nextcloud-talk)

---

<a id="p-042"></a>

###### Nextcloud Talk

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/nextcloud-talk>

Portabase DashboardUsage (How-to)Notification


Send notifications to a Nextcloud Talk conversation through a bot.

[Nextcloud Talk](https://nextcloud.com/talk/) is the chat app of Nextcloud. Portabase posts its notifications in a conversation using a **Talk bot**.

**[Configuration on your Nextcloud instance](#p-042)**

Install a bot with the `response` feature, using a secret of 40 to 128 characters (e.g., generated with `openssl rand -hex 32`): `occ talk:bot:install --feature=response "Portabase" "<secret>" "https://portabase.example.com"`.

Get the bot ID with `occ talk:bot:list`, then enable the bot in the conversation that should receive the notifications: `occ talk:bot:setup <bot-id> <conversation-token>`.

Copy the **conversation token**: it is the last part of the conversation URL (e.g., `j3yujpuh` in `https://cloud.example.com/call/j3yujpuh`).

Bots require Nextcloud 27.1 and Talk 17.1 or later. The URL given to `occ talk:bot:install` is required by Nextcloud but is never called by Portabase.

**[Configuration on the dashboard](#p-042)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Nextcloud Talk**.

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

-   **Channel Name**: A label for this channel in Portabase.
-   **Nextcloud URL**: The full URL of your Nextcloud instance (e.g., `https://cloud.example.com`).
-   **Bot Token**: The token of the conversation where the bot is enabled (e.g., `j3yujpuh`).
-   **Bot Secret**: The secret used when installing the bot.

To test the configuration, click the channel's edit icon, then click **Test Channel**. The message should appear in your Talk conversation, posted by the bot.

Last updated on

[

Gotify

Push notifications via your own Gotify server.

](https://portabase.io/docs/dashboard/usage/notifications/gotify)[

Pushover

Send push notifications to your devices via Pushover.

](https://portabase.io/docs/dashboard/usage/notifications/pushover)

---

<a id="p-043"></a>

###### Pushover

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/pushover>

Portabase DashboardUsage (How-to)Notification


Send push notifications to your devices via Pushover.

[Pushover](https://pushover.net/) is a service for sending real-time push notifications to your phone, tablet, or desktop.

**[Creation of an application on Pushover](#p-043)**

Log in to your [Pushover](https://pushover.net/) account.

Go to **Create an Application/API Token** and register a new application (e.g., "Portabase").

Copy the generated **API Token/Key**.

On your Pushover dashboard, copy your **User Key** (top right of the page).

**[Configuration on the dashboard](#p-043)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Pushover**.

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

-   **Channel Name**: A label for this channel in Portabase.
-   **User Key**: Your personal User Key, or your **Group Key** to notify a team.
-   **App API Token**: The application token created above.
-   **Message Priority** (Optional): Emergency priority repeats every 60 seconds until acknowledged, for at most one hour.
-   **Device Name** (Optional): Target one registered device. Leave it empty to send to all of them.

Then click **Add Channel**.

![Pushover channel configuration](<../images/e1c9edbb-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. The message should appear instantly on your device(s).

Last updated on

[

Nextcloud Talk

Send notifications to a Nextcloud Talk conversation through a bot.

](https://portabase.io/docs/dashboard/usage/notifications/nextcloud-talk)[

Microsoft Teams

Send alerts directly to your Microsoft Teams channels.

](https://portabase.io/docs/dashboard/usage/notifications/ms-teams)

---

<a id="p-044"></a>

###### Microsoft Teams

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/ms-teams>

Portabase DashboardUsage (How-to)Notification


Send alerts directly to your Microsoft Teams channels.

Microsoft Teams notifications use an **Incoming Webhook** connector to post messages to a specific channel.

**[Microsoft Teams configuration](#p-044)**

In Teams, go to the channel you want to notify, then **Channel options > Connectors** (or **Workflows** depending on your tenant).

Add an **Incoming Webhook** connector, give it a name (e.g., "Portabase"), and copy the generated **Webhook URL**.

**[Configuration on the dashboard](#p-044)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Microsoft Teams**.

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

-   **Channel Name**: A label for this channel in Portabase.
-   **Teams Webhook URL**: The webhook URL obtained earlier.

Then click **Add Channel**.

![Microsoft Teams channel configuration](<../images/5d87469a-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. Verify that a test message appears in the selected Teams channel.

Last updated on

[

Pushover

Send push notifications to your devices via Pushover.

](https://portabase.io/docs/dashboard/usage/notifications/pushover)[

Apprise

Send notifications to 100+ services through your own Apprise API server.

](https://portabase.io/docs/dashboard/usage/notifications/apprise)

---

<a id="p-045"></a>

###### Apprise

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/apprise>

Portabase DashboardUsage (How-to)Notification


Send notifications to 100+ services through your own Apprise API server.

[Apprise](https://github.com/caronc/apprise) is a notification gateway that relays a single message to 100+ services (Discord, Telegram, Slack, email, ntfy, Gotify, and many more). Portabase talks to a self-hosted [Apprise API](https://github.com/caronc/apprise-api) server using a **persistent configuration**.

**[Configuration on your Apprise API server](#p-045)**

Run an Apprise API instance (for example the `caronc/apprise` Docker image) and note its base URL (e.g., `http://localhost:8000`).

Register a **persistent configuration** under a key of your choice. Portabase sends to `POST /notify/{key}`, so this key must exist on the server. Add the target service URLs (Discord, Telegram, etc.) to that configuration.

Copy the **config key** you chose (e.g., `my-alerts`).

Portabase does not store the destination service URLs. They live in the persistent configuration on your Apprise server; Portabase only references it by its config key.

**[Configuration on the dashboard](#p-045)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Apprise**.

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

-   **Channel Name**: A label for this channel in Portabase.
-   **Apprise Server URL**: The base URL of your Apprise API server (e.g., `http://localhost:8000`).
-   **Config Key**: The persistent config key registered on your server (e.g., `my-alerts`).
-   **Custom Headers** (Optional): Add headers if your server sits behind a reverse proxy or basic auth (e.g., `Authorization`).

![Apprise channel configuration](<../images/923f42cf-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. The message should be relayed to every service in your Apprise configuration.

Last updated on

[

Microsoft Teams

Send alerts directly to your Microsoft Teams channels.

](https://portabase.io/docs/dashboard/usage/notifications/ms-teams)[

Healthchecks.io

Monitor your backups with a dead man's switch and get alerted when a backup stops running.

](https://portabase.io/docs/dashboard/usage/notifications/healthchecks)

---

<a id="p-046"></a>

###### Healthchecks.io

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/usage/notifications/healthchecks>

Portabase DashboardUsage (How-to)Notification


Monitor your backups with a dead man's switch and get alerted when a backup stops running.

[Healthchecks.io](https://healthchecks.io/) watches for pings that are supposed to arrive on a schedule. If a ping does not arrive in time, it alerts you.

This flips the usual notification model. Slack or Discord tell you when a backup *fails*; Healthchecks tells you when a backup **stops happening at all** — a crashed agent, a paused schedule, a container that never restarted. Those silent failures are the ones you notice too late.

Healthchecks.io is open source. These steps apply to the hosted service and to a self-hosted instance alike — only the ping server URL differs.

**[Choosing between a check UUID and a project ping key](#p-046)**

Portabase can address your checks in two ways. Pick one before configuring the channel.

|  | Check UUID | Project ping key |
| --- | --- | --- |
| Pings | one single check | any check, addressed by slug |
| Channels needed | one per check | one for every database |
| Where to find it | on the check's page | in your project settings |

**[Configuration on Healthchecks](#p-046)**

Create a check and give it a name, for example `portabase-production`.

Set the **Period** to the interval between two backups, and the **Grace Time** to how long a backup may be late before you want to be alerted. A daily backup that takes about twenty minutes fits a period of 1 day and a grace time of 1 hour.

Copy the check's **UUID**, or, if you plan to cover several databases from one channel, copy the **ping key** from your project settings instead.

**[Configuration on the dashboard](#p-046)**

Go to **Notifications > Channels**, click on **\+ Add Notification Channel**, and choose **Healthchecks.io**.

![Choose notification provider](<../images/ef21924f-image.png>)

Enter the following information:

-   **Channel Name**: A label for this channel in Portabase.
-   **Ping Server URL**: Leave `https://hc-ping.com` as is for the hosted service, or point it at your self-hosted instance.
-   **Check UUID or Ping Key**: The check UUID, or the project ping key when you want to address checks by slug.
-   **Use database name as slug** (Optional): One channel for every database — the slug is derived from the database name of each event. Requires a project ping key, not a check UUID.
-   **Slug** (Optional): The slug to ping. Leave it empty when the field above holds a check UUID.
-   **Create missing checks** (Optional): Adds `?create=1` so a slug with no matching check is created on its first ping. Ignored when pinging a check UUID.

Then click **Add Channel**.

![Healthchecks.io channel configuration](<../images/13baf84e-image.png>)

To test the configuration, click the channel's edit icon, then click **Test Channel**. The check should turn green in Healthchecks within a few seconds.

Treat the check UUID and the project ping key like passwords. Anyone who has them can mark your checks as up and hide a real outage.

Last updated on

[

Apprise

Send notifications to 100+ services through your own Apprise API server.

](https://portabase.io/docs/dashboard/usage/notifications/apprise)[

API Introduction

Get started with the Portabase REST API for database and agent management.

](https://portabase.io/docs/dashboard/api/introduction)

---

<a id="c-19"></a>

###### API

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-20"></a>

###### API Introduction

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-047"></a>

> 來源：<https://portabase.io/docs/dashboard/api/introduction>

Portabase DashboardAPI


Get started with the Portabase REST API for database and agent management.

The Portabase dashboard exposes a REST API for programmatic management of databases and agents. Swagger UI and the OpenAPI specification are also available.

**[Enable the API](#p-047)**

Set the following environment variables in your dashboard configuration:

```
API_ENABLED=true
OPENAPI_ENABLED=true
```

-   `API_ENABLED=true` : enables all API routes under `/api/v1`.
-   `OPENAPI_ENABLED=true` : enables the OpenAPI specification and Swagger UI. The API must also be enabled for this to work.

**[API Documentation](#p-047)**

Once enabled:

| Resource | URL |
| --- | --- |
| Swagger UI | `/api/v1/docs` |
| OpenAPI specification | `/api/v1/openapi` |

**[Authentication](#p-047)**

To create an API token:

1.  Go to your **Profile** in the dashboard.
2.  Open the **Account** tab.
3.  In the **API Token** section, generate a new token.

Tokens are user-level, all API actions inherit the permissions of the associated user.

Use the `x-api-key` header to authenticate your requests:

```yaml
GET /api/v1/databases
x-api-key: <your-token>
```

API coverage is being extended. Check the [roadmap](https://github.com/orgs/Portabase/projects/1) for upcoming endpoints.

Last updated on

[

Healthchecks.io

Monitor your backups with a dead man's switch and get alerted when a backup stops running.

](https://portabase.io/docs/dashboard/usage/notifications/healthchecks)[

List agents GET

Next Page

](https://portabase.io/docs/dashboard/api/agents/get)

---

<a id="c-21"></a>

###### Agents

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-048"></a>

###### List agents

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/agents/get>

Portabase DashboardAPIAgents


**[Authorization](#p-048)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Response Body](#p-048)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

```bash
curl -X GET "https://example.com/agents"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

**200**

```json
{  "data": [    {      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",      "slug": "string",      "version": "string",      "name": "string",      "healthErrorCount": -2147483648,      "description": "string",      "isArchived": true,      "lastContact": "2019-08-24T14:15:22Z",      "organizationId": "7bc05553-4b68-44e8-b7bc-37be63c6d9e9",      "updatedAt": "2019-08-24T14:15:22Z",      "createdAt": "2019-08-24T14:15:22Z",      "deletedAt": "2019-08-24T14:15:22Z"    }  ]}
```

**401**

**500**

[

API Introduction

Get started with the Portabase REST API for database and agent management.

](https://portabase.io/docs/dashboard/api/introduction)[

Create an agent POST

Next Page

](https://portabase.io/docs/dashboard/api/agents/post)

---

<a id="p-049"></a>

###### Create an agent

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/agents/post>

Portabase DashboardAPIAgents


**[Authorization](#p-049)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Request Body](#p-049)**

`application/json`

TypeScript Definitions

Use the request body type in TypeScript.

**[Response Body](#p-049)**

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

```bash
curl -X POST "https://example.com/agents" \  -H "Content-Type: application/json" \  -d '{    "name": "my-agent"  }'
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

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

Previous Page

](https://portabase.io/docs/dashboard/api/agents/get)[

Get agent by ID GET

Next Page

](https://portabase.io/docs/dashboard/api/agents/id/get)

---

<a id="p-050"></a>

###### Get agent by ID

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/agents/id/get>

Portabase DashboardAPIAgents


**[Authorization](#p-050)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-050)**

id\*string

Format`uuid`

**[Response Body](#p-050)**

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

```bash
curl -X GET "https://example.com/agents/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

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

Previous Page

](https://portabase.io/docs/dashboard/api/agents/post)[

Delete agent DELETE

Next Page

](https://portabase.io/docs/dashboard/api/agents/id/delete)

---

<a id="p-051"></a>

###### Delete agent

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/agents/id/delete>

Portabase DashboardAPIAgents


**[Authorization](#p-051)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-051)**

id\*string

Format`uuid`

**[Response Body](#p-051)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

```bash
curl -X DELETE "https://example.com/agents/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

**204**

Empty

**401**

**403**

**404**

**500**

[

Get agent by ID GET

Previous Page

](https://portabase.io/docs/dashboard/api/agents/id/get)[

Get agent edge key GET

Next Page

](https://portabase.io/docs/dashboard/api/agents/id/key/get)

---

<a id="p-052"></a>

###### Get agent edge key

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/agents/id/key/get>

Portabase DashboardAPIAgents


**[Authorization](#p-052)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-052)**

id\*string

Format`uuid`

**[Response Body](#p-052)**

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

```bash
curl -X GET "https://example.com/agents/123e4567-e89b-12d3-a456-426614174000/key"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

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

Previous Page

](https://portabase.io/docs/dashboard/api/agents/id/delete)[

List databases GET

Next Page

](https://portabase.io/docs/dashboard/api/databases/get)

---

<a id="c-22"></a>

###### Databases

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-053"></a>

###### List databases

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/get>

Portabase DashboardAPIDatabases


**[Authorization](#p-053)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Response Body](#p-053)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

```bash
curl -X GET "https://example.com/databases"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

**200**

```json
{  "data": [    {      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",      "agentDatabaseId": "78f4c143-eccc-413e-8e8a-868364d45b73",      "name": "string",      "dbms": "postgresql",      "description": "string",      "backupPolicy": "string",      "isWaitingForBackup": true,      "backupToRestore": "string",      "healthErrorCount": -2147483648,      "agentId": "bc309ecf-5f66-4057-93c5-6611cc9cb7b2",      "lastContact": "2019-08-24T14:15:22Z",      "projectId": "5a8591dd-4039-49df-9202-96385ba3eff8",      "updatedAt": "2019-08-24T14:15:22Z",      "createdAt": "2019-08-24T14:15:22Z",      "deletedAt": "2019-08-24T14:15:22Z"    }  ]}
```

**401**

**500**

[

Get agent edge key GET

Previous Page

](https://portabase.io/docs/dashboard/api/agents/id/key/get)[

Get database by ID GET

Next Page

](https://portabase.io/docs/dashboard/api/databases/id/get)

---

<a id="p-054"></a>

###### Get database by ID

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/id/get>

Portabase DashboardAPIDatabases


**[Authorization](#p-054)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-054)**

id\*string

Format`uuid`

**[Response Body](#p-054)**

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

```bash
curl -X GET "https://example.com/databases/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

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

Previous Page

](https://portabase.io/docs/dashboard/api/databases/get)[

Attach the database to a project, or detach it (projectId: null) PATCH

Next Page

](https://portabase.io/docs/dashboard/api/databases/id/patch)

---

<a id="p-055"></a>

###### Attach the database to a project, or detach it (projectId null)

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/id/patch>

Portabase DashboardAPIDatabases

**Attach the database to a project, or detach it (projectId: null)**

**[Authorization](#p-055)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-055)**

id\*string

Format`uuid`

**[Request Body](#p-055)**

`application/json`

TypeScript Definitions

Use the request body type in TypeScript.

**[Response Body](#p-055)**

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

```bash
curl -X PATCH "https://example.com/databases/123e4567-e89b-12d3-a456-426614174000" \  -H "Content-Type: application/json" \  -d '{    "projectId": "5a8591dd-4039-49df-9202-96385ba3eff8"  }'
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

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

Previous Page

](https://portabase.io/docs/dashboard/api/databases/id/get)[

Get database status GET

Next Page

](https://portabase.io/docs/dashboard/api/databases/id/status/get)

---

<a id="p-056"></a>

###### Get database status

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/id/status/get>

Portabase DashboardAPIDatabases


**[Authorization](#p-056)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-056)**

id\*string

Format`uuid`

**[Response Body](#p-056)**

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

```bash
curl -X GET "https://example.com/databases/123e4567-e89b-12d3-a456-426614174000/status"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

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

Previous Page

](https://portabase.io/docs/dashboard/api/databases/id/patch)[

List backups for a database GET

Next Page

](https://portabase.io/docs/dashboard/api/databases/id/backup/get)

---

<a id="p-057"></a>

###### List backups for a database

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/id/backup/get>

Portabase DashboardAPIDatabases


**[Authorization](#p-057)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-057)**

id\*string

Format`uuid`

**[Response Body](#p-057)**

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

```bash
curl -X GET "https://example.com/databases/123e4567-e89b-12d3-a456-426614174000/backup"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

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

Previous Page

](https://portabase.io/docs/dashboard/api/databases/id/status/get)[

Trigger a backup for a database POST

Next Page

](https://portabase.io/docs/dashboard/api/databases/id/backup/post)

---

<a id="p-058"></a>

###### Trigger a backup for a database

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/id/backup/post>

Portabase DashboardAPIDatabases


**[Authorization](#p-058)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-058)**

id\*string

Format`uuid`

**[Response Body](#p-058)**

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

```bash
curl -X POST "https://example.com/databases/123e4567-e89b-12d3-a456-426614174000/backup"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

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

Previous Page

](https://portabase.io/docs/dashboard/api/databases/id/backup/get)[

Get a specific backup with storage details GET

Next Page

](https://portabase.io/docs/dashboard/api/databases/id/backup/backupid/get)

---

<a id="p-059"></a>

###### Get a specific backup with storage details

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/id/backup/backupid/get>

Portabase DashboardAPIDatabases


**[Authorization](#p-059)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-059)**

id\*string

Format`uuid`

backupId\*string

Format`uuid`

**[Response Body](#p-059)**

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

```bash
curl -X GET "https://example.com/databases/123e4567-e89b-12d3-a456-426614174000/backup/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

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

Previous Page

](https://portabase.io/docs/dashboard/api/databases/id/backup/post)[

Set or clear the backup schedule for a database PUT

Next Page

](https://portabase.io/docs/dashboard/api/databases/id/backup-policy/put)

---

<a id="p-060"></a>

###### Set or clear the backup schedule for a database

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/id/backup-policy/put>

Portabase DashboardAPIDatabases


**[Authorization](#p-060)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-060)**

id\*string

Format`uuid`

**[Request Body](#p-060)**

`application/json`

TypeScript Definitions

Use the request body type in TypeScript.

**[Response Body](#p-060)**

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

```bash
curl -X PUT "https://example.com/databases/123e4567-e89b-12d3-a456-426614174000/backup-policy" \  -H "Content-Type: application/json" \  -d '{    "backupPolicy": "string"  }'
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

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

Previous Page

](https://portabase.io/docs/dashboard/api/databases/id/backup/backupid/get)[

Restore a database from a backup POST

Next Page

](https://portabase.io/docs/dashboard/api/databases/id/restore/post)

---

<a id="p-061"></a>

###### Restore a database from a backup

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/databases/id/restore/post>

Portabase DashboardAPIDatabases


**[Authorization](#p-061)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-061)**

id\*string

Format`uuid`

**[Request Body](#p-061)**

`application/json`

TypeScript Definitions

Use the request body type in TypeScript.

**[Response Body](#p-061)**

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

```bash
curl -X POST "https://example.com/databases/123e4567-e89b-12d3-a456-426614174000/restore" \  -H "Content-Type: application/json" \  -d '{    "backupId": "eb7cea43-10b2-42dd-8819-ab9aed37565f",    "backupStorageId": "a2051789-953f-432f-bf4f-6939c87a32b9"  }'
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

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

Previous Page

](https://portabase.io/docs/dashboard/api/databases/id/backup-policy/put)[

List organizations for the current user GET

Next Page

](https://portabase.io/docs/dashboard/api/organizations/get)

---

<a id="c-23"></a>

###### Organizations

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-062"></a>

###### List organizations for the current user

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/get>

Portabase DashboardAPIOrganizations


**[Authorization](#p-062)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Response Body](#p-062)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

```bash
curl -X GET "https://example.com/organizations"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

**200**

```json
{  "data": [    {      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",      "name": "string",      "slug": "string",      "logo": "string",      "metadata": "string",      "updatedAt": "2019-08-24T14:15:22Z",      "createdAt": "2019-08-24T14:15:22Z",      "deletedAt": "2019-08-24T14:15:22Z"    }  ]}
```

**401**

**500**

[

Restore a database from a backup POST

Previous Page

](https://portabase.io/docs/dashboard/api/databases/id/restore/post)[

Create an organization POST

Next Page

](https://portabase.io/docs/dashboard/api/organizations/post)

---

<a id="p-063"></a>

###### Create an organization

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/post>

Portabase DashboardAPIOrganizations


**[Authorization](#p-063)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Request Body](#p-063)**

`application/json`

TypeScript Definitions

Use the request body type in TypeScript.

**[Response Body](#p-063)**

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

```bash
curl -X POST "https://example.com/organizations" \  -H "Content-Type: application/json" \  -d '{    "name": "Acme Inc"  }'
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

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

Previous Page

](https://portabase.io/docs/dashboard/api/organizations/get)[

Get organization by ID GET

Next Page

](https://portabase.io/docs/dashboard/api/organizations/id/get)

---

<a id="p-064"></a>

###### Get organization by ID

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/id/get>

Portabase DashboardAPIOrganizations


**[Authorization](#p-064)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-064)**

id\*string

Format`uuid`

**[Response Body](#p-064)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

```bash
curl -X GET "https://example.com/organizations/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

**200**

```json
{  "data": {    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",    "name": "string",    "slug": "string",    "logo": "string",    "metadata": "string",    "updatedAt": "2019-08-24T14:15:22Z",    "createdAt": "2019-08-24T14:15:22Z",    "deletedAt": "2019-08-24T14:15:22Z"  }}
```

**401**

**404**

**500**

[

Create an organization POST

Previous Page

](https://portabase.io/docs/dashboard/api/organizations/post)[

Delete an organization DELETE

Next Page

](https://portabase.io/docs/dashboard/api/organizations/id/delete)

---

<a id="p-065"></a>

###### Delete an organization

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/id/delete>

Portabase DashboardAPIOrganizations


**[Authorization](#p-065)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-065)**

id\*string

Format`uuid`

**[Response Body](#p-065)**

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

```bash
curl -X DELETE "https://example.com/organizations/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

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

Previous Page

](https://portabase.io/docs/dashboard/api/organizations/id/get)[

List projects for an organization GET

Next Page

](https://portabase.io/docs/dashboard/api/organizations/id/projects/get)

---

<a id="p-066"></a>

###### List projects for an organization

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/id/projects/get>

Portabase DashboardAPIOrganizations


**[Authorization](#p-066)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-066)**

id\*string

Format`uuid`

**[Response Body](#p-066)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

```bash
curl -X GET "https://example.com/organizations/123e4567-e89b-12d3-a456-426614174000/projects"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

**200**

```json
{  "data": [    null  ]}
```

**401**

**404**

**500**

[

Delete an organization DELETE

Previous Page

](https://portabase.io/docs/dashboard/api/organizations/id/delete)[

Create a project in an organization POST

Next Page

](https://portabase.io/docs/dashboard/api/organizations/id/projects/post)

---

<a id="p-067"></a>

###### Create a project in an organization

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/id/projects/post>

Portabase DashboardAPIOrganizations


**[Authorization](#p-067)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-067)**

id\*string

Format`uuid`

**[Request Body](#p-067)**

`application/json`

TypeScript Definitions

Use the request body type in TypeScript.

**[Response Body](#p-067)**

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

```bash
curl -X POST "https://example.com/organizations/123e4567-e89b-12d3-a456-426614174000/projects" \  -H "Content-Type: application/json" \  -d '{    "name": "my-project"  }'
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

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

Previous Page

](https://portabase.io/docs/dashboard/api/organizations/id/projects/get)[

List agents attached to an organization GET

Next Page

](https://portabase.io/docs/dashboard/api/organizations/id/agents/get)

---

<a id="p-068"></a>

###### List agents attached to an organization

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/id/agents/get>

Portabase DashboardAPIOrganizations


**[Authorization](#p-068)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-068)**

id\*string

Format`uuid`

**[Response Body](#p-068)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

```bash
curl -X GET "https://example.com/organizations/123e4567-e89b-12d3-a456-426614174000/agents"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

**200**

```json
{  "data": [    null  ]}
```

**401**

**404**

**500**

[

Create a project in an organization POST

Previous Page

](https://portabase.io/docs/dashboard/api/organizations/id/projects/post)[

Attach an agent to an organization POST

Next Page

](https://portabase.io/docs/dashboard/api/organizations/id/agents/post)

---

<a id="p-069"></a>

###### Attach an agent to an organization

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/id/agents/post>

Portabase DashboardAPIOrganizations


**[Authorization](#p-069)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-069)**

id\*string

Format`uuid`

**[Request Body](#p-069)**

`application/json`

TypeScript Definitions

Use the request body type in TypeScript.

**[Response Body](#p-069)**

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

```bash
curl -X POST "https://example.com/organizations/123e4567-e89b-12d3-a456-426614174000/agents" \  -H "Content-Type: application/json" \  -d '{    "agentId": "bc309ecf-5f66-4057-93c5-6611cc9cb7b2"  }'
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

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

Previous Page

](https://portabase.io/docs/dashboard/api/organizations/id/agents/get)[

Detach an agent from an organization DELETE

Next Page

](https://portabase.io/docs/dashboard/api/organizations/id/agents/agentid/delete)

---

<a id="p-070"></a>

###### Detach an agent from an organization

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/organizations/id/agents/agentid/delete>

Portabase DashboardAPIOrganizations


**[Authorization](#p-070)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-070)**

id\*string

Format`uuid`

agentId\*string

Format`uuid`

**[Response Body](#p-070)**

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

```bash
curl -X DELETE "https://example.com/organizations/123e4567-e89b-12d3-a456-426614174000/agents/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

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

Previous Page

](https://portabase.io/docs/dashboard/api/organizations/id/agents/post)[

Get project by ID GET

Next Page

](https://portabase.io/docs/dashboard/api/projects/id/get)

---

<a id="c-24"></a>

###### Projects

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-071"></a>

###### Get project by ID

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/projects/id/get>

Portabase DashboardAPIProjects


**[Authorization](#p-071)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-071)**

id\*string

Format`uuid`

**[Response Body](#p-071)**

### 

`application/json`

### 

`application/json`

### 

`application/json`

### 

`application/json`

**cURL**

```bash
curl -X GET "https://example.com/projects/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

**200**

```json
{  "data": {    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",    "slug": "string",    "name": "string",    "isArchived": true,    "organizationId": "7bc05553-4b68-44e8-b7bc-37be63c6d9e9",    "updatedAt": "2019-08-24T14:15:22Z",    "createdAt": "2019-08-24T14:15:22Z",    "deletedAt": "2019-08-24T14:15:22Z"  }}
```

**401**

**404**

**500**

[

Detach an agent from an organization DELETE

Previous Page

](https://portabase.io/docs/dashboard/api/organizations/id/agents/agentid/delete)[

Archive (soft-delete) a project DELETE

Next Page

](https://portabase.io/docs/dashboard/api/projects/id/delete)

---

<a id="p-072"></a>

###### Archive (soft-delete) a project

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/api/projects/id/delete>

Portabase DashboardAPIProjects


**[Authorization](#p-072)**

`apiKeyAuth`

x-api-key<token>

API key generated from the Portabase dashboard. Pass as the x-api-key header.

In: `header`

**[Path Parameters](#p-072)**

id\*string

Format`uuid`

**[Response Body](#p-072)**

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

```bash
curl -X DELETE "https://example.com/projects/123e4567-e89b-12d3-a456-426614174000"
```

**JavaScript**

**Go**

**Python**

**Java**

**C#**

**Rust**

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

Previous Page

](https://portabase.io/docs/dashboard/api/projects/id/get)[

MCP Server

Connect AI assistants to Portabase via the Model Context Protocol (MCP) server.

](https://portabase.io/docs/dashboard/mcp/introduction)

---

<a id="c-25"></a>

###### MCP Server

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-073"></a>

> 來源：<https://portabase.io/docs/dashboard/mcp/introduction>

Portabase DashboardMCP Server


Connect AI assistants to Portabase via the Model Context Protocol (MCP) server.

The Portabase MCP server exposes your dashboard over the [Model Context Protocol](https://modelcontextprotocol.io/), allowing AI assistants (Claude, Cursor, Windsurf, etc.) to manage databases, agents, and backups through natural language.

**[Prerequisites](#p-073)**

-   Portabase dashboard running with both `API_ENABLED=true` and `MCP_ENABLED=true`
-   An API token (see [API Introduction](#p-047))
-   Node.js 18+ on the machine running your AI assistant

**[Enable MCP](#p-073)**

Set both environment variables before starting your dashboard:

```
API_ENABLED=true
MCP_ENABLED=true
```

-   `API_ENABLED=true`: enables all API routes under `/api/v1`
-   `MCP_ENABLED=true`: enables the MCP server at `/api/v1/mcp`

**[Connection](#p-073)**

Add the following to your AI assistant's MCP configuration, replacing the URL and API key with your own:

**Claude Desktop**

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

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

**Other**

Never commit your API token to version control. Use your environment's secret management to inject it where possible.

**[Verify the connection](#p-073)**

Restart your AI assistant. Ask it:

> "List my Portabase databases"

A successful response confirms the MCP server is connected.

**[Available Tools](#p-073)**

See the [Tools reference](#p-074) for the full list of operations.

Last updated on

[

Archive (soft-delete) a project DELETE

Previous Page

](https://portabase.io/docs/dashboard/api/projects/id/delete)[

MCP Tools Reference

Complete reference for all tools exposed by the Portabase MCP server.

](https://portabase.io/docs/dashboard/mcp/tools)

---

<a id="p-074"></a>

###### MCP Tools Reference

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/dashboard/mcp/tools>

Portabase DashboardMCP Server


Complete reference for all tools exposed by the Portabase MCP server.

The Portabase MCP server exposes 12 tools grouped into three categories: **Agents**, **Databases**, and **Backups**.

---

**[Agents](#p-074)**

**[`list_agents`](#p-074)**

List all agents accessible to the authenticated user.

**Parameters:** none

**Returns:** Array of agent objects.

---

**[`get_agent`](#p-074)**

Get details for a specific agent, including its associated databases.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Agent ID |

**Returns:** Agent object with associated databases.

---

**[`create_agent`](#p-074)**

Create a new agent, optionally scoped to an organization.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Yes | Agent name (min 1 character) |
| `organizationId` | string (UUID) | No | Organization ID to scope the agent to |

**Returns:** Created agent object.

---

**[`delete_agent`](#p-074)**

Delete an agent by ID.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Agent ID |

**Returns:** Confirmation message.

---

**[`get_agent_key`](#p-074)**

Get the edge key for an agent. This key is used by the agent binary to authenticate with Portabase.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Agent ID |

**Returns:** Object containing the edge key.

The edge key grants the agent access to your Portabase instance. Treat it like a password and never expose it in logs or version control.

---

**[Databases](#p-074)**

**[`list_databases`](#p-074)**

List all databases accessible to the authenticated user.

**Parameters:** none

**Returns:** Array of database objects.

---

**[`get_database`](#p-074)**

Get details for a specific database.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Database ID |

**Returns:** Database object.

---

**[`get_database_status`](#p-074)**

Get the current status of a database, including the latest backup and restoration state.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Database ID |

**Returns:** Status object with backup and restore state.

---

**[Backups](#p-074)**

**[`list_backups`](#p-074)**

List all backups for a specific database, ordered by most recent first.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `databaseId` | string | Yes | Database ID |

**Returns:** Array of backup objects.

---

**[`get_backup`](#p-074)**

Get details for a specific backup, including its storage locations.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `databaseId` | string | Yes | Database ID |
| `backupId` | string | Yes | Backup ID |

**Returns:** Backup object with `storages` array. Use the `id` values from `storages` as `backupStorageId` in `trigger_restore`.

---

**[`trigger_backup`](#p-074)**

Trigger an immediate backup for a database.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `databaseId` | string | Yes | Database ID |

**Returns:** Backup job object.

Returns `409 Conflict` if a backup is already running for this database.

---

**[`trigger_restore`](#p-074)**

Trigger a database restore from a specific backup storage. Use `get_backup` to find available `backupStorageId` values.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `databaseId` | string | Yes | Database ID |
| `backupId` | string (UUID) | Yes | Backup ID |
| `backupStorageId` | string (UUID) | Yes | Backup storage ID (from `get_backup` storages list) |

**Returns:** Restore job object.

Returns `409 Conflict` if a restore is already running for this database.

Last updated on

[

MCP Server

Connect AI assistants to Portabase via the Model Context Protocol (MCP) server.

](https://portabase.io/docs/dashboard/mcp/introduction)[

Configuration File

Declare your databases manually via JSON or TOML.

](https://portabase.io/docs/agent/configuration)

---

<a id="c-26"></a>

#### Portabase Agent

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-27"></a>

##### Configuration File

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-075"></a>

> 來源：<https://portabase.io/docs/agent/configuration>

Portabase Agent


Declare your databases manually via JSON or TOML.

The Portabase Agent needs to know where your databases are located to connect to them. This configuration is done via a file (commonly named `databases.json`) mounted into the Docker container.

You can manage this file in two ways:

1.  **Via the CLI** (command `portabase agent db add`): recommended, as it generates IDs and validates the syntax for you.
2.  **Manually**: useful for automation (Ansible, Terraform) or when you prefer editing files by hand.

The agent supports two formats: **JSON** (default) and **TOML** (more human-friendly).

---

###### [File structure](#p-075)

You can define multiple databases in a single file. This allows a single agent to back up, for example, both your `staging` and `production` environments.

**JSON (Default)**

Standard format used by the CLI.

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

###### [Field reference](#p-075)

Here is the meaning of each configuration parameter:

| Field | Required | Description |
| --- | --- | --- |
| `name` | Yes | The Readable name. |
| `database` | Depends on the engine. | The database to back up (e.g. "prod\_api"). |
| `type` | Yes | Engine type: `postgresql`,`sqlite`, `mysql`, `mariadb` (use `mysql` for MariaDB). |
| `host` | Depends on the engine. | Host IP or name. If the agent runs on the same server, use `localhost` (with `extra_hosts` in Docker) or the local IP. |
| `port` | Depends on the engine. | Listening port (`5432` for Postgres, `3306` for MySQL). |
| `username` | Depends on the engine. | User with read/dump permissions. |
| `password` | Depends on the engine. | Password for that user. |
| `generated_id` | **Yes** | A unique UUID v4 identifier. |

---

###### [The `generatedId` rule](#p-075)

Each database must have a **unique ID**. This ID lets the Dashboard recognize a database's backup history even if you rename it.

Attention

If you create this file manually, you **must** generate a valid UUID. Do not invent a simple random string.

Generate UUID for your configuration

`Generating...`

---

###### [Docker mount](#p-075)

If you edit the file manually, ensure it's mounted into the agent container.

```yaml title="docker-compose.yml"
services:
  agent:
    # ...
    volumes:
      - ./databases.json:/config/config.json
```

After any manual change, restart the agent so it picks up the new configuration: `docker compose restart agent`

Last updated on

[

MCP Tools Reference

Complete reference for all tools exposed by the Portabase MCP server.

](https://portabase.io/docs/dashboard/mcp/tools)[

Environment Variables

Complete reference of .env configuration options.

](https://portabase.io/docs/agent/environment)

---

<a id="p-076"></a>

###### Environment Variables

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/environment>

Portabase Agent


Complete reference of .env configuration options.

Portabase provides flexibility through environment variables. These let you customize application behavior, database connection, authentication and storage.

If you use Docker Compose, set these variables in your `.env` file at the root of the project.

---

| Variable | Type | Optional | Default | Description |
| --- | --- | --- | --- | --- |
| `EDGE_KEY` | `string` | No | `None` | Your agent's unique key from the dashboard. |
| `TZ` | `string` | Yes | `UTC` | Timezone for the agent (e.g. `UTC`, `Europe/Paris`). |
| `POLLING` | `number` | Yes | `5` | Frequency (in seconds) to check for new tasks. |
| `DATA_PATH` | `string` | Yes | `/data` | Internal path where the agent stores its data. |
| `TMPDIR` | `string` | Yes | `/tmp` | Directory where the agent builds the temporary backup/restore archive. Point it at a disk with enough free space for your largest volume (see [Docker Volume](#p-087)). |
| `RETRY_ATTEMPTS` | `number` | Yes | `3` | Total attempts (not retries after the first) for a database dump, each storage upload, and the restore download. `3` means one initial try plus two retries. Must be between 3 and 5. |
| `RETRY_BACKOFF_MS` | `number` | Yes | `1000` | Base delay between retry attempts. Doubles each attempt, with equal jitter and a 30s ceiling per wait, so the default spends at most ~3s sleeping per seam. Must be between 100 and 30000. |
| `SSL_CERT_FILE` | `string` | Yes | `None` | Path to a CA bundle used for the agent's outgoing TLS connections. Needed when the agent must trust an internal certificate authority (see below). |

---

Internal certificate authority: update-ca-certificates has no effect

The agent is written in Rust and uses `rustls`, which does **not** read the system CA directory. Dropping your certificate into `/usr/local/share/ca-certificates/` and running `update-ca-certificates` satisfies tools such as `curl`, but the agent keeps failing with `InvalidCertificate(UnknownIssuer)`.

Mount a CA bundle and point `SSL_CERT_FILE` at it instead:

```yaml title="docker-compose.yml"
volumes:
  - ./ca-bundle.crt:/etc/ssl/certs/portabase-ca-bundle.crt:ro
environment:
  - SSL_CERT_FILE=/etc/ssl/certs/portabase-ca-bundle.crt
```

`SSL_CERT_FILE` **replaces** the default root store, it does not add to it. The bundle must therefore contain the standard Mozilla root certificates concatenated with your internal CA — otherwise the agent stops trusting public hosts, such as your S3 storage.

Last updated on

[

Configuration File

Declare your databases manually via JSON or TOML.

](https://portabase.io/docs/agent/configuration)[

Supported Databases

List and configuration of databases managed by the agent.

](https://portabase.io/docs/agent/db)

---

<a id="c-28"></a>

###### Databases

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-077"></a>

###### Supported Databases

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db>

Portabase AgentDatabases


List and configuration of databases managed by the agent.

The Portabase agent is designed to be agnostic and modular. It natively supports several database engines, whether for local (Docker) or remote backups.

**[Supported Databases](#p-077)**

| Database | Type Key | Support | Tested Versions | Restore |
| --- | --- | --- | --- | --- |
| **PostgreSQL** | `postgresql` | ✅ Stable | 12, 13, 14, 15, 16, 17 and 18 | Yes |
| **MySQL** | `mysql` | ✅ Stable | 5.7, 8 and 9 | Yes |
| **MariaDB** | `mysql` | ✅ Stable | 10 and 11 | Yes |
| **MongoDB** | `mongodb` | ✅ Stable | 4, 5, 6, 7 and 8 | Yes |
| **SQLite** | `sqlite` | ✅ Stable | 3.x | Yes |
| **Redis** | `redis` | ✅ Stable | 2.8+ | No |
| **Valkey** | `valkey` | ✅ Stable | 7.2+ | No |
| **Firebird** | `firebird` | ✅ Stable | 3.0, 4.0, 5.0 | Yes |
| **MSSQL Server** | `mssql` | ✅ Stable | \- | Yes |
| **Docker Volume** | `docker-volume` | ✅ Stable | Docker Engine 20.10+ | Yes |

**[Global Configuration](#p-077)**

Regardless of the database, the configuration follows the same pattern. You must tell the agent how to connect (host, port, credentials).

**Via CLI (Recommended)**

This is the simplest method. The agent has a dedicated command to add a configuration without errors.

```
# Inside your agent directory
portabase agent db add .
```

The wizard will ask for:

1.  The database **engine** (e.g., `postgresql`).
2.  The **mode**: `new` (a container created by the CLI) or `existing` (your own server).
3.  For an existing database: the **display name**, the **host** (`localhost` or IP), the **port** and the **credentials**.

Every answer can also be passed as a flag, for example `--engine postgresql --mode existing --host 10.0.0.12 --password-stdin`. See [`agent db add`](#p-096) for all options.

With the **CLI 26.08.12 or earlier**, this command is `portabase db add .` — see the [migration guide](#p-103).

**Manual**

Generate UUID for your configuration

`Generating...`

For more details on each engine, check the dedicated pages in this section.

Last updated on

[

Environment Variables

Complete reference of .env configuration options.

](https://portabase.io/docs/agent/environment)[

PostgreSQL

Specific configuration for PostgreSQL.

](https://portabase.io/docs/agent/db/postgresql)

---

<a id="p-078"></a>

###### PostgreSQL

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/postgresql>

Portabase AgentDatabases


Specific configuration for PostgreSQL.

PostgreSQL is fully supported by the Portabase agent. We use native `pg_dump` tools to ensure consistent and reliable backups.

Two modes are available:

-   **`postgresql`**: Single database backup using `pg_dump`. Targets one specific database.
-   **`postgresql-cluster`**: Full cluster backup using `pg_dumpall`. Dumps every database in the instance **plus global objects** (roles, ownership, grants, tablespaces). Useful when advanced roles and ownership are configured at the cluster level.

**[Configuration](#p-078)**

**Via CLI (Recommended)**

When running `portabase agent db add`, select `postgresql` as the database type.

**Specific parameters asked:**

-   **Database Name**: The exact name of the database to backup (e.g., `app_db`). Unlike other engines, you must target a specific database.

**Via Docker Compose**

**[Options](#p-078)**

The following optional fields can be set under an `options` key in the database configuration.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `keep_ownership` | `boolean` | `false` | When `true`, omits `--no-owner` and `--no-privileges` from the dump. Ownership and role assignments are preserved in the output. By default these flags are applied, keeping restores portable across different users and environments, for example, when migrating from one database instance to another. |
| `clean_mode` | `string` | `"clean"` | Controls how the target database is cleaned **before a restore**. One of `none`, `clean`, `drop_schemas`, `drop_database`. See [Clean mode](#p-078) below. |

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

**[Clean mode](#p-078)**

`pg_restore --clean` only drops objects that exist in the backup's own table of contents. Anything already present in the target that the dump does not know about survives and can collide with the restore, so restoring into a **populated** database can partially fail (`already exists`, constraint or key errors). `clean_mode` lets you guarantee a clean target before restoring.

| Value | Behaviour | Use case |
| --- | --- | --- |
| `none` | No pre-clean and no `--clean`. | Restore into a known-empty database. Fastest, least destructive. |
| `clean` | Current behaviour: `pg_restore --clean --if-exists`. **Default.** | Existing setups. Not a full reset (see above). |
| `drop_schemas` | Drops every non-system schema `CASCADE`, then restores. | **Recommended for new setups.** Works on managed Postgres (RDS, Cloud SQL, Neon, Supabase) where the role cannot drop the database. |
| `drop_database` | `DROP DATABASE` + `CREATE DATABASE` preserving encoding, collation and owner, then restores. | Full reset on self-hosted Postgres where the role has `CREATEDB` + ownership, or is superuser. |

If the value is absent or unrecognized, the agent falls back to `clean`. `drop_database` is never applied by default.

`drop_schemas` and `drop_database` are **destructive and have no rollback**. If the agent stops between the drop and the restore, the target is left empty or gone. `drop_database` additionally requires that the connecting role is the database owner **and** holds `CREATEDB`, or is a superuser, otherwise the restore fails a preflight check before anything is dropped. Prefer `drop_schemas` on managed providers where you cannot drop the database.

`drop_schemas` is schema-scoped: it does not remove database- or cluster-scoped objects (event triggers, publications/subscriptions, database-level settings, roles, tablespaces). Extensions installed into a dropped schema are recreated on restore only if the restoring role has permission (superuser-only extensions such as `pg_stat_statements` are not). For a fully pristine target including global objects, use `drop_database`.

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

**[Cluster Backup (`pg_dumpall`)](#p-078)**

Use the cluster mode when you need to back up the **entire instance**: all databases together with global objects such as roles, ownership and grants. This is the recommended choice when advanced roles and ownership are configured at the database cluster level, since a single `pg_dump` does not capture cluster-wide global objects.

User specified in the configuration must be a superadmin for `pg_dumpall` to dump all databases and global objects.

**Via CLI (Recommended)**

When running `portabase agent db add`, select `postgresql-cluster` as the database type.

**Specific parameters asked:**

-   **Database Name**: The exact name of the database to backup (e.g., `app_db`). Unlike other engines, you must target a specific database.

**Via Docker Compose**

Cluster backups can be significantly larger and slower than single-database backups, since every database in the instance is included. Restoring a `pg_dumpall` output recreates roles and ownership globally.

**[Docker Compose Example](#p-078)**

Here is how to configure a PostgreSQL service alongside the agent.

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

Last updated on

[

Supported Databases

List and configuration of databases managed by the agent.

](https://portabase.io/docs/agent/db)[

MySQL

Configuration for MySQL.

](https://portabase.io/docs/agent/db/mysql)

---

<a id="p-079"></a>

###### MySQL

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/mysql>

Portabase AgentDatabases


Configuration for MySQL.

The agent will use `mysqldump` to perform backups and restore backups.

**[Configuration](#p-079)**

**Via CLI (Recommended)**

When running `portabase agent db add`, select `mysql`.

**Specific parameters asked:**

-   **Database Name**: The name of the database to backup.

**Via Docker Compose**

**[Docker Compose Example](#p-079)**

Example with a MySQL image.

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

Last updated on

[

PostgreSQL

Specific configuration for PostgreSQL.

](https://portabase.io/docs/agent/db/postgresql)[

MariaDB

Configuration for MariaDB.

](https://portabase.io/docs/agent/db/mariadb)

---

<a id="p-080"></a>

###### MariaDB

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/mariadb>

Portabase AgentDatabases


Configuration for MariaDB.

The agent will use `mariadb-dump` to perform backups and restore backups.

**[Configuration](#p-080)**

**Via CLI (Recommended)**

When running `portabase agent db add`, select `mariadb` as the database type.

**Via Docker Compose**

**[Docker Compose Example](#p-080)**

Example with a MariaDB image.

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

Last updated on

[

MySQL

Configuration for MySQL.

](https://portabase.io/docs/agent/db/mysql)[

MongoDB

Configuration for MongoDB.

](https://portabase.io/docs/agent/db/mongodb)

---

<a id="p-081"></a>

###### MongoDB

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/mongodb>

Portabase AgentDatabases


Configuration for MongoDB.

The agent will use `mongodump` to perform backups and `mongorestore` to restore backups.

**[Configuration](#p-081)**

**Via CLI (Recommended)**

When running `portabase agent db add`, select `mongodb` as the database type.

**Via Docker Compose**

**[MongoDB Atlas / Cloud (SRV)](#p-081)**

Managed MongoDB clusters (MongoDB Atlas and equivalents) are reached through a DNS `SRV` record instead of a fixed host and port. The connection string uses the `mongodb+srv://` scheme.

To use an SRV connection, **omit the `port` field** (or set it to `0`). The agent detects this and automatically switches to `mongodb+srv://`. Use the cluster hostname (ending in `.mongodb.net`) as the `host`.

Via CLI: run `portabase agent db add`, choose `mongodb`, then set the port to `0` (`--port 0`) to enable the SRV connection.

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

`Generating...`

No `port` is set for SRV connections. When `port` is absent (or `0`), the agent builds a `mongodb+srv://user:password@host/database?authSource=admin` URI. With authentication, the credentials are URL-encoded automatically and `authSource=admin` is appended. Without a username and password, the URI is built without credentials or query string.

**[Options](#p-081)**

The following optional fields can be set under an `options` key in the database configuration. They map to standard MongoDB connection-string query parameters.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `auth_source` | `string` | `admin` (when credentials are set) | The authentication database. Sets `authSource` on the URI. Override when your user is defined in a database other than `admin`. |
| `replica_set` | `string` | — | Replica set name. Sets `replicaSet` on the URI. Required when connecting to a self-hosted replica set. |
| `tls` | `boolean` | `false` | When `true`, appends `tls=true` to the URI to force a TLS connection. |

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

**[Replica Set (multiple hosts)](#p-081)**

To connect to a self-hosted replica set, put a **comma-separated host list** in the `host` field and **omit `port`** (each host carries its own port). Set the `replica_set` option to the replica set name.

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

A comma in `host` marks a replica-set host list: the agent uses it verbatim (never SRV) and does not append a single `port`. Ports go inside the host list. If you omit ports in the list (`host1,host2,host3`), the MongoDB driver defaults each to `27017`.

An **empty `port`** means different things depending on the host: a comma list is a replica set, a single `.mongodb.net` host is SRV (`mongodb+srv://`), and a single regular host **requires** a port. In the dashboard form, leave Port empty **only** for a replica-set list or an SRV cluster.

**[Docker Compose Example](#p-081)**

Example with a MongoDB image.

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

Last updated on

[

MariaDB

Configuration for MariaDB.

](https://portabase.io/docs/agent/db/mariadb)[

SQLite

Configuration for SQLite.

](https://portabase.io/docs/agent/db/sqlite)

---

<a id="p-082"></a>

###### SQLite

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/sqlite>

Portabase AgentDatabases


Configuration for SQLite.

**[Configuration](#p-082)**

**Via CLI (Recommended)**

When running `portabase agent db add`, select `sqlite` as the database type.

**Via Docker Compose**

**[Docker Compose Example](#p-082)**

Example with a SQLite image.

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

Last updated on

[

MongoDB

Configuration for MongoDB.

](https://portabase.io/docs/agent/db/mongodb)[

Redis

Configuration for Redis.

](https://portabase.io/docs/agent/db/redis)

---

<a id="p-083"></a>

###### Redis

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/redis>

Portabase AgentDatabases


Configuration for Redis.

The agent will use `redis-cli` to perform backups.

**[Configuration](#p-083)**

**Via CLI (Recommended)**

When running `portabase agent db add`, select `redis` as the database type.

**Via Docker Compose**

**[Docker Compose Example](#p-083)**

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

**[Important: Localhost and Docker](#p-083)**

If you use localhost as the host (because the agent is on the host machine and not in Docker, or via host-gateway), ensure your database is listening on all interfaces (0.0.0.0) or is accessible from the agent.

Try this: `"host": "host.docker.internal"` (replace host in config.json, toml) or `"host": "db-redis"` (if using Docker Compose).

Last updated on

[

SQLite

Configuration for SQLite.

](https://portabase.io/docs/agent/db/sqlite)[

Valkey

Configuration for Valkey.

](https://portabase.io/docs/agent/db/valkey)

---

<a id="p-084"></a>

###### Valkey

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/valkey>

Portabase AgentDatabases


Configuration for Valkey.

The agent will use `valkey-cli` to perform backups.

**[Configuration](#p-084)**

**Via CLI (Recommended)**

When running `portabase agent db add`, select `valkey` as the database type.

**Via Docker Compose**

**[Docker Compose Example](#p-084)**

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

**[Important: Localhost and Docker](#p-084)**

If you use localhost as the host (because the agent is on the host machine and not in Docker, or via host-gateway), ensure your database is listening on all interfaces (0.0.0.0) or is accessible from the agent.

Try this: `"host": "host.docker.internal"` (replace host in config.json, toml) or `"host": "db-valkey"` (if using Docker Compose).

Last updated on

[

Redis

Configuration for Redis.

](https://portabase.io/docs/agent/db/redis)[

Firebird

Specific configuration for Firebird.

](https://portabase.io/docs/agent/db/firebird)

---

<a id="p-085"></a>

###### Firebird

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/firebird>

Portabase AgentDatabases


Specific configuration for Firebird.

Firebird is fully supported by the Portabase agent. We use native `gbak` and `isql` tools to ensure consistent and reliable backups.

**[Configuration](#p-085)**

**Via CLI (Recommended)**

When running `portabase agent db add`, select `firebird` as the database type.

**Via Docker Compose**

**[Docker Compose Example](#p-085)**

Here is how to configure a Firebird service alongside the agent.

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

Last updated on

[

Valkey

Configuration for Valkey.

](https://portabase.io/docs/agent/db/valkey)[

MsSQL

Specific configuration for MsSQL.

](https://portabase.io/docs/agent/db/mssql)

---

<a id="p-086"></a>

###### MsSQL

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/mssql>

Portabase AgentDatabases


Specific configuration for MsSQL.

MsSQL is fully supported by the Portabase agent. We use native `sqlpackage` tool to ensure consistent and reliable backups and restorations.

MsSQL has strict password complexity requirements. Your password must be at least 8 characters long and contain characters from three of the following four categories: Latin uppercase letters, Latin lowercase letters, digits (0 through 9), and non-alphanumeric characters (e.g., !, $, #, %). Failure to meet these requirements will cause the container to crash.

**[Configuration](#p-086)**

**Via CLI (Recommended)**

When running `portabase agent db add`, select `mssql` as the database type.

**Via Docker Compose**

**[Docker Compose Example](#p-086)**

Here is how to configure a MsSQL service alongside the agent.

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

Last updated on

[

Firebird

Specific configuration for Firebird.

](https://portabase.io/docs/agent/db/firebird)[

Docker Volume

Configuration for Docker Volume backups.

](https://portabase.io/docs/agent/db/docker-volume)

---

<a id="p-087"></a>

###### Docker Volume

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/agent/db/docker-volume>

Portabase AgentDatabases


Configuration for Docker Volume backups.

The `docker-volume` type lets the agent back up a Docker named volume directly, without going through a database driver. It is useful for engines with no dedicated dump tool, or for protecting any container's data volume as-is.

Backup and restore are performed **on the fly, hot**, without stopping the target container.

This provider requires the agent to have access to the Docker socket. You must mount `/var/run/docker.sock:/var/run/docker.sock` on the agent container, otherwise it cannot inspect or archive the volume.

**[Configuration](#p-087)**

**Via CLI (Recommended)**

When running `portabase agent db add`, select `docker-volume` as the database type.

**Specific parameters asked:**

-   **Volume Name**: The exact name of the Docker volume to back up (e.g., `databases_sqlite-data`).
-   **Container Name**: (Optional, but recommended) The name of the container currently using the volume. Provide it so the agent can automatically restart that container after a restore.

**Via Docker Compose**

**[Docker Compose Example](#p-087)**

The agent needs access to the Docker socket to inspect and archive volumes. Mount it alongside your regular agent configuration.

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

**[Temporary storage and disk space](#p-087)**

During a `docker-volume` backup, the agent builds the backup archive in a **temporary directory** inside the agent container, using the system temp location, `/tmp` by default.

If `/tmp` sits on a cramped root filesystem, backing up a large volume fails with:

```
No space left on device
```

The temporary archive needs roughly the size of the volume being backed up. A 20 GB volume needs about 20 GB free at the temp location, not just at the destination.

**[Redirect the temp directory](#p-087)**

The agent honors the standard `TMPDIR` environment variable. Point it at a directory backed by a bigger disk, and mount host storage there:

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

The temp archive is deleted automatically once the backup finishes. The same applies to **restores**: they unpack into the same temp location, so `TMPDIR` must point at a disk large enough for them too.

Last updated on

[

MsSQL

Specific configuration for MsSQL.

](https://portabase.io/docs/agent/db/mssql)[

Introduction

The Portabase command-line tool — install and manage agents and dashboards without touching Docker Compose.

](https://portabase.io/docs/cli)

---

<a id="c-29"></a>

#### CLI

<sub>[↑ 回目錄](#toc)</sub>

<a id="c-30"></a>

##### Introduction

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-088"></a>

> 來源：<https://portabase.io/docs/cli>

CLI


The Portabase command-line tool — install and manage agents and dashboards without touching Docker Compose.

The **Portabase CLI** is a wrapper on top of Docker Compose. It:

1.  **Generates** valid and secure configurations for agents and dashboards.
2.  **Administers** an agent's databases and a dashboard's settings and login providers — no hand-editing of `.env`, JSON or YAML.
3.  **Manages** the container lifecycle (start / stop / restart / logs / uninstall).
4.  **Decrypts** encrypted backups offline.

###### [Quickstart](#p-088)

```bash
curl -sL https://portabase.io/install | bash
portabase dashboard create my-dashboard --start
portabase agent create my-agent
portabase agent db add my-agent
portabase start my-agent
```

###### [Where to go](#p-088)

[

**Guides**

Step-by-step: set up a dashboard, an agent, SSO, decrypt a backup.

](https://portabase.io/docs/cli/guides/dashboard)[

**Commands**

Every command and option.

](https://portabase.io/docs/cli/commands)[

**Concepts**

Folders, generated compose, secrets, exit codes.

](https://portabase.io/docs/cli/concepts)[

**Troubleshooting**

Fix common errors.

](https://portabase.io/docs/cli/troubleshooting)

Upgrading from CLI **26.08.12 or earlier**? Read the [migration guide](#p-103). Older syntax: [legacy reference](#p-104).

Last updated on

[

Docker Volume

Configuration for Docker Volume backups.

](https://portabase.io/docs/agent/db/docker-volume)[

Install the CLI

Install, check and upgrade the Portabase CLI.

](https://portabase.io/docs/cli/installation)

---

<a id="p-089"></a>

###### Install the CLI

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/installation>

CLI


Install, check and upgrade the Portabase CLI.

The CLI ships as a single binary for Linux (amd64 / arm64), macOS and Windows.

**Requirement:** **Docker** with the **Compose plugin** on the machine where you run the CLI.

**[Install](#p-089)**

```bash
curl -sL https://portabase.io/install | bash
```

**[Check the version](#p-089)**

```
portabase --version
```

This also tells you if a newer release is available.

**[Upgrade](#p-089)**

```
portabase update
```

See [`update`](#p-101) for channels and details.

Upgrading from 26.08.12 or earlier?

Commands were renamed. Read the [migration guide](#p-103) before upgrading.

`portabase: command not found` after install? See [Troubleshooting](#p-102).

Last updated on

[

Introduction

The Portabase command-line tool — install and manage agents and dashboards without touching Docker Compose.

](https://portabase.io/docs/cli)[

Key concepts

How the Portabase CLI works — component folders, generated compose, interactive mode, secrets and exit codes.

](https://portabase.io/docs/cli/concepts)

---

<a id="p-090"></a>

###### Key concepts

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/concepts>

CLI


How the Portabase CLI works — component folders, generated compose, interactive mode, secrets and exit codes.

**[Component folders](#p-090)**

Every `create` command produces a **folder**. All the other commands take that folder as their first argument (use `.` if you are already inside it).

**Agent folder**

```
my-agent/
├── .env                          # EDGE_KEY, TZ, POLLING, LOG_LEVEL, credentials of managed databases…
├── databases.json                # Databases the agent backs up (mounted as /config/config.json)
├── docker-compose.yml            # Generated by the CLI — do not edit
├── docker-compose.override.yml   # Optional — your own customisations (never touched by the CLI)
└── docker-compose.legacy.yml     # Only if you upgraded: backup of the hand-made compose
```

**Dashboard folder**

The CLI recognises the kind of folder automatically: a folder with a `databases.json` is an **agent**, a folder whose `.env` contains `PROJECT_SECRET` is a **dashboard**.

**[`docker-compose.yml` is generated](#p-090)**

The source of truth is `.env` (plus `databases.json` for an agent). `docker-compose.yml` is **re-rendered** from it by:

-   `agent create`, `agent set`, `agent unset`, `agent db add`, `agent db remove`
-   `dashboard create`, `dashboard set`, `dashboard unset`, `dashboard auth add`, `dashboard auth remove`
-   `build`

A generated file starts with the header `# Generated by Portabase CLI <version>. Do not edit.`

Never edit docker-compose.yml by hand

Any change you make directly in `docker-compose.yml` is **lost** the next time one of the commands above runs. Put your customisations (extra labels, networks, resource limits, ports…) in a `docker-compose.override.yml` next to it — Docker Compose merges it automatically, and the CLI never touches it.

If the CLI finds a `docker-compose.yml` it did not generate (an installation made with an older CLI, or a hand-written file), it first copies it to `docker-compose.legacy.yml` and warns you. Use `portabase build <PATH> --diff` to preview the change without writing anything.

Values in the compose file are `${VAR}` references resolved from `.env`, so secrets stay in `.env` only (unless you explicitly use `build --inline-env`).

**[Interactive and non-interactive modes](#p-090)**

By default the CLI asks for anything you did not pass as a flag. It switches to **non-interactive mode** when:

-   the global `--non-interactive` option is set, **or**
-   the environment variable `PORTABASE_NON_INTERACTIVE` is `1`, `true` or `yes`, **or**
-   standard input is not a terminal (CI job, pipe, `ssh host 'portabase …'` without `-t`, cron…).

**[Passing secrets safely](#p-090)**

Every secret flag has a `-stdin` twin that reads the value from the first line of standard input, so it never appears in your shell history or in `ps`:

| Secret | Visible flag (discouraged) | Safe flag |
| --- | --- | --- |
| Agent Edge Key | `--key` | `--key-stdin` |
| Password of an existing database | `--password` | `--password-stdin` |
| Dashboard custom DB password | — | `--db-password-stdin` |
| Dashboard initial user password | `--admin-password` | `--admin-password-stdin` |
| OIDC / OAuth client secret | `--secret` | `--secret-stdin` |

```
printf '%s\n' "$EDGE_KEY" | portabase agent create my-agent --key-stdin --yes
```

Each `-stdin` flag consumes one line of standard input. Use a single `-stdin` flag per command to avoid mixing up values.

**[Non-interactive examples](#p-090)**

Complete, prompt-free commands for CI jobs and scripts.

**Agent**

```
printf '%s\n' "$EDGE_KEY" | portabase agent create my-agent \
  --key-stdin --tz Europe/Paris --polling 10 --log-level info \
  --no-host-gateway --yes --start

portabase agent db add my-agent --engine postgresql --mode new
portabase restart my-agent
```

**Dashboard**

**[Applying changes](#p-090)**

Commands that change a component (`set`, `unset`, `db add`, `db remove`, `auth add`, `auth remove`) only write files. Apply them with `portabase restart <PATH>`, which also creates any container added since the last start.

**[Exit codes](#p-090)**

| Code | Meaning |
| --- | --- |
| `0` | Success. |
| `1` | Generic or unexpected error (re-run with `--verbose` to get the traceback). |
| `2` | Invalid input: unknown command, bad flag, missing value, validation failure. |
| `3` | Configuration error: not a Portabase folder, invalid `databases.json`, missing file. |
| `4` | Docker error: Docker missing, daemon not running, `docker compose` failed. |
| `5` | Template error (broken build or wrong `PORTABASE_TEMPLATES_DIR`). |
| `6` | Network error. |
| `7` | Update error (download, checksum, installation). |
| `130` | Canceled by the user (answered "no", `Ctrl+C`, or a refused confirmation). |

Last updated on

[

Install the CLI

Install, check and upgrade the Portabase CLI.

](https://portabase.io/docs/cli/installation)[

Set up an agent

Create an agent, add a database and connect it to your dashboard.

](https://portabase.io/docs/cli/guides/agent)

---

<a id="c-31"></a>

###### Guides

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-091"></a>

###### Set up an agent

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/guides/agent>

CLIGuides


Create an agent, add a database and connect it to your dashboard.

At the end of this guide, an agent runs next to your database and appears as connected in the dashboard.

**Prerequisites:** the [CLI installed](#p-089), Docker running, a [dashboard](#p-092) reachable from this server.

**[Get an Edge Key](#p-091)**

Before starting, go to your **Portabase Dashboard**, create a new Agent and copy its **Edge Key**.

**[Create the agent](#p-091)**

```
portabase agent create my-agent
```

Paste the Edge Key when asked. A `my-agent/` folder is created.

The wizard then asks **"Add a database?"** — answer yes to add one now, or continue with the next step.

**[Add a database](#p-091)**

```
portabase agent db add my-agent
```

Pick the engine, then `existing` for your own server or `new` for a test container. Engine-specific notes: [Databases](#p-077).

**[Start the agent](#p-091)**

```
portabase start my-agent
```

**[Check the connection](#p-091)**

```
portabase logs my-agent
```

The agent shows up as connected in the dashboard. If the logs show "Ping server failed", see [Troubleshooting](#p-102).

**[Next steps](#p-091)**

-   [`agent` reference](#p-096) for every option (CA bundle, retries…).
-   [Non-interactive examples](#p-090) to script this setup.
-   [Getting started](#p-011) to schedule your first backup.

Last updated on

[

Key concepts

How the Portabase CLI works — component folders, generated compose, interactive mode, secrets and exit codes.

](https://portabase.io/docs/cli/concepts)[

Set up a dashboard

Create, start and open a Portabase dashboard with the CLI.

](https://portabase.io/docs/cli/guides/dashboard)

---

<a id="p-092"></a>

###### Set up a dashboard

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/guides/dashboard>

CLIGuides


Create, start and open a Portabase dashboard with the CLI.

At the end of this guide, a Portabase dashboard runs on your server and you can log in.

**Prerequisites:** the [CLI installed](#p-089), Docker running.

**[Create the dashboard](#p-092)**

```
portabase dashboard create my-dashboard
```

The wizard asks for the web port (**8887** by default), the database (a dedicated PostgreSQL container is recommended) and the timezone. A `my-dashboard/` folder is created.

**[Start it](#p-092)**

```
portabase start my-dashboard
```

Skip this step if you passed `--start` at creation.

**[Open the interface](#p-092)**

Go to `http://localhost:8887` (or your server's IP) and create the first account.

**[Use your domain (optional)](#p-092)**

```
portabase dashboard set my-dashboard url https://backup.example.com behind_proxy true
portabase restart my-dashboard
```

Put a [reverse proxy](#p-013) in front of it.

**[Next steps](#p-092)**

-   [Set up an agent](#p-091) to back up your first database.
-   [Add a login provider](#p-093) for single sign-on.
-   [`dashboard` reference](#p-097) for every option.

Last updated on

[

Set up an agent

Create an agent, add a database and connect it to your dashboard.

](https://portabase.io/docs/cli/guides/agent)[

Add a login provider

Enable single sign-on (OIDC or OAuth) on a dashboard with the CLI.

](https://portabase.io/docs/cli/guides/login-provider)

---

<a id="p-093"></a>

###### Add a login provider

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/guides/login-provider>

CLIGuides


Enable single sign-on (OIDC or OAuth) on a dashboard with the CLI.

At the end of this guide, users can log in to your dashboard with your identity provider.

**Prerequisites:** a [dashboard](#p-092) served on a public URL (not `localhost`), and a client ID / secret from your provider — see [OIDC setup](#p-015) or [OAuth2 setup](#p-019).

**[Set the public URL](#p-093)**

```
portabase dashboard set ./my-dashboard url https://backup.example.com
```

**[Add the provider](#p-093)**

```
printf '%s\n' "$KEYCLOAK_SECRET" | portabase dashboard auth add ./my-dashboard oidc keycloak \
  --issuer https://sso.example.com/realms/main \
  --client portabase --secret-stdin \
  --title "Company SSO" --scopes "openid profile email" --pkce
```

For OAuth (Google, GitHub…), use `oauth <provider>` and drop `--issuer`.

**[Register the callback URL](#p-093)**

The CLI prints the callback URL. Add it to your provider's allowed redirect URIs.

**[Restart and test](#p-093)**

```
portabase restart ./my-dashboard
```

The login page now shows a **Company SSO** button.

**[Next steps](#p-093)**

-   [`dashboard auth` reference](#p-097) for every option.
-   [Auth configuration](#p-014) to map roles or disable password login.

Last updated on

[

Set up a dashboard

Create, start and open a Portabase dashboard with the CLI.

](https://portabase.io/docs/cli/guides/dashboard)[

Decrypt a backup

Restore the original archive from an encrypted Portabase backup, offline.

](https://portabase.io/docs/cli/guides/decrypt)

---

<a id="p-094"></a>

###### Decrypt a backup

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/guides/decrypt>

CLIGuides


Restore the original archive from an encrypted Portabase backup, offline.

At the end of this guide, you have the original archive of an encrypted `.enc` backup — no dashboard needed.

**Prerequisites:** the [CLI installed](#p-089), the `.enc` file(s).

**[Download the master key](#p-094)**

In the dashboard, open **Settings**, **Storage** section, and download the master key. Save it as `master_key.bin`.

**[Decrypt one file](#p-094)**

```
portabase decrypt backup.tar.gz.enc backup.tar.gz --key master_key.bin
```

**[Or a whole folder](#p-094)**

```
portabase decrypt ./backups ./restored --key master_key.bin
```

Each file is processed independently; a summary lists any failure.

**[Next steps](#p-094)**

-   [`decrypt` reference](#p-100) for defaults and large backups.
-   [Folder mode](#p-100) for how failures are reported (wrong key, corrupt file).

Last updated on

[

Add a login provider

Enable single sign-on (OIDC or OAuth) on a dashboard with the CLI.

](https://portabase.io/docs/cli/guides/login-provider)[

Commands

Every Portabase CLI command, global options and environment variables.

](https://portabase.io/docs/cli/commands)

---

<a id="c-32"></a>

###### Commands

<sub>[↑ 回目錄](#toc)</sub>

<a id="p-095"></a>

> 來源：<https://portabase.io/docs/cli/commands>

CLICommands


Every Portabase CLI command, global options and environment variables.

Syntax: `portabase [GLOBAL OPTIONS] COMMAND [ARGS] [OPTIONS]`. Every command accepts `--help`.

**[Command overview](#p-095)**

| Command | Description |
| --- | --- |
| [`agent create`](#p-096) | Create a new agent folder. |
| [`agent show`](#p-096) | Show an agent's settings and databases. |
| [`agent set` / `agent unset`](#p-096) | Change or reset agent settings. |
| [`agent db add`](#p-096) | Add a database (new container or existing server). |
| [`agent db list`](#p-096) | List an agent's databases. |
| [`agent db remove`](#p-096) | Remove a database from an agent. |
| [`dashboard create`](#p-097) | Create a new dashboard folder. |
| [`dashboard show`](#p-097) | Show a dashboard's settings and login providers. |
| [`dashboard set` / `dashboard unset`](#p-097) | Change or reset dashboard settings. |
| [`dashboard auth add`](#p-097) | Add an OIDC or OAuth login provider. |
| [`dashboard auth list`](#p-097) | List login providers. |
| [`dashboard auth remove`](#p-097) | Remove a login provider. |
| [`start` / `stop` / `restart` / `logs` / `uninstall`](#p-098) | Container lifecycle. |
| [`build`](#p-099) | Re-render `docker-compose.yml` from the configuration. |
| [`decrypt`](#p-100) | Decrypt `.enc` backup files. |
| [`config`](#p-101) | Global CLI configuration (update channel). |
| [`update`](#p-101) | Update the CLI binary. |

**[Global options](#p-095)**

These options go **before** the command: `portabase [GLOBAL OPTIONS] COMMAND ...`

| Option | Environment variable | Description |
| --- | --- | --- |
| `--version` |  | Print the CLI version, check for a newer release, and exit. |
| `--verbose` |  | Show the cause and full traceback of errors. |
| `--no-color` | `NO_COLOR` | Disable colours (output and help). |
| `--non-interactive` | `PORTABASE_NON_INTERACTIVE` | Never prompt; fail on missing input. |
| `--help` |  | Show help. Works on every command and sub-command. |

```
portabase --non-interactive --no-color agent db list ./my-agent
```

**[Environment variables](#p-095)**

| Variable | Description |
| --- | --- |
| `PORTABASE_NON_INTERACTIVE` | `1`, `true` or `yes` forces non-interactive mode. |
| `NO_COLOR` | Any value disables colours. |
| `PORTABASE_TEMPLATES_DIR` | Use compose templates from this folder instead of the ones bundled in the binary (advanced). |

Last updated on

[

Decrypt a backup

Restore the original archive from an encrypted Portabase backup, offline.

](https://portabase.io/docs/cli/guides/decrypt)[

agent

Create and configure an agent and its databases.

](https://portabase.io/docs/cli/commands/agent)

---

<a id="p-096"></a>

###### agent

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/commands/agent>

CLICommands


Create and configure an agent and its databases.

The agent is the connector installed next to your databases. It needs an **Edge Key**, created in the Dashboard when you add an agent. New to agents? Follow [Set up an agent](#p-091).

**[`agent create`](#p-096)**

Creates the agent folder, generates `.env`, `databases.json` and `docker-compose.yml`, and creates the external Docker network `portabase_network` if needed. In interactive mode it then offers to add databases (**"Add a database?"**).

```
portabase agent create [OPTIONS] NAME
```

| Option | Description | Default |
| --- | --- | --- |
| `NAME` | Folder to create, e.g. `prod-db-01`. **Required.** | — |
| `--key-stdin` | Read the Edge Key from standard input — see [secrets](#p-090). | asked |
| `--key <str>` | Edge Key from the Dashboard (Base64 or JSON with `serverUrl`, `agentId`, `masterKeyB64`). Prefer `--key-stdin`. | asked |
| `--tz <str>` | Agent timezone (`TZ`). | `UTC` |
| `--polling <int>` | Polling frequency in seconds (`POLLING`). Must be ≥ 1. | `5` |
| `--log-level <str>` | `debug`, `info`, `warn` or `error` (`LOG_LEVEL`). | `info` |
| `--host-gateway` / `--no-host-gateway` | Map `localhost` in the agent to the Docker host, to back up a database on the host itself (`extra_hosts: localhost:host-gateway`). | `false` |
| `-s, --start` | Start the agent right after creation. | `false` |
| `-f, --force` | Overwrite an existing folder without asking. | `false` |
| `-y, --yes` | Skip the "Apply this configuration?" confirmation. | `false` |

See [Agent environment variables](#p-076) for the meaning and accepted ranges of each variable.

**Example**

```
portabase agent create my-agent
```

Non-interactive / CI example: see [Concepts](#p-090).

**[`agent show`](#p-096)**

Displays the agent's settings grouped by section (Agent, Network, Storage, Resilience) — secrets are masked — followed by a table of its databases.

```
portabase agent show <AGENT_PATH>
```

**[`agent set` / `agent unset`](#p-096)**

Change one or more settings of an existing agent, then re-render `.env` and `docker-compose.yml`.

```
portabase agent set <AGENT_PATH> KEY VALUE [KEY VALUE ...]
portabase agent unset <AGENT_PATH> KEY [KEY ...]
```

`unset` removes the variable from `.env`, so the agent falls back to its own default. **Core** settings are required and cannot be unset (only changed).

| Key | Type | Written to | Core |
| --- | --- | --- | --- |
| `key` | Edge Key (validated, secret) | `EDGE_KEY` | Yes |
| `tz` | text | `TZ` | Yes |
| `polling` | integer ≥ 1 | `POLLING` | Yes |
| `log_level` | `debug` `info` `warn` `error` | `LOG_LEVEL` | Yes |
| `host_gateway` | boolean | `extra_hosts` in `docker-compose.yml` | Yes |
| `data_path` | text | `DATA_PATH` | No |
| `tmpdir` | text | `TMPDIR` | No |
| `retry_attempts` | integer ≥ 1 | `RETRY_ATTEMPTS` | No |
| `retry_backoff_ms` | integer ≥ 1 | `RETRY_BACKOFF_MS` | No |
| `ca_bundle` | host path (must exist) | read-only volume + `SSL_CERT_FILE` | No |

Booleans accept `true`/`false`, `yes`/`no`, `on`/`off`, `1`/`0`.

```
portabase agent set ./my-agent polling 30 log_level debug
portabase agent set ./my-agent tmpdir /scratch host_gateway true
portabase agent unset ./my-agent tmpdir retry_attempts
portabase restart ./my-agent
```

Apply with `portabase restart <AGENT_PATH>` ([why](#p-090)).

`agent set <PATH> key <EDGE_KEY>` puts the key in your shell history. To rotate the key without leaving a trace, prefer editing `EDGE_KEY` in `.env` and running `portabase build <PATH>`.

**[`agent db add`](#p-096)**

Adds a database to an agent. It either **creates a new database container** in the agent's compose (`--mode new`, handy for tests and local projects) or **registers an existing server** (`--mode existing`).

```
portabase agent db add [OPTIONS] <AGENT_PATH>
```

| Option | Description | Default |
| --- | --- | --- |
| `-e, --engine <key>` | Database engine (see table below). Applies to all engines. | asked |
| `--mode <new\|existing>` | `new` = container created by the CLI, `existing` = your own server. Applies to all engines except `docker-volume`. | `new` |
| `--label <str>` | Display name. Applies to `existing` mode and `docker-volume` (generated automatically in `new` mode). | `External DB` (`Docker Volume` for volumes) |
| `--host <str>` | `existing` mode: host or IP. Default `localhost`. | `localhost` |
| `--port <int>` | `existing` mode: port. | engine's standard port |
| `--database <str>` | `existing` mode: database name (Redis/Valkey: database index). | `0` (Redis/Valkey only) |
| `--user <str>` | `existing` mode: username (Redis/Valkey: optional). | — |
| `--password-stdin` | `existing` mode: read the password from standard input. | — |
| `--password <str>` | `existing` mode: password. Visible in shell history — prefer `--password-stdin`. | — |

Passing a flag that does not apply to the chosen engine and mode fails with `Option(s) not applicable to …` and lists the valid ones.

**[Supported engines](#p-096)**

| `--engine` | Modes | Default port | Notes |
| --- | --- | --- | --- |
| `postgresql` | `new`, `existing` | `5432` | Supports `-o keep_ownership` and `-o clean_mode`. |
| `postgresql-cluster` | `new`, `existing` | `5432` | Uses `pg_dumpall`: the user **must be a superuser**. |
| `mysql` | `new`, `existing` | `3306` | `new` mode runs a `mariadb:latest` container. |
| `mariadb` | `new`, `existing` | `3306` |  |
| `sqlite` | `new`, `existing` | — | File mounted into the agent under `/config/`. |
| `firebird` | `new`, `existing` | `3050` |  |
| `mongodb` | `new`, `existing` | `27017` | `--auth/--no-auth` in `new` mode. For SRV (Atlas), use `--port 0`. |
| `redis` | `new`, `existing` | `6379` | `--auth/--no-auth` in `new` mode. Backup only. |
| `valkey` | `new`, `existing` | `6379` | `--auth/--no-auth` in `new` mode. Backup only. |
| `mssql` | `new`, `existing` | `1433` | `new` mode runs `azure-sql-edge` with the `sa` user. |
| `docker-volume` | — | — | Mounts `/var/run/docker.sock` into the agent automatically. |

**Example**

```
printf '%s\n' "$PG_PASSWORD" | portabase agent db add ./my-agent \
  --engine postgresql --mode existing \
  --label "Production app" --host 10.0.0.12 --port 5432 \
  --database app --user backup --password-stdin \
  -o clean_mode=drop_schemas -o keep_ownership=false
```

Apply with `portabase restart <AGENT_PATH>`.

**[`agent db list`](#p-096)**

Displays a table of the agent's databases: display name, database, type, host:port (or file / volume), user, non-default options and the first 8 characters of the ID.

```
portabase agent db list <AGENT_PATH>
```

**[`agent db remove`](#p-096)**

Removes a database from `databases.json`. For a database created with `--mode new`, its service is also removed from `docker-compose.yml` and its variables from `.env`.

```
portabase agent db remove [OPTIONS] <AGENT_PATH>
```

| Option | Description | Default |
| --- | --- | --- |
| `-i, --id <str>` / `--name <str>` | Database to remove: full ID, ID prefix, or display name. Without it, an interactive menu is shown. | — |
| `--purge-volume` | Also delete the Docker volume of a database created by the CLI. | `false` |
| `-y, --yes` | Skip the confirmation. | `false` |

```
portabase agent db remove ./my-agent --id 3f2a91c4 --yes
portabase agent db remove ./my-agent --name "Production app"
portabase agent db remove ./my-agent --id db-pg --purge-volume --yes
```

Data is kept unless you ask otherwise

Without `--purge-volume`, the data volume of a managed container (`<project>_<service>-data`) is **kept**; the CLI prints the `docker volume rm` command to delete it later. With `--purge-volume`, the volume and **all its data** are deleted immediately — this is irreversible.

If a value matches several databases (e.g. a short ID prefix), the command fails and asks you to use the full ID.

Last updated on

[

Commands

Every Portabase CLI command, global options and environment variables.

](https://portabase.io/docs/cli/commands)[

dashboard

Create and configure a dashboard and its login providers.

](https://portabase.io/docs/cli/commands/dashboard)

---

<a id="p-097"></a>

###### dashboard

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/commands/dashboard>

CLICommands


Create and configure a dashboard and its login providers.

Create and configure a Portabase dashboard. New here? Follow [Set up a dashboard](#p-092).

**[`dashboard create`](#p-097)**

Creates the dashboard folder with `.env` (including a random 64-character `PROJECT_SECRET`) and `docker-compose.yml`.

```
portabase dashboard create [OPTIONS] NAME
```

| Option | Description | Default |
| --- | --- | --- |
| `NAME` | Folder to create, e.g. `my-dashboard`. **Required.** | — |
| `--port <int>` | Web port published on the host (`HOST_PORT`). `PROJECT_URL` becomes `http://localhost:<port>`. | `8887` |
| `--tz <str>` | Timezone (`TZ`). | `Europe/Paris` |
| `--db-mode <mode>` | `external`, `internal` or `custom` (see below). | `external` |
| `-s, --start` | Start the dashboard right after creation. | `false` |
| `-f, --force` | Overwrite an existing folder without asking. | `false` |
| `-y, --yes` | Skip the "Apply this configuration?" confirmation. | `false` |

**[Database modes](#p-097)**

| Mode | What you get |
| --- | --- |
| `external` | **Recommended.** A dedicated `postgres:17-alpine` container (`db`) in the same compose, with random credentials and a random host port (`PG_PORT`). |
| `internal` | The database embedded in the Portabase container. No extra service. |
| `custom` | Your own PostgreSQL. `DATABASE_URL` is built from `--db-*` (user and password are URL-encoded). |

**Example**

```
portabase dashboard create my-dashboard
```

Non-interactive / CI example: see [Concepts](#p-090).

**[Setup wizard](#p-097)**

In interactive mode, when **no** settings option was passed, the CLI asks **"Configure API, MCP and authentication now?"** (default: no). Answering yes walks you through:

1.  **API & MCP** — REST API, OpenAPI / Swagger UI, MCP server.
2.  **Onboarding** — skip the onboarding wizard; if skipped, the initial user's name, email and password.
3.  **Authentication** — email/password login, self sign-up, passkeys.

Then the CLI shows the **SUMMARY**, asks for confirmation, writes the files and prints how to add single sign-on later.

**[`dashboard show`](#p-097)**

Displays the dashboard's settings grouped by section (Network, API & MCP, Onboarding, Authentication) — secrets are masked — and the table of login providers with their callback URL.

```
portabase dashboard show <DASHBOARD_PATH>
```

**[`dashboard set` / `dashboard unset`](#p-097)**

Change or reset one or more settings of an existing dashboard, then re-render `.env` and `docker-compose.yml`.

```
portabase dashboard set <DASHBOARD_PATH> KEY VALUE [KEY VALUE ...]
portabase dashboard unset <DASHBOARD_PATH> KEY [KEY ...]
```

`unset` removes the variable from `.env`, so the dashboard falls back to its default.

| Key | Type | Environment variable | Default |
| --- | --- | --- | --- |
| `url` | `http(s)://host[:port]` | `PROJECT_URL` | `http://localhost:<port>` |
| `behind_proxy` | boolean | `TUSD_BEHIND_PROXY` | `false` |
| `trusted_domains` | comma-separated list | `TRUSTED_DOMAINS` | — |
| `api` | boolean | `API_ENABLED` | `false` |
| `openapi` | boolean | `OPENAPI_ENABLED` | `false` |
| `mcp` | boolean | `MCP_ENABLED` | `false` |
| `skip_onboarding` | boolean | `SKIP_ONBOARDING` | `false` |
| `admin_name` | text | `AUTH_DEFAULT_USER_NAME` | — |
| `admin_email` | text | `AUTH_DEFAULT_USER` | — |
| `admin_password` | strong password (secret) | `AUTH_DEFAULT_PASSWORD` | — |
| `password_auth` | boolean | `AUTH_EMAIL_PASSWORD_ENABLED` | `true` |
| `signup` | boolean | `AUTH_SIGNUP_ENABLED` | — |
| `passkey` | boolean | `AUTH_PASSKEY_ENABLED` | — |
| `account_linking` | boolean | `AUTH_ALLOW_LINKING` | — |
| `account_unlinking` | boolean | `AUTH_ALLOW_UNLINKING` | — |
| `sync_oidc_roles` | boolean | `AUTH_SYNC_OIDC_ROLES_ON_LOGIN` | — |
| `role_map` | `remote:portabase,...` | `AUTH_ROLE_MAP` | — |
| `allowed_group` | text | `ALLOWED_GROUP` | — |

See [Dashboard environment variables](#p-012) for details on each variable.

```
portabase dashboard set ./my-dashboard url https://backup.example.com behind_proxy true
portabase dashboard set ./my-dashboard api true mcp true
portabase dashboard unset ./my-dashboard trusted_domains
portabase restart ./my-dashboard
```

Changing `url` does not change the published port (`HOST_PORT`). Expose the dashboard behind a [reverse proxy](#p-013) and set `behind_proxy true`.

Safety checks

The CLI refuses to write a configuration that would break your instance:

-   `skip_onboarding true` requires `admin_email` **and** `admin_password`.
-   `admin_password` must have at least 8 characters, a lowercase letter, an uppercase letter, a digit and a special character.
-   `password_auth false` is refused while **no** OIDC or OAuth provider is configured (it would lock everyone out).
-   Login providers require a public `url` — `localhost` and `127.0.0.1` are refused, since the identity provider must reach the callback.

**[`dashboard auth add`](#p-097)**

Adds a single sign-on provider. See [OIDC](#p-015) and [OAuth2](#p-019) for the provider-side configuration.

```
portabase dashboard auth add [OPTIONS] <DASHBOARD_PATH> [KIND] [PROVIDER_ID]
```

| Option | OIDC | OAuth | Description |
| --- | --- | --- | --- |
| `KIND` | Yes | Yes | `oidc` or `oauth`. Asked if omitted. |
| `PROVIDER_ID` | Yes | Yes | `oidc`: any slug (lowercase letters, digits, dashes, e.g. `keycloak`). `oauth`: one of `google`, `github`, `discord`, `apple`, `linkedin`, `x`, `reddit`. Asked if omitted. |
| `--issuer <url>` | Yes |  | Issuer / discovery URL (`http(s)://…`). Asked if omitted. |
| `--client <str>` | Yes | Yes | Client ID. Asked if omitted. |
| `--secret-stdin` | Yes | Yes | Read the client secret from standard input. |
| `--secret <str>` | Yes | Yes | Client secret. Prefer `--secret-stdin`. Asked if omitted. |
| `--title <str>` | Yes | Yes | Name displayed on the login button. |
| `--scopes <str>` | Yes |  | Scopes to request. |
| `--pkce` / `--no-pkce` | Yes |  | Use PKCE. Default `false`. |
| `--host <str>` | Yes |  | Host override. |

An OIDC-only flag used with `oauth` fails with `Not applicable to oauth: --issuer`.

**Example**

```
portabase dashboard set ./my-dashboard url https://backup.example.com

printf '%s\n' "$KEYCLOAK_SECRET" | portabase dashboard auth add ./my-dashboard oidc keycloak \
  --issuer https://sso.example.com/realms/main \
  --client portabase --secret-stdin \
  --title "Company SSO" --scopes "openid profile email" --pkce

portabase restart ./my-dashboard
```

Callback URL

After adding a provider, the CLI prints the callback URL to register at the identity provider, built from `url`. For OIDC it is `https://<your-domain>/api/auth/sso/callback/<providerId>`. For OAuth providers, check the expected URL in the [OAuth2 setup](#p-019) page.

A provider ID must be unique: adding an existing one fails — remove it first.

**[`dashboard auth list`](#p-097)**

Lists the configured providers: kind, ID, title, issuer (or provider name) and callback URL.

```
portabase dashboard auth list <DASHBOARD_PATH>
```

**[`dashboard auth remove`](#p-097)**

Removes a provider and all its `AUTH_OIDC_<ID>_*` / `AUTH_SOCIAL_<ID>_*` variables.

```
portabase dashboard auth remove [OPTIONS] <DASHBOARD_PATH> [PROVIDER_ID]
```

`-y, --yes` skips the confirmation. Without `PROVIDER_ID`, an interactive menu is shown.

Removing the last provider while `password_auth` is `false` is refused. Re-enable password login first: `portabase dashboard set <PATH> password_auth true`.

Last updated on

[

agent

Create and configure an agent and its databases.

](https://portabase.io/docs/cli/commands/agent)[

lifecycle

Start, stop, restart, read logs and uninstall an agent or a dashboard.

](https://portabase.io/docs/cli/commands/lifecycle)

---

<a id="p-098"></a>

###### lifecycle

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/commands/lifecycle>

CLICommands


Start, stop, restart, read logs and uninstall an agent or a dashboard.

These commands replace direct use of `docker compose`. They target the folder of a component (agent or dashboard), check that Docker is running, and use the folder name (slugified) as the Compose project name. Inside the component folder, use `.` as the path: `portabase logs .`

| Command | Runs | Description |
| --- | --- | --- |
| `portabase start <PATH>` | `docker compose up -d` | Start the containers in the background. |
| `portabase stop <PATH>` | `docker compose stop` | Stop the containers cleanly (containers and volumes are kept). |
| `portabase restart <PATH>` | `docker compose up -d` then `docker compose restart` | Apply configuration changes: creates services added since the last start, then restarts everything so `.env` is re-read. |
| `portabase logs <PATH>` | `docker compose logs [-f]` | Show logs. `--follow/--no-follow` (`-f`), follow is enabled by default. `Ctrl+C` to exit. |
| `portabase uninstall <PATH>` | `docker compose down -v` then deletes the folder | Remove everything. `--force` (`-f`) skips the confirmation. |

`uninstall` runs `docker compose down -v` and **deletes the folder**. It removes the containers, the **data volumes** (local databases, dashboard data) and the configuration (`.env`, `databases.json`, including the Edge Key and `PROJECT_SECRET`). This action is irreversible.

Last updated on

[

dashboard

Create and configure a dashboard and its login providers.

](https://portabase.io/docs/cli/commands/dashboard)[

build

Re-render docker-compose.yml from a component's configuration.

](https://portabase.io/docs/cli/commands/build)

---

<a id="p-099"></a>

###### build

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/commands/build>

CLICommands


Re-render docker-compose.yml from a component's configuration.

Re-renders `docker-compose.yml` (and `databases.json` for an agent) from the folder's configuration. Use it after editing `.env` or `databases.json` by hand, after upgrading the CLI to pick up new templates, or to inspect the result.

Why the compose is generated: see [Concepts](#p-090).

```
portabase build [OPTIONS] <PATH>
```

| Option | Description | Default |
| --- | --- | --- |
| `--diff` | Show the unified diff between the current and the rendered compose. Writes nothing. | — |
| `--stdout` | Print the rendered compose. Writes nothing. | — |
| `-o, --output <dir>` | Write the files (compose, `databases.json`, and a copy of `.env`) to another directory. | — |
| `--inline-env` | Put the actual values in the compose instead of `${VAR}` references. | — |

`--diff`, `--stdout` and `--output` are mutually exclusive.

**Example**

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

Last updated on

[

lifecycle

Start, stop, restart, read logs and uninstall an agent or a dashboard.

](https://portabase.io/docs/cli/commands/lifecycle)[

decrypt

Decrypt Portabase .enc backup files offline.

](https://portabase.io/docs/cli/commands/decrypt)

---

<a id="p-100"></a>

###### decrypt

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/commands/decrypt>

CLICommands


Decrypt Portabase .enc backup files offline.

Decrypts Portabase `.enc` backup files (AES-256-GCM) and restores the original archive. Works on a single file or on a whole folder of `.enc` files. Step-by-step: [Decrypt a backup](#p-094).

```
portabase decrypt [OPTIONS] INPUT_PATH [OUTPUT_PATH]
```

| Option | Description | Default |
| --- | --- | --- |
| `INPUT_PATH` | A `.enc` file, or a folder containing `.enc` files (top level; all are decrypted). **Required.** | — |
| `OUTPUT_PATH` | Output file or folder, matching the input type. Defaults to the input's directory. | — |
| `-k, --key <path>` | Path to the master key file (raw 32-byte or Base64 AES-256 key). | `./master_key.bin` |

**Example**

```
portabase decrypt backup.tar.gz.enc backup.tar.gz --key master_key.bin
```

**[Master key](#p-100)**

The master key is the same 32-byte AES-256 key used for encryption. Download it from the dashboard in **Settings**, **Storage** section. When `--key` is not provided, the CLI looks for `master_key.bin` in the current directory.

**[Folder mode](#p-100)**

When decrypting a folder, each file is handled independently: one corrupt or wrong-key file does not stop the batch. At the end, a summary gives the number of successes and failures and lists each failed file with its reason; the command then exits with a non-zero code if any failed.

**[Large backups](#p-100)**

Decryption is fully streaming: files are processed chunk by chunk, so memory stays bounded (tens of MB) even for multi-gigabyte (>2 GB) backups. The output is written atomically, so a failure never leaves a partial file behind.

Last updated on

[

build

Re-render docker-compose.yml from a component's configuration.

](https://portabase.io/docs/cli/commands/build)[

config & update

Global CLI configuration and self-update.

](https://portabase.io/docs/cli/commands/config)

---

<a id="p-101"></a>

###### config & update

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/commands/config>

CLICommands


Global CLI configuration and self-update.

**[CLI configuration (`config`)](#p-101)**

The global configuration is stored in `~/.portabase/config.json`.

| Command | Description |
| --- | --- |
| `portabase config show` | Show the file path and every known key (`unset` when not set). Unknown keys are flagged. |
| `portabase config get <KEY>` | Print one value. Fails (exit `2`) if the key is not set. |
| `portabase config set <KEY> <VALUE>` | Set a value. |
| `portabase config channel <stable\|beta>` | Shortcut for `config set update_channel <stable\|beta>`. |

| Key | Values | Description |
| --- | --- | --- |
| `update_channel` | `stable`, `beta` | Which releases `update` and the update notification follow. When unset, a beta CLI follows `beta`, a stable CLI follows `stable`. |

```
portabase config channel beta
portabase config get update_channel
```

**[`update`](#p-101)**

Updates the CLI binary to the latest release of the active channel.

```
portabase update
```

-   Downloads the binary for your platform and **verifies its SHA-256** against the release's `checksums.txt`. The update is refused if the checksum file is missing or does not match.
-   Replaces the running binary and keeps the previous one next to it as `portabase.old`. Uses `sudo` if the install directory is not writable.
-   Asks for confirmation before a downgrade (e.g. switching from `beta` back to `stable`).
-   Only works with the released binary, not from source.

After a successful command, the CLI may display **"A new version of Portabase CLI is available"**. The check is cached for 24 hours (`~/.portabase/cache/release.json`) and never runs in non-interactive mode.

Last updated on

[

decrypt

Decrypt Portabase .enc backup files offline.

](https://portabase.io/docs/cli/commands/decrypt)[

Troubleshooting

Fix common Portabase CLI errors.

](https://portabase.io/docs/cli/troubleshooting)

---

<a id="p-102"></a>

###### Troubleshooting

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/troubleshooting>

CLI


Fix common Portabase CLI errors.

Still stuck? Re-run the command with `--verbose` and [open an issue](https://github.com/Portabase/cli/issues).

Last updated on

[

config & update

Global CLI configuration and self-update.

](https://portabase.io/docs/cli/commands/config)[

Migration guide

Upgrade from the Portabase CLI 26.08.12 or earlier.

](https://portabase.io/docs/cli/migration)

---

<a id="p-103"></a>

###### Migration guide

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/migration>

CLI


Upgrade from the Portabase CLI 26.08.12 or earlier.

This page covers the changes that can break an installation or a script when upgrading from the **CLI 26.08.12 or earlier**. The old commands are documented in [Legacy CLI](#p-104).

Existing agent and dashboard folders keep working, but the CLI now **regenerates `docker-compose.yml`**. Manual edits to that file are lost. Follow the [upgrade steps](#p-103).

**[Renamed commands](#p-103)**

| Before | Now |
| --- | --- |
| `portabase agent NAME` | `portabase agent create NAME` |
| `portabase dashboard NAME` | `portabase dashboard create NAME` |
| `portabase db add <PATH>` | `portabase agent db add <PATH>` |
| `portabase db list <PATH>` | `portabase agent db list <PATH>` |
| `portabase db remove <PATH>` | `portabase agent db remove <PATH>` |

The old forms fail. `portabase db` was removed: database commands only apply to an agent, so they live under `portabase agent db`.

**[`docker-compose.yml` is generated](#p-103)**

The CLI rebuilds `docker-compose.yml` from `.env` and `databases.json` every time the configuration changes (`set`, `unset`, `db add`, `db remove`, `auth add`, `auth remove`, `build`).

-   Put your customisations in `docker-compose.override.yml`. Docker Compose merges it and the CLI never touches it.
-   The first time, the old file is saved as `docker-compose.legacy.yml`.
-   Service and volume names do not change: your data is kept.

**[Scripts](#p-103)**

-   Without a terminal (CI, pipes, cron), the CLI **never prompts**. Pass every value as a flag, and secrets with `--key-stdin`, `--password-stdin`, etc.
-   Confirmations that default to *no* are refused in that mode: add `--force` or `--yes`.
-   Exit codes changed: `2` for invalid input, `3` configuration, `4` Docker, `130` canceled. See [Exit codes](#p-090).

```
printf '%s\n' "$EDGE_KEY" | portabase agent create my-agent --key-stdin --tz UTC --yes
```

**[Other changes](#p-103)**

-   `agent db remove` asks for confirmation (`--yes` to skip) and accepts `--id`.
-   `restart` also creates containers added since the last start.
-   Templates ship with the CLI: no internet access needed to create a component.
-   `update` verifies the binary checksum.

**[Upgrade steps](#p-103)**

**[Back up your folders](#p-103)**

```
tar czf my-agent-backup.tgz my-agent/
```

**[Update the CLI](#p-103)**

```
portabase update
```

**[Preview the new compose](#p-103)**

```
portabase build ./my-agent --diff
```

Move anything you still need into `docker-compose.override.yml`.

**[Apply](#p-103)**

```
portabase build ./my-agent
portabase restart ./my-agent
```

**[Update your scripts](#p-103)**

Apply the renamed commands and add the flags needed in non-interactive mode.

Last updated on

[

Troubleshooting

Fix common Portabase CLI errors.

](https://portabase.io/docs/cli/troubleshooting)[

CLI reference (Legacy)

Command reference of the Portabase CLI up to version 26.08.12.

](https://portabase.io/docs/cli/legacy)

---

<a id="p-104"></a>

###### CLI reference (Legacy)

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/legacy>

CLI


Command reference of the Portabase CLI up to version 26.08.12.

Legacy documentation

This page documents the **Portabase CLI 26.08.12 and earlier**. For newer versions, see the [current reference](#p-088) and the [migration guide](#p-103).

The **Portabase CLI** is the central orchestration tool. It acts as an intelligent wrapper on top of Docker Compose to:

1.  **Generate** valid and secure configurations.
2.  **Manage** the container lifecycle (start/stop/logs).
3.  **Administer** database connections without manually editing JSON files.

In these versions, compose templates are downloaded from the Portabase servers when a component is created (internet access required), and the generated `docker-compose.yml` can be edited by hand.

---

**[Component Initialization](#p-104)**

These commands generate the folder structure, `docker-compose.yml` files, `.env` configurations, and security keys.

**[`agent`](#p-104)**

Creates a new backup agent. The agent is the connector that installs on your database servers.

```
portabase agent [OPTIONS] NAME
```

**Arguments**

| Argument | Required | Description |
| --- | --- | --- |
| `NAME` | Yes | The name of the folder to create (e.g., `prod-db-01`). |

**Options**

| Option | Alias | Description | Default |
| --- | --- | --- | --- |
| `--key <str>` | `-k` | The **Edge Key** provided by the Dashboard. If omitted, it will be requested interactively. | `None` |
| `--tz <str>` |  | Timezone for the agent. Asked interactively when left to `UTC`. | `UTC` |
| `--polling <int>` |  | Polling frequency in seconds. Asked interactively when left to `5`. | `5` |
| `--start` | `-s` | Start the agent immediately after creation. | `False` |

Interactive Assistant

If you simply run `portabase agent my-agent`, the CLI will launch an assistant to:

1.  Request the key, the timezone and the polling frequency.
2.  Ask whether to add an `extra_hosts` mapping (`localhost:host-gateway`).
3.  Loop on **"What do you want to configure?"** (`database`, `docker-volume` or `done`) to add new database containers or existing databases.
4.  Show the proposed configuration and ask for confirmation before writing the files.

**[`dashboard`](#p-104)**

Creates a Dashboard instance (the web management interface).

```
portabase dashboard [OPTIONS] NAME
```

**Options**

| Option | Alias | Description | Default |
| --- | --- | --- | --- |
| `--port <int>` |  | The web listening port for the interface. | `8887` |
| `--start` | `-s` | Start the dashboard immediately after creation. | `False` |

The assistant asks for the database setup: `external` (dedicated PostgreSQL container, recommended), `internal` (embedded database) or `custom` (credentials of an existing PostgreSQL).

---

**[Database Management (`db`)](#p-104)**

The `db` module allows you to modify an agent's `databases.json` configuration without risk of syntax errors.

These commands modify the configuration. For them to take effect, you must restart the agent (`portabase restart <AGENT_PATH>`).

**[`db list`](#p-104)**

Displays a summary table of databases configured for a given agent.

```
portabase db list <AGENT_PATH>
```

**[`db add`](#p-104)**

Launches an interactive assistant to add a new connection to the configuration.

```
portabase db add <AGENT_PATH>
```

The assistant will ask you for:

-   **What to configure**: a `database` or a `docker-volume`.
-   **Mode**: `new` (a container added to the agent's `docker-compose.yml`) or `existing`.
-   **Type**: `postgresql`, `postgresql-cluster`, `mysql`, `mariadb`, `sqlite`, `firebird`, `mongodb`, `redis`, `valkey`, `mssql`.
-   **Host**: The IP address or hostname (use `localhost` for a DB on the same server).
-   **Port**: The listening port (e.g., 5432).
-   **Credentials**: Username and password.

**[`db remove`](#p-104)**

Removes a database from the configuration via an interactive selection menu.

```
portabase db remove <AGENT_PATH>
```

Only the entry in `databases.json` is removed. A container created with `db add` stays in `docker-compose.yml`, with its variables in `.env` and its data volume.

---

**[Lifecycle (Operations)](#p-104)**

These commands replace direct use of `docker compose`. They must target the folder of a component (Agent or Dashboard).

Productivity tip

If you are already in the component folder, you can use `.` as the path. Example: `portabase logs .`

**[`start`](#p-104)**

Starts containers in detached mode (background). Equivalent to `docker compose up -d`.

```
portabase start <PATH>
```

**[`stop`](#p-104)**

Stops containers cleanly.

```
portabase stop <PATH>
```

**[`restart`](#p-104)**

Restarts all services (`docker compose restart`). Useful after a configuration change (`db add` or modification in `.env`).

```
portabase restart <PATH>
```

`docker compose restart` does not create containers added since the last start. After `db add` with a new container, run `portabase start <PATH>`.

**[`logs`](#p-104)**

Displays container logs.

```
portabase logs [OPTIONS] <PATH>
```

**Options**

| Option | Alias | Description |
| --- | --- | --- |
| `--follow` / `--no-follow` | `-f` | Follows logs in real time (enabled by default). Press `Ctrl+C` to exit. |

**[`uninstall`](#p-104)**

Removes the entire deployment.

```
portabase uninstall [OPTIONS] <PATH>
```

**Options**

| Option | Alias | Description |
| --- | --- | --- |
| `--force` | `-f` | Does not ask for confirmation before deleting. |

This command performs a `docker compose down -v`. This **removes containers AND data volumes** (local databases, configurations). This action is irreversible.

---

**[Backup Decryption (`decrypt`)](#p-104)**

Decrypts Portabase `.enc` backup files (AES-256-GCM) and restores the original archive. Works on a single file or on a whole folder of `.enc` files.

```
portabase decrypt [OPTIONS] INPUT_PATH [OUTPUT_PATH]
```

**Arguments**

| Argument | Required | Description |
| --- | --- | --- |
| `INPUT_PATH` | Yes | A `.enc` file, or a folder containing `.enc` files (top level; all are decrypted). |
| `OUTPUT_PATH` | No | Output file or folder, matching the input type. Defaults to the input's directory. |

**Options**

| Option | Alias | Description | Default |
| --- | --- | --- | --- |
| `--key <path>` | `-k` | Path to the master key file (raw 32-byte or Base64 AES-256 key). | `./master_key.bin` |

Decrypt a single file:

```
portabase decrypt backup.tar.gz.enc backup.tar.gz --key master_key.bin
```

Decrypt every `.enc` in a folder into another folder:

```
portabase decrypt ./backups ./restored --key master_key.bin
```

Omit the output to write next to the input, and omit `--key` to use `master_key.bin` from the current directory:

```
portabase decrypt backup.tar.gz.enc
```

Master key

The master key is the same 32-byte AES-256 key used for encryption. Download it from the dashboard in **Settings**, **Storage** section. When `--key` is not provided, the CLI looks for `master_key.bin` in the current directory.

Folder mode is resilient

When decrypting a folder, each file is handled independently: one corrupt or wrong-key file does not stop the batch. A summary lists which files succeeded and which failed (with the reason), and the command exits with a non-zero code if any failed.

Large backups

Decryption is fully streaming: files are processed chunk by chunk, so memory stays bounded (tens of MB) even for multi-gigabyte (>2 GB) backups. The output is written atomically, so a failure never leaves a partial file behind.

**[Maintenance and Troubleshooting](#p-104)**

Manage the global behavior and settings of the Portabase CLI.

**[`config channel`](#p-104)**

Changes the update channel to switch between stable and beta versions.

```
portabase config channel <stable|beta>
```

**[`config show`](#p-104)**

Displays the current CLI configuration, including the active update channel.

```
portabase config show
```

**[`update`](#p-104)**

Updates the CLI to the latest available version. This command checks for updates on the official repository and applies security patches or new features.

```
portabase update
```

---

**[Common Troubleshooting](#p-104)**

Last updated on

[

Migration guide

Upgrade from the Portabase CLI 26.08.12 or earlier.

](https://portabase.io/docs/cli/migration)[

Contributing

Run and test the Portabase CLI from source.

](https://portabase.io/docs/cli/contributing)

---

<a id="p-105"></a>

###### Contributing

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/cli/contributing>

CLI


Run and test the Portabase CLI from source.

If you want to contribute to the CLI or test your changes locally:

**[Clone the repository](#p-105)**

```bash
git clone https://github.com/Portabase/cli.git
cd cli
```

**[Install dependencies](#p-105)**

```
uv sync
```

**[Run the CLI from source](#p-105)**

```
uv run main.py --help
uv run main.py agent create my-agent
```

**[Run the checks](#p-105)**

```
uv run ruff check .
uv run mypy
uv run pytest
```

`portabase update` only works with the released binary. When running from source, update with `git pull`.

Last updated on

[

CLI reference (Legacy)

Command reference of the Portabase CLI up to version 26.08.12.

](https://portabase.io/docs/cli/legacy)[

FAQ

Frequently asked questions.

](https://portabase.io/docs/faq)

---

<a id="p-106"></a>

#### FAQ

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/faq>

Frequently asked questions.

Last updated on

[

Contributing

Run and test the Portabase CLI from source.

](https://portabase.io/docs/cli/contributing)[

Contributing

Learn how to contribute to the Portabase ecosystem.

](https://portabase.io/docs/contributing)

---

<a id="p-107"></a>

#### Contributing

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/contributing>

Learn how to contribute to the Portabase ecosystem.

We love contributions! Portabase is an open-source project, and we welcome help with the Dashboard, the Agent, and the CLI.

Whether you want to fix a bug, add a new feature, or improve the documentation, here is how you can get started with development for each component.

[

###### Dashboard Development

Contribute to the Next.js web interface. Learn how to run it locally and manage the database.

](https://portabase.io/docs/contributing#dashboard-development)[

###### Agent Development

Improve the Rust-based agent that handles backups and communication with the dashboard.

](https://portabase.io/docs/contributing#agent-development)[

###### CLI Development

Help enhance the Python command-line tool that orchestrates the entire ecosystem.

](https://portabase.io/docs/cli/contributing)[

###### E2E Tests

Maintain the shared end-to-end test suite, reused to validate both the Dashboard and the Agent.

](https://github.com/Portabase/e2e-tests)

---

###### [Dashboard development](#p-107)

Run the Dashboard from source:

**[Clone the repository](#p-107)**

```bash
git clone https://github.com/Portabase/portabase.git
cd portabase
```

**[Install dependencies](#p-107)**

```bash
pnpm install
```

**[Environment configuration](#p-107)**

Copy the example environment file and adjust values if necessary:

```
cp .env.example .env
```

**[Start in development mode](#p-107)**

```
make up
```

###### [Agent development](#p-107)

Set up the agent in a development environment:

**[Clone the repository](#p-107)**

```bash
git clone https://github.com/Portabase/agent.git
cd agent
```

**[Build the agent](#p-107)**

```
cargo build
```

**[Start in development mode](#p-107)**

```bash
docker compose up
```

See the [development requirements](#p-002) for the toolchain versions.

---

###### [General Workflow](#p-107)

1.  **Fork** the repository you want to contribute to.
2.  **Clone** your fork locally.
3.  **Create a branch** for your changes.
4.  **Commit** your work with clear and concise messages.
5.  **Run the tests** and make sure they pass, including the [end-to-end tests](https://github.com/Portabase/e2e-tests) where relevant (see [Testing](#p-107) below).
6.  **Push** to your fork and **open a Pull Request**.

Thank you for helping make Portabase better!

---

###### [Testing](#p-107)

Portabase ships with an automated test pipeline that runs on every pull request.

The **end-to-end (E2E) tests** are maintained in a dedicated repository, [`Portabase/e2e-tests`](https://github.com/Portabase/e2e-tests), rather than inside the main project repositories. Keeping them separate makes them easier to maintain and lets us reuse the same suite for agent-side testing.

[

###### Dashboard

Currently relies exclusively on end-to-end tests. Unit tests are not yet included.

](https://github.com/Portabase/e2e-tests)[

###### Agent

Includes unit tests run on every pull request with a code coverage report, alongside the end-to-end tests.

](https://github.com/Portabase/e2e-tests)

###### [Useful Development Commands](#p-107)

To make managing the development environment easier, `make` commands are available to handle authentication provider data.

###### Seed authentication test data

This command loads test data for Keycloak and Pocket ID. It is an alias for `make seed-keycloak` and `make seed-pocket`.

```
make seed-auth
```

###### Seed Keycloak test data

Resets and loads test data for Keycloak from `seeds/keycloak/*.json`.

```
make seed-keycloak
```

###### Seed Pocket ID test data

Resets and loads test data for Pocket ID from `seeds/pocket-id/portabase.zip`.

```
make seed-pocket
```

###### Export Keycloak data

Exports Keycloak configuration and users to `seeds/keycloak/`.

```
make export-keycloak
```

###### Export Pocket ID data

Exports Pocket ID data to `seeds/pocket-id/portabase.zip`.

```
make export-pocket
```

###### Generate Pocket ID access token

Generates a one-time access token for the Pocket ID administrator.

```
make pocket-token
```

Last updated on

[

FAQ

Frequently asked questions.

](https://portabase.io/docs/faq)[

Overview

Analysis and comparison of database backup solutions

](https://portabase.io/docs/comparisons/overview)

---

<a id="p-108"></a>

#### Overview

<sub>[↑ 回目錄](#toc)</sub>

> 來源：<https://portabase.io/docs/comparisons/overview>

Comparisons


Analysis and comparison of database backup solutions

Database backup tools vary significantly in architecture and operational scope. Some solutions focus on a single database engine and rely primarily on command-line tooling, while others provide broader platform capabilities such as web interfaces, multi-database support, and team-oriented management features.

##### [Overview of existing solutions](#p-108)

Traditional tools like [Barman](https://pgbarman.org/), [pgBackRest](https://pgbackrest.org/), and [WAL-G](https://wal-g.readthedocs.io/) offer robust backup and recovery capabilities but are typically aimed at infrastructure specialists, requiring configuration via files and command-line interfaces.

Newer platforms such as [Databasus](https://databasus.com/) and [Databasement](https://david-crty.github.io/databasement/) simplify backup management through graphical interfaces and guided configuration, making them more accessible to development teams.

Enterprise solutions like [Veeam](https://www.veeam.com/) provide comprehensive backup across multiple systems but are proprietary and primarily targeted at large organizations.

Portabase adopts a different approach: an open-source, lightweight platform with agent-based architecture, a web interface, and multi-database support. It is fully self-hosted and designed to simplify backup management for teams handling multiple databases.

##### [Feature Comparison](#p-108)

| Feature | Portabase | Barman | pgBackRest | WAL-G | Databasus | Databasement | Veeam |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Multiple DBMS supported | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Web UI | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Agent Architecture | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Organizations/Teams | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| Built-in notifications | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| OIDC/OAuth2 | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Docker installation | ✅ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ |
| Self-hosted support | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Encryption | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Built-in retention policies | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Open-Source | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |

Last updated on

[

Contributing

Learn how to contribute to the Portabase ecosystem.

](https://portabase.io/docs/contributing)
