---
title: "MIME types"
source: https://stalw.art/docs/spamfilter/settings/mime-types/
---

# MIME types

> Section: Spam & Phishing filter › Settings

File-extension classification lets the spam filter react to message attachments in an informed way, based on the expected MIME type of each extension and a small set of flags. Each classification is stored as a [SpamFileExtension](https://stalw.art/docs/ref/object/spam-file-extension) object (found in the WebUI under <!-- breadcrumb:SpamFileExtension --> Settings › Spam Filter › Lists › File Extensions<!-- /breadcrumb:SpamFileExtension -->).

## Fields

Each SpamFileExtension instance carries:

- [`extension`](https://stalw.art/docs/ref/object/spam-file-extension#extension): the file-name extension this entry applies to, without the leading dot.
- [`contentTypes`](https://stalw.art/docs/ref/object/spam-file-extension#contenttypes): the set of MIME types that are expected for this extension. Leaving the set empty means no MIME type is required.
- [`isBad`](https://stalw.art/docs/ref/object/spam-file-extension#isbad): marks the extension as risky or malicious. Messages carrying an attachment whose extension is flagged as bad receive an increased spam score.
- [`isArchive`](https://stalw.art/docs/ref/object/spam-file-extension#isarchive): marks the extension as an archive format (such as `zip` or `rar`). The filter can then apply archive-specific logic, for example inspecting the archive contents or penalising nested archives.
- [`isNz`](https://stalw.art/docs/ref/object/spam-file-extension#isnz): marks the extension as "not in archive": a file with this extension should not appear inside another archive. If the filter finds such a file nested inside an archive, the spam score is adjusted accordingly.

The filter uses these flags to apply rule-based scoring. For example, finding an archive (`isArchive = true`) inside another archive increases the spam score, since nested archives are a common tactic for hiding malicious content.

## Examples

PDF files are expected to carry a PDF MIME type and should not appear inside archives:

```json
{
  "extension": "pdf",
  "contentTypes": {"application/pdf": true, "application/x-pdf": true},
  "isArchive": false,
  "isBad": false,
  "isNz": true
}
```

HTML files carried as attachments are treated as risky:

```json
{
  "extension": "htm",
  "contentTypes": {"text/html": true},
  "isArchive": false,
  "isBad": true,
  "isNz": false
}
```

Batch files are considered malicious regardless of the declared MIME type:

```json
{
  "extension": "bat",
  "contentTypes": {},
  "isArchive": false,
  "isBad": true,
  "isNz": false
}
```

RAR files are archives:

```json
{
  "extension": "rar",
  "contentTypes": {},
  "isArchive": true,
  "isBad": false,
  "isNz": false
}
```
