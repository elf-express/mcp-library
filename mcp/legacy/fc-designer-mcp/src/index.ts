#!/usr/bin/env node
/**
 * FcDesigner Pro Docs MCP Server
 *
 * Tools (all read-only):
 *   - fc_search_docs   full-text keyword search across all docs
 *   - fc_read_doc      read a full doc by filename / relative path
 *   - fc_list_docs     list all doc filenames grouped by category
 *
 * Transports: stdio (default) or http (TRANSPORT=http, Streamable HTTP).
 * Docs dir: FC_DOCS_DIR -> bundled notes/ -> parent of server root.
 * Auth (HTTP): if MCP_AUTH_TOKEN set, /mcp requires "Authorization: Bearer <token>".
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { runHttp } from "./http.js";
import {
  resolveNotesDir,
  listMarkdownFiles,
  doSearch,
  doRead,
  doList,
} from "./notes.js";

const SearchInputSchema = z
  .object({
    query: z.string().min(1, "查詢字串不可為空").max(200, "查詢字串不可超過 200 字元")
      .describe("關鍵字,以空白分隔可指定多個關鍵字 (AND,需全部出現於同一篇文件)"),
    limit: z.number().int().min(1).max(50).default(15).describe("最多回傳幾篇命中的文件 (預設 15)"),
    context_lines: z.number().int().min(0).max(5).default(1).describe("每個命中片段前後附帶的上下文行數 (預設 1)"),
  })
  .strict();

const ReadInputSchema = z
  .object({
    filename: z.string().min(1, "filename 不可為空").max(200)
      .describe('文件檔名或相對路徑,可省略 .md。支援模糊比對 (結尾 / 包含)。例如 "structure" 或 "開發文檔/structure.md"'),
  })
  .strict();

const ListInputSchema = z
  .object({
    filter: z.string().max(100).optional().describe("選填:只列出路徑包含此字串的文件 (不分大小寫)"),
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
  const server = new McpServer({ name: "fc-designer-mcp-server", version: "1.0.0" });

  server.registerTool(
    "fc_search_docs",
    {
      title: "搜尋 FcDesigner Pro 文件",
      description:
        "對所有 FcDesigner Pro markdown 文件做關鍵字全文搜尋,回傳命中的檔名與片段。\n\n" +
        "用途:當你需要知道「FcDesigner Pro 怎麼做某件事」時,先用此工具找出相關文件與片段。\n\n" +
        "參數:\n  - query (string):關鍵字,空白分隔多個關鍵字時全部出現才命中 (AND)。\n" +
        "  - limit (number):最多回傳幾篇,1-50,預設 15。\n" +
        "  - context_lines (number):片段上下文行數,0-5,預設 1。\n\n" +
        "回傳:Markdown,依命中次數排序,列出檔名 (相對路徑)、命中次數與含關鍵字片段 (附行號)。\n\n" +
        '範例:query="拖拉" / query="extension setting" / query="自訂組件 規則"',
      inputSchema: SearchInputSchema.shape,
      annotations: READ_ONLY,
    },
    async (p) => textResult(doSearch(p.query, p.limit, p.context_lines))
  );

  server.registerTool(
    "fc_read_doc",
    {
      title: "讀取 FcDesigner Pro 文件全文",
      description:
        "依檔名或相對路徑回傳一篇 FcDesigner Pro 文件的完整 markdown 內容。\n\n" +
        "參數:\n  - filename (string):檔名或相對路徑,.md 可省略,支援模糊比對。\n\n" +
        "回傳:該文件完整內容 (附官方來源連結)。多筆符合時回傳候選清單;無符合時回傳提示。\n\n" +
        '範例:filename="structure" / filename="開發文檔/structure.md"',
      inputSchema: ReadInputSchema.shape,
      annotations: READ_ONLY,
    },
    async (p) => textResult(doRead(p.filename))
  );

  server.registerTool(
    "fc_list_docs",
    {
      title: "列出所有 FcDesigner Pro 文件",
      description:
        "列出文件資料夾中所有 .md 檔 (依分類目錄分組),方便瀏覽與挑選。\n\n" +
        "參數:\n  - filter (string,選填):只列出路徑包含此字串的文件。\n\n" +
        "回傳:依分類 (二次開發 / 產品手冊 / 開發文檔) 分組的檔名清單。",
      inputSchema: ListInputSchema.shape,
      annotations: READ_ONLY,
    },
    async (p) => textResult(doList(p.filter))
  );

  return server;
}

function logStartupInfo(): void {
  const files = listMarkdownFiles();
  console.error("[fc-designer-mcp] 文件資料夾:" + resolveNotesDir());
  console.error("[fc-designer-mcp] 載入 " + files.length + " 篇 .md 文件");
  if (files.length === 0) {
    console.error("[fc-designer-mcp] 警告:找不到任何 .md 檔。請設定 FC_DOCS_DIR。");
  }
}

async function runStdio(): Promise<void> {
  logStartupInfo();
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[fc-designer-mcp] server 已透過 stdio 啟動");
}

const transport = (process.env.TRANSPORT || "stdio").toLowerCase();
const boot =
  transport === "http"
    ? runHttp(createServer, () => listMarkdownFiles().length)
    : runStdio();
boot.catch((err) => {
  console.error("[fc-designer-mcp] 啟動失敗:", err);
  process.exit(1);
});
