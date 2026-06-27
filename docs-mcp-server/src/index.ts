#!/usr/bin/env node
/**
 * Docs MCP Server — 多語料文檔查詢(single server, many corpora)
 *
 * 工具(皆唯讀,語料是「參數」不是「新工具」,故工具數恆為 4):
 *   - docs_list_corpora  列出有哪些語料(探索入口)
 *   - docs_search        關鍵字搜尋;corpus 省略 = 跨所有語料
 *   - docs_read          依語料 + 檔名讀整篇
 *   - docs_cheatsheet    抽某篇的「速查表」段落(語料需啟用 cheatsheet capability)
 *
 * Transports:stdio(預設)或 http(TRANSPORT=http,Streamable HTTP)。
 * 端點(http):/mcp 全語料、/mcp/<corpus> 鎖定單一書(模型 B)。
 * stdio 下可用 DOCS_SCOPE=<corpus> 鎖定單一書(供 Claude Desktop 每書一條設定)。
 * 語料目錄:DOCS_CORPORA_DIR -> 打包的 corpora/ -> server 根上一層。
 * Auth(http):設 MCP_AUTH_TOKEN 後 /mcp* 需帶 "Authorization: Bearer <token>"。
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { runHttp } from "./http.js";
import {
  discoverCorpora,
  getCorpus,
  corpusIdList,
  corporaCount,
  totalDocCount,
  doListCorpora,
  doSearch,
  doRead,
  doCheatsheet,
  doOutline,
  doCodeSearch,
  doCodeRead,
  doSymbol,
} from "./corpus.js";

// ---------------------------------------------------------------------------
// zod schemas
// corpus 為 z.string()(非寫死 enum,因為語料是動態資料);未知語料於 runtime 友善提示。
// ---------------------------------------------------------------------------

const ListCorporaInputSchema = z
  .object({
    filter: z.string().max(100).optional().describe("選填:只列出 id 或標題包含此字串的語料(不分大小寫)"),
  })
  .strict();

const SearchInputSchema = z
  .object({
    corpus: z.string().max(100).optional()
      .describe("語料 id(用 docs_list_corpora 取得)。省略則跨所有語料搜尋。"),
    query: z.string().min(1, "查詢字串不可為空").max(200, "查詢字串不可超過 200 字元")
      .describe("關鍵字,以空白分隔可指定多個關鍵字 (AND,需全部出現於同一篇文件)"),
    limit: z.number().int().min(1).max(50).default(15).describe("最多回傳幾篇命中的文件 (預設 15)"),
    context_lines: z.number().int().min(0).max(5).default(1).describe("每個命中片段前後附帶的上下文行數 (預設 1)"),
  })
  .strict();

const ReadInputSchema = z
  .object({
    corpus: z.string().max(100).optional()
      .describe("語料 id(用 docs_list_corpora 取得)。單書端點 /mcp/<corpus> 或 DOCS_SCOPE 下可省略。"),
    filename: z.string().min(1, "filename 不可為空").max(300)
      .describe('文件檔名或相對路徑,可省略 .md。支援模糊比對 (結尾 / 包含)。例如 "structure" 或 "開發文檔/structure.md"'),
  })
  .strict();

const CheatsheetInputSchema = z
  .object({
    corpus: z.string().max(100).optional()
      .describe("語料 id(用 docs_list_corpora 取得)。單書端點或 DOCS_SCOPE 下可省略。"),
    filename: z.string().min(1, "filename 不可為空").max(300)
      .describe('文件檔名或相對路徑,.md 可省略,支援模糊比對。'),
  })
  .strict();

const OutlineInputSchema = z
  .object({
    corpus: z.string().max(100).optional()
      .describe("語料 id(用 docs_list_corpora 取得)。單書端點 /mcp/<corpus> 或 DOCS_SCOPE 下可省略。"),
    path: z.string().max(200).optional()
      .describe("只展開某個頂層分類(如 \"開發文檔\")。省略則列全部分類。"),
    headings: z.boolean().default(false)
      .describe("true 才展開每篇的 ##/### 標題(會讀全部檔案、較重)。預設 false。"),
  })
  .strict();

const READ_ONLY = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

function textResult(text: string) {
  return { content: [{ type: "text" as const, text }] };
}

/** 缺少 corpus 時的統一提示(非 scoped 端點下,read/cheatsheet 需要 corpus) */
function needCorpus(): string {
  return `請指定 corpus(用 docs_list_corpora 查看可用語料:${corpusIdList()}),或改用單書端點 /mcp/<corpus>。`;
}

/**
 * 建立 server。scope 給定(來自 /mcp/<corpus> 或 DOCS_SCOPE)時,
 * 所有工具自動鎖定該語料,corpus 參數被忽略。
 */
