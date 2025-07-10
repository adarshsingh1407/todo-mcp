import { Request, Response } from "express";
import { TodoController } from "../../controllers/todoController";
import { TodoRepository } from "../../repositories/todoRepository";
import { Todo, TodoStatus } from "../../types/todo";

// Mock the repository
jest.mock("../../repositories/todoRepository");

describe("TodoController", () => {
  let controller: TodoController;
  let mockRepository: jest.Mocked<TodoRepository>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockJson = jest.fn().mockReturnThis();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };
    mockRequest = {};
    controller = new TodoController();
    mockRepository = new TodoRepository() as jest.Mocked<TodoRepository>;
    (controller as any).todoRepository = mockRepository;
  });

  describe("getAllTodos", () => {
    it("should return all todos", async () => {
      const mockTodos: Todo[] = [
        { id: "1", title: "Test 1", status: "TODO" },
        { id: "2", title: "Test 2", status: "DONE" },
      ];
      mockRepository.findAll.mockResolvedValue(mockTodos);

      await controller.getAllTodos(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(mockTodos);
    });

    it("should handle repository errors", async () => {
      const error = new Error("Database error");
      mockRepository.findAll.mockRejectedValue(error);

      await controller.getAllTodos(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("getTodoById", () => {
    it("should return a todo by id", async () => {
      const mockTodo: Todo = { id: "1", title: "Test", status: "TODO" };
      mockRepository.findById.mockResolvedValue(mockTodo);
      mockRequest.params = { id: "1" };

      await controller.getTodoById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockRepository.findById).toHaveBeenCalledWith("1");
      expect(mockJson).toHaveBeenCalledWith(mockTodo);
    });

    it("should return 404 when todo not found", async () => {
      mockRepository.findById.mockResolvedValue(null);
      mockRequest.params = { id: "999" };

      await controller.getTodoById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: "Todo not found" });
    });

    it("should handle repository errors", async () => {
      const error = new Error("Database error");
      mockRepository.findById.mockRejectedValue(error);
      mockRequest.params = { id: "1" };

      await controller.getTodoById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("createTodo", () => {
    it("should create a new todo", async () => {
      const mockTodo: Todo = { id: "1", title: "New Todo", status: "TODO" };
      mockRepository.create.mockResolvedValue(mockTodo);
      mockRequest.body = { title: "New Todo" };

      await controller.createTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockRepository.create).toHaveBeenCalledWith({ title: "New Todo" });
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(mockTodo);
    });

    it("should trim title when creating todo", async () => {
      const mockTodo: Todo = { id: "1", title: "Trimmed Todo", status: "TODO" };
      mockRepository.create.mockResolvedValue(mockTodo);
      mockRequest.body = { title: "  Trimmed Todo  " };

      await controller.createTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockRepository.create).toHaveBeenCalledWith({
        title: "Trimmed Todo",
      });
    });

    it("should return 400 for missing title", async () => {
      mockRequest.body = {};

      await controller.createTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Title is required and must be a non-empty string",
      });
    });

    it("should return 400 for empty title", async () => {
      mockRequest.body = { title: "" };

      await controller.createTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Title is required and must be a non-empty string",
      });
    });

    it("should return 400 for whitespace-only title", async () => {
      mockRequest.body = { title: "   " };

      await controller.createTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Title is required and must be a non-empty string",
      });
    });

    it("should return 400 for non-string title", async () => {
      mockRequest.body = { title: 123 };

      await controller.createTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Title is required and must be a non-empty string",
      });
    });

    it("should handle repository errors", async () => {
      const error = new Error("Database error");
      mockRepository.create.mockRejectedValue(error);
      mockRequest.body = { title: "Test" };

      await controller.createTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("updateTodo", () => {
    it("should update a todo", async () => {
      const mockTodo: Todo = { id: "1", title: "Updated Todo", status: "DONE" };
      mockRepository.update.mockResolvedValue(mockTodo);
      mockRequest.params = { id: "1" };
      mockRequest.body = { title: "Updated Todo", status: "DONE" };

      await controller.updateTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockRepository.update).toHaveBeenCalledWith("1", {
        title: "Updated Todo",
        status: "DONE",
      });
      expect(mockJson).toHaveBeenCalledWith(mockTodo);
    });

    it("should return 404 when todo not found", async () => {
      mockRepository.update.mockResolvedValue(null);
      mockRequest.params = { id: "999" };
      mockRequest.body = { title: "Updated Todo" };

      await controller.updateTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: "Todo not found" });
    });

    it("should return 400 for empty title", async () => {
      mockRequest.params = { id: "1" };
      mockRequest.body = { title: "" };

      await controller.updateTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Title must be a non-empty string",
      });
    });

    it("should return 400 for whitespace-only title", async () => {
      mockRequest.params = { id: "1" };
      mockRequest.body = { title: "   " };

      await controller.updateTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Title must be a non-empty string",
      });
    });

    it("should return 400 for invalid status", async () => {
      mockRequest.params = { id: "1" };
      mockRequest.body = { status: "INVALID" };

      await controller.updateTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Status must be either "TODO" or "DONE"',
      });
    });

    it("should handle repository errors with invalid status", async () => {
      const error = new Error("Invalid status");
      mockRepository.update.mockRejectedValue(error);
      mockRequest.params = { id: "1" };
      mockRequest.body = { status: "INVALID" };

      await controller.updateTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Status must be either "TODO" or "DONE"',
      });
    });

    it("should handle general repository errors", async () => {
      const error = new Error("Database error");
      mockRepository.update.mockRejectedValue(error);
      mockRequest.params = { id: "1" };
      mockRequest.body = { title: "Updated Todo" };

      await controller.updateTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("deleteTodo", () => {
    it("should delete a todo", async () => {
      mockRepository.delete.mockResolvedValue(true);
      mockRequest.params = { id: "1" };

      await controller.deleteTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockRepository.delete).toHaveBeenCalledWith("1");
      expect(mockJson).toHaveBeenCalledWith({ message: "Deleted" });
    });

    it("should return 404 when todo not found", async () => {
      mockRepository.delete.mockResolvedValue(false);
      mockRequest.params = { id: "999" };

      await controller.deleteTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: "Todo not found" });
    });

    it("should handle repository errors", async () => {
      const error = new Error("Database error");
      mockRepository.delete.mockRejectedValue(error);
      mockRequest.params = { id: "1" };

      await controller.deleteTodo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });
});
