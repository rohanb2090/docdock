import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockSuggestions, formatFileSize } from "@/lib/mockData";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { ArrowRight, Check, Undo2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ReviewPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Simulate approved suggestions
  const [approvedSuggestions] = useState(
    mockSuggestions.slice(0, 3).map((s) => ({ ...s, status: "approved" as const }))
  );
  const [applied, setApplied] = useState(false);

  const applyChanges = () => {
    setApplied(true);
    toast({
      title: "Changes Applied",
      description: `${approvedSuggestions.length} changes have been applied. You can undo them from History.`,
    });
    setTimeout(() => navigate("/history"), 1500);
  };

  return (
    <div className="p-6 max-w-4xl animate-fade-in">
      <PageHeader
        title="Review & Approve"
        description="Review all approved changes before applying them"
        actions={
          <Button variant="outline" onClick={() => navigate("/suggestions")}>
            <Undo2 className="w-4 h-4" />
            Back to Queue
          </Button>
        }
      />

      <div className="p-4 bg-accent rounded-lg border border-accent-foreground/10 mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-accent-foreground shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-accent-foreground">
            Nothing changes until you click "Apply Changes"
          </p>
          <p className="text-sm text-accent-foreground/80">
            Review the changes below. All operations can be undone from the History page.
          </p>
        </div>
      </div>

      <Card className="p-5 mb-6">
        <h2 className="font-medium text-foreground mb-4">
          Changes to Apply ({approvedSuggestions.length})
        </h2>

        <div className="space-y-4">
          {approvedSuggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              className="p-4 bg-surface-sunken rounded-lg animate-slide-in-right"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase">
                  {suggestion.type}
                </span>
                <ConfidenceBadge level={suggestion.confidence} />
              </div>

              {suggestion.type === "rename" && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 pl-3 diff-remove py-1">
                    <code className="font-mono text-sm">
                      {suggestion.files[0].path}{suggestion.originalName}
                    </code>
                  </div>
                  <div className="flex items-center gap-2 pl-3 diff-add py-1">
                    <code className="font-mono text-sm">
                      {suggestion.files[0].path}{suggestion.suggestedName}
                    </code>
                  </div>
                </div>
              )}

              {suggestion.type === "merge" && (
                <div className="space-y-2">
                  {suggestion.files.map((file, i) => (
                    <div
                      key={file.id}
                      className={`flex items-center gap-2 pl-3 py-1 ${
                        i === 0 ? "diff-add" : "diff-remove"
                      }`}
                    >
                      <code className="font-mono text-sm">
                        {file.path}{file.name}
                      </code>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        ({formatFileSize(file.size)})
                      </span>
                      {i === 0 && (
                        <span className="text-xs font-medium text-confidence-high ml-auto">
                          Keep
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {suggestion.type === "move" && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 pl-3 diff-remove py-1">
                    <code className="font-mono text-sm">
                      {suggestion.files[0].path}{suggestion.files[0].name}
                    </code>
                  </div>
                  <div className="flex items-center gap-2 pl-3 diff-add py-1">
                    <code className="font-mono text-sm">
                      {suggestion.suggestedPath}{suggestion.files[0].name}
                    </code>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {approvedSuggestions.length} changes ready to apply
        </p>

        <Button
          size="lg"
          variant="success"
          onClick={applyChanges}
          disabled={applied}
        >
          {applied ? (
            <>
              <Check className="w-4 h-4" />
              Applied!
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              Apply Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
