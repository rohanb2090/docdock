import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FolderOpen, Plus, X, Play, Clock, Shield } from "lucide-react";

interface SelectedFolder {
  id: string;
  path: string;
  recursive: boolean;
}

export default function ScanPage() {
  const navigate = useNavigate();
  const [folders, setFolders] = useState<SelectedFolder[]>([
    { id: "1", path: "/Users/demo/Documents", recursive: true },
    { id: "2", path: "/Users/demo/Downloads", recursive: false },
  ]);
  const [isScanning, setIsScanning] = useState(false);

  const addFolder = () => {
    const newId = Date.now().toString();
    setFolders([...folders, { id: newId, path: "/Users/demo/Desktop", recursive: true }]);
  };

  const removeFolder = (id: string) => {
    setFolders(folders.filter((f) => f.id !== id));
  };

  const toggleRecursive = (id: string) => {
    setFolders(
      folders.map((f) =>
        f.id === id ? { ...f, recursive: !f.recursive } : f
      )
    );
  };

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      navigate("/results");
    }, 2000);
  };

  return (
    <div className="p-6 max-w-4xl animate-fade-in">
      <PageHeader
        title="Scan Folders"
        description="Select folders to analyze. FileFlow will scan files and propose organization suggestions."
      />

      <Card className="p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium text-foreground">Selected Folders</h2>
          <Button size="sm" variant="outline" onClick={addFolder}>
            <Plus className="w-4 h-4" />
            Add Folder
          </Button>
        </div>

        <div className="space-y-3">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className="flex items-center gap-3 p-3 bg-surface-sunken rounded-lg group"
            >
              <FolderOpen className="w-5 h-5 text-primary shrink-0" />
              <code className="flex-1 font-mono text-sm text-foreground truncate">
                {folder.path}
              </code>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                  <Checkbox
                    checked={folder.recursive}
                    onCheckedChange={() => toggleRecursive(folder.id)}
                  />
                  Include subfolders
                </label>
                <Button
                  size="icon"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFolder(folder.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {folders.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <FolderOpen className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>No folders selected. Add a folder to get started.</p>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-5 mb-6">
        <h2 className="font-medium text-foreground mb-4">Scan Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-start gap-3 p-3 bg-surface-sunken rounded-lg cursor-pointer hover:bg-surface-hover transition-colors">
            <Checkbox defaultChecked className="mt-0.5" />
            <div>
              <p className="font-medium text-sm text-foreground">Detect duplicates</p>
              <p className="text-xs text-muted-foreground">Find files with similar names or content</p>
            </div>
          </label>
          <label className="flex items-start gap-3 p-3 bg-surface-sunken rounded-lg cursor-pointer hover:bg-surface-hover transition-colors">
            <Checkbox defaultChecked className="mt-0.5" />
            <div>
              <p className="font-medium text-sm text-foreground">Suggest renames</p>
              <p className="text-xs text-muted-foreground">Apply naming rules to messy filenames</p>
            </div>
          </label>
          <label className="flex items-start gap-3 p-3 bg-surface-sunken rounded-lg cursor-pointer hover:bg-surface-hover transition-colors">
            <Checkbox defaultChecked className="mt-0.5" />
            <div>
              <p className="font-medium text-sm text-foreground">Propose folder structure</p>
              <p className="text-xs text-muted-foreground">Organize files into logical categories</p>
            </div>
          </label>
          <label className="flex items-start gap-3 p-3 bg-surface-sunken rounded-lg cursor-pointer hover:bg-surface-hover transition-colors">
            <Checkbox className="mt-0.5" />
            <div>
              <p className="font-medium text-sm text-foreground">Flag old files</p>
              <p className="text-xs text-muted-foreground">Identify files not accessed in 6+ months</p>
            </div>
          </label>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            Nothing changes until you approve
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            ~2-5 min for typical folders
          </span>
        </div>

        <Button
          size="lg"
          onClick={startScan}
          disabled={folders.length === 0 || isScanning}
        >
          {isScanning ? (
            <>
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Start Scan
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
