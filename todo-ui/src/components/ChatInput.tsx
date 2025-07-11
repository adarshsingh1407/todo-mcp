"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Command } from "lucide-react";
import SmartSuggestions from "./chat/SmartSuggestions";

// Available slash commands
const SLASH_COMMANDS = [
  {
    command: "/add-todo",
    description: "Add a new todo",
    example: "/add-todo Buy groceries",
    color: "text-blue-400",
  },
  {
    command: "/mark-done",
    description: "Mark a todo as done",
    example: "/mark-done <todo-id>",
    color: "text-green-400",
  },
  {
    command: "/mark-todo",
    description: "Mark a todo as pending",
    example: "/mark-todo <todo-id>",
    color: "text-yellow-400",
  },
  {
    command: "/delete-todo",
    description: "Delete a todo",
    example: "/delete-todo <todo-id>",
    color: "text-red-400",
  },
  {
    command: "/summarise-remaining",
    description: "Get AI summary of remaining todos",
    example: "/summarise-remaining",
    color: "text-purple-400",
  },
  {
    command: "/summarise-completed",
    description: "Get AI summary of completed todos",
    example: "/summarise-completed",
    color: "text-indigo-400",
  },
];

interface ChatInputProps {
  onSend: (message: string) => void;
  onSlashCommand: (command: string, args: string) => void;
  selectedTodoId?: string;
  onTodoIdUsed?: () => void;
}

export default function ChatInput({
  onSend,
  onSlashCommand,
  selectedTodoId,
  onTodoIdUsed,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [commandStart, setCommandStart] = useState(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Filter suggestions based on current input
  const getSuggestions = () => {
    if (commandStart === -1) return [];

    const currentCommand = input.slice(commandStart + 1);
    return SLASH_COMMANDS.filter((cmd) =>
      cmd.command.toLowerCase().includes(currentCommand.toLowerCase())
    );
  };

  const suggestions = getSuggestions();

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    // Check if user is typing a slash command
    const lastSlashIndex = value.lastIndexOf("/");
    if (lastSlashIndex !== -1 && lastSlashIndex < value.length) {
      setCommandStart(lastSlashIndex);
      setShowSuggestions(true);
      setSelectedSuggestion(0);
    } else {
      setShowSuggestions(false);
      setCommandStart(-1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedSuggestion((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedSuggestion((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      } else if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (suggestions.length > 0) {
          const selectedCmd = suggestions[selectedSuggestion];
          const newInput =
            input.slice(0, commandStart) + selectedCmd.command + " ";
          setInput(newInput);
          setShowSuggestions(false);
          setCommandStart(-1);
          textareaRef.current?.focus();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setShowSuggestions(false);
        setCommandStart(-1);
      }
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!input.trim()) return;

    // Check if this is a slash command
    if (input.startsWith("/")) {
      const parts = input.trim().split(" ");
      const command = parts[0];
      const args = parts.slice(1).join(" ");

      // Validate command exists
      const validCommand = SLASH_COMMANDS.find(
        (cmd) => cmd.command === command
      );
      if (validCommand) {
        onSlashCommand(command, args);
        setInput("");
        setShowSuggestions(false);
        setCommandStart(-1);
        return;
      }
    }

    // Regular message
    onSend(input.trim());
    setInput("");
    setShowSuggestions(false);
    setCommandStart(-1);
  };

  // Handle suggestion click
  const handleSuggestionClick = (command: string) => {
    const newInput = input.slice(0, commandStart) + command + " ";
    setInput(newInput);
    setShowSuggestions(false);
    setCommandStart(-1);
    textareaRef.current?.focus();
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  // Auto-insert selected todo ID
  useEffect(() => {
    if (selectedTodoId && onTodoIdUsed) {
      // Append the todo ID to the current input instead of replacing it
      setInput((prev) => prev + selectedTodoId);
      onTodoIdUsed();
      textareaRef.current?.focus();
    }
  }, [selectedTodoId, onTodoIdUsed]);

  return (
    <div className="space-y-3">
      {/* Smart Suggestions */}
      <SmartSuggestions
        onSuggestionClick={(command) => {
          const newInput = input + command;
          setInput(newInput);
          textareaRef.current?.focus();
        }}
      />

      {/* Textarea and Send Button */}
      <div className="relative">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex items-end space-x-2"
        >
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message or press / for commands..."
              className="min-h-[80px] max-h-[150px] resize-none bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 pr-10"
            />
            {input.startsWith("/") && (
              <div className="absolute top-2 right-2">
                <Command className="h-4 w-4 text-gray-400" />
              </div>
            )}
          </div>
          <Button
            type="submit"
            size="icon"
            className="h-[80px] w-[80px] bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!input.trim()}
          >
            <Send className="!h-8 !w-8" />
          </Button>
        </form>

        {/* Slash Command Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion.command}
                onClick={() => handleSuggestionClick(suggestion.command)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-800/50 transition-colors ${
                  index === selectedSuggestion ? "bg-gray-800/50" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`font-mono text-sm ${suggestion.color}`}>
                    {suggestion.command}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {suggestion.description}
                  </span>
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  {suggestion.example}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
