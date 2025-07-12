import express from "express";
import { getConfig, validateConfig } from "./config/index.js";
import { setupMiddleware } from "./server/middleware.js";
import { setupRoutes } from "./server/routes.js";

const app = express();

// Setup middleware
setupMiddleware(app);

// Setup routes
setupRoutes(app);

// Start the server
const PORT = process.env["MCP_SERVER_PORT"] || 3001;

// Load and validate configuration
const config = getConfig();
validateConfig(config);

app.listen(PORT, () => {
  console.log(`🚀 Todo MCP Streamable HTTP Server listening on port ${PORT}`);
  console.log(`🌐 HTTP Endpoints:`);
  console.log(`   POST /mcp - MCP client requests`);
  console.log(`   GET  /health - Health check`);
  console.log(
    `📋 Resources: todos://all, todos://remaining, todos://completed`
  );
  console.log(
    `🔧 Tools: add-todo, mark-done, mark-todo, delete-todo, summarise-remaining, summarise-completed`
  );
  console.log(`📝 Prompts: add-todo`);
});
