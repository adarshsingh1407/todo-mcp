// Test setup file
import dotenv from "dotenv";

// Load test environment variables
dotenv.config({ path: ".env.test" });

// Set test environment
process.env.NODE_ENV = "test";
process.env.DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://test_user:test_pass@localhost:5432/test_todo_db";

// Simple test to make this a valid test file
describe("Test Setup", () => {
  it("should load environment variables", () => {
    expect(process.env.NODE_ENV).toBe("test");
  });
});
