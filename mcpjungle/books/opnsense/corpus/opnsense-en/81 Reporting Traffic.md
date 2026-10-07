---
title: "Reporting Traffic"
source: https://docs.opnsense.org/manual/reporting_traffic.html
chapter: ["Reporting"]
order: 81
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:22.884Z"
---

# Reporting Traffic

## Reporting: Traffic

Under Reporting ‣ Traffic you will find a traffic monitor which show the current amount of data flowing through your firewall, measured in bps (bits per second).

## Graph

[圖](https://docs.opnsense.org/_images/reporting_traffic_sample.png)

The top area of the screen shows an overview of all network adapters for both in- and outgoing traffic. You can select the desired polling resolution with the dropdown left of the interface selection dropdown.

The graph below shows the top consumers over the same timespan, when you point to a dot it will show you the measured bandwidth for the selected host (the color matches the interface).

## Top talkers

Although the graphical overview also shows the most active clients on the network, sometimes it is more convenient to see the list of addresses and their current activity in a grid type overview. This is where the “Top talkers” tab comes into play, the information is quite comparable to what a command line tool as `iftop` would display:

[圖](https://docs.opnsense.org/_images/top_talkers.png)

When opening this tab you will be presented with the most active addresses, including the amount of traffic passed when measured and the last time traffic was seen from or to that address.

Every time the graph is updated, the grid will also be populated with new information.