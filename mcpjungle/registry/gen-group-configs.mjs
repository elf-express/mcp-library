#!/usr/bin/env node
// 工具群組設定:<groupsDir>/<name>.json(MCPJungle tool group 格式),included_servers 可寫 "@books" 代表全部書本。
// 用法:
//   node gen-group-configs.mjs check <groupsDir>
//     驗證全部群組檔,stdout 印群組名;任何一個不合法就列出全部原因、以 1 結束。
//   node gen-group-configs.mjs render <groupsDir> <bookConfigsDir> <outDir>  < 已註冊 server 名(每行一個)
//     展開 @books(= <bookConfigsDir>/*.json 的檔名),引用的 server 都已註冊的群組寫成 <outDir>/<name>.json 並印出群組名;
//     缺 server 的群組略過,原因印到 stderr。
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const BOOKS = "@books";
const NAME_RE = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;
const LIST_KEYS = ["included_tools", "included_servers", "excluded_tools"];
const KEYS = new Set(["name", "description", ...LIST_KEYS]);

const isStringList = (v) => Array.isArray(v) && v.every((s) => typeof s === "string" && s.length > 0);

export function collectGroups(groupsDir) {
  const groups = [];
  const errors = [];
  let files = [];
  try {
    files = fs.readdirSync(groupsDir).filter((f) => f.endsWith(".json")).sort();
  } catch {
    return { groups, errors };
  }
  for (const file of files) {
    const where = `groups/${file}`;
    let g;
    try {
      g = JSON.parse(fs.readFileSync(path.join(groupsDir, file), "utf-8"));
    } catch (e) {
      errors.push(`${where}:不是合法 JSON(${e.message})`);
      continue;
    }
    if (!g || typeof g !== "object" || Array.isArray(g)) { errors.push(`${where}:頂層必須是物件`); continue; }
    const unknown = Object.keys(g).filter((k) => !KEYS.has(k));
    if (unknown.length) { errors.push(`${where}:不認得的欄位 ${unknown.join(", ")}`); continue; }
    const expected = path.basename(file, ".json");
    if (g.name !== expected) { errors.push(`${where}:name 應為 "${expected}",實際是 ${JSON.stringify(g.name)}`); continue; }
    if (!NAME_RE.test(g.name)) { errors.push(`${where}:群組名只能用英數、_、-,且以英數開頭`); continue; }
    if (g.description !== undefined && typeof g.description !== "string") { errors.push(`${where}:description 必須是字串`); continue; }
    const bad = LIST_KEYS.filter((k) => g[k] !== undefined && !isStringList(g[k]));
    if (bad.length) { errors.push(`${where}:${bad.join(", ")} 必須是非空字串陣列`); continue; }
    if (!g.included_tools?.length && !g.included_servers?.length) { errors.push(`${where}:included_tools 與 included_servers 至少要有一個`); continue; }
    const badTools = [...(g.included_tools ?? []), ...(g.excluded_tools ?? [])].filter((t) => !t.includes("__"));
    if (badTools.length) { errors.push(`${where}:工具名要寫成 <server>__<tool>:${badTools.join(", ")}`); continue; }
    groups.push(g);
  }
  return { groups, errors };
}

// 回傳 { config } 或 { missing: [server...] }
export function renderGroup(group, { books, registered }) {
  const servers = [...new Set((group.included_servers ?? []).flatMap((s) => (s === BOOKS ? books : [s])))];
  const toolServers = (group.included_tools ?? []).map((t) => t.split("__")[0]);
  const have = new Set(registered);
  const missing = [...new Set([...servers, ...toolServers])].filter((s) => !have.has(s));
  if (missing.length) return { missing };
  const config = { name: group.name };
  if (group.description) config.description = group.description;
  if (group.included_tools?.length) config.included_tools = group.included_tools;
  if (servers.length) config.included_servers = servers;
  if (group.excluded_tools?.length) config.excluded_tools = group.excluded_tools;
  return { config };
}

const isMain = Boolean(process.argv[1]) &&
  path.resolve(process.argv[1]).toLowerCase() === fileURLToPath(import.meta.url).toLowerCase();
if (isMain) {
  const [cmd, groupsDir, booksDir, outDir] = process.argv.slice(2);
  if (!(cmd === "check" && groupsDir) && !(cmd === "render" && groupsDir && booksDir && outDir)) {
    console.error("用法:node gen-group-configs.mjs check <groupsDir> | render <groupsDir> <bookConfigsDir> <outDir>");
    process.exit(2);
  }
  const { groups, errors } = collectGroups(groupsDir);
  if (errors.length) {
    console.error("gen-group-configs:群組設定不合法:\n" + errors.map((e) => "  - " + e).join("\n"));
    process.exit(1);
  }
  if (cmd === "check") {
    for (const g of groups) console.log(g.name);
  } else {
    const books = fs.readdirSync(booksDir).filter((f) => f.endsWith(".json")).map((f) => path.basename(f, ".json")).sort();
    const registered = fs.readFileSync(0, "utf-8").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    fs.mkdirSync(outDir, { recursive: true });
    for (const g of groups) {
      const { config, missing } = renderGroup(g, { books, registered });
      if (missing) { console.error(`>> 群組 ${g.name} 略過:gateway 上沒有 ${missing.join(" ")}`); continue; }
      fs.writeFileSync(path.join(outDir, `${g.name}.json`), JSON.stringify(config, null, 2) + "\n");
      console.log(g.name);
    }
  }
}
