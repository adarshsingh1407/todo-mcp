import TodoList from "@/components/TodoList";
import Chat from "@/components/Chat";

export default function HomePage() {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Left: Todo List */}
      <section className="w-1/2 h-full bg-gray-800/30 backdrop-blur-xl p-6 overflow-y-auto relative">
        <div className="absolute right-0 top-5 bottom-5 w-px bg-gray-600"></div>
        <TodoList />
      </section>
      {/* Right: Chat */}
      <section className="w-1/2 h-full bg-gray-800/30 backdrop-blur-xl p-6 flex flex-col">
        <Chat />
      </section>
    </main>
  );
}
