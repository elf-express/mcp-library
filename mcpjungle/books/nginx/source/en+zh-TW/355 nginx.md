---
title: "nginx"
source: "https://nginx.org/index.html"
chapter: []
order: 355
lang: "bilingual"
translated_by: "google_v2+gtx"
captured: "2026-09-29T09:43:14.176Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：page｜頁](<354 頁.md>)　｜　[下一篇：nginx news｜nginx 新聞 ➡](<356 nginx 新聞.md>)

# nginx

## nginx

nginx ("*engine x*") is an HTTP web server, reverse proxy, content cache, load balancer, TCP/UDP proxy server, and mail proxy server. Originally written by [Igor Sysoev](http://sysoev.ru/en/) and distributed under the [2-clause BSD License](<354 頁.md>). Enterprise distributions, commercial support and training are [available from F5, Inc.](<175 [01 在] nginx 企業版.md>)

nginx（「*engine x*」）是一個HTTP Web 伺服器、反向代理、內容快取、負載平衡器、 TCP/UDP代理伺服器和郵件代理伺服器。它最初由 [Igor Sysoev](http://sysoev.ru/en/)編寫，並以 [2 條款BSD許可證](<354 頁.md>)分發。企業版、商業支援與培訓由 [F5, Inc.](<175 [01 在] nginx 企業版.md>)提供。

[Docs](<114 [01.01 文件] nginx 文檔.md>) • [Code](https://github.com/nginx/nginx) • [Install](<115 [01.01 文件] 安裝 nginx.md>) • [Beginner's Guide](<023 [01.01 文件] 初學者指南.md>)

[文件](<114 [01.01 文件] nginx 文檔.md>) • [程式碼](https://github.com/nginx/nginx) • [安裝](<115 [01.01 文件] 安裝 nginx.md>) • [新手指南](<023 [01.01 文件] 初學者指南.md>)

#### Latest News｜最新消息

|   |   |
| --- | --- |
| 2026-09-15 | [nginx-1.30.5](<174 [01 在] nginx 下載.md>) stable and [nginx-1.31.6](<174 [01 在] nginx 下載.md>) mainline versions have been released, with fixes for [buffer overflow](<179 [01 在] nginx 安全公告.md>) vulnerability when using ngx\_http\_v3\_module (CVE-2026-90439).<br>[nginx- 1.30.5](<174 [01 在] nginx 下載.md>)穩定版與 [nginx- 1.31.6](<174 [01 在] nginx 下載.md>)主線版已發佈，修正了使用 ngx\ (https://nginx.org/en/security_advisories.html)緩衝區時存在的CVE -2026-90439)。 |
| 2026-09-02 | [nginx-1.31.5](<174 [01 在] nginx 下載.md>) mainline version has been released, featuring [control API](https://docs.nginx.com/nginx/admin-guide/basic-functionality/runtime-control#control-api), [predicate locations](<056 [01.01.03 http] 模組 ngx_http_core_module.md#location>), and the [ngx\_http\_json\_module](https://nginx.org/en/docs/http/ngx_http_json_module.html) module. |

| 2026-09-02 | [nginx-1.31.5](<174 [01 在] nginx 下載.md>) 主線版本已發布，包含 [control]API](https://docs.nginx.com/nginx/admin-guide/basic-functionality/runtime-control#control-api)，[謂詞位置](<056 [01.01.03 http] 模組 ngx_http_core_module.md#location>)以及 [ngx\_http\_json\_module](https://nginx.org/en/docs/http/ngx_http_json_module.html) 模組。
| 2026-09-02 | [njs-1.0.1](<133 [01.01.05 紐澤西州] nginx JavaScript 模組.md>) version has been [released](<129 [01.01.05 紐澤西州] 變化.md#njs1.0.1>), with fixes for [access control bypass](<138 [01.01.05 紐澤西州] 安全.md#advisories>) vulnerability in [js\_access](<073 [01.01.03 http] 模組 ngx_http_js_module.md#js_access>) (CVE-2026-18329), [worker process crash](<138 [01.01.05 紐澤西州] 安全.md#advisories>) vulnerability in [ngx.fetch()](<137 [01.01.05 紐澤西州] 參考.md#ngx_fetch>) (CVE-2026-78222), and [heap buffer overflow](<138 [01.01.05 紐澤西州] 安全.md#advisories>) vulnerability in [xml.exclusiveC14n()](<137 [01.01.05 紐澤西州] 參考.md#xml_exclusivec14n>) (CVE-2026-78689).<br>[njs-1.0.1](<133 [01.01.05 紐澤西州] nginx JavaScript 模組.md>)版本已[發布](<129 [01.01.05 紐澤西州] 變化.md#njs1.0.1>)，修正了[js\_access](<073 [01.01.03 http] 模組 ngx_http_js_module.md#js_access>)中的[存取控制繞過](<138 [01.01.05 紐澤西州] 安全.md#advisories>)漏洞（CVE-2026-18329），[工作進程崩潰](<138 [01.01.05 紐澤西州] 安全.md#advisories>)漏洞[ngx.fetch()](<137 [01.01.05 紐澤西州] 參考.md#ngx_fetch>) (CVE-2026-78222)，以及 [xml.exclusiveC14n()](<137 [01.01.05 紐澤西州] 參考.md#xml_exclusivec14n>) (CVE-2026-78689) 中的[堆緩衝區溢位](<138 [01.01.05 紐澤西州] 安全.md#advisories>) 漏洞。 |
| 2026-08-19 | [nginx-1.31.4](<174 [01 在] nginx 下載.md>) mainline version has been released.<br>[nginx- 1.31.4](<174 [01 在] nginx 下載.md>)主線版本已發布。 |

[Older news](<357 nginx 新聞.md>)

[舊聞](<357 nginx 新聞.md>)

#### Other NGINX Projects｜其他NGINX項目

<table>
<tr><td><a href="https://nginx.org/en/docs/njs/"><img src="../images/3f46cb21-njs_icon.png" alt="NGINX JavaScript logo"></a></td><td><strong>NGINX JavaScript</strong>(njs) extends nginx functionality with an ECMAScript-compatible interpreter for<br>(njs) 使用與 ECMAScript 相容的解釋器為HTTPand Stream modules.<br>和 Stream 模組擴充了 nginx 功能。<br><a href="https://nginx.org/en/docs/njs/">Docs</a> • <a href="https://github.com/nginx/njs">Code</a></td></tr>
<tr><td colspan="2"></td></tr>
</table>

<table>
<tr><td><a href="https://docs.nginx.com/nginx-ingress-controller/"><img src="../images/7620f863-ingress_icon.png" alt="NGINX Ingress Controller logo"></a></td><td><strong>NGINX Ingress Controller</strong> connects Kubernetes apps and services with rock solid request handling, auth, self-service CRDs, and easy debugging. Not to be confused with ingress-nginx, the separate Kubernetes community project.<br><a href="https://docs.nginx.com/nginx-ingress-controller/">Docs</a> • <a href="https://github.com/nginxinc/kubernetes-ingress">Code</a></td></tr>

<tr><td><a href="https://docs.nginx.com/nginx-ingress-controller/"><img src="../images/7620f863-ingress_icon.png" alt="NGINX Ingress Controller logo"></a></td><td><strong>NGINX Ingress Controller </strong>透過穩健的請求處理、驗證、自助式 CRD 和便利的調試</a> <br><a href="https://docs.nginx.com/nginx-ingress-controller/"> <a href="https://github.com/nginxinc/kubernetes-ingress">代碼</a></td></tr>
<tr><td colspan="2"></td></tr>
</table>

<table>
<tr><td><a href="https://docs.nginx.com/nginx-gateway-fabric/"><img src="../images/49c3788a-gateway_fabric_icon.png" alt="NGINX Gateway Fabric logo"></a></td><td><strong>NGINX Gateway Fabric</strong> provides L4 and L7 routing capabilities in Kubernetes, implementing the Gateway API using NGINX as the data plane.<br><a href="https://docs.nginx.com/nginx-gateway-fabric/">Docs</a> • <a href="https://github.com/nginxinc/nginx-gateway-fabric">Code</a></td></tr>

<tr><td><a href="https://docs.nginx.com/nginx-gateway-fabric/"><img src="../images/49c3788a-gateway_fabric_icon.png" alt="NGINX Gateway Fabric logo"></a></td><td><strong>NGINX網關架構</strong>在 Kubernetes 中提供 L4 和 L7 路由功能，使用NGINX作為資料平面來實現網關API 。 <br><a href="https://docs.nginx.com/nginx-gateway-fabric/">文檔</a> • <a href="https://github.com/nginxinc/nginx-gateway-fabric">代碼</a></td></tr>
<tr><td colspan="2"></td></tr>
</table>

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：page｜頁](<354 頁.md>)　｜　[下一篇：nginx news｜nginx 新聞 ➡](<356 nginx 新聞.md>)
