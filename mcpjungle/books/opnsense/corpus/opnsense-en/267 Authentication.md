---
title: "Authentication"
source: https://docs.opnsense.org/development/components/authentication.html
chapter: ["Development Manual","Components"]
order: 267
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:56.066Z"
---

# Authentication

Access Control List



## Concepts

Authentication in OPNsense consists of three basic concepts, which are available throughout the entire system:

-   Authenticators
    
    -   These implement the method to use, for example Radius, Ldap, local authentication, etc
        
-   Connections
    
    -   A connection uses an authenticator and defines the properties needed, for example our Radius server available at our domain using specific settings.
        
-   Services
    
    -   Some services require or support authentication, such as the webinterface, OpenVPN, etc. These may allow one or more connectors.
        

## Authenticators & Connections

Services within OPNsense can use different authentication methods, for which connections can be configured in System ‣ Access ‣ Servers (e.g. the method can be **radius** which is offered through a server at a location). All of these methods use the same api defined in `OPNSenseAuthIAuthConnector`, which comes with some simple to use handles.

If a class in `OPNSenseAuth` implements `IAuthConnector` it is considered a viable authentication option for the authenticator factory named `AuthenticationFactory`.

The factory provides a layer of abstraction around the different authentication concepts, for example a server defined in System ‣ Access ‣ Servers can be requested using a simple `(new AuthenticationFactory())->get('name');` This connects the authenticator to the configured servers and the response object is ready to handle authentication requests.

## Services

We strive to use `PAM` to define our services, in which case we adopt to existing standards. OPNsense comes with a PAM module, which connects our service definitions with the services defined using PAM.

A simple example of a service named **opnsense-login** is defined as follows in a file with the name `/usr/local/etc/pam.d/opnsense-login`

```
auth                sufficient      pam_opnsense.so
account             sufficient      pam_opnsense.so
```

To test authentication, you can use opnsense-login for any configured service. The following example tries to authenticate user *root* for service *opnsense-login* (the default when no options are specified).

```
/usr/local/sbin/opnsense-login
```

See `man opnsense-login` for a list of available command line options.

Note

**opnsense-login** inherits from the standard system authentication used for console and web GUI login unless otherwise specified.

Internally PAM calls `/usr/local/libexec/opnsense-pam` which acts as a stepping stone into the authentication sequence served by `/usr/local/libexec/opnsense-auth`. Since `opnsense-auth` is written in php and needs elevated privileges for this task, the stepping stone makes sure it has them granted before executing using the *setuid* bit.

[圖](https://docs.opnsense.org/_images/blockdiag-81e9000faecd1ba6324fa1e29324b01913fa3c11.png)

The authentication script `opnsense_auth` utilizes our factory class to perform the actual authentication using the connections defined in the service.

For this purpose we expose a *services* namespace in `OPNSenseAuthServices` where the required options can be read from the OPNsense configuration.

For every service defined in PAM, the factory method `getService()` expects a class implementing `OPNsenseAuthIService`. Using the `aliases()` static method service classes can support multiple PAM services at once if needed (e.g. System can also be used for ssh).

Note

Not every service uses PAM already, in that case it is defined as a script handling the authentication.

The interface `IService` is quite easy to read and should be self explanatory.

## Single sign-on flow

When implementing single sign on based authenticators, the sequence of events is different than the usual “offer user and password, validate access”. Since the credentials aren’t known by the firewall, the authentication should be handled by the component that handles the single sign-on, this is usually a web based auth sequence.

For this reason we extended the `AuthenticationFactory` with a method called `listSSOproviders()`, which returns the SSO authenticators available in `/usr/local/opnsense/mvc/app/library/OPNsense/Auth/SSOProviders` for a requested service.

Each provider should implement `OPNsenseAuthSSOProvidersISSOContainer`, which returns the service a provider belongs too. One provider can yield multiple service endpoints. The class `Provider` should be used to yield providers in `listProviders()`. This is merely a wrapper pointing to the service(s).

Services need to implement their own logic for handling the login sequence and, when applicable, creating sessions on successful logins.