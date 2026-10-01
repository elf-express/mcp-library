---
title: "nginx news 2021"
source: "https://nginx.org/2021.html"
chapter: []
order: 349
lang: "other"
translated_by: "original"
captured: "2026-09-29T09:43:06.182Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx news 2020](<348 nginx news 2020.md>)　｜　[下一篇：nginx news 2022 ➡](<350 nginx news 2022.md>)

# nginx news 2021

## nginx news: 2021

[2026](https://nginx.org/2026.html)[2025](<353 nginx news 2025.md>)[2024](<352 nginx news 2024.md>)[2023](<351 nginx news 2023.md>)[2022](<350 nginx news 2022.md>)**[2021](https://nginx.org/2021.html)**[2020](<348 nginx news 2020.md>)[2019](<347 nginx news 2019.md>)[2018](<346 nginx news 2018.md>)[2017](<345 nginx news 2017.md>)[2016](<344 nginx news 2016.md>)[2015](<343 nginx news 2015.md>)[2014](<342 nginx news 2014.md>)[2013](<341 nginx news 2013.md>)[2012](<340 nginx news 2012.md>)[2011](<339 nginx news 2011.md>)[2010](<338 nginx news 2010.md>)[2009](<337 nginx news 2009.md>)

|   |   |
| --- | --- |
| 2021-12-28 | [njs-0.7.1](<133 [01.01.05 njs] nginx JavaScript module.md>) version has been [released](<129 [01.01.05 njs] Changes.md#njs0.7.1>). |
| 2021-12-28 | [nginx-1.21.5](<174 [01 en] nginx download.md>) mainline version has been released. |
| 2021-12-02 | [unit-1.26.1](https://unit.nginx.org/) bugfix version has been [released](https://mailman.nginx.org/pipermail/unit/2021-December/000292.html). |
| 2021-11-18 | [unit-1.26.0](https://unit.nginx.org/) version has been [released](https://mailman.nginx.org/pipermail/unit/2021-November/000288.html), featuring multiple improvements in static content serving, application-wide PHP opcache, and a number of bugfixes. |
| 2021-11-16 | [nginx-1.20.2](<174 [01 en] nginx download.md>) stable version has been released. |
| 2021-11-02 | [nginx-1.21.4](<174 [01 en] nginx download.md>) mainline version has been released. |
| 2021-10-19 | [njs-0.7.0](<133 [01.01.05 njs] nginx JavaScript module.md>) version has been [released](<129 [01.01.05 njs] Changes.md#njs0.7.0>), featuring Async/Await support, [WebCrypto API](<137 [01.01.05 njs] Reference.md#builtin_crypto>), and [HTTPS](<073 [01.01.03 http] Module ngx_http_js_module.md#js_fetch_protocols>) support in [ngx.fetch()](<137 [01.01.05 njs] Reference.md#ngx_fetch>). |
| 2021-09-07 | [nginx-1.21.3](<174 [01 en] nginx download.md>) mainline version has been released. |
| 2021-08-31 | [nginx-1.21.2](<174 [01 en] nginx download.md>) mainline version has been released. |
| 2021-08-31 | [njs-0.6.2](<133 [01.01.05 njs] nginx JavaScript module.md>) version has been [released](<129 [01.01.05 njs] Changes.md#njs0.6.2>). |
| 2021-08-19 | [unit-1.25.0](https://unit.nginx.org/) version has been [released](https://mailman.nginx.org/pipermail/unit/2021-August/000278.html), featuring SSL/TLS session cache and ticket controls, originating IP identification, manual application restart, and a number of bugfixes. |
| 2021-07-06 | [nginx-1.21.1](<174 [01 en] nginx download.md>) mainline version has been released. |
| 2021-06-29 | [njs-0.6.1](<133 [01.01.05 njs] nginx JavaScript module.md>) bugfix version has been [released](<129 [01.01.05 njs] Changes.md#njs0.6.1>). |
| 2021-06-15 | [njs-0.6.0](<133 [01.01.05 njs] nginx JavaScript module.md>) version has been [released](<129 [01.01.05 njs] Changes.md#njs0.6.0>), featuring let and const variable declaration support. |
| 2021-05-27 | [unit-1.24.0](https://unit.nginx.org/) version has been [released](https://mailman.nginx.org/pipermail/unit/2021-May/000265.html), featuring SSL/TLS configuration commands; static file chrooting with symlink and mount resolution control; static file filtering by MIME type; other features and a couple of bugfixes. |
| 2021-05-25 | [nginx-1.20.1](<174 [01 en] nginx download.md>) stable and [nginx-1.21.0](<174 [01 en] nginx download.md>) mainline versions have been released, with a fix for the [1-byte memory overwrite](<179 [01 en] nginx security advisories.md>) vulnerability in resolver (CVE-2021-23017). |
| 2021-04-20 | [nginx-1.20.0](<174 [01 en] nginx download.md>) stable version has been released, incorporating new features and bug fixes from the 1.19.x mainline branch  — including [OCSP validation](<098 [01.01.03 http] Module ngx_http_ssl_module.md#ssl_ocsp>) of client SSL certificates, the [ssl\_reject\_handshake](<098 [01.01.03 http] Module ngx_http_ssl_module.md#ssl_reject_handshake>) and [ssl\_conf\_command](<098 [01.01.03 http] Module ngx_http_ssl_module.md#ssl_conf_command>) directives, simplified and improved handling of HTTP/2 connections with the [lingering\_close](<056 [01.01.03 http] Module ngx_http_core_module.md#lingering_close>), [keepalive\_timeout](<056 [01.01.03 http] Module ngx_http_core_module.md#keepalive_timeout>), and [keepalive\_requests](<056 [01.01.03 http] Module ngx_http_core_module.md#keepalive_requests>) directives, the [keepalive\_time](<056 [01.01.03 http] Module ngx_http_core_module.md#keepalive_time>) directive, stricter handling of upstream server responses, [cookie flags](<085 [01.01.03 http] Module ngx_http_proxy_module.md#proxy_cookie_flags>) handling, cache clearing based on the [minimum amount of free space](<085 [01.01.03 http] Module ngx_http_proxy_module.md#proxy_cache_path_max_size>), PROXY protocol support [from clients](<117 [01.01.04 mail] Module ngx_mail_core_module.md#proxy_protocol>) and [to backend servers](<120 [01.01.04 mail] Module ngx_mail_proxy_module.md#proxy_protocol>) in the mail proxy, [proxying SMTP authentication](<120 [01.01.04 mail] Module ngx_mail_proxy_module.md#proxy_smtp_auth>), the [set](<158 [01.01.06 stream] Module ngx_stream_set_module.md>) directive in the stream module, and more. |
| 2021-04-13 | [nginx-1.19.10](<174 [01 en] nginx download.md>) mainline version has been released. |
| 2021-03-30 | [nginx-1.19.9](<174 [01 en] nginx download.md>) mainline version has been released. |
| 2021-03-30 | [njs-0.5.3](<133 [01.01.05 njs] nginx JavaScript module.md>) version has been [released](<129 [01.01.05 njs] Changes.md#njs0.5.3>), featuring the `js_var` directive for [http](<073 [01.01.03 http] Module ngx_http_js_module.md#js_var>) and [stream](<145 [01.01.06 stream] Module ngx_stream_js_module.md#js_var>). |
| 2021-03-25 | [unit-1.23.0](https://unit.nginx.org/) version has been [released](https://mailman.nginx.org/pipermail/unit/2021-March/000264.html), featuring SNI support and a number of bugfixes. |
| 2021-03-09 | [njs-0.5.2](<133 [01.01.05 njs] nginx JavaScript module.md>) version has been [released](<129 [01.01.05 njs] Changes.md#njs0.5.2>), featuring [js\_body\_filter](<073 [01.01.03 http] Module ngx_http_js_module.md#js_body_filter>) directive. |
| 2021-03-09 | [nginx-1.19.8](<174 [01 en] nginx download.md>) mainline version has been released. |
| 2021-02-16 | [njs-0.5.1](<133 [01.01.05 njs] nginx JavaScript module.md>) version has been [released](<129 [01.01.05 njs] Changes.md#njs0.5.1>), featuring [Fetch](<137 [01.01.05 njs] Reference.md#ngx_fetch>) API and [js\_header\_filter](<073 [01.01.03 http] Module ngx_http_js_module.md#js_header_filter>) directive. |
| 2021-02-16 | [nginx-1.19.7](<174 [01 en] nginx download.md>) mainline version has been released. |
| 2021-02-04 | [unit-1.22.0](https://unit.nginx.org/) version has been [released](https://mailman.nginx.org/pipermail/unit/2021-February/000263.html), featuring a number of bugfixes. |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx news 2020](<348 nginx news 2020.md>)　｜　[下一篇：nginx news 2022 ➡](<350 nginx news 2022.md>)
