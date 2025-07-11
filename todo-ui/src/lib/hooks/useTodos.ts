import { useQuery } from "@tanstack/react-query";
import { getTodos } from "@/lib/mcpClient";

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: false,
  });
}
