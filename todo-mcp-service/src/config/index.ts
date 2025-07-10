import dotenv from "dotenv";
import { MCPConfig, AIConfig, AIProvider } from "../types";

// Load environment variables
dotenv.config();

function getAIProvider(): AIProvider {
  const useClaude = process.env["USE_CLAUDE_API"] === "true";
  return useClaude ? "claude" : "ollama";
}

function getAIConfig(): AIConfig {
  const provider = getAIProvider();

  if (provider === "claude") {
    const apiKey = process.env["CLAUDE_API_KEY"];
    if (!apiKey) {
      throw new Error("CLAUDE_API_KEY is required when USE_CLAUDE_API=true");
    }

    return {
      provider: "claude",
      claude: {
        apiKey,
      },
    };
  } else {
    return {
      provider: "ollama",
      ollama: {
        url: process.env["OLLAMA_URL"] || "http://localhost:11434",
        model: process.env["OLLAMA_MODEL"] || "tinyllama",
      },
    };
  }
}

export function getConfig(): MCPConfig {
  const port = parseInt(process.env["MCP_SERVER_PORT"] || "3001", 10);
  const logLevel = (process.env["LOG_LEVEL"] || "info") as
    | "debug"
    | "info"
    | "warn"
    | "error";
  const todoServiceUrl =
    process.env["TODO_SERVICE_URL"] || "http://localhost:3000";

  if (isNaN(port) || port < 1 || port > 65535) {
    throw new Error("MCP_SERVER_PORT must be a valid port number (1-65535)");
  }

  return {
    port,
    logLevel,
    todoServiceUrl,
    ai: getAIConfig(),
  };
}

export function validateConfig(config: MCPConfig): void {
  // Validate todo service URL
  try {
    new URL(config.todoServiceUrl);
  } catch {
    throw new Error("TODO_SERVICE_URL must be a valid URL");
  }

  // Validate AI configuration
  if (config.ai.provider === "claude") {
    if (!config.ai.claude?.apiKey) {
      throw new Error("CLAUDE_API_KEY is required for Claude provider");
    }
  } else if (config.ai.provider === "ollama") {
    if (!config.ai.ollama?.url) {
      throw new Error("OLLAMA_URL is required for Ollama provider");
    }
    if (!config.ai.ollama?.model) {
      throw new Error("OLLAMA_MODEL is required for Ollama provider");
    }
  }

  console.log(`MCP Server Configuration:
  Port: ${config.port}
  Log Level: ${config.logLevel}
  Todo Service URL: ${config.todoServiceUrl}
  AI Provider: ${config.ai.provider}
  ${
    config.ai.provider === "ollama"
      ? `Ollama URL: ${config.ai.ollama?.url}\n  Ollama Model: ${config.ai.ollama?.model}`
      : `Claude API: Configured`
  }
`);
}
