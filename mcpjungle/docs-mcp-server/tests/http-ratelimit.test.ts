/**
 * http-ratelimit.test.ts — /mcp* 限流測試(E-250)
 *
 * 驗證 createHttpApp() 的限流(只計數驗證失敗):
 *   (a) 錯誤 token 會被計數,達上限後回 429 並帶 Retry-After;GET/DELETE 一樣被擋
 *   (b) token 正確的請求不會被計數;被鎖的 IP 帶正確 token 仍可使用
 *   (c) 其他 4xx(未知 corpus 404、缺 session 400)不會被計數
 *   (d) /health 不受限流影響
 *   (e) 時間窗到期後解除
 *   (f) 回 429 時寫日誌,含次數與時間窗
 *   (g) 偽造 X-Forwarded-For 無法繞過
 */

import { describe, it, expect, afterEach, vi } from "vitest";
import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createHttpApp, type HttpOptions } from "../src/http.js";

const TOKEN = "test-token";
const GOOD = { Authorization: `Bearer ${TOKEN}` };
const BAD = { Authorization: "Bearer wrong" };
const LIST = { jsonrpc: "2.0", id: 1, method: "tools/list" };
const INIT = {
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "t", version: "1" } },
};

let server: Server | undefined;

afterEach(async () => {
  vi.restoreAllMocks();
  if (server) {
    server.closeAllConnections();
    await new Promise<void>((resolve) => server!.close(() => resolve()));
  }
  server = undefined;
});

async function start(opts: Partial<HttpOptions> = {}): Promise<string> {
  const app = createHttpApp(
    () => new McpServer({ name: "test", version: "0.0.0" }),
    { corporaCount: () => 1, docCount: () => 0, hasCorpus: (id) => id === "known" },
    { authToken: TOKEN, rateLimitMax: 3, rateLimitWindowMs: 60_000, ...opts }
  );
  server = app.listen(0);
  await new Promise<void>((resolve) => server!.once("listening", () => resolve()));
  return `http://127.0.0.1:${(server!.address() as AddressInfo).port}`;
}

async function hit(
  base: string,
  path: string,
  headers: Record<string, string>,
  body: unknown = LIST,
  method = "POST"
): Promise<{ status: number; headers: Headers }> {
  const res = await fetch(base + path, {
    method,
    headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream", ...headers },
    body: method === "POST" ? JSON.stringify(body) : undefined,
  });
  await res.text();
  return { status: res.status, headers: res.headers };
}

describe("docs-mcp-server /mcp* 限流", () => {
  it("(a) 錯誤 token 會被計數,達上限後回 429 並帶 Retry-After", async () => {
    const base = await start();
    for (let i = 0; i < 3; i++) expect((await hit(base, "/mcp", BAD)).status).toBe(401);
    const blocked = await hit(base, "/mcp", BAD);
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("retry-after")).toMatch(/^\d+$/);
    expect((await hit(base, "/mcp/known", BAD, undefined, "GET")).status).toBe(429);
    expect((await hit(base, "/mcp", BAD, undefined, "DELETE")).status).toBe(429);
  });

  it("(b) token 正確的請求不會被計數,被鎖的 IP 帶正確 token 仍可使用", async () => {
    const base = await start();
    for (let i = 0; i < 2; i++) expect((await hit(base, "/mcp", BAD)).status).toBe(401);
    for (let i = 0; i < 5; i++) expect((await hit(base, "/mcp", GOOD, INIT)).status).toBe(200);
    expect((await hit(base, "/mcp", BAD)).status).toBe(401);
    expect((await hit(base, "/mcp", BAD)).status).toBe(429);
    expect((await hit(base, "/mcp", GOOD, INIT)).status).toBe(200);
  });

  it("(c) 未知 corpus 的 404、缺 session 的 400 不會被計數", async () => {
    const base = await start();
    for (let i = 0; i < 5; i++) {
      expect((await hit(base, "/mcp/unknown", GOOD)).status).toBe(404);
      expect((await hit(base, "/mcp", GOOD)).status).toBe(400);
    }
    for (let i = 0; i < 3; i++) expect((await hit(base, "/mcp", BAD)).status).toBe(401);
    expect((await hit(base, "/mcp", BAD)).status).toBe(429);
  });

  it("(d) /health 不受限流影響", async () => {
    const base = await start();
    for (let i = 0; i < 4; i++) await hit(base, "/mcp", BAD);
    const res = await fetch(base + "/health");
    expect(res.status).toBe(200);
    await res.text();
  });

  it("(e) 時間窗到期後解除", async () => {
    const base = await start({ rateLimitWindowMs: 300 });
    for (let i = 0; i < 3; i++) await hit(base, "/mcp", BAD);
    expect((await hit(base, "/mcp", BAD)).status).toBe(429);
    await new Promise((resolve) => setTimeout(resolve, 400));
    expect((await hit(base, "/mcp", BAD)).status).toBe(401);
  });

  it("(f) 回 429 時寫日誌,含次數與時間窗", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const base = await start();
    for (let i = 0; i < 4; i++) await hit(base, "/mcp", BAD);
    const logs = spy.mock.calls.map((args) => args.join(" "));
    expect(logs.some((l) => l.includes("429") && l.includes("4/3") && l.includes("60000ms"))).toBe(true);
  });

  it("(g) 偽造 X-Forwarded-For 無法繞過限流", async () => {
    const base = await start();
    for (let i = 0; i < 3; i++) {
      await hit(base, "/mcp", { ...BAD, "X-Forwarded-For": `10.0.0.${i + 1}` });
    }
    expect((await hit(base, "/mcp", { ...BAD, "X-Forwarded-For": "10.0.0.99" })).status).toBe(429);
  });
});
