import { Link } from "react-router-dom";
import { LoginModal } from "@/components/specific/login-modal";
import { Button } from "@/components/ui/button";
import { Menu, PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean; // To conditionally show desktop toggle
}

export function AppHeader({ onToggleSidebar, sidebarOpen }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          {/* Mobile sidebar toggle is handled in AppShell, this is for desktop */}
           <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleSidebar} 
            className="hidden md:flex mr-2 h-8 w-8" // Only show on desktop
            aria-label="Toggle sidebar"
          >
            <PanelLeft className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-primary">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            <span className="font-semibold">ZenithHub</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <LoginModal>
            <Button variant="outline">Login</Button>
          </LoginModal>
        </div>
      </div>
    </header>
  );
}
