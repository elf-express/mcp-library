---
title: "API Reference"
source: https://docs.opnsense.org/development/api.html
chapter: ["Development Manual","API Reference"]
order: 268
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:56.573Z"
---


# API Reference


## Introduction

The OPNsense API calls are structured in the form:

```
https://opnsense.local/api/<module>/<controller>/<command>/[<param1>/[<param2>/...]]
```

There are two HTTP verbs used in the OPNsense API:

> -   `GET` Retrieves data from OPNsense
>     
> -   `POST` Creates new data, updates existing data or executes an action
>     

The body of the HTTP POST request and response is an ‘application/json’ object.

The $key and $secret parameters are used to pass the API credentials using curl. You need to set these parameters with your own API credentials before using them in the examples:

```
key=w86XNZob/8Oq8aC5r0kbNarNtdpoQU781fyoeaOBQsBwkXUt
secret=XeD26XVrJ5ilAc/EmglCRC+0j2e57tRsjHwFepOseySWLM53pJASeTA3
```

Note

When using Postman to test an API call, use the ‘basic auth’ authorization type. The $key and $secret parameters go into Username/Password respectively.

Note

Always make sure the owner of the key is authorized to access the resource in question, the “Effective Privileges” set on the user shows which resources are accessible. (Edit reveals the endpoints assigned to each resource).

ACL’s are explained in [development/components/acl](<266 Access Control List.md>)).

## Required parameters and expected responses

Our auto-generated api documentation can only collect endpoints and their most likely call method (`GET`, `POST`), Since almost 99% of our endpoints are actually being used by the gui, it’s not very complicated to find their parameters, you just need a browser and open an inspect pane. Calls being executed from the gui can easily be found by filtering the requests starting with `/api/`.

For example, when looking at the search grid in System ‣ Diagnostics ‣ Services, pressing the reload button will execute a `POST` to `https://my.firewall/api/core/service/search` containing the following raw json data:

```json
{"current":1,"rowCount":7,"sort":{},"searchPhrase":""}
```

And returns a structure similar to:

```
{
    "total": 10,
    "rowCount": 7,
    "current": 1,
    "rows": [
        {
        "id": "configd",
        "locked": 1,
        "running": 1,
        "description": "System Configuration Daemon",
        "name": "configd"
        },
        ....
    ]
}
```

A lot of endpoints use the same shared model classes underneath and will thus look quite similar. If classes are bound to a model, the documentation will point to it. Here you can find the standard types to expect, without specific application specific validations.

When more detailed information is needed, best read the [Architecture](<242 Architecture.md>) documentation to understand how different areas of the system interact.

## Core API

