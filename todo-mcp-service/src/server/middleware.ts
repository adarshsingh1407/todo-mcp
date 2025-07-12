import express from "express";
import cors from "cors";

export function setupMiddleware(app: express.Application) {
  app.use(express.json());

  // Add CORS middleware for browser-based clients
  app.use(
    cors({
      origin: "*", // Configure appropriately for production
      exposedHeaders: ["Mcp-Session-Id"],
      allowedHeaders: ["Content-Type", "mcp-session-id"],
    })
  );
}
