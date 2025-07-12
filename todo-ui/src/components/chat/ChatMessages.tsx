import type { ChatMessage } from "@/lib/types";
import ChatMessageComponent from "./ChatMessage";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isProcessing?: boolean;
}

export default function ChatMessages({
  messages,
  isProcessing = false,
}: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto mb-4 min-h-0">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessageComponent key={message.id} message={message} />
        ))}
        {isProcessing && (
          <div className="flex justify-start mb-4">
            <div className="max-w-[80%] rounded-lg px-4 py-2 backdrop-blur-sm border bg-gray-700/50 text-gray-100 border-gray-600/30">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                <span className="text-sm">Processing...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
