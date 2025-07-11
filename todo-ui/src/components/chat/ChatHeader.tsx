import { Bot } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <Bot className="h-6 w-6 text-blue-400" />
      <h2 className="text-xl font-semibold text-white">Assistant</h2>
    </div>
  );
}
