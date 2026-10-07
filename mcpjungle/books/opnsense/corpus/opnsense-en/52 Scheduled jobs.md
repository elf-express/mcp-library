---
title: "Scheduled jobs"
source: https://docs.opnsense.org/vendor/deciso/scheduled_jobs.html
chapter: ["Business Edition"]
order: 52
lang: "en"
translated_by: "original"
captured: "2026-09-26T11:32:06.741Z"
---

# Scheduled jobs

Similar to the [cron](<98 Settings.md#cron>) service, scheduled jobs can execute certain predefined commands. The difference is cron is used for periodic schedules, jobs handles one time planned events.

This feature is practical to plan automatic updates during maintenance slots or to shutdown the system if we know electrical engineers are going to cut the power at a specific time.

A list of example commands can be found at the cron section of the manual.

| **Fieldname** | **Purpose** |
| --- | --- |
| Time | Date and time the action should be performed |
| Until (s) | When scheduled, counts down to the moment of execution |
| Command | Configd command to execute |
| Parameters | Optional parameters |
| Description | Description to use for the job. |