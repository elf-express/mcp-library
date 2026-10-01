---
title: "Diagnostics"
source: "https://docs.opnsense.org/manual/diagnostics_system.html"
chapter: ["System"]
order: 102
lang: "en"
translated_by: "native"
captured: "2026-09-26T11:32:32.958Z"
---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Log Files](<101 Log Files.md>)　｜　[下一篇：Configure 2FA TOTP & Google Authenticator ➡](<103 Configure 2FA TOTP & Google Authenticator.md>)

# Diagnostics

> 章節：[System](<000 目錄.md#c-11>)

## Activity

The activity module shows current active processes and their details, you can search within the list of activities, fetch general information (like load averages, number of processes, etc.) using the info button in the footer of the grid.

---

|   |   |
| --- | --- |
| PID | The process id of this process |
| USERNAME | Username executed this process |
| PRI | Current priority of the process |
| NICE | NICE is the [nice](https://en.wikipedia.org/wiki/Nice_\(Unix\)) amount (in the range -20 to 20) |
| SIZE | Total size of the process (text, data, and stack) |
| RES | Current amount of resident memory, RAM currently in use by the process |
| C | is the processor number on which the process is executing (visible only on SMP systems) |
| TIME | The number of system and user cpu seconds that the process has used |
| WCPU | Weighted cpu percentage |
| COMMAND | Command string |

## Services

The services page shows the configured services and status, you can stop/start/restart all of them here.

---

[⬆ 目錄](<000 目錄.md>)　｜　[⬅ 上一篇：Log Files](<101 Log Files.md>)　｜　[下一篇：Configure 2FA TOTP & Google Authenticator ➡](<103 Configure 2FA TOTP & Google Authenticator.md>)
