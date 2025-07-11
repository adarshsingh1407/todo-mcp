import express from "express";
import cors from "cors";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import { getConfig, validateConfig } from "./config/index.js";
import { TodoClient } from "./api/todoClient.js";
import { AIClient } from "./api/aiClient.js";

const app = express();
app.use(express.json());

// Add CORS middleware for browser-based clients
app.use(
  cors({
    origin: "*", // Configure appropriately for production
    exposedHeaders: ["Mcp-Session-Id"],
    allowedHeaders: ["Content-Type", "mcp-session-id"],
  })
);

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// MCP endpoint - stateless Streamable HTTP server
app.post("/mcp", async (req, res) => {
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

    // Register resources
    server.registerResource(
      "all-todos",
      "todos://all",
      {
        title: "All Todos",
        description: "Get all todos from the todo service",
        mimeType: "application/json",
      },
      async (uri) => {
        try {
          const todos = await todoClient.getAllTodos();
          return {
            contents: [
              {
                uri: uri.href,
                text: JSON.stringify(todos, null, 2),
                mimeType: "application/json",
              },
            ],
          };
        } catch (error) {
          return {
            contents: [
              {
                uri: uri.href,
                text: `Error fetching todos: ${error}`,
                mimeType: "text/plain",
              },
            ],
          };
        }
      }
    );

    server.registerResource(
      "remaining-todos",
      "todos://remaining",
      {
        title: "Remaining Todos",
        description: "Get all todos with status TODO",
        mimeType: "application/json",
      },
      async (uri) => {
        try {
          const todos = await todoClient.getAllTodos();
          const remaining = todos.filter((todo: any) => todo.status === "TODO");
          return {
            contents: [
              {
                uri: uri.href,
                text: JSON.stringify(remaining, null, 2),
                mimeType: "application/json",
              },
            ],
          };
        } catch (error) {
          return {
            contents: [
              {
                uri: uri.href,
                text: `Error fetching remaining todos: ${error}`,
                mimeType: "text/plain",
              },
            ],
          };
        }
      }
    );

    server.registerResource(
      "completed-todos",
      "todos://completed",
      {
        title: "Completed Todos",
        description: "Get all todos with status DONE",
        mimeType: "application/json",
      },
      async (uri) => {
        try {
          const todos = await todoClient.getAllTodos();
          const completed = todos.filter((todo: any) => todo.status === "DONE");
          return {
            contents: [
              {
                uri: uri.href,
                text: JSON.stringify(completed, null, 2),
                mimeType: "application/json",
              },
            ],
          };
        } catch (error) {
          return {
            contents: [
              {
                uri: uri.href,
                text: `Error fetching completed todos: ${error}`,
                mimeType: "text/plain",
              },
            ],
          };
        }
      }
    );

    // Register tools using the correct format from MCP SDK docs
    server.registerTool(
      "add-todo",
      {
        title: "Add Todo",
        description: "Add a new todo",
        inputSchema: { title: z.string() },
      },
      async (args: any) => {
        try {
          const todo = await todoClient.createTodo({ title: args.title });
          return {
            content: [
              {
                type: "text" as const,
                text: `✅ Added: ${todo.title}`,
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text" as const,
                text: `Error creating todo: ${error}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    server.registerTool(
      "mark-done",
      {
        title: "Mark as DONE",
        description: "Mark a todo as DONE",
        inputSchema: { id: z.string() },
      },
      async (args: any) => {
        try {
          const todo = await todoClient.updateTodo(args.id, { status: "DONE" });
          return {
            content: [
              {
                type: "text" as const,
                text: `✅ Marked as DONE: ${todo.title}`,
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text" as const,
                text: `Error marking todo as done: ${error}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    server.registerTool(
      "mark-todo",
      {
        title: "Mark as TODO",
        description: "Mark a todo as TODO",
        inputSchema: { id: z.string() },
      },
      async (args: any) => {
        try {
          const todo = await todoClient.updateTodo(args.id, { status: "TODO" });
          return {
            content: [
              {
                type: "text" as const,
                text: `✅ Marked as TODO: ${todo.title}`,
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text" as const,
                text: `Error marking todo as todo: ${error}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    server.registerTool(
      "delete-todo",
      {
        title: "Delete Todo",
        description: "Delete a todo",
        inputSchema: { id: z.string() },
      },
      async (args: any) => {
        try {
          await todoClient.deleteTodo(args.id);
          return {
            content: [
              {
                type: "text" as const,
                text: `🗑️ Deleted todo`,
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text" as const,
                text: `Error deleting todo: ${error}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    server.registerTool(
      "summarise-remaining",
      {
        title: "Summarise Remaining Todos",
        description: "AI summary of what is left to do",
        inputSchema: {},
      },
      async () => {
        try {
          const todos = await todoClient.getAllTodos();
          const remaining = todos.filter((todo: any) => todo.status === "TODO");

          if (remaining.length === 0) {
            return {
              content: [
                {
                  type: "text" as const,
                  text: "No remaining todos to summarize.",
                },
              ],
            };
          }

          const summary = await aiClient.generateResponse(
            `Please provide a concise summary of these remaining todos: ${JSON.stringify(
              remaining,
              null,
              2
            )}`,
            "You are a helpful assistant that summarizes todo lists."
          );
          return {
            content: [
              {
                type: "text" as const,
                text: summary.content,
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text" as const,
                text: `Error generating AI summary: ${error}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    server.registerTool(
      "summarise-completed",
      {
        title: "Summarise Completed Todos",
        description: "AI summary of what has already been done",
        inputSchema: {},
      },
      async () => {
        try {
          const todos = await todoClient.getAllTodos();
          const completed = todos.filter((todo: any) => todo.status === "DONE");

          if (completed.length === 0) {
            return {
              content: [
                {
                  type: "text" as const,
                  text: "No completed todos to summarize.",
                },
              ],
            };
          }

          const summary = await aiClient.generateResponse(
            `Please provide a concise summary of these completed todos: ${JSON.stringify(
              completed,
              null,
              2
            )}`,
            "You are a helpful assistant that summarizes completed todo lists."
          );
          return {
            content: [
              {
                type: "text" as const,
                text: summary.content,
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text" as const,
                text: `Error generating AI summary: ${error}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

    // Register prompts
    server.registerPrompt(
      "add-todo",
      {
        title: "Add Todo Prompt",
        description: "A prompt template for adding a new todo to the list",
        argsSchema: { title: z.string() },
      },
      ({ title }) => ({
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Please add a new todo with the title: "${title}"`,
            },
          },
        ],
      })
    );

    // Register a combined prompt-and-execute tool
    server.registerTool(
      "add-todo-with-prompt",
      {
        title: "Add Todo with Prompt",
        description: "Add a new todo and show the prompt message",
        inputSchema: { title: z.string() },
      },
      async (args: any) => {
        try {
          const todo = await todoClient.createTodo({ title: args.title });
          return {
            content: [
              {
                type: "text" as const,
                text: `📝 Prompt: "Please add a new todo with the title: '${args.title}'"\n✅ Successfully added todo: "${todo.title}"`,
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text" as const,
                text: `📝 Prompt: "Please add a new todo with the title: '${args.title}'"\n❌ Error adding todo: ${error}`,
              },
            ],
            isError: true,
          };
        }
      }
    );

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
});

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
