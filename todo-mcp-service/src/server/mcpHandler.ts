import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { getConfig } from "../config/index.js";
import { TodoClient } from "../api/todoClient.js";
import { AIClient } from "../api/aiClient.js";
import { registerResources } from "./resources.js";
import { registerTools } from "./tools.js";
import { registerPrompts } from "./prompts.js";

export async function handleMcpRequest(
  req: express.Request,
  res: express.Response
) {
  try {
    const config = getConfig();
    const todoClient = new TodoClient(config.todoServiceUrl);
    const aiClient = new AIClient(config.ai);

    // Create a new instance of transport and server for each request
    // to ensure complete isolation
    const server = new McpServer({
      name: "todo-mcp-server",
      version: "1.0.0",
    });

    // Register all MCP components
    registerResources(server, todoClient);
    registerTools(server, todoClient, aiClient);
    registerPrompts(server);

    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    res.on("close", () => {
      console.log("Request closed");
      transport.close();
      server.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("Error handling MCP request:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      });
    }
  }
}
