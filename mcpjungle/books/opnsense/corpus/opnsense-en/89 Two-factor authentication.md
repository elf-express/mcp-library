---
title: "Two-factor authentication"
source: https://docs.opnsense.org/manual/two_factor.html
chapter: ["System","Access / User Management","Configuration"]
order: 89
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:26.920Z"
---


# Two-factor authentication


[圖：../_images/two_factor_authentication.png](https://docs.opnsense.org/_images/two_factor_authentication.png)

Two-factor authentication also known as 2FA or 2-Step Verification is an authentication method that requires two components, such as a pin/password + a token.

OPNsense (version >=16.1.14) offers support for Two-factor authentication throughout the entire system, with one exception being console/ssh access.

Supported services are:

-   OPNsense Graphical User Interface
    
-   Captive Portal
    
-   Virtual Private Networking - OpenVPN & IPsec
    
-   Caching Proxy
    

New authentication servers can be added via System -> Access -> Servers, which supports both local users and users synchronised via ldap.

## Time-based One-time Password

TOTP is an algorithm that computes a one-time password from a shared secret key and the current time. OPNsense supports RFC 6238.

## Google Authenticator

OPNsense fully supports the use of Google’s Authenticator application. This application can generate tokens on Android, iOS and BlackBerry OS. The usage of this application is free and very simple to setup using OPNsense.

## Other TOTP tokens

The 2FA feature can be used with any time based one-time password token, although it may be necessary to convert the tokens seed to the used format (base32).

## Configuration & Setup

To setup see: [Configure 2FA TOTP & Google Authenticator](<103 Configure 2FA TOTP & Google Authenticator.md>).

---

