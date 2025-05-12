import type { PropsWithChildren } from "react";
import { LeftSidebarContent } from "./left-sidebar-content";
import { AppHeader } from "./app-header";
import { AppFooter } from "./app-footer";
import { RightUtilityBar } from "./right-utility-bar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile"; // Ensure this hook is Vite compatible
import React, { useState } from "react";
import { Button } from "../ui/button";
import { PanelLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";


export function AppShell({ children }: PropsWithChildren) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile); // Open by default on desktop
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };
  
  const sidebarWidth = isMobile ? "w-64" : sidebarOpen ? "w-64" : "w-16";

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar & Mobile Sheet Trigger */}
      {!isMobile ? (
        <aside className={cn(
          "bg-sidebar text-sidebar-foreground border-r transition-all duration-300 ease-in-out",
          sidebarWidth
        )}>
          <LeftSidebarContent collapsed={!sidebarOpen && !isMobile} />
        </aside>
      ) : (
        <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden fixed top-3 left-3 z-50">
              <PanelLeft />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-sidebar text-sidebar-foreground">
            <LeftSidebarContent collapsed={false} onLinkClick={() => setMobileSidebarOpen(false)} />
          </SheetContent>
        </Sheet>
      )}

      <div className="flex flex-1 flex-col">
        <AppHeader onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen && !isMobile} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
        <AppFooter />
      </div>
      <RightUtilityBar />
    </div>
  );
}
