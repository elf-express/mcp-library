---
title: "ASN and GeoIP"
source: https://stalw.art/docs/server/asn/
---

# ASN and GeoIP

> Section: Server settings

An Autonomous System Number (ASN) identifies the network operator responsible for a range of IP addresses. GeoIP data maps IP addresses to a country, region, or city. Together, these sources describe who operates an address and where it is located, allowing incoming connections to be classified by network and geography.

Stalwart uses ASN and GeoIP information in several places. The [spam filter](https://stalw.art/docs/spamfilter/) tracks reputation metrics by IP, sender, domain, and ASN, and the spam classifier incorporates the same data during training. When processing messages, the server includes ASN and GeoIP details in the `Received` header so that message paths can be audited after the fact.

Two data-loading strategies are supported. The preferred approach downloads CSV files from HTTP resources, which keeps ASN-to-IP and country-to-IP mappings current. A DNS-based alternative queries TXT records exposed by services such as Team Cymru; this mode is useful where outbound HTTP is restricted but carries slightly less detail.

## Configuration

ASN and GeoIP data sources are configured through the [Asn](https://stalw.art/docs/ref/object/asn) singleton (found in the WebUI under <!-- breadcrumb:Asn --> Settings › Network › ASN & GeoIP<!-- /breadcrumb:Asn -->). The object is multi-variant: each instance selects one of `Disabled`, `Resource`, or `Dns`, and the chosen variant determines which fields apply.

### HTTP resources

The `Resource` variant downloads CSV data files over HTTP. It exposes the following fields:

- [`asnUrls`](https://stalw.art/docs/ref/object/asn#asnurls): URLs of the CSV files that contain IP-to-ASN mappings.
- [`geoUrls`](https://stalw.art/docs/ref/object/asn#geourls): URLs of the CSV files that contain IP-to-country mappings.
- [`expires`](https://stalw.art/docs/ref/object/asn#expires): refresh interval for downloaded data, in milliseconds. Default one day (`86400000`).
- [`timeout`](https://stalw.art/docs/ref/object/asn#timeout): maximum time to wait for a fetch, in milliseconds. Default five minutes (`300000`).
- [`maxSize`](https://stalw.art/docs/ref/object/asn#maxsize): maximum size accepted for a downloaded file, in bytes. Default 100 MiB (`104857600`).
- [`httpAuth`](https://stalw.art/docs/ref/object/asn#httpauth): HTTP authentication method (`Unauthenticated`, `Basic`, or `Bearer`).
- [`httpHeaders`](https://stalw.art/docs/ref/object/asn#httpheaders): additional HTTP headers sent with each request.

For example:

```json
{
  "@type": "Resource",
  "expires": 86400000,
  "timeout": 300000,
  "maxSize": 104857600,
  "asnUrls": {
    "https://github.com/sapics/ip-location-db/releases/download/latest/origin-asn-ipv4.csv": true,
    "https://github.com/sapics/ip-location-db/releases/download/latest/origin-asn-ipv6.csv": true
  },
  "geoUrls": {
    "https://github.com/sapics/ip-location-db/releases/download/latest/user-country-ipv4.csv": true,
    "https://github.com/sapics/ip-location-db/releases/download/latest/user-country-ipv6.csv": true
  },
  "httpAuth": {"@type": "Unauthenticated"}
}
```

### DNS queries

The `Dns` variant queries TXT records from a zone that exposes ASN and geolocation data (for example Team Cymru's `origin.asn.cymru.com` and `origin6.asn.cymru.com`). Its fields are:

- [`zoneIpV4`](https://stalw.art/docs/ref/object/asn#zoneipv4): DNS zone queried for IPv4 addresses.
- [`zoneIpV6`](https://stalw.art/docs/ref/object/asn#zoneipv6): DNS zone queried for IPv6 addresses.
- [`separator`](https://stalw.art/docs/ref/object/asn#separator): character that separates fields in the TXT record. Default `"|"`.
- [`indexAsn`](https://stalw.art/docs/ref/object/asn#indexasn): zero-based position of the ASN field. Default `0`.
- [`indexAsnName`](https://stalw.art/docs/ref/object/asn#indexasnname): position of the ASN name field.
- [`indexCountry`](https://stalw.art/docs/ref/object/asn#indexcountry): position of the country-code field.

For example:

```json
{
  "@type": "Dns",
  "separator": "|",
  "zoneIpV4": "origin.asn.cymru.com",
  "zoneIpV6": "origin6.asn.cymru.com",
  "indexAsn": 0,
  "indexAsnName": 1,
  "indexCountry": 2
}
```

### Disabling lookups

Selecting the `Disabled` variant turns off both ASN and GeoIP resolution.
