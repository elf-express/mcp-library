---
title: "Creating Models"
source: "https://docs.opnsense.org/development/frontend/models.html"
chapter: ["Development Manual","Frontend","Creating Models"]
order: 251
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:48.953Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Frontend](<250 Frontend.md>)　｜　[下一篇：Designing the model ➡](<252 Designing the model.md>)

# Creating Models

> 章節：[Development Manual](<000 目錄.md#c-52>) › [Frontend](<000 目錄.md#c-55>) › [Creating Models](<000 目錄.md#c-56>)

A model represents the data which the application will use and takes care of the interaction to that data. In OPNsense most of the relevant data is physically stored in an XML structure (config.xml). The primary goal for OPNsense models is to structure the use of configuration data, by creating a clear abstraction layer.

In this chapter we will explain how models are designed and build.

-   [Designing the model](<252 Designing the model.md>)
-   [Special model types](<252 Designing the model.md#special-model-types>)
-   [Cached data](<252 Designing the model.md#cached-data>)
-   [Usage example](<253 Usage example.md>)
-   [Guidelines](<254 Guidelines.md>)
-   [Custom (app specific) field types](<255 Custom (app specific) field types.md>)
-   [Adding constraints](<256 Adding constraints.md>)
-   [Migrations](<257 Migrations.md>)

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Frontend](<250 Frontend.md>)　｜　[下一篇：Designing the model ➡](<252 Designing the model.md>)
