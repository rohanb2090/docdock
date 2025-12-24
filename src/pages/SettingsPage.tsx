import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, Clock, FolderX, Bell, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-3xl animate-fade-in">
      <PageHeader
        title="Settings"
        description="Configure FileFlow preferences and privacy options"
      />

      <div className="space-y-6">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="font-medium text-foreground">Scheduled Scans</h2>
              <p className="text-sm text-muted-foreground">
                Automatically scan folders on a schedule
              </p>
            </div>
          </div>

          <div className="space-y-4 ml-11">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-scan">Enable automatic scans</Label>
              <Switch id="auto-scan" defaultChecked />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="frequency" className="text-sm text-muted-foreground mb-1.5 block">
                  Frequency
                </Label>
                <Select defaultValue="monthly">
                  <SelectTrigger id="frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Every 2 weeks</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="day" className="text-sm text-muted-foreground mb-1.5 block">
                  Day
                </Label>
                <Select defaultValue="23">
                  <SelectTrigger id="day">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st of month</SelectItem>
                    <SelectItem value="15">15th of month</SelectItem>
                    <SelectItem value="23">23rd of month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-destructive/10 flex items-center justify-center">
              <FolderX className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <h2 className="font-medium text-foreground">Exclusions</h2>
              <p className="text-sm text-muted-foreground">
                Folders and file types to ignore during scans
              </p>
            </div>
          </div>

          <div className="space-y-4 ml-11">
            <div>
              <Label htmlFor="excluded-folders" className="text-sm text-muted-foreground mb-1.5 block">
                Excluded folders (one per line)
              </Label>
              <textarea
                id="excluded-folders"
                className="w-full h-24 px-3 py-2 text-sm font-mono bg-surface-sunken border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                defaultValue={`node_modules\n.git\n.cache\nLibrary`}
              />
            </div>

            <div>
              <Label htmlFor="excluded-types" className="text-sm text-muted-foreground mb-1.5 block">
                Excluded file extensions
              </Label>
              <Input
                id="excluded-types"
                defaultValue=".DS_Store, .tmp, .log"
                className="font-mono"
              />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-confidence-high/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-confidence-high" />
            </div>
            <div>
              <h2 className="font-medium text-foreground">Privacy</h2>
              <p className="text-sm text-muted-foreground">
                Control how FileFlow handles your files
              </p>
            </div>
          </div>

          <div className="space-y-4 ml-11">
            <div className="flex items-center justify-between">
              <div>
                <Label>Local processing only</Label>
                <p className="text-xs text-muted-foreground">
                  Never upload file contents to external servers
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Keep operation logs</Label>
                <p className="text-xs text-muted-foreground">
                  Store history of all file operations for undo
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Analytics</Label>
                <p className="text-xs text-muted-foreground">
                  Help improve FileFlow with anonymous usage data
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-confidence-medium/10 flex items-center justify-center">
              <Bell className="w-4 h-4 text-confidence-medium" />
            </div>
            <div>
              <h2 className="font-medium text-foreground">Notifications</h2>
              <p className="text-sm text-muted-foreground">
                When to notify you about scan results
              </p>
            </div>
          </div>

          <div className="space-y-4 ml-11">
            <div className="flex items-center justify-between">
              <Label>Scan complete notifications</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Duplicate file alerts</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Large file warnings</Label>
              <Switch />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button>
            <Save className="w-4 h-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
