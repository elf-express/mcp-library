---
title: "DnsServer"
source: https://stalw.art/docs/ref/object/dns-server/
description: "Defines a DNS server for automatic record management."
---

# DnsServer

> Section: Schema reference › Objects

Defines a DNS server for automatic record management.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Network › DNS › DNS Providers

## Fields

DnsServer is a **multi-variant** object: each instance has an `@type` discriminator selecting one of the variants below, and each variant carries its own set of fields.

### `@type: "Tsig"`

RFC2136 (TSIG)

##### `host`

> Type: `IpAddr` · required
>
> The IP address of the DNS server

##### `port`

> Type: `UnsignedInt` · default: `53` · max: 65535 · min: 1
>
> The port used to communicate with the DNS server

##### `keyName`

> Type: `String` · required
>
> The key used to authenticate with the DNS server

##### `key`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `protocol`

> Type: [`IpProtocol`](#ipprotocol) · default: `"udp"`
>
> The protocol used to communicate with the DNS server

##### `tsigAlgorithm`

> Type: [`TsigAlgorithm`](#tsigalgorithm) · default: `"hmac-sha512"`
>
> The TSIG algorithm used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Deprecated1"`

RFC2136 (SIG0 - deprecated)

### `@type: "Cloudflare"`

Cloudflare

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "DigitalOcean"`

DigitalOcean

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "DeSEC"`

DeSEC

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Ovh"`

OVH

##### `applicationKey`

> Type: `String` · required
>
> The application key used to authenticate with the OVH DNS server

##### `applicationSecret`

> Type: [`SecretKey`](#secretkey) · required
>
> The application secret used to authenticate with the OVH DNS server

##### `consumerKey`

> Type: [`SecretKey`](#secretkey) · required
>
> The consumer key used to authenticate with the OVH DNS server

##### `ovhEndpoint`

> Type: [`OvhEndpoint`](#ovhendpoint) · default: `"ovh-eu"`
>
> Which OVH endpoint to use

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Bunny"`

BunnyDNS

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Porkbun"`

Porkbun

##### `apiKey`

> Type: `String` · required
>
> The API key used to authenticate with Porkbun

##### `secretApiKey`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret API key used to authenticate with Porkbun

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Dnsimple"`

DNSimple

##### `authToken`

> Type: [`SecretKey`](#secretkey) · required
>
> The authentication token used to authenticate with DNSimple

##### `accountIdentifier`

> Type: `String` · required
>
> The account ID used to authenticate with DNSimple

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Spaceship"`

Spaceship

##### `apiKey`

> Type: `String` · required
>
> The API key used to authenticate with Spaceship

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Route53"`

AWS Route53

##### `accessKeyId`

> Type: `String` · required
>
> The AWS access key ID

##### `secretAccessKey`

> Type: [`SecretKey`](#secretkey) · required
>
> The AWS secret access key

##### `sessionToken`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Optional session token for temporary AWS credentials

##### `region`

> Type: `String` · default: `"us-east-1"`
>
> The AWS region

##### `hostedZoneId`

> Type: `String?`
>
> Hosted zone ID to use (resolved automatically by name if not set)

##### `privateZoneOnly`

> Type: `Boolean` · default: `false`
>
> Whether to restrict zone resolution to private zones only

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "GoogleCloudDns"`

Google Cloud DNS

##### `serviceAccountJson`

> Type: [`SecretText`](#secrettext) · required
>
> Service account JSON credentials used to authenticate with Google Cloud

##### `projectId`

> Type: `String` · required
>
> The Google Cloud project ID that owns the managed zone

##### `managedZone`

> Type: `String?`
>
> Managed zone name (resolved automatically by longest suffix match if not set)

##### `privateZone`

> Type: `Boolean` · default: `false`
>
> Whether to restrict zone resolution to private zones only

##### `impersonateServiceAccount`

> Type: `String?`
>
> Optional service account email to impersonate

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Alidns"`

Alibaba Cloud DNS

##### `accessKey`

> Type: `String` · required
>
> The Alibaba Cloud access key ID

##### `secretKey`

> Type: [`SecretKey`](#secretkey) · required
>
> The Alibaba Cloud access key secret

##### `region`

> Type: `String?`
>
> Optional regional endpoint (defaults to the global endpoint)

##### `securityToken`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Optional STS security token for temporary credentials

##### `line`

> Type: `String?`
>
> Optional ISP line identifier (used for split-resolution accounts)

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "ArvanCloud"`

ArvanCloud

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Autodns"`

InterNetX AutoDNS

##### `username`

> Type: `String` · required
>
> AutoDNS account username

##### `password`

> Type: [`SecretKey`](#secretkey) · required
>
> AutoDNS account password

##### `context`

> Type: `UnsignedInt?`
>
> Optional account context identifier

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "AzureDns"`

Microsoft Azure DNS

##### `tenantId`

> Type: `String` · required
>
> Azure Active Directory tenant ID

##### `clientId`

> Type: `String` · required
>
> Application (client) ID

##### `clientSecret`

> Type: [`SecretKey`](#secretkey) · required
>
> Application client secret

##### `subscriptionId`

> Type: `String` · required
>
> Azure subscription ID that owns the DNS zone

##### `resourceGroup`

> Type: `String` · required
>
> Resource group that contains the DNS zone

##### `environment`

> Type: [`AzureEnvironment`](#azureenvironment) · default: `"public"`
>
> Azure cloud environment

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "BaiduCloud"`

Baidu Cloud DNS

##### `accessKey`

> Type: `String` · required
>
> Baidu Cloud access key

##### `secretKey`

> Type: [`SecretKey`](#secretkey) · required
>
> Baidu Cloud secret key

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "BluecatV2"`

BlueCat Address Manager

##### `baseUrl`

> Type: `String` · required
>
> Base URL of the BlueCat Address Manager

##### `username`

> Type: `String` · required
>
> BlueCat account username

##### `password`

> Type: [`SecretKey`](#secretkey) · required
>
> BlueCat account password

##### `configName`

> Type: `String` · required
>
> BlueCat configuration name

##### `viewName`

> Type: `String` · required
>
> BlueCat DNS view name

##### `skipDeploy`

> Type: `Boolean` · default: `false`
>
> Skip deploying changes after applying them

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "ClouDns"`

ClouDNS

##### `authId`

> Type: `String?`
>
> ClouDNS auth ID (use either auth-id or sub-auth-id)

##### `subAuthId`

> Type: `String?`
>
> ClouDNS sub-auth ID

##### `password`

> Type: [`SecretKey`](#secretkey) · required
>
> ClouDNS auth password

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Constellix"`

Constellix

##### `apiKey`

> Type: `String` · required
>
> Constellix API key

##### `secretKey`

> Type: [`SecretKey`](#secretkey) · required
>
> Constellix secret key

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Cpanel"`

cPanel

##### `baseUrl`

> Type: `String` · required
>
> Base URL of the cPanel server (e.g. https://host:2083)

##### `username`

> Type: `String` · required
>
> cPanel account username

##### `token`

> Type: [`SecretKey`](#secretkey) · required
>
> cPanel API token

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Ddnss"`

DDNSS.de

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "DnsMadeEasy"`

DNS Made Easy

##### `apiKey`

> Type: `String` · required
>
> DNS Made Easy API key

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> DNS Made Easy API secret

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Domeneshop"`

Domeneshop

##### `authToken`

> Type: `String` · required
>
> Domeneshop API token

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> Domeneshop API secret

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Dreamhost"`

Dreamhost

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "DuckDns"`

DuckDNS

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Dynu"`

Dynu

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "EasyDns"`

EasyDNS

##### `token`

> Type: `String` · required
>
> EasyDNS token

##### `key`

> Type: [`SecretKey`](#secretkey) · required
>
> EasyDNS key

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "EdgeDns"`

Akamai EdgeDNS

##### `host`

> Type: `String` · required
>
> Akamai API host

##### `clientToken`

> Type: `String` · required
>
> Akamai client token

##### `clientSecret`

> Type: [`SecretKey`](#secretkey) · required
>
> Akamai client secret

##### `accessToken`

> Type: [`SecretKey`](#secretkey) · required
>
> Akamai access token

##### `accountSwitchKey`

> Type: `String?`
>
> Optional account switch key for managing multiple accounts

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Exoscale"`

Exoscale

##### `apiKey`

> Type: `String` · required
>
> Exoscale API key

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> Exoscale API secret

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "FreeMyIp"`

freemyip.com

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "GandiV5"`

Gandi LiveDNS v5

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Gcore"`

Gcore

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Glesys"`

GleSYS

##### `apiUser`

> Type: `String` · required
>
> GleSYS API user

##### `apiKey`

> Type: [`SecretKey`](#secretkey) · required
>
> GleSYS API key

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Godaddy"`

GoDaddy

##### `apiKey`

> Type: `String` · required
>
> GoDaddy API key

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> GoDaddy API secret

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Hetzner"`

Hetzner

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "HostingDe"`

hosting.de

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Hostinger"`

Hostinger

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "HuaweiCloud"`

Huawei Cloud DNS

##### `accessKey`

> Type: `String` · required
>
> Huawei Cloud access key

##### `secretKey`

> Type: [`SecretKey`](#secretkey) · required
>
> Huawei Cloud secret key

##### `region`

> Type: `String` · default: `"ap-southeast-1"`
>
> Huawei Cloud region

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Hurricane"`

Hurricane Electric

##### `credentials`

> Type: `List<`[`HurricaneCredential`](#hurricanecredential)`>` · min items: 1
>
> Per-zone Hurricane Electric DDNS keys

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "IbmCloud"`

IBM Cloud

##### `username`

> Type: `String` · required
>
> IBM Cloud account username

##### `apiKey`

> Type: [`SecretKey`](#secretkey) · required
>
> IBM Cloud API key

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Infoblox"`

Infoblox NIOS WAPI

##### `host`

> Type: `String` · required
>
> Infoblox grid master host

##### `port`

> Type: `String?`
>
> Optional port (defaults to 443)

##### `username`

> Type: `String` · required
>
> Infoblox account username

##### `password`

> Type: [`SecretKey`](#secretkey) · required
>
> Infoblox account password

##### `wapiVersion`

> Type: `String?`
>
> WAPI version to use (defaults to 2.11)

##### `dnsView`

> Type: `String?`
>
> DNS view name (defaults to External)

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Infomaniak"`

Infomaniak

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Inwx"`

INWX

##### `username`

> Type: `String` · required
>
> INWX account username

##### `password`

> Type: [`SecretKey`](#secretkey) · required
>
> INWX account password

##### `sharedSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Optional shared secret for TOTP-based two-factor authentication

##### `sandbox`

> Type: `Boolean` · default: `false`
>
> Use the INWX sandbox API instead of production

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Ionos"`

IONOS

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Ipv64"`

IPv64

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Joker"`

Joker

##### `auth`

> Type: [`JokerAuth`](#jokerauth) · required
>
> Joker authentication method

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Lightsail"`

AWS Lightsail

##### `accessKeyId`

> Type: `String` · required
>
> AWS access key ID

##### `secretAccessKey`

> Type: [`SecretKey`](#secretkey) · required
>
> AWS secret access key

##### `sessionToken`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Optional session token for temporary AWS credentials

##### `region`

> Type: `String?`
>
> AWS region (defaults to us-east-1)

##### `domain`

> Type: `String?`
>
> Optional Lightsail domain name to scope record operations to

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Linode"`

Linode

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "LuaDns"`

LuaDNS

##### `username`

> Type: `String` · required
>
> LuaDNS account email or username

##### `authToken`

> Type: [`SecretKey`](#secretkey) · required
>
> LuaDNS API token

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "MythicBeasts"`

Mythic Beasts

##### `username`

> Type: `String` · required
>
> Mythic Beasts API key ID

##### `password`

> Type: [`SecretKey`](#secretkey) · required
>
> Mythic Beasts API key secret

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Namecheap"`

Namecheap

##### `apiUser`

> Type: `String` · required
>
> Namecheap API user

##### `apiKey`

> Type: [`SecretKey`](#secretkey) · required
>
> Namecheap API key

##### `clientIp`

> Type: `String` · required
>
> Whitelisted client IP address registered with Namecheap

##### `username`

> Type: `String?`
>
> Optional account username (defaults to the API user)

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "NameDotCom"`

Name.com

##### `username`

> Type: `String` · required
>
> Name.com account username

##### `authToken`

> Type: [`SecretKey`](#secretkey) · required
>
> Name.com API token

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "NameSilo"`

NameSilo

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Netcup"`

Netcup

##### `customerNumber`

> Type: `String` · required
>
> Netcup customer number

##### `apiKey`

> Type: `String` · required
>
> Netcup API key

##### `password`

> Type: [`SecretKey`](#secretkey) · required
>
> Netcup API password

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Netlify"`

Netlify

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Nifcloud"`

Nifcloud

##### `accessKey`

> Type: `String` · required
>
> Nifcloud access key

##### `secretKey`

> Type: [`SecretKey`](#secretkey) · required
>
> Nifcloud secret key

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Ns1"`

NS1

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "OracleCloud"`

Oracle Cloud

##### `tenancyOcid`

> Type: `String` · required
>
> Tenancy OCID

##### `userOcid`

> Type: `String` · required
>
> User OCID

##### `fingerprint`

> Type: `String` · required
>
> API signing key fingerprint

##### `privateKeyPem`

> Type: [`SecretText`](#secrettext) · required
>
> API signing private key in PEM format

##### `privateKeyPassword`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Optional passphrase for the private key

##### `region`

> Type: `String` · required
>
> OCI region (e.g. us-ashburn-1)

##### `compartmentOcid`

> Type: `String` · required
>
> Compartment OCID that owns the DNS zone

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Plesk"`

Plesk

##### `baseUrl`

> Type: `String` · required
>
> Base URL of the Plesk server (e.g. https://host:8443)

##### `apiKey`

> Type: [`SecretKey`](#secretkey) · required
>
> Plesk API key

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Safedns"`

ANS SafeDNS

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Scaleway"`

Scaleway

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "TencentCloud"`

Tencent Cloud DNSPod

##### `secretId`

> Type: `String` · required
>
> Tencent Cloud secret ID

##### `secretKey`

> Type: [`SecretKey`](#secretkey) · required
>
> Tencent Cloud secret key

##### `region`

> Type: `String?`
>
> Optional regional endpoint

##### `sessionToken`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Optional STS session token for temporary credentials

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Transip"`

TransIP

##### `username`

> Type: `String` · required
>
> TransIP account login

##### `privateKeyPem`

> Type: [`SecretText`](#secrettext) · required
>
> TransIP private key in PEM format

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "UltraDns"`

UltraDNS

##### `username`

> Type: `String` · required
>
> UltraDNS account username

##### `password`

> Type: [`SecretKey`](#secretkey) · required
>
> UltraDNS account password

##### `endpoint`

> Type: `String?`
>
> Optional REST API endpoint override

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Vercel"`

Vercel

##### `authToken`

> Type: [`SecretKey`](#secretkey) · required
>
> Vercel auth token

##### `teamId`

> Type: `String?`
>
> Optional team ID to scope API requests to

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Volcengine"`

Volcano Engine

##### `accessKey`

> Type: `String` · required
>
> Volcengine access key

##### `secretKey`

> Type: [`SecretKey`](#secretkey) · required
>
> Volcengine secret key

##### `region`

> Type: `String?`
>
> Optional regional endpoint

##### `host`

> Type: `String?`
>
> Optional API host override

##### `scheme`

> Type: `String?`
>
> Optional URL scheme (http or https)

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "Vultr"`

Vultr

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> The secret or token used to authenticate with the DNS server

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "WebSupport"`

WebSupport

##### `apiKey`

> Type: `String` · required
>
> WebSupport API key

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> WebSupport API secret

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "YandexCloud"`

Yandex Cloud

##### `apiKey`

> Type: [`SecretText`](#secrettext) · required
>
> Base64-encoded IAM service account key JSON

##### `folderId`

> Type: `String` · required
>
> Yandex Cloud folder ID that owns the DNS zone

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

### `@type: "PowerDns"`

PowerDNS Authoritative

##### `apiKey`

> Type: [`SecretKey`](#secretkey) · required
>
> PowerDNS API key

##### `endpoint`

> Type: `String?`
>
> Base URL of the PowerDNS HTTP API (defaults to http://localhost:8081)

##### `serverId`

> Type: `String?`
>
> PowerDNS server ID used in API paths (defaults to localhost)

##### `description`

> Type: `String` · required
>
> Short description of this DNS server

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?`
>
> Identifier for the tenant this DNS server belongs to

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Request timeout for the DNS server

##### `ttl`

> Type: `Duration` · default: `300000`
>
> The TTL for new DNS record

##### `pollingInterval`

> Type: `Duration` · default: `15000`
>
> How often to check for DNS records to propagate

##### `propagationTimeout`

> Type: `Duration` · default: `60000`
>
> How long to wait for DNS records to propagate

##### `propagationDelay`

> Type: `Duration?`
>
> Initial delay before first propagation check (useful for slow providers)

## JMAP API

The DnsServer object is available via the `urn:stalwart:jmap` capability.

### `x:DnsServer/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysDnsServerGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DnsServer/get",
          {
            "ids": [
              "id1"
            ]
          },
          "c1"
        ]
      ],
      "using": [
        "urn:ietf:params:jmap:core",
        "urn:stalwart:jmap"
      ]
    }'
```

### `x:DnsServer/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysDnsServerCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DnsServer/set",
          {
            "create": {
              "new1": {
                "@type": "Tsig",
                "description": "Example",
                "host": "192.0.2.1",
                "key": {
                  "@type": "Value",
                  "secret": "Example"
                },
                "keyName": "Example"
              }
            }
          },
          "c1"
        ]
      ],
      "using": [
        "urn:ietf:params:jmap:core",
        "urn:stalwart:jmap"
      ]
    }'
```

#### Update

This operation requires the `sysDnsServerUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DnsServer/set",
          {
            "update": {
              "id1": {
                "keyName": "updated value"
              }
            }
          },
          "c1"
        ]
      ],
      "using": [
        "urn:ietf:params:jmap:core",
        "urn:stalwart:jmap"
      ]
    }'
```

#### Destroy

This operation requires the `sysDnsServerDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DnsServer/set",
          {
            "destroy": [
              "id1"
            ]
          },
          "c1"
        ]
      ],
      "using": [
        "urn:ietf:params:jmap:core",
        "urn:stalwart:jmap"
      ]
    }'
```

### `x:DnsServer/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysDnsServerQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:DnsServer/query",
          {
            "filter": {
              "memberTenantId": "id1"
            }
          },
          "c1"
        ]
      ],
      "using": [
        "urn:ietf:params:jmap:core",
        "urn:stalwart:jmap"
      ]
    }'
```

The `x:DnsServer/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `memberTenantId` | id of Tenant |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get DnsServer id1
```

### Create

```sh
stalwart-cli create DnsServer/Tsig \
  --field host=192.0.2.1 \
  --field keyName=Example \
  --field 'key={"@type":"Value","secret":"Example"}' \
  --field description=Example
```

### Query

```sh
stalwart-cli query DnsServer
stalwart-cli query DnsServer --where memberTenantId=id1
```

### Update

```sh
stalwart-cli update DnsServer id1 --field keyName='updated value'
```

### Delete

```sh
stalwart-cli delete DnsServer --ids id1
```

## Nested types

### SecretKey

A secret value provided directly, from an environment variable, or from a file.

- **`Value`**: Secret value. Carries the fields of [`SecretKeyValue`](#secretkeyvalue).
- **`EnvironmentVariable`**: Secret read from environment variable. Carries the fields of [`SecretKeyEnvironmentVariable`](#secretkeyenvironmentvariable).
- **`File`**: Secret read from file. Carries the fields of [`SecretKeyFile`](#secretkeyfile).

#### SecretKeyValue

A secret value provided directly.

##### `secret`

> Type: `String` · required · secret
>
> Password or secret value

#### SecretKeyEnvironmentVariable

A secret value read from an environment variable.

##### `variableName`

> Type: `String` · required
>
> Environment variable name to read the secret from

#### SecretKeyFile

A secret value read from a file.

##### `filePath`

> Type: `String` · required
>
> File path to read the secret from

### SecretKeyOptional

An optional secret value, or none.

- **`None`**: No secret. No additional fields.
- **`Value`**: Secret value. Carries the fields of [`SecretKeyValue`](#secretkeyvalue).
- **`EnvironmentVariable`**: Secret read from environment variable. Carries the fields of [`SecretKeyEnvironmentVariable`](#secretkeyenvironmentvariable).
- **`File`**: Secret read from file. Carries the fields of [`SecretKeyFile`](#secretkeyfile).

### SecretText

A secret text value provided directly, from an environment variable, or from a file.

- **`Text`**: Secret value. Carries the fields of [`SecretTextValue`](#secrettextvalue).
- **`EnvironmentVariable`**: Secret read from environment variable. Carries the fields of [`SecretKeyEnvironmentVariable`](#secretkeyenvironmentvariable).
- **`File`**: Secret read from file. Carries the fields of [`SecretKeyFile`](#secretkeyfile).

#### SecretTextValue

A secret text value provided directly.

##### `secret`

> Type: `Text` · required · secret
>
> Password or secret value

### HurricaneCredential

Hurricane Electric per-zone DDNS credential.

##### `zone`

> Type: `DomainName` · required
>
> DNS zone (origin) the credential applies to

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> DDNS key for the zone

### JokerAuth

Joker DMAPI authentication credentials.

- **`ApiKey`**: API Key. Carries the fields of [`JokerAuthApiKey`](#jokerauthapikey).
- **`UsernamePassword`**: Username and Password. Carries the fields of [`JokerAuthUsernamePassword`](#jokerauthusernamepassword).

#### JokerAuthApiKey

Joker API key authentication.

##### `apiKey`

> Type: [`SecretKey`](#secretkey) · required
>
> Joker DMAPI API key

#### JokerAuthUsernamePassword

Joker username/password authentication.

##### `username`

> Type: `String` · required
>
> Joker DMAPI account username

##### `password`

> Type: [`SecretKey`](#secretkey) · required
>
> Joker DMAPI account password

## Enums

### IpProtocol

| Value | Label |
|---|---|
| `udp` | UDP |
| `tcp` | TCP |

### TsigAlgorithm

| Value | Label |
|---|---|
| `hmac-md5` | HMAC-MD5 |
| `gss` | GSS |
| `hmac-sha1` | HMAC-SHA1 |
| `hmac-sha224` | HMAC-SHA224 |
| `hmac-sha256` | HMAC-SHA256 |
| `hmac-sha256-128` | HMAC-SHA256-128 |
| `hmac-sha384` | HMAC-SHA384 |
| `hmac-sha384-192` | HMAC-SHA384-192 |
| `hmac-sha512` | HMAC-SHA512 |
| `hmac-sha512-256` | HMAC-SHA512-256 |

### OvhEndpoint

| Value | Label |
|---|---|
| `ovh-eu` | OVH EU |
| `ovh-ca` | OVH CA |
| `kimsufi-eu` | Kimsufi EU |
| `kimsufi-ca` | Kimsufi CA |
| `soyoustart-eu` | Soyoustart EU |
| `soyoustart-ca` | Soyoustart CA |

### AzureEnvironment

| Value | Label |
|---|---|
| `public` | Public |
| `china` | China |
| `us-government` | US Government |
