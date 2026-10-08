---
title: "Directory"
source: https://stalw.art/docs/ref/object/directory/
description: "Defines an external directory for account authentication and lookups."
---

# Directory

> Section: Schema reference › Objects

Defines an external directory for account authentication and lookups.

This object can be configured from the [WebUI](https://stalw.art/docs/management/webui/) under Settings › Authentication › Directories

## Fields

Directory is a **multi-variant** object: each instance has an `@type` discriminator selecting one of the variants below, and each variant carries its own set of fields.

### `@type: "Ldap"`

LDAP Directory

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

### `@type: "Sql"`

SQL Database

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

### `@type: "Oidc"`

OpenID Connect

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

## JMAP API

The Directory object is available via the `urn:stalwart:jmap` capability.

### `x:Directory/get`

This is a standard [`Foo/get`](https://www.rfc-editor.org/rfc/rfc8620#section-5.1) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.1), Section 5.1.

This method requires the `sysDirectoryGet` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Directory/get",
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

### `x:Directory/set`

This is a standard [`Foo/set`](https://www.rfc-editor.org/rfc/rfc8620#section-5.3) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.3), Section 5.3.

Supports create, update, and destroy operations in a single call.

#### Create

This operation requires the `sysDirectoryCreate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Directory/set",
          {
            "create": {
              "new1": {
                "@type": "Ldap",
                "baseDn": "Example",
                "bindSecret": {
                  "@type": "None"
                },
                "description": "Example"
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

This operation requires the `sysDirectoryUpdate` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Directory/set",
          {
            "update": {
              "id1": {
                "description": "updated value"
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

This operation requires the `sysDirectoryDestroy` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Directory/set",
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

### `x:Directory/query`

This is a standard [`Foo/query`](https://www.rfc-editor.org/rfc/rfc8620#section-5.5) method as defined in [RFC 8620](https://www.rfc-editor.org/rfc/rfc8620#section-5.5), Section 5.5.

This method requires the `sysDirectoryQuery` [permission](https://stalw.art/docs/ref/permissions).

```bash
curl -X POST https://mail.example.com/api \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
      "methodCalls": [
        [
          "x:Directory/query",
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

The `x:Directory/query` `filter` argument accepts the following conditions (combinable with `AnyOf` / `AllOf` / `Not` per RFC 8620):

| Condition | Kind |
|---|---|
| `memberTenantId` | id of Tenant |

## CLI

`stalwart-cli` wraps the same JMAP calls. See the [CLI reference](https://stalw.art/docs/management/cli/) for installation, authentication, and general usage.

### Fetch

```sh
stalwart-cli get Directory id1
```

### Create

```sh
stalwart-cli create Directory/Ldap \
  --field description=Example \
  --field baseDn=Example \
  --field 'bindSecret={"@type":"None"}'
```

### Query

```sh
stalwart-cli query Directory
stalwart-cli query Directory --where memberTenantId=id1
```

### Update

```sh
stalwart-cli update Directory id1 --field description='updated value'
```

### Delete

```sh
stalwart-cli delete Directory --ids id1
```

## Nested types

### SecretKeyOptional

An optional secret value, or none.

- **`None`**: No secret. No additional fields.
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

### SqlAuthStore

Defines the SQL database used to store account and group information for SQL directories.

- **`Default`**: Use data store (SQL only). No additional fields.
- **`PostgreSql`**: PostgreSQL. Carries the fields of [`PostgreSqlStore`](#postgresqlstore).
- **`MySql`**: mySQL. Carries the fields of [`MySqlStore`](#mysqlstore).
- **`Sqlite`**: SQLite. Carries the fields of [`SqliteStore`](#sqlitestore).

#### PostgreSqlStore

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

#### MySqlStore

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

#### SqliteStore

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

## Enums

### PostgreSqlRecyclingMethod

| Value | Label |
|---|---|
| `fast` | Fast recycling method |
| `verified` | Verified recycling method |
| `clean` | Clean recycling method |
