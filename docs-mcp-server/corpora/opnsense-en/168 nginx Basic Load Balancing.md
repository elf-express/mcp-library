---
title: "nginx Basic Load Balancing"
source: "https://docs.opnsense.org/manual/how-tos/nginx.html"
chapter: ["Community Plugins","Web"]
order: 168
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:06.439Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：ClamAV](<167 ClamAV.md>)　｜　[下一篇：nginx Header Hardening ➡](<169 nginx Header Hardening.md>)

# nginx Basic Load Balancing

> 章節：[Community Plugins](<000 目錄.md#c-36>) › [Web](<000 目錄.md#c-37>)

## nginx: Basic Load Balancing

## 1) Create Upstream Servers

![../../_images/nginx_upstream_servers.png](<../images/744a1dd5-nginx_upstream_servers.png>) ![../../_images/nginx_edit_upstream_dialog.png](<../images/529e6e56-nginx_edit_upstream_dialog.png>)

Create a server with a description and IP of the server. The priority is not important if you have a single server. It is used as a weight for round robin. Servers with a higher weight will receive more traffic.

## 2) Create An Upstream

![../../_images/nginx_edit_upstream_with_verify.png](<../images/bddd0444-nginx_edit_upstream_with_verify.png>)

Group upstream servers to an upstream. An upstream is a group of servers to load balance between. Give it a useful name and choose the previously created server.

Warning

Upstream verification is enabled by default (**TLS: Verify Certificate** checkbox). Server names in the upstream certificate are compared with the name in the **TLS: Servername override** field. For successful verification, it is necessary that OPNsense trusts the certificate of the certification authority that issued the upstreams certificate. You can further restrict the list of trusted CA’s in the **TLS: Trusted Certificate** field.

## 3) Create A Location

![../../_images/nginx_edit_location_dialog2.png](<../images/f0af71e8-nginx_edit_location_dialog2.png>)

Locations are used to map URLs to upstreams, directories, settings and so on. In our case we want to proxy the request to the previously created upstream. If we want to match everything, we use “/” without a special matcher. Now save the location.

## 4) Create A HTTP Server

![../../_images/nginx_edit_http_server_dialog.png](<../images/ea5db3c5-nginx_edit_http_server_dialog.png>)

In the last step, we have to create a port. This happens in a “http” block, which contains some basic configuration and the location blocks.

Enter the domain name into the “Server Name” field and select the previously created location. If you want to use support TLS, you have to add a certificate.

## 5) Restart nginx

![../../_images/nginx_reload.png](<../images/2341c596-nginx_reload.png>)

Click the reload button and you are done. You may need to open some ports in the firewall if you have not done that yet. Since you are directly on the firewall, There is no need to use NAT similar workaround.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：ClamAV](<167 ClamAV.md>)　｜　[下一篇：nginx Header Hardening ➡](<169 nginx Header Hardening.md>)
