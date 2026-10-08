---
title: "Trusted Interpreter"
source: https://stalw.art/docs/sieve/interpreter/trusted/
---

# Trusted Interpreter

> Section: Sieve scripting › Settings

The trusted interpreter runs Sieve scripts invoked by the SMTP server. These scripts are created by the system administrator and are considered privileged. Stalwart compiles all defined Sieve scripts at start-up and executes them on demand through the Sieve runtime.

## Configuration

Interpreter settings and resource limits are configured on the [SieveSystemInterpreter](https://stalw.art/docs/ref/object/sieve-system-interpreter) singleton (found in the WebUI under <!-- breadcrumb:SieveSystemInterpreter --> Settings › Sieve › System Interpreter<!-- /breadcrumb:SieveSystemInterpreter -->). The main fields are:

- [`defaultFromName`](https://stalw.art/docs/ref/object/sieve-system-interpreter#defaultfromname): default name used in the `From` header of email notifications sent from a Sieve script. Default `"'Automated Message'"`.
- [`defaultFromAddress`](https://stalw.art/docs/ref/object/sieve-system-interpreter#defaultfromaddress): default address used in the `From` header of email notifications sent from a Sieve script. Default `"'MAILER-DAEMON@' + system('domain')"`.
- [`defaultReturnPath`](https://stalw.art/docs/ref/object/sieve-system-interpreter#defaultreturnpath): default return path applied to email notifications sent from a Sieve script.
- [`dkimSignDomain`](https://stalw.art/docs/ref/object/sieve-system-interpreter#dkimsigndomain): domain whose DKIM signatures are applied to email notifications sent from a Sieve script. Default `"system('domain')"`.
- [`messageIdHostname`](https://stalw.art/docs/ref/object/sieve-system-interpreter#messageidhostname): local hostname used when generating the `Message-Id` header. When unset, the server hostname is used.
- [`noCapabilityCheck`](https://stalw.art/docs/ref/object/sieve-system-interpreter#nocapabilitycheck): when `true`, language extensions can be used without being declared through a `require` statement. Default `true`.

The [`dkimSignDomain`](https://stalw.art/docs/ref/object/sieve-system-interpreter#dkimsigndomain) expression resolves to a single domain name; all DKIM signatures associated with that domain are then applied to outgoing notifications. A domain can have one or multiple DKIM signatures associated through its [DkimSignature](https://stalw.art/docs/ref/object/dkim-signature) records.

### Limits

Resource limits protect the server from scripts that exceed reasonable bounds. The relevant fields on SieveSystemInterpreter are:

- [`maxRedirects`](https://stalw.art/docs/ref/object/sieve-system-interpreter#maxredirects): maximum number of `redirect` commands per script. Default `3`.
- [`maxOutMessages`](https://stalw.art/docs/ref/object/sieve-system-interpreter#maxoutmessages): maximum number of outgoing messages a script may send. Default `5`.
- [`maxReceivedHeaders`](https://stalw.art/docs/ref/object/sieve-system-interpreter#maxreceivedheaders): maximum number of `Received` headers allowed in a message. Default `50`.
- [`maxCpuCycles`](https://stalw.art/docs/ref/object/sieve-system-interpreter#maxcpucycles): maximum number of instructions a script can execute. Default `1048576`.
- [`maxNestedIncludes`](https://stalw.art/docs/ref/object/sieve-system-interpreter#maxnestedincludes): maximum number of nested `include` instructions. Default `5`.
- [`duplicateExpiry`](https://stalw.art/docs/ref/object/sieve-system-interpreter#duplicateexpiry): default expiration time for identifiers stored by the `duplicate` extension, in milliseconds. Default `604800000` (7 days).
- [`maxVarSize`](https://stalw.art/docs/ref/object/sieve-system-interpreter#maxvarsize): maximum size of a variable, in bytes. Default `52428800`.

### Example

```json
{
  "defaultFromName": {"else": "'Automated Message'"},
  "defaultFromAddress": {"else": "'no-reply@example.org'"},
  "defaultReturnPath": {"else": "''"},
  "messageIdHostname": "mx.example.org",
  "dkimSignDomain": {"else": "system('domain')"},
  "maxRedirects": 3,
  "maxOutMessages": 5,
  "maxReceivedHeaders": 50,
  "maxCpuCycles": 10000,
  "maxNestedIncludes": 5,
  "duplicateExpiry": 604800000
}
```

## Scripts

Trusted Sieve scripts are stored as [SieveSystemScript](https://stalw.art/docs/ref/object/sieve-system-script) records (found in the WebUI under <!-- breadcrumb:SieveSystemScript --> Settings › Sieve › System Scripts<!-- /breadcrumb:SieveSystemScript -->). Each record carries a [`name`](https://stalw.art/docs/ref/object/sieve-system-script#name), an optional [`description`](https://stalw.art/docs/ref/object/sieve-system-script#description), an [`isActive`](https://stalw.art/docs/ref/object/sieve-system-script#isactive) flag, and the script body in [`contents`](https://stalw.art/docs/ref/object/sieve-system-script#contents).

A trusted script is invoked from an SMTP stage by setting the stage's `script` expression to the script's name. For example, the `script` field on [MtaStageRcpt](https://stalw.art/docs/ref/object/mta-stage-rcpt), [MtaStageEhlo](https://stalw.art/docs/ref/object/mta-stage-ehlo), or [MtaStageData](https://stalw.art/docs/ref/object/mta-stage-data). Trusted scripts can also import each other using the `include` command.

For example, a system script that rejects messages from blocklisted HELO domains:

```json
{
  "name": "script_one",
  "description": "Reject blocklisted HELO domains",
  "isActive": true,
  "contents": "require [\"variables\", \"extlists\", \"reject\"];\n\nif string :list \"${env.helo_domain}\" \"list/blocked-domains\" {\n    reject \"551 5.1.1 Your domain '${env.helo_domain}' has been blocklisted.\";\n}\n"
}
```

The [`contents`](https://stalw.art/docs/ref/object/sieve-system-script#contents) field holds the full script text; loading the script body from an external file is not supported.
