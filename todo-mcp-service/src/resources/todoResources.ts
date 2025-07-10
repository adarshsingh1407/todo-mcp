import { Resource } from "@modelcontextprotocol/sdk/types.js";
import { TodoClient } from "../api/todoClient.js";

export class TodoResources {
  private todoClient: TodoClient;

  constructor(todoClient: TodoClient) {
    this.todoClient = todoClient;
  }

  async getTodosResource(): Promise<Resource> {
    try {
      const todos = await this.todoClient.getAllTodos();

      return {
        uri: "todos",
        name: "All Todos",
        description: "List of all todos",
        mimeType: "application/json",
        contents: [
          {
            uri: "todos",
            mimeType: "application/json",
            text: JSON.stringify(todos, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(
        `Failed to get todos: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async getTodoResource(id: string): Promise<Resource> {
    try {
      const todo = await this.todoClient.getTodoById(id);

      return {
        uri: `todo/${id}`,
        name: `Todo: ${todo.title}`,
        description: `Todo item with ID ${id}`,
        mimeType: "application/json",
        contents: [
          {
            uri: `todo/${id}`,
            mimeType: "application/json",
            text: JSON.stringify(todo, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(
        `Failed to get todo ${id}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async getTodoStatsResource(): Promise<Resource> {
    try {
      const stats = await this.todoClient.getTodoStats();

      return {
        uri: "todo-stats",
        name: "Todo Statistics",
        description: "Statistics about todos",
        mimeType: "application/json",
        contents: [
          {
            uri: "todo-stats",
            mimeType: "application/json",
            text: JSON.stringify(stats, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new Error(
        `Failed to get todo stats: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async listResources(): Promise<Resource[]> {
    try {
      const todos = await this.todoClient.getAllTodos();
      const stats = await this.todoClient.getTodoStats();

      const resources: Resource[] = [
        {
          uri: "todos",
          name: "All Todos",
          description: `List of all todos (${todos.length} items)`,
          mimeType: "application/json",
        },
        {
          uri: "todo-stats",
          name: "Todo Statistics",
          description: `Statistics: ${stats.total} total, ${stats.completed} completed (${stats.completionRate}%)`,
          mimeType: "application/json",
        },
        // Add individual todo resources
        ...todos.map((todo) => ({
          uri: `todo/${todo.id}`,
          name: `Todo: ${todo.title}`,
          description: `Status: ${todo.status}`,
          mimeType: "application/json",
        })),
      ];

      return resources;
    } catch (error) {
      throw new Error(
        `Failed to list resources: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async readResource(uri: string): Promise<Resource> {
    if (uri === "todos") {
      return this.getTodosResource();
    } else if (uri === "todo-stats") {
      return this.getTodoStatsResource();
    } else if (uri.startsWith("todo/")) {
      const id = uri.replace("todo/", "");
      return this.getTodoResource(id);
    } else {
      throw new Error(`Unknown resource URI: ${uri}`);
    }
  }
}
