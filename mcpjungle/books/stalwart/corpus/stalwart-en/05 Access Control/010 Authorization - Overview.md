---
title: "Overview"
source: https://stalw.art/docs/auth/authorization/
---

# Authorization - Overview

> Section: Access Control › Authorization

Authorization determines what actions an authenticated user or entity may perform within the server. Where [authentication](https://stalw.art/docs/auth/authentication/) establishes identity, authorization controls what that identity is allowed to do once verified.

Stalwart supports fine-grained access control. [Permissions](https://stalw.art/docs/auth/authorization/permissions) can be assigned at several levels: directly to [individuals](https://stalw.art/docs/auth/principals/individual) or [groups](https://stalw.art/docs/auth/principals/group), through [roles](https://stalw.art/docs/auth/authorization/roles), or at the [tenant](https://stalw.art/docs/auth/authorization/tenants) level for multi-tenant deployments. The combination of these layers determines the effective permissions of a given principal.

The sections that follow cover the available permission types and how they are configured to match a deployment's access policy.
