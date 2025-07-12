import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TodoClient } from "../api/todoClient.js";

export function registerResources(server: McpServer, todoClient: TodoClient) {
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
}
