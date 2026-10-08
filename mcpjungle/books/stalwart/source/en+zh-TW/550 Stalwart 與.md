---

## title: "Stalwart connects to the｜Stalwart 與"

 title\_original: "Stalwart connects to the"
source: "[https://stalw.art/integrations](https://stalw.art/integrations)"
chapter: \[\]
order: 550
lang: "bilingual"
translated\_by: "google\_v2+gtx"
captured: "2026-10-05T01:20:00.241Z"

 ⬆ 目錄　｜　⬅ 上一篇：Stalwart at｜堅定的　｜　下一篇：Legal & Compliance｜法律與合規 ➡

# Stalwart connects to the｜Stalwart 與

 Integrations

 整合

## Stalwart connects to the systems you already run.｜Stalwart 可以連接到您已運行的系統。

 Stalwart fits into the infrastructure your team already operates, so adopting it is a configuration choice, not a migration. Plug in your existing identity provider, storage, search engine, DNS provider, observability stack and content-filtering tools, then point any standards-compliant mail or calendar client at the server.

 Stalwart 可以無縫整合到您團隊現有的基礎架構中，因此採用它是一種配置選擇，而非遷移。只需接取您現有的身分提供者、儲存、搜尋引擎、 DNS提供者、可觀測性堆疊和內容過濾工具，然後將任何符合標準的郵件或日曆用戶端指向該伺服器即可。

 Compare editions

 版本對比

 Authentication and identity

 身份驗證和身份

## Built-in directory or your own IdP.｜內建目錄或您自己的身分提供者。

 User authentication and authorization can be handled by Stalwart's built-in directory or delegated to an external identity provider. OAuth 2.0 \(device flow and authorization code\) and OpenID Connect are supported as first-class authentication mechanisms.

 使用者身份驗證和授權可以由 Stalwart 的內建目錄處理或委託給外部身分提供者。支援 OAuth 2.0（設備流程和授權代碼）和 OpenID Connect 作為一流的身份驗證機制。

- LDAP and Active Directory, including OpenLDAP.
LDAP和 Active Directory ，包括 OpenLDAP。
- OpenID Connect providers \(Keycloak, Authentik, generic OIDC\).
OpenID Connect提供者（Keycloak、Authentik、通用OIDC ）。
- OAuth 2.0 identity providers.
OAuth 2.0身分提供者。
- SQL directories \(PostgreSQL, MySQL, MariaDB, SQLite\).
SQL目錄 \(PostgreSQL、MySQL、MariaDB、SQLite\)。
- Built-in directory for self-managed deployments.
內建目錄用於自管理部署。
Storage backends
 儲存後端

## Pick the data store that fits the scale.｜選擇適合規模的資料儲存。

 The data store keeps structured metadata such as mailboxes, message metadata, ACLs, calendars and contacts. Each backend has different scaling characteristics.

 資料儲存保存結構化元數據，例如郵箱、郵件元資料、存取控制清單 \(ACL\)、日曆和聯絡人。每個後端都具有不同的擴展特性。

- RocksDB, embedded key-value store for single-node deployments.
RocksDB ，用於單節點部署的嵌入式鍵值儲存。
- FoundationDB, recommended for large distributed clusters.
FoundationDB ，建議用於大型分散式叢集。
- PostgreSQL and AlloyDB.
PostgreSQL 和 AlloyDB .
- MySQL and MariaDB \(including Galera\).
MySQL 和 MariaDB （包括 Galera）。
- SQLite for evaluation and very small deployments.
SQLite用於評估和非常小規模的部署。
Blob storage
 BLOB 存儲

## Object storage for messages, attachments and shared files.｜用於儲存訊息、附件和共用檔案的物件。

 The blob store holds message bodies, attachments, Sieve scripts and WebDAV files. Stalwart supports the S3 API, Azure Blob and the local filesystem.

 Blob 儲存用於保存郵件正文、附件、Sieve 腳本和 WebDAV 檔案。 Stalwart 支援 S3 API 、Azure Blob 和本機檔案系統。

- Amazon S3, MinIO, GarageHQ, Google Cloud Storage and any other S3-compatible object store.
Amazon S3、MinIO、GarageHQ、Google Cloud Storage 以及任何其他與 S3 相容的物件儲存。
- Azure Blob Storage.
Azure Blob 儲存 .
- Filesystem.
檔案系統 .
- Sharded blob storage across multiple endpoints.
跨多個端點的分片 Blob 儲存。
Full-text search
 全文檢索

