---
title: "Firmware"
source: https://docs.opnsense.org/development/api/core/firmware.html
chapter: ["Development Manual","API Reference","Core API"]
order: 277
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:34:00.587Z"
---


# Firmware


OPNsense has several API calls to get and set the firmware configuration:

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | core | firmware | audit |  |
| `POST` | core | firmware | changelog | $version |
| `POST` | core | firmware | check |  |
| `POST` | core | firmware | connection |  |
| `GET` | core | firmware | get |  |
| `GET` | core | firmware | getOptions |  |
| `POST` | core | firmware | health |  |
| `GET` | core | firmware | info |  |
| `POST` | core | firmware | log | $clear |
| `POST` | core | firmware | poweroff |  |
| `POST` | core | firmware | reboot |  |
| `POST` | core | firmware | resyncPlugins |  |
| `GET` | core | firmware | running |  |
| `POST` | core | firmware | set |  |
| `POST` | core | firmware | status |  |
| `POST` | core | firmware | syncPlugins |  |
| `POST` | core | firmware | update |  |
| `POST` | core | firmware | upgrade |  |
| `GET` | core | firmware | upgradestatus |  |

Examples:

```bash
curl -k -u "$key":"$secret" https://opnsense.local/api/core/firmware/getfirmwareconfig -v
```

```bash
curl -k -u "$key":"$secret" https://opnsense.local/api/core/firmware/status -v
```

```bash
curl -d '' -k -u "$key":"$secret" https://opnsense.local/api/core/firmware/changelog/18.1 -v
```

## Packages

You can manage the packages and plugins in OPNsense, using these API calls:

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | core | firmware | details | $pkg\_name |
| `POST` | core | firmware | install | $pkg\_name |
| `POST` | core | firmware | license | $pkg\_name |
| `POST` | core | firmware | lock | $pkg\_name |
| `POST` | core | firmware | remove | $pkg\_name |
| `POST` | core | firmware | reinstall | $pkg\_name |
| `POST` | core | firmware | unlock | $pkg\_name |

Examples:

```bash
curl -d '' -k -u "$key":"$secret" https://opnsense.local/api/core/firmware/lock/os-xen -v
```

```bash
curl -d '' -k -u "$key":"$secret" https://opnsense.local/api/core/firmware/license/acme.sh -v
```

---

