"use client";

import { Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

// Types for chat messages
interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

// Dummy chat messages
const dummyMessages: ChatMessage[] = [
  {
    id: "1",
    content:
      "Hello! I'm your AI assistant. I can help you manage your todos and provide insights about your tasks.",
    isUser: false,
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
  },
  {
    id: "2",
    content: "Can you show me my remaining todos?",
    isUser: true,
    timestamp: new Date(Date.now() - 240000), // 4 minutes ago
  },
  {
    id: "3",
    content:
      "I can see you have 3 remaining todos: 'Complete project documentation', 'Review code changes', and 'Schedule team meeting'. Would you like me to help prioritize these?",
    isUser: false,
    timestamp: new Date(Date.now() - 180000), // 3 minutes ago
  },
  {
    id: "4",
    content: "Yes, please prioritize them for me.",
    isUser: true,
    timestamp: new Date(Date.now() - 120000), // 2 minutes ago
  },
  {
    id: "5",
    content:
      "Based on your current workload, I recommend this priority order:\n1. Schedule team meeting (time-sensitive)\n2. Review code changes (blocking others)\n3. Complete project documentation (can be done asynchronously)\n\nWould you like me to mark any of these as done?",
    isUser: false,
    timestamp: new Date(Date.now() - 60000), // 1 minute ago
  },
];

// Chat Message Component
function ChatMessage({ message }: { message: ChatMessage }) {
  return (
    <div
      className={`flex ${
        message.isUser ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 backdrop-blur-sm border ${
          message.isUser
            ? "bg-blue-500/20 text-blue-100 border-blue-400/30"
            : "bg-gray-700/50 text-gray-100 border-gray-600/30"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p className="text-xs opacity-70 mt-1">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

// Chat Input Component
function ChatInput({ onSend }: { onSend: (message: string) => void }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <div className="space-y-3">
      {/* Quick Action Buttons */}
      <div className="flex flex-row gap-4 items-center">
        <label className="text-xs font-medium text-gray-300">
          Quick Actions:
        </label>
        <div className="flex space-x-2">
          <Button
            size="sm"
            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/30 backdrop-blur-sm text-[10px] px-2 py-0.5 rounded-full h-6"
            onClick={() => {
              // TODO: Add handler for summarize todos
              console.log("Summarize Todos clicked");
            }}
          >
            Summarize ToDos
          </Button>
          <Button
            size="sm"
            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/30 backdrop-blur-sm text-[10px] px-2 py-0.5 rounded-full h-6"
            onClick={() => {
              // TODO: Add handler for summarize done
              console.log("Summarize Done clicked");
            }}
          >
            Summarize Done
          </Button>
          <Button
            size="sm"
            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/30 backdrop-blur-sm text-[10px] px-2 py-0.5 rounded-full h-6"
            onClick={() => {
              // TODO: Add handler for summarize remaining
              console.log("Summarize Remaining clicked");
            }}
          >
            Summarize Remaining
          </Button>
        </div>
      </div>

      {/* Textarea and Send Button */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 min-h-[80px] max-h-[150px] resize-none bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (input.trim()) {
                onSend(input.trim());
                setInput("");
              }
            }
          }}
        />
        <Button
          type="submit"
          size="icon"
          className="h-[80px] w-[80px] bg-blue-600 hover:bg-blue-700 text-white"
          disabled={!input.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>(dummyMessages);

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate AI response (you'll replace this with actual API call)
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "I received your message. This is a placeholder response that will be replaced with actual MCP API integration.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-2 mb-6">
        <Bot className="h-6 w-6 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">Assistant</h2>
      </div>

      {/* Chat messages area */}
      <div className="flex-1 bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg border border-gray-600 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto mb-4 min-h-0">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        </div>

        {/* Chat input */}
        <div className="flex-shrink-0">
          <ChatInput onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
