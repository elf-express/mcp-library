---
title: "LAN Bridge"
source: "https://docs.opnsense.org/manual/how-tos/lan_bridge.html"
chapter: ["Interfaces","Setup Guides","Interfaces"]
order: 116
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:32:39.365Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：VLAN and LAGG Setup](<115 VLAN and LAGG Setup.md>)　｜　[下一篇：VXLAN Bridge ➡](<117 VXLAN Bridge.md>)

# LAN Bridge

> 章節：[Interfaces](<000 目錄.md#c-19>) › [Setup Guides](<000 目錄.md#c-21>) › [Interfaces](<000 目錄.md#c-22>)

**Original Author:** Martin Wasley

## **Introduction**

LAN Bridges should really only be used where the LAN secondary, tertiary and other interfaces are not heavily used, if that is the case then it is recommended that an external switch be used instead. That being said, if the CPU is fast enough then it will easily cope with the extra load placed upon it by the bridge.

When creating a LAN bridge it is essential that you have physical access to the device, you will need to swap the LAN connection at a certain point.

## **Step One**

Configure OPNsense as normal, with a single LAN interface, make sure that it works correctly. It’s a good idea to add the extra NIC interfaces ( OPTx ) during installation.

## **Step Two**

Create the bridge itself. Select Interfaces ‣ Devices ‣ Bridge and ADD a new bridge. Select from the member interfaces the unused interfaces you wish to add to the bridge, OPT2,OPT3 etc.

[![../../_images/lan_bridge_1.png](<../images/8ac26427-lan_bridge_1.png>)](https://docs.opnsense.org/_images/lan_bridge_1.png)

Now Save the new bridge.

Note

It is imperative that the member interfaces have nothing set within them for IPv4 or IPv6, each member interface should be enabled and they should look like this:

[![../../_images/lan_bridge_2.png](<../images/e5deacba-lan_bridge_2.png>)](https://docs.opnsense.org/_images/lan_bridge_2.png)

## **Step Three**

Select Interfaces ‣ Assignments and for the LAN interface, select the bridge previously created and Save.

[![../../_images/lan_bridge_3.png](<../images/45a0846d-lan_bridge_3.png>)](https://docs.opnsense.org/_images/lan_bridge_3.png)

At this point you will need to swap your LAN cable from the existing LAN connection to one of the NICs that were added to the bridge interface, once connected then you must wait, it can take some time for the interface to come back up, but keep refreshing the web interface until it does.

## **Step Four**

The Original LAN interface is now unassigned and will need to be re-assigned. Go to Interfaces ‣ Assignments and in the New Interface box you will see the NIC itself ( igb\*, em\* ), select it and hit the ‘+’ button to add an assignment, then click Save.

[![../../_images/lan_bridge_5.png](<../images/ff7ca9bb-lan_bridge_5.png>)](https://docs.opnsense.org/_images/lan_bridge_5.png)

## **Step Five**

Select Interfaces ‣ Devices ‣ Bridge and add the interface created in Step Four to the bridge. Also check Enable link-local address checkbox in case you are using IPv6 and press Save. Remember to check the new interface and ensure it is enabled as in Step Two.

[![../../_images/lan_bridge_4.png](<../images/02a127e8-lan_bridge_4.png>)](https://docs.opnsense.org/_images/lan_bridge_4.png)

## **Step Six**

We now need to make two changes to the System Tunables to ensure that filtering is carried out on the bridge itself, and not on the member interfaces. Go to System ‣ Settings ‣ Tunables and select using the pen button net.link.bridge.pfil\_member and set the value to 0 (add a new record if this entry doesn’t exist on your installation).

[![../../_images/lan_bridge_6.png](<../images/d3ecef8e-lan_bridge_6.png>)](https://docs.opnsense.org/_images/lan_bridge_6.png)

Select the tunable net.link.bridge.pfil\_bridge and set the value to 1

[![../../_images/lan_bridge_7.png](<../images/d4454fc1-lan_bridge_7.png>)](https://docs.opnsense.org/_images/lan_bridge_7.png)

## **Final**

Once complete, the Interface ‣ Assignments page should look similar to this:

[![../../_images/lan_bridge_8.png](<../images/349c5fbc-lan_bridge_8.png>)](https://docs.opnsense.org/_images/lan_bridge_8.png)

Now reboot, when the system restores you should have a fully functional bridge interface.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：VLAN and LAGG Setup](<115 VLAN and LAGG Setup.md>)　｜　[下一篇：VXLAN Bridge ➡](<117 VXLAN Bridge.md>)
