/**
 * 匯入 Stalwart 官方英文文件為 docs-mcp 語料 stalwart-en。
 * 用法(在 mcpjungle/docs-mcp-server):npx tsx ../books/stalwart/import.ts
 * 讀本書的 source/en/(stalwartlabs/website 的 src/content/docs/docs 原樣複本),全部轉換驗證通過後,
 * 清空 corpus/stalwart-en/ 的 md 與分類資料夾(保留 corpus.json)再寫入;任何錯誤都不寫檔。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { parseFlatYaml, planCorpus, type DirMeta, type SourceFile } from "./transform.js";

const bookRoot = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(bookRoot, "source", "en");
const outDir = path.join(bookRoot, "corpus", "stalwart-en");

function fail(msg: string): never {
  console.error(`[import-stalwart-en] ${msg}`);
  process.exit(1);
}

if (!fs.existsSync(srcDir)) fail(`來源資料夾不存在:${srcDir}`);

const files: SourceFile[] = [];
const metas: Record<string, DirMeta> = {};
const walk = (dir: string, rel: string) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const r = rel ? `${rel}/${e.name}` : e.name;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, r);
    else if (e.name === "_meta.yml") {
      const m = parseFlatYaml(fs.readFileSync(p, "utf-8"));
      metas[rel] = { label: m.label, order: m.order !== undefined ? Number(m.order) : undefined };
    } else if (/\.mdx?$/.test(e.name)) files.push({ rel: r, raw: fs.readFileSync(p, "utf-8") });
  }
};
walk(srcDir, "");

const { pages, errors } = planCorpus(files, metas);
if (errors.length) fail("轉換失敗,未寫入任何檔案:\n" + errors.join("\n"));
if (pages.length === 0) fail(`篩選後 0 篇:${srcDir}`);

fs.mkdirSync(outDir, { recursive: true });
for (const e of fs.readdirSync(outDir, { withFileTypes: true })) {
  if (e.isDirectory() || e.name.endsWith(".md")) fs.rmSync(path.join(outDir, e.name), { recursive: true });
}
for (const p of pages) {
  const target = path.join(outDir, ...p.out.split("/"));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, p.content, "utf-8");
}
console.log(`[import-stalwart-en] 完成:${pages.length} 篇 → ${outDir}`);
