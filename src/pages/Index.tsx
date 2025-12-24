import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FolderSearch,
  Sparkles,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileStack,
  Undo2,
} from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 lg:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-primary mx-auto mb-6 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-semibold text-foreground mb-3">
            Welcome to FileFlow
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Smart file organization for busy professionals. Clean up messy folders 
            without manually opening files.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="p-6 mb-8 bg-accent border-accent-foreground/10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <FolderSearch className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Start Organizing</h2>
                <p className="text-sm text-muted-foreground">
                  Select folders to scan and get smart suggestions
                </p>
              </div>
            </div>
            <Button size="lg" onClick={() => navigate("/scan")}>
              Scan Folders
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-5">
            <div className="w-10 h-10 rounded-lg bg-file-document/10 flex items-center justify-center mb-3">
              <FileStack className="w-5 h-5 text-file-document" />
            </div>
            <h3 className="font-medium text-foreground mb-1">Smart Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Detect duplicates, messy names, and suggest standardized organization.
            </p>
          </Card>

          <Card className="p-5">
            <div className="w-10 h-10 rounded-lg bg-confidence-high/10 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5 text-confidence-high" />
            </div>
            <h3 className="font-medium text-foreground mb-1">Review First</h3>
            <p className="text-sm text-muted-foreground">
              Preview all changes in a diff view. Nothing happens until you approve.
            </p>
          </Card>

          <Card className="p-5">
            <div className="w-10 h-10 rounded-lg bg-confidence-medium/10 flex items-center justify-center mb-3">
              <Undo2 className="w-5 h-5 text-confidence-medium" />
            </div>
            <h3 className="font-medium text-foreground mb-1">Always Reversible</h3>
            <p className="text-sm text-muted-foreground">
              Full history with undo. Roll back any change at any time.
            </p>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Local processing only
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Auto-scans monthly
          </span>
        </div>
      </div>
    </div>
  );
}
