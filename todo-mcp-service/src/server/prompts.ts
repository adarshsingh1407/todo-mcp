import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerPrompts(server: McpServer) {
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
}
