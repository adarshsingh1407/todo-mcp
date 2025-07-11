"use client";

import { useState } from "react";
import TodoList from "@/components/TodoList";
import Chat from "@/components/Chat";

export default function HomePage() {
  const [selectedTodoId, setSelectedTodoId] = useState<string>("");

  const handleTodoIdClick = (todoId: string) => {
    setSelectedTodoId(todoId);
  };

  const handleTodoDelete = (todoId: string) => {
    // Set the todo ID for deletion command
    setSelectedTodoId(todoId);
  };

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Left: Todo List */}
      <section className="w-1/2 h-full bg-gray-800/30 backdrop-blur-xl p-6 relative">
        <div className="absolute right-0 top-5 bottom-5 w-px bg-gray-600"></div>
        <TodoList
          onTodoIdClick={handleTodoIdClick}
          onTodoDelete={handleTodoDelete}
        />
      </section>
      {/* Right: Chat */}
      <section className="w-1/2 h-full bg-gray-800/30 backdrop-blur-xl p-6 flex flex-col">
        <Chat
          selectedTodoId={selectedTodoId}
          onTodoIdUsed={() => setSelectedTodoId("")}
        />
      </section>
    </main>
  );
}
