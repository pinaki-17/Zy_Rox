
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  LayoutGrid,
  MessageCircle,
  Coffee,
  ListChecks,
  FileText,
  Info,
  Users,
  Settings,
  Moon,
  Sun,
  Globe,
  ChevronUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

const navItems = [
  { href: "/blog", icon: LayoutGrid, label: "Blog", tooltip: "Blog" },
  { href: "/chat", icon: MessageCircle, label: "Chat", tooltip: "Chat" },
  { href: "/chill-zone", icon: Coffee, label: "Chill Zone", tooltip: "Chill Zone" },
  { href: "/tasks", icon: ListChecks, label: "Tasks", tooltip: "Tasks" },
  { href: "/notes", icon: FileText, label: "Notes", tooltip: "Notes" },
  { href: "/about-us", icon: Users, label: "About Us", tooltip: "About Us" },
]

export function LeftSidebarContent() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
          <span className="text-xl font-semibold group-data-[collapsible=icon]:hidden">
            ZenithHub
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2 flex-1">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.tooltip}
                  className="justify-start"
                >
                  <a>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t">
          <SidebarMenuButton tooltip="Settings" className="justify-start">
            <Settings />
            <span>Settings</span>
          </SidebarMenuButton>
      </SidebarFooter>
    </>
  )
}
