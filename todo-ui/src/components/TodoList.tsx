"use client";

import { useTodos } from "@/lib/hooks";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Circle } from "lucide-react";
import { useState } from "react";

type FilterType = "all" | "done" | "remaining";

export default function TodoList() {
  const { data: todos, isLoading, error } = useTodos();
  const [filter, setFilter] = useState<FilterType>("all");

  // Filter todos based on selected filter
  const filteredTodos =
    todos?.filter((todo) => {
      switch (filter) {
        case "done":
          return todo.status === "DONE";
        case "remaining":
          return todo.status === "TODO";
        default:
          return true; // "all"
      }
    }) || [];

  if (isLoading) {
    return (
      <div className="h-full">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            ToDo MCP Anthropic PoC
          </h1>
          <Select
            value={filter}
            onValueChange={(value) => setFilter(value as FilterType)}
          >
            <SelectTrigger className="w-[200px] bg-gray-900/50 backdrop-blur-sm border-gray-600 text-white focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Select filter" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900/50 backdrop-blur-sm border-gray-600">
              <SelectItem value="all">View All</SelectItem>
              <SelectItem value="done">View Done</SelectItem>
              <SelectItem value="remaining">View Remaining</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-gray-300 bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-600">
          Loading todos...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            ToDo MCP Anthropic PoC
          </h1>
          <Select
            value={filter}
            onValueChange={(value) => setFilter(value as FilterType)}
          >
            <SelectTrigger className="w-[200px] bg-gray-900/50 backdrop-blur-sm border-gray-600 text-white focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Select filter" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900/50 backdrop-blur-sm border-gray-600">
              <SelectItem value="all">View All</SelectItem>
              <SelectItem value="done">View Done</SelectItem>
              <SelectItem value="remaining">View Remaining</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-red-400 bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-600">
          Error loading todos: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          ToDo MCP Anthropic PoC
        </h1>
        <Select
          value={filter}
          onValueChange={(value) => setFilter(value as FilterType)}
        >
          <SelectTrigger className="w-[200px] bg-gray-900/50 backdrop-blur-sm border-gray-600 text-white focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900/50 backdrop-blur-sm border-gray-600">
            <SelectItem value="all">View All ({todos?.length || 0})</SelectItem>
            <SelectItem value="done">
              View Done ({todos?.filter((t) => t.status === "DONE").length || 0}
              )
            </SelectItem>
            <SelectItem value="remaining">
              View Remaining (
              {todos?.filter((t) => t.status === "TODO").length || 0})
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between py-2 px-1 hover:bg-gray-800/30 transition-colors rounded"
            >
              <div className="flex items-center space-x-3">
                {todo.status === "DONE" ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <Circle className="h-4 w-4 text-gray-400" />
                )}
                <span
                  className={`text-gray-300 ${
                    todo.status === "DONE" ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <Badge
                variant={todo.status === "DONE" ? "default" : "secondary"}
                className={`text-xs ${
                  todo.status === "DONE" ? "bg-green-600" : "bg-gray-600"
                }`}
              >
                {todo.status}
              </Badge>
            </div>
          ))
        ) : (
          <div className="text-gray-400 bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-600 text-center">
            No todos found in this filter. Add some todos via the chat!
          </div>
        )}
      </div>
    </div>
  );
}
