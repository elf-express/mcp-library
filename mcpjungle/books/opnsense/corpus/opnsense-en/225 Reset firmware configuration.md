---
title: "Reset firmware configuration"
source: https://docs.opnsense.org/troubleshooting/reset_firmware.html
chapter: ["Troubleshooting","Topics"]
order: 225
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:33:34.321Z"
---

# Reset firmware configuration

In cases where the firmware configuration is corrupt in the `config.xml` file, we can reset that section of our configuration using the following command (executed on a console or via SSH):

```
pluginctl -f system.firmware
```

Which shows the current data stored and asks for removal, choose `Y` here to drop that part and circle back to the System ‣ Firmware section to store the configuration again.

Note

If our factory left a cache file which keeps a “factory-” plugin visible at all times, you can safely remove the reference using the following command:

`rm /usr/local/opnsense/version/factory-*`