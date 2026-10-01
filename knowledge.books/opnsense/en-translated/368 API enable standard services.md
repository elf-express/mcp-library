---
title: "API enable standard services"
source: "https://docs.opnsense.org/development/examples/api_enable_services.html"
chapter: ["Development Manual","Examples"]
order: 368
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:46.688Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Using grids module & plugin](<367 Using grids module & plugin.md>)　｜　[下一篇：How-tos ➡](<369 How-tos.md>)

# API enable standard services

> 章節：[Development Manual](<000 目錄.md#c-52>) › [Examples](<000 目錄.md#c-62>)

OPNsense contains a simple wrapper which handles standard service actions like starting and stopping services. For this example, we assume the HelloWorld example is created and the model exists.

## Prerequisites

The HelloWorld example forms the basis for this one, please make sure you read and try it first before starting with this one.

## Configd actions

Since the example didn’t contain a service, we’re going to extend the configd template first. Edit `/usr/local/opnsense/service/conf/actions.d/actions_helloworld.conf` and expand with the following sections:

```yaml
[start]
command:exit 0
parameters:
type:script
message:hello world service start

[stop]
command:exit 0
parameters:
type:script
message:hello world service stop

[restart]
command:exit 0
parameters:
type:script
message:hello world service restart

[reload]
command:exit 0
parameters:
type:script
message:hello world service restart

[status]
command: echo "hello world is running"
parameters:
type:script_output
message:hello world service status
```

Next restart configd using `service configd restart` and test these new calls using the following commands

```
# configctl helloworld start
OK
# configctl helloworld stop
OK
# configctl helloworld status
hello world is running
# configctl helloworld restart
OK
```

Our template only simulates a service, it doesn’t actually do anything (`exit 0`).

## Update the service controller

Next we change the existing controller to use `ApiMutableServiceControllerBase`, which links the existing model to the service callouts defined. The `testAction` used in the HelloWorld example is left out to avoid confusion.

/usr/local/opnsense/mvc/app/controllers/OPNsense/HelloWorld/Api/ServiceController.php

```php
use OPNsense\Base\ApiMutableServiceControllerBase;

class ServiceController extends ApiMutableServiceControllerBase
{
    protected static $internalServiceClass = '\OPNsense\HelloWorld\HelloWorld';
    protected static $internalServiceTemplate = 'OPNsense/HelloWorld';
    protected static $internalServiceEnabled = 'general.enabled';
    protected static $internalServiceName = 'helloworld';

    protected function reconfigureForceRestart()
    {
        return 0;
    }
}
```

The service above defines the following static variables:

-   $internalServiceClass
    
    -   reference the model class, which is used to determine if this service is enabled (links the model to the service)
        
    
-   $internalServiceTemplate
    
    -   before starting the service it will call configd to generate configuration data, in this case it would execute the equivalent of `configctl template reload OPNsense/HelloWorld` on the console
        
    
-   $internalServiceEnabled
    
    -   Which section of the model contains a boolean defining if the service is enabled (general.enabled)
        
    
-   $internalServiceName
    
    -   refers to the action template, where it can find start/stop/restart/status/reload actions (actions\_helloworld.conf)
        
    

The `reconfigureForceRestart` overwrite tells the controller if it should always stop the service before trying a start, some services can be signaled to do a reconfigure without stopping.

Tip

When a service may register new [interfaces](<248 Using plugins.md>), one could implement the protected method `invokeInterfaceRegistration` and make it return `true`, after which the plugin system will detect changes to the interface registrations automatically.

## Endpoints

When deploying this controller into the HelloWorld module it would expose the following endpoints

| Method | Endpoint |
| --- | --- |
| `POST` | /api/helloworld/service/stop |
| `POST` | /api/helloworld/service/start |
| `POST` | /api/helloworld/service/restart |
| `POST` | /api/helloworld/service/reconfigure |
| `GET` | /api/helloworld/service/status |

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Using grids module & plugin](<367 Using grids module & plugin.md>)　｜　[下一篇：How-tos ➡](<369 How-tos.md>)
