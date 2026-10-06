---
title: "Trust"
source: "https://docs.opnsense.org/manual/certificates.html"
chapter: ["System"]
order: 100
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:30.456Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Snapshots](<99 Snapshots.md>)　｜　[下一篇：Log Files ➡](<101 Log Files.md>)

# Trust

> 章節：[System](<000 目錄.md#c-11>)

In OPNsense, certificates are used for ensuring trust between peers. To make using them easier, OPNsense allows creating certificates from the front-end. In addition to that, it also allows creating certificates for other purposes, avoiding the need to use the `openssl` command line tool. Certificates in OPNsense can be managed from System ‣ Trust ‣ Certificates.

Examples of OPNsense components that use certificates:

-   OpenVPN
    
-   IPsec
    
-   Captive Portal
    
-   Web Proxy
    

## Certificate types

The following types of certificate can be generated in OPNsense:

-   Client
    
-   Server
    
-   Combined Client/Server
    
-   Certificate Authority
    

In addition to this, OPNsense can generate a Certificate Signing Request (CSR). This can be used if you want to create a certificate signed by an external CA.

Warning

Make sure that you select the correct certificate type, as many clients will refuse connection (or at least show errors) if an incorrect certificate type is used. For example, you can use either a server certificate or a combined client/server certificate to secure the connection to the web interface, but not a CA or client certificate.

Warning

“Store intermediate” (System ‣ Trust ‣ Settings) is disabled by default on our setups, which means none of the intermediates is being deployed in our trust store. When inserting a new certificate manually which needs an intermediate to validate, you do have to include the intermediates to prevent validation issues in the gui.

## Settings

In System ‣ Trust ‣ Settings you can find some advanced options to manage how the system handles trust. For compliance reasons, it is possible to implement certain constraints when a default OpenSSL context is requested.

| **Options** | **Description** |
| --- | --- |
| Store intermediate | Allow local defined intermediate certificate authorities to be used in the local trust store. Be careful with deploying intermediate certificates as cross signed ones may causing breakage when included but expired later in the chain. |
| Store CRL’s | Store all configured CRL’s in the default trust store. If the client or service support CRL’s, deploying to the default location eases maintenance. |
| Auto fetch CRL’s | Schedule an hourly job to download CRLs using the defined Distributionpoints in the CAs deployed in our trust store. |
| Enable legacy | Enable Legacy Providers. (Enables ciphers which will be removed in future versions of OpenSSL) |
| Configuration constraints | When enabled, you can set some default ciphers and protocols, be careful with these options as these settings will be used by wuite some applications of the firewall (and might break them). |

Note

Applications are not forced to use a standard context, depending the application, custom constraints may or may not have any effect.

## Revoke certificates

### Certificate Revocation Lists

A Certificate Revocation Lists (CRL) is a list of certificates that have been revoked by the certificate authority. Some services in OPNsense can use these to validate if a certificate is still valid to use even though it might not be expired.

Defining a CRL in OPNsense is not very complicated, just go to System ‣ Trust ‣ Revocation and click on the \[+\] sign for your (local) certificate authority to create a new CRL. When a CRL exists, you may edit it and add or remove certificates in it (using the pencil icon).

Note

If you wish to use a CRL for external tools you can download it using the button

One of the downsides of a CRL is that they don’t scale very well, each consumer of the list should download the full list in order to know if a certificate can still be trusted. Information often is less accurate as these lists usually are only generated on certain intervals.

When using a CRL for a local authority on OPNsense itself the scaling part usually isn’t a large issue as the number of certificates is usually limited (for example to the number of employees in your organisation).

To manually verify the created certificates using `openssl` commands, you need the following ingredients:

1.  The CA certificate chain which signed the certificates (export “cert” from Authorities menu)
    
2.  The CRL created in OPNsense (export “crl” from Revocation menu)
    
3.  A revoked certificate (export “cert” from Certificates menu)
    
4.  A non expired or revoked certificate
    

First we concatenate both the CA chain and the CRL into a single “chain” file:

```
# cat ca_chain.crt ca_crl.crl > my_chain.pem
```

Then validate a revoked certificate using the following `openssl` command:

```
# openssl verify -crl_check -CAfile my_chain.pem revoked_cert.crt
C=NL, CN=my_cert
error 23 at 0 depth lookup: certificate revoked
error ocsp_user_cert2.crt: verification failed
```

And a valid certificate:

```yaml
# openssl verify -crl_check -CAfile my_chain.pem ok_cert.crt
ocsp_server_cert.crt: OK
```

### Online Certificate Status Protocol

The Online Certificate Status Protocol ([OCSP](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol)) offers similar functionality as the CRL’s described earlier, but validates certificates “online” and offers a whitelising instead of a blacklisting method. Certificates are checked against an online known set of certificates after which the server responds with ‘good’, ‘revoked’, or ‘unknown’. Only good responses are considered valid.

In order to explain the client verifying a certificate where to check it’s validity, the `AuthorityInfoAccess` extension should be provided in the certificate authority (The parameter `OCSP uri` adds this to the certificate in OPNsense).

Tip

You can use the button to find the ocsp uri when available.

The OCSP responder (server) which validates the ‘OCSP request’ needs a special signing certificate, which can be created in OPNsense via System ‣ Trust ‣ Authorities, issued by the same CA which created the user and/or server certificates.

OPNsense does not implement an OCSP responder, but to test the concept, we can use the [openssl-ocsp](https://www.openssl.org/docs/man3.0/man1/openssl-ocsp.html) command.

Note

openssl-ocsp is only intended to be used for test and demonstration purposes.

In order to test the concept, we need the following ingredients:

1.  The CA certificate chain which signed the certificates (export “cert” from Authorities menu)
    
2.  The OCSP signer certificate (export “cert” and “key” from Authorities menu for the signer)
    
3.  An index file for openssl-ocsp (export index from Revocation menu) as specified in [https://pki-tutorial.readthedocs.io/en/latest/cadb.html](https://pki-tutorial.readthedocs.io/en/latest/cadb.html)
    
4.  A serial number of a revoked certificate (use the info button to find the serial number)
    
5.  A serial number of a non expired or revoked certificate
    

First start the server in a console:

```
# openssl ocsp -index index.txt -port 8081 -rsigner ocsp_signer.crt -rkey ocsp_signer.key -CA ca.crt -ignore_err -text
```

Then verify a known good certificate (with serial number 1):

```yaml
# openssl ocsp -url http://127.0.0.1:8081 -CAfile ca.crt -issuer ca.crt -serial 1
Response verify OK
1: good
        This Update: Jan  6 13:33:59 2024 GMT
```

A revoked one:

```yaml
# openssl ocsp -url http://127.0.0.1:8081 -CAfile ca.crt -issuer ca.crt -serial 2
Response verify OK
2: revoked
    This Update: Jan  6 13:34:54 2024 GMT
    Revocation Time: Jan 1 21:31:08 2024 GMT
```

And an unknown certificate

```yaml
# openssl ocsp -url http://127.0.0.1:8081 -CAfile ca.crt -issuer ca.crt -serial 9999
Response verify OK
9999: unknown
    This Update: Jan  6 13:36:51 2024 GMT
```

## Internal organisation

In this paragraph we would like to explain the organisation of the internal trust store. The certificates and revocation lists that exist are staged into system directories and deployed for usage by a tool called `certctl.py` on our end.

The source for certificates and revocation lists is collected in the following directories, either shipped with the base system and/or managed from OPNsense:

| **Path** | **Topic** |
| --- | --- |
| /usr/share/certs/trusted | Default system certificates, shipped with the base system |
| /usr/local/share/certs | Application specific certificates and revocation lists |
| /usr/share/certs/untrusted | Certificates that are not to be trusted anymore |

`certctl.py` collects all certificates from the set defined above and creates links to them in the target directories specified below.

| **Path** | **Topic** |
| --- | --- |
| /etc/ssl/certs | Directory with links (and files) to certificates named by their hash. (for example `ef954a4e.0` or `ef954a4e.r0` for a CRL) Primary location for the base system. |
| /etc/ssl/untrusted | Same as above, but untrusted (ignored) |
| /usr/local/openssl/certs | Same as `/etc/ssl/certs`, default location for applications build from the “ports” tree |
| /usr/local/etc/ssl/cert.pem | Combined bundle file for applications that require a single file. |

Each target link (or file) contains a single certificate or revocation list, which OpenSSL can easily locate using the certificate subject.

Note

If either `/etc/ssl/cert.pem` and/or `/usr/local/etc/ssl/cert.pem` exists, they will have preference above the hashed links insode the target directories. Staring with OPNsense version 25.1, these files will be removed when they exist.

Default settings for OpenSSL are saved into `/usr/local/openssl/openssl.cnf` (ports) and `/etc/ssl/openssl.cnf` (base), both are managed by OPNsense.

## Usage examples

In [Setup Self-Signed Certificate Chains](<104 Setup Self-Signed Certificate Chains.md>) you will find examples of how to setup certificate chains yourself.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Snapshots](<99 Snapshots.md>)　｜　[下一篇：Log Files ➡](<101 Log Files.md>)