-   [Auth](<269 Auth.md>)
-   [Captiveportal](<270 Captiveportal.md>)
-   [Core](<271 Core.md>)
-   [Cron](<272 Cron.md>)
-   [Dhcrelay](<273 Dhcrelay.md>)
-   [Diagnostics](<274 Diagnostics.md>)
-   [Dnsmasq](<275 Dnsmasq.md>)
-   [Firewall](<276 Firewall.md>)
-   [Firmware](<277 Firmware.md>)
-   [Hostdiscovery](<278 Hostdiscovery.md>)
-   [Ids](<279 Ids.md>)
-   [Interfaces](<280 Interfaces.md>)
-   [Ipsec](<281 Ipsec.md>)
-   [Kea](<282 Kea.md>)
-   [Monit](<283 Monit.md>)
-   [Ntpd](https://docs.opnsense.org/development/api/core/ntpd.html)
-   [Openvpn](<285 Openvpn.md>)
-   [Radvd](<286 Radvd.md>)
-   [Routes](<287 Routes.md>)
-   [Routing](<288 Routing.md>)
-   [Syslog](<289 Syslog.md>)
-   [Trafficshaper](<290 Trafficshaper.md>)
-   [Trust](<291 Trust.md>)
-   [Unbound](<292 Unbound.md>)
-   [Wireguard](<293 Wireguard.md>)

## Plugins API

-   [Acmeclient](<294 Acmeclient.md>)
-   [Apcupsd](<295 Apcupsd.md>)
-   [Beats](<296 Beats.md>)
-   [Bind](<297 Bind.md>)
-   [Caddy](<298 Caddy.md>)
-   [Chrony](<299 Chrony.md>)
-   [Cicap](<300 Cicap.md>)
-   [Clamav](<301 Clamav.md>)
-   [Collectd](<302 Collectd.md>)
-   [Crowdsec](<303 Crowdsec.md>)
-   [Dechw](https://docs.opnsense.org/development/api/plugins/dechw.html)
-   [Dhcpv4](<305 Dhcpv4.md>)
-   [Dhcpv6](<306 Dhcpv6.md>)
-   [Diagnostics](https://docs.opnsense.org/development/api/plugins/diagnostics.html)
-   [Dmidecode](https://docs.opnsense.org/development/api/plugins/dmidecode.html)
-   [Dnscryptproxy](<309 Dnscryptproxy.md>)
-   [Dyndns](<310 Dyndns.md>)
-   [Freeradius](<311 Freeradius.md>)
-   [Ftpproxy](<312 Ftpproxy.md>)
-   [Gridexample](<313 Gridexample.md>)
-   [Haproxy](<314 Haproxy.md>)
-   [Helloworld](<315 Helloworld.md>)
-   [Hwprobe](<316 Hwprobe.md>)
-   [Iperf](<317 Iperf.md>)
-   [Lldpd](<318 Lldpd.md>)
-   [Maltrail](<319 Maltrail.md>)
-   [Mdnsrepeater](<320 Mdnsrepeater.md>)
-   [Muninnode](<321 Muninnode.md>)
-   [Ndpproxy](<322 Ndpproxy.md>)
-   [Ndproxy](<323 Ndproxy.md>)
-   [Netbird](<324 Netbird.md>)
-   [Netdata](<325 Netdata.md>)
-   [Netsnmp](<326 Netsnmp.md>)
-   [Nginx](<327 Nginx.md>)
-   [Nodeexporter](<328 Nodeexporter.md>)
-   [Nrpe](<329 Nrpe.md>)
-   [Ntopng](<330 Ntopng.md>)
-   [Nut](<331 Nut.md>)
-   [Openconnect](<332 Openconnect.md>)
-   [Postfix](<333 Postfix.md>)
-   [Proxy](<334 Proxy.md>)
-   [Proxysso](<335 Proxysso.md>)
-   [Puppetagent](<336 Puppetagent.md>)
-   [Qemuguestagent](<337 Qemuguestagent.md>)
-   [Qfeeds](<338 Qfeeds.md>)
-   [Quagga](<339 Quagga.md>)
-   [Radsecproxy](<340 Radsecproxy.md>)
-   [Redis](<341 Redis.md>)
-   [Relayd](<342 Relayd.md>)
-   [Rspamd](<343 Rspamd.md>)
-   [Shadowsocks](<344 Shadowsocks.md>)
-   [Siproxd](<345 Siproxd.md>)
-   [Smart](<346 Smart.md>)
-   [Softether](<347 Softether.md>)
-   [Sslh](<348 Sslh.md>)
-   [Stunnel](<349 Stunnel.md>)
-   [Tailscale](<350 Tailscale.md>)
-   [Tayga](<351 Tayga.md>)
-   [Telegraf](<352 Telegraf.md>)
-   [Tftp](<353 Tftp.md>)
-   [Tinc](<354 Tinc.md>)
-   [Tor](<355 Tor.md>)
-   [Turnserver](<356 Turnserver.md>)
-   [Udpbroadcastrelay](<357 Udpbroadcastrelay.md>)
-   [Vnstat](<358 Vnstat.md>)
-   [Wazuhagent](<359 Wazuhagent.md>)
-   [Wol](<360 Wol.md>)
-   [Zabbixagent](<361 Zabbixagent.md>)
-   [Zabbixproxy](<362 Zabbixproxy.md>)
-   [Zerotier](<363 Zerotier.md>)

## Business edition API

The business edition comes packed with some additional features which could also be used for integration purposes from third-party applications. The most relevant ones will be explained in this section.

-   [OPNBECore](<364 OPNBECore.md>)

---

