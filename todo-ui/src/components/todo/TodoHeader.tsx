import TodoFilter from "./TodoFilter";
import type { Todo } from "@/lib/types";

type FilterType = "all" | "done" | "remaining";

interface TodoHeaderProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todos?: Todo[];
}

export default function TodoHeader({
  filter,
  onFilterChange,
  todos,
}: TodoHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white">ToDo MCP Anthropic PoC</h1>
      <TodoFilter
        filter={filter}
        onFilterChange={onFilterChange}
        todos={todos}
      />
    </div>
  );
}
