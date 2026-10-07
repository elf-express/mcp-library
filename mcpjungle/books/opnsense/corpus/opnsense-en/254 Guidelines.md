---
title: "Guidelines"
source: https://docs.opnsense.org/development/frontend/models_guidelines.html
chapter: ["Development Manual","Frontend","Creating Models"]
order: 254
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:51.002Z"
---


# Guidelines


Some (simple) guidelines developing models

1.  One model should always be completely responsible for the its mount point, so if there’s a model at mount point /A/B there can’t be a model at /A/B/C
    
2.  Try to keep models logical and understandable, it’s better to build two models for you application if the content of two parts aren’t related to each other. It’s no issue to create models at deeper levels of the structure.
    
    1.  When using more models in a application/module, you might want to consider the following naming convention: /Vendor/Module/Model
        
3.  Try to avoid more disc i/o actions than necessary, only call save() if you actually want to save content, serializeToConfig just keeps the data in memory.

---

