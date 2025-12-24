import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockHistory, formatDate, HistoryEntry } from "@/lib/mockData";
import { Undo2, Clock, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HistoryPage() {
  const { toast } = useToast();
  const [history, setHistory] = useState<HistoryEntry[]>(mockHistory);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const undoAction = (id: string) => {
    setHistory(
      history.map((h) =>
        h.id === id ? { ...h, canUndo: false } : h
      )
    );
    toast({
      title: "Action Undone",
      description: "The changes have been reverted successfully.",
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-6 max-w-4xl animate-fade-in">
      <PageHeader
        title="History"
        description="View and undo past file operations"
      />

      <Card className="divide-y divide-border">
        {history.map((entry) => (
          <div key={entry.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{entry.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(entry.appliedAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleExpand(entry.id)}
                >
                  {expandedId === entry.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  Details
                </Button>
                {entry.canUndo ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => undoAction(entry.id)}
                  >
                    <Undo2 className="w-4 h-4" />
                    Undo
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Undone
                  </span>
                )}
              </div>
            </div>

            {expandedId === entry.id && (
              <div className="mt-3 ml-11 p-3 bg-surface-sunken rounded-lg animate-fade-in">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Affected files:
                </p>
                <div className="space-y-1">
                  {entry.files.map((file, i) => (
                    <code key={i} className="block file-path text-xs">
                      {file}
                    </code>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {history.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            <Clock className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p>No history yet. Applied changes will appear here.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
