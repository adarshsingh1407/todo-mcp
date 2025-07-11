"use client";

import { useTodos } from "@/lib/hooks";
import { useState } from "react";
import { TODO_STATUS } from "@/lib/constants";
import TodoHeader from "./todo/TodoHeader";
import TodoTable from "./todo/TodoTable";
import TodoTableLoading from "./todo/TodoTableLoading";

type FilterType = "all" | "done" | "remaining";

interface TodoListProps {
  onTodoIdClick?: (todoId: string) => void;
  onTodoDelete?: (todoId: string) => void;
}

export default function TodoList({
  onTodoIdClick,
  onTodoDelete,
}: TodoListProps) {
  const { data: todos, isLoading, error } = useTodos();
  const [filter, setFilter] = useState<FilterType>("all");

  // Filter todos based on selected filter
  const filteredTodos =
    todos?.filter((todo) => {
      switch (filter) {
        case "done":
          return todo.status === TODO_STATUS.DONE;
        case "remaining":
          return todo.status === TODO_STATUS.TODO;
        default:
          return true; // "all"
      }
    }) || [];

  return (
    <div className="h-full flex flex-col">
      <TodoHeader filter={filter} onFilterChange={setFilter} todos={todos} />
      <div className="flex-1 mt-4">
        {isLoading ? (
          <TodoTableLoading />
        ) : error ? (
          <div className="text-red-400 bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-600">
            Error loading todos: {error.message}
          </div>
        ) : (
          <TodoTable
            todos={filteredTodos}
            onTodoIdClick={onTodoIdClick}
            onTodoDelete={onTodoDelete}
          />
        )}
      </div>
    </div>
  );
}