function createServer(scope?: string): McpServer {
  const name = scope ? `docs-mcp-server[${scope}]` : "docs-mcp-server";
  const server = new McpServer({ name, version: "1.0.0" });

  const scopeNote = scope
    ? `\n\n注意:本連線已鎖定語料 "${scope}",corpus 參數可省略(填了也以 "${scope}" 為準)。`
    : "";

  server.registerTool(
    "docs_list_corpora",
    {
      title: "列出可用語料",
      description:
        "列出本 server 提供哪些文檔語料(corpus),含每個語料的 id、標題、一句描述與文件數。\n\n" +
        "用途:這是探索入口。要查任何文檔前,先用此工具知道有哪些「書」可查,再用 docs_search 指定 corpus 搜尋。\n\n" +
        "參數:\n  - filter (string,選填):只列出 id/標題包含此字串的語料。" +
        scopeNote,
      inputSchema: ListCorporaInputSchema.shape,
      annotations: READ_ONLY,
    },
    async (p) =>
      textResult(scope ? doListCorpora({ onlyId: scope }) : doListCorpora({ filter: p.filter }))
  );

  server.registerTool(
    "docs_search",
    {
      title: "搜尋文檔",
      description:
        "對指定語料做關鍵字全文搜尋,回傳命中的檔名與片段。\n\n" +
        "用途:當你需要知道「某套技術怎麼做某件事」時,先(用 docs_list_corpora)確認語料 id,再用此工具在該語料搜尋。\n\n" +
        "參數:\n" +
        "  - corpus (string,選填):語料 id。省略則跨所有語料搜尋(結果以 [id] 標註來源)。\n" +
        "  - query (string):關鍵字,空白分隔多個關鍵字時全部出現才命中 (AND)。\n" +
        "  - limit (number):最多回傳幾篇,1-50,預設 15。\n" +
        "  - context_lines (number):片段上下文行數,0-5,預設 1。\n\n" +
        "回傳:Markdown,依命中次數排序,列出 [語料] 檔名、命中次數與含關鍵字片段 (附行號)。" +
        scopeNote,
      inputSchema: SearchInputSchema.shape,
      annotations: READ_ONLY,
    },
    async (p) => textResult(doSearch(scope ?? p.corpus, p.query, p.limit, p.context_lines))
  );

  server.registerTool(
    "docs_read",
    {
      title: "讀取文檔全文",
      description:
        "依語料 + 檔名回傳一篇文件的完整 markdown 內容(附官方來源連結)。\n\n" +
        "參數:\n" +
        "  - corpus (string):語料 id(用 docs_list_corpora 取得)。\n" +
        "  - filename (string):檔名或相對路徑,.md 可省略,支援模糊比對。\n\n" +
        "回傳:該文件完整內容。多筆符合時回傳候選清單;無符合時回傳提示。" +
        scopeNote,
      inputSchema: ReadInputSchema.shape,
      annotations: READ_ONLY,
    },
    async (p) => {
      const corpus = scope ?? p.corpus;
      if (!corpus || !corpus.trim()) return textResult(needCorpus());
      return textResult(doRead(corpus, p.filename));
    }
  );

  server.registerTool(
    "docs_cheatsheet",
    {
      title: "查詢文檔速查表",
      description:
        "只回傳某篇文件的「速查表」段落 (語法對照表),比讀全文更精簡。\n\n" +
        "僅對啟用 cheatsheet capability 的語料有效;未啟用時會提示改用 docs_read。\n\n" +
        "參數:\n" +
        "  - corpus (string):語料 id。\n" +
        "  - filename (string):檔名或相對路徑,.md 可省略,支援模糊比對。" +
        scopeNote,
      inputSchema: CheatsheetInputSchema.shape,
      annotations: READ_ONLY,
    },
    async (p) => {
      const corpus = scope ?? p.corpus;
      if (!corpus || !corpus.trim()) return textResult(needCorpus());
      return textResult(doCheatsheet(corpus, p.filename));
    }
  );

  const CodeSearchInputSchema = z
    .object({
      corpus: z.string().max(100).optional().describe("語料 id。單書端點/DOCS_SCOPE 下可省。"),
      query: z.string().max(200).default("").describe("關鍵字(空白分隔為 AND)。留空 = 列出有哪些範例檔。"),
      limit: z.number().int().min(1).max(30).default(10).describe("最多回傳幾檔(預設 10)"),
      context_lines: z.number().int().min(0).max(6).default(2).describe("片段上下文行數(預設 2)"),
    })
    .strict();

  const CodeReadInputSchema = z
    .object({
      corpus: z.string().max(100).optional().describe("語料 id。單書端點/DOCS_SCOPE 下可省。"),
      path: z.string().min(1).max(300).describe("源碼檔路徑或檔名(結尾/包含模糊比對)。"),
    })
    .strict();

  server.registerTool(
    "docs_code_search",
    {
      title: "搜尋範例源碼",
      description:
        "在某語料附帶的程式碼範例中搜尋(query 留空則列出有哪些範例檔)。\n\n" +
        "僅對啟用 examples 能力的語料有效(否則提示改用 docs_search)。\n\n" +
        "參數:corpus、query(空=列檔)、limit、context_lines。" + scopeNote,
      inputSchema: CodeSearchInputSchema.shape,
      annotations: READ_ONLY,
    },
    async (p) => textResult(doCodeSearch(scope ?? p.corpus, p.query, p.limit, p.context_lines))
  );

  server.registerTool(
    "docs_code_read",
    {
      title: "讀取範例源碼",
      description:
        "依路徑讀某語料的單一範例源碼檔(含程式碼框)。僅對啟用 examples 的語料有效。\n\n" +
        "參數:corpus、path(模糊比對)。" + scopeNote,
      inputSchema: CodeReadInputSchema.shape,
      annotations: READ_ONLY,
    },
    async (p) => textResult(doCodeRead(scope ?? p.corpus, p.path))
  );

  const SymbolInputSchema = z
    .object({
      corpus: z.string().max(100).optional().describe("語料 id。單書端點/DOCS_SCOPE 下可省。"),
      name: z.string().min(1).max(120).describe("要查的符號名(API/方法/組件名,對標題精確→包含比對)。"),
      limit: z.number().int().min(1).max(30).default(8).describe("候選上限(預設 8)"),
    })
    .strict();

  server.registerTool(
    "docs_symbol",
    {
      title: "API/符號精確查",
      description:
        "在某語料中按名字(API/方法/組件)精確定位到對應的標題段落,比全文搜尋更準。\n\n" +
        "僅對啟用 symbol 能力的語料有效(否則提示改用 docs_search/docs_outline)。\n\n" +
        "參數:corpus、name(對 #/##/### 標題比對)、limit。" + scopeNote,
      inputSchema: SymbolInputSchema.shape,
      annotations: READ_ONLY,
    },
    async (p) => textResult(doSymbol(scope ?? p.corpus, p.name, p.limit))
  );

  server.registerTool(
    "docs_outline",
    {
      title: "語料結構大綱",
      description:
        "列出某個語料的內部目錄(分類資料夾 + 每篇檔名,可選展開篇內 ##/### 標題)。\n\n" +
        "用途:當你還不知道某本「書」裡有什麼時的入口——比 docs_search(要先有關鍵字)、docs_read(要先知檔名)更早一步。\n\n" +
        "參數:\n" +
        "  - corpus (string):語料 id。\n" +
        "  - path (string,選填):只展開某個分類。\n" +
        "  - headings (boolean,選填):true 展開篇內標題,預設 false。" +
        scopeNote,
      inputSchema: OutlineInputSchema.shape,
      annotations: READ_ONLY,
    },
    async (p) => textResult(doOutline(scope ?? p.corpus, p.path, p.headings))
  );

  return server;
}

