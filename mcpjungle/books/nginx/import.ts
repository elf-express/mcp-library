/**
 * 匯入 nginx 英文文件為 docs-mcp 語料 nginx-en。
 * 用法(在 mcpjungle/docs-mcp-server):npx tsx ../books/nginx/import.ts
 * 讀本書的 source/en/,全部轉換驗證通過後,
 * 清空 corpus/nginx-en/ 的 md(保留 corpus.json)再寫入;任何錯誤都不寫檔。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { isIncluded, transformPage } from "./transform.js";

const bookRoot = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(bookRoot, "source", "en");
const outDir = path.join(bookRoot, "corpus", "nginx-en");

function fail(msg: string): never {
  console.error(`[import-nginx-en] ${msg}`);
  process.exit(1);
}

if (!fs.existsSync(srcDir)) fail(`來源資料夾不存在:${srcDir}`);
const files = fs.readdirSync(srcDir).filter(isIncluded).sort();
if (files.length === 0) fail(`篩選後 0 篇:${srcDir}`);

const pages: { name: string; content: string }[] = [];
const errors: string[] = [];
let directiveCount = 0;
for (const name of files) {
  const r = transformPage(fs.readFileSync(path.join(srcDir, name), "utf-8"));
  if (r.unparsed.length) errors.push(`${name}:第 ${r.unparsed.join(", ")} 行的 Syntax 抽不到指令名`);
  directiveCount += r.directives.length;
  pages.push({ name, content: r.content });
}
if (errors.length) fail("轉換失敗,未寫入任何檔案:\n" + errors.join("\n"));

fs.mkdirSync(outDir, { recursive: true });
for (const f of fs.readdirSync(outDir)) {
  if (f.endsWith(".md")) fs.rmSync(path.join(outDir, f));
}
for (const p of pages) fs.writeFileSync(path.join(outDir, p.name), p.content, "utf-8");
console.log(`[import-nginx-en] 完成:${pages.length} 篇,${directiveCount} 個指令標題 → ${outDir}`);
