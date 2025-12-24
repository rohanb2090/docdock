import { Suggestion, formatFileSize, formatDate } from "@/lib/mockData";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { FileTypeBadge } from "./FileTypeBadge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { ArrowRight, Trash2, GitMerge, FolderInput, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuggestionCardProps {
  suggestion: Suggestion;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  onApprove?: () => void;
  onReject?: () => void;
}

export function SuggestionCard({
  suggestion,
  selected = false,
  onSelect,
  onApprove,
  onReject,
}: SuggestionCardProps) {
  const typeIcons = {
    rename: Pencil,
    merge: GitMerge,
    move: FolderInput,
    delete: Trash2,
  };

  const typeLabels = {
    rename: "Rename",
    merge: "Merge",
    move: "Move",
    delete: "Delete",
  };

  const TypeIcon = typeIcons[suggestion.type];

  return (
    <Card
      className={cn(
        "p-4 transition-all border hover:border-primary/30 animate-fade-in",
        selected && "ring-2 ring-primary/20 border-primary/40"
      )}
    >
      <div className="flex items-start gap-3">
        {onSelect && (
          <Checkbox
            checked={selected}
            onCheckedChange={onSelect}
            className="mt-1"
          />
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium",
                suggestion.type === "rename" && "bg-file-document/10 text-file-document",
                suggestion.type === "merge" && "bg-file-spreadsheet/10 text-file-spreadsheet",
                suggestion.type === "move" && "bg-file-presentation/10 text-file-presentation",
                suggestion.type === "delete" && "bg-destructive/10 text-destructive"
              )}
            >
              <TypeIcon className="w-3 h-3" />
              {typeLabels[suggestion.type]}
            </span>
            <ConfidenceBadge level={suggestion.confidence} />
          </div>

          <p className="text-sm text-foreground mb-3">{suggestion.reason}</p>

          <div className="space-y-2">
            {suggestion.files.map((file) => (
              <div key={file.id} className="flex items-center gap-2 text-sm">
                <FileTypeBadge type={file.type} showIcon={true} />
                <code className="file-path truncate flex-1">{file.path}{file.name}</code>
                <span className="text-muted-foreground tabular-nums text-xs">
                  {formatFileSize(file.size)}
                </span>
              </div>
            ))}

            {suggestion.type === "rename" && suggestion.suggestedName && (
              <div className="flex items-center gap-2 mt-2 pl-2 border-l-2 border-confidence-high">
                <ArrowRight className="w-3 h-3 text-muted-foreground" />
                <code className="file-path text-confidence-high">
                  {suggestion.suggestedName}
                </code>
              </div>
            )}

            {suggestion.type === "move" && suggestion.suggestedPath && (
              <div className="flex items-center gap-2 mt-2 pl-2 border-l-2 border-confidence-high">
                <ArrowRight className="w-3 h-3 text-muted-foreground" />
                <code className="file-path text-confidence-high">
                  {suggestion.suggestedPath}
                </code>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Button size="xs" variant="success" onClick={onApprove}>
            Approve
          </Button>
          <Button size="xs" variant="ghost" onClick={onReject}>
            Reject
          </Button>
        </div>
      </div>
    </Card>
  );
}
