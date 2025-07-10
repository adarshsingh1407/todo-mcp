const mockPool = {
  query: jest.fn(),
};

jest.mock("../../database/connection", () => ({ pool: mockPool }));

import { TodoRepository } from "../../repositories/todoRepository";
import { v4 as uuidv4 } from "uuid";

jest.mock("uuid", () => ({ v4: () => "mock-uuid" }));

describe("TodoRepository", () => {
  let repo: TodoRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repo = new TodoRepository();
  });

  it("findAll returns todos", async () => {
    const todos = [{ id: "1", title: "A", status: "TODO" }];
    mockPool.query.mockResolvedValue({ rows: todos });
    const result = await repo.findAll();
    expect(result).toEqual(todos);
    expect(mockPool.query).toHaveBeenCalledWith(
      "SELECT id, title, status FROM todo ORDER BY created_at DESC"
    );
  });

  it("findById returns a todo", async () => {
    const todo = { id: "1", title: "A", status: "TODO" };
    mockPool.query.mockResolvedValue({ rows: [todo] });
    const result = await repo.findById("1");
    expect(result).toEqual(todo);
    expect(mockPool.query).toHaveBeenCalledWith(
      "SELECT id, title, status FROM todo WHERE id = $1",
      ["1"]
    );
  });

  it("findById returns null if not found", async () => {
    mockPool.query.mockResolvedValue({ rows: [] });
    const result = await repo.findById("x");
    expect(result).toBeNull();
  });

  it("create inserts and returns todo", async () => {
    const todo = { id: "mock-uuid", title: "B", status: "TODO" };
    mockPool.query.mockResolvedValue({ rows: [todo] });
    const result = await repo.create({ title: "B" });
    expect(result).toEqual(todo);
    expect(mockPool.query).toHaveBeenCalledWith(
      "INSERT INTO todo (id, title, status) VALUES ($1, $2, $3) RETURNING id, title, status",
      ["mock-uuid", "B", "TODO"]
    );
  });

  it("update modifies and returns todo", async () => {
    const orig = { id: "1", title: "A", status: "TODO" };
    const updated = { id: "1", title: "A", status: "DONE" };
    mockPool.query
      .mockResolvedValueOnce({ rows: [orig] }) // findById
      .mockResolvedValueOnce({ rows: [updated] }); // update
    const result = await repo.update("1", { status: "DONE" });
    expect(result).toEqual(updated);
  });

  it("update returns null if not found", async () => {
    mockPool.query.mockResolvedValue({ rows: [] });
    const result = await repo.update("x", { status: "DONE" });
    expect(result).toBeNull();
  });

  it("update throws for invalid status", async () => {
    const orig = { id: "1", title: "A", status: "TODO" };
    mockPool.query.mockResolvedValue({ rows: [orig] });
    await expect(
      repo.update("1", { status: "INVALID" as any })
    ).rejects.toThrow('Invalid status. Must be either "TODO" or "DONE"');
  });

  it("delete returns true if deleted", async () => {
    mockPool.query.mockResolvedValue({ rowCount: 1 });
    const result = await repo.delete("1");
    expect(result).toBe(true);
    expect(mockPool.query).toHaveBeenCalledWith(
      "DELETE FROM todo WHERE id = $1",
      ["1"]
    );
  });

  it("delete returns false if not found", async () => {
    mockPool.query.mockResolvedValue({ rowCount: 0 });
    const result = await repo.delete("x");
    expect(result).toBe(false);
  });
});
