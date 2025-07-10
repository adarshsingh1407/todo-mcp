import { useQuery } from "@tanstack/react-query";
import { getTodos } from "./mcpClient";

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    // refetchInterval: 5000, // Refetch every 5 seconds
  });
}
