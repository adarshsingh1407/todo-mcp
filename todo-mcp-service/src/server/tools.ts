import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { TodoClient } from "../api/todoClient.js";
import { AIClient } from "../api/aiClient.js";
import { Todo } from "../types/index.js";

export function registerTools(
  server: McpServer,
  todoClient: TodoClient,
  aiClient: AIClient
) {
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

        const remainingString = remaining
          .map((todo: Todo) => todo.title)
          .join("\n");

        const summary = await aiClient.generateResponse(
          `Summarize this list of todos in one sentence: ${remainingString}`,
          "You are a helpful assistant that summarizes todo lists. Respond in a natural, conversational tone as if you're talking to a friend. Write a single coherent sentence that flows naturally and sounds human. Avoid robotic or formal language. For example, instead of 'The remaining tasks are...' say something like 'You still need to...' or 'You have a few things left to do including...'"
        );
        console.log(JSON.stringify(summary));
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

        const completedString = completed
          .map((todo: Todo) => todo.title)
          .join("\n");

        const summary = await aiClient.generateResponse(
          `Summarize this list of todos in one sentence: ${completedString}`,
          "You are a helpful assistant that summarizes todo lists. Respond in a natural, conversational tone as if you're talking to a friend. Write a single coherent sentence that flows naturally and sounds human. Avoid robotic or formal language. For example, instead of 'The completed tasks are...' say something like 'You've already finished...' or 'You've completed several things including...'"
        );
        console.log(JSON.stringify(summary));
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
}
