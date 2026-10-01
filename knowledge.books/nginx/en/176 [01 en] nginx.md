---
title: "nginx"
source: "https://nginx.org/en/index.html"
chapter: ["en"]
order: 176
lang: "other"
translated_by: "original"
captured: "2026-09-29T09:40:14.184Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx enterprise](<175 [01 en] nginx enterprise.md>)　｜　[下一篇：nginx Linux packages ➡](<177 [01 en] nginx Linux packages.md>)

# nginx

> 章節：[en](<000 目錄.md#c-1>)

## nginx

|   |
| --- |
| [Basic HTTP server features](#basic_http_features)<br>[Other HTTP server features](#other_http_features)<br>[Mail proxy server features](#mail_proxy_server_features)<br>[TCP/UDP proxy server features](#generic_proxy_server_features)<br>[Architecture and scalability](#architecture_and_scalability)<br>[Tested OS and platforms](#tested_os_and_platforms) |

nginx ("*engine x*") is an HTTP web server, reverse proxy, content cache, load balancer, TCP/UDP proxy server, and mail proxy server. Originally written by [Igor Sysoev](http://sysoev.ru/en/) and distributed under the [2-clause BSD License](<354 page.md>).

Known for flexibility and high performance with low resource utilization, nginx is:

-   the world's most popular web server \[[Netcraft](https://news.netcraft.com/archives/category/web-server-survey/)\];
-   consistently one of the most popular [Docker images](https://hub.docker.com/search?q=nginx) \[[DataDog](https://www.datadoghq.com/docker-adoption/#six)\];
-   powering multiple [Ingress Controllers for Kubernetes](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/), including [our own](https://github.com/nginxinc/kubernetes-ingress).

Enterprise distributions, commercial support and training are [available from F5, Inc.](<175 [01 en] nginx enterprise.md>)

#### Basic HTTP server features

-   Serving static and [index](<071 [01.01.03 http] Module ngx_http_index_module.md>) files, [autoindexing](<053 [01.01.03 http] Module ngx_http_autoindex_module.md>); [open file descriptor cache](<056 [01.01.03 http] Module ngx_http_core_module.md#open_file_cache>);
-   [Accelerated reverse proxying with caching](<085 [01.01.03 http] Module ngx_http_proxy_module.md>); [load balancing and fault tolerance](<105 [01.01.03 http] Module ngx_http_upstream_module.md>);
-   Accelerated support with caching of [FastCGI](<060 [01.01.03 http] Module ngx_http_fastcgi_module.md>), [uwsgi](<107 [01.01.03 http] Module ngx_http_uwsgi_module.md>), [SCGI](<091 [01.01.03 http] Module ngx_http_scgi_module.md>), and [memcached](<079 [01.01.03 http] Module ngx_http_memcached_module.md>) servers; [load balancing and fault tolerance](<105 [01.01.03 http] Module ngx_http_upstream_module.md>);
-   Modular architecture. Filters include [gzipping](<066 [01.01.03 http] Module ngx_http_gzip_module.md>), byte ranges, chunked responses, [XSLT](<110 [01.01.03 http] Module ngx_http_xslt_module.md>), [SSI](<097 [01.01.03 http] Module ngx_http_ssi_module.md>), and [image transformation](<070 [01.01.03 http] Module ngx_http_image_filter_module.md>) filter. Multiple SSI inclusions within a single page can be processed in parallel if they are handled by proxied or FastCGI/uwsgi/SCGI servers;
-   [SSL and TLS SNI support](<098 [01.01.03 http] Module ngx_http_ssl_module.md>);
-   Support for [HTTP/2](<108 [01.01.03 http] Module ngx_http_v2_module.md>) with weighted and dependency-based prioritization;
-   Support for [HTTP/3](<109 [01.01.03 http] Module ngx_http_v3_module.md>).

#### Other HTTP server features

-   Name-based and IP-based [virtual servers](<111 [01.01.03 http] How nginx processes a request.md>);
-   [Keep-alive](<056 [01.01.03 http] Module ngx_http_core_module.md#keepalive_timeout>) and pipelined connections support;
-   [Access log formats](<077 [01.01.03 http] Module ngx_http_log_module.md#log_format>), [buffered log writing](<077 [01.01.03 http] Module ngx_http_log_module.md#access_log>), [fast log rotation](<026 [01.01 docs] Controlling nginx.md#logs>), and [syslog logging](<169 [01.01 docs] Logging to syslog.md>);
-   3xx-5xx error codes [redirection](<056 [01.01.03 http] Module ngx_http_core_module.md#error_page>);
-   The rewrite module: [URI changing using regular expressions](<090 [01.01.03 http] Module ngx_http_rewrite_module.md>);
-   [Executing different functions](<090 [01.01.03 http] Module ngx_http_rewrite_module.md#if>) depending on the [client address](<062 [01.01.03 http] Module ngx_http_geo_module.md>);
-   Access control based on [client IP address](<045 [01.01.03 http] Module ngx_http_access_module.md>), [by password (HTTP Basic authentication)](<049 [01.01.03 http] Module ngx_http_auth_basic_module.md>) and by the [result of subrequest](<051 [01.01.03 http] Module ngx_http_auth_request_module.md>);
-   Validation of [HTTP referer](<089 [01.01.03 http] Module ngx_http_referer_module.md>);
-   The [PUT, DELETE, MKCOL, COPY, and MOVE](<057 [01.01.03 http] Module ngx_http_dav_module.md>) methods;
-   [FLV](<061 [01.01.03 http] Module ngx_http_flv_module.md>) and [MP4](<081 [01.01.03 http] Module ngx_http_mp4_module.md>) streaming;
-   [Response rate limiting](<056 [01.01.03 http] Module ngx_http_core_module.md#limit_rate>);
-   Limiting the number of simultaneous [connections](<075 [01.01.03 http] Module ngx_http_limit_conn_module.md>) or [requests](<076 [01.01.03 http] Module ngx_http_limit_req_module.md>) coming from one address;
-   [IP-based geolocation](<063 [01.01.03 http] Module ngx_http_geoip_module.md>);
-   [A/B testing](<096 [01.01.03 http] Module ngx_http_split_clients_module.md>);
-   [Request mirroring](<080 [01.01.03 http] Module ngx_http_mirror_module.md>);
-   Embedded [Perl](<084 [01.01.03 http] Module ngx_http_perl_module.md>);
-   [njs](<133 [01.01.05 njs] nginx JavaScript module.md>) scripting language.

#### Mail proxy server features

-   User redirection to [IMAP](<118 [01.01.04 mail] Module ngx_mail_imap_module.md>) or [POP3](<119 [01.01.04 mail] Module ngx_mail_pop3_module.md>) server using an external HTTP [authentication](<116 [01.01.04 mail] Module ngx_mail_auth_http_module.md>) server;
-   User authentication using an external HTTP [authentication](<116 [01.01.04 mail] Module ngx_mail_auth_http_module.md>) server and connection redirection to an internal [SMTP](<122 [01.01.04 mail] Module ngx_mail_smtp_module.md>) server;
-   Authentication methods:
    -   [POP3](<119 [01.01.04 mail] Module ngx_mail_pop3_module.md#pop3_auth>): USER/PASS, APOP, AUTH LOGIN/PLAIN/CRAM-MD5;
    -   [IMAP](<118 [01.01.04 mail] Module ngx_mail_imap_module.md#imap_auth>): LOGIN, AUTH LOGIN/PLAIN/CRAM-MD5;
    -   [SMTP](<122 [01.01.04 mail] Module ngx_mail_smtp_module.md#smtp_auth>): AUTH LOGIN/PLAIN/CRAM-MD5;
-   [SSL](<123 [01.01.04 mail] Module ngx_mail_ssl_module.md>) support;
-   [STARTTLS and STLS](<123 [01.01.04 mail] Module ngx_mail_ssl_module.md#starttls>) support.

#### TCP/UDP proxy server features

-   [Generic proxying](<154 [01.01.06 stream] Module ngx_stream_proxy_module.md>) of TCP and UDP;
-   [SSL](<160 [01.01.06 stream] Module ngx_stream_ssl_module.md>) and TLS [SNI](<161 [01.01.06 stream] Module ngx_stream_ssl_preread_module.md>) support for TCP;
-   [Load balancing and fault tolerance](<163 [01.01.06 stream] Module ngx_stream_upstream_module.md>);
-   Access control based on [client address](<141 [01.01.06 stream] Module ngx_stream_access_module.md>);
-   Executing different functions depending on the [client address](<143 [01.01.06 stream] Module ngx_stream_geo_module.md>);
-   Limiting the number of simultaneous [connections](<147 [01.01.06 stream] Module ngx_stream_limit_conn_module.md>) coming from one address;
-   [Access log formats](<148 [01.01.06 stream] Module ngx_stream_log_module.md#log_format>), [buffered log writing](<148 [01.01.06 stream] Module ngx_stream_log_module.md#access_log>), [fast log rotation](<026 [01.01 docs] Controlling nginx.md#logs>), and [syslog logging](<169 [01.01 docs] Logging to syslog.md>);
-   [IP-based geolocation](<144 [01.01.06 stream] Module ngx_stream_geoip_module.md>);
-   [A/B testing](<159 [01.01.06 stream] Module ngx_stream_split_clients_module.md>);
-   [njs](<133 [01.01.05 njs] nginx JavaScript module.md>) scripting language.

#### Architecture and scalability

-   One master and several worker processes; worker processes run under an unprivileged user;
-   [Flexible configuration](<031 [01.01 docs] Example nginx configuration.md>);
-   [Reconfiguration](<026 [01.01 docs] Controlling nginx.md#reconfiguration>) and [upgrade of an executable](<026 [01.01 docs] Controlling nginx.md#upgrade>) without interruption of the client servicing;
-   [Support](<030 [01.01 docs] Connection processing methods.md>) for kqueue (FreeBSD 4.1+), epoll (Linux 2.6+), /dev/poll (Solaris 7 11/99+), event ports (Solaris 10), select, and poll;
-   The support of the various kqueue features including EV\_CLEAR, EV\_DISABLE (to temporarily disable events), NOTE\_LOWAT, EV\_EOF, number of available data, error codes;
-   The support of various epoll features including EPOLLRDHUP (Linux 2.6.17+, glibc 2.8+) and EPOLLEXCLUSIVE (Linux 4.5+, glibc 2.24+);
-   sendfile (FreeBSD 3.1+, Linux 2.2+, macOS 10.5+), sendfile64 (Linux 2.4.21+), and sendfilev (Solaris 8 7/01+) support;
-   [File AIO](<056 [01.01.03 http] Module ngx_http_core_module.md#aio>) (FreeBSD 4.3+, Linux 2.6.22+);
-   [DIRECTIO](<056 [01.01.03 http] Module ngx_http_core_module.md#directio>) (FreeBSD 4.4+, Linux 2.4+, Solaris 2.6+, macOS);
-   Accept-filters (FreeBSD 4.1+, NetBSD 5.0+) and TCP\_DEFER\_ACCEPT (Linux 2.4+) [support](<056 [01.01.03 http] Module ngx_http_core_module.md#listen>);
-   10,000 inactive HTTP keep-alive connections take about 2.5M memory;
-   Data copy operations are kept to a minimum.

#### Tested OS and platforms

-   FreeBSD 3 — 12 / i386; FreeBSD 5 — 12 / amd64; FreeBSD 11 / ppc; FreeBSD 12 / ppc64;
-   Linux 2.2 — 4 / i386; Linux 2.6 — 5 / amd64; Linux 3 — 4 / armv6l, armv7l, aarch64, ppc64le; Linux 4 — 5 / s390x;
-   Solaris 9 / i386, sun4u; Solaris 10 / i386, amd64, sun4v; Solaris 11 / x86;
-   AIX 7.1 / powerpc;
-   HP-UX 11.31 / ia64;
-   macOS / ppc, i386, x86\_64;
-   Windows XP, Windows Server 2003, Windows 7, Windows 10, Windows 11.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx enterprise](<175 [01 en] nginx enterprise.md>)　｜　[下一篇：nginx Linux packages ➡](<177 [01 en] nginx Linux packages.md>)
