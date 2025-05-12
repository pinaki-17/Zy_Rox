import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutGrid,
  MessageCircle,
  Coffee,
  ListChecks,
  FileText,
  Info,
  Users,
  Settings,
  ChevronUp,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const navItems = [
  { to: "/", icon: Home, label: "Home", tooltip: "Home" },
  { to: "/blog", icon: LayoutGrid, label: "Blog", tooltip: "Blog" },
  { to: "/chat", icon: MessageCircle, label: "Chat", tooltip: "Chat" },
  { to: "/chill-zone", icon: Coffee, label: "Chill Zone", tooltip: "Chill Zone" },
  { to: "/tasks", icon: ListChecks, label: "Tasks", tooltip: "Tasks" },
  { to: "/notes", icon: FileText, label: "Notes", tooltip: "Notes" },
  { to: "/about-us", icon: Users, label: "About Us", tooltip: "About Us" },
];

interface LeftSidebarContentProps {
  collapsed: boolean;
  onLinkClick?: () => void; // For mobile to close sidebar on navigation
}

export function LeftSidebarContent({ collapsed, onLinkClick }: LeftSidebarContentProps) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex flex-col h-full">
        <header className={cn("p-4 border-b border-sidebar-border", collapsed && "py-3")}>
          <Link to="/" className="flex items-center gap-2" onClick={onLinkClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            {!collapsed && (
              <span className="text-xl font-semibold text-sidebar-foreground">
                ZenithHub
              </span>
            )}
          </Link>
        </header>
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Tooltip key={item.to}>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant={pathname === item.to ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    collapsed ? "justify-center px-0" : "px-3",
                    pathname === item.to && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                  )}
                >
                  <Link to={item.to} onClick={onLinkClick}>
                    <item.icon className={cn("h-5 w-5", !collapsed && "mr-2")} />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right" sideOffset={5}>
                  {item.tooltip}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>
        <footer className={cn("p-2 border-t border-sidebar-border", collapsed && "py-1.5")}>
           <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    collapsed ? "justify-center px-0" : "px-3"
                  )}
                >
                  <Settings className={cn("h-5 w-5", !collapsed && "mr-2")} />
                  {!collapsed && <span>Settings</span>}
                </Button>
              </TooltipTrigger>
               {collapsed && (
                <TooltipContent side="right" sideOffset={5}>
                  Settings
                </TooltipContent>
              )}
            </Tooltip>
        </footer>
      </div>
    </TooltipProvider>
  );
}
