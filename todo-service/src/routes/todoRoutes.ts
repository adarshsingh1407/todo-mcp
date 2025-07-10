import { Router, Request, Response } from "express";
import { TodoController } from "../controllers/todoController";

const router: Router = Router();
const todoController = new TodoController();

// GET /todos - Get all todos
router.get("/todos", (req: Request, res: Response) =>
  todoController.getAllTodos(req, res)
);

// GET /todos/:id - Get a single todo by id
router.get("/todos/:id", (req: Request, res: Response) =>
  todoController.getTodoById(req, res)
);

// POST /todos - Create a new todo
router.post("/todos", (req: Request, res: Response) =>
  todoController.createTodo(req, res)
);

// PUT /todos/:id - Update an existing todo
router.put("/todos/:id", (req: Request, res: Response) =>
  todoController.updateTodo(req, res)
);

// DELETE /todos/:id - Delete a todo
router.delete("/todos/:id", (req: Request, res: Response) =>
  todoController.deleteTodo(req, res)
);

export default router;
