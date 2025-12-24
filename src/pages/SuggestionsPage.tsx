import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { SuggestionCard } from "@/components/SuggestionCard";
import { mockSuggestions, Suggestion, SuggestionType } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, XCircle, Filter } from "lucide-react";

export default function SuggestionsPage() {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState<Suggestion[]>(mockSuggestions);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<string>("all");

  const pendingSuggestions = suggestions.filter((s) => s.status === "pending");

  const filterByType = (type: string): Suggestion[] => {
    if (type === "all") return pendingSuggestions;
    return pendingSuggestions.filter((s) => s.type === type);
  };

  const filteredSuggestions = filterByType(activeTab);

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const selectAll = () => {
    if (selectedIds.size === filteredSuggestions.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredSuggestions.map((s) => s.id)));
    }
  };

  const approveSelected = () => {
    setSuggestions(
      suggestions.map((s) =>
        selectedIds.has(s.id) ? { ...s, status: "approved" as const } : s
      )
    );
    setSelectedIds(new Set());
  };

  const rejectSelected = () => {
    setSuggestions(
      suggestions.map((s) =>
        selectedIds.has(s.id) ? { ...s, status: "rejected" as const } : s
      )
    );
    setSelectedIds(new Set());
  };

  const approveSingle = (id: string) => {
    setSuggestions(
      suggestions.map((s) =>
        s.id === id ? { ...s, status: "approved" as const } : s
      )
    );
  };

  const rejectSingle = (id: string) => {
    setSuggestions(
      suggestions.map((s) =>
        s.id === id ? { ...s, status: "rejected" as const } : s
      )
    );
  };

  const approvedCount = suggestions.filter((s) => s.status === "approved").length;

  return (
    <div className="p-6 max-w-4xl animate-fade-in">
      <PageHeader
        title="Suggestions Queue"
        description={`${pendingSuggestions.length} pending suggestions to review`}
        actions={
          approvedCount > 0 && (
            <Button onClick={() => navigate("/review")}>
              Review {approvedCount} Approved
            </Button>
          )
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList>
          <TabsTrigger value="all">
            All ({pendingSuggestions.length})
          </TabsTrigger>
          <TabsTrigger value="rename">
            Rename ({pendingSuggestions.filter((s) => s.type === "rename").length})
          </TabsTrigger>
          <TabsTrigger value="merge">
            Merge ({pendingSuggestions.filter((s) => s.type === "merge").length})
          </TabsTrigger>
          <TabsTrigger value="move">
            Move ({pendingSuggestions.filter((s) => s.type === "move").length})
          </TabsTrigger>
          <TabsTrigger value="delete">
            Delete ({pendingSuggestions.filter((s) => s.type === "delete").length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredSuggestions.length > 0 && (
        <div className="flex items-center justify-between mb-4 p-3 bg-surface-sunken rounded-lg">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={selectedIds.size === filteredSuggestions.length && filteredSuggestions.length > 0}
              onCheckedChange={selectAll}
            />
            <span className="text-sm text-muted-foreground">
              {selectedIds.size > 0
                ? `${selectedIds.size} selected`
                : "Select all"}
            </span>
          </label>

          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="success" onClick={approveSelected}>
                <CheckCircle2 className="w-4 h-4" />
                Approve Selected
              </Button>
              <Button size="sm" variant="ghost" onClick={rejectSelected}>
                <XCircle className="w-4 h-4" />
                Reject Selected
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        {filteredSuggestions.map((suggestion) => (
          <SuggestionCard
            key={suggestion.id}
            suggestion={suggestion}
            selected={selectedIds.has(suggestion.id)}
            onSelect={() => toggleSelect(suggestion.id)}
            onApprove={() => approveSingle(suggestion.id)}
            onReject={() => rejectSingle(suggestion.id)}
          />
        ))}

        {filteredSuggestions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Filter className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p>No pending suggestions in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
