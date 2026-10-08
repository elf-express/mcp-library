---
title: "Bootstrap"
source: https://stalw.art/docs/ref/object/bootstrap/
description: "Initial setup shown the first time Stalwart starts. Configures the server's identity, storage, user accounts, logging, and DNS management."
---

# Bootstrap

> Section: Schema reference › Objects

Initial setup shown the first time Stalwart starts. Configures the server's identity, storage, user accounts, logging, and DNS management.

## Fields

##### `serverHostname`

> Type: `String` · required
>
> The public hostname this server answers to, for example mail.example.com.
> Used in SMTP greetings, outgoing message headers, and TLS certificate requests.

##### `defaultDomain`

> Type: `String` · required
>
> The primary email domain this installation will serve, for example example.com.
> Additional domains can be added at any time after setup.

##### `requestTlsCertificate`

> Type: `Boolean` · default: `true`
>
> Automatically obtain a free TLS certificate for the server hostname from Let's Encrypt using the ACME protocol, so clients can connect securely out of the box.
> Turn this off if you plan to install a certificate manually.

##### `generateDkimKeys`

> Type: `Boolean` · default: `true`
>
> Generate DKIM signing keys for the default domain. DKIM cryptographically signs outgoing mail and significantly improves the chances that messages reach the recipient's inbox instead of spam.
> Turn this off only if you plan to manage DKIM keys yourself.

##### `dataStore`

