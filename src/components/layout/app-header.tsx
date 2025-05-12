
"use client"

import Link from "next/link"
import { LoginModal } from "@/components/specific/login-modal"
import { Button } from "@/components/ui/button"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Menu } from "lucide-react"

export function AppHeader() {
  const { isMobile, toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
           <SidebarTrigger className="md:hidden mr-2" />
          <Link href="/" className="flex items-center gap-2 mr-6">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-primary md:hidden">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            <span className="font-semibold md:hidden">ZenithHub</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <LoginModal>
            <Button variant="outline">Login</Button>
          </LoginModal>
        </div>
      </div>
    </header>
  )
}
