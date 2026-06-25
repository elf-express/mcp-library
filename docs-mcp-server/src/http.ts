/**
 * http.ts — Streamable HTTP transport(由 sqlsugar/http.ts 一般化)
 *
 * 混合端點(模型 B):
 *   - POST /mcp            → 全語料(createServer() 無 scope,docs_* 工具吃 corpus 參數)
 *   - POST /mcp/:corpus    → 鎖定單一語料(createServer(corpus),工具自動限定該書)
 *   未知 corpus 回 404。GET/DELETE 同時掛在兩種路徑上(以 session id 找 transport)。
 *
 * 與 MCP 遠端連接器(Claude Desktop / 網頁版 custom connector)相容。
 */

import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import express, { type Request, type Response } from "express";
import { randomUUID } from "node:crypto";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export interface HttpDeps {
  corporaCount: () => number;
  docCount: () => number;
  hasCorpus: (id: string) => boolean;
}

export async function runHttp(
  createServer: (scope?: string) => McpServer,
  deps: HttpDeps
): Promise<void> {
  const port = parseInt(process.env.PORT || "5690", 10);
  const authToken = process.env.MCP_AUTH_TOKEN?.trim();

  const app = express();
  app.use(express.json({ limit: "8mb" }));

  // 每個 session 一個 transport,以 mcp-session-id 為鍵。
  const transports: Record<string, StreamableHTTPServerTransport> = {};

  // 健康檢查(免驗證)供雲端平台探測。
  app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", corpora: deps.corporaCount(), docs: deps.docCount() });
  });

  function checkAuth(req: Request, res: Response): boolean {
    if (!authToken) return true;
    if ((req.headers.authorization || "") === "Bearer " + authToken) return true;
    res.status(401).json({
      jsonrpc: "2.0",
      error: { code: -32001, message: "Unauthorized: missing or invalid bearer token" },
      id: null,
    });
    return false;
  }

  // Client -> server(及 server 回應)。scope 為 undefined(/mcp)或語料 id(/mcp/:corpus)。
  async function handlePost(scope: string | undefined, req: Request, res: Response): Promise<void> {
    if (!checkAuth(req, res)) return;
    if (scope !== undefined && !deps.hasCorpus(scope)) {
      res.status(404).json({
        jsonrpc: "2.0",
        error: { code: -32004, message: `Unknown corpus: ${scope}` },
        id: null,
      });
      return;
    }
    try {
      const sessionId = req.headers["mcp-session-id"] as string | undefined;
      let transport: StreamableHTTPServerTransport;

      if (sessionId && transports[sessionId]) {
        transport = transports[sessionId];
      } else if (!sessionId && isInitializeRequest(req.body)) {
        transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => randomUUID(),
          onsessioninitialized: (sid) => {
            transports[sid] = transport;
          },
        });
        transport.onclose = () => {
          if (transport.sessionId) delete transports[transport.sessionId];
        };
        const server = createServer(scope);
        await server.connect(transport);
      } else {
        res.status(400).json({
          jsonrpc: "2.0",
          error: { code: -32000, message: "Bad Request: no valid session ID provided" },
          id: null,
        });
        return;
      }
      await transport.handleRequest(req, res, req.body);
    } catch (err) {
      console.error("[docs-mcp] 處理請求失敗:", err);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: "2.0",
          error: { code: -32603, message: "Internal server error" },
          id: null,
        });
      }
    }
  }

  // Server -> client 通知(SSE)與 session 結束。以 session id 找既有 transport,scope 無關。
  const handleSessionRequest = async (req: Request, res: Response) => {
    if (!checkAuth(req, res)) return;
    const sessionId = req.headers["mcp-session-id"] as string | undefined;
    if (!sessionId || !transports[sessionId]) {
      res.status(400).send("Invalid or missing session ID");
      return;
    }
    await transports[sessionId].handleRequest(req, res);
  };

  // 全語料端點
  app.post("/mcp", (req, res) => handlePost(undefined, req, res));
  app.get("/mcp", handleSessionRequest);
  app.delete("/mcp", handleSessionRequest);

  // 單一語料端點(/mcp/<corpus>)
  app.post("/mcp/:corpus", (req, res) => handlePost(req.params.corpus, req, res));
  app.get("/mcp/:corpus", handleSessionRequest);
  app.delete("/mcp/:corpus", handleSessionRequest);

  app.listen(port, () => {
    console.error(
      "[docs-mcp] HTTP server 已啟動:http://0.0.0.0:" + port +
      " (全語料 /mcp;單書 /mcp/<corpus>)"
    );
    console.error("[docs-mcp] 語料數:" + deps.corporaCount() + ",文件數:" + deps.docCount());
    console.error("[docs-mcp] 驗證:" + (authToken ? "已啟用 Bearer Token" : "未啟用 (公開存取)"));
  });
}
