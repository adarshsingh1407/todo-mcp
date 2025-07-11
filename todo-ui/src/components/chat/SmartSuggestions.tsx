import { Button } from "@/components/ui/button";
import { Plus, FileText, CheckCircle } from "lucide-react";
import { SMART_SUGGESTIONS } from "@/lib/constants";

interface SmartSuggestionsProps {
  onSuggestionClick: (command: string) => void;
}

export default function SmartSuggestions({
  onSuggestionClick,
}: SmartSuggestionsProps) {
  return (
    <div className="flex gap-2 items-center justify-start">
      <div className="text-xs text-gray-300">💡</div>
      <div className="flex gap-1.5">
        <Button
          size="sm"
          variant="outline"
          className="text-xs h-6 px-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border-blue-400/30 backdrop-blur-sm"
          onClick={() => onSuggestionClick("/add-todo ")}
        >
          <Plus className="h-3" />
          {SMART_SUGGESTIONS.ADD_TODO.label}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="text-xs h-6 px-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-400/30 backdrop-blur-sm"
          onClick={() => onSuggestionClick("/summarise-remaining")}
        >
          <FileText className="h-3" />
          {SMART_SUGGESTIONS.SUMMARIZE_REMAINING.label}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="text-xs h-6 px-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border-indigo-400/30 backdrop-blur-sm"
          onClick={() => onSuggestionClick("/summarise-completed")}
        >
          <CheckCircle className="h-3" />
          {SMART_SUGGESTIONS.SUMMARIZE_COMPLETED.label}
        </Button>
      </div>
    </div>
  );
}
