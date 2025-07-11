import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Circle, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TODO_STATUS } from "@/lib/constants";
import type { Todo } from "@/lib/types";

interface TodoTableProps {
  todos: Todo[];
  onTodoIdClick?: (todoId: string) => void;
  onTodoDelete?: (todoId: string) => void;
}

export default function TodoTable({
  todos,
  onTodoIdClick,
  onTodoDelete,
}: TodoTableProps) {
  if (todos.length === 0) {
    return (
      <div className="rounded-md border border-gray-600 min-h-[400px] flex flex-col">
        <Table className="flex-1">
          <TableHeader>
            <TableRow className="bg-gray-800/50">
              <TableHead className="text-gray-300 font-medium pl-8">
                Title
              </TableHead>
              <TableHead className="text-gray-300 font-medium text-right w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} className="text-center py-8">
                <div className="text-gray-400">
                  No todos found in this filter. Add some todos via the chat!
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-gray600 h-full flex flex-col">
      <div className="flex-1">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800/50 sticky top-0">
              <TableHead className="text-gray-300 font-medium pl-8">
                Title
              </TableHead>
              <TableHead className="text-gray-300 font-medium text-right w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo) => (
              <TableRow
                key={todo.id}
                className="hover:bg-gray-800/30 transition-colors"
              >
                <TableCell className="font-medium pl-8">
                  <div className="flex items-center space-x-3">
                    {todo.status === TODO_STATUS.DONE ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <Circle className="h-4 w-4 text-gray-400" />
                    )}
                    <span
                      className={`text-gray-300 ${
                        todo.status === TODO_STATUS.DONE
                          ? "line-through text-gray-500"
                          : ""
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    {onTodoIdClick && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                        onClick={() => onTodoIdClick(todo.id)}
                        title="Copy todo ID to chat"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    )}
                    {onTodoDelete && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-500/10"
                        onClick={() => onTodoDelete(todo.id)}
                        title="Delete todo"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
