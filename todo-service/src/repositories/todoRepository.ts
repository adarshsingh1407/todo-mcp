import { pool } from "../database/connection";
import { Todo, CreateTodoRequest, UpdateTodoRequest } from "../types/todo";
import { v4 as uuidv4 } from "uuid";

export class TodoRepository {
  // Get all todos
  async findAll(): Promise<Todo[]> {
    const query = "SELECT id, title, status FROM todo ORDER BY created_at DESC";
    const result = await pool.query(query);
    return result.rows;
  }

  // Get a single todo by id
  async findById(id: string): Promise<Todo | null> {
    const query = "SELECT id, title, status FROM todo WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  // Create a new todo
  async create(todoData: CreateTodoRequest): Promise<Todo> {
    const id = uuidv4();
    const query =
      "INSERT INTO todo (id, title, status) VALUES ($1, $2, $3) RETURNING id, title, status";
    const values = [id, todoData.title, "TODO"];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Update an existing todo
  async update(id: string, todoData: UpdateTodoRequest): Promise<Todo | null> {
    const existingTodo = await this.findById(id);
    if (!existingTodo) {
      return null;
    }

    const title =
      todoData.title !== undefined ? todoData.title : existingTodo.title;
    const status =
      todoData.status !== undefined ? todoData.status : existingTodo.status;

    // Validate status
    if (status !== "TODO" && status !== "DONE") {
      throw new Error('Invalid status. Must be either "TODO" or "DONE"');
    }

    const query =
      "UPDATE todo SET title = $1, status = $2 WHERE id = $3 RETURNING id, title, status";
    const result = await pool.query(query, [title, status, id]);
    return result.rows[0];
  }

  // Delete a todo
  async delete(id: string): Promise<boolean> {
    const query = "DELETE FROM todo WHERE id = $1";
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }
}
