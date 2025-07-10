import type { Todo, ChatMessage } from "./types";

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

export async function sendChatCommand(message: string): Promise<ChatMessage[]> {
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
        method: "tools/call",
        params: {
          name: "add-todo", // This will be dynamic based on the command
          arguments: {
            title: message,
          },
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
