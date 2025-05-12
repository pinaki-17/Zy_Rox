
"use client"

import type { PropsWithChildren } from "react"
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar"
import { LeftSidebarContent } from "./left-sidebar-content"
import { AppHeader } from "./app-header"
import { AppFooter } from "./app-footer"
import { RightUtilityBar } from "./right-utility-bar"

export function AppShell({ children }: PropsWithChildren) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon" className="border-r">
          <LeftSidebarContent />
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <AppHeader />
          <SidebarInset className="flex-1 p-4 md:p-6">
            {children}
          </SidebarInset>
          <AppFooter />
        </div>
        <RightUtilityBar />
      </div>
    </SidebarProvider>
  )
}
