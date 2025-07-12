import express from "express";
import { handleMcpRequest } from "./mcpHandler.js";

export function setupRoutes(app: express.Application) {
  // Health check endpoint
  app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // MCP endpoint - stateless Streamable HTTP server
  app.post("/mcp", handleMcpRequest);

  // SSE notifications not supported in stateless mode
  app.get("/mcp", async (_req, res) => {
    console.log("Received GET MCP request");
    res.writeHead(405).end(
      JSON.stringify({
        jsonrpc: "2.0",
        error: {
          code: -32000,
          message: "Method not allowed.",
        },
        id: null,
      })
    );
  });

  // Session termination not needed in stateless mode
  app.delete("/mcp", async (_req, res) => {
    console.log("Received DELETE MCP request");
    res.writeHead(405).end(
      JSON.stringify({
        jsonrpc: "2.0",
        error: {
          code: -32000,
          message: "Method not allowed.",
        },
        id: null,
      })
    );
  });
}