## Search built in, or delegated to a dedicated engine.｜內建搜尋功能，或委託專用引擎進行搜尋。

 Full-text search can run inside Stalwart or be delegated to a dedicated search engine. The internal engine indexes 17 languages with bloom filters; dedicated engines absorb the indexing load when the data store is busy.

 全文搜尋既可以在 Stalwart 內部運行，也可以委託給專用搜尋引擎。內部引擎使用布隆過濾器索引 17 種語言；當資料儲存繁忙時，專用引擎會承擔索引負載。

- Internal full-text engine.
內建全文引擎。
- Meilisearch.
美利搜尋 .
- Elasticsearch.
Elasticsearch .
- OpenSearch.
OpenSearch。
- PostgreSQL.
PostgreSQL。
- MySQL / MariaDB.
MySQL / MariaDB。
Cluster coordination
 集群協調

## Coordinator-less or one of four backends.｜無協調器或四種後端之一。

 Coordination synchronises state across cluster nodes \(mailbox events, blocked IPs, certificate renewals, push notifications\). Stalwart can run coordinator-less with peer-to-peer Zenoh or use one of four message backends.

 協調機制負責同步叢集節點間的狀態（郵件信箱事件、被封鎖的 IP 位址、憑證續約、推播通知）。 Stalwart 可以無需協調器即可使用點對點 Zenoh 協定運行，也可以使用四種訊息後端之一。

- Peer-to-peer over Eclipse Zenoh, with no external coordinator.
基於 Eclipse Zenoh點對點通信，無需外部協調器。
- Apache Kafka.
Apache Kafka。
- Redpanda \(Kafka-compatible\).
Redpanda（相容於 Kafka）。
- NATS.
- Redis.
Redis。
DNS providers
 DNS提供商

## Automated DNS publishing on every major provider.｜在所有主要服務提供者上自動發布DNS 。

 With automated DNS management enabled, Stalwart publishes and refreshes MX, SPF, DKIM, DMARC, SRV, CAA, TLSA, MTA-STS, TLS-RPT, autoconfig and autodiscover records directly against a configured DNS provider. The most popular providers are supported out of the box, and self-hosted authoritative servers can be driven via RFC 2136 dynamic updates.

 啟用自動化DNS管理後，Stalwart 可直接針對已配置的DNS提供者發布和刷新MX, SPF, DKIM, DMARC, SRV, CAA, TLSA, MTA-STS, TLS-RPT 、自動配置和自動發現記錄。它開箱即用地支援最常用的提供程序，並且可以透過RFC 2136動態更新來驅動自託管的權威伺服器。

- Cloudflare, AWS Route 53, Google Cloud DNS and Azure DNS.
Cloudflare、 AWS Route 53、Google Cloud DNS和 Azure DNS 。
- DigitalOcean, OVH, Bunny DNS, Porkbun, DNSimple, Spaceship, deSEC and more.
DigitalOcean、 OVH 、Bunny DNS 、Porkbun、DNSimple、Spaceship、deSEC 等。
- RFC 2136 dynamic updates with TSIG or SIG\(0\) for self-hosted authoritative servers \(BIND-compatible\).
RFC 2136 動態更新，使用TSIG或SIG \(0\) 用於自託管權威伺服器（ BIND相容）。
Spam filtering
 垃圾郵件過濾

## Built-in spam filtering, plus the tools you already run.｜內建垃圾郵件過濾功能，加上您已在使用的工具。

 Stalwart's built-in spam filter \(statistical classifier, DNSBL, phishing protection, sender reputation, greylisting and spam traps\) can be combined with external anti-spam systems through Milter or MTA Hooks.

 Stalwart 內建的垃圾郵件過濾器（統計分類器、 DNSBL 、網路釣魚保護、寄件者信譽、灰名單和垃圾郵件陷阱）可以透過 Milter 或MTA Hooks 與外部反垃圾郵件系統結合使用。

- SpamAssassin via Milter.
SpamAssassin 通過 Milter。
- RSPAMD via Milter or MTA Hooks.
RSPAMD透過 Milter 或MTA鉤子。
- Pyzor for collaborative digest-based spam detection.
Pyzor 用於基於協作摘要的垃圾郵件偵測。
- DNSBL providers \(Spamhaus, SURBL, URIBL, and any RBL or hashlist that speaks DNS\).
DNSBL提供者（Spamhaus、 SURBL, URIBL以及任何RBL或支援DNS的哈希列表）。
Observability
 可觀測性

