// Minimal MCP stdio test client: spawns the server, runs initialize + tools/list
// + a few tools/call, prints results. Run: node test-client.mjs
import { spawn } from "node:child_process";

const server = spawn("node", ["dist/index.js"], {
  stdio: ["pipe", "pipe", "inherit"],
});

let buf = "";
const pending = new Map();
server.stdout.on("data", (d) => {
  buf += d.toString();
  let idx;
  while ((idx = buf.indexOf("\n")) >= 0) {
    const line = buf.slice(0, idx).trim();
    buf = buf.slice(idx + 1);
    if (!line) continue;
    let msg;
    try { msg = JSON.parse(line); } catch { continue; }
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  }
});

let id = 0;
function send(method, params) {
  const myId = ++id;
  return new Promise((resolve) => {
    pending.set(myId, resolve);
    server.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: myId, method, params }) + "\n");
  });
}
function notify(method, params) {
  server.stdin.write(JSON.stringify({ jsonrpc: "2.0", method, params }) + "\n");
}

const firstText = (r) => r.result?.content?.[0]?.text ?? JSON.stringify(r.result ?? r.error);

(async () => {
  await send("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "test", version: "1.0" },
  });
  notify("notifications/initialized", {});

  const tools = await send("tools/list", {});
  console.log("\n=== TOOLS ===");
  console.log(tools.result.tools.map((t) => t.name).join(", "));

  console.log("\n=== list_notes (filter=Where) ===");
  console.log(firstText(await send("tools/call", { name: "sqlsugar_list_notes", arguments: { filter: "Where" } })));

  console.log("\n=== search_notes (query='WhereIF') ===");
  console.log(firstText(await send("tools/call", { name: "sqlsugar_search_notes", arguments: { query: "WhereIF", limit: 2 } })).slice(0, 900));

  console.log("\n=== lookup_cheatsheet (Where用法) ===");
  console.log(firstText(await send("tools/call", { name: "sqlsugar_lookup_cheatsheet", arguments: { filename: "Where用法" } })).slice(0, 700));

  console.log("\n=== read_note (事務) -> expect multi-match ===");
  console.log(firstText(await send("tools/call", { name: "sqlsugar_read_note", arguments: { filename: "事務" } })).slice(0, 400));

  console.log("\n=== read_note (Where用法) ===");
  console.log(firstText(await send("tools/call", { name: "sqlsugar_read_note", arguments: { filename: "Where用法" } })).slice(0, 250));

  console.log("\n=== search_notes (no match) ===");
  console.log(firstText(await send("tools/call", { name: "sqlsugar_search_notes", arguments: { query: "ZZZ_NOPE_XYZ" } })));

  server.kill();
  process.exit(0);
})();
