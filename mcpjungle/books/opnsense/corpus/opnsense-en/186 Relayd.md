---
title: "Relayd"
source: https://docs.opnsense.org/manual/relayd.html
chapter: ["Community Plugins","Other"]
order: 186
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:15.550Z"
---


# Relayd


The relayd plugin offers a load balancer which is capable of handling OSI layer 3 or 7 forwarding services to various backend servers while validating their availability.

One of the main advantages over other forwarding services available for OPNsense is that relayd offers a transparent forwarding mode in layer 3 (redirection), which is lightweight and forwards the unmodified session to the target host.

## Types of configuration items

Relayd defines the following types of objects which build up to a virtual server definition.

### Hosts

These types define the actual target machines being used in your pool, for basic setups these only define an IP address and a unique name to identify the machine.

### Tables

A table defines a list of hosts and acts as a grouping, a single host might be used in multiple tables.

### Table check

A table check defines how relayd should determine for a group of hosts if the target is ready to use, this could for example be a simple `icmp` (ping) test or a more advanced check like requesting an uri from a webserver and check the response code.

By default a list of common checks is installed with the plugin, you can add additional checks later if needed.

### Virtual Server

A virtual server is where it all comes together, this type of object defines where to accept traffic from (bind address and port) and how to handle traffic when being received.

The server type is one of the most important settings and defines if this virtual host is acting either as a redirection (using the firewall/transparent) or a relay (layer 7 mode).

It is possible to choose two different tables to forward to here, in standard (non advanced mode) only the primary table is visible including settings how traffic should be divided (`Scheduler`) and hosts should be checked as described earlier.

When a backup is specified, it will be used when all hosts in the primary table are down (according to the configured check).

Tip

If the hosts in the table respond to a different port than the one listening on, make sure to collapse the advanced settings to gain access to the (target) port directive.

### Protocols

Protocols are templates defining settings and rules for relays. They allow setting generic TCP options, SSL settings, and rules for the selected application layer protocol.

These are only selectable in advanced view mode, for documentation we refer to the [relayd.conf](https://www.freebsd.org/cgi/man.cgi?query=relayd.conf&sektion=5&apropos=0&manpath=FreeBSD+12.2-RELEASE+and+Ports#PROTOCOLS) man page.

## General settings

The general settings tab is used to enable the service and configure global settings, such as how often hosts are being checked and the number of resources relayd is allowed to use.

## Status

Using the status page you can gain insights into the running configuration and perform maintenance tasks on various objects. The easy to use presets on top of the page offer the ability to save filter selections locally in your browsers storage for later reuse.

## Simple example

One of the easiest setups is a virtual server which monitors backend servers using icmp (ping) and forwards traffic to a group of mail servers listening on port 25 (smtp), the graph below shows the connection from a client to one of the backend servers defined in a table.

[圖](https://docs.opnsense.org/_images/blockdiag-84a8c619a78264ea00683f366b96d1877dc8385b.png)

In order to set up the example scenario, configure the following settings:

-   Backend Hosts (add 2 new with the following properties)
    
    > -   Enable: \[x\], Name: host\_1, Address: 10.0.0.1
    >     
    > -   Enable: \[x\], Name: host\_2, Address: 10.0.0.2
    >     
    
-   Table, add new with the following properties
    
    > -   Name: table
    >     
    > -   Hosts: host\_1,host\_2
    >     
    > -   Enable: \[x\]
    >     
    
-   Virtual Server, add with the following properties
    
    -   Name: ExampleServer
        
    -   Enable: \[x\]
        
    -   Server Type: Redirection
        
    -   Listen Address: 192.168.1.1
        
    -   Listen Port: 25
        
    -   Table: table
        
    -   Scheduler: Round Robin
        
    -   Table Check: ICMP
        

Make sure to enable relayd on the generic settings tab, save settings and the new virtual host should be active.

---

