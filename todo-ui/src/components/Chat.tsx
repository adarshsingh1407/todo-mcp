"use client";

import { useChat } from "@/lib/hooks";
import ChatHeader from "./chat/ChatHeader";
import ChatMessages from "./chat/ChatMessages";
import ChatInput from "./ChatInput";

interface ChatProps {
  selectedTodoId?: string;
  onTodoIdUsed?: () => void;
}

export default function Chat({ selectedTodoId, onTodoIdUsed }: ChatProps) {
  const { messages, handleSendMessage, handleSlashCommand } = useChat();

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />

      {/* Chat messages area */}
      <div className="flex-1 bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-600 flex flex-col min-h-0">
        <ChatMessages messages={messages} />

        {/* Chat input */}
        <div className="flex-shrink-0">
          <ChatInput
            onSend={handleSendMessage}
            onSlashCommand={handleSlashCommand}
            selectedTodoId={selectedTodoId}
            onTodoIdUsed={onTodoIdUsed}
          />
        </div>
      </div>
    </div>
  );
}
