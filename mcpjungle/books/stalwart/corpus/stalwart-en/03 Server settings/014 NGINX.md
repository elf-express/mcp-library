---
title: "NGINX"
source: https://stalw.art/docs/server/reverse-proxy/nginx/
---

# NGINX

> Section: Server settings › Reverse Proxy

[NGINX](https://nginx.org) is a web server that also functions as a reverse proxy, load balancer, and HTTP cache. The `stream` module extends it with TCP / UDP proxying, which is what Stalwart needs for the mail ports.

Stalwart can sit behind NGINX for both HTTP and mail traffic. The example below uses TCP-passthrough on every port, so NGINX hands the TLS connection to Stalwart untouched and the original client IP is preserved through the [Proxy Protocol](https://stalw.art/docs/server/reverse-proxy/proxy-protocol). HTTP-upstream patterns (NGINX terminating TLS for the WebUI and forwarding plain HTTP to Stalwart's port `8080`) are also supported and produce identical OAuth, OIDC, and JMAP discovery responses; see [How discovery URLs are composed](https://stalw.art/docs/server/reverse-proxy/#how-discovery-urls-are-composed) for the full model and set the [`STALWART_PUBLIC_URL`](https://stalw.art/docs/configuration/environment-variables#public-urls) variable to the URL clients reach NGINX on whenever it differs from `https://<defaultHostname>` on port `443`.

Stalwart accepts the Proxy Protocol header when the source address is listed in [`proxyTrustedNetworks`](https://stalw.art/docs/ref/object/system-settings#proxytrustednetworks) on the [SystemSettings](https://stalw.art/docs/ref/object/system-settings) singleton (found in the WebUI under <!-- breadcrumb:SystemSettings --> Settings › Network › Services, Settings › Network › General<!-- /breadcrumb:SystemSettings -->) or in [`overrideProxyTrustedNetworks`](https://stalw.art/docs/ref/object/network-listener#overrideproxytrustednetworks) on the matching [NetworkListener](https://stalw.art/docs/ref/object/network-listener).

## Configuration

NGINX must be built with `--with-stream` for TCP proxying to be available.

```txt
# /etc/nginx/nginx.conf

# Load the required modules
load_module modules/ngx_stream_module.so;

events {
    worker_connections 1024;
}

# Stream configuration
stream {
    # Proxy SMTP
    server {
        listen 25;
        proxy_pass 127.0.0.1:10025;
        proxy_protocol on;
    }

    # Proxy IMAPS
    server {
        listen 993;
        proxy_pass 127.0.0.1:10993;
        proxy_protocol on;
    }

    # Proxy SMTPS
    server {
        listen 465;
        proxy_pass 127.0.0.1:10465;
        proxy_protocol on;
    }

    # Proxy HTTPS
    server {
        listen 443;
        proxy_pass 127.0.0.1:10443;
        proxy_protocol on;
    }
}
```

The `proxy_protocol on` directive emits a Proxy Protocol header toward Stalwart on every forwarded connection. The `proxy_protocol` flag is intentionally absent from each `listen` line: that flag tells NGINX to *expect* an incoming Proxy Protocol header from the client, which mail and HTTP clients do not send. Add it only when another Proxy-Protocol-aware proxy sits in front of NGINX.
