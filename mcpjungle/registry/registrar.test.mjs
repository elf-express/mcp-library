import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const fwd = (p) => p.replace(/\\/g, "/");

// 假的 mcpjungle CLI:list servers 依序印出 state 檔內的名稱;register -c <檔> 把該檔的 name 加進 state
const STUB = `#!/bin/sh
case "$3" in
  list) n=0; while IFS= read -r s; do n=$((n+1)); echo "$n. $s"; done < "$STUB_STATE" ;;
  register) node -e 'process.stdout.write(JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")).name+"\\n")' "$5" >> "$STUB_STATE" ;;
esac
`;

const manifest = (book, language) => JSON.stringify({ book, language, title: book, description: `${book} 描述` });

function setup(files) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "registrar-"));
  for (const [rel, content] of Object.entries(files)) {
    const p = path.join(tmp, rel);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, content);
  }
  const state = path.join(tmp, "state.txt");
  fs.writeFileSync(state, "");
  const stub = path.join(tmp, "mcpjungle");
  fs.writeFileSync(stub, STUB, { mode: 0o755 });
  const env = {
    ...process.env,
    REGISTRY_URL: "http://stub",
    MCPJUNGLE_BIN: fwd(stub),
    STUB_STATE: fwd(state),
    BOOKS_DIR: fwd(path.join(tmp, "books")),
    CONFIGS_DIR: fwd(path.join(tmp, "configs")),
    GEN_DIR: fwd(path.join(tmp, "gen")),
  };
  delete env.REGISTER_LIST;
  delete env.REGISTER_EXTRAS;
  return { state, env };
}
const run = (env, extra = {}) =>
  spawnSync("sh", [fwd(path.join(here, "registrar.sh"))], { env: { ...env, ...extra }, encoding: "utf-8" });
const registered = (state) => fs.readFileSync(state, "utf-8").split("\n").filter(Boolean);

const BASE = {
  "books/alpha/corpus/alpha-en/corpus.json": manifest("alpha", "en"),
  "books/beta/corpus/beta-zh-tw/corpus.json": manifest("beta", "zh-TW"),
  "configs/fetch.json": JSON.stringify({ name: "fetch", transport: "stdio", command: "uvx", args: ["mcp-server-fetch"] }),
  "configs/optional/docs.json": JSON.stringify({ name: "docs", transport: "streamable_http", url: "http://d/mcp" }),
};

test("預設:註冊全部書本 + registry/*.json,不含 optional", () => {
  const { state, env } = setup(BASE);
  const r = run(env);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.deepEqual(registered(state), ["alpha-en", "beta-zh-tw", "fetch"]);
});

test("REGISTER_EXTRAS=0:只註冊書本", () => {
  const { state, env } = setup(BASE);
  assert.equal(run(env, { REGISTER_EXTRAS: "0" }).status, 0);
  assert.deepEqual(registered(state), ["alpha-en", "beta-zh-tw"]);
});

test("REGISTER_LIST 覆寫:可指定 optional 與單一書本", () => {
  const { state, env } = setup(BASE);
  assert.equal(run(env, { REGISTER_LIST: "docs beta-zh-tw" }).status, 0);
  assert.deepEqual(registered(state), ["docs", "beta-zh-tw"]);
});

test("冪等:跑第二次全部略過", () => {
  const { state, env } = setup(BASE);
  run(env);
  const r = run(env);
  assert.equal(r.status, 0);
  assert.deepEqual(registered(state), ["alpha-en", "beta-zh-tw", "fetch"]);
  assert.match(r.stdout, /alpha-en 已註冊,略過/);
});

for (const [name, files, extra, pattern] of [
  ["語料 corpus.json 壞掉", { ...BASE, "books/beta/corpus/beta-zh-tw/corpus.json": "{ 壞掉" }, {}, /語料設定不合法/],
  ["registry 與語料同名", { ...BASE, "configs/alpha-en.json": JSON.stringify({ name: "alpha-en" }) }, {}, /同名/],
  ["REGISTER_LIST 指到不存在的設定", BASE, { REGISTER_LIST: "alpha-en nope" }, /找不到設定檔: *nope/],
]) {
  test(`不部分註冊:${name}`, () => {
    const { state, env } = setup(files);
    const r = run(env, extra);
    assert.equal(r.status, 1, r.stdout + r.stderr);
    assert.match(r.stdout + r.stderr, pattern);
    assert.match(r.stdout, /未註冊任何 server/);
    assert.deepEqual(registered(state), []);
  });
}
