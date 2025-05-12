

// Removed "use client"
// Removed import { ThemeToggle } from "@/components/specific/theme-toggle"
import { LanguageSwitcher } from "@/components/specific/language-switcher"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "../specific/theme-toggle"; // Import ThemeToggle

export function RightUtilityBar() {
  return (
    <aside className="hidden md:flex flex-col items-center w-16 border-l bg-background p-2 space-y-4 sticky top-0 h-screen">
      <ThemeToggle /> {/* Keep ThemeToggle, it's now adapted */}
      <LanguageSwitcher />
      <Separator className="my-2" />
      <Button variant="primary" size="sm" className="w-full h-auto py-2 px-0 aspect-square flex flex-col">
        <span>Sub</span>
        <span>scribe</span>
      </Button>
    </aside>
  )
}
