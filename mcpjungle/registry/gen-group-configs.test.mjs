import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectGroups, renderGroup } from "./gen-group-configs.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));

function groupsDir(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "groups-"));
  for (const [name, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, name), typeof content === "string" ? content : JSON.stringify(content));
  }
  return dir;
}

test("repo 內的群組設定都合法", () => {
  const { groups, errors } = collectGroups(path.join(here, "groups"));
  assert.deepEqual(errors, []);
  assert.ok(groups.some((g) => g.name === "claude-tools"));
});

test("沒有 groups 目錄:零個群組、不算錯", () => {
  assert.deepEqual(collectGroups(path.join(os.tmpdir(), "no-such-groups-dir")), { groups: [], errors: [] });
});

test("不合法的群組檔全部列出原因", () => {
  const dir = groupsDir({
    "a.json": "{ 壞掉",
    "b.json": { name: "other", included_servers: ["time"] },
    "c.json": { name: "c" },
    "d.json": { name: "d", included_servers: "time" },
    "e.json": { name: "e", included_tools: ["get_current_time"] },
    "f.json": { name: "f", included_servers: ["time"], extra: 1 },
    "-g.json": { name: "-g", included_servers: ["time"] },
  });
  const { groups, errors } = collectGroups(dir);
  assert.deepEqual(groups, []);
  assert.equal(errors.length, 7);
  assert.match(errors.join("\n"), /-g\.json:群組名只能用英數/);
  assert.match(errors.join("\n"), /a\.json:不是合法 JSON/);
  assert.match(errors.join("\n"), /b\.json:name 應為 "b"/);
  assert.match(errors.join("\n"), /c\.json:included_tools 與 included_servers 至少要有一個/);
  assert.match(errors.join("\n"), /d\.json:included_servers 必須是非空字串陣列/);
  assert.match(errors.join("\n"), /e\.json:工具名要寫成 <server>__<tool>/);
  assert.match(errors.join("\n"), /f\.json:不認得的欄位 extra/);
});

test("renderGroup:展開 @books、去重、保留排除清單", () => {
  const group = {
    name: "g",
    description: "d",
    included_tools: ["filesystem__read_file"],
    included_servers: ["@books", "time", "alpha-en"],
    excluded_tools: ["time__convert_time"],
  };
  assert.deepEqual(renderGroup(group, { books: ["alpha-en", "beta-en"], registered: ["alpha-en", "beta-en", "time", "filesystem"] }), {
    config: {
      name: "g",
      description: "d",
      included_tools: ["filesystem__read_file"],
      included_servers: ["alpha-en", "beta-en", "time"],
      excluded_tools: ["time__convert_time"],
    },
  });
});

test("renderGroup:引用的 server(含 included_tools 的前綴)沒註冊就回報缺哪些", () => {
  const group = { name: "g", included_tools: ["filesystem__read_file"], included_servers: ["@books", "time"] };
  assert.deepEqual(renderGroup(group, { books: ["alpha-en"], registered: ["time"] }), { missing: ["alpha-en", "filesystem"] });
});
