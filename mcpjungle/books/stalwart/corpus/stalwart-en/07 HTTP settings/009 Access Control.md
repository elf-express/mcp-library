---
title: "Access Control"
source: https://stalw.art/docs/http/access-control/
---

# Access Control

> Section: HTTP settings

Stalwart provides a flexible access control mechanism for the HTTP server. Rules can restrict access by IP address, resource path, method name, listener identity, and other request attributes, so that sensitive services can be exposed only to the clients and listeners that require them.

## Configuration

Access rules are carried by the [`allowedEndpoints`](https://stalw.art/docs/ref/object/http#allowedendpoints) expression on the [Http](https://stalw.art/docs/ref/object/http) singleton (found in the WebUI under <!-- breadcrumb:Http --> Settings › Network › HTTP › General, Settings › Network › HTTP › Security<!-- /breadcrumb:Http -->). The expression is evaluated for each incoming request; it must return an HTTP status code. A result of `200` permits the request, while any other value denies it and the server responds with the returned status. By default the expression evaluates to `200`, allowing every endpoint.

## Examples

### Restriction by IP address

The following rule restricts access to `/api/*` to requests originating from `127.0.0.1`:

```json
{
  "allowedEndpoints": {
    "match": {
      "0": {"if": "starts_with(url_path, '/api') && remote_ip != '127.0.0.1'", "then": "404"}
    },
    "else": "200"
  }
}
```

### Restriction by IP range

The following rule allows public access to `/robots.txt` and `/.well-known/*`; all other requests are denied unless they originate from the `192.168.1.*` network.

```json
{
  "allowedEndpoints": {
    "match": {
      "0": {"if": "starts_with(remote_ip, '192.168.1.') || contains(['robots.txt', '.well-known'], split(url_path, '/')[1])", "then": "200"}
    },
    "else": "400"
  }
}
```

### Restriction by listener

Two HTTP listeners can be defined on the [NetworkListener](https://stalw.art/docs/ref/object/network-listener) object (found in the WebUI under <!-- breadcrumb:NetworkListener --> Settings › Network › Listeners<!-- /breadcrumb:NetworkListener -->): a `private-http` listener bound to localhost, and a `public-http` listener bound to all interfaces. HTTP requests arriving through `private-http` are unrestricted, while requests coming from `public-http` are only allowed for the `/jmap`, `/robots.txt`, and `/.well-known/*` endpoints.

The rule on the Http singleton:

```json
{
  "allowedEndpoints": {
    "match": {
      "0": {"if": "listener == 'private-http' || contains(['jmap', 'robots.txt', '.well-known'], split(url_path, '/')[1])", "then": "200"}
    },
    "else": "404"
  }
}
```

### Restriction of the SCIM endpoint

The [SCIM provisioning endpoint](https://stalw.art/docs/auth/scim/) is reached by an external identity provider rather than by users, so it is usually served to a small, known set of addresses. The following rule confines `/scim` to one network and leaves every other endpoint unchanged:

```json
{
  "allowedEndpoints": {
    "match": {
      "0": {"if": "starts_with(url_path, '/scim') && !starts_with(remote_ip, '203.0.113.')", "then": "404"}
    },
    "else": "200"
  }
}
```

Responding with `404` rather than `403` keeps the presence of the endpoint from being advertised to callers that are not expected to use it.

### Restriction by endpoint and method

The following rule disables JMAP access unless the request is an `OPTIONS` request:

```json
{
  "allowedEndpoints": {
    "match": {
      "0": {"if": "!starts_with(url, '/jmap') || method == 'OPTIONS'", "then": "200"}
    },
    "else": "400"
  }
}
```
