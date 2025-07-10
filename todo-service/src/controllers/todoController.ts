import { Request, Response } from "express";
import { TodoRepository } from "../repositories/todoRepository";
import {
  CreateTodoRequest,
  UpdateTodoRequest,
  DeleteTodoResponse,
} from "../types/todo";

export class TodoController {
  private todoRepository: TodoRepository;

  constructor() {
    this.todoRepository = new TodoRepository();
  }

  // GET /todos - Get all todos
  async getAllTodos(req: Request, res: Response): Promise<void> {
    try {
      const todos = await this.todoRepository.findAll();
      res.json(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // GET /todos/:id - Get a single todo by id
  async getTodoById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const todo = await this.todoRepository.findById(id);

      if (!todo) {
        res.status(404).json({ error: "Todo not found" });
        return;
      }

      res.json(todo);
    } catch (error) {
      console.error("Error fetching todo:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // POST /todos - Create a new todo
  async createTodo(req: Request, res: Response): Promise<void> {
    try {
      const { title }: CreateTodoRequest = req.body;

      if (!title || typeof title !== "string" || title.trim() === "") {
        res
          .status(400)
          .json({ error: "Title is required and must be a non-empty string" });
        return;
      }

      const todo = await this.todoRepository.create({ title: title.trim() });
      res.status(201).json(todo);
    } catch (error) {
      console.error("Error creating todo:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // PUT /todos/:id - Update an existing todo
  async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateTodoRequest = req.body;

      // Validate input
      if (
        updateData.title !== undefined &&
        (typeof updateData.title !== "string" || updateData.title.trim() === "")
      ) {
        res.status(400).json({ error: "Title must be a non-empty string" });
        return;
      }

      if (
        updateData.status !== undefined &&
        !["TODO", "DONE"].includes(updateData.status)
      ) {
        res
          .status(400)
          .json({ error: 'Status must be either "TODO" or "DONE"' });
        return;
      }

      const updatedTodo = await this.todoRepository.update(id, updateData);

      if (!updatedTodo) {
        res.status(404).json({ error: "Todo not found" });
        return;
      }

      res.json(updatedTodo);
    } catch (error) {
      console.error("Error updating todo:", error);
      if (error instanceof Error && error.message.includes("Invalid status")) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // DELETE /todos/:id - Delete a todo
  async deleteTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.todoRepository.delete(id);

      if (!deleted) {
        res.status(404).json({ error: "Todo not found" });
        return;
      }

      const response: DeleteTodoResponse = { message: "Deleted" };
      res.json(response);
    } catch (error) {
      console.error("Error deleting todo:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