## Metrics, logs, traces, webhooks.｜指標、日誌、追蹤、網路鉤子。

 Telemetry covers metrics, logs, traces and event-driven webhooks. Stalwart can ship data to OpenTelemetry collectors, expose a Prometheus endpoint, and post webhooks to any HTTP endpoint.

 遙測功能涵蓋指標、日誌、追蹤和事件驅動 Webhook。 Stalwart 可以將資料傳送到 OpenTelemetry 收集器，公開 Prometheus 端點，並將 Webhook 傳送到任何HTTP端點。

- OpenTelemetry exporter for traces, metrics and logs.
用於匯出追蹤、指標和日誌的 OpenTelemetry 匯出器。
- Prometheus pull endpoint.
Prometheus拉取端點。
- Webhooks for event-driven automation.
Webhooks用於事件驅動的自動化。
- journald.
journald。
- Log files.
日誌檔。
- Console output.
控制台輸出。
- Live telemetry over Server-Sent Events.
即時遙測透過伺服器發送的事件。
- Email and webhook alerts.
電子郵件和 webhook 提醒 。
Orchestration
 管弦樂

## Stalwart runs on the major orchestrators.｜Stalwart 依靠主要編曲家運作。

 The orchestrator manages node lifecycle and scaling; the cluster coordination layer keeps nodes in sync.

 編排器管理節點生命週期和擴展；叢集協調層保持節點同步。

- Kubernetes.
Kubernetes .
- Apache Mesos.
Apache Mesos .
- Docker Swarm.
Docker Swarm .
- Plain Docker.
純 Docker。
Mail clients
 郵件客戶端

## Anything that speaks JMAP, IMAP or POP3.｜任何會說JMAP, IMAP或POP3東西。

 Stalwart speaks every standard mail protocol, so any RFC-compliant client works. Automatic account configuration is supported through the IETF UA Autoconfig and Microsoft Autodiscover V2.

 Stalwart 支援所有標準郵件協議，因此任何符合RFC標準的用戶端均可使用。它支援透過IETF UA Autoconfig 和 Microsoft Autodiscover V2 實現自動帳戶配置。

- Any JMAP for Mail client.
任何適用於郵件用戶端的JMAP 。
- Any IMAP4rev1 or IMAP4rev2 client.
任何 IMAP4rev1 或 IMAP4rev2 客戶端。
- Any POP3 client.
任何POP3客戶端。
- Any ManageSieve client.
任何 ManageSieve 客戶端。
- Apple Mail.
蘋果郵箱。
- Mozilla Thunderbird.
Mozilla Thunderbird。
- Microsoft Outlook.
微軟 Outlook。
- Mobile clients on iOS and Android via autoconfig.
iOS 和 Android 上的行動用戶端透過自動設定。
Calendar and contact clients
 日曆和聯絡人客戶

## CalDAV, CardDAV, WebDAV, and the JMAP equivalents.｜CalDAV、CardDAV、WebDAV 和JMAP等效協定。

 CalDAV with scheduling, CardDAV and WebDAV are all supported, alongside the JMAP equivalents. Autoconfig and assisted resource discovery work for CalDAV, CardDAV and WebDAV.

 CalDAV（含調度功能）、CardDAV 和 WebDAV 以及JMAP等效協定均支援。 CalDAV、CardDAV 和 WebDAV 皆支援自動設定和輔助資源探索功能。

- Apple Calendar and Apple Contacts.
蘋果行事曆和蘋果通訊錄。
- Mozilla Thunderbird \(TbSync, calendar add-ons\).
Mozilla Thunderbird（TbSync、日曆外掛）。
- GNOME Evolution.
GNOME進化。
- KDE Kontact.
KDE聯絡方式。
- Mobile CalDAV / CardDAV clients on iOS and Android.
iOS 和 Android 上的行動 CalDAV / CardDAV 用戶端。
- JMAP for Calendars, Contacts and File Storage clients.
JMAP適用於行事曆、聯絡人和文件儲存用戶端。
AI providers
 AI提供商

## LLMs in the spam filter and in Sieve scripts.｜垃圾郵件過濾器和 Sieve 腳本中的 LLM。

 LLM-driven spam classifier and an AI-powered Sieve scripting for content analysis. The LLM endpoint is configurable; hosted providers and self-hosted models are both supported.

 LLM 驅動的垃圾郵件分類器和AI 驅動的 Sieve 腳本用於內容分析。 LLM端點可配置；託管提供者和自託管模型均支援。

- OpenAI.
OpenAI。
- Anthropic.
人類學。
- Self-hosted LLM endpoints, including any OpenAI-compatible API.
自託管的LLM端點，包括任何 OpenAI 相容的API端點。
 ---

 ⬆ 目錄　｜　⬅ 上一篇：Stalwart at｜堅定的　｜　下一篇：Legal & Compliance｜法律與合規 ➡
