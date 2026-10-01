---
title: "General User Interface"
source: "https://docs.opnsense.org/manual/gui.html"
chapter: ["Lobby"]
order: 72
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:16.822Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Lobby](<71 Lobby.md>)　｜　[下一篇：Dashboard ➡](<73 Dashboard.md>)

# General User Interface

> 章節：[Lobby](<000 目錄.md#c-8>)

This article explains the basics of the OPNsense Graphical User Interface or GUI for short.

## User Login

Before we can take a look at the GUI options we need to login. The default user is root and the password is opnsense.

[![../_images/login.png](<../images/f87894f1-login.png>)](https://docs.opnsense.org/_images/login.png)

## GUI Layout & Main Components

The GUI consists out of the following main components:

[![../_images/gui_layout.png](<../images/31e5c380-gui_layout.png>)](https://docs.opnsense.org/_images/gui_layout.png)

### Logo & Link to Lobby

Click on the OPNsense logo wherever you are in the interface and you will be directed to the lobby and dashboard.

In the Lobby you can:

-   Look at the dashboard with widgets
    
-   View the 2-clause BSD license
    
-   Change your password
    
-   Logout
    

### Menu Area

The Menu area holds all the primary menus and submenus. Here you can select what part of the system you want to watch or change.

You can see the layering on the menu. There are three levels:

1.  Category level
    
2.  Function level
    
3.  Configuration level *(may not exist if the function is simple)*
    

In the following sample you see a screenshot of the Category **System**, with:

-   Function: **Settings**
    
-   Selected Configuration item: **General**
    

![../_images/submenu.png](<../images/6f534001-submenu.png>)

### Favorites

Frequently used menu items can be added to a Favorites menu. This applies to Configuration level items, or Function level items if the Configuration level does not exist.

To add or remove a Favorites menu item, hover over the page title with your mouse or tap it on a touch device. A favorite (star) icon will appear. Click or tap this icon to toggle the menu item as a favorite.

Favorites are shown in the Favorites menu item at the top of the menu area, where they can be selected for quick access.

[![../_images/favorites.png](<../images/6d489981-favorites.png>)](https://docs.opnsense.org/_images/favorites.png)

### Search Navigation

Another way to navigate through the GUI is by using the search box on the upper right corner of the screen. Either click on it or hit tab to select it.

The search field is a type-ahead field, meaning that it will guess what you are looking for and fill up while typing. Hit Enter or click on an option to select and navigate directly to the right page.

![../_images/quick-navigation.png](<../images/ba4fd67a-quick-navigation.png>)

### System Status

In the upper right corner of the screen is also a small indication of the system status. In a normal situation this will be greyed out, but it will display a color if something is wrong. You can click on it to review any of the pending messages, if any:

![../_images/gui_system_status.png](<../images/f840f6e0-gui_system_status.png>)

The colors indicate the severity of the issue. They are:

-   Red. Indicates that an error has occurred during system operation. Click it to go to the relevant page. In most cases this will be the crash reporter, which you can use to send us information about the crash.
    

![../_images/gui_system_status_error.png](<../images/8d68d43d-gui_system_status_error.png>)

-   Yellow. Indicates a warning.
    
-   Blue. Indicates an informational message.
    
-   Grey. Everything is working as normal.
    

### User & Local domain

In the right corner just to the left of the system status you will see your username and the full domain name the firewall is configured with (to change firewall name, go to System ‣ Setting ‣ General).

### Content Area

The content area is used to display:

-   Input forms
    
-   Popup Forms
    
-   Buttons
    
-   General forms of data output graphical and text based
    

## Form View

Let’s take a look at how an advanced form may look like:

![../_images/proxy_form.png](<../images/c8ef76d1-proxy_form.png>)

### Full Help

Many forms are equipped with built-in help. In the upper right corner of the form you can select to view all help messages at once. The toggle will color green when enabled and show the help messages beneath the input items.

![../_images/help_msg.png](<../images/101ab207-help_msg.png>)

### Advanced Mode

Some forms have hidden advanced features, to view them toggle the **advanced mode** in the left corner of the form. Doing so will reveal all advanced options.

![../_images/advanced.png](<../images/ff7347e4-advanced.png>)

### Single Item Help

Show a single line help by pressing the **(i)** left of a form item. Like this:

![../_images/info.png](<../images/c548f01a-info.png>)

### Standard Tabs

A standard tab can be clicked upon to open the corresponding form.

A sample can be seen here:

![../_images/tab.png](<../images/5525fb1f-tab.png>)

### Dropdown Tabs

A dropdown tab can be clicked upon to open the first menu item or you can click on the arrow next to it to show all options, like so:

![../_images/dropdown_tab.png](<../images/2feeb5cb-dropdown_tab.png>)

## Data grids

Many components within OPNsense use grid views to navigate through content, below is an example of a simple table view supporting the most relevant actions.

![../_images/gui_grid.png](<../images/6bc8e452-gui_grid.png>)

### Fields

The available fields vary between components, the icon can be used to select which fields should be visible or hidden.  
  

### Filter and limit

The top area of the grid contains a search input combined with a reload button and a selection for the number of rows to show at once on a page. Often the search input will be instantly applied, but in some cases a reload is needed if the action can't be processed fast enough.  
  
When using the filter in log files, you will find a **Go to page** action behind every record. This will jump to the corresponding page and show you all surrounding records so you can see the context of a log message.  
  

The search input tokenizes space-delimited words, causing the filter to return records matching all of the clauses included in the search phrase.

### Actions

Different actions could be supported on a (set of) records:

-   / Enable / disable a record
-   Edit a record
-   Copy a record and edit
-   Delete a record, usually this will ask for a confirmation
-   Add a new record and open edit dialog

  
  

### Page Navigation

The navigation buttons `« ‹ [1,2,..] › »` help scroll through the different pages that are available for the selected data.

Note

Although the page numbers and last page button (`»`) are always visible, they can only be used when the size of the dataset is known upfront. In case of large datasets, such as intrusion alerts and log views the number of records is not known upfront, since there’s no relation between the size of the underlying data and the number of records.

The record count in these cases is more or less a guestimate based on the number of records already shown.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Lobby](<71 Lobby.md>)　｜　[下一篇：Dashboard ➡](<73 Dashboard.md>)
