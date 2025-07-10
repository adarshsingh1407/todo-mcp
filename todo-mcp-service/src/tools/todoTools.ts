import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { TodoClient } from "../api/todoClient.js";
import { AIClient } from "../api/aiClient.js";
import {
  CreateTodoTool,
  UpdateTodoTool,
  DeleteTodoTool,
} from "../types/index.js";

export class TodoTools {
  private todoClient: TodoClient;
  private aiClient: AIClient;

  constructor(todoClient: TodoClient, aiClient: AIClient) {
    this.todoClient = todoClient;
    this.aiClient = aiClient;
  }

  async createTodo(args: CreateTodoTool): Promise<string> {
    try {
      const todo = await this.todoClient.createTodo({
        title: args.title.trim(),
      });

      return `✅ Created todo: "${todo.title}" (ID: ${todo.id})`;
    } catch (error) {
      throw new Error(
        `Failed to create todo: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async updateTodo(args: UpdateTodoTool): Promise<string> {
    try {
      const updateData: any = {};

      if (args.title !== undefined) {
        updateData.title = args.title.trim();
      }
      if (args.status !== undefined) {
        updateData.status = args.status;
      }

      const todo = await this.todoClient.updateTodo(args.id, updateData);

      return `✅ Updated todo: "${todo.title}" (ID: ${todo.id}, Status: ${todo.status})`;
    } catch (error) {
      throw new Error(
        `Failed to update todo: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async deleteTodo(args: DeleteTodoTool): Promise<string> {
    try {
      await this.todoClient.deleteTodo(args.id);
      return `✅ Deleted todo (ID: ${args.id})`;
    } catch (error) {
      throw new Error(
        `Failed to delete todo: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async markComplete(id: string): Promise<string> {
    try {
      const todo = await this.todoClient.updateTodo(id, { status: "DONE" });
      return `✅ Marked todo as complete: "${todo.title}" (ID: ${todo.id})`;
    } catch (error) {
      throw new Error(
        `Failed to mark todo as complete: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async categorizeTodo(id: string, category: string): Promise<string> {
    try {
      // For now, we'll just update the title to include the category
      // In a real implementation, you might have a separate categories field
      const todo = await this.todoClient.getTodoById(id);
      const updatedTitle = `[${category}] ${todo.title}`;

      const updatedTodo = await this.todoClient.updateTodo(id, {
        title: updatedTitle,
      });
      return `✅ Categorized todo: "${updatedTodo.title}" (ID: ${updatedTodo.id})`;
    } catch (error) {
      throw new Error(
        `Failed to categorize todo: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async suggestTodos(prompt: string): Promise<string> {
    try {
      const systemPrompt = `You are a helpful assistant that suggests todo items based on user input. 
      Provide 3-5 specific, actionable todo items. Format each as a clear, concise task.`;

      const response = await this.aiClient.generateResponse(
        prompt,
        systemPrompt
      );
      return `🤖 AI Suggestions:\n\n${response.content}`;
    } catch (error) {
      throw new Error(
        `Failed to generate todo suggestions: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async analyzeProductivity(): Promise<string> {
    try {
      const stats = await this.todoClient.getTodoStats();
      const todos = await this.todoClient.getAllTodos();

      const systemPrompt = `You are a productivity analyst. Analyze the given todo statistics and provide insights and recommendations.`;

      const analysisPrompt = `Analyze these todo statistics and provide productivity insights:

Total Todos: ${stats.total}
Completed: ${stats.completed}
Pending: ${stats.pending}
Completion Rate: ${stats.completionRate}%

Recent Todos:
${todos
  .slice(-5)
  .map((t) => `- ${t.title} (${t.status})`)
  .join("\n")}

Please provide:
1. Productivity assessment
2. Recommendations for improvement
3. Suggested next actions`;

      const response = await this.aiClient.generateResponse(
        analysisPrompt,
        systemPrompt
      );
      return `📊 Productivity Analysis:\n\n${response.content}`;
    } catch (error) {
      throw new Error(
        `Failed to analyze productivity: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  getTools(): Tool[] {
    return [
      {
        name: "create_todo",
        description: "Create a new todo item",
        inputSchema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of the todo item",
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high"],
              description: "Priority level of the todo",
            },
            category: {
              type: "string",
              description: "Category for the todo item",
            },
          },
          required: ["title"],
        },
      },
      {
        name: "update_todo",
        description: "Update an existing todo item",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The ID of the todo to update",
            },
            title: {
              type: "string",
              description: "New title for the todo",
            },
            status: {
              type: "string",
              enum: ["TODO", "DONE"],
              description: "New status for the todo",
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high"],
              description: "Priority level of the todo",
            },
            category: {
              type: "string",
              description: "Category for the todo item",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "delete_todo",
        description: "Delete a todo item",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The ID of the todo to delete",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "mark_complete",
        description: "Mark a todo as complete",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The ID of the todo to mark as complete",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "categorize_todo",
        description: "Add a category to a todo item",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The ID of the todo to categorize",
            },
            category: {
              type: "string",
              description: "The category to assign",
            },
          },
          required: ["id", "category"],
        },
      },
      {
        name: "suggest_todos",
        description: "Get AI-powered todo suggestions based on input",
        inputSchema: {
          type: "object",
          properties: {
            prompt: {
              type: "string",
              description: "Description of what you want to accomplish",
            },
          },
          required: ["prompt"],
        },
      },
      {
        name: "analyze_productivity",
        description: "Get AI-powered productivity analysis of your todos",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ];
  }

  async callTool(name: string, args: any): Promise<string> {
    switch (name) {
      case "create_todo":
        return this.createTodo(args as CreateTodoTool);
      case "update_todo":
        return this.updateTodo(args as UpdateTodoTool);
      case "delete_todo":
        return this.deleteTodo(args as DeleteTodoTool);
      case "mark_complete":
        return this.markComplete(args.id);
      case "categorize_todo":
        return this.categorizeTodo(args.id, args.category);
      case "suggest_todos":
        return this.suggestTodos(args.prompt);
      case "analyze_productivity":
        return this.analyzeProductivity();
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }
}
