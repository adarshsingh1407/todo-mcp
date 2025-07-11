import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { sendChatCommand, usePrompt } from "@/lib/mcpClient";
import type { ChatMessage } from "@/lib/types";

// Welcome message
const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: `👋 Welcome to your Todo Assistant!

I can help you manage your todos. Here's how:

📝 Commands:
• /add-todo <title> - Create a new todo
• /mark-done <id> - Mark as done
• /mark-todo <id> - Mark as pending
• /delete-todo <id> - Delete a todo
• /summarise-remaining - AI summary of pending todos
• /summarise-completed - AI summary of completed todos

💡 Tip: Press / to see all commands with autocomplete!`,
  createdAt: new Date().toISOString(),
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const queryClient = useQueryClient();

  const handlePromptMessages = (promptMessages: any[]) => {
    const convertedMessages: ChatMessage[] = promptMessages.map((msg) => ({
      id: msg.id,
      content: msg.content,
      role: msg.role === "user" ? "user" : "assistant",
      createdAt: msg.createdAt,
    }));
    setMessages((prev) => [...prev, ...convertedMessages]);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: "user",
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate AI response (you'll replace this with actual API call)
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "I received your message. This is a placeholder response that will be replaced with actual MCP API integration.",
        role: "assistant",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSlashCommand = async (command: string, args: string) => {
    try {
      let result;
      let shouldRefreshTodos = false;

      switch (command) {
        case "/add-todo":
          if (!args.trim()) {
            const errorMessage: ChatMessage = {
              id: Date.now().toString(),
              content:
                "❌ Please provide a title for the todo. Usage: /add-todo <title>",
              role: "assistant",
              createdAt: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, errorMessage]);
            return;
          }
          result = await sendChatCommand(args.trim());
          shouldRefreshTodos = true;
          break;

        case "/mark-done":
          if (!args.trim()) {
            const errorMessage: ChatMessage = {
              id: Date.now().toString(),
              content:
                "❌ Please provide a todo ID. Usage: /mark-done <todo-id>",
              role: "assistant",
              createdAt: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, errorMessage]);
            return;
          }
          result = await sendChatCommand(args.trim(), "mark-done");
          shouldRefreshTodos = true;
          break;

        case "/mark-todo":
          if (!args.trim()) {
            const errorMessage: ChatMessage = {
              id: Date.now().toString(),
              content:
                "❌ Please provide a todo ID. Usage: /mark-todo <todo-id>",
              role: "assistant",
              createdAt: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, errorMessage]);
            return;
          }
          result = await sendChatCommand(args.trim(), "mark-todo");
          shouldRefreshTodos = true;
          break;

        case "/delete-todo":
          if (!args.trim()) {
            const errorMessage: ChatMessage = {
              id: Date.now().toString(),
              content:
                "❌ Please provide a todo ID. Usage: /delete-todo <todo-id>",
              role: "assistant",
              createdAt: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, errorMessage]);
            return;
          }
          result = await sendChatCommand(args.trim(), "delete-todo");
          shouldRefreshTodos = true;
          break;

        case "/summarise-remaining":
          result = await sendChatCommand("", "summarise-remaining");
          break;

        case "/summarise-completed":
          result = await sendChatCommand("", "summarise-completed");
          break;

        default:
          const errorMessage: ChatMessage = {
            id: Date.now().toString(),
            content: `❌ Unknown command: ${command}`,
            role: "assistant",
            createdAt: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, errorMessage]);
          return;
      }

      if (result) {
        handlePromptMessages(result);

        // Refresh the todo list if the command modified todos
        if (shouldRefreshTodos) {
          queryClient.invalidateQueries({ queryKey: ["todos"] });
        }
      }
    } catch (error) {
      console.error("Error executing slash command:", error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        content: `❌ Error executing command: ${error}`,
        role: "assistant",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return {
    messages,
    handleSendMessage,
    handleSlashCommand,
    handlePromptMessages,
  };
}
