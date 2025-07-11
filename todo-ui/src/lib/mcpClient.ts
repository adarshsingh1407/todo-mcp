import type { Todo, ChatMessage } from "./types";
import { MCP_COMMANDS } from "./constants";

const MCP_SERVER_URL =
  process.env.NEXT_PUBLIC_MCP_SERVER_URL || "http://localhost:3001";

export async function getTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(`${MCP_SERVER_URL}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "resources/read",
        params: {
          uri: "todos://all",
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle SSE response
    const text = await response.text();
    const lines = text.split("\n");

    // Find the data line that contains the JSON response
    const dataLine = lines.find((line) => line.startsWith("data: "));
    if (!dataLine) {
      throw new Error("No data found in SSE response");
    }

    // Extract JSON from the data line
    const jsonStr = dataLine.substring(6); // Remove 'data: ' prefix
    const data = JSON.parse(jsonStr);

    if (data.error) {
      throw new Error(`MCP error: ${data.error.message}`);
    }

    // Parse the content from the MCP response
    if (data.result?.contents?.[0]?.text) {
      const todosText = data.result.contents[0].text;
      return JSON.parse(todosText);
    }

    return [];
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
}

export async function sendChatCommand(
  message: string,
  command?: string
): Promise<ChatMessage[]> {
  try {
    let toolName = "add-todo";
    let arguments_: any = { title: message };

    // Map slash commands to MCP tools
    switch (command) {
      case "mark-done":
        toolName = MCP_COMMANDS.MARK_DONE;
        arguments_ = { id: message };
        break;
      case "mark-todo":
        toolName = MCP_COMMANDS.MARK_TODO;
        arguments_ = { id: message };
        break;
      case "delete-todo":
        toolName = MCP_COMMANDS.DELETE_TODO;
        arguments_ = { id: message };
        break;
      case "summarise-remaining":
        toolName = MCP_COMMANDS.SUMMARIZE_REMAINING;
        arguments_ = {};
        break;
      case "summarise-completed":
        toolName = MCP_COMMANDS.SUMMARIZE_COMPLETED;
        arguments_ = {};
        break;
      default:
        // Default to add-todo
        toolName = MCP_COMMANDS.ADD_TODO;
        arguments_ = { title: message };
    }

    const response = await fetch(`${MCP_SERVER_URL}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: {
          name: toolName,
          arguments: arguments_,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle SSE response
    const text = await response.text();
    const lines = text.split("\n");

    // Find the data line that contains the JSON response
    const dataLine = lines.find((line) => line.startsWith("data: "));
    if (!dataLine) {
      throw new Error("No data found in SSE response");
    }

    // Extract JSON from the data line
    const jsonStr = dataLine.substring(6); // Remove 'data: ' prefix
    const data = JSON.parse(jsonStr);

    if (data.error) {
      throw new Error(`MCP error: ${data.error.message}`);
    }

    // Return the response as a chat message
    return [
      {
        id: Date.now().toString(),
        role: "assistant",
        content:
          data.result?.content?.[0]?.text || "Command executed successfully",
        createdAt: new Date().toISOString(),
      },
    ];
  } catch (error) {
    console.error("Error sending chat command:", error);
    throw error;
  }
}

export async function usePrompt(
  promptName: string,
  promptArgs: any
): Promise<ChatMessage[]> {
  try {
    const response = await fetch(`${MCP_SERVER_URL}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: Date.now(),
        method: "prompts/get",
        params: {
          name: promptName,
          arguments: promptArgs,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle SSE response
    const text = await response.text();
    const lines = text.split("\n");

    // Find the data line that contains the JSON response
    const dataLine = lines.find((line) => line.startsWith("data: "));
    if (!dataLine) {
      throw new Error("No data found in SSE response");
    }

    // Extract JSON from the data line
    const jsonStr = dataLine.substring(6); // Remove 'data: ' prefix
    const data = JSON.parse(jsonStr);

    if (data.error) {
      throw new Error(`MCP error: ${data.error.message}`);
    }

    // Convert prompt messages to chat messages
    return (
      data.result?.messages?.map((msg: any, index: number) => ({
        id: `${Date.now()}-${index}`,
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content?.text || "",
        createdAt: new Date().toISOString(),
      })) || []
    );
  } catch (error) {
    console.error("Error using prompt:", error);
    throw error;
  }
}

export async function listPrompts(): Promise<any[]> {
  try {
    const response = await fetch(`${MCP_SERVER_URL}/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: Date.now(),
        method: "prompts/list",
        params: {},
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle SSE response
    const text = await response.text();
    const lines = text.split("\n");

    // Find the data line that contains the JSON response
    const dataLine = lines.find((line) => line.startsWith("data: "));
    if (!dataLine) {
      throw new Error("No data found in SSE response");
    }

    // Extract JSON from the data line
    const jsonStr = dataLine.substring(6); // Remove 'data: ' prefix
    const data = JSON.parse(jsonStr);

    if (data.error) {
      throw new Error(`MCP error: ${data.error.message}`);
    }

    return data.result?.prompts || [];
  } catch (error) {
    console.error("Error listing prompts:", error);
    throw error;
  }
}
