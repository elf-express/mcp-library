---
title: "Firewall"
source: "https://docs.opnsense.org/development/api/core/firewall.html"
chapter: ["Development Manual","API Reference","Core API"]
order: 276
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:34:00.100Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Dnsmasq](<275 Dnsmasq.md>)　｜　[下一篇：Firmware ➡](<277 Firmware.md>)

# Firewall

> 章節：[Development Manual](<000 目錄.md#c-52>) › [API Reference](<000 目錄.md#c-58>) › [Core API](<000 目錄.md#c-59>)

The firewall API offers a way for machine to machine interaction between custom applications and OPNsense, it is part of the core system.

Although the module does contains a basic user interface (in Firewall ‣ Automation), it’s mirely intended as a reference and testbed. There’s no relation to any of the rules being managed via the core system.

Tip

Use your browsers “inspect” feature to compare requests easily, the user interface in terms of communication is exactly the same as offered by the API . Rules not visible in the web interface (Firewall ‣ Automation) will not be returned by the API either.

*Resources (AliasController.php) – extends : ApiMutableModelControllerBase*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | firewall | alias | add\_item |  |
| `POST` | firewall | alias | del\_item | $uuid |
| `GET,POST` | firewall | alias | export |  |
| `GET` | firewall | alias | get |  |
| `GET` | firewall | alias | get\_alias\_u\_u\_i\_d | $name |
| `GET` | firewall | alias | get\_geo\_i\_p |  |
| `GET` | firewall | alias | get\_item | $uuid=null |
| `GET` | firewall | alias | get\_table\_size |  |
| `POST` | firewall | alias | import |  |
| `GET` | firewall | alias | list\_categories |  |
| `GET` | firewall | alias | list\_countries |  |
| `GET` | firewall | alias | list\_network\_aliases |  |
| `GET` | firewall | alias | list\_user\_groups |  |
| `POST` | firewall | alias | reconfigure |  |
| `GET,POST` | firewall | alias | search\_item |  |
| `POST` | firewall | alias | set |  |
| `POST` | firewall | alias | set\_item | $uuid |
| `POST` | firewall | alias | toggle\_item | $uuid,$enabled=null |
| `POST` | firewall | alias | update | $action=null |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Alias.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Firewall/Alias.xml) |

*Resources (AliasUtilController.php) – extends : ApiControllerBase*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | firewall | alias\_util | add | $alias |
| `GET` | firewall | alias\_util | aliases |  |
| `POST` | firewall | alias\_util | delete | $alias |
| `POST` | firewall | alias\_util | find\_references |  |
| `POST` | firewall | alias\_util | flush | $alias |
| `GET` | firewall | alias\_util | list | $alias |

*Resources (CategoryController.php) – extends : ApiMutableModelControllerBase*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | firewall | category | add\_item |  |
| `POST` | firewall | category | del\_item | $uuid |
| `GET` | firewall | category | download |  |
| `GET` | firewall | category | get |  |
| `GET` | firewall | category | get\_item | $uuid=null |
| `GET,POST` | firewall | category | search\_item | $add\_empty=0 |
| `POST` | firewall | category | set |  |
| `POST` | firewall | category | set\_item | $uuid |
| `POST` | firewall | category | upload |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Category.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Firewall/Category.xml) |

*Resources (DNatController.php) – extends : FilterBaseController*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | firewall | d\_nat | add\_rule |  |
| `POST` | firewall | d\_nat | del\_rule | $uuid |
| `GET` | firewall | d\_nat | get\_rule | $uuid=null |
| `GET` | firewall | d\_nat | move\_rule\_before | $selected\_uuid,$target\_uuid |
| `GET,POST` | firewall | d\_nat | search\_rule |  |
| `POST` | firewall | d\_nat | set\_rule | $uuid |
| `POST` | firewall | d\_nat | toggle\_rule | $uuid,$disabled=null |
| `GET` | firewall | d\_nat | toggle\_rule\_log | $uuid,$log |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [DNat.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Firewall/DNat.xml) |

*Abstract [non-callable] (FilterBaseController.php)*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | firewall | filter\_base | apply |  |
| `GET` | firewall | filter\_base | get |  |
| `GET` | firewall | filter\_base | list\_categories |  |
| `GET` | firewall | filter\_base | list\_network\_select\_options |  |
| `GET` | firewall | filter\_base | list\_port\_select\_options |  |
| `POST` | firewall | filter\_base | set |  |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Filter.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Firewall/Filter.xml) |

