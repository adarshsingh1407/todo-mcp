import { Router } from "express";

// Mock express
jest.mock("express", () => ({
  Router: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}));

// Mock the controller
jest.mock("../../controllers/todoController", () => ({
  TodoController: jest.fn(),
}));

describe("Todo Routes", () => {
  let mockRouter: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRouter = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };
    (Router as jest.MockedFunction<typeof Router>).mockReturnValue(mockRouter);
  });

  it("should set up all routes", () => {
    require("../../routes/todoRoutes");

    expect(mockRouter.get).toHaveBeenCalledWith("/todos", expect.any(Function));
    expect(mockRouter.get).toHaveBeenCalledWith(
      "/todos/:id",
      expect.any(Function)
    );
    expect(mockRouter.post).toHaveBeenCalledWith(
      "/todos",
      expect.any(Function)
    );
    expect(mockRouter.put).toHaveBeenCalledWith(
      "/todos/:id",
      expect.any(Function)
    );
    expect(mockRouter.delete).toHaveBeenCalledWith(
      "/todos/:id",
      expect.any(Function)
    );
  });
});
