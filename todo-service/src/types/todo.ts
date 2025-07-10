export type TodoStatus = "TODO" | "DONE";

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
}

export interface CreateTodoRequest {
  title: string;
}

export interface UpdateTodoRequest {
  title?: string;
  status?: TodoStatus;
}

export interface DeleteTodoResponse {
  message: string;
}
