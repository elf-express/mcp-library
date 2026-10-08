---
title: "Search store"
source: https://stalw.art/docs/storage/fts/
---

# Search store

> Section: Storage settings

Full-text search (FTS) indexes message bodies, attachments, contacts, and calendar events so that search queries return quickly across large mailboxes. The backend used for full-text indexing is configured independently from the data store, allowing the search engine to be chosen to match query volume, language requirements, and operational constraints.

Backend selection is made on the [SearchStore](https://stalw.art/docs/ref/object/search-store) singleton (found in the WebUI under <!-- breadcrumb:SearchStore --> Settings › Storage › Search Store<!-- /breadcrumb:SearchStore -->). The object is a multi-variant type. The supported variants are:

- [ElasticSearch](https://stalw.art/docs/storage/backends/elasticsearch): a distributed, RESTful search engine.
- [Meilisearch](https://stalw.art/docs/storage/backends/meilisearch): a fast, relevance-focused search engine with minimal configuration.
- The `Default` variant, which uses the configured data store as the full-text index. Supported for all data store variants, it stores indexes directly in the database using bloom filters.
- FoundationDB, PostgreSQL, and MySQL may also be selected as dedicated search backends when their indexing characteristics are preferred.

## Choosing a search store

The internal (data-store-backed) full-text index offers several advantages:

- **Privacy**: indexes are kept in the database using bloom filters, a space-efficient probabilistic data structure that allows membership testing without exposing indexed tokens directly. While bloom filters do not encrypt data, they obscure individual terms.
- **Automatic multi-language support**: message language is detected before indexing, and a language-appropriate analyser is applied.
- **Simplicity**: no additional services are required.

External engines offer their own strengths:

- **Advanced text analysis and relevance scoring**: synonyms, custom analysers, and sophisticated ranking algorithms.
- **Ranking and sorting flexibility**: more control over how results are ordered, combining text relevance with structured fields.
- **Storage efficiency**: purpose-built index structures designed for full-text search.

:::tip[Encryption and full-text search]

When [encryption at rest](https://stalw.art/docs/encryption/) is enabled, only message headers are stored in the full-text index.

:::

### Limitations

Every FTS backend involves trade-offs. No single engine is optimal for every deployment; each backend makes design choices that affect scalability, accuracy, resource usage, and query expressiveness. Administrators should consider these in the context of expected mail volume, query patterns, and operational constraints.

The following table summarises the primary limitations of each supported engine:

| Full Text Search Engine | Key Limitations                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| Elasticsearch           | Memory intensive and Java based, which can increase operational complexity and resource usage. |
| Meilisearch             | Single-node architecture and [limited support](https://stalw.art/docs/storage/backends/meilisearch#limitations) for complex, deeply nested query expressions.     |
| PostgreSQL              | Maximum indexable email content size of approximately [650 KB per message](https://stalw.art/docs/storage/backends/postgresql#fts-limitations).                      |
| MySQL                   | [No stemming support](https://stalw.art/docs/storage/backends/mysql#fts-limitations) and no support for indexing multiple languages within the same column.     |
| Internal FTS            | Higher write amplification compared to external full text search backends.                     |

These limitations are not defects but consequences of architectural choices. If search accuracy, language support, scalability, or operational simplicity is a critical requirement, evaluating multiple backends may be necessary.

## Configuration

To change the search backend, update the SearchStore singleton and select the appropriate variant. Variant-specific fields such as [`url`](https://stalw.art/docs/ref/object/search-store#url), [`httpAuth`](https://stalw.art/docs/ref/object/search-store#httpauth), [`numShards`](https://stalw.art/docs/ref/object/search-store#numshards), and [`numReplicas`](https://stalw.art/docs/ref/object/search-store#numreplicas) apply to the ElasticSearch variant; [`url`](https://stalw.art/docs/ref/object/search-store#url), [`pollInterval`](https://stalw.art/docs/ref/object/search-store#pollinterval), and [`maxRetries`](https://stalw.art/docs/ref/object/search-store#maxretries) apply to the Meilisearch variant. See the [SearchStore reference](https://stalw.art/docs/ref/object/search-store) for the full field list per variant.

### Index configuration

Which entities are indexed, and which of their fields, is controlled through the [Search](https://stalw.art/docs/ref/object/search) object (found in the WebUI under <!-- breadcrumb:Search --> Settings › Search<!-- /breadcrumb:Search -->). Indexing for each entity type can be enabled or disabled independently through [`indexEmail`](https://stalw.art/docs/ref/object/search#indexemail), [`indexContacts`](https://stalw.art/docs/ref/object/search#indexcontacts), [`indexCalendar`](https://stalw.art/docs/ref/object/search#indexcalendar), and [`indexTelemetry`](https://stalw.art/docs/ref/object/search#indextelemetry).

The fields indexed per entity are controlled through [`indexEmailFields`](https://stalw.art/docs/ref/object/search#indexemailfields), [`indexContactFields`](https://stalw.art/docs/ref/object/search#indexcontactfields), [`indexCalendarFields`](https://stalw.art/docs/ref/object/search#indexcalendarfields), and [`indexTracingFields`](https://stalw.art/docs/ref/object/search#indextracingfields). Each accepts a list of field names; if the list is empty, all supported fields for that entity are registered.

### Default language

When language detection fails (for example, when the text is too short or ambiguous), the server falls back to the language configured in [`defaultLanguage`](https://stalw.art/docs/ref/object/search#defaultlanguage) on the Search object. The default is `"en_US"`. The set of languages considered by the detector can be restricted through [`supportedLanguages`](https://stalw.art/docs/ref/object/search#supportedlanguages).
