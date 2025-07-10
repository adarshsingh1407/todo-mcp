import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  TodoServiceError,
} from "../types";

export class TodoClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const message =
          error.response?.data?.error || error.message || "Unknown error";
        const statusCode = error.response?.status || 500;
        throw new TodoServiceError(message, statusCode);
      }
    );
  }

  async getAllTodos(): Promise<Todo[]> {
    const response: AxiosResponse<Todo[]> = await this.client.get("/todos");
    return response.data;
  }

  async getTodoById(id: string): Promise<Todo> {
    const response: AxiosResponse<Todo> = await this.client.get(`/todos/${id}`);
    return response.data;
  }

  async createTodo(todo: CreateTodoRequest): Promise<Todo> {
    const response: AxiosResponse<Todo> = await this.client.post(
      "/todos",
      todo
    );
    return response.data;
  }

  async updateTodo(id: string, todo: UpdateTodoRequest): Promise<Todo> {
    const response: AxiosResponse<Todo> = await this.client.put(
      `/todos/${id}`,
      todo
    );
    return response.data;
  }

  async deleteTodo(id: string): Promise<{ message: string }> {
    const response: AxiosResponse<{ message: string }> =
      await this.client.delete(`/todos/${id}`);
    return response.data;
  }

  async getTodoStats(): Promise<{
    total: number;
    completed: number;
    pending: number;
    completionRate: number;
  }> {
    const todos = await this.getAllTodos();
    const total = todos.length;
    const completed = todos.filter((todo) => todo.status === "DONE").length;
    const pending = total - completed;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    return {
      total,
      completed,
      pending,
      completionRate: Math.round(completionRate * 100) / 100, // Round to 2 decimal places
    };
  }

  // Health check method
  async healthCheck(): Promise<boolean> {
    try {
      await this.client.get("/health");
      return true;
    } catch {
      return false;
    }
  }
}
