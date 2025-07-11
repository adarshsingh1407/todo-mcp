// Common constants for the todo-mcp project

export const SMART_SUGGESTIONS = {
  ADD_TODO: {
    label: "Add ToDo",
    command: "/add",
    description: "Add a new todo item",
  },
  MARK_DONE: {
    label: "Mark as Done",
    command: "/done",
    description: "Mark a todo as completed",
  },
  MARK_TODO: {
    label: "Mark as Todo",
    command: "/todo",
    description: "Mark a todo as pending",
  },
  DELETE_TODO: {
    label: "Delete Todo",
    command: "/delete",
    description: "Delete a todo item",
  },
  SUMMARIZE_REMAINING: {
    label: "Summarize Remaining",
    command: "/summarize-remaining",
    description: "Get AI summary of pending todos",
  },
  SUMMARIZE_COMPLETED: {
    label: "Summarize Completed",
    command: "/summarize-completed",
    description: "Get AI summary of completed todos",
  },
} as const;

export const MCP_COMMANDS = {
  ADD_TODO: "add-todo",
  MARK_DONE: "mark-done",
  MARK_TODO: "mark-todo",
  DELETE_TODO: "delete-todo",
  SUMMARIZE_REMAINING: "summarise-remaining",
  SUMMARIZE_COMPLETED: "summarise-completed",
} as const;

export const TODO_STATUS = {
  TODO: "TODO",
  DONE: "DONE",
} as const;

export const FILTER_OPTIONS = {
  ALL: "all",
  REMAINING: "remaining",
  COMPLETED: "completed",
} as const;
