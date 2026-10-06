---
title: "nginx news 2025"
source: "https://nginx.org/2025.html"
chapter: []
order: 353
lang: "other"
translated_by: "original"
captured: "2026-09-29T09:43:12.182Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx news 2024](<352 nginx news 2024.md>)　｜　[下一篇：page ➡](<354 page.md>)

# nginx news 2025

## nginx news: 2025

[2026](https://nginx.org/2026.html)**[2025](https://nginx.org/2025.html)**[2024](<352 nginx news 2024.md>)[2023](<351 nginx news 2023.md>)[2022](<350 nginx news 2022.md>)[2021](<349 nginx news 2021.md>)[2020](<348 nginx news 2020.md>)[2019](<347 nginx news 2019.md>)[2018](<346 nginx news 2018.md>)[2017](<345 nginx news 2017.md>)[2016](<344 nginx news 2016.md>)[2015](<343 nginx news 2015.md>)[2014](<342 nginx news 2014.md>)[2013](<341 nginx news 2013.md>)[2012](<340 nginx news 2012.md>)[2011](<339 nginx news 2011.md>)[2010](<338 nginx news 2010.md>)[2009](<337 nginx news 2009.md>)

|   |   |
| --- | --- |
| 2025-12-23 | [nginx-1.28.1](<174 [01 en] nginx download.md>) stable version has been released. |
| 2025-12-09 | [nginx-1.29.4](<174 [01 en] nginx download.md>) mainline version has been released, featuring [HTTP/2 to backend and Encrypted ClientHello](https://blog.nginx.org/blog/nginx-open-source-1-29-3-and-1-29-4) support. |
| 2025-11-18 | [nginx-acme-0.3.0](<046 [01.01.03 http] Module ngx_http_acme_module.md>) version has been [released](https://github.com/nginx/nginx-acme/releases/tag/v0.3.0). |
| 2025-10-28 | [nginx-1.29.3](<174 [01 en] nginx download.md>) mainline version has been released. |
| 2025-10-28 | [njs-0.9.4](<133 [01.01.05 njs] nginx JavaScript module.md>) version has been [released](<129 [01.01.05 njs] Changes.md#njs0.9.4>), featuring HTTP forward proxy support for [ngx.fetch()](<137 [01.01.05 njs] Reference.md#ngx_fetch>) API in [http](<073 [01.01.03 http] Module ngx_http_js_module.md#js_fetch_proxy>) and [stream](<145 [01.01.06 stream] Module ngx_stream_js_module.md#js_fetch_proxy>). |
| 2025-10-07 | [nginx-1.29.2](<174 [01 en] nginx download.md>) mainline version has been released. |
| 2025-10-07 | [njs-0.9.3](<133 [01.01.05 njs] nginx JavaScript module.md>) bugfix version has been [released](<129 [01.01.05 njs] Changes.md#njs0.9.3>). |
| 2025-09-23 | [njs-0.9.2](<133 [01.01.05 njs] nginx JavaScript module.md>) version has been [released](<129 [01.01.05 njs] Changes.md#njs0.9.2>), featuring HTTP keepalive support for [ngx.fetch()](<137 [01.01.05 njs] Reference.md#ngx_fetch>) API in [http](<073 [01.01.03 http] Module ngx_http_js_module.md#js_fetch_keepalive>) and [stream](<145 [01.01.06 stream] Module ngx_stream_js_module.md#js_fetch_keepalive>). |
| 2025-08-13 | [nginx-1.29.1](<174 [01 en] nginx download.md>) mainline version has been released. |
| 2025-07-10 | [njs-0.9.1](<133 [01.01.05 njs] nginx JavaScript module.md>) version has been [released](<129 [01.01.05 njs] Changes.md#njs0.9.1>), featuring state file support for shared dictionary in [http](<073 [01.01.03 http] Module ngx_http_js_module.md#js_shared_dict_zone>) and [stream](<145 [01.01.06 stream] Module ngx_stream_js_module.md#js_shared_dict_zone>), and [feature parity](https://blog.nginx.org/blog/quickjs-engine-support-for-njs) with njs for the [QuickJS](<132 [01.01.05 njs] JavaScript Engine.md>) engine. |
| 2025-06-24 | [nginx-1.29.0](<174 [01 en] nginx download.md>) mainline version has been released, featuring [Early Hints](https://blog.nginx.org/blog/nginx-introduces-support-103-early-hints) support. |
| 2025-05-06 | [njs-0.9.0](<133 [01.01.05 njs] nginx JavaScript module.md>) version has been [released](<129 [01.01.05 njs] Changes.md#njs0.9.0>), featuring 30% performance improvement for the njs engine. |
| 2025-04-23 | [nginx-1.28.0](<174 [01 en] nginx download.md>) stable version has been released, incorporating new features and bug fixes from the 1.27.x mainline branch  — including memory usage and CPU usage [optimizations](https://blog.nginx.org/blog/optimizing-resource-usage-for-complex-ssl-configurations) in complex SSL configurations, [automatic re‑resolution](https://blog.nginx.org/blog/dynamic-dns-resolution-open-sourced-in-nginx) of hostnames in upstream groups, performance [enhancements](https://blog.nginx.org/blog/congestion-control-enhancements-for-quic) in QUIC, [OCSP validation](<160 [01.01.06 stream] Module ngx_stream_ssl_module.md#ssl_ocsp>) of client SSL certificates and [OCSP stapling](<160 [01.01.06 stream] Module ngx_stream_ssl_module.md#ssl_stapling>) support in the stream module, variables support in the [proxy\_limit\_rate](<085 [01.01.03 http] Module ngx_http_proxy_module.md#proxy_limit_rate>), [fastcgi\_limit\_rate](<060 [01.01.03 http] Module ngx_http_fastcgi_module.md#fastcgi_limit_rate>), [scgi\_limit\_rate](<091 [01.01.03 http] Module ngx_http_scgi_module.md#scgi_limit_rate>), and [uwsgi\_limit\_rate](<107 [01.01.03 http] Module ngx_http_uwsgi_module.md#uwsgi_limit_rate>) directives, the [proxy\_pass\_trailers](<085 [01.01.03 http] Module ngx_http_proxy_module.md#proxy_pass_trailers>) directive, and more. |
| 2025-04-16 | [nginx-1.27.5](<174 [01 en] nginx download.md>) mainline version has been released, featuring [CUBIC congestion control in QUIC](https://blog.nginx.org/blog/congestion-control-enhancements-for-quic). |
| 2025-04-08 | [njs-0.8.10](<133 [01.01.05 njs] nginx JavaScript module.md>) version has been [released](<129 [01.01.05 njs] Changes.md#njs0.8.10>), featuring WebCrypto API, TextEncoder/TextDecoder, querystring, crypto, and xml modules for the [QuickJS](<132 [01.01.05 njs] JavaScript Engine.md>) engine. |
| 2025-02-26 | [unit-1.34.2](https://unit.nginx.org/) bugfix version has been [released](https://unit.nginx.org/news/2025/unit-1.34.2-released/). |
| 2025-02-05 | [nginx-1.26.3](<174 [01 en] nginx download.md>) stable version has been released, with a fix for the [SSL session reuse](<179 [01 en] nginx security advisories.md>) vulnerability (CVE-2025-23419). |
| 2025-02-05 | [nginx-1.27.4](<174 [01 en] nginx download.md>) mainline version has been released, featuring [optimized resource usage for complex SSL configurations](https://blog.nginx.org/blog/optimizing-resource-usage-for-complex-ssl-configurations), and with a fix for the [SSL session reuse](<179 [01 en] nginx security advisories.md>) vulnerability (CVE-2025-23419). |
| 2025-01-14 | [njs-0.8.9](<133 [01.01.05 njs] nginx JavaScript module.md>) version has been [released](<129 [01.01.05 njs] Changes.md#njs0.8.9>), featuring [fs module](<137 [01.01.05 njs] Reference.md#njs_api_fs>) for the [QuickJS](<132 [01.01.05 njs] JavaScript Engine.md>) engine. |
| 2025-01-10 | [unit-1.34.1](https://unit.nginx.org/) bugfix version has been [released](https://unit.nginx.org/news/2025/unit-1.34.1-released/). |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：nginx news 2024](<352 nginx news 2024.md>)　｜　[下一篇：page ➡](<354 page.md>)