> Type: [`DataStore`](https://stalw.art/docs/ref/object/data-store) · default: `{"@type":"RocksDb","path":"/var/lib/stalwart/"}`
>
> Where structured data is kept: email metadata, calendars, contacts, mailbox state, and server settings.
> RocksDB is recommended for single-node installations; PostgreSQL, MySQL, SQLite, and FoundationDB are also supported.

##### `blobStore`

> Type: [`BlobStore`](https://stalw.art/docs/ref/object/blob-store) · default: `{"@type":"Default"}`
>
> Where the raw content of email messages, attachments, and other large files is stored.
> Leave as default to reuse the data store, or point to an object storage service such as S3 for larger deployments.

##### `searchStore`

> Type: [`SearchStore`](https://stalw.art/docs/ref/object/search-store) · default: `{"@type":"Default"}`
>
> Where the full-text search index is kept, so users can search across message bodies and attachments.
> Leave as default to reuse the data store, or point to a dedicated search backend for larger deployments.

##### `inMemoryStore`

> Type: [`InMemoryStore`](https://stalw.art/docs/ref/object/in-memory-store) · default: `{"@type":"Default"}`
>
> Where short-lived data lives: session caches, rate-limit counters, and temporary tokens.
> Leave as default to reuse the data store, or point to Redis for faster lookups and multi-node deployments.

##### `directory`

> Type: [`DirectoryBootstrap`](#directorybootstrap) · default: `{"@type":"Internal"}`
>
> Where user accounts and credentials come from.
> The internal directory is recommended for ease of setup and management through the WebUI, but external OIDC or LDAP directories can be used for single sign-on and user provisioning in larger organizations.

##### `tracer`

> Type: [`Tracer`](https://stalw.art/docs/ref/object/tracer) · default: `{"@type":"Log","path":"/var/log/stalwart/"}`
>
> Where the server writes log messages, traces, and diagnostic events.
> Defaults to log files on disk; remote destinations such as OpenTelemetry or webhooks can be added after setup.

##### `dnsServer`

> Type: [`DnsServerBootstrap`](#dnsserverbootstrap) · default: `{"@type":"Manual"}`
>
> Optionally automate the DNS records your mail server needs (SPF, DKIM, DMARC, and more) by connecting to your DNS provider's API.
> Leave as manual unless your DNS is hosted by a supported provider; this can always be enabled later.

## JMAP API

The Bootstrap singleton is available via the `urn:stalwart:jmap` capability.

### `x:Bootstrap/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

For singletons, the `ids` argument should be the literal `singleton` (or `null` to return the single instance).

This method requires the `sysBootstrapGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Bootstrap/get",
          {
            "ids": [
              "singleton"
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

### `x:Bootstrap/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

For singletons, only the `update` argument with id `singleton` is accepted; `create` and `destroy` arguments are rejected.

This method requires the `sysBootstrapUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Bootstrap/set",
          {
            "update": {
              "singleton": {
                "serverHostname": "updated value"
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

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get Bootstrap
```

### Update

```sh
stalwart-cli update Bootstrap --field serverHostname='updated value'
```

## Nested types

### DirectoryBootstrap

External directory service configuration for user authentication and lookup.

- **`Internal`**: Use the internal directory. No additional fields.
- **`Ldap`**: LDAP Directory. Carries the fields of [`LdapDirectory`](#ldapdirectory).
- **`Sql`**: SQL Database. Carries the fields of [`SqlDirectory`](#sqldirectory).
- **`Oidc`**: OpenID Connect. Carries the fields of [`OidcDirectory`](#oidcdirectory).

#### LdapDirectory

LDAP directory connection and mapping settings.

##### `description`

> Type: `String` · required
>
> Short description of this directory

##### `url`

> Type: `Uri` · default: `"ldap://localhost:389"`
>
> URL of the LDAP server

##### `timeout`

> Type: `Duration` · default: `30000`
>
> Connection timeout to the server

##### `allowInvalidCerts`

> Type: `Boolean` · default: `false`
>
> Allow invalid TLS certificates when connecting to the server

##### `useTls`

> Type: `Boolean` · default: `false`
>
> Use TLS to connect to the remote server

##### `baseDn`

> Type: `String` · required
>
> The base distinguished name (DN) from where searches should begin

##### `bindDn`

> Type: `String?`
>
> The distinguished name of the account that the server will bind as to connect to the LDAP directory

##### `bindSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> The password or secret for the bind DN account

##### `bindAuthentication`

> Type: `Boolean` · default: `true`
>
> Whether to use bind authentication. When enabled, the server will use the filterLogin to search for the user account and then attempt to bind as that account using the provided password. When disabled, the server will use the bind DN and secret to connect to the LDAP server and obtain the secret from the account entry using the attrSecret attribute.

##### `filterLogin`

> Type: `String` · default: `"(&(objectClass=inetOrgPerson)(mail=?))"`
>
> Searches for user accounts by e-mail address during authentication

##### `filterMailbox`

> Type: `String` · default: `"(|(&(objectClass=inetOrgPerson)(|(mail=?)(mailAlias=?)))(&(objectClass=groupOfNames)(|(mail=?)(mailAlias=?))))"`
>
> Searches for users or groups matching a recipient e-mail address or alias

##### `filterMemberOf`

> Type: `String?` · default: `"(&(objectClass=groupOfNames)(member=?))"`
>
> Searches for groups that an account is member of. Use when the group membership is not provided in the account entry. The ? in the filter will be replaced with the account DN.

##### `attrClass`

> Type: `Set<String>` · default: `{"objectClass":true}`
>
> LDAP attribute for the user's account type, if missing defaults to individual.

##### `attrDescription`

> Type: `Set<String>` · default: `{"description":true}`
>
> LDAP attributes used to store the user's description

##### `attrEmail`

> Type: `Set<String>` · default: `{"mail":true}`
>
> LDAP attribute for the user's primary email address

##### `attrEmailAlias`

> Type: `Set<String>` · default: `{"mailAlias":true}`
>
> LDAP attribute for the user's email alias(es)

##### `attrMemberOf`

> Type: `Set<String>` · default: `{"memberOf":true}`
>
> LDAP attributes for the groups that a user belongs to. Used when filterMemberOf is not configured or when the group membership is also provided in the account entry.

##### `attrSecret`

> Type: `Set<String>` · default: `{"userPassword":true}`
>
> LDAP attribute for the user's password hash. This setting is required when binding as a service user. When using bind authentication, configure the secret-changed attribute instead.

##### `attrSecretChanged`

> Type: `Set<String>` · default: `{"pwdChangeTime":true}`
>
> LDAP attribute that provides a password change hash or a timestamp indicating when the password was last changed. When using bind authentication, this attribute is used to determine when to invalidate OAuth tokens.

##### `groupClass`

> Type: `String` · default: `"groupOfNames"`
>
> LDAP object class used to identify group entries

##### `poolMaxConnections`

> Type: `UnsignedInt` · default: `10` · max: 8192
>
> Maximum number of connections that can be maintained simultaneously in the connection pool

##### `poolTimeoutCreate`

> Type: `Duration` · default: `30000`
>
> Maximum amount of time that the connection pool will wait for a new connection to be created

##### `poolTimeoutRecycle`

> Type: `Duration` · default: `30000`
>
> Maximum amount of time that the connection pool manager will wait for a connection to be recycled

##### `poolTimeoutWait`

> Type: `Duration` · default: `30000`
>
> Maximum amount of time that the connection pool will wait for a connection to become available

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> Identifier for the tenant this directory belongs to

##### SecretKeyOptional

An optional secret value, or none.

- **`None`**: No secret. No additional fields.
- **`Value`**: Secret value. Carries the fields of [`SecretKeyValue`](#secretkeyvalue).
- **`EnvironmentVariable`**: Secret read from environment variable. Carries the fields of [`SecretKeyEnvironmentVariable`](#secretkeyenvironmentvariable).
- **`File`**: Secret read from file. Carries the fields of [`SecretKeyFile`](#secretkeyfile).

##### SecretKeyValue

A secret value provided directly.

##### `secret`

> Type: `String` · required · secret
>
> Password or secret value

##### SecretKeyEnvironmentVariable

A secret value read from an environment variable.

##### `variableName`

> Type: `String` · required
>
> Environment variable name to read the secret from

##### SecretKeyFile

A secret value read from a file.

##### `filePath`

> Type: `String` · required
>
> File path to read the secret from

#### SqlDirectory

SQL database directory settings.

##### `description`

> Type: `String` · required
>
> Short description of this directory

##### `store`

> Type: [`SqlAuthStore`](#sqlauthstore) · required
>
> Storage backend where accounts and groups are stored

##### `columnEmail`

> Type: `String` · default: `"name"`
>
> Column name for e-mail address. Optional, you can use instead a query to obtain the account's addresses.

##### `columnSecret`

> Type: `String` · default: `"secret"`
>
> Column name for the account password.

##### `columnClass`

> Type: `String?` · default: `"type"`
>
> Column name for account type

##### `columnDescription`

> Type: `String?` · default: `"description"`
>
> Column name for account full name or description

##### `queryLogin`

> Type: `String` · default: `"SELECT name, secret, description, type FROM accounts WHERE name = $1"`
>
> Query to obtain the account details by login e-mail address.

##### `queryRecipient`

> Type: `String` · default: `"SELECT name, secret, description, type FROM accounts WHERE name = $1 AND active = true"`
>
> Query to obtain the account details by recipient e-mail address or alias.

##### `queryMemberOf`

> Type: `String?` · default: `"SELECT member_of FROM group_members WHERE name = $1"`
>
> Query to obtain the groups an account is member of.

##### `queryEmailAliases`

> Type: `String?` · default: `"SELECT address FROM emails WHERE name = $1"`
>
> Query to obtain the e-mail aliases of an account.

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> Identifier for the tenant this directory belongs to

##### SqlAuthStore

Defines the SQL database used to store account and group information for SQL directories.

- **`Default`**: Use data store (SQL only). No additional fields.
- **`PostgreSql`**: PostgreSQL. Carries the fields of [`PostgreSqlStore`](#postgresqlstore).
- **`MySql`**: mySQL. Carries the fields of [`MySqlStore`](#mysqlstore).
- **`Sqlite`**: SQLite. Carries the fields of [`SqliteStore`](#sqlitestore).

##### PostgreSqlStore

PostgreSQL data store.

##### `timeout`

> Type: `Duration?` · default: `15000`
>
> Connection timeout to the database

##### `useTls`

> Type: `Boolean` · default: `false`
>
> Use TLS to connect to the store

##### `allowInvalidCerts`

> Type: `Boolean` · default: `false`
>
> Allow invalid TLS certificates when connecting to the store

##### `poolMaxConnections`

> Type: `UnsignedInt?` · default: `10` · max: 8192 · min: 1
>
> Maximum number of connections to the store

##### `poolRecyclingMethod`

> Type: [`PostgreSqlRecyclingMethod`](#postgresqlrecyclingmethod) · default: `"fast"`
>
> Method to use when recycling connections in the pool

##### `readReplicas`

> Type: `List<`[`PostgreSqlSettings`](#postgresqlsettings)`>` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> List of read replicas for the store

##### `host`

> Type: `String` · required
>
> Hostname of the database server

##### `port`

> Type: `UnsignedInt` · default: `5432` · max: 65535 · min: 1
>
> Port of the database server

##### `database`

> Type: `String` · default: `"stalwart"`
>
> Name of the database

##### `authUsername`

> Type: `String?` · default: `"stalwart"`
>
> Username to connect to the store

##### `authSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Password to connect to the store

##### `options`

> Type: `String?`
>
> Additional connection options

##### PostgreSqlSettings

PostgreSQL connection settings.

##### `host`

> Type: `String` · required
>
> Hostname of the database server

##### `port`

> Type: `UnsignedInt` · default: `5432` · max: 65535 · min: 1
>
> Port of the database server

##### `database`

> Type: `String` · default: `"stalwart"`
>
> Name of the database

##### `authUsername`

> Type: `String?` · default: `"stalwart"`
>
> Username to connect to the store

##### `authSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Password to connect to the store

##### `options`

> Type: `String?`
>
> Additional connection options

##### MySqlStore

MySQL data store.

##### `timeout`

> Type: `Duration?` · default: `15000`
>
> Connection timeout to the database

##### `useTls`

> Type: `Boolean` · default: `false`
>
> Use TLS to connect to the store

##### `allowInvalidCerts`

> Type: `Boolean` · default: `false`
>
> Allow invalid TLS certificates when connecting to the store

##### `maxAllowedPacket`

> Type: `UnsignedInt?` · max: 1073741824 · min: 1024
>
> Maximum size of a packet in bytes

##### `poolMaxConnections`

> Type: `UnsignedInt?` · default: `10` · max: 8192 · min: 1
>
> Maximum number of connections to the store

##### `poolMinConnections`

> Type: `UnsignedInt?` · default: `5` · max: 8192 · min: 1
>
> Minimum number of connections to the store

##### `readReplicas`

> Type: `List<`[`MySqlSettings`](#mysqlsettings)`>` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> List of read replicas for the store

##### `host`

> Type: `String` · required
>
> Hostname of the database server

##### `port`

> Type: `UnsignedInt` · default: `3306` · max: 65535 · min: 1
>
> Port of the database server

##### `database`

> Type: `String` · default: `"stalwart"`
>
> Name of the database

##### `authUsername`

> Type: `String?` · default: `"stalwart"`
>
> Username to connect to the store

##### `authSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Password to connect to the store

##### MySqlSettings

MySQL connection settings.

##### `host`

> Type: `String` · required
>
> Hostname of the database server

##### `port`

> Type: `UnsignedInt` · default: `3306` · max: 65535 · min: 1
>
> Port of the database server

##### `database`

> Type: `String` · default: `"stalwart"`
>
> Name of the database

##### `authUsername`

> Type: `String?` · default: `"stalwart"`
>
> Username to connect to the store

##### `authSecret`

> Type: [`SecretKeyOptional`](#secretkeyoptional) · required
>
> Password to connect to the store

##### SqliteStore

SQLite embedded data store.

##### `path`

> Type: `String` · required
>
> Path to the SQLite data directory

##### `poolWorkers`

> Type: `UnsignedInt?` · max: 64 · min: 1
>
> Number of worker threads to use for the store, defaults to the number of cores

##### `poolMaxConnections`

> Type: `UnsignedInt` · default: `10` · max: 8192 · min: 1
>
> Maximum number of connections to the store

#### OidcDirectory

OpenID Connect directory settings.

##### `description`

> Type: `String` · required
>
> Short description of this directory

##### `issuerUrl`

> Type: `Uri` · required
>
> The base URL of the OpenID Connect provider (e.g. https://sso.example.com/realms/myrealm). Stalwart will use this URL to automatically discover the provider's endpoints, including the token validation and user info endpoints.

##### `requireAudience`

> Type: `String?`
>
> If set, Stalwart will reject any token whose aud (audience) claim does not include this value. Set this to the client ID or resource identifier registered for Stalwart in your identity provider to ensure tokens issued for other applications are not accepted.

##### `requireScopes`

> Type: `Set<String>` · default: `{"email":true,"openid":true}`
>
> If set, Stalwart will reject any token that does not include all of the specified scopes. Useful for ensuring that only tokens explicitly granted access to the mail server are accepted.

##### `claimUsername`

> Type: `String` · default: `"preferred_username"`
>
> The claim name used to retrieve the user's login name from the token or user info response. Common values are preferred_username, email, or sub depending on your provider's configuration. If the claim value is not an email address and usernameDomain is set, the domain will be appended automatically (e.g. john becomes john@example.com). If the claim value already contains an @, it is used as-is. If the claim value is not an email address and no usernameDomain is configured, Stalwart will fall back to the email claim. If neither yields a valid email address, authentication will be rejected.

##### `usernameDomain`

> Type: `String?`
>
> The domain name to append to the username when the value of claimUsername does not contain an @ symbol (e.g. setting this to example.com will turn john into john@example.com). If not set, Stalwart will fall back to the email claim when the username claim does not contain a valid email address.

##### `claimName`

> Type: `String?` · default: `"name"`
>
> The claim name used to retrieve the user's display name from the token or user info response. Common values are name or display_name. If not set, the display name will not be populated.

##### `claimGroups`

> Type: `String?`
>
> The claim name used to retrieve the user's group memberships from the token or user info response. Common values are groups or roles depending on your provider's configuration. If not set, group information will not be populated. Note that some providers omit group claims from the token to keep its size small and only return them via the user info endpoint, if group information is missing, ensure your provider is configured to include it.

##### `memberTenantId`

> Type: `Id<`[`Tenant`](https://stalw.art/docs/ref/object/tenant)`>?` · [enterprise](https://stalw.art/docs/server/enterprise)
>
> Identifier for the tenant this directory belongs to

### DnsServerBootstrap

Automatic DNS server management.

- **`Manual`**: Manual DNS server management. No additional fields.
- **`Tsig`**: RFC2136 (TSIG). Carries the fields of [`DnsServerTsig`](#dnsservertsig).
- **`Deprecated1`**: RFC2136 (SIG0 - deprecated). No additional fields.
- **`Cloudflare`**: Cloudflare. Carries the fields of [`DnsServerCloudflare`](#dnsservercloudflare).
- **`DigitalOcean`**: DigitalOcean. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`DeSEC`**: DeSEC. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`Ovh`**: OVH. Carries the fields of [`DnsServerOvh`](#dnsserverovh).
- **`Bunny`**: BunnyDNS. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`Porkbun`**: Porkbun. Carries the fields of [`DnsServerPorkbun`](#dnsserverporkbun).
- **`Dnsimple`**: DNSimple. Carries the fields of [`DnsServerDnsimple`](#dnsserverdnsimple).
- **`Spaceship`**: Spaceship. Carries the fields of [`DnsServerSpaceship`](#dnsserverspaceship).
- **`Route53`**: AWS Route53. Carries the fields of [`DnsServerRoute53`](#dnsserverroute53).
- **`GoogleCloudDns`**: Google Cloud DNS. Carries the fields of [`DnsServerGoogleCloudDns`](#dnsservergoogleclouddns).
- **`Alidns`**: Alibaba Cloud DNS. Carries the fields of [`DnsServerAlidns`](#dnsserveralidns).
- **`ArvanCloud`**: ArvanCloud. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`Autodns`**: InterNetX AutoDNS. Carries the fields of [`DnsServerAutodns`](#dnsserverautodns).
- **`AzureDns`**: Microsoft Azure DNS. Carries the fields of [`DnsServerAzureDns`](#dnsserverazuredns).
- **`BaiduCloud`**: Baidu Cloud DNS. Carries the fields of [`DnsServerBaiduCloud`](#dnsserverbaiducloud).
- **`BluecatV2`**: BlueCat Address Manager. Carries the fields of [`DnsServerBluecatV2`](#dnsserverbluecatv2).
- **`ClouDns`**: ClouDNS. Carries the fields of [`DnsServerClouDns`](#dnsservercloudns).
- **`Constellix`**: Constellix. Carries the fields of [`DnsServerConstellix`](#dnsserverconstellix).
- **`Cpanel`**: cPanel. Carries the fields of [`DnsServerCpanel`](#dnsservercpanel).
- **`Ddnss`**: DDNSS.de. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`DnsMadeEasy`**: DNS Made Easy. Carries the fields of [`DnsServerDnsMadeEasy`](#dnsserverdnsmadeeasy).
- **`Domeneshop`**: Domeneshop. Carries the fields of [`DnsServerDomeneshop`](#dnsserverdomeneshop).
- **`Dreamhost`**: Dreamhost. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`DuckDns`**: DuckDNS. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`Dynu`**: Dynu. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`EasyDns`**: EasyDNS. Carries the fields of [`DnsServerEasyDns`](#dnsservereasydns).
- **`EdgeDns`**: Akamai EdgeDNS. Carries the fields of [`DnsServerEdgeDns`](#dnsserveredgedns).
- **`Exoscale`**: Exoscale. Carries the fields of [`DnsServerExoscale`](#dnsserverexoscale).
- **`FreeMyIp`**: freemyip.com. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`GandiV5`**: Gandi LiveDNS v5. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`Gcore`**: Gcore. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`Glesys`**: GleSYS. Carries the fields of [`DnsServerGlesys`](#dnsserverglesys).
- **`Godaddy`**: GoDaddy. Carries the fields of [`DnsServerGodaddy`](#dnsservergodaddy).
- **`Hetzner`**: Hetzner. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`HostingDe`**: hosting.de. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`Hostinger`**: Hostinger. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`HuaweiCloud`**: Huawei Cloud DNS. Carries the fields of [`DnsServerHuaweiCloud`](#dnsserverhuaweicloud).
- **`Hurricane`**: Hurricane Electric. Carries the fields of [`DnsServerHurricane`](#dnsserverhurricane).
- **`IbmCloud`**: IBM Cloud. Carries the fields of [`DnsServerIbmCloud`](#dnsserveribmcloud).
- **`Infoblox`**: Infoblox NIOS WAPI. Carries the fields of [`DnsServerInfoblox`](#dnsserverinfoblox).
- **`Infomaniak`**: Infomaniak. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`Inwx`**: INWX. Carries the fields of [`DnsServerInwx`](#dnsserverinwx).
- **`Ionos`**: IONOS. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`Ipv64`**: IPv64. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`Joker`**: Joker. Carries the fields of [`DnsServerJoker`](#dnsserverjoker).
- **`Lightsail`**: AWS Lightsail. Carries the fields of [`DnsServerLightsail`](#dnsserverlightsail).
- **`Linode`**: Linode. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`LuaDns`**: LuaDNS. Carries the fields of [`DnsServerLuaDns`](#dnsserverluadns).
- **`MythicBeasts`**: Mythic Beasts. Carries the fields of [`DnsServerMythicBeasts`](#dnsservermythicbeasts).
- **`Namecheap`**: Namecheap. Carries the fields of [`DnsServerNamecheap`](#dnsservernamecheap).
- **`NameDotCom`**: Name.com. Carries the fields of [`DnsServerNameDotCom`](#dnsservernamedotcom).
- **`NameSilo`**: NameSilo. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`Netcup`**: Netcup. Carries the fields of [`DnsServerNetcup`](#dnsservernetcup).
- **`Netlify`**: Netlify. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`Nifcloud`**: Nifcloud. Carries the fields of [`DnsServerNifcloud`](#dnsservernifcloud).
- **`Ns1`**: NS1. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`OracleCloud`**: Oracle Cloud. Carries the fields of [`DnsServerOracleCloud`](#dnsserveroraclecloud).
- **`Plesk`**: Plesk. Carries the fields of [`DnsServerPlesk`](#dnsserverplesk).
- **`Safedns`**: ANS SafeDNS. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`Scaleway`**: Scaleway. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`TencentCloud`**: Tencent Cloud DNSPod. Carries the fields of [`DnsServerTencentCloud`](#dnsservertencentcloud).
- **`Transip`**: TransIP. Carries the fields of [`DnsServerTransip`](#dnsservertransip).
- **`UltraDns`**: UltraDNS. Carries the fields of [`DnsServerUltraDns`](#dnsserverultradns).
- **`Vercel`**: Vercel. Carries the fields of [`DnsServerVercel`](#dnsserververcel).
- **`Volcengine`**: Volcano Engine. Carries the fields of [`DnsServerVolcengine`](#dnsservervolcengine).
- **`Vultr`**: Vultr. Carries the fields of [`DnsServerCloud`](#dnsservercloud).
- **`WebSupport`**: WebSupport. Carries the fields of [`DnsServerWebSupport`](#dnsserverwebsupport).
- **`YandexCloud`**: Yandex Cloud. Carries the fields of [`DnsServerYandexCloud`](#dnsserveryandexcloud).
- **`PowerDns`**: PowerDNS Authoritative. Carries the fields of [`DnsServerPowerDns`](#dnsserverpowerdns).

#### DnsServerTsig

RFC2136 TSIG DNS server.

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

##### SecretKey

A secret value provided directly, from an environment variable, or from a file.

- **`Value`**: Secret value. Carries the fields of [`SecretKeyValue`](#secretkeyvalue).
- **`EnvironmentVariable`**: Secret read from environment variable. Carries the fields of [`SecretKeyEnvironmentVariable`](#secretkeyenvironmentvariable).
- **`File`**: Secret read from file. Carries the fields of [`SecretKeyFile`](#secretkeyfile).

#### DnsServerCloudflare

Cloudflare DNS server.

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

#### DnsServerCloud

Cloud DNS server with token authentication.

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

#### DnsServerOvh

OVH DNS server.

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

#### DnsServerPorkbun

Porkbun DNS server.

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

#### DnsServerDnsimple

DNSimple DNS server.

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

#### DnsServerSpaceship

Spaceship DNS server.

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

#### DnsServerRoute53

AWS Route53 DNS server.

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

#### DnsServerGoogleCloudDns

Google Cloud DNS server.

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

##### SecretText

A secret text value provided directly, from an environment variable, or from a file.

- **`Text`**: Secret value. Carries the fields of [`SecretTextValue`](#secrettextvalue).
- **`EnvironmentVariable`**: Secret read from environment variable. Carries the fields of [`SecretKeyEnvironmentVariable`](#secretkeyenvironmentvariable).
- **`File`**: Secret read from file. Carries the fields of [`SecretKeyFile`](#secretkeyfile).

##### SecretTextValue

A secret text value provided directly.

##### `secret`

> Type: `Text` · required · secret
>
> Password or secret value

#### DnsServerAlidns

Alibaba Cloud DNS server.

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

#### DnsServerAutodns

InterNetX AutoDNS server.

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

#### DnsServerAzureDns

Microsoft Azure DNS server (OAuth2 client credentials).

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

#### DnsServerBaiduCloud

Baidu Cloud DNS server.

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

#### DnsServerBluecatV2

BlueCat Address Manager v2 REST API.

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

#### DnsServerClouDns

ClouDNS server.

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

#### DnsServerConstellix

Constellix DNS server.

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

#### DnsServerCpanel

cPanel UAPI DNS server.

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

#### DnsServerDnsMadeEasy

DNS Made Easy DNS server.

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

#### DnsServerDomeneshop

Domeneshop DNS server.

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

#### DnsServerEasyDns

EasyDNS REST API server.

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

#### DnsServerEdgeDns

Akamai EdgeDNS server.

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

#### DnsServerExoscale

Exoscale DNS server.

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

#### DnsServerGlesys

GleSYS DNS server.

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

#### DnsServerGodaddy

GoDaddy DNS server.

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

#### DnsServerHuaweiCloud

Huawei Cloud DNS server.

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

#### DnsServerHurricane

Hurricane Electric free DNS service.

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

##### HurricaneCredential

Hurricane Electric per-zone DDNS credential.

##### `zone`

> Type: `DomainName` · required
>
> DNS zone (origin) the credential applies to

##### `secret`

> Type: [`SecretKey`](#secretkey) · required
>
> DDNS key for the zone

#### DnsServerIbmCloud

IBM Cloud (SoftLayer classic) DNS server.

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

#### DnsServerInfoblox

Infoblox NIOS WAPI server.

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

#### DnsServerInwx

INWX DNS server.

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

#### DnsServerJoker

Joker DMAPI DNS server.

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

##### JokerAuth

Joker DMAPI authentication credentials.

- **`ApiKey`**: API Key. Carries the fields of [`JokerAuthApiKey`](#jokerauthapikey).
- **`UsernamePassword`**: Username and Password. Carries the fields of [`JokerAuthUsernamePassword`](#jokerauthusernamepassword).

##### JokerAuthApiKey

Joker API key authentication.

##### `apiKey`

> Type: [`SecretKey`](#secretkey) · required
>
> Joker DMAPI API key

##### JokerAuthUsernamePassword

Joker username/password authentication.

##### `username`

> Type: `String` · required
>
> Joker DMAPI account username

##### `password`

> Type: [`SecretKey`](#secretkey) · required
>
> Joker DMAPI account password

#### DnsServerLightsail

AWS Lightsail DNS server.

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

#### DnsServerLuaDns

LuaDNS server.

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

#### DnsServerMythicBeasts

Mythic Beasts DNSv2 server.

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

#### DnsServerNamecheap

Namecheap DNS server.

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

#### DnsServerNameDotCom

Name.com v4 DNS server.

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

#### DnsServerNetcup

Netcup CCP DNS server.

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

#### DnsServerNifcloud

Nifcloud DNS server.

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

#### DnsServerOracleCloud

Oracle Cloud Infrastructure DNS server.

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

#### DnsServerPlesk

Plesk REST API DNS server.

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

#### DnsServerTencentCloud

Tencent Cloud DNSPod server.

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

#### DnsServerTransip

TransIP v6 DNS server.

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

#### DnsServerUltraDns

UltraDNS REST API server.

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

#### DnsServerVercel

Vercel DNS server.

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

#### DnsServerVolcengine

Volcano Engine DNS server.

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

#### DnsServerWebSupport

WebSupport DNS server.

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

#### DnsServerYandexCloud

Yandex Cloud DNS server.

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

#### DnsServerPowerDns

PowerDNS Authoritative HTTP API server.

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

## Enums

### PostgreSqlRecyclingMethod

| Value | Label |
|---|---|
| `fast` | Fast recycling method |
| `verified` | Verified recycling method |
| `clean` | Clean recycling method |

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
