import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import express, { type Request, type Response } from "express";
import { randomUUID } from "node:crypto";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Run the MCP server over Streamable HTTP with proper session management.
 * Compatible with MCP remote connectors (Claude Desktop custom connectors).
 */
export async function runHttp(
  createServer: () => McpServer,
  notesCount: () => number
): Promise<void> {
  console.error("[sqlsugar-notes-mcp] 載入 " + notesCount() + " 篇 .md 筆記");
  const port = parseInt(process.env.PORT || "5688", 10);
  const authToken = process.env.MCP_AUTH_TOKEN?.trim();

  const app = express();
  app.use(express.json({ limit: "4mb" }));

  // Per-session transports, keyed by mcp-session-id.
  const transports: Record<string, StreamableHTTPServerTransport> = {};

  // Health check (no auth) for cloud platform probes.
  app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", notes: notesCount() });
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

  // Client -> server (and server responses).
  app.post("/mcp", async (req: Request, res: Response) => {
    if (!checkAuth(req, res)) return;
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
        const server = createServer();
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
      console.error("[sqlsugar-notes-mcp] 處理請求失敗:", err);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: "2.0",
          error: { code: -32603, message: "Internal server error" },
          id: null,
        });
      }
    }
  });

  // Server -> client notifications (SSE) and session teardown.
  const handleSessionRequest = async (req: Request, res: Response) => {
    if (!checkAuth(req, res)) return;
    const sessionId = req.headers["mcp-session-id"] as string | undefined;
    if (!sessionId || !transports[sessionId]) {
      res.status(400).send("Invalid or missing session ID");
      return;
    }
    await transports[sessionId].handleRequest(req, res);
  };
  app.get("/mcp", handleSessionRequest);
  app.delete("/mcp", handleSessionRequest);

  app.listen(port, () => {
    console.error("[sqlsugar-notes-mcp] HTTP server 已啟動:http://0.0.0.0:" + port + "/mcp");
    console.error("[sqlsugar-notes-mcp] 驗證:" + (authToken ? "已啟用 Bearer Token" : "未啟用 (公開存取)"));
  });
}
