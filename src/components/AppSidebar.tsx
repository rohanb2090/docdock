import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar";
import { FolderSearch, FileStack, ListChecks, GitCompare, History, BookOpen, Settings } from "lucide-react";
const mainNavItems = [{
  title: "Scan Folders",
  url: "/scan",
  icon: FolderSearch
}, {
  title: "Scan Results",
  url: "/results",
  icon: FileStack
}, {
  title: "Suggestions",
  url: "/suggestions",
  icon: ListChecks
}, {
  title: "Review & Approve",
  url: "/review",
  icon: GitCompare
}];
const manageNavItems = [{
  title: "History",
  url: "/history",
  icon: History
}, {
  title: "Rules",
  url: "/rules",
  icon: BookOpen
}, {
  title: "Settings",
  url: "/settings",
  icon: Settings
}];
export function AppSidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return <Sidebar className="border-r border-border">
      <SidebarHeader className="px-4 py-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          
          <div>
            <h1 className="font-semibold text-foreground text-sm">FileFlow</h1>
            <p className="text-xs text-muted-foreground">Smart File Organizer</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Organize
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={`w-full justify-start gap-3 px-2.5 py-2 rounded-md transition-colors ${isActive(item.url) ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                    <NavLink to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Manage
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {manageNavItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={`w-full justify-start gap-3 px-2.5 py-2 rounded-md transition-colors ${isActive(item.url) ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                    <NavLink to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-3 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-confidence-high animate-pulse-soft" />
          <span>Next scan: Jan 23, 2025</span>
        </div>
      </SidebarFooter>
    </Sidebar>;
}