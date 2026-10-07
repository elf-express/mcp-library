#!/usr/bin/env node
// 掃 <booksDir>/*/corpus/*/,替每個語料產生 MCPJungle 註冊設定 <outDir>/<id>.json,stdout 印 id。
// 任何一個語料不合法就列出全部原因、以 1 結束,不寫任何檔。
// 用法:node gen-book-configs.mjs <booksDir> <outDir>
// 環境變數:DOCS_MCP_URL(預設 http://docs-mcp-server:5690)、DOCS_MCP_AUTH_TOKEN(有值則加 bearer_token)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const BASE_TOOLS = ["docs_list_corpora", "docs_search", "docs_read", "docs_outline"];
const CAPABILITY_TOOLS = {
  cheatsheet: ["docs_cheatsheet"],
  examples: ["docs_code_search", "docs_code_read"],
  symbol: ["docs_symbol"],
};

function subdirs(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isDirectory() && !e.name.startsWith("."))
      .map((e) => e.name)
      .sort();
  } catch {
    return [];
  }
}

export function collectBookConfigs(booksDir, { docsUrl, token = "" }) {
  const errors = [];
  const configs = [];
  const seen = new Map();
  if (!fs.existsSync(booksDir)) return { configs, errors: [`找不到 books 目錄:${booksDir}`] };
  for (const book of subdirs(booksDir)) {
    for (const id of subdirs(path.join(booksDir, book, "corpus"))) {
      const where = `${book}/corpus/${id}`;
      if (!ID_RE.test(id)) { errors.push(`${where}:語料 id 只能用小寫英數與 -`); continue; }
      if (seen.has(id)) { errors.push(`${where}:語料 id 與 ${seen.get(id)} 重複`); continue; }
      seen.set(id, where);
      let m;
      try {
        m = JSON.parse(fs.readFileSync(path.join(booksDir, where, "corpus.json"), "utf-8"));
      } catch (e) {
        errors.push(`${where}/corpus.json:${e.code === "ENOENT" ? "缺檔" : `不是合法 JSON(${e.message})`}`);
        continue;
      }
      if (!m || typeof m !== "object" || Array.isArray(m)) { errors.push(`${where}/corpus.json:頂層必須是物件`); continue; }
      const description = typeof m.description === "string" ? m.description.trim() : "";
      if (!description) { errors.push(`${where}/corpus.json:缺 description`); continue; }
      if (m.book !== book) { errors.push(`${where}/corpus.json:book 應為 "${book}",實際是 ${JSON.stringify(m.book)}`); continue; }
      const expected = typeof m.language === "string" ? `${book}-${m.language.toLowerCase()}` : "";
      if (id !== expected) { errors.push(`${where}:語料 id 應為 ${expected || "<book>-<language>"}`); continue; }
      const caps = m.capabilities ?? {};
      const tools = [...BASE_TOOLS, ...Object.keys(CAPABILITY_TOOLS).filter((k) => caps[k]).flatMap((k) => CAPABILITY_TOOLS[k])];
      const title = typeof m.title === "string" && m.title.trim() ? m.title.trim() : id;
      const cfg = {
        name: id,
        transport: "streamable_http",
        description: `${title}:${description}(工具:${tools.join(" / ")})`,
        url: `${docsUrl}/mcp/${id}`,
      };
      if (token) cfg.bearer_token = token;
      configs.push(cfg);
    }
  }
  if (configs.length === 0 && errors.length === 0) errors.push(`${booksDir}:沒有任何語料(books/<書名>/corpus/<id>/)`);
  configs.sort((a, b) => a.name.localeCompare(b.name));
  return { configs, errors };
}

// Windows 上磁碟代號大小寫可能不同,比對前一律轉小寫
const isMain = Boolean(process.argv[1]) &&
  path.resolve(process.argv[1]).toLowerCase() === fileURLToPath(import.meta.url).toLowerCase();
if (isMain) {
  const [booksDir, outDir] = process.argv.slice(2);
  if (!booksDir || !outDir) {
    console.error("用法:node gen-book-configs.mjs <booksDir> <outDir>");
    process.exit(2);
  }
  const { configs, errors } = collectBookConfigs(booksDir, {
    docsUrl: (process.env.DOCS_MCP_URL || "http://docs-mcp-server:5690").replace(/\/+$/, ""),
    token: process.env.DOCS_MCP_AUTH_TOKEN || "",
  });
  if (errors.length) {
    console.error("gen-book-configs:語料設定不合法,未產生任何註冊檔:\n" + errors.map((e) => "  - " + e).join("\n"));
    process.exit(1);
  }
  fs.mkdirSync(outDir, { recursive: true });
  for (const c of configs) fs.writeFileSync(path.join(outDir, `${c.name}.json`), JSON.stringify(c, null, 2) + "\n");
  for (const c of configs) console.log(c.name);
}
