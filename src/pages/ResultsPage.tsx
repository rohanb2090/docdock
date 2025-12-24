import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockScanResult, formatDate, getFileTypeIcon } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { ArrowRight, FileStack, Clock, FolderOpen } from "lucide-react";

export default function ResultsPage() {
  const navigate = useNavigate();
  const scan = mockScanResult;

  const totalSuggestions = scan.suggestions.length;

  return (
    <div className="p-6 max-w-5xl animate-fade-in">
      <PageHeader
        title="Scan Results"
        description={`Scanned ${scan.folderPath} on ${formatDate(scan.scannedAt)}`}
        actions={
          <Button onClick={() => navigate("/suggestions")}>
            View Suggestions
            <ArrowRight className="w-4 h-4" />
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileStack className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums text-foreground">
                {scan.totalFiles}
              </p>
              <p className="text-sm text-muted-foreground">Files Scanned</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-confidence-high/10 flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-confidence-high" />
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums text-foreground">
                {scan.categories.length}
              </p>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-confidence-medium/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-confidence-medium" />
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums text-foreground">
                {totalSuggestions}
              </p>
              <p className="text-sm text-muted-foreground">Suggestions</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="font-medium text-foreground mb-4">Files by Category</h2>
        <div className="space-y-2">
          {scan.categories.map((category) => {
            const percentage = Math.round((category.count / scan.totalFiles) * 100);
            return (
              <div key={category.name} className="group">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getFileTypeIcon(category.type)}</span>
                    <span className="text-sm font-medium text-foreground">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {category.count} files ({percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="mt-6 p-4 bg-accent rounded-lg border border-accent-foreground/10">
        <p className="text-sm text-accent-foreground">
          <strong>{totalSuggestions} suggestions</strong> are ready for review. 
          FileFlow detected rename opportunities, potential duplicates, and 
          organization improvements.
        </p>
      </div>
    </div>
  );
}
