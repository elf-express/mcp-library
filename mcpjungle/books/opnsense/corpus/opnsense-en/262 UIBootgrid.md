---
title: "UIBootgrid"
source: https://docs.opnsense.org/development/frontend/bootgrid.html
chapter: ["Development Manual","Frontend"]
order: 262
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:53.586Z"
---

# UIBootgrid

The UIBootgrid system is a wrapper around [Tabulator](https://tabulator.info/) and provides a generic table system that is reusable on all pages requiring data listing and manipulation.

## Setup

To get started, see [Using grids module & plugin](<367 Using grids module & plugin.md>). The example will show you how to get started with a minimal grid setup and how this front-end code ties to the controller layer.

## Basic Layout

Since the controller layer defines standardized output and expects standardized input, it’s possible to construct and feed a grid by simply defining a set of endpoints as explained in the setup:

```
$("#{{formGridAddress['table_id']}}").UIBootgrid(
    {
        search:'/api/gridexample/settings/search_item/',
        get:'/api/gridexample/settings/get_item/',
        set:'/api/gridexample/settings/set_item/',
        add:'/api/gridexample/settings/add_item/',
        del:'/api/gridexample/settings/del_item/',
        toggle:'/api/gridexample/settings/toggle_item/',
        info:'/api/gridexample/settings/info'
    }
);
```

You can use the browser developer tool to inspect the request/response structures of each operation. For example, the `search` endpoint looks like this:

**Request:**

```json
{
    "current": 1,
    "rowCount": 50,
    "sort": {}
}
```

**Response:**

```
{
    "rows": [
        {
            "uuid": "3b4e949d-443b-4127-a709-1e41589db462",
            ...
        },
        ...
    ],
    "rowCount": 1,
    "total": 1,
    "current": 1
}
```

Note

`info` endpoints are not used very often (and can safely be omitted), these are mainly intended as simple trigger to display an info dialog.

## Column Setup

The columns and the associated properties can be defined in two ways:

-   Through a form, if creation, deletion, updating and adding are to be supported.
    
-   Through a `<table>` structure, only if the `search` endpoint is exclusively required (static data)
    

## `form`

In forms, column properties are defined in the `<grid_view>` tag as explained in [Define dialog items](<367 Using grids module & plugin.md#define-dialog-items>)

## `table`

When using a table, column properties are set as `data-` attributes. For example:

```xml
<table id="livelog-table" class="table table-condensed table-hover table-striped table-responsive">
    <thead>
        <tr>
            <th data-column-id="interface" data-formatter="interface" data-sortable="false" data-width="80">{{ lang._('Interface') }}</th>
            <th data-column-id="dir" data-type="string" data-formatter="direction" data-sortable="false" data-width="30"></th>
            ...
        <tr>
    </thead>
</table>
```

If constructing using a `table`, the minimum setup requires a `data-column-id` to be set in order to map the row data to the appropriate cell. Additionally, column header text (`label`) is set on the element itself.

Note

Internally, forms are translated to table structures.

## `properties`

The following column properties are available:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `sorter` | `string` | `null` | Sorter function to use if `ajax: false`. |
| `formatter` | `string` | `null` | Formatter function to use for this column. See [options.formatters](#formatters). |
| `headerFormatter` | `string` | `null` | Header formatter function to use for this column. See [options.headerFormatters](#headerformatters). |
| `visible` | `boolean` | `true` | If this column should be rendered by default. Users are always allow to toggle the column visibility, unless this has been disabled through `selectable`. |
| `selectable` | `boolean` | `true` | If the visibility of this column can be toggled on/off. Use this if you require columns to be (in)visible at all times. |
| `sequence` | `number` | `null` | Sequence number to force columns in a certain order. Keep in mind that users can re-order columns. |
| `width` | `number` | `null` | Default width in pixels. Users can change this by resizing the columns. |
| `min-width` | `number` | `null` | Minimum width in pixels. Use this to prevent users resizing lower than this given threshold. |
| `max-width` | `number` | `null` | Maximum width in pixels. Use this to prevent users resizing higher than this given threshold. |
| `sortable` | `boolean` | `true` | If this columnm header can be clicked to sort on this column. |

## Configuration Reference

The `UIBootgrid` initialization object starts with the CRUD methods as stated above, but the whole structure contaions a lot of options to modify the behavior to fit your purpose.

The top-level options are layed out as follows:

```
config
├── search
├── get
├── set
├── add
├── del
├── toggle
├── info
├── options
│   ├── ...
│   ├── ...
│   └── ...
├── commands
│   ├── ...
│   └── ...
├── tabulatorOptions
    ├── ...
    └── ...
```

## `options`

General settings for bootgrid behavior

<table>
<tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr>
<tr><td><code>datakey</code></td><td><code>string</code></td><td><code>"uuid"</code></td><td>Defines the property in the data that is used for indexing into the grid. Since most model data is uniquely identified through a UUID, this property defaults to <code>uuid</code>. However, in some situations you may wish to override this if the data uses a different key.</td></tr>
<tr><td><code>disableScroll</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Disables in-grid vertical scrolling behavior. Setting this to <code>true</code> means all rows will be rendered if not constrained by pagination, so be aware of the performance impact if your grid contains many rows.</td></tr>
<tr><td><code>sorting</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Whether sorting should be enabled. Sorting is triggered through header clicks.</td></tr>
<tr><td><code>rowCount</code></td><td><code>array</code></td><td><code>[50, 100, 200, 500, 1000, true]</code></td><td>An array of numbers that defines the selection of row counts a user can select. The special value <code>true</code>, means “all rows”.</td></tr>
<tr><td><code>formatters</code></td><td><code>object</code></td><td><code>Internal formatters</code></td><td>Formatters for values in cells. See <a href="https://docs.opnsense.org/development/frontend/bootgrid.html#formatters">options.formatters</a>.</td></tr>
<tr><td><code>headerFormatters</code></td><td><code>object</code></td><td><code>{}</code></td><td>Formatters for the headers of columns. See <a href="https://docs.opnsense.org/development/frontend/bootgrid.html#headerformatters">options.headerFormatters</a>.</td></tr>
<tr><td><code>statusMapping</code></td><td><code>object</code></td><td><code>{}</code></td><td>A key-value pair representing status colors. For example:<br>statusMapping: { 0: "fw-pass", 1: "fw-nat", 2: "fw-block", }<br><br>To use this, each row must contain a <code>status</code> property set to one of the keys defined in the status mapping. UIBootgrid will automatically add the value as a class to the cell element. The values must be valid classes defined in CSS. This is mainly used to give rows a specific background color based on their status.</td></tr>
<tr><td><code>sorters</code></td><td><code>object</code></td><td><code>Internal sorters</code></td><td>Specify one or more custom sorter functions indexed by key. To instruct a column to use this sorter, set the <code>sorter</code> property through the <code>grid_view</code> tag as explained in <a href="https://docs.opnsense.org/development/examples/using_grids.html#define-dialog-items">Define dialog items</a>. These sorters are only applied if <code>ajax: false</code>, meaning that all sorting logic happens locally.</td></tr>
<tr><td><code>requestHandler</code></td><td><code>function</code></td><td><code>null</code></td><td>Request handler callback function that’s executed before the AJAX call.<br>The function expects 1 parameter: <code>params</code> and must return this same parameter. This parameter is an object that contains all data to be sent to the endpoint. With this function you may modify/override the data sent to the endpoint before it’s sent.</td></tr>
<tr><td><code>responseHandler</code></td><td><code>function</code></td><td><code>null</code></td><td>Response handler callback function that’s executed after AJAX response. This function expects 1 parameter: <code>response</code> and must return this same parameter. This parameter contains the response from the called endpoint. You may use this function to modify/override the response before it’s used by the grid system.</td></tr>
<tr><td><code>resetButton</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Determines if the grid reset button should be rendered. The grid locally persists certain changes by default, such as column resizes, sorting behavior etc. This button clears the persistence and resets the grid to all defaults.</td></tr>
<tr><td><code>searchSettings</code></td><td><code>object</code></td><td><code>{delay: 1000}</code></td><td>Allows modifying search behaviour of the grid. Currently only “delay” is defined and set to 1000ms by default. Delay is the amount of time waiting before reloading the grid after search.</td></tr>
<tr><td><code>navigation</code></td><td><code>boolean</code></td><td><code>true</code></td><td>If the action bar, pagination and footer should be rendered.</td></tr>
<tr><td><code>ajax</code></td><td><code>boolean</code></td><td><code>true</code></td><td>If disabled, ignores any CRUD endpoint defined. Use the <a href="https://docs.opnsense.org/development/frontend/bootgrid.html#replace">replace(rows)</a> or <a href="https://docs.opnsense.org/development/frontend/bootgrid.html#append">append(rows)</a> functions to add data to the grid yourself. If disabled, any sorting, filtering or pagination will happen locally, as all data is expected to be present in the grid. You can use the <code>sorters</code> to define sorting logic yourself.<br>If enabled, uses the defined CRUD endpoints to fetch/filter/sort and modify the data.</td></tr>
<tr><td><code>ajaxConfig</code></td><td><code>object</code></td><td>See description</td><td>Ajax configuration used in all ajax calls. The defaults are:<br>{ method: "POST", dataType: "json", headers: { "Content-type": "application/json;charset=utf8" } }<br><br>Override for advanced purposes.</td></tr>
<tr><td><code>responsive</code></td><td><code>boolean</code></td><td><code>false</code></td><td>If this grid is allowed to split longer lines into newlines, creating variable height grid rows. Use this if the cell content should always be visible, otherwise, the content will be cut off with an ellipsis and dynamically assigned a tooltip so hovering over the data will show the full content.</td></tr>
<tr><td><code>onBeforeRenderDialog</code></td><td><code>function</code></td><td><code>null</code></td><td>function handler which will be called before an edit dialog is being displayed, can be used to change the otherwise static dialogs. Should return a $.Deferred() object. (e.g. <code>return (new $.Deferred()).resolve();</code>)</td></tr>
<tr><td><code>virtualDOM</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Enable or disable the virtual rendering mode of the grid. See <a href="https://tabulator.info/docs/6.4/virtual-dom">the Tabulator docs</a>. In essence this option makes sure that not all rows are rendered by default, but are rendered on the fly as they are needed when the user scrolls down/up. This makes it possible to render an extremely large amount of rows with very little performance impact.<br>When using this options, keep in mind that each row may not be available in the DOM yet at any given time for direct referencing in code. Therefore, the proper <code>onRendered</code> callbacks should be used if you wish to refer to this element directly. See <a href="https://docs.opnsense.org/development/frontend/bootgrid.html#formatters">options.formatters</a> and <a href="https://docs.opnsense.org/development/frontend/bootgrid.html#commands">commands</a>.</td></tr>
<tr><td><code>selection</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Whether individual rows should be selectable through a checkbox in a left-frozen column.</td></tr>
<tr><td><code>multiSelect</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Whether multiple rows may be selected for actions (<code>delete-selected</code>, <code>enable-selected</code>, <code>disable-selected</code>). Only relevant if <code>selection: true</code></td></tr>
<tr><td><code>stickySelect</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Ignores <code>multiSelect</code>. Enable this if selecting a row should disable the selection of another row, forcing exactly one row to be selected at all times. This is often used in master-detail views, where one row corresponds to the entries in another grid. Only relevant if <code>selection: true</code></td></tr>
<tr><td><code>rowSelect</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Whether rows should be selectable by clicking in any of the row cells. Keep in mind that in UX terms, this makes it difficult for users to select values in a grid for copy+pasting purposes.</td></tr>
<tr><td><code>batchToggle</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Enable/disable the batching of the <code>enable/disabled-selected</code> actions. Batching involves taking all of the <code>datakey</code> strings of the selected rows and splitting these up into <code>batchToggleSize</code>-length chunks, and firing one toggle request per batch. The request contains all <code>datakey</code> strings as a single comma-separate parameter. Therefore, the controller should be capable of dealing with these keys (<code>toggleBase</code>). Set this to <code>false</code> only if your controller endpoint is not capable of dealing with multiple values in one request.</td></tr>
<tr><td><code>batchToggleSize</code></td><td><code>number</code></td><td><code>40</code></td><td>Default maximum batch side for <code>batchToggle</code>. This number roughly corresponds to the length of a single UUID * 40 to keep the length of a URL below its maximum. Adjust this number if the <code>datakey</code> is not a UUID.</td></tr>
<tr><td><code>batchDelete</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Enable/disable the batching of the <code>delete-selected</code> action. Batching involves taking all of the <code>datakey</code> strings of the selected rows and splitting these up into <code>batchDeleteSize</code>-length chunks, and firing one delete request per batch. The request contains all <code>datakey</code> strings as a single comma-separate parameter. Therefore, the controller should be capable of dealing with these keys. Set this to <code>false</code> only if your controller endpoint is not capable of dealing with multiple values in one request.</td></tr>
<tr><td><code>batchDeleteSize</code></td><td><code>number</code></td><td><code>40</code></td><td>Default maximum batch side for <code>batchDelete</code>. This number roughly corresponds to the length of a single UUID * 40 to keep the length of a URL below its maximum. Adjust this number if the <code>datakey</code> is not a UUID.</td></tr>
<tr><td><code>triggerEditFor</code></td><td><code>string</code></td><td><code>null</code></td><td>Set this value to a <code>datakey</code> value (such as a UUID) to trigger the edit dialog of this particular row. This is used in cases where we are referred to from a different page to load both the grid and immediately open the right entity for editing.<br>If we came from a different page, the <code>edit</code> URL parameter will be set to the <code>datakey</code> value. This parameter can be fetched through <code>getUrlHash('edit')</code>.<br>In most cases, if triggering an edit on referral is necessary, <code>getUrlHash('edit')</code> should be used. If the referrer sets a different URL parameter, adjust your logic accordingly.</td></tr>
<tr><td><code>initialSearchPhrase</code></td><td><code>string</code></td><td><code>null</code></td><td>Same behaviour as <code>triggerEditfor</code>, but for a search phrase value. If set, the grid will load with the search value set to this string so the controller can filter on it.<br>The standardized method to get this value is <code>getUrlHash('search')</code>.</td></tr>
<tr><td><code>static</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Disables persistent storage and resizable columns so the dimensions of the grid are predictable at all times.</td></tr>
<tr><td><code>bottomReserveElement</code></td><td><code>string | Element | JQuery object</code></td><td><code>'.grid-bottom-reserve''</code></td><td>If there is an element below the grid that should be visible at all times (no page scrollbar), you can specify this element here so the grid height calculation takes the height of this element into account.</td></tr>
</table>

## `options.formatters`

Formatters are functions that are executed for each cell whose column has a formatter specified and determine the value that is presented to the user in the cell. Formatters allow you to manipulate the data fetched from the controller into a format that is more easily digestable for a user.

The `formatters` option is an object that contains `key` - `function` pairs, where each key corresponds to the `formatter` value in the grid form as explained in [Define dialog items](<367 Using grids module & plugin.md#define-dialog-items>).

For example:

```
formatters: {
    myformatter: function (column, row, onRendered) {
        return row[column.id];
    }
}
```

The above example simply returns the value of the row without modifications.

The `column` parameter is an object that contains the `id` and the `visibility` status of the column.

The `row` parameter is an object that contains the data for this row.

The `onRendered` parameter is a callback function that allows you to execute a function when the cell has been rendered. For example:

```
formatters: {
    myformatter: function (column, row, onRendered) {
        onRendered((cell) => {
            console.log(`grid cell has been rendered. cell data: ${cell.getData()}`);
        })
        return row[column.id];
    }
}
```

This is useful if you want to bind event handlers to the rendered DOM element, or do work if the cell contains more complex objects such as graphs that are initialized asynchronously.

The callback function expects a single parameter, `cell`, which you can access to get the [cell object](https://tabulator.info/docs/6.4/components#component-cell)

## `options.headerFormatters`

Functionally equivalent to [options.formatters](#formatters), but applied to the column header value instead. By default it’s not necessary to specify a `headerFormatter` tag in the `grid_view` tag of a form, as the keys match to the row keys. For example:

```
headerFormatters: {
    enabled: function(column) {
        return '<i class="fa-solid fa-fw fa-check-square" data-toggle="tooltip" title="{{ lang._('Enabled') }}"></i>';
    }
}
```

The above example will match on the `enabled` row key and return an icon with a tooltip showing the translated value of the column title.

The function expects only a single parameter, `column`, which is an object containing `id`, `visible`, `title`.

## `commands`

The `Commands` column is a special column that is situated frozen on the right side of the grid to ease access regardless of scroll position. This column contains buttons that are linked to actions that can be defined/extended in this configuration section.

Besides the commands defined in the commands column, there are also command buttons placed below the grid which are linked to actions that are not related to one grid row specifically, such as `add` or `delete-selected`. These buttons can also be defined in the command structure, but with the `footer` property set to `true`.

The following commands are built-in by default and are rendered automatically based on their respective CRUD endpoint requirements:

-   `add`. Requires `get`, `set`.
    
-   `edit`. Requires `get`, `set`.
    
-   `delete`. Requires `del`.
    
-   `copy`. Requires `get`, `sets`.
    
-   `info`. Requires `info`,
    
-   `toggle`. Requires `toggle`.
    
-   `enable-selected`. Requires `toggle` (See `batchToggle` option).
    
-   `disable-selected`. Requires `toggle` (See `batchToggle` option).
    
-   `delete-selected`. Requires `del` (See `batchDelete` option).
    

You may override a specific property of the above built-in commands, as the `commands` object is deeply merged, e.g.:

```
edit: {
    sequence: 200
}
```

Will preserve all `edit` command options, but change the sequence from its default of `100` to `200`.

Extra commands can be defined in the top-level `commands` object. The structure of a command starts with a unique key and contains an object with the following schema:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `method` | `function` | No | A function that is executed on command click. Function signature is `(event, cell)`. The [cell object](https://tabulator.info/docs/6.4/components#component-cell) is passed in only if `footer` is `false`. |
| `title` | `string \| function` | No | Translated title to be shown as a tooltip. If the title depends on state, this property can also be a function. If it’s a function, the Cell object is passed as a parameter. |
| `requires` | `array` | No | An optional array of strings that define if this command depends on one or more CRUD actions. For example, the default `add` command depends on `get` and `set`, otherwise the form logic tied to this action wouldn’t be able to get the structure needed to construct the form, nor would it be able to call the right endpoint once “save” has been clicked. If any of the required endpoints are missing, the button isn’t rendered. |
| `sequence` | `number` | No | A number to control how the button is ordered amongst the other buttons. |
| `footer` | `boolean` | No | Whether this command should be rendered in the footer or as part of a row. |
| `primary` | `boolean` | No | Whether this command should be rendered as part of the primary button container. Only relevant when `footer` is `true`. |
| `classname` | `string` | Yes | Icon class added to the `<span>` inside the button element. |
| `filter` | `function` | No | A function that, if defined, must return true or false and determines if this command should be rendered. The Cell object is only passed in if `footer` is `false`. |
| `onRendered` | `function` | No | A function that runs after the element including event bindings have been rendered. This allows the caller to override the behavior of the command. The element is bound to the function and can be access through `$(this)`, but the full Cell object is passed in as a parameter as well, but only if `footer` is `false`. This function has priority over `method`.<br>This function can be used to bind the rendered command DOM element to other system components, such as [$.SimpleFileUploadDlg](<261 View construction (and tools).md#simplefileuploaddlg>). |

There are default commands built-in to the UIBootgrid framework that work in tandem with the default controller actions to facilitate basic CRUD behavior.

For advanced use cases, you can also call the built-in `command` methods directly. For an example, see the [Unbound overrides template](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/views/OPNsense/Unbound/overrides.volt)

## `tabulatorOptions`

Any option set here will be passed directly to Tabulator. Refer to their [docs](https://tabulator.info/docs/).

## Methods

Methods on UIBootgrid can be called through the JQuery bootgrid API:

```
$('#<grid-id>').bootgrid('<method>', ...params);
```

### `append(rows)`

Appends `rows` to the grid. This is a lot slower than [replace(rows)](#replace). Since most of the sorting/filtering logic happens remotely, `replace` should be the preferred method to manipulate data in the grid.

### `replace(rows)`

Replaces all data in the grid by `rows`. Use this function if `ajax: false` to set data in the grid.

### `getTable()`

Gets the Tabulator grid instance bound to this `UIBootgrid`.

### `clear()`

Clears any data in the grid.

### `reload()`

Reload the grid. Triggers a new AJAX request.

### `getRowCount()`

Gets currently selected row count

### `getSelectedRows()`

Gets the `datakey` values of the currently selected rows

### `getCurrentRows()`

Gets all `datakey` values of all rows in the table

### `getCurrentPage()`

Gets current paginated page.

### `destroy()`

Destroy the grid

### `setColumns(columns)`

Enable the visibility of columns. The `columns` parameter expects an array of column IDs.

### `unsetColumns(columns)`

Disable the visibility of columns. The `columns` parameter expects an array of column IDs.

### `search(value, event)`

Search for `value` in the grid (triggering an AJAX request if `ajax: true`).

### `select(ids)`

Programatically select rows. Expects an array of `datakey` strings.

### `getSearchPhrase()`

Get current search phrase.

### `setPersistence(value)`

Enable or disable grid persistence (column setup in local storage). Expects a boolean.

## Other components

If an `apply` button is rendered on the page through [$.SimpleActionButton](<261 View construction (and tools).md#simpleactionbutton>), :`UIBootgrid` will automatically signal to that element to prompt the user to apply if something in the grid changed, e.g. when a row has been edited. Internally it does this by simply calling `$(document).trigger("settings-changed");`.