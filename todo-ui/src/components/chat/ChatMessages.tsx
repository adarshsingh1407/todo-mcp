import type { ChatMessage } from "@/lib/types";
import ChatMessageComponent from "./ChatMessage";

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto mb-4 min-h-0">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessageComponent key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}
