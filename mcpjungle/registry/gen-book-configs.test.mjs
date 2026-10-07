import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { collectBookConfigs } from "./gen-book-configs.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const gen = path.join(here, "gen-book-configs.mjs");

function makeBooks(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "books-"));
  for (const [rel, content] of Object.entries(files)) {
    const p = path.join(root, rel);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, typeof content === "string" ? content : JSON.stringify(content));
  }
  return root;
}
const manifest = (book, language, extra = {}) => ({
  book, language, title: `${book} 書`, description: `${book} 描述`, ...extra,
});

test("每個語料產生一份註冊設定,url 指向單書端點,工具依 capabilities 列出", () => {
  const books = makeBooks({
    "alpha/corpus/alpha-en/corpus.json": manifest("alpha", "en", { capabilities: { symbol: true } }),
    "alpha/source/raw.md": "# 原稿",
    "beta/corpus/beta-zh-tw/corpus.json": manifest("beta", "zh-TW", { capabilities: { cheatsheet: true, examples: true } }),
    "gamma/source/only.md": "# 只有原稿",
    ".vscode/extensions.json": "{}",
  });
  const { configs, errors } = collectBookConfigs(books, { docsUrl: "http://docs:5690" });
  assert.deepEqual(errors, []);
  assert.deepEqual(configs.map((c) => c.name), ["alpha-en", "beta-zh-tw"]);
  assert.equal(configs[0].transport, "streamable_http");
  assert.equal(configs[0].url, "http://docs:5690/mcp/alpha-en");
  assert.match(configs[0].description, /^alpha 書:alpha 描述/);
  assert.match(configs[0].description, /docs_symbol/);
  assert.doesNotMatch(configs[0].description, /docs_cheatsheet/);
  assert.match(configs[1].description, /docs_cheatsheet/);
  assert.match(configs[1].description, /docs_code_search/);
  assert.equal(configs[0].bearer_token, undefined);
});

test("有 token 時帶 bearer_token", () => {
  const books = makeBooks({ "alpha/corpus/alpha-en/corpus.json": manifest("alpha", "en") });
  const { configs } = collectBookConfigs(books, { docsUrl: "http://docs:5690", token: "t0k3n" });
  assert.equal(configs[0].bearer_token, "t0k3n");
});

for (const [name, files, pattern] of [
  ["缺 corpus.json", { "alpha/corpus/alpha-en/a.md": "# a" }, /缺檔/],
  ["corpus.json 不是合法 JSON", { "alpha/corpus/alpha-en/corpus.json": "{ 壞掉" }, /不是合法 JSON/],
  ["缺 description", { "alpha/corpus/alpha-en/corpus.json": { book: "alpha", language: "en" } }, /缺 description/],
  ["book 與資料夾不符", { "alpha/corpus/alpha-en/corpus.json": manifest("other", "en") }, /book 應為 "alpha"/],
  ["id 不是 <book>-<language>", { "alpha/corpus/alpha-zh/corpus.json": manifest("alpha", "en") }, /應為 alpha-en/],
  ["id 有大寫", { "alpha/corpus/Alpha-en/corpus.json": manifest("alpha", "en") }, /小寫/],
  ["id 重複", {
    "alpha/corpus/alpha-en/corpus.json": manifest("alpha", "en"),
    "beta/corpus/alpha-en/corpus.json": manifest("alpha", "en"),
  }, /重複/],
  ["沒有任何語料", { "alpha/source/a.md": "# a" }, /沒有任何語料/],
]) {
  test(`不合法:${name}`, () => {
    const { errors } = collectBookConfigs(makeBooks(files), { docsUrl: "http://docs:5690" });
    assert.ok(errors.some((e) => pattern.test(e)), errors.join("\n"));
  });
}

test("CLI:有任何錯誤就 exit 1,且不寫任何檔", () => {
  const books = makeBooks({
    "alpha/corpus/alpha-en/corpus.json": manifest("alpha", "en"),
    "beta/corpus/beta-en/corpus.json": "{ 壞掉",
  });
  const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "gen-")), "out");
  const r = spawnSync(process.execPath, [gen, books, out], { encoding: "utf-8" });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /beta\/corpus\/beta-en/);
  assert.equal(fs.existsSync(out), false);
});

test("CLI:寫出 <id>.json 並在 stdout 印 id;DOCS_MCP_URL 可覆寫", () => {
  const books = makeBooks({ "alpha/corpus/alpha-en/corpus.json": manifest("alpha", "en") });
  const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "gen-")), "out");
  const r = spawnSync(process.execPath, [gen, books, out], {
    encoding: "utf-8", env: { ...process.env, DOCS_MCP_URL: "http://x:1/" },
  });
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stdout.trim(), "alpha-en");
  const cfg = JSON.parse(fs.readFileSync(path.join(out, "alpha-en.json"), "utf-8"));
  assert.equal(cfg.url, "http://x:1/mcp/alpha-en");
});

test("repo 實際的 mcpjungle/books 全部合法", () => {
  const { configs, errors } = collectBookConfigs(path.resolve(here, "../books"), { docsUrl: "http://docs-mcp-server:5690" });
  assert.deepEqual(errors, []);
  const names = configs.map((c) => c.name);
  for (const id of ["fc-zh-tw", "nginx-en", "sqlsugar-zh-tw"]) assert.ok(names.includes(id), id);
});