function logStartupInfo(scope?: string): void {
  const corpora = discoverCorpora();
  console.error("[docs-mcp-server] corpora 目錄載入 " + corpora.length + " 個語料、" + totalDocCount() + " 篇文件");
  for (const c of corpora) {
    console.error("[docs-mcp-server]   - " + c.id + (c.title !== c.id ? " (" + c.title + ")" : ""));
  }
  if (corpora.length === 0) {
    console.error("[docs-mcp-server] 警告:找不到任何語料。請設定 DOCS_CORPORA_DIR 或在 corpora/ 放語料目錄。");
  }
  if (scope) {
    if (getCorpus(scope)) console.error("[docs-mcp-server] 已鎖定單一語料:" + scope);
    else console.error('[docs-mcp-server] 警告:DOCS_SCOPE="' + scope + '" 不存在,可用:' + corpusIdList());
  }
}

async function runStdio(): Promise<void> {
  const scope = process.env.DOCS_SCOPE?.trim() || undefined;
  logStartupInfo(scope);
  const server = createServer(scope);
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[docs-mcp-server] server 已透過 stdio 啟動" + (scope ? "(鎖定語料 " + scope + ")" : ""));
}

const transport = (process.env.TRANSPORT || "stdio").toLowerCase();
const boot =
  transport === "http"
    ? runHttp(createServer, {
        corporaCount,
        docCount: totalDocCount,
        hasCorpus: (id) => !!getCorpus(id),
      })
    : runStdio();
boot.catch((err) => {
  console.error("[docs-mcp-server] 啟動失敗:", err);
  process.exit(1);
});
