---
title: "Dashboard widgets"
source: https://docs.opnsense.org/development/frontend/dashboard.html
chapter: ["Development Manual","Frontend"]
order: 263
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:54.576Z"
---


# Dashboard widgets


## General

OPNsense provides an easy framework for developing dashboard widgets within a simple abstraction layer. Each widget is a separate Javascript module that extends from a base widget class. Each widget exposes a set of functions that are called by the dashboard framework logic. Each widget class also exposes the API endpoints it uses to fetch data, so that the dashboard controller can apply per-widget ACL checks.

The framework provides the following features:

-   A responsive and dynamic grid that allows the user to build up a custom layout.
    
-   The layout can be saved per logged in user.
    
-   Administrators that restrict access to specific pages for specific users will automatically restrict access to the widgets that also use the same data feed.
    
-   Widgets are fully asynchronous, meaning they are fully independent from one another, making sure that resource intensive widgets will not hold up other widgets.
    

This framework uses [GridStack](https://gridstackjs.com/) to create the dashboard grid.

Widgets are placed in the `src/opnsense/www/js/widgets/` directory.

## Example

Before going into any details, it is often most useful to present an example that includes most of the core logic: the [interfaces overview](https://github.com/opnsense/core/blob/master/src/opnsense/www/js/widgets/Interfaces.js) widget.

## Functions

The [BaseWidget](https://github.com/opnsense/core/blob/master/src/opnsense/www/js/widgets/BaseWidget.js) shows the skeleton of the widget Javascript module. Widgets extend this class to provide defaults to the framework. To make life a little easier for common patterns, other base widgets may also be exposed. Currently these are:

-   [BaseTableWidget](https://github.com/opnsense/core/blob/master/src/opnsense/www/js/widgets/BaseTableWidget.js): Exposes a dynamic table that can be configured in multiple orientations and only needs a data feed.
    
-   [BaseGaugeWidget](https://github.com/opnsense/core/blob/master/src/opnsense/www/js/widgets/BaseGaugeWidget.js): Exposes a Gauge widget that allows presenting simple current/total values with multiple hooks to customize the widget.
    

The following functions are available to be overridden by the widget when extended from the BaseWidget:

### *Constructor*

```
constructor(config) {}
```

To provide sensible defaults to the framework, a derived javascript class should always call `super()` first in the constructor. Afterwards, the defaults can be overridden. The properties are:

-   `this.title`. Sets the title of the widget in the header.
    
-   `this.tickTimeout`. Sets the interval (in seconds) in which the `onWidgetTick()` function is called. The default is 10 seconds.
    

If the widget has been persisted (the user pressed ‘save’), the loaded widget configuration is passed in the constructor. Any custom data necessary for the widget to properly reload itself can be fetched using the `await this.getWidgetConfig()` function. See the [Configurable widgets](#configurable-widget) section.

### *getGridOptions*

```
getGridOptions() {}
```

To provide flexibility, the widget can optionally override this function and return an object that will be merged and loaded into the GridStack API. This function is called before the widget is rendered to the DOM. For example, the following code:

```
getGridOptions() {
    return {
        // trigger overflow-y:scroll after 650px height
        sizeToContent: 650
    }
}
```

will insert the `sizeToContent: 650` key-value pair into the GridStack options, making sure that the height of the widget does not exceed a maximum of 650 pixels before a scrollbar is inserted. The GridStack API reference can be found [here](https://github.com/gridstack/gridstack.js/blob/master/doc/README.md).

This object is also persisted once the dashboard has been saved, meaning these properties are also passed in the constructor on a widget reload.

The properties do not have to correspond to the GridStack API, any custom data can be pushed here.

### *getMarkup*

```
getMarkup() {}
```

This function must return a jQuery object that contains the static markup that’s necessary to build the layout of the widget. This function will usually just return the container (with styling attached) where dynamic content will be loaded using onMarkupRendered()

### *ajaxCall*

```
ajaxCall(url, data, method='GET') {}
```

This function is a wrapper around the jQuery AJAX function. It is used to make API calls to the backend. The function is internally bound to a retry mechanism, so if the API call fails, it will be retried after a short interval. By default the call will fail after three attempts, after which the widget will show a generic error message.

Certain calls require a POST HTTP verb to be used to be able to send data to the backend. In this case, the `method` parameter can be changed to `POST` and the `data` parameter can be filled with the data to be sent.

### *onMarkupRendered*

```
async onMarkupRendered() {}
```

As soon as the dashboard has loaded, and all widget markup has been rendered to the DOM, dynamic content can be provided to fill the widget by defining this function. Since this is an `async` function, any API call within this function must be awaited. For example:

```
async onMarkupRendered() {
    await this.ajaxCall('/api/interfaces/overview/interfacesInfo', {}, (data, status) => {
        // do something with the data
    });
}
```

This will make sure that all other widgets remain responsive, and a spinner appears while the data is being loaded. Use jQuery to update the markup as prepared by `getMarkup()`.

### *onWidgetResize*

```
onWidgetResize(elem, width, height) {}
```

If a widget is resized by the user, or is resized due to layout constraints / browser resize, this function will be called with the updated width and height. The widget element is passed into the function as well.

Use this function to keep the widget responsive and the layout coherent for different sizes. For example:

```
onWidgetResize(elem, width, height) {
    if (width > 500) {
        $('.interface-info-detail').parent().show();
        $('.interface-info').css('justify-content', 'initial');
        $('.interface-info').css('text-align', 'left');
    } else {
        $('.interface-info-detail').parent().hide();
        $('.interface-info').css('justify-content', 'center');
        $('.interface-info').css('text-align', 'center');
    }
}
```

The above code will make sure that if the width of the widget is less than 500px wide, less critical information is removed. Adjust the styling as necessary.

Warning

While this function is debounced (throttled to prevent excessive calls), it is still executed often during a resize. If this function is doing a lot of heavy lifting, make sure you implement a notion of state to prevent the same logic from executing more than necessary. An example of this can be found in the [BaseTableWidget](https://github.com/opnsense/core/blob/master/src/opnsense/www/js/widgets/BaseTableWidget.js).

If you return true from this function, the grid will be forcefully updated to adjust to a new layout.

### *onWidgetTick*

```
onWidgetTick() {}
```

This function is called every `this.tickTimeout` seconds. While the dashboard is open, this function is used to update the data presented on the dashboard.

### *onWidgetClose*

```
onWidgetClose() {}
```

Executed when a widget is removed from the grid. Make sure to clean up any resources in use by this widget. It is not always necessary to override this function, but it’s possible you’re using a third party library that requires action to be taken when the widget is removed. An example is the cleanup of a rendered chart.

Attention

If you’re using the BaseWidget EventSource mechanism, make sure to call `super.onWidgetClose()` to cleanup the persistent connection to the server.

### *onVisibilityChanged*

```
onVisibilityChanged(visible) {}
```

Executed when the visibility of the page has changed (tab or instance switch). You’re very likely not going to need this function, but if you do, make sure to call `super.onVisibilityChanged(visible)`.

### *openEventSource*

```
openEventSource(url, onMesage);
```

When your widget requires a persistent connection to stream data, use the `super.openEventSource()` function with the API endpoint and a callback function. The `onMessage` callback function takes in a single `event` parameter, of which the `data` property contains the event data.

This function is bound to the same retry mechanism as the `ajaxCall()` function.

### *closeEventSource*

```
closeEventSource();
```

Closes the current active `EventSource`. This will be called automatically if the widget closes and you don’t have the `onWidgetClose` function overridden. If you do, make sure to call `super.onWidgetClose()`.

## BaseTableWidget

The BaseTableWidget exposes a set of functions to easily create a responsive table that is capable of some basic CRUD functionality. To make use of this, simply extend from the BaseTableWidget, which automatically exposes the BaseWidget functions as well. E.g.:

```js
import BaseTableWidget from "./BaseTableWidget.js";

export default class YourWidget extends BaseTableWidget {}
```

### *createTable*

```
super.createTable(id, options);
```

Creates and returns a jQuery object with the id attribute set to the id parameter of this function. The `options` parameters is an object with the following structure:

```js
let options = {
    headerPosition: 'top'|'left'|'none',
}
```

If the `headerPosition` is `top`, some extra options are defined:

```js
let options = {
    headerPosition: 'top',
    rotation: <number>,
    headers: [],
    sortIndex: <number>,
    sortOrder: 'asc'|'desc'
}
```

-   `rotation` will limit the amount of table entries to this value, and ‘scroll’ new data into view.
    
-   `headers` defines a static array of strings that contain the table headers. The position in the array also implicitly defines the index of the column.
    
-   `sortIndex` specifies the index of the headers array to sort on
    
-   `sortOrder` if the sortIndex is specified, the sort order will be either ascending or descending.
    

`headerPosition` `left` is a key-value structure while `headerPosition` `none` allows for arbitrary rows of data without state.

### *updateTable*

```
super.updateTable(id, data = [], rowIdentifier = null);
```

Inserts one or more rows into the table with id parameter `id`. If a rowIdentifier is specified, only a single row of the table is upserted.

The data layout is as follows for `headerPosition` `top` and `none`:

```
[
    ['x', 'y', 'z'],
    ['x', 'y', 'z']
]
```

The data layout for `headerPosition` `left` also allows nested columns:

```
[
    ['x', 'x1'],
    ['y', 'y1'],
    ['z', ['z1', 'z2']]
]
```

## BaseGaugeWidget

`BaseGuageWidget` defines a simple responsive gauge chart. An example implementation can be found in the [Memory Usage Widget](https://github.com/opnsense/core/blob/master/src/opnsense/www/js/widgets/Memory.js)

### *createGaugeChart*

```
super.createGaugeChart(options);
```

### *updateChart*

```
super.updateChart(data);
```

## Styling

Any styling can be added to the [Dashboard CSS file](https://github.com/opnsense/core/blob/master/src/opnsense/www/css/dashboard.css) or a themed version of this file.

Since a lot of the charts have programmatic approaches to colors, the special

```
:root {
    --chart-js-background-color: #f7e2d6;
    --chart-js-border-color: #d94f00;
    --chart-js-font-color: #d94f00;
}
```

CSS selector is defined so you can override these colors for custom themes.

## Configurable widgets

To make widgets configurable, make sure you pass in the `config` object in the constructor and, call `super(config)` as described in the [Functions - constructor](#functions) section. Also set `this.configurable = true` in the constructor as well.

The [CPU graph widget](https://github.com/opnsense/core/blob/master/src/opnsense/www/js/widgets/Cpu.js) is an example of a configurable widget.

Two functions must be overridden to make a widget configurable:

### *getWidgetOptions*

```
async getWidgetOptions();
```

Function must return an object with the following structure:

```
{
    option_name: {
        title: <translated string>,
        type: 'select_multiple',
        options: [
            {
                value: 'value',
                label: <translated string>
            },
            {
                value: 'value',
                label: <translated string>
            }
        ],
        default: ['value', 'value']
    }
}
```

This function is asynchronous as it may require an API call to fetch the available options.

### *onWidgetOptionsChanged*

```
async onWidgetOptionsChanged(options);
```

Callback function that is called when the user changes the options of the widget. The options parameter is an object with the same structure as the object returned by `getWidgetOptions()`, but mapped to selected values.

### *getWidgetConfig*

```
async getWidgetConfig();
```

Gets the current persisted widget configuration. This function implicitly calls the `getWidgetOptions()` function to account for the option defaults.

## ACL and translations

Every widget must expose the endpoints it’s using to the framework, so the controller can determine whether this widget is accessible for the current logged in user. To do this, you must create a section in the `src/opnsense/www/js/widgets/Metadata/<Core|Plugin-specific>.xml` file. The [Core XML file](https://github.com/opnsense/core/blob/master/src/opnsense/www/js/widgets/Metadata/Core.xml) shows how widget metadata is structured.

If any of the defined endpoints is inaccessible, the widget will not be available for the user. Note that the same rules as for any other [ACL](<366 Hello world module & plugin.md#plugin-to-access-control-acl>) applies here.

Translations are provided in the same XML file, you can access these values by using the `this.translations.<key>` variables in the widget class, The value of key is defined by the opening/closing XML tags.

---