*Resources (FilterController.php) – extends : FilterBaseController*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | firewall | filter | add\_rule |  |
| `POST` | firewall | filter | del\_rule | $uuid |
| `GET` | firewall | filter | download\_rules |  |
| `POST` | firewall | filter | flush\_inspect\_cache |  |
| `GET` | firewall | filter | get\_interface\_list |  |
| `GET` | firewall | filter | get\_rule | $uuid=null |
| `POST` | firewall | filter | move\_rule\_before | $selected\_uuid,$target\_uuid |
| `GET` | firewall | filter | search\_rule |  |
| `POST` | firewall | filter | set\_rule | $uuid |
| `POST` | firewall | filter | toggle\_rule | $uuid,$enabled=null |
| `GET` | firewall | filter | toggle\_rule\_log | $uuid,$log |
| `POST` | firewall | filter | upload\_rules |  |

*Resources (FilterUtilController.php) – extends : ApiControllerBase*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | firewall | filter\_util | rule\_stats |  |

*Resources (GroupController.php) – extends : ApiMutableModelControllerBase*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | firewall | group | add\_item |  |
| `POST` | firewall | group | del\_item | $uuid |
| `GET` | firewall | group | get |  |
| `GET` | firewall | group | get\_item | $uuid=null |
| `POST` | firewall | group | reconfigure |  |
| `GET,POST` | firewall | group | search\_item |  |
| `POST` | firewall | group | set |  |
| `POST` | firewall | group | set\_item | $uuid |
|  |  |  |  |  |
| `<<uses>>` |  |  |  | *model* [Group.xml](https://github.com/opnsense/core/blob/master/src/opnsense/mvc/app/models/OPNsense/Firewall/Group.xml) |

*Resources (MigrationController.php) – extends : ApiControllerBase*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `GET` | firewall | migration | download\_rules |  |
| `POST` | firewall | migration | flush |  |

*Resources (NptController.php) – extends : FilterBaseController*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | firewall | npt | add\_rule |  |
| `POST` | firewall | npt | del\_rule | $uuid |
| `GET` | firewall | npt | get\_rule | $uuid=null |
| `GET` | firewall | npt | move\_rule\_before | $selected\_uuid,$target\_uuid |
| `GET,POST` | firewall | npt | search\_rule |  |
| `POST` | firewall | npt | set\_rule | $uuid |
| `POST` | firewall | npt | toggle\_rule | $uuid,$enabled=null |
| `GET` | firewall | npt | toggle\_rule\_log | $uuid,$log |

*Resources (OneToOneController.php) – extends : FilterBaseController*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | firewall | one\_to\_one | add\_rule |  |
| `POST` | firewall | one\_to\_one | del\_rule | $uuid |
| `GET` | firewall | one\_to\_one | get\_rule | $uuid=null |
| `GET` | firewall | one\_to\_one | move\_rule\_before | $selected\_uuid,$target\_uuid |
| `GET,POST` | firewall | one\_to\_one | search\_rule |  |
| `POST` | firewall | one\_to\_one | set\_rule | $uuid |
| `POST` | firewall | one\_to\_one | toggle\_rule | $uuid,$enabled=null |
| `GET` | firewall | one\_to\_one | toggle\_rule\_log | $uuid,$log |

*Resources (SourceNatController.php) – extends : FilterBaseController*

| Method | Module | Controller | Command | Parameters |
| --- | --- | --- | --- | --- |
| `POST` | firewall | source\_nat | add\_rule |  |
| `POST` | firewall | source\_nat | del\_rule | $uuid |
| `GET` | firewall | source\_nat | get\_rule | $uuid=null |
| `GET` | firewall | source\_nat | move\_rule\_before | $selected\_uuid,$target\_uuid |
| `GET,POST` | firewall | source\_nat | search\_rule |  |
| `POST` | firewall | source\_nat | set\_rule | $uuid |
| `POST` | firewall | source\_nat | toggle\_rule | $uuid,$enabled=null |
| `GET` | firewall | source\_nat | toggle\_rule\_log | $uuid,$log |

## Concept

The firewall plugin injects rules in the standard OPNsense firewall while maintaining visibility on them in the standard user interface.

We use our standard `ApiMutableModelControllerBase` to allow crud operations on rule entries and offer an `apply` action to activate the new configuration.

[![](<../images/55c9ef92-blockdiag-4bd7368142f10e24041da9f575b6b9.png>)](https://docs.opnsense.org/_images/blockdiag-4bd7368142f10e24041da9f575b6b9eec945ab23.png)

The diagram above contains the basic steps to change rules and activate them. Changes made through the administrative endpoints are staged in the configuration; calling `apply()` reloads the firewall so the new ruleset becomes active.

Note

The examples in this document disable certificate validation, make sure when using this in a production environment to remove the `verify=False` from the `requests` calls

## Administration example

Administrative endpoints are pretty standard use of `ApiMutableModelControllerBase`, the example below searches for a rule named “OPNsense\_fw\_api\_testrule\_1”, when not found one will be added otherwise it will print the internal uuid. Inline you will find a brief description of the steps performed.

administrative\_example.py

```bash
#!/usr/bin/env python3.7
import requests
import json

# key + secret from downloaded apikey.txt
api_key="3RhWOno+HwvtmT406I6zw8of8J6n9FOKlWK6U0B+K7stt/fDaJg7bjeF3QAshlScYqC+3o5THy3vQViW"
api_secret="uaBk27NKhQCZSDpfAlG6YJ473MzvsCNiED6kzbYuykzU05fCRkcJADhDm5nxbZt8yREC74ZpvD/vbcEx"

# define the basics, hostname to use and description used to identify our test rule
rule_description='OPNsense_fw_api_testrule_1'
remote_uri="https://192.168.1.1"

# search for rule
r = requests.get(
    "%s/api/firewall/filter/searchRule?current=1&rowCount=7&searchPhrase=%s" % (
        remote_uri, rule_description
    ),
    auth=(api_key, api_secret), verify=False
)

if r.status_code == 200:
    response = json.loads(r.text)
    if len(response['rows']) == 0:
        # create a new rule, identified by rule_description allowing traffic from
        # 192.168.0.0/24 to 10.0.0.0/24 using TCP protocol
        data = {"rule" :
                    {
                    "description": rule_description,
                    "source_net": "192.168.0.0/24",
                    "protocol": "TCP",
                    "destination_net": "10.0.0.0/24"
                    }
                }
        r = requests.post(
            "%s/api/firewall/filter/addRule" % remote_uri, auth=(api_key, api_secret), verify=False, json=data
        )
        if r.status_code == 200:
            print("created : %s" % json.loads(r.text)['uuid'])
        else:
            print("error : %s" % r.text)

    else:
        for row in response['rows']:
            print ("found uuid %s" % row['uuid'])
```

Tip

Since our model contains default values for most attributes, we only need to feed the changes if we would like to keep the defaults. In this case the TCP/IP version was IPv4 by default for example. In most cases one would like to set all relevant properties in case defaults change over time.

## Apply example

This example will disable the rule created in the previous example and apply the changes so they become active.

apply\_example.py

```bash
#!/usr/bin/env python3.7
import requests
import json

# key + secret from downloaded apikey.txt
api_key="3RhWOno+HwvtmT406I6zw8of8J6n9FOKlWK6U0B+K7stt/fDaJg7bjeF3QAshlScYqC+3o5THy3vQViW"
api_secret="uaBk27NKhQCZSDpfAlG6YJ473MzvsCNiED6kzbYuykzU05fCRkcJADhDm5nxbZt8yREC74ZpvD/vbcEx"

# define the basics, hostname to use and description used to identify our test rule
rule_description='OPNsense_fw_api_testrule_1'
remote_uri="https://192.168.1.1"

# search for rule
r = requests.get(
    "%s/api/firewall/filter/searchRule?current=1&rowCount=7&searchPhrase=%s" % (
        remote_uri, rule_description
    ),
    auth=(api_key, api_secret), verify=False
)

if r.status_code == 200:
    response = json.loads(r.text)
    if len(response['rows']) > 0:
        rule_uuid = response['rows'][0]['uuid']
        # disable rule
        r = requests.post("%s/api/firewall/filter/toggleRule/%s/0" % (remote_uri, rule_uuid),
                          auth=(api_key, api_secret), verify=False
        )
        # apply changes so they become active
        r = requests.post("%s/api/firewall/filter/apply" % remote_uri,
                          auth=(api_key, api_secret), verify=False
        )
        print("rule %s disabled and applied" % rule_uuid)
    else:
        print("rule %s not found" % rule_description)
```

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Dnsmasq](<275 Dnsmasq.md>)　｜　[下一篇：Firmware ➡](<277 Firmware.md>)
