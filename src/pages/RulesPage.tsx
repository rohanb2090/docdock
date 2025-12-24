import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { mockRules, NamingRule } from "@/lib/mockData";
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";

export default function RulesPage() {
  const [rules, setRules] = useState<NamingRule[]>(mockRules);

  const toggleRule = (id: string) => {
    setRules(
      rules.map((r) =>
        r.id === id ? { ...r, enabled: !r.enabled } : r
      )
    );
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl animate-fade-in">
      <PageHeader
        title="Naming Rules"
        description="Configure patterns for automatic file naming suggestions"
        actions={
          <Button>
            <Plus className="w-4 h-4" />
            Add Rule
          </Button>
        }
      />

      <Card className="divide-y divide-border">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="p-4 flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-foreground">{rule.name}</h3>
                  {!rule.enabled && (
                    <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      Disabled
                    </span>
                  )}
                </div>
                <code className="block text-sm text-muted-foreground font-mono mb-2">
                  {rule.pattern}
                </code>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Example:</span>
                  <code className="file-path">{rule.example}</code>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={rule.enabled}
                onCheckedChange={() => toggleRule(rule.id)}
              />
              <Button size="icon" variant="ghost">
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => deleteRule(rule.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {rules.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p>No rules configured. Add a rule to get started.</p>
          </div>
        )}
      </Card>

      <div className="mt-6 p-4 bg-surface-sunken rounded-lg">
        <h3 className="font-medium text-foreground mb-2">Pattern Tokens</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <code className="file-path">{"{YYYY}"}</code>
            <p className="text-xs text-muted-foreground mt-0.5">Year (2024)</p>
          </div>
          <div>
            <code className="file-path">{"{MM}"}</code>
            <p className="text-xs text-muted-foreground mt-0.5">Month (01-12)</p>
          </div>
          <div>
            <code className="file-path">{"{DD}"}</code>
            <p className="text-xs text-muted-foreground mt-0.5">Day (01-31)</p>
          </div>
          <div>
            <code className="file-path">{"{filename}"}</code>
            <p className="text-xs text-muted-foreground mt-0.5">Original name</p>
          </div>
          <div>
            <code className="file-path">{"{n}"}</code>
            <p className="text-xs text-muted-foreground mt-0.5">Counter (001)</p>
          </div>
          <div>
            <code className="file-path">{"{client}"}</code>
            <p className="text-xs text-muted-foreground mt-0.5">Detected client</p>
          </div>
          <div>
            <code className="file-path">{"{type}"}</code>
            <p className="text-xs text-muted-foreground mt-0.5">File type</p>
          </div>
          <div>
            <code className="file-path">{"{category}"}</code>
            <p className="text-xs text-muted-foreground mt-0.5">Auto category</p>
          </div>
        </div>
      </div>
    </div>
  );
}
