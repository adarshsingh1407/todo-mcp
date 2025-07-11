import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Todo } from "@/lib/types";
import { TODO_STATUS } from "@/lib/constants";

type FilterType = "all" | "done" | "remaining";

interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todos?: Todo[];
}

export default function TodoFilter({
  filter,
  onFilterChange,
  todos,
}: TodoFilterProps) {
  const doneCount =
    todos?.filter((t) => t.status === TODO_STATUS.DONE).length || 0;
  const remainingCount =
    todos?.filter((t) => t.status === TODO_STATUS.TODO).length || 0;
  const totalCount = todos?.length || 0;

  return (
    <Select
      value={filter}
      onValueChange={(value) => onFilterChange(value as FilterType)}
    >
      <SelectTrigger className="w-[200px] bg-gray-900/50 backdrop-blur-sm border-gray-600 text-white focus:ring-2 focus:ring-blue-500">
        <SelectValue placeholder="Select filter" />
      </SelectTrigger>
      <SelectContent className="bg-gray-900/50 backdrop-blur-sm border-gray-600">
        <SelectItem value="all">View All ({totalCount})</SelectItem>
        <SelectItem value="done">View Done ({doneCount})</SelectItem>
        <SelectItem value="remaining">
          View Remaining ({remainingCount})
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
