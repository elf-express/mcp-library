---
title: "Usage example"
source: "https://docs.opnsense.org/development/frontend/models_example.html"
chapter: ["Development Manual","Frontend","Creating Models"]
order: 253
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:48.448Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Designing the model](<252 Designing the model.md>)　｜　[下一篇：Guidelines ➡](<254 Guidelines.md>)

# Usage example

> 章節：[Development Manual](<000 目錄.md#c-52>) › [Frontend](<000 目錄.md#c-55>) › [Creating Models](<000 目錄.md#c-56>)

Now let’s test our model using a small PHP script (in /usr/local/opnsense/mvc/script/ ):

```php
<?php
// initialize phalcon components for our script
require_once("load_phalcon.php");

// include myModel and the shared config component
use myVendorName\myModule\myModel;
use OPNsense\Core\Config;

// create a new model, reading the model definition and the current data from our config.xml
$myMdl = new myModel();
$myMdl->exampleNumber =1;
$myMdl->contacts->someText = "just a test";

// add a new contact node
$node = $myMdl->contacts->entity->add();
$node->email = "test@test.com";
$node->name = "my test user";

// perform validation on the data in our model
$validationMessages = $myMdl->performValidation();
foreach ($validationMessages as  $messsage) {
    echo "validation failure on field ". $messsage->getField()."  returning message : ". $messsage->getMessage()."\n";
}

// if validation succeeded, write data back to config
if ($validationMessages->count() == 0) {
    // serialize our model to the config file (config.xml)
    // (this raises an error on validation failures)
    $myMdl->serializeToConfig();
    $cnf = Config::getInstance();
    $cnf->save();
}
```

If you fill in an invalid value to one of the validated fields, you can easily try the validation. Try to input the text “X” into the field exampleNumber to try out.

When inspecting our config.xml file, you will notice the following content has been added to the root:

```xml
<myManufacturer>
  <myModule>
    <exampleNumber>1</exampleNumber>
    <contacts>
      <entity>
        <email>test@test.com</email>
        <name>my test user</name>
      </entity>
      <someText>just a test</someText>
    </contacts>
  </myModule>
</myManufacturer>
```

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Designing the model](<252 Designing the model.md>)　｜　[下一篇：Guidelines ➡](<254 Guidelines.md>)
