#!/usr/bin/env node
/**
 * SqlSugar Notes MCP Server
 *
 * Tools (all read-only):
 *   - sqlsugar_search_notes      full-text keyword search across all notes
 *   - sqlsugar_read_note         read a full note by filename
 *   - sqlsugar_list_notes        list all note filenames (+ index navigation)
 *   - sqlsugar_lookup_cheatsheet return only a note's 速查表 section
 *
 * Transports: stdio (default) or http (TRANSPORT=http, Streamable HTTP).
 * Notes dir: SQLSUGAR_NOTES_DIR -> bundled notes/ -> parent of server root.
 * Auth (HTTP): if MCP_AUTH_TOKEN set, /mcp requires "Authorization: Bearer <token>".
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { runHttp } from "./http.js";
import {
  resolveNotesDir,
  resolveExamplesDir,
  listMarkdownFiles,
  listCodeFiles,
  doSearch,
  doRead,
  doList,
  doCheatsheet,
  doListExamples,
  doReadCode,
  doSearchCode,
} from "./notes.js";

const SearchInputSchema = z
  .object({
    query: z.string().min(1, "查詢字串不可為空").max(200, "查詢字串不可超過 200 字元")
      .describe("關鍵字,以空白分隔可指定多個關鍵字 (AND,需全部出現於同一篇筆記)"),
    limit: z.number().int().min(1).max(50).default(15).describe("最多回傳幾篇命中的筆記 (預設 15)"),
    context_lines: z.number().int().min(0).max(5).default(1).describe("每個命中片段前後附帶的上下文行數 (預設 1)"),
  })
  .strict();

const ReadInputSchema = z
  .object({
    filename: z.string().min(1, "filename 不可為空").max(200)
      .describe('筆記檔名,可省略 .md 副檔名。支援模糊比對 (前綴 / 包含)。例如 "Where用法" 或 "事務"'),
  })
  .strict();

const ListInputSchema = z
  .object({
    filter: z.string().max(100).optional().describe("選填:只列出檔名包含此字串的筆記 (不分大小寫)"),
    include_index: z.boolean().default(false).describe("是否附上 index.md 的分類導航內容 (預設 false)"),
  })
  .strict();

const CheatsheetInputSchema = z
  .object({
    filename: z.string().min(1, "filename 不可為空").max(200)
      .describe('筆記檔名,.md 可省略,支援模糊比對。例如 "Where用法"'),
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

function createServer(): McpServer {
  const server = new McpServer({ name: "sqlsugar-mcp-server", version: "1.0.0" });

  server.registerTool(
    "sqlsugar_search_notes",
    {
      title: "搜尋 SqlSugar 筆記",
      description:
        "對所有 SqlSugar markdown 筆記做關鍵字全文搜尋,回傳命中的檔名與片段。\n\n" +
        "用途:當你需要知道「SqlSugar 怎麼做某件事」時,先用此工具找出相關筆記與程式碼片段。\n\n" +
        "參數:\n  - query (string):關鍵字,空白分隔多個關鍵字時全部出現才命中 (AND)。\n" +
        "  - limit (number):最多回傳幾篇,1-50,預設 15。\n" +
        "  - context_lines (number):片段上下文行數,0-5,預設 1。\n\n" +
        "回傳:Markdown,依命中次數排序,列出檔名、命中次數與含關鍵字片段 (附行號)。\n\n" +
        '範例:query="WhereIF" / query="ToPageListAsync" / query="雪花 SnowFlake"',
      inputSchema: SearchInputSchema.shape,
      annotations: READ_ONLY,
    },
    async (p) => textResult(doSearch(p.query, p.limit, p.context_lines))
  );

  server.registerTool(
    "sqlsugar_read_note",
    {
      title: "讀取 SqlSugar 筆記全文",
      description:
        "依檔名回傳一篇 SqlSugar 筆記的完整 markdown 內容。\n\n" +
        "參數:\n  - filename (string):檔名,.md 可省略,支援模糊比對。\n\n" +
        "回傳:該筆記完整內容。多筆符合時回傳候選清單;無符合時回傳提示。\n\n" +
        '範例:filename="Where用法" / filename="事務用法.md"',
      inputSchema: ReadInputSchema.shape,
      annotations: READ_ONLY,
    },
    async (p) => textResult(doRead(p.filename))
  );

  server.registerTool(
    "sqlsugar_list_notes",
    {
      title: "列出所有 SqlSugar 筆記",
      description:
        "列出筆記資料夾中所有 .md 檔名,方便瀏覽與挑選。\n\n" +
        "參數:\n  - filter (string,選填):只列出檔名包含此字串的筆記。\n" +
        "  - include_index (boolean):是否附上 index.md 分類導航,預設 false。\n\n" +
        "回傳:檔名清單 (及選填的分類導航)。",
      inputSchema: ListInputSchema.shape,
      annotations: READ_ONLY,
    },
    async (p) => textResult(doList(p.filter, p.include_index))
  );

  server.registerTool(
    "sqlsugar_lookup_cheatsheet",
    {
      title: "查詢 SqlSugar 筆記速查表",
      description:
        "只回傳某篇筆記的「速查表」段落 (語法對照表),比讀全文更精簡。\n\n" +
        "許多筆記開頭有「## 速查表」段落。此工具抽取該段落回傳;若沒有則提示改用 sqlsugar_read_note。\n\n" +
        "參數:\n  - filename (string):檔名,.md 可省略,支援模糊比對。\n\n" +
        '範例:filename="Where用法"',
      inputSchema: CheatsheetInputSchema.shape,
      annotations: READ_ONLY,
    },
    async (p) => textResult(doCheatsheet(p.filename))
  );

  server.registerTool(
    "sqlsugar_list_examples",
    {
      title: "列出範例專案原始碼",
      description: "列出 SqlSugar 範例專案(SqlSugar vs EF Core 效能測試)的所有原始碼檔(.cs/.csproj/.sln),依專案分組。\n\n回傳:每個專案的檔案清單。配合 sqlsugar_read_code 讀取單檔。",
      inputSchema: z.object({}).strict().shape,
      annotations: READ_ONLY,
    },
    async () => textResult(doListExamples())
  );

  server.registerTool(
    "sqlsugar_read_code",
    {
      title: "讀取範例原始碼檔",
      description: "依路徑回傳一個範例原始碼檔的完整內容(含程式碼框)。\n\n參數:\n  - path (string):檔案路徑或檔名,支援結尾/包含模糊比對。例如 \"Program.cs\" 或 \"SqlServer版/ORMTEST/Program.cs\"。",
      inputSchema: z.object({ path: z.string().min(1).max(300).describe("原始碼檔路徑或檔名(模糊)") }).strict().shape,
      annotations: READ_ONLY,
    },
    async (p) => textResult(doReadCode(p.path))
  );

  server.registerTool(
    "sqlsugar_search_code",
    {
      title: "搜尋範例原始碼",
      description: "在範例專案原始碼中做關鍵字搜尋,回傳命中的檔案與片段(附行號)。\n\n參數:\n  - query (string):關鍵字(空白分隔為 AND)。\n  - limit (number):最多回傳幾檔,預設 10。\n  - context_lines (number):片段上下文行數,預設 2。",
      inputSchema: z.object({
        query: z.string().min(1).max(200).describe("關鍵字,空白分隔多個為 AND"),
        limit: z.number().int().min(1).max(30).default(10).describe("最多回傳幾檔"),
        context_lines: z.number().int().min(0).max(6).default(2).describe("片段上下文行數"),
      }).strict().shape,
      annotations: READ_ONLY,
    },
    async (p) => textResult(doSearchCode(p.query, p.limit, p.context_lines))
  );

  return server;
}

function logStartupInfo(): void {
  const files = listMarkdownFiles();
  console.error("[sqlsugar-mcp] 筆記資料夾:" + resolveNotesDir());
  console.error("[sqlsugar-mcp] 載入 " + files.length + " 篇 .md 筆記");
  console.error("[sqlsugar-mcp] 範例原始碼:" + listCodeFiles().length + " 檔 @ " + resolveExamplesDir());
  if (files.length === 0) {
    console.error("[sqlsugar-mcp] 警告:找不到任何 .md 檔。請設定 SQLSUGAR_NOTES_DIR。");
  }
}

async function runStdio(): Promise<void> {
  logStartupInfo();
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[sqlsugar-mcp] server 已透過 stdio 啟動");
}

const transport = (process.env.TRANSPORT || "stdio").toLowerCase();
const boot =
  transport === "http"
    ? runHttp(createServer, () => listMarkdownFiles().length)
    : runStdio();
boot.catch((err) => {
  console.error("[sqlsugar-mcp] 啟動失敗:", err);
  process.exit(1);
});
