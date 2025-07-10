export type Todo = {
  id: string;
  title: string;
  status: "TODO" | "DONE";
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};
