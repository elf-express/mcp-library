import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const fwd = (p) => p.replace(/\\/g, "/");

// 假的 mcpjungle CLI:list servers 依序印出 state 檔內的名稱;register -c <檔> 把該檔的 name 加進 state;
// get group <名> 依 groups 檔判斷是否存在;create / update group -c <檔> 記到 groups.log(create 另加進 groups 檔)
const STUB = `#!/bin/sh
name_of() { node -e 'process.stdout.write(JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")).name)' "$1"; }
case "$3" in
  list) n=0; while IFS= read -r s; do n=$((n+1)); echo "$n. $s"; done < "$STUB_STATE" ;;
  register) echo "$(name_of "$5")" >> "$STUB_STATE" ;;
  get) grep -qx "$5" "$STUB_GROUPS" ;;
  create) g="$(name_of "$6")"; echo "$g" >> "$STUB_GROUPS"; echo "create $g" >> "$STUB_GROUPS.log"; cp "$6" "$STUB_GROUPS.$g.json" ;;
  update) g="$(name_of "$6")"; echo "update $g" >> "$STUB_GROUPS.log"; cp "$6" "$STUB_GROUPS.$g.json" ;;
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
  const groups = path.join(tmp, "groups.txt");
  fs.writeFileSync(groups, "");
  fs.writeFileSync(groups + ".log", "");
  const stub = path.join(tmp, "mcpjungle");
  fs.writeFileSync(stub, STUB, { mode: 0o755 });
  const env = {
    ...process.env,
    REGISTRY_URL: "http://stub",
    MCPJUNGLE_BIN: fwd(stub),
    STUB_STATE: fwd(state),
    STUB_GROUPS: fwd(groups),
    BOOKS_DIR: fwd(path.join(tmp, "books")),
    CONFIGS_DIR: fwd(path.join(tmp, "configs")),
    GEN_DIR: fwd(path.join(tmp, "gen")),
  };
  delete env.REGISTER_LIST;
  delete env.REGISTER_EXTRAS;
  delete env.REGISTER_GROUPS;
  return { state, groups, env };
}
const run = (env, extra = {}) =>
  spawnSync("sh", [fwd(path.join(here, "registrar.sh"))], { env: { ...env, ...extra }, encoding: "utf-8" });
const registered = (state) => fs.readFileSync(state, "utf-8").split("\n").filter(Boolean);
const groupLog = (groups) => fs.readFileSync(groups + ".log", "utf-8").split("\n").filter(Boolean);
const groupConfig = (groups, name) => JSON.parse(fs.readFileSync(`${groups}.${name}.json`, "utf-8"));

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

const GROUP = JSON.stringify({ name: "claude-tools", description: "給 Claude", included_servers: ["@books", "fetch"] });

test("群組:@books 展開成全部書本,第一次 create、第二次 update", () => {
  const { groups, env } = setup({ ...BASE, "configs/groups/claude-tools.json": GROUP });
  const r1 = run(env);
  assert.equal(r1.status, 0, r1.stdout + r1.stderr);
  assert.deepEqual(groupConfig(groups, "claude-tools"), {
    name: "claude-tools",
    description: "給 Claude",
    included_servers: ["alpha-en", "beta-zh-tw", "fetch"],
  });
  const r2 = run(env);
  assert.equal(r2.status, 0, r2.stdout + r2.stderr);
  assert.deepEqual(groupLog(groups), ["create claude-tools", "update claude-tools"]);
});

test("群組:引用的 server 不在 gateway 上就略過,不算失敗", () => {
  const { state, groups, env } = setup({ ...BASE, "configs/groups/claude-tools.json": GROUP });
  const r = run(env, { REGISTER_EXTRAS: "0" });
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.deepEqual(registered(state), ["alpha-en", "beta-zh-tw"]);
  assert.deepEqual(groupLog(groups), []);
  assert.match(r.stderr, /群組 claude-tools 略過:gateway 上沒有 fetch/);
});

test("REGISTER_GROUPS=0:不建群組,也不驗證群組檔", () => {
  const { state, groups, env } = setup({ ...BASE, "configs/groups/claude-tools.json": "{ 壞掉" });
  assert.equal(run(env, { REGISTER_GROUPS: "0" }).status, 0);
  assert.deepEqual(registered(state), ["alpha-en", "beta-zh-tw", "fetch"]);
  assert.deepEqual(groupLog(groups), []);
});

for (const [name, files, extra, pattern] of [
  ["語料 corpus.json 壞掉", { ...BASE, "books/beta/corpus/beta-zh-tw/corpus.json": "{ 壞掉" }, {}, /語料設定不合法/],
  ["registry 與語料同名", { ...BASE, "configs/alpha-en.json": JSON.stringify({ name: "alpha-en" }) }, {}, /同名/],
  ["REGISTER_LIST 指到不存在的設定", BASE, { REGISTER_LIST: "alpha-en nope" }, /找不到設定檔: *nope/],
  ["群組檔壞掉", { ...BASE, "configs/groups/claude-tools.json": "{ 壞掉" }, {}, /群組設定不合法/],
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
