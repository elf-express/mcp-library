---
title: "Menu System"
source: https://docs.opnsense.org/development/components/menusystem.html
chapter: ["Development Manual","Components"]
order: 265
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:55.069Z"
---

# Menu System

OPNsense Menu System

[圖](https://docs.opnsense.org/_images/menusystem.png)

## Overview

One of the shared components of the OPNsense framework is the menu system, which is wrapped in a single class and part of the base model.

The only responsibility of the menu system is to create a tree like structure to represent the menu and being able to keep track of the mapping between a location and the hierarchy of the menu system. To keep things clean and understandable, the menu system doesn’t know anything about users or authorisation.

Currently the main focus for the menu system is to support the legacy code, so we will be able to reimplement the menu in both legacy and new code.

Our base UI controller (\\OPNsense\\Base\\ControllerBase) implements the menu system for further use.

An example of how to create a menu, is given below:

```
// create new menu
$menu = new Menu\MenuSystem();
// append an additional dynamic item into the system
$menu->appendItem("System.Advanced", "test123", array("url"=>"/testpage.php","order"=>1));
// test, print menu as structured named array
print_r($menu->getItems("/testpage.php"));
```

The current version only implements a static menu defined by one XML file (models/OPNsense/Base/Menu/Menu.xml), but extending with additional XML files is already supported in the component for future use.

## Menu.xml

The menu xml is defined as follows:

```xml
<menu>
    <MainItem order="0" VisibleName="System" cssClass="glyphicon glyphicon-dashboard">
        <SubItem1 url="/ui/test.php"/>
        <SubItem2 url="/ui/test2.php"/>
    </MainItem>
</menu>
```

The top level should be named “menu” to let the system know this is a menu structure, the next layers will be used for the structure of itself. To map the attributes to the menu objects created there are setters in OPNsense\\Base\\Menu\\MenuItem, in this version the next attributes are supported:

-   order, sort order in our menu
    
-   VisibleName, name to use (if not set the tagname / id will be used)
    
-   cssClass, style attributes for the frontend system.