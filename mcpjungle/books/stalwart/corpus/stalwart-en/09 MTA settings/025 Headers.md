---
title: "Headers"
source: https://stalw.art/docs/mta/rewrite/headers/
---

# Headers

> Section: MTA settings › Rewriting

Message header rewriting involves the process of adding, removing, or modifying the headers of an email message. Headers are crucial parts of an email, as they contain meta-information about the email, such as the sender, recipient, subject, and other technical details, including those required for proper routing and delivery.

There are various reasons why header rewriting might be useful:

- **Obfuscating internal details:** Internal server names, IP addresses, or other specifics could be present in the headers. Removing or modifying these helps keep internal infrastructure private and improves the security posture.
- **Compliance and regulatory reasons:** Certain industries or legal environments require specific information to be present in email headers. By adding or modifying headers, an organization can ensure it meets these requirements.
- **Message enhancement and organization:** Headers can be added to include additional information about the email, such as categorization information, which can be used by email clients to sort or filter messages.
- **Troubleshooting and Monitoring:** By adding custom headers, it's possible to track the path an email took through the system, which can be invaluable for troubleshooting delivery issues or monitoring system performance.

Headers can be modified using [Sieve scripts](https://stalw.art/docs/sieve/), which is a language designed for filtering email messages. A Sieve script containing the specific add, delete, or alter commands is defined as a [SieveSystemScript](https://stalw.art/docs/ref/object/sieve-system-script) object and referenced from the [`script`](https://stalw.art/docs/ref/object/mta-stage-data#script) field on the [MtaStageData](https://stalw.art/docs/ref/object/mta-stage-data) singleton (found in the WebUI under <!-- breadcrumb:MtaStageData --> Settings › MTA › Session › DATA Stage<!-- /breadcrumb:MtaStageData -->); see the [DATA stage](https://stalw.art/docs/mta/inbound/data#sieve) documentation.

The Sieve language has a rich set of commands for precise header manipulation. The `addheader` action adds a new header, `deleteheader` removes a header, and combining the two effectively replaces a header's value. Modifications can be applied conditionally based on attributes such as sender, recipient, subject line, or any other header.

## Examples

### Adding Headers

The `addheader` command is used to add a new header to the email. Below is an example Sieve script that adds a "X-Custom-Header" with a value "Custom Value":

```sieve
require ["editheader"];
addheader "X-Custom-Header" "Custom Value";
```

<!-- sievepad -->
<p><a href="https://sievepad.com/#w=NY4xDsIwDAC_EnluB9YwIZbuSAip6WA1VonUpBA7MESVeBfP4SWklI539snO8AC9qyCgJ9BwEhyfGEXZqWetGkJLkdXn9VYHa10YNgUVcB_dTRh0m7fcowvLZEqxXzjSPblIqjVA1sn11xro9iagtSsqA5f6mFgmXzf_heJWo844JjJQApi7Cjwx40DL0UJMIuWnQnmevw" target="_blank" rel="noopener">Try this script in Sievepad</a></p>
<!-- /sievepad -->

### Deleting Headers

The `deleteheader` command is used to remove a header from the email. In the following example, any existing "X-Custom-Header" is removed:

```sieve
require ["editheader"];
deleteheader "X-Custom-Header";
```

<!-- sievepad
From: Alice <alice@example.com>
To: Jane Doe <jane@example.org>
Subject: Header rewriting
X-Custom-Header: Custom Value

This message carries an X-Custom-Header field.
-->
<p><a href="https://sievepad.com/#w=XVDNSgMxEH6VYc67C16jiGKR4rUiQtPDmB3blPzUJGuFZcHn8nF8EhN3t2hPk5l8fzM9vqO4qNCRZRS4SmSOFBK0XkUBS6aWQ4Tvzy9YsOGk3XYeYoVRBX1IEcW6nwUsaVd-fBdU6QO_dTowrCVyq9PulytxcyldWwR5nIDE5_qui8nbejlhMgSHTYWWY6Qt_7MZWXXgY9AlVMPW_LW9D94KuDVaMVxRKTf8QfZguFHeXkv36AU8kGNY-IzY59cJ4MM2A1bdy55Vmm8AJyvpzpIKGFt4ItOxdFl8pyNMsUFRCJojkIMzIrxqNm0zrRk5Ffm8Zj8MPw" target="_blank" rel="noopener">Try this script in Sievepad</a></p>
<!-- /sievepad -->

### Replacing headers

Sieve does not have a built-in replace command to modify a header. The `deleteheader` command removes the old header and the `addheader` command adds a new header with the updated value. The following example replaces the value of "X-Custom-Header":

```sieve
require ["editheader", "variables"];
if header :matches "X-Custom-Header" "*" {
    set "oldValue" "${1}";
    deleteheader "X-Custom-Header";
    addheader "X-Custom-Header" "New Value";
}
```

<!-- sievepad
From: Alice <alice@example.com>
To: Jane Doe <jane@example.org>
Subject: Header rewriting
X-Custom-Header: Custom Value

This message carries an X-Custom-Header field.
-->
<p><a href="https://sievepad.com/#w=dVHLSkMxEP2VIbiS20K3qYiiSHHhwooITRfTZNqm5FGT3Fa4XPC7_By_xFxvWrRoFnmcOXNm5qRhO8ZHFXNoiXE2TWj2GBIoLyOHCaGiEOHz_QMeaWtQareCdY-yikUZ9DZFxmfNQcGidl3E10F270CvtQ4EM8FI6dTnClaBYDsMGheGomDzsXB6WZSBW0xyTTFzXgY3dUzeDiYlMWPneW-Eg7wipQx4o57R1PQdPWtGrWDjPq7IUKIi-4daoaFS_3My9kB7KBVyRisca-cVsxQjrujX-L3MINA-6JTNGpI1P-24C95yuDZaElxgd1zRG9qtoaH09lK4J8_hHh3Brc-MTb4dCT6sMmFaLzYk0-Fz4FhKuJPWOfTP0rrL4msdobQNEkPQ2WR0cJIIS01GDcuY2eNOPo_ZtO0X" target="_blank" rel="noopener">Try this script in Sievepad</a></p>
<!-- /sievepad -->

In this script, the original value of "X-Custom-Header" is first stored in the variable "oldValue". Then, the header is removed and a new header with the same name but a new value "New Value" is added.
