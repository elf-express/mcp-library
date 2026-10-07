/**
 * 匯入 OPNsense 官方文件為 docs-mcp 語料 opnsense-en、opnsense-zh-tw。
 * 用法(在 mcpjungle/docs-mcp-server):npx tsx ../books/opnsense/import.ts
 * 讀本書的 source/en/ 與 source/zh-TW/,兩個語言全部轉換驗證通過後,
 * 逐語料清空 corpus/<id>/ 的 md(保留 corpus.json、LICENSE)再寫入;任何錯誤都不寫檔。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { isIncluded, transformPage } from "./transform.js";

const LANGS = [
  { src: "en", id: "opnsense-en" },
  { src: "zh-TW", id: "opnsense-zh-tw" },
];

const bookRoot = path.dirname(fileURLToPath(import.meta.url));

function fail(msg: string): never {
  console.error(`[import-opnsense] ${msg}`);
  process.exit(1);
}

const results: { id: string; outDir: string; pages: { name: string; content: string }[] }[] = [];
const errors: string[] = [];
for (const { src, id } of LANGS) {
  const srcDir = path.join(bookRoot, "source", src);
  if (!fs.existsSync(srcDir)) fail(`來源資料夾不存在:${srcDir}`);
  const files = fs.readdirSync(srcDir).filter(isIncluded).sort();
  if (files.length === 0) fail(`篩選後 0 篇:${srcDir}`);

  const pages: { name: string; content: string }[] = [];
  for (const name of files) {
    const r = transformPage(fs.readFileSync(path.join(srcDir, name), "utf-8"));
    if (r.leftovers.length) errors.push(`${src}/${name}:第 ${r.leftovers.join(", ")} 行仍含 ../images/`);
    pages.push({ name, content: r.content });
  }
  results.push({ id, outDir: path.join(bookRoot, "corpus", id), pages });
}
if (errors.length) fail("轉換失敗,未寫入任何檔案:\n" + errors.join("\n"));

for (const { id, outDir, pages } of results) {
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of fs.readdirSync(outDir)) {
    if (f.endsWith(".md")) fs.rmSync(path.join(outDir, f));
  }
  for (const p of pages) fs.writeFileSync(path.join(outDir, p.name), p.content, "utf-8");
  console.log(`[import-opnsense] 完成:${id} ${pages.length} 篇 → ${outDir}`);
}
