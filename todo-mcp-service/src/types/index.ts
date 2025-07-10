// Todo types (matching todo-service)
export interface Todo {
  id: string;
  title: string;
  status: "TODO" | "DONE";
}

export interface CreateTodoRequest {
  title: string;
}

export interface UpdateTodoRequest {
  title?: string;
  status?: "TODO" | "DONE";
}

// AI Provider types
export type AIProvider = "ollama" | "claude";

export interface OllamaConfig {
  url: string;
  model: string;
}

export interface ClaudeConfig {
  apiKey: string;
}

export interface AIConfig {
  provider: AIProvider;
  ollama?: OllamaConfig;
  claude?: ClaudeConfig;
}

// MCP Server Configuration
export interface MCPConfig {
  port: number;
  logLevel: "debug" | "info" | "warn" | "error";
  todoServiceUrl: string;
  ai: AIConfig;
}

// API Response types
export interface APIResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// MCP Resource types
export interface TodoResource {
  id: string;
  title: string;
  status: "TODO" | "DONE";
  createdAt?: string;
  updatedAt?: string;
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}

// MCP Tool types
export interface CreateTodoTool {
  title: string;
  priority?: "low" | "medium" | "high";
  category?: string;
}

export interface UpdateTodoTool {
  id: string;
  title?: string;
  status?: "TODO" | "DONE";
  priority?: "low" | "medium" | "high";
  category?: string;
}

export interface DeleteTodoTool {
  id: string;
}

// AI Response types
export interface AIResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Error types
export class MCPError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "MCPError";
  }
}

export class TodoServiceError extends MCPError {
  constructor(message: string, statusCode: number = 500) {
    super(message, "TODO_SERVICE_ERROR", statusCode);
    this.name = "TodoServiceError";
  }
}

export class AIProviderError extends MCPError {
  constructor(message: string, statusCode: number = 500) {
    super(message, "AI_PROVIDER_ERROR", statusCode);
    this.name = "AIProviderError";
  }
}
