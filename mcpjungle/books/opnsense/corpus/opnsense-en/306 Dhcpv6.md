---
title: "Dhcpv6"
source: https://docs.opnsense.org/development/api/plugins/dhcpv6.html
chapter: ["Development Manual","API Reference","Plugins API"]
order: 306
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:15.745Z"
---

# Dhcpv6

*Resources (LeasesController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | dhcpv6 | leases | del\_lease | $ip |
| `GET` | dhcpv6 | leases | search\_lease |  |
| `GET` | dhcpv6 | leases | search\_prefix |  |

*Service (ServiceController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | dhcpv6 | service | reconfigure |  |
| `POST` | dhcpv6 | service | restart |  |
| `POST` | dhcpv6 | service | start |  |
| `GET` | dhcpv6 | service | status |  |
| `POST` | dhcpv6 | service | stop |  |