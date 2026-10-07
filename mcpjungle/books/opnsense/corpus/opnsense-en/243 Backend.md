---
title: "Backend"
source: https://docs.opnsense.org/development/backend.html
chapter: ["Development Manual","Backend"]
order: 243
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:44.897Z"
---

# Backend

The OPNsense backend consists of several components (see Architecture for a full stack description).

Our core backend service (configd) is implemented using [Python](https://en.wikipedia.org/wiki/Python). and provides two main features:

-   Service interaction (using configd actions)
    
-   Generation of configuration data (using templates)
    

Because we need integration between (legacy) components, we provide additional plugin options for the following components:

-   Services (the services status)
    
-   Syslog (define syslog targets)
    
-   Interface (register interfaces, firewall use etc.)
    
-   Service configuration (legacy service configuration, new style uses configd templates)
    

Services which need to be executed at system startup can use rc(8) or our syshook system. Our [overview](<244 Overview.md>) document contains a practical write up to explain the various phases of operation and hooks available in them.

-   [Overview](<244 Overview.md>)
-   [Bootup / autorun options](<245 Bootup autorun options.md>)
-   [CARP status](<246 CARP status.md>)
-   [Using configd](<247 Using configd.md>)
-   [Using plugins](<248 Using plugins.md>)
-   [Using Templates](<249 Using Templates.md>)