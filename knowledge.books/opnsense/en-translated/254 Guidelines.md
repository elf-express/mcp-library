---
title: "Guidelines"
source: "https://docs.opnsense.org/development/frontend/models_guidelines.html"
chapter: ["Development Manual","Frontend","Creating Models"]
order: 254
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:33:51.002Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Usage example](<253 Usage example.md>)　｜　[下一篇：Custom (app specific) field types ➡](<255 Custom (app specific) field types.md>)

# Guidelines

> 章節：[Development Manual](<000 目錄.md#c-52>) › [Frontend](<000 目錄.md#c-55>) › [Creating Models](<000 目錄.md#c-56>)

Some (simple) guidelines developing models

1.  One model should always be completely responsible for the its mount point, so if there’s a model at mount point /A/B there can’t be a model at /A/B/C
    
2.  Try to keep models logical and understandable, it’s better to build two models for you application if the content of two parts aren’t related to each other. It’s no issue to create models at deeper levels of the structure.
    
    1.  When using more models in a application/module, you might want to consider the following naming convention: /Vendor/Module/Model
        
3.  Try to avoid more disc i/o actions than necessary, only call save() if you actually want to save content, serializeToConfig just keeps the data in memory.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Usage example](<253 Usage example.md>)　｜　[下一篇：Custom (app specific) field types ➡](<255 Custom (app specific) field types.md>)
