import request from "supertest";
import express from "express";
import { TodoController } from "../controllers/todoController";

// Mock the repository
const mockTodoRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

jest.mock("../repositories/todoRepository", () => ({
  TodoRepository: jest.fn().mockImplementation(() => mockTodoRepository),
}));

describe("Todo API Tests", () => {
  let app: express.Application;

  beforeEach(() => {
    jest.clearAllMocks();
    app = express();
    app.use(express.json());

    // Setup routes
    const controller = new TodoController();
    app.get("/todos", (req, res) => controller.getAllTodos(req, res));
    app.get("/todos/:id", (req, res) => controller.getTodoById(req, res));
    app.post("/todos", (req, res) => controller.createTodo(req, res));
    app.put("/todos/:id", (req, res) => controller.updateTodo(req, res));
    app.delete("/todos/:id", (req, res) => controller.deleteTodo(req, res));
  });

  describe("GET /todos", () => {
    it("should return empty array when no todos exist", async () => {
      mockTodoRepository.findAll.mockResolvedValue([]);
      const response = await request(app).get("/todos").expect(200);
      expect(response.body).toEqual([]);
    });
    it("should return todos when they exist", async () => {
      const mockTodos = [
        { id: "1", title: "Todo 1", status: "TODO" },
        { id: "2", title: "Todo 2", status: "DONE" },
      ];
      mockTodoRepository.findAll.mockResolvedValue(mockTodos);
      const response = await request(app).get("/todos").expect(200);
      expect(response.body).toEqual(mockTodos);
    });
  });

  describe("GET /todos/:id", () => {
    it("should return a todo by id", async () => {
      const todo = { id: "1", title: "Test", status: "TODO" };
      mockTodoRepository.findById.mockResolvedValue(todo);
      const response = await request(app).get("/todos/1").expect(200);
      expect(response.body).toEqual(todo);
    });
    it("should return 404 if todo not found", async () => {
      mockTodoRepository.findById.mockResolvedValue(null);
      await request(app)
        .get("/todos/999")
        .expect(404)
        .expect({ error: "Todo not found" });
    });
  });

  describe("POST /todos", () => {
    it("should create a new todo", async () => {
      const newTodo = { title: "New Todo" };
      const createdTodo = { id: "3", title: "New Todo", status: "TODO" };
      mockTodoRepository.create.mockResolvedValue(createdTodo);
      const response = await request(app)
        .post("/todos")
        .send(newTodo)
        .expect(201);
      expect(response.body).toEqual(createdTodo);
    });
    it("should return 400 for missing title", async () => {
      await request(app)
        .post("/todos")
        .send({})
        .expect(400)
        .expect({ error: "Title is required and must be a non-empty string" });
    });
    it("should return 400 for empty title", async () => {
      await request(app)
        .post("/todos")
        .send({ title: "" })
        .expect(400)
        .expect({ error: "Title is required and must be a non-empty string" });
    });
    it("should return 400 for whitespace title", async () => {
      await request(app)
        .post("/todos")
        .send({ title: "   " })
        .expect(400)
        .expect({ error: "Title is required and must be a non-empty string" });
    });
  });

  describe("PUT /todos/:id", () => {
    it("should update a todo", async () => {
      const updatedTodo = { id: "1", title: "Updated", status: "DONE" };
      mockTodoRepository.update.mockResolvedValue(updatedTodo);
      const response = await request(app)
        .put("/todos/1")
        .send({ title: "Updated", status: "DONE" })
        .expect(200);
      expect(response.body).toEqual(updatedTodo);
    });
    it("should return 404 if todo not found", async () => {
      mockTodoRepository.update.mockResolvedValue(null);
      await request(app)
        .put("/todos/999")
        .send({ title: "Updated", status: "DONE" })
        .expect(404)
        .expect({ error: "Todo not found" });
    });
    it("should return 400 for invalid status", async () => {
      await request(app)
        .put("/todos/test-id")
        .send({ status: "INVALID" })
        .expect(400)
        .expect({ error: 'Status must be either "TODO" or "DONE"' });
    });
    it("should return 400 for empty title", async () => {
      await request(app)
        .put("/todos/test-id")
        .send({ title: "" })
        .expect(400)
        .expect({ error: "Title must be a non-empty string" });
    });
  });

  describe("DELETE /todos/:id", () => {
    it("should delete a todo", async () => {
      mockTodoRepository.delete.mockResolvedValue(true);
      const response = await request(app).delete("/todos/1").expect(200);
      expect(response.body).toEqual({ message: "Deleted" });
    });
    it("should return 404 if todo not found", async () => {
      mockTodoRepository.delete.mockResolvedValue(false);
      await request(app)
        .delete("/todos/999")
        .expect(404)
        .expect({ error: "Todo not found" });
    });
  });
});
